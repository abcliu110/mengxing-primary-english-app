#!/usr/bin/env python3
"""
为三条规律插入机制可视化场景：
1. QI-04「倒装提问」：助动词从句中位置飞到句首的动画场景
2. PR-07「主语代词」：汉语省主语 vs 英语必须有主语的对比
3. GR-11「因果只搭一座桥」：两座桥同时出现然后一座消失
每条都在原第 1 场之后插入新机制场，原 2-4 场后移。
"""
from pathlib import Path

HTML = Path("mengxing-prototype-v1.html")
html = HTML.read_text(encoding="utf-8")

# ════════════════════════════════════════════════════════════════
# QI-04：助动词「飞出去」动画场景
# 原：标题场 → 例子场 → 时态场 → 病例场
# 新：标题场 → 【机制场：助动词移位】→ 例子场 → 时态场 → 病例场
# ════════════════════════════════════════════════════════════════

QI04_OLD = """  { pause:3600, cap:'被喊出来的，永远是排第一的那个助动词。', svg:"""

QI04_MECH = """  { pause:4200, cap:'机制：助动词从中间的位置「跳」到句首，陈述句就变成了问句。', svg:
      wbT(280,46,'陈述句变问句：助动词跳出来',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + wbT(280,112,'陈述句',17,WB_INK,'middle',1)
    + '<rect class="wbd" x="58" y="128" width="82" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + '<rect class="wbd" x="156" y="128" width="82" height="44" rx="10" fill="none" stroke="'+WB_RED+'" stroke-width="3.4"/>'
    + '<rect class="wbd" x="254" y="128" width="82" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + '<rect class="wbd" x="352" y="128" width="100" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + wbT(99,156,'She',22,WB_INK,'middle',1)
    + wbT(197,156,'has',22,WB_RED,'middle',1)
    + wbT(295,156,'got',22,WB_INK,'middle',1)
    + wbT(402,156,'a pet.',22,WB_INK,'middle',1)
    + '<path class="wbd" d="M197,124 C197,80 100,56 76,88" fill="none" stroke="'+WB_RED+'" stroke-width="3.2" stroke-linecap="round"/>'
    + '<path class="wbd" d="M68,80 L80,96 L92,80" fill="none" stroke="'+WB_RED+'" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
    + wbT(280,228,'问句',17,WB_INK,'middle',1)
    + '<rect class="wbd" x="58" y="244" width="100" height="44" rx="10" fill="none" stroke="'+WB_RED+'" stroke-width="3.4"/>'
    + '<rect class="wbd" x="174" y="244" width="82" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + '<rect class="wbd" x="272" y="244" width="82" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + '<rect class="wbd" x="370" y="244" width="100" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + wbT(108,268,'Has',22,WB_RED,'middle',1)
    + wbT(215,268,'she',22,WB_INK,'middle',1)
    + wbT(313,268,'got',22,WB_INK,'middle',1)
    + wbT(420,268,'a pet?',22,WB_INK,'middle',1)
    + wbT(280,340,'has 从第 2 格跳到第 1 格，问句就成了',19,'#8a93a5','middle',1) },
"""

if QI04_OLD in html:
    html = html.replace(QI04_OLD, QI04_MECH + QI04_OLD, 1)
    print("QI-04 机制场已插入")
else:
    print("WARNING: QI-04 插入点未找到")

# ════════════════════════════════════════════════════════════════
# PR-07：汉英对比场景——汉语主语可省，英语空主语位闪红
# 在第 2 场（动词身上残迹那场）之后插入
# ════════════════════════════════════════════════════════════════

PR07_OLD = """  { pause:1400, cap:'省掉主语，句子就像没挂牌子的车——动词还在，也认不出谁在开。', svg:"""

PR07_MECH = """  { pause:3800, cap:'汉语：主语可以省（大家知道是谁）。英语：主语位必须有人站，空着不行。', svg:
      wbT(280,46,'主语：可以省 vs 必须有',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + wbT(130,110,'汉语',19,WB_BLUE,'middle',1)
    + wbT(130,160,'吃了吗？',26,WB_INK,'middle',1)
    + '<rect class="wbd" x="58" y="140" width="145" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + wbT(130,222,'主语空着',16,'#8a93a5','middle',1)
    + wbT(130,254,'没问题 ✓',17,WB_BLUE,'middle',1)
    + '<path class="wbd" d="M240,200 L320,200" stroke="'+WB_INK+'" stroke-width="2.6" stroke-linecap="round"/>'
    + wbT(430,110,'英语',19,WB_RED,'middle',1)
    + '<rect class="wbd" x="338" y="140" width="80" height="44" rx="10" fill="none" stroke="'+WB_RED+'" stroke-width="3.4" stroke-dasharray="8 5"/>'
    + wbT(378,168,'???',22,WB_RED,'middle',1)
    + wbT(480,152,'ate?',26,WB_INK,'middle',1)
    + '<rect class="wbd" x="454" y="140" width="68" height="44" rx="10" fill="none" stroke="'+WB_INK+'" stroke-width="2.8"/>'
    + wbT(430,222,'主语缺席',16,WB_RED,'middle',1)
    + wbT(430,254,'不成句 ✗',17,WB_RED,'middle',1)
    + wbT(280,314,'英语动词身上标记太少，靠主语小词来告诉听者「谁在做」',16,'#8a93a5','middle',1)
    + wbT(280,348,'所以主语位不能空着',18,WB_BLUE,'middle',1) },
"""

if PR07_OLD in html:
    html = html.replace(PR07_OLD, PR07_MECH + PR07_OLD, 1)
    print("PR-07 机制场已插入")
else:
    print("WARNING: PR-07 插入点未找到")

# ════════════════════════════════════════════════════════════════
# GR-11：两座桥碰撞动画——用 CJ 系的绘图工具
# 在第 2 场（汉语成对习惯）之后插入
# ════════════════════════════════════════════════════════════════

GR11_OLD = """  { cap:'两座桥一起架会相撞，只留一座才通。', svg:"""

GR11_MECH = """  { cap:'看这个病句：because 和 so 两座桥同时架上——两端都是「结论方向」，河里撞车了。', svg:
      cjT(280,42,'两座桥同时架，方向撞了',26,CJ_INK,'middle',1)
    + '<path class="cjwbd" d="M30,310 L530,310" stroke="'+CJ_GREY+'" stroke-width="2.6" stroke-linecap="round"/>'
    + cjCard(30,220,160,56,'it rained',17,CJ_BLUE)
    + cjCard(380,220,148,56,'I stayed home',16,CJ_GREEN)
    + cjBox(190,220,170,56,CJ_ORANGE)
    + cjT(275,254,'because ... so',16,CJ_ORANGE,'middle',1)
    + '<path class="cjwbd" d="M60,220 C90,160 140,148 190,168" fill="none" stroke="'+CJ_BLUE+'" stroke-width="3"/>'
    + '<path class="cjwbd" d="M370,220 C340,160 290,148 240,168" fill="none" stroke="'+CJ_ORANGE+'" stroke-width="3"/>'
    + '<path class="cjwbd" d="M360,220 C380,160 420,148 450,168" fill="none" stroke="'+CJ_GREEN+'" stroke-width="3"/>'
    + '<path class="cjwbd" d="M218,160 L238,160 M230,148 L230,172" stroke="'+CJ_RED+'" stroke-width="4" stroke-linecap="round"/>'
    + cjT(280,355,'两个连词都在指引方向，读者不知道听谁的',16,CJ_RED,'middle',1) },
"""

if GR11_OLD in html:
    html = html.replace(GR11_OLD, GR11_MECH + GR11_OLD, 1)
    print("GR-11 机制场已插入")
else:
    print("WARNING: GR-11 插入点未找到")

HTML.write_text(html, encoding="utf-8")
print("\n完成。")
