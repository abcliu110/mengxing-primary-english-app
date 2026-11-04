#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_rel_coverage.py — 关系户口门禁（2026-11-05，Bug 第 11 轮 R11-01 修复登记）。

断言：运行时 LAWDATA.rel 的全部有向边都必须出现在 LINKIDX.g 中——
  1) 对级：每条边 (a, b) ∈ LINKIDX.g 边集（g 的 p/q/k/c/r/s 六槽按
     gen_links 的生成语义折算为有向对：p=(a→b) 前置、q 为其反向登记、
     k/c 为双向并集、r 为裁定出边、s 为裁定入边）；
  2) 类级：每条边的 kind 必须落在对应槽（前置→p、同族→k、对照→c）。

背景：R11-01 确诊 158+5 条规律的 rel 只存在于 PHONLAWS/SUPPDATA 字面量
（运行时并入 LAWDATA），从未迁入总表 laws_master 的 relations_teaching
户口，LINKIDX.g 无条目、规律页「相关规律」块整组不渲染。规律关系只许
住总表（relations 裁定型 + relations_teaching 教学型），LAWDATA.rel 与
LINKIDX.g 一律由总表派生（gen_laws / gen_links）；本门禁防户口外自留
rel 复发——凡 rel 边在 g 中无对位即报红。

运行时 LAWDATA 口径与 App 一致：基础字面量 ← PHONLAWS 覆写 ← SUPPDATA
覆写（gen_roster 同通道）。

用法：
  python3 tools/check_rel_coverage.py            # 校验主文件
  python3 tools/check_rel_coverage.py <html路径>  # 校验指定副本（自证用）
退出码：0=通过；1=断言失败；2=用法/解析错误。
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "mengxing-prototype-v1.html"
SLOT_OF_KIND = {"前置": "p", "同族": "k", "对照": "c"}


def fail(msg):
    print("FAIL:", msg)
    return 1


def scan_literal(s, p):
    op = s[p]
    cl = "}" if op == "{" else "]"
    d, ins, esc, k = 0, None, False, p
    while k < len(s):
        c = s[k]
        if ins:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == ins:
                ins = None
        else:
            if c in "\"'`":
                ins = c
            elif c == op:
                d += 1
            elif c == cl:
                d -= 1
                if d == 0:
                    return k + 1
        k += 1
    raise ValueError("字面量定界失败")


def get_literal(text, anchor):
    i = text.index(anchor)
    p = i + len(anchor)
    while text[p] in " \t\n":
        p += 1
    return json.loads(text[p:scan_literal(text, p)])


def main(argv):
    path = Path(argv[1]) if len(argv) > 1 else MAIN
    if len(argv) > 2:
        print(__doc__)
        return 2
    try:
        text = path.read_text(encoding="utf-8")
        merged = get_literal(text, "var LAWDATA=")
        for anchor in ("var PHONLAWS=", "var SUPPDATA="):
            for k, v in get_literal(text, anchor).items():
                merged[k] = v
        g = get_literal(text, "var LINKIDX =")["g"]
    except Exception as ex:
        print("FAIL: 解析失败：", ex)
        return 2

    pairs = set()
    for a, ga in g.items():
        for b in ga.get("p") or []:
            pairs.add((a, b))
        for b in ga.get("q") or []:
            pairs.add((b, a))
        for slot in ("k", "c"):
            for b in ga.get(slot) or []:
                pairs.add((a, b))
                pairs.add((b, a))
        for x in ga.get("r") or []:
            pairs.add((a, x[0]))
        for x in ga.get("s") or []:
            pairs.add((x[0], a))

    edges = []
    for a, entry in merged.items():
        for e in entry.get("rel") or []:
            edges.append((a, e["id"], e["rel"]))

    miss_pair, miss_kind = [], []
    for a, b, kind in edges:
        if (a, b) not in pairs:
            miss_pair.append((a, b, kind))
        slot = SLOT_OF_KIND.get(kind)
        if slot is None or b not in ((g.get(a) or {}).get(slot) or []):
            miss_kind.append((a, b, kind))

    if miss_pair or miss_kind:
        if miss_pair:
            fail(f"LAWDATA.rel 有 {len(miss_pair)}/{len(edges)} 条边未入 LINKIDX.g 边集"
                 f"（户口外自留 rel），首例：{miss_pair[:5]}")
        if miss_kind:
            fail(f"LAWDATA.rel 有 {len(miss_kind)}/{len(edges)} 条边 kind 未落 LINKIDX.g 对应槽"
                 f"，首例：{miss_kind[:5]}")
        return 1
    print(f"PASS: LAWDATA.rel {len(edges)} 条有向边全部 ⊆ LINKIDX.g 边集且 kind 槽对位"
          f"（覆盖 {len({a for a, _, _ in edges})} 条规律）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
