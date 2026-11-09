#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave5_item7_ptr_titles.py — 第五波第 7 项：preLawTitle 改按 hl 值回落，
14 个 ptr 条目的先修条补 ROSTER 标题。

背景：第四波第 5 项把标题回落链改为 LAWDATA.hl → ROSTER[0] → 只写编号，
但回落以 LAWDATA 条目“有无”为界：LAWDATA 有条目即只取其 hl，无 hl
返回 ''。14 个先修目标在 LAWDATA 里有条目但无 hl 字段（皆为 ptr 型
条目：C-01/04/06/07/09/10、PR-01/05/07/08、QI-01/02/05/13），按此口径
仍只写编号。第五波定夺（主对话 Muse 已定，不重新定夺）：给这 14 个
条目补 hl 标题，来源与第四波第 5 项一致，用 ROSTER，逐条核对一字相同。

改动（主文件 laws-prototype/mengxing-prototype-v1.html，仅 LINKGO 块）：
  * preLawTitle(t)：LAWDATA 有 hl 即取 hl；无 hl（ptr 条目）时回落取
    ROSTER[t][0]；再无返回 ''。即把 `if (e) return e.hl || '';` 改为
    `if (e && e.hl) return e.hl;`，其余一行不变。
  * 其上方注释与 preBarHTML 头注释同步改写口径（条目级回落 → hl 值级回落）。

影响面（jsdom 实测，运行时 LAWDATA 390 条；LINKIDX.g 453 条、87 条有
先修条）：14 个 ptr 目标共出现在 29 条先修条里（C-02/03/04/11/16/17/18、
C-05、C-14/19、C-08/09/19、C-10/20、PR-02/03/04、PR-06/11、PR-08、
PR-09/10、QI-04/09/10、QI-03、QI-06/07、QI-14），这 29 条由裸编号变为
《编号 短标题》，其余 424 条渲染一字不变；已有 hl 的 31 个先修目标
（hl 与 ROSTER[0] 31/31 相同）不受影响。preLawTitle 只被 preBarHTML
调用（主文件内 2 处出现皆为定义与该调用）。

14 条 ROSTER[0] 标题（已逐条核对，与 ROSTER 字面量一字相同）：
  C-01 数不数得清，先看怎么看 / C-04 换个看法，就换个说法 /
  C-06 a：认出是哪一类就行 / C-07 the：就是那一个 /
  C-09 「心里有」不等于「对方知道」 / C-10 中国孩子的冠词错：一个漏，一个滥 /
  PR-01 代词先讲关系，再讲代替 / PR-05 英语的人称是「素颜版」 /
  PR-07 英语的代词一个都不能少 / PR-08 英语每句都要先摆主语 /
  QI-01 缺哪块，派哪个疑问词 / QI-02 wh- 和 th- 是两家人 /
  QI-05 新货压轴，句尾重读 / QI-13 疑问词要搬家到句首

用法：python3 docs/work-2026-11-09/apply_wave5_item7_ptr_titles.py [--apply]
缺省只演练核对；--apply 写回主文件。写回后须重跑 check_all 与 jscheck，
并用 jsdom 比对全部 453 条 preBarHTML 前后（见工作底稿）。
"""

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

OLD_HEADER = (
    "     不读行内 LAWDATA.rel 等字面量，不递归，无先修时三处整块不渲染。标题取合并后 LAWDATA[先修id].hl\n"
    "     按冒号/破折号截断；LAWDATA 无该律条目时（如 TA 站）回落取全册名册 ROSTER[先修id][0]，再无标题只写编号；\n"
    "     LAWDATA 有条目时只取其 hl（无 hl 仍只写编号，与改前一致）。先修目标为成人层时文案末尾追加「（给爸爸妈妈看的）」。===== */"
)
NEW_HEADER = (
    "     不读行内 LAWDATA.rel 等字面量，不递归，无先修时三处整块不渲染。标题取合并后 LAWDATA[先修id].hl\n"
    "     按冒号/破折号截断；LAWDATA 无 hl 时（如 TA 站、ptr 条目）回落取全册名册 ROSTER[先修id][0]，再无标题只写编号；\n"
    "     LAWDATA 有 hl 时只取其 hl（已核对与 ROSTER[0] 一字相同）。先修目标为成人层时文案末尾追加「（给爸爸妈妈看的）」。===== */"
)

OLD_HELPER_COMMENT = (
    "  /* 先修芯片全标题回落（第四波第 5 项）：LAWDATA 有条目时只取其 hl（无 hl 返回 ''，与改前一致）；\n"
    "     LAWDATA 无条目时（如 TA 站）取 ROSTER[先修id][0]——已核对与 DATA.TA 的 head 18/18 相同；再无返回 ''。 */\n"
)
NEW_HELPER_COMMENT = (
    "  /* 先修芯片全标题回落（第四波第 5 项立、第五波第 7 项改按 hl 值回落）：LAWDATA 有 hl 即取其 hl；\n"
    "     无 hl 时（如 TA 站、ptr 条目）取 ROSTER[先修id][0]——已核对与 DATA.TA 的 head 18/18 相同，\n"
    "     14 个 ptr 条目标题与 ROSTER[0] 逐条一字相同；再无返回 ''。 */\n"
)

OLD_FN = (
    "  function preLawTitle(t){\n"
    "    var e = window.LAWDATA && LAWDATA[t];\n"
    "    if (e) return e.hl || '';\n"
    "    var r = window.ROSTER && ROSTER[t];\n"
    "    return (r && r[0]) || '';\n"
    "  }\n"
)
NEW_FN = (
    "  function preLawTitle(t){\n"
    "    var e = window.LAWDATA && LAWDATA[t];\n"
    "    if (e && e.hl) return e.hl;\n"
    "    var r = window.ROSTER && ROSTER[t];\n"
    "    return (r && r[0]) || '';\n"
    "  }\n"
)


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第 7 项：preLawTitle 改按 hl 值回落，14 个 ptr 条目补标题（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回主文件")
    args = ap.parse_args(argv)
    text = MAIN.read_text(encoding="utf-8")
    problems = []

    for name, old, new in (("头注释", OLD_HEADER, NEW_HEADER),
                           ("helper 注释", OLD_HELPER_COMMENT, NEW_HELPER_COMMENT),
                           ("preLawTitle", OLD_FN, NEW_FN)):
        if text.count(old) != 1:
            problems.append(f"{name}旧文出现 {text.count(old)} 次（应为 1）")
        if text.count(new) != 0:
            problems.append(f"{name}新文已存在，拒绝重复改动")
    if text.count("function preBarHTML(id){") != 1:
        problems.append("preBarHTML 定义出现次数异常")
    if text.count("preLawTitle(t)") != 2:
        problems.append(f"preLawTitle(t) 出现 {text.count('preLawTitle(t)')} 次（应为 2：定义+调用）")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print("OK 核对通过：头注释 / helper 注释 / preLawTitle 旧文各 1 处；新文 0 处；"
          "preBarHTML 定义 1 处；preLawTitle(t) 2 处")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    new = text.replace(OLD_HEADER, NEW_HEADER, 1)
    new = new.replace(OLD_HELPER_COMMENT, NEW_HELPER_COMMENT, 1)
    new = new.replace(OLD_FN, NEW_FN, 1)

    for name, old, new_s in (("头注释", OLD_HEADER, NEW_HEADER),
                             ("helper 注释", OLD_HELPER_COMMENT, NEW_HELPER_COMMENT),
                             ("preLawTitle", OLD_FN, NEW_FN)):
        if new.count(old) != 0:
            return fail(f"写回自检失败：{name}旧文仍残留")
        if new.count(new_s) != 1:
            return fail(f"写回自检失败：{name}新文出现 {new.count(new_s)} 次（应为 1）")
    if new.count("function preBarHTML(id){") != 1:
        return fail("写回自检失败：preBarHTML 定义不为 1 处")
    if new.count("preLawTitle(t)") != 2:
        return fail("写回自检失败：preLawTitle(t) 不为 2 处")
    MAIN.write_text(new, encoding="utf-8")
    print("APPLY 完成：preLawTitle 改按 hl 值回落（LAWDATA.hl → ROSTER[0] → 只写编号）；"
          "preBarHTML / preList / preShortTitle / preIsAdult / preMarkHTML 未动。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
