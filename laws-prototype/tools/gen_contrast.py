#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_contrast.py — 辨析型（对照页）种子批：易混规律对照页数据。

事实源：
  - 内容（机制一句话 kid / 例句 / 病例）：model/laws_master.json 的 lawdata 分仓；
  - 结构规格：model/contrast_pages.json（律对、双方短名、例句/病例下标、basis
    设计依据）。本生成器只做「派生 + 断言」，不新编任何句子。

生成物：主文件 `var CONTRAST`（每页已按下标拉实的对照数据 + byLaw 反查表）。
呈现由主文件手写渲染器 window['CX']（.cx-scope）读此数据绘索引页与对照页，
LINKGO.relSectionHTML 在「⚖️ 对照着看」组后按 byLaw 挂辨析页按钮。渲染器与
钩子是代码、不是数据，不在本生成器管辖内（--check 另断言其标记存在，防误删）。

纪律（零自由编造，与图式卡波同口径）：
  - 律对必须在总表 relations_teaching 中登记为「对照」（任一方向），否则报错；
  - 双方短名逐片段断言 ∈ 该律自有材料 blob（lawdata 的 hl/kid/机制/例句/病例）；
  - 例句/病例正文一律下标引用，生成时从总表拉取，不许在规格里手抄；
  - 每侧至少 2 条例句；分水岭与天坑的下标逐一验界；天坑可为 null（如实标缺）；
  - basis 是规格内的设计依据注记，不进生成物。

用法：
  python3 tools/gen_contrast.py --check   # 再生比对，退出码 0=逐字节一致
  python3 tools/gen_contrast.py --write   # 写回主文件
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model" / "laws_master.json"
SPEC = ROOT / "model" / "contrast_pages.json"

STAMP = "/* GENERATED: tools/gen_contrast.py ← model/laws_master.json(lawdata) + model/contrast_pages.json · DO NOT EDIT */"
JD = lambda o: json.dumps(o, ensure_ascii=False)
SPLIT_RE = re.compile(r"[：:、，,·—–\-→×✓✗⚑▲★●○（）()「」『』“”‘’\"'\\/\\s+…⋯;；。！？!?|｜【】\[\]]+")

# 呈现侧标记（手写代码，--check 只验存在，防被误删）
RENDER_MARKS = ["window['CX']", "id=\"v-contrast\"", "id=\"v-contrast-detail\"",
                "CX_HOOK", "CX.openIndex()"]


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


def script_blocks(text):
    out = []
    for m in re.finditer(r"<script[^>]*>", text):
        e = text.index("</script>", m.end())
        out.append((m.start(), e + len("</script>"), text[m.end():e]))
    return out


def law_blob(ld):
    parts = [ld.get("hl") or "", ld.get("kid") or ""]
    for b in ld.get("mech") or []:
        parts += [b.get("beat") or "", b.get("kid") or ""]
    for e in ld.get("exs") or []:
        parts += [e.get("s") or "", e.get("note") or "", e.get("grp") or ""]
    for c in ld.get("cases") or []:
        parts += [c.get("wrong") or "", c.get("right") or "", c.get("type") or ""]
    return "\n".join(parts)


def audit_label(lid, blob, label, where):
    if not isinstance(label, str) or not label.strip():
        fail(f"{lid} {where}: 短名为空")
    frags = [f for f in SPLIT_RE.split(label) if f]
    if not frags:
        fail(f"{lid} {where}: 短名 {label!r} 切分后无片段")
    low = blob.lower()
    for f in frags:
        if f.lower() not in low:
            fail(f"{lid} {where}: 短名片段 {f!r}（出自 {label!r}）不在该律自有材料中")


def ex_at(pid, ld, i, where):
    exs = ld.get("exs") or []
    if not isinstance(i, int) or i < 0 or i >= len(exs):
        fail(f"{pid} {where}: 例句下标 {i} 越界（{ld['id']} 共 {len(exs)} 例）")
    e = exs[i]
    out = {"s": e.get("s") or ""}
    if e.get("note"):
        out["note"] = e["note"]
    if e.get("grp"):
        out["grp"] = e["grp"]
    return out


def case_at(pid, ld, i, where):
    cs = ld.get("cases") or []
    if not isinstance(i, int) or i < 0 or i >= len(cs):
        fail(f"{pid} {where}: 病例下标 {i} 越界（{ld['id']} 共 {len(cs)} 例）")
    c = cs[i]
    return {"wrong": c.get("wrong") or "", "right": c.get("right") or "",
            "type": c.get("type") or ""}


def build_pages():
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    byid = {x["id"]: x for x in master}
    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    pages, by_law, seen_pairs = [], {}, set()
    for p in spec["pages"]:
        pid = p["id"]
        a, b = p["a"], p["b"]
        if a == b:
            fail(f"{pid}: 律对两侧相同")
        key = tuple(sorted((a, b)))
        if key in seen_pairs:
            fail(f"{pid}: 律对 {key} 重复")
        seen_pairs.add(key)
        rel_ok = False
        for x, y in ((a, b), (b, a)):
            for r in (byid.get(x) or {}).get("relations_teaching") or []:
                if r.get("id") == y and r.get("kind") == "对照":
                    rel_ok = True
        if not rel_ok:
            fail(f"{pid}: {a} × {b} 未在 relations_teaching 登记为「对照」")
        sides = {}
        for tag, lid, exkey, namekey in (("a", a, "aEx", "aName"), ("b", b, "bEx", "bName")):
            law = byid.get(lid)
            if not law or not law.get("lawdata"):
                fail(f"{pid}: {lid} 在总表中无 lawdata")
            ld = law["lawdata"]
            audit_label(lid, law_blob(ld), p[namekey], f"{pid}.{namekey}")
            idxs = p[exkey]
            if len(idxs) < 2:
                fail(f"{pid}: {lid} 侧例句不足 2 条（种子批口径：每侧 ≥2 例）")
            sides[tag] = {"id": lid, "name": p[namekey], "kid": ld.get("kid") or "",
                          "exs": [ex_at(pid, ld, i, f"{pid}.{exkey}") for i in idxs]}
        w = p["watershed"]
        if w["kind"] == "case":
            ld = byid[w["law"]]["lawdata"]
            ws = {"kind": "case", "law": w["law"], **case_at(pid, ld, w["case"], f"{pid}.watershed")}
        elif w["kind"] == "exSingle":
            ld = byid[w["law"]]["lawdata"]
            ws = {"kind": "exSingle", "law": w["law"], **ex_at(pid, ld, w["ex"], f"{pid}.watershed")}
        elif w["kind"] == "exPair":
            ws = {"kind": "exPair",
                  "a": ex_at(pid, byid[a]["lawdata"], w["aEx"], f"{pid}.watershed.a"),
                  "b": ex_at(pid, byid[b]["lawdata"], w["bEx"], f"{pid}.watershed.b")}
        else:
            fail(f"{pid}: 未知分水岭形态 {w['kind']}")
        pit = None
        if p.get("pit"):
            ld = byid[p["pit"]["law"]]["lawdata"]
            pit = {"law": p["pit"]["law"], **case_at(pid, ld, p["pit"]["case"], f"{pid}.pit")}
        pages.append({"id": pid, "a": sides["a"], "b": sides["b"],
                      "watershed": ws, "pit": pit})
        for lid in (a, b):
            by_law.setdefault(lid, []).append(pid)
    return {"pages": pages, "byLaw": by_law}


def render_block(data):
    return "<script>\n" + STAMP + "\nvar CONTRAST=" + JD(data) + ";\n</script>\n"


def locate(text):
    hits = [(s, e) for s, e, _ in script_blocks(text) if "var CONTRAST=" in text[s:e]]
    if len(hits) > 1:
        fail("CONTRAST 块多于一个")
    return hits[0] if hits else None


def anchor_start(text):
    hits = [s for s, e, _ in script_blocks(text) if "var ROSTER=" in text[s:e]]
    if len(hits) != 1:
        fail(f"ROSTER 锚点块命中 {len(hits)}")
    return hits[0]


def main(argv):
    if len(argv) < 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    text = MAIN.read_text(encoding="utf-8")
    data = build_pages()
    block = render_block(data)
    loc = locate(text)
    if argv[1] == "--check":
        if not loc:
            print("FAIL: CONTRAST 生成块不存在（先 --write）")
            return 1
        cur = text[loc[0]:loc[1]] + "\n"
        if cur != block:
            print("FAIL: CONTRAST 与重新生成不一致（总表/规格已变，需复核后 --write）")
            return 1
        for mk in RENDER_MARKS:
            if mk not in text:
                print(f"FAIL: 呈现标记缺失：{mk}（渲染器/视图/钩子被误删？）")
                return 1
        print(f"PASS: CONTRAST 逐字节一致（{len(data['pages'])} 页，律对关系与短名对源断言通过，呈现标记齐）")
        return 0
    if loc:
        new = text[:loc[0]] + block.rstrip("\n") + text[loc[1]:]
    else:
        at = anchor_start(text)
        new = text[:at] + block + text[at:]
    MAIN.write_text(new, encoding="utf-8")
    print(f"写回完成：CONTRAST {len(data['pages'])} 页，覆盖 {len(data['byLaw'])} 条律")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
