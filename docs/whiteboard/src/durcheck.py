#!/usr/bin/env python3
"""durcheck.py —— 决策 36-② 长幕检查：单幕 > 120 s 列出（白名单 lab/audit36/dur_allow.json 写理由），目标每节 60–90 s。
  python3 durcheck.py --scan [前缀…]   打开 v5/out/<幕>.html 量 __dur，写 lab/audit36/durations.json（全量约 10 分钟，可只扫前缀）
  python3 durcheck.py                   读 durations.json 判定：> 120 s 且不在白名单 → 不合格；另报 out/ 比 json 新、需重扫的幕。
输出「durcheck 不合格 N」。"""
import asyncio, glob, json, os, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parents[1]; V5 = ROOT / 'v5'
DB = ROOT / 'lab' / 'audit36' / 'durations.json'; ALLOW = ROOT / 'lab' / 'audit36' / 'dur_allow.json'
LIMIT = 120

async def scan(prefixes):
    from playwright.async_api import async_playwright
    db = json.loads(DB.read_text()) if DB.exists() else {}
    files = sorted(glob.glob(str(V5 / 'out' / '*.html')))
    files = [f for f in files if not prefixes or any(pathlib.Path(f).stem.startswith(p) for p in prefixes)]
    async with async_playwright() as p:
        b = await p.chromium.launch()
        async def one(f):
            pg = await b.new_page(viewport={'width': 640, 'height': 360})
            try:
                await pg.goto(pathlib.Path(f).as_uri()); await pg.wait_for_function('window.__dur > 0', timeout=20000)
                db[pathlib.Path(f).stem] = round(await pg.evaluate('window.__dur'), 1)
            except Exception as e: print('skip', f, str(e)[:80])
            await pg.close()
        for i in range(0, len(files), 6): await asyncio.gather(*[one(f) for f in files[i:i + 6]])
        await b.close()
    DB.write_text(json.dumps(dict(sorted(db.items())), ensure_ascii=False, indent=1)); print('scanned', len(files))

def judge():
    db = json.loads(DB.read_text()); allow = json.loads(ALLOW.read_text()) if ALLOW.exists() else {}
    bad = 0
    for k, d in sorted(db.items(), key=lambda x: -x[1]):
        if d <= LIMIT: continue
        why = next((v for a, v in allow.items() if k.startswith(a)), None)
        if why: print(f'⚪ {k} {d:.0f} s（白名单：{why}）')
        else: bad += 1; print(f'❌ {k} {d:.0f} s')
    stale = [pathlib.Path(f).stem for f in glob.glob(str(V5 / 'out' / '*.html')) if os.path.getmtime(f) > DB.stat().st_mtime]
    if stale: print('out/ 比 durations.json 新（需 --scan）：', len(stale))
    print(f'durcheck 不合格 {bad}')

if __name__ == '__main__':
    if '--scan' in sys.argv: asyncio.run(scan([a for a in sys.argv[1:] if not a.startswith('--')]))
    else: judge()
