"""patch_dedup_a.py —— 重复内容合并第 1 步（用户 2026-10-31 02:22）：认读卡「拼读规律」后面不再接 V6 占位文字。
词卡 / 22 词弹窗的部分在 patch_etym_card.py（etymIsPlaceholderTip、主题标签）。幂等，写回走 appwrite.save。"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
OLD = '✨ 拼读规律：${w.syllables}（${w.memory_tip}）'
NEW = '✨ 拼读规律：${w.syllables}${etymIsPlaceholderTip(w.memory_tip) ? "" : `（${w.memory_tip}）`}<!-- DEDUP_A:sight -->'
if NEW in s: sys.exit('已打过补丁')
assert s.count(OLD) == 1
save(s.replace(OLD, NEW)); print('ok')
