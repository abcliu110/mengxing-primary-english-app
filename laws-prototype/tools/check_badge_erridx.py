#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_badge_erridx.py — 静态徽标 × ERRIDX 对账门禁（2026-11-09，第四波第 7 项）。

断言：主文件 #v-expr（E/W）与 #v-expr2（NE）两区全部 59 行静态索引行，
其徽标必须与现行 ERRIDX 病例数一致（不做生成化，只对账）。

徽标口径（沿用第二波第 2 项、第三波第 5 项，与其余 NE 儿童行一致）：
  有 ERRIDX 病例 + 有练习 → <span class="st ok">有病例 · 有练习</span>
  无 ERRIDX 病例 + 有练习 → <span class="st part">有练习 · 查过·没有病例</span>
  教师层行挂 <span class="st tchr">教师层</span>，不带病例/练习信息，
  只核对在位（每行恰出现 1 次），不参与徽标比对。

三源核对（见 docs/work-2026-11-09/wave3_item5_ne_badges.md §二）：
  权威源是 gen_errors.py 从 laws_master.json 再生出的 ERRIDX——病例
  四路汇合（lawdata > yaml > zone.data > zone.parts），逐律去重后计数。
  运行时 ERRIDX（主文件字面量）必须与再生结果逐律相等，否则该行报
  “ERRIDX 运行时与再生不一致”（陈旧索引；gen_errors --check 也会报）。
  laws_master lawdata.cases 与运行时 LAWDATA cases_len 只作第三源数字，
  一并打印在失败行里供人工核对，不单独定徽标：yaml/zone 病例会使
  ERRIDX 多于 lawdata.cases（全库 163 律如此），以 lawdata.cases 为准
  会误判；“有病例”的口径是 ERRIDX（孩子查错句用的索引）里有病例。

覆盖面（与第四波第 6 项 E/W 扫面一致）：
  #v-expr + #v-expr2 全部 59 行（E 15 + W 15 + NE 29），行集合须与
  laws_master 的 E/W/NE 律集合恰相等（不多、不少、不重）；
  其中儿童行 38 行逐行比对徽标，教师行 21 行只核对在位。

用法：
  python3 tools/check_badge_erridx.py            # 校验主文件
  python3 tools/check_badge_erridx.py <html路径>  # 校验指定副本（自证用）
退出码：0=通过；1=断言失败；2=用法/解析错误。
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
BASE = HERE.parent
MAIN = BASE / "mengxing-prototype-v1.html"
LM_PATH = BASE / "model" / "laws_master.json"
CX_PATH = BASE / "model" / "contrast_pages.json"

OK = '<span class="st ok">有病例 · 有练习</span>'
PART = '<span class="st part">有练习 · 查过·没有病例</span>'
TCHR = '<span class="st tchr">教师层</span>'
BADGE_TEXT = {"ok": "有病例 · 有练习", "part": "有练习 · 查过·没有病例",
              "tchr": "教师层"}
SECTIONS = ("v-expr", "v-expr2")
FAMILIES = ("E", "W", "NE")

sys.path.insert(0, str(HERE))
import gen_errors  # noqa: E402  再生 ERRIDX 的唯一事实源（与 gen_errors --check 同口径）


def scan_literal(src, start):
    """定界扫描（与 gen_errors.py 同逻辑，含字符串/注释处理）。"""
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


def get_literal(text, anchor):
    """取主文件里锚点后的唯一 JSON 字面量（命中 != 1 拒绝）。"""
    hits = []
    i = 0
    while True:
        j = text.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(text) and text[p].isspace():
            p += 1
        if p < len(text) and text[p] in "{[":
            hits.append(p)
        i = j + len(anchor)
    if len(hits) != 1:
        raise ValueError(f"锚点 {anchor!r} 命中 {len(hits)} 处（应为 1），拒绝操作")
    return json.loads(text[hits[0]:scan_literal(text, hits[0])])


def parse_static_rows(text):
    """解析 #v-expr / #v-expr2 两区的全部静态索引行。

    返回 [(区, 律 id, 徽标 class, 徽标文本)]；区段按 <section> 边界切分，
    不依赖行号。行内徽标 span 须恰为 1 个。
    """
    rows = []
    for sec in SECTIONS:
        anchor = f'<section class="view" id="{sec}">'
        s = text.find(anchor)
        if s < 0:
            raise ValueError(f"未找到区段 {anchor}")
        e = text.find("<section", s + len(anchor))
        seg = text[s:None if e < 0 else e]
        for m in re.finditer(r'<div class="urow"[^>]*data-law="([^"]+)"[^>]*>'
                             r'(.*?)</div>', seg, flags=re.S):
            lid, inner = m.group(1), m.group(2)
            badges = re.findall(r'<span class="st ([^"]+)">([^<]*)</span>', inner)
            if len(badges) != 1:
                raise ValueError(f"{sec} 区 {lid} 行徽标 span 出现 {len(badges)} 个（应为 1）")
            rows.append((sec, lid, badges[0][0], badges[0][1]))
    return rows


def main(argv):
    path = Path(argv[1]) if len(argv) > 1 else MAIN
    if len(argv) > 2:
        print(__doc__)
        return 2
    try:
        text = path.read_text(encoding="utf-8")
        master = json.loads(LM_PATH.read_text(encoding="utf-8"))
        contrast = json.loads(CX_PATH.read_text(encoding="utf-8"))
        built, _stats = gen_errors.build(master, contrast)
        gen_n = Counter(c[0] for c in built["cases"])
        rt_err = get_literal(text, "var ERRIDX=")
        rt_n = Counter(c[0] for c in rt_err["cases"])
        lawdata = get_literal(text, "var LAWDATA=")
        lm_n = {e["id"]: len((e.get("lawdata") or {}).get("cases") or [])
                for e in master}
        rows = parse_static_rows(text)
    except AssertionError as ex:
        print(f"FAIL: ERRIDX 再生断言失败：{ex}")
        return 1
    except (ValueError, json.JSONDecodeError, OSError) as ex:
        print(f"FAIL: 解析失败：{ex}")
        return 2

    want_ids = sorted(e["id"] for e in master
                      if e["id"].split("-")[0] in FAMILIES)
    seen = Counter(lid for _sec, lid, _c, _t in rows)
    problems = []

    dup = sorted(lid for lid, n in seen.items() if n != 1)
    if dup:
        problems.append(f"静态行重复/缺失：{dup} 各出现 { [seen[d] for d in dup] } 次（应为 1）")
    missing = sorted(set(want_ids) - set(seen))
    extra = sorted(set(seen) - set(want_ids))
    if missing:
        problems.append(f"静态行缺失 {len(missing)} 条：{missing}")
    if extra:
        problems.append(f"静态行多出 {len(extra)} 条（不在 E/W/NE 律集）：{extra}")

    n_child = n_tchr = 0
    for sec, lid, cls, btxt in rows:
        if cls not in BADGE_TEXT:
            problems.append(f"{lid}（{sec}）：未知徽标 class {cls!r}")
            continue
        if btxt != BADGE_TEXT[cls]:
            problems.append(f"{lid}（{sec}）：徽标文本与 class 不符："
                            f"class={cls} 但文本为 {btxt!r}（应为 {BADGE_TEXT[cls]!r}）")
            continue
        if cls == "tchr":
            n_tchr += 1
            continue
        n_child += 1
        entry = lawdata.get(lid)
        if entry is None:
            problems.append(f"{lid}（{sec}）：LAWDATA 缺该律条目，无法核对练习数")
            continue
        quiz_n = len(entry.get("quiz") or [])
        ld_n = len(entry.get("cases") or [])
        src = (f"病例 ERRIDX 再生 {gen_n.get(lid, 0)} / 运行时 {rt_n.get(lid, 0)}"
               f" / lawdata.cases {lm_n.get(lid, 0)} / LAWDATA cases {ld_n}；"
               f"练习 quiz {quiz_n}")
        if rt_n.get(lid, 0) != gen_n.get(lid, 0):
            problems.append(f"{lid}（{sec}）：ERRIDX 运行时与再生不一致——{src}；"
                            f"徽标现为 {cls}（{btxt}）")
            continue
        if quiz_n == 0:
            problems.append(f"{lid}（{sec}）：无练习，徽标口径未覆盖"
                            f"（ok/part 均以“有练习”为前提）——{src}；"
                            f"徽标现为 {cls}（{btxt}）")
            continue
        want = "ok" if gen_n.get(lid, 0) > 0 else "part"
        if cls != want:
            problems.append(f"{lid}（{sec}）：徽标应为 {want}"
                            f"（{BADGE_TEXT[want]}），现为 {cls}（{btxt}）——{src}")

    if problems:
        for p in problems:
            print("FAIL:", p)
        print(f"FAIL: 静态徽标 × ERRIDX 对账失败：{len(problems)} 行不符"
              f"（共 {len(rows)} 行：儿童行 {n_child}、教师行 {n_tchr}）")
        return 1
    print(f"PASS: 静态徽标 × ERRIDX 对账通过（{len(rows)} 行：儿童行 {n_child} 行"
          f"徽标全对，教师行 {n_tchr} 行在位；ERRIDX {built['tot']} 条 /"
          f"覆盖 {built['laws']} 律，运行时与再生逐律一致）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
