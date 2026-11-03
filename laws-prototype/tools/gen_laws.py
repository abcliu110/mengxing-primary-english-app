#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_laws.py — 单一数据源「切换」阶段 2 的生成器：规律数据生成化 + LAWDATA 降指针。

事实源
  - laws-prototype/model/laws_master.json（规律总表：yaml / lawdata / zone 三分仓 + ruling）
  - laws-prototype/model/morph_data.json（词根区事实源，LAWREG 在此维护，字面量由 gen_morph.py 生成）

生成目标（全部写回主文件 mengxing-prototype-v1.html 的内嵌字面量）
  1. 代词区 PN：LAWS / PN_EXTRA / PN_ADULT / TOPIC / GROUPS 字面量
     —— NEW-P1–P4 按裁定立条 PR-12–PR-15（改号、去 cand 候选标记、状态文案转正、
        PR-15 附 pending_fix：练习「否定句→any」绝对口径改倾向说法）。
  2. 冠词区 AR：LAWS / AR_EXTRA / AR_ADULT 字面量 —— 无裁定变化，必须逐字节复现（零差异证明）。
  3. 连词区 CJ：LAWS / TOPIC 字面量 + CJWB_SECTIONS 代码字面量手术 + 渲染器徽标逻辑
     —— NEW-CJ02→GR-46（附 pending_fix「只有七个」改口径）、NEW-CJ04→GR-47、
        NEW-CJ05+06 合并立条 GR-48、NEW-CJ10+11 合并立条 GR-49、NEW-CJ07+12 合并立条 GR-50、
        NEW-CJ08 并入 GR-32 保留呈现位、NEW-CJ03/09 并入 GR-38 保留呈现位、NEW-CJ01 转区导引。
  4. 词根区 LAWREG（经 morph_data.json + gen_morph.py 两文件同步生成）
     —— NEW-C 并入 S-21（保留呈现位 _role='presentation'）、NEW-T 立条 S-44；
        morph DATA 页 if-past / if-plural 的 laws 引用 NEW-T→S-44 同步改名。
  5. LAWDATA 降指针：67 条双户口规律（代词 29 / 冠词 21 / 词根 14 / 连词 3）改为指针记录
     {id, ptr:{zone,id}, g, zone, aud, mech, quiz, prb}——保留复习引擎 buildPool 所读的
     全部字段（池构成逐项不变），页面渲染字段下线（独有内容已在总表 lawdata 分仓保全）；
     LAW.open 增加 ptr 跳转分支（代词 PN.go / 冠词 AR.go / 连词 CJ.go / 词根 MZ.openLaw），
     词根区 IIFE 末尾补 window.MZ 导出（与 PN/AR/CJ 同构）。

纪律
  - 差异有且仅有裁定引起的变化：生成器内含硬断言（冠词区逐字节零差异、未受裁定条目
    深相等、指针保留字段与总表 lawdata 分仓深相等、改名/合并不越界），任一断言失败即停。
  - 文案修正均为锚定精确串替换（old 必须恰好出现 1 次；已应用状态下 old 缺席且 new 在场才放行）。

用法
  python3 laws-prototype/tools/gen_laws.py --check   # 稳态校验：现行文件 == 生成结果（逐字节）
  python3 laws-prototype/tools/gen_laws.py --write   # 生成并写回（先改 morph 事实源并跑 gen_morph，
                                                     # 再重定位跨度写主文件；写前在内存中完成全部断言）
退出码：0=通过；1=断言失败/不一致；2=用法错误。
"""
import copy
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # laws-prototype/
MAIN = ROOT / "mengxing-prototype-v1.html"
MORPH_PAGE = ROOT / "morphology-prototype-v1.html"
MASTER = ROOT / "model" / "laws_master.json"
MORPH_DATA = ROOT / "model" / "morph_data.json"
GEN_MORPH = ROOT / "tools" / "gen_morph.py"
CHECK_MORPH = ROOT / "tools" / "check_morph_sync.py"

JD = lambda o: json.dumps(o, ensure_ascii=False)  # 默认分隔符 — 已验证为各区字面量的字节格式
JDC = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))  # morph_data.json 字节格式

# 生成标记（规范 §3.1）：本生成器管理的字面量前各一行；--check 两侧先剥标记再比
# （标记不属于生成内容），--write 确保标记存在。
MARKER = "/* GENERATED: tools/gen_laws.py ← model/laws_master.json · DO NOT EDIT */"
MARKER_RE = re.compile(r"^\s*/\* GENERATED: tools/gen_\w+\.py ← model/\S+ · DO NOT EDIT \*/\s*$")
LAW_MARK_SPOTS = [  # (块签名, 块内锚点)
    ("var LAWFLAG", "var LAWDATA="),
    ("window.PN", "var LAWS ="), ("window.PN", "var PN_EXTRA ="),
    ("window.PN", "var PN_ADULT ="), ("window.PN", "var TOPIC ="),
    ("window.PN", "var GROUPS ="),
    ("window.AR", "var LAWS ="), ("window.AR", "var AR_EXTRA ="),
    ("window.AR", "var AR_ADULT ="),
    ("window.CJ", "var LAWS ="), ("window.CJ", "var TOPIC ="),
    ("window.CJ", "var EXTRA_TOP ="), ("window.CJ", "var CJWB_SECTIONS ="),
]


def strip_markers(text):
    return "\n".join(ln for ln in text.split("\n") if not MARKER_RE.match(ln))


def ensure_law_markers(text):
    idxs = []
    for sig, anchor in LAW_MARK_SPOTS:
        s, e = find_block(text, sig)
        idxs.append(text.index(anchor, s, e))
    for a in sorted(idxs, reverse=True):
        ls = text.rfind("\n", 0, a) + 1
        if ls > 0:
            prev_start = text.rfind("\n", 0, ls - 1) + 1
            if text[prev_start:ls - 1].strip() == MARKER:
                continue
        indent = text[ls:a]
        if indent.strip():
            indent = ""
        text = text[:ls] + indent + MARKER + "\n" + text[ls:]
    return text

DIFFS = []  # (范围, 条目, 字段, 旧值, 新值)


def diff(scope, item, field, old, new):
    def t(v):
        s = v if isinstance(v, str) else json.dumps(v, ensure_ascii=False)
        return s if len(s) <= 110 else s[:107] + "…"
    DIFFS.append((scope, item, field, t(old), t(new)))


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


# ---------------------------------------------------------------- 字面量定位
def scan_literal(text, i):
    """从 i 起扫描一个 JS 字面量（{} / [] / 字符串），返回结束下标（不含）。"""
    c0 = text[i]
    if c0 in "\"'`":
        q = c0
        i += 1
        while i < len(text):
            c = text[i]
            if c == "\\":
                i += 2
                continue
            if c == q:
                return i + 1
            i += 1
        raise ValueError("unterminated string")
    cl = {"[": "]", "{": "}"}[c0]
    depth = 0
    instr = False
    esc = False
    q = ""
    while i < len(text):
        c = text[i]
        if instr:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == q:
                instr = False
        else:
            if c in "\"'`":
                instr = True
                q = c
            elif c == c0:
                depth += 1
            elif c == cl:
                depth -= 1
                if depth == 0:
                    return i + 1
        i += 1
    raise ValueError("unbalanced literal")


def script_blocks(text):
    return [(m.start(1), m.end(1)) for m in re.finditer(r"<script>(.*?)</script>", text, re.S)]


def find_block(text, signature):
    for s, e in script_blocks(text):
        if signature in text[s:e]:
            return (s, e)
    fail(f"找不到含签名 {signature!r} 的 script 块")


def extract_in(text, block, marker):
    s, e = block
    seg = text[s:e]
    i = seg.index(marker) + len(marker)
    while seg[i] in " \t\n":
        i += 1
    end = scan_literal(seg, i)
    lit = seg[i:end]
    return (s + i, s + end, lit)


def parse_lit(lit):
    return json.loads(lit)


# ---------------------------------------------------------------- 通用小工具
def get_path(obj, path):
    for part in re.findall(r"[^.\[\]]+|\[\d+\]", path):
        obj = obj[int(part[1:-1])] if part.startswith("[") else obj[part]
    return obj


def set_path(obj, path, value):
    parts = re.findall(r"[^.\[\]]+|\[\d+\]", path)
    for part in parts[:-1]:
        obj = obj[int(part[1:-1])] if part.startswith("[") else obj[part]
    last = parts[-1]
    if last.startswith("["):
        obj[int(last[1:-1])] = value
    else:
        obj[last] = value


def apply_text_fix(scope, item, entry, path, old, new):
    """锚定文案修正：old 在场→替换并记差异；old 缺席但 new 在场→已应用（稳态）；否则失败。"""
    val = get_path(entry, path)
    if not isinstance(val, str):
        fail(f"{scope}/{item} {path} 不是字符串")
    if old in val:
        if val.count(old) != 1:
            fail(f"{scope}/{item} {path} 锚点出现 {val.count(old)} 次（应为 1）")
        set_path(entry, path, val.replace(old, new))
        diff(scope, item, path, old, new)
    elif new == "" or new in val:
        pass  # 已应用（事实源已更新时）
    else:
        fail(f"{scope}/{item} {path} 锚点缺席且新文案不在场：{val[:80]}")


def walk_strings(x, fn):
    if isinstance(x, str):
        return fn(x)
    if isinstance(x, list):
        return [walk_strings(v, fn) for v in x]
    if isinstance(x, dict):
        return {k: walk_strings(v, fn) for k, v in x.items()}
    return x


def deep_eq(a, b):
    return json.dumps(a, ensure_ascii=False, sort_keys=True) == json.dumps(b, ensure_ascii=False, sort_keys=True)


# ---------------------------------------------------------------- 裁定表
# 代词：NEW-P1–P4 立条 PR-12–PR-15（2026-11-03 Stewart 裁定）
PN_RENAME = {"NEW-P1": "PR-12", "NEW-P2": "PR-13", "NEW-P3": "PR-14", "NEW-P4": "PR-15"}
PN_FIXES = {
    "PR-12": [
        ("formal", "（新拟条目，待与目录对账）", ""),
        ("note", "新拟条目（NEW-P1）：", "本条（PR-12）："),
        ("note", "编号与内容待与目录对账。", "编号 PR-12，2026-11-03 立条。"),
        ("claim", "本条为原型新拟，目录 PR 组暂无定版条目，编号待对账。", "本条已于 2026-11-03 立条为 PR-12。"),
    ],
    "PR-13": [
        ("formal", "（新拟条目，待与目录对账）", ""),
        ("note", "新拟条目（NEW-P2）：", "本条（PR-13）："),
        ("note", "编号与内容待与目录对账。", "编号 PR-13，2026-11-03 立条。"),
        ("claim", "本条为原型新拟，目录暂无定版，编号待对账。", "本条已于 2026-11-03 立条为 PR-13。"),
    ],
    "PR-14": [
        ("formal", "（新拟条目，待与目录对账）", ""),
        ("note", "新拟条目（NEW-P3）：", "本条（PR-14）："),
        ("note", "编号待与目录对账。", "编号 PR-14，2026-11-03 立条。"),
        ("claim", "本条为原型新拟，目录 PR 组暂无专条（相关：QI-02 指示词词族），编号待对账。",
         "本条已于 2026-11-03 立条为 PR-14（相关：QI-02 指示词词族）。"),
    ],
    "PR-15": [  # 附 pending_fix：练习「否定句→any」绝对口径改倾向说法（与 GR-10 立场口径对齐）
        ("formal", "（新拟条目，待与目录对账）", ""),
        ("note", "新拟条目（NEW-P4）：", "本条（PR-15）："),
        ("note", "编号待与目录对账。", "编号 PR-15，2026-11-03 立条。"),
        ("claim", "本条为原型新拟，编号待对账。", "本条已于 2026-11-03 立条为 PR-15。"),
        ("quiz[0].ans", "B. anything——否定句里 any 上岗", "B. anything——否定句里多半派 any 上岗（倾向，不是铁律）"),
    ],
}
PN_TOPIC_SUB = (
    "33 条规律 · 29 条定版（目录 PR 组 + GR-14 + GR-10/GR-13 + QI 全组）+ 4 条新拟（NEW-P1～NEW-P4 · 编号待对账）",
    "33 条规律 · 33 条定版（目录 PR 组 + GR-14 + GR-10/GR-13 + QI 全组 + PR-12～PR-15）",
)
PN_GROUP5_SUB = (
    "物主、反身、指示、不定四家（新拟 NEW-P1～NEW-P4），另收目录定版两条：所有格 's（GR-13，紧跟物主）、some/any 立场（GR-10，紧跟不定）",
    "物主、反身、指示、不定四家（PR-12～PR-15），另收目录定版两条：所有格 's（GR-13，紧跟物主）、some/any 立场（GR-10，紧跟不定）",
)
PN_FOOTER = (
    "原型 · PR/GR/QI 条目正文出自仓库规律目录（laws-prototype/model/laws），状态「入模中」；NEW-P1～NEW-P4 为原型新拟条目（编号待与目录对账），新配的病例句均已标「新拟例句」；呈现层（短标题/分组/动画演示）为原型加工，与目录冲突时以目录为准。",
    "原型 · PR/GR/QI 条目正文出自仓库规律目录（laws-prototype/model/laws）；原 NEW-P1～NEW-P4 已于 2026-11-03 立条为 PR-12～PR-15，新配的病例句均已标「新拟例句」；呈现层（短标题/分组/动画演示）为原型加工，与目录冲突时以目录为准。",
)
# 代词区代码字面量（白板/演示/鸣谢）中的键名改号——锚点含上下文引号型，防止误伤
PN_AUX_EDITS = [
    ("{ id:'NEW-P1',", "{ id:'PR-12',"), ("{ id:'NEW-P2',", "{ id:'PR-13',"),
    ("{ id:'NEW-P3',", "{ id:'PR-14',"), ("{ id:'NEW-P4',", "{ id:'PR-15',"),
    ("'NEW-P1': {", "'PR-12': {"), ("'NEW-P3': {", "'PR-14': {"),  # DEMOS 键
    ("'NEW-P1': '", "'PR-12': '"), ("'NEW-P2': '", "'PR-13': '"),  # WB_CREDIT 键
    ("'NEW-P3': '", "'PR-14': '"), ("'NEW-P4': '", "'PR-15': '"),
]

# 连词：NEW-CJ 处置（2026-11-03 Stewart 裁定，「全部按建议来」）
CJ_RENAME = {"NEW-CJ02": "GR-46", "NEW-CJ04": "GR-47"}
CJ_MERGES = {  # 新条 id: (内容合并顺序, 版位/组别取自哪条)
    "GR-48": (["NEW-CJ05", "NEW-CJ06"], "NEW-CJ05"),
    "GR-49": (["NEW-CJ10", "NEW-CJ11"], "NEW-CJ10"),
    "GR-50": (["NEW-CJ07", "NEW-CJ12"], "NEW-CJ12"),
}
CJ_SLOTS = {"NEW-CJ03": "GR-38", "NEW-CJ09": "GR-38", "NEW-CJ08": "GR-32"}  # 并入保留呈现位（id 不变）
CJ_GUIDE = {"NEW-CJ01"}  # 转区导引（id 不变）
CJ_TOKEN_MAP = {  # 条目正文里对已改号/合并条目的指称同步更新（呈现位/导引 id 不变，不在此表）
    "NEW-CJ02": "GR-46", "NEW-CJ04": "GR-47", "NEW-CJ05": "GR-48", "NEW-CJ06": "GR-48",
    "NEW-CJ07": "GR-50", "NEW-CJ10": "GR-49", "NEW-CJ11": "GR-49", "NEW-CJ12": "GR-50",
}
CJ02_FIXES = [  # GR-46 pending_fix：「只有七个」穷尽断言改小学阶段常用口径
    ("desc", "并列连词只有七个：", "小学阶段常用的并列连词就这七个："),
    ("beats[0].name", "封闭集合，只有七个", "小学阶段常用的，就这七个"),
    ("beats[0].text", "并列连词不多不少就这七个：", "小学阶段常用的并列连词就这七个："),
]
CJ_TOPIC_SUB = (
    "15 条规律 · 目录定版 3 条（GR-11 / GR-32 / GR-38）+ 新拟 12 条（待对账）",
    "12 条 · 目录定版 8 条（GR-11 / GR-32 / GR-38 / GR-46～GR-50）+ 呈现位 3 页（GR-38 ×2 · GR-32 ×1）+ 区导引 1 页（2026-11-03 对账立条）",
)
CJ_EXTRA_TOP_FIX = ("细则见 NEW-CJ03、NEW-CJ09 与 GR-38。", "细则见 GR-38（本区两页呈现：逗号加连词、分号公式）。")
CJ_FOOTER = (
    "原型 · GR-11 / GR-32 / GR-38 的规律正文逐字出自仓库规律目录（laws-prototype/model/laws）；NEW-CJ 共 12 条为新拟（待对账），内容依据公开权威教学资料研究合集（Purdue OWL、Merriam-Webster、Cambridge、British Council、EnglishClub、ThoughtCo、QuillBot、Khan Academy 等）。呈现层文案（短标题 / 一句话 / 分组）为原型加工，与目录冲突时以目录为准。",
    "原型 · GR-11 / GR-32 / GR-38 / GR-46～GR-50 的规律正文出自仓库规律目录（laws-prototype/model/laws，GR-46～GR-50 于 2026-11-03 立条）；NEW-CJ01 为区导引，NEW-CJ03 / NEW-CJ09 为 GR-38 呈现位、NEW-CJ08 为 GR-32 呈现位，内容依据公开权威教学资料研究合集（Purdue OWL、Merriam-Webster、Cambridge、British Council、EnglishClub、ThoughtCo、QuillBot、Khan Academy 等）。呈现层文案（短标题 / 一句话 / 分组）为原型加工，与目录冲突时以目录为准。",
)
# CJ 渲染器徽标/标签逻辑：为 guide / merged 两类新状态让路（isNew 语义不变）
CJ_CODE_EDITS = [
    ("index 徽标",
     "(l.isNew ? ' <span class=\"badge amber\">新拟 · 待对账</span>' : '')",
     "(l.isNew ? ' <span class=\"badge amber\">新拟 · 待对账</span>' : (l.guide ? ' <span class=\"badge amber\">区导引</span>' : (l.merged ? ' <span class=\"badge amber\">并入 ' + l.merged + ' · 呈现位</span>' : '')))"),
    ("规律页徽标",
     "(l.isNew ? ' <span class=\"badge amber\">新拟 · 待对账</span>' : ' <span class=\"badge grey\">目录定版</span>')",
     "(l.isNew ? ' <span class=\"badge amber\">新拟 · 待对账</span>' : (l.guide ? ' <span class=\"badge amber\">区导引</span>' : (l.merged ? ' <span class=\"badge amber\">并入 ' + l.merged + ' · 呈现位</span>' : ' <span class=\"badge grey\">目录定版</span>')))"),
    ("正式说法标签",
     "(l.isNew ? '研究合集原话' : '目录原文')",
     "(l.isNew ? '研究合集原话' : (l.guide ? '导引 · 权威原话' : (l.merged ? '并入呈现 · 研究合集' : '目录原文')))"),
    ("孩子版标签",
     "(l.isNew ? '孩子版说法（新拟）' : '目录里的孩子版说法')",
     "(l.isNew ? '孩子版说法（新拟）' : ((l.guide || l.merged) ? '孩子版说法' : '目录里的孩子版说法'))"),
    ("FANBOYS 插图挂载",
     "if(l.id==='NEW-CJ02'){ h += CJ_ILLUS_FANBOYS; }",
     "if(l.id==='GR-46'){ h += CJ_ILLUS_FANBOYS; }"),
]

# 白板播放器收尾（2026-11-03，v2 复查）：分段播放（segs）＋ per-section pace ＋ 呈现位徽标呈现。
CJ_UI_EDITS = [
    ('呈现位列表徽标',
     'onclick="CJ.go(\\\'\' + l.id + \'\\\')"><span style="flex:1"><span class="tt">\' + esc(l.short) + \'</span> <span class="badge">\' + l.id + \'</span>\'',
     'onclick="CJ.go(\\\'\' + l.id + \'\\\')"><span style="flex:1"><span class="tt">\' + esc(l.short) + \'</span> <span class="badge">\' + (l.merged ? l.merged : l.id) + \'</span>\''),
    ('呈现位页头徽标',
     '<span class="badge">\' + l.id + \'</span> <span class="badge grey">\' + esc(GROUPS[l.group].name.split(\'·\')[1]||\'\') + \'</span>\' + (l.isNew ?',
     '<span class="badge">\' + (l.merged ? l.merged : l.id) + \'</span> <span class="badge grey">\' + esc(GROUPS[l.group].name.split(\'·\')[1]||\'\') + \'</span>\' + (l.isNew ?'),
    ('白板分段条容器',
     '<span id="cjwbCapText">白板老师正在准备……</span></div>\'\n    + \'<div class="cjwb-ctrl">',
     '<span id="cjwbCapText">白板老师正在准备……</span></div>\'\n    + \'<div class="cjwb-segs" id="cjwbSegs"></div>\'\n    + \'<div class="cjwb-ctrl">'),
    ('白板 pace 变量',
     "var els = cjwbS.stage.querySelectorAll('.cjwbd, .cjwbw, .cjwbf');\n  var t = 120;\n  els.forEach(function(el){",
     "var els = cjwbS.stage.querySelectorAll('.cjwbd, .cjwbw, .cjwbf');\n  var t = 120;\n  var P = (cjwbS.sec && cjwbS.sec.pace) || 1;\n  els.forEach(function(el){"),
    ('白板元素时长 pace 缩放',
     "els.forEach(function(el){\n    var type = el.classList.contains('cjwbd') ? 'd' : (el.classList.contains('cjwbw') ? 'w' : 'f');\n    var len = 0, dur;\n    if(type === 'd'){\n      try { len = el.getTotalLength(); } catch(e){ len = 260; }\n      if(!len || !isFinite(len)) len = 260;\n      el.style.strokeDasharray = len;\n      el.style.strokeDashoffset = len;\n      dur = Math.max(240, Math.min(1700, len * 1.5 * 1.35));\n    } else if(type === 'w'){ el.style.opacity = '0'; dur = Math.round(340 * 1.35); }\n    else { el.style.opacity = '0'; dur = Math.round(420 * 1.35); }\n    cjwbS.items.push({ el: el, type: type, len: len, start: t, dur: dur });",
     "els.forEach(function(el){\n    var type = el.classList.contains('cjwbd') ? 'd' : (el.classList.contains('cjwbw') ? 'w' : 'f');\n    var len = 0, dur;\n    if(type === 'd'){\n      try { len = el.getTotalLength(); } catch(e){ len = 260; }\n      if(!len || !isFinite(len)) len = 260;\n      el.style.strokeDasharray = len;\n      el.style.strokeDashoffset = len;\n      dur = Math.max(240, Math.min(1700, len * 1.5 * 1.35));\n    } else if(type === 'w'){ el.style.opacity = '0'; dur = Math.round(340 * 1.35); }\n    else { el.style.opacity = '0'; dur = Math.round(420 * 1.35); }\n    dur = Math.round(dur * P);\n    cjwbS.items.push({ el: el, type: type, len: len, start: t, dur: dur });"),
    ('白板停留 pace 缩放',
     'cjwbS.hold = hold;\n  cjwbS.total = cjwbS.drawTotal + hold;',
     'cjwbS.hold = Math.round(hold * P);\n  cjwbS.total = cjwbS.drawTotal + cjwbS.hold;'),
    ('白板分段停靠',
     'cjwbApplyAt(cjwbS.total);\n    var n = cjwbS.sec.scenes.length;\n    if(cjwbS.scene < n - 1){ cjwbS.scene++; cjwbRenderScene(); cjwbS.startTs = 0; cjwbS.baseElapsed = 0; cjwbS.raf = requestAnimationFrame(cjwbFrame); return; }',
     "cjwbApplyAt(cjwbS.total);\n    var n = cjwbS.sec.scenes.length;\n    var segs = cjwbS.sec.segs || [];\n    for(var gi = 0; gi < segs.length - 1; gi++){\n      if(cjwbS.scene === segs[gi].to - 1){ cjwbStop(); cjwbS.segWait = true; if(cjwbS.btn) cjwbS.btn.textContent = '▶ 下一段：' + segs[gi + 1].name; return; }\n    }\n    if(cjwbS.scene < n - 1){ cjwbS.scene++; cjwbRenderScene(); cjwbS.startTs = 0; cjwbS.baseElapsed = 0; cjwbS.raf = requestAnimationFrame(cjwbFrame); return; }"),
    ('白板下一段续播',
     'function cjwbTogglePlay(){\n  if(!cjwbS.sec) return;\n  if(cjwbS.playing){',
     'function cjwbTogglePlay(){\n  if(!cjwbS.sec) return;\n  if(cjwbS.segWait){ cjwbS.segWait = false; cjwbS.scene++; cjwbRenderScene(); cjwbPlayStart(); return; }\n  if(cjwbS.playing){'),
    ('白板重播清分段等待',
     'function cjwbReplay(){\n  if(!cjwbS.sec) return;\n  cjwbStop();\n  cjwbS.scene = 0;',
     'function cjwbReplay(){\n  if(!cjwbS.sec) return;\n  cjwbStop(); cjwbS.segWait = false;\n  cjwbS.scene = 0;'),
    ('白板分段条渲染',
     "function cjwbRenderDots(){\n  if(!cjwbS.dots || !cjwbS.sec) return;\n  var n = cjwbS.sec.scenes.length;\n  cjwbS.dots.innerHTML = '';\n  for(var i = 0; i < n; i++){\n    var d = document.createElement('span');\n    d.className = 'cjwb-dot' + (i < cjwbS.scene ? ' done' : (i === cjwbS.scene ? ' now' : ''));\n    cjwbS.dots.appendChild(d);\n  }\n  if(cjwbS.sceneNo) cjwbS.sceneNo.textContent = '第 ' + (cjwbS.scene + 1) + ' / ' + n + ' 镜';\n}\n",
     "function cjwbRenderDots(){\n  if(!cjwbS.dots || !cjwbS.sec) return;\n  var n = cjwbS.sec.scenes.length;\n  cjwbS.dots.innerHTML = '';\n  for(var i = 0; i < n; i++){\n    var d = document.createElement('span');\n    d.className = 'cjwb-dot' + (i < cjwbS.scene ? ' done' : (i === cjwbS.scene ? ' now' : ''));\n    cjwbS.dots.appendChild(d);\n  }\n  if(cjwbS.sceneNo) cjwbS.sceneNo.textContent = '第 ' + (cjwbS.scene + 1) + ' / ' + n + ' 镜';\n  var sgEl = document.getElementById('cjwbSegs');\n  if(sgEl){\n    sgEl.innerHTML = '';\n    var segs2 = cjwbS.sec.segs || [];\n    segs2.forEach(function(s2, i2){\n      var from = i2 ? segs2[i2 - 1].to : 0;\n      var b = document.createElement('button');\n      b.className = 'cjwb-seg' + ((cjwbS.scene >= from && cjwbS.scene < s2.to) ? ' now' : '');\n      b.textContent = '第 ' + (i2 + 1) + ' 段 · ' + s2.name + '（' + (from + 1) + '–' + s2.to + ' 镜）';\n      b.onclick = (function(idx){ return function(){ CJ.cjwbGoSeg(idx); }; })(i2);\n      sgEl.appendChild(b);\n    });\n  }\n}\n"),
    ('白板分段跳转与导出',
     'window.CJ = { go: go, back: back, stepLaw: stepLaw, toggleAdult: toggleAdult, cjwbTogglePlay: cjwbTogglePlay, cjwbReplay: cjwbReplay, cjFilmToggle: cjFilmToggle, cjFilmReplay: cjFilmReplay };',
     'function cjwbGoSeg(i){\n  if(!cjwbS.sec || !cjwbS.sec.segs || !cjwbS.sec.segs[i]) return;\n  cjwbStop(); cjwbS.segWait = false;\n  cjwbS.scene = i ? cjwbS.sec.segs[i - 1].to : 0;\n  cjwbS.elapsed = 0; cjwbS.baseElapsed = 0;\n  cjwbRenderScene();\n  cjwbPlayStart();\n}\n\nwindow.CJ = { go: go, back: back, stepLaw: stepLaw, toggleAdult: toggleAdult, cjwbTogglePlay: cjwbTogglePlay, cjwbReplay: cjwbReplay, cjwbGoSeg: cjwbGoSeg, cjFilmToggle: cjFilmToggle, cjFilmReplay: cjFilmReplay };'),
]
CJWB_MERGED_SCENES = {"GR-48": 9, "GR-49": 8, "GR-50": 9}  # 合并后场景数（基线 CJ05 5+CJ06 4 / CJ10 4+CJ11 4 / CJ07 5+CJ12 4）
# 白板收尾（2026-11-03，v2 复查新问题）：合并立条后 GR-48/49/50 白板 80–92s 超 30–50s 标准、
# GR-46/47 与字幕口径残留。处置：合并页按来源子规律分段（segs，播放器段末停靠）、
# 小幅超标页给 per-section pace（内容一字不删）、GR-46 第 1 镜字幕改已裁定口径。
CJWB_EDITS = [
    ("GR-46 pace", "{ id:'GR-46', name:'FANBOYS 七兄弟', scenes:[",
     "{ id:'GR-46', name:'FANBOYS 七兄弟', pace:0.88, scenes:["),
    ("GR-46 字幕口径", "cap:'并列连词只有七个，首字母串成 FANBOYS。'",
     "cap:'小学阶段常用的并列连词就这七个，首字母串成 FANBOYS。'"),
    ("GR-47 pace", "{ id:'GR-47', name:'从句是挂车', scenes:[",
     "{ id:'GR-47', name:'从句是挂车', pace:0.93, scenes:["),
    ("GR-48 分段", "{ id:'GR-48', name:'时间队＋原因队', scenes:[",
     "{ id:'GR-48', name:'时间队＋原因队', segs:[{name:'时间队',to:5},{name:'原因队',to:9}], scenes:["),
    ("GR-49 分段", "{ id:'GR-49', name:'连接副词八组功能队＋连接副词会走动', scenes:[",
     "{ id:'GR-49', name:'连接副词八组功能队＋连接副词会走动', segs:[{name:'八组功能队',to:4},{name:'连接副词会走动',to:8}], scenes:["),
    ("GR-50 分段", "{ id:'GR-50', name:'条件与让步队＋身兼数职的词', scenes:[",
     "{ id:'GR-50', name:'条件与让步队＋身兼数职的词', segs:[{name:'条件与让步队',to:5},{name:'身兼数职的词',to:9}], scenes:["),
]
# 呈现位命名债收尾（2026-11-03）：CJ 条目正文中以候选编号指称呈现位的跨引用，改呈正条编号＋呈现位。
CJ_REF_FIXES = [
    ("NEW-CJ01", "beats[2].text", "（NEW-CJ03、GR-38）", "（GR-38 呈现位、GR-38）"),
    ("GR-46", "quiz[1].hint", "回到 NEW-CJ03 的逗号规则。", "回到 GR-38 呈现位（逗号加连词）的逗号规则。"),
    ("GR-32", "groups[0].items[3].gloss", "（专项见 NEW-CJ08）", "（专项见 GR-32 呈现位）"),
    ("GR-32", "note", "见 NEW-CJ08。", "见 GR-32 呈现位。"),
    ("GR-38", "note", "NEW-CJ09 的分号公式也回到本条", "分号公式（GR-38 呈现位）也回到本条"),
    ("GR-49", "errors[0].diag", "回补 NEW-CJ09 机制第 2、3 节", "回补 GR-38 呈现位（连接副词不是连词）第 2、3 节"),
]
# 每条候选成人层都有一段「状态：」——对账后按处置逐条改写（合并条含两段，一并改写）
CJ_STATUS_OLD = "新拟规律，尚未与规律目录对账（待对账）；内容依据下列研究来源，与目录冲突时以目录为准。"
CJ_STATUS_NEW = {
    "GR-46": "本条已于 2026-11-03 对账立条为 GR-46，列入规律目录；内容依据下列研究来源。",
    "GR-47": "本条已于 2026-11-03 对账立条为 GR-47，列入规律目录；内容依据下列研究来源。",
    "GR-48": "本条已于 2026-11-03 对账立条为 GR-48（由时间组与原因组合并），列入规律目录；内容依据下列研究来源。",
    "GR-49": "本条已于 2026-11-03 对账立条为 GR-49（由八组功能队与移动规则合并），列入规律目录；内容依据下列研究来源。",
    "GR-50": "本条已于 2026-11-03 对账立条为 GR-50（由双连词禁令与身兼数职合并），列入规律目录；内容依据下列研究来源。",
    "NEW-CJ01": "本条已于 2026-11-03 对账转为区导引（不入规律目录）；内容依据下列研究来源。",
    "NEW-CJ03": "本条已于 2026-11-03 对账并入 GR-38，本页为其呈现位；内容依据下列研究来源。",
    "NEW-CJ09": "本条已于 2026-11-03 对账并入 GR-38，本页为其呈现位；内容依据下列研究来源。",
    "NEW-CJ08": "本条已于 2026-11-03 对账并入 GR-32，本页为其呈现位；内容依据下列研究来源。",
}

# 词根：NEW-C 并入 S-21（呈现位）、NEW-T 立条 S-44（2026-11-03 裁定）
LAWREG_RENAME = {"NEW-C": ("S-21", "presentation"), "NEW-T": ("S-44", "law")}
CANDIDATE_TAIL = "本条为候选新条，编号待与图鉴对账。"

# LAWDATA 指针：LAW.open 跳转分支与词根区导出
LAW_OPEN_ANCHOR = "var d=LAWDATA[id]; if(!d)return;"
LAW_OPEN_INSERT = (
    "\n   if(d.ptr){var zp=window[{pron:'PN',art:'AR',conj:'CJ',morph:'MZ'}[d.ptr.zone]];"
    "\n     if(zp){if(d.ptr.zone==='morph')zp.openLaw(d.ptr.id);else zp.go(d.ptr.id)} return}"
)
MZ_ANCHOR = "if(b){ renderLaw(b.dataset.law); }\n});\n\nrenderIndex();\n})();"
MZ_INSERT = "if(b){ renderLaw(b.dataset.law); }\n});\n\nrenderIndex();\nwindow.MZ={openLaw:renderLaw,openPage:openPage};\n})();"
POOL_FIELDS = ["g", "zone", "aud", "mech", "quiz", "prb"]  # buildPool 所读字段，指针必须原样保留


# ---------------------------------------------------------------- 各区构建
def load_master():
    recs = json.loads(MASTER.read_text(encoding="utf-8"))
    return {r["id"]: r for r in recs}


def zone_data(by, rid):
    z = by[rid].get("zone") or {}
    if not isinstance(z, dict) or z.get("data") is None:
        fail(f"总表 {rid} 无 zone.data 分仓")
    return copy.deepcopy(z["data"])


def build_pn(by, cur_laws):
    order = [PN_RENAME.get(e["id"], e["id"]) for e in cur_laws]
    out = []
    for fid in order:
        data = zone_data(by, fid)
        if fid in PN_FIXES:
            src_id = data["id"]
            if src_id != fid:
                diff("PN", fid, "id", src_id, fid)
                data["id"] = fid
            if "cand" in data:
                diff("PN", fid, "cand", data.pop("cand"), "(删除)")
            for path, old, new in PN_FIXES[fid]:
                apply_text_fix("PN", fid, data, path, old, new)
            s = json.dumps(data, ensure_ascii=False)
            if "待对账" in s or "NEW-P" in s:
                fail(f"PN {fid} 转正后仍残留候选标记")
        out.append(data)
    # 未受裁定条目与现行逐条深相等（硬断言）
    cur_by = {e["id"]: e for e in cur_laws}
    for e in out:
        if e["id"] not in PN_FIXES and not deep_eq(e, cur_by[e["id"]]):
            fail(f"PN 未受裁定条目 {e['id']} 与现行不一致")
    return out


def build_from_master_map(by, cur_map, scope):
    """EXTRA/ADULT 类字典字面量：按现行键序从总表分仓重建，须与现行深相等。"""
    out = {}
    for k in cur_map:
        z = by[k].get("zone") or {}
        key = "extra" if scope.endswith("EXTRA") else "adult"
        if z.get(key) is None:
            fail(f"总表 {k} 无 zone.{key} 分仓")
        out[k] = copy.deepcopy(z[key])
        if not deep_eq(out[k], cur_map[k]):
            fail(f"{scope} {k} 与现行不一致")
    return out


def build_cj(by, cur_laws):
    # 先从总表候选分仓构建全部「处置后」条目（与现行文件状态无关 → 幂等），再按现行顺序装配。
    finals = {}
    for cid, nid in CJ_RENAME.items():
        data = zone_data(by, cid)
        data["id"] = nid
        data["isNew"] = False
        diff("CJ", nid, "id", cid, nid)
        diff("CJ", nid, "isNew", True, False)
        if cid == "NEW-CJ02":
            for path, old, new in CJ02_FIXES:
                apply_text_fix("CJ", "GR-46", data, path, old, new)
        finals[nid] = data
    for fid in CJ_MERGES:
        finals[fid] = cj_merge(by, fid)
    for cid, target in CJ_SLOTS.items():
        data = zone_data(by, cid)
        data["isNew"] = False
        data["merged"] = target
        diff("CJ", cid, "isNew", True, False)
        diff("CJ", cid, "merged", "(无)", target)
        finals[cid] = data
    for cid in CJ_GUIDE:
        data = zone_data(by, cid)
        data["isNew"] = False
        data["guide"] = True
        diff("CJ", cid, "isNew", True, False)
        diff("CJ", cid, "guide", "(无)", True)
        finals[cid] = data
    catalog_raw = {}
    for e in cur_laws:  # 目录定版条（GR-11/32/38）：内容原样，仅正文指称随改号同步（下方统一校验）
        cid = e["id"]
        if cid.startswith("GR-") and cid not in finals:
            catalog_raw[cid] = zone_data(by, cid)
            finals[cid] = catalog_raw[cid]
    # 顺序装配：合并的非版位条跳过（CJ06/CJ11 在首条位并入；CJ07 延后，GR-50 挂 CJ12 位）；
    # 稳态下现行 id 已是处置后 id，同一走法原样复现。
    out = []
    for e in cur_laws:
        cid = e["id"]
        if cid in ("NEW-CJ06", "NEW-CJ11", "NEW-CJ07"):
            continue
        if cid == "NEW-CJ12":
            out.append(finals["GR-50"])
        elif cid in finals:
            out.append(finals[cid])
        else:
            fail(f"CJ 条目 {cid} 无处置路径")
    # 正文指称同步：已改号/合并条目的 id 令牌全局替换（呈现位/导引 id 不变，不在映射内）
    counts = {}

    def sub(s):
        def rep(m):
            tok = m.group(0)
            if tok in CJ_TOKEN_MAP:
                counts[tok] = counts.get(tok, 0) + 1
                return CJ_TOKEN_MAP[tok]
            return tok
        return re.sub(r"NEW-CJ\d+", rep, s)

    out = [walk_strings(e, sub) for e in out]
    for tok, n in sorted(counts.items()):
        diff("CJ", "(正文指称)", "token " + tok, f"{tok} ×{n}", CJ_TOKEN_MAP[tok])
    # 呈现位跨引用收尾：正文中以候选编号指称呈现位处，改呈正条编号＋呈现位（CJ_REF_FIXES）
    out_by_id = {e["id"]: e for e in out}
    for eid, path, old, new in CJ_REF_FIXES:
        if eid not in out_by_id:
            fail(f"CJ 跨引用修正目标 {eid} 不在输出中")
        apply_text_fix("CJ", eid, out_by_id[eid], path, old, new)
    # 目录定版条校验：现行须与「总表经指称同步＋跨引用修正」深相等，
    # 或与修正前形态（把修正逆向还原后）深相等（写前文件），二者居一。
    cur_by = {e["id"]: e for e in cur_laws}
    out_by = {e["id"]: e for e in out}
    for cid, raw in catalog_raw.items():
        if deep_eq(out_by[cid], cur_by[cid]):
            continue
        pre = copy.deepcopy(out_by[cid])
        for eid, path, old, new in CJ_REF_FIXES:
            if eid == cid:
                v = get_path(pre, path)
                if isinstance(v, str) and new in v:
                    set_path(pre, path, v.replace(new, old))
        if not deep_eq(pre, cur_by[cid]):
            fail(f"CJ 目录条 {cid} 与总表不一致（既非跨引用修正后形态、也非修正前形态）")
    # 成人层「状态：」段按处置改写
    for e in out:
        if e["id"] in CJ_STATUS_NEW:
            n = 0
            for seg in e.get("adult", []):
                if seg.get("k") == "状态：" and seg.get("t") == CJ_STATUS_OLD:
                    seg["t"] = CJ_STATUS_NEW[e["id"]]
                    n += 1
            if n == 0 and CJ_STATUS_OLD in json.dumps(e, ensure_ascii=False):
                fail(f"CJ {e['id']} 状态段形态异常")
            if n:
                diff("CJ", e["id"], "adult 状态段", CJ_STATUS_OLD, f"{CJ_STATUS_NEW[e['id']]}（×{n}）")
    ids = [e["id"] for e in out]
    if len(ids) != 12 or len(set(ids)) != 12:
        fail(f"CJ 合并后条目数/唯一性异常：{ids}")
    if any(e.get("isNew") for e in out):
        fail("CJ 仍有 isNew 条目")
    if "待对账" in json.dumps(out, ensure_ascii=False):
        fail("CJ 转正后仍残留「待对账」")
    return out


def cj_merge(by, fid):
    parts_ids, skeleton_id = CJ_MERGES[fid]
    parts = [zone_data(by, p) for p in parts_ids]
    if list(parts[0].keys()) != list(parts[1].keys()):
        fail(f"CJ 合并 {fid} 两条键序不一致")
    base = copy.deepcopy(parts[0])
    base["id"] = fid
    base["isNew"] = False
    base["group"] = zone_data(by, skeleton_id)["group"]
    for f in ["short", "desc", "formal", "kid"]:
        sep = " · " if f == "short" else ""
        base[f] = parts[0][f] + sep + parts[1][f]
    for f in ["beats", "examples", "errors", "quiz", "groups", "adult"]:
        base[f] = parts[0][f] + parts[1][f]
    notes = [p["note"] for p in parts if p.get("note")]
    base["note"] = " ".join(notes) if notes else None
    diff("CJ", fid, "合并立条", "+".join(parts_ids), f"{fid}（group {base['group']}，内容顺序 {'+'.join(parts_ids)}）")
    return base


# ---------------------------------------------------------------- CJWB 代码字面量手术
def split_js_elements(lit):
    """把顶层 JS 数组字面量拆成元素跨度 [(start, end), ...]（lit 内下标）。
    元素为代码（含函数调用），只做 span 级文本手术，其余字节原样保留。"""
    assert lit.startswith("[") and lit.endswith("]")
    spans = []
    i = 1
    while True:
        while i < len(lit) and lit[i] in " \t\n,":
            i += 1
        if i >= len(lit) or lit[i] == "]":
            break
        end = scan_literal(lit, i)
        spans.append((i, end))
        i = end
    return spans


def elem_id(el):
    m = re.match(r"\s*\{\s*id:'([^']+)'", el)
    return m.group(1) if m else None


def elem_name(el):
    m = re.search(r"name:'([^']*)'", el)
    return m.group(1) if m else None


def elem_scenes_span(el):
    i = el.index("scenes:")
    i += len("scenes:")
    while el[i] in " \t\n":
        i += 1
    end = scan_literal(el, i)
    return (i, end)


def build_cjwb(cur_lit):
    spans = split_js_elements(cur_lit)
    elems = [cur_lit[s:e] for s, e in spans]
    byid = {elem_id(el): el for el in elems}
    spanof = {elem_id(el): sp for el, sp in zip(elems, spans)}
    if "GR-46" in byid:  # 稳态：已手术
        for fid, n in CJWB_MERGED_SCENES.items():
            if byid[fid].count("{ cap:") != n:
                fail(f"CJWB {fid} 场景数异常")
        out, changed = cur_lit, False
        for label, old, new in CJWB_EDITS:
            c_old, c_new = out.count(old), out.count(new)
            if c_old == 1 and c_new == 0:
                out = out.replace(old, new)
                changed = True
                diff("CJWB", label, "稳态手术", old[:56], new[:56])
            elif c_old == 0 and c_new == 1:
                pass  # 已应用（稳态）
            else:
                fail(f"CJWB 稳态手术 {label} 状态不明（old {c_old} 次 / new {c_new} 次）")
        return out, changed
    edits = []  # (start, end, new_text)
    indexof = {elem_id(el): j for j, el in enumerate(elems)}
    for fid, part_ids in [("GR-48", ["NEW-CJ05", "NEW-CJ06"]),
                          ("GR-49", ["NEW-CJ10", "NEW-CJ11"]),
                          ("GR-50", ["NEW-CJ07", "NEW-CJ12"])]:
        merged = cjwb_merge(byid, fid, part_ids)
        s0, e0 = spanof[part_ids[0]]
        j1 = indexof[part_ids[1]]
        edits.append((s0, e0, merged))
        edits.append((spans[j1 - 1][1], spans[j1][1], ""))  # 删除「前一元素后的分隔符+第二条元素」
    for cid, nid in CJ_RENAME.items():
        if cid in spanof:
            s, e = spanof[cid]
            edits.append((s, e, byid[cid].replace(f"id:'{cid}'", f"id:'{nid}'", 1)))
            diff("CJWB", nid, "section id", cid, nid)
    out = cur_lit
    for s, e, new in sorted(edits, key=lambda x: -x[0]):
        out = out[:s] + new + out[e:]
    return out, True


def cjwb_merge(byid, fid, part_ids):
    a, b = byid[part_ids[0]], byid[part_ids[1]]
    el = a.replace(f"id:'{part_ids[0]}'", f"id:'{fid}'", 1)
    na, nb = elem_name(a), elem_name(b)
    el = el.replace(f"name:'{na}'", f"name:'{na}＋{nb}'", 1)
    sa, sb = elem_scenes_span(a), elem_scenes_span(b)
    scenes_a = a[sa[0] + 1:sa[1] - 1]
    scenes_b = b[sb[0] + 1:sb[1] - 1]
    ea = elem_scenes_span(el)
    el = el[:ea[0] + 1] + scenes_a.rstrip() + ",\n" + scenes_b.lstrip() + el[ea[1] - 1:]
    n = el.count("{ cap:")
    if n != CJWB_MERGED_SCENES[fid]:
        fail(f"CJWB 合并 {fid} 场景数 {n} != 预期 {CJWB_MERGED_SCENES[fid]}")
    diff("CJWB", fid, "section 合并", "+".join(part_ids), f"{fid}（{n} 场景）")
    return el


# ---------------------------------------------------------------- 词根事实源
def build_morph_data(md):
    raw = MORPH_DATA.read_bytes()
    if JDC(json.loads(raw)).encode() + b"\n" != raw:
        fail("morph_data.json 字节格式漂移（非 compact+换行），拒绝重写")
    md = copy.deepcopy(md)
    lr = md["lawreg"]
    new_lr = {}
    for k, v in lr.items():
        if k in LAWREG_RENAME:
            nid, role = LAWREG_RENAME[k]
            e = copy.deepcopy(v)
            if e["id"] != k:
                fail(f"LAWREG {k} 内嵌 id 不一致")
            e["id"] = nid
            e["_role"] = role
            if CANDIDATE_TAIL not in e["boundary"]:
                fail(f"LAWREG {k} boundary 无候选尾句")
            e["boundary"] = e["boundary"].replace(CANDIDATE_TAIL, "")
            diff("LAWREG", nid, "id/_role", f"{k} / candidate", f"{nid} / {role}")
            diff("LAWREG", nid, "boundary", "…" + CANDIDATE_TAIL, "（删除候选尾句）")
            new_lr[nid] = e
        else:
            new_lr[k] = v
    if set(LAWREG_RENAME) - set(lr):
        pass  # 稳态时 NEW-C/NEW-T 已不在（见 check 分支）
    md["lawreg"] = new_lr
    for pid in ["if-past", "if-plural"]:
        laws = md["data"]["pages"][pid]["laws"]
        if "NEW-T" in laws:
            md["data"]["pages"][pid]["laws"] = ["S-44" if x == "NEW-T" else x for x in laws]
            diff("morph DATA", pid, "laws", "NEW-T", "S-44")
    return md


# ---------------------------------------------------------------- LAWDATA 降指针
def dual_map(by):
    out = {}
    for rid, r in by.items():
        z = r.get("zone")
        if r.get("lawdata") is not None and isinstance(z, dict) and z.get("data") is not None:
            out[rid] = (z["zone"], z["data"].get("id") or rid)
    if len(out) != 67:
        fail(f"双户口条数 {len(out)} != 67")
    return out


def build_lawdata(by, cur):
    duals = dual_map(by)
    out = {}
    for lid, entry in cur.items():
        if lid in duals:
            src = by[lid]["lawdata"]
            ptr = {"id": lid, "ptr": {"zone": duals[lid][0], "id": duals[lid][1]}}
            for f in POOL_FIELDS:
                if f not in src:
                    fail(f"LAWDATA {lid} 缺池字段 {f}")
                ptr[f] = copy.deepcopy(src[f])
                if not deep_eq(ptr[f], entry.get(f)):
                    fail(f"LAWDATA {lid} 池字段 {f} 与现行不一致")
            out[lid] = ptr
        else:
            if not deep_eq(entry, by[lid]["lawdata"]):
                fail(f"LAWDATA 非双户口条目 {lid} 与总表不一致")
            out[lid] = entry
    return out, duals


# ---------------------------------------------------------------- 锚定代码编辑
def anchored(text, old, new, label, scope):
    n = text.count(old)
    if n == 1:
        diff(scope, label, "代码", old[:60], new[:60])
        return text.replace(old, new)
    if n == 0 and text.count(new) == 1:
        return text  # 已应用（稳态）
    fail(f"锚定编辑 {scope}/{label}：old 出现 {n} 次（应为 1）")


def anchored_insert(text, anchor, insert, label, scope):
    """在锚点后插入代码：锚点在稳态下依然存在，故以「锚点+插入体」判已应用。"""
    if text.count(anchor + insert) == 1:
        return text  # 已应用（稳态）
    if text.count(anchor) == 1 and insert not in text:
        diff(scope, label, "代码", anchor[:60], (anchor + insert)[:60])
        return text.replace(anchor, anchor + insert)
    fail(f"锚定插入 {scope}/{label} 状态不明")


# ---------------------------------------------------------------- 主流程
def collect(text):
    """定位并解析全部目标字面量，返回工作集。"""
    w = {}
    w["lawdata_blk"] = find_block(text, "var LAWFLAG")
    s, e, lit = extract_in(text, w["lawdata_blk"], "var LAWDATA=")
    w["lawdata"] = (s, e, parse_lit(lit))
    w["pn_blk"] = find_block(text, "window.PN")
    w["ar_blk"] = find_block(text, "window.AR")
    w["cj_blk"] = find_block(text, "window.CJ")
    for pre, blk in [("pn", w["pn_blk"]), ("ar", w["ar_blk"]), ("cj", w["cj_blk"])]:
        s, e, lit = extract_in(text, blk, "var LAWS =")
        w[pre + "_laws"] = (s, e, parse_lit(lit))
        s, e, lit = extract_in(text, blk, "var TOPIC =")
        w[pre + "_topic"] = (s, e, parse_lit(lit))
        s, e, lit = extract_in(text, blk, "var GROUPS =")
        w[pre + "_groups"] = (s, e, parse_lit(lit))
    for pre, blk, names in [("pn", w["pn_blk"], ["PN_EXTRA", "PN_ADULT"]), ("ar", w["ar_blk"], ["AR_EXTRA", "AR_ADULT"])]:
        for nm in names:
            s, e, lit = extract_in(text, blk, f"var {nm} =")
            w[nm.lower()] = (s, e, parse_lit(lit))
    s, e, lit = extract_in(text, w["cj_blk"], "var EXTRA_TOP =")
    w["cj_extra_top"] = (s, e, lit)
    s, e, lit = extract_in(text, w["cj_blk"], "var CJWB_SECTIONS =")
    w["cjwb"] = (s, e, lit)
    return w


def build_all(text, by):
    """由事实源 + 裁定构建全部新字面量文本与代码编辑，返回 (替换表, 编辑表, morph_new)。"""
    w = collect(text)
    # 字节格式门：凡本生成器要替换的 JSON 字面量，现行文本必须能被 JD 逐字节复现，
    # 否则替换会引入裁定之外的格式差异——立即停。
    for key in ["lawdata", "pn_laws", "pn_extra", "pn_adult", "pn_topic", "pn_groups",
                "ar_laws", "ar_extra", "ar_adult", "cj_laws", "cj_topic"]:
        s, e, obj = w[key]
        if JD(obj) != text[s:e]:
            fail(f"字面量 {key} 现行字节格式与 JD 不符，拒绝替换")
    reps = []  # (start, end, new_text, label)

    # LAWDATA
    new_ld, duals = build_lawdata(by, w["lawdata"][2])
    reps.append((w["lawdata"][0], w["lawdata"][1], JD(new_ld), "LAWDATA"))
    diff("LAWDATA", "67 条", "降指针", "完整条目 ×67", "指针记录 ×67（保留 id/ptr/g/zone/aud/mech/quiz/prb）")

    # PN
    new_pn = build_pn(by, w["pn_laws"][2])
    reps.append((w["pn_laws"][0], w["pn_laws"][1], JD(new_pn), "PN LAWS"))
    for nm, scope in [("pn_extra", "PN_EXTRA"), ("pn_adult", "PN_ADULT")]:
        obj = build_from_master_map(by, w[nm][2], scope)
        reps.append((w[nm][0], w[nm][1], JD(obj), scope))
    topic = copy.deepcopy(w["pn_topic"][2])
    if topic["sub"] == PN_TOPIC_SUB[0]:
        topic["sub"] = PN_TOPIC_SUB[1]
        diff("PN", "TOPIC", "sub", PN_TOPIC_SUB[0], PN_TOPIC_SUB[1])
    elif topic["sub"] != PN_TOPIC_SUB[1]:
        fail("PN TOPIC.sub 状态不明")
    reps.append((w["pn_topic"][0], w["pn_topic"][1], JD(topic), "PN TOPIC"))
    groups = copy.deepcopy(w["pn_groups"][2])
    if groups[5]["sub"] == PN_GROUP5_SUB[0]:
        groups[5]["sub"] = PN_GROUP5_SUB[1]
        diff("PN", "GROUPS[5]", "sub", PN_GROUP5_SUB[0], PN_GROUP5_SUB[1])
    elif groups[5]["sub"] != PN_GROUP5_SUB[1]:
        fail("PN GROUPS[5].sub 状态不明")
    reps.append((w["pn_groups"][0], w["pn_groups"][1], JD(groups), "PN GROUPS"))

    # AR（零差异证明：重建必须逐字节等于现行，由 --check 与写后比对保证；此处只登记替换）
    ar_laws = []
    for e in w["ar_laws"][2]:
        data = zone_data(by, e["id"])
        if not deep_eq(data, e):
            fail(f"AR 条目 {e['id']} 与总表不一致")
        ar_laws.append(data)
    reps.append((w["ar_laws"][0], w["ar_laws"][1], JD(ar_laws), "AR LAWS"))
    for nm, scope in [("ar_extra", "AR_EXTRA"), ("ar_adult", "AR_ADULT")]:
        obj = build_from_master_map(by, w[nm][2], scope)
        reps.append((w[nm][0], w[nm][1], JD(obj), scope))

    # CJ
    new_cj = build_cj(by, w["cj_laws"][2])
    reps.append((w["cj_laws"][0], w["cj_laws"][1], JD(new_cj), "CJ LAWS"))
    topic = copy.deepcopy(w["cj_topic"][2])
    if topic["sub"] == CJ_TOPIC_SUB[0]:
        topic["sub"] = CJ_TOPIC_SUB[1]
        diff("CJ", "TOPIC", "sub", CJ_TOPIC_SUB[0], CJ_TOPIC_SUB[1])
    elif topic["sub"] != CJ_TOPIC_SUB[1]:
        fail("CJ TOPIC.sub 状态不明")
    reps.append((w["cj_topic"][0], w["cj_topic"][1], JD(topic), "CJ TOPIC"))
    old_et = w["cj_extra_top"][2]
    val = json.loads(old_et)
    if CJ_EXTRA_TOP_FIX[0] in val:
        new_et = old_et.replace(CJ_EXTRA_TOP_FIX[0], CJ_EXTRA_TOP_FIX[1])
        diff("CJ", "EXTRA_TOP", "路线细则", CJ_EXTRA_TOP_FIX[0], CJ_EXTRA_TOP_FIX[1])
        reps.append((w["cj_extra_top"][0], w["cj_extra_top"][1], new_et, "CJ EXTRA_TOP"))
    elif CJ_EXTRA_TOP_FIX[1] not in val:
        fail("CJ EXTRA_TOP 状态不明")
    new_wb, changed = build_cjwb(w["cjwb"][2])
    if changed:
        reps.append((w["cjwb"][0], w["cjwb"][1], new_wb, "CJWB_SECTIONS"))

    # morph 事实源
    md_cur = json.loads(MORPH_DATA.read_text(encoding="utf-8"))
    md_new = build_morph_data(md_cur)
    return reps, md_new, duals


def apply_reps(text, reps):
    for s, e, new, _label in sorted(reps, key=lambda r: -r[0]):
        text = text[:s] + new + text[e:]
    return text


def apply_code_edits(text):
    text = anchored_insert(text, LAW_OPEN_ANCHOR, LAW_OPEN_INSERT, "ptr 跳转分支", "LAW.open")
    text = anchored(text, MZ_ANCHOR, MZ_INSERT, "window.MZ 导出", "morph IIFE")
    text = anchored(text, PN_FOOTER[0], PN_FOOTER[1], "页脚", "PN")
    text = anchored(text, CJ_FOOTER[0], CJ_FOOTER[1], "页脚", "CJ")
    for label, old, new in CJ_CODE_EDITS + CJ_UI_EDITS:
        text = anchored(text, old, new, label, "CJ 渲染器")
    for old, new in PN_AUX_EDITS:
        text = anchored(text, old, new, old, "PN 辅助字面量")
    return text


def main(argv):
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    mode = argv[1]
    by = load_master()
    text = MAIN.read_text(encoding="utf-8")
    reps, md_new, _duals = build_all(text, by)

    if mode == "--check":
        ok = True
        new_text = apply_code_edits(apply_reps(text, reps))
        gen_cmp, cur_cmp = strip_markers(new_text), strip_markers(text)
        if gen_cmp != cur_cmp:
            ok = False
            # 定位第一处差异（剥标记后坐标）
            for i, (a, b) in enumerate(zip(gen_cmp, cur_cmp)):
                if a != b:
                    print(f"主文件与生成结果不一致，首差在字符 {i}：\n  生成：{gen_cmp[max(0,i-60):i+60]!r}\n  现行：{cur_cmp[max(0,i-60):i+60]!r}")
                    break
            else:
                print(f"主文件与生成结果长度不一致：{len(gen_cmp)} vs {len(cur_cmp)}")
        md_cur = json.loads(MORPH_DATA.read_text(encoding="utf-8"))
        if not deep_eq(md_new, md_cur):
            ok = False
            print("morph_data.json 与裁定生成结果不一致（LAWREG/页引用未同步）")
        r = subprocess.run([sys.executable, str(GEN_MORPH), "--check"], capture_output=True, text=True)
        print(r.stdout.strip()[-500:])
        if r.returncode != 0:
            ok = False
        print("CHECK:", "PASS（稳态：现行文件 == 生成结果）" if ok else "FAIL")
        return 0 if ok else 1

    # --write
    morph_diffs = [d for d in DIFFS if d[0] in ("LAWREG", "morph DATA")]
    md_bytes = (JDC(md_new) + "\n").encode()
    if md_bytes != MORPH_DATA.read_bytes():
        MORPH_DATA.write_bytes(md_bytes)
        print("morph_data.json 已更新（LAWREG 改号 + 页引用）")
    for target in (MAIN, MORPH_PAGE):
        r = subprocess.run([sys.executable, str(GEN_MORPH), "--write", str(target)], capture_output=True, text=True)
        if r.returncode != 0:
            print(r.stdout, r.stderr)
            fail(f"gen_morph --write {target.name} 失败")
    print("gen_morph --write 两文件完成")
    # gen_morph 改了主文件 → 重新读入、重新定位、再应用本生成器的替换与编辑（内存中完成断言后才落盘）
    DIFFS.clear()
    text2 = MAIN.read_text(encoding="utf-8")
    reps2, _md2, _d2 = build_all(text2, by)
    new_text = apply_code_edits(apply_reps(text2, reps2))
    DIFFS[:] = morph_diffs + DIFFS
    # 写前自检：组装后文本中各字面量必须与构建结果逐字相等
    w2 = collect(new_text)
    expect = {label: newt for (_s, _e, newt, label) in reps2}
    got = {
        "LAWDATA": JD(w2["lawdata"][2]),
        "PN LAWS": JD(w2["pn_laws"][2]), "PN_EXTRA": JD(w2["pn_extra"][2]), "PN_ADULT": JD(w2["pn_adult"][2]),
        "PN TOPIC": JD(w2["pn_topic"][2]), "PN GROUPS": JD(w2["pn_groups"][2]),
        "AR LAWS": JD(w2["ar_laws"][2]), "AR_EXTRA": JD(w2["ar_extra"][2]), "AR_ADULT": JD(w2["ar_adult"][2]),
        "CJ LAWS": JD(w2["cj_laws"][2]), "CJ TOPIC": JD(w2["cj_topic"][2]),
        "CJ EXTRA_TOP": w2["cj_extra_top"][2], "CJWB_SECTIONS": w2["cjwb"][2],
    }
    for label, newt in expect.items():
        if got.get(label) != newt:
            fail(f"写前自检：{label} 组装结果不一致")
    new_text = ensure_law_markers(new_text)
    MAIN.write_text(new_text, encoding="utf-8")
    print(f"主文件已写回：{len(text2)} → {len(new_text)} 字符")
    print(f"差异记录 {len(DIFFS)} 条（详见 --check 前的构建输出/报告）")
    for d in DIFFS:
        print("  DIFF", " | ".join(str(x) for x in d))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
