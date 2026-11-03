#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全册规律名册生成器（《数据源规范》§3：内嵌副本只能由脚本生成）。

背景：运行时一直没有完整的 456 律名册——家长地图（MXP）靠 LAWDATA ∪
MZLAWS ∪ 静态 [data-law] 三处临时拼凑「暂未配练习」清单，约 20 条律
（P 介词原则层 19 条 + CO-17 等总表独户）拼不出来、永远列不上。
本生成器把名册一次汇全，MXP 与总地图改读名册。

派生：主文件 `var ROSTER`（生成副本，不得手改）←
  model/laws_master.json（户口：id / 短名 / 家族 / 层级 / 裁定归一）
+ model/morph_data.json（LAWREG 在册 = 词根区路由）
+ 主文件现行字面量只读解析（LAWDATA 户口与 ptr 落点 / PN·AR·CJ 专区
  LAWS 在册——与 gen_links.py 解析现行路由同一通道，只读不改）。
  注意运行时 LAWDATA 是三段合并：基础字面量 + PHONLAWS（S/SR）+
  SUPPDATA（支撑层）由 App 内 Object.keys 合并代码拼成（与 App 同序
  复刻合并，户口以合并后为准）。

每条记录 [name, fam, layer, route, target]：
  name   显示名：canonical.title → 专区 short → lawdata hl →
         yaml headline → LAWREG _short 的顺序取第一个非空
  fam    id 前缀（E/W/NE/GR/TA/S/P/PB/TM/…）
  layer  K=孩子层 / T=教师·设计层（yaml audience、lawdata aud、
         LAWDATA zone=parents 任一命中即 T）
  route  呈现面落点（与 LINKGO.openLaw 的现行解析同构）：
         L=LAW 律页 / P=代词区 / A=冠词区 / C=连词区 / M=词根区 /
         N=时态站整站页（TA 律在 TN 区，无逐律 LINKGO 路由）/
         ''=App 内暂无律页（总表独户，如 P 层与 CO-17，如实登记）
  target 改名/合并旧编号的现行条目 id（ruling.status 的
         promoted:/merged_into: 目标）；非旧编号为空串
断言：名册条数 == 总表条数（456）；旧编号目标必须在册；
route 分布每次生成打印，分布突变会在 --check 差异中现形。

用法：
  python3 tools/gen_roster.py --check   # 只比对，退出码 0=逐字节一致
  python3 tools/gen_roster.py --write   # 写回主文件
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model" / "laws_master.json"
MORPH = ROOT / "model" / "morph_data.json"

STAMP = "/* GENERATED: tools/gen_roster.py ← model/laws_master.json + model/morph_data.json + 现行专区路由 · DO NOT EDIT */"
JD = lambda o: json.dumps(o, ensure_ascii=False)
TEACHER_AUD = {"教师/设计层", "teacher", "design"}
PTR_ROUTE = {"pron": "P", "art": "A", "conj": "C", "morph": "M"}
ZONE_ROUTE = {"pn": "P", "ar": "A", "cj": "C"}


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


# ---- 主文件字面量只读解析（与 extract_review_data.py 同构） ----
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


def script_blocks(text):
    out = []
    for m in re.finditer(r"<script[^>]*>", text):
        e = text.index("</script>", m.end())
        out.append((m.start(), e + len("</script>"), text[m.end():e]))
    return out


def find_block(text, signature):
    hits = [b for b in script_blocks(text) if signature in b[2]]
    if len(hits) != 1:
        raise ValueError(f"块签名 {signature!r} 命中 {len(hits)} 块")
    return hits[0]


def get_literal(body, anchor_re):
    m = re.search(anchor_re, body)
    if not m:
        raise ValueError(f"锚点 {anchor_re} 未命中")
    p = body.index("=", m.start()) + 1
    while body[p] in " \t\n":
        p += 1
    return json.loads(body[p:scan_literal(body, p)])


def build_roster(text):
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    morph = json.loads(MORPH.read_text(encoding="utf-8"))
    lawreg = morph.get("lawreg") or {}
    _, _, law_blk = find_block(text, "var LAWFLAG")
    lawdata_app = get_literal(law_blk, r"var\s+LAWDATA\s*=")
    # 运行时合并复刻：基础字面量 + PHONLAWS + SUPPDATA（App 内同序合并）
    _, _, phon_blk = find_block(text, "var PHONLAWS=")
    for k, v in get_literal(phon_blk, r"var\s+PHONLAWS\s*=").items():
        lawdata_app.setdefault(k, v)
    _, _, supp_blk = find_block(text, "var SUPPDATA=")
    for k, v in get_literal(supp_blk, r"var\s+SUPPDATA\s*=").items():
        lawdata_app.setdefault(k, v)
    zone_ids = {}
    for src_key, sig in (("pn", "window.PN = {"), ("ar", "window.AR = {"), ("cj", "window.CJ = {")):
        _, _, body = find_block(text, sig)
        laws = get_literal(body, r"(?:var|const|let)\s+LAWS\s*=")
        zone_ids[src_key] = {e["id"] for e in laws}

    by = {r["id"]: r for r in master}
    roster = {}
    pending_route = []
    for r in master:
        lid = r["id"]
        can = r.get("canonical") or {}
        y = r.get("yaml") or {}
        ld = r.get("lawdata") or {}
        zw = r.get("zone") if isinstance(r.get("zone"), dict) else None
        zd = (zw or {}).get("data") or {}
        name = (can.get("title") or zd.get("short") or ld.get("hl")
                or y.get("headline")
                or (lawreg.get(lid) or {}).get("_short")
                or (lawreg.get(lid) or {}).get("headline") or lid)
        fam = lid.split("-")[0] if "-" in lid else lid
        app_e = lawdata_app.get(lid) or {}
        layer = "T" if (y.get("audience") in TEACHER_AUD
                        or ld.get("aud") == "教师/设计层"
                        or app_e.get("aud") == "教师/设计层"
                        or app_e.get("zone") == "parents") else "K"
        status = (r.get("ruling") or {}).get("status") or ""
        target = ""
        if status.startswith("promoted:") or status.startswith("merged_into:"):
            target = status.split(":", 1)[1]
            if target not in by:
                fail(f"{lid} 的归一目标 {target} 不在总表")
        roster[lid] = [name, fam, layer, "", target]
        pending_route.append(lid)

    def route_of(lid, seen=()):
        r = by[lid]
        status = (r.get("ruling") or {}).get("status") or ""
        if status.startswith("promoted:") or status.startswith("merged_into:"):
            tgt = status.split(":", 1)[1]
            if tgt in seen:
                fail(f"归一链成环：{lid}")
            return route_of(tgt, seen + (lid,))
        app_e = lawdata_app.get(lid) or {}
        ptr = app_e.get("ptr") or {}
        if ptr.get("zone") in PTR_ROUTE:
            return PTR_ROUTE[ptr["zone"]]
        if lid in lawdata_app:
            return "L"
        if lid.startswith("TA-"):
            return "N"  # 时态站整站页（TN 区），无逐律路由
        for src_key, ids in zone_ids.items():
            if lid in ids:
                return ZONE_ROUTE[src_key]
        if lid in lawreg:
            return "M"
        return ""

    for lid in pending_route:
        roster[lid][3] = route_of(lid)
    if len(roster) != len(master):
        fail(f"名册 {len(roster)} != 总表 {len(master)}")
    return roster


def render_block(roster):
    return "<script>\n" + STAMP + "\nvar ROSTER=" + JD(roster) + ";\n</script>\n"


def locate(text):
    hits = [(s, e) for s, e, _ in script_blocks(text) if "var ROSTER=" in text[s:e]]
    if len(hits) > 1:
        fail("ROSTER 块多于一个")
    return hits[0] if hits else None


def mxp_block_start(text):
    hits = [s for s, e, _ in script_blocks(text) if "家长视图「孩子的掌握地图」（MXP）" in text[s:e]]
    if len(hits) != 1:
        fail(f"MXP 块命中 {len(hits)}")
    return hits[0]


def main(argv):
    if len(argv) < 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    text = MAIN.read_text(encoding="utf-8")
    roster = build_roster(text)
    block = render_block(roster)
    loc = locate(text)
    if argv[1] == "--check":
        if not loc:
            print("FAIL: ROSTER 生成块不存在（先 --write）")
            return 1
        cur = text[loc[0]:loc[1]] + "\n"
        if cur != block:
            print("FAIL: ROSTER 与重新生成不一致（总表/专区路由已变，需复核后 --write）")
            return 1
        import collections
        dist = collections.Counter(v[3] or "(无页)" for v in roster.values())
        print(f"PASS: ROSTER 逐字节一致（{len(roster)} 条，路由分布 {dict(dist)}）")
        return 0
    if loc:
        new = text[:loc[0]] + block.rstrip("\n") + text[loc[1]:]
    else:
        at = mxp_block_start(text)
        new = text[:at] + block + text[at:]
    MAIN.write_text(new, encoding="utf-8")
    import collections
    dist = collections.Counter(v[3] or "(无页)" for v in roster.values())
    print(f"写回完成：ROSTER {len(roster)} 条，路由分布 {dict(dist)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
