#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把 cases_vocab_constr_question.json 合并进 laws_master.json 对应律的
lawdata.cases（TODO 1.1 病例补齐：词汇解码 V + 构式 CO + 疑问 QI）。

用法（从仓库根目录运行）：
  python3 docs/work-2026-11-09/apply_cases_vocab_constr_question.py
  python3 docs/work-2026-11-09/apply_cases_vocab_constr_question.py \
      --cases docs/work-2026-11-09/cases_vocab_constr_question.json \
      --master /tmp/laws_master_test.json     # 先在副本上实测，禁止直接跑真文件后不复核

合并规则（与 laws-prototype/tools/gen_errors.py 同口径）：
  - 只追加进 lawdata.cases，不改任何其他字段；写回格式与原文件一致
    （json.dumps(ensure_ascii=False, indent=1)，无末尾换行——已实测往返一致）。
  - 若某律已有同 wrong 的病例（按 gen_errors.py 的 norm() 归一后比较），
    则跳过该条并计数，不重复追加。
  - 病例只写六个规范字段 wrong / right / type / diag / src / diag_kid；
    交付 JSON 里的 source / source_url 是溯源字段，不写入事实源，
    src 即出处名。
  - CO-17 的 lawdata 在事实源里是 null：本脚本为其新建最小 lawdata
    {"id": "CO-17", "cases": [...]}，并打印警告，由总协调人决定是否
    再补齐其余 lawdata 字段。

锚点断言（任一失败即退出，不写文件）：
  A1  交付 JSON 的每条律 id 都在 laws_master.json 里存在。
  A2  每条病例含 wrong / right / type / diag / src / diag_kid 六字段，
      且 wrong、right、diag、diag_kid 均非空；wrong 含英文字母
      （无英文字母的是教学法条目，不属于本批）。
  A3  目标律的 lawdata 是 dict 或 null；cases 是 list 或缺失。
  A4  合并后每律 lawdata.cases 内无重复 norm(wrong)。
  A5  除目标律的 lawdata.cases 外，全文件其余内容逐字节等价
      （以加载前后的深比较验证：非目标律原样，目标律除 cases 外原样）。
"""

import argparse
import copy
import json
import re
import sys
from pathlib import Path

# gen_errors.py 同款归一：全角引号转半角、小写、标点转空格、空白折叠
PUNCT = set(".,!?;:'\"()") | set("（）「」、，【】")


def norm(s):
    s = (s or "").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    s = s.lower()
    s = "".join(" " if ch in PUNCT else ch for ch in s)
    return re.sub(r"\s+", " ", s).strip()


CASE_FIELDS = ["wrong", "right", "type", "diag", "src", "diag_kid"]
HAS_LETTER = re.compile(r"[A-Za-z]")


def fail(msg):
    raise AssertionError(msg)


def main():
    ap = argparse.ArgumentParser(description="Merge V/CO/QI cases into laws_master.json")
    ap.add_argument("--cases", default="docs/work-2026-11-09/cases_vocab_constr_question.json")
    ap.add_argument("--master", default="laws-prototype/model/laws_master.json")
    args = ap.parse_args()

    cases_path = Path(args.cases)
    master_path = Path(args.master)
    assert cases_path.is_file(), f"A0 cases file missing: {cases_path}"
    assert master_path.is_file(), f"A0 master file missing: {master_path}"

    new_cases = json.loads(cases_path.read_text(encoding="utf-8"))
    assert isinstance(new_cases, dict) and new_cases, "A0 cases JSON must be a non-empty object"

    raw_before = master_path.read_text(encoding="utf-8")
    laws = json.loads(raw_before)
    assert isinstance(laws, list) and len(laws) == 456, (
        f"A0 master must be a list of 456 laws, got "
        f"{len(laws) if isinstance(laws, list) else type(laws)}"
    )
    by_id = {law.get("id"): law for law in laws}
    assert len(by_id) == 456, "A0 duplicate law ids in master"

    # ---- A1/A2：交付 JSON 锚点 ----
    for law_id, cases in new_cases.items():
        assert law_id in by_id, f"A1 law not found in master: {law_id}"
        assert isinstance(cases, list) and cases, f"A2 empty case list: {law_id}"
        seen_in_file = set()
        for c in cases:
            assert isinstance(c, dict), f"A2 case not an object: {law_id}"
            assert set(CASE_FIELDS) <= set(c.keys()), (
                f"A2 missing fields in {law_id}: {sorted(set(CASE_FIELDS) - set(c.keys()))}"
            )
            for f in ("wrong", "right", "diag", "diag_kid"):
                assert isinstance(c[f], str) and c[f].strip(), f"A2 empty {f}: {law_id} {c.get('wrong', '')!r}"
            assert HAS_LETTER.search(c["wrong"]), (
                f"A2 wrong has no English letters (teaching-method entry?): {law_id} {c['wrong']!r}"
            )
            assert isinstance(c["type"], str) and c["type"].strip(), f"A2 empty type: {law_id}"
            assert isinstance(c["src"], str) and c["src"].strip(), f"A2 empty src: {law_id}"
            n = norm(c["wrong"])
            assert n and n not in seen_in_file, f"A2 duplicate wrong inside deliverable: {law_id} {c['wrong']!r}"
            seen_in_file.add(n)

    snapshot = copy.deepcopy(laws)
    added_total = 0
    skipped_total = 0
    per_law = {}

    # ---- 合并（只追加 lawdata.cases） ----
    for law_id, cases in new_cases.items():
        law = by_id[law_id]
        ld = law.get("lawdata")
        if ld is None:
            # A3 特例：CO-17 的 lawdata 为 null，新建最小 lawdata
            print(f"WARNING: {law_id} lawdata is null; creating minimal lawdata {{'id': {law_id!r}, 'cases': [...]}}")
            ld = {"id": law_id, "cases": []}
            law["lawdata"] = ld
        assert isinstance(ld, dict), f"A3 lawdata not a dict: {law_id}"
        existing = ld.get("cases")
        if existing is None:
            existing = []
            ld["cases"] = existing
        assert isinstance(existing, list), f"A3 cases not a list: {law_id}"
        have = {norm(c.get("wrong", "")) for c in existing}
        added = 0
        skipped = 0
        for c in cases:
            if norm(c["wrong"]) in have:
                skipped += 1
                continue
            existing.append({f: c[f] for f in CASE_FIELDS})
            have.add(norm(c["wrong"]))
            added += 1
        per_law[law_id] = (added, skipped)
        added_total += added
        skipped_total += skipped

    # ---- A4：合并后律内无重复 ----
    for law_id in new_cases:
        ld = by_id[law_id]["lawdata"]
        norms = [norm(c.get("wrong", "")) for c in ld["cases"]]
        assert len(norms) == len(set(norms)), f"A4 duplicate norm(wrong) after merge: {law_id}"

    # ---- A5：除目标律 lawdata.cases 外其余内容不变 ----
    for old, new in zip(snapshot, laws):
        if old["id"] in new_cases:
            old_ld = old.get("lawdata")
            new_ld = new.get("lawdata")
            assert set(new.keys()) == set(old.keys()), f"A5 law keys changed: {old['id']}"
            for k in old:
                if k != "lawdata":
                    assert old[k] == new[k], f"A5 field changed: {old['id']}.{k}"
            if old_ld is None:
                assert set(new_ld.keys()) == {"id", "cases"} and new_ld["id"] == old["id"], (
                    f"A5 minimal lawdata wrong: {old['id']}"
                )
                continue
            assert set(new_ld.keys()) == set(old_ld.keys()), f"A5 lawdata keys changed: {old['id']}"
            for k in old_ld:
                if k != "cases":
                    assert old_ld[k] == new_ld[k], f"A5 lawdata field changed: {old['id']}.{k}"
            assert new_ld["cases"][: len(old_ld.get("cases") or [])] == (old_ld.get("cases") or []), (
                f"A5 existing cases reordered/changed: {old['id']}"
            )
        else:
            assert old == new, f"A5 non-target law changed: {old['id']}"

    # 写回：与原文件同一序列化格式（indent=1，无末尾换行）
    out = json.dumps(laws, ensure_ascii=False, indent=1)
    assert json.loads(out) == laws, "A5 roundtrip mismatch"
    master_path.write_text(out, encoding="utf-8")

    print(f"laws touched: {len(new_cases)}  added: {added_total}  skipped (dup wrong): {skipped_total}")
    for law_id in sorted(per_law):
        a, s = per_law[law_id]
        print(f"  {law_id}: +{a} skip {s}")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as e:
        print(f"FAILED: {e}", file=sys.stderr)
        sys.exit(1)
