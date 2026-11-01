# 审片图：python3 v5/shots_hd.py <out.html> <sheet.png> "t:标签[:x0,y0,x1,y1]" …（裁切框为 1920×1080 画布像素，可省略 = 整帧）
# 每格一个时刻 + 中文标签；同时报告控制台报错、同 t 两次截图是否一致（确定性）。2 列排版，格子 900×506。
import asyncio, base64, io, sys, pathlib
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFont
html, sheet = pathlib.Path(sys.argv[1]).resolve(), sys.argv[2]
SPECS = []
for a in sys.argv[3:]:
    p = a.split(':'); t = float(p[0]); lab = p[1] if len(p) > 1 else ''; box = tuple(int(v) for v in p[2].split(',')) if len(p) > 2 else None
    SPECS.append((t, lab, box))
FONT = '/workspace/work/fonts/wk.ttf'
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page(viewport={'width': 1300, 'height': 800}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(html.as_uri()); await pg.evaluate('window.__ready')
        grab = lambda t: pg.evaluate(f'(()=>{{window.__seek({t});return document.getElementById("stage").toDataURL("image/png")}})()')
        tiles = []
        for t, lab, box in SPECS:
            im = Image.open(io.BytesIO(base64.b64decode((await grab(t)).split(',')[1]))).convert('RGB')
            if box: im = im.crop(box)
            tiles.append((t, lab, im))
        a = await grab(SPECS[0][0]); await grab(0.3); same = a == await grab(SPECS[0][0])
        await b.close()
    TW, TH, cols = 900, 506, 2; rows = (len(tiles) + cols - 1) // cols
    sh = Image.new('RGB', (TW * cols + 12 * (cols + 1), (TH + 44) * rows + 12), '#d8d6d2'); d = ImageDraw.Draw(sh)
    f = ImageFont.truetype(FONT, 28)
    for i, (t, lab, im) in enumerate(tiles):
        x, y = 12 + (i % cols) * (TW + 12), 12 + (i // cols) * (TH + 44)
        im = im.copy(); im.thumbnail((TW, TH)); sh.paste(im, (x + (TW - im.width) // 2, y + 40))
        d.text((x + 4, y + 4), f'{i + 1}. t={t:.2f}s  {lab}', fill='#EF7226', font=f)
    sh.save(sheet)
    print('deterministic', same, 'errors', errs or 'none')
asyncio.run(main())
