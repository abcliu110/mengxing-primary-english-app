"""iconic.py —— 决策 37 / R37-02：识别「字母象形」类自造说法（「w 像水波纹」「字母 c 弯弯的，就像小猫」「【象形独体词】」）。
patch_r37_iconic.py 和 etymcheck.py 共用同一个判定。按句判（。！？；）：只认「拉丁字母 + 像 / 形状」类与「象形」，不碰「像…一样」这类普通比喻。"""
import re
PAT = re.compile(r'象形'
                 r'|(?<![A-Za-z])-?(?!like)[A-Za-z]{1,4}\s*(?:字母)?\s*(?:形状)?\s*(?:就|也|都)?(?:像|好像|形如|仿佛)'
                 r'|字母[^，。；！]{0,8}(?:像|形状)'
                 r'|像[^，。；！]{0,6}的形状')
# 同一句里既点了某个字母（「字母 c」「一只眼 e」），又在说长相（像 / 弯弯 / 形状）
LET = re.compile(r'字母\s*[A-Za-z]{1,3}(?![A-Za-z])|眼\s*[a-z](?![A-Za-z])')
SHAPE = re.compile(r'像|形状|长相|弯弯|形如')
SENT = re.compile(r'[^。！？；;!?]*[。！？；;!?]?')
FIELDS = ['memory_tip', 'etymology', 'affix_root']
def sent_iconic(t): t = str(t or ''); return bool(PAT.search(t)) or (bool(LET.search(t)) and bool(SHAPE.search(t)))
def is_iconic(t): return any(sent_iconic(x) for x in SENT.findall(str(t or '')) if x)
