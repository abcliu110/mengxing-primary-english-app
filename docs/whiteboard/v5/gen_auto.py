"""gen_auto.py <旧清单.md> <案例号> <页签> <库名> <标题> '<acts JSON>' —— 生成 v5.1 场景 scenes/<页签>_<案例号>.js（通用版面引擎 scenes/auto.js）。
旧清单由 src/export_inventory.py 导出；每条字幕 / 白板 / 道具 / 朗读原样写进场景数据（R1 一字不差），之后用 r1v5.py 核对。
acts：{"动作词": ["帧", ...]}，帧来自人物先行帧库 sprites/cast/（先用 sprites/build_sprites.py <库名> 帧… 打库）。"""
import re, sys, json, os
inv, n, tab, lib, title, acts = sys.argv[1:7]
HERE = os.path.dirname(os.path.abspath(__file__))
sec = re.search(rf'^## 案例 {n}（.*?(?=^## 案例 |\Z)', open(inv, encoding='utf-8').read(), re.S | re.M).group(0)
q = lambda s: "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
items = []
rows = [(float(m.group(1)), m.group(2), m.group(3)) for m in re.finditer(r'^\| ☐ \| ([\d.]+)s \| (\S+) \| (.*) \|$', sec, re.M)]
short = lambda i: 0 <= i < len(rows) and rows[i][1] == '白板' and len(rows[i][2]) <= 9
menu = set(i for i in range(len(rows)) if short(i) and ((short(i - 1) and rows[i][0] - rows[i - 1][0] < 0.35) or (short(i + 1) and rows[i + 1][0] - rows[i][0] < 0.35)))
for i, (tm, typ, txt) in enumerate(rows):
    if i in menu: items.append(f"['m', {q(txt)}]"); continue
    if typ == '朗读':
        mm = re.match(r'(.*?) ｜ (.*?)(?: 〔先读：(.*)〕)?$', txt); en, zh, w = mm.groups()
        items.append(f"['s', {q(en)}, {q(zh)}" + (f", {q(w)}]" if w else "]"))
    else:
        items.append(f"[{q({'字幕': 'n', '白板': 'w', '道具': 'p'}.get(typ, 'w'))}, {q(txt)}]")
A = json.loads(acts)
out = os.path.join(HERE, 'scenes', f'{tab}_{n}.js')
open(out, 'w', encoding='utf-8').write(f"""// {title} —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/{tab}.js 案例 {n}；对照清单 lab/INVENTORY_{tab.upper()}_{n}_V5.md
// 角色关键帧：sprites/{lib}.js（人物先行帧库 cast/）
import {{ autoBuild }} from './auto.js';
import * as SP from '../sprites/{lib}.js';
const ACTS = {json.dumps(A, ensure_ascii=False)};
const ITEMS = [
  {(',' + chr(10) + '  ').join(items)}
];
export default function build() {{ return autoBuild(SP, {{ title: {q(title)}, items: ITEMS, acts: ACTS }}); }}
""")
print(out, len(items), 'items')
