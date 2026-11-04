#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_links.py — 知识联动阶段 1（2026-11-03 Stewart 拍板）：全 App 链接索引
LINKIDX 的生成器。设计依据：docs/data-merge-2026-11-03/
knowledge-linkage-design.md 阶段 1。

事实源（全部为已登记数据源，零新编内容）：
  model/words_master.json    词枢纽：VC 词行（law_refs 第 12 位）、etym 分仓
  model/phonics_master.json  拼读模式成员（wordsets 正本，12,995 对；
                             2026-11-04 第三波 B 回填确合 1,620 对后）
  model/morph_data.json      词素家族页成员（words+sections+pending+kin）
  model/laws_master.json     规律户口（校验引用落点用）
  model/etymology.json       词源记录（2,278 条，与 words_master.etym 对账）
  主文件内嵌 X2.spine        拼读主线 167 站过关组（gen_phonics 不管辖此段，
                             以主文件现行为准解析）

生成目标：主文件 mengxing-prototype-v1.html 中 LINKIDX 脚本块内的
  var LINKIDX = {...} 字面量（带 GENERATED 标记；同块的 LINKGO 助手为
  手写代码，本生成器只替换字面量跨度，不动助手）。

LINKIDX 结构：
  w: { bankId: [word, [GP 模式 id...], [家族页 id...], [规律 id...],
                词源状态 0无/1已核/2待核, [[站序(0起), 站 key]...], 词源词形] }
     —— 仅收至少有一条边的词；无边词不建条（消费方查无此键即无联系）。
  l: { 规律 id: [bankId...] }   —— w 边第 4 槽的机械反转（TEC-* 除外）。
  e: { 词源词形: bankId }       —— 词源详情页「看词页」回链。
  g: { 规律 id: {p:[前置·先学], q:[前置·以我为先], k:[同族(双向并集)],
                 c:[对照(双向并集)], r:[[目标,类签,裁定注记]...](裁定出边),
                 s:[[来源,类签,裁定注记]...](裁定入边)} }
     —— 规律↔规律邻接，读总表统一户口（relations 47 条裁定型 +
        relations_teaching 885 条教学型＝509＋2026-11-05 R11-01 补迁 376，联动阶段 2）；空槽不建键。
  z: { 规律 id: "PN"|"AR"|"CJ"|"MZ" } —— 专区现行页路由（自现行区 LAWS /
     LAWREG 字面量解析，非总表推断）；LAWDATA 有条目（含指针）的规律不靠它。
  c: { 候选 id: 正条 id } —— 无现行页的候选 id 归一（自总表裁定关系
     「立条/并入/立条来源」机械导出），LINKGO.openLaw 仅作落空兜底。
  d: { 对话 id: [[英文词形(小写), bankId]...] } —— 对话词锚（联动阶段 2）：
     对话英文 token 与词库对齐（原形直配 + 下文写明的屈折剥离规则），
     词库 is_function_word 标记者不锚；规则外对不上的一律不锚。
  q: { 问答组 id(SQ-01…): [[英文词形(小写), bankId]...] } —— 场景问答词锚
     （2026-11-04 小件批补户口后新增）：scene_qa 的 q/a 英文按与对话完全
     相同的口径（同 TOKRE、同 lemma_match、同功能词排除）对齐词库；
     对话侧统计（623/528/2048）独立计算、互不污染。scene_qa 的 id 由
     extract_spoken 按源序派生（SQ-01…），gen_spoken 透传进 SP_DATA。

边的口径与纪律：
  - 词→规律只取 VC 词行第 12 位（与设计备忘总账同口径：3,618 条引用 /
    1,650 词 / 423 个 id）；wordbank.law_refs 是另一口径（3,696 条），
    不混用，差异在对账报告中登记。
  - TEC-*（89 个 id / 363 条引用）为技巧区外部 id 空间（《数据源规范》
    §7 已登记）：不建链、不入 l 表，计数在本脚本输出与阶段报告中登记。
  - 词→过关站：词的 bank id 出现在 X2.spine 某站 gate 组内即建边；
    站序为 spine 数组下标（0 起），站 key 为 "字素|音素" 原串。

用法：
  python3 laws-prototype/tools/gen_links.py --check   # 稳态校验（逐字节）
  python3 laws-prototype/tools/gen_links.py --write   # 生成并写回
退出码：0=通过；1=断言失败/不一致；2=用法错误。
"""
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # laws-prototype/
MAIN = ROOT / "mengxing-prototype-v1.html"
WM = ROOT / "model" / "words_master.json"
PM = ROOT / "model" / "phonics_master.json"
MD = ROOT / "model" / "morph_data.json"
LM = ROOT / "model" / "laws_master.json"
ET = ROOT / "model" / "etymology.json"
SP = ROOT / "model" / "spoken_data.json"
WB = ROOT / "model" / "wordbank.json"

JD = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))
MARKER = "/* GENERATED: tools/gen_links.py ← model/words+phonics+morph+laws+etymology.json · DO NOT EDIT */"
MARKER_RE = re.compile(r"^\s*/\* GENERATED: tools/gen_\w+\.py ← model/\S+ · DO NOT EDIT \*/\s*$")
ANCHOR = "var LINKIDX ="


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


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
    if len(hits) != 1:
        fail(f"锚点 {anchor!r} 命中 {len(hits)} 处（应为 1）")
    s = hits[0]
    return s, scan_literal(text, s)


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
    return seg[i:end]


def ruling_tag(note):
    """裁定注记的类签 = 注记首个 '：' 或 '（' 之前的部分（注记原文机械截取）。"""
    cut = len(note)
    for ch in ("：", "（"):
        j = note.find(ch)
        if 0 <= j < cut:
            cut = j
    return note[:cut].strip()


# 对话词锚的屈折剥离规则（联动阶段 2；按序试探，剥离结果必须命中词库才算数，
# 规则外对不上的词一律不锚——不规则变化如 went→go 不在此列）：
#   R0 原形直配；R1 缩约取词头（i'm→i、that's→that）或 n't 取干（can't→can）；
#   R2 -ies→-y；R3 -es 剥离；R4 -s 剥离（-ss 除外）；
#   R5 -ing 剥离 / +e / 尾双字母去重；R6 -ed 剥离 / 只剥 d（+e 形）/ 去重；
#   R7 -est / -er 剥离 / 去重。
def _undouble(s):
    if len(s) >= 2 and s[-1] == s[-2] and s[-1] not in "aeiou":
        return s[:-1]
    return None


def lemma_match(tok, bank_words):
    """返回 (规则名, 词库词形)；对不上返回 (None, None)。"""
    if tok in bank_words:
        return ("exact", tok)
    if "'" in tok:
        head = tok.split("'")[0]
        if head in bank_words:
            return ("contract-head", head)
        if tok.endswith("n't") and tok[:-3] in bank_words:
            return ("n't-stem", tok[:-3])
    cands = []
    if tok.endswith("ies") and len(tok) > 3:
        cands.append(("ies→y", tok[:-3] + "y"))
    if tok.endswith("es"):
        cands.append(("strip-es", tok[:-2]))
    if tok.endswith("s") and not tok.endswith("ss"):
        cands.append(("strip-s", tok[:-1]))
    if tok.endswith("ing"):
        b = tok[:-3]
        cands += [("strip-ing", b), ("ing+e", b + "e")]
        u = _undouble(b)
        if u:
            cands.append(("ing-undouble", u))
    if tok.endswith("ed"):
        b = tok[:-2]
        cands += [("strip-ed", b), ("ed→e", tok[:-1])]
        u = _undouble(b)
        if u:
            cands.append(("ed-undouble", u))
    if tok.endswith("est"):
        b = tok[:-3]
        cands.append(("strip-est", b))
        u = _undouble(b)
        if u:
            cands.append(("est-undouble", u))
    if tok.endswith("er"):
        b = tok[:-2]
        cands.append(("strip-er", b))
        u = _undouble(b)
        if u:
            cands.append(("er-undouble", u))
    for name, c in cands:
        if c and c in bank_words:
            return (name, c)
    return (None, None)


def load(name, path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as ex:
        fail(f"{name} 读取失败：{ex}")


def parse_spine(text):
    """从主文件解析 X2.spine（过关站边的事实源）。"""
    i = text.find("const X2 =")
    if i < 0:
        fail("主文件找不到 const X2 =")
    j = text.find('"spine":', i)
    if j < 0:
        fail("X2 内找不到 spine")
    p = j + len('"spine":')
    while text[p].isspace():
        p += 1
    if text[p] != "[":
        fail("spine 不是数组")
    e = scan_literal(text, p)
    try:
        return json.loads(text[p:e])
    except Exception as ex:
        fail(f"spine 解析失败：{ex}")


def build(text):
    wm = load("words_master", WM)
    pm = load("phonics_master", PM)
    md = load("morph_data", MD)
    lm = load("laws_master", LM)
    et = load("etymology", ET)
    spine = parse_spine(text)

    recs = wm["words"]
    by_bid = {}
    for r in recs:
        if r.get("wordbank_id"):
            by_bid[r["wordbank_id"]] = r
    master_ids = {r["id"] for r in lm}
    stats = {}

    # ---- 词→拼读模式（phonics_master 成员反转，模式序 = 总表序） ----
    pat_of = defaultdict(list)
    pairs = unres_pairs = 0
    unres_ids = set()
    for p in pm["patterns"]:
        pid = p["id"]
        for wid in p["wordsets"]["word_ids"]:
            pairs += 1
            if wid in by_bid:
                if pid not in pat_of[wid]:
                    pat_of[wid].append(pid)
            else:
                unres_pairs += 1
                unres_ids.add(wid)
    stats["phonics_pairs_total"] = pairs
    stats["phonics_pairs_unresolved"] = unres_pairs
    stats["phonics_unresolved_ids"] = len(unres_ids)
    stats["phonics_edges"] = sum(len(v) for v in pat_of.values())

    # ---- 词→词素家族页（页成员：words + sections.words + pending.bank_id + kin.words） ----
    page_of = defaultdict(list)
    raw_entries = 0
    for pid, pg in md["data"]["pages"].items():
        members = []
        members += pg.get("words") or []
        for s in pg.get("sections") or []:
            members += s.get("words") or []
        for s in pg.get("kin") or []:
            members += s.get("words") or []
        for s in pg.get("pending") or []:
            if s.get("bank_id"):
                members.append(s["bank_id"])
        raw_entries += len(members)
        for wid in members:
            if wid in by_bid and pid not in page_of[wid]:
                page_of[wid].append(pid)
    stats["morph_raw_entries"] = raw_entries
    stats["morph_edges"] = sum(len(v) for v in page_of.values())
    stats["morph_words"] = len(page_of)

    # ---- 词→规律（VC 词行第 12 位）+ 反转 ----
    law_of = {}
    ref_total = tec_refs = 0
    tec_ids = set()
    ref_ids = set()
    for r in recs:
        vc = r.get("vc") or {}
        row = vc.get("wlist")
        if not row:
            continue
        s = row[12] or ""
        ids = [x for x in s.split("、") if x]
        if not ids:
            continue
        ref_total += len(ids)
        ref_ids.update(ids)
        keep = []
        for lid in ids:
            if lid.startswith("TEC-"):
                tec_refs += 1
                tec_ids.add(lid)
            else:
                keep.append(lid)
        if keep:
            law_of[r["wordbank_id"]] = keep
    stats["law_refs_total"] = ref_total
    stats["law_ref_words"] = len(law_of) + sum(
        1 for r in recs
        if (r.get("vc") or {}).get("wlist") and (r["vc"]["wlist"][12] or "")
        and all(x.startswith("TEC-") for x in r["vc"]["wlist"][12].split("、") if x))
    stats["law_ref_ids"] = len(ref_ids)
    stats["tec_refs"] = tec_refs
    stats["tec_ids"] = len(tec_ids)
    nonmaster = [i for i in ref_ids if i not in master_ids and not i.startswith("TEC-")]
    if nonmaster:
        fail(f"VC 引用出现总表外且非 TEC 的 id：{nonmaster[:10]}")
    law_words = defaultdict(list)
    idx_of = {}
    for r in recs:
        vc = r.get("vc") or {}
        if vc.get("wlist_index") is not None:
            idx_of[r["wordbank_id"]] = vc["wlist_index"]
    for bid, lids in law_of.items():
        for lid in lids:
            law_words[lid].append(bid)
    for lid in law_words:
        law_words[lid].sort(key=lambda b: (idx_of.get(b, 10 ** 9), by_bid[b]["word"]))
    stats["law_edges"] = sum(len(v) for v in law_words.values())
    stats["laws_with_words"] = len(law_words)
    if stats["law_edges"] != sum(len(v) for v in law_of.values()):
        fail("规律边正反计数不一致")

    # ---- 词→词源（words_master.etym 分仓，与 etymology.json 对账） ----
    et_of = {}
    e_map = {}
    conflicts = 0
    for r in recs:
        e = r.get("etym")
        if not e:
            continue
        st = 1 if e.get("status") == "verified" else 2
        rec = e.get("record") or {}
        eword = rec.get("word") or e.get("word_form") or r["word"]
        et_of[r["wordbank_id"]] = (st, eword)
        if eword in e_map and e_map[eword] != r["wordbank_id"]:
            conflicts += 1
        else:
            e_map[eword] = r["wordbank_id"]
    et_words_master = {((e.get("record") or {}).get("word")) for e in
                       (r.get("etym") for r in recs) if e}
    et_file_words = {e["word"] for e in et}
    if et_words_master != et_file_words:
        fail(f"词源对账不一致：总表 {len(et_words_master)} vs etymology.json {len(et_file_words)}")
    stats["etym_edges"] = len(et_of)
    stats["etym_verified"] = sum(1 for v in et_of.values() if v[0] == 1)
    stats["etym_pending"] = sum(1 for v in et_of.values() if v[0] == 2)
    stats["etym_emap"] = len(e_map)
    stats["etym_emap_conflicts"] = conflicts

    # ---- 词→过关站（X2.spine gate 成员） ----
    st_of = defaultdict(list)
    gate_pairs = gate_unres = 0
    for idx, st in enumerate(spine):
        for g in st.get("gate") or []:
            gate_pairs += 1
            bid = g.get("id")
            if bid in by_bid:
                if [idx, st["key"]] not in st_of[bid]:
                    st_of[bid].append([idx, st["key"]])
            else:
                gate_unres += 1
    stats["spine_stations"] = len(spine)
    stats["gate_pairs_total"] = gate_pairs
    stats["gate_pairs_unresolved"] = gate_unres
    stats["station_edges"] = sum(len(v) for v in st_of.values())
    stats["station_words"] = len(st_of)

    # ---- 汇总 w 表（至少一条边才建条） ----
    w = {}
    for bid, r in by_bid.items():
        pats = pat_of.get(bid, [])
        pages = page_of.get(bid, [])
        laws = law_of.get(bid, [])
        ste, eword = et_of.get(bid, (0, ""))
        sts = st_of.get(bid, [])
        if pats or pages or laws or ste or sts:
            w[bid] = [r["word"], pats, pages, laws, ste, sts, eword]
    stats["w_entries"] = len(w)

    # ---- 规律↔规律邻接（总表统一户口：relations 裁定型 + relations_teaching 教学型） ----
    lm_by = {r["id"]: r for r in lm}
    g = {}
    kin = defaultdict(list)
    con = defaultdict(list)
    n_pre = n_kin = n_con = n_rul = 0

    def gadd(lid):
        return g.setdefault(lid, {})

    def push(lst, v):
        if v not in lst:
            lst.append(v)

    for r in lm:
        f = r["id"]
        for e in r.get("relations_teaching") or []:
            t, kind = e["id"], e["kind"]
            if t not in lm_by:
                fail(f"教学关系端点 {f}→{t} 不在总表户口")
            if kind == "前置":
                push(gadd(f).setdefault("p", []), t)
                push(gadd(t).setdefault("q", []), f)
                n_pre += 1
            elif kind == "同族":
                push(kin[f], t)
                push(kin[t], f)
                n_kin += 1
            elif kind == "对照":
                push(con[f], t)
                push(con[t], f)
                n_con += 1
            else:
                fail(f"教学关系类型未登记：{kind}")
        for e in r.get("relations") or []:
            t = e["id"]
            if t not in lm_by:
                fail(f"裁定关系端点 {f}→{t} 不在总表户口")
            tag = ruling_tag(e["rel"])
            gadd(f).setdefault("r", []).append([t, tag, e["rel"]])
            gadd(t).setdefault("s", []).append([f, tag, e["rel"]])
            n_rul += 1
    for lid, lst in kin.items():
        gadd(lid)["k"] = lst
    for lid, lst in con.items():
        gadd(lid)["c"] = lst
    if sum(len(v.get("p", [])) for v in g.values()) != n_pre:
        fail("前置边正反计数不一致")
    stats["rel_teaching_total"] = n_pre + n_kin + n_con
    stats["rel_teaching_pre"] = n_pre
    stats["rel_teaching_kin_directed"] = n_kin
    stats["rel_teaching_con_directed"] = n_con
    stats["rel_ruling_total"] = n_rul
    stats["rel_laws_covered"] = len(g)
    stats["rel_kin_union_pairs"] = sum(len(v) for v in kin.values()) // 2
    stats["rel_con_union_pairs"] = sum(len(v) for v in con.values()) // 2

    # ---- 专区现行页路由 z（自现行区 LAWS / LAWREG 字面量解析） ----
    z = {}
    for sig, route in [("window.PN", "PN"), ("window.AR", "AR"), ("window.CJ", "CJ")]:
        blk = find_block(text, sig)
        laws = json.loads(extract_in(text, blk, "var LAWS ="))
        for e in laws:
            if e["id"] in z and z[e["id"]] != route:
                fail(f"专区路由冲突：{e['id']} 同属 {z[e['id']]} 与 {route}")
            z[e["id"]] = route
    for lid in md["lawreg"]:
        if lid in z and z[lid] != "MZ":
            fail(f"专区路由冲突：{lid} 同属 {z[lid]} 与 MZ")
        z[lid] = "MZ"
    stats["zone_routes"] = len(z)

    # ---- 候选归一 c（自裁定关系机械导出，仅作 openLaw 落空兜底） ----
    canon = {}
    for r in lm:
        for e in r.get("relations") or []:
            tag = ruling_tag(e["rel"])
            cand = tgt = None
            if r["id"].startswith("NEW-") and ("立条" in tag or "并入" in tag):
                cand, tgt = r["id"], e["id"]
            elif e["id"].startswith("NEW-") and tag.startswith("立条来源"):
                cand, tgt = e["id"], r["id"]
            if cand:
                if cand in canon and canon[cand] != tgt:
                    fail(f"候选归一冲突：{cand} → {canon[cand]} 与 {tgt}")
                canon[cand] = tgt
    stats["canon_pairs"] = len(canon)

    # ---- 对话词锚 d（spoken_data 对话英文 ↔ 词库；功能词标记不锚） ----
    sp = load("spoken_data", SP)
    wbj = load("wordbank", WB)
    func_bids = {r["id"] for r in wbj if r.get("is_function_word")}
    bank_words = {}
    for bid, r in by_bid.items():
        bank_words.setdefault(r["word"].lower(), bid)
    TOKRE = re.compile(r"[A-Za-z]+(?:'[A-Za-z]+)?")
    tok_all = set()
    anchored_surfaces = {}
    rule_hits = Counter()
    func_excl = set()
    miss = set()
    for dlg in sp["dialogues"]:
        texts = [t.get("en", "") for t in dlg.get("dialogue") or []]
        texts.append(dlg.get("en", ""))
        for tx in texts:
            for m in TOKRE.finditer(tx):
                tok_all.add(m.group(0).lower())
    for tok in tok_all:
        rule, lemma = lemma_match(tok, bank_words)
        if lemma is None:
            miss.add(tok)
            continue
        bid = bank_words[lemma]
        if bid in func_bids:
            func_excl.add(tok)
            continue
        anchored_surfaces[tok] = bid
        rule_hits[rule] += 1
    d = {}
    dlg_with = 0
    for dlg in sp["dialogues"]:
        seen = []
        texts = [t.get("en", "") for t in dlg.get("dialogue") or []]
        texts.append(dlg.get("en", ""))
        for tx in texts:
            for m in TOKRE.finditer(tx):
                surf = m.group(0).lower()
                if surf in anchored_surfaces and surf not in [p[0] for p in seen]:
                    seen.append([surf, anchored_surfaces[surf]])
        if seen:
            d[dlg["id"]] = seen
            dlg_with += 1
    stats["dlg_tokens_distinct"] = len(tok_all)
    stats["dlg_anchored_surfaces"] = len(anchored_surfaces)
    stats["dlg_rule_hits"] = dict(rule_hits)
    stats["dlg_function_excluded"] = len(func_excl)
    stats["dlg_miss_distinct"] = len(miss)
    stats["dlg_with_anchors"] = dlg_with
    stats["dlg_anchor_pairs"] = sum(len(v) for v in d.values())

    # ---- 场景问答词锚 q（scene_qa 的 q/a 英文 ↔ 词库；与对话同口径，
    # 独立统计：对话侧 anchored_surfaces 只读复用——lemma_match 确定性，
    # 同 token 必同 bankId；问答独有 token 现算现锚，规则与排除全同） ----
    qa = {}
    qa_tokens = set()
    for grp in sp["scene_qa"]:
        if not grp.get("id"):
            fail("scene_qa 缺稳定 id（户口未补：先经 extract_spoken 派生 SQ id 并 gen_spoken --write）")
        for tx in (grp.get("q", ""), grp.get("a", "")):
            for m in TOKRE.finditer(tx):
                qa_tokens.add(m.group(0).lower())
    qa_surfaces = {}
    for tok in qa_tokens:
        if tok in anchored_surfaces:
            qa_surfaces[tok] = anchored_surfaces[tok]
            continue
        _rule, lemma = lemma_match(tok, bank_words)
        if lemma is None:
            continue
        bid = bank_words[lemma]
        if bid in func_bids:
            continue
        qa_surfaces[tok] = bid
    qa_with = 0
    for grp in sp["scene_qa"]:
        seen = []
        for tx in (grp.get("q", ""), grp.get("a", "")):
            for m in TOKRE.finditer(tx):
                surf = m.group(0).lower()
                if surf in qa_surfaces and surf not in [p[0] for p in seen]:
                    seen.append([surf, qa_surfaces[surf]])
        if seen:
            qa[grp["id"]] = seen
            qa_with += 1
    stats["qa_tokens_distinct"] = len(qa_tokens)
    stats["qa_anchored_surfaces"] = len(qa_surfaces)
    stats["qa_with_anchors"] = qa_with
    stats["qa_anchor_pairs"] = sum(len(v) for v in qa.values())

    idx = {"w": w, "l": dict(law_words), "e": e_map,
           "g": g, "z": z, "c": canon, "d": d, "q": qa}
    return idx, stats


def render(text):
    idx, stats = build(text)
    return JD(idx), stats


def check(text, rendered):
    s, e = find_span(text, ANCHOR, "{")
    cur = text[s:e]
    if cur == rendered:
        print(f"PASS: LINKIDX 字面量逐字节一致（{len(cur)} 字符）")
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
    print("FAIL: LINKIDX 内容不一致（现行 != 生成）")
    return 1


def write(text, rendered):
    s, e = find_span(text, ANCHOR, "{")
    out = text[:s] + rendered + text[e:]
    lines = out.split("\n")
    for i, ln in enumerate(lines):
        if ANCHOR in ln:
            prev = lines[i - 1] if i > 0 else ""
            if not MARKER_RE.match(prev):
                lines.insert(i, MARKER)
            break
    return "\n".join(lines)


def main(argv):
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    text = MAIN.read_text(encoding="utf-8")
    rendered, stats = render(text)
    print("边计数：" + " · ".join(f"{k}={v}" for k, v in stats.items()))
    if argv[1] == "--check":
        return check(text, rendered)
    new = write(text, rendered)
    if new != text:
        MAIN.write_text(new, encoding="utf-8")
        print(f"写回完成：LINKIDX 字面量 {len(rendered)} 字符")
    else:
        print("写回完成：与现行逐字节相同，文件未改动")
    return check(MAIN.read_text(encoding="utf-8"), rendered)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
