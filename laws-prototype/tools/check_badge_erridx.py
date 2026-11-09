#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_badge_erridx.py — 静态徽标 × ERRIDX 对账门禁（2026-11-09 第四波第 7 项立，
2026-11-09 第五波第 8 项扩面至全部 299 行静态索引行，2026-11-09 第六波
第 11 项再扩面至全部 829 行：+ v-tech 区 530 行 data-tec 行）。

断言：主文件全部 7 个静态索引区（#v-expr、#v-expr2、#v-vocab、#v-grammar2、
#v-phon-laws、#v-parents、#v-tech）共 829 行静态索引行（`<div class="urow"
data-law="…">` 299 行 + `<div class="urow" data-tec="…">` 530 行），其徽标必须
与现行权威源一致（不做生成化，只对账）。

分区口径（见 docs/work-2026-11-09/wave5_item8_other_badges.md §二；各区
徽标写法不同，不得跨区硬套）：
  ERRIDX 区（#v-expr E/W、#v-expr2 NE、#v-vocab V、#v-grammar2 CO/QI，
  共 133 行）：
    有 ERRIDX 病例 + 有练习 → <span class="st ok">有病例 · 有练习</span>
    无 ERRIDX 病例 + 有练习 → <span class="st part">…没有病例</span>
      （E/W/NE/V 的 part 文本为「有练习 · 查过·没有病例」；
       CO/QI 的 part 文本为「有练习 · 还没有病例」，同义不同字，皆接受）
    教师层行挂 <span class="st tchr">教师层</span>，不带病例/练习信息，
    只核对在位（每行恰出现 1 次），不参与徽标比对。
    权威源是 gen_errors.py 从 laws_master.json 再生出的 ERRIDX（病例四路
    汇合 lawdata > yaml > zone.data > zone.parts，逐律去重后计数；脚本直接
    import gen_errors.build，与 gen_errors --check 同口径，不复制生成逻辑）。
    运行时 ERRIDX 须与再生结果逐律相等，否则该行报“ERRIDX 运行时与再生
    不一致”。laws_master lawdata.cases 与运行时 LAWDATA cases_len 只作
    第三源数字，一并打印在失败行里供人工核对，不单独定徽标：yaml/zone
    病例会使 ERRIDX 多于 lawdata.cases（全库 163 律如此），以
    lawdata.cases 为准会误判；“有病例”的口径是 ERRIDX（孩子查错句用的
    索引）里有病例。练习数取运行时 LAWDATA（基础字面量 ← PHONLAWS 覆写
    ← SUPPDATA 覆写，与 App 一致，见 check_rel_coverage.py 同通道）。
  拼读区（#v-phon-laws S/SR，共 52 行）：口径不同，**不套 ERRIDX**——
    徽标的“病例”指本律 PHONLAWS 条目自身的 cases（规律页实际呈现的病例），
    “理解探针”指本律 prb 有无：
      cases > 0 → <span class="st ok">有病例 · 有理解探针</span>
      cases = 0 且 prb > 0 → <span class="st part">还没有病例 · 有理解探针</span>
      cases = 0 且 prb = 0 → <span class="st part">还没有病例 · 还没有理解探针</span>
    52/52 行与本口径一致；若硬套 ERRIDX 会误判 49 行（ERRIDX 含 yaml/
    zone 病例，拼读律页不呈现；见工作底稿 §二）。练习数不入徽标
    （S/SR 律 quiz 皆为 0，徽标不提练习），故不作 quiz 断言。
  家长区（#v-parents TM/WA/LS/YL/CB/CG/VB，共 114 行）：徽标为计数式，
    须与三源逐数一致：
      <span class="st tchr">成人层[ · 探针×N][ · 病例×N][ · 练习×N]</span>
    其中探针×N = 运行时 LAWDATA 该律 prb 条数（>0 才出现），病例×N =
    再生 ERRIDX 病例数（>0 才出现），练习×N = 运行时 LAWDATA 该律 quiz
    题数（>0 才出现）；三数皆为 0 时徽标就是光秃的「成人层」。
    运行时 ERRIDX 须与再生逐律相等（与 ERRIDX 区同口径）。
  技巧区（#v-tech TEC-*，共 530 行）：三本子索引，徽标口径各不相同，
    **不套 ERRIDX**——TEC-* 为外部 id 空间，不入 laws_master（见《数据源
    规范》§7），ERRIDX 对 TEC 无病例；徽标的权威源是主文件内 `var TECDAT=`
    字面量（技巧区详情数据，153 条，全为「定版」）与同文件内 TEC 详情
    渲染器的 famName 映射（门禁从文件内正取该映射，不另抄一份）：
      按痛点组（记不住/读不快/听不懂/说不出/写不长/错不完，224 行）：
        徽标 = 该条所属的路名，class ok：
        <span class="st ok">词汇与构词路 / 语法与句法路 / 听说读写技能路 /
        学习方法路 / 小系统与指称路</span>（fam TEC-V/G/S/L/P → 路名）。
      按路组（五路，153 行）：徽标 = 该条所属的区名，class ok：
        <span class="st ok">拼读区 / 词汇解码区 / 语法区 / 小系统区 /
        表达写作区 / 复习区 / 家长角</span>（TECDATA zone）。
      按区组（七区，153 行）：徽标 = 该条的先行/进阶定位，class part：
        hint 以“先行”开头 → <span class="st part">先行</span>（108 条）；
        hint 以“进阶”开头 → <span class="st part">进阶</span>（4 条）；
        其余 hint（全程适用/前置说明/顺序说明等，41 条）→
        <span class="st part">顺序见页内</span>（顺序在详情页 hint 内文交代，
        索引行只标“顺序见页内”，不把 hint 全文搬上索引行）。
    三组另核对：每行标题 tt 须与 TECDAT name 一字相同；痛点组行集合须与
    TECDAT 的 (pain, tec) 对集恰相等（224 对，无多、无少、无重）；路组与
    区组各 153 条 id 须与 TECDAT id 集恰相等（每条恰出现 1 次）；18 个
    分组头计数（“N 条”/“N 条次”）须与实有行数一致。v-tech 行只在 #v-tech
    区内出现（全文件 data-tec 行 530 行皆在该区）。

覆盖面：829 行（E 15 + W 15 + NE 29 + V 43 + CO/QI 31 + S/SR 52 +
家长区 114 + v-tech 530：痛点组 224 + 路组 153 + 区组 153），行集合须与
laws_master 的对应律集合恰相等（不多、不少、不重），以下 4 条除外——它们
不在本区 data-law 行，但各有明确去处，门禁显式排除并核对去处在位
（见 main() 内注释）：V-33（ptr 指 morph 区，v-vocab 里为 data-go 深研行
u-v33）、V-40（v-vocab 里为 data-go 深研行 u-v40，打包对照单元）、
CO-17（无 LAWDATA 条目、无独立规律页，v-vocab / v-grammar2 里为 data-go
深研行 u-co17）、S-44（LINKIDX z='MZ'，内容在 morph 区）。其中 ERRIDX 区
儿童行 112 行逐行比对徽标（原 59 行门禁的儿童行 38 行 + 本波新增
V/CO/QI 74 行），教师行 21 行只核对在位；拼读区 52 行、家长区 114 行按各
自口径逐行比对；v-tech 530 行按三组口径逐行比对（标题、徽标、分组归属、
分组头计数、行集合五项全核）。

用法：
  python3 tools/check_badge_erridx.py            # 校验主文件
  python3 tools/check_badge_erridx.py <html路径>  # 校验指定副本（自证用）
退出码：0=通过；1=断言失败；2=用法/解析错误。
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
BASE = HERE.parent
MAIN = BASE / "mengxing-prototype-v1.html"
LM_PATH = BASE / "model" / "laws_master.json"
CX_PATH = BASE / "model" / "contrast_pages.json"

OK = '<span class="st ok">有病例 · 有练习</span>'
PART_EW = '<span class="st part">有练习 · 查过·没有病例</span>'
PART_G2 = '<span class="st part">有练习 · 还没有病例</span>'
TCHR = '<span class="st tchr">教师层</span>'
BADGE_TEXT = {"ok": "有病例 · 有练习",
              "part": "有练习 · 查过·没有病例",
              "part_g2": "有练习 · 还没有病例",
              "tchr": "教师层"}
# ERRIDX 区各区段的 part 文本（同义不同字）
ERRIDX_SECTIONS = ("v-expr", "v-expr2", "v-vocab", "v-grammar2")
ERRIDX_PART_TEXT = {"v-expr": "有练习 · 查过·没有病例",
                    "v-expr2": "有练习 · 查过·没有病例",
                    "v-vocab": "有练习 · 查过·没有病例",
                    "v-grammar2": "有练习 · 还没有病例"}
PHON_SECTION = "v-phon-laws"
PARENTS_SECTION = "v-parents"
TECH_SECTION = "v-tech"
TECH_PAINS = ("记不住", "读不快", "听不懂", "说不出", "写不长", "错不完")
SECTIONS = ERRIDX_SECTIONS + (PHON_SECTION, PARENTS_SECTION)

sys.path.insert(0, str(HERE))
import gen_errors  # noqa: E402  再生 ERRIDX 的唯一事实源（与 gen_errors --check 同口径）


def scan_literal(src, start):
    """定界扫描（与 gen_errors.py 同逻辑，含字符串/注释处理）。"""
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


def get_runtime_lawdata(text):
    """运行时 LAWDATA：基础字面量 ← PHONLAWS 覆写 ← SUPPDATA 覆写
    （与 App 一致，见 check_rel_coverage.py 同通道）。"""
    merged = get_literal(text, "var LAWDATA=")
    for anchor in ("var PHONLAWS=", "var SUPPDATA="):
        for k, v in get_literal(text, anchor).items():
            merged[k] = v
    return merged


def parse_static_rows(text):
    """解析 6 个区段的全部静态索引行。

    返回 [(区, 律 id, 徽标 class, 徽标文本)]；区段按 <section> 边界切分，
    不依赖行号。行内徽标 span 须恰为 1 个。
    """
    rows = []
    for sec in SECTIONS:
        anchor = f'<section class="view" id="{sec}">'
        s = text.find(anchor)
        if s < 0:
            raise ValueError(f"未找到区段 {anchor}")
        e = text.find("<section", s + len(anchor))
        seg = text[s:None if e < 0 else e]
        for m in re.finditer(r'<div class="urow"[^>]*data-law="([^"]+)"[^>]*>'
                             r'(.*?)</div>', seg, flags=re.S):
            lid, inner = m.group(1), m.group(2)
            badges = re.findall(r'<span class="st ([^"]+)">([^<]*)</span>', inner)
            if len(badges) != 1:
                raise ValueError(f"{sec} 区 {lid} 行徽标 span 出现 {len(badges)} 个（应为 1）")
            rows.append((sec, lid, badges[0][0], badges[0][1]))
    return rows


def parse_famname_map(text):
    """从主文件内 TEC 详情渲染器正取 fam → 路名映射（不另抄一份）。"""
    m = re.search(r"var famName=\{([^}]*)\}", text)
    if not m:
        raise ValueError("未找到 TEC 详情渲染器的 famName 映射")
    mapping = dict(re.findall(r"'([^']+)':'([^']+)'", m.group(1)))
    if sorted(mapping) != ["TEC-G", "TEC-L", "TEC-P", "TEC-S", "TEC-V"]:
        raise ValueError(f"famName 映射不全：{sorted(mapping)}（应为 TEC-V/G/S/L/P 五路）")
    return mapping


def tech_hint_badge(hint):
    """区组徽标的先行/进阶定位（见 docstring 技巧区口径）。"""
    if hint.startswith("先行"):
        return "先行"
    if hint.startswith("进阶"):
        return "进阶"
    return "顺序见页内"


def parse_tech_rows(text):
    """解析 #v-tech 区全部 data-tec 行。

    返回 (rows, 全文件 data-tec 出现次数, [(组名, 组头标数, 组内实有行数)])；
    组按 <div class="gh"> 分组头切分，行须为“id + 标题 + 1 个徽标 span”的
    严格格式。每组内 data-tec 出现次数须与严格行正则命中数相等，否则行
    格式有变体，拒绝静默漏查。rows 每项为（组名, 组头标数, tec id,
    id span, 标题, 徽标 class, 徽标文本）。
    """
    anchor = f'<section class="view" id="{TECH_SECTION}">'
    s = text.find(anchor)
    if s < 0:
        raise ValueError(f"未找到区段 {anchor}")
    e = text.find("<section", s + len(anchor))
    seg = text[s:None if e < 0 else e]
    parts = re.split(r'<div class="gh">([^<]*)</div>', seg)
    rows = []
    headers = []
    for k in range(1, len(parts), 2):
        gh, body = parts[k], parts[k + 1] if k + 1 < len(parts) else ""
        n_raw = body.count('data-tec="')
        found = re.findall(
            r'<div class="urow" data-tec="([^"]+)"><span class="id">([^<]*)</span>'
            r'<span class="tt">([^<]*)</span><span class="st ([^"]+)">([^<]*)</span></div>',
            body)
        if len(found) != n_raw:
            raise ValueError(f"v-tech 组 {gh!r}：data-tec 行 {n_raw} 处只解析出"
                             f" {len(found)} 行（行格式有变体，拒绝漏查）")
        hm = re.search(r"(\d+) 条", gh)
        if hm is None:
            raise ValueError(f"v-tech 组头无计数：{gh!r}")
        gname = gh.split("（")[0].strip()
        headers.append((gname, int(hm.group(1)), len(found)))
        for tid, idspan, title, cls, btxt in found:
            rows.append((gname, int(hm.group(1)), tid, idspan, title, cls, btxt))
    return rows, text.count('data-tec="'), headers


def parents_expected(prb_n, err_n, quiz_n):
    """家长区计数式徽标的期望文本（>0 的分量才出现，顺序：探针、病例、练习）。"""
    parts = ["成人层"]
    if prb_n > 0:
        parts.append(f"探针×{prb_n}")
    if err_n > 0:
        parts.append(f"病例×{err_n}")
    if quiz_n > 0:
        parts.append(f"练习×{quiz_n}")
    return " · ".join(parts)


def main(argv):
    path = Path(argv[1]) if len(argv) > 1 else MAIN
    if len(argv) > 2:
        print(__doc__)
        return 2
    try:
        text = path.read_text(encoding="utf-8")
        master = json.loads(LM_PATH.read_text(encoding="utf-8"))
        contrast = json.loads(CX_PATH.read_text(encoding="utf-8"))
        built, _stats = gen_errors.build(master, contrast)
        gen_n = Counter(c[0] for c in built["cases"])
        rt_err = get_literal(text, "var ERRIDX=")
        rt_n = Counter(c[0] for c in rt_err["cases"])
        lawdata = get_runtime_lawdata(text)
        lm_n = {e["id"]: len((e.get("lawdata") or {}).get("cases") or [])
                for e in master}
        rows = parse_static_rows(text)
    except AssertionError as ex:
        print(f"FAIL: ERRIDX 再生断言失败：{ex}")
        return 1
    except (ValueError, json.JSONDecodeError, OSError) as ex:
        print(f"FAIL: 解析失败：{ex}")
        return 2

    problems = []

    # 行集合核对：每区 data-law 行须与 laws_master 对应律集恰相等，
    # 但以下 4 条有明确的“不在本区 data-law 行”理由，显式排除（见 docstring）：
    #   V-33：ptr 指向 morph 区（LINKIDX z='MZ'），v-vocab 里只有 data-go 深研行 u-v33；
    #   V-40：v-vocab 里只有 data-go 深研行 u-v40（打包对照单元），徽标为 st deep「已做深」；
    #   CO-17：无 LAWDATA 条目、无独立规律页（ROSTER route=''），v-vocab/v-grammar2 里
    #     只有 data-go 深研行 u-co17（一词多义 V-40–V-45 + CO-17 组）；
    #   S-44：LINKIDX z='MZ'，内容在 morph 区（RV_GENQ S-44 屈折三读），不在拼读索引行。
    want_by_sec = {}
    for sec in SECTIONS:
        fams = {"v-expr": ("E", "W"), "v-expr2": ("NE",),
                "v-vocab": ("V",), "v-grammar2": ("CO", "QI"),
                "v-phon-laws": ("S", "SR"),
                "v-parents": ("TM", "WA", "LS", "YL", "CB", "CG", "VB")}[sec]
        want_by_sec[sec] = sorted(e["id"] for e in master
                                  if e["id"].split("-")[0] in fams)
    for lid in ("V-33", "V-40"):
        want_by_sec["v-vocab"].remove(lid)
    want_by_sec["v-grammar2"].remove("CO-17")
    want_by_sec["v-phon-laws"].remove("S-44")
    # 排除项须有去处，否则不是“另有落点”而是真缺失：V-33/V-40/CO-17 须有
    # data-go 深研行；S-44 须落在 morph 区（LINKIDX z='MZ'）。
    for lid, go in (("V-33", "u-v33"), ("V-40", "u-v40"), ("CO-17", "u-co17")):
        if f'data-go="{go}"' not in text:
            problems.append(f"排除项 {lid} 无 data-go 深研行 {go}（去处丢失）")
    linkidx_z = get_literal(text, "var LINKIDX =").get("z") or {}
    if linkidx_z.get("S-44") != "MZ":
        problems.append(f"排除项 S-44 的 LINKIDX z 应为 MZ（morph 区），现为"
                        f" {linkidx_z.get('S-44')!r}")
    seen = Counter(lid for _sec, lid, _c, _t in rows)
    dup = sorted(lid for lid, n in seen.items() if n != 1)
    if dup:
        problems.append(f"静态行重复/缺失：{dup} 各出现 { [seen[d] for d in dup] } 次（应为 1）")
    for sec in SECTIONS:
        got = sorted(lid for s2, lid, _c, _t in rows if s2 == sec)
        missing = sorted(set(want_by_sec[sec]) - set(got))
        extra = sorted(set(got) - set(want_by_sec[sec]))
        if missing:
            problems.append(f"{sec} 静态行缺失 {len(missing)} 条：{missing}")
        if extra:
            problems.append(f"{sec} 静态行多出 {len(extra)} 条（不在该区律集）：{extra}")

    n_child = n_tchr = n_phon = n_parents = 0
    for sec, lid, cls, btxt in rows:
        if cls not in ("ok", "part", "tchr"):
            problems.append(f"{lid}（{sec}）：未知徽标 class {cls!r}")
            continue
        entry = lawdata.get(lid)
        if entry is None:
            problems.append(f"{lid}（{sec}）：运行时 LAWDATA 缺该律条目，无法核对")
            continue
        ld_n = len(entry.get("cases") or [])
        quiz_n = len(entry.get("quiz") or [])
        prb_n = len(entry.get("prb") or [])
        src = (f"病例 ERRIDX 再生 {gen_n.get(lid, 0)} / 运行时 {rt_n.get(lid, 0)}"
               f" / lawdata.cases {lm_n.get(lid, 0)} / LAWDATA cases {ld_n}；"
               f"练习 quiz {quiz_n}；探针 prb {prb_n}")
        if rt_n.get(lid, 0) != gen_n.get(lid, 0):
            problems.append(f"{lid}（{sec}）：ERRIDX 运行时与再生不一致——{src}；"
                            f"徽标现为 {cls}（{btxt}）")
            continue
        if sec in ERRIDX_SECTIONS:
            if cls == "tchr":
                if btxt != BADGE_TEXT["tchr"]:
                    problems.append(f"{lid}（{sec}）：教师行徽标文本应为"
                                    f" {BADGE_TEXT['tchr']!r}，现为 {btxt!r}")
                n_tchr += 1
                continue
            n_child += 1
            if btxt != BADGE_TEXT[cls] and not (
                    cls == "part" and btxt == ERRIDX_PART_TEXT[sec]):
                problems.append(f"{lid}（{sec}）：徽标文本与 class 不符："
                                f"class={cls} 但文本为 {btxt!r}")
                continue
            if quiz_n == 0:
                problems.append(f"{lid}（{sec}）：无练习，徽标口径未覆盖"
                                f"（ok/part 均以“有练习”为前提）——{src}；"
                                f"徽标现为 {cls}（{btxt}）")
                continue
            want = "ok" if gen_n.get(lid, 0) > 0 else "part"
            if cls != want:
                problems.append(f"{lid}（{sec}）：徽标应为 {want}"
                                f"（{BADGE_TEXT[want] if want == 'ok' else ERRIDX_PART_TEXT[sec]}），"
                                f"现为 {cls}（{btxt}）——{src}")
        elif sec == PHON_SECTION:
            n_phon += 1
            if ld_n > 0:
                want_cls, want_txt = "ok", "有病例 · 有理解探针"
            elif prb_n > 0:
                want_cls, want_txt = "part", "还没有病例 · 有理解探针"
            else:
                want_cls, want_txt = "part", "还没有病例 · 还没有理解探针"
            if cls != want_cls or btxt != want_txt:
                problems.append(f"{lid}（{sec}）：拼读徽标应为 {want_cls}"
                                f"（{want_txt}），现为 {cls}（{btxt}）——{src}")
        else:  # v-parents
            n_parents += 1
            if cls != "tchr":
                problems.append(f"{lid}（{sec}）：家长区徽标 class 应为 tchr，"
                                f"现为 {cls}（{btxt}）")
                continue
            want_txt = parents_expected(prb_n, gen_n.get(lid, 0), quiz_n)
            if btxt != want_txt:
                problems.append(f"{lid}（{sec}）：家长区徽标应为 {want_txt!r}，"
                                f"现为 {btxt!r}——{src}")

    # ---- v-tech 区（第六波第 11 项扩面）：530 行 data-tec 行，三组口径 ----
    try:
        tecdata = get_literal(text, "var TECDATA=")
        famname = parse_famname_map(text)
        tech_rows, tech_total, tech_headers = parse_tech_rows(text)
    except (ValueError, json.JSONDecodeError) as ex:
        print(f"FAIL: 解析失败：{ex}")
        return 2
    if tech_total != len(tech_rows):
        problems.append(f"v-tech 区外另有 {tech_total - len(tech_rows)} 行 data-tec 行"
                        f"（全文件 {tech_total} 行，区内 {len(tech_rows)} 行）")
    n_pain = n_road = n_zone = 0
    pain_seen = Counter()
    road_seen = Counter()
    zone_seen = Counter()
    for gname, _hdr_n, tid, idspan, title, cls, btxt in tech_rows:
        entry = tecdata.get(tid)
        if entry is None:
            problems.append(f"{tid}（v-tech/{gname}）：TECDATA 缺该条目，无法核对")
            continue
        if idspan != tid:
            problems.append(f"{tid}（v-tech/{gname}）：id span 为 {idspan!r}")
        if title != entry.get("name"):
            problems.append(f"{tid}（v-tech/{gname}）：标题应为 {entry.get('name')!r}，"
                            f"现为 {title!r}")
        fam = entry.get("fam")
        if fam not in famname:
            problems.append(f"{tid}（v-tech/{gname}）：TECDATA fam 为 {fam!r}"
                            f"（不在五路映射中）")
            continue
        if gname in TECH_PAINS:
            n_pain += 1
            pain_seen[(gname, tid)] += 1
            if gname not in (entry.get("pain") or []):
                problems.append(f"{tid}（v-tech/{gname}）：该条 pain="
                                f"{entry.get('pain')}，不应列在痛点组 {gname}")
            if cls != "ok" or btxt != famname[fam]:
                problems.append(f"{tid}（v-tech/{gname}）：痛点组徽标应为 ok"
                                f"（{famname[fam]}），现为 {cls}（{btxt}）")
        elif gname in set(famname.values()):
            n_road += 1
            road_seen[tid] += 1
            if famname[fam] != gname:
                problems.append(f"{tid}（v-tech/{gname}）：该条 fam={fam}，"
                                f"不应列在路组 {gname}")
            if cls != "ok" or btxt != entry.get("zone"):
                problems.append(f"{tid}（v-tech/{gname}）：路组徽标应为 ok"
                                f"（{entry.get('zone')}），现为 {cls}（{btxt}）")
        else:
            n_zone += 1
            zone_seen[tid] += 1
            if entry.get("zone") != gname:
                problems.append(f"{tid}（v-tech/{gname}）：该条 zone="
                                f"{entry.get('zone')}，不应列在区组 {gname}")
            want = tech_hint_badge(entry.get("hint") or "")
            if cls != "part" or btxt != want:
                problems.append(f"{tid}（v-tech/{gname}）：区组徽标应为 part"
                                f"（{want}），现为 {cls}（{btxt}）")
    # 分组头计数：每组标数须与实有行数一致
    for gname, hdr_n, actual_n in tech_headers:
        if hdr_n != actual_n:
            problems.append(f"v-tech 分组头 {gname}：标 {hdr_n} 条，实有 {actual_n} 行")
    # 行集合核对：痛点对集与 TECDAT (pain, tec) 对集恰相等；路组/区组 id 集
    # 与 TECDAT id 集恰相等（每条恰出现 1 次）
    want_pain = Counter((p, t) for t, v in tecdata.items()
                        for p in (v.get("pain") or []))
    if pain_seen != want_pain:
        extra = sorted(k for k in pain_seen if k not in want_pain)
        missing = sorted(k for k in want_pain if k not in pain_seen)
        dup = sorted(k for k, n in pain_seen.items() if n != 1)
        problems.append(f"v-tech 痛点组行集合不符：多出 {extra}、缺失 {missing}、"
                        f"重复 {dup}")
    for label, seen in (("路组", road_seen), ("区组", zone_seen)):
        missing = sorted(set(tecdata) - set(seen))
        extra = sorted(set(seen) - set(tecdata))
        dup = sorted(t for t, n in seen.items() if n != 1)
        if missing or extra or dup:
            problems.append(f"v-tech {label}行集合不符：缺失 {missing}、多出 {extra}、"
                            f"重复 {dup}")

    if problems:
        for p in problems:
            print("FAIL:", p)
        print(f"FAIL: 静态徽标 × ERRIDX 对账失败：{len(problems)} 行不符"
              f"（共 {len(rows) + len(tech_rows)} 行：ERRIDX 区儿童行 {n_child}、教师行 {n_tchr}、"
              f"拼读区 {n_phon}、家长区 {n_parents}、v-tech {len(tech_rows)} 行："
              f"痛点组 {n_pain}、路组 {n_road}、区组 {n_zone}）")
        return 1
    print(f"PASS: 静态徽标 × ERRIDX 对账通过（{len(rows) + len(tech_rows)} 行：ERRIDX 区儿童行"
          f" {n_child} 行徽标全对、教师行 {n_tchr} 行在位，拼读区 {n_phon} 行"
          f"、家长区 {n_parents} 行按各自口径全对；v-tech {len(tech_rows)} 行"
          f"（痛点组 {n_pain}、路组 {n_road}、区组 {n_zone}）按各自口径全对；"
          f"ERRIDX {built['tot']} 条 /"
          f"覆盖 {built['laws']} 律，运行时与再生逐律一致）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
