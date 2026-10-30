// vocab_extract.js <主文件> —— 打印完整 VOCAB_DB（JSON）。决策 29 O1 之后 VOCAB_DB 拆成「首屏轻字段」+「按需重字段 VOCAB_HEAVY_JSON」，
// 各工具（gen_mindmap_inventory / gen_poly_inventory / gen_module_quiz / check_wordcard_tpl / gen_mindmap_groups）统一用它取全量数据。
const fs = require('fs'); const s = fs.readFileSync(process.argv[2], 'utf8');
const i = s.indexOf('const VOCAB_DB = '); const j = s.indexOf('];\n', i);
const db = eval(s.slice(i + 16, j + 1));
const t = '<script type="application/json" id="VOCAB_HEAVY_JSON">'; const a = s.indexOf(t);
if (a >= 0) { const h = JSON.parse(s.slice(a + t.length, s.indexOf('</script>', a))); for (const w of db) Object.assign(w, h[w.id] || {}); }
process.stdout.write(JSON.stringify(db));
