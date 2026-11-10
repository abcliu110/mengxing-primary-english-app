// wave7_wbscenes_geom_probe.mjs —— 浏览器实测演员右缘：对打包 out/*.html，用 window.__seek 跳到目标朗读句
// 的几个时刻，读 1920×1080 canvas 像素，报最右非底色（#FBFBFB）像素 x。画布即世界坐标（z=1 时 canvas x = 演员右缘），
// x=1919 表示演员被画布右缘裁切（超画布）；x≤1880 表示落在演员窗内。
// 用法：node docs/work-2026-11-09/wave7_wbscenes_geom_probe.mjs <out.html> "<句中片段>" [shot.png]
// 句中片段匹配 window.__cues 的英文；在句首 +0.5/+1.5/+2.5/+3.5s 各取一帧，取最右。
import { chromium } from '/home/hatch/workspace/hanzi-app/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'url';
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const [file, frag, shot] = process.argv.slice(2);
if (!file || !frag) { console.error('用法：node wave7_wbscenes_geom_probe.mjs <out.html> "<句片段>" [shot.png]'); process.exit(2); }
const browser = await chromium.launch({ executablePath: EXE });
const pg = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errs = [];
pg.on('pageerror', e => errs.push(String(e)));
await pg.goto(pathToFileURL(file).href);
await pg.waitForFunction('window.__dur > 0', null, { timeout: 30000 });
await pg.waitForTimeout(500);
const cue = await pg.evaluate(f => {
  const c = (window.__cues || []).find(([t, en]) => en && en.includes(f));
  return c ? c[0] : null;
}, frag);
if (cue === null) { console.log(`${file.split('/').pop()} CUE-NOT-FOUND ${frag}`); await browser.close(); process.exit(1); }
let worst = -1, worstT = null;
for (const dt of [0.5, 1.5, 2.5, 3.5]) {
  const t = cue + dt;
  await pg.evaluate(s => window.__seek(s), t);
  await pg.waitForTimeout(250);
  const m = await pg.evaluate(() => {
    const cv = document.getElementById('stage');
    const g = cv.getContext('2d');
    const d = g.getImageData(0, 0, cv.width, cv.height).data;
    let mx = -1, my = -1;
    for (let y = 0; y < cv.height; y++) {
      for (let x = cv.width - 1; x > mx; x--) {
        const i = (y * cv.width + x) * 4;
        const r = d[i], gg = d[i + 1], b = d[i + 2];
        if (Math.abs(r - 251) > 14 || Math.abs(gg - 251) > 14 || Math.abs(b - 251) > 14) { mx = x; my = y; break; }
      }
    }
    return { mx, my };
  });
  if (m.mx > worst) { worst = m.mx; worstT = t; }
}
console.log(`${file.split('/').pop()} cue@${cue.toFixed(1)}s "${frag}" 最右非底色像素 x=${worst}（@t=${worstT.toFixed(1)}s）${worst >= 1915 ? ' ← 触右缘/被裁' : worst <= 1880 ? ' ← 在窗内' : ''} errors=${errs.length ? JSON.stringify(errs.slice(0, 2)) : 'none'}`);
if (shot) { await pg.evaluate(s => window.__seek(s), worstT); await pg.waitForTimeout(250); await pg.locator('#stage').screenshot({ path: shot }); console.log('shot:', shot); }
await browser.close();
