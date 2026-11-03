#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
词页数据生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。

事实源：laws-prototype/model/words_master.json（词汇总表：vc 分仓存 WLIST
行与 WPAGE 页原文、wordbank 骨架、conflicts 裁定记录）。

生成目标：mengxing-prototype-v1.html block 0（VC 词汇解码模块）的
  var WLIST = [[...], ...];      （2,351 行 × 22 列）
  var WPAGE = {"<wlist_index>": {...}, ...};   （2,204 条）
  var WEXTRA = {"<wlist_index>": [课标, Dolch, 词频序, 音标口径, 音标来源, 争议旗, 民间词源旗], ...};
      （2,238 条；B4 词页「档案卡」数据面，2026-11-03 借鉴波新增——由
      wordbank / phonetic_gb / etym 三分仓现算：kebiao_level、dolch、
      freq_rank、gb basis、gb source，以及 B3 词级徽章旗：争议旗 = etym
      disputes 实质文本（非空且不以「无已知争议」「同形异词登记」开头，
      VC 子集冻结 607）；民间词源旗 = folk_etymology_check 实质文本
      （非空且不以「未见」开头，冻结 53）。至少一字段非空才建条，无数据不设位。）

构成规则
  - WLIST：行序 = vc.wlist_index（0..2350 连续唯一，硬断言），行内容取
    vc.wlist 原文；逐行断言第 21 列（idx20）== 该词 wordbank_id、行宽 22。
  - WPAGE：值取 vc.wpage 原文（按 wlist_index 键控）；**键序沿用现行文件**
    ——WPAGE 键为整数型字符串，JS 对象迭代恒按数值序，文本序无语义；总表
    未存文本序，故以现行文件为顺序模板、内容以总表为准，键集合不一致即停。

已判项核查（本波结论：VC 侧零触发，逐项断言为凭）
  ① 简写补全 49 条（words_master conflicts）：24 条 morph 侧——其词全部无
     VC 在册（动词屈折形，Wave 3 已登记）；25 条卡面侧——只存在于拼读
     bank（由 gen_phonics.py 按裁定处理）。VC 侧断言：在册冲突词的 WLIST
     释义列（idx3）逐条 == 裁定 canonical，绝不等于简写 other。
  ② 整族口径 31 条（同上裁定）：同①断言（在册 31 词 WLIST 释义全为词库
     逐词版）；WPAGE 侧逐词断言：该词 wpage 序列化文本不含整族/简写 other。
  ③ 四张音标修正卡（57a9bb5）：属拼读 bank（gen_phonics 已断言）；VC 侧
     gas/toy/math 有 WLIST 行，断言其音标列与词库 phonetic 一致（heard 无
     WLIST 行，Wave 3 已登记）。

序列化格式：同 gen_phonics.py——Python json 默认分隔符、ensure_ascii=False
（现行字面量解析后 json.dumps 逐字节复现，实测全等）。

写回安全边界：只替换唯一定位锚（"var WLIST=" / "var WPAGE="，各命中 1 处）
定界扫描得到的字面量跨度，其余字节原样不动。

用法
  python3 laws-prototype/tools/gen_words.py --check   # 稳态校验
  python3 laws-prototype/tools/gen_words.py --write   # 生成并写回主文件
--check 退出码：0=两段均逐字节一致；1=不一致或断言失败（本波预期恒为 0：
VC 与总表已全等，--write 应为无操作；若未来总表更新，差异须先在对账报告
中列明，本脚本只报路径不擅自放行）。
"""
import json
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MAIN = BASE / "mengxing-prototype-v1.html"
WM_PATH = BASE / "model" / "words_master.json"

JD = lambda o: json.dumps(o, ensure_ascii=False)

MARKER = "/* GENERATED: tools/gen_words.py ← model/words_master.json · DO NOT EDIT */"
ANCHORS = {"WLIST": "var WLIST=", "WPAGE": "var WPAGE=", "WEXTRA": "var WEXTRA="}


def ensure_marker(src: str, label: str, span_start: int) -> str:
    """确保指定段字面量锚点所在行之前有一行生成标记（规范 §3.1）。"""
    a = src.rfind(ANCHORS[label], 0, span_start)
    if a < 0:
        return src
    ls = src.rfind("\n", 0, a) + 1
    if ls > 0:
        prev_start = src.rfind("\n", 0, ls - 1) + 1
        if src[prev_start:ls - 1].strip() == MARKER:
            return src
    indent = src[ls:a]
    if indent.strip():
        indent = ""
    return src[:ls] + indent + MARKER + "\n" + src[ls:]


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


def fail(msg):
    raise AssertionError(msg)


def build(wm, cur_wpage):
    byidx = {}
    for rec in wm["words"]:
        vc = rec.get("vc")
        if not vc:
            continue
        idx = vc["wlist_index"]
        if idx in byidx:
            fail(f"wlist_index 重复：{idx}")
        byidx[idx] = rec
    if sorted(byidx) != list(range(2351)):
        fail(f"wlist_index 应为 0..2350 连续，实得 {len(byidx)} 个")

    wlist = []
    for i in range(2351):
        rec = byidx[i]
        row = rec["vc"]["wlist"]
        if len(row) != 22:
            fail(f"WLIST 行 {i} 宽 {len(row)} != 22")
        if row[20] != rec["wordbank_id"]:
            fail(f"WLIST 行 {i} 第 21 列 {row[20]!r} != wordbank_id {rec['wordbank_id']!r}")
        wlist.append(row)

    # WPAGE：键集合以总表为准，键序沿用现行
    wp_src = {str(i): byidx[i]["vc"]["wpage"] for i in range(2351) if byidx[i]["vc"].get("wpage")}
    if set(wp_src) != set(cur_wpage):
        fail(f"WPAGE 键集合与现行不一致：总表 {len(wp_src)} / 现行 {len(cur_wpage)}")
    wpage = {k: wp_src[k] for k in cur_wpage}

    # ---- 已判项核查（VC 侧应零触发） ----
    n_canon_checked = 0
    n_novc_conflict_words = set()
    for rec in wm["words"]:
        confs = rec.get("conflicts") or []
        if not confs:
            continue
        if not rec.get("vc"):
            n_novc_conflict_words.add(rec["word"])
            continue
        idx = rec["vc"]["wlist_index"]
        row = wlist[idx]
        seen = set()
        for conf in confs:
            if conf["canonical"] in seen:
                continue
            seen.add(conf["canonical"])
            if row[3] != conf["canonical"]:
                fail(f"{rec['word']}: WLIST 释义 {row[3]!r} != 裁定 canonical {conf['canonical']!r}")
            n_canon_checked += 1
            wp_text = JD(wp_src.get(str(idx))) if str(idx) in wp_src else ""
            if conf["other"] and conf["other"] in wp_text:
                fail(f"{rec['word']}: WPAGE 含裁定 other 值 {conf['other']!r}")
    # ③ gas/toy/math 的 WLIST 音标列 == 词库 phonetic
    for rec in wm["words"]:
        if rec["word"] in ("gas", "toy", "math") and rec.get("vc"):
            row = wlist[rec["vc"]["wlist_index"]]
            if row[1] != rec["wordbank"]["phonetic"]:
                fail(f"{rec['word']}: WLIST 音标 {row[1]!r} != 词库 {rec['wordbank']['phonetic']!r}")
    # ---- WEXTRA（B4 档案卡数据面；字段口径见文件头） ----
    wextra = {}
    n_kb = n_dl = n_dsp = n_folk = 0
    for i in range(2351):
        rec = byidx[i]
        wb = rec.get("wordbank") or {}
        pg = rec.get("phonetic_gb") or {}
        er = (rec.get("etym") or {}).get("record") or {}
        dv = (er.get("disputes") or "").strip()
        fv = (er.get("folk_etymology_check") or "").strip()
        dsp = bool(dv) and not dv.startswith("无已知争议") and not dv.startswith("同形异词登记")
        folk = bool(fv) and not fv.startswith("未见")
        ent = [wb.get("kebiao_level") or None, wb.get("dolch") or None,
               wb.get("freq_rank"), pg.get("basis") or None,
               pg.get("source") or None, 1 if dsp else 0, 1 if folk else 0]
        if any(ent):
            wextra[str(i)] = ent
            n_kb += bool(ent[0]); n_dl += bool(ent[1])
            n_dsp += dsp; n_folk += folk
    # 普查冻结（总表变动时须重新普查并人工更新冻结值）
    if (n_kb, n_dl, n_dsp, n_folk) != (60, 180, 607, 53):
        fail(f"WEXTRA 普查漂移：课标 {n_kb}/Dolch {n_dl}/争议 {n_dsp}/民间词源 {n_folk}"
             f" != 冻结 (60, 180, 607, 53)")
    if len(wextra) != 2238:
        fail(f"WEXTRA 条数 {len(wextra)} != 冻结 2238")

    stats = {"canon_checked": n_canon_checked, "novc_conflict_words": len(n_novc_conflict_words),
             "wextra": len(wextra)}
    return wlist, wpage, wextra, stats


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    wm = json.loads(WM_PATH.read_text(encoding="utf-8"))
    src = MAIN.read_bytes().decode("utf-8")
    spans = {}
    cur = {}
    for label, anchor, fc in [("WLIST", "var WLIST=", "["), ("WPAGE", "var WPAGE=", "{")]:
        s0, s1 = find_span(src, anchor, fc)
        spans[label] = (s0, s1)
        cur[label] = src[s0:s1]
    cur_wpage = json.loads(cur["WPAGE"])
    # WEXTRA 段可能尚不存在（首次落地前）：容忍缺失，--write 时插入
    try:
        xs0, xs1 = find_span(src, ANCHORS["WEXTRA"], "{")
        cur["WEXTRA"] = src[xs0:xs1]
    except ValueError:
        cur["WEXTRA"] = None
    try:
        wlist, wpage, wextra, stats = build(wm, cur_wpage)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    gen = {"WLIST": JD(wlist), "WPAGE": JD(wpage), "WEXTRA": JD(wextra)}
    print(f"已判项核查：VC 在册冲突词释义 == canonical 共 {stats['canon_checked']} 项；"
          f"无 VC 在册的冲突词 {stats['novc_conflict_words']} 个（morph 侧 24 词，VC 本无行）；"
          f"WEXTRA {stats['wextra']} 条")
    ok = True
    for label in ("WLIST", "WPAGE"):
        if gen[label] == cur[label]:
            print(f"PASS: {label} 逐字节一致（{len(cur[label])} 字符）")
        else:
            ok = False
            print(f"FAIL: {label} 与总表生成不一致（再生 {len(gen[label])} / 现行 {len(cur[label])} 字符）"
                  f"——差异须先对账列明，本脚本不放行")
    if cur["WEXTRA"] is None:
        if argv[1] == "--check":
            ok = False
            print("FAIL: WEXTRA 段缺失（首次落地须先 --write 插入）")
        else:
            print("NOTE: WEXTRA 段尚不存在，--write 将按插入路径落位")
    elif gen["WEXTRA"] == cur["WEXTRA"]:
        print(f"PASS: WEXTRA 逐字节一致（{len(cur['WEXTRA'])} 字符）")
    else:
        ok = False
        print(f"FAIL: WEXTRA 与总表生成不一致（再生 {len(gen['WEXTRA'])} / 现行 {len(cur['WEXTRA'])} 字符）")
    if not ok:
        return 1
    if argv[1] == "--write":
        out = src
        for label in ("WPAGE", "WLIST"):  # 自后向前（WPAGE 在 WLIST 之后）
            s0x, _s1x = find_span(out, ANCHORS[label], "[" if label == "WLIST" else "{")
            out = ensure_marker(out, label, s0x)
        if cur["WEXTRA"] is None:
            # 插入点：WPAGE 字面量结尾的 ';' 之后另起一行（其后为 var MZLAND）
            _ws0, we1 = find_span(out, ANCHORS["WPAGE"], "{")
            tail = out[we1:we1 + 2]
            if not tail.startswith(";"):
                print("FAIL: WPAGE 字面量结尾未见 ';'，拒绝插入 WEXTRA")
                return 1
            marker_line = "/* GENERATED: tools/gen_words.py ← model/words_master.json · DO NOT EDIT */"
            ins = "\n" + marker_line + "\nvar WEXTRA=" + gen["WEXTRA"] + ";"
            out = out[:we1 + 1] + ins + out[we1 + 1:]
        else:
            xs0x, _xs1x = find_span(out, ANCHORS["WEXTRA"], "{")
            out = ensure_marker(out, "WEXTRA", xs0x)
        if out != src:
            MAIN.write_bytes(out.encode("utf-8"))
            print("三段均已与生成结果逐字节一致；生成标记/WEXTRA 段已落位并写回")
        else:
            print("三段均已与生成结果逐字节一致、生成标记在位，文件未改动（稳态）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
