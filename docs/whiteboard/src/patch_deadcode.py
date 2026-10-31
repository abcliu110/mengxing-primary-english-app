"""patch_deadcode.py —— 决策 29 O6：按 src/deadcode.py 的报告删死代码（幂等，再跑一次报告应为 0）。
① 零引用顶层函数（迭代到不动点）整段删掉，连同紧挨着的前导注释行不动（只删函数本体与其后换行）。
② 浏览器里不生效的 @keyframes：`.method-hub` 样式块里 11 个 @keyframes 都写成「.method-hub @keyframes x {…}」，
   CSS 把整条当成非法选择器丢弃——页面上一个 @keyframes 都没有（document.styleSheets 实测 0 个）。删掉这 11 段，
   以及引用它们的 animation 声明（CSS 12 处 + 模板行内 style 11 处）：它们本来就不动，删后显示逐像素不变。"""
import json, re, subprocess, sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
import deadcode
APP = deadcode.APP
s = APP.read_text(encoding='utf-8'); n_fn = n_kf = n_anim = 0
# ① 函数
fns, dead, rounds = deadcode.scan(s)
for f in sorted(dead, key=lambda f: -f['start']):
    a, b = f['start'], f['end']
    if s[b:b + 1] == '\n': b += 1
    s = s[:a] + s[b:]; n_fn += 1
# ② keyframes
bad = [k['name'] for k in deadcode.keyframes(s) if not k['refs'] or k['broken_prefix']]
if bad:
    i = s.index('.method-hub /* ==================== TRUE ANIMATION KEYFRAMES ==================== */')
    j = s.index('.method-hub /* ==================== UPGRADE A: SYNTAX TRAIN ENGINE', i)
    seg = s[i:j]; assert seg.count('@keyframes') == len(bad) == 11, (seg.count('@keyframes'), bad)
    s = s[:i] + s[j:]; n_kf = len(bad)
    alt = '|'.join(bad)
    # CSS 规则里：整行「animation: x …;」删掉；行内 style：删「animation: x …;」片段
    s, k1 = re.subn(r'\n[ \t]*animation\s*:\s*(?:' + alt + r')\b[^;\n"]*;[ \t]*(?=\n)', '', s)
    s, k2 = re.subn(r'\s*animation\s*:\s*(?:' + alt + r')\b[^;"]*;?(?=\s*")', '', s)
    s, k3 = re.subn(r'animation\s*:\s*(?:' + alt + r')\b[^;"]*;\s*', '', s)
    n_anim = k1 + k2 + k3
    assert not re.search(r'(?<![\w-])(?:' + alt + r')(?![\w-])', s), '还有残留引用'
if n_fn or n_kf:
    __import__('appwrite').save(s); print('删函数', n_fn, '删 @keyframes', n_kf, '删 animation 声明', n_anim)
else: print('already')
