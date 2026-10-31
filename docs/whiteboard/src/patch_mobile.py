"""patch_mobile.py —— 决策 29 O4：手机 / 平板适配（幂等）。检查脚本 src/mobilecheck.py（已入 runall）。
① 触控目标 ≥ 44 px：新样式块 <style id="mobile-o4">（标记 MOBILE_O4_V1），所有按钮 / 可点元素最小 44×44；
   可点的行内 span / a（如「🔊 点读发音」小标签）改成 inline-flex 才能撑高；正文段落里的内联链接不动（WCAG 2.5.8 inline 例外）。
② 文字 ≥ 12 px：主文件里仅有的两种小于 12 px 的字号 0.72rem / 0.74rem（11.52 / 11.84 px）统一改成 0.75rem（12 px）。
③ 横向滚动：390 / 768 / 1024 三个视口 24 个页面检查原本就为 0，另加保险 html, body { overflow-x: hidden }（不影响内部横滑容器）。"""
import pathlib, re, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = '/* MOBILE_O4_V1 */'
CSS = '''<style id="mobile-o4">
/* MOBILE_O4_V1 */
/* 决策 29 O4：触控目标 ≥ 44 px（src/patch_mobile.py 生成，检查 src/mobilecheck.py） */
html, body { overflow-x: hidden; }
button, [role="button"], select, input[type="button"], input[type="submit"], a[onclick], [onclick] { min-height: 44px; }
button, [role="button"], input[type="button"], input[type="submit"], a[onclick] { min-width: 44px; }
button { touch-action: manipulation; }
span[onclick], a[onclick] { display: inline-flex; align-items: center; justify-content: center; min-width: 44px; vertical-align: middle; }
p > a[onclick], li > a[onclick] { display: inline; min-height: 0; min-width: 0; }
</style>
'''
n0 = 0
if MARK not in s:
    i = s.index('<style id="method-hub-styles">'); j = s.index('</style>', i) + len('</style>\n')
    s = s[:j] + CSS + s[j:]; n0 += 1
pat = re.compile(r'(font-size\s*:\s*)0\.7[24]rem')
s, n1 = pat.subn(r'\g<1>0.75rem', s)
if n0 or n1:
    __import__('appwrite').save(s); print('patched css', n0, 'font', n1)
else: print('already')
