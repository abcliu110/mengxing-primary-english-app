#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave4_item5_ta_titles.py — 第四波第 5 项：共享 preBarHTML 的标题回落，
让 TA 先修条显示标题。

背景：主文件 laws-prototype/mengxing-prototype-v1.html 约 2761 行，
preBarHTML(id) 里标题只取 LAWDATA[t].hl；TA 律不在运行时 LAWDATA 里
（基础字面量 224 条，PHONLAWS 与 SUPPDATA 合并后共 390 条，皆无 TA），
标题取不到就回落成只写编号，如 TA-03 页
`⏳ 建议先学 TA-01，再学这一条。`

改动（主对话 Muse 已定夺，不重新定夺）：标题回落链改为
LAWDATA.hl → ROSTER 标题 → 只写编号。
  * 新增 preLawTitle(t)：LAWDATA 有条目时只取其 hl（无 hl 则返回 ''，
    与改前一字不变）；LAWDATA 无条目时取全册名册 ROSTER[t][0]；
    再无则返回 ''（只写编号）。
  * preBarHTML 改用 preLawTitle(t) 取全标题，再经 preShortTitle 截断；
    lawChip 的 title 属性同步改为全标题（改前为 e.hl 或 ''）。

为何只用 ROSTER、不用 DATA.TA：已逐条核对 DATA.TA（18 条）的 head
字段与 ROSTER[0] 18/18 一字相同，查 DATA.TA 不会多出任何标题；
且 ROSTER 是 preIsAdult 在同一脚本块里已在用的全局（ROSTER[t][2]），
DATA 则定义在后方的 VB 脚本块里，不宜从 LINKGO 块跨块引用。

口径说明（按任务约束“已有 LAWDATA 的律渲染必须一字不变，只有 TA 等
非 LAWDATA 律多出标题”）：回落以 LAWDATA 条目“有无”为界，不以 hl
“空不空”为界。14 个先修目标在 LAWDATA 里有条目但无 hl 字段
（C-01/04/06/07/09/10、PR-01/05/07/08、QI-01/02/05/13，皆为 ptr 型
条目），按此口径仍只写编号、渲染不变；若总协调人改按 hl 值回落，
这 14 条会多出 ROSTER 标题，是一行之改，见工作底稿。

影响面（jsdom 实测，运行时 LAWDATA 共 390 条；LINKIDX.g 共 453 条、
87 条有先修条；55 个不同的先修目标 pid 中 31 个有 hl、14 个有条目
无 hl、10 个无条目）：
  多出标题的先修目标：10 个无 LAWDATA 条目的 pid（TA-01/03/05、
  P-01/02/03/04/05/06/12），共 17 条先修条变化（TA 5 条、P 12 条），
  其余 436 条渲染一字不变。CB/CG/LS/VB/YL 类先修目标改前已有标题
  （SUPPDATA 合并进运行时 LAWDATA 且带 hl，与 ROSTER 标题一字相同），
  不受本次改动影响。
  其中 TA 先修条 5 条：TA-03←TA-01、TA-06←TA-05、TA-07←TA-03、
  TA-09←TA-05、TA-16←TA-05。

用法：python3 docs/work-2026-11-09/apply_wave4_item5_ta_titles.py [--apply]
缺省只演练核对；--apply 写回主文件。写回后须重跑 check_all 与 jscheck，
并用 jsdom 比对全部 453 条 preBarHTML 前后（见工作底稿）。
"""

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

OLD_COMMENT = (
    "     不读行内 LAWDATA.rel 等字面量，不递归，无先修时三处整块不渲染。标题取合并后 LAWDATA[先修id].hl\n"
    "     按冒号/破折号截断，无标题只写编号；先修目标为成人层时文案末尾追加「（给爸爸妈妈看的）」。===== */"
)
NEW_COMMENT = (
    "     不读行内 LAWDATA.rel 等字面量，不递归，无先修时三处整块不渲染。标题取合并后 LAWDATA[先修id].hl\n"
    "     按冒号/破折号截断；LAWDATA 无该律条目时（如 TA 站）回落取全册名册 ROSTER[先修id][0]，再无标题只写编号；\n"
    "     LAWDATA 有条目时只取其 hl（无 hl 仍只写编号，与改前一致）。先修目标为成人层时文案末尾追加「（给爸爸妈妈看的）」。===== */"
)

# 在 preIsAdult 之后、preBarHTML 之前插入的 helper（preIsAdult 末行作锚点）
OLD_HELPER_ANCHOR = (
    "    var e = window.LAWDATA && LAWDATA[t];\n"
    "    return !!(e && (e.aud === '教师/设计层' || e.zone === 'parents'));\n"
    "  }\n"
)
NEW_HELPER = (
    "    var e = window.LAWDATA && LAWDATA[t];\n"
    "    return !!(e && (e.aud === '教师/设计层' || e.zone === 'parents'));\n"
    "  }\n"
    "  /* 先修芯片全标题回落（第四波第 5 项）：LAWDATA 有条目时只取其 hl（无 hl 返回 ''，与改前一致）；\n"
    "     LAWDATA 无条目时（如 TA 站）取 ROSTER[先修id][0]——已核对与 DATA.TA 的 head 18/18 相同；再无返回 ''。 */\n"
    "  function preLawTitle(t){\n"
    "    var e = window.LAWDATA && LAWDATA[t];\n"
    "    if (e) return e.hl || '';\n"
    "    var r = window.ROSTER && ROSTER[t];\n"
    "    return (r && r[0]) || '';\n"
    "  }\n"
)

OLD_CHIPS = (
    "    var chips = ps.map(function(pid){\n"
    "      var t = resolveLaw(pid);\n"
    "      var e = window.LAWDATA && LAWDATA[t];\n"
    "      var title = preShortTitle(e && e.hl);\n"
    "      var label = title ? '《' + pid + ' ' + title + '》' : pid;\n"
    "      return lawChip(pid, label, e && e.hl ? e.hl : '');\n"
    "    });"
)
NEW_CHIPS = (
    "    var chips = ps.map(function(pid){\n"
    "      var t = resolveLaw(pid);\n"
    "      var full = preLawTitle(t);\n"
    "      var title = preShortTitle(full);\n"
    "      var label = title ? '《' + pid + ' ' + title + '》' : pid;\n"
    "      return lawChip(pid, label, full);\n"
    "    });"
)


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第 5 项：preBarHTML 标题回落加 ROSTER（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回主文件")
    args = ap.parse_args(argv)
    text = MAIN.read_text(encoding="utf-8")
    problems = []

    for name, old, new in (("注释", OLD_COMMENT, NEW_COMMENT),
                           ("helper 锚点", OLD_HELPER_ANCHOR, NEW_HELPER),
                           ("chips", OLD_CHIPS, NEW_CHIPS)):
        if text.count(old) != 1:
            problems.append(f"{name}旧文出现 {text.count(old)} 次（应为 1）")
        if text.count(new) != 0:
            problems.append(f"{name}新文已存在，拒绝重复改动")
    # preLawTitle 定义本身改前不存在
    if text.count("function preLawTitle(t){") != 0:
        problems.append("preLawTitle 已存在，拒绝重复改动")
    # preBarHTML 定义唯一
    if text.count("function preBarHTML(id){") != 1:
        problems.append("preBarHTML 定义出现次数异常")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print("OK 核对通过：注释 / helper 锚点 / chips 旧文各 1 处；新文 0 处；preLawTitle 不存在；preBarHTML 定义 1 处")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    new = text.replace(OLD_COMMENT, NEW_COMMENT, 1)
    new = new.replace(OLD_HELPER_ANCHOR, NEW_HELPER, 1)
    new = new.replace(OLD_CHIPS, NEW_CHIPS, 1)

    for name, old, new_s in (("注释", OLD_COMMENT, NEW_COMMENT),
                             ("chips", OLD_CHIPS, NEW_CHIPS)):
        if new.count(old) != 0:
            return fail(f"写回自检失败：{name}旧文仍残留")
        if new.count(new_s) != 1:
            return fail(f"写回自检失败：{name}新文出现 {new.count(new_s)} 次（应为 1）")
    # helper 锚点：新文以旧文为前缀（锚点行保留、后接 helper），只验新文唯一
    if new.count(NEW_HELPER) != 1:
        return fail(f"写回自检失败：helper 新文出现 {new.count(NEW_HELPER)} 次（应为 1）")
    if new.count("function preLawTitle(t){") != 1:
        return fail("写回自检失败：preLawTitle 定义不为 1 处")
    if new.count("function preBarHTML(id){") != 1:
        return fail("写回自检失败：preBarHTML 定义不为 1 处")
    # 其余 pre* 函数未动
    for fn in ("function preList(id){", "function preShortTitle(hl){",
               "function preIsAdult(id){", "function preMarkHTML(id){"):
        if new.count(fn) != 1:
            return fail(f"写回自检失败：{fn} 出现 {new.count(fn)} 次（应为 1）")
    MAIN.write_text(new, encoding="utf-8")
    print("APPLY 完成：preBarHTML 标题回落 LAWDATA.hl → ROSTER[0] → 只写编号；"
          "preIsAdult / preList / preShortTitle / preMarkHTML 未动。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
