// 🧱 五大基本句型 · ⑤ SVOC 魔法赋能型 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/five_patterns_p2_5.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 5；对照清单 lab/INVENTORY_FIVE_PATTERNS_5_V5.md
// 角色关键帧：sprites/fpat5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat5.js';
const ACTS = {"reading": ["m_aloud"], "read": ["m_aloud"], "play": ["kick0", "kick1", "kick2"], "go": ["l_w0", "l_w1", "l_w2"], "laugh": ["l_laugh"]};
const ITEMS = [
  ['n', '句型 ⑤：光有主谓宾还不够，还要说宾语「变成什么样」或「去做什么」。'],
  ['w', '句型 ⑤ SVOC'],
  ['w', '魔法赋能型 · 让宾语干某事 / 变某样'],
  ['w', '💡 记忆联想'],
  ['w', '句型 ⑤ SVOC'],
  ['w', '魔法赋能型 · 让宾语干某事 / 变某样'],
  ['m', '💡 记忆联想'],
  ['m', '① 骨架'],
  ['m', '② 小主谓'],
  ['m', '③ 形容词宾补'],
  ['m', '④ 使役动词'],
  ['m', '⑤ 公式·口诀'],
  ['m', '🔮 预测'],
  ['n', 'Good music makes us：好音乐让我们……话还没说完！'],
  ['w', 'S 主语'],
  ['w', 'Good music'],
  ['m', '+'],
  ['m', 'V 使役谓语'],
  ['m', 'makes'],
  ['m', '+'],
  ['m', 'O 宾语'],
  ['w', 'us'],
  ['n', '宾语补足语 OC：补充说明宾语的状态或动作，简称宾补，比如 happy、relax。'],
  ['w', '+'],
  ['w', 'OC 宾补'],
  ['w', 'happy / relax'],
  ['n', '小主谓句：宾语 + 宾补连起来像一个小句子：us happy → 我们开心。'],
  ['w', 'us + happy → 我们开心'],
  ['n', '魔法赋能：比喻：动词像魔法棒，点一下宾语，让它变个样或去做件事。'],
  ['m', '♪'],
  ['m', '♫'],
  ['m', '♪'],
  ['s', 'Good music makes us happy. It makes us relax.', '好音乐让我们开心。它让我们放松。', 'Good music makes us happy relax Good music makes us'],
  ['w', 'Reading books makes me clever and keeps my mind open.'],
  ['s', 'Reading books makes me clever and keeps my mind open.', '读书让我变聪明，让我的思想更开阔。'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'O'],
  ['w', 'OC'],
  ['w', 'V'],
  ['w', 'O'],
  ['w', 'OC'],
  ['s', 'Reading books makes me clever and keeps my mind open.', '读书让我变聪明，让我的思想更开阔。', 'Reading books me clever and keeps my mind open keep'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ⑤ SVOC 魔法赋能型', items: ITEMS, acts: ACTS }); }
