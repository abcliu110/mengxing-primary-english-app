"""补强轮次合并：以仓库现行 etymology.json 为底，只接受已裁断的变更，生成 /tmp/etymology_r2.json。
规则：普查 16 词与全部现行 verified 不动；待核→verified 只收 ACCEPT 名单；rung/spoke 移出（未收）；
待核原因码变化者取草稿新原因；draft-only 只收 inboard/hard-working/pe；最后打手工补丁。"""
import json, collections
CUR = {r['word']: r for r in json.load(open('/tmp/etymology_before_r2.json'))}
DRAFT = {r['word']: r for r in json.load(open('/home/hatch/workspace/etym-work/etymology_draft.json'))}
CENSUS16 = {'pen', 'match', 'mint', 'lead', 'sound', 'plane', 'prize', 'lie', 'march', 'slough', 'drove',
            'light', 'ring', 'may', 'mean', 'spring'}
ACCEPT_VERIFIED = ['aquatic', 'beyond', 'both', 'bottle', 'candlestick', 'carefully', 'climb', 'cloudy',
                   'clover', 'deeply', 'early', 'equation', 'fold', 'guest', 'heavily', 'incredible', 'itch',
                   'misread', 'or', 'pathology', 'quickly', 'simplify', 'sleepy', 'specimen', 'strict',
                   'thick', 'thirsty', 'verbal', 'windy', 'year']
REMOVE_TO_UNCOLLECTED = {'rung': '词形变化词：ring 的过去分词；Wiktionary 只有名词 rung「梯子横档」的词源小节，与本词不是同一个词；词源随原形「ring」（已收录）',
                         'spoke': '词形变化词：speak 的过去式；Wiktionary 只有名词 spoke「辐条」的词源小节，与本词不是同一个词；词源随原形「speak」'}
ACCEPT_NEW_PENDING = {'inboard', 'hard-working', 'pe'}
def code(r): return (r.get('pending_reason') or '').split('：')[0] if r.get('status') == '待核' else r.get('status')
def clean(r):
    return {k: v for k, v in r.items() if not k.startswith('_')}

out, log = {}, collections.defaultdict(list)
for w, c in CUR.items():
    if w in REMOVE_TO_UNCOLLECTED:
        log['removed to uncollected'].append(w); continue
    if w in CENSUS16 or c['status'] == 'verified':
        out[w] = c
        d = DRAFT.get(w)
        if c['status'] == 'verified' and d and d['status'] != 'verified':
            log['NOTE draft would demote (kept current)'].append(f"{w}->{code(d)}")
        continue
    d = DRAFT.get(w)
    if d is None:
        out[w] = c; log['pending kept (draft uncollected?)'].append(w); continue
    if d['status'] == 'verified':
        if w in ACCEPT_VERIFIED:
            out[w] = clean(d); log['rescued to verified'].append(w)
        else:
            out[w] = c; log['BLOCKED draft-verified (not in accept list)'].append(w)
    elif code(d) != code(c):
        out[w] = clean(d); log[f'reason {code(c)} -> {code(d)}'].append(w)
    else:
        out[w] = c
for w in ACCEPT_NEW_PENDING:
    out[w] = clean(DRAFT[w]); log['new pending from uncollected'].append(w)

# ---- 手工补丁（逐条依据原文，见裁断记录）----
p = out['windy']
assert '1885' in p['first_attested']
p['first_attested'] = '古英语时期就已经有了（牛津词源栏以古英语词形 windiġ 起头）'
p = out['both']
p['disputes'] = ('说法不止一种，来源并记不裁定：牛津词源栏作「来自古诺斯语 báðir（两者）」；Etymonline 并列三种理论'
                 '（古英语 begen 加词尾说、古英语 bā þā「这两个」说、古诺斯语 báðir 说）；Wiktionary 以古英语 bā þā 为主线、'
                 '古诺斯语可能有增援。本档按 Wiktionary 的链立档，三说共同的深层来源（原始日耳曼语 *bai「两者」）没有分歧。')
p = out['bottle']
p['disputes'] = ('来源还没有完全定论（Etymonline 原文措辞：“diminutive of Late Latin buttis ‘a cask,’ which is '
                 'perhaps from Greek”——指链条最深处 buttis 的来源未定，butticula 以下各站没有分歧）')
p = out['fold']
p['disputes'] = ('同形异词登记：另有一个名词 fold 指「羊圈；围栏」，来自古英语 falæd、falud，与本条动词 fold'
                 '（折叠）不是同一个词，不要混淆；该名词自身的深层来源未定，本档动词链没有分歧。')
p = out['itch']
p['disputes'] = '来源还没有完全定论（Wiktionary 原文措辞：“of unknown origin”——指原始日耳曼语 *jukjǭ 更早的来源未定）'
p = out['sleepy']
p['disputes'] = '无已知争议（古英语词形 *slǣpiġ 未见于现存文献，是 Etymonline 与 Wiktionary 一致采用的重构形式，链中以 * 标明）'

recs = sorted(out.values(), key=lambda r: r['word'])
json.dump(recs, open('/tmp/etymology_r2.json', 'w'), ensure_ascii=False, indent=1)
cnt = collections.Counter(r['status'] for r in recs)
rc = collections.Counter(code(r) for r in recs if r['status'] == '待核')
print('merged total:', len(recs), dict(cnt))
print('pending reasons:', rc.most_common())
for k in sorted(log):
    print(f'== {k}: {len(log[k])}'); print('   ', ' '.join(log[k][:70]))
json.dump({'uncollected_reasons': REMOVE_TO_UNCOLLECTED}, open('/tmp/r2_removals.json', 'w'), ensure_ascii=False)
