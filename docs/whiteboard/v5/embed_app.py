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
function wb5Gz(b64) { const b = atob(b64), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text(); }
var wb5BlobCache = {};
function wb5Blob(h) {   // 共享块：图片 / 字体 data URI 原样存；引擎脚本存成 "gz:" + gzip base64，用到才解压（同一页只解一次）
  if (wb5BlobCache[h]) return wb5BlobCache[h];
  const b = document.getElementById("wb5blob-" + h), t = b ? b.textContent : "";
  return (wb5BlobCache[h] = t.slice(0, 3) === "gz:" ? wb5Gz(t.slice(3)) : Promise.resolve(t));
}
function wb5Mount(fr) {   // WB5_MOUNT_V3 WB5_MOUNT_V4：gzip + 共享块（图片 / 字体 / 引擎，wb5blob-*），按需解压；V4：模板幕可由 fr.__wb5Inject 注入数据脚本
  if (fr.getAttribute("data-on")) return;
  const el = wb5El(fr.getAttribute("data-tab"), fr.getAttribute("data-case"));
  if (!el) return;
  fr.setAttribute("data-on", "1");
  try { if (typeof wbStopSpeech === "function") wbStopSpeech(); if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
  const fit = () => { try { const d = fr.contentDocument; if (d && d.body) fr.style.height = Math.ceil(d.documentElement.scrollHeight) + "px"; } catch (e) {} };
  fr.addEventListener("load", () => { fit(); setTimeout(fit, 300); try { new ResizeObserver(fit).observe(fr.contentDocument.body); } catch (e) {} });
  const text = el.getAttribute("data-gz") ? (() => { const b = atob(el.textContent.trim()), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
    return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text(); })() : Promise.resolve(el.textContent);
  text.then(t => { t = t.replace(/<\/wb5-script/g, "</script"); const hs = [...new Set([...t.matchAll(/@@B:([0-9a-f]{16})@@/g)].map(m => m[1]))];
    return Promise.all(hs.map(wb5Blob)).then(vs => { const M = {}; hs.forEach((h, i) => { M[h] = vs[i]; }); let h2 = t.replace(/@@B:([0-9a-f]{16})@@/g, (m, h) => M[h] || ""); if (fr.__wb5Inject) h2 = h2.replace("<script data-wb5-engine>", () => fr.__wb5Inject + "<script data-wb5-engine>"); fr.srcdoc = h2; }); })
    .catch(e => { try { console.warn("wb5", e); } catch (_) {} });
}
'''
new_mount_js = RUNTIME[RUNTIME.index('function wb5Gz(b64) {'):]
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

if 'WB5_EMBED_VV' not in s:   # 万能动词剧场：词组有 v5 幕就换成 ①/② 两幕 iframe（旧 SVG 保留为兜底）
    a = '${(typeof wbLoadModule === "function" && wbLoadModule("vv"), typeof VV !== "undefined" && VV.has(comboKey)) ? `'
    assert s.count(a) == 1
    s = s.replace(a, '${wb5El("vv_" + comboKey, 0) ? wb5VVHtml(comboKey) /* WB5_EMBED_VV */ : ' + a[2:], 1)
    fn = """function wb5VVHtml(k) {   // WB5_EMBED_VV
  const a = (superLabState.vvAct | 0) && wb5El("vv_" + k, 1) ? 1 : 0;
  const btn = (i, t) => wb5El("vv_" + k, i) ? `<button onclick="superLabState.vvAct=${i}; renderSuperLabHubView();" style="background:${i === a ? '#2563eb' : '#e2e8f0'}; color:${i === a ? '#fff' : '#0f172a'}; font-weight:900; padding:8px 14px; border-radius:10px; font-size:0.85rem;">${t}</button>` : "";
  return `<div style="margin-top:16px; display:flex; gap:8px; flex-wrap:wrap;">${btn(0, "① 本义")}${btn(1, "② 第二义 + 合成")}</div><div style="margin-top:10px;">${wb5StageHtml("vv_" + k, a, false)}</div>`;
}
"""
    i = s.index('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {')
    s = s[:i] + fn + s[i:]

HD_FN = """function wb5HDHtml(tab, a, labels, fixed) {   // WB5_EMBED_HD2
  let n = 0; while (wb5El(tab, n)) n++;
  const btn = i => `<button onclick="wb5HDAct('${tab}', ${i})" style="background:${i === a ? '#2563eb' : '#e2e8f0'}; color:${i === a ? '#fff' : '#0f172a'}; font-weight:900; padding:8px 14px; border-radius:10px; font-size:0.85rem; border:0;">🎬 ${labels[i] || ('第' + (i + 1) + '幕')}</button>`;
  return `<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px;">${n > 1 && !fixed ? Array.from({ length: n }, (_, i) => btn(i)).join("") : ""}</div>${wb5StageHtml(tab, a, false)}`;
}
function wb5HDAct(tab, i) {
  const w = document.querySelector('[data-wb5hd="' + tab + '"]'); if (!w) return;
  const fixed = w.getAttribute("data-fixed") === "1";
  if (!fixed && typeof hdTheaterState !== "undefined") { hdTheaterState.actIdx = i; hdTheaterState.manualActLock = true; }
  let labels = []; try { labels = JSON.parse(w.getAttribute("data-labels") || "[]"); } catch (e) {}
  w.innerHTML = wb5HDHtml(tab, i, labels, fixed);
  const f = w.querySelector("#wb5Frame"); if (f) wb5Mount(f);
}
function wb5HDSwap(canvasId, tab, act) {   // 剧场 canvas 所在的框整体换成 v5；返回 true = 已换，调用方不再跑旧 canvas 循环。act 给定 = 幕由页面自己的按钮选（如框架语义的视角），不另出分幕按钮
  const cv = document.getElementById(canvasId); if (!cv || !wb5El(tab, 0) || (act != null && !wb5El(tab, act))) return false;
  const w = cv.closest(".hd-video-wrapper") || cv.parentNode;
  const labels = [...w.querySelectorAll('[id^="hdActBtn_"]')].map(b => b.textContent.replace(/^\\s*🎬\\s*/, "").trim());
  w.classList.remove("hd-video-wrapper"); w.setAttribute("data-wb5hd", tab); w.setAttribute("data-labels", JSON.stringify(labels));
  if (act != null) w.setAttribute("data-fixed", "1");
  let n = 0; while (wb5El(tab, n)) n++;
  const a = act != null ? act : (typeof hdTheaterState !== "undefined" ? hdTheaterState.actIdx | 0 : 0);
  wb5HDAct(tab, Math.min(n - 1, Math.max(0, a)));
  return true;
}
"""
if 'WB5_EMBED_HD2' not in s:   # 三大厅 HD 剧场（canvas）：有 v5 幕就把整个剧场框换成 v5 iframe（决策 23）；V2：支持页面自己选幕
    if 'WB5_EMBED_HD' in s:   # 升级 V1
        a = s.index('function wb5HDHtml(tab, a, labels) {'); b = s.index('\n}\n', s.index('function wb5HDSwap(canvasId, tab) {')) + 3
        s = s[:a] + HD_FN + s[b:]
    else:
        i = s.index('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {')
        s = s[:i] + HD_FN + s[i:]
TPL_FN = """function wb5TplSwap(canvasId, tab, data, act) {   // WB5_EMBED_TPL：通用模板幕（如普通单词卡）——一个模板 + 运行时注入词条数据现场排版，见 docs/whiteboard/DESIGN_MINDMAP_WORDCARD.md
  const cv = document.getElementById(canvasId); if (!cv || !wb5El(tab, 0) || !data) return false;
  const w = cv.closest(".hd-video-wrapper") || cv.parentNode;
  const labels = [...w.querySelectorAll('[id^="hdActBtn_"]')].map(b => b.textContent.replace(/^\\s*🎬\\s*/, "").trim());
  w.classList.remove("hd-video-wrapper"); w.setAttribute("data-wb5tpl", tab); w.setAttribute("data-labels", JSON.stringify(labels)); w.__wb5Data = data;
  wb5TplAct(w, Math.max(0, Math.min(Math.max(labels.length, 1) - 1, act | 0)));
  return true;
}
function wb5TplAct(w, a) {
  if (!w || !w.__wb5Data) return;
  const tab = w.getAttribute("data-wb5tpl"); let labels = []; try { labels = JSON.parse(w.getAttribute("data-labels") || "[]"); } catch (e) {}
  if (typeof hdTheaterState !== "undefined") { hdTheaterState.actIdx = a; hdTheaterState.manualActLock = true; }
  const btn = i => `<button onclick="wb5TplAct(this.closest('[data-wb5tpl]'), ${i})" style="background:${i === a ? '#2563eb' : '#e2e8f0'}; color:${i === a ? '#fff' : '#0f172a'}; font-weight:900; padding:8px 14px; border-radius:10px; font-size:0.85rem; border:0;">🎬 ${labels[i]}</button>`;
  w.innerHTML = `<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px;">${labels.length > 1 ? labels.map((_, i) => btn(i)).join("") : ""}</div>${wb5StageHtml(tab, 0, false)}`;
  const f = w.querySelector("#wb5Frame"); if (!f) return;
  f.__wb5Inject = "<script>globalThis.__WB5_WORD__=" + JSON.stringify(w.__wb5Data).replace(/</g, "\\\\u003c") + ";globalThis.__WB5_ACT__=" + (a | 0) + ";</" + "script>";
  wb5Mount(f);
}
"""
if 'WB5_EMBED_TPL' not in s:
    i = s.index('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {')
    s = s[:i] + TPL_FN + s[i:]
# 各剧场的挂钩：(锚点, 插入的判断)；幂等（按标记）
HD_HOOKS = [
    ('  const canvas = document.getElementById("formationStageCanvas");\n  if (!canvas) return;\n', '  if (wb5HDSwap("formationStageCanvas", "hd_formation")) return;   // WB5_HD:formation\n'),
    ('  const canvas = document.getElementById("grammarWhyCanvas");\n  if (!canvas) return;\n', '  if (wb5HDSwap("grammarWhyCanvas", "hd_" + g.id.toLowerCase(), g.id === "G14" ? prepDemoIdx : undefined)) return;   // WB5_HD:grammar\n'),
    ('  const canvas = document.getElementById("summaryHubCanvas");\n  if (!canvas) return;\n', '  if (wb5HDSwap("summaryHubCanvas", "hd_sum_" + (summaryTab || "syntax"))) return;   // WB5_HD:summary\n'),
    ('  if (oralAnimId) cancelAnimationFrame(oralAnimId);\n  const canvas = document.getElementById("oralSceneCanvas");\n  if (!canvas) return;\n', '  if (oralAnimId) cancelAnimationFrame(oralAnimId);\n  if (wb5HDSwap("oralSceneCanvas", "hd_oral_" + String(cur.scenario_id || "").toLowerCase(), DAILY_EXPRESSIONS_DB.filter(e => e.scenario_id === cur.scenario_id).indexOf(cur))) return;   // WB5_HD:oral\n'),
    ('  if (cardModalState.animFrame) cancelAnimationFrame(cardModalState.animFrame);\n  const canvas = document.getElementById("wordModalCanvas");\n  if (!canvas) return;\n', '  if (w.has_polysemy && w.polysemy_data && wb5HDSwap("wordModalCanvas", "hd_poly_" + String(w.id).toLowerCase(), polyAct | 0)) return;   // WB5_HD:poly\n'),
    ('  if (w.has_polysemy && w.polysemy_data && wb5HDSwap("wordModalCanvas", "hd_poly_" + String(w.id).toLowerCase(), polyAct | 0)) return;   // WB5_HD:poly\n', '  if (!(w.has_polysemy && w.polysemy_data) && wb5TplSwap("wordModalCanvas", "wordcard_tpl", w, hdTheaterState.manualActLock ? hdTheaterState.actIdx : 0)) return;   // WB5_HD:wordcard\n'),
    ('  const canvas = document.getElementById("phonicsStageCanvas");\n  if (!canvas) return;\n', '  if (wb5HDSwap("phonicsStageCanvas", "hd_phonics")) return;   // WB5_HD:phonics\n'),
    ('  const canvas = document.getElementById("relationsStageCanvas");\n  if (!canvas) return;\n', '  if (wb5HDSwap("relationsStageCanvas", "hd_relations")) return;   // WB5_HD:relations\n'),
    ('  const canvas = document.getElementById("frameSemanticsCanvas");\n  if (!canvas) return;\n', '  if (wb5HDSwap("frameSemanticsCanvas", "hd_fr" + String(FRAME_SEMANTICS_DB.indexOf(fr) + 1).padStart(2, "0"), pIdx)) return;   // WB5_HD:frames\n'),
]
for a, ins in HD_HOOKS:
    if ins in s: continue
    if s.count(a) != 1: continue
    s = s.replace(a, a + ins, 1)

import hashlib, gzip, base64
if 'WB5_MOUNT_V4' not in s:   # 升级已装的运行时（V3：引擎共享块；V4：模板注入）
    a = s.index('function wb5Gz(b64) {') if 'function wb5Gz(b64) {' in s else s.index('function wb5Mount(fr) {'); b = s.index('\n}\n', s.index('function wb5Mount(fr) {')) + 3
    s = s[:a] + new_mount_js + s[b:]
BLOB = re.compile(r'data:(?:image/webp|font/woff);base64,[A-Za-z0-9+/=]{2000,}')
def pack(html):
    hs = []
    def sub(m):
        h = hashlib.sha1(m.group(0).encode()).hexdigest()[:16]; hs.append(h); blobs.setdefault(h, m.group(0)); return f'@@B:{h}@@'
    html = BLOB.sub(sub, html)
    def eng(m):   # 共享引擎脚本：整段抽成 gz 共享块（各幕完全相同，只存一份）
        body = m.group(1); h = hashlib.sha1(body.encode()).hexdigest()[:16]; hs.append(h)
        blobs.setdefault(h, 'gz:' + base64.b64encode(gzip.compress(body.encode('utf-8'), 9, mtime=0)).decode())
        return f'<script data-wb5-engine>@@B:{h}@@</wb5-script>'
    html = re.sub(r'<script data-wb5-engine>(.*?)</wb5-script>', eng, html, count=1, flags=re.S)
    return base64.b64encode(gzip.compress(html.encode('utf-8'), 9, mtime=0)).decode(), sorted(set(hs))
blobs = {}
ANCH = lambda: s.index('<script type="text/plain" id="wb5html-')   # 新幕插在第一个 v5 幕前（注意：JS 注释里有字面量 id="wbmod-<id>"，不能拿 wbmod 当锚点）
for k in range(0, len(pairs), 2):
    idx, f = int(pairs[k]), pathlib.Path(pairs[k + 1]).resolve()
    html = f.read_text(encoding='utf-8').replace('</script', '</wb5-script')
    gz, hs = pack(html)
    blk = f'<script type="text/plain" id="wb5html-{tab}-{idx}" data-gz="1" data-blobs="{" ".join(hs)}" data-src="docs/whiteboard/v5/{f.relative_to(ROOT / "docs/whiteboard/v5")}">{gz}</script>\n'
    pat = re.compile(rf'<script type="text/plain" id="wb5html-{re.escape(tab)}-{idx}"[^>]*>.*?</script>\n', re.S)
    if pat.search(s): s = pat.sub(lambda m: blk, s, 1)
    else: anchor = ANCH(); s = s[:anchor] + blk + s[anchor:]
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
