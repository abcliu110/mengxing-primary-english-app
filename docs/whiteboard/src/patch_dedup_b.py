"""patch_dedup_b.py —— 重复内容合并第 2 步（用户 2026-10-31 02:22）：重复词条并到原形 / 主拼写下，旧 id 留别名重定向。
- 别名（51 个，都是 V6 扩展库的空壳词条）：48 个 V6_MORPH 变形词 → 原形（went → go「过去式：went」）；color → colour、gray → grey（「美式：color」）；its → it（「物主代词：its」）。
  别名词条从 VOCAB_DB 列表里拿掉（主题页 / 认读 / 小测干扰项 / 计数都不再出现），按 id 或按词形找它都转到主词条；主词条卡上多一行「过去式：went 🔊」。
- 课标（G1–G6 前缀）单列的词只合并显示、不重定向：center ↔ centre（两个都是 G5 课标词）、studies（G6，原形 study G4）、broken（G5，原形 break 词库未收）。
- 代词组：词组卡（I / me / my / mine…）列出并链接成员单词卡，单词卡链回词组卡；成员单词卡本身是空壳，只链接不复制字段。
- 学习记录：localStorage 键不变；读档时把别名 id 的记录并进主 id（状态 错题 > 学习中 > 已掌握，错次相加，打卡日合并），错题本计数与列表保持一致。
数据 src/dedup_b_data.json（由仓库外调查 B.json 整理，结论见 HANDOFF §5 第 6 项）。幂等，写回走 appwrite.save。"""
import sys, pathlib, json
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
if '// WORD_ALIAS_V1' in s: sys.exit('已打过补丁')
D = json.loads(pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else str(pathlib.Path(__file__).parent / 'dedup_b_data.json')).read_text())
ALIAS = D['alias']
GROUPS = {g: [m for m in ms if m not in ALIAS] for g, ms in D['groups'].items() if ms}
SEE = {   # 只合并显示（课标单列）
    'G5_0689': [['英式', 'G5_0374']], 'G5_0374': [['美式', 'G5_0689']],
    'G6_273': [['原形', 'G4_174']], 'G4_174': [['三单', 'G6_273']],
    'G5_0831': [['原形', 'break（词库未收）']],
}
def rep(old, new, n=1):
    global s
    c = s.count(old); assert c == n, (c, n, old[:80]); s = s.replace(old, new)

JS = '''
// WORD_ALIAS_V1 ---------- 重复词条合并（src/patch_dedup_b.py）：别名 id → [主词条 id, 关系] ----------
const WORD_ALIAS = %s;
const WORD_SEE = %s;
const WORD_GROUP_MEMBERS = %s;
const VOCAB_ALIAS_ENTRY = {};
for (let i = VOCAB_DB.length - 1; i >= 0; i--) if (WORD_ALIAS[VOCAB_DB[i].id]) VOCAB_ALIAS_ENTRY[VOCAB_DB[i].id] = VOCAB_DB.splice(i, 1)[0];
const WORD_GROUP_OF = {}; Object.keys(WORD_GROUP_MEMBERS).forEach(g => WORD_GROUP_MEMBERS[g].forEach(m => { WORD_GROUP_OF[m] = g; }));
function resolveWordId(id) { let k = id, n = 0; while (k && WORD_ALIAS[k] && n++ < 4) k = WORD_ALIAS[k][0]; return k; }
function vocabByIdResolved(id) { const k = resolveWordId(id); return VOCAB_DB.find(w => w.id === k) || null; }
function vocabAliasByWord(clean) { const e = Object.values(VOCAB_ALIAS_ENTRY).find(w => String(w.word).toLowerCase() === clean); return e ? resolveWordId(e.id) : null; }
function wordFormsHtml(w) {
  const chip = (lab, word, id) => `<span style="display:inline-flex; align-items:center; gap:4px; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:999px; padding:2px 10px; margin:2px 4px 2px 0; font-size:0.85rem;"><span style="color:#64748b; font-weight:700;">${lab}：</span>${id ? `<a href="javascript:void 0" data-word-link="${id}" onclick="event.stopPropagation(); openWordCardModal('${id}')" style="font-weight:900; color:#1d4ed8;">${word}</a>` : `<b>${word}</b>`}<button onclick="event.stopPropagation(); speakText(${attrEscape(JSON.stringify(String(word).replace(/（.*$/, "")))}, 'en')" style="background:none; border:0; cursor:pointer; padding:0;">🔊</button></span>`;
  const out = [];
  Object.keys(WORD_ALIAS).forEach(a => { if (WORD_ALIAS[a][0] === w.id && VOCAB_ALIAS_ENTRY[a]) out.push(chip(WORD_ALIAS[a][1], VOCAB_ALIAS_ENTRY[a].word, "")); });
  (WORD_SEE[w.id] || []).forEach(([lab, t]) => { const o = VOCAB_DB.find(x => x.id === t); out.push(o ? chip(lab, o.word, o.id) : chip(lab, t, "")); });
  (WORD_GROUP_MEMBERS[w.id] || []).forEach(m => { const o = VOCAB_DB.find(x => x.id === m); if (o) out.push(chip("单词卡", o.word, o.id)); });
  if (WORD_GROUP_OF[w.id]) { const g = VOCAB_DB.find(x => x.id === WORD_GROUP_OF[w.id]); if (g) out.push(chip("词组卡", g.word, g.id)); }
  return out.length ? `<div data-word-forms onclick="event.stopPropagation();" style="margin-top:6px;">${out.join("")}</div>` : "";
}
function migrateWordAliasRecords() {
  const map = appState.wordRecords || {}, rank = { mistake: 3, learning: 2, mastered: 1, unlearned: 0 };
  Object.keys(map).forEach(a => {
    if (!WORD_ALIAS[a]) return;
    const k = resolveWordId(a), r = map[a], m = map[k];
    if (!m) map[k] = r;
    else {
      if ((rank[r.status] || 0) > (rank[m.status] || 0)) { m.status = r.status; m.streak = r.streak || 0; }
      m.wrongCount = (m.wrongCount || 0) + (r.wrongCount || 0);
      m.streakDays = Array.from(new Set([...(m.streakDays || []), ...(r.streakDays || [])])).sort();
    }
    delete map[a];
  });
}
''' % (json.dumps(ALIAS, ensure_ascii=False), json.dumps(SEE, ensure_ascii=False), json.dumps(GROUPS, ensure_ascii=False))
rep('''  VOCAB_DB.forEach(w => Object.setPrototypeOf(w, P));
})();
''', '''  VOCAB_DB.forEach(w => Object.setPrototypeOf(w, P));
})();
''' + JS.lstrip('\n'))
# 读档迁移
rep('''  appState.ttsUnlocked = !!appState.ttsUnlocked;
}''', '''  appState.ttsUnlocked = !!appState.ttsUnlocked;
  if (typeof migrateWordAliasRecords === "function") migrateWordAliasRecords();   // WORD_ALIAS_V1
}''')
# 记录读写
rep('''function getItemStatus(domain, id) {
  const map = getRecordMap(domain);''', '''function getItemStatus(domain, id) {
  if (domain !== "grammar" && domain !== "oral") id = resolveWordId(id);   // WORD_ALIAS_V1
  const map = getRecordMap(domain);''')
rep('''function getItemRecord(domain, id) {
  const map = getRecordMap(domain);''', '''function getItemRecord(domain, id) {
  if (domain !== "grammar" && domain !== "oral") id = resolveWordId(id);   // WORD_ALIAS_V1
  const map = getRecordMap(domain);''')
# 按词头 / 词形找
rep('''  const hit = VOCAB_DB.find(w => String(w.word).split("/")[0].trim().toLowerCase() === head);
  return hit ? hit.id : null;''', '''  const hit = VOCAB_DB.find(w => String(w.word).split("/")[0].trim().toLowerCase() === head);
  return hit ? hit.id : vocabAliasByWord(head);   // WORD_ALIAS_V1''')
rep('''  const found = VOCAB_DB.find(w => w.word.toLowerCase() === clean || w.word.toLowerCase().startsWith(clean + " "));''',
    '''  const found = VOCAB_DB.find(w => w.word.toLowerCase() === clean || w.word.toLowerCase().startsWith(clean + " ")) || vocabByIdResolved(vocabAliasByWord(clean));   // WORD_ALIAS_V1''')
# 词卡
rep('''function openWordCardModal(wordId, contextIds = []) {
  const w = VOCAB_DB.find(x => x.id === wordId) || VOCAB_DB[0];''', '''function openWordCardModal(wordId, contextIds = []) {
  wordId = resolveWordId(wordId); contextIds = Array.from(new Set((contextIds || []).map(resolveWordId)));   // WORD_ALIAS_V1
  const w = VOCAB_DB.find(x => x.id === wordId) || VOCAB_DB[0];''')
rep('''            <div style="font-size:1rem; color:#475569; font-weight:700;">${w.phonetic} · <span style="color:#2563eb;">${w.pos}</span>${cardModalState.revealed ? ` · <b>${w.meaning}</b>` : " · 中文先藏起来"}</div>''',
    '''            <div style="font-size:1rem; color:#475569; font-weight:700;">${w.phonetic} · <span style="color:#2563eb;">${w.pos}</span>${cardModalState.revealed ? ` · <b>${w.meaning}</b>` : " · 中文先藏起来"}</div>${wordFormsHtml(w)}''')
# 小测
rep('''  const ids = (itemIds && itemIds.length) ? itemIds.slice() : VOCAB_DB.slice(0, 20).map(w => w.id);''',
    '''  let ids = (itemIds && itemIds.length) ? itemIds.slice() : VOCAB_DB.slice(0, 20).map(w => w.id);
  if (domain === "vocab") ids = Array.from(new Set(ids.map(resolveWordId)));   // WORD_ALIAS_V1''')
i = s.index('function mqWords(key) {'); j = s.index('\n', i)
line = s[i:j]
old = '.map(id => VOCAB_DB.find(w => w.id === id)).filter(Boolean)'
assert line.count(old) == 1, line[:300]
s = s[:i] + line.replace(old, '.map(id => vocabByIdResolved(id)).filter((w, k, a) => w && a.indexOf(w) === k)') + '   // WORD_ALIAS_V1' + s[j:]
save(s); print('ok', len(ALIAS), 'aliases')
