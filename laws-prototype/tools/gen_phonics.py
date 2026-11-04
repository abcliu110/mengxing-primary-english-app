#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
拼读数据生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。

事实源
  - laws-prototype/model/phonics_master.json（拼读总表：patterns 三分仓
    wordsets/embedded/members、cards 快照分仓、embedded_groups）
  - laws-prototype/model/words_master.json（词汇总表：phonics_cards 分仓 +
    conflicts 裁定记录——卡面内容自切换波次起由生成时从此带出，见拼读总表
    meta.rule）

生成目标：mengxing-prototype-v1.html block 6 的
  const DATA = {"patterns": [...], "bank": {...}, "groups": {...}, "gorder": [...]};
  与紧随其后的按字母查索引（见已判项 5）
  const PHX_LETTERS = {"a": [{"ph", "label", "rep", "n", "src", "w"}, ...], ...};

构成规则
  - patterns：内容逐条取总表 embedded 分仓（w 以 members 正本为准，两者已
    实测全等，生成器硬断言）；**顺序沿用现行文件的模式顺序**——现行顺序是
    按 gorder 分组编排的展示序，与 wordsets 登记序不同（后登记模式在文件
    里被编入所属组内），总表未存展示序，故顺序以现行文件为模板、内容以
    总表为准；模式 id 集合与总表不一致即停。
  - bank：键序取总表 cards 分仓顺序（与现行 bank 键序实测全等，硬断言）；
    卡面四元组 [word, phonetic, meaning, emoji] 取自 words_master 的
    phonics_cards 分仓，并与总表 snapshot 分仓逐卡断言一致（word/phonetic/
    emoji 三项 + 无裁定卡的 meaning）。
  - groups / gorder：取总表 embedded_groups（与现行硬断言全等）。

已判项（有且仅有这些差异允许出现，逐条列出、硬断言核对）
  1. GP-o-ʌ 的 menu 字段：总表 wordsets 分仓为「短元音」、内嵌 embedded 为
     空——Wave 4 已判从 wordsets（源头）。生成时该模式 menu :=「短元音」。
     （总表内其余 173 模式的 wordsets 描述字段与 embedded 分仓逐字段全等，
     生成器按映射逐项断言，分叉即停。）
  2. 卡面释义裁定（words_master conflicts，other_source = phonics_card:*，
     共 56 张卡）：词条释义以词库（wordbank.meaning）为准——
     ① 简写补全 25 张（卡面把「X 的过去式/过去分词」简写成「X 的过去式」）；
     ② 整族口径 31 张（代词词族整族合并释义 + left 单义卡）：卡面释义改为
     词库逐词释义；整族合并释义只保全在总表分仓/冲突记录中，不再作卡面
     释义（Stewart 2026-11-03 裁定，见 words_master 各条 ruling）。
     生成器断言：每张受影响卡的现行卡面 == 冲突记录 other（旧值）、生成值
     == 冲突记录 canonical == 该词 wordbank.meaning。
  3. 四张音标修正卡（57a9bb5：heard /hɜːd/、gas /ɡæs/、toy /tɔɪ/、
     math /mæθ/）属零差异验证：生成卡面音标与现行逐卡断言一致。
  4. 模式例句 exs（2026-11-04 学习改善阶段 2 第五波）：patterns 的 embedded
     分仓新增 exs 字段（例词型单元配例句：成员词机械组句，生成脚本
     tools/fill_wordunit_examples.py）——现行文件无此字段、生成侧新增，
     属已判差异；exs 落数据层后，呈现位已于 2026-11-04 经 Stewart 拍板
     落地（openGroup 词卡格后 phxExsHTML 呈现；词缀页 pages[].exs 亦同批
     在 openPage 落地，见波次报告 exs-slot-impl.md）。落盘后稳态 --check
     应逐字节一致。
  5. 按字母查索引 PHX_LETTERS（2026-11-04 Stewart 拍板并入，呈现为拼读区
     「按课程学 | 按字母查」模式切换）：主文件原无此块，生成侧新增，属
     已判差异；落盘后稳态 --check 应逐字节一致（--check-letters 单独验
     此块）。聚合口径与原型构建脚本 build_phonics_letter_proto.py 一致：
     字母 L 的模式 = 字素以 L 开头的模式（顺序取 DATA 展示序即课程序）；
     读音 = 其音素去重，按来源模式首现序排列（Stewart 裁定全列、不分
     主次）；一读音词表 = 供词模式成员并集经词库解卡——id 精确命中
     优先、带 #n 后缀的 id 剥后缀命中族条目、按词形（族条目 word）去
     重、逐词标注来源字素。卡面：直词条运行时从 DATA.bank 取面（生成
     时断言 bank 面与词库 GB 面逐项全等）；族条目（#n 拆分卡）的卡面
     为词库族条目整面（word/phonetic_gb/meaning/emoji），随索引内嵌。
     读音白话标签机械派生：取供词最多模式的 name 剥「读 /音标/」片段
     （并列取课程序在前者），不手写。
  6. 按读音查索引 PHX_SOUNDS（2026-11-04 Stewart 拍板并入，呈现为拼读区
     「按课程学 | 按字母查 | 按读音查」三段切换的第三段）：主文件原无此
     块，生成侧新增，属已判差异；落盘后稳态 --check 应逐字节一致
     （--check-sounds 单独验此块）。与 PHX_LETTERS 同源镜像：分组键反转
     为音素 -> 字素组（同字素同读音的多模式聚合为一组，词表并集去重、
     逐词标来源模式 id）；解卡/卡面口径与已判项 5 完全一致（id 精确命
     中优先、#n 剥后缀命中族条目、直词条断言 bank 面 == 词库 GB 面、族
     条目卡面内嵌）。音标墙按音标符号机械分区（单元音/双元音/辅音），
     区内按词数降序；拼法行按词数降序。硬断言：58 音 / 168 组、/eɪ/ 8
     拼法 245 词且 a 系（字素以 a 开头）子集恰 224 词（与字母查镜像对
     账）。例句不内嵌，运行时按来源模式 id 回 DATA.patterns 取 exs。

序列化格式（2026-11-03 从现行字面量反推实测）：Python json 默认分隔符
（", " / ": "）、ensure_ascii=False、UTF-8 原样、无转义——整段字面量可由
解析后对象 json.dumps 逐字节复现（DATA/WLIST/WPAGE 三段实测全等）。
注：与词根字面量（紧凑格式）不同，以本文件现行字节为准。

写回安全边界：只替换唯一定位锚（"const DATA = " 且字面量以 '{"patterns"'
开头，命中数 != 1 拒绝）定界扫描得到的字面量跨度，其余字节原样不动。

用法
  python3 laws-prototype/tools/gen_phonics.py --check   # 稳态校验（DATA + PHX_LETTERS + PHX_SOUNDS）
  python3 laws-prototype/tools/gen_phonics.py --write   # 生成并写回主文件
  python3 laws-prototype/tools/gen_phonics.py --check-letters  # 只验 PHX_LETTERS 块
  python3 laws-prototype/tools/gen_phonics.py --check-sounds   # 只验 PHX_SOUNDS 块
--check 退出码：0=逐字节一致（稳态）；2=差异存在但全部为已判项（待 --write）；
1=出现清单外差异或断言失败。
"""
import copy
import json
import re
import string
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MAIN = BASE / "mengxing-prototype-v1.html"
PM_PATH = BASE / "model" / "phonics_master.json"
WM_PATH = BASE / "model" / "words_master.json"
WB_PATH = BASE / "model" / "wordbank.json"

JD = lambda o: json.dumps(o, ensure_ascii=False)  # 默认分隔符 = 现行字节格式

MARKER = "/* GENERATED: tools/gen_phonics.py ← model/phonics_master.json · DO NOT EDIT */"
LMARKER = "/* GENERATED: tools/gen_phonics.py ← model/phonics_master.json + model/wordbank.json · DO NOT EDIT */"


def ensure_marker(src: str, span_start: int) -> str:
    """确保拼读 DATA 字面量锚点所在行之前有一行生成标记（规范 §3.1）。"""
    a = src.rfind("const DATA = ", 0, span_start)
    if a < 0:
        return src
    ls = src.rfind("\n", 0, a) + 1
    if ls > 0:
        prev_start = src.rfind("\n", 0, ls - 1) + 1
        if src[prev_start:ls - 1].strip() == MARKER:
            return src
    indent = src[ls:a]
    if indent.strip():
        indent = ""
    return src[:ls] + indent + MARKER + "\n" + src[ls:]

FIXED4 = {"heard": "/hɜːd/", "gas": "/ɡæs/", "toy": "/tɔɪ/", "math": "/mæθ/"}
# wordsets 字段 -> embedded 字段映射（描述字段对账用）
WS_MAP = {"grapheme": "g", "phoneme": "ph", "cat": "cat", "group": "grp",
          "name": "name", "laws": "laws", "menu": "menu", "face": "face",
          "count": "n", "word_ids": "w"}


def scan_literal(src: str, start: int) -> int:
    """定界扫描（与 gen_morph.py 同逻辑）：从 { 或 [ 起返回字面量结束下标。"""
    open_c = src[start]
    close_c = "}" if open_c == "{" else "]"
    depth = 0
    in_str = None
    esc = False
    line_c = block_c = False
    k = start
    while k < len(src):
        c = src[k]
        n = src[k + 1] if k + 1 < len(src) else ""
        if line_c:
            if c == "\n":
                line_c = False
            k += 1
            continue
        if block_c:
            if c == "*" and n == "/":
                block_c = False
                k += 2
                continue
            k += 1
            continue
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == in_str:
                in_str = None
            k += 1
            continue
        if c == "/" and n == "/":
            line_c = True
            k += 2
            continue
        if c == "/" and n == "*":
            block_c = True
            k += 2
            continue
        if c in "\"'`":
            in_str = c
            k += 1
            continue
        if c == open_c:
            depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0:
                return k + 1
        k += 1
    raise ValueError(f"字面量定界失败（起始偏移 {start}）")


def find_span(src: str, anchor: str, must_start_with: str):
    hits = []
    i = 0
    while True:
        j = src.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(src) and src[p].isspace():
            p += 1
        if p < len(src) and src[p] in "{[" and src.startswith(must_start_with, p):
            hits.append(p)
        i = j + len(anchor)
    if len(hits) != 1:
        raise ValueError(f"锚点 {anchor!r} 过滤后命中 {len(hits)} 处（应为 1），拒绝操作")
    s = hits[0]
    return s, scan_literal(src, s)


def fail(msg):
    raise AssertionError(msg)


def build(pm, wm, current):
    """由总表构建目标 DATA 对象。返回 (built, expected_diffs)。
    expected_diffs: {(种类, 键): (旧值, 新值)} —— 与现行比对时只允许这些差异。"""
    expected = {}
    by_id = {p["id"]: p for p in pm["patterns"]}
    cur_pats = current["patterns"]
    cur_ids = [p["id"] for p in cur_pats]
    if set(cur_ids) != set(by_id) or len(cur_ids) != len(by_id):
        fail(f"模式 id 集合与总表不一致：文件 {len(cur_ids)} / 总表 {len(by_id)}")

    # ---- patterns：内容取总表 embedded 分仓，w=members，顺序沿用现行 ----
    patterns = []
    for pid in cur_ids:
        rec = by_id[pid]
        emb, ws = rec["embedded"], rec["wordsets"]
        if rec["members"] != emb["w"]:
            fail(f"{pid}: members 与 embedded.w 不一致")
        for wk, ek in WS_MAP.items():
            if ws.get(wk) != emb.get(ek):
                if pid == "GP-o-ʌ" and wk == "menu":
                    continue  # 已判项 1，见下
                fail(f"{pid}: wordsets.{wk} 与 embedded.{ek} 分叉（{ws.get(wk)!r} != {emb.get(ek)!r}），清单外")
        obj = copy.deepcopy(emb)
        obj["w"] = list(rec["members"])
        if pid == "GP-o-ʌ":
            if ws.get("menu") != "短元音":
                fail("GP-o-ʌ: wordsets.menu 不是「短元音」，与已判不符")
            obj["menu"] = ws["menu"]
        patterns.append(obj)
    cur_by_id = {p["id"]: p for p in cur_pats}
    for obj in patterns:
        cur = cur_by_id[obj["id"]]
        if obj == cur:
            continue
        diffs = [k for k in set(obj) | set(cur) if obj.get(k) != cur.get(k)]
        if obj["id"] == "GP-o-ʌ" and diffs == ["menu"]:
            expected[("pattern-menu", "GP-o-ʌ")] = (cur["menu"], obj["menu"])
        elif diffs == ["exs"] and "exs" not in cur:
            expected[("pattern-exs", obj["id"])] = (None, f'新增 exs {len(obj["exs"])} 句')
        else:
            fail(f"模式 {obj['id']} 与现行存在清单外差异字段 {diffs}")

    # ---- 裁定映射：words_master conflicts 中 phonics_card:* ----
    overrides = {}  # bank_key -> conflict 记录
    wm_cards = {}   # bank_key -> words_master 卡
    for rec in wm["words"]:
        for c in rec.get("phonics_cards") or []:
            if c["bank_key"] in wm_cards:
                fail(f"words_master phonics_cards 键重复：{c['bank_key']}")
            wm_cards[c["bank_key"]] = c
        for conf in rec.get("conflicts") or []:
            src_ = conf.get("other_source", "")
            if src_.startswith("phonics_card:"):
                key = src_.split(":", 1)[1].split(".")[0]
                if key in overrides:
                    fail(f"卡 {key} 有多条裁定记录")
                if conf.get("canonical_source") != "wordbank.meaning":
                    fail(f"卡 {key} 裁定 canonical_source 不是 wordbank.meaning")
                if not rec.get("wordbank") or rec["wordbank"].get("meaning") != conf["canonical"]:
                    fail(f"卡 {key} 裁定 canonical 与该词 wordbank.meaning 不符")
                if key not in [c["bank_key"] for c in rec.get("phonics_cards") or []]:
                    fail(f"卡 {key} 的裁定记录所在词条与卡归属不一致")
                overrides[key] = conf
    if len(overrides) != 56:
        fail(f"卡面裁定应为 56 条，实得 {len(overrides)}")

    # ---- bank：键序取总表 cards 分仓，卡面取 words_master 分仓 ----
    bank = {}
    for _word, crec in pm["cards"].items():
        for card in crec["cards"]:
            key = card["bank_key"]
            snap = card["snapshot"]
            wmc = wm_cards.get(key)
            if wmc is None:
                fail(f"卡 {key} 在 words_master phonics_cards 中缺席")
            if [wmc["word"], wmc["phonetic"], wmc["emoji"]] != [snap["word"], snap["phonetic"], snap["emoji"]]:
                fail(f"卡 {key} 两总表分仓（词/音标/emoji）不一致")
            if key in overrides:
                conf = overrides[key]
                if snap["meaning"] != conf["other"] or wmc["meaning"] != conf["other"]:
                    fail(f"卡 {key} 现行卡面与裁定记录 other 不符")
                meaning = conf["canonical"]
                expected[("bank-meaning", key)] = (conf["other"], conf["canonical"])
            else:
                if wmc["meaning"] != snap["meaning"]:
                    fail(f"卡 {key} 无裁定但两总表卡面释义不一致")
                meaning = wmc["meaning"]
            bank[key] = [wmc["word"], wmc["phonetic"], meaning, wmc["emoji"]]
    if set(bank) != set(current["bank"]):
        fail("bank 键集合与现行不一致")
    if list(bank) != list(current["bank"]):
        fail("bank 键序与现行不一致（总表 cards 分仓序应与现行全等）")
    for key, face in bank.items():
        cur = current["bank"][key]
        if face != cur and ("bank-meaning", key) not in expected:
            fail(f"卡 {key} 与现行存在清单外差异：{cur} -> {face}")
    # 已判项 3：四张修正卡音标零差异断言
    seen4 = set()
    for key, face in bank.items():
        if face[0] in FIXED4:
            seen4.add(face[0])
            if face[1] != FIXED4[face[0]]:
                fail(f"修正卡 {face[0]} 音标应为 {FIXED4[face[0]]}，实得 {face[1]}")
    if seen4 != set(FIXED4):
        fail(f"四张修正卡未全数命中：{seen4}")

    # ---- groups / gorder ----
    groups = pm["embedded_groups"]["groups"]
    gorder = pm["embedded_groups"]["gorder"]
    if groups != current["groups"] or gorder != current["gorder"]:
        fail("groups/gorder 与现行不一致（清单外差异）")

    built = {"patterns": patterns, "bank": bank, "groups": groups, "gorder": gorder}
    return built, expected


def derive_label(name):
    """读音白话标签（已判项 5）：供词最多模式的 name 剥「读 /音标/」片段。"""
    lab = re.sub(r"读\s*/[^/]+/", "", name)
    if lab == name:
        lab = re.sub(r"\s*/[^/]+/", "", name, count=1)
    return re.sub(r"\s+", " ", lab).strip(" ·")


def build_letters(built, wb):
    """按字母查索引（已判项 5）：由 DATA 构建结果（模式展示序）+ 词库派生。

    返回 {字母: [{"ph", "label", "rep", "n", "src", "w"}, ...]}：
      src = [{"pid", "g", "name"}, ...]（来源模式，展示序）；
      w   = [[键, [来源字素, ...]] 或 [键, [来源字素, ...], 卡面], ...]——
            直词条键 = bank 键（运行时取 bank 面）；族条目键 = 词库族条目
            id，第三项为内嵌卡面 [word, phonetic_gb, meaning, emoji]。
    """
    bank = built["bank"]
    by_id = {w["id"]: w for w in wb}

    def resolve(wid):
        if wid in by_id:
            return wid, by_id[wid]
        base = wid.split("#")[0]
        if base in by_id:
            return base, by_id[base]
        fail(f"PHX_LETTERS: 成员词 {wid} 在词库中无解（零丢词断言失败）")

    letters = {}
    for L in string.ascii_lowercase:
        sel = [p for p in built["patterns"] if p["g"].startswith(L)]
        if not sel:
            continue
        order, byph = [], {}
        for p in sel:
            if p["ph"] not in byph:
                byph[p["ph"]] = []
                order.append(p["ph"])
            byph[p["ph"]].append(p)
        readings = []
        for ph in order:
            ps = byph[ph]
            lab_src = max(ps, key=lambda p: len(p["w"]))  # 并列取展示序在前者
            seen, keys, words = {}, [], []
            for p in ps:
                for wid in p["w"]:
                    rid, entry = resolve(wid)
                    key = entry["word"]
                    if key in seen:
                        ent = seen[key]
                        if (rid != wid) != (len(ent) == 3):
                            fail(f"PHX_LETTERS: 词形 {key!r} 混入直词条与族条目两类来源，口径外")
                        if p["g"] not in ent[1]:
                            ent[1].append(p["g"])
                        continue
                    face = [entry["word"], entry.get("phonetic_gb") or entry.get("phonetic", ""),
                            entry.get("meaning", ""), entry.get("emoji", "") or ""]
                    if rid != wid:
                        ent = [rid, [p["g"]], face]  # 族条目：卡面内嵌
                    else:
                        if bank.get(wid) != face:
                            fail(f"PHX_LETTERS: {wid} 的 bank 卡面与词库 GB 面不一致")
                        ent = [wid, [p["g"]]]
                    seen[key] = ent
                    keys.append(key)
                    words.append(ent)
            readings.append({
                "ph": ph,
                "label": derive_label(lab_src["name"]),
                "rep": keys[:3],
                "n": len(words),
                "src": [{"pid": p["id"], "g": p["g"], "name": p["name"]} for p in ps],
                "w": words,
            })
        letters[L] = readings
    return letters


def find_letters_span(src):
    try:
        return find_span(src, "const PHX_LETTERS = ", "{")
    except ValueError:
        return None


def splice_letters(src, letters_text):
    """把 PHX_LETTERS 字面量写入 src：已有块则替换，缺失则插在 DATA 之后。"""
    span = find_letters_span(src)
    if span:
        l0, l1 = span
        return src[:l0] + letters_text + src[l1:]
    s0, s1 = find_span(src, "const DATA = ", '{"patterns"')
    ins = s1 + 1 if src[s1:s1 + 1] == ";" else s1
    return src[:ins] + "\n" + LMARKER + "\nconst PHX_LETTERS = " + letters_text + ";" + src[ins:]


def letters_status(src, letters_text):
    span = find_letters_span(src)
    if not span:
        return "missing"
    return "ok" if src[span[0]:span[1]] == letters_text else "stale"


DIPHTHONGS = {"aɪ", "aʊ", "ɔɪ", "eɪ", "əʊ", "eə", "ɪə", "ʊə", "aɪə", "aʊə", "ɔɪə"}
VOWEL_CHARS = set("æɑeəɜɪiɒɔʊuʌ")


def ph_section(ph):
    """音标墙分区（已判项 6）：按音标符号本身机械分类（与原型构建脚本同函数）。"""
    core = ph.strip("/")
    if core in DIPHTHONGS:
        return "双元音"
    if core and all(c in VOWEL_CHARS or c == "ː" for c in core):
        return "单元音"
    return "辅音"


def build_sounds(built, wb):
    """按读音查索引（已判项 6）：PHX_LETTERS 的同源镜像，分组键反转为音素。

    返回 {"secs": [{"name", "phs"}], "sounds": {ph: {"n", "gs": [...]}}}：
      gs 项 = {"g", "label", "rep", "pats": [{"pid", "name", "n"}],
               "w": [[键, [来源模式 id, ...]] 或 [键, [...], 卡面], ...]}
      —— 词条编码与 build_letters 完全一致（直词条键 = bank 键、运行时取
      bank 面；族条目键 = 词库族条目 id、第三项为内嵌卡面）。
    """
    bank = built["bank"]
    by_id = {w["id"]: w for w in wb}

    def resolve(wid):
        if wid in by_id:
            return wid, by_id[wid]
        base = wid.split("#")[0]
        if base in by_id:
            return base, by_id[base]
        fail(f"PHX_SOUNDS: 成员词 {wid} 在词库中无解（零丢词断言失败）")

    def form_of(ent):
        return ent[2][0] if len(ent) == 3 else bank[ent[0]][0]

    byph = {}
    for idx, p in enumerate(built["patterns"]):
        byph.setdefault(p["ph"], {}).setdefault(p["g"], []).append((idx, p))
    sounds = {}
    for ph, byg in byph.items():
        grows, allforms = [], set()
        for g, gps in byg.items():
            gps_sorted = sorted(gps, key=lambda t: (-len(t[1]["w"]), t[0]))
            seen, words, forms = {}, [], []
            for _idx, p in gps_sorted:
                for wid in p["w"]:
                    rid, entry = resolve(wid)
                    key = entry["word"]
                    if key in seen:
                        ent = seen[key]
                        if (rid != wid) != (len(ent) == 3):
                            fail(f"PHX_SOUNDS: 词形 {key!r} 混入直词条与族条目两类来源，口径外")
                        if p["id"] not in ent[1]:
                            ent[1].append(p["id"])
                        continue
                    face = [entry["word"], entry.get("phonetic_gb") or entry.get("phonetic", ""),
                            entry.get("meaning", ""), entry.get("emoji", "") or ""]
                    if rid != wid:
                        ent = [rid, [p["id"]], face]  # 族条目：卡面内嵌
                    else:
                        if bank.get(wid) != face:
                            fail(f"PHX_SOUNDS: {wid} 的 bank 卡面与词库 GB 面不一致")
                        ent = [wid, [p["id"]]]
                    seen[key] = ent
                    words.append(ent)
                    forms.append(key)
            allforms |= set(seen.keys())
            grows.append({
                "g": g,
                "label": derive_label(gps_sorted[0][1]["name"]),
                "rep": forms[:3],
                "pats": [{"pid": p["id"], "name": p["name"], "n": len(p["w"])}
                         for _i, p in gps_sorted],
                "w": words,
            })
        grows.sort(key=lambda d: (-len(d["w"]), d["g"]))
        sounds[ph] = {"n": len(allforms), "gs": grows}
    secs = []
    secmap = {}
    for ph in sounds:
        secmap.setdefault(ph_section(ph), []).append(ph)
    for name in ("单元音", "双元音", "辅音"):
        if name in secmap:
            secs.append({"name": name,
                         "phs": sorted(secmap[name], key=lambda ph: (-sounds[ph]["n"], ph))})
    # ---- 镜像对账硬断言（与原型盘点/字母查逐项对账） ----
    if len(sounds) != 58:
        fail(f"PHX_SOUNDS: 音素应为 58，实得 {len(sounds)}")
    ngroups = sum(len(d["gs"]) for d in sounds.values())
    if ngroups != 168:
        fail(f"PHX_SOUNDS: 拼法组应为 168，实得 {ngroups}")
    ei = sounds.get("/eɪ/")
    if not ei or len(ei["gs"]) != 8 or ei["n"] != 245:
        fail(f"PHX_SOUNDS: /eɪ/ 应为 8 拼法 245 词，实得 "
             f"{len(ei['gs']) if ei else 0} 拼法 {ei['n'] if ei else 0} 词")
    aforms = set()
    for gr in ei["gs"]:
        if gr["g"].startswith("a"):
            for ent in gr["w"]:
                aforms.add(form_of(ent))
    if len(aforms) != 224:
        fail(f"PHX_SOUNDS: /eɪ/ 的 a 系子集应为 224 词（字母查镜像），实得 {len(aforms)}")
    return {"secs": secs, "sounds": sounds}


def find_sounds_span(src):
    try:
        return find_span(src, "const PHX_SOUNDS = ", "{")
    except ValueError:
        return None


def splice_sounds(src, sounds_text):
    """把 PHX_SOUNDS 字面量写入 src：已有块则替换，缺失则插在 PHX_LETTERS 之后。"""
    span = find_sounds_span(src)
    if span:
        l0, l1 = span
        return src[:l0] + sounds_text + src[l1:]
    lspan = find_letters_span(src)
    if not lspan:
        raise ValueError("PHX_LETTERS 块缺失，无法定位 PHX_SOUNDS 插入点")
    ins = lspan[1] + 1 if src[lspan[1]:lspan[1] + 1] == ";" else lspan[1]
    return src[:ins] + "\n" + LMARKER + "\nconst PHX_SOUNDS = " + sounds_text + ";" + src[ins:]


def sounds_status(src, sounds_text):
    span = find_sounds_span(src)
    if not span:
        return "missing"
    return "ok" if src[span[0]:span[1]] == sounds_text else "stale"


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


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write", "--check-letters", "--check-sounds"):
        print(__doc__)
        return 64
    pm = json.loads(PM_PATH.read_text(encoding="utf-8"))
    wm = json.loads(WM_PATH.read_text(encoding="utf-8"))
    wb = json.loads(WB_PATH.read_text(encoding="utf-8"))
    src = MAIN.read_bytes().decode("utf-8")
    s0, s1 = find_span(src, "const DATA = ", '{"patterns"')
    cur_text = src[s0:s1]
    current = json.loads(cur_text)
    try:
        built, expected = build(pm, wm, current)
        letters_text = JD(build_letters(built, wb))
        sounds_text = JD(build_sounds(built, wb))
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    lstat = letters_status(src, letters_text)
    sstat = sounds_status(src, sounds_text)
    if argv[1] == "--check-letters":
        if lstat == "ok":
            print(f"PASS: PHX_LETTERS 字面量逐字节一致（{len(letters_text)} 字符）")
            return 0
        print(f"PHX_LETTERS 状态：{lstat}（待 --write 落盘）")
        return 2
    if argv[1] == "--check-sounds":
        if sstat == "ok":
            print(f"PASS: PHX_SOUNDS 字面量逐字节一致（{len(sounds_text)} 字符）")
            return 0
        print(f"PHX_SOUNDS 状态：{sstat}（待 --write 落盘）")
        return 2
    gen_text = JD(built)
    if gen_text == cur_text:
        print(f"PASS: DATA 字面量逐字节一致（{len(cur_text)} 字符；已判项均已落盘）")
        if lstat == "ok" and sstat == "ok":
            print(f"PASS: PHX_LETTERS 字面量逐字节一致（{len(letters_text)} 字符）")
            print(f"PASS: PHX_SOUNDS 字面量逐字节一致（{len(sounds_text)} 字符）")
            if argv[1] == "--write":
                out = ensure_marker(src, s0)
                if out != src:
                    MAIN.write_bytes(out.encode("utf-8"))
                    print("已补生成标记并写回（字面量本身无变化）")
            return 0
        if argv[1] == "--check":
            if lstat != "ok":
                print(f"PHX_LETTERS 状态：{lstat}（已判项 5，待 --write 落盘）")
            if sstat != "ok":
                print(f"PHX_SOUNDS 状态：{sstat}（已判项 6，待 --write 落盘）")
            return 2
        out = src
        if lstat != "ok":
            out = splice_letters(out, letters_text)
        if sstat != "ok":
            out = splice_sounds(out, sounds_text)
        s0b, _s1b = find_span(out, "const DATA = ", '{"patterns"')
        out = ensure_marker(out, s0b)
        MAIN.write_bytes(out.encode("utf-8"))
        print(f"索引写回完成：文件 {len(src)} -> {len(out)} 字符"
              f"（PHX_LETTERS {len(letters_text)} 字符 / PHX_SOUNDS {len(sounds_text)} 字符）")
        return 0
    # 逐字节不等 -> 内容差异必须恰为已判项集合
    paths = deep_diff_paths(built, current)
    allowed = set()
    for (kind, key) in expected:
        if kind == "pattern-menu":
            idx = [p["id"] for p in current["patterns"]].index(key)
            allowed.add(f"$.patterns[{idx}].menu")
        elif kind == "pattern-exs":
            idx = [p["id"] for p in current["patterns"]].index(key)
            allowed.add(f"$.patterns[{idx}].exs")
        else:
            # 已判项 2（bank-meaning）：卡面已落 canonical 的稳态下该项不产生
            # 差异，不入 allowed（否则与实测 diff 集合对不上而误报）
            if current["bank"][key][2] != expected[(kind, key)][1]:
                allowed.add(f"$.bank.{key}[2]")
    got = set(paths)
    if got != allowed:
        print("FAIL: 出现清单外差异路径：")
        for p in sorted(got - allowed):
            print(f"  清单外: {p}")
        for p in sorted(allowed - got):
            print(f"  已判未现: {p}")
        return 1
    print(f"已判差异 {len(expected)} 处（清单内，待 --write 落盘）：")
    for (kind, key), (old, new) in sorted(expected.items()):
        print(f"  [{kind}] {key}: {old!r} -> {new!r}")
    if lstat != "ok":
        print(f"  [pattern-letters] PHX_LETTERS: 状态 {lstat} -> 随本写回一并落盘")
    if sstat != "ok":
        print(f"  [pattern-sounds] PHX_SOUNDS: 状态 {sstat} -> 随本写回一并落盘")
    if argv[1] == "--check":
        return 2
    out = src[:s0] + gen_text + src[s1:]
    out = splice_letters(out, letters_text)
    out = splice_sounds(out, sounds_text)
    s0b, _s1b = find_span(out, "const DATA = ", '{"patterns"')
    out = ensure_marker(out, s0b)
    MAIN.write_bytes(out.encode("utf-8"))
    print(f"写回完成：文件 {len(src)} -> {len(out)} 字符（字面量 {len(cur_text)} -> {len(gen_text)}）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
