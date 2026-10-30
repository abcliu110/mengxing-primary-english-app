"""embed_app.py <页签> <幕序号(0 起)> <out.html> [...更多「序号 out.html」] —— 把 v5.1 重画好的白板替换进主 App（改一个替换一个）。
做法（幂等，可重复执行）：
  1. 每一幕的独立 HTML 存进主文件 <script type="text/plain" id="wb5html-<页签>-<序号>">（按需加载，不打开不解析）；
     内容里的 </script 改写成 </wb5-script，挂载时再还原。
  2. 第一次运行时给主文件装一小段运行时（标记 WB5_EMBED）：
     wbStageHtml 发现这一幕有 v5 版 → 输出 iframe（srcdoc）代替旧 SVG 舞台；startSuperLabCanvasLoop 发现 iframe → 挂载、不再跑旧循环。
     没有 v5 版的幕照旧走旧 SVG（所以可以一幕一幕地替换）。旧案例代码（WB_LAB）不删，术语小词典仍从旧案例读。
用法例：python3 v5/embed_app.py tense_matrix 1 v5/out/tense_matrix_2.html
体积（2026-10-30 起）：幕内 ≥2 KB 的图片 / 字体 data URI 按内容哈希抽成共享块 wb5blob-<hash>（同一帧、同一字体全 App 只存一份），其余 HTML gzip 后 base64 存放，挂载时 DecompressionStream 解压再拼回。"""
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
function wb5Mount(fr) {   // WB5_MOUNT_V2：gzip + 共享图片/字体块（wb5blob-*），按需解压
  if (fr.getAttribute("data-on")) return;
  const el = wb5El(fr.getAttribute("data-tab"), fr.getAttribute("data-case"));
  if (!el) return;
  fr.setAttribute("data-on", "1");
  try { if (typeof wbStopSpeech === "function") wbStopSpeech(); if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
  const fit = () => { try { const d = fr.contentDocument; if (d && d.body) fr.style.height = Math.ceil(d.documentElement.scrollHeight) + "px"; } catch (e) {} };
  fr.addEventListener("load", () => { fit(); setTimeout(fit, 300); try { new ResizeObserver(fit).observe(fr.contentDocument.body); } catch (e) {} });
  const text = el.getAttribute("data-gz") ? (() => { const b = atob(el.textContent.trim()), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
    return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text(); })() : Promise.resolve(el.textContent);
  text.then(t => { fr.srcdoc = t.replace(/<\/wb5-script/g, "</script").replace(/@@B:([0-9a-f]{16})@@/g, (m, h) => { const b = document.getElementById("wb5blob-" + h); return b ? b.textContent : ""; }); })
    .catch(e => { try { console.warn("wb5", e); } catch (_) {} });
}
'''
new_mount_js = RUNTIME[RUNTIME.index('function wb5Mount(fr) {'):]
if 'WB5_EMBED' not in s:
    i = s.index('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {')
    s = s[:i] + RUNTIME.lstrip('\n') + s[i:]
    s = s.replace('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {\n',
                  'function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {\n  if (svgId === "wbStage" && wb5El(tab, idx)) return wb5StageHtml(tab, idx, withGloss);   // WB5_EMBED\n', 1)
    s = s.replace('  const wbStage = document.getElementById("wbStage");\n  if (wbStage && typeof WB !== "undefined") { startWBLoop(wbStage); return; }',
                  '  const wb5F = document.getElementById("wb5Frame");   // WB5_EMBED\n  if (wb5F) { wb5Mount(wb5F); return; }\n  const wbStage = document.getElementById("wbStage");\n  if (wbStage && typeof WB !== "undefined") { startWBLoop(wbStage); return; }', 1)
    assert s.count('WB5_EMBED') == 3, s.count('WB5_EMBED')

if 'WB5_EMBED_V2' not in s:   # 第一性原理 / 单词身世 / 中英对照 的舞台也能替换（任意 svgId）
    s = s.replace('  if (svgId === "wbStage" && wb5El(tab, idx)) return wb5StageHtml(tab, idx, withGloss);   // WB5_EMBED\n',
                  '  if (wb5El(tab, idx)) return wb5StageHtml(tab, idx, withGloss);   // WB5_EMBED WB5_EMBED_V2\n', 1)
    M = '  { const wb5F = document.getElementById("wb5Frame"); if (wb5F) { wb5Mount(wb5F); return; } }   // WB5_EMBED_V2\n'
    for a in ['  const fpStage = document.getElementById("fpWbStage");\n', '  const st = document.getElementById("woWbStage");\n', '  const st = document.getElementById("zeWbStage");\n']:
        assert s.count(a) == 1, a; s = s.replace(a, M + a, 1)
    assert s.count('WB5_EMBED_V2') == 4, s.count('WB5_EMBED_V2')

import hashlib, gzip, base64
if 'WB5_MOUNT_V2' not in s:   # 升级已装的运行时
    a = s.index('function wb5Mount(fr) {'); b = s.index('\n}\n', a) + 3
    s = s[:a] + new_mount_js + s[b:]
BLOB = re.compile(r'data:(?:image/webp|font/woff);base64,[A-Za-z0-9+/=]{2000,}')
def pack(html):
    hs = []
    def sub(m):
        h = hashlib.sha1(m.group(0).encode()).hexdigest()[:16]; hs.append(h); blobs.setdefault(h, m.group(0)); return f'@@B:{h}@@'
    html = BLOB.sub(sub, html)
    return base64.b64encode(gzip.compress(html.encode('utf-8'), 9, mtime=0)).decode(), sorted(set(hs))
blobs = {}
anchor = s.index('<script type="text/plain" id="wbmod-')
for k in range(0, len(pairs), 2):
    idx, f = int(pairs[k]), pathlib.Path(pairs[k + 1]).resolve()
    html = f.read_text(encoding='utf-8').replace('</script', '</wb5-script')
    gz, hs = pack(html)
    blk = f'<script type="text/plain" id="wb5html-{tab}-{idx}" data-gz="1" data-blobs="{" ".join(hs)}" data-src="docs/whiteboard/v5/{f.relative_to(ROOT / "docs/whiteboard/v5")}">{gz}</script>\n'
    pat = re.compile(rf'<script type="text/plain" id="wb5html-{re.escape(tab)}-{idx}"[^>]*>.*?</script>\n', re.S)
    if pat.search(s): s = pat.sub(lambda m: blk, s, 1)
    else: anchor = s.index('<script type="text/plain" id="wbmod-'); s = s[:anchor] + blk + s[anchor:]
    print('embedded', tab, idx, f.name, len(html), 'bytes')
# 共享块：缺的补上，没人引用的删掉
used = set(h for m in re.finditer(r'data-blobs="([^"]*)"', s) for h in m.group(1).split())
for h, d in blobs.items():
    if f'id="wb5blob-{h}"' not in s:
        a = s.index('<script type="text/plain" id="wb5html-'); s = s[:a] + f'<script type="text/plain" id="wb5blob-{h}">{d}</script>\n' + s[a:]
s = re.sub(r'<script type="text/plain" id="wb5blob-([0-9a-f]{16})">[^<]*</script>\n', lambda m: m.group(0) if m.group(1) in used else '', s)
print('blobs', len(used))
APP.write_text(s, encoding='utf-8')
print('app', APP.stat().st_size, 'bytes')
