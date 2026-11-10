#!/usr/bin/env python3
"""修复8条白板动画纯文字/机制缺失问题场次"""
from pathlib import Path

HTML = Path("mengxing-prototype-v1.html")
html = HTML.read_text(encoding="utf-8")
count = 0

def replace_once(old, new, label):
    global html, count
    if old in html:
        html = html.replace(old, new, 1)
        count += 1
        print(f"  OK: {label}")
    else:
        print(f"  MISS: {label} — 未找到，跳过")

# ── QI-11 场2：极性 vs 选择两栏对比 ───────────────────────────
replace_once(
    """  { pause:3900, cap:'极性问句答 Yes/No；选择问句选一个。', svg:
      wbT(255,104,'Do you like tea? — Yes.',24,WB_INK)
    + wbT(280,196,'Do you want tea or juice?',24,WB_INK)
    + wbT(280,252,'— Juice, please.',24,WB_GREEN)
    + wbT(280,318,'答法先由图式定',20,'#8a93a5') },""",
    """  { pause:3900, cap:'极性问句答 Yes/No；选择问句选一个——答法由图式决定。', svg:
      wbT(280,46,'两种问句，两种答法',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + wbT(130,110,'极性问句',19,WB_BLUE,'middle',1)
    + '<path class="wbd" d="M54,130 L206,130 L206,194 L54,194 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(130,166,'Do you like tea?',17,WB_INK,'middle',1)
    + '<path class="wbd" d="M54,206 L206,206 L206,246 L54,246 Z" fill="none" stroke="'+WB_GREEN+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(130,232,'Yes / No',19,WB_GREEN,'middle',1)
    + wbT(130,274,'答事实',16,'#8a93a5','middle',1)
    + wbT(430,110,'选择问句',19,WB_RED,'middle',1)
    + '<path class="wbd" d="M354,130 L506,130 L506,194 L354,194 Z" fill="none" stroke="'+WB_RED+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(430,154,'tea',19,WB_INK,'middle',1)
    + wbT(430,178,'or juice?',19,WB_INK,'middle',1)
    + '<path class="wbd" d="M354,206 L506,206 L506,246 L354,246 Z" fill="none" stroke="'+WB_GREEN+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(430,232,'Juice, please.',18,WB_GREEN,'middle',1)
    + wbT(430,274,'选其中一项',16,'#8a93a5','middle',1)
    + '<path class="wbd" d="M240,180 L318,180" stroke="'+WB_INK+'" stroke-width="2.4" stroke-linecap="round"/>'
    + wbT(280,340,'图式不同，答法就不同',19,WB_ORANGE,'middle',1) },""",
    "QI-11 场2"
)

# ── QI-11 场3：动作选项框 ───────────────────────────────────────
replace_once(
    """  { pause:3900, cap:'选项是动作时，同样选一项，可以带完整句。', svg:
      wbT(280,110,'Shall we walk or take a bus?',25,WB_INK)
    + wbT(280,216,"— Let's walk.",26,WB_GREEN)
    + wbTickMark(96,206,1)
    + wbT(280,292,'选了「走路」这一项',20,'#8a93a5') },""",
    """  { pause:3900, cap:'选项是动作时，同样选一项，可以带完整句。', svg:
      wbT(280,46,'Shall we walk or take a bus?',24,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + '<path class="wbd" d="M56,110 L224,110 L224,174 L56,174 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="3" stroke-linejoin="round"/>'
    + wbT(140,148,'walk',26,WB_BLUE,'middle',1)
    + '<path class="wbd" d="M336,110 L504,110 L504,174 L336,174 Z" fill="none" stroke="'+WB_INK+'" stroke-width="2.6" stroke-linejoin="round"/>'
    + wbT(420,148,'take a bus',22,WB_INK,'middle',1)
    + wbT(280,148,'or',22,WB_ORANGE,'middle',1)
    + '<path class="wbd" d="M140,178 L140,228" stroke="'+WB_GREEN+'" stroke-width="3.4" stroke-linecap="round"/>'
    + '<path class="wbd" d="M128,220 L140,236 L152,220" fill="none" stroke="'+WB_GREEN+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<path class="wbd" d="M56,244 L224,244 L224,296 L56,296 Z" fill="none" stroke="'+WB_GREEN+'" stroke-width="3" stroke-linejoin="round"/>'
    + wbT(140,275,"Let's walk.",20,WB_GREEN,'middle',1)
    + wbT(280,340,'选了走路这项，答出完整句',19,'#8a93a5','middle',1) },""",
    "QI-11 场3"
)

# ── QI-14 场2：台阶图贯穿 ──────────────────────────────────────
replace_once(
    """  { pause:3600, cap:'一级整句背，二级换疑问词——倒装还没长好。', svg:
      wbT(170,140,"What's this?",26,WB_INK)
    + wbT(170,196,'一级 · 整句模仿',20,WB_BLUE)
    + wbT(390,140,'Where the dog?',26,WB_INK)
    + wbT(390,196,'二级 · 换词前置',20,WB_BLUE)
    + wbT(280,292,'第二句不是错句，是台阶上的标本',20,'#8a93a5') },""",
    """  { pause:3600, cap:'一级整句背，二级换疑问词——倒装还没长好。', svg:
      wbT(280,46,'台阶一·二',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M60,320 L160,320 L160,248 L260,248 L260,176 L500,176" fill="none" stroke="'+WB_INK+'" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
    + wbKid(105,306,1.0)
    + '<path class="wbd" d="M68,224 L252,224 L252,268 L68,268 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(160,252,"What's this?",20,WB_BLUE,'middle',1)
    + wbT(130,290,'一级 · 整句',16,WB_BLUE,'middle',1)
    + '<path class="wbd" d="M268,152 L492,152 L492,196 L268,196 Z" fill="none" stroke="'+WB_ORANGE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(380,178,'Where the dog?',20,WB_ORANGE,'middle',1)
    + wbT(380,214,'二级 · 换词前置',16,WB_ORANGE,'middle',1)
    + wbT(280,340,'二级句不是错，是发展中的台阶',18,'#8a93a5','middle',1) },""",
    "QI-14 场2"
)

# ── QI-14 场3：台阶三·四 ──────────────────────────────────────
replace_once(
    """  { pause:3600, cap:'三级一般问句倒装，四级特殊问句全倒装。', svg:
      wbT(170,140,'Can you swim?',26,WB_INK)
    + wbT(170,196,'三级 · 一般问句倒装',20,WB_BLUE)
    + wbT(390,140,'Where is the dog?',26,WB_INK)
    + wbT(390,196,'四级 · 全倒装',20,WB_BLUE)
    + wbStar(280,272) },""",
    """  { pause:3600, cap:'三级一般问句倒装，四级特殊问句全倒装。', svg:
      wbT(280,46,'台阶三·四',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M60,320 L160,320 L160,248 L260,248 L260,176 L360,176 L360,104 L500,104" fill="none" stroke="'+WB_INK+'" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
    + wbKid(105,306,1.0)
    + '<path class="wbd" d="M68,224 L252,224 L252,268 L68,268 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="2.6" stroke-linejoin="round"/>'
    + wbT(160,252,'Can you swim?',18,WB_BLUE,'middle',1)
    + wbT(130,290,'三级 · 助动词前置',15,WB_BLUE,'middle',1)
    + '<path class="wbd" d="M268,152 L492,152 L492,196 L268,196 Z" fill="none" stroke="'+WB_ORANGE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(380,178,'Where is the dog?',19,WB_ORANGE,'middle',1)
    + wbT(380,214,'四级 · 疑问词+倒装全到位',15,WB_ORANGE,'middle',1)
    + wbStar(430,92) + wbT(430,100,'达标',20,WB_GREEN,'middle',1)
    + wbT(280,342,'四级全倒装：疑问词跑到最前，助动词跟着移',17,'#8a93a5','middle',1) },""",
    "QI-14 场3"
)

# ── GR-38 场2：替换跑题撇号内容 → 三种合法修法 ──────────────────
replace_once(
    """  { cap:'撇号有两份工作：表所属、表省略。', svg:
      cjT(280,48,'撇号的两份工作',27,CJ_INK,'middle',1)
    + cjBox(56,110,200,120,CJ_BLUE)
    + cjT(156,148,"Tom's book",21,CJ_INK,'middle',1)
    + cjT(156,190,'所属：汤姆的书',16,CJ_BLUE,'middle',1)
    + cjBox(304,110,200,120,CJ_ORANGE)
    + cjT(404,148,"it's = it is",21,CJ_INK,'middle',1)
    + cjT(404,190,'省略：省掉一个字母',16,CJ_ORANGE,'middle',1)
    + cjT(280,286,'一个小撇号，干两份活',18,CJ_INK)
    + cjT(280,322,'its（它的）没有撇号，别混',16,CJ_RED) },""",
    """  { cap:'三种粗钩：换句号分家、换分号、加连词——任选一种都稳。', svg:
      cjT(280,44,'三种粗钩，各个稳当',26,CJ_INK,'middle',1)
    + '<path class="cjwbd" d="M30,310 L530,310" stroke="'+CJ_GREY+'" stroke-width="2.6" stroke-linecap="round"/>'
    + cjCard(28,96,152,52,'It rained.',16,CJ_BLUE)
    + cjCard(380,96,152,52,'I stayed.',16,CJ_GREEN)
    + cjBox(190,96,180,52,CJ_GREEN) + cjT(280,128,'.',30,CJ_GREEN,'middle',1)
    + cjT(280,170,'换句号：分成两句，各自站稳',16,CJ_GREEN,'middle',1)
    + cjCard(28,196,152,52,'It rained.',16,CJ_BLUE)
    + cjCard(380,196,152,52,'I stayed.',16,CJ_GREEN)
    + cjBox(190,196,180,52,CJ_BLUE) + cjT(280,228,';',26,CJ_ORANGE,'middle',1)
    + cjT(280,270,'换分号：两句紧连，桥墩稳固',16,CJ_ORANGE,'middle',1)
    + cjCard(28,296,152,52,'It rained.',16,CJ_BLUE)
    + cjCard(380,296,152,52,'I stayed.',16,CJ_GREEN)
    + cjBox(190,296,180,52,CJ_ORANGE) + cjT(280,328,', so',20,CJ_ORANGE,'middle',1)
    + cjT(280,366,'加连词：逗号+连词，双保险',16,CJ_ORANGE,'middle',1) },""",
    "GR-38 场2"
)

# ── PR-05 场3：左叉右勾对比 ────────────────────────────────────
replace_once(
    """  { pause:300, cap:'格子少也有红利：不用分咱和我们，省下的力气花在格和指代上。', svg:
      wbT(280,56,'素颜的好处',27,WB_INK,'middle',1)
    + '<path class="wbd" d="M280,108 L280,262 M222,272 L338,272 M148,124 L412,124" fill="none" stroke="'+WB_INK+'" stroke-width="3" stroke-linecap="round"/>'
    + '<path class="wbd" d="M148,124 L116,178 L180,178 Z" fill="none" stroke="'+WB_INK+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + '<path class="wbd" d="M412,124 L380,178 L444,178 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(148,214,'不用记的格子',17,WB_INK)
    + wbT(412,214,'格 · 指代',18,WB_BLUE,'middle',1)
    + wbT(280,326,'力气省下来，花在刀刃上',19,WB_ORANGE) },""",
    """  { pause:300, cap:'格子少有红利：汉语要记的英语全省了，省下来学格和指代。', svg:
      wbT(280,46,'不用记 → 省下学这些',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + wbT(130,100,'不用记（省了）',17,WB_INK,'middle',1)
    + '<path class="wbd" d="M50,116 L210,116 L210,152 L50,152 Z" fill="none" stroke="#c9d2e0" stroke-width="2.4" stroke-linejoin="round"/>'
    + wbT(130,139,'咱们 / 我们',16,'#8a93a5','middle',1)
    + wbCross(220,138,0.72)
    + '<path class="wbd" d="M50,160 L210,160 L210,196 L50,196 Z" fill="none" stroke="#c9d2e0" stroke-width="2.4" stroke-linejoin="round"/>'
    + wbT(130,183,'您（敬称）',16,'#8a93a5','middle',1)
    + wbCross(220,182,0.72)
    + '<path class="wbd" d="M50,204 L210,204 L210,240 L50,240 Z" fill="none" stroke="#c9d2e0" stroke-width="2.4" stroke-linejoin="round"/>'
    + wbT(130,227,'双数标记',16,'#8a93a5','middle',1)
    + wbCross(220,226,0.72)
    + wbT(390,100,'省下来学这些',17,WB_BLUE,'middle',1)
    + '<path class="wbd" d="M330,116 L510,116 L510,152 L330,152 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(420,139,'I / me / my',17,WB_BLUE,'middle',1)
    + wbTickMark(322,142,0.78)
    + '<path class="wbd" d="M330,160 L510,160 L510,196 L330,196 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(420,183,'he / she / it',17,WB_BLUE,'middle',1)
    + wbTickMark(322,186,0.78)
    + '<path class="wbd" d="M330,204 L510,204 L510,240 L330,240 Z" fill="none" stroke="'+WB_BLUE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(420,227,'they / them',17,WB_BLUE,'middle',1)
    + wbTickMark(322,230,0.78)
    + wbT(280,300,'左边省的力气，全用在右边',18,WB_ORANGE,'middle',1) },""",
    "PR-05 场3"
)

# ── QI-03 场3：演变路径箭头 ────────────────────────────────────
replace_once(
    """  { pause:2300, cap:'问「凭什么」，who 变成 why——原因就是「靠什么造成的」。', svg:
      wbKid(130,220,1.2)
    + wbT(330,170,'Why are you crying?',26,WB_INK)
    + wbT(330,238,'老义：凭什么（造成的）',21,WB_ORANGE)
    + wbT(330,286,'问原因，就是问靠什么造成',20,'#8a93a5') },""",
    """  { pause:2300, cap:'who 变成 why：「凭什么」→「靠什么造成的」→「为什么」。', svg:
      wbT(280,46,'化石里的演变路径',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + '<path class="wbd" d="M56,116 L184,116 L184,160 L56,160 Z" fill="none" stroke="'+WB_INK+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(120,144,'凭什么？',20,WB_INK,'middle',1)
    + wbT(120,178,'古义：依靠',15,'#8a93a5','middle',1)
    + '<path class="wbd" d="M188,138 C220,130 248,130 276,138 M276,138 l-14,-2 M276,138 l-4,-12" stroke="'+WB_INK+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
    + '<path class="wbd" d="M284,116 L456,116 L456,160 L284,160 Z" fill="none" stroke="'+WB_ORANGE+'" stroke-width="2.8" stroke-linejoin="round"/>'
    + wbT(370,135,'靠什么造成的？',17,WB_ORANGE,'middle',1)
    + wbT(370,156,'原因方向',13,'#8a93a5','middle',1)
    + '<path class="wbd" d="M370,164 L370,208" stroke="'+WB_ORANGE+'" stroke-width="3" stroke-linecap="round"/>'
    + '<path class="wbd" d="M358,200 L370,216 L382,200" fill="none" stroke="'+WB_ORANGE+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<path class="wbd" d="M284,224 L456,224 L456,268 L284,268 Z" fill="none" stroke="'+WB_GREEN+'" stroke-width="3" stroke-linejoin="round"/>'
    + wbT(370,252,'why = 为什么',22,WB_GREEN,'middle',1)
    + wbT(370,286,'现代用法',14,'#8a93a5','middle',1)
    + wbT(280,330,'凭→靠什么造成→为什么，化石保留了全程',16,'#8a93a5','middle',1) },""",
    "QI-03 场3"
)

# ── QI-12 场2：事实锚赢了（真不喜欢→No）─────────────────────
replace_once(
    """  { pause:2800, cap:'真不喜欢，按事实答 No——还要把句子补全。', svg:
      wbT(280,120,"— Don't you like it?",26,WB_INK)
    + wbT(280,232,"— No, I don't.",28,WB_GREEN,1,1)
    + wbTickMark(96,222,1)
    + wbT(280,300,'事实极性 + 补全句，最稳妥',20,'#8a93a5') },""",
    """  { pause:2800, cap:'真不喜欢，按事实答 No——事实锚赢了，不管问句怎么说。', svg:
      wbT(280,46,'事实锚赢了',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + wbT(280,112,"— Don't you like it?",24,WB_INK,'middle',1)
    + '<circle class="wbd" cx="130" cy="192" r="7" fill="none" stroke="'+WB_BLUE+'" stroke-width="3"/>'
    + '<path class="wbd" d="M130,168 L130,182 M116,192 L144,192" stroke="'+WB_BLUE+'" stroke-width="3" stroke-linecap="round"/>'
    + wbT(130,148,'事实锚',19,WB_BLUE,'middle',1)
    + wbT(130,224,'（真不喜欢）',15,'#8a93a5','middle',1)
    + '<path class="wbd" d="M180,192 C230,180 280,172 328,180 M328,180 l-13,2 M328,180 l-2,-13" stroke="'+WB_BLUE+'" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    + '<path class="wbd" d="M340,168 L460,168 L460,212 L340,212 Z" fill="none" stroke="'+WB_GREEN+'" stroke-width="3" stroke-linejoin="round"/>'
    + wbT(400,194,"No, I don't.",20,WB_GREEN,'middle',1)
    + wbTickMark(338,192,0.75)
    + '<circle class="wbd" cx="130" cy="282" r="7" fill="none" stroke="'+WB_ORANGE+'" stroke-width="3"/>'
    + '<path class="wbd" d="M130,258 L130,272 M116,282 L144,282" stroke="'+WB_ORANGE+'" stroke-width="3" stroke-linecap="round"/>'
    + wbT(130,244,'认同锚',19,WB_ORANGE,'middle',1)
    + wbT(130,308,'（想点头）',15,'#8a93a5','middle',1)
    + '<path class="wbd" d="M176,282 C210,296 240,312 272,312" stroke="#c9d2e0" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-dasharray="8 6"/>'
    + wbT(280,340,'事实说不喜欢，就跟事实走：No',18,WB_ORANGE,'middle',1) },""",
    "QI-12 场2"
)

# ── QI-12 场3：事实锚赢了（其实喜欢→Yes）────────────────────
replace_once(
    """  { pause:2800, cap:'其实喜欢，就按事实答 Yes——和汉语点头正相反。', svg:
      wbT(280,120,"— Don't you like it?",26,WB_INK)
    + wbT(280,232,'— Yes, I do.',28,WB_GREEN,1,1)
    + wbTickMark(108,222,1)
    + wbT(280,300,'按事实答，不按对方的话答',20,'#8a93a5') },""",
    """  { pause:2800, cap:'其实喜欢，就按事实答 Yes——和汉语「点头」正相反。', svg:
      wbT(280,46,'事实锚赢了（方向相反）',26,WB_INK,'middle',1)
    + '<path class="wbd" d="M120,74 C220,82 340,82 445,72" stroke="'+WB_ORANGE+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
    + wbT(280,112,"— Don't you like it?",24,WB_INK,'middle',1)
    + '<circle class="wbd" cx="130" cy="192" r="7" fill="none" stroke="'+WB_BLUE+'" stroke-width="3"/>'
    + '<path class="wbd" d="M130,168 L130,182 M116,192 L144,192" stroke="'+WB_BLUE+'" stroke-width="3" stroke-linecap="round"/>'
    + wbT(130,148,'事实锚',19,WB_BLUE,'middle',1)
    + wbT(130,224,'（其实喜欢）',15,'#8a93a5','middle',1)
    + '<path class="wbd" d="M180,192 C230,180 280,172 328,180 M328,180 l-13,2 M328,180 l-2,-13" stroke="'+WB_BLUE+'" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    + '<path class="wbd" d="M340,168 L460,168 L460,212 L340,212 Z" fill="none" stroke="'+WB_GREEN+'" stroke-width="3" stroke-linejoin="round"/>'
    + wbT(400,194,'Yes, I do.',21,WB_GREEN,'middle',1)
    + wbTickMark(338,192,0.75)
    + '<circle class="wbd" cx="130" cy="282" r="7" fill="none" stroke="'+WB_ORANGE+'" stroke-width="2.4" stroke-dasharray="6 4"/>'
    + '<path class="wbd" d="M130,258 L130,272 M116,282 L144,282" stroke="'+WB_ORANGE+'" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="6 4"/>'
    + wbT(130,244,'认同锚',18,'#c9d2e0','middle',1)
    + wbT(130,308,'（想摇头）',15,'#c9d2e0','middle',1)
    + '<path class="wbd" d="M176,282 C210,268 250,260 288,264" stroke="#c9d2e0" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="6 5"/>'
    + wbT(400,282,'汉语：摇头=No',16,'#c9d2e0','middle',1)
    + wbCross(338,284,0.6)
    + wbT(280,340,'事实喜欢，就跟事实走：Yes，不管汉语怎么想',16,WB_ORANGE,'middle',1) },""",
    "QI-12 场3"
)

HTML.write_text(html, encoding="utf-8")
print(f"\n完成：{count}/9 处替换成功")
