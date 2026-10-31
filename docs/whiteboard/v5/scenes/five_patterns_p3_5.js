// 🧱 五大基本句型 · ⑤ SVOC 魔法赋能型 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_5（249 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 5；对照清单 lab/INVENTORY_FIVE_PATTERNS_5_V5.md
// 角色关键帧：sprites/fpat5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat5.js';
const ACTS = {"reading": ["m_aloud"], "read": ["m_aloud"], "play": ["kick0", "kick1", "kick2"], "go": ["l_w0", "l_w1", "l_w2"], "laugh": ["l_laugh"]};
const ITEMS = [
  ['n', '一般动词 ask、tell、want、invite 要带 to：ask us to read。'],
  ['w', 'ask / tell / want / invite + sb. + to do'],
  ['s', 'Ask, tell, want, invite. Ask us to read! Do it now.', '请求、告诉、想要、邀请。叫我们来读吧！现在就做。', 'ask tell want invite do'],
  ['n', '使役动词后面用原形：Let\'s go! Make him laugh!'],
  ['w', 'make / let / have + sb. + do（不带 to）   Let\'s go! · Make him laugh!'],
  ['s', 'Make, let, have. Let\'s go! Make him laugh!', '让。我们走吧！让他笑！', 'make let have Let\'s go him laugh do'],
  ['w', 'S + V + O（宾语）+ OC（宾补：形容词 / 名词 / to do / do）'],
  ['w', '读书让我变聪明。  make / let / have 后面不带 to！'],
  ['n', '口诀：make、let、have 不带 to；ask、tell、want 要带 to。'],
  ['n', '预测：「老师让我们大声朗读」：makes 是使役动词，后面用 read 还是 to read？先想 3 秒！'],
  ['w', '🔮 老师让我们大声朗读。'],
  ['w', '→  The teacher makes us ___ aloud.  ( read / to read )'],
  ['n', '揭晓：使役动词 make 后面用原形、不带 to：The teacher makes us read aloud.'],
  ['w', 'The teacher makes us read aloud.'],
  ['s', 'The teacher makes us read aloud.', '老师让我们大声朗读。', 'the teacher makes us read aloud'],
  ['w', '💡 一句话洞见'],
  ['w', '宾语后面再补一笔：变成什么样或去做什么，'],
  ['w', '宾语 + 宾补像一个小句子'],
  ['w', '🎵 口诀'],
  ['w', '口诀：make、let、have 不带 to；'],
  ['w', 'ask、tell、want 要带 to。'],
  ['w', '🦴 五大基本句型 · 句型 ⑤ SVOC']
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ⑤ SVOC 魔法赋能型 · 第 3 节', items: ITEMS, acts: ACTS }); }
