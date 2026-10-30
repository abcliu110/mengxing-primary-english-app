"""embed_app.py <页签> <幕序号(0 起)> <out.html> [...更多「序号 out.html」] —— 把 v5.1 重画好的白板替换进主 App（改一个替换一个）。
做法（幂等，可重复执行）：
  1. 每一幕的独立 HTML 存进主文件 <script type="text/plain" id="wb5html-<页签>-<序号>">（按需加载，不打开不解析）；
     内容里的 </script 改写成 </wb5-script，挂载时再还原。
  2. 第一次运行时给主文件装一小段运行时（标记 WB5_EMBED）：
     wbStageHtml 发现这一幕有 v5 版 → 输出 iframe（srcdoc）代替旧 SVG 舞台；startSuperLabCanvasLoop 发现 iframe → 挂载、不再跑旧循环。
     没有 v5 版的幕照旧走旧 SVG（所以可以一幕一幕地替换）。旧案例代码（WB_LAB）不删，术语小词典仍从旧案例读。
用法例：python3 v5/embed_app.py tense_matrix 1 v5/out/tense_matrix_2.html"""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[3]
APP = ROOT / '萌星小学英语_最终合并版.html'
tab, pairs = sys.argv[1], sys.argv[2:]
s = APP.read_text(encoding='utf-8')

RUNTIME = r'''
// WB5_EMBED：v5.1 重画版白板（独立 HTML，iframe srcdoc）。没有 v5 版的幕照旧走旧 SVG 舞台。由 docs/whiteboard/v5/embed_app.py 安装。
function wb5El(tab, idx) { return typeof document === "undefined" ? null : document.getElementById("wb5html-" + tab + "-" + (idx | 0)); }
function wb5StageHtml(tab, idx, withGloss) {
  return `
        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#eceae6; margin-bottom:14px;">
          <iframe id="wb5Frame" data-tab="${tab}" data-case="${idx | 0}" title="白板动画" allow="autoplay" style="width:100%; height:560px; border:0; display:block;"></iframe>
        </div>${withGloss ? wbGlossHtml(tab, idx | 0) + '<div style="height:14px;"></div>' : ""}`;
}
function wb5Mount(fr) {
  if (fr.getAttribute("data-on")) return;
  const el = wb5El(fr.getAttribute("data-tab"), fr.getAttribute("data-case"));
  if (!el) return;
  fr.setAttribute("data-on", "1");
  try { if (typeof wbStopSpeech === "function") wbStopSpeech(); if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
  const fit = () => { try { const d = fr.contentDocument; if (d && d.body) fr.style.height = Math.ceil(d.documentElement.scrollHeight) + "px"; } catch (e) {} };
  fr.addEventListener("load", () => { fit(); setTimeout(fit, 300); try { new ResizeObserver(fit).observe(fr.contentDocument.body); } catch (e) {} });
  fr.srcdoc = el.textContent.replace(/<\/wb5-script/g, "</script");
}
'''
if 'WB5_EMBED' not in s:
    i = s.index('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {')
    s = s[:i] + RUNTIME.lstrip('\n') + s[i:]
    s = s.replace('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {\n',
                  'function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {\n  if (svgId === "wbStage" && wb5El(tab, idx)) return wb5StageHtml(tab, idx, withGloss);   // WB5_EMBED\n', 1)
    s = s.replace('  const wbStage = document.getElementById("wbStage");\n  if (wbStage && typeof WB !== "undefined") { startWBLoop(wbStage); return; }',
                  '  const wb5F = document.getElementById("wb5Frame");   // WB5_EMBED\n  if (wb5F) { wb5Mount(wb5F); return; }\n  const wbStage = document.getElementById("wbStage");\n  if (wbStage && typeof WB !== "undefined") { startWBLoop(wbStage); return; }', 1)
    assert s.count('WB5_EMBED') == 3, s.count('WB5_EMBED')

anchor = s.index('<script type="text/plain" id="wbmod-')
for k in range(0, len(pairs), 2):
    idx, f = int(pairs[k]), pathlib.Path(pairs[k + 1]).resolve()
    html = f.read_text(encoding='utf-8').replace('</script', '</wb5-script')
    assert '<!--' not in html
    blk = f'<script type="text/plain" id="wb5html-{tab}-{idx}" data-src="docs/whiteboard/v5/{f.relative_to(ROOT / "docs/whiteboard/v5")}">{html}</script>\n'
    pat = re.compile(rf'<script type="text/plain" id="wb5html-{re.escape(tab)}-{idx}"[^>]*>.*?</script>\n', re.S)
    if pat.search(s): s = pat.sub(lambda m: blk, s, 1)
    else: anchor = s.index('<script type="text/plain" id="wbmod-'); s = s[:anchor] + blk + s[anchor:]
    print('embedded', tab, idx, f.name, len(html), 'bytes')
APP.write_text(s, encoding='utf-8')
print('app', APP.stat().st_size, 'bytes')
