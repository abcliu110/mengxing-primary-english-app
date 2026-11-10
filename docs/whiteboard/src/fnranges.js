// fnranges.js <主文件> —— 打印主文件里所有直接执行的 <script> 中顶层 function 声明的位置（JSON：name, start, end, bodyStmts）。
// 供 deadcode.py 用（原 retire_canvas.py 已于 2026-11-10 第七波退役）：截掉旧 canvas 兜底、找出因此变成无人调用的绘图函数。acorn 已随仓库进 ./vendor/acorn.js（acorn 8.19.0，MIT，见同目录 acorn-LICENSE.txt；2026-11-10 收尾线第 (c) 项由 /tmp 易失路径改为仓库内自带——/tmp/acorn 重启/换机即失，不再是唯一依赖）；require 顺序：仓库内自带 → NODE_PATH/全局 → 旧 /tmp/acorn 兜底。
const fs = require('fs');
let acorn;
try { acorn = require('./vendor/acorn.js'); }
catch (e1) { try { acorn = require('acorn'); } catch (e2) { acorn = require('/tmp/acorn/node_modules/acorn'); } }
const s = fs.readFileSync(process.argv[2], 'utf8');
const LS = new Int32Array(s.length + 1); for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); LS[i + 1] = LS[i] + (c >= 0xDC00 && c <= 0xDFFF ? 1 : 0); }
const cp = i => i - LS[i];   // UTF-16 下标 → 码位下标（Python 字符串下标）
const re = /<script([^>]*)>([\s\S]*?)<\/script>/g; let m; const out = [];
while ((m = re.exec(s))) {
  const attrs = m[1]; if (/type=/.test(attrs) && !/type="(text\/javascript|module)"/.test(attrs)) continue; if (/src=/.test(attrs)) continue;
  const off = m.index + m[0].indexOf('>') + 1; const code = m[2];
  let ast; try { ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true }); } catch (e) { console.error('parse fail at', off, e.message); continue; }
  for (const n of ast.body) if (n.type === 'FunctionDeclaration' && n.id)
    out.push({ name: n.id.name, start: cp(off + n.start), end: cp(off + n.end), body: n.body.body.map(b => ({ type: b.type, start: cp(off + b.start), end: cp(off + b.end) })) });
}
process.stdout.write(JSON.stringify(out));
