#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fill_zone_examples.py — 学习改善·阶段 2 第四波（专区呈现面例句补齐）。

范围（PB 介词不在范围，不碰）：
  - PN 区：GR-10/13/14 + PR-01…15 + QI-01…15（master zone.data examples，总表+PN LAWS 镜像）
  - AR 区：GR-15 + C-01…20（master zone.data examples，总表+AR LAWS 镜像）
  - CJ 区：GR-11/32/38 目录条 + GR-46…50（数据件 NEW-CJ02/04/05/06/07/10/11/12）
          + 呈现位 NEW-CJ03/08/09（master zone.data examples，总表+CJ LAWS 镜像；合并面按
          gen_laws.cj_merge 的拼接序重建文件 examples）
  - MZ 区：GR-28/29 + V-15/20/21/26/30/32…38（LAWREG _groups 追加例句组；
          morph_data.json lawreg 与总表 zone.data 双落点同值，gen_morph 重生成两文件）

口径：docs/variation-spec.md（≥10 有效例、同构合并计数、分组 100%、边界组 ≥1、
三通道 orig/own/gen 逐句 src 登记、note 孩子白话零行话、原例 s/note 逐字保留）。
规格数据在 ~/workspace/laws-merge-2026-11-03/stage2d-work/spec-*.json（逐律变式表+分组+新句）。

用法：
  python3 tools/fill_zone_examples.py          # --dry：全量校验+构造，不写回
  python3 tools/fill_zone_examples.py --apply  # 写回总表/morph_data → gen_morph 两文件 → 主文件区字面量
写回后须跑：python3 tools/gen_laws.py --check && python3 tools/check_all.py
"""
import copy
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "model" / "laws_master.json"
MORPH_DATA = ROOT / "model" / "morph_data.json"
MAIN = ROOT / "mengxing-prototype-v1.html"
MORPH_PAGE = ROOT / "morphology-prototype-v1.html"
WORK = Path.home() / "workspace" / "laws-merge-2026-11-03" / "stage2d-work"

sys.path.insert(0, str(ROOT / "tools"))
import fill_grta_examples as E  # noqa: E402  校验引擎：token/形态/note 行话/同构骨架
import gen_laws as GL  # noqa: E402

JD = GL.JD
JDC = GL.JDC
fail = E.fail

import re as _re
_PROPER_POSS = _re.compile(
    r"\b(" + "|".join(sorted((set(E.PROPER) | {x.lower() for x in E.NAMES}), key=len, reverse=True)) + r")'s\b",
    _re.I)

# 本律呈现面材料词放行（专区口径）：新句槽词除词库/动词表外，可用该律**呈现面自有材料**
# 里已登记的词（CJ 的 therefore 等连接副词、MZ 的 cacti/data 等成员词表面形）——材料限
# kid 面字段（examples/errors/groups/beats(kid)/quiz/kid/claim/desc/short/statement/
# boundary/_groups），成人层（adult/formal/sources）不作放行依据。放行只作用于校验，
# 不改句子本身；ALLOW_SETS 在 main() 里按条目构造。
ALLOW_SETS = {}


def _blob_tokens(obj, skip_keys=("adult", "formal", "sources", "aud")):
    toks = set()

    def walk(o, key=None):
        if isinstance(o, dict):
            for k, v in o.items():
                if k in skip_keys:
                    continue
                walk(v, k)
        elif isinstance(o, list):
            for v in o:
                walk(v, key)
        elif isinstance(o, str):
            for t in _re.findall(r"[A-Za-z']+", o.lower()):
                toks.add(t.strip("'"))

    walk(obj)
    return toks


def check_sentence(lid, s):
    """引擎 check_sentence 的专区口径：①专名所有格按专名校验；②本律呈现面材料词放行。"""
    s2 = _PROPER_POSS.sub(lambda m: m.group(1), s)
    allow = ALLOW_SETS.get(lid) or set()
    if allow:
        def rep(m):
            t = m.group(0)
            k = t.lower().strip("'")
            if k.endswith("'s"):
                k = k[:-2]
            return "the" if k in allow else t
        s2 = _re.sub(r"[A-Za-z']+", rep, s2)
    E.check_sentence(lid, s2)

PN_IDS = (["GR-10", "GR-13", "GR-14"] + [f"PR-{i:02d}" for i in range(1, 16)]
          + [f"QI-{i:02d}" for i in range(1, 16)])
AR_IDS = ["GR-15"] + [f"C-{i:02d}" for i in range(1, 21)]
CJ_PARTS = {  # 文件条目 id -> 总表数据件 id 列表（合并序同 gen_laws.CJ_MERGES / RENAME）
    "GR-46": ["NEW-CJ02"], "GR-47": ["NEW-CJ04"],
    "GR-48": ["NEW-CJ05", "NEW-CJ06"], "GR-49": ["NEW-CJ10", "NEW-CJ11"],
    "GR-50": ["NEW-CJ07", "NEW-CJ12"],
    "GR-11": ["GR-11"], "GR-32": ["GR-32"], "GR-38": ["GR-38"],
    "NEW-CJ03": ["NEW-CJ03"], "NEW-CJ08": ["NEW-CJ08"], "NEW-CJ09": ["NEW-CJ09"],
}
CJ_SPEC_KEYS = ["GR-11", "GR-32", "GR-38", "NEW-CJ02", "NEW-CJ03", "NEW-CJ04", "NEW-CJ05",
                "NEW-CJ06", "NEW-CJ07", "NEW-CJ08", "NEW-CJ09", "NEW-CJ10", "NEW-CJ11", "NEW-CJ12"]
MZ_IDS = ["GR-28", "GR-29", "V-15", "V-20", "V-21", "V-26", "V-30", "V-32",
          "V-33", "V-34", "V-35", "V-36", "V-37", "V-38"]

# 原例 note 生产腔登记改写（CO/首波/第三波同口径：英文句逐字不动，仅 note 改孩子白话；
# 键 = (条目 id, 原 note 全文)，锚定不符即停）。改写后全表 note 扫描须 0。
NOTE_REWRITES = {
    ("QI-04", "条目儿童版登记例型——has 是排头兵"): "has 是排头兵：提问时它跑到句首打头阵",
    ("QI-04", "条目儿童版登记例型——无助动词时 do 补位出列"): "没有助动词的时候，do 出来补位提问",
    ("QI-05", "例外同框：对比焦点靠重音前移——清单边界登记例"): "例外同框：想对比哪个词，就把重音压到哪个词上",
    ("QI-07", "条目儿童版登记例型——时间前置作场景出发点"): "时间先出场：先把场景摆好，再说事情",
    ("QI-09", "清单支撑登记例——问目的，不定式作答，同为正宗"): "问目的，用 To … 回答：这样答很正宗",
    ("QI-09", "条目儿童版登记例（To get some books = 为了借书）"): "To get some books = 为了借几本书，目的就藏在 To 后面",
    ("QI-10", "边界约定用法：What ... like? 问样子，整组登记，不按辖域硬拆"): "边界：What … like? 是问「样子怎么样」的整组说法，整组记住，不用拆开",
    ("QI-11", "条目儿童版登记例型——从选项里选一个作答"): "从选项里挑一个作答，这就是选择问句的答法",
    ("QI-12", "条目儿童版登记问答型——真不喜欢，按事实答 No 并补全句"): "真的不喜欢，就按事实答 No，再补上一句完整的",
    ("QI-14", "条目儿童版登记的起点形态：整句模仿，不拆解"): "起步的样子：整句先照着说，不拆解",
    ("QI-14", "阶段形态登记（学习者发展中的过渡式，非目标式）：疑问词前置但无倒装/无系动词——登记为阶段标本，不是病例错句"): "这是学到一半的过渡样子（阶段标本，不是病例错句）：疑问词到了前面，但还没学会倒装、也还没加上 is",
    ("QI-15", "真缺口场景：真丢了钥匙才问——动机与意义锚定俱在（场景为课堂信息差任务的登记型设计，非病例）"): "真缺口场景：真的丢了钥匙才会这样问——想知道的心是真的（不是病例）",
    ("C-04", "餐馆点单——分份省略读法的登记场景"): "餐馆点单的场景：按份点，省掉「杯」也听得懂",
    ("C-09", "此句为 error_cases 中登记错句的对照帧（初次提及误用 the），非正例"): "这一句是拿来对照的：第一次提到就用 the，是错的用法（看病句医院），不是正例",
    ("C-11", "by bus 方式读法零冠词（登记对：ex-bed-bus）"): "by bus 说的是出行方式，零冠词；这类说法成对记：by bus、by bike、by car",
    ("C-12", "乐器串——加 the（约定登记）"): "乐器这一串要加 the，记住这个约定",
    ("C-12", "球类串——零冠词（约定登记）"): "球类这一串不加冠词，记住这个约定",
    ("C-14", "honest 同型：h 脱落的登记词"): "honest 的 h 不出声，和 hour 是同一型的词",
    ("C-17", "鸡肉读法——much chicken（登记正例）"): "这里的 chicken 是鸡肉（吃的肉），不可数，所以用 much",
    ("GR-38", "合法连接三：分号连接（目录 claim 登记的四种合法连接之一，此例为呈现层补例）"): "合法连接三：分号连接——两个完整句之间用分号，是四种合法连接之一",
}
REWRITE_COUNT = [0]


def load_specs():
    specs = {}
    for fn in ["spec-pn-a.json", "spec-pn-b.json", "spec-ar.json", "spec-cj.json"]:
        p = WORK / fn
        if not p.exists():
            fail(f"规格文件缺失：{p}")
        for k, v in json.loads(p.read_text(encoding="utf-8")).items():
            if k in specs:
                fail(f"规格键重复：{k}")
            specs[k] = v
    mz = {}
    p = WORK / "spec-mz.json"
    if not p.exists():
        fail(f"规格文件缺失：{p}")
    mz = json.loads(p.read_text(encoding="utf-8"))
    return specs, mz


def own_blob(rec):
    return E.norm(json.dumps(rec, ensure_ascii=False))


def build_zone_items(lid, data, spec, blob):
    """zone examples 通路：orig 保留（加 grp/src）+ new 校验后追加（按 spec 序，组内连续）。"""
    cur = data.get("examples")
    if cur is None:
        fail(f"{lid}: zone.data 无 examples")
    if any("grp" in x for x in cur):
        fail(f"{lid}: examples 已带 grp（疑似已执行）——拒绝重复填充")
    ogrp = spec.get("orig_grp") or []
    if len(ogrp) != len(cur):
        fail(f"{lid}: orig_grp 数 {len(ogrp)} != 现例数 {len(cur)}")
    items = []
    for ex, g in zip(cur, ogrp):
        if not g or not str(g).strip():
            fail(f"{lid}: orig_grp 有空组名")
        nx = dict(ex)
        key = (lid, ex.get("note"))
        if key in NOTE_REWRITES:
            nx["note"] = NOTE_REWRITES[key]
            REWRITE_COUNT[0] += 1
        nx["grp"] = g
        nx["src"] = {"k": "orig"}
        items.append(nx)
    mix = {"orig": len(cur), "own": 0, "gen": 0}
    for nw in spec.get("new") or []:
        s, note, grp, kind = nw.get("s"), nw.get("note"), nw.get("grp"), nw.get("kind")
        ref = nw.get("ref") or ""
        if kind not in ("own", "gen"):
            fail(f"{lid}: new.kind 非法 {kind}：{s}")
        if not grp or not str(grp).strip():
            fail(f"{lid}: 新句缺组名：{s}")
        check_sentence(lid, s)
        E.check_note(lid, note)
        if kind == "own" and E.norm(s) not in blob:
            fail(f"{lid}: own 句不在该律自有材料中：{s}")
        items.append({"s": s, "note": note, "grp": grp, "src": {"k": kind, "ref": ref}})
        mix[kind] += 1
    return items, mix


def check_surface(lid, items, need=10):
    eff = E.effective_count([x["s"] for x in items])
    grps = []
    for x in items:
        if x["grp"] not in grps:
            grps.append(x["grp"])
    if eff < need:
        fail(f"{lid}: 有效例 {eff} < {need}")
    if len(grps) < 3:
        fail(f"{lid}: 组数 {len(grps)} < 3")
    if not any("边界" in g for g in grps):
        fail(f"{lid}: 无边界组（组名须含「边界」）")
    return eff, grps


def build_all(master, morph, specs, mzspec):
    by = {r["id"]: r for r in master}
    report = []
    zone_new = {}   # master 条目 id -> 新 examples
    # ---- PN / AR（单件面）
    for lid in PN_IDS + AR_IDS:
        rec = by.get(lid)
        if rec is None or (rec.get("zone") or {}).get("data") is None:
            fail(f"{lid}: 总表无 zone.data")
        if lid not in specs:
            fail(f"{lid}: 规格缺失")
        items, mix = build_zone_items(lid, rec["zone"]["data"], specs[lid], own_blob(rec))
        eff, grps = check_surface(lid, items)
        zone_new[lid] = items
        report.append((lid, len(rec["zone"]["data"]["examples"]), len(items), eff, mix, len(grps)))
    # ---- CJ（分件施工、合并面验收）
    for fid, parts in CJ_PARTS.items():
        surf_items = []
        for pid in parts:
            rec = by.get(pid)
            if rec is None or (rec.get("zone") or {}).get("data") is None:
                fail(f"{pid}: 总表无 zone.data")
            if pid not in specs:
                fail(f"{pid}: 规格缺失")
            items, mix = build_zone_items(pid, rec["zone"]["data"], specs[pid], own_blob(rec))
            zone_new[pid] = items
            surf_items += items
            report.append((pid, len(rec["zone"]["data"]["examples"]), len(items),
                           E.effective_count([x["s"] for x in items]), mix, None))
        eff, grps = check_surface(fid + "（合并面）", surf_items)
        report.append((fid + " 合并面", None, len(surf_items), eff, None, len(grps)))
    # ---- MZ（_groups 追加例句组）
    lr = morph["lawreg"]
    mz_new = {}
    for lid in MZ_IDS:
        if lid not in mzspec:
            fail(f"{lid}: MZ 规格缺失")
        spec = mzspec[lid]
        rec = by.get(lid)
        blob = own_blob(rec) + E.norm(json.dumps(lr[lid], ensure_ascii=False))
        groups = []
        sents = []
        mix = {"own": 0, "gen": 0}
        for g in spec.get("groups") or []:
            items = []
            for it in g.get("items") or []:
                n, note, kind = it.get("n"), it.get("g"), it.get("kind")
                ref = it.get("ref") or ""
                if kind not in ("own", "gen"):
                    fail(f"{lid}: MZ item.kind 非法 {kind}：{n}")
                check_sentence(lid, n)
                E.check_note(lid, note)
                if kind == "own" and E.norm(n) not in blob:
                    fail(f"{lid}: MZ own 句不在自有材料中：{n}")
                items.append({"n": n, "g": note, "src": {"k": kind, "ref": ref}})
                sents.append(n)
                mix[kind] += 1
            if not items:
                fail(f"{lid}: MZ 空组 {g.get('h')}")
            groups.append({"h": g.get("h"), "items": items})
        eff = E.effective_count(sents)
        if eff < 10:
            fail(f"{lid}: MZ 有效例句 {eff} < 10")
        if len(groups) < 3:
            fail(f"{lid}: MZ 例句组数 {len(groups)} < 3")
        if not any("边界" in (g["h"] or "") for g in groups):
            fail(f"{lid}: MZ 无边界组")
        mz_new[lid] = groups
        report.append((lid + "（MZ）", 0, len(sents), eff, mix, len(groups)))
    return zone_new, mz_new, report


def splice(text, key, new_obj, w):
    s, e, _obj = w[key]
    return text[:s] + JD(new_obj) + text[e:]


def main():
    apply = "--apply" in sys.argv
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    morph = json.loads(MORPH_DATA.read_text(encoding="utf-8"))
    specs, mzspec = load_specs()
    _by = {r["id"]: r for r in master}
    for lid in PN_IDS + AR_IDS + CJ_SPEC_KEYS:
        ALLOW_SETS[lid] = _blob_tokens(_by[lid]["zone"]["data"])
    for lid in MZ_IDS:
        ALLOW_SETS[lid] = (_blob_tokens(morph["lawreg"][lid])
                           | _blob_tokens(_by[lid].get("lawdata") or {}))
    zone_new, mz_new, report = build_all(master, morph, specs, mzspec)

    print("== 逐面：现例 -> 表面/有效  orig own gen  组数")
    tot = [0, 0, 0]
    for lid, b, a, eff, mix, ng in report:
        ms = ""
        if mix:
            for i, k in enumerate(("orig", "own", "gen")):
                if k in mix:
                    tot[i] += mix[k]
            ms = f"{mix.get('orig', 0):4d} {mix.get('own', 0):3d} {mix.get('gen', 0):3d}"
        print(f"{lid:14s} {b if b is not None else '-':>4} -> {a:3d}/{eff:<3d}  {ms}  {ng if ng is not None else ''}")
    print("合计 orig/own/gen =", tot)
    if REWRITE_COUNT[0] != len(NOTE_REWRITES):
        fail(f"原例 note 登记改写命中 {REWRITE_COUNT[0]} != 预期 {len(NOTE_REWRITES)}（锚定漂移）")
    print(f"原例 note 登记改写：{REWRITE_COUNT[0]} 条全部锚定命中")

    # ---- 文件镜像构造（dry 也验可构造 + 现行 examples 与总表一致性断言）
    text = MAIN.read_text(encoding="utf-8")
    w = GL.collect(text)
    by = {r["id"]: r for r in master}

    def file_examples_check(key, fid, expect_items):
        fmap = {e["id"]: e for e in w[key][2]}
        cur = fmap[fid].get("examples") or []
        if [x["s"] for x in cur] != [x["s"] for x in expect_items]:
            fail(f"文件 {fid} 现 examples 与总表分仓不一致，先停工")

    # 构造新字面量（从现行解析对象出发，只替换 examples 值，保键序）
    new_pn = copy.deepcopy(w["pn_laws"][2])
    fmap = {e["id"]: e for e in new_pn}
    for lid in PN_IDS:
        cur_master = by[lid]["zone"]["data"]["examples"]
        file_examples_check("pn_laws", lid, cur_master)
        fmap[lid]["examples"] = zone_new[lid]
    new_ar = copy.deepcopy(w["ar_laws"][2])
    fmap = {e["id"]: e for e in new_ar}
    for lid in AR_IDS:
        cur_master = by[lid]["zone"]["data"]["examples"]
        file_examples_check("ar_laws", lid, cur_master)
        fmap[lid]["examples"] = zone_new[lid]
    new_cj = copy.deepcopy(w["cj_laws"][2])
    fmap = {e["id"]: e for e in new_cj}
    for fid, parts in CJ_PARTS.items():
        cat = []
        for pid in parts:
            cat += by[pid]["zone"]["data"]["examples"]
        file_examples_check("cj_laws", fid, cat)
        merged = []
        for pid in parts:
            merged += zone_new[pid]
        fmap[fid]["examples"] = merged
    print("文件镜像构造成功（PN/AR/CJ 现行 examples 与总表逐字一致，断言通过）")

    if not apply:
        print("（--dry：未写回；加 --apply 写回）")
        return

    # ---- 写回 1：总表 zone 分仓（PN/AR/CJ examples + MZ zone.data _groups）
    for lid, items in zone_new.items():
        by[lid]["zone"]["data"]["examples"] = items
    for lid, groups in mz_new.items():
        zd = by[lid]["zone"]["data"]
        old = zd.get("_groups") or []
        zd["_groups"] = old + groups
    MASTER.write_text(json.dumps(master, ensure_ascii=False, indent=1), encoding="utf-8")
    print("已写回", MASTER)

    # ---- 写回 2：morph_data LAWREG _groups（与总表 zone.data 同值）
    lr = morph["lawreg"]
    for lid, groups in mz_new.items():
        old = lr[lid].get("_groups") or []
        lr[lid]["_groups"] = old + groups
    MORPH_DATA.write_bytes((JDC(morph) + "\n").encode())
    print("已写回", MORPH_DATA)

    # ---- 写回 3：gen_morph 两文件（LAWREG 字面量重生成）
    for target in (MAIN, MORPH_PAGE):
        r = subprocess.run([sys.executable, str(ROOT / "tools" / "gen_morph.py"), "--write", str(target)],
                           capture_output=True, text=True)
        if r.returncode != 0:
            print(r.stdout, r.stderr)
            fail(f"gen_morph --write {target.name} 失败")
    print("gen_morph --write 两文件完成")

    # ---- 写回 4：主文件 PN/AR/CJ LAWS 字面量（重新定位后按跨度倒序拼接）
    text = MAIN.read_text(encoding="utf-8")
    w = GL.collect(text)
    jobs = []
    for key, obj in [("cj_laws", new_cj), ("ar_laws", new_ar), ("pn_laws", new_pn)]:
        s, e, _o = w[key]
        jobs.append((s, e, JD(obj)))
    for s, e, newt in sorted(jobs, key=lambda j: -j[0]):
        text = text[:s] + newt + text[e:]
    MAIN.write_text(text, encoding="utf-8")
    print("已同步主文件 PN/AR/CJ LAWS 镜像")
    print("下一步：python3 tools/gen_laws.py --check && python3 tools/check_all.py")


if __name__ == "__main__":
    main()
