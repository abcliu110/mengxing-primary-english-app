#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave3_item2_relatives.py — 第三波第 2 项：yaml.relatives 剩余 33 条律
的已登记 kind 边迁入总表 relations_teaching。

定夺（主对话 Muse 已定，本脚本只实施，不重新定夺）：
  先定口径，只迁移 gen_links 已登记的 kind（前置/同族/对照）；“易混”暂不迁。
  kind“易混”不是 gen_links 登记的 kind，整批迁会触发
  `教学关系类型未登记：易混` 断言，硬迁等于破坏校验。

实测口径（底稿 docs/work-2026-11-09/wave3_item2_relatives.md §1–§3，
HEAD e31dc96 实测，与第二波底稿的“33”口径已纠正）：
  “33 条律” = relations_teaching 为 null 的持有律 33 个
    = TA 13（TA-01/02/04/05/08/10/11/12/13/14/15/17/18）
    + P-* 19（P-01～P-19）+ CO-17 1；
  yaml-only 有向边共 91 条 = TA 32（同族 24/对照 5/易混 3）
    + P-* 56（同族 26/前置 16/对照 14）+ CO-17 3（同族 2/前置 1）；
  另 3 个持有律 TA-03/TA-06/TA-16 已有第二波迁入的前置边，仍有余边 5 条。
  全表 relations_teaching 为 null 的律共 65 条，其余 32 条 yaml.relatives
  为空，无边可迁，不在本项范围。

本次迁移：91 条中已登记 kind 的 88 条（同族 52、前置 17、对照 19），
按第二波第 7 项做法写入各持有律的 relations_teaching，src 记
"yaml-relatives"，顺序与 yaml.relatives 一致（已有前置边的 TA-03/TA-16
在其后追加）。TA-07、TA-09 的 yaml.relatives 只有已迁的前置边，无余边。
暂不迁的 3 条易混：TA-05→TA-16、TA-06→TA-16、TA-16→TA-06。

不动上游 yaml 文件与总表 yaml 分仓（只加 relations_teaching，不改
yaml.relatives），故 check_upstream 链 [a] 不受影响。不用 sync_lawdata.py：
36 个持有律（TA-*/P-*/CO-17）均不在主文件 LAWDATA（224 条）内，也不在
PN/AR/CJ 专区 LAWS 内，gen_laws 派生的 rel 无落点；sync_lawdata.py 的
允许集（cases/nocase/exs/aud）本就不含 rel。

改完后的再生步骤（实施方执行，本脚本不做）：
  1. python3 laws-prototype/tools/gen_links.py --write
     —— LINKIDX.g p 槽 75 → 92、k 条目 888 → 944（并集 444 → 472 对）、
     c 条目 254 → 274（并集 127 → 137 对）、覆盖律数 439 → 453
  2. python3 laws-prototype/tools/gen_laws.py --check（预计无变化：持有律
     不在 LAWDATA/专区内，rel 无落点）
  3. python3 laws-prototype/tools/check_rel_coverage.py（关系门禁）
  4. python3 laws-prototype/tools/check_upstream.py
  5. python3 laws-prototype/tools/check_all.py（须 24/24）
  6. jsdom：LINKIDX.g 各槽计数与新增 14 律入 g 核对。
主文件除 gen_links.py 生成的 LINKIDX 外不许手改。
"""

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # 仓库根目录
MASTER = ROOT / "laws-prototype" / "model" / "laws_master.json"

REGISTERED = {"前置", "同族", "对照"}
EXPECTED_LEFTOVER = {("TA-05", "TA-16", "易混"),
                     ("TA-06", "TA-16", "易混"),
                     ("TA-16", "TA-06", "易混")}


def main(argv=None):
    ap = argparse.ArgumentParser(
        description="第三波第 2 项：yaml.relatives 已登记 kind 边迁入总表（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回总表")
    args = ap.parse_args(argv)

    raw = MASTER.read_text(encoding="utf-8")
    data = json.loads(raw)
    by_id = {e.get("id"): e for e in data}
    problems = []

    # --- 1. 实测 yaml-only 边：总数与 kind 分解必须与底稿一致 ---
    yaml_only = []  # (holder, target, kind)，按总表序 + yaml.relatives 序
    for e in data:
        rt = {(r["id"], r["kind"]) for r in (e.get("relations_teaching") or [])}
        for r in ((e.get("yaml") or {}).get("relatives") or []):
            if (r["id"], r["rel"]) not in rt:
                yaml_only.append((e["id"], r["id"], r["rel"]))
    if len(yaml_only) != 91:
        problems.append(f"yaml-only 边总数 {len(yaml_only)}（底稿应为 91）")
    cnt = Counter(k for _, _, k in yaml_only)
    if dict(cnt) != {"同族": 52, "对照": 19, "前置": 17, "易混": 3}:
        problems.append(f"yaml-only kind 分解 {dict(cnt)}（底稿应为 同族 52/对照 19/前置 17/易混 3）")
    holders = {h for h, _, _ in yaml_only}
    if len(holders) != 36:
        problems.append(f"yaml-only 持有律 {len(holders)} 个（底稿应为 36）")
    null_holders = [h for h in holders if by_id[h].get("relations_teaching") is None]
    if len(null_holders) != 33:
        problems.append(f"relations_teaching 为 null 的持有律 {len(null_holders)} 个（底稿应为 33）")

    # --- 2. 迁移边断言：已登记 kind、目标在户口、无重复 ---
    migrate = [(h, t, k) for h, t, k in yaml_only if k in REGISTERED]
    leftover = [(h, t, k) for h, t, k in yaml_only if k not in REGISTERED]
    if len(migrate) != 88:
        problems.append(f"拟迁移边 {len(migrate)} 条（底稿应为 88）")
    if set(leftover) != EXPECTED_LEFTOVER:
        problems.append(f"暂不迁边不是预期的 3 条易混：{leftover}")
    for h, t, k in migrate:
        if t not in by_id:
            problems.append(f"迁移边端点 {h}→{t} 不在总表户口")
        rt = {(r["id"], r["kind"]) for r in (by_id[h].get("relations_teaching") or [])}
        if (t, k) in rt:
            problems.append(f"迁移边 {h}→{t}·{k} 已在总表 relations_teaching（重复）")

    # --- 3. 反向核对：现行 relations_teaching 全部源自 yaml.relatives ---
    for e in data:
        ys = {(r["id"], r["rel"]) for r in ((e.get("yaml") or {}).get("relatives") or [])}
        for r in (e.get("relations_teaching") or []):
            if (r["id"], r["kind"]) not in ys:
                problems.append(f"{e['id']} 的 relations_teaching 边 {r['id']}·{r['kind']} 不在 yaml.relatives 中")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print(f"OK 核对通过：yaml-only 91 条（同族 52/对照 19/前置 17/易混 3），"
          f"持有律 36 个（其中 relations_teaching 为 null 者 33 个）")
    print(f"OK 拟迁移 88 条已登记 kind 边（同族 52/前置 17/对照 19）；"
          f"暂不迁 3 条易混：TA-05→TA-16、TA-06→TA-16、TA-16→TA-06")
    print("OK 其余 32 条 relations_teaching 为 null 的律 yaml.relatives 为空，无边可迁，不动")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    for holder, target, kind in migrate:
        lst = list(by_id[holder].get("relations_teaching") or [])
        lst.append({"id": target, "kind": kind, "src": "yaml-relatives"})
        by_id[holder]["relations_teaching"] = lst
    out = json.dumps(data, ensure_ascii=False, indent=1)
    if raw.endswith("\n"):
        out += "\n"
    MASTER.write_text(out, encoding="utf-8")

    # --- 写回自检 ---
    after = json.loads(MASTER.read_text(encoding="utf-8"))
    assert len(after) == len(data), "写回自检失败：条目数变化"
    by2 = {e.get("id"): e for e in after}
    tot = Counter(r["kind"] for e in after for r in (e.get("relations_teaching") or []))
    assert sum(tot.values()) == 978, f"写回自检失败：总表教学关系总数 {sum(tot.values())}（应为 978）"
    assert dict(tot) == {"同族": 708, "对照": 178, "前置": 92}, f"写回自检失败：kind 分解 {dict(tot)}"
    rem = []
    for e in after:
        rt = {(r["id"], r["kind"]) for r in (e.get("relations_teaching") or [])}
        for r in ((e.get("yaml") or {}).get("relatives") or []):
            if (r["id"], r["rel"]) not in rt:
                rem.append((e["id"], r["id"], r["rel"]))
    assert set(rem) == EXPECTED_LEFTOVER, f"写回自检失败：迁移后 yaml-only 剩余 {rem}"
    print("APPLY 完成：88 条已登记 kind 边已迁入总表 relations_teaching（src=yaml-relatives）；"
          "总表教学关系 890 → 978（前置 75→92、同族 656→708、对照 159→178）；"
          "yaml-only 仅剩 3 条易混。下一步：gen_links.py --write → gen_laws --check → "
          "check_rel_coverage → check_upstream → check_all → jsdom。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
