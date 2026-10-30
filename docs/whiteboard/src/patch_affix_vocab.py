"""patch_affix_vocab.py —— 决策 34-A：构词页前缀 / 后缀 / 派生词族加「词库里的真派生词」全量（数据 word_origins/AFFIX_WORDS.json，由 build_affix_db.py 生成）。
- 嵌入 <script type="application/json" id="AFFIX_WORDS_JSON">：{a: [[词缀, prefix|suffix, 中文义, [[词, id, 拆分], …]], …], z: [[词缀, 类型, 中文义, 说明], …]}（每次重跑都整块替换）；
- 构词页 🚀 前缀 / 🎨 后缀 页签末尾：每个词缀一张卡，词库派生词全挂上（点词开词卡、🔊 朗读），再列「词库里没有真派生词的词缀」；
- 📊 派生词族 页签末尾：按词根归组（同一词根在词库里有 ≥2 个派生词的才成族）。
- 词卡构词栏走 MORPH_DB（build_etym_db.py morph 已并入这些派生词）。
幂等：函数块 // AFFIX_VOCAB_V1 与 JSON 块每次整块替换。写回走 appwrite.save。"""
import sys, pathlib, json
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
ROOT = pathlib.Path(__file__).resolve().parents[3]
AW = json.loads((ROOT / 'docs/whiteboard/word_origins/AFFIX_WORDS.json').read_text(encoding='utf-8'))
data = {'a': [[x['affix'], x['type'], x['zh'], [[w[0], w[1], w[2]] for w in x['words']]] for x in AW['affixes']], 'z': [[x['affix'], x['type'], x['zh'], x['note']] for x in AW['zero']]}
s = APP.read_text(encoding='utf-8')
js = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
tag = '<script type="application/json" id="AFFIX_WORDS_JSON">'
if tag in s:
    i = s.index(tag); j = s.index('</script>', i); s = s[:i] + tag + js + s[j:]
else:
    a = '<script type="text/plain" id="wb5html-'; i = s.index(a); s = s[:i] + tag + js + '</script>\n' + s[i:]
FUNCS = r'''// AFFIX_VOCAB_V1 ---------- 决策 34-A：构词页挂词库里的全部真派生词（src/patch_affix_vocab.py，勿手改） ----------
function affixData() { return (typeof etymData === "function") ? etymData("AFFIX_WORDS_JSON") : { a: [], z: [] }; }
function affixWordChip(w) {
  const id = (typeof resolveWordId === "function") ? resolveWordId(w[1]) : w[1];
  return `<span data-affix-word="${w[0]}" title="${attrEscape(w[2])}" style="display:inline-flex; align-items:center; gap:3px; background:#fff; border:1px solid #cbd5e1; border-radius:999px; padding:2px 9px; margin:2px; font-size:0.85rem;"><a href="javascript:void 0" onclick="openWordCardModal('${id}')" style="font-weight:800; color:#1d4ed8;">${w[0]}</a><span style="color:#94a3b8; font-size:0.74rem;">${w[2].replace(/ \+ /g, "+")}</span><button onclick="speakText(${attrEscape(JSON.stringify(w[0]))}, 'en')" style="background:none; border:0; cursor:pointer; padding:0;">🔊</button></span>`;
}
function affixVocabHtml(tab) {
  const d = affixData();
  if (tab === "prefixes" || tab === "suffixes") {
    const type = tab === "prefixes" ? "prefix" : "suffix", list = d.a.filter(x => x[1] === type), zero = d.z.filter(x => x[1] === type), n = list.reduce((t, x) => t + x[3].length, 0);
    return `<div data-affix-vocab="${type}" style="margin-top:18px; background:#f8fafc; border:2px solid #c4b5fd; border-radius:18px; padding:14px 16px;">
      <h3 style="margin:0 0 4px; color:#5b21b6;">📚 词库里的真派生词 · ${tab === "prefixes" ? "前缀" : "后缀"} ${list.length} 个，共 ${n} 词</h3>
      <div style="font-size:0.82rem; color:#64748b; margin-bottom:10px;">从全部单词里找出来、经 Wiktionary / Etymonline 核实的真派生（uncle、under 这类只是长得像的不算）。点单词看词卡。</div>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:10px;">${list.map(x => `<div data-affix="${x[0]}" style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:10px 12px;"><div style="font-weight:900; color:${type === "prefix" ? "#2563eb" : "#059669"};">${x[0]} <span style="font-weight:700; color:#475569; font-size:0.85rem;">${x[2]}</span> <span style="color:#94a3b8; font-size:0.8rem;">（${x[3].length} 词）</span></div><div style="margin-top:4px;">${x[3].map(affixWordChip).join("")}</div></div>`).join("")}</div>
      ${zero.length ? `<div data-affix-zero style="margin-top:12px; font-size:0.85rem; color:#475569;"><b>词库里还没有真派生词的${tab === "prefixes" ? "前缀" : "后缀"}：</b>${zero.map(x => `<span style="display:inline-block; background:#f1f5f9; border-radius:8px; padding:2px 8px; margin:2px;">${x[0]} ${x[2]}</span>`).join("")}</div>` : ""}
    </div>`;
  }
  if (tab === "matrices") {
    const fam = {};
    d.a.forEach(x => x[3].forEach(w => { const base = w[2].split(" + ").filter(q => !/^-|-$/.test(q)).join(" + "); if (base) (fam[base.toLowerCase()] = fam[base.toLowerCase()] || []).push(w); }));
    const rows = Object.keys(fam).filter(b => fam[b].length >= 2).sort((a, b) => fam[b].length - fam[a].length || a.localeCompare(b));
    const baseChip = b => { const id = typeof vocabIdForHeadword === "function" ? vocabIdForHeadword(b) : null; return id ? affixWordChip([b, id, "词根"]) : `<b style="margin-right:4px;">${b}</b>`; };
    return `<div data-affix-family style="margin-top:18px; background:#f8fafc; border:2px solid #93c5fd; border-radius:18px; padding:14px 16px;">
      <h3 style="margin:0 0 4px; color:#1e3a8a;">🌱 词库里的派生词族 · ${rows.length} 族</h3>
      <div style="font-size:0.82rem; color:#64748b; margin-bottom:10px;">同一个词根在词库里派生出 2 个以上单词的，归成一族。</div>
      <div style="display:grid; gap:6px;">${rows.map(b => `<div data-affix-fam="${b}" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:6px 10px;">${baseChip(b)} ➜ ${fam[b].map(affixWordChip).join("")}</div>`).join("")}</div>
    </div>`;
  }
  return "";
}
'''
MARK = '// AFFIX_VOCAB_V1 ----------'
if MARK in s:
    i = s.rindex('\n', 0, s.index(MARK)) + 1; j = min(k for k in (s.find('// GRAMMAR_EX_V1 ----------', i), s.find('// ORAL_FUNC_MAP_V1 ----------', i)) if k > 0); s = s[:i] + FUNCS + s[j:]   # 后面还有语法例句块，不能冲掉
else:
    s = s.replace('// ORAL_FUNC_MAP_V1 ----------', FUNCS + '// ORAL_FUNC_MAP_V1 ----------', 1)
HOOK = '''  setTimeout(() => startFormationStageCanvas(tab), 30);
  setTimeout(() => { const b = document.getElementById("formationBody"); if (b && typeof affixVocabHtml === "function" && !b.querySelector("[data-affix-vocab],[data-affix-family]")) b.insertAdjacentHTML("beforeend", affixVocabHtml(tab)); }, 0);   // AFFIX_VOCAB_V1
'''
if '}, 0);   // AFFIX_VOCAB_V1' not in s:
    old = '  setTimeout(() => startFormationStageCanvas(tab), 30);\n'; assert s.count(old) == 1; s = s.replace(old, HOOK)
save(s); print('ok', len(data['a']), 'affixes', sum(len(x[3]) for x in data['a']), 'pairs')
