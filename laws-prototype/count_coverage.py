import re, json
from pathlib import Path
from collections import defaultdict

html = Path("mengxing-prototype-v1.html").read_text(encoding="utf-8")
laws = json.loads(Path("model/laws_master.json").read_bytes())
items = laws if isinstance(laws, list) else (laws.get("laws") or [])

zone_stats = defaultdict(lambda: {"total":0,"quiz":0,"cases":0,"probe":0,"both":0})
for law in items:
    lid = law["id"]
    group = lid.split("-")[0]
    ld = law.get("lawdata") or {}
    y = law.get("yaml") or {}
    has_q = len(ld.get("quiz") or []) > 0
    has_c = len(ld.get("cases") or []) > 0
    has_p = len(ld.get("probes") or y.get("probes") or []) > 0
    zone_stats[group]["total"] += 1
    if has_q: zone_stats[group]["quiz"] += 1
    if has_c: zone_stats[group]["cases"] += 1
    if has_p: zone_stats[group]["probe"] += 1
    if has_q and has_c: zone_stats[group]["both"] += 1

print("区       | 总条 | 有练习 | 有病例 | 二者都有")
print("-"*50)
for g in sorted(zone_stats):
    s = zone_stats[g]
    print(f"{g:8s} | {s['total']:4d} | {s['quiz']:6d} | {s['cases']:6d} | {s['both']:6d}")
print()

# 统计 App 视图数量
views = re.findall(r'id="v-([^"]+)"', html)
print(f"视图总数: {len(views)}")
print("视图列表:", " | ".join(views[:20]))
print("...")

# 各区白板实现情况
print()
print("=== 各区白板/动画系统实现情况 ===")
systems = {
    "PN白板(代词/QI)": len(re.findall(r"\{ id:'(?:PR|GR-1[0-9]|QI)-", html)),
    "CJ白板(连词)": len(re.findall(r"\{ id:'(?:GR-(?:11|32|38|46|47|48|49|50)|NEW-CJ)", html)),
    "AR白板(冠词)": len(re.findall(r"\{ id:'C-\d+|GR-15'", html)),
    "GK游乐场视图": len(re.findall(r"gkview\|gkv-", html)),
    "介词词页": len(re.findall(r"case '[-a-z]+':.*sceneSVG", html)),
    "时态实验室视图": len(re.findall(r"'tn-(?:scene|story|perfect|trap|future|grid|scoba|gate)'", html)),
    "旗舰FA单元": len(re.findall(r"data-fa=", html)),
    "DEMOS动画": len(re.findall(r"'(?:PR|GR)-\d+': \{title:", html)),
}
for k,v in systems.items():
    print(f"  {k}: {v}")

# 统计哪些大区的规律页还没有对应的法规白板
print()
print("=== 规律区白板缺失情况 ===")
# 哪些 group 的规律没有任何白板
groups_with_wb = set()
for m in re.findall(r"\{ id:'([A-Z]+-\d+)',.*?scenes:", html, re.DOTALL):
    groups_with_wb.add(m.split("-")[0])

for g in sorted(zone_stats):
    s = zone_stats[g]
    has_wb = g in groups_with_wb
    print(f"  {g:6s}: {s['total']}条规律, 白板: {'有' if has_wb else '无'}, 练习: {s['quiz']}, 病例: {s['cases']}")
