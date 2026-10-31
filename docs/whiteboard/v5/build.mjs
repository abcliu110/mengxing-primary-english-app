// 打包一幕为单文件 HTML：node v5/build.mjs <scene.js> <out.html> "<标题>"
// 字体：从场景源码收集用到的字（含讲解字幕），pyftsubset 子集化 LXGW WenKai / Kalam → woff data URI 内嵌。
import { build } from 'esbuild';
import { writeFileSync, readFileSync, mkdirSync, existsSync, copyFileSync, renameSync } from 'fs';
import { createHash } from 'crypto';
import { execFileSync } from 'child_process';
import path from 'path';
const [scenePath, outPath, title = '白板动画 v5'] = process.argv.slice(2);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const FONT_DIR = process.env.WB_FONTS || '/workspace/work/fonts';     // wk.ttf = LXGW WenKai Regular（OFL），kalam.ttf = Kalam Regular（OFL）
const src = readFileSync(scenePath, 'utf8');
// 字体共用：先用全 App 字表 font_chars.txt（gen_font_chars.py 从所有场景收集），这一幕若有新字再并进去（那一幕就会多一份字体，重跑 gen_font_chars.py 后全部重建即可共用）
const GLOBAL = path.join(HERE, 'font_chars.txt');
const chars = new Set([...(existsSync(GLOBAL) ? readFileSync(GLOBAL, 'utf8') : '')].filter(ch => ch.charCodeAt(0) > 127));
[...src].filter(ch => ch.charCodeAt(0) > 127).forEach(ch => chars.add(ch));
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const txt = `/tmp/wb5_chars_${process.pid}.txt`; writeFileSync(txt, ascii + [...chars].sort().join('') + '…「」：，。？！、（）×→←✓✗');
// 2026-10-30：子集化结果按「字体 + 字表」哈希缓存在 /tmp/wb5_fontcache（同一份字表的幕不再重复跑 pyftsubset，全量重建快很多；输出逐字节不变）
const CACHE = '/tmp/wb5_fontcache'; mkdirSync(CACHE, { recursive: true });
const sub = (ttf, out, extra) => {
  const key = createHash('sha1').update(ttf + '\0' + readFileSync(txt, 'utf8') + '\0' + extra.join(' ')).digest('hex'), hit = path.join(CACHE, key + '.woff2');
  if (!existsSync(hit)) { execFileSync('pyftsubset', [ttf, `--text-file=${txt}`, '--flavor=woff2', `--output-file=${out}`, '--layout-features=*', ...extra]); copyFileSync(out, hit + '.' + process.pid); renameSync(hit + '.' + process.pid, hit); }
  return 'data:font/woff2;base64,' + readFileSync(hit).toString('base64'); };
const wk = sub(path.join(FONT_DIR, 'wk.ttf'), `/tmp/wb5_wk_${process.pid}.woff2`, []);
const kalam = sub(path.join(FONT_DIR, 'kalam.ttf'), `/tmp/wb5_kalam_${process.pid}.woff2`, []);
// 引擎（全 App 一份，内容与幕无关）+ 场景（只有这一幕的数据；wb5 / auto / adj_train 从引擎的 globalThis.__WB5__ 取）
const common = { bundle: true, minify: true, write: false, format: 'iife', legalComments: 'none', nodePaths: [path.join(HERE, 'node_modules')] };
const eng = await build({ ...common, entryPoints: [path.join(HERE, 'engine.js')], define: { __FONTS__: JSON.stringify({ wk, kalam }) } });
const SHARED = { 'wb5.js': 'wb5', 'auto.js': 'auto', 'adj_train.js': 'adj_train', 'concept.js': 'concept', 'oral.js': 'oral' };
const shared = { name: 'wb5-shared', setup(b) {
  b.onResolve({ filter: /(^|\/)(wb5|auto|adj_train|concept|oral)\.js$/ }, a => ({ path: SHARED[path.basename(a.path)], namespace: 'wb5shared' }));
  b.onLoad({ filter: /.*/, namespace: 'wb5shared' }, a => ({ contents: `module.exports = globalThis.__WB5__[${JSON.stringify(a.path)}];`, loader: 'js' }));
} };
const scn = await build({ ...common, stdin: { contents: `import b from ${JSON.stringify(path.resolve(scenePath))}; globalThis.__WB5_SCENE__ = b;`, resolveDir: HERE, loader: 'js' }, plugins: [shared] });
const esc = t => t.replace(/<\/script/g, '<\\/script');
const js = esc(eng.outputFiles[0].text), sjs = esc(scn.outputFiles[0].text);
const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>html,body{margin:0;background:#eceae6;font:15px system-ui}#wrap{max-width:1200px;margin:16px auto;padding:0 12px}
canvas{width:100%;aspect-ratio:16/9;display:block;background:#FBFBFB;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,.12);cursor:pointer}
#ctl{display:flex;gap:10px;align-items:center;margin-top:8px}#play{width:44px;height:32px;border:0;border-radius:8px;background:#0A0503;color:#fff;font-size:15px;cursor:pointer}
#voice{width:44px;height:32px;border:0;border-radius:8px;background:#fff;font-size:16px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.15)}#bar{flex:1;accent-color:#EF7226}#time{font-variant-numeric:tabular-nums;color:#555;min-width:110px;text-align:right}</style></head>
<body><div id="wrap"><canvas id="stage"></canvas><div id="ctl"><button id="play">▶</button><button id="voice"></button><input id="bar" type="range" min="0" value="0"><span id="time"></span></div></div>
<script data-wb5-engine>${js}</script><script>${sjs}</script></body></html>`;
mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
writeFileSync(outPath, html);
console.log(outPath, html.length, 'bytes');
