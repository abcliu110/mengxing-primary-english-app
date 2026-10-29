#!/usr/bin/env python3
"""把白板引擎 + 5 个案例脚本 + App 接线写进主 HTML（可重复运行，按标记替换）。"""
import re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
F = os.path.join(ROOT, '萌星小学英语_最终合并版.html')
s = open(F, encoding='utf-8').read()
eng = open(os.path.join(HERE, 'wb_engine.js'), encoding='utf-8').read()
cases = open(os.path.join(HERE, 'wb_cases.js'), encoding='utf-8').read()
glue = r'''
// ---------- App 接线：竹节句 vs 树干句 白板播放器 ----------
var wbState = { t: 0, playing: true, player: null, caseIdx: -1 };
function startWBLoop(stage) {
  const idx = Number(stage.getAttribute("data-case")) || 0;
  const c = WB_BAMBOO_CASES[idx] || WB_BAMBOO_CASES[0];
  if (wbState.caseIdx !== idx || !wbState.player || wbState.stage !== stage) {
    wbState.player = WB.mount(stage, c.build, 7 + idx);
    wbState.caseIdx = idx; wbState.stage = stage; wbState.t = 0; wbState.playing = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (wbState.player) wbState.player.remeasure(); });
  }
  wbSyncButton();
  let last = performance.now();
  function frame(now) {
    if (document.getElementById("wbStage") !== stage) { superLabAnimId = null; wbState.player = null; wbState.caseIdx = -1; return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const p = wbState.player;
    if (wbState.playing) { wbState.t += dt; if (wbState.t > p.end) wbState.t = 0; }
    p.render(wbState.t);
    const seek = document.getElementById("wbSeek"), tm = document.getElementById("wbTime");
    if (seek) seek.value = Math.round(wbState.t / p.end * 1000);
    if (tm) tm.textContent = wbState.t.toFixed(1) + "s / " + p.end.toFixed(0) + "s";
    superLabAnimId = requestAnimationFrame(frame);
  }
  superLabAnimId = requestAnimationFrame(frame);
}
function curIdxTerms(i) { const c = WB_BAMBOO_CASES[i]; return c ? c.terms : []; }
function wbSyncButton() { const b = document.getElementById("wbPlay"); if (b) b.textContent = wbState.playing ? "⏸ 暂停" : "▶ 播放"; }
function wbToggle() { wbState.playing = !wbState.playing; wbSyncButton(); }
function wbReplay() { wbState.t = 0; wbState.playing = true; if (wbState.player) wbState.player.resetPen(); wbSyncButton(); }
function wbSeekTo(v) { if (!wbState.player) return; wbState.t = v / 1000 * wbState.player.end; wbState.player.resetPen(); }
'''
block = '// <<WB_ENGINE_START>>\n' + eng + '\n' + cases + glue + '// <<WB_ENGINE_END>>\n'
if '// <<WB_ENGINE_START>>' in s:
    s = re.sub(r'// <<WB_ENGINE_START>>.*?// <<WB_ENGINE_END>>\n', lambda m: block, s, flags=re.S)
else:
    anchor = '// ==================== 王炸引擎 ③ 数据'
    assert s.count(anchor) == 1
    s = s.replace(anchor, block + '\n' + anchor)

# 1) bamboo_tree 页：canvas → 白板 SVG + 控制条
old_canvas = '''        <h3 style="margin:0 0 10px; font-size:1.22rem; color:#064e3b; font-weight:900;">${curCase.title}</h3>

        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#0f172a; margin-bottom:14px;">
          <canvas id="superLabCanvas" style="width:100%; max-width:100%; height:auto; aspect-ratio:740/320; display:block;"></canvas>
        </div>'''
new_canvas = '''        <h3 style="margin:0 0 10px; font-size:1.22rem; color:#064e3b; font-weight:900;">${curCase.title}</h3>

        <!-- WB_STAGE -->
        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#fff; margin-bottom:14px;">
          <svg id="wbStage" data-case="${superLabState.btIdx}" style="width:100%; height:auto; aspect-ratio:960/600; display:block;"></svg>
          <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8fafc; border-top:1px solid #e2e8f0;">
            <button id="wbPlay" onclick="wbToggle()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#059669; color:#fff; border:0;">⏸ 暂停</button>
            <button onclick="wbReplay()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#e2e8f0; color:#0f172a; border:0;">↺ 重播</button>
            <input id="wbSeek" type="range" min="0" max="1000" value="0" oninput="wbSeekTo(this.value)" style="flex:1;">
            <span id="wbTime" style="font:700 12px monospace; color:#475569; min-width:92px; text-align:right;">0.0s</span>
          </div>
        </div>'''
if '<!-- WB_STAGE -->' not in s:
    assert s.count(old_canvas) == 1, s.count(old_canvas)
    s = s.replace(old_canvas, new_canvas)

# 2) 术语小词典（放在两张文字卡后面）
old_tail = '''              ✅ ${curCase.englishOk} 🔊
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (tab === "vowel_shift") {'''
new_tail = '''              ✅ ${curCase.englishOk} 🔊
            </div>
          </div>
        </div>
        <!-- WB_GLOSS -->
        <div style="margin-top:14px; background:#f8fafc; border-radius:14px; padding:14px 16px; border:2px solid #cbd5e1;">
          <div style="font-weight:900; color:#065f46; font-size:0.98rem; margin-bottom:8px;">📖 术语小词典（看不懂的词点这里看）</div>
          ${[...(curIdxTerms(0)), ...(superLabState.btIdx ? curIdxTerms(superLabState.btIdx) : [])].map(([k, v]) => `
            <div style="display:flex; gap:10px; font-size:0.88rem; line-height:1.55; padding:4px 0; border-bottom:1px dashed #e2e8f0;">
              <div style="flex:0 0 150px; font-weight:900; color:#e11d48;">${k}</div>
              <div style="color:#334155;">${v}</div>
            </div>`).join("")}
        </div>
      </div>
    `;
  } else if (tab === "vowel_shift") {'''
if '<!-- WB_GLOSS -->' not in s:
    assert s.count(old_tail) == 1, s.count(old_tail)
    s = s.replace(old_tail, new_tail)

# 3) 播放循环入口
old_loop = '''  if (vvStage && typeof VV !== "undefined") { startVVLoop(vvStage); return; }'''
new_loop = old_loop + '''
  const wbStage = document.getElementById("wbStage");
  if (wbStage && typeof WB !== "undefined") { startWBLoop(wbStage); return; }'''
if 'startWBLoop(wbStage)' not in s:
    assert s.count(old_loop) == 1
    s = s.replace(old_loop, new_loop)
open(F, 'w', encoding='utf-8').write(s)
print('ok')
