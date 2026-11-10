#!/usr/bin/env python3
"""注入字幕跟读功能：
  - wbCapSync(cap, capEl, wbS) ：把 cap 切成字符段落、启动 TTS、boundary 高亮；
    无 boundary 时退到动画进度驱动（wbApplyAt 末尾钩子）。
  - wbCapCancel() ：取消 TTS，清高亮。
  - 改两处 wbRenderScene()：capText.textContent → wbCapSync(...)
  - 改两处 wbStop()：头部插入 wbCapCancel()
  - 改两处 wbApplyAt()：末尾插入进度驱动高亮（boundary 不可用时的 fallback）
"""
from pathlib import Path

HTML = Path("mengxing-prototype-v1.html")
html = HTML.read_text(encoding="utf-8")

# ── 0. 防重复 ──────────────────────────────────────────────────
if "function wbCapSync" in html:
    print("speech already injected, skip"); exit(0)

# ── 1. 在文件末尾（</body> 前）注入新函数 ─────────────────────
SPEECH_SCRIPT = """
<script>
/* ===== 字幕跟读：boundary 驱动 + 动画进度 fallback ===== */
(function(){
  var _utt = null;
  var _cap = null;
  var _hasBoundary = false;

  /* 把 cap 文本切成 ~3 字段落，每段一个 <span class="wbc"> */
  function splitCap(cap, el){
    var segs = [], cur = '';
    Array.from(cap).forEach(function(c){
      cur += c;
      if(cur.length >= 3 || /[，。、；！？\s\n]/.test(c)){ segs.push(cur); cur=''; }
    });
    if(cur) segs.push(cur);
    el.innerHTML = segs.map(function(s,i){
      return '<span class="wbc" data-ci="'+i+'">'+
        s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+
      '</span>';
    }).join('');
    return segs;
  }

  function hiAt(el, idx){
    if(!el) return;
    el.querySelectorAll('.wbc').forEach(function(s,i){
      s.classList.toggle('wbc-on', i <= idx);
    });
  }
  function hiClear(el){ if(el) el.querySelectorAll('.wbc').forEach(function(s){ s.classList.remove('wbc-on'); }); }

  /* 供 wbApplyAt 调用：按绘制进度高亮（boundary 有时则不走这里） */
  window.wbCapProgress = function(el, n, ms, drawTotal){
    if(_hasBoundary || !el || !n) return;
    var idx = Math.min(Math.floor((ms/(drawTotal||1))*n), n-1);
    hiAt(el, idx);
  };

  window.wbCapSync = function(cap, el, wbs){
    wbCapCancel();
    _cap = el;
    _hasBoundary = false;
    var segs = splitCap(cap, el);
    if(!('speechSynthesis' in window)){ return; }
    // 尝试找中文语音
    var voices = window.speechSynthesis.getVoices();
    var zhVoice = null;
    for(var i=0;i<voices.length;i++){
      if(voices[i].lang&&(voices[i].lang.indexOf('zh')===0||voices[i].lang.indexOf('cmn')===0)){
        zhVoice=voices[i]; break;
      }
    }
    var u = new SpeechSynthesisUtterance(cap);
    u.lang = zhVoice ? zhVoice.lang : 'zh-CN';
    if(zhVoice) u.voice = zhVoice;
    u.rate = 0.9;
    u.onboundary = function(ev){
      if(ev.name!=='word') return;
      _hasBoundary = true;
      // 找对应段落
      var ci = ev.charIndex, pos = 0;
      for(var i=0;i<segs.length;i++){
        pos += segs[i].length;
        if(ci < pos){ hiAt(el, i); break; }
      }
    };
    u.onend = function(){ hiAt(el, segs.length-1); };
    u.onerror = function(){ _hasBoundary = false; };
    _utt = u;
    try{ window.speechSynthesis.speak(u); } catch(e){}
  };

  window.wbCapCancel = function(){
    _hasBoundary = false;
    if(_utt){ try{ window.speechSynthesis.cancel(); }catch(e){} _utt=null; }
    if(_cap){ hiClear(_cap); _cap=null; }
  };
})();
</script>
<style>
/* 字幕跟读高亮 */
.pn-scope .wb-capbar .wbc,
.ar-scope .wb-capbar .wbc{
  color: rgba(253,246,221,0.35);
  transition: color 0.25s;
}
.pn-scope .wb-capbar .wbc.wbc-on,
.ar-scope .wb-capbar .wbc.wbc-on{
  color: #fdf6dd;
}
</style>"""

html = html.replace('</body>', SPEECH_SCRIPT + '\n</body>', 1)
print("Step 1: wbCapSync script injected")

# ── 2. 两处 wbRenderScene：capText.textContent → wbCapSync ───
OLD_CAP = "  if(wbS.capText) wbS.capText.textContent = sc.cap;"
NEW_CAP = "  if(wbS.capText && window.wbCapSync) wbCapSync(sc.cap, wbS.capText, wbS); else if(wbS.capText) wbS.capText.textContent = sc.cap;"
count = html.count(OLD_CAP)
html = html.replace(OLD_CAP, NEW_CAP)
print(f"Step 2: capText patched in {count} wbRenderScene(s)")

# ── 3. 两处 wbStop：开头插 wbCapCancel() ─────────────────────
OLD_STOP = "function wbStop(){\n  wbS.playing = false;"
NEW_STOP = "function wbStop(){\n  if(window.wbCapCancel) wbCapCancel();\n  wbS.playing = false;"
count2 = html.count(OLD_STOP)
html = html.replace(OLD_STOP, NEW_STOP)
print(f"Step 3: wbCapCancel hook in {count2} wbStop(s)")

# ── 4. 两处 wbApplyAt：末尾插进度高亮 fallback ───────────────
OLD_APPLY = "  if(ms >= wbS.drawTotal){ if(wbS.hand) wbS.hand.style.opacity = '0'; }\n  else wbMoveHand(current);\n}"
NEW_APPLY = ("  if(ms >= wbS.drawTotal){ if(wbS.hand) wbS.hand.style.opacity = '0'; }\n"
             "  else wbMoveHand(current);\n"
             "  if(window.wbCapProgress && wbS.capText){\n"
             "    var _n=wbS.capText.querySelectorAll('.wbc').length;\n"
             "    wbCapProgress(wbS.capText, _n, ms, wbS.drawTotal);\n"
             "  }\n}")
count3 = html.count(OLD_APPLY)
html = html.replace(OLD_APPLY, NEW_APPLY)
print(f"Step 4: wbCapProgress fallback in {count3} wbApplyAt(s)")

HTML.write_text(html, encoding="utf-8")
print("Done.")
