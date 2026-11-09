#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave3_item5_ne_badges.py — 第三波第 5 项：NE-01/02/03 静态徽标与 ERRIDX 对齐。

背景：第一波后遗留的可见不一致。#v-expr2 静态索引行（主文件约 6518 行）
把 NE-01/02/03 都挂 <span class="st part">有练习 · 查过·没有病例</span>，
但现行 ERRIDX（524 条）里三条各有病例：NE-01 2 条、NE-02 2 条、NE-03 1 条。
这是 1.1 病例波（ERRIDX 381→524）后静态行未跟进的旧口径（第二波第 2 项
底稿与 wave2_2.2_70pairs.md §5 已登记，本次才修）。

徽标口径（沿用第二波第 2 项，与其余 NE 儿童行一致）：
  有 ERRIDX 病例 + 有练习 → <span class="st ok">有病例 · 有练习</span>
    （NE-08、NE-14 均如此，各 1 病例 + 1 练习）
三源交叉核对（脚本演练时只核对行文本；病例/练习数见工作底稿）：
  ERRIDX 运行时：NE-01 2、NE-02 2、NE-03 1
  laws_master.json lawdata.cases：2 / 2 / 1；quiz：1 / 1 / 1
  主文件 LAWDATA 运行时：cases_len 2 / 2 / 1；quiz 1 / 1 / 1
三条只换徽标，不动标题、不动位置、不动分组（仍在“NE · 地道与流利”组）。

用法：python3 docs/work-2026-11-09/apply_wave3_item5_ne_badges.py [--apply]
缺省只演练核对；--apply 写回主文件。写回后须重跑 check_all 与 jscheck，
并用 jsdom 核对三行徽标。
"""

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

PART = '<span class="st part">有练习 · 查过·没有病例</span>'
OK = '<span class="st ok">有病例 · 有练习</span>'

ROW = {
    "NE-01": '<div class="urow" data-law="NE-01"><span class="id">NE-01</span>'
             '<span class="tt">合语法不等于地道：母语者只说「惯例会说的那一种」</span>',
    "NE-02": '<div class="urow" data-law="NE-02"><span class="id">NE-02</span>'
             '<span class="tt">说话快得不像现编的：大脑里整存着一座「句干仓库」</span>',
    "NE-03": '<div class="urow" data-law="NE-03"><span class="id">NE-03</span>'
             '<span class="tt">学英语的起步单位是整块，不是单词加规则</span>',
}
# 对照锚点（不动）：同组同口径的 ok 行，证明 ok 徽标格式与本区一致
ANCHOR_OK = {
    "NE-08": '<div class="urow" data-law="NE-08"><span class="id">NE-08</span>'
             '<span class="tt">词典真正的灵魂是例句和句型：动词是句子的枢纽</span>'
             '<span class="st ok">有病例 · 有练习</span></div>',
    "NE-14": '<div class="urow" data-law="NE-14"><span class="id">NE-14</span>'
             '<span class="tt">目标是被听懂，不是扮成母语者：可懂度优先于口音</span>'
             '<span class="st ok">有病例 · 有练习</span></div>',
}


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第 5 项：NE-01/02/03 静态徽标 part→ok（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回主文件")
    args = ap.parse_args(argv)
    text = MAIN.read_text(encoding="utf-8")
    problems = []

    for lid, prefix in ROW.items():
        old = prefix + PART + "</div>"
        if text.count(old) != 1:
            problems.append(f"{lid} 旧行（part 徽标）出现 {text.count(old)} 次（应为 1）")
        if text.count(prefix + OK + "</div>") != 0:
            problems.append(f"{lid} 新行（ok 徽标）已存在，拒绝重复改动")
    for lid, row in ANCHOR_OK.items():
        if text.count(row) != 1:
            problems.append(f"对照锚点 {lid} ok 行出现 {text.count(row)} 次（应为 1）")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print("OK 核对通过：NE-01/02/03 旧行（part）各 1 处；新行（ok）0 处；"
          "NE-08/NE-14 ok 对照行各 1 处")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    new = text
    for lid, prefix in ROW.items():
        new = new.replace(prefix + PART + "</div>", prefix + OK + "</div>", 1)

    for lid, prefix in ROW.items():
        if new.count(prefix + OK + "</div>") != 1:
            return fail(f"写回自检失败：{lid} 新行出现 {new.count(prefix + OK + '</div>')} 次（应为 1）")
        if new.count(prefix + PART) != 0:
            return fail(f"写回自检失败：{lid} 仍有 part 徽标残留")
    for lid, row in ANCHOR_OK.items():
        if new.count(row) != 1:
            return fail(f"写回自检失败：对照锚点 {lid} 被误动")
    # 顺序自检：三行仍在“NE · 地道与流利”组、NE-07 之前
    for a, b in (("NE-01", "NE-02"), ("NE-02", "NE-03"), ("NE-03", "NE-07")):
        if new.find(f'data-law="{a}"') >= new.find(f'data-law="{b}"'):
            return fail(f"写回自检失败：顺序 {a} 应在 {b} 之前")
    MAIN.write_text(new, encoding="utf-8")
    print("APPLY 完成：NE-01/02/03 徽标 part→ok（有病例 · 有练习）；标题、位置、分组未动。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
