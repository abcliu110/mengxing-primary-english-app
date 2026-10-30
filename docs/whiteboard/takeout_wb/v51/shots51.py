# 关键帧自审：python3 v51/shots51.py → out/v51_keyframes.png（9 个时间点拼成 3×3）
import asyncio, base64, io, pathlib, sys
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw

HERE = pathlib.Path(__file__).resolve().parent.parent
HTML = HERE / 'out' / 'take_out_v51.html'
TIMES = [float(x) for x in sys.argv[1:]] or [1.2, 2.6, 3.3, 3.95, 4.6, 6.2, 7.2, 9.6, 11.4]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1300, 'height': 800})
        errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(HTML.as_uri() + '#still')
        await pg.evaluate('window.__ready')
        tiles = []
        for t in TIMES:
            data = await pg.evaluate(f'(()=>{{window.__seek({t});return document.getElementById("stage").toDataURL("image/png")}})()')
            im = Image.open(io.BytesIO(base64.b64decode(data.split(',')[1]))).convert('RGB')
            im.save(HERE / 'out' / f'v51_{t:05.2f}.png')
            tiles.append((t, im.resize((640, 360))))
        await b.close()
    sheet = Image.new('RGB', (640 * 3 + 40, 360 * 3 + 40), '#d8d6d2')
    for i, (t, im) in enumerate(tiles):
        x, y = 10 + (i % 3) * 650, 10 + (i // 3) * 370
        sheet.paste(im, (x, y)); ImageDraw.Draw(sheet).text((x + 8, y + 6), f't={t:.2f}s', fill='#EF7226')
    sheet.save(HERE / 'out' / 'v51_keyframes.png')
    print('errors:', errs or 'none')

asyncio.run(main())
