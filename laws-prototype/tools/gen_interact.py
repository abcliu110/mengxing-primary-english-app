#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_interact.py — 规律互动题集 INTERACT 的生成器（2026-11-03 互动集成波，
Stewart 拍板：三件语法原生互动 D6/D2/D24 正式并入 App，走总表生成管线）。

原型依据：grammar-native-prototype 的 generate_items.py（组题规则与解析文案
口径逐条照移，不得改口径）+ extract_data.py（支撑数据抽取口径）。原型自此
冻结为记录（《数据源规范》§2.3：禁止从已冻结原型回灌，本生成器是唯一通道）。

事实源（全部已登记，零新编内容）：
  model/laws_master.json          GR-02/03/12 lawdata + TA-05/06 yaml
  model/verb_error_cases.json     VEC 病例（动词事实源，规范 §1「动词」行）
  model/verb_forms_completion.json 动词五形式表 461 行（同上）
  model/wordbank.json             词库（三单派生同形校验、名词主语校验）
  model/ta_exercises.json         TA 练习（TA-06 E4 种子句、E3 病例出处）
  主文件内嵌 TN WINS              现在完成时实验室的 5 个时间窗（sent/why/
                                  fill/closed 逐字）+ 窗口卡标签（data-win）。
                                  时态（TN）模块未生成化、无 model 事实源文件，
                                  按 extract_review_data.py 先例只读解析主文件
                                  内嵌段（本通道在《数据源规范》§1「规律互动
                                  题集」行登记）。WINS 若被 TN 车道改动，本生成
                                  器的逐字断言会立即报错，不会静默漂移。

生成目标：主文件 mengxing-prototype-v1.html 中
  var INTERACT = {...} 字面量（带 GENERATED 标记）。
INTERACT 结构：
  d6 / d2 / d24     三套生成题（144 / 150 / 139 条）
  explain           三套错因解析文案（逐字取自规律病例/机制，逐条带出处字段）
  support           UI 支撑数据：wins（TN WINS 逐字）、d2_names（TA-05/06
                    headline/mechanism）、d6{gr02,gr03}、d24{hl,kid,cases}
  manual            原型 v1 手工工位定版表（D6 6 工位 / D24 自由台 5 工位 /
                    D24 病例动词判定 6 条）——原型的手写工位数据，集成时按
                    Stewart 指示「保留为题集前几题」，在此登记为生成器内定版
                    表（其句子骨架均出自上述事实源，保真断言覆盖）
  counts            组题计数（候选数/取样数）

题量口径（与原型 items_report.txt 一致）：每件共 150 题——
  D6 = 手工 6 + 生成 144；D2 = 150（其中 5 题与 TN WINS 原工位重合排最前）；
  D24 = 自由台（手工 5 + 生成 139）+ 病例 6。
组题仅限「原文槽位替换」：主语槽（代词集/原文主语）、动词槽（五形式表）、
时间状语槽（TA-06 定版分类）。每条解析文案与例句尾巴做源内子串断言，
任一不符即报错退出（exit 1），不产出半成品。

用法：
  python3 laws-prototype/tools/gen_interact.py --check   # 稳态校验（逐字节）
  python3 laws-prototype/tools/gen_interact.py --write   # 生成并写回
退出码：0=通过；1=断言失败/不一致；2=用法错误。
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # laws-prototype/
MAIN = ROOT / "mengxing-prototype-v1.html"
LM = ROOT / "model" / "laws_master.json"
VEC = ROOT / "model" / "verb_error_cases.json"
FORMS = ROOT / "model" / "verb_forms_completion.json"
WB = ROOT / "model" / "wordbank.json"
TAEX = ROOT / "model" / "ta_exercises.json"

JD = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))
MARKER = "/* GENERATED: tools/gen_interact.py ← model/laws_master+verb_forms_completion+verb_error_cases+wordbank+ta_exercises+主文件TN-WINS · DO NOT EDIT */"
MARKER_RE = re.compile(r"^\s*/\* GENERATED: tools/gen_\w+\.py ← model/\S+ · DO NOT EDIT \*/\s*$")
ANCHOR = "var INTERACT ="
IX_ENGINE_ANCHOR = "<script>\n/* IX-ENGINE"


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


def load(name, path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as ex:
        fail(f"{name} 读取失败：{ex}")


def scan_literal(text, i):
    open_c = text[i]
    close_c = "}" if open_c == "{" else "]"
    depth = 0
    in_str = None
    esc = False
    k = i
    while k < len(text):
        c = text[k]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == in_str:
                in_str = None
            k += 1
            continue
        if c in "\"'`":
            in_str = c
        elif c == open_c:
            depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0:
                return k + 1
        k += 1
    raise ValueError("字面量定界失败")


def find_span(text, anchor, first_char):
    """返回锚点字面量的 (起, 止)；锚点缺失返回 None（--write 首次插入用）。"""
    hits = []
    i = 0
    while True:
        j = text.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(text) and text[p].isspace():
            p += 1
        if p < len(text) and text[p] == first_char:
            hits.append(p)
        i = j + len(anchor)
    if len(hits) > 1:
        fail(f"锚点 {anchor!r} 命中 {len(hits)} 处（应为 1）")
    if not hits:
        return None
    s = hits[0]
    return s, scan_literal(text, s)


# ================================================================
# 支撑数据抽取（extract_data.py 口径）：TN WINS + 规律命名文案
# ================================================================
def extract_support(text, byid):
    def law(lid):
        return byid[lid]["lawdata"]

    i = text.find("const WINS={")
    if i < 0:
        fail("主文件找不到 const WINS={（TN 现在完成时实验室）")
    j = text.index("};", i)
    wins_src = text[i:j]
    wins = {}
    for m in re.finditer(
            r"(\w+):\{fill:\[(\d+),(\d+)\],closed:(true|false),sent:'([^']*)',why:'([^']*)'\}",
            wins_src):
        k, a, b, closed, sent, why = m.groups()
        wins[k] = {"fill": [int(a), int(b)], "closed": closed == "true",
                   "sent": sent, "why": why}
    if len(wins) != 5:
        fail(f"WINS 应为 5 窗，实得 {len(wins)}")
    labels = {}
    for m in re.finditer(r'data-win="(\w+)"[^>]*>([^<]{0,40})', text):
        labels[m.group(1)] = m.group(2).strip()
    for k in wins:
        if k not in labels:
            fail(f"窗口 {k} 缺卡面标签")
        wins[k]["label"] = labels[k]
    chunks = {
        "lastyear":   {"perf": "have visited", "past": "visited"},
        "inlastyear": {"perf": "have visited", "past": "visited"},
        "today":      {"perf": "have visited", "past": "visited"},
        "thisweek":   {"perf": "have read",    "past": "read"},
        "y2023":      {"perf": "have visited", "past": "visited"},
    }
    for k, c in chunks.items():
        if c["past"] not in wins[k]["sent"] and k not in ("lastyear", "y2023"):
            fail(f"{k} past 块非 sent 子串")
        wins[k].update(c)
    for k in ("inlastyear", "today", "thisweek"):
        wins[k]["pastSent"] = wins[k]["sent"].replace(wins[k]["perf"], wins[k]["past"], 1)
        if wins[k]["pastSent"] == wins[k]["sent"]:
            fail(f"{k} pastSent 派生失败")

    ta05, ta06 = byid["TA-05"]["yaml"], byid["TA-06"]["yaml"]
    d2_names = {
        "ta05_kid": ta05["headline_kid"],
        "ta06_kid": ta06["headline_kid"],
        "ta06_mech_kid": ta06["mechanism"][0]["text_kid"],
    }
    g2, g3 = law("GR-02"), law("GR-03")
    d6sup = {
        "gr02": {"hl": g2["hl"], "kid": g2["kid"]},
        "gr03": {"hl": g3["hl"], "kid": g3["kid"]},
    }
    g12 = law("GR-12")
    d24sup = {
        "hl": g12["hl"], "kid": g12["kid"],
        "cases": [{"wrong": c["wrong"], "right": c["right"], "type": c["type"]}
                  for c in g12["cases"]],
    }
    if len(d24sup["cases"]) != 6:
        fail(f"GR-12 病例应为 6 条，实得 {len(d24sup['cases'])}")
    if g12["exs"][0]["s"] != "There is a pen and two books on the desk.":
        fail("GR-12 ex1 不符")
    return {"wins": wins, "d2_names": d2_names, "d6": d6sup, "d24": d24sup}


# ================================================================
# 手工工位定版表（原型 v1 骨架 js_d6.js D6S_V1 / js_d24.js D24_FREE_V1
# 与 D24_CASES 动词判定，集成时逐字登记于此，为题集前几题）
# ================================================================
MANUAL_D6 = [
    {"id": "visit", "scene": "① 讲过去的事",
     "parts": [{"tx": "I"}, {"slot": "aux"}, {"slot": "verb"}, {"tx": "Beijing last year."}],
     "verb": {"base": "visit", "marked": "visited"},
     "aux": {"word": "did", "can": True, "start": False}, "startMark": None,
     "auxBtn": "叫 did 上场站岗", "unBtn": "让 did 回板凳"},
    {"id": "goq", "scene": "② 变成问句",
     "parts": [{"slot": "aux"}, {"tx": "you", "cap": True}, {"slot": "verb"}, {"tx": "to the park?"}],
     "verb": {"base": "go", "marked": "went"},
     "aux": {"word": "Did", "can": True, "start": False}, "startMark": None,
     "auxBtn": "让 Did 到句首站岗", "unBtn": "让 Did 回板凳"},
    {"id": "like", "scene": "③ 说一句否定",
     "parts": [{"tx": "She"}, {"slot": "aux"}, {"slot": "verb"}, {"tx": "apples."}],
     "verb": {"base": "like", "marked": "likes"},
     "aux": {"word": "doesn't", "can": True, "start": False}, "startMark": None,
     "auxBtn": "让 doesn't 进来扛否定", "unBtn": "让 doesn't 回板凳"},
    {"id": "play", "scene": "④ 病例工位 · 标记别落两次",
     "parts": [{"tx": "He"}, {"slot": "aux"}, {"slot": "verb"}, {"tx": "games."}],
     "verb": {"base": "play", "marked": "plays"},
     "aux": {"word": "doesn't", "can": True, "start": True}, "startMark": "aux",
     "auxBtn": "让 doesn't 进来", "unBtn": "让 doesn't 回板凳"},
    {"id": "look", "scene": "⑤ 病例工位 · does 已站岗",
     "parts": [{"tx": "What does my father"}, {"slot": "verb"}, {"tx": "like?"}],
     "verb": {"base": "look", "marked": "looks"},
     "aux": {"locked": True, "note": "does 已经在句子里站岗（看句首那一块）"}, "startMark": "aux"},
    {"id": "swim", "scene": "⑥ 边界工位 · can 自己会",
     "parts": [{"tx": "Can you"}, {"slot": "verb"}, {"tx": "?"}],
     "verb": {"base": "swim", "marked": None},
     "aux": {"locked": True, "benchWord": "did", "note": "can 自己就会提问和否定"}, "startMark": "aux"},
]

MANUAL_D24_FREE = [
    {"id": "key", "chip": "the key to the doors（通向门的钥匙）",
     "pre": "The key to the doors", "post": "on the table.", "verb": {"sg": "is", "pl": "are"},
     "forces": {"form": {"dir": -1, "p": 3}, "meaning": {"dir": -1, "p": 2}, "near": {"dir": 1, "p": 2}}},
    {"id": "family", "chip": "the family（一家人）",
     "pre": "The family", "post": "at home.", "verb": {"sg": "is", "pl": "are"},
     "forces": {"form": {"dir": -1, "p": 1}, "meaning": {"dir": 1, "p": 3}, "near": {"dir": 0, "p": 0}}},
    {"id": "penfirst", "chip": "There … a pen and two books（笔在前）", "verbatim": "pen",
     "pre": "There", "post": "a pen and two books on the desk.", "verb": {"sg": "is", "pl": "are"},
     "forces": {"form": {"dir": -1, "p": 1}, "meaning": {"dir": -1, "p": 1}, "near": {"dir": -1, "p": 4}}},
    {"id": "booksfirst", "chip": "There … two books and a pen（书在前）", "verbatim": "books",
     "pre": "There", "post": "two books and a pen on the desk.", "verb": {"sg": "is", "pl": "are"},
     "forces": {"form": {"dir": 1, "p": 1}, "meaning": {"dir": 1, "p": 1}, "near": {"dir": 1, "p": 4}}},
    {"id": "people", "chip": "people（人们）",
     "pre": "People", "post": "happy.", "verb": {"sg": "was", "pl": "were"},
     "forces": {"form": {"dir": 1, "p": 1}, "meaning": {"dir": 1, "p": 3}, "near": {"dir": 0, "p": 0}}},
]

MANUAL_D24_CASE_VERBS = [
    {"wrongVerb": "was",  "rightVerb": "were", "winner": "meaning"},
    {"wrongVerb": "were", "rightVerb": "was",  "winner": "form"},
    {"wrongVerb": "are",  "rightVerb": "is",   "winner": "form"},
    {"wrongVerb": "is",   "rightVerb": "are",  "winner": "near"},
    {"wrongVerb": "pay",  "rightVerb": "pays", "winner": "meaning"},
    {"wrongVerb": "are",  "rightVerb": "is",   "winner": "meaning"},
]


# ================================================================
# 组题规则（generate_items.py 逐条照移，口径不变）
# ================================================================
def build(text):
    lm = load("laws_master", LM)
    byid = {r.get("id"): r for r in lm}
    vec = load("verb_error_cases", VEC)["cases"]
    vecby = {c["id"]: c for c in vec}
    forms = load("verb_forms_completion", FORMS)["rows"]
    formby = {r["base"]: r for r in forms}
    wb = load("wordbank", WB)
    wbby = {w["word"]: w for w in wb}
    taex = load("ta_exercises", TAEX)["units"]

    support = extract_support(text, byid)

    def law(lid):
        return byid[lid]["lawdata"]

    def exs_sent(lid, s):
        """按句锚定取例（2026-11-04 阶段2首波：例句补量后顺序可变，位置下标不再可靠；
        原例逐字保留口径保证锚句恒在，找不到即拦截）。"""
        if not any(x["s"] == s for x in law(lid)["exs"]):
            fail(f"种子锚句不在 {lid} exs 中：{s}")
        return s

    def exs_note(lid, s):
        for x in law(lid)["exs"]:
            if x["s"] == s:
                return x["note"]
        fail(f"种子锚句不在 {lid} exs 中：{s}")

    def must(cond, msg):
        if not cond:
            fail(msg)

    # 源文本池：一切「逐字」串必须能在此池中找到（子串断言）
    CORPUS = json.dumps([lm, vec, forms, wb, taex, support], ensure_ascii=False)

    def verbatim(s, what):
        must(s in CORPUS, f"逐字断言失败 [{what}]: {s[:60]}…")

    G02, G03, G12 = law("GR-02"), law("GR-03"), law("GR-12")
    TA05, TA06 = byid["TA-05"]["yaml"], byid["TA-06"]["yaml"]

    def strip_punct(tail):
        return tail.rstrip(".?").rstrip()

    # ---------------- D6 传送带 ----------------
    def third_sg(base):
        """三单形：标准拼写规则派生（have 例外）；与 GR-04/05 的 -s 拼写口径一致。
        若派生形恰是词库中另一词条（同形异义），返回 None 剔除该动词。"""
        if base == "have":
            return "has"
        if re.search(r"(s|x|z|ch|sh|[^aeiou]o)$", base):
            f = base + "es"
        elif re.search(r"[^aeiou]y$", base):
            f = base[:-1] + "ies"
        else:
            f = base + "s"
        hit = wbby.get(f)
        if hit is not None and hit.get("verb_form_of") not in (None, base):
            return None
        if hit is not None and hit.get("verb_form_of") is None and f != base:
            return None  # 已是独立词条（如名词同形），不用
        return f

    D6_SEEDS_PAST = [
        ("VEC-001", vecby["VEC-001"]["corrected"], "built", "the government"),
        ("VEC-002", vecby["VEC-002"]["corrected"], "went", "I"),
        ("VEC-003", vecby["VEC-003"]["corrected"], "went", "my family"),
        # VEC-004（hang out）未收：hang 不在五形式表 verb_forms_completion 中，按口径剔除；
        # 其时间状语 the day before yesterday 仍用于 D2 窗口池。
        ("VEC-005", vecby["VEC-005"]["corrected"], "watched", "I"),
        ("VEC-006", vecby["VEC-006"]["corrected"], "visited", "They"),
        ("VEC-019", vecby["VEC-019"]["corrected"], "went", "He"),
        ("VEC-020", vecby["VEC-020"]["corrected"], "ate", "I"),
        ("VEC-021", vecby["VEC-021"]["corrected"], "went", "He"),
        ("VEC-022", vecby["VEC-022"]["corrected"], "built", "The government"),
        ("TA-06 E4", "I saw him yesterday.", "saw", "I"),
        ("TN WINS", "I visited Beijing last year.", "visited", "I"),
        ("VEC-024", vecby["VEC-024"]["corrected"], "go", "She"),          # didn't go home（原形位切分）
        ("GEC-003", G03["cases"][0]["right"], "allow", "She"),           # didn't allow…（原形位切分）
        ("GR-02 ex1", exs_sent("GR-02", "Did you go to the park?"), "go", "you"),  # Did you go to the park?
    ]
    D6_SEEDS_PRES = [
        ("VEC-013", vecby["VEC-013"]["corrected"], "plays", "He"),
        ("VEC-014", vecby["VEC-014"]["corrected"], "goes", "She"),
        ("VEC-015", vecby["VEC-015"]["corrected"], "likes", "She"),
        ("GR-02 ex2", exs_sent("GR-02", "She doesn't like apples."), "like", "She"),  # doesn't like apples（原形位）
        ("GR-03 ex2", exs_sent("GR-03", "He doesn't play football today."), "play", "He"),  # doesn't play football today
        ("GEC-001", G02["cases"][0]["right"], "play", "He"),             # doesn't play games
        ("GEC-004", G03["cases"][1]["right"], "like", "He"),             # doesn't like this book
        ("GR-02 ex3", exs_sent("GR-02", "Does he play football?"), "play", "he"),  # Does he play football?
        ("VEC-016", vecby["VEC-016"]["corrected"], "attracts", "The Great Wall of China"),
    ]
    PAST_SUBJ_POOL = ["I", "you", "he", "she", "we", "they"]
    PRES_SUBJ_POOL = ["he", "she", "my father", "the boy", "the girl", "the teacher"]
    for w in ("boy", "girl", "teacher"):
        must(w in wbby and "n." in wbby[w]["pos"], f"主语槽名词 {w} 不在词库")

    def seed_pair(seed, family):
        src, sent, vform, subj = seed
        verbatim(sent, f"D6 种子句 {src}")
        i = sent.find(" " + vform + " ")
        must(i >= 0, f"种子 {src} 找不到动词形 {vform}: {sent}")
        tail = strip_punct(sent[i + len(vform) + 2:])
        must(tail and (tail + ".") in sent or (tail + "?") in sent or tail in sent,
             f"种子 {src} 尾巴切分异常")
        if family == "past":
            if vform in ("go", "allow"):  # 原形位切分（否定原句）：由五形式表反查过去形
                base = vform
                if vform in formby:
                    marked = formby[vform]["past"]
                else:  # 规则动词未入五形式表时按 -ed 规则派生（报告中标注）
                    marked = vform + ("d" if vform.endswith("e") else "ed")
            else:
                cands = [b for b, r in formby.items() if r["past"] == vform.split()[0]]
                must(cands, f"种子 {src} 过去形 {vform} 在五形式表无对应基形")
                base = cands[0]
                if " " in vform:  # 短语动词 hang out → hung out
                    base = base + vform[vform.index(" "):]
                    marked = vform
                else:
                    marked = vform
        else:
            if vform.endswith("s"):
                cands = [b for b in formby if third_sg(b) == vform]
                must(cands, f"种子 {src} 三单形 {vform} 无对应基形")
                base, marked = cands[0], vform
            else:
                must(vform in formby or vform in ("like", "play"), f"{src} 基形 {vform} 缺")
                base, marked = vform, third_sg(vform)
                must(marked, f"{src} 三单派生被剔除")
        lead = None
        pre = sent[:i].strip()
        for _aux in ("didn't", "doesn't"):  # 否定原句切分：助动词属于 aux 槽，不算主语前置
            if pre.endswith(_aux):
                pre = pre[:-len(_aux)].strip()
        for _aux in ("Did", "Does"):  # 问句原句切分：句首助动词属于 aux 槽
            if pre.startswith(_aux + " "):
                pre = pre[len(_aux) + 1:].strip()
        if pre != subj:
            # 主语之前的前置成分（Last year, / Yesterday / Last month,）作为 lead 槽原样保留
            must(pre.endswith(subj), f"种子 {src} 前置切分异常: pre={pre!r} subj={subj!r}")
            lead = pre[:len(pre) - len(subj)].strip() or None
        return {"src": src, "sent": sent, "base": base, "marked": marked,
                "tail": tail, "subj0": subj, "lead": lead}

    def subj_variants(pair, family):
        s0 = pair["subj0"]
        pool = PAST_SUBJ_POOL if family == "past" else PRES_SUBJ_POOL
        pool_low = [p.lower() for p in pool]
        if s0.lower() in pool_low:
            i = pool_low.index(s0.lower())
            return [s0] + [pool[(i + 1) % len(pool)], pool[(i + 2) % len(pool)]]
        return [s0]  # NP 主语不轮换（内容性主语）

    def d6_items():
        out, cand = [], 0
        for family, seeds, auxneg, auxq in (
                ("past", D6_SEEDS_PAST, "didn't", "Did"),
                ("pres", D6_SEEDS_PRES, "doesn't", "Does")):
            for seed in seeds:
                pair = seed_pair(seed, family)
                for subj in subj_variants(pair, family):
                    for state in ("aff", "neg", "q"):
                        cand += 1
                        out.append({"kind": "d6", "family": family, "src": pair["src"],
                                    "srcSent": pair["sent"], "lead": pair["lead"],
                                    "subj": subj, "tail": pair["tail"],
                                    "verb": {"base": pair["base"], "marked": pair["marked"]},
                                    "auxNeg": auxneg, "auxQ": auxq, "state": state})
        return out, cand

    d6_gen, d6_cand = d6_items()

    def stride_take(lst, n):
        if len(lst) <= n:
            return lst
        idx = sorted({int(i * len(lst) / n) for i in range(n)})
        must(len(idx) == n, "抽样数不符")
        return [lst[i] for i in idx]

    d6_gen = stride_take(d6_gen, 144)
    for i, it in enumerate(d6_gen):
        it["id"] = f"D6-G{i+1:03d}"

    g02c1, g02c2 = G02["cases"][0], G02["cases"][1]
    D6_EXPLAIN = {
        "double_past": {
            "kid": G02["mech"][0]["kid"], "kidSrc": "GR-02 mech「箭头只落一次」kid",
            "wrong": vecby["VEC-024"]["error_sentence"], "right": vecby["VEC-024"]["corrected"],
            "caseSrc": "病例 VEC-024（verb_error_cases.json）",
            "detail": vecby["VEC-024"]["note"], "detailSrc": "VEC-024 note"},
        "double_pres": {
            "kid": G02["mech"][0]["kid"], "kidSrc": "GR-02 mech「箭头只落一次」kid",
            "wrong": g02c1["wrong"], "right": g02c1["right"],
            "caseSrc": "病例 GEC-001（GR-02 cases）",
            "detail": g02c1["diag"], "detailSrc": "GEC-001 diag"},
        "double_look": {
            "kid": G02["mech"][0]["kid"], "kidSrc": "GR-02 mech「箭头只落一次」kid",
            "wrong": g02c2["wrong"], "right": g02c2["right"],
            "caseSrc": "病例 GEC-002（GR-02 cases）",
            "detail": g02c2["diag"], "detailSrc": "GEC-002 diag"},
        "gate_past": {
            "kid": G02["mech"][0]["kid"], "kidSrc": "GR-02 mech「箭头只落一次」kid",
            "wrong": vecby["VEC-006"]["error_sentence"], "right": vecby["VEC-006"]["corrected"],
            "caseSrc": "病例 VEC-006（verb_error_cases.json）",
            "detail": vecby["VEC-006"]["note"], "detailSrc": "VEC-006 note"},
        "gate_pres": {
            "kid": G02["mech"][0]["kid"], "kidSrc": "GR-02 mech「箭头只落一次」kid",
            "wrong": vecby["VEC-013"]["error_sentence"], "right": vecby["VEC-013"]["corrected"],
            "caseSrc": "病例 VEC-013（verb_error_cases.json）",
            "detail": vecby["VEC-013"]["note"], "detailSrc": "VEC-013 note"},
        "bench": {
            "kid": G03["mech"][0]["kid"], "kidSrc": "GR-03 mech「动词曾经自己会提问」kid",
            "wrong": None, "right": None, "caseSrc": "GR-03 exs 边界例 note",
            "detail": exs_note("GR-03", "Can you swim?"), "detailSrc": "GR-03 exs[3] note（Can you swim?）",
            "detail2": exs_note("GR-03", "Is she happy?"), "detail2Src": "GR-03 exs[2] note（Is she happy?）"},
    }
    for k, e in D6_EXPLAIN.items():
        verbatim(e["kid"], f"D6 explain {k} kid")
        verbatim(e["detail"], f"D6 explain {k} detail")
        if e.get("detail2"):
            verbatim(e["detail2"], f"D6 explain {k} detail2")
        if e["wrong"]:
            verbatim(e["wrong"], f"D6 explain {k} wrong")

    # ---------------- D2 时间窗 ----------------
    D2_EVENTS = [  # (id, 完成时源句, perf 块, past 块, 出处)
        ("visitBeijing", "I have visited Beijing.", "have visited", "visited", "TN WINS inlastyear/lastyear"),
        ("visitMuseum", "I have visited the museum.", "have visited", "visited", "TN WINS today"),
        ("readBooks", "I have read three books.", "have read", "read", "TN WINS thisweek"),
        ("loseKey", "I have lost my key.", "have lost", "lost", "TA-05 examples[0]"),
        ("finishHomeworkI", "I have finished my homework.", "have finished", "finished", "TA-05 examples[2]"),
        ("finishHomeworkHe", "He has finished his homework.", "has finished", "finished", "TA-05 练习 E1 answer"),
        ("liveHereWe", "We have lived here.", "have lived", "lived", "TA-05 examples[3]（去状语）"),
        ("liveHereI", "I have lived here.", "have lived", "lived", "TA-05 练习 E3 answer（去状语）"),
        ("seeHim", "I have seen him.", "have seen", "saw", "TA-06 examples[1]"),
        ("playPiano", "She has played the piano beautifully at the school talent show.",
         "has played", "played", "TA-06 练习 E3 corrected（去状语）"),
    ]
    D2_WINDOWS = [  # (key, 状语, 类, fill, 出处)
        ("since2020", "since 2020", "span", [58, 100], "TA-05 练习 E3 病例"),
        ("since2021", "since 2021", "span", [66, 100], "TA-06 examples[2]"),
        ("forthree", "for three years", "span", [70, 100], "TA-05 examples[3]"),
        ("recentyears", "in recent years", "span", [55, 100], "VEC-011 corrected"),
        ("today", "today", "period", [88, 100], "TN WINS"),
        ("thisweek", "this week", "period", [72, 100], "TN WINS"),
        ("inlastyear", "in the last year", "period", [34, 100], "TN WINS"),
        ("lastyear", "last year", "closed", [62, 100], "TN WINS"),
        ("in2023", "in 2023", "closed", [8, 30], "TN WINS"),
        ("yesterday", "yesterday", "closed", [84, 90], "TA-06 claim 清单"),
        ("lastmonth", "last month", "closed", [52, 68], "TA-06 练习 E3 病例"),
        ("lastnight", "last night", "closed", [93, 97], "TA-06 claim 清单"),
        ("in2019", "in 2019", "closed", [4, 12], "TA-06 claim 清单"),
        ("daybeforeyesterday", "the day before yesterday", "closed", [76, 82], "VEC-004 corrected"),
        ("atthree", "at three o'clock", "closed", [38, 41], "TA-06 练习 E6 选项"),
    ]
    WINS_KEYS = {("visitBeijing", "lastyear"), ("visitBeijing", "inlastyear"),
                 ("visitMuseum", "today"), ("readBooks", "thisweek"), ("visitBeijing", "in2023")}
    d2_items = []
    for ei, (eid, sent, perf, past, esrc) in enumerate(D2_EVENTS):
        verbatim(perf, f"D2 事件 {eid} perf 块")
        subj = sent[:sent.index(perf)].strip()
        tail = sent[sent.index(perf) + len(perf):].strip().rstrip(".")
        for wi, (wk, adv, cls, fill, wsrc) in enumerate(D2_WINDOWS):
            pin = D2_WINDOWS[(ei * 3 + wi + 5) % len(D2_WINDOWS)]
            if pin[0] == wk:
                pin = D2_WINDOWS[(ei * 3 + wi + 6) % len(D2_WINDOWS)]
            d2_items.append({"kind": "d2", "id": f"D2-{ei+1:02d}-{wk}", "event": eid,
                             "subj": subj, "perf": perf, "past": past, "tail": tail,
                             "eventSrc": esrc, "win": {"key": wk, "adv": adv, "cls": cls,
                                                       "fill": fill, "src": wsrc},
                             "pin": {"adv": pin[1], "cls": pin[2]},
                             "v1": (eid, wk) in WINS_KEYS})
    _v1 = [x for x in d2_items if x["v1"]]
    _rest = [x for x in d2_items if not x["v1"]]
    d2_items = _v1 + _rest
    must(len(d2_items) == 150 and len(_v1) == 5, f"D2 题数 {len(d2_items)} / v1 {len(_v1)}")

    D2_EXPLAIN = {
        "pinPerfect": {  # 完成时 + 点名过去图钉被弹回
            "kid": TA06["headline_kid"], "kidSrc": "TA-06 headline_kid",
            "byPin": {
                "yesterday": (vecby["VEC-007"]["error_sentence"], vecby["VEC-007"]["corrected"],
                              vecby["VEC-007"]["note"], "病例 VEC-007"),
                "last year": (vecby["VEC-008"]["error_sentence"], vecby["VEC-008"]["corrected"],
                              vecby["VEC-008"]["note"], "病例 VEC-008"),
                "last month": (vecby["VEC-009"]["error_sentence"], vecby["VEC-009"]["corrected"],
                               vecby["VEC-009"]["note"], "病例 VEC-009")},
            "detail": TA06["mechanism"][0]["text_adult"], "detailSrc": "TA-06 mechanism text_adult"},
        "pinPast": {  # 过去时 + 窗内型（since/for）图钉被弹回
            "kid": "since/for 给的是「连到现在的一段」——完成时的合法时间伴侣",
            "kidSrc": "TA-06 examples[2] scene_note",
            "wrong": vecby["VEC-012"]["error_sentence"], "right": vecby["VEC-012"]["corrected"],
            "caseSrc": "病例 VEC-012（verb_error_cases.json）",
            "detail": vecby["VEC-012"]["note"], "detailSrc": "VEC-012 note"},
        "detached": {  # 窗拖离现在 → 牵连线断
            "kid": TA05["headline_kid"], "kidSrc": "TA-05 headline_kid",
            "detail": TA05["mechanism"][0]["text_kid"], "detailSrc": "TA-05 mechanism[0] text_kid"},
        "closed": {  # 关门窗落位 → 完成时被关出
            "kid": TA06["headline_kid"], "kidSrc": "TA-06 headline_kid",
            "detail": TA06["mechanism"][0]["text_kid"], "detailSrc": "TA-06 mechanism[0] text_kid"},
    }
    verbatim(D2_EXPLAIN["pinPerfect"]["kid"], "D2 pinPerfect kid")
    verbatim(D2_EXPLAIN["pinPerfect"]["detail"], "D2 pinPerfect detail")
    verbatim(D2_EXPLAIN["pinPast"]["kid"], "D2 pinPast kid")
    verbatim(D2_EXPLAIN["detached"]["kid"], "D2 detached kid")
    verbatim(D2_EXPLAIN["closed"]["detail"], "D2 closed detail")

    # ---------------- D24 拔河 ----------------
    SG, PL = -1, 1

    def forces(form=None, meaning=None, near=None):
        f = {}
        for k, v in (("form", form), ("meaning", meaning), ("near", near)):
            f[k] = {"dir": v[0], "p": v[1]} if v else {"dir": 0, "p": 0}
        return f

    def net(f):
        return sum(x["dir"] * x["p"] for x in f.values())

    D24 = []

    def d24add(fam, pre, post, sgform, plform, f, srcnote):
        n = net(f)
        must(n != 0, f"D24 {fam} {pre} 净力为 0")
        D24.append({"kind": "d24", "fam": fam, "pre": pre, "post": post,
                    "verb": {"sg": sgform, "pl": plform}, "forces": f,
                    "winner": "pl" if n > 0 else "sg", "src": srcnote})

    # R1 代词（be 现在/过去、play、like、have）
    PRON = [("I", "sg", "am", "are", "was", "were"), ("you", "pl", "is", "are", "was", "were"),
            ("he", "sg", "is", "are", "was", "were"), ("she", "sg", "is", "are", "was", "were"),
            ("it", "sg", "is", "are", "was", "were"), ("we", "pl", "is", "are", "was", "were"),
            ("they", "pl", "is", "are", "was", "were")]
    for w, cls, psg, ppl, wasg, wapl in PRON:
        d = SG if cls == "sg" else PL
        f = forces(form=(d, 3), meaning=(d, 1))
        d24add("pron-be-pres", w, "happy.", psg, ppl, f, "R1 代词类")
        d24add("pron-be-past", w, "happy.", wasg, wapl, f, "R1 代词类")
    for w, cls, *_ in PRON:
        d = SG if cls == "sg" else PL
        f = forces(form=(d, 3), meaning=(d, 1))
        if w != "it":
            d24add("pron-lex", w, "football.", "plays", "play", f, "R1 + GR-03 ex play football")
        d24add("pron-lex", w, "milk.", "likes", "like", f, "R1 + GR-03 ex like milk")
        d24add("pron-have", w, "a pen.", "has", "have", f, "R1 + GR-12 ex a pen")

    # R2 简单名词主语
    SG_NOUNS = ["cat", "dog", "boy", "girl", "baby", "bird", "duck", "monkey",
                "teacher", "student", "sister", "brother"]
    PL_NOUNS = ["cats", "dogs", "boys", "girls", "babies", "birds", "ducks",
                "monkeys", "teachers", "students"]
    for n in SG_NOUNS:
        must(n in wbby and "n." in wbby[n]["pos"], f"D24 单数名词 {n} 不在词库")
        f = forces(form=(SG, 3), meaning=(SG, 1))
        d24add("noun-be", f"The {n}", "happy.", "is", "are", f, "R2 简单主语")
    for n in SG_NOUNS[:8]:
        f = forces(form=(SG, 3), meaning=(SG, 1))
        d24add("noun-be-past", f"The {n}", "happy.", "was", "were", f, "R2 简单主语（过去）")
    for n in PL_NOUNS:
        f = forces(form=(PL, 3), meaning=(PL, 1))
        d24add("noun-be", f"The {n}", "happy.", "is", "are", f, "R2 简单主语（复数形）")
    for n in PL_NOUNS[:6]:
        f = forces(form=(PL, 3), meaning=(PL, 1))
        d24add("noun-be-past", f"The {n}", "happy.", "was", "were", f, "R2 简单主语（过去·复数）")
    for n in ("boy", "girl", "teacher", "student"):
        f = forces(form=(SG, 3), meaning=(SG, 1))
        d24add("noun-lex", f"The {n}", "football.", "plays", "play", f, "R2 + GR-03 ex")
        d24add("noun-lex", f"The {n}", "milk.", "likes", "like", f, "R2 + GR-03 ex")
        d24add("noun-have", f"The {n}", "a pen.", "has", "have", f, "R2 + GR-12 ex")
    for n in ("boys", "girls", "teachers", "students"):
        f = forces(form=(PL, 3), meaning=(PL, 1))
        d24add("noun-lex", f"The {n}", "football.", "plays", "play", f, "R2 + GR-03 ex")
        d24add("noun-lex", f"The {n}", "milk.", "likes", "like", f, "R2 + GR-03 ex")
    d24add("noun-have", "The boys", "a pen.", "has", "have",
           forces(form=(PL, 3), meaning=(PL, 1)), "R2 + GR-12 ex")
    d24add("noun-have", "The girls", "a pen.", "has", "have",
           forces(form=(PL, 3), meaning=(PL, 1)), "R2 + GR-12 ex")

    # R3 there be（就近 p4 主导）
    LOCS = ["on the desk.", "on the table.", "under the tree."]

    def np_sg(n):
        return ("an " if n[0] in "aeiou" else "a ") + n

    TB_SG = ["pen", "book", "apple", "key", "cat", "box", "ball", "cup", "dog", "egg"]
    TB_PL = [("two", "books"), ("two", "pens"), ("three", "cats"), ("two", "dogs"),
             ("three", "apples"), ("two", "boxes"), ("two", "balls"), ("two", "cups")]
    for i, n in enumerate(TB_SG):
        must(n in wbby, f"there be 名词 {n} 不在词库")
        f = forces(form=(SG, 1), meaning=(SG, 1), near=(SG, 4))
        d24add("there-be", "There", f"{np_sg(n)} {LOCS[i % 3]}", "is", "are", f, "R3 + GR-12 ex")
    for i, (num, n) in enumerate(TB_PL):
        f = forces(form=(PL, 1), meaning=(PL, 1), near=(PL, 4))
        d24add("there-be", "There", f"{num} {n} {LOCS[i % 3]}", "is", "are", f, "R3 + GR-12 ex")
    for num, n in (("3", "watermelons"), ("3", "apples"), ("4", "cats"),
                   ("3", "books"), ("4", "dogs"), ("3", "eggs")):
        f = forces(form=(PL, 1), meaning=(PL, 1), near=(PL, 4))
        d24add("there-be", "There", f"{num} {n} on the desk.", "is", "are", f, "R3 + GR-12 病例 there is 3 watermelons 型")
    PAIRS = [("pen", "books"), ("apple", "cats"), ("key", "boxes"),
             ("book", "pens"), ("cat", "dogs"), ("box", "apples")]
    for a, b in PAIRS:
        f = forces(form=(SG, 1), meaning=(SG, 1), near=(SG, 4))
        d24add("there-be", "There", f"{np_sg(a)} and two {b} on the desk.", "is", "are", f, "R3 + GR-12 ex1 型")
        f = forces(form=(PL, 1), meaning=(PL, 1), near=(PL, 4))
        d24add("there-be", "There", f"two {b} and {np_sg(a)} on the desk.", "is", "are", f, "R3 + GR-12 ex2 型")

    # R4 中心词 + of/to + 复数尾
    for tail in ("doors", "windows", "boxes", "rooms", "books"):
        f = forces(form=(SG, 3), meaning=(SG, 2), near=(PL, 2))
        d24add("of-phrase", "The key to the " + tail, "on the table.", "is", "are", f, "R4 + GR-12 病例 population 型")
    # R6 one of the + 复数
    for n in ("boys", "girls", "students", "teachers", "cats", "dogs"):
        f = forces(form=(SG, 3), meaning=(SG, 2), near=(PL, 2))
        d24add("one-of", f"One of the {n}", "happy.", "is", "are", f, "R6 中心词 one")
    # R5 most of the + 不可数
    for n in ("time", "money", "water", "work"):
        must(n in wbby and "n." in wbby[n]["pos"], f"most-of 名词 {n} 不在词库")
        f = forces(form=(SG, 1), meaning=(SG, 3))
        d24add("most-of", f"Most of the {n}", "wasted.", "is", "are", f, "R5 + GR-12 病例 Most of the time 型")

    d24_gen_total = len(D24)
    D24 = stride_take(D24, 139)
    for i, it in enumerate(D24):
        it["id"] = f"D24-G{i+1:03d}"

    g12c = {i: c for i, c in enumerate(G12["cases"])}
    D24_EXPLAIN = {
        "force_form": {"kid": G12["kid"], "kidSrc": "GR-12 kid",
                       "wrong": g12c[2]["wrong"], "right": g12c[2]["right"],
                       "caseSrc": "病例 GEC-018（GR-12 cases）", "detail": g12c[2]["diag"],
                       "detailSrc": "GEC-018 diag"},
        "force_meaning": {"kid": G12["kid"], "kidSrc": "GR-12 kid",
                          "wrong": g12c[0]["wrong"], "right": g12c[0]["right"],
                          "caseSrc": "病例 GEC-016（GR-12 cases）", "detail": g12c[0]["diag"],
                          "detailSrc": "GEC-016 diag"},
        "force_meaning_ref": {"kid": G12["kid"], "kidSrc": "GR-12 kid",
                              "wrong": g12c[5]["wrong"], "right": g12c[5]["right"],
                              "caseSrc": "病例 GEC-021（GR-12 cases）", "detail": g12c[5]["diag"],
                              "detailSrc": "GEC-021 diag"},
        "force_near": {"kid": G12["mech"][1]["kid"], "kidSrc": "GR-12 mech「there be 看第一个名字」kid",
                       "wrong": g12c[3]["wrong"], "right": g12c[3]["right"],
                       "caseSrc": "病例 GEC-019（GR-12 cases）", "detail": g12c[3]["diag"],
                       "detailSrc": "GEC-019 diag"},
        "case": {str(i): {"kid": G12["kid"], "kidSrc": "GR-12 kid",
                          "wrong": c["wrong"], "right": c["right"],
                          "caseSrc": f"本病例（GR-12 cases {i+1}）", "detail": c["diag"],
                          "detailSrc": f"GR-12 cases[{i}] diag"} for i, c in g12c.items()},
    }
    for grp in ("force_form", "force_meaning", "force_meaning_ref", "force_near"):
        verbatim(D24_EXPLAIN[grp]["detail"], f"D24 explain {grp}")

    # ---------------- 汇总与题量断言 ----------------
    counts = {"d6_candidates": d6_cand, "d6_gen": len(d6_gen),
              "d2": len(d2_items), "d24_candidates": d24_gen_total, "d24_gen": len(D24)}
    if not (len(d6_gen) == 144 and len(d2_items) == 150 and len(D24) == 139):
        fail(f"题量断言失败：{counts}")
    totals = {"d6": len(MANUAL_D6) + len(d6_gen), "d2": len(d2_items),
              "d24": len(MANUAL_D24_FREE) + len(D24) + len(MANUAL_D24_CASE_VERBS)}
    if totals != {"d6": 150, "d2": 150, "d24": 150}:
        fail(f"每件 150 题断言失败：{totals}")

    data = {"d6": d6_gen, "d2": d2_items, "d24": D24,
            "explain": {"d6": D6_EXPLAIN, "d2": D2_EXPLAIN, "d24": D24_EXPLAIN},
            "support": support,
            "manual": {"d6": MANUAL_D6, "d24free": MANUAL_D24_FREE,
                       "d24caseVerbs": MANUAL_D24_CASE_VERBS},
            "counts": counts}
    return data, counts


def render(text):
    data, stats = build(text)
    return JD(data), stats


def check(text, rendered):
    span = find_span(text, ANCHOR, "{")
    if span is None:
        print("FAIL: 主文件找不到 var INTERACT 字面量（先运行 --write 生成）")
        return 1
    s, e = span
    cur = text[s:e]
    if cur == rendered:
        print(f"PASS: INTERACT 字面量逐字节一致（{len(cur)} 字符）")
        return 0
    try:
        a = json.loads(cur)
        b = json.loads(rendered)
    except Exception as ex:
        print("FAIL: 字面量无法解析:", ex)
        return 1
    if a == b:
        print("FAIL: 内容深相等但序列化不同（字节漂移）")
        return 1
    print("FAIL: INTERACT 内容不一致（现行 != 生成）")
    return 1


def write(text, rendered):
    span = find_span(text, ANCHOR, "{")
    if span is not None:
        s, e = span
        out = text[:s] + rendered + text[e:]
        lines = out.split("\n")
        for i, ln in enumerate(lines):
            if ANCHOR in ln:
                prev = lines[i - 1] if i > 0 else ""
                if not MARKER_RE.match(prev):
                    lines.insert(i, MARKER)
                break
        return "\n".join(lines)
    # 首次插入：INTERACT 数据块放在 IX 引擎块之前；无引擎块时放在 </body> 之前
    block = f"<script>\n{MARKER}\n{ANCHOR} {rendered};\n</script>\n"
    j = text.find(IX_ENGINE_ANCHOR)
    if j >= 0:
        return text[:j] + block + text[j:]
    k = text.find("</body>")
    if k < 0:
        fail("主文件找不到 </body>，无法插入 INTERACT 块")
    return text[:k] + block + text[k:]


def main(argv):
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    text = MAIN.read_text(encoding="utf-8")
    rendered, stats = render(text)
    print("组题计数：" + " · ".join(f"{k}={v}" for k, v in stats.items())
          + " · 每件合计 150 题（D6 手工6+生成144 / D2 150 / D24 自由台144+病例6）")
    if argv[1] == "--check":
        return check(text, rendered)
    new = write(text, rendered)
    if new != text:
        MAIN.write_text(new, encoding="utf-8")
        print(f"写回完成：INTERACT 字面量 {len(rendered)} 字符")
    else:
        print("写回完成：与现行逐字节相同，文件未改动")
    return check(MAIN.read_text(encoding="utf-8"), rendered)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
