#!/usr/bin/env python3
"""
修复字幕朗读策略：
1. wbRenderScene 里的 wbCapSync 改为只更新文字（不 speak），
   移除 TTS 调用，改成 wbCapSet
2. wbTogglePlay / wbReplay 里手动触发 wbCapSpeak（在用户手势链里）
3. 换场时（wbFrame 里的 wbRenderScene 调用）不 speak，
   只在用户主动 play/replay 时 speak 当前 scene 的 cap
"""
from pathlib import Path
import re

HTML = Path("mengxing-prototype-v1.html")
html = HTML.read_text(encoding="utf-8")

# ── 1. 把 wbCapSync 里的 TTS speak 拆出来到 wbCapSpeak ──────────────────
# 在 wbCapSync 函数里，只做 splitCap 更新 innerHTML，不 speak
# 新增 wbCapSpeak 负责实际调 TTS
OLD_CAPFUNCS = '''  window.wbCapSync = function(cap, el, wbs){
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
  };'''

NEW_CAPFUNCS = '''  /* wbCapSet: 只切分字幕 DOM，不触发 TTS（从 rAF 链调用） */
  window.wbCapSet = function(cap, el){
    if(window.wbCapCancel) wbCapCancel();
    _cap = el;
    _hasBoundary = false;
    _pendingCap = cap;
    splitCap(cap, el);
  };

  /* wbCapSpeak: 在用户手势链里调用，触发 TTS + boundary 高亮 */
  window.wbCapSpeak = function(){
    if(!_cap || !_pendingCap) return;
    if(!('speechSynthesis' in window)) return;
    var cap = _pendingCap;
    var el = _cap;
    var segs = Array.from(el.querySelectorAll('.wbc')).map(function(s){ return s.textContent; });
    if(!segs.length) return;
    _hasBoundary = false;
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
      var ci = ev.charIndex, pos = 0;
      for(var i=0;i<segs.length;i++){
        pos += segs[i].length;
        if(ci < pos){ hiAt(el, i); break; }
      }
    };
    u.onend = function(){ hiAt(el, segs.length-1); };
    u.onerror = function(){ _hasBoundary = false; };
    _utt = u;
    try{ window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } catch(e){}
  };

  /* 保留 wbCapSync 兼容旧调用（只做 set，不 speak） */
  window.wbCapSync = window.wbCapSet;'''

if OLD_CAPFUNCS in html:
    html = html.replace(OLD_CAPFUNCS, NEW_CAPFUNCS)
    print("Step 1: wbCapSync split into wbCapSet + wbCapSpeak")
else:
    print("WARNING: OLD_CAPFUNCS not found exactly, trying partial match...")
    if 'window.wbCapSync = function(cap, el, wbs)' in html:
        print("  wbCapSync found but context differs — skipping step 1")

# ── 2. _pendingCap 变量初始化 ────────────────────────────────────────────
html = html.replace(
    "  var _utt = null;\n  var _cap = null;\n  var _hasBoundary = false;",
    "  var _utt = null;\n  var _cap = null;\n  var _pendingCap = null;\n  var _hasBoundary = false;"
)
print("Step 2: _pendingCap variable added")

# ── 3. wbTogglePlay 两处：播放时调 wbCapSpeak ───────────────────────────
# PN 系 wbTogglePlay（第一个）
OLD_TOGGLE_1 = """function wbTogglePlay(){
  if(!wbS.sec) return;
  if(wbS.playing){
    wbS.playing = false;
    if(wbS.raf){ cancelAnimationFrame(wbS.raf); wbS.raf = 0; }
    wbS.baseElapsed = wbS.elapsed; wbS.startTs = 0;
    if(wbS.btn) wbS.btn.textContent = '▶ 继续';
    if(wbS.hand) wbS.hand.style.opacity = '0';
    return;
  }
  if(wbS.btn && wbS.btn.textContent.indexOf('再看') >= 0){ wbS.scene = wbS.home || 0; wbRenderScene(); }
  wbPlayStart();
}"""
NEW_TOGGLE_1 = """function wbTogglePlay(){
  if(!wbS.sec) return;
  if(wbS.playing){
    wbS.playing = false;
    if(wbS.raf){ cancelAnimationFrame(wbS.raf); wbS.raf = 0; }
    wbS.baseElapsed = wbS.elapsed; wbS.startTs = 0;
    if(wbS.btn) wbS.btn.textContent = '▶ 继续';
    if(wbS.hand) wbS.hand.style.opacity = '0';
    if(window.wbCapCancel) wbCapCancel();
    return;
  }
  if(wbS.btn && wbS.btn.textContent.indexOf('再看') >= 0){ wbS.scene = wbS.home || 0; wbRenderScene(); }
  wbPlayStart();
  if(window.wbCapSpeak) wbCapSpeak();
}"""
c = html.count(OLD_TOGGLE_1)
html = html.replace(OLD_TOGGLE_1, NEW_TOGGLE_1)
print(f"Step 3: wbCapSpeak hook in {c} wbTogglePlay(s)")

# ── 4. wbReplay 两处：重播时调 wbCapSpeak ───────────────────────────────
OLD_REPLAY = """  if(!wbS.sec) return;
  wbS.scene = wbS.home || 0; wbRenderScene();
  wbPlayStart();
}"""
NEW_REPLAY = """  if(!wbS.sec) return;
  wbS.scene = wbS.home || 0; wbRenderScene();
  wbPlayStart();
  if(window.wbCapSpeak) wbCapSpeak();
}"""
c2 = html.count(OLD_REPLAY)
html = html.replace(OLD_REPLAY, NEW_REPLAY)
print(f"Step 4: wbCapSpeak hook in {c2} wbReplay(s)")

HTML.write_text(html, encoding="utf-8")
print("Done.")
