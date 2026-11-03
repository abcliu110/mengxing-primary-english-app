"""裁断建档器：以人工判读结论驱动 build_records.make() 生成记录。
用法：python3 /tmp/adjudicate.py specs.json out.json
specs: {word: {
  "chain": [[relation, lang_code, form, gloss_en], ...],   # 可选：覆盖解析链（逐站源自 Wiktionary 原文）
  "chain_ok": N,          # 判读为已互证的站数（自新到旧数）
  "morph_ok": true,       # 可选：构词互证覆盖
  "ox_rescue": N,         # 可选：牛津逐站对上数覆盖
  "fa": "…",              # 可选：首见年代（原文依据，make 抽不到时协助）
  "orig_en": "…", "orig_zh": "…",   # 可选：原义英文 gloss（源自原文）+ 中译，协助抽取
  "gloss_add": {"en": "zh"},        # 可选：链站 gloss 中译补充（写入 GM 供本次生成）
  "disputes": "…"         # 可选：争议/登记字段覆盖
}}
所有协助值必须源自三套原文（调用方已在卷宗里逐条核过）。"""
import json, sys, copy
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import build_records as B

specs = json.load(open(sys.argv[1]))
out = {}
for w, sp in specs.items():
    key = next((k for k in B.PARSED if k.lower() == w.lower()), None)
    assert key, f'{w} not in PARSED'
    rec = B.PARSED[key]
    saved = copy.deepcopy({k: rec.get(k) for k in ('chain', 'verify')})
    if 'chain' in sp: rec['chain'] = [tuple(x) for x in sp['chain']]
    if 'chain_ok' in sp: rec['verify']['chain_ok'] = sp['chain_ok']
    if sp.get('morph_ok'): rec['verify']['morph_ok'] = True
    saved_fa, saved_ox, saved_eg = B.first_attested, B.ox_rescue, B.etymo_entry_gloss
    if sp.get('fa'):
        fa_val = sp['fa']
        B.first_attested = lambda c, e, o, _v=fa_val, _f=saved_fa: _v or _f(c, e, o)
    if sp.get('ox_rescue'):
        n = sp['ox_rescue']
        B.ox_rescue = lambda chain, ox, _n=n, _f=saved_ox: max(_n, _f(chain, ox))
    gm_added = {}
    for en, zh in (sp.get('gloss_add') or {}).items():
        gm_added[en] = B.GM.get(en); B.GM[en] = zh
    if sp.get('orig_en'):
        en, zh = sp['orig_en'], sp['orig_zh']
        gm_added[en] = B.GM.get(en); B.GM[en] = zh
        B.etymo_entry_gloss = lambda e, _v=en, _f=saved_eg: _v or _f(e)
    wb_ent = next(x for x in B.WB if x['word'].lower() == w.lower())
    r = B.make(wb_ent)
    B.first_attested, B.ox_rescue, B.etymo_entry_gloss = saved_fa, saved_ox, saved_eg
    for en, old in gm_added.items():
        if old is None: B.GM.pop(en, None)
        else: B.GM[en] = old
    rec['chain'], rec['verify'] = saved['chain'], saved['verify']
    r = {k: v for k, v in r.items() if not k.startswith('_')}
    if sp.get('disputes') and r['status'] == 'verified': r['disputes'] = sp['disputes']
    out[w] = r
    print(f"{w}: {r['status']} {r.get('pending_reason', '')[:70]}")
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
print('wrote', sys.argv[2], len(out))
