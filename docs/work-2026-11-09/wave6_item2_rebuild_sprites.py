"""wave6_item2_rebuild_sprites.py —— 第六波第 2 项：重建补动作 8 幕的真实精灵包。

背景：第六波第 2 项给 8 幕补了 ACTS（登记见
docs/whiteboard/src/wb13/gen_wb13_scenes.py 的 ACTS_REG），帧名即
cast/ 帧库里已有的演出帧。精灵包是 gitignored 的本地构建产物
（sprites/.gitignore：*.js，手工版除外），不入库；本脚本与清单 JSON
入库，任何机器先跑 make_sprite_stubs.py 补齐 stub 再跑本脚本即可复现。

做法（不编造美术素材）：
  1. 从 ACTS_REG 取帧名：每幕的精灵包名取自场景文件的 import 行。
  2. 只在 cast/ 帧库齐全时重建：调
     `docs/whiteboard/v5/sprites/build_sprites.py <lib> <帧...>`。
  3. 逐包核对生成包的 FR 键 == ACTS 登记帧（verify_pack）。

用法（在仓库根目录）：
    python3 docs/work-2026-11-09/wave6_item2_rebuild_sprites.py [--check-only] [--manifest out.json]
    --check-only 只盘点不写包；默认写包 + 写清单（默认路径见 MANIFEST）。

实测（2026-11-10，基线 788f0bd）：8 幕 8 包，帧 9 个（l_switch、
bird_up、bird_down、l_speak、l_sit、l_stand），cast/ 全部齐全，逐包
FR 键核对通过。注意 bird_down 在 AH=470 下宽 628px、右缘 2008 超出
1920 画布约 88px（与 five_patterns_p2_1 先例幕现状相同，见底稿 §2）；
plane 帧宽 1207px 完全出画布，故 fly out 两幕未登记、未重建。
"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SCENES = os.path.join(ROOT, 'docs/whiteboard/v5/scenes')
SPRITES = os.path.join(ROOT, 'docs/whiteboard/v5/sprites')
CAST = os.path.join(SPRITES, 'cast')
BUILD_SPRITES = os.path.join(SPRITES, 'build_sprites.py')
MANIFEST = os.path.join(ROOT, 'docs/work-2026-11-09/wave6_item2_rebuilt_sprites.json')
sys.path.insert(0, os.path.join(ROOT, 'docs/whiteboard/src/wb13'))
import gen_wb13_scenes as g  # noqa: E402  (ACTS_REG 唯一来源)

IMPORT_RE = re.compile(r"""from\s+['"]\.\./sprites/([^'"]+\.js)['"]""")
ACTS_RE = re.compile(r'const ACTS\s*=\s*(\{.*?\});', re.S)


def collect():
    """ACTS_REG 幕 -> {'lib', 'frames', 'scenes', 'missing_frames'}。"""
    out = {}
    for scene, acts in sorted(g.ACTS_REG.items()):
        src = open(os.path.join(SCENES, scene), encoding='utf-8').read()
        m = IMPORT_RE.search(src)
        assert m, f'取不到精灵包：{scene}'
        lib = m.group(1)
        # 场景文件 ACTS 必须与 ACTS_REG 一致（生成器是唯一来源）
        m2 = ACTS_RE.search(src)
        assert m2 and json.loads(m2.group(1)) == acts, f'场景 ACTS 与 ACTS_REG 不一致：{scene}'
        frames = sorted({f for v in acts.values() for f in v})
        missing = [f for f in frames if not os.path.exists(os.path.join(CAST, f + '.webp'))]
        out[lib] = {'frames': frames, 'scenes': [scene],
                    'missing_frames': missing}
    return out


def verify_pack(lib, frames):
    """核对生成包的 FR 键 == 登记帧；返回 (ok, detail)。"""
    p = os.path.join(SPRITES, lib)
    if not os.path.exists(p):
        return False, '包文件不存在'
    src = open(p, encoding='utf-8', errors='replace').read()
    m = re.search(r'export const FR\s*=\s*\{', src)
    if not m:
        return False, '读不到 FR'
    body = src[m.end() - 1:]
    keys = set(re.findall(r'"([^"]+)":\s*"data:image/webp;base64', body))
    if keys != set(frames):
        return False, f'FR 键 {sorted(keys)} != 登记帧 {sorted(frames)}'
    return True, f'{len(keys)} 帧'


def main():
    check_only = '--check-only' in sys.argv
    manifest_path = MANIFEST
    if '--manifest' in sys.argv:
        manifest_path = sys.argv[sys.argv.index('--manifest') + 1]
    rows = collect()
    print(f"ACTS_REG 幕 {len(g.ACTS_REG)}，精灵包 {len(rows)}")
    n_rebuilt, n_fail = 0, 0
    for lib, r in sorted(rows.items()):
        if r['missing_frames']:
            print(f'SKIP {lib}：cast/ 缺帧 {r["missing_frames"]}')
            r['status'] = 'missing_frames'
            n_fail += 1
            continue
        if check_only:
            print(f'CHECK-ONLY {lib}：帧 {r["frames"]} 齐全，未写包')
            r['status'] = 'check_only'
            continue
        cp = subprocess.run([sys.executable, BUILD_SPRITES,
                             lib[:-3] if lib.endswith('.js') else lib] + r['frames'],
                            capture_output=True, text=True)
        if cp.returncode != 0:
            print(f'FAIL {lib}：build_sprites.py 非零退出：{cp.stderr.strip()[-300:]}')
            r['status'] = 'build_fail'
            n_fail += 1
            continue
        ok, detail = verify_pack(lib, r['frames'])
        print(f'{"OK " if ok else "FAIL"} {lib}：{detail}（{r["scenes"][0]}）')
        r['status'] = 'rebuilt' if ok else 'verify_fail'
        if ok:
            n_rebuilt += 1
        else:
            n_fail += 1
    json.dump({'rows': rows, 'rebuilt': n_rebuilt, 'fail': n_fail},
              open(manifest_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'manifest written: {manifest_path}（rebuilt {n_rebuilt} / fail {n_fail}）')
    return 1 if n_fail else 0


if __name__ == '__main__':
    sys.exit(main())
