#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把 docs/work-2026-11-09/cases_expr_ne.json 合并进
laws-prototype/model/laws_master.json 对应律的 lawdata.cases。

只追加，不改其他字段；若某律已有同 wrong（按 gen_errors.py 的 norm 口径
归一）的病例则跳过并计数。

用法（仓库根目录）：
  python3 docs/work-2026-11-09/apply_cases_expr_ne.py            # 写回总表
  python3 docs/work-2026-11-09/apply_cases_expr_ne.py --dry-run  # 只校验并汇报，不写盘
  python3 docs/work-2026-11-09/apply_cases_expr_ne.py --master /tmp/laws_master.json
      # 在副本上实测（正式合并前必须先在 /tmp 副本上跑通）

安全边界：
  - 只动 lawdata.cases 列表（append）；不碰 nocase / quiz / exs / mech 等任何其他字段。
  - 写盘前全量断言，任一断言失败即退出、不写盘。
  - 写盘后重新读盘校验（JSON 合法、追加数对账），不对账即报错。
  - 写回格式与总表现行格式一致：json.dumps(ensure_ascii=False, indent=1)，
    无末尾换行（与现行文件逐字节口径一致）。

注意：合并后 gen_errors.py 的冻结断言（病例 381 / 覆盖 217 律 /
lawdata 116 / yaml 111 / zone 154 / diag_kid 改写 223）会失效，需由数据
负责人按新实测数更新断言并重跑 gen_errors.py --write；本脚本不管 ERRIDX。
"""
import argparse
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
DEFAULT_MASTER = ROOT / "laws-prototype" / "model" / "laws_master.json"
DEFAULT_CASES = ROOT / "docs" / "work-2026-11-09" / "cases_expr_ne.json"

# 与 laws-prototype/tools/gen_errors.py 的 norm() 逐字同口径
# （全角引号转半角、小写、标点转空格、空白折叠）。
PUNCT = set(".,!?;:'\"()") | set("（）「」、，【】")


def norm(s):
    s = (s or "").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    s = s.lower()
    s = "".join(" " if ch in PUNCT else ch for ch in s)
    return re.sub(r"\s+", " ", s).strip()


# lawdata.cases 条目字段：6 个既有字段（照抄现行条目结构）+ 任务要求的
# source / source_url（出处名与出处链接）。
REQUIRED_FIELDS = ["wrong", "right", "type", "diag", "src", "diag_kid",
                   "source", "source_url"]
ALLOWED_PREFIXES = ("E-", "W-", "NE-")


def fail(msg):
    raise AssertionError(msg)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="合并 E/W/NE 病例进 laws_master.json")
    ap.add_argument("--master", default=str(DEFAULT_MASTER),
                    help="laws_master.json 路径（默认仓库内总表）")
    ap.add_argument("--cases", default=str(DEFAULT_CASES),
                    help="病例 JSON 路径（默认 docs/work-2026-11-09/cases_expr_ne.json）")
    ap.add_argument("--dry-run", action="store_true", help="只校验并汇报，不写盘")
    args = ap.parse_args(argv)

    master_path = Path(args.master)
    cases_path = Path(args.cases)

    # ---- 锚点断言 1：文件存在 ----
    assert master_path.is_file(), f"总表不存在：{master_path}"
    assert cases_path.is_file(), f"病例文件不存在：{cases_path}"

    master = json.loads(master_path.read_text(encoding="utf-8"))
    new_cases = json.loads(cases_path.read_text(encoding="utf-8"))

    # ---- 锚点断言 2：总表与病例文件形态 ----
    assert isinstance(master, list) and master, "总表应为非空 JSON 数组"
    assert isinstance(new_cases, dict) and new_cases, "病例文件应为非空 JSON 对象（law_id → 病例数组）"
    by_id = {}
    for e in master:
        assert isinstance(e, dict) and isinstance(e.get("id"), str), "总表条目缺 id"
        assert e["id"] not in by_id, f"总表 id 重复：{e['id']}"
        by_id[e["id"]] = e

    total_added = 0
    total_skipped = 0
    per_law = {}
    for law_id in sorted(new_cases):
        # ---- 锚点断言 3：律 id 在 E/W/NE 范围内且存在于总表 ----
        assert law_id.startswith(ALLOWED_PREFIXES), \
            f"律 id 不在 E/W/NE 范围内：{law_id}"
        assert law_id in by_id, f"律不存在于总表：{law_id}"
        entry = by_id[law_id]
        ld = entry.get("lawdata")
        # ---- 锚点断言 4：lawdata.cases 锚点 ----
        assert isinstance(ld, dict), f"{law_id} 的 lawdata 不是对象"
        assert isinstance(ld.get("cases"), list), f"{law_id} 的 lawdata.cases 不是数组"
        incoming = new_cases[law_id]
        assert isinstance(incoming, list) and incoming, f"{law_id} 的病例数组为空"

        existing_norms = set()
        for c in ld["cases"]:
            assert isinstance(c, dict) and isinstance(c.get("wrong"), str) and c["wrong"], \
                f"{law_id} 现有病例缺 wrong 字段"
            existing_norms.add(norm(c["wrong"]))

        # ---- 锚点断言 5：逐条病例字段与内容 ----
        seen_batch = set()
        added = skipped = 0
        for c in incoming:
            assert isinstance(c, dict), f"{law_id} 病例不是对象：{c!r}"
            for f in REQUIRED_FIELDS:
                assert f in c, f"{law_id} 病例缺字段 {f}：{c!r}"
                assert isinstance(c[f], str) and c[f].strip(), \
                    f"{law_id} 病例字段 {f} 为空"
            assert set(c.keys()) == set(REQUIRED_FIELDS), \
                f"{law_id} 病例字段与既定结构不符：{sorted(c.keys())}"
            assert re.search(r"[A-Za-z]", c["wrong"]), \
                f"{law_id} 病例 wrong 不含英文字母（会落入教学法条目分流）：{c['wrong']!r}"
            assert c["diag_kid"].strip(), f"{law_id} 病例缺 diag_kid（孩子版全量覆盖口径）"
            n = norm(c["wrong"])
            assert n and n not in seen_batch, \
                f"{law_id} 本批内 wrong 重复：{c['wrong']!r}"
            seen_batch.add(n)
            if n in existing_norms:
                skipped += 1
                continue
            ld["cases"].append(c)
            existing_norms.add(n)
            added += 1
        per_law[law_id] = (added, skipped)
        total_added += added
        total_skipped += skipped

    print(f"校验通过：{len(new_cases)} 律，新增 {total_added} 例，跳过已存在 {total_skipped} 例")
    for law_id in sorted(per_law):
        a, s = per_law[law_id]
        print(f"  {law_id}: +{a} 例，跳过 {s} 例")

    if args.dry_run:
        print("dry-run：未写盘")
        return 0

    # ---- 写盘：与总表现行格式一致（indent=1，无末尾换行），原子替换 ----
    text = json.dumps(master, ensure_ascii=False, indent=1)
    tmp_path = master_path.with_suffix(".json.tmp")
    tmp_path.write_text(text, encoding="utf-8")
    # ---- 锚点断言 6：写盘后读盘复核 ----
    reloaded = json.loads(tmp_path.read_text(encoding="utf-8"))
    assert isinstance(reloaded, list) and len(reloaded) == len(master), "写盘后总表长度对不上"
    re_by_id = {e["id"]: e for e in reloaded}
    for law_id, (a, _s) in per_law.items():
        got = len(re_by_id[law_id]["lawdata"]["cases"])
        want = len(by_id[law_id]["lawdata"]["cases"])
        assert got == want, f"{law_id} 写盘后病例数对不上：{got} != {want}"
    os.replace(tmp_path, master_path)
    print(f"写盘完成：{master_path}（新增 {total_added} 例，跳过 {total_skipped} 例）")
    print("提醒：gen_errors.py 冻结断言（381/217/116/111/154/223）需按新实测数更新后重跑 --write。")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except AssertionError as e:
        print(f"FAIL: {e}")
        sys.exit(1)
