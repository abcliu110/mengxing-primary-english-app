# 决策 38 联络表：python3 sheet38.py <out.html> <png> [--times t1,t2,…]  —— 390 px 宽（手机）8 帧，2 列
import asyncio, base64, io, sys, pathlib
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw
html, out = pathlib.Path(sys.argv[1]).resolve(), sys.argv[2]
TS = None
if '--times' in sys.argv: TS = [float(x) for x in sys.argv[sys.argv.index('--times') + 1].split(',')]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(html.as_uri()); await pg.evaluate('window.__ready'); dur = await pg.evaluate('window.__dur')
        ts = TS or [dur * (i + 0.5) / 8 for i in range(8)]
        tiles = []
        for t in ts:
            d = await pg.evaluate(f'(()=>{{window.__seek({t});return document.getElementById("stage").toDataURL("image/png")}})()')
            tiles.append((t, Image.open(io.BytesIO(base64.b64decode(d.split(',')[1]))).convert('RGB').resize((390, 219), Image.LANCZOS)))
        await b.close()
    rows = (len(tiles) + 1) // 2; sh = Image.new('RGB', (2 * 390 + 30, rows * 229 + 10), '#d8d6d2')
    for i, (t, im) in enumerate(tiles):
        x, y = 10 + (i % 2) * 400, 10 + (i // 2) * 229; sh.paste(im, (x, y)); ImageDraw.Draw(sh).text((x + 4, y + 4), f'{t:.1f}s', fill='#EF7226')
    sh.save(out); print('dur', dur, 'errors', errs or 'none', out)
asyncio.run(main())
