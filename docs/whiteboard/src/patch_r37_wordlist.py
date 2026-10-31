"""patch_r37_wordlist.py —— 决策 37 / R37-10：单词表分页 + 字母索引（幂等；标记 R37_10_WORDLIST）。
现状：word_list 一次渲染全部 1436 张卡（手机上首屏卡顿、滚很久）。
改法：每页 40 张（WL_PAGE），上下各一条翻页条（⏮ ◀ 第 n / N 页 ▶ ⏭）；新增「🔤 首字母」索引（只列当前筛选里有的字母，点了按首字母筛）；
任何筛选 / 搜索变化回到第 1 页。单词卡弹窗的「上一个 / 下一个」仍按整个筛选结果走（contextIds 传全量）。
「共 N 词」与 data-wl-count 仍是筛选结果总数。检查：src/wordlistcheck.py（入 runall），app_check15 的「网格卡数 = 总数」改成「= min(总数, 40)」。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); n = 0
R = [
 # 首字母筛选
 ('''    && (!p.grade || w.id.split("_")[0] === p.grade) && (!q || w.word.toLowerCase().includes(q) || String(w.meaning).includes(q)));
}''', '''    && (!p.grade || w.id.split("_")[0] === p.grade) && (!q || w.word.toLowerCase().includes(q) || String(w.meaning).includes(q))
    && (!p.letter || (w.word || "").trim().charAt(0).toUpperCase() === p.letter));   // R37_10_WORDLIST：首字母
}'''),
 # 分页
 ('''function wlGridHtml(p) {
  const list = wlFilter(p);
  return `<div data-wl-count="${list.length}" style="font-weight:800; color:#475569; margin:4px 0 10px;">共 ${list.length} 词</div>` + (p.sight && list.length ? wlSightCards(list) : renderWordGridHTML(list, list.map(w => w.id)));
}''', '''const WL_PAGE = 40;   // R37_10_WORDLIST：每页 40 张
function wlPager(page, pages, total) {
  if (pages <= 1) return "";
  const b = (t, to, on) => `<button class="pill-tab" ${on ? "" : "disabled style=\\"opacity:.4\\""} onclick="wlGo(${to})">${t}</button>`;
  return `<div data-wl-pager style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; justify-content:center; margin:10px 0;">${b("⏮", 0, page > 0)}${b("◀ 上一页", page - 1, page > 0)}<span style="font-weight:900; color:#1e3a8a; padding:0 6px;">第 ${page + 1} / ${pages} 页</span>${b("下一页 ▶", page + 1, page < pages - 1)}${b("⏭", pages - 1, page < pages - 1)}</div>`;
}
function wlGo(pg) { currentView.params.page = pg; const g = document.getElementById("wlGrid"); if (!g) return; g.innerHTML = wlGridHtml(currentView.params); const y = g.getBoundingClientRect().top + window.scrollY - 70; window.scrollTo(0, Math.max(0, y)); }
function wlGridHtml(p) {
  const list = wlFilter(p), pages = Math.max(1, Math.ceil(list.length / WL_PAGE)), page = Math.min(pages - 1, Math.max(0, p.page | 0));
  const part = list.slice(page * WL_PAGE, page * WL_PAGE + WL_PAGE), pager = wlPager(page, pages, list.length);
  return `<div data-wl-count="${list.length}" data-wl-page="${page}" data-wl-pages="${pages}" style="font-weight:800; color:#475569; margin:4px 0 10px;">共 ${list.length} 词${pages > 1 ? `（每页 ${WL_PAGE} 词，第 ${page * WL_PAGE + 1}–${page * WL_PAGE + part.length} 个）` : ""}</div>` + pager
    + (p.sight && list.length ? wlSightCards(part) : renderWordGridHTML(part, list.map(w => w.id))) + pager;
}'''),
 # 任何筛选变化回第 1 页
 ('''function wlSet(k, v) { const p = currentView.params; if (v === "" || v == null || p[k] === v) delete p[k]; else p[k] = v; renderWordListView(); }''',
  '''function wlSet(k, v) { const p = currentView.params; if (v === "" || v == null || p[k] === v) delete p[k]; else p[k] = v; delete p.page; renderWordListView(); }   // R37_10_WORDLIST：换筛选回第 1 页'''),
 ('''oninput="currentView.params.q=this.value; document.getElementById('wlGrid').innerHTML = wlGridHtml(currentView.params);"''',
  '''oninput="currentView.params.q=this.value; delete currentView.params.page; document.getElementById('wlGrid').innerHTML = wlGridHtml(currentView.params);"'''),
 # 首字母索引条
 ('''    <div id="wlGrid">${wlGridHtml(p)}</div>`;
}''', '''    ${wlLetterBar(p)}
    <div id="wlGrid">${wlGridHtml(p)}</div>`;
}
function wlLetterBar(p) {   // R37_10_WORDLIST：首字母索引（只列当前筛选里有的字母）
  const q = Object.assign({}, p); delete q.letter; delete q.page;
  const have = new Set(wlFilter(q).map(w => (w.word || "").trim().charAt(0).toUpperCase()).filter(c => /[A-Z]/.test(c)));
  if (have.size < 2) return "";
  return `<div data-wl-letters class="pill-tabs" style="margin:0 0 10px; gap:4px; flex-wrap:nowrap; overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:4px;"><span style="font-weight:900; color:#475569; font-size:0.84rem; align-self:center;">🔤 首字母</span>${[...have].sort().map(c => wlChip(c, p.letter === c, `wlSet('letter', '${c}')`, `data-wl-letter="${c}"`)).join("")}</div>`;
}'''),
 # 清除筛选也清 letter
 ('''${(p.theme || p.pos || p.sight || p.grade || p.q) ? wlChip(''', '''${(p.theme || p.pos || p.sight || p.grade || p.q || p.letter) ? wlChip('''),
]
for old, new in R:
    if new in s: continue
    assert s.count(old) == 1, old[:60]; s = s.replace(old, new); n += 1
if n: __import__('appwrite').save(s)
print('patched', n)
