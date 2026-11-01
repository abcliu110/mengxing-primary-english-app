// build_stdout.mjs 的打包变体（T15 载荷包专用）：与 build_stdout.mjs 逐行一致，仅 sub() 不同——
// 不做字体子集化（不落盘、无 pyftsubset 调用），返回占位 data URI。
// 安全依据：打包时引擎段（含 __FONTS__）整体被主文件钉住的引擎块引用替换，字体字节不进载荷；
// 场景段文本不受影响（圆环证明 ze_yesno_1 / hd_phonics_2 逐字节通过所用即此变体）。
import { build } from 'esbuild';
import { readFileSync, existsSync, copyFileSync, renameSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { execFileSync } from 'child_process';
import path from 'path';
const [scenePath, outPath, title = '白板动画 v5'] = process.argv.slice(2);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const FONT_DIR = process.env.WB_FONTS || '/workspace/work/fonts';
const src = readFileSync(scenePath, 'utf8');
const GLOBAL = path.join(HERE, 'font_chars.txt');
const chars = new Set([...(existsSync(GLOBAL) ? readFileSync(GLOBAL, 'utf8') : '')].filter(ch => ch.charCodeAt(0) > 127));
[...src].filter(ch => ch.charCodeAt(0) > 127).forEach(ch => chars.add(ch));
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const charsStr = ascii + [...chars].sort().join('') + '…「」：，。？！、（）×→←✓✗';
const sub = (ttf, out, extra) => 'data:font/woff2;base64,UEhBSE9MREVS';
const wk = sub(path.join(FONT_DIR, 'wk.ttf'), `/tmp/wb5_wk_${process.pid}.woff2`, []);
const kalam = sub(path.join(FONT_DIR, 'kalam.ttf'), `/tmp/wb5_kalam_${process.pid}.woff2`, []);
const common = { bundle: true, minify: true, write: false, format: 'iife', legalComments: 'none', nodePaths: [path.join(HERE, 'node_modules')] };
const eng = await build({ ...common, entryPoints: [path.join(HERE, 'engine.js')], define: { __FONTS__: JSON.stringify({ wk, kalam }) } });
const SHARED = { 'wb5.js': 'wb5', 'auto.js': 'auto', 'adj_train.js': 'adj_train', 'concept.js': 'concept', 'oral.js': 'oral', 'poly.js': 'poly', 'props.js': 'props' };
const shared = { name: 'wb5-shared', setup(b) {
  b.onResolve({ filter: /(^|\/)(wb5|auto|adj_train|concept|oral|poly|props)\.js$/ }, a => ({ path: SHARED[path.basename(a.path)], namespace: 'wb5shared' }));
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
process.stdout.write(html);
process.stderr.write(`${outPath} ${html.length} bytes\n`);
