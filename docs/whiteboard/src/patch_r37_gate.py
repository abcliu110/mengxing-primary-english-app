"""patch_r37_gate.py —— 决策 37 / R37-13：家长门按钮在手机上被挤成「一字一行」竖排（幂等）。
改法：样式块 R37_13_GATE——家长门弹窗里的按钮 nowrap、不被压缩（flex-shrink:0），弹性行允许换行，输入框 min-width:0；
顺带补上口音两个按钮缺的 </button>（原来靠浏览器自动闭合）。检查：src/gatecheck.py（入 runall）。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); n = 0
CSS = '''<style id="r37-gate">
/* R37_13_GATE */
#parentGateContent button, #parentGateContent label { white-space: nowrap; flex-shrink: 0; }
#parentGateContent div[style*="display:flex"] { flex-wrap: wrap; row-gap: 8px; }
#parentGateContent h3 { flex: 1 1 200px; min-width: 0; }
#parentGateContent input[type="number"] { min-width: 0; flex: 1 1 140px !important; }
#parentGateContent button[onclick^="setAppAccent"] { flex: 1 1 0 !important; min-width: 0; white-space: normal; }
.parent-gate-btn { white-space: nowrap; }
</style>
'''
if '/* R37_13_GATE */' not in s:
    a = '<style id="mobile-o4">'; assert s.count(a) == 1; s = s.replace(a, CSS + a); n += 1
for acc, lab in (('en-US', '🇺🇸 美式发音 (en-US)'), ('en-GB', '🇬🇧 英式发音 (en-GB)')):
    old = f"color:${{appState.accent==='{acc}'?'#fff':'#1e293b'}};\">{lab}\n"
    new = f"color:${{appState.accent==='{acc}'?'#fff':'#1e293b'}};\">{lab}</button>\n"
    if new not in s:
        assert s.count(old) == 1, acc; s = s.replace(old, new); n += 1
for x in ('(en-US)', '(en-GB)'):
    old = f"发音 {x}</button>"; new = f'发音 <span style="white-space:nowrap">{x}</span></button>'
    if new not in s:
        assert s.count(old) == 1, x; s = s.replace(old, new); n += 1
if n: __import__('appwrite').save(s)
print('patched', n)
