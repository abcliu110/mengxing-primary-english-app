#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave2_item2_index_rows.py — 第二波第 2 项（续）：#v-expr 静态索引行跟进。

背景：NE-09/24/25 的 aud 改回“双层”后，数据层与 ROSTER 已同步，但 #v-expr
静态索引行（主文件约 6514 行，e4a77fa 落地）仍把三条放在“教师/设计层（NE · 成人）”
组里、挂 <span class="st tchr">教师层</span>，R16 的 JS 会给这些行加 adult-row
在儿童层折叠隐藏——数据改了、索引没改，孩子仍看不到这三条。
tools/ 里没有任何生成器拥有这批静态行（gen_roster 只写 ROSTER 字面量；
grep "st tchr" 在 tools/gen_*.py 中零命中），故此处做一次带断言的手术式
文本迁移，不手写新内容：行内标题一字不动（tt 均为 lawdata.hl 原文），只换
徽标、只移动位置。

迁移：
  NE-09 → “NE · 学习者词典”组，插在 NE-08 行后（同 subgroup、编号顺序）
  NE-24 / NE-25 → 新建“NE · Mercer 与 Alexander：课堂谈话”组（组名 = yaml
    subgroup 原文，与其余各组“NE · <subgroup>”的命名方式一致），插在
    “NE · 发音是身体的事”组（NE-14 行）后、“NE · Corbett：Talk for Writing”
    组前（编号顺序 24/25 < 27）
  NE-26 不动，留在成人组。

徽标口径（按现行 ERRIDX 实测 + quiz，与其余 NE 儿童行一致）：
  有 ERRIDX 病例 + 有练习 → <span class="st ok">有病例 · 有练习</span>
    （NE-08、NE-14 均如此；NE-24：ERRIDX 1 条、quiz 1 → ok）
  无 ERRIDX 病例 + 有练习 → <span class="st part">有练习 · 查过·没有病例</span>
    （NE-07/10/11/12/13/27/28 均如此；NE-09、NE-25：ERRIDX 0 条、quiz 1 → part）
  注意：NE-01/02/03 三行徽标与现行 ERRIDX 不符（各有 1–2 条病例却挂 part），
  应为 1.1 病例波（ERRIDX 381→524）后静态行未跟进的旧口径——本次不动，
  属既有遗留，另行登记，不在本项范围内扩大改动。

用法：python3 docs/work-2026-11-09/apply_wave2_item2_index_rows.py [--apply]
缺省只演练核对；--apply 写回主文件。写回后须重跑 gen_* --check 与 check_all
（静态行不在任何生成器管辖内，应零影响）及 jsdom 儿童层抽查。
"""

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

TCHR = '<span class="st tchr">教师层</span>'
PART = '<span class="st part">有练习 · 查过·没有病例</span>'
OK = '<span class="st ok">有病例 · 有练习</span>'

ROW = {
    "NE-09": ('<div class="urow" data-law="NE-09"><span class="id">NE-09</span>'
              '<span class="tt">先有情景，再有句型：Hornby 的情景法遗产</span>',
              PART),
    "NE-24": ('<div class="urow" data-law="NE-24"><span class="id">NE-24</span>'
              '<span class="tt">谈话有三型：吵架型、附和型、探索型——只有探索型谈话里，思考是公开进行的</span>',
              OK),
    "NE-25": ('<div class="urow" data-law="NE-25"><span class="id">NE-25</span>'
              '<span class="tt">Thinking Together：先全班约法（ground rules），再放小组讨论——规矩是谈出来的，不是贴出来的</span>',
              PART),
}
# 锚点行（不动，只作插入位置）：NE-08 行、NE-14 行全文
NE08 = ('<div class="urow" data-law="NE-08"><span class="id">NE-08</span>'
        '<span class="tt">词典真正的灵魂是例句和句型：动词是句子的枢纽</span>'
        '<span class="st ok">有病例 · 有练习</span></div>')
NE14 = ('<div class="urow" data-law="NE-14"><span class="id">NE-14</span>'
        '<span class="tt">目标是被听懂，不是扮成母语者：可懂度优先于口音</span>'
        '<span class="st ok">有病例 · 有练习</span></div>')
GROUP_MERCER = '<div class="gh">NE · Mercer 与 Alexander：课堂谈话</div>'


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第 2 项续：#v-expr 索引行迁移（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回主文件")
    args = ap.parse_args(argv)
    text = MAIN.read_text(encoding="utf-8")
    problems = []

    for lid, (prefix, badge) in ROW.items():
        old = prefix + TCHR + "</div>"
        if text.count(old) != 1:
            problems.append(f"{lid} 成人组旧行出现 {text.count(old)} 次（应为 1）")
    for anchor, name in ((NE08, "NE-08 行"), (NE14, "NE-14 行")):
        if text.count(anchor) != 1:
            problems.append(f"锚点{name}出现 {text.count(anchor)} 次（应为 1）")
    if GROUP_MERCER in text:
        problems.append("Mercer 组头已存在，拒绝重复插入")
    # NE-26 成人行必须存在且不动
    ne26 = ('<div class="urow" data-law="NE-26"><span class="id">NE-26</span>'
            '<span class="tt">Alexander 的对话式教学五原则：集体、互惠、支持、累积、目的'
            '——缺了「累积」，热闹不是对话</span>' + TCHR + "</div>")
    if text.count(ne26) != 1:
        problems.append(f"NE-26 成人行出现 {text.count(ne26)} 次（应为 1）")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print("OK 核对通过：三条成人组旧行各 1 处；NE-08/NE-14 锚点各 1 处；"
          "Mercer 组头不存在；NE-26 成人行 1 处（不动）")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    new = text
    for lid, (prefix, badge) in ROW.items():
        new = new.replace(prefix + TCHR + "</div>", "", 1)
    # NE-09 插到 NE-08 行后
    new = new.replace(NE08, NE08 + ROW["NE-09"][0] + ROW["NE-09"][1] + "</div>", 1)
    # Mercer 组（NE-24/NE-25）插到 NE-14 行后
    mercer_rows = "".join(ROW[l][0] + ROW[l][1] + "</div>" for l in ("NE-24", "NE-25"))
    new = new.replace(NE14, NE14 + GROUP_MERCER + mercer_rows, 1)

    # 写回后自检
    for lid, (prefix, badge) in ROW.items():
        want = prefix + badge + "</div>"
        if new.count(want) != 1:
            return fail(f"写回自检失败：{lid} 新行出现 {new.count(want)} 次（应为 1）")
        if new.count(prefix + TCHR) != 0:
            return fail(f"写回自检失败：{lid} 仍有教师层徽标残留")
    if new.count(ne26) != 1:
        return fail("写回自检失败：NE-26 成人行被误动")
    if new.count(GROUP_MERCER) != 1:
        return fail("写回自检失败：Mercer 组头数量异常")
    # 顺序自检：NE-09 在 NE-08 之后、NE-15 之前；NE-24/25 在 NE-14 之后、NE-27 之前
    for a, b in (("NE-08", "NE-09"), ("NE-09", "NE-15"), ("NE-14", "NE-24"),
                 ("NE-24", "NE-25"), ("NE-25", "NE-27")):
        if new.find(f'data-law="{a}"') >= new.find(f'data-law="{b}"'):
            return fail(f"写回自检失败：顺序 {a} 应在 {b} 之前")
    MAIN.write_text(new, encoding="utf-8")
    print("APPLY 完成：NE-09 移入“学习者词典”组（徽标 part）；"
          "NE-24（ok）、NE-25（part）移入新建 Mercer 组；NE-26 未动。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
