#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_upstream.py — 上游 ↔ 总表常设对账（《数据源规范》§6 校验门的上游半边）。

既有 gen_* --check 只验「总表 ↔ 内嵌」；本脚本验「上游源头 ↔ 总表分仓」，
堵住「上游日常编辑后总表静默过期、而全部 --check 照绿」的盲区（v2 复查问题 4）。
只报告不写回；退出码：0=无未登记漂移；1=发现漂移或结构异常。

五条链（成员 + 内容双比）：
  (a) model/laws/*.yaml（图鉴 428 条，文件集由总表 yaml_file 字段导出）
      vs laws_master.json 各条 yaml 分仓（逐条深比）。
  (b) model/wordbank.json（2,473 条）vs words_master.json 的 wordbank 分仓（逐条深比）。
  (c) model/phonetic_gb.json（2,287 条）vs words_master 的 phonetic_gb 分仓（深比）
      + wordbank.json 的 phonetic_gb 字段（字符串）+ 两总表的拼读卡 snapshot 音标。
  (d) model/phonics_wordsets.json patterns vs phonics_master.json 的 wordsets 分仓（逐条深比）。
  (e) model/phonics_checkpoints.json vs phonics_master 的 checkpoints.file 分仓（深比）
      + 48 站与 embedded_spine（167 站）按 key 对位（g/ph/pids/gate 词集）。

已登记项（不算失败，仅提示）：
  - checkpoints addendum 基线分叉（entries 2,287 vs 两池推导 2,352，master 内
    baseline_fork 自登记「只登记不裁定」；规范 §7 已销项登记）。
"""
import json
import sys
from pathlib import Path

import yaml

BASE = Path(__file__).resolve().parent.parent  # laws-prototype/
MODEL = BASE / "model"

MAX_DIFFS_PER_CHAIN = 20
problems = []   # 未登记漂移
infos = []      # 已登记/提示


def norm(x):
    """YAML 侧规范化：date/datetime → ISO 字符串、键转 str，与 JSON 侧可比。"""
    import datetime
    if isinstance(x, (datetime.date, datetime.datetime)):
        return x.isoformat()
    if isinstance(x, dict):
        return {str(k): norm(v) for k, v in x.items()}
    if isinstance(x, (list, tuple)):
        return [norm(v) for v in x]
    return x


def diff_paths(a, b, path="$", out=None, cap=MAX_DIFFS_PER_CHAIN):
    if out is None:
        out = []
    if len(out) >= cap:
        return out
    if type(a) is not type(b):
        # int/float 互通（YAML 1 与 JSON 1.0 视为同值）
        if isinstance(a, (int, float)) and isinstance(b, (int, float)) and a == b:
            return out
        out.append(f"{path}: 类型 {type(a).__name__} != {type(b).__name__}（{a!r:.60} vs {b!r:.60}）")
        return out
    if isinstance(a, dict):
        for k in sorted(set(a) | set(b), key=str):
            if len(out) >= cap:
                break
            if k not in a:
                out.append(f"{path}.{k}: 仅总表有")
            elif k not in b:
                out.append(f"{path}.{k}: 仅上游有")
            else:
                diff_paths(a[k], b[k], f"{path}.{k}", out, cap)
    elif isinstance(a, list):
        if len(a) != len(b):
            out.append(f"{path}: 长度 {len(a)} != {len(b)}")
        for i in range(min(len(a), len(b))):
            if len(out) >= cap:
                break
            diff_paths(a[i], b[i], f"{path}[{i}]", out, cap)
    elif a != b:
        out.append(f"{path}: {a!r:.60} != {b!r:.60}")
    return out


def report(chain, ok_msg, diffs):
    if diffs:
        problems.extend(f"[{chain}] {d}" for d in diffs)
        print(f"[{chain}] FAIL：{len(diffs)} 处漂移（上限 {MAX_DIFFS_PER_CHAIN}）")
        for d in diffs:
            print(f"    {d}")
    else:
        print(f"[{chain}] PASS：{ok_msg}")


def load_json(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))


# ---------------------------------------------------------------- (a) YAML
def chain_a():
    lm = load_json(MODEL / "laws_master.json")
    recs = lm if isinstance(lm, list) else lm["laws"]
    master = {r["id"]: r for r in recs if r.get("yaml")}
    files = sorted({r["yaml_file"] for r in recs if r.get("yaml")})
    upstream = {}
    for fn in files:
        doc = yaml.safe_load((MODEL / "laws" / fn).read_text(encoding="utf-8"))
        entries = doc if isinstance(doc, list) else doc["entries"]
        assert isinstance(entries, list), f"{fn} 条目集不是列表"
        for e in entries:
            assert e["id"] not in upstream, f"YAML id 重复：{e['id']}"
            upstream[e["id"]] = norm(e)
    diffs = []
    if set(upstream) != set(master):
        only_u = sorted(set(upstream) - set(master))[:10]
        only_m = sorted(set(master) - set(upstream))[:10]
        diffs.append(f"成员不一致：仅 YAML {only_u}；仅总表 {only_m}")
    for lid in sorted(set(upstream) & set(master)):
        diff_paths(upstream[lid], master[lid]["yaml"], f"$[{lid}]", diffs)
        if len(diffs) >= MAX_DIFFS_PER_CHAIN:
            break
    report("a YAML↔laws_master", f"{len(upstream)} 条逐条深比全等（{len(files)} 个 YAML 文件）", diffs)


# ---------------------------------------------------------------- (b) wordbank
def chain_b():
    wb = load_json(MODEL / "wordbank.json")
    upstream = {w["id"]: w for w in wb}
    wm = load_json(MODEL / "words_master.json")
    master = {}
    for r in wm["words"]:
        if r.get("wordbank"):
            assert r["wordbank_id"] not in master, f"总表 wordbank 分仓 id 重复：{r['wordbank_id']}"
            master[r["wordbank_id"]] = r["wordbank"]
    diffs = []
    if set(upstream) != set(master):
        diffs.append(f"成员不一致：仅词库 {sorted(set(upstream)-set(master))[:10]}；"
                     f"仅总表 {sorted(set(master)-set(upstream))[:10]}")
    for wid in sorted(set(upstream) & set(master)):
        diff_paths(upstream[wid], master[wid], f"$[{wid}]", diffs)
        if len(diffs) >= MAX_DIFFS_PER_CHAIN:
            break
    report("b wordbank↔words_master", f"{len(upstream)} 条逐条深比全等", diffs)


# ---------------------------------------------------------------- (c) phonetic_gb
def chain_c():
    pg = load_json(MODEL / "phonetic_gb.json")
    wb = {w["id"]: w for w in load_json(MODEL / "wordbank.json")}
    wm = load_json(MODEL / "words_master.json")
    by_id = {r["wordbank_id"]: r for r in wm["words"] if r.get("wordbank_id")}
    by_word = {r["word"]: r for r in wm["words"]}
    pm = load_json(MODEL / "phonics_master.json")
    diffs = []
    missing = [i for i in pg if i not in by_id]
    if missing:
        diffs.append(f"phonetic_gb 有 {len(missing)} 条在 words_master 无对应词条：{missing[:10]}")
    n_cards = 0
    for wid, entry in pg.items():
        rec = by_id.get(wid)
        if rec is None:
            continue
        if rec.get("phonetic_gb") != entry:
            diff_paths(entry, rec.get("phonetic_gb"), f"$[{wid}].phonetic_gb分仓", diffs)
        w = wb.get(wid)
        if w is not None and w.get("phonetic_gb") != entry["gb"]:
            diffs.append(f"$[{wid}]: wordbank.phonetic_gb {w.get('phonetic_gb')!r} != phonetic_gb.gb {entry['gb']!r}")
        for c in rec.get("phonics_cards") or []:
            n_cards += 1
            if c["phonetic"] != entry["gb"]:
                diffs.append(f"$[{wid}] 卡 {c['bank_key']}: words_master 卡音标 {c['phonetic']!r} != gb {entry['gb']!r}")
        if len(diffs) >= MAX_DIFFS_PER_CHAIN:
            break
    # phonics_master 卡 snapshot：按词查 gb
    n_pm = 0
    for word, crec in pm["cards"].items():
        rec = by_word.get(word)
        gb = (rec.get("phonetic_gb") or {}).get("gb") if rec else None
        if gb is None:
            continue
        for card in crec["cards"]:
            n_pm += 1
            if card["snapshot"]["phonetic"] != gb:
                diffs.append(f"phonics_master 卡 {card['bank_key']}（{word}）: snapshot 音标 "
                             f"{card['snapshot']['phonetic']!r} != gb {gb!r}")
        if len(diffs) >= MAX_DIFFS_PER_CHAIN:
            break
    report("c phonetic_gb↔words_master+卡面",
           f"{len(pg)} 条深比全等；卡面音标核对 words_master {n_cards} 张 + phonics_master {n_pm} 张", diffs)


# ---------------------------------------------------------------- (d) wordsets
def chain_d():
    ws = load_json(MODEL / "phonics_wordsets.json")
    upstream = {p["id"]: p for p in ws["patterns"]}
    pm = load_json(MODEL / "phonics_master.json")
    master = {p["id"]: p["wordsets"] for p in pm["patterns"]}
    diffs = []
    if set(upstream) != set(master):
        diffs.append(f"成员不一致：仅 wordsets {sorted(set(upstream)-set(master))[:10]}；"
                     f"仅总表 {sorted(set(master)-set(upstream))[:10]}")
    for pid in sorted(set(upstream) & set(master)):
        diff_paths(upstream[pid], master[pid], f"$[{pid}]", diffs)
        if len(diffs) >= MAX_DIFFS_PER_CHAIN:
            break
    report("d wordsets↔phonics_master", f"{len(upstream)} 个模式逐条深比全等", diffs)


# ---------------------------------------------------------------- (e) checkpoints
def chain_e():
    cp = load_json(MODEL / "phonics_checkpoints.json")
    pm = load_json(MODEL / "phonics_master.json")
    ck = pm["checkpoints"]
    diffs = []
    diff_paths(cp, ck["file"], "$.file", diffs)
    spine = ck["embedded_spine"]["stations"]
    if len(spine) != 167:
        diffs.append(f"embedded_spine 站数 {len(spine)} != 167")
    spine_by_key = {s["key"]: s for s in spine}
    n = 0
    for st in cp["stations"]:
        n += 1
        sp = spine_by_key.get(st["key"])
        if sp is None:
            diffs.append(f"站 {st['index']}（{st['key']}）在脊柱中无同 key 站")
            continue
        for f in ("g", "ph", "pids"):
            if st.get(f) != sp.get(f):
                diffs.append(f"站 {st['index']}（{st['key']}）字段 {f} 与脊柱不一致：{st.get(f)!r} != {sp.get(f)!r}")
        gate_file = sorted(g["id"] for g in st.get("gate") or [])
        gate_spine = sorted(g["id"] for g in sp.get("gate") or [])
        if gate_file != gate_spine:
            diffs.append(f"站 {st['index']}（{st['key']}）过关组词集与脊柱不一致")
        if len(diffs) >= MAX_DIFFS_PER_CHAIN:
            break
    fork = (ck.get("addendum") or {}).get("baseline_fork")
    if fork:
        infos.append(f"[e] addendum 基线分叉（entries {fork.get('entries_baseline')} vs 两池 "
                     f"{fork.get('new_pools_base')}）为已登记项（规范 §7 销项），不计漂移")
    report("e checkpoints↔phonics_master+脊柱",
           f"文件分仓深比全等；{n} 站与 167 站脊柱按 key 对位（g/ph/pids/gate）全合", diffs)


def main():
    for fn in (chain_a, chain_b, chain_c, chain_d, chain_e):
        try:
            fn()
        except Exception as e:
            problems.append(f"[{fn.__name__}] 异常：{e}")
            print(f"[{fn.__name__}] ERROR：{e}")
    for i in infos:
        print("已登记：", i)
    if problems:
        print(f"结论：发现 {len(problems)} 处未登记漂移/异常")
        return 1
    print("结论：五条上游链全部无未登记漂移")
    return 0


if __name__ == "__main__":
    sys.exit(main())
