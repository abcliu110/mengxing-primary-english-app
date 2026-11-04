#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
错句反查索引生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。
2026-11-04 维度视图并入波新建（Stewart 拍板：错误反查并入，首页学习工具
区第六张卡「错句查规律」）。

事实源
  - laws-prototype/model/laws_master.json（病例三路：lawdata.cases /
    yaml.error_cases / 专区 zone.data.errors）
  - laws-prototype/model/contrast_pages.json（仅取「有辨析页」律集合标记）

生成目标：mengxing-prototype-v1.html 错句反查呈现脚本段的
  var ERRIDX = {"tot", "nt", "laws", "lawsc", "cases": [...], "briefs": {...}};

构成规则（与维度原型构建脚本 build_error_lookup.py 同口径，原型为验证
工具、口径以本生成器为准落盘）
  - 逐律三路汇合（先到先得 lawdata > yaml > zone），律内按 norm(wrong)
    归一去重（阶段 3 同款归一：全角引号转半角、小写、标点转空格、空白
    折叠）。硬断言对账原型盘点：总数 334 / 覆盖 206 律 / 来源 lawdata
    109、yaml 89、zone 136。
  - cases 行 = [律 id, 家族, 律名, wrong, right, diag, 有辨析页 0/1,
    教学法条目 0/1]：diag 一律原文照录（白话改写不在本波，原型 10 条示
    意改写不进数据）。
  - 教学法条目标记：wrong 不含英文字母（原型盘点口径，恰 55 条——多为
    yaml 里的教法病例，非孩子错句）；呈现层只在成人层显示（分流）。
  - briefs：每律简要卡 [律名, 机制一句话, 例句 1, 例句 2]，取 lawdata
    mech[0].kid/beat、lawdata.exs，缺者回落 canonical/zone 字段（与原型
    collect() 同回落链），不另编。
  - 有辨析页：律 id ∈ contrast_pages 各页 a/b 集合；硬断言索引内带标
    记的律恰 11 个。跳转由呈现层读 CONTRAST.byLaw 现行数据，不在本索
    引存第二份。

序列化格式：同 gen_phonics.py——Python json 默认分隔符、ensure_ascii=False。

写回安全边界：只替换唯一定位锚（"var ERRIDX="，命中 != 1 拒绝）定界扫
描得到的字面量跨度，其余字节原样不动。锚缺失即停（呈现脚本段由并入波
手工落位，含占位字面量）。

用法
  python3 laws-prototype/tools/gen_errors.py --check   # 稳态校验
  python3 laws-prototype/tools/gen_errors.py --write   # 生成并写回主文件
--check 退出码：0=逐字节一致；1=不一致或断言失败。
"""
import json
import re
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MAIN = BASE / "mengxing-prototype-v1.html"
LM_PATH = BASE / "model" / "laws_master.json"
CX_PATH = BASE / "model" / "contrast_pages.json"

JD = lambda o: json.dumps(o, ensure_ascii=False)

MARKER = ("/* GENERATED: tools/gen_errors.py ← model/laws_master.json"
          " + model/contrast_pages.json · DO NOT EDIT */")
ANCHOR = "var ERRIDX="

PUNCT = set(".,!?;:'\"()") | set("（）「」、，【】")


def fail(msg):
    raise AssertionError(msg)


def norm(s):
    s = (s or "").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    s = s.lower()
    s = "".join(" " if ch in PUNCT else ch for ch in s)
    return re.sub(r"\s+", " ", s).strip()


def scan_literal(src: str, start: int) -> int:
    """定界扫描（与 gen_morph.py 同逻辑）。"""
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


def find_span(src: str, anchor: str, first_char: str):
    hits = []
    i = 0
    while True:
        j = src.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(src) and src[p].isspace():
            p += 1
        if p < len(src) and src[p] == first_char:
            hits.append(p)
        i = j + len(anchor)
    if len(hits) != 1:
        raise ValueError(f"锚点 {anchor!r} 命中 {len(hits)} 处（应为 1），拒绝操作")
    s = hits[0]
    return s, scan_literal(src, s)


def build(master, contrast):
    cx_laws = set()
    for p in contrast["pages"]:
        cx_laws.add(p["a"])
        cx_laws.add(p["b"])
    cases = []
    per_law = {}
    src_counts = {"lawdata": 0, "yaml": 0, "zone": 0}
    for e in master:
        lid = e["id"]
        ld = e.get("lawdata") or {}
        ym = e.get("yaml") or {}
        zd = (e.get("zone") or {}).get("data") or {}
        raw = []
        for c in ld.get("cases") or []:
            raw.append(("lawdata", c.get("wrong"), c.get("right"), c.get("diag")))
        for c in ym.get("error_cases") or []:
            raw.append(("yaml", c.get("wrong"), c.get("right"), c.get("diagnosis")))
        for c in zd.get("errors") or []:
            raw.append(("zone", c.get("wrong"), c.get("right"), c.get("diag")))
        can = e.get("canonical") or {}
        fam = can.get("family") or lid.split("-")[0]
        name = can.get("headline") or ld.get("hl") or zd.get("short") or lid
        seen = set()
        for tag, w, r, dg in raw:
            if not w:
                continue
            n = norm(w)
            if n in seen:
                continue
            seen.add(n)
            src_counts[tag] += 1
            teach = 0 if re.search(r"[A-Za-z]", w) else 1
            entry = [lid, fam, name, w, r or "", dg or "",
                     1 if lid in cx_laws else 0, teach]
            cases.append(entry)
            per_law.setdefault(lid, []).append(entry)
    briefs = {}
    for e in master:
        lid = e["id"]
        if lid not in per_law:
            continue
        ld = e.get("lawdata") or {}
        zd = (e.get("zone") or {}).get("data") or {}
        can = e.get("canonical") or {}
        mech = ""
        if ld.get("mech"):
            mech = ld["mech"][0].get("kid") or ld["mech"][0].get("beat") or ""
        if not mech:
            mech = can.get("kid_headline") or zd.get("kid") or ""
        exs = [x.get("s", "") for x in (ld.get("exs") or []) if x.get("s")]
        if not exs:
            exs = [x.get("s", "") for x in (zd.get("examples") or []) if x.get("s")]
        name = can.get("headline") or ld.get("hl") or zd.get("short") or lid
        briefs[lid] = [name, mech] + (exs[:2] + ["", ""])[:2]
    n_teach = sum(1 for c in cases if c[7])
    laws_child = len({c[0] for c in cases if not c[7]})
    cx_in = len({c[0] for c in cases if c[6]})
    # ---- 硬断言：与原型盘点逐项对账 ----
    if len(cases) != 334:
        fail(f"病例总数应为 334，实得 {len(cases)}")
    if len(per_law) != 206:
        fail(f"覆盖律应为 206，实得 {len(per_law)}")
    if src_counts != {"lawdata": 109, "yaml": 89, "zone": 136}:
        fail(f"来源构成对账失败：{src_counts} != lawdata 109 / yaml 89 / zone 136")
    if n_teach != 55:
        fail(f"教学法条目应为 55，实得 {n_teach}")
    if cx_in != 11:
        fail(f"索引内有辨析页的律应为 11，实得 {cx_in}")
    built = {"tot": len(cases), "nt": n_teach, "laws": len(per_law),
             "lawsc": laws_child, "cases": cases, "briefs": briefs}
    stats = {"src": src_counts, "laws_child": laws_child, "cx_laws": cx_in}
    return built, stats


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    master = json.loads(LM_PATH.read_text(encoding="utf-8"))
    contrast = json.loads(CX_PATH.read_text(encoding="utf-8"))
    src = MAIN.read_bytes().decode("utf-8")
    try:
        s0, s1 = find_span(src, ANCHOR, "{")
    except ValueError as e:
        print(f"FAIL: {e}")
        return 1
    cur_text = src[s0:s1]
    try:
        built, stats = build(master, contrast)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    gen_text = JD(built)
    print(f"对账：病例 {built['tot']} 条 / 覆盖 {built['laws']} 律（来源 {stats['src']}）；"
          f"教学法条目 {built['nt']} 条（成人层）；错句覆盖 {stats['laws_child']} 律；"
          f"有辨析页 {stats['cx_laws']} 律")
    if gen_text == cur_text:
        print(f"PASS: ERRIDX 字面量逐字节一致（{len(cur_text)} 字符）")
        return 0
    if argv[1] == "--check":
        print(f"ERRIDX 与生成结果不一致（再生 {len(gen_text)} / 现行 {len(cur_text)} 字符，待 --write 落盘）")
        return 2
    out = src[:s0] + gen_text + src[s1:]
    a = out.rfind(ANCHOR, 0, s0)
    ls = out.rfind("\n", 0, a) + 1
    if ls > 0:
        prev_start = out.rfind("\n", 0, ls - 1) + 1
        if out[prev_start:ls - 1].strip() != MARKER:
            out = out[:ls] + MARKER + "\n" + out[ls:]
    MAIN.write_bytes(out.encode("utf-8"))
    print(f"ERRIDX 写回完成：文件 {len(src)} -> {len(out)} 字符（索引 {len(gen_text)} 字符）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
