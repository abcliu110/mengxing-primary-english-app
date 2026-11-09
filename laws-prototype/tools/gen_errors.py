#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
错句反查索引生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。
2026-11-04 维度视图并入波新建（Stewart 拍板：错误反查并入，首页学习工具
区第六张卡「错句查规律」）。

事实源
  - laws-prototype/model/laws_master.json（病例三路：lawdata.cases /
    yaml.error_cases / 专区 zone.data.errors）
  - laws-prototype/model/contrast_pages.json（仅取「有辨析页」律集合标记）

生成目标：mengxing-prototype-v1.html 错句反查呈现脚本段的
  var ERRIDX = {"tot", "nt", "laws", "lawsc", "cases": [...], "briefs": {...}};

构成规则（与维度原型构建脚本 build_error_lookup.py 同口径，原型为验证
工具、口径以本生成器为准落盘）
  - 逐律四路汇合（先到先得 lawdata > yaml > zone.data > zone.parts），
    律内按 norm(wrong) 归一去重（阶段 3 同款归一：全角引号转半角、
    小写、标点转空格、空白折叠）。硬断言对账盘点：总数 524 / 覆盖
    311 律 / 来源 lawdata 259、yaml 111、zone 154（2026-11-09 人工处理
    清单 1.1 病例补齐波：三批 143 例并入 lawdata.cases——拼读拼写 56、
    词汇解码构式疑问 68、表达写作自然英语 19；覆盖 +94 律，
    其中 QI 10 律此前已有专区病例故覆盖只 +30；辨析标记 11→16，
    新增 E-07/V-08/V-14/V-24/V-30；diag_kid 改写 223→366。
    2026-11-04 动画集成
    波 B 第 0 步：第四路汇入合并律 zone.parts 面——仅 GR-46–GR-50 五律
    的部件病例 18 条（2/2/8/4/2），此前三路均未读此面，五律病例自此
    进索引；parts 病例无 diag_kid 字段，孩子版回落 diag 原文。上一版
    363/212/116/111/136；首版 334/206/109/89/136；2026-11-04 专家
    对照修复波：verb_error_cases 31 条归属回填 TA/GR 律 +22 yaml、
    +7 lawdata，另病例卫生删三源跨仓影子副本 95 条——先到先得口径下
    保留集不变，故 zone 136 与教学法 55 不变）。
  - cases 行 = [律 id, 家族, 律名, wrong, right, diag, 有辨析页 0/1,
    教学法条目 0/1, diag_kid]：diag 一律原文照录；diag_kid 为孩子版
    解说（2026-11-04「全部修改」第二波·孩子面文字波：成人腔 217 条中
    改写 216 条、转述必失真保留登记 1 条（VB-08 簿记回指），已是白话
    的 146 条同文；字段在事实源为 lawdata.cases.diag_kid /
    yaml.error_cases.diagnosis_kid / zone.data.errors.diag_kid，规范
    §1 登记；呈现规则：孩子层显示 diag_kid、成人层并显原文 diag）。
  - 教学法条目标记：wrong 不含英文字母（原型盘点口径，恰 55 条——多为
    yaml 里的教法病例，非孩子错句）；呈现层只在成人层显示（分流）。
  - briefs：每律简要卡 [律名, 机制一句话, 例句 1, 例句 2]，取 lawdata
    mech[0].kid/beat、lawdata.exs，缺者回落 canonical/zone 字段（与原型
    collect() 同回落链），不另编。
  - 有辨析页：律 id ∈ contrast_pages 各页 a/b 集合；硬断言索引内带标
    记的律恰 11 个。跳转由呈现层读 CONTRAST.byLaw 现行数据，不在本索
    引存第二份。

序列化格式：同 gen_phonics.py——Python json 默认分隔符、ensure_ascii=False。

写回安全边界：只替换唯一定位锚（"var ERRIDX="，命中 != 1 拒绝）定界扫
描得到的字面量跨度，其余字节原样不动。锚缺失即停（呈现脚本段由并入波
手工落位，含占位字面量）。

用法
  python3 laws-prototype/tools/gen_errors.py --check   # 稳态校验
  python3 laws-prototype/tools/gen_errors.py --write   # 生成并写回主文件
--check 退出码：0=逐字节一致；1=不一致或断言失败。
"""
import json
import re
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MAIN = BASE / "mengxing-prototype-v1.html"
LM_PATH = BASE / "model" / "laws_master.json"
CX_PATH = BASE / "model" / "contrast_pages.json"

JD = lambda o: json.dumps(o, ensure_ascii=False)

MARKER = ("/* GENERATED: tools/gen_errors.py ← model/laws_master.json"
          " + model/contrast_pages.json · DO NOT EDIT */")
ANCHOR = "var ERRIDX="

PUNCT = set(".,!?;:'\"()") | set("（）「」、，【】")


def fail(msg):
    raise AssertionError(msg)


def norm(s):
    s = (s or "").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    s = s.lower()
    s = "".join(" " if ch in PUNCT else ch for ch in s)
    return re.sub(r"\s+", " ", s).strip()


def scan_literal(src: str, start: int) -> int:
    """定界扫描（与 gen_morph.py 同逻辑）。"""
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


def find_span(src: str, anchor: str, first_char: str):
    hits = []
    i = 0
    while True:
        j = src.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(src) and src[p].isspace():
            p += 1
        if p < len(src) and src[p] == first_char:
            hits.append(p)
        i = j + len(anchor)
    if len(hits) != 1:
        raise ValueError(f"锚点 {anchor!r} 命中 {len(hits)} 处（应为 1），拒绝操作")
    s = hits[0]
    return s, scan_literal(src, s)


def build(master, contrast):
    cx_laws = set()
    for p in contrast["pages"]:
        cx_laws.add(p["a"])
        cx_laws.add(p["b"])
    cases = []
    per_law = {}
    src_counts = {"lawdata": 0, "yaml": 0, "zone": 0}
    for e in master:
        lid = e["id"]
        ld = e.get("lawdata") or {}
        ym = e.get("yaml") or {}
        zd = (e.get("zone") or {}).get("data") or {}
        raw = []
        for c in ld.get("cases") or []:
            raw.append(("lawdata", c.get("wrong"), c.get("right"), c.get("diag"), c.get("diag_kid")))
        for c in ym.get("error_cases") or []:
            raw.append(("yaml", c.get("wrong"), c.get("right"), c.get("diagnosis"), c.get("diagnosis_kid")))
        for c in zd.get("errors") or []:
            raw.append(("zone", c.get("wrong"), c.get("right"), c.get("diag"), c.get("diag_kid")))
        # 第四路（2026-11-04 动画集成波 B 第 0 步）：合并律的 zone.parts 面
        # （仅 GR-46–GR-50 五律，parts[*] 为 {部件律 id: {data: {errors}}}），
        # 病例归属合并律 id，来源计数并入 zone；无 diag_kid 者孩子版回落 diag。
        for part in (e.get("zone") or {}).get("parts") or []:
            for pobj in (part or {}).values():
                pd = (pobj or {}).get("data") or {}
                for c in pd.get("errors") or []:
                    raw.append(("zone", c.get("wrong"), c.get("right"), c.get("diag"), c.get("diag_kid")))
        can = e.get("canonical") or {}
        fam = can.get("family") or lid.split("-")[0]
        name = can.get("headline") or ld.get("hl") or zd.get("short") or lid
        seen = set()
        for tag, w, r, dg, dk in raw:
            if not w:
                continue
            n = norm(w)
            if n in seen:
                continue
            seen.add(n)
            src_counts[tag] += 1
            teach = 0 if re.search(r"[A-Za-z]", w) else 1
            entry = [lid, fam, name, w, r or "", dg or "",
                     1 if lid in cx_laws else 0, teach, dk or dg or ""]
            cases.append(entry)
            per_law.setdefault(lid, []).append(entry)
    briefs = {}
    for e in master:
        lid = e["id"]
        if lid not in per_law:
            continue
        ld = e.get("lawdata") or {}
        zd = (e.get("zone") or {}).get("data") or {}
        can = e.get("canonical") or {}
        mech = ""
        if ld.get("mech"):
            mech = ld["mech"][0].get("kid") or ld["mech"][0].get("beat") or ""
        if not mech:
            mech = can.get("kid_headline") or zd.get("kid") or ""
        exs = [x.get("s", "") for x in (ld.get("exs") or []) if x.get("s")]
        if not exs:
            exs = [x.get("s", "") for x in (zd.get("examples") or []) if x.get("s")]
        name = can.get("headline") or ld.get("hl") or zd.get("short") or lid
        briefs[lid] = [name, mech] + (exs[:2] + ["", ""])[:2]
    n_teach = sum(1 for c in cases if c[7])
    laws_child = len({c[0] for c in cases if not c[7]})
    cx_in = len({c[0] for c in cases if c[6]})
    # ---- 硬断言：与原型盘点逐项对账 ----
    # 2026-11-09 人工处理清单 1.1 病例补齐波：三批 143 例并入 lawdata.cases
    # （拼读拼写 56、词汇解码构式疑问 68、表达写作自然英语 19）
    # → 总数 381→524、覆盖 217→311 律、lawdata 来源 116→259；
    # 教学法 55、yaml 111、zone 154 不变；辨析标记 11→16
    # （新增 E-07、V-08、V-14、V-24、V-30）；diag_kid 改写 223→366、
    # 同文 139→157、保留登记 1 不变。
    # 2026-11-04 动画集成波 B 第 0 步：汇入 zone.parts 面（GR-46:2/47:2/48:8/
    # 49:4/50:2 共 18 条，律内去重后全为新增）→ 总数 381、覆盖 217 律、
    # zone 来源 136→154；教学法 55、辨析标记 11、diag_kid 改写 216 均不变。
    if len(cases) != 524:
        fail(f"病例总数应为 524，实得 {len(cases)}")
    if len(per_law) != 311:
        fail(f"覆盖律应为 311，实得 {len(per_law)}")
    if src_counts != {"lawdata": 259, "yaml": 111, "zone": 154}:
        fail(f"来源构成对账失败：{src_counts} != lawdata 259 / yaml 111 / zone 154")
    if n_teach != 55:
        fail(f"教学法条目应为 55，实得 {n_teach}")
    if cx_in != 16:
        fail(f"索引内有辨析页的律应为 16，实得 {cx_in}")
    n_kid_rw = sum(1 for c in cases if c[8] != c[5])
    # 2026-11-04 落地批第 5 项（diag_kid 残漏补扫）：GR-05 #1/#2/#7/#8、C-08 #1、
    # C-10 #0/#1 共 7 条原同文 diag_kid 属残漏（内部编号互引/半成品备忘/原文转述腔），
    # 已按白话口径从病例原文改写 → 改写 216→223、同文 146→139、保留登记 1 不变。
    # 2026-11-09 病例补齐波：新增 143 例均带与 diag 不同的 diag_kid
    # → 改写 223→366、同文 139→157、保留登记 1 不变。
    if n_kid_rw != 366:
        fail(f"diag_kid 改写条数应为 366（另同文 157 + 保留登记 1），实得 {n_kid_rw}")
    if any(not c[8] for c in cases):
        fail("存在 diag_kid 为空的病例行（孩子版全量覆盖口径）")
    built = {"tot": len(cases), "nt": n_teach, "laws": len(per_law),
             "lawsc": laws_child, "cases": cases, "briefs": briefs}
    stats = {"src": src_counts, "laws_child": laws_child, "cx_laws": cx_in}
    return built, stats


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    master = json.loads(LM_PATH.read_text(encoding="utf-8"))
    contrast = json.loads(CX_PATH.read_text(encoding="utf-8"))
    src = MAIN.read_bytes().decode("utf-8")
    try:
        s0, s1 = find_span(src, ANCHOR, "{")
    except ValueError as e:
        print(f"FAIL: {e}")
        return 1
    cur_text = src[s0:s1]
    try:
        built, stats = build(master, contrast)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    gen_text = JD(built)
    print(f"对账：病例 {built['tot']} 条 / 覆盖 {built['laws']} 律（来源 {stats['src']}）；"
          f"教学法条目 {built['nt']} 条（成人层）；错句覆盖 {stats['laws_child']} 律；"
          f"有辨析页 {stats['cx_laws']} 律")
    if gen_text == cur_text:
        print(f"PASS: ERRIDX 字面量逐字节一致（{len(cur_text)} 字符）")
        return 0
    if argv[1] == "--check":
        print(f"ERRIDX 与生成结果不一致（再生 {len(gen_text)} / 现行 {len(cur_text)} 字符，待 --write 落盘）")
        return 2
    out = src[:s0] + gen_text + src[s1:]
    a = out.rfind(ANCHOR, 0, s0)
    ls = out.rfind("\n", 0, a) + 1
    if ls > 0:
        prev_start = out.rfind("\n", 0, ls - 1) + 1
        if out[prev_start:ls - 1].strip() != MARKER:
            out = out[:ls] + MARKER + "\n" + out[ls:]
    MAIN.write_bytes(out.encode("utf-8"))
    print(f"ERRIDX 写回完成：文件 {len(src)} -> {len(out)} 字符（索引 {len(gen_text)} 字符）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
