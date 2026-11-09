"""rebuild_highfreq_sprites.py —— 第五波第 3 项：只重建高频幕的真实精灵包。

背景：第四波第 4(a) 项盘点 580 个被引精灵包缺 470 个，全部用 44 字节空 stub
顶上（docs/work-2026-11-09/make_sprite_stubs.py；stub 幕打包通过但无人物帧）。
本项只重建高频动词系列（give / take / get / turn 四组 vv 幕）的真实包，
其余留 stub，记为已知缺口。

做法（不编造美术素材）：
  1. 从场景文件取帧名：每个缺失包被哪些 vv_give/take/get/turn 幕（含 gen_stock_
     副本）引用，读各幕的 `const ACTS = {...}` 并取并集——帧名即场景作者登记的
     演出帧，与 CAST_V5.md 登记一致。
  2. 只在 cast/ 帧库齐全时重建：调 `docs/whiteboard/v5/sprites/build_sprites.py
     <lib> <帧...>`（绿幕帧库已抠好，直接打包成 WebP data URI + FI 锚点）。
     cast/ 里缺帧的包不动，留 stub 并记入清单。
  3. ACTS 为空的包（如 vv_take_out_2.js 的 ACTS = {}，幕本身不用任何帧）
     不重建：空 stub 的 FR/FI 已是正确内容，重建一个零帧包没有意义，记为
     “无需帧”，不计入缺口。

精灵包是 gitignored 的本地构建产物（sprites/.gitignore：*.js，手工版除外），
本脚本与清单 JSON 入库，包本身不入库；任何机器先跑 make_sprite_stubs.py
补齐 stub 再跑本脚本即可复现。

用法（在仓库根目录）：
    python3 docs/work-2026-11-09/rebuild_highfreq_sprites.py [--check-only] [--manifest out.json]
    --check-only 只盘点不写包；默认写包 + 写清单（默认路径见 MANIFEST）。

实测（2026-11-09，基线 d698a3c；470 缺失清单见 wave4_item4a_sprite_inventory.json）：
  高频包 62 个（give/take/get/turn 的 vv 幕及 gen_stock 副本引用的全部包）；
  其中 44 个在 470 缺失清单内，18 个已有 stub（back/on/core/over 系列）；
  ACTS 有帧且 cast/ 齐全 47 个 → 重建（43 个缺失包 + 4 个已有 stub 的
  back/on 包）；ACTS 为空 15 个（14 个 core/over 幕 + vv_take_out_2，
  场景头注明“ACTS 待配，不编造帧映射”）→ 留 stub，空 FR/FI 即正确内容；
  重建后仍为 stub 的包共 427 个（470 - 43），其中 426 个无真实帧、
  1 个（vvtakeout2）无需帧。
"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SCENES = os.path.join(ROOT, 'docs/whiteboard/v5/scenes')
SPRITES = os.path.join(ROOT, 'docs/whiteboard/v5/sprites')
CAST = os.path.join(SPRITES, 'cast')
BUILD_SPRITES = os.path.join(SPRITES, 'build_sprites.py')
MANIFEST = os.path.join(ROOT, 'docs/work-2026-11-09/wave5_item3_highfreq_sprites.json')
VERBS = ('give', 'take', 'get', 'turn')
HF_RE = re.compile(r'^(gen_stock_)?vv_(give|take|get|turn)_.*\.js$')
IMPORT_RE = re.compile(r"""from\s+['"]\.\./sprites/([^'"]+\.js)['"]""")
ACTS_RE = re.compile(r'const ACTS\s*=\s*(\{.*?\});', re.S)


def acts_of(scene_file):
    """读一幕的 ACTS，返回 {key: [frames]}；无 ACTS 返回 None。"""
    src = open(os.path.join(SCENES, scene_file), encoding='utf-8').read()
    m = ACTS_RE.search(src)
    if not m:
        return None
    return json.loads(m.group(1).replace("'", '"'))


def collect():
    """高频包 -> {'frames': [...], 'scenes': [...], 'missing_frames': [...],
    'was_missing_470': bool}。was_missing_470 以第四波清单为准。"""
    packs = {}
    for name in sorted(os.listdir(SCENES)):
        if not HF_RE.match(name):
            continue
        src = open(os.path.join(SCENES, name), encoding='utf-8').read()
        acts = acts_of(name)
        frames = sorted({f for v in (acts or {}).values() for f in v})
        for lib in IMPORT_RE.findall(src):
            p = packs.setdefault(lib, {'frames': set(), 'scenes': set()})
            p['frames'].update(frames)
            p['scenes'].add(name)
    cast = {os.path.splitext(f)[0] for f in os.listdir(CAST)}
    inv_path = os.path.join(ROOT, 'docs/work-2026-11-09/wave4_item4a_sprite_inventory.json')
    was_missing = set()
    if os.path.exists(inv_path):
        inv = json.load(open(inv_path, encoding='utf-8'))
        was_missing = {r['sprite'] for r in inv['rows'] if r['disk'] == 'missing'}
    out = {}
    for lib in sorted(packs):
        frames = sorted(packs[lib]['frames'])
        out[lib] = {
            'frames': frames,
            'scenes': sorted(packs[lib]['scenes']),
            'missing_frames': [f for f in frames if f not in cast],
            'was_missing_470': lib in was_missing,
        }
    return out


def verify_pack(lib, frames):
    """重建后核对：包文件里的 FR 键 == ACTS 帧。"""
    src = open(os.path.join(SPRITES, lib), encoding='utf-8').read()
    m = re.search(r'export const FR = (\{.*?\});', src, re.S)
    if not m:
        return False, 'FR 解析失败'
    keys = sorted(json.loads(m.group(1)).keys())
    if keys != sorted(frames):
        return False, f'FR 键 {keys} != ACTS 帧 {sorted(frames)}'
    return True, f'{len(keys)} 帧'


def main():
    check_only = '--check-only' in sys.argv
    manifest_path = MANIFEST
    if '--manifest' in sys.argv:
        manifest_path = sys.argv[sys.argv.index('--manifest') + 1]
    packs = collect()
    rebuilt, no_frames, kept_stub = [], [], []
    n_was_missing = sum(1 for i in packs.values() if i['was_missing_470'])
    for lib, info in packs.items():
        if not info['frames']:
            no_frames.append(lib)
            continue
        if info['missing_frames']:
            kept_stub.append(lib)
            continue
        if not check_only:
            r = subprocess.run([sys.executable, BUILD_SPRITES, lib[:-3], *info['frames']],
                               capture_output=True, text=True)
            if r.returncode != 0:
                print(f'FAIL {lib}: {r.stdout}{r.stderr}')
                return 1
            ok, msg = verify_pack(lib, info['frames'])
            if not ok:
                print(f'FAIL {lib}: {msg}')
                return 1
            print(f'rebuilt {lib}: {msg} ({os.path.getsize(os.path.join(SPRITES, lib))} bytes)')
        rebuilt.append(lib)
    print(f'high-freq packs: {len(packs)} (of which in 470-missing list: {n_was_missing}); '
          f'rebuilt: {len(rebuilt)}; '
          f'no frames needed: {len(no_frames)} {no_frames}; '
          f'kept stub (cast 缺帧): {len(kept_stub)} {kept_stub}')
    if not check_only:
        json.dump({'packs': packs,
                   'rebuilt': sorted(rebuilt),
                   'no_frames_needed': sorted(no_frames),
                   'kept_stub': sorted(kept_stub)},
                  open(manifest_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'manifest written: {manifest_path}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
