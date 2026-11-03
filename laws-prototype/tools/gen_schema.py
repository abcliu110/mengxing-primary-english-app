#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_schema.py — 学习阶段 4 首件：无白板规律的静态机制图式卡（TA 18 律首批）。

事实源：
  - 内容（机制/例句/病例）：model/laws_master.json 的 TA yaml 分仓（与上游
    model/laws/grammar_ext.yaml 逐字段一致，check_upstream 链把关）；
  - 结构规格：model/schema_cards.json（每律的图式原型、几何、内容下标引用、
    少量标签与 basis 设计依据）。本生成器只做「派生 + 断言」，不新编任何句子。

生成物：主文件 `var SCHEMA_TA`（18 律全量解析后的卡片数据：例句/病例正文已按
下标拉实、标题按 beat 下标拉实、grp 按下标拉实）。呈现由主文件手写渲染器
window['SCHEMA_TA_RENDER'] 读此数据绘内联 SVG，VB.openTA 在机制段后、例句段
前调用。渲染器与钩子是代码、不是数据，不在本生成器管辖内（--check 另断言
钩子与渲染器标记存在，防被误删）。

标签纪律（零自由编造，与例句三波同口径）：
  - schema_cards.json 中一切字面量标签（栏题/标记题/步名/行文案/格文案等）
    逐片段断言 ∈ 该律自有材料 blob（headline/headline_kid/claim/mechanism 的
    beat·text_kid·text_adult·visual/examples 的 sentence·scene_note·grp/
    error_cases 全字段）。片段 = 按标点与图式符号切分后的连续串，长度 ≥2 的
    片段必须逐字命中 blob（拉丁片段不分大小写）；长度 1 的片段（如「了」）
    同样必须命中。任一不过即报错停机，不静默放行。
  - 例句/病例正文一律下标引用，生成时从总表拉取；hl 高亮词断言 ∈ 对应句；
    grid 例句格的 rk/ck 断言 ∈ 该例句 scene_note（格位主张须有注文为据）。
  - basis 字段是规格内的设计依据注记，不进生成物（留在事实源文件与波次报告）。

用法：
  python3 tools/gen_schema.py --check   # 再生比对，退出码 0=逐字节一致
  python3 tools/gen_schema.py --write   # 写回主文件
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model" / "laws_master.json"
SPEC = ROOT / "model" / "schema_cards.json"

STAMP = "/* GENERATED: tools/gen_schema.py ← model/laws_master.json(TA yaml 分仓) + model/schema_cards.json · DO NOT EDIT */"
JD = lambda o: json.dumps(o, ensure_ascii=False)

PROTOS = {"axis", "panels", "grid", "path"}
GLYPHS = {"tag", "plus", "frame", "zoom", "sign", "wheel", "road", "flash",
          "smile", "cloud", "quote", "table", "cal", "bubble", "flask"}
AXIS_MARKS = {"point", "span", "dur", "flag", "ghost", "ring", "frame", "crack"}
SPLIT_RE = re.compile(r"[：:、，,·—–\-→×✓✗⚑▲★●○（）()「」『』“”‘’\"'\\/\s+…⋯;；。！？!?|｜【】\[\]]+")


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


# ---- 主文件脚本块定位（与 gen_roster.py 同构） ----
def script_blocks(text):
    out = []
    for m in re.finditer(r"<script[^>]*>", text):
        e = text.index("</script>", m.end())
        out.append((m.start(), e + len("</script>"), text[m.end():e]))
    return out


def law_blob(y):
    parts = [y.get("headline") or "", y.get("headline_kid") or ""]
    cl = y.get("claim") or {}
    parts += [cl.get("statement") or "", cl.get("scope") or ""]
    for ex in cl.get("exceptions") or []:
        parts.append(ex.get("note") or "")
    for b in y.get("mechanism") or []:
        parts += [b.get("beat") or "", b.get("text_kid") or "",
                  b.get("text_adult") or "", b.get("visual") or ""]
    for e in y.get("examples") or []:
        parts += [e.get("sentence") or "", e.get("scene_note") or "", e.get("grp") or ""]
    for c in y.get("error_cases") or []:
        parts += [c.get("wrong") or "", c.get("right") or "",
                  c.get("error_type") or "", c.get("diagnosis") or ""]
    ad = y.get("adult") or {}
    if isinstance(ad, dict):
        parts.append(ad.get("boundary") or "")
    return "\n".join(parts)


def audit_label(lid, blob, label, where):
    """标签逐片段断言 ∈ 该律自有材料 blob。"""
    if not isinstance(label, str) or not label.strip():
        fail(f"{lid} {where}: 标签为空")
    frags = [f for f in SPLIT_RE.split(label) if f]
    if not frags:
        fail(f"{lid} {where}: 标签 {label!r} 切分后无片段")
    low = blob.lower()
    for f in frags:
        if f.lower() not in low:
            fail(f"{lid} {where}: 标签片段 {f!r}（出自 {label!r}）不在该律自有材料中")


def ex_of(lid, y, i, where):
    exs = y.get("examples") or []
    if not isinstance(i, int) or i < 0 or i >= len(exs):
        fail(f"{lid} {where}: 例句下标 {i} 越界（共 {len(exs)} 例）")
    return exs[i]


def resolve_foot(lid, y, blob, foot):
    out = []
    for j, f in enumerate(foot or []):
        w = f"foot[{j}]"
        if "case" in f:
            cs = y.get("error_cases") or []
            i = f["case"]
            if not isinstance(i, int) or i < 0 or i >= len(cs):
                fail(f"{lid} {w}: 病例下标 {i} 越界（共 {len(cs)} 例）")
            out.append({"case": {"wrong": cs[i]["wrong"], "right": cs[i]["right"]}})
        elif "g_grp" in f:
            g = ex_of(lid, y, f["g_grp"], w)
            ss = [ex_of(lid, y, i, w)["sentence"] for i in f.get("ss") or []]
            out.append({"label": g["grp"], "ss": ss})
        elif "label" in f:
            audit_label(lid, blob, f["label"], w)
            lines = f.get("lines") or []
            for ln in lines:
                audit_label(lid, blob, ln, w)
            out.append({"label": f["label"], "lines": lines})
        else:
            fail(f"{lid} {w}: 未知 foot 形态 {sorted(f.keys())}")
    return out


def build_cards():
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    spec = json.loads(SPEC.read_text(encoding="utf-8"))["cards"]
    tas = {}
    for r in master:
        if str(r.get("id", "")).startswith("TA-"):
            tas[r["id"]] = r.get("yaml") or {}
    if sorted(spec.keys()) != sorted(tas.keys()):
        fail(f"规格律集 {sorted(spec.keys())} != 总表 TA 律集 {sorted(tas.keys())}")
    out = {}
    for lid in sorted(tas.keys()):
        y, sp = tas[lid], spec[lid]
        blob = law_blob(y)
        p = sp.get("p")
        if p not in PROTOS:
            fail(f"{lid}: 未知原型 {p!r}")
        card = {"p": p}
        t = sp.get("title") or {}
        if "beat" in t:
            beats = y.get("mechanism") or []
            i = t["beat"]
            if i < 0 or i >= len(beats):
                fail(f"{lid}: title beat 下标 {i} 越界")
            card["title"] = beats[i]["beat"]
        elif "t" in t:
            audit_label(lid, blob, t["t"], "title")
            card["title"] = t["t"]
        else:
            fail(f"{lid}: title 缺失")
        if p == "axis":
            zones = []
            for z in sp.get("zones") or []:
                audit_label(lid, blob, z["t"], "zones")
                x = z["x"]
                if not (0 <= x[0] < x[1] <= 1):
                    fail(f"{lid}: zone 区间非法 {x}")
                zones.append({"t": z["t"], "x": x})
            card["zones"] = zones
            marks = []
            for mk in sp.get("marks") or []:
                if mk["k"] not in AXIS_MARKS:
                    fail(f"{lid}: 未知 axis 标记 {mk['k']!r}")
                m2 = {"k": mk["k"], "x": mk["x"]}
                if "t" in mk:
                    audit_label(lid, blob, mk["t"], "marks")
                    m2["t"] = mk["t"]
                marks.append(m2)
            card["marks"] = marks
            arrs = []
            for a in sp.get("arrows") or []:
                audit_label(lid, blob, a["t"], "arrows")
                arrs.append({"x": a["x"], "t": a["t"], "k": a.get("k", "norm")})
            card["arrows"] = arrs
            pins = []
            for pn in sp.get("pins") or []:
                e = ex_of(lid, y, pn["ex"], "pins")
                pins.append({"x": pn["x"], "s": e["sentence"]})
            card["pins"] = pins
        elif p == "panels":
            if "head" in sp:
                audit_label(lid, blob, sp["head"], "head")
                card["head"] = sp["head"]
            if "between" in sp:
                audit_label(lid, blob, sp["between"], "between")
                card["between"] = sp["between"]
            cols = []
            for ci, c in enumerate(sp.get("cols") or []):
                w = f"cols[{ci}]"
                if c.get("g") not in GLYPHS:
                    fail(f"{lid} {w}: 未知 glyph {c.get('g')!r}")
                c2 = {"g": c["g"]}
                if "t_grp" in c:
                    c2["t"] = ex_of(lid, y, c["t_grp"], w)["grp"]
                elif "t" in c:
                    audit_label(lid, blob, c["t"], w)
                    c2["t"] = c["t"]
                else:
                    fail(f"{lid} {w}: 栏题缺失")
                if c.get("tone"):
                    c2["tone"] = c["tone"]
                lines = []
                for ln in c.get("lines") or []:
                    audit_label(lid, blob, ln, w)
                    lines.append(ln)
                if lines:
                    c2["lines"] = lines
                chips = []
                for ch in c.get("chips") or []:
                    audit_label(lid, blob, ch, w)
                    chips.append(ch)
                if chips:
                    c2["chips"] = chips
                ss = [ex_of(lid, y, i, w)["sentence"] for i in c.get("ss") or []]
                if ss:
                    c2["ss"] = ss
                if "hl" in c:
                    if not ss or c["hl"] not in ss[0]:
                        fail(f"{lid} {w}: hl {c['hl']!r} 不在首句中")
                    c2["hl"] = c["hl"]
                cols.append(c2)
            card["cols"] = cols
        elif p == "grid":
            for nm in ("rows", "cols"):
                for lab in sp.get(nm) or []:
                    audit_label(lid, blob, lab, nm)
            card["rows"] = sp["rows"]
            card["cols"] = sp["cols"]
            if "rowH" in sp:
                audit_label(lid, blob, sp["rowH"], "rowH")
                card["rowH"] = sp["rowH"]
            if "colH" in sp:
                audit_label(lid, blob, sp["colH"], "colH")
                card["colH"] = sp["colH"]
            cells = {}
            for key, cell in (sp.get("cells") or {}).items():
                w = f"cells[{key}]"
                if "ex" in cell:
                    e = ex_of(lid, y, cell["ex"], w)
                    note = e.get("scene_note") or ""
                    for kw in (cell.get("rk"), cell.get("ck")):
                        if kw and kw not in note:
                            fail(f"{lid} {w}: 格位关键词 {kw!r} 不在例句注 {note!r} 中")
                    cells[key] = {"s": e["sentence"]}
                elif "t" in cell:
                    audit_label(lid, blob, cell["t"], w)
                    cells[key] = {"t": cell["t"]}
                elif cell.get("dot"):
                    cells[key] = {"dot": 1}
                else:
                    fail(f"{lid} {w}: 未知 cell 形态 {sorted(cell.keys())}")
            card["cells"] = cells
        elif p == "path":
            steps = []
            for si, s in enumerate(sp.get("steps") or []):
                audit_label(lid, blob, s["t"], f"steps[{si}]")
                s2 = {"t": s["t"]}
                if "sub" in s:
                    audit_label(lid, blob, s["sub"], f"steps[{si}]")
                    s2["sub"] = s["sub"]
                steps.append(s2)
            card["steps"] = steps
            if sp.get("asc"):
                card["asc"] = 1
        card["foot"] = resolve_foot(lid, y, blob, sp.get("foot"))
        out[lid] = card
    return out


def render_block(cards):
    return "<script>\n" + STAMP + "\nvar SCHEMA_TA=" + JD(cards) + ";\n</script>\n"


def locate(text):
    hits = [(s, e) for s, e, _ in script_blocks(text) if "var SCHEMA_TA=" in text[s:e]]
    if len(hits) > 1:
        fail("SCHEMA_TA 块多于一个")
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
    cards = build_cards()
    block = render_block(cards)
    loc = locate(text)
    if argv[1] == "--check":
        if not loc:
            print("FAIL: SCHEMA_TA 生成块不存在（先 --write）")
            return 1
        cur = text[loc[0]:loc[1]] + "\n"
        if cur != block:
            print("FAIL: SCHEMA_TA 与重新生成不一致（总表/规格已变，需复核后 --write）")
            return 1
        print(f"PASS: SCHEMA_TA 逐字节一致（{len(cards)} 律，全量标签对源断言通过）")
        return 0
    if loc:
        new = text[:loc[0]] + block.rstrip("\n") + text[loc[1]:]
    else:
        at = anchor_start(text)
        new = text[:at] + block + text[at:]
    MAIN.write_text(new, encoding="utf-8")
    import collections
    dist = collections.Counter(c["p"] for c in cards.values())
    print(f"写回完成：SCHEMA_TA {len(cards)} 律，原型分布 {dict(dist)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
