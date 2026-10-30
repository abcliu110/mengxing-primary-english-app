"""patch_phonics4.py —— 决策 6 拼写潜规则：并入自然拼读页顶部剧场，作为第四幕（MODULE_ROADMAP B：不新开页签）。幂等。
白板幕 = hd_phonics 第 4 幕（content/hd_phonics_4.txt）。页内 9 步阶梯不动。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
old = '${renderHDVideoControlBarHTML(["第一幕·CVC首音韵尾拼读车", "第二幕·Magic E不发音魔法棒", "第三幕·双元音/字母组合合唱"])}'
new = '${renderHDVideoControlBarHTML(["第一幕·CVC首音韵尾拼读车", "第二幕·Magic E不发音魔法棒", "第三幕·双元音/字母组合合唱", "第四幕·拼写潜规则"])}'
if new not in s: assert s.count(old) == 1; s = s.replace(old, new); __import__('appwrite').save(s)   # O8：写前锚点检查、写后 jscheck，不过就还原; print('patched')
else: print('already')
