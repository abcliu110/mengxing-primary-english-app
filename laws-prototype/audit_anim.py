#!/usr/bin/env python3
"""审计白板动画质量：输出每条规律的 scene 数、cap 文本、是否有病例场景"""
import re
from pathlib import Path

html = Path("mengxing-prototype-v1.html").read_text(encoding="utf-8")

lines = []
def p(*a): lines.append(" ".join(str(x) for x in a))

# ── PN 系 (代词/QI) ──────────────────────────────────────────
# 找 WB_BY_ID 的 raw data（和 WB_SECTIONS 是同一块）
# 格式: { id:'PR-01', name:'...', short:'...', scenes:[ {cap:'...', svg:...}, ... ]}
# 用非贪婪提取每个 section
pn_raw = re.findall(
    r"\{ id:'([A-Z0-9\-]+)',\s*name:'([^']+)'.*?scenes:\[(.*?)\]\}(?=\s*[,\]])",
    html, re.DOTALL
)
p(f"=== PN/QI white board sections: {len(pn_raw)} ===")
for sid, name, body in pn_raw:
    caps = re.findall(r"cap:'([^']+)'", body)
    n_scenes = len(caps)
    has_case = any("病例" in c or "❌" in c or "wrong" in c.lower() for c in caps)
    has_mech = any("机制" in c or "怎么" in c or "为什么" in c or "从" in c for c in caps)
    # check SVG complexity (count wbd elements per scene)
    svgs = re.findall(r"svg:\s*(.*?)(?=,?\s*\})", body, re.DOTALL)
    avg_wbd = 0
    if svgs:
        wbd_counts = [s.count("wbd") for s in svgs]
        avg_wbd = sum(wbd_counts) // len(wbd_counts) if wbd_counts else 0

    flags = []
    if n_scenes < 3: flags.append("场景少")
    if not has_case: flags.append("无病例场")
    if not has_mech: flags.append("无机制场")
    if avg_wbd < 3: flags.append("元素稀")
    flag_str = " ⚠" + "+".join(flags) if flags else " ✓"
    p(f"  {sid:8s} {name[:20]:20s} {n_scenes}场 wbd≈{avg_wbd}{flag_str}")
    # 显示 caps
    for c in caps:
        p(f"           {c[:70]}")

p("")

# ── CJ 系 (连词) ──────────────────────────────────────────────
cj_raw = re.findall(
    r"\{ id:'([A-Z0-9\-]+)',\s*name:'([^']+)'.*?scenes:\[(.*?)\]\}(?=\s*[,\]])",
    html, re.DOTALL
)
# CJ sections have same pattern — already captured above
# count unique ids
p(f"=== DEMOS (帧动画 entries) ===")
demos_raw = re.findall(r"'(PR-\d+|GR-\d+|QI-\d+|PR-\w+)':\s*\{title:'([^']+)'.*?frames:\s*\[(.*?)\]\}", html, re.DOTALL)
for did, title, fbody in demos_raw:
    frames = re.findall(r"'<div", fbody)
    p(f"  {did}: {title[:50]} ({len(frames)} frames)")

Path("audit_out.txt").write_text("\n".join(lines), encoding="utf-8")
print("done", len(lines), "lines")
