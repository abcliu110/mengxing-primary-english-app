"""check_all_out.py [--part k/n] —— 引擎改动后的全量技术回归：打开 out/*.html 每一幕，等 __ready，检查 0 报错、时长、确定性（同一时刻两次绘制一致）。
结果追加到 /tmp/cao_part_k.txt（不入库）；不合格的行以 BAD 开头。"""
import asyncio, glob, pathlib, sys
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent
part = sys.argv[sys.argv.index('--part') + 1] if '--part' in sys.argv else '0/1'; K, N = map(int, part.split('/'))
files = sorted(glob.glob(str(HERE / 'out/*.html')))[K::N]
async def main():
    out = open(f'/tmp/cao_part_{K}.txt', 'w')
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for f in files:
            pg = await b.new_page(viewport={'width': 1300, 'height': 800}); errs = []
            pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
            try:
                await pg.goto(pathlib.Path(f).as_uri()); await pg.evaluate('window.__ready')
                r = await pg.evaluate("""(()=>{const d=window.__dur, c=document.getElementById('stage'); const g=t=>{window.__seek(t);return c.toDataURL()};
                  let ok=true; for (const f of [0.3,0.7]) { if (g(d*f)!==g(d*f)) ok=false; } return [d, ok]})()""")
                bad = errs or not r[1] or not r[0]
                out.write(f"{'BAD ' if bad else ''}{pathlib.Path(f).name} dur {r[0]:.0f} det {r[1]} errs {errs[:2]}\n")
            except Exception as e:
                out.write(f'BAD {pathlib.Path(f).name} {e}\n')
            out.flush(); await pg.close()
        await b.close()
asyncio.run(main())
