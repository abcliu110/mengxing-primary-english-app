#!/usr/bin/env python3
"""TODO 1.3 白板课立项 · 数据直通生成器（只搬运仓库已有事实，不编造）.
输入: laws-prototype/model/{phrasal_combos,wordbank}.json,
      docs/whiteboard/v5/{mindmap_groups.json,scenes/}
输出: 本目录 wb13_phrasal.json / wb13_mindmap.json / wb13_poly_words.json
用法: python3 docs/whiteboard/src/wb13/gen_wb13_data.py
"""
import json, glob, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
def load(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as f:
        return json.load(f)

# ---------- 短语动词 84 页 = 72 格 + 12 动词核心义页 ----------
pc = load("laws-prototype/model/phrasal_combos.json")
wb = load("laws-prototype/model/wordbank.json")
byword = {}
for e in wb:
    byword.setdefault((e.get("word") or "").lower(), e)
vv = set()
for f in glob.glob(os.path.join(ROOT, "docs/whiteboard/v5/scenes/vv_*_?.js")):
    m = re.match(r"vv_(\w+)_(\w+)_[12]\.js$", os.path.basename(f))
    if m:
        vv.add((m.group(1), m.group(2)))
GRID_VERBS = pc["meta"]["grid"]["verbs"]
GRID_PARTS = pc["meta"]["grid"]["particles"]
pages = []
for c in pc["cells"]:
    key = (c["verb"], c["particle"])
    covered = key in vv
    pages.append({
        "page_no": len(pages) + 1,
        "kind": "grid_cell",
        "verb": c["verb"], "particle": c["particle"],
        "phrasal": f"{c['verb']} {c['particle']}",
        "status": c["status"],  # attested | checked_absent
        "entries": c.get("entries", []),  # 逐条照录：meaning_cn / example / source
        "v5_scene": [f"vv_{c['verb']}_{c['particle']}_1",
                     f"vv_{c['verb']}_{c['particle']}_2"] if covered else [],
        "covered_by_vv": covered,
        "content_gap": None if c.get("entries") else "无词典引证条目（checked_absent：该组合经查证不是成立的短语动词，不编内容）",
    })
assert len(pages) == 72
for v in GRID_VERBS:
    e = byword.get(v)
    row = [p for p in pages if p["verb"] == v]
    pages.append({
        "page_no": len(pages) + 1,
        "kind": "verb_core",
        "verb": v,
        "wordbank_id": e["id"] if e else None,
        "core_meaning_cn": e["meaning"] if e else None,
        "phonetic": e.get("phonetic") if e else None,
        "grid_row": [f"{v} {p}" for p in GRID_PARTS],
        "grid_row_covered": sum(1 for p in row if p["covered_by_vv"]),
        "grid_row_attested": sum(1 for p in row if p["status"] == "attested"),
        "content_gap": None if e else "词库无该动词词条",
    })
assert len(pages) == 84
with open(os.path.join(os.path.dirname(__file__), "wb13_phrasal.json"), "w", encoding="utf-8") as f:
    json.dump({"topic": "短语动词", "page_count": 84,
               "definition": "84页 = 12动词 x 6小品词 = 72格 + 12动词核心义页",
               "source": "laws-prototype/model/phrasal_combos.json（meta.counts：attested_cells 50，checked_absent_cells 22，phrasal_entries 156；out_senses 30 另见附录，不计入84页）",
               "v5_status": {"vv_scenes_cover_cells": sum(1 for p in pages[:72] if p["covered_by_vv"]),
                             "missing_attested_cells": sum(1 for p in pages[:72] if not p["covered_by_vv"] and p["status"] == "attested"),
                             "missing_absent_cells": sum(1 for p in pages[:72] if not p["covered_by_vv"] and p["status"] != "attested"),
                             "phrasal_key_scenes": ["phrasal_key_1", "phrasal_key_2"]},
               "pages": pages}, f, ensure_ascii=False, indent=1)

# ---------- 思维导图 25 页 ----------
mm = load("docs/whiteboard/v5/mindmap_groups.json")
subs = mm["subs"]
assert len(subs) == 25
mpages = []
for s in subs:
    mpages.append({
        "page_no": s["idx"] + 1,
        "sub_theme": s["sub"], "idx": s["idx"],
        "total_words_in_theme": s["total"],
        "shown_node_ids": len(s["nodes"]),
        "groups": [{"name": g["name"], "word_ids": g["ids"]} for g in s["groups"]],
        "v5_scene": f"hd_mindmap_{s['idx'] + 1}",
        "v5_scene_exists": os.path.exists(os.path.join(
            ROOT, "docs/whiteboard/v5/scenes", f"hd_mindmap_{s['idx'] + 1}.js")),
    })
with open(os.path.join(os.path.dirname(__file__), "wb13_mindmap.json"), "w", encoding="utf-8") as f:
    json.dump({"topic": "思维导图", "page_count": 25,
               "form": "讲解幕（mindmapBuild：一枝一枝画出、边画边读）+ 下方交互导图保留；见 wb13_mindmap_form.md",
               "source": "docs/whiteboard/v5/mindmap_groups.json（gen_mindmap.py 生成，勿手改场景，改规则/数据后重跑）",
               "pages": mpages}, f, ensure_ascii=False, indent=1)

# ---------- 一词多义逐词白板现状 ----------
POLY_IDS = ["G1_002", "G1_055", "G2_0489", "G2_080", "G2_084", "G2_087",
            "G2_096", "G3_0527", "G3_0600", "G3_0790", "G3_113", "G4_157",
            "G4_174", "G5_250", "POLY_TURN", "POLY_WATCH", "V6_P14"]
byid = {e["id"]: e for e in wb}
words = []
for i in POLY_IDS:
    e = byid.get(i)
    words.append({"word_id": i, "word": e["word"] if e else None,
                  "meaning_cn": e["meaning"] if e else None,
                  "has_polysemy_flag": e.get("has_polysemy") if e else None,
                  "v5_scenes": [f"hd_poly_{i.lower()}_1", f"hd_poly_{i.lower()}_2",
                                f"hd_poly_{i.lower()}_3"]})
with open(os.path.join(os.path.dirname(__file__), "wb13_poly_words.json"), "w", encoding="utf-8") as f:
    json.dump({"topic": "一词多义逐词白板现状",
               "source": "laws-prototype/model/wordbank.json（has_polysemy 字段）+ docs/whiteboard/v5/scenes/hd_poly_*",
               "words_with_polysemy_flag": sum(1 for e in wb if e.get("has_polysemy")),
               "words_with_scenes": len(words),
               "gap": "词库 has_polysemy=true 的词共 270 个，仅 17 个有逐词白板（hd_poly 51 幕）；其余 253 个逐词白板未立项，义项数据须先核对（本文件只列现状，不编义项）",
               "words": words}, f, ensure_ascii=False, indent=1)
print("OK: phrasal 84, mindmap 25, poly-words 17; has_polysemy=270")
