"""patch_tts.py —— 决策 29 O3：朗读统一入口 speakText 加「语音缓存 + 无英文语音提示」（幂等）。
- 选语音：先用 localStorage「ttsVoice」里记住的那个（还在列表里才用），否则选第一个 lang 与要读的语言同前缀的语音，选中后记住；
- 没有任何英文语音：不报错，提示「这台设备没有英文朗读语音，请看文字」，字幕 / 白板照常；
- 其余调用方（方法馆 MH.speakText、白板点读同步）本来就优先走 window.speakText，不改。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
old = '''    utter.volume = Number.isFinite(Number(appState.volume)) ? Number(appState.volume) : 1;
    utter.onerror = function () {'''
new = '''    utter.volume = Number.isFinite(Number(appState.volume)) ? Number(appState.volume) : 1;
    { const v = ttsPickVoice(utter.lang); if (v) utter.voice = v; }   // TTS_VOICE_CACHE（决策 29 O3）
    utter.onerror = function () {'''
FN = '''// TTS_VOICE_CACHE（决策 29 O3）：记住选中的语音；没有对应语言的语音时给提示，不让朗读静默失败
function ttsPickVoice(lang) {
  try {
    const vs = window.speechSynthesis.getVoices() || []; if (!vs.length) return null;   // 有的浏览器首次为空：交给默认语音
    const pre = String(lang || "en").slice(0, 2).toLowerCase(), key = "ttsVoice_" + pre;
    const saved = localStorage.getItem(key); let v = saved && vs.find(x => x.name === saved && x.lang.toLowerCase().startsWith(pre));
    if (!v) v = vs.find(x => x.lang.toLowerCase().replace("_", "-") === String(lang).toLowerCase()) || vs.find(x => x.lang.toLowerCase().startsWith(pre));
    if (v) { if (v.name !== saved) localStorage.setItem(key, v.name); return v; }
    const note = document.getElementById("ttsStatusNote"); if (note) note.textContent = pre === "en" ? "这台设备没有英文朗读语音，请看文字。" : "这台设备没有中文朗读语音，请看文字。";
  } catch (e) {}
  return null;
}
'''
if 'TTS_VOICE_CACHE' not in s:
    assert s.count(old) == 1 and s.count('function speakText(text, langMode = "en", customPitch = 1.0) {') == 1
    s = s.replace(old, new).replace('function speakText(text, langMode = "en", customPitch = 1.0) {', FN + 'function speakText(text, langMode = "en", customPitch = 1.0) {')
    __import__('appwrite').save(s); print('patched')
else: print('already')
