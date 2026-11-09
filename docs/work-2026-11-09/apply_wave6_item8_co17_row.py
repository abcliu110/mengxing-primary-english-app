#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave6_item8_co17_row.py — 第六波第 8 项：CO-17 补 data-law 行，
不补独立规律页。

定夺（主对话 Muse 已定，不重新定夺）：CO-17 无 LAWDATA 条目、无独立
规律页，索引里没它的位置就是不可达；独立规律页需要完整律内容，现有
材料里没有。只给它加一行 data-law（索引可达），内容以现有 CO-17 材料
为准（标题/指向），无材料的部分留空并记入底稿。

实施：
  1. 主文件 #v-grammar2 构式组：CO-16 行之后加一行
     <div class="urow" data-law="CO-17"><span class="id">CO-17</span>
     <span class="tt">空心动词 + get 五构造</span>
     <span class="st deep">已做深</span></div>
     标题取自同区现有的 data-go 深研行（“空心动词 + get 五构造（在词汇
     解码区做深）”去掉括号说明）；徽标沿用深研行同款 st deep「已做深」。
     点行落点已有：LAW.open 先查 LAWFLAG（CO-17 → u-co17），无需新接线；
     原 data-go 深研行（本区与 v-vocab 各一）保留不动。
     组标题由“构式（CO-01 – CO-16；CO-17 在词汇解码区已做深）”改为
     “构式（CO-01 – CO-17；CO-17 在词汇解码区已做深）”（只扩范围）。
  2. 门禁 tools/check_badge_erridx.py：CO-17 从“排除项”转为“特殊行”——
     行集合计入 v-grammar2（299 → 300 行）；特殊行只核对徽标 deep/已做深、
     LAWFLAG 指向 u-co17、运行时 ERRIDX 与再生一致（CO-17 再生 2 条，
     运行时亦 2 条），不套 ERRIDX 口径（无 LAWDATA、无 quiz）。
  3. tools/check_all.py docstring 与 DATA_SOURCE_SPEC.md §6 的行数同步
     改写（299 → 300；§6 的修订按该规范 §8 待 Stewart 确认，见底稿）。

用法：
  python3 docs/work-2026-11-09/apply_wave6_item8_co17_row.py           # 演练
  python3 docs/work-2026-11-09/apply_wave6_item8_co17_row.py --apply   # 写回
退出码：0=演练/写回成功；1=断言失败（拒绝写回）。
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
BASE = HERE.parent.parent
MAIN = BASE / "laws-prototype" / "mengxing-prototype-v1.html"
GATE = BASE / "laws-prototype" / "tools" / "check_badge_erridx.py"
CHECKALL = BASE / "laws-prototype" / "tools" / "check_all.py"
SPEC = BASE / "laws-prototype" / "DATA_SOURCE_SPEC.md"

NEW_ROW = ('<div class="urow" data-law="CO-17"><span class="id">CO-17</span>'
           '<span class="tt">空心动词 + get 五构造</span>'
           '<span class="st deep">已做深</span></div>')
GH_OLD = "构式（CO-01 – CO-16；CO-17 在词汇解码区已做深）"
GH_NEW = "构式（CO-01 – CO-17；CO-17 在词汇解码区已做深）"


def replace_once(text, old, new, what):
    n = text.count(old)
    if n != 1:
        print(f"FAIL: {what}锚点命中 {n} 处（应为 1）")
        return None
    return text.replace(old, new, 1)


def main(argv):
    apply = "--apply" in argv
    text = MAIN.read_text(encoding="utf-8")
    if 'data-law="CO-17"' in text:
        print("FAIL: 主文件已有 data-law CO-17 行（疑似已实施），拒绝重复写回")
        return 1
    # --- 主文件：CO-16 行后插入新行（行锚点，不依赖行号）---
    lines = text.split("\n")
    co16 = [i for i, ln in enumerate(lines) if 'data-law="CO-16"' in ln]
    if len(co16) != 1:
        print(f"FAIL: CO-16 行命中 {len(co16)} 处（应为 1）")
        return 1
    i = co16[0]
    if '有病例 · 有练习' not in lines[i]:
        print("FAIL: CO-16 行徽标不是预期的 ok「有病例 · 有练习」")
        return 1
    if 'data-go="u-co17"' not in lines[i + 1]:
        print("FAIL: CO-16 行下一行不是预期的 data-go 深研行 u-co17")
        return 1
    if text.count(GH_OLD) != 1:
        print(f"FAIL: 组标题锚点命中 {text.count(GH_OLD)} 处（应为 1）")
        return 1
    lines.insert(i + 1, NEW_ROW)
    text = "\n".join(lines).replace(GH_OLD, GH_NEW, 1)
    if text.count('data-law="CO-17"') != 1:
        print("FAIL: 插入后 data-law CO-17 行不为 1")
        return 1

    # --- 门禁：CO-17 从排除项转为特殊行 ---
    gate = GATE.read_text(encoding="utf-8")
    edits = [
        ("2026-11-09 第五波第 8 项扩面至全部 299 行静态索引行）。",
         "2026-11-09 第五波第 8 项扩面至全部 299 行静态索引行，2026-11-10 "
         "第六波第 8 项 + CO-17 深研行 1 行，共 300 行）。", "门禁头注"),
        ("""覆盖面：299 行（E 15 + W 15 + NE 29 + V 43 + CO/QI 31 + S/SR 52 +
家长区 114），行集合须与 laws_master 的对应律集合恰相等（不多、不少、
不重），以下 4 条除外——它们不在本区 data-law 行，但各有明确去处，
门禁显式排除并核对去处在位（见 main() 内注释）：V-33（ptr 指 morph 区，
v-vocab 里为 data-go 深研行 u-v33）、V-40（v-vocab 里为 data-go 深研行
u-v40，打包对照单元）、CO-17（无 LAWDATA 条目、无独立规律页，v-vocab /
v-grammar2 里为 data-go 深研行 u-co17）、S-44（LINKIDX z='MZ'，内容在
morph 区）。其中 ERRIDX 区儿童行 112 行逐行比对徽标（原 59 行门禁的
儿童行 38 行 + 本波新增 V/CO/QI 74 行），教师行 21 行只核对在位；
拼读区 52 行、家长区 114 行按各自口径逐行比对。""",
         """覆盖面：300 行（E 15 + W 15 + NE 29 + V 43 + CO/QI 31 + S/SR 52 +
家长区 114 + CO-17 深研行 1），行集合须与 laws_master 的对应律集合恰相等
（不多、不少、不重），以下 3 条除外——它们不在本区 data-law 行，但各有
明确去处，门禁显式排除并核对去处在位（见 main() 内注释）：V-33（ptr 指
morph 区，v-vocab 里为 data-go 深研行 u-v33）、V-40（v-vocab 里为 data-go
深研行 u-v40，打包对照单元）、S-44（LINKIDX z='MZ'，内容在 morph 区）。
另有 1 条特殊行：CO-17（无 LAWDATA 条目、无独立规律页，内容在深研单元
u-co17）自第六波第 8 项起在 v-grammar2 里有 data-law 行，徽标为 st deep
「已做深」，不套 ERRIDX 口径（无 LAWDATA、无 quiz），门禁只核对徽标、
LAWFLAG 落点（CO-17 → u-co17）与运行时 ERRIDX 和再生一致；其 data-go
深研行仍在位（去处未变）。其中 ERRIDX 区儿童行 112 行逐行比对徽标
（原 59 行门禁的儿童行 38 行 + 本波新增 V/CO/QI 74 行），教师行 21 行只
核对在位；拼读区 52 行、家长区 114 行按各自口径逐行比对。""", "门禁覆盖面"),
        ("""    # 行集合核对：每区 data-law 行须与 laws_master 对应律集恰相等，
    # 但以下 4 条有明确的“不在本区 data-law 行”理由，显式排除（见 docstring）：
    #   V-33：ptr 指向 morph 区（LINKIDX z='MZ'），v-vocab 里只有 data-go 深研行 u-v33；
    #   V-40：v-vocab 里只有 data-go 深研行 u-v40（打包对照单元），徽标为 st deep「已做深」；
    #   CO-17：无 LAWDATA 条目、无独立规律页（ROSTER route=''），v-vocab/v-grammar2 里
    #     只有 data-go 深研行 u-co17（一词多义 V-40–V-45 + CO-17 组）；
    #   S-44：LINKIDX z='MZ'，内容在 morph 区（RV_GENQ S-44 屈折三读），不在拼读索引行。""",
         """    # 行集合核对：每区 data-law 行须与 laws_master 对应律集恰相等，
    # 但以下 3 条有明确的“不在本区 data-law 行”理由，显式排除（见 docstring）：
    #   V-33：ptr 指向 morph 区（LINKIDX z='MZ'），v-vocab 里只有 data-go 深研行 u-v33；
    #   V-40：v-vocab 里只有 data-go 深研行 u-v40（打包对照单元），徽标为 st deep「已做深」；
    #   S-44：LINKIDX z='MZ'，内容在 morph 区（RV_GENQ S-44 屈折三读），不在拼读索引行。
    # CO-17 不再排除：自第六波第 8 项起在 v-grammar2 里有 data-law 行
    # （徽标 st deep「已做深」，见行循环内的特殊处理）；其 data-go 深研行
    # 仍须在位（内容落点未变）。""", "门禁行集合注释"),
        ("""    for lid in ("V-33", "V-40"):
        want_by_sec["v-vocab"].remove(lid)
    want_by_sec["v-grammar2"].remove("CO-17")
    want_by_sec["v-phon-laws"].remove("S-44")""",
         """    for lid in ("V-33", "V-40"):
        want_by_sec["v-vocab"].remove(lid)
    want_by_sec["v-phon-laws"].remove("S-44")
    # CO-17 不再从 v-grammar2 剔除：第六波第 8 项起它有 data-law 行。""",
         "门禁 want_by_sec"),
        ("""        rt_err = get_literal(text, "var ERRIDX=")
        rt_n = Counter(c[0] for c in rt_err["cases"])
        lawdata = get_runtime_lawdata(text)""",
         """        rt_err = get_literal(text, "var ERRIDX=")
        rt_n = Counter(c[0] for c in rt_err["cases"])
        lawdata = get_runtime_lawdata(text)
        # LAWFLAG 是单引号 JS 字面量（非 JSON）：只在 var LAWFLAG={...} 内
        # 核对 CO-17 → u-co17，全文搜会误中 relSectionHTML 的另一张同名映射表。
        mflag = re.search(r"var LAWFLAG=\\{([^}]*)\\}", text)
        lawflag_co17 = bool(mflag and re.search(r"'CO-17'\\s*:\\s*'u-co17'",
                                                mflag.group(1)))""",
         "门禁 LAWFLAG 取值"),
        ("""    n_child = n_tchr = n_phon = n_parents = 0
    for sec, lid, cls, btxt in rows:
        if cls not in ("ok", "part", "tchr"):""",
         """    n_child = n_tchr = n_phon = n_parents = 0
    n_co17 = 0
    for sec, lid, cls, btxt in rows:
        if sec == "v-grammar2" and lid == "CO-17":
            # CO-17 深研行（第六波第 8 项）：无 LAWDATA 条目、无独立规律页，
            # 内容在深研单元 u-co17；徽标为 st deep「已做深」，不套 ERRIDX
            # 口径（无 LAWDATA、无 quiz）。只核对徽标、LAWFLAG 落点与运行时
            # ERRIDX 和再生一致（索引本身未陈旧）。
            if cls != "deep" or btxt != "已做深":
                problems.append(f"CO-17（v-grammar2）：深研行徽标应为 deep"
                                f"（已做深），现为 {cls}（{btxt}）")
            elif not lawflag_co17:
                problems.append("CO-17（v-grammar2）：LAWFLAG 未指向 u-co17，"
                                "点行无落点")
            elif rt_n.get(lid, 0) != gen_n.get(lid, 0):
                problems.append(f"CO-17（v-grammar2）：ERRIDX 运行时与再生不"
                                f"一致（再生 {gen_n.get(lid, 0)} / 运行时"
                                f" {rt_n.get(lid, 0)}）")
            else:
                n_co17 += 1
            continue
        if cls not in ("ok", "part", "tchr"):""",
         "门禁 CO-17 特殊处理"),
        ("""        print(f"FAIL: 静态徽标 × ERRIDX 对账失败：{len(problems)} 行不符"
              f"（共 {len(rows)} 行：ERRIDX 区儿童行 {n_child}、教师行 {n_tchr}、"
              f"拼读区 {n_phon}、家长区 {n_parents}）")""",
         """        print(f"FAIL: 静态徽标 × ERRIDX 对账失败：{len(problems)} 行不符"
              f"（共 {len(rows)} 行：ERRIDX 区儿童行 {n_child}、教师行 {n_tchr}、"
              f"拼读区 {n_phon}、家长区 {n_parents}、CO-17 深研行 {n_co17}）")""",
         "门禁 FAIL 汇总"),
        ("""    print(f"PASS: 静态徽标 × ERRIDX 对账通过（{len(rows)} 行：ERRIDX 区儿童行"
          f" {n_child} 行徽标全对、教师行 {n_tchr} 行在位，拼读区 {n_phon} 行"
          f"、家长区 {n_parents} 行按各自口径全对；ERRIDX {built['tot']} 条 /"
          f"覆盖 {built['laws']} 律，运行时与再生逐律一致）")""",
         """    print(f"PASS: 静态徽标 × ERRIDX 对账通过（{len(rows)} 行：ERRIDX 区儿童行"
          f" {n_child} 行徽标全对、教师行 {n_tchr} 行在位，拼读区 {n_phon} 行"
          f"、家长区 {n_parents} 行按各自口径全对、CO-17 深研行 {n_co17} 行在位；"
          f"ERRIDX {built['tot']} 条 / 覆盖 {built['laws']} 律，运行时与再生逐律一致）")""",
         "门禁 PASS 汇总"),
    ]
    for old, new, what in edits:
        gate = replace_once(gate, old, new, what)
        if gate is None:
            return 1

    # --- check_all.py docstring ---
    ca = CHECKALL.read_text(encoding="utf-8")
    ca = replace_once(
        ca,
        """  check_badge_erridx.py       静态徽标 × ERRIDX 对账（全部 299 行：ERRIDX 区 133 行徽标 vs 再生 ERRIDX、
                             拼读区 52 行 vs 本律 cases/prb、家长区 114 行计数 vs prb/ERRIDX/quiz）""",
        """  check_badge_erridx.py       静态徽标 × ERRIDX 对账（全部 300 行：ERRIDX 区 133 行徽标 vs 再生 ERRIDX、
                             CO-17 深研行 1 行「已做深」、拼读区 52 行 vs 本律 cases/prb、
                             家长区 114 行计数 vs prb/ERRIDX/quiz）""",
        "check_all docstring")
    if ca is None:
        return 1

    # --- DATA_SOURCE_SPEC.md §6 行数同步 ---
    spec = SPEC.read_text(encoding="utf-8")
    spec = replace_once(
        spec,
        "静态徽标门禁（2026-11-09 第四波第 7 项立、第五波第 8 项扩面至全部 299 行）：",
        "静态徽标门禁（2026-11-09 第四波第 7 项立、第五波第 8 项扩面至全部 299 行、"
        "2026-11-10 第六波第 8 项 + CO-17 深研行 1 行）：",
        "规范 §6 门禁立项句")
    if spec is None:
        return 1
    spec = replace_once(
        spec,
        "断言主文件 6 个静态索引区共 299 行徽标与权威源一致——ERRIDX 区（E/W/NE/V/CO/QI，133 行）徽标以再生 ERRIDX 为准",
        "断言主文件 6 个静态索引区共 300 行徽标与权威源一致——ERRIDX 区（E/W/NE/V/CO/QI，133 行）徽标以再生 ERRIDX 为准；"
        "另 CO-17 深研行 1 行（徽标「已做深」，内容在深研单元 u-co17，不套 ERRIDX 口径）",
        "规范 §6 行数句")
    if spec is None:
        return 1

    print("改动：主文件 +1 行 data-law CO-17（CO-16 行后）+ 组标题范围 CO-01–CO-17；")
    print("      门禁 CO-17 从排除项转为特殊行（300 行）；check_all docstring 与规范 §6 行数同步")
    if not apply:
        print("演练模式，未写回（加 --apply 写回）")
        return 0
    MAIN.write_text(text, encoding="utf-8")
    GATE.write_text(gate, encoding="utf-8")
    CHECKALL.write_text(ca, encoding="utf-8")
    SPEC.write_text(spec, encoding="utf-8")
    print("已写回主文件、门禁、check_all docstring、规范 §6")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
