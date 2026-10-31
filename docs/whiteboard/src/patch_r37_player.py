"""patch_r37_player.py —— 决策 37 / R37-01：白板手机播放框（幂等）。
现状：iframe 写死 height:560px，fit() 用 documentElement.scrollHeight（不会小于 iframe 自己的高度）→ 手机上画面约 190 px、下面 370 px 灰色空白；
控制条不折行，时间「0.0 / 269.6 s」被截断；画面整体缩到 0.18 倍，字 6–8 px。
改法（只改 App 运行时，不重建各幕；embed_app.py 的 RUNTIME 同步改，新装也一样）：
  ① 播放框按 16:9 自适应：初始 aspect-ratio，加载后按 #wrap 实际底边定高（不再用 scrollHeight）；
  ② 挂载时往每幕 srcdoc 注入一段播放器样式（标记 WB5_PLAYER_CSS）：边距收窄、控制条可折行、窄屏进度条单独一行、时间不截断；
  ③ 「⛶ 全屏」按钮：铺满屏幕；竖屏时把画面转 90° 横过来（iOS 不支持锁方向，所以用 CSS 旋转兜底；支持的浏览器先请求全屏 + 锁横屏）。
     390×844 竖屏 → 画面宽约 790 px（0.41 倍），场景里 ≥ 30 px 的字都 ≥ 12 px。
检查：src/playercheck.py（入 runall）。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
HERE = pathlib.Path(__file__).resolve().parent
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
EMB = HERE.parent / 'v5' / 'embed_app.py'
MARK = 'R37_01_PLAYER'

OLD_STAGE = '''        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#eceae6; margin-bottom:14px;">
          <iframe id="wb5Frame" data-tab="${tab}" data-case="${idx | 0}" title="白板动画" allow="autoplay" style="width:100%; height:560px; border:0; display:block;"></iframe>
        </div>'''
NEW_STAGE = '''        <div class="wb5-box" style="position:relative; width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#eceae6; margin-bottom:14px;"><!-- R37_01_PLAYER -->
          <iframe id="wb5Frame" data-tab="${tab}" data-case="${idx | 0}" title="白板动画" allow="autoplay" style="width:100%; aspect-ratio:16/10; height:auto; border:0; display:block;"></iframe>
          <button type="button" class="wb5-fs" onclick="wb5Fs(this)" title="全屏看（竖屏时自动横过来）">⛶ 全屏</button>
        </div>'''
OLD_FIT = '''  const fit = () => { try { const d = fr.contentDocument; if (d && d.body) fr.style.height = Math.ceil(d.documentElement.scrollHeight) + "px"; } catch (e) {} };'''
NEW_FIT = '''  const fit = () => { try { const d = fr.contentDocument; if (!d || !d.body || fr.closest(".wb5-fson")) return; const w = d.getElementById("wrap"); fr.style.height = Math.ceil(w ? w.getBoundingClientRect().bottom + 3 : d.body.scrollHeight) + "px"; } catch (e) {} };   // R37_01_PLAYER：按画面实际底边定高
  fr.__wb5Fit = fit;'''
OLD_INJ = '''if (fr.__wb5Inject) h2 = h2.replace("<script data-wb5-engine>", () => fr.__wb5Inject + "<script data-wb5-engine>"); fr.srcdoc = h2;'''
NEW_INJ = r'''if (fr.__wb5Inject) h2 = h2.replace("<script data-wb5-engine>", () => fr.__wb5Inject + "<script data-wb5-engine>"); h2 = h2.replace("</head>", () => WB5_PLAYER_CSS + "</head>").replace(/<\/body>(?![\s\S]*<\/body>)/, () => WB5_PLAYER_JS + "</body>"); fr.srcdoc = h2;'''
FS_JS = r'''// R37_01_PLAYER：播放器样式（注入每幕 srcdoc，标记 WB5_PLAYER_CSS）+ 全屏横屏
var WB5_PLAYER_CSS = "<style>/* WB5_PLAYER_CSS */#wrap{margin:3px auto!important;padding:0 4px!important}#ctl{flex-wrap:wrap;row-gap:4px}#time{min-width:0!important;white-space:nowrap}"
  + "@media (max-width:560px){#wrap{position:relative}#ctl{position:absolute;left:12px;right:12px;bottom:4px;margin:0;gap:6px;padding:3px 6px;background:rgba(255,255,255,.9);border-radius:10px;transition:opacity .3s}"
  + "html.wbplay #ctl{opacity:0;pointer-events:none}#play,#voice{width:40px}#bar{min-width:0}#time{flex:0 0 auto;font-size:12px;color:#334155}}"
  + "html.wbfs,html.wbfs body{height:100%;overflow:hidden}html.wbfs #wrap{max-width:none;height:100%;margin:0!important;padding:4px 8px!important;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center}"
  + "html.wbfs canvas{width:auto;max-width:100%;max-height:100%;margin:0 auto}html.wbfs #wrap{position:relative}"
  + "html.wbfs #ctl{position:absolute;left:16px;right:16px;bottom:8px;margin:0;padding:3px 8px;background:rgba(255,255,255,.9);border-radius:10px;transition:opacity .3s}html.wbfs.wbplay #ctl{opacity:0;pointer-events:none}</style>";
// 窄屏控制条浮在画面底部：播放 1.8 秒后自动隐去，点一下画面（暂停）或触摸时再出来
var WB5_PLAYER_JS = "<scr" + "ipt>/* WB5_PLAYER_JS */(function(){var p=document.getElementById('play'),h=document.documentElement,tm=0,st=null;if(!p)return;function u(f){var on=p.textContent!=='\\u25b6';if(on===st&&!f)return;st=on;clearTimeout(tm);h.classList.remove('wbplay');if(on)tm=setTimeout(function(){h.classList.add('wbplay')},1800)}new MutationObserver(function(){u()}).observe(p,{childList:true,characterData:true,subtree:true});document.addEventListener('pointerdown',function(){u(1)},true)})()</scr" + "ipt>";
function wb5FsLay(box) {
  const fr = box && box.querySelector("iframe"); if (!fr) return;
  const on = box.classList.contains("wb5-fson");
  try { fr.contentDocument.documentElement.classList.toggle("wbfs", on); } catch (e) {}
  if (!on) { fr.style.position = fr.style.left = fr.style.top = fr.style.transform = ""; fr.style.width = "100%"; if (fr.__wb5Fit) fr.__wb5Fit(); return; }
  const W = window.innerWidth, H = window.innerHeight, rot = H > W;
  Object.assign(fr.style, { position: "absolute", width: (rot ? H : W) + "px", height: (rot ? W : H) + "px", left: (rot ? (W - H) / 2 : 0) + "px", top: (rot ? (H - W) / 2 : 0) + "px", transform: rot ? "rotate(90deg)" : "" });
}
function wb5Fs(b) {
  const box = b.closest(".wb5-box"); if (!box) return;
  const on = !box.classList.contains("wb5-fson");
  box.classList.toggle("wb5-fson", on); b.textContent = on ? "✕ 退出全屏" : "⛶ 全屏";
  try { document.documentElement.style.overflow = on ? "hidden" : ""; } catch (e) {}
  try {
    if (on && box.requestFullscreen) box.requestFullscreen().then(() => (screen.orientation && screen.orientation.lock ? screen.orientation.lock("landscape") : null)).catch(() => {}).then(() => wb5FsLay(box));
    else if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  } catch (e) {}
  wb5FsLay(box);
}
if (typeof window !== "undefined" && !window.__wb5FsBound) {
  window.__wb5FsBound = 1;
  window.addEventListener("resize", () => { const box = document.querySelector(".wb5-fson"); if (box) wb5FsLay(box); });
  document.addEventListener("fullscreenchange", () => { if (document.fullscreenElement) return; const box = document.querySelector(".wb5-fson"); if (box) { const b = box.querySelector(".wb5-fs"); if (b) wb5Fs(b); } });
}
'''
CSS = '''<style id="r37-player">
/* R37_01_PLAYER */
.wb5-fs { position:absolute; top:6px; right:6px; z-index:3; border:0; border-radius:10px; padding:6px 10px; background:rgba(15,23,42,.78); color:#fff; font-weight:900; font-size:0.8rem; cursor:pointer; }
.wb5-fson { position:fixed !important; inset:0; z-index:99999; margin:0 !important; border:0 !important; border-radius:0 !important; background:#eceae6 !important; }
</style>
'''

GLOSS_OLD = '<div style="flex:0 0 150px; font-weight:900; color:#e11d48;">${k}</div>'
GLOSS_NEW = '<div style="flex:0 0 min(150px, 32%); font-weight:900; color:#e11d48;">${k}</div>'
def patch_runtime(s, is_app):
    n = 0
    if is_app and GLOSS_NEW not in s:
        assert s.count(GLOSS_OLD) == 1, 'gloss anchor'; s = s.replace(GLOSS_OLD, GLOSS_NEW); n += 1
    if NEW_STAGE not in s:
        assert s.count(OLD_STAGE) == 1, 'stage anchor'; s = s.replace(OLD_STAGE, NEW_STAGE); n += 1
    if NEW_FIT not in s:
        assert s.count(OLD_FIT) == 1, 'fit anchor'; s = s.replace(OLD_FIT, NEW_FIT); n += 1
    if NEW_INJ not in s:
        assert s.count(OLD_INJ) == 1, 'inject anchor'; s = s.replace(OLD_INJ, NEW_INJ); n += 1
    if 'function wb5FsLay(box)' not in s:
        a = '\nfunction wb5Gz(b64) { const b'; assert s.count(a) == 1, 'gz anchor'; s = s.replace(a, '\n' + FS_JS + a[1:]); n += 1
    if is_app and '/* R37_01_PLAYER */' not in s:
        a = '<style id="mobile-o4">'; assert s.count(a) == 1; s = s.replace(a, CSS + a); n += 1
    return s, n

s = APP.read_text(encoding='utf-8'); s, n = patch_runtime(s, True)
e = EMB.read_text(encoding='utf-8'); e2, m = patch_runtime(e, False)
if m: EMB.write_text(e2, encoding='utf-8')
if n: __import__('appwrite').save(s)
print('app', n, 'embed_app', m)
