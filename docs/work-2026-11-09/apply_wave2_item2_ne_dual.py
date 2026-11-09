#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave2_item2_ne_dual.py — 第二波第 2 项：NE-09 / NE-24 / NE-25 改回“双层”。

定夺（Priya 2026-11-09“你自己拍板”，主对话已定夺，本脚本只实施）：
  NE-09、NE-24、NE-25 的 aud 由“教师/设计层”改回“双层”，也进儿童层；
  NE-26 留在成人层（kid 文字含“互惠、累积”等未解释术语，不满足判定规则）。
  分层按逐条 kid 文字质量定，不按分组凑齐，拆开可以接受。

改动（每条两处，都改，否则 check_upstream 链 [a] 报漂移）：
  1. laws-prototype/model/laws_master.json：lawdata.aud 与 yaml.audience
  2. laws-prototype/model/laws/expression.yaml（上游文件，三条的 yaml_file
     均为 expression.yaml）：条目内的 audience 行（行内文本替换，只动
     各条目块内的 audience 行，不碰 relatives 等处出现的同名 id）

用法（仓库根目录）：
  python3 docs/work-2026-11-09/apply_wave2_item2_ne_dual.py            # 演练：只核对并报告
  python3 docs/work-2026-11-09/apply_wave2_item2_ne_dual.py --apply   # 真正写回
回写格式沿用 apply_decisions_2.1_2.2.py：json indent=1、中文原文、保留末尾换行；
yaml 文件只做行内替换，不重新序列化（保注释与格式）。

改完后的再生步骤（实施方执行，本脚本不做）：
  1. docs/work-2026-11-09/sync_lawdata.py（允许集已扩展到 aud，见该脚本注释）
     —— 把总表 lawdata.aud 同步进主文件 LAWDATA 字面量
  2. python3 laws-prototype/tools/gen_laws.py --check
  3. python3 laws-prototype/tools/gen_roster.py --check / --write
     —— ROSTER 三条 layer 由 T 改 K，索引行去掉“教师层”徽标、移出成人组
  4. python3 laws-prototype/tools/check_upstream.py（链 [a] 核对 yaml 文件 ↔ 总表分仓）
  5. python3 laws-prototype/tools/check_all.py（须 24/24）
主文件是生成物，不许手改主文件。
"""

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # 仓库根目录
MASTER = ROOT / "laws-prototype" / "model" / "laws_master.json"
YAML_FILE = ROOT / "laws-prototype" / "model" / "laws" / "expression.yaml"

TARGETS = ("NE-09", "NE-24", "NE-25")
LEAVE = ("NE-26",)
OLD = "教师/设计层"
NEW = "双层"


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第二波第 2 项：NE-09/24/25 改回双层（默认只演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回总表与上游 yaml")
    args = ap.parse_args(argv)

    raw = MASTER.read_text(encoding="utf-8")
    data = json.loads(raw)
    by_id = {e.get("id"): e for e in data}
    problems = []

    # --- 核对总表现状 ---
    for lid in TARGETS:
        e = by_id.get(lid)
        if e is None:
            problems.append(f"{lid} 不在总表内")
            continue
        if e.get("yaml_file") != "expression.yaml":
            problems.append(f"{lid} 的 yaml_file={e.get('yaml_file')!r}，不是 expression.yaml")
        if (e.get("lawdata") or {}).get("aud") != OLD:
            problems.append(f"{lid} lawdata.aud={(e.get('lawdata') or {}).get('aud')!r}，不是 {OLD!r}")
        if (e.get("yaml") or {}).get("audience") != OLD:
            problems.append(f"{lid} yaml.audience={(e.get('yaml') or {}).get('audience')!r}，不是 {OLD!r}，")
        if (e.get("lawdata") or {}).get("zone") != "expr2":
            problems.append(f"{lid} lawdata.zone={(e.get('lawdata') or {}).get('zone')!r}，不是 'expr2'")
    for lid in LEAVE:
        e = by_id.get(lid) or {}
        if (e.get("lawdata") or {}).get("aud") != OLD or (e.get("yaml") or {}).get("audience") != OLD:
            problems.append(f"{lid} 应留成人层，但 aud/audience 已不是 {OLD!r}")

    # --- 核对上游 yaml 文件：每条的条目块内有且仅有一行 audience 行 ---
    lines = YAML_FILE.read_text(encoding="utf-8").split("\n")
    yaml_hits = {}
    for lid in TARGETS:
        starts = [i for i, ln in enumerate(lines) if ln == f"- id: {lid}"]
        if len(starts) != 1:
            problems.append(f"expression.yaml 里顶格 '- id: {lid}' 出现 {len(starts)} 次（应为 1）")
            continue
        s = starts[0]
        # 条目块：从本条起，到下一个顶格 "- id: " 之前；audience 行在块首 10 行内
        block_end = next((i for i in range(s + 1, len(lines))
                          if lines[i].startswith("- id: ")), len(lines))
        cand = [i for i in range(s, min(block_end, s + 10))
                if lines[i] == f"  audience: {OLD}"]
        if len(cand) != 1:
            problems.append(f"{lid} 条目块内 audience 行出现 {len(cand)} 次（应为 1）")
            continue
        yaml_hits[lid] = cand[0]

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1

    for lid in TARGETS:
        print(f"OK 核对通过：{lid} 总表 lawdata.aud=yaml.audience={OLD!r}，"
              f"yaml 文件第 {yaml_hits[lid] + 1} 行 audience 行待改，zone=expr2 不变")
    print(f"OK 核对通过：{LEAVE[0]} 保持 {OLD!r}，不改")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    for lid in TARGETS:
        by_id[lid]["lawdata"]["aud"] = NEW
        by_id[lid]["yaml"]["audience"] = NEW
    text = json.dumps(data, ensure_ascii=False, indent=1)
    if raw.endswith("\n"):
        text += "\n"
    MASTER.write_text(text, encoding="utf-8")
    for lid in TARGETS:
        lines[yaml_hits[lid]] = f"  audience: {NEW}"
    YAML_FILE.write_text("\n".join(lines), encoding="utf-8")
    after = json.loads(MASTER.read_text(encoding="utf-8"))
    assert len(after) == len(data), "写回自检失败：条目数变化"
    for lid in TARGETS:
        e = {x["id"]: x for x in after}[lid]
        assert e["lawdata"]["aud"] == NEW and e["yaml"]["audience"] == NEW
    print(f"APPLY 完成：{len(TARGETS)} 条改回“双层”（总表两处 + 上游 yaml 各一行）；"
          f"{LEAVE[0]} 未动。下一步：sync_lawdata.py → gen_laws --check → "
          f"gen_roster --check/--write → check_upstream → check_all。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
