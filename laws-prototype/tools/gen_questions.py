#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
规律补题生成器（《数据源规范》§3：内嵌副本只能由脚本生成）。

背景：阶段 0 普查按复习池归属（池题 law 字段）点名无题规律。其中 S-44
（-s 和 -ed 各有三种读法，词根区 LAWREG 在册、MZ 律页可达）自有成型材料：
其登记页 if-plural / if-past（morph_data，LAWREG S-44._pages）的成员词，
且每词在词库（model/wordbank.json）有定版音标。读音由词的实证音标尾音
唯一决定，又与本律自述规则（词干末音决定论）可交叉核对——机械生成成立。

派生：主文件 `var RV_GENQ`（生成副本，不得手改）←
  model/morph_data.json（if-plural / if-past 页成员词 id）
+ model/wordbank.json（词形 / 音标 / 释义，词库为准）

生成规则（逐词断言，任一不过即跳过并计数，绝不硬凑）：
  1. 词形拼写合规：if-plural 词以 s 结尾；if-past 词以 ed 结尾
     （if-past 页含不规则形如 ate/went——本律 boundary 明示「只管规则
     屈折，不规则不在此列」，按拼写断言自然排除，不另设名单）。
  1b. -ed 派生核对：词形必须是其基形（verb_form_of）的规则派生
     （base+ed / 词尾 e 只加 d / 辅音+y 变 ied / 短元音单辅音双写+ed
     之一），fed/led 这类减缩不规则形虽以 ed 结尾也排除。
  2. 音标可切分：按音素清单最长匹配切分，尾音素组合只允许
     复数 /s/ /z/ /ɪz/、过去式 /t/ /d/ /ɪd/ 三类（本律「三张脸」）。
  3. 规则交叉核对：去掉词尾音后词干末音按本律规则预测的读音类，
     必须与实证音标尾音类一致（清音→清化读法、浊音/元音→浊化读法、
     咝音→/ɪz/、t/d→/ɪd/），不一致即跳过（防音标切分误判）。
  4. 二级补衡（一级=本律两页成员词，全量采用）：一级里读音类不足
     FLOOR 的类，从词库屈折形条目补到 FLOOR（按 freq_rank 升序）：
     -s 类 = morphemes.suffix 为 -s 且 suffix_gloss 为复数/三单者
     （所有格 -s 不属本律，排除）；-ed 类 = verb_form_of 在册且拼写
     以 ed 结尾者。补衡词同样过 1–3 断言。已知缺口：/ɪz/ 类在一、二级
     语料中均为 0（buses/watches 等咝音尾词形未入词库，属词库车道
     待补，不在本生成器内生造），如实登记不凑数。
题面：q 问词尾读法，opts 为三读（按题序轮换正确项位置，防位置偏置），
a 为实证读音，h 为本律规则原话的提示。key = GQ:S-44:<页|bank>:<词id>，
与既有题 key 空间（LQ/PB/TA/GT/PN/AR/CJ/MZ/PK/PKM）不冲突；
复习引擎 srcGenQ 适配器接在 SOURCES 末尾——旧题序与内容一字不动，
新题只追加（mxReviewV1 旧存档按 key 引用，新 key 视为未学，天然兼容）。

用法：
  python3 tools/gen_questions.py --check   # 只比对，退出码 0=逐字节一致
  python3 tools/gen_questions.py --write   # 写回主文件
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "mengxing-prototype-v1.html"
MORPH = ROOT / "model" / "morph_data.json"
WB = ROOT / "model" / "wordbank.json"

STAMP = "/* GENERATED: tools/gen_questions.py ← model/morph_data.json + model/wordbank.json（S-44 屈折三读补题） · DO NOT EDIT */"
JD = lambda o: json.dumps(o, ensure_ascii=False)  # 默认分隔符，与 RV_* 字面量字节格式一致

LAW = "S-44"
PAGES = ["if-plural", "if-past"]  # 须与 LAWREG S-44._pages 一致（下方断言）
READINGS = {"if-plural": ["/s/", "/z/", "/ɪz/"], "if-past": ["/t/", "/d/", "/ɪd/"]}
HINTS = {
    "if-plural": "先听词干的最后一个音：清音后面读 /s/，浊音和元音后面读 /z/，咝音（s、sh 这类音）后面读 /ɪz/。",
    "if-past": "先听词干的最后一个音：清音后面读 /t/，浊音和元音后面读 /d/，t、d 后面读 /ɪd/。",
}

# ---- 音素切分（英式音标子集；长音标记 ː 已剥离，ɑː→ɑ 等不影响尾音判读） ----
PHONEMES = sorted(
    ["tʃ", "dʒ", "aɪ", "aʊ", "eɪ", "ɔɪ", "əʊ", "ɪə", "eə", "ʊə",
     "ɑ", "ɒ", "ɔ", "æ", "ə", "ɜ", "ɪ", "ʊ", "ʌ", "e", "u", "i", "o", "a",
     "p", "b", "t", "d", "k", "ɡ", "g", "f", "v", "θ", "ð", "s", "z",
     "ʃ", "ʒ", "h", "m", "n", "ŋ", "l", "r", "w", "j"],
    key=len, reverse=True)
VOICELESS = {"p", "t", "k", "f", "θ"}
SIBILANT = {"s", "z", "ʃ", "ʒ", "tʃ", "dʒ"}
ED_VOICELESS = VOICELESS | {"s", "ʃ", "tʃ"}


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


def tokenize(ipa):
    s = (ipa or "").strip().strip("/")
    s = s.split(";")[0].split(",")[0].strip()
    s = s.replace("ˈ", "").replace("ˌ", "").replace("ː", "").replace(".", "").replace(" ", "")
    out, i = [], 0
    while i < len(s):
        for ph in PHONEMES:
            if s.startswith(ph, i):
                out.append(ph)
                i += len(ph)
                break
        else:
            return None  # 不可切分
    return out


def classify(page, toks):
    """返回 (读音类, 词干末音) 或 (None, 原因)。"""
    if not toks:
        return None, "empty"
    if page == "if-plural":
        if toks[-1] == "z" and len(toks) >= 2 and toks[-2] == "ɪ" and len(toks) >= 3 and toks[-3] in SIBILANT:
            return "ɪz", toks[-3]
        if toks[-1] == "z":
            return "z", (toks[-2] if len(toks) >= 2 else None)
        if toks[-1] == "s":
            return "s", (toks[-2] if len(toks) >= 2 else None)
        return None, "tail"
    else:  # if-past
        if toks[-1] == "d" and len(toks) >= 2 and toks[-2] == "ɪ" and len(toks) >= 3 and toks[-3] in ("t", "d"):
            return "ɪd", toks[-3]
        if toks[-1] == "d":
            return "d", (toks[-2] if len(toks) >= 2 else None)
        if toks[-1] == "t":
            return "t", (toks[-2] if len(toks) >= 2 else None)
        return None, "tail"


def expected(page, stem_last):
    if stem_last is None:
        return None
    if page == "if-plural":
        if stem_last in SIBILANT:
            return "ɪz"
        return "s" if stem_last in VOICELESS else "z"
    else:
        if stem_last in ("t", "d"):
            return "ɪd"
        return "t" if stem_last in ED_VOICELESS else "d"


FLOOR = 8  # 一级语料中读音类不足此数者，由二级语料补足（见头注第 4 条）


def make_item(items, page, wid, form, ipa, mn, src):
    suffix = "-s" if page == "if-plural" else "-ed"
    readings = READINGS[page]
    cls = classify(page, tokenize(ipa))[0]
    a = "/" + cls + "/"
    rot = len(items) % 3
    opts = readings[rot:] + readings[:rot]
    if len(set(opts)) != 3 or a not in opts:
        fail("选项构造错误")
    gloss = f"（{mn}）" if mn and len(mn) <= 12 else ""
    return {
        "key": f"GQ:{LAW}:{src}:{wid}", "law": LAW, "page": page, "wid": wid,
        "word": form, "ipa": ipa,
        "q": f"『{form}』{gloss}的词尾 {suffix} 读哪个音？",
        "opts": opts, "a": a, "h": HINTS[page],
    }


def regular_ed(form, base):
    """form 是否为 base 的规则 -ed 派生（头注 1b）。"""
    if not base:
        return False
    cands = {base + "ed", base + "d"}
    if base.endswith("y") and len(base) >= 2 and base[-2] not in "aeiou":
        cands.add(base[:-1] + "ied")
    if re.search(r"[^aeiou][aeiou][^aeiouwx]$", base):
        cands.add(base + base[-1] + "ed")
    return form in cands


def check_word(page, form, ipa, base=None):
    """过头注 1–3 断言：返回读音类或 None。"""
    ok_spell = form.endswith("s") if page == "if-plural" else form.endswith("ed")
    if not ok_spell:
        return None
    if page == "if-past" and base is not None and not regular_ed(form, base):
        return None
    toks = tokenize(ipa)
    if not toks:
        return None
    cls, stem_last = classify(page, toks)
    if cls is None or expected(page, stem_last) != cls:
        return None
    return cls


def build_items():
    md = json.loads(MORPH.read_text(encoding="utf-8"))
    wb_list = json.loads(WB.read_text(encoding="utf-8"))
    wb = {r["id"]: r for r in wb_list}
    reg = (md.get("lawreg") or {}).get(LAW)
    if not reg:
        fail("LAWREG 无 S-44")
    if sorted(reg.get("_pages") or []) != sorted(PAGES):
        fail(f"S-44._pages {reg.get('_pages')} != 登记页 {PAGES}")
    items, skipped = [], []
    counts = {}  # (page, 读音类) -> 已收题数
    used_forms = set()

    def accept(page, wid, r, tier=1):
        form, ipa = r["word"], r.get("phonetic") or ""
        cls = check_word(page, form, ipa, base=r.get("verb_form_of"))
        if cls is None:
            skipped.append((page, wid, f"断言未过（{form} {ipa}）"))
            return False
        if form in used_forms:
            skipped.append((page, wid, f"词形与已收题重复（{form}）"))
            return False
        used_forms.add(form)
        items.append(make_item(items, page, wid, form, ipa, (r.get("meaning") or "").strip(),
                               page if tier == 1 else "bank"))
        counts[(page, cls)] = counts.get((page, cls), 0) + 1
        return True

    # ---- 一级：本律登记页成员词（全量尝试） ----
    for page in PAGES:
        pg = md["data"]["pages"].get(page)
        if not pg:
            fail(f"morph 页 {page} 不存在")
        if LAW not in (pg.get("laws") or []):
            fail(f"morph 页 {page} 的 laws 未登记 S-44")
        for wid in pg.get("words") or []:
            r = wb.get(wid)
            if not r:
                skipped.append((page, wid, "词库无此词"))
                continue
            accept(page, wid, r)

    # ---- 二级：词库屈折形补衡（仅补不足 FLOOR 的读音类，按词频升序） ----
    def tier2_candidates(page):
        out = []
        for r in wb_list:
            if page == "if-plural":
                m = r.get("morphemes") or {}
                g = m.get("suffix_gloss") or ""
                if m.get("suffix") != "-s":
                    continue
                if not (g.startswith("复数") or "三单" in g):
                    continue  # 所有格 -s 等不属本律
            else:
                if not r.get("verb_form_of"):
                    continue
            out.append(r)
        out.sort(key=lambda r: (r.get("freq_rank") is None, r.get("freq_rank") or 0))
        return out

    for page in PAGES:
        for cls in ("s", "z", "ɪz") if page == "if-plural" else ("t", "d", "ɪd"):
            if counts.get((page, cls), 0) >= FLOOR:
                continue
            for r in tier2_candidates(page):
                if counts.get((page, cls), 0) >= FLOOR:
                    break
                if check_word(page, r["word"], r.get("phonetic") or "",
                              base=r.get("verb_form_of")) != cls:
                    continue
                accept(page, r["id"], r, tier=2)
    keys = [it["key"] for it in items]
    if len(keys) != len(set(keys)):
        fail("key 重复")
    return items, skipped


def render_block(items):
    return "<script>\n" + STAMP + "\nvar RV_GENQ=" + JD(items) + ";\n</script>\n"


def script_blocks(text):
    out = []
    for m in re.finditer(r"<script[^>]*>", text):
        e = text.index("</script>", m.end())
        out.append((m.start(), e + len("</script>")))
    return out


def locate(text):
    """返回 (start, end) of the RV_GENQ block, or None。"""
    hits = []
    for s, e in script_blocks(text):
        if "var RV_GENQ=" in text[s:e]:
            hits.append((s, e))
    if len(hits) > 1:
        fail("RV_GENQ 块多于一个")
    return hits[0] if hits else None


def engine_block_start(text):
    hits = [s for s, e in script_blocks(text) if "H2: 复习区引擎" in text[s:e]]
    if len(hits) != 1:
        fail(f"复习区引擎块命中 {len(hits)}")
    return hits[0]


def main(argv):
    if len(argv) < 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    items, skipped = build_items()
    block = render_block(items)
    text = MAIN.read_text(encoding="utf-8")
    loc = locate(text)
    if argv[1] == "--check":
        if not loc:
            print("FAIL: RV_GENQ 生成块不存在（先 --write）")
            return 1
        cur = text[loc[0]:loc[1]] + "\n"
        if cur != block:
            print("FAIL: RV_GENQ 与重新生成不一致（morph 成员词/词库音标已变，需复核后 --write）")
            return 1
        print(f"PASS: RV_GENQ 逐字节一致（{len(items)} 题，跳过登记 {len(skipped)} 词）")
        return 0
    # --write
    if loc:
        new = text[:loc[0]] + block.rstrip("\n") + text[loc[1]:]
    else:
        at = engine_block_start(text)
        new = text[:at] + block + text[at:]
    MAIN.write_text(new, encoding="utf-8")
    print(f"写回完成：RV_GENQ {len(items)} 题；跳过 {len(skipped)} 词（逐词登记见报告）")
    for page, wid, why in skipped:
        print(f"  skip {page}:{wid} — {why}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
