"""patch_wb5_parts.py —— 决策 36-② 长幕拆分的「分节」挂载（幂等，走 appwrite）。
有些页签的幕号跟数据绑死（tense_matrix 一时态一幕、第一性原理按 law.acts、G07 固定第 0 幕），长幕不能直接加幕。
做法：长幕拆成两节，第 k 节（k ≥ 2）存成同幕号的子页签 `<页签>_p<k>`（场景文件 `v5/scenes/<页签>_p<k>_<n>.js`，n = 幕号 + 1），
白板下面出「🎬 第 1 节 / 第 2 节 ▶」两个按钮，点了在同一个 iframe 里换节。
嵌入：`python3 v5/rebuild_all.py --tabs=<页签>_p2`（rebuild_all 按文件名自动分出子页签）。回归：`v5/app_check_parts.py`。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = 'WB5_PARTS_V2'
if MARK in s: print('already'); sys.exit(0)
A = '''        </div>${withGloss ? wbGlossHtml(tab, idx | 0) + '<div style="height:14px;"></div>' : ""}`;
}
'''
NEWFN = '''function wb5PartsHtml(tab, idx) {   // WB5_PARTS_V1 WB5_PARTS_V2：长幕分节（决策 36-②），第 k 节 = 子页签 <tab>_p<k> 的同号幕（k ≥ 2）
  let n = 1; while (wb5El(tab + "_p" + (n + 1), idx | 0)) n++;
  if (n < 2) return "";
  const b = k => `<button type="button" data-wb5part="${k}" onclick="wb5Part(this, '${tab}', ${idx | 0}, ${k})" style="background:${k ? '#e2e8f0' : '#2563eb'}; color:${k ? '#0f172a' : '#fff'}; font-weight:900; padding:8px 14px; border-radius:10px; font-size:0.85rem; border:0; min-height:44px;">🎬 第 ${k + 1} 节${k === 1 ? " ▶" : ""}</button>`;
  return `<div class="wb5-parts" style="display:flex; gap:8px; flex-wrap:wrap; margin:-6px 0 12px;">${Array.from({ length: n }, (_, k) => b(k)).join("")}</div>`;
}
function wb5Part(btn, tab, idx, k) {
  const row = btn.closest(".wb5-parts"), box = row && row.previousElementSibling, fr = box && box.querySelector("iframe");
  if (!fr) return;
  row.querySelectorAll("button").forEach(x => { const on = +x.getAttribute("data-wb5part") === k; x.style.background = on ? "#2563eb" : "#e2e8f0"; x.style.color = on ? "#fff" : "#0f172a"; });
  fr.setAttribute("data-tab", k ? tab + "_p" + (k + 1) : tab); fr.setAttribute("data-case", String(idx | 0)); fr.removeAttribute("data-on"); fr.srcdoc = "";
  wb5Mount(fr);
}
'''
if 'WB5_PARTS_V1' in s:   # V1 → V2：只支持第 2 节 → 支持第 2…N 节（_p2、_p3…）
    a = s.index('function wb5PartsHtml(tab, idx) {'); b = s.index('\n}\n', s.index('function wb5Part(btn, tab, idx, k) {')) + 3
    s = s[:a] + NEWFN + s[b:]
    __import__('appwrite').save(s); print('upgraded V1 → V2'); sys.exit(0)
assert s.count(A) == 1, s.count(A)
B = '''        </div>${wb5PartsHtml(tab, idx)}${withGloss ? wbGlossHtml(tab, idx | 0) + '<div style="height:14px;"></div>' : ""}`;
}
''' + NEWFN
s = s.replace(A, B)
__import__('appwrite').save(s); print('patched')
