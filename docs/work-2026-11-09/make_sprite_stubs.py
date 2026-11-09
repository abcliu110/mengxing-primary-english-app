"""make_sprite_stubs.py —— 第四波第 4(a) 项：补齐白板场景缺失的精灵文件（空 stub）。

背景：docs/whiteboard/v5/scenes/*.js 用 `import * as SP from '../sprites/<lib>.js'`
引用 580 个精灵包；盘上只有 110 个（13 个手工实包 tm/pc/ao + 97 个 44 字节空 stub），
缺 470 个。精灵包是 gitignored 的本地构建产物（sprites/.gitignore：*.js，手工版除外），
git 全历史里从未入库过其中任何一个生成包（`git log --all --name-only -- sprites/` 只有
13 个手工包 + cast/ 帧库），所以无法从历史恢复；也不编造精灵内容。
空 stub 只让 `node docs/whiteboard/v5/build.mjs <scene> <out.html>` 打包通过（esbuild
能解析 `import * as SP`），不改任何场景文件内容。stub 覆盖的幕在播放时无角色帧
（FR/FI 为空），属已知缺口，见 wave4_item4_tooling_gaps.md。

用法（在仓库根目录）：
    python3 docs/work-2026-11-09/make_sprite_stubs.py [--check-only] [--inventory out.json]

stub 字节与第三波同款、与盘上 97 个现有 stub 逐字节一致：
    b'export const FR = {}; export const FI = {};\\n'（44 字节，md5 2ac8eaf8a6df6331982296e84eae2897）
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SCENES = os.path.join(ROOT, 'docs/whiteboard/v5/scenes')
SPRITES = os.path.join(ROOT, 'docs/whiteboard/v5/sprites')
PAT = re.compile(r"""from\s+['"]\.\./sprites/([^'"]+\.js)['"]""")
STUB = b'export const FR = {}; export const FI = {};\n'
assert len(STUB) == 44, len(STUB)

def main():
    check_only = '--check-only' in sys.argv
    inv_path = None
    if '--inventory' in sys.argv:
        inv_path = sys.argv[sys.argv.index('--inventory') + 1]
    imports = {}
    for name in sorted(os.listdir(SCENES)):
        if not name.endswith('.js'):
            continue
        txt = open(os.path.join(SCENES, name), encoding='utf-8', errors='replace').read()
        for m in PAT.finditer(txt):
            imports.setdefault(m.group(1), set()).add(name)

    def disk_status(lib):
        p = os.path.join(SPRITES, lib)
        if not os.path.exists(p):
            return 'missing'
        return 'stub44' if os.path.getsize(p) == 44 else 'real'

    rows, created, skipped = [], 0, 0
    for lib in sorted(imports):
        st = disk_status(lib)
        if st == 'missing' and not check_only:
            with open(os.path.join(SPRITES, lib), 'wb') as f:
                f.write(STUB)
            created += 1
        elif st == 'missing':
            skipped += 1
        rows.append({'sprite': lib, 'scenes': sorted(imports[lib]),
                     'n_scenes': len(imports[lib]), 'disk': st})
    affected = sorted({s for r in rows if r['disk'] == 'missing' for s in r['scenes']})
    print(f"distinct sprites: {len(rows)}; "
          f"real: {sum(1 for r in rows if r['disk'] == 'real')}; "
          f"stub44: {sum(1 for r in rows if r['disk'] == 'stub44')}; "
          f"missing: {sum(1 for r in rows if r['disk'] == 'missing')}")
    print(f"scenes importing >=1 missing sprite: {len(affected)}")
    if check_only:
        print(f'check-only：缺 {skipped} 个精灵包，未写文件')
    else:
        print(f'created {created} stub(s) in {SPRITES} (44 bytes each)')
    if inv_path:
        json.dump({'rows': rows, 'affected_scenes': affected},
                  open(inv_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'inventory written: {inv_path}')
    return 0

if __name__ == '__main__':
    sys.exit(main())
