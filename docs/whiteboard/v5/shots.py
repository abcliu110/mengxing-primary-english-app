# 联络表 + 验收：python3 v5/shots.py <out.html> <sheet.png> t1 t2 …
# 同时检查：控制台 0 报错（普通打开 + sandbox iframe）、同一 t 两次截图一致（确定性）、CUES 列表。
import asyncio, base64, io, sys, pathlib
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageChops
html, sheet = pathlib.Path(sys.argv[1]).resolve(), sys.argv[2]
TIMES = [float(x) for x in sys.argv[3:]]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1300, 'height': 800}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(html.as_uri()); await pg.evaluate('window.__ready')
        dur = await pg.evaluate('window.__dur'); cues = await pg.evaluate('window.__cues')
        grab = lambda t: pg.evaluate(f'(()=>{{window.__seek({t});return document.getElementById("stage").toDataURL("image/png")}})()')
        tiles = []
        for t in TIMES:
            im = Image.open(io.BytesIO(base64.b64decode((await grab(t)).split(',')[1]))).convert('RGB'); tiles.append((t, im))
        a = await grab(TIMES[len(TIMES)//2]); await grab(0.5); bb = await grab(TIMES[len(TIMES)//2])
        same = a == bb
        # sandbox iframe
        pg2 = await b.new_page(); errs2 = []
        pg2.on('pageerror', lambda e: errs2.append(str(e))); pg2.on('console', lambda m: m.type == 'error' and errs2.append(m.text))
        await pg2.set_content('<iframe id=f sandbox="allow-scripts" style="width:1200px;height:760px"></iframe>')
        await pg2.evaluate('h=>{document.getElementById("f").srcdoc=h}', html.read_text()); await pg2.wait_for_timeout(2500)
        await b.close()
    cols = 3; rows = (len(tiles) + cols - 1) // cols
    sh = Image.new('RGB', (640 * cols + 10 * (cols + 1), 370 * rows + 10), '#d8d6d2')
    for i, (t, im) in enumerate(tiles):
        x, y = 10 + (i % cols) * 650, 10 + (i // cols) * 370
        sh.paste(im.resize((640, 360)), (x, y)); ImageDraw.Draw(sh).text((x + 8, y + 6), f't={t:.2f}s', fill='#EF7226')
    sh.save(sheet)
    print('dur', dur, 'cues', len(cues or []), 'deterministic', same, 'errors', errs or 'none', 'sandbox', errs2 or 'none')
asyncio.run(main())
