"""patch_etym_card.py —— 词卡词源分两块显示（决策 25 / HANDOFF §5.2 1b，幂等）。
① 📖 真实词源 📜：读 <script type="application/json" id="ETYM_DB_JSON">（build_etym_db.py 写入），按需 JSON.parse；
   有条目 = 来源链 + 两个出处链接；没有 = 写「暂未收录」。真实构词（MORPH_DB_JSON，有就显示）。
② 💡 巧记小故事：原 etymology 原文（只把「📖 【秒懂巧记小故事】」类前缀换成新标题），没有就用 memory_tip。R1：旧文字不删。"""
import pathlib, re, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = '// ETYM_CARD_V1'
FUNCS = r'''
// ETYM_CARD_V1 ---------- 词卡：真实词源（ETYM_DB / MORPH_DB，Wiktionary + Etymonline 互证）与 💡 巧记小故事分开显示 ----------
var __etymCache = {};
function etymData(id) { if (!(id in __etymCache)) { const el = document.getElementById(id); try { __etymCache[id] = el ? JSON.parse(el.textContent) : {}; } catch (e) { __etymCache[id] = {}; } } return __etymCache[id]; }
function etymLookup(id, w) { if (w && /^V6_MORPH_/.test(w.id || "")) return null; const d = etymData(id), k = String((w && w.word) || "").trim(); return d[k] || d[k.toLowerCase()] || null; }   // DEDUP_A：变形词（saw / drove / felt…）按拼写会查到同形名词的词源，不查
function etymIsPlaceholderTip(t) { t = String(t || "").trim(); return /^记忆锦囊：属于【[^】]*】高频核心词。?$/.test(t) || t === "考场必考不规则/拼写变形词"; }   // DEDUP_A：V6 扩展词的占位文字，不当巧记显示
function etymEsc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function etymTipText(w) {
  const t = String(w.etymology || w.memory_tip || "").replace(/^📖\s*【[^】]*】\s*/, "");
  return etymIsPlaceholderTip(t) ? "" : t;
}
function etymRealHtml(w) {
  const e = etymLookup("ETYM_DB_JSON", w), m = etymLookup("MORPH_DB_JSON", w);
  const kind = e ? ({ native: "英语本族词（从古英语一路传下来）", loan: "外来词（从别的语言来到英语）", other: "" }[e.k] || "") : "";
  const chain = e ? `<div style="font-family:Georgia,serif; line-height:1.7;"><b>${etymEsc(w.word)}</b> ${e.c.map(c => `<span style="white-space:nowrap;">← <span style="color:#64748b; font-family:inherit;">${etymEsc(c[0])}</span> <i>${etymEsc(c[1])}</i>${c[2] ? `<span style="color:#64748b;">（${etymEsc(c[2])}）</span>` : ""}</span>`).join(" ")}</div>` : "";
  const morph = m ? `<div style="margin-top:4px;">🧩 真实构词：${m.p.map(p => `<b>${etymEsc(p[0])}</b>${p[1] ? `<span style="color:#64748b;">（${etymEsc(p[1])}）</span>` : ""}`).join(" + ")} ${m.k === "compound" ? "（合成词）" : "（加词缀）"}</div>` : "";
  const src = (e || m) ? `<div style="font-size:0.74rem; color:#64748b; margin-top:4px;">出处：<a href="https://en.wiktionary.org/wiki/${encodeURIComponent((e || m).w)}#Etymology" target="_blank" rel="noopener">Wiktionary</a> · <a href="https://www.etymonline.com/word/${encodeURIComponent((e || m).e)}" target="_blank" rel="noopener">Etymonline</a>（两处对得上才收录）</div>` : "";
  return `<div data-etym="${e ? "real" : "none"}" style="background:#fff; padding:12px 14px; border-radius:12px; border-left:4px solid #2563eb;">
    <div style="font-weight:900; color:#1e40af; font-size:0.9rem;">📖 词源 ${typeof wbBadgeHtml === "function" && (e || m) ? wbBadgeHtml(["📜"]) : "<span style=\"color:#64748b; font-weight:700; font-size:0.8rem;\">（真实词源）</span>"}</div>
    <div style="font-size:0.9rem; color:#334155; margin-top:4px;">${e || m ? `${kind ? `<div style="font-weight:800; color:#1e3a8a;">${kind}</div>` : ""}${chain}${morph}${src}` : `<span style="color:#64748b;">暂未收录：两本词源词典还没能互相印证，先不写，免得讲错。</span>`}</div>
  </div>`;
}
function etymTipHtml(w) {
  const t = etymTipText(w);
  if (!t) {   // DEDUP_A：模板「属于【X】高频核心词」改成主题标签；变形词占位改成指向原形的说明
    const raw = String(w.memory_tip || w.etymology || "").trim(), m = raw.match(/^记忆锦囊：属于【([^】]*)】高频核心词/);
    if (m) return `<div data-etym-theme="1" style="font-size:0.85rem; color:#475569;"><span style="background:#eef2ff; color:#3730a3; border-radius:999px; padding:3px 10px; font-weight:800;">🏷️ ${etymEsc(m[1])}</span> <span style="color:#64748b;">高频核心词</span></div>`;
    if (raw === "考场必考不规则/拼写变形词") return `<div data-etym-theme="1" style="font-size:0.85rem; color:#475569;"><span style="background:#fef3c7; color:#92400e; border-radius:999px; padding:3px 10px; font-weight:800;">🔁 不规则 / 拼写变形词</span> <span style="color:#64748b;">词源看它的原形</span></div>`;
    return "";
  }
  return `<div data-etym-tip="1" style="background:#fffbeb; padding:12px 14px; border-radius:12px; border-left:4px solid #f59e0b;">
    <div style="font-weight:900; color:#92400e; font-size:0.9rem;">💡 巧记小故事 <span style="font-weight:700; color:#b45309; font-size:0.78rem;">（帮助记忆的联想，不是真实词源）</span></div>
    <div style="font-size:0.9rem; color:#334155; margin-top:4px;">${t}</div>
  </div>`;
}
'''
OLD1 = '''          <div style="background:#fff; padding:12px 14px; border-radius:12px; border-left:4px solid #2563eb;">
            <div style="font-weight:900; color:#1e40af; font-size:0.9rem;">📖 词源与巧记故事</div>
            <div style="font-size:0.9rem; color:#334155; margin-top:4px;">${w.etymology || w.memory_tip}</div>
          </div>'''
NEW1 = '''          <!-- ETYM_CARD:modal -->${etymRealHtml(w)}
          ${etymTipHtml(w)}'''
OLD2 = '''      <div style="font-weight:800; color:#0f172a; margin-bottom:6px;">${w.etymology}</div>'''
NEW2 = '''      <!-- ETYM_CARD:grid --><div style="display:grid; gap:8px; margin-bottom:8px;">${etymRealHtml(w)}${etymTipHtml(w)}</div>'''
if MARK in s:   # 已打过：只换函数块（改版式后重跑）
    i = s.index(MARK); i = s.rindex('\n', 0, i) + 1; j = s.index('function woFindScene(id) {', i)
    s = s[:i] + FUNCS.lstrip('\n') + s[j:]; __import__('appwrite').save(s); print('funcs updated')   # O8：写前锚点检查、写后 jscheck，不过就还原
elif True:
    for o in (OLD1, OLD2): assert s.count(o) == 1, o[:60]
    s = s.replace(OLD1, NEW1).replace(OLD2, NEW2)
    anchor = 'function woFindScene(id) {'
    assert s.count(anchor) >= 1
    i = s.index(anchor); s = s[:i] + FUNCS.lstrip('\n') + s[i:]
    __import__('appwrite').save(s); print('patched')   # O8
