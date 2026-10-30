"""split_vocab.py —— 决策 29 O1：VOCAB_DB 拆成「首屏轻字段」+「按需重字段」（幂等）。
- 首屏仍是 `const VOCAB_DB = [...]`，只留列表 / 搜索 / 导航要用的轻字段；
- 重字段（下方 HEAVY）挪进 `<script type="application/json" id="VOCAB_HEAVY_JSON">`（不执行，浏览器只当文本），
  每个词对象的原型上挂同名 getter：第一次读任一重字段时才 JSON.parse 整块（约 1 MB），之后走缓存；赋值时变成自有属性（与原来一样可改）。
- 读法不变：`w.senses`、`w.etymology`… 照常；唯一差别：重字段不再是「自有可枚举属性」（全文件核对过：没有对词对象做 JSON.stringify / 展开 / Object.keys / hasOwnProperty）。
- 离线工具统一用 src/vocab_extract.js（或各工具里的合并片段）取全量。"""
import json, re, pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
HEAVY = ['senses', 'affix_root', 'collocations', 'etymology', 'syntax_contrast', 'memory_tip', 'visual_scene', 'example_zh', 'polysemy_data', 'example_en']
MARK = '// VOCAB_SPLIT_V1'
s = APP.read_text(encoding='utf-8')
if MARK in s: print('already'); sys.exit(0)
i = s.index('const VOCAB_DB = '); j = s.index('];\n', i) + 2
db = json.loads(s[i + 16:j - 1])
heavy = {w['id']: {k: w.pop(k) for k in HEAVY if k in w} for w in db}
light = 'const VOCAB_DB = ' + json.dumps(db, ensure_ascii=False, separators=(',', ':')) + ';'
getter = ('\n' + MARK + '：重字段按需解析（src/split_vocab.py）\n(function () {\n'
          f'  const H = {json.dumps(HEAVY)}; let X = null; const P = {{}};\n'
          '  const load = () => X || (X = JSON.parse((document.getElementById("VOCAB_HEAVY_JSON") || {}).textContent || "{}"));\n'
          '  H.forEach(k => Object.defineProperty(P, k, { configurable: true, get() { const r = load()[this.id]; return r ? r[k] : undefined; },\n'
          '    set(v) { Object.defineProperty(this, k, { value: v, writable: true, enumerable: true, configurable: true }); } }));\n'
          '  VOCAB_DB.forEach(w => Object.setPrototypeOf(w, P));\n})();')
s = s[:i] + light + getter + s[j:]
tag = '<script type="application/json" id="VOCAB_HEAVY_JSON">'
blob = json.dumps(heavy, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
k = s.index('<script type="application/json" id="'); s = s[:k] + tag + blob + '</script>\n' + s[k:]
__import__('appwrite').save(s); print('split: light', len(light.encode()), 'heavy', len(blob.encode()))
