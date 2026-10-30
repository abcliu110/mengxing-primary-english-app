#!/usr/bin/env python3
"""offlinecheck.py [主文件] —— 决策 29 O5：单文件离线可用检查（返回码非 0 = 有违规）。
扫主文件明文 + 每个 wb5html / wb5blob 压缩块解开后的内容：不得出现从 http(s):// 加载资源的写法
（<script src>、<link href>、<img/audio/video/source/iframe src>、CSS url()、@import、fetch()、import()、new Worker/EventSource/WebSocket）。
普通超链接 <a href="https://…">（如词源出处链接）允许。"""
import re, sys, os, gzip, base64
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
s = open(MAIN, encoding='utf-8').read()
PATS = [r'<script[^>]+src\s*=\s*["\']?https?://', r'<link[^>]+href\s*=\s*["\']?https?://', r'<(?:img|audio|video|source|iframe|embed)[^>]+src\s*=\s*["\']?https?://',
        r'url\(\s*["\']?https?://', r'@import\s+(?:url\()?["\']?https?://', r'fetch\(\s*[`"\']https?://', r'import\(\s*[`"\']https?://', r'new (?:Worker|EventSource|WebSocket)\(\s*[`"\'](?:https?|wss?)://']
parts = [('主文件', s)]
for m in re.finditer(r'<script type="text/plain" id="(wb5(?:html|blob)-[^"]+)"([^>]*)>(.*?)</script>', s, re.S):
    body = m.group(3).strip()
    if body.startswith('gz:'): body = body[3:]
    try: parts.append((m.group(1), gzip.decompress(base64.b64decode(body)).decode('utf-8', 'ignore')))
    except Exception: parts.append((m.group(1), body if not body.startswith('data:') else ''))
bad = [(n, p, len(re.findall(p, t, re.I))) for n, t in parts for p in PATS if re.search(p, t, re.I)]
for n, p, c in bad: print('VIOLATION', n, p, c)
print(f'offlinecheck: 扫描 {len(parts)} 段 →', 'OK' if not bad else f'FAIL（{len(bad)} 项）'); sys.exit(1 if bad else 0)
