#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave2_item7_ta_pre.py — 第二波第 7 项：TA 5 对前置迁入总表。

定夺（Priya 2026-11-09“你自己拍板”，主对话已定夺，本脚本只实施）：
  “51 对”口径以实测 70 对为准（51 是旧口径）；TA 5 对迁入总表。

迁移的 5 对（持有律 → 先修律，kind 均为“前置”）：
  TA-03 → TA-01、TA-06 → TA-05、TA-07 → TA-03、TA-09 → TA-05、TA-16 → TA-05

三处交叉核对（本脚本 --apply 前全部断言）：
  1. 上游 yaml：grammar_ext.yaml 的 relatives 里每条都有该前置边
     （master yaml 分仓即其副本；TA 全部 relatives 共 37 条：同族 24 /
     对照 5 / 前置 5 / 易混 3——本次只迁 5 条前置；“易混”不是 gen_links
     登记的 kind，整批迁 relatives 会炸生成器，故只迁前置）。
  2. 行内 const DATA（主文件时态站 DATA.TA[].rel）：5 条前置边逐条一致。
  3. 总表现状：5 条持有律的 relations_teaching 现均为 null（从未迁入）。

写回：只写 laws_master.json 各持有律的 relations_teaching（单条列表），
src 记 "yaml-relatives"（值取自上游 yaml.relatives；DATA.rel 是同一批边
的呈现侧副本，见工作底稿 wave2_2.2_70pairs.md）。其余 TA 关系（同族/
对照/易混）与 P-*、CO-17 的 yaml-only 关系不在本项范围，一律不动。

行内 DATA.rel 的 5 条前置边本次不删除：TA 详情页 VB.openTA 的“亲戚条”
芯片直接读 DATA.TA[].rel（openTA 不读 LINKIDX.g），删了会丢页面上的
前置显示；迁入后 DATA.rel 前置边与 LINKIDX.g 对位一致，不再是户口外
自留。单户口的彻底清理（openTA 改读 LINKIDX.g）须另立项动 VB 代码，
不在本项范围。

改完后的再生步骤（实施方执行，本脚本不做）：
  1. python3 laws-prototype/tools/gen_links.py --write
     —— LINKIDX.g p 槽 70 → 75；q 槽反向同步
  2. python3 laws-prototype/tools/check_rel_coverage.py（关系门禁）
  3. python3 laws-prototype/tools/gen_laws.py --check
  4. python3 laws-prototype/tools/check_upstream.py
  5. python3 laws-prototype/tools/check_all.py（须 24/24）
  6. jsdom：LINKIDX.g p 总数 75；VB.openTA('TA-03') 等 5 站“亲戚条”
     含“TA-xx · 前置”芯片。
主文件除 gen_links.py 生成的 LINKIDX 外不许手改。
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]
                       / "laws-prototype" / "tools"))
import gen_laws as gl

ROOT = Path(__file__).resolve().parents[2]  # 仓库根目录
MASTER = ROOT / "laws-prototype" / "model" / "laws_master.json"
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

PAIRS = (("TA-03", "TA-01"), ("TA-06", "TA-05"), ("TA-07", "TA-03"),
         ("TA-09", "TA-05"), ("TA-16", "TA-05"))
SRC = "yaml-relatives"


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第二波第 7 项：TA 5 对前置迁入总表（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回总表")
    args = ap.parse_args(argv)

    raw = MASTER.read_text(encoding="utf-8")
    data = json.loads(raw)
    by_id = {e.get("id"): e for e in data}
    problems = []

    # --- 1. 总表现状：5 条 relations_teaching 均为 null ---
    for holder, target in PAIRS:
        e = by_id.get(holder)
        if e is None:
            problems.append(f"{holder} 不在总表内")
            continue
        if e.get("relations_teaching") is not None:
            problems.append(f"{holder} relations_teaching 已非空：{e.get('relations_teaching')!r}")
        if by_id.get(target) is None:
            problems.append(f"先修目标 {target} 不在总表内")
        # --- 2. 上游 yaml.relatives 交叉核对 ---
        rels = (e.get("yaml") or {}).get("relatives") or []
        if (target, "前置") not in {(r["id"], r["rel"]) for r in rels}:
            problems.append(f"{holder} 的 yaml.relatives 里没有 ({target}, 前置)")

    # --- 3. 行内 DATA.TA[].rel 交叉核对 ---
    text = MAIN.read_text(encoding="utf-8")
    # 时态站 DATA：以 {"FORMS" 开头的 const DATA（文件里另有介词区同名 DATA 在前）
    i = text.find('const DATA = {"FORMS"')
    if i < 0:
        problems.append("主文件找不到时态站 const DATA = {\"FORMS\"")
        data_ta = {}
    else:
        p = i + len("const DATA = {")
        # scan_literal 需要开括号位置；回退到 "{" 处
        p = text.find("{", i)
        end = gl.scan_literal(text, p)
        data_ta = {u["id"]: u for u in json.loads(text[p:end])["TA"]}
    for holder, target in PAIRS:
        u = data_ta.get(holder)
        if u is None:
            problems.append(f"DATA.TA 里没有 {holder}")
            continue
        if (target, "前置") not in {(r["id"], r["rel"]) for r in (u.get("rel") or [])}:
            problems.append(f"DATA.TA {holder}.rel 里没有 ({target}, 前置)")

    if problems:
        for p_ in problems:
            print("FAIL:", p_)
        return 1
    for holder, target in PAIRS:
        print(f"OK 核对通过：{holder} → {target}（前置）——总表 relations_teaching 为空，"
              f"yaml.relatives 与 DATA.rel 均有该边")
    print("OK 其余 TA 关系（同族/对照/易混）与 P-*、CO-17 的 yaml-only 关系不在本项范围，不动")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    for holder, target in PAIRS:
        by_id[holder]["relations_teaching"] = [
            {"id": target, "kind": "前置", "src": SRC}]
    out = json.dumps(data, ensure_ascii=False, indent=1)
    if raw.endswith("\n"):
        out += "\n"
    MASTER.write_text(out, encoding="utf-8")
    after = json.loads(MASTER.read_text(encoding="utf-8"))
    assert len(after) == len(data), "写回自检失败：条目数变化"
    n_pre = sum(1 for e in after for r in (e.get("relations_teaching") or [])
                if r["kind"] == "前置")
    assert n_pre == 75, f"写回自检失败：总表前置总数 {n_pre}（应为 75）"
    print("APPLY 完成：5 对前置已迁入总表 relations_teaching（src=yaml-relatives）；"
          "总表前置 70 → 75 对。下一步：gen_links.py --write → check_rel_coverage → "
          "gen_laws --check → check_upstream → check_all → jsdom。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
