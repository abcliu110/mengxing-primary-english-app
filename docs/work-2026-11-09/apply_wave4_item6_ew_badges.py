#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave4_item6_ew_badges.py — 第四波第 6 项：E/W 区静态徽标与 ERRIDX 对齐。

背景：#v-expr（E/W，30 行）静态索引行中 10 行挂
<span class="st part">有练习 · 查过·没有病例</span>，但现行 ERRIDX（524 条）
里这 10 条各有病例（E-01/03/04/05/07/08/13/15 各 1 条，W-12/13 各 2 条）。
与第三波第 5 项的 NE-01/02/03 同病：病例波（ERRIDX 381→524）后
静态行未跟进的旧口径——这 10 条的 LAWDATA.nocase 仍写着
“2026-11-09 已补 N 条逐字病例；此前查证登记：……”。

徽标口径（沿用第二波第 2 项、第三波第 5 项，与其余 E/W/NE 儿童行一致；
也是 tools/check_badge_erridx.py 第四波第 7 项门禁的口径）：
  有 ERRIDX 病例 + 有练习 → <span class="st ok">有病例 · 有练习</span>
  无 ERRIDX 病例 + 有练习 → <span class="st part">有练习 · 查过·没有病例</span>
  教师层行挂 <span class="st tchr">教师层</span>，不带病例/练习信息，不参与比对。

三源交叉核对（见工作底稿 wave4_item6_ew_badges.md §二）：
  10 行三源逐律一致——ERRIDX 运行时、ERRIDX 再生（gen_errors.build）、
  laws_master lawdata.cases、主文件 LAWDATA cases_len 四数相等；
  quiz 皆为 1。另 13 行儿童行（E-02/09、W-14 为 ok；E-10/11、
  W-01/02/03/04/05/06/07/10 为 part）核对无误，不动；
  7 行教师层（E-06/12/14、W-08/09/11/15）只核对在位，不动——
  其中 E-06 有 2 条 ERRIDX 病例，但 tchr 徽标不宣称病例状态，
  与 NE 教师行同口径，本次不改。

用法：python3 docs/work-2026-11-09/apply_wave4_item6_ew_badges.py [--apply]
缺省只演练核对；--apply 写回主文件。写回后须跑
python3 laws-prototype/tools/check_badge_erridx.py（应 PASS）、check_all
与 jscheck，并用 jsdom 核对 10 行徽标。
"""

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

PART = '<span class="st part">有练习 · 查过·没有病例</span>'
OK = '<span class="st ok">有病例 · 有练习</span>'

ROW = {
    "E-01": '<div class="urow" data-law="E-01"><span class="id">E-01</span>'
            '<span class="tt">说话就是做事：每句话在传递信息之外，都在执行一个动作——请求、道歉、承诺、感谢、邀请</span>',
    "E-03": '<div class="urow" data-law="E-03"><span class="id">E-03</span>'
            '<span class="tt">对话能进行下去，靠双方默认「我还在配合你」：答非所问往往不是乱答，是在用绕弯的方式回答</span>',
    "E-04": '<div class="urow" data-law="E-04"><span class="id">E-04</span>'
            '<span class="tt">日常句子是整块从记忆里取出来的，不是逐词现拼的：问候、点餐、道别靠的是「现成块」</span>',
    "E-05": '<div class="urow" data-law="E-05"><span class="id">E-05</span>'
            '<span class="tt">语法错了，人家笑你「说得不好」；场合错了，人家觉得你「人不好」——语用失误比语法错误更伤人，而且更难被察觉</span>',
    "E-07": '<div class="urow" data-law="E-07"><span class="id">E-07</span>'
            '<span class="tt">请求、打扰、拒绝越「压人」，英语越要加缓冲：礼貌是替对方的「面子」留余地，客气程度随关系远近和事的大小滑动</span>',
    "E-08": '<div class="urow" data-law="E-08"><span class="id">E-08</span>'
            '<span class="tt">一句回应「对不对」，不看句子本身，看三件事：谁在说、对谁说、上一句说了什么</span>',
    "E-13": '<div class="urow" data-law="E-13"><span class="id">E-13</span>'
            '<span class="tt">对话是两个人轮流搭的：一问一答是绑在一起的「对子」，上一句长什么样，就预定了下一句的活</span>',
    "E-15": '<div class="urow" data-law="E-15"><span class="id">E-15</span>'
            '<span class="tt">说错了能自己改回来，是对话自带的功能：交际教学不该一出错就打断，先让人把「自我修复」走完</span>',
    "W-12": '<div class="urow" data-law="W-12"><span class="id">W-12</span>'
            '<span class="tt">字写不顺、词拼不对，会把脑子「堵住」：基本功不自动化，就没有余力想内容</span>',
    "W-13": '<div class="urow" data-law="W-13"><span class="id">W-13</span>'
            '<span class="tt">句子是攒出来的：把两个短句合成一个长句的练习（句子合并），是实测能提升写作质量的少数单项训练</span>',
}
# 对照锚点（不动）：同区同口径的 ok 行与 part 行，证明徽标格式与本区一致
ANCHOR_OK = {
    "E-02": '<div class="urow" data-law="E-02"><span class="id">E-02</span>'
            '<span class="tt">很多话不能按字面听：「你能把盐递给我吗」问的不是能力，是请求——意思要过「他想让我做什么」这一关</span>'
            '<span class="st ok">有病例 · 有练习</span></div>',
    "W-14": '<div class="urow" data-law="W-14"><span class="id">W-14</span>'
            '<span class="tt">衔接词是给读者的路标，不是作文的装饰品：路标必须对准真实的逻辑关系，贴错地方比没有更糟</span>'
            '<span class="st ok">有病例 · 有练习</span></div>',
}
ANCHOR_PART = {
    "E-10": '<div class="urow" data-law="E-10"><span class="id">E-10</span>'
            '<span class="tt">「会说英语」是四种本事合起来：语法只占四分之一，其余是得体、成篇、和卡壳时的自救</span>'
            '<span class="st part">有练习 · 查过·没有病例</span></div>',
    "W-01": '<div class="urow" data-law="W-01"><span class="id">W-01</span>'
            '<span class="tt">写作和说话最大的不同：读者不在你面前，看不见你脑子里的画——每个信息都要用文字亲手交到读者眼前</span>'
            '<span class="st part">有练习 · 查过·没有病例</span></div>',
}


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第 6 项：E/W 10 行静态徽标 part→ok（默认演练）")
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
    for lid, row in list(ANCHOR_OK.items()) + list(ANCHOR_PART.items()):
        if text.count(row) != 1:
            problems.append(f"对照锚点 {lid} 行出现 {text.count(row)} 次（应为 1）")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print("OK 核对通过：10 行旧行（part）各 1 处；新行（ok）0 处；"
          "E-02/W-14 ok 与 E-10/W-01 part 对照行各 1 处")

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
    for lid, row in list(ANCHOR_OK.items()) + list(ANCHOR_PART.items()):
        if new.count(row) != 1:
            return fail(f"写回自检失败：对照锚点 {lid} 被误动")
    # 顺序自检：E 行仍按编号升序、W 行仍按编号升序、E 组在 W 组之前
    order = ["E-01", "E-03", "E-04", "E-05", "E-07", "E-08", "E-13", "E-15",
             "W-12", "W-13"]
    for a, b in zip(order, order[1:]):
        if new.find(f'data-law="{a}"') >= new.find(f'data-law="{b}"'):
            return fail(f"写回自检失败：顺序 {a} 应在 {b} 之前")
    MAIN.write_text(new, encoding="utf-8")
    print("APPLY 完成：E-01/03/04/05/07/08/13/15、W-12/13 共 10 行徽标 part→ok"
          "（有病例 · 有练习）；标题、位置、分组未动。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
