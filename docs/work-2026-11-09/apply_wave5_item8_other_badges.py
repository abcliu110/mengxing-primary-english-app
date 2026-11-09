#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave5_item8_other_badges.py — 第五波第 8 项：V/CO/QI 区静态徽标与
ERRIDX 对齐（41 行 part→ok）。

背景：第四波第 6/7 项只扫了 NE/E/W 两区（59 行）。第五波第 8 项扩面扫
其余区全部静态行（299 行 urow data-law 行；v-expr 30、v-expr2 29、
v-vocab 43、v-grammar2 31、v-phon-laws 52、v-parents 114）：
  * v-vocab（V，43 行）：与 E/W/NE 同口径（ERRIDX 有病例 + 有练习 → ok）。
    19 行 part 滞后（病例波后静态行未跟进），其余 24 行无误。
  * v-grammar2（CO/QI，31 行）：同口径，part 文本为「有练习 · 还没有病例」
    （同义不同字）。22 行 part 滞后，CO-11（ERRIDX 0）是唯一正确的 part。
  * v-phon-laws（S/SR，52 行）：口径不同，**不修**——徽标的“病例”指本律
    PHONLAWS 条目自身的 cases（规律页实际呈现的病例），“理解探针”指本律
    prb 有无；52/52 行与该口径一致（ok 行 S-14/S-43/SR-04 恰为仅有的 3 条
    cases>0 的律；探针半句与 prb 有无 52/52 一致）。若硬套 ERRIDX 会误判
    49 行（ERRIDX 含 yaml/zone 病例，拼读律页不呈现）。
  * v-parents（114 行）：计数式徽标「成人层 · 探针×N · 病例×N · 练习×N」，
    81 条带数行逐数核对（探针=运行时 LAWDATA prb 数、病例=再生 ERRIDX 数、
    练习=运行时 LAWDATA quiz 数）0 不符；33 条光秃「成人层」三数皆为 0，
    一致。**不修**。
  * 另 4 条无本区 data-law 行但各有去处，不补行：V-33（ptr 指 morph 区，
    v-vocab 里为 data-go 深研行 u-v33）、V-40（v-vocab 里为 data-go 深研行
    u-v40，打包对照单元）、CO-17（无 LAWDATA 条目、无独立规律页，v-vocab /
    v-grammar2 里为 data-go 深研行 u-co17）、S-44（LINKIDX z='MZ'，内容在
    morph 区 RV_GENQ）。

徽标口径（沿用第二波第 2 项、第三波第 5 项、第四波第 6/7 项；也是
tools/check_badge_erridx.py 第五波扩面后门禁的口径）：
  有 ERRIDX 病例 + 有练习 → <span class="st ok">有病例 · 有练习</span>
  无 ERRIDX 病例 + 有练习 → part（V 区文本「有练习 · 查过·没有病例」；
  CO/QI 区文本「有练习 · 还没有病例」）

三源交叉核对（见工作底稿 wave5_item8_other_badges.md §二）：
  41 行 ERRIDX 运行时 = ERRIDX 再生（gen_errors.build），quiz 皆 ≥1
  （V 区 quiz 皆 1，CO/QI 区 quiz 皆 4）；lawdata.cases 与 ERRIDX 不等
  的行（QI 全 15 行、V-20/21/30/32/34–38 等 ptr 条目）皆因 yaml/zone
  病例汇入 ERRIDX，徽标仍以 ERRIDX 为准——与第四波门禁口径一致。

用法：python3 docs/work-2026-11-09/apply_wave5_item8_other_badges.py [--apply]
缺省只演练核对；--apply 写回主文件。写回后须跑
python3 laws-prototype/tools/check_badge_erridx.py（应 PASS）、check_all
与 jscheck。
"""

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

OK = '<span class="st ok">有病例 · 有练习</span>'
PART_V = '<span class="st part">有练习 · 查过·没有病例</span>'
PART_G2 = '<span class="st part">有练习 · 还没有病例</span>'

# (律 id, 改前 part 文本)
TARGETS = [
    # v-vocab（V，19 行）
    ("V-02", PART_V), ("V-03", PART_V), ("V-06", PART_V), ("V-08", PART_V),
    ("V-09", PART_V), ("V-11", PART_V), ("V-13", PART_V), ("V-14", PART_V),
    ("V-17", PART_V), ("V-19", PART_V), ("V-20", PART_V), ("V-24", PART_V),
    ("V-27", PART_V), ("V-28", PART_V), ("V-29", PART_V), ("V-30", PART_V),
    ("V-41", PART_V), ("V-42", PART_V), ("V-45", PART_V),
    # v-grammar2（CO，11 行）
    ("CO-01", PART_G2), ("CO-02", PART_G2), ("CO-05", PART_G2),
    ("CO-06", PART_G2), ("CO-08", PART_G2), ("CO-09", PART_G2),
    ("CO-10", PART_G2), ("CO-12", PART_G2), ("CO-14", PART_G2),
    ("CO-15", PART_G2), ("CO-16", PART_G2),
    # v-grammar2（QI，11 行）
    ("QI-01", PART_G2), ("QI-02", PART_G2), ("QI-03", PART_G2),
    ("QI-05", PART_G2), ("QI-06", PART_G2), ("QI-07", PART_G2),
    ("QI-08", PART_G2), ("QI-09", PART_G2), ("QI-12", PART_G2),
    ("QI-14", PART_G2), ("QI-15", PART_G2),
]
# 对照锚点（不动）：同区同口径的 ok 行与 part 行
ANCHORS = [
    ("V-01", OK), ("V-04", PART_V), ("V-05", OK), ("V-22", PART_V),
    ("CO-03", OK), ("CO-11", PART_G2), ("CO-13", OK), ("QI-04", OK),
]


def row_re(lid):
    return re.compile(r'(<div class="urow"[^>]*data-law="' + re.escape(lid) +
                      r'"[^>]*>.*?)<span class="st [^"]+">[^<]*</span>(</div>)',
                      flags=re.S)


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第 8 项：V/CO/QI 41 行静态徽标 part→ok（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回主文件")
    args = ap.parse_args(argv)
    text = MAIN.read_text(encoding="utf-8")
    problems = []

    for lid, part in TARGETS:
        m = row_re(lid).search(text)
        if not m:
            problems.append(f"{lid} 行未找到")
            continue
        old_row = m.group(0)
        if text.count(old_row) != 1:
            problems.append(f"{lid} 旧行出现 {text.count(old_row)} 次（应为 1）")
        if part not in old_row:
            problems.append(f"{lid} 旧行徽标不是预期的 part 文本")
        if old_row.count(part) != 1:
            problems.append(f"{lid} 旧行 part 文本出现 {old_row.count(part)} 次（应为 1）")
        new_row = old_row.replace(part, OK, 1)
        if text.count(new_row) != 0:
            problems.append(f"{lid} 新行（ok 徽标）已存在，拒绝重复改动")
    for lid, badge in ANCHORS:
        m = row_re(lid).search(text)
        if not m or badge not in m.group(0):
            problems.append(f"对照锚点 {lid} 行徽标异常（应含 {badge}）")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print(f"OK 核对通过：{len(TARGETS)} 行旧行（part）各 1 处；新行（ok）0 处；"
          f"{len(ANCHORS)} 个对照锚点在位")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    new = text
    for lid, part in TARGETS:
        m = row_re(lid).search(new)
        old_row = m.group(0)
        new = new.replace(old_row, old_row.replace(part, OK, 1), 1)

    for lid, part in TARGETS:
        m = row_re(lid).search(new)
        if not m or OK not in m.group(0):
            return fail(f"写回自检失败：{lid} 新行无 ok 徽标")
        if part in m.group(0):
            return fail(f"写回自检失败：{lid} 仍有 part 徽标残留")
    for lid, badge in ANCHORS:
        m = row_re(lid).search(new)
        if not m or badge not in m.group(0):
            return fail(f"写回自检失败：对照锚点 {lid} 被误动")
    MAIN.write_text(new, encoding="utf-8")
    print(f"APPLY 完成：V 19 行 + CO 11 行 + QI 11 行 = {len(TARGETS)} 行徽标"
          " part→ok（有病例 · 有练习）；标题、位置、分组未动；"
          "拼读区 52 行与家长区 114 行未动。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
