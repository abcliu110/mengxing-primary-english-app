"""对比 build_records 新草稿 vs 仓库现行 etymology.json，分类列出差异（只报告不合并）。"""
import json, collections, sys
cur = {r['word']: r for r in json.load(open('/tmp/mengxing2/laws-prototype/model/etymology.json'))}
draft = {r['word']: r for r in json.load(open('/home/hatch/workspace/etym-work/etymology_draft.json'))}
unc = {r['word'] for r in json.load(open('/home/hatch/workspace/etym-work/uncollected.json'))}
def code(r): return (r.get('pending_reason') or '').split('：')[0] if r.get('status') == '待核' else r.get('status')
cats = collections.defaultdict(list)
for w in sorted(set(cur) | set(draft)):
    c, d = cur.get(w), draft.get(w)
    if c is None and d is not None:
        cats['draft-only(new in json)'].append(w)
    elif d is None and c is not None:
        cats['cur-only (draft says 未收?) ' + ('yes-in-unc' if w in unc else 'MISSING-everywhere')].append(w)
    elif c['status'] != d['status']:
        cats[f"status {c['status']} -> {d['status']}"].append(w)
    elif c['status'] == '待核' and code(c) != code(d):
        cats[f"reason {code(c)} -> {code(d)}"].append(w)
    elif c != d:
        cats['same-status content diff'].append(w)
for k in sorted(cats):
    print(f'== {k}: {len(cats[k])}')
    print('   ', ' '.join(cats[k][:60]))
json.dump({k: v for k, v in cats.items()}, open('/tmp/diff_cats.json', 'w'), ensure_ascii=False, indent=1)
