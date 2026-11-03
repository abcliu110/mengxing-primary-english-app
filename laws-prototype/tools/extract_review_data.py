#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
复习引擎专区题面提取器（《数据源规范》§3：内嵌副本只能由脚本生成）。

背景：复习区引擎（RV）是独立 IIFE，读不到代词/冠词/连词三区 IIFE 内的
LAWS、词根区 DATA、介词区 V7 卷宗（与 RV_TA/RV_SPINE 当年「build time
自本文件模块逐字提取」的先例同构）。本脚本把三处题面逐字提取为
RV_ZONE / RV_MORPH / RV_PREP 三个字面量，写在 RV_TA/RV_SPINE 数据块
之后、复习引擎之前的独立 script 块中，供 buildPool 的题源适配器消费。

提取内容（只取题面与归属，不改一字）：
  RV_ZONE : PN/AR/CJ 三区 LAWS 中带 quiz 的规律 {src,id,short,kid,quiz:[{q,ans,hint}]}
  RV_MORPH: 词根区 DATA.pages 中带 quiz 的页 {page,label,laws,quiz:[{stem,options,answer,hint}]}
  RV_PREP : 介词区 V7 卷宗 {slug,word,quiz:[...],maze:[...]}（题面对象逐字保全）

用法：
  python3 tools/extract_review_data.py --check   # 只比对，退出码 0=逐字节一致
  python3 tools/extract_review_data.py --write   # 写回主文件
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "mengxing-prototype-v1.html"

STAMP = "/* GENERATED: tools/extract_review_data.py ← 本文件专区题面（PN/AR/CJ LAWS · morph DATA · PK V7）逐字提取 · DO NOT EDIT */"
JD = lambda o: json.dumps(o, ensure_ascii=False)  # 默认分隔符，与 RV_TA/RV_SPINE 字节格式一致


def scan_literal(s, p):
    op = s[p]
    cl = "}" if op == "{" else "]"
    d, ins, esc, k = 0, None, False, p
    while k < len(s):
        c = s[k]
        if ins:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == ins:
                ins = None
        else:
            if c in "\"'`":
                ins = c
            elif c == op:
                d += 1
            elif c == cl:
                d -= 1
                if d == 0:
                    return k + 1
        k += 1
    raise ValueError("字面量定界失败")


def script_blocks(text):
    out = []
    for m in re.finditer(r"<script[^>]*>", text):
        e = text.index("</script>", m.end())
        out.append((m.start(), e + len("</script>"), text[m.end():e]))
    return out


def find_block(text, signature):
    hits = [b for b in script_blocks(text) if signature in b[2]]
    if len(hits) != 1:
        raise ValueError(f"块签名 {signature!r} 命中 {len(hits)} 块")
    return hits[0]


def get_literal(body, anchor_re):
    m = re.search(anchor_re, body)
    if not m:
        raise ValueError(f"锚点 {anchor_re} 未命中")
    p = body.index("=", m.start()) + 1
    while body[p] in " \t\n":
        p += 1
    return json.loads(body[p:scan_literal(body, p)])


def extract(text):
    # ---- PN / AR / CJ ----
    zone = []
    for src_key, sig in (("pn", "window.PN = {"), ("ar", "window.AR = {"), ("cj", "window.CJ = {")):
        _, _, body = find_block(text, sig)
        laws = get_literal(body, r"(?:var|const|let)\s+LAWS\s*=")
        for law in laws:
            quiz = law.get("quiz") or []
            if not quiz:
                continue
            zone.append({
                "src": src_key, "id": law["id"],
                "short": law.get("short") or "", "kid": law.get("kid") or "",
                "quiz": [{"q": q.get("q") or "", "ans": q.get("ans") or "",
                          "hint": q.get("hint") or ""} for q in quiz],
            })
    # ---- morph DATA.pages ----
    _, _, mbody = find_block(text, "window.MZ={")
    data = get_literal(mbody, r"(?:var|const|let)\s+DATA\s*=")
    morph = []
    for pid, pg in (data.get("pages") or {}).items():
        quiz = pg.get("quiz") or []
        if not quiz:
            continue
        morph.append({
            "page": pid, "label": pg.get("label") or "", "laws": pg.get("laws") or [],
            "quiz": [{"stem": q.get("stem") or "", "options": q.get("options") or [],
                      "answer": q.get("answer"), "hint": q.get("hint") or ""} for q in quiz],
        })
    # ---- PK V7 ----
    _, _, pbody = find_block(text, "pvQuizCard")
    v7d = get_literal(pbody, r"(?:var|const|let)\s+V7D\s*=")
    pkdata = get_literal(pbody, r"(?:var|const|let)\s+DATA\s*=")
    slug2word = {w["slug"]: w["word"] for w in pkdata.get("words") or []}
    prep = []
    for slug, d in (v7d.get("w") or {}).items():
        quiz, maze = d.get("quiz") or [], d.get("maze") or []
        if not quiz and not maze:
            continue
        prep.append({"slug": slug, "word": slug2word.get(slug, slug),
                     "quiz": quiz, "maze": maze})
    return zone, morph, prep


def render(text):
    zone, morph, prep = extract(text)
    block = ("<script>\n" + STAMP + "\n"
             "var RV_ZONE=" + JD(zone) + ";\n"
             "var RV_MORPH=" + JD(morph) + ";\n"
             "var RV_PREP=" + JD(prep) + ";\n"
             "</script>")
    counts = (sum(len(z["quiz"]) for z in zone),
              sum(len(m["quiz"]) for m in morph),
              sum(len(p["quiz"]) + len(p["maze"]) for p in prep))
    return block, counts


def locate_block(text):
    """返回已生成块的 (start, end)；不存在返回 None。"""
    i = text.find(STAMP)
    if i < 0:
        return None
    start = text.rindex("<script>", 0, i)
    end = text.index("</script>", i) + len("</script>")
    return start, end


def main(argv):
    text = MAIN.read_text(encoding="utf-8")
    block, counts = render(text)
    if len(argv) >= 2 and argv[1] == "--check":
        loc = locate_block(text)
        if loc is None:
            print("FAIL: 生成块不存在（先 --write）")
            return 1
        cur = text[loc[0]:loc[1]]
        if cur == block:
            print(f"PASS: RV_ZONE/RV_MORPH/RV_PREP 逐字节一致（专区 {counts[0]} · 词根 {counts[1]} · 介词 {counts[2]} 题）")
            return 0
        print("FAIL: 生成块与重新提取不一致（专区题面已变，需 --write）")
        return 1
    if len(argv) >= 2 and argv[1] == "--write":
        loc = locate_block(text)
        if loc is not None:
            new = text[:loc[0]] + block + text[loc[1]:]
        else:
            # 插在 RV_TA/RV_SPINE 数据块之后
            bs, be, _ = find_block(text, "var RV_TA=")
            new = text[:be] + "\n" + block + text[be:]
        if new != text:
            MAIN.write_text(new, encoding="utf-8")
            print(f"写回完成（专区 {counts[0]} · 词根 {counts[1]} · 介词 {counts[2]} 题）")
        else:
            print("与现行逐字节相同，文件未改动")
        return 0
    print(__doc__)
    return 64


if __name__ == "__main__":
    sys.exit(main(sys.argv))
