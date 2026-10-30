// fnranges.js <主文件> —— 打印主文件里所有直接执行的 <script> 中顶层 function 声明的位置（JSON：name, start, end, bodyStmts）。
// 供 retire_canvas.py 用：截掉旧 canvas 兜底、找出因此变成无人调用的绘图函数。需要 acorn（npm i acorn，放 /tmp/acorn 或 NODE_PATH）。
const fs = require('fs');
let acorn; try { acorn = require('acorn'); } catch (e) { acorn = require('/tmp/acorn/node_modules/acorn'); }
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
