"""patch_wo_grimm.py —— 决策 25 / HANDOFF §5.2 1d：格林定律规则组 4 幕挂进单词身世总枢「格林定律」章（和 wo_grimm 并列，幂等，走 appwrite）。
幕内容稿 content/wo_grimm_{voiceless,voiced,aspirate,verner}_1.txt，用 v5/new_scene.py 生成并嵌入；同源词逐条核对见 word_origins/GRIMM_GROUPS.md。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = '// WO_GRIMM_GROUPS_V1'
if MARK in s: print('already'); sys.exit(0)
A = '''      { id: "wo_grimm", title: "格林定律 · 辅音挪一格", sub: "p→f、t→th、d→t、k→h：认识 foot 就能猜出 pedal", badges: ["📜", "⚠️", "💡"] },\n'''
assert s.count(A) == 1
NEW = A + '''      { id: "wo_grimm_voiceless", title: "规则组 ① p t k → f th h", sub: "foot ↔ pes、three ↔ tres、heart ↔ cor、what ↔ quod", badges: ["📜", "⚠️", "💡"] },   ''' + MARK + '''
      { id: "wo_grimm_voiced", title: "规则组 ② d g gʷ → t k kw", sub: "tooth ↔ dens、knee ↔ genu、queen ↔ gynē", badges: ["📜", "⚠️", "💡"] },
      { id: "wo_grimm_aspirate", title: "规则组 ③ bh dh gh → b d g", sub: "brother ↔ frater、door ↔ thyra、goose ↔ anser", badges: ["📜", "⚠️", "💡"] },
      { id: "wo_grimm_verner", title: "维尔纳定律：格林定律的例外", sub: "father 为什么不像 brother？was ↔ were", badges: ["📜", "⚠️"] },
'''
s = s.replace(A, NEW)
__import__('appwrite').save(s); print('patched')
