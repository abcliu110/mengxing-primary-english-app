"""fetch_oxford.py —— 抓 Oxford Learner's Dictionaries 的 Word Origin 小节（只存提取文本）。
用法：python3 fetch_oxford.py [并发]。断点续抓：已存在跳过；无词条/无 Word Origin 写空文件。"""
import json, re, html, time, pathlib, urllib.request, urllib.error, concurrent.futures as cf
C = pathlib.Path('/home/hatch/workspace/etym-work')
OUT = C / 'ox'
OUT.mkdir(exist_ok=True)
V = json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))
WORDS = sorted({w['word'].strip() for w in V if '/' not in w['word'] and ' ' not in w['word']})
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36'
FN = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)

def extract(s):
    i = s.find('Word Origin')
    if i < 0: return ''
    seg = s[i + len('Word Origin'):i + 2600]
    seg = re.sub(r'<(script|style).*?</\1>', ' ', seg, flags=re.S)
    seg = re.sub(r'<[^>]+>', ' ', seg)
    seg = re.sub(r'\s+', ' ', html.unescape(seg)).strip()
    for cut in ('Idioms', 'Synonyms and related words', 'Extra Examples', 'Collocations', 'Word Family', 'See '):
        j = seg.find(cut)
        if j > 40: seg = seg[:j]
    return seg.strip()

def fetch(w):
    p = OUT / (FN(w) + '.txt')
    if p.exists(): return
    slug = w.lower().replace("'", '')
    url = 'https://www.oxfordlearnersdictionaries.com/definition/english/' + urllib.parse.quote(slug)
    txt = ''
    for k in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Encoding': 'identity'})
            with urllib.request.urlopen(req, timeout=30) as r:
                raw = r.read()
                if raw[:2] == b'\x1f\x8b':
                    import gzip; raw = gzip.decompress(raw)
                txt = extract(raw.decode('utf-8', 'ignore'))
            break
        except urllib.error.HTTPError as e:
            if e.code == 404: break
            time.sleep(2 * (k + 1))
        except Exception:
            time.sleep(2 * (k + 1))
    p.write_text(txt, encoding='utf-8')
    time.sleep(0.35)

if __name__ == '__main__':
    import sys
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 3
    with cf.ThreadPoolExecutor(n) as ex: list(ex.map(fetch, WORDS))
    print('oxford done', len(WORDS))
