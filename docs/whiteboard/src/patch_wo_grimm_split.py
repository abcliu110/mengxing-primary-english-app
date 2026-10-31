"""patch_wo_grimm_split.py —— 决策 36-② / 38 ⑭：wo_grimm（174 s）拆 3 节后，第 2、3 节作为单词身世「格林定律」章里紧跟 wo_grimm 的两个新幕（幂等，走 appwrite）。
场景 v5/scenes/wo_grimm_rows_1.js、wo_grimm_more_1.js；嵌入 `python3 v5/rebuild_all.py --tabs=wo_grimm`。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = '// WO_GRIMM_SPLIT_V1'
if MARK in s: print('already'); sys.exit(0)
A = '''      { id: "wo_grimm", title: "格林定律 · 辅音挪一格", sub: "p→f、t→th、d→t、k→h：认识 foot 就能猜出 pedal", badges: ["📜", "⚠️", "💡"] },\n'''
assert s.count(A) == 1
NEW = A + '''      { id: "wo_grimm_rows", title: "格林定律 ② 一排都挪", sub: "three ↔ tres、tooth ↔ dentist、heart ↔ cardiac", badges: ["📜", "⚠️"] },   ''' + MARK + '''
      { id: "wo_grimm_more", title: "格林定律 ③ 彩蛋与再猜", sub: "December 为什么是「十」？pedestrian 是什么人？", badges: ["📜", "💡"] },
'''
s = s.replace(A, NEW)
__import__('appwrite').save(s); print('patched')
