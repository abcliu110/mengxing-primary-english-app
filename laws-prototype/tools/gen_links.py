#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_links.py — 知识联动阶段 1（2026-11-03 Stewart 拍板）：全 App 链接索引
LINKIDX 的生成器。设计依据：docs/data-merge-2026-11-03/
knowledge-linkage-design.md 阶段 1。

事实源（全部为已登记数据源，零新编内容）：
  model/words_master.json    词枢纽：VC 词行（law_refs 第 12 位）、etym 分仓
  model/phonics_master.json  拼读模式成员（wordsets 正本，11,375 对）
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

    idx = {"w": w, "l": dict(law_words), "e": e_map}
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
