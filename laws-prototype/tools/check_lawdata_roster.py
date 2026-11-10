#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_lawdata_roster.py — LAWDATA 对账检查（2026-11-09，第五波第 11 项）。

断言（主文件 laws-prototype/mengxing-prototype-v1.html）：
  1) 字面量 + 合并源 = 运行时条数：基础字面量 `var LAWDATA=`（224 条）
     + `var PHONLAWS=`（53 条）+ `var SUPPDATA=`（114 条），三者键集合
     无重叠，按 App 的合并顺序（基础 ← PHONLAWS 覆写 ← SUPPDATA 覆写，
     见主文件 `Object.keys(PHONLAWS).forEach(...)` /
     `Object.keys(SUPPDATA).forEach(...)` 与 check_rel_coverage.py
     同通道）合并后共 391 条。静态只数字面量（224）会误判覆盖面——
     第四波第 5 项初版统计即因此走偏，已纠正。
  2) hl == ROSTER[0]（重叠条目）：运行时 LAWDATA 全部 391 条都在
     ROSTER（456 条）中；其中 323 条有 hl 的，hl 与 ROSTER[k][0]
     逐条一字相同。先修芯片的标题回落（preLawTitle：LAWDATA.hl →
     ROSTER[0]，第五波第 7 项改按 hl 值回落）依赖两者一致；一处改名
     另一处不同步，先修条会悄悄取旧名。
  3) 无 hl ⟺ ptr 条目：67 条无 hl 的条目恰为 67 条 ptr 型条目（全在
     基础字面量内；PHONLAWS/SUPPDATA 条目皆有 hl）。ptr 条目无 hl 是
     preLawTitle 回落到 ROSTER 的前提结构；若某条目悄悄多出/丢掉 hl，
     先修条的标题来源会变，故一并断言。

用法：
  python3 tools/check_lawdata_roster.py            # 校验主文件
  python3 tools/check_lawdata_roster.py <html路径>  # 校验指定副本（自证用）
退出码：0=通过；1=断言失败；2=用法/解析错误。
"""
import json
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')
from pathlib import Path

HERE = Path(__file__).resolve().parent
BASE = HERE.parent
MAIN = BASE / "mengxing-prototype-v1.html"


def scan_literal(src, start):
    """定界扫描（与 check_badge_erridx.py 同逻辑，含字符串/注释处理）。"""
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


def main(argv):
    path = Path(argv[1]) if len(argv) > 1 else MAIN
    if len(argv) > 2:
        print(__doc__)
        return 2
    try:
        text = path.read_text(encoding="utf-8")
        base = get_literal(text, "var LAWDATA=")
        phon = get_literal(text, "var PHONLAWS=")
        supp = get_literal(text, "var SUPPDATA=")
        roster = get_literal(text, "var ROSTER=")
    except (ValueError, json.JSONDecodeError, OSError) as ex:
        print(f"FAIL: 解析失败：{ex}")
        return 2

    problems = []

    # 1) 字面量 + 合并源 = 运行时条数（无重叠，合并即求和）
    overlap_bp = sorted(set(base) & set(phon))
    overlap_bs = sorted(set(base) & set(supp))
    overlap_ps = sorted(set(phon) & set(supp))
    if overlap_bp:
        problems.append(f"LAWDATA 字面量与 PHONLAWS 重叠 {len(overlap_bp)} 条：{overlap_bp}")
    if overlap_bs:
        problems.append(f"LAWDATA 字面量与 SUPPDATA 重叠 {len(overlap_bs)} 条：{overlap_bs}")
    if overlap_ps:
        problems.append(f"PHONLAWS 与 SUPPDATA 重叠 {len(overlap_ps)} 条：{overlap_ps}")
    merged = dict(base)
    merged.update(phon)
    merged.update(supp)
    n_base, n_phon, n_supp, n_rt = len(base), len(phon), len(supp), len(merged)
    if n_base + n_phon + n_supp != n_rt:
        problems.append(f"字面量 + 合并源 ≠ 运行时条数：{n_base} + {n_phon} +"
                        f" {n_supp} = {n_base + n_phon + n_supp}，合并后 {n_rt} 条")

    # 2) hl == ROSTER[0]（重叠条目）；运行时条目须全在 ROSTER 中
    not_in_roster = sorted(k for k in merged if k not in roster)
    if not_in_roster:
        problems.append(f"运行时 LAWDATA 有 {len(not_in_roster)} 条不在 ROSTER 中："
                        f"{not_in_roster}")
    hl_diff = sorted(k for k, v in merged.items()
                     if v.get("hl") and k in roster and v["hl"] != roster[k][0])
    if hl_diff:
        problems.append(f"hl 与 ROSTER[0] 不一致 {len(hl_diff)} 条：{hl_diff}")
    n_hl = sum(1 for v in merged.values() if v.get("hl"))

    # 3) 无 hl ⟺ ptr 条目
    no_hl = {k for k, v in merged.items() if not v.get("hl")}
    ptr = {k for k, v in merged.items() if v.get("ptr")}
    if no_hl != ptr:
        problems.append(f"无 hl 条目（{len(no_hl)}）与 ptr 条目（{len(ptr)}）"
                        f"不是同一集合：只无 hl {sorted(no_hl - ptr)}；"
                        f"只 ptr {sorted(ptr - no_hl)}")

    if problems:
        for p in problems:
            print("FAIL:", p)
        print(f"FAIL: LAWDATA 对账失败（字面量 {n_base} + PHONLAWS {n_phon} +"
              f" SUPPDATA {n_supp} = 运行时 {n_rt}；ROSTER {len(roster)} 条）")
        return 1
    print(f"PASS: LAWDATA 对账通过（字面量 {n_base} + PHONLAWS {n_phon} +"
          f" SUPPDATA {n_supp} = 运行时 {n_rt} 条，无重叠；hl == ROSTER[0]"
          f" {n_hl}/{n_hl}；无 hl ⟺ ptr {len(ptr)} 条；ROSTER {len(roster)} 条）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
