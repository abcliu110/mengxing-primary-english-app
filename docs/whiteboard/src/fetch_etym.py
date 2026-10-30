"""fetch_etym.py —— 词源抓取（决策 25，HANDOFF §5.1 ⑥a）。缓存不进仓库：/workspace/work/etym/
用法：python3 src/fetch_etym.py wikt|etymo [并发]
  wikt  ：Wiktionary 原始 wikitext（index.php?action=raw，带联系方式 UA，限速），存 wikt/<词>.txt
  etymo ：Etymonline 词条（沙箱直连被 Cloudflare 拦，走 Wayback Machine 最近快照 id_ 原文），抽正文存 etymo/<词>.txt
断点续抓：已存在的文件跳过；无词条写空文件 + .miss 标记。词表 = 主文件 VOCAB_DB（先导出 vocab.json）。"""
import json, sys, time, re, html, pathlib, urllib.request, urllib.parse, concurrent.futures as cf
C = pathlib.Path('/workspace/work/etym')
words = sorted({w['word'].strip() for w in json.load(open(C / 'vocab.json'))})
UA_W = 'MengxingEduBot/1.0 (education app; 20552792+abcliu110@users.noreply.github.com)'
UA_B = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36'
def get(url, ua, tries=4):
    for k in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': ua, 'Accept-Encoding': 'identity'})
            with urllib.request.urlopen(req, timeout=40) as r:
                raw, enc = r.read(), (r.headers.get('Content-Encoding') or '').lower()
                # Wayback 的 id_ 原文会保留源站压缩（br / gzip），不管请求头
                if raw[:2] == b'\x1f\x8b': import gzip; raw = gzip.decompress(raw)
                elif enc == 'br' or raw.lstrip()[:1] not in (b'<', b'{', b''):
                    try: import brotli; raw = brotli.decompress(raw)
                    except Exception: pass
                return r.status, raw.decode('utf-8', 'ignore')
        except urllib.error.HTTPError as e:
            if e.code == 404: return 404, ''
            time.sleep(3 * (k + 1))
        except Exception: time.sleep(3 * (k + 1))
    return 0, ''
def fname(w): return re.sub(r'[^A-Za-z0-9_-]', '_', w)
def wikt(w):
    p = C / 'wikt' / (fname(w) + '.txt')
    if p.exists(): return
    st, t = get('https://en.wiktionary.org/w/index.php?title=' + urllib.parse.quote(w.replace(' ', '_')) + '&action=raw', UA_W)
    if st == 404 and w != w.lower(): st, t = get('https://en.wiktionary.org/w/index.php?title=' + urllib.parse.quote(w.lower()) + '&action=raw', UA_W)
    if st in (200, 404): p.write_text(t, encoding='utf-8')
    time.sleep(0.6)
def body(s):
    s = re.sub(r'<(script|style).*?</\1>', ' ', s, flags=re.S); s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'\s+', ' ', html.unescape(s))
    i = s.find('Origin and history of'); j = s.find('Entries linking to', i)
    if j < 0: j = s.find('More to explore', i)
    return s[i:j] if i >= 0 else ''
def etymo(w):
    p = C / 'etymo' / (fname(w) + '.txt')
    if p.exists(): return
    q = w.lower().replace(' ', '-')
    # 用 curl：Wayback id_ 原文保留源站压缩（2026-10 实测为 zstd），urllib 解不了
    import subprocess
    r = subprocess.run(['curl', '-sL', '--compressed', '-m', '50', '-A', UA_B, '-w', '\n%{http_code}',
                        'https://web.archive.org/web/2026id_/https://www.etymonline.com/word/' + urllib.parse.quote(q)], capture_output=True)
    out = r.stdout.decode('utf-8', 'ignore'); t, _, code = out.rpartition('\n'); st = int(code) if code.strip().isdigit() else 0
    if st == 403:                            # 2026-10-31：最近快照常是 Cloudflare 403 页，改取 CDX 里最近一次 200 快照
        ts = subprocess.run(['curl', '-s', '-m', '40', 'https://web.archive.org/cdx/search/cdx?url=www.etymonline.com/word/'
                             + urllib.parse.quote(q) + '&filter=statuscode:200&limit=-1&fl=timestamp'], capture_output=True).stdout.decode().strip()
        if ts.isdigit():
            r = subprocess.run(['curl', '-sL', '--compressed', '-m', '50', '-A', UA_B, '-w', '\n%{http_code}',
                                'https://web.archive.org/web/' + ts + 'id_/https://www.etymonline.com/word/' + urllib.parse.quote(q)], capture_output=True)
            out = r.stdout.decode('utf-8', 'ignore'); t, _, code = out.rpartition('\n'); st = int(code) if code.strip().isdigit() else 0
    b = body(t) if st == 200 else ''
    if st == 200 and not b: st = 0          # 拿到的不是词条页（限流页等）：不落盘，下次重抓
    if st in (200, 404): p.write_text(b, encoding='utf-8')
    time.sleep(1.5)                          # Wayback 并发 / 过快会被断连（2026-10-30 实测 6 并发全部失败）
if __name__ == '__main__':
    mode = sys.argv[1]; n = int(sys.argv[2]) if len(sys.argv) > 2 else 2
    fn = {'wikt': wikt, 'etymo': etymo, 'etymo-rev': etymo, 'etymo-mid': etymo}[mode]
    ws = words[::-1] if mode.endswith('-rev') else words[len(words) // 2:] + words[:len(words) // 2] if mode.endswith('-mid') else words   # 第二个进程倒着抓，两头往中间（Wayback 单连接约 15 词/分钟）
    with cf.ThreadPoolExecutor(n) as ex: list(ex.map(fn, ws))
    print('done', sys.argv[1], len(words))
