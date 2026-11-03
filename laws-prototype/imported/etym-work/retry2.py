import json, re, pathlib, sys, concurrent.futures as cf
sys.path.insert(0, '.')
import fetch_etym as F
C = pathlib.Path('/home/hatch/workspace/etym-work')
V = json.load(open('vocab_single.json'))
fn = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)
missing = []
for w in V:
    word = w['word'] if isinstance(w, dict) else w
    if not (C / 'etymo' / (fn(word) + '.txt')).exists(): missing.append(word)
print('retry targets:', len(missing), flush=True)
with cf.ThreadPoolExecutor(2) as ex: list(ex.map(F.etymo, missing))
print('retry done; etymo files:', len(list((C / 'etymo').glob('*.txt'))), flush=True)
