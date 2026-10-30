// 打包成单文件 HTML：node v51/build51.mjs → out/take_out_v51.html
import { build } from 'esbuild';
import { writeFileSync, mkdirSync } from 'fs';
const r = await build({ entryPoints: [new URL('./player51.js', import.meta.url).pathname], bundle: true, minify: true, write: false,
  format: 'iife', loader: { '.woff': 'dataurl' }, legalComments: 'none' });
const js = r.outputFiles[0].text.replace(/<\/script/g, '<\\/script');
const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>He takes the dog out. · v5.1</title>
<style>html,body{margin:0;background:#eceae6;font:15px system-ui}#wrap{max-width:1200px;margin:16px auto;padding:0 12px}
canvas{width:100%;aspect-ratio:16/9;display:block;background:#FBFBFB;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,.12);cursor:pointer}
#ctl{display:flex;gap:10px;align-items:center;margin-top:8px}#play{width:44px;height:32px;border:0;border-radius:8px;background:#0A0503;color:#fff;font-size:15px;cursor:pointer}
#voice{width:44px;height:32px;border:0;border-radius:8px;background:#fff;font-size:16px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.15)}#bar{flex:1;accent-color:#EF7226}#time{font-variant-numeric:tabular-nums;color:#555;min-width:96px;text-align:right}</style></head>
<body><div id="wrap"><canvas id="stage"></canvas><div id="ctl"><button id="play">▶</button><button id="voice"></button><input id="bar" type="range" min="0" value="0"><span id="time"></span></div></div>
<script>${js}</script></body></html>`;
mkdirSync(new URL('../out/', import.meta.url).pathname, { recursive: true });
const out = new URL('../out/take_out_v51.html', import.meta.url).pathname;
writeFileSync(out, html);
console.log(out, html.length, 'bytes');
