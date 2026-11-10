#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_phonlaws.py — 拼读律页运行时记录 PHONLAWS 的 quiz 注入生成器
（2026-11-11 S-44 行新增后：同时拥有 S-44 整行的生成）。

背景（2026-11-10 内容缺口波 CONTENT_GAP_SUMMARY.md §四.3 登记）：
  主文件 52 条 PHONLAWS 条目的 quiz 全为 []，且此前没有任何工具生成
  `var PHONLAWS=`（各检查脚本只读它）。S/SR 104 题只活在 yaml 事实源，
  拼读律页运行时显示 0 练习。本生成器是该缺口的打通工具：只改 quiz
  字段，其余字段一字不动。
  2026-11-11（剩下 4 件之 S-44 运行时线）：S-44 的 2 道 quiz 只在
  yaml/总表，不进运行时——PHONLAWS 字面量无 S-44 行。本生成器扩展
  为支持行新增：从事实源生成 S-44 完整行并插入，其余 52 行仍只换
  quiz、非 quiz 字段一字不动。

事实源（《数据源规范》§1「规律」行：总表为准，yaml 为历史源头）
  - laws-prototype/model/laws_master.json（规律总表 yaml 分仓）
  - laws-prototype/model/laws/phonics.yaml（yaml 本体，逐条交叉核对；
    check_upstream 链 [a] 已断言两者 429 条深比全等，本生成器再对
    S/SR 53 条的 quiz 逐条深比）
  - S-44 行其余字段的事实源（见 build_s44_row；投影口径由 52 行全量
    反推验证，见下）：
    model/laws_master.json（S-44 canonical.title → hl；relations_teaching
    → rel）、model/wordbank.json + model/phonetic_gb.json（例词音标/释义）、
    model/laws/probes.yaml / probes_wave1.yaml / probes_wave2.yaml（探针库）

生成目标：主文件 mengxing-prototype-v1.html 的 `var PHONLAWS=` 字面量
  （单行，json.dumps(ensure_ascii=False) 默认分隔符；实测重序列化与
  现行字面量逐字节一致，见 build() 内断言）。

映射口径（内容逐字照录，只换键名）
  - yaml quiz 条目 {q, answer, hint} -> 运行时条目 {q, a, h}。
  - 键名必须换：律页渲染器 LAW.kidView / LAW.open 与复习引擎
    srcLAWDATA 一律读 q.a / q.h，不读 answer / hint；原样照搬会使律页
    显示「答案：undefined」。无 opts 键的条目走渲染器既有 reveal
    分支（「想好了？看答案」）与复习引擎 kind='reveal' 分支，LAWDATA
    已有同形条目在先（如 QI-15），无需改渲染器。
  - 顺序与文案一字不动；题干内嵌的 A./B. 选项随 q 原样保留。

S-44 行投影口径（由现行 52 行逐字段反推，全量验证计数见括号内）
  - id/g/zone：id、group、"phon"（52/52）。
  - hl：总表 canonical.title（若有）否则 yaml headline。S-44 的
    canonical.title 为「-s 和 -ed 各有三种读法」，与 ROSTER[0] 一字
    相同；这是 S-44 唯一偏离「hl == yaml headline」之处——其余 52 行
    canonical.title 皆为空、hl == yaml headline（52/52）。偏离是被迫的：
    check_lawdata_roster 硬断言 hl == ROSTER[0]，而 ROSTER[0] 由
    gen_roster 按 canonical.title → yaml headline 的链派生，改 ROSTER
    须改总表事实源，不在本任务范围；本生成器在 build() 内再读主文件
    ROSTER 交叉核对 hl（见下）。yaml 长标题仍活在 yaml/总表事实源，
    未丢失；律页标题取短名，与 morph 区呈现位（NEW-T）一致。
  - kid：yaml headline_kid（52/52）。aud：""（52/52）。
  - ctype/cstmt/scope/exc：claim.type / .statement / .scope /
    .exceptions（52/52）。
  - mech：仅 beats[0]，形为 {beat, kid: text_kid, adult: text_adult}
    （52/52）；其余 beats 不进 mech。
  - cev：claim.evidence + beats[1:] 各一条「机制补遗 · {beat}：
    {text_adult}」（52/52）。
  - exs：yaml examples 逐组，s = ", ".join(words)、note = group，
    words 逐词 {w, p, m}——p = phonetic_gb.gb（按 wordbank_id）否则
    wordbank phonetic，m = wordbank meaning（p/m 52 行 0 处不符）；
    无 wordbank_id 的词不进 words 数组（s 仍按 yaml 全词列出；
    52 行共 29 词被此规则滤掉，如 S-18 的 buses/watches/wanted）。
    S-44 六词 boots/birds/branches/walked/called/decided 皆有
    wordbank_id 且 gb 与 wordbank 音标一致，无一被滤。
  - cases：yaml error_cases 原样（仅 S-14/S-43/SR-04 三条有病例且
    运行时为手写孩子版改写；S-44 error_cases 为 [] → cases 为 []）。
  - prb：探针库全量对象；S-44 在 probes*.yaml 中无 PRB-S44-* 且
    yaml probes 为 [] → prb 为 []（S-43 同为 yaml probes [] 但库
    中有 PRB-S43-1，故有 1 条——以库为准）。
  - rel：总表 relations_teaching 的投影 {id, rel: kind}，kind 只许
    前置/同族/对照（现行运行时 rel 727 条皆属此三类）。S-44 的
    relations_teaching 为空 → rel 为 []；其 yaml relatives 所载两条
    「分工：…」属总表 relations（裁定型），已由 gen_links 汇入
    LINKIDX.g 的 r/s 槽，律页「相关规律」区只读 LINKIDX 渲染，孩子
    侧不断链；把长文 kind 塞进 LAWDATA.rel 会触发
    check_rel_coverage 的 kind 槽断言，故不塞。
  - srcs：adult.sources + ["订正登记：" + c for c in corrections]
    （52 行中 18 行另有一条手写「互见：探针 … 亦挂在拼读模式页」
    互见注，皆有探针在库；S-44 无探针、无 corrections → srcs 即
    sources 本身）。bnd：adult.boundary（52/52）。
  - disp：adult.disputes（52 行仅 S-42 一字漂移「实务说法/计数办法」
    与运行时「实务口径/计数口径」相异，属既有漂移；S-44 disputes
    为 []）。grade：adult.evidence_grade（52/52）。
  - pend：yaml pending ∪ {"模型缺口登记：quiz、" + "、".join(gaps)}
    （52/52 集合相等；quiz 至今列在登记里是历史遗留——登记写于
    quiz 未入运行时之时，52 行皆然，S-44 沿用同一写法）。
  - gate：仅当 yaml 有 config_gates 时生成 {cur: "A1（已裁定，
    2026-11-02）", note: config_gates.ruling_A, opts: {}}（3 行
    S-09/S-13/S-43）；S-44 无 config_gates → 无 gate 字段。
  - pterm：仅 S-01/S-13/S-23 三条为 true（按定版不设练习题的终态
    标记）；S-44 有练习 → 无 pterm 字段。
  - 字段序（22 个标准字段）：id, g, zone, hl, kid, aud, ctype,
    cstmt, scope, cev, exc, mech, exs, cases, quiz, prb, rel,
    srcs, bnd, disp, grade, pend。

本生成器拥有 quiz 字段 + S-44 整行
  - 52 行：生成前后逐路径深比：差异路径必须全部落在 $.<id>.quiz
    之内，任一非 quiz 字段差异即停（见 build() 末尾断言）。其余
    22 个字段以现行字面量为模板原样保留，不从事实源重算——52 行
    的既有漂移（S-42 一字、S-08 等 18 行互见注、S-14/S-43/SR-04
    病例孩子版改写、exs 滤词）一律原样保留，不擅自「纠正」。
  - S-44 行：由 build_s44_row() 从事实源全量派生；--check 时现行
    行须与派生结果逐字节（深比）一致，任一字段漂移即停；--write
    时若现行无此行则插入（S-43 与 SR-01 之间），若有则须已一致。
  - ROSTER 联动：S-44 进 PHONLAWS 后，gen_roster 的 route_of 改
    判 S-44 路由 M（词根区）→ L（律页），须另跑 gen_roster.py
    --write 再生 ROSTER（名册 456 条不变，仅 S-44 路由一格）；
    本生成器不改 ROSTER，只在 build() 内读现行 ROSTER 核对 hl。

冻结断言（任一失败即停，退出码 1）
  - S 组 quiz 88 题（44 条 × 2）、SR 组 18 题（9 条 × 2），合计 106 题。
  - 每条 quiz 恰 2 题；每题键恰为 {q, answer, hint}，三值皆为非空串。
  - yaml 本体与总表 yaml 分仓的 S/SR quiz 逐条深比全等。
  - PHONLAWS 键集恰为上述 53 条；现行 quiz 须为 [] 或已等于映射结果
    （非空且不等者视为漂移，拒绝静默覆盖）；S-44 行须与派生结果一致。
  - 题面不得含 `</script`（大小写不敏感）与 U+2028/U+2029（内联脚本
    字面量安全）。

用法
  python3 laws-prototype/tools/gen_phonlaws.py --check   # 稳态校验：
      现行字面量 == 生成结果（逐字节）且生成标记在位
  python3 laws-prototype/tools/gen_phonlaws.py --write   # 注入 quiz 并
      写回（只替换 PHONLAWS 字面量跨度 + 补生成标记行；写前在内存中
      完成全部断言）
退出码：0=通过；1=断言失败/不一致；2=用法错误。
门禁：check_all.py 第 28 项（gen_phonlaws --check）。
"""
import json
import re
import sys
import yaml
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # laws-prototype/
MAIN = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model" / "laws_master.json"
PHONICS_YAML = ROOT / "model" / "laws" / "phonics.yaml"
WORDBANK = ROOT / "model" / "wordbank.json"
PHONETIC_GB = ROOT / "model" / "phonetic_gb.json"
PROBE_YAMLS = [ROOT / "model" / "laws" / "probes.yaml",
               ROOT / "model" / "laws" / "probes_wave1.yaml",
               ROOT / "model" / "laws" / "probes_wave2.yaml"]

ANCHOR = "var PHONLAWS="
MARKER = ("/* GENERATED: tools/gen_phonlaws.py ← model/laws_master.json "
          "(yaml 分仓) + model/laws/phonics.yaml · DO NOT EDIT */")

JD = lambda o: json.dumps(o, ensure_ascii=False)  # 默认分隔符 — 与现行字面量字节格式一致

S_IDS = [f"S-{i:02d}" for i in range(1, 45)]    # S-01..S-44
SR_IDS = [f"SR-{i:02d}" for i in range(1, 10)]  # SR-01..SR-09
EXPECTED_IDS = S_IDS + SR_IDS                   # 53 条
EXPECTED_TOTAL = 106                            # S 88 + SR 18


def fail(msg):
    raise AssertionError(msg)


def scan_literal(src, start):
    """从 start 处的 '{' 起做花括号匹配，返回字面量结尾下标（含 '}'）。"""
    depth = 0
    instr = False
    esc = False
    for p in range(start, len(src)):
        ch = src[p]
        if instr:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                instr = False
        else:
            if ch == '"':
                instr = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return p
    raise ValueError("PHONLAWS 字面量花括号未闭合")


def find_span(src):
    """定位 var PHONLAWS= 字面量跨度 (start, end)，end 为 '}' 后一位。"""
    hits = []
    i = 0
    while True:
        j = src.find(ANCHOR, i)
        if j < 0:
            break
        hits.append(j)
        i = j + len(ANCHOR)
    if len(hits) != 1:
        fail(f"锚点 {ANCHOR!r} 命中 {len(hits)} 处（应为 1），拒绝操作")
    a = hits[0]
    s = src.find("{", a)
    if s < 0:
        fail("PHONLAWS 锚点后无 '{'")
    return s, scan_literal(src, s) + 1


def roster_title(src, lid):
    """读主文件现行 ROSTER，返回 ROSTER[lid][0]（hl 交叉核对用）。"""
    a = src.find("var ROSTER=")
    if a < 0:
        fail("主文件无 var ROSTER=，无法核对 hl")
    s = src.find("{", a)
    if s < 0:
        fail("ROSTER 锚点后无 '{'")
    roster = json.loads(src[s:scan_literal(src, s) + 1])
    if lid not in roster:
        fail(f"ROSTER 缺 {lid}，无法核对 hl")
    return roster[lid][0]


def marker_present(src):
    a = src.find(ANCHOR)
    ls = src.rfind("\n", 0, a) + 1
    prev_end = ls - 1
    if prev_end <= 0:
        return False
    prev_start = src.rfind("\n", 0, prev_end) + 1
    return src[prev_start:prev_end].strip() == MARKER


def ensure_marker(src):
    """在 var PHONLAWS= 行首前补生成标记行（已在位则不动）。"""
    if marker_present(src):
        return src
    a = src.find(ANCHOR)
    ls = src.rfind("\n", 0, a) + 1
    return src[:ls] + MARKER + "\n" + src[ls:]


def check_quiz_shape(lid, qz):
    """断言 yaml quiz 为恰 2 题、键恰为 {q, answer, hint}、三值皆为
    非空串、无内联字面量禁字符；返回映射后的运行时 quiz [{q, a, h}]。"""
    if not isinstance(qz, list) or len(qz) != 2:
        fail(f"{lid} yaml quiz 应恰为 2 题，实得 {len(qz) if isinstance(qz, list) else type(qz)}")
    mapped = []
    for qi, q in enumerate(qz):
        if not isinstance(q, dict) or set(q.keys()) != {"q", "answer", "hint"}:
            fail(f"{lid} 第 {qi + 1} 题键应恰为 {{q, answer, hint}}，实得 {sorted(q.keys()) if isinstance(q, dict) else type(q)}")
        for k in ("q", "answer", "hint"):
            v = q[k]
            if not isinstance(v, str) or not v.strip():
                fail(f"{lid} 第 {qi + 1} 题 {k} 为空或非字符串")
            if "</script" in v.lower():
                fail(f"{lid} 第 {qi + 1} 题 {k} 含 </script>，拒绝写入内联字面量")
            if "\u2028" in v or "\u2029" in v:
                fail(f"{lid} 第 {qi + 1} 题 {k} 含 U+2028/U+2029，拒绝写入内联字面量")
        mapped.append({"q": q["q"], "a": q["answer"], "h": q["hint"]})
    return mapped


def load_quiz():
    """读事实源，返回 {id: [运行时 quiz 条目 {q, a, h}, ...]}（S 88 + SR 18）。"""
    recs = json.loads(MASTER.read_text(encoding="utf-8"))
    byid = {r["id"]: r for r in recs if isinstance(r, dict)}
    doc = yaml.safe_load(PHONICS_YAML.read_text(encoding="utf-8"))
    ybyid = {e["id"]: e for e in doc["entries"]}
    out = {}
    for lid in EXPECTED_IDS:
        rec = byid.get(lid)
        if rec is None:
            fail(f"总表缺 {lid}")
        y = rec.get("yaml")
        if not isinstance(y, dict):
            fail(f"{lid} 总表 yaml 分仓缺失")
        qz = y.get("quiz")
        yrec = ybyid.get(lid)
        if yrec is None:
            fail(f"phonics.yaml 缺 {lid}")
        if (yrec.get("quiz") or []) != qz:
            fail(f"{lid} phonics.yaml quiz 与总表 yaml 分仓不一致")
        out[lid] = check_quiz_shape(lid, qz)
    n_s = sum(len(out[i]) for i in S_IDS)
    n_sr = sum(len(out[i]) for i in SR_IDS)
    if n_s != 88 or n_sr != 18 or n_s + n_sr != EXPECTED_TOTAL:
        fail(f"题数冻结断言失败：S {n_s}/88、SR {n_sr}/18、合计 {n_s + n_sr}/106")
    return out, byid, ybyid


def load_wordbank():
    """词库：wordbank.json（词形→{id, phonetic, meaning}）+
    phonetic_gb.json（wordbank id→英式音标 gb）。"""
    wb = json.loads(WORDBANK.read_text(encoding="utf-8"))
    byw = {e["word"]: e for e in wb}
    gb = json.loads(PHONETIC_GB.read_text(encoding="utf-8"))
    return byw, gb


def probe_exists(lid):
    """探针库（probes*.yaml）中是否存在 for_law == lid 的探针。"""
    for path in PROBE_YAMLS:
        doc = yaml.safe_load(path.read_text(encoding="utf-8"))
        for p in (doc or {}).get("probes") or []:
            if isinstance(p, dict) and (p.get("for_law") == lid
                                        or str(p.get("id") or "").startswith("PRB-" + lid)):
                return True
    return False


def build_s44_row(quiz_map, byid, ybyid):
    """从事实源派生 S-44 完整行（22 个标准字段；投影口径见文件头注，
    每字段均有断言）。S-44 是唯一由本生成器整行拥有的条目。"""
    lid = "S-44"
    rec = byid.get(lid)
    if rec is None:
        fail("总表缺 S-44")
    y = ybyid.get(lid)
    if y is None:
        fail("phonics.yaml 缺 S-44")
    if (y.get("quiz") or []) != (rec.get("yaml") or {}).get("quiz"):
        fail("S-44 phonics.yaml quiz 与总表 yaml 分仓不一致")
    # hl：canonical.title 优先（须与 ROSTER[0] 一致，build() 内再核对）
    hl = ((rec.get("canonical") or {}).get("title")
          or (rec.get("yaml") or {}).get("headline"))
    if not hl:
        fail("S-44 无 canonical.title 且无 yaml headline，无法定 hl")
    claim = y.get("claim") or {}
    adult = y.get("adult") or {}
    beats = (y.get("mechanism") or {}).get("beats") or []
    if not beats:
        fail("S-44 mechanism.beats 为空")
    b0 = beats[0]
    if not b0.get("text_kid") or not b0.get("text_adult"):
        fail("S-44 首节 beat 缺 text_kid/text_adult")
    # exs：例词须全进词库（有 wordbank_id 且有音标/释义），否则本行
    # 无法按既有口径派生——拒绝静默滤词（52 行的滤词是既有事实，
    # 新行不许再悄悄滤）。
    byw, gb = load_wordbank()
    exs = []
    for ex in y.get("examples") or []:
        words = []
        for w in ex.get("words") or []:
            e = byw.get(w)
            if e is None:
                fail(f"S-44 例词 {w!r} 不在 wordbank，无法派生 exs")
            p = (gb.get(e["id"]) or {}).get("gb") or e.get("phonetic")
            m = e.get("meaning")
            if not p or not m:
                fail(f"S-44 例词 {w!r} 缺音标或释义")
            words.append({"w": w, "p": p, "m": m})
        exs.append({"s": ", ".join(ex.get("words") or []),
                    "note": ex.get("group") or "",
                    "words": words})
    # prb：以探针库为准；S-44 库中无探针且 yaml probes 为 [] → []
    if (y.get("probes") or []) or probe_exists(lid):
        fail("S-44 探针状态与预期不符：yaml probes 应为空且探针库无 S-44"
             "（有探针须另立行派生规则，本生成器只处理 prb 为 [] 的情形）")
    # rel：只许 relations_teaching 投影；S-44 无此仓 → []
    if rec.get("relations_teaching"):
        fail("S-44 已有 relations_teaching，本生成器未登记其 rel 派生，须复核")
    # gate / pterm：S-44 无 config_gates、有练习 → 两字段皆无
    if y.get("config_gates"):
        fail("S-44 已有 config_gates，本生成器未登记其 gate 派生，须复核")
    gaps = y.get("gaps") or []
    pend = list(adult.get("pending") or []) + [
        "模型缺口登记：quiz、" + "、".join(gaps)]
    row = {
        "id": lid,
        "g": y.get("group") or "S",
        "zone": "phon",
        "hl": hl,
        "kid": y.get("headline_kid") or "",
        "aud": "",
        "ctype": claim.get("type") or "",
        "cstmt": claim.get("statement") or "",
        "scope": claim.get("scope") or "",
        "cev": list(claim.get("evidence") or []) + [
            f"机制补遗 · {b.get('beat')}：{b.get('text_adult')}"
            for b in beats[1:]],
        "exc": list(claim.get("exceptions") or []),
        "mech": [{"beat": b0.get("beat") or "",
                  "kid": b0.get("text_kid") or "",
                  "adult": b0.get("text_adult") or ""}],
        "exs": exs,
        "cases": list(y.get("error_cases") or []),
        "quiz": quiz_map[lid],
        "prb": [],
        "rel": [],
        "srcs": list(adult.get("sources") or []) + [
            "订正登记：" + c for c in (y.get("corrections") or [])],
        "bnd": adult.get("boundary") or "",
        "disp": list(adult.get("disputes") or []),
        "grade": adult.get("evidence_grade") or "",
        "pend": pend,
    }
    if not row["kid"] or not row["cstmt"] or not row["grade"]:
        fail("S-44 行派生缺必填字段（kid/cstmt/grade 至少其一为空）")
    if row["cases"]:
        fail("S-44 error_cases 非空，本生成器只处理 cases 为 [] 的情形"
             "（有病例须按 S-14/S-43/SR-04 的孩子版改写口径另行登记）")
    return row


def deep_diff_paths(a, b, path="$", out=None):
    if out is None:
        out = []
    if type(a) is not type(b):
        out.append(path)
        return out
    if isinstance(a, dict):
        for k in a:
            if k not in b:
                out.append(f"{path}.{k}")
            else:
                deep_diff_paths(a[k], b[k], f"{path}.{k}", out)
        for k in b:
            if k not in a:
                out.append(f"{path}.{k}")
    elif isinstance(a, list):
        if len(a) != len(b):
            out.append(f"{path}.length")
        for i in range(min(len(a), len(b))):
            deep_diff_paths(a[i], b[i], f"{path}[{i}]", out)
    elif a != b:
        out.append(path)
    return out


def build(src):
    """返回 (current, built_text)。52 行只改 quiz；S-44 行整行派生。"""
    quiz_map, byid, ybyid = load_quiz()
    s44_row = build_s44_row(quiz_map, byid, ybyid)
    # hl 须与现行 ROSTER[0] 一字相同（check_lawdata_roster 硬断言）
    rt = roster_title(src, "S-44")
    if s44_row["hl"] != rt:
        fail(f"S-44 hl {s44_row['hl']!r} 与 ROSTER[0] {rt!r} 不一致"
             "（改总表 canonical.title 或 ROSTER 派生链，另行立项）")
    s0, s1 = find_span(src)
    cur_text = src[s0:s1]
    current = json.loads(cur_text)
    extra = sorted(set(current) - set(EXPECTED_IDS))
    missing = sorted(set(EXPECTED_IDS) - set(current))
    if extra:
        fail(f"PHONLAWS 键集多出预期外条目：{extra}")
    if missing and missing != ["S-44"]:
        fail(f"PHONLAWS 键集缺失预期条目：{missing}（除 S-44 外不许缺行）")
    built = {}
    for lid in EXPECTED_IDS:
        if lid == "S-44":
            if lid in current:
                if current[lid] != s44_row:
                    fail("S-44 现行行与派生结果不一致（行字段漂移），拒绝静默覆盖")
                built[lid] = current[lid]
            else:
                built[lid] = s44_row
            continue
        ent = dict(current[lid])
        cur_q = ent.get("quiz")
        if cur_q is None:
            fail(f"{lid} 现行条目缺 quiz 键")
        if cur_q != [] and cur_q != quiz_map[lid]:
            fail(f"{lid} 现行 quiz 非空且与事实源映射结果不一致（漂移），拒绝静默覆盖")
        ent["quiz"] = quiz_map[lid]
        built[lid] = ent
    # 只 quiz 动 + S-44 整行新增：差异路径必须全部落在 $.<id>.quiz 内，
    # 或为 S-44 整行新增（$.S-44）；其余差异即停。
    diffs = deep_diff_paths(current, built)
    bad = [p for p in diffs
           if p != "$.S-44"
           and not re.match(r"^\$\.(S-\d\d|SR-\d\d)\.quiz(\.|$|\[)", p)]
    if bad:
        fail(f"非 quiz 字段出现差异（本生成器只拥有 quiz 与 S-44 整行）：{bad[:10]}")
    gen_text = JD(built)
    # 序列化口径自证：空 quiz 时重序列化须与现行字面量逐字节一致
    if all(current[lid].get("quiz") == [] for lid in EXPECTED_IDS if lid in current):
        probe = {lid: dict(current[lid], quiz=[]) for lid in EXPECTED_IDS if lid in current}
        if JD(probe) != cur_text:
            fail("序列化口径漂移：json.dumps(ensure_ascii=False) 重序列化现行字面量不一致")
    if json.loads(gen_text) != built:
        fail("生成字面量 JSON 回解析不一致")
    return current, gen_text


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    src = MAIN.read_bytes().decode("utf-8")
    try:
        current, gen_text = build(src)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    s0, s1 = find_span(src)
    cur_text = src[s0:s1]
    stale_ids = [lid for lid in EXPECTED_IDS
                 if lid not in current or current[lid].get("quiz") !=
                 json.loads(gen_text)[lid]["quiz"]]
    if argv[1] == "--check":
        problems = []
        if gen_text != cur_text:
            problems.append(f"字面量过期：{len(stale_ids)} 条 quiz 待注入"
                            f"（{', '.join(stale_ids[:5])}{'…' if len(stale_ids) > 5 else ''}）"
                            + ("；S-44 行待新增" if "S-44" not in current else ""))
        if not marker_present(src):
            problems.append("生成标记行缺失（待 --write 补）")
        if problems:
            for p in problems:
                print(f"FAIL: {p}")
            return 1
        print(f"PASS: PHONLAWS 字面量逐字节一致（{len(cur_text)} 字符；"
              f"53 条，quiz 106 题 = S 88 + SR 18，生成标记在位）")
        return 0
    out = src[:s0] + gen_text + src[s1:]
    out = ensure_marker(out)
    MAIN.write_bytes(out.encode("utf-8"))
    print(f"写回完成：文件 {len(src)} -> {len(out)} 字符"
          f"（PHONLAWS {len(cur_text)} -> {len(gen_text)} 字符；53 条，quiz 106 题 = S 88 + SR 18）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
