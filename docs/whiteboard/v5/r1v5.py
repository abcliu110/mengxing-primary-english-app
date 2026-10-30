"""r1v5.py <旧清单.md> <案例号> <scenes/xx.js> <输出 INVENTORY_*.md> —— v5 重画 R1 零丢失核对（SOP §17）。
旧清单由 src/export_inventory.py 导出；每条字幕 / 白板 / 朗读（英文、中文、先读词三段）必须在新场景源码里一字不差出现。"""
import re, sys
inv, n, scene, out = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
src = open(scene, encoding='utf-8').read().replace("\\'", "'")
sec = re.search(rf'^## 案例 {n}（.*?(?=^## 案例 |\Z)', open(inv, encoding='utf-8').read(), re.S | re.M).group(0)
rows, miss = [], 0
for m in re.finditer(r'^\| ☐ \| [\d.]+s \| (\S+) \| (.*) \|$', sec, re.M):
    typ, txt = m.group(1), m.group(2)
    parts = [txt]
    if typ == '朗读':
        mm = re.match(r'(.*?) ｜ (.*?)(?: 〔先读：(.*)〕)?$', txt); parts = [p for p in mm.groups() if p]
    ok = all(p in src for p in parts); miss += not ok
    rows.append(f"| {'✅' if ok else '❌'} | {typ} | {txt} | {'同文' if ok else '缺：' + ' / '.join(p for p in parts if p not in src)} |")
tail = sec[sec.find('- 徽章'):] if '- 徽章' in sec else ''
with open(out, 'w', encoding='utf-8') as f:
    f.write(f"# 内容清单（R1 零丢失）：案例 {n} → v5.1 重画 `{scene.split('whiteboard/')[-1]}`\n\n> 由 `v5/r1v5.py` 对照旧版导出清单（`src/export_inventory.py`）自动生成。朗读按「英文句 ｜ 中文 ｜ 先读词」三段分别核对。\n\n| ☐ | 类型 | 原内容 | 新版位置 |\n|---|---|---|---|\n")
    f.write('\n'.join(rows) + f"\n\n{tail}\n术语小词典：沿用原案例 `terms`（并入 App 时随场景挂载，不改字）。\n\n结论：{len(rows)} 条，缺 {miss} 条。\n")
print(len(rows), '条，缺', miss)
