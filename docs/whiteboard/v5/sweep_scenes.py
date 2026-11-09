#!/usr/bin/env python3
"""sweep_scenes.py —— 白板全量打包扫测（第五波第 6 项，2026-11-09）。

第四波是临时 xargs 扫测（965 幕：959 打包通过 + 6 个共享 lib 记 N/A），
口径只留在底稿里。本脚本把扫测固定下来，可重复跑：

  WB_FONTS/PATH 未设时默认 ~/workspace/wbfonts（pyftsubset 在其 bin/ 下；
  字体缓存共用 /tmp/wb5_fontcache，见 build.mjs）。

口径（总数 = scenes/*.js 全部文件）：
  bundled：build.mjs 打包成功（exit 0）。
  lib：build.mjs 报 LIB-NODE-CHECK（无 export default，只走 node --check）。
    预期集合 EXPECTED_LIBS（10 个 = 6 个共享 lib + 4 个引擎模块）。
    4 个引擎模块（auto/adj_train/oral/poly）以前被计为 bundled，是
    因为 build.mjs 的 shared 插件把对它们自身的 stdin import 解析成
    了共享命名空间桩、空打也通过——那个“通过”是空洞的；它们和 6 个
    lib 一样没有 export default、一样是被别的幕 import 的共享代码，
    故与 lib 同口径（其代码随 engine.js 打进每一幕的产物，不存在
    覆盖丢失）。扫测出的 lib 集合与预期不一致时整体 FAIL——防止某幕
    丢了 export default 被误算成 lib（见下）。
  FAIL：build.mjs 非零退出。

  2026-11-09 实测（基线 d698a3c + 第五波）：967 文件 =
  957 bundled + 10 lib（cmp_lib、fb39_lib、g14_lib、fr_lib、
  hd_poly_g4_157_v2、wordcard_items + auto、adj_train、oral、poly）
  + 0 FAIL。与第四波口径（965 文件 = 959 bundled + 6 lib）的对账：
  961 = 959 + 2（vv_give_on 两幕）；957 = 961 − 4（4 个引擎模块
  从 bundled 桶挪到 lib 桶）；10 = 6 + 4。

用法：
  python3 docs/whiteboard/v5/sweep_scenes.py [--only <前缀> ...] [--jobs 8] [--keep-out DIR]
产物默认写临时目录、扫完删除；--keep-out 保留产物供抽查。
临时目录不在 /tmp 下（/tmp 是 512M tmpfs，967 幕产物峰值约 1.1GB 会写满；
改放 $HOME/wave5-sweep-tmp，扫完删除）。
退出码：0 = 0 FAIL 且 lib 集合 == 预期；1 = 其他。
"""
import concurrent.futures, os, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SCENES = ROOT / 'docs' / 'whiteboard' / 'v5' / 'scenes'
BUILD = ROOT / 'docs' / 'whiteboard' / 'v5' / 'build.mjs'
EXPECTED_LIBS = {'cmp_lib.js', 'fb39_lib.js', 'g14_lib.js', 'fr_lib.js',
                 'hd_poly_g4_157_v2.js', 'wordcard_items.js',
                 'auto.js', 'adj_train.js', 'oral.js', 'poly.js'}


def run_one(name, outdir, env):
    scene = SCENES / name
    out = outdir / (scene.stem + '.html')
    r = subprocess.run(['node', str(BUILD), str(scene), str(out), 'sweep'],
                       capture_output=True, text=True, env=env, timeout=300)
    if r.returncode == 0 and 'LIB-NODE-CHECK' in r.stdout:
        return name, 'lib', ''
    if r.returncode == 0:
        return name, 'bundled', ''
    tail = (r.stdout.strip().splitlines() + r.stderr.strip().splitlines())[-3:]
    return name, 'FAIL', ' | '.join(tail)[:300]


def main():
    only, jobs, keep_out = [], 8, None
    args = sys.argv[1:]
    while args:
        a = args.pop(0)
        if a == '--only' and args:
            only.append(args.pop(0))
        elif a == '--jobs' and args:
            jobs = int(args.pop(0))
        elif a == '--keep-out' and args:
            keep_out = args.pop(0)
        else:
            print(f'未知参数：{a}', file=sys.stderr)
            return 2
    env = dict(os.environ)
    env.setdefault('WB_FONTS', os.path.expanduser('~/workspace/wbfonts'))
    wb_bin = os.path.expanduser('~/workspace/wbfonts/bin')
    if wb_bin not in env.get('PATH', ''):
        env['PATH'] = wb_bin + ':' + env.get('PATH', '')
    names = sorted(p.name for p in SCENES.glob('*.js')
                   if not only or any(p.name.startswith(pfx) for pfx in only))
    tmp_parent = Path.home() / 'wave5-sweep-tmp'
    tmp_parent.mkdir(parents=True, exist_ok=True)
    outdir = Path(keep_out) if keep_out else Path(
        tempfile.mkdtemp(prefix='wave5_sweep_', dir=tmp_parent))
    outdir.mkdir(parents=True, exist_ok=True)
    bundled, libs, fails = [], [], []
    done = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=jobs) as ex:
        futs = {ex.submit(run_one, n, outdir, env): n for n in names}
        for fut in concurrent.futures.as_completed(futs):
            name, kind, msg = fut.result()
            done += 1
            if done % 100 == 0:
                print(f'progress: {done}/{len(names)}', flush=True)
            if kind == 'bundled':
                bundled.append(name)
            elif kind == 'lib':
                libs.append(name)
            else:
                fails.append((name, msg))
    for name, msg in sorted(fails):
        print(f'FAIL {name}：{msg}')
    print(f'sweep：{len(names)} 文件；bundled {len(bundled)}；'
          f'lib node --check {len(libs)} {sorted(libs)}；FAIL {len(fails)}')
    ok = not fails and (bool(only) or set(libs) == EXPECTED_LIBS)
    if not only and set(libs) != EXPECTED_LIBS:
        print(f'lib 集合与预期不一致：预期 {sorted(EXPECTED_LIBS)}，'
              f'实得 {sorted(libs)}')
    if not keep_out:
        import shutil
        shutil.rmtree(outdir, ignore_errors=True)
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
