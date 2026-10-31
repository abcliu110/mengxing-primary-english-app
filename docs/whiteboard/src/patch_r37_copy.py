"""patch_r37_copy.py —— 决策 37 / R37-12：去掉过时文案 / 技术词与重复入口（幂等；承接决策 33）。
① 文案（儿童页可见）：「高清 Canvas 情景互动动画」「高清 2D 卡通角色三幕视频级动画 + 播放控制台」「四大全局总结矩阵（高清角色分幕动画版）」
   「高清角色拼读小剧场」「高清卡通角色分幕演绎」「核心主推双引擎」「高清动态录像机」→ 现在的说法（白板动画 / 总结表）；
② 重复入口：单词大厅上方 4 张大卡（自然拼读 / 构词法 / 词语的亲戚 / 动作场景小剧场）与下方「🧭 单词专项」区 4 个小按钮去同一页面——小按钮删掉，大卡保留；
   专项区里其余按钮（实验室页签、闪电词、元音变异、一词多义、单词身世）不动。
检查：src/jargoncheck.py（术语 + 同页重复入口；总地图按设计列多条路径、首页「第一次来」引导条、知识点「🔗 另见」互链条不算重复）入 runall。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); n = 0
R = [
 ('每句表达均配备<strong>「高清 Canvas 情景互动动画」</strong>', '每句表达均配备<strong>「白板情景动画」</strong>'),
 ('每个语法点均配备<strong>「高清 2D 卡通角色三幕视频级动画 + 播放控制台」</strong>', '每个语法点均配备<strong>「白板动画：角色演示 + 画面推出规则」</strong>'),
 ('40 个小学核心语法点 + 四大全局总结矩阵（高清角色分幕动画版）', '40 个小学核心语法点 + 4 张总结表（每点配白板动画）'),
 ('9步自然拼读统一教学序 + 高清角色拼读小剧场', '9 步自然拼读 + 角色拼读白板小剧场'),
 ('并由<strong>高清卡通角色分幕演绎</strong>', '并由<strong>白板动画分幕演示</strong>'),
 ('<h2>🌟 核心主推双引擎（覆盖', '<h2>🌟 核心主推两大方法（覆盖'),
 ('aspectLens: "🎥 进行体·高清动态录像机 (Progressive = be + V-ing)"', 'aspectLens: "🎥 进行体·动态录像机 (Progressive = be + V-ing)"'),
 ('hubChip("🪄 自然拼读 9 步", "navigateTo(\'vocab_phonics\', { tab: \'steps\', stepIdx: 0 })", "#e11d48") + ', ''),
 ('hubChip("🤖 合成词 / 前后缀 / 派生词族", "navigateTo(\'vocab_formation\', { tab: \'compounds\' })", "#7c3aed") + ', ''),
 ('hubChip("👨‍👩‍👧 易混词 / 反义词 / 同义词", "navigateTo(\'vocab_relations\', { tab: \'confusables\', query: \'\' })", "#d97706") + hubChip("🎬 框架小剧场", "navigateTo(\'vocab_frames\', { frameIdx: 0, pIdx: 0 })", "#d97706") + ', ''),
]
for old, new in R:
    if s.count(old) == 0: continue   # 已改过
    assert s.count(old) == 1, old[:50]; s = s.replace(old, new); n += 1
if n: __import__('appwrite').save(s)
print('patched', n)
