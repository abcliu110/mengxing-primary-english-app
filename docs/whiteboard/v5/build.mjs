// 打包一幕为单文件 HTML：node v5/build.mjs <scene.js> <out.html> "<标题>"
// 字体：从场景源码收集用到的字（含讲解字幕），pyftsubset 子集化 LXGW WenKai / Kalam → woff data URI 内嵌。
import { build } from 'esbuild';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { execFileSync } from 'child_process';
import path from 'path';
const [scenePath, outPath, title = '白板动画 v5'] = process.argv.slice(2);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const FONT_DIR = process.env.WB_FONTS || '/workspace/work/fonts';     // wk.ttf = LXGW WenKai Regular（OFL），kalam.ttf = Kalam Regular（OFL）
const src = readFileSync(scenePath, 'utf8');
const chars = new Set([...src].filter(ch => ch.charCodeAt(0) > 127));
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const txt = '/tmp/wb5_chars.txt'; writeFileSync(txt, ascii + [...chars].join('') + '…「」：，。？！、（）×→←✓✗');
const sub = (ttf, out, extra) => { execFileSync('pyftsubset', [ttf, `--text-file=${txt}`, '--flavor=woff', `--output-file=${out}`, '--layout-features=*', ...extra]); return 'data:font/woff;base64,' + readFileSync(out).toString('base64'); };
const wk = sub(path.join(FONT_DIR, 'wk.ttf'), '/tmp/wb5_wk.woff', []);
const kalam = sub(path.join(FONT_DIR, 'kalam.ttf'), '/tmp/wb5_kalam.woff', []);
const r = await build({ entryPoints: [path.join(HERE, 'player.js')], bundle: true, minify: true, write: false, format: 'iife', legalComments: 'none',
  alias: { '@scene': path.resolve(scenePath) }, define: { __FONTS__: JSON.stringify({ wk, kalam }) },
  nodePaths: [path.join(HERE, 'node_modules')] });
const js = r.outputFiles[0].text.replace(/<\/script/g, '<\\/script');
const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>html,body{margin:0;background:#eceae6;font:15px system-ui}#wrap{max-width:1200px;margin:16px auto;padding:0 12px}
canvas{width:100%;aspect-ratio:16/9;display:block;background:#FBFBFB;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,.12);cursor:pointer}
#ctl{display:flex;gap:10px;align-items:center;margin-top:8px}#play{width:44px;height:32px;border:0;border-radius:8px;background:#0A0503;color:#fff;font-size:15px;cursor:pointer}
#voice{width:44px;height:32px;border:0;border-radius:8px;background:#fff;font-size:16px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.15)}#bar{flex:1;accent-color:#EF7226}#time{font-variant-numeric:tabular-nums;color:#555;min-width:110px;text-align:right}</style></head>
<body><div id="wrap"><canvas id="stage"></canvas><div id="ctl"><button id="play">▶</button><button id="voice"></button><input id="bar" type="range" min="0" value="0"><span id="time"></span></div></div>
<script>${js}</script></body></html>`;
mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
writeFileSync(outPath, html);
console.log(outPath, html.length, 'bytes');
