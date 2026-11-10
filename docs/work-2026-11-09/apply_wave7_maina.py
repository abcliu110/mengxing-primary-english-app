#!/usr/bin/env python3
"""第七波主文件线 A：第 13 / 15 / 17 项手术脚本。

定夺（主对话 Muse 已定，不重新定夺）：
- 第 13 项：phonics 律页病例口径定版，写进《数据源规范》§1 ERRIDX 行旁。
  口径：律页 cases = 该律 PHONLAWS 条目自身 cases（与徽标口径一致）；
  ERRIDX 的 56 条是索引层面的病例登记，不直接等于律页 cases；
  两者口径不同是设计使然。49 行维持「索引有 · 律页无」标注，
  律页 cases 仍为 0 是合规状态，不再追补；不写新病例内容。
- 第 15 项：CO-17 两行标题区分——#v-grammar2 的 data-law 行标题改写为
  ROSTER[0] 原文（现有材料，不编造），与紧邻的 data-go 深研行
  「空心动词 + get 五构造（在词汇解码区做深）」区分；只改标题字面，
  不删行、不改指向、不改徽标。
- 第 17 项：preShortTitle 旁加注释——例外按 id（C-06/C-07）判定，
  改编号时需重审；不改逻辑。

第 14 / 16 项只记一笔，不改代码/文档，见底稿 wave7_maina.md。

用法：默认演练（只打印将改内容）；`--apply` 写回。
已实施后拒绝重复写回。
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"
SPEC = ROOT / "laws-prototype" / "DATA_SOURCE_SPEC.md"

# --- 第 15 项：CO-17 data-law 行标题（ROSTER[0] 原文，逐字核对） ---
CO17_OLD_TITLE = "空心动词 + get 五构造"
CO17_NEW_TITLE = "英语把「做事」交给空心动词：动词管语法，名词装事情；get 一个词收成五个构造"
CO17_OLD_ROW = (
    '<div class="urow" data-law="CO-17"><span class="id">CO-17</span>'
    '<span class="tt">' + CO17_OLD_TITLE + '</span>'
    '<span class="st deep">已做深</span></div>'
)
CO17_NEW_ROW = (
    '<div class="urow" data-law="CO-17"><span class="id">CO-17</span>'
    '<span class="tt">' + CO17_NEW_TITLE + '</span>'
    '<span class="st deep">已做深</span></div>'
)
# 紧邻的 data-go 深研行（不动，只作落点断言）
CO17_DEEP_ROW = (
    '<div class="urow" data-go="u-co17"><span class="id">CO-17</span>'
    '<span class="tt">空心动词 + get 五构造（在词汇解码区做深）</span>'
    '<span class="st deep">已做深</span></div>'
)

# --- 第 17 项：preShortTitle 注释 ---
C0607_OLD_COMMENT = (
    "    /* 第六波第 10 项：C-06/C-07 例外——全标题不过短（冒号不截断），\n"
    "       芯片显示「a：认出是哪一类就行」「the：就是那一个」；其余律仍按\n"
    "       冒号/破折号截断，全局截断逻辑不动。 */"
)
C0607_NEW_COMMENT = (
    "    /* 第六波第 10 项：C-06/C-07 例外——全标题不过短（冒号不截断），\n"
    "       芯片显示「a：认出是哪一类就行」「the：就是那一个」；其余律仍按\n"
    "       冒号/破折号截断，全局截断逻辑不动。\n"
    "       第七波第 17 项：例外按 id（C-06/C-07）判定，将来改编号时例外随之\n"
    "       失效，须重审；本项只加注释，不改逻辑。 */"
)

# --- 第 13 项：规范 §1 ERRIDX 行追加口径 ---
SPEC_ANCHOR = "补齐须先定 phonics 律页病例口径。）"
SPEC_ADD = (
    "（2026-11-10 第七波第 13 项：phonics 律页病例口径定版——律页 cases = "
    "该律 PHONLAWS 条目自身 cases，与拼读区徽标口径一致；ERRIDX 的 56 条是"
    "索引层面的病例登记（49 行合计），不直接等于律页 cases；两者口径不同是"
    "设计使然。49 行维持「索引有 · 律页无」标注，律页 cases 仍为 0 是合规状态，"
    "不再追补。）"
)


def check():
    main = MAIN.read_text(encoding="utf-8")
    spec = SPEC.read_text(encoding="utf-8")
    problems = []

    # 第 15 项断言
    if CO17_NEW_ROW in main:
        problems.append("第 15 项已实施（新标题已在位），拒绝重复写回")
    if main.count(CO17_OLD_ROW) != 1:
        problems.append(f"第 15 项落点异常：旧 data-law CO-17 行出现 {main.count(CO17_OLD_ROW)} 次（应为 1 次）")
    if main.count(CO17_DEEP_ROW) != 1:
        problems.append(f"第 15 项落点异常：紧邻 data-go 深研行出现 {main.count(CO17_DEEP_ROW)} 次（应为 1 次）")
    # 新标题须与 ROSTER[0] 逐字一致（现有材料，不编造）
    roster = re.search(r'"CO-17": \["([^"]*)", "CO", "K"', main)
    if not roster:
        problems.append("第 15 项：未找到 ROSTER CO-17 条目，无法核对标题来源")
    elif roster.group(1) != CO17_NEW_TITLE:
        problems.append("第 15 项：新标题与 ROSTER[0] 不一致")
    # data-law 行与 data-go 行必须紧邻（旧行后一行即深研行）
    i_old = main.find(CO17_OLD_ROW)
    i_deep = main.find(CO17_DEEP_ROW)
    if i_old >= 0 and i_deep >= 0:
        between = main[i_old + len(CO17_OLD_ROW):i_deep]
        if between != "\n":
            problems.append(f"第 15 项落点异常：两行不紧邻，中间为 {between!r}")

    # 第 17 项断言
    if C0607_NEW_COMMENT in main:
        problems.append("第 17 项已实施（新注释已在位），拒绝重复写回")
    if main.count(C0607_OLD_COMMENT) != 1:
        problems.append(f"第 17 项落点异常：旧注释出现 {main.count(C0607_OLD_COMMENT)} 次（应为 1 次）")
    if main.count("if (id === 'C-06' || id === 'C-07') return s;") != 1:
        problems.append("第 17 项：例外逻辑行异常（应恰为 1 行）")

    # 第 13 项断言
    if SPEC_ADD in spec:
        problems.append("第 13 项已实施（口径句已在位），拒绝重复写回")
    if spec.count(SPEC_ANCHOR) != 1:
        problems.append(f"第 13 项落点异常：锚点出现 {spec.count(SPEC_ANCHOR)} 次（应为 1 次）")
    if "## 1. 单一事实源登记表" not in spec:
        problems.append("第 13 项：规范 §1 标题缺失")
    return problems


def main():
    apply = "--apply" in sys.argv
    problems = check()
    if problems:
        for p in problems:
            print("FAIL:", p)
        sys.exit(1)
    print("演练核对通过（落点均唯一，标题与 ROSTER[0] 逐字一致）：")
    print("  第 15 项：data-law CO-17 标题")
    print(f"    旧：{CO17_OLD_TITLE}")
    print(f"    新：{CO17_NEW_TITLE}")
    print("    紧邻 data-go 深研行标题不变：空心动词 + get 五构造（在词汇解码区做深）")
    print("  第 17 项：preShortTitle 注释 +2 行（只加注释，不改逻辑）")
    print("  第 13 项：规范 §1 ERRIDX 行追加口径句 1 句")
    if not apply:
        print("（演练模式，未写回；加 --apply 执行）")
        return
    main_text = MAIN.read_text(encoding="utf-8")
    main_text = main_text.replace(CO17_OLD_ROW, CO17_NEW_ROW, 1)
    main_text = main_text.replace(C0607_OLD_COMMENT, C0607_NEW_COMMENT, 1)
    MAIN.write_text(main_text, encoding="utf-8")
    spec_text = SPEC.read_text(encoding="utf-8")
    spec_text = spec_text.replace(SPEC_ANCHOR, SPEC_ANCHOR + SPEC_ADD, 1)
    SPEC.write_text(spec_text, encoding="utf-8")
    # 写回后复核：新状态在位、旧状态已消失（与写回前 check() 的断言互补）
    main2 = MAIN.read_text(encoding="utf-8")
    spec2 = SPEC.read_text(encoding="utf-8")
    post = []
    if main2.count(CO17_NEW_ROW) != 1:
        post.append("写回后复核：第 15 项新行不在位或不唯一")
    if main2.count(CO17_OLD_ROW) != 0:
        post.append("写回后复核：第 15 项旧行仍在")
    if main2.count(CO17_DEEP_ROW) != 1:
        post.append("写回后复核：紧邻 data-go 深研行异常")
    if main2.count(C0607_NEW_COMMENT) != 1:
        post.append("写回后复核：第 17 项新注释不在位或不唯一")
    if main2.count(C0607_OLD_COMMENT) != 0:
        post.append("写回后复核：第 17 项旧注释仍在")
    if main2.count("if (id === 'C-06' || id === 'C-07') return s;") != 1:
        post.append("写回后复核：例外逻辑行异常")
    if spec2.count(SPEC_ADD) != 1:
        post.append("写回后复核：第 13 项口径句不在位或不唯一")
    if post:
        for p in post:
            print("FAIL（写回后复核）:", p)
        sys.exit(1)
    print("已写回并复核通过。")


if __name__ == "__main__":
    main()
