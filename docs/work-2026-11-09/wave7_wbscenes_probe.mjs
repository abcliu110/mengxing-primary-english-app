// wave7_wbscenes_probe.mjs —— 一次性探针：读打包 out/*.html 的 window.__dur（同 durcheck.py --scan 口径：640×360，等 __dur > 0）。
// Chromium 1254 未装上，改用本机已装的 chromium_headless_shell-1248（executablePath 直指二进制）；playwright 用 hanzi-app 的 node 模块（免重装）。
// 用法：node docs/work-2026-11-09/wave7_wbscenes_probe.mjs docs/whiteboard/v5/out/<幕>.html [...]
import { chromium } from '/home/hatch/workspace/hanzi-app/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'url';
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const files = process.argv.slice(2);
if (!files.length) { console.error('用法：node wave7_wbscenes_probe.mjs <out.html> [...]'); process.exit(2); }
const browser = await chromium.launch({ executablePath: EXE });
for (const f of files) {
  const pg = await browser.newPage({ viewport: { width: 640, height: 360 } });
  const errs = [];
  pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  pg.on('pageerror', e => errs.push(String(e)));
  try {
    await pg.goto(pathToFileURL(f).href);
    await pg.waitForFunction('window.__dur > 0', null, { timeout: 30000 });
    const dur = await pg.evaluate('window.__dur');
    console.log(`${f.split('/').pop()} __dur=${Number(dur).toFixed(1)}s errors=${errs.length ? JSON.stringify(errs.slice(0, 3)) : 'none'}`);
  } catch (e) { console.log(`${f.split('/').pop()} PROBE-FAIL ${String(e).slice(0, 120)} errors=${JSON.stringify(errs.slice(0, 3))}`); }
  await pg.close();
}
await browser.close();
