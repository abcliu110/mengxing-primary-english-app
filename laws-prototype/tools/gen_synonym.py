#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_synonym.py — 同义 / 反义数据层生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。

事实源：laws-prototype/model/synonym_antonym.json（同义 / 反义关系档案，按义项挂接）
        + laws-prototype/model/wordbank.json（词库：伙伴词 bank_id 解析与词形核对）。
生成目标：mengxing-prototype-v1.html 词汇模块 IIFE 内、var WEXTRA 行之后的整行 `var SYNANT = <records>;`。
payload 为事实源的逐字副本（同一 JSON 数组单行序列化），不是手写清单、不是派生投影：
  渲染层只呈现数组里实际列出的关系（本批 6 条在库已核关系）；checked_none 与待核
  关系本来就不在数组里，库外伙伴也不许写入数组（brief §4.1），生成器以断言兜底。
序列化：json.dumps(ensure_ascii=False) 默认分隔符，后做 '</' -> '<\\/' 转义（与 gen_et.py 同口径）。
断言（任一不过即 FAIL，不写回）：
  记录字段齐全（word/bank_id/senses/status/evidence_grade/disputes；每义项 sense_ref/synonyms/antonyms）；
  每条关系带 >=1 条出处（sources 非空）；
  伙伴词 bank_id 必须在词库 id 中解析到、词形与词库一致（大小写不敏感）；
  partner_sense_n 为 >=1 的整数；
  记录按 word 排序、bank_id 唯一；status ∈ {verified, 待核}。
对称闭合暂不机检：本批伙伴词尚无自己的记录，闭合须待扩批补录后校验（见 SYNONYM_ANTONYM.md）。

用法：
  python3 laws-prototype/tools/gen_synonym.py --check   # 只比对：载荷行逐字节 + 生成标记
  python3 laws-prototype/tools/gen_synonym.py --write   # 写回主文件（载荷行 + 生成标记；首装时插在 var WEXTRA 行之后）
退出码：0=一致/写回完成；1=不一致或断言失败；64=用法错误。
生成标记：载荷行上一行应有 /* GENERATED: tools/gen_synonym.py ← model/synonym_antonym.json · DO NOT EDIT */；
  --check 一并核对，--write 确保其存在。
本生成器暂未接入 tools/check_all.py（保持 24 项不变）；校验时单独跑 --check。
"""
import json
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent  # laws-prototype/
SA_PATH = BASE / "model" / "synonym_antonym.json"
BANK_PATH = BASE / "model" / "wordbank.json"
MAIN = BASE / "mengxing-prototype-v1.html"
MARKER = "/* GENERATED: tools/gen_synonym.py ← model/synonym_antonym.json · DO NOT EDIT */"


def build_payload():
    """返回 (records, rendered_line)。断言失败抛 AssertionError。"""
    data = json.loads(SA_PATH.read_text(encoding="utf-8"))
    assert isinstance(data, list) and data, "事实源须为非空 JSON 数组"
    bank_raw = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    bank = {w["id"]: w for w in bank_raw}
    words = [r.get("word") for r in data]
    assert words == sorted(words), "记录须按 word 排序"
    assert len({r.get("bank_id") for r in data}) == len(data), "bank_id 须唯一"
    n_rel = 0
    for r in data:
        for f in ("word", "bank_id", "senses", "status", "evidence_grade", "disputes"):
            assert f in r, f"{r.get('word')}: 缺字段 {f}"
        assert r["status"] in ("verified", "待核"), f"{r['word']}: status 非法 {r['status']!r}"
        assert r["bank_id"] in bank, f"{r['word']}: 自身 bank_id {r['bank_id']} 不在词库"
        assert bank[r["bank_id"]]["word"].lower() == r["word"].lower(), \
            f"{r['word']}: 词形与词库不一致"
        assert isinstance(r["senses"], list) and r["senses"], f"{r['word']}: senses 为空"
        for s in r["senses"]:
            for f in ("sense_ref", "synonyms", "antonyms"):
                assert f in s, f"{r['word']}: 义项缺字段 {f}"
            ref = s["sense_ref"]
            for f in ("pos", "sense_n", "gloss_cn", "sense_source"):
                assert f in ref, f"{r['word']}: sense_ref 缺字段 {f}"
            for kind in ("synonyms", "antonyms"):
                for p in s[kind]:
                    assert p.get("bank_id") in bank, \
                        f"{r['word']} {ref['gloss_cn']} {kind}: 伙伴 {p.get('word')} bank_id {p.get('bank_id')} 不在词库（库外伙伴不许写入关系）"
                    assert bank[p["bank_id"]]["word"].lower() == p.get("word", "").lower(), \
                        f"{r['word']}: 伙伴词形与词库不一致 {p.get('word')!r}"
                    assert isinstance(p.get("partner_sense_n"), int) and p["partner_sense_n"] >= 1, \
                        f"{r['word']}: 伙伴 {p.get('word')} partner_sense_n 非法"
                    assert isinstance(p.get("sources"), list) and p["sources"], \
                        f"{r['word']}: 伙伴 {p.get('word')} 缺出处"
                    n_rel += 1
    pj = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    return data, "var SYNANT = " + pj + ";", n_rel


def find_payload_line(lines):
    hits = [i for i, ln in enumerate(lines) if ln.startswith("var SYNANT = [")]
    assert len(hits) <= 1, f"payload 行命中 {len(hits)} 处（应为 0 或 1）"
    return hits[0] if hits else None


def find_anchor_line(lines):
    hits = [i for i, ln in enumerate(lines) if ln.startswith("var WEXTRA={")]
    assert len(hits) == 1, f"WEXTRA 锚点行命中 {len(hits)} 处（应为 1）"
    return hits[0]


def ensure_marker(lines, i):
    """确保 lines[i]（payload 行）上一行为生成标记；返回是否做了插入。"""
    if i > 0 and lines[i - 1].strip() == MARKER:
        return False
    lines.insert(i, MARKER)
    return True


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    try:
        records, gen_line, n_rel = build_payload()
    except AssertionError as e:
        print(f"FAIL: 事实源断言失败：{e}")
        return 1
    n_senses = sum(len(r["senses"]) for r in records)
    src = MAIN.read_text(encoding="utf-8")
    lines = src.split("\n")
    try:
        i = find_payload_line(lines)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    if argv[1] == "--check":
        if i is None:
            print("FAIL: 主文件无 var SYNANT 载荷行（须先跑 --write 首装）")
            return 1
        ok = True
        if gen_line == lines[i]:
            print(f"PASS: SYNANT 载荷逐字节一致（{len(gen_line)} 字符；{len(records)} 词 / {n_senses} 义项 / {n_rel} 条已核关系）")
        else:
            ok = False
            print("FAIL: SYNANT 载荷与事实源不一致（须跑 --write 再生）")
        if i == 0 or lines[i - 1].strip() != MARKER:
            ok = False
            print("FAIL: 生成标记缺失（载荷行上一行应为 GENERATED 标记）")
        return 0 if ok else 1
    # --write
    if i is None:
        try:
            anchor = find_anchor_line(lines)
        except AssertionError as e:
            print(f"FAIL: {e}")
            return 1
        lines.insert(anchor + 1, MARKER)
        lines.insert(anchor + 2, gen_line)
        MAIN.write_text("\n".join(lines), encoding="utf-8")
        print(f"WRITE: SYNANT 首装完成（插在 var WEXTRA 行之后；{len(records)} 词 / {n_senses} 义项 / {n_rel} 条已核关系）")
        return 0
    changed = False
    if lines[i] != gen_line:
        lines[i] = gen_line
        changed = True
    if ensure_marker(lines, i):
        changed = True
    MAIN.write_text("\n".join(lines), encoding="utf-8")
    print(f"WRITE: SYNANT 已同步（{'已更新' if changed else '无变化'}；{len(records)} 词 / {n_senses} 义项 / {n_rel} 条已核关系）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
