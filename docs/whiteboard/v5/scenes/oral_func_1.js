// 💬 交际句型地图 · ① 礼貌阶梯 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/oral_func.js 案例 1；对照清单 lab/INVENTORY_ORAL_FUNC_1_V5.md
// 角色关键帧：sprites/of1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/of1.js';
const ACTS = {"give": ["l_hand0", "l_hand1", "l_hand2"], "giving": ["l_hand0", "l_hand1", "l_hand2"], "mind": ["l_think"]};
const ITEMS = [
  ['n', '这一幕：同一件事，英语可以说得很直接，也可以说得很客气。我们爬一爬「礼貌阶梯」。'],
  ['w', '礼貌阶梯：从直接到客气'],
  ['w', '✂️ 简化说法'],
  ['n', '第一级：直接下命令。对很熟的家人可以，对别人会显得没礼貌。'],
  ['w', '① 命令：Give me ...'],
  ['s', 'Give me the pen.', '把笔给我。', 'give'],
  ['n', '第二级：加上 please，马上客气一点。'],
  ['w', '② 加 please'],
  ['s', 'Please give me the pen.', '请把笔给我。', 'please'],
  ['n', '第三级：改成问句，让对方可以说「不」。'],
  ['w', '③ Can you ...?'],
  ['s', 'Can you give me the pen?', '你能把笔给我吗？', 'can'],
  ['n', '第四级：用 could。could 是 can 的过去式，「往后退一步」就更客气。'],
  ['w', '④ Could you ..., please?'],
  ['s', 'Could you give me the pen, please?', '您能把笔给我吗？', 'could'],
  ['n', '第五级：Would you mind ...? 意思是「您介意……吗」，最客气。'],
  ['w', '⑤ Would you mind ...ing?'],
  ['s', 'Would you mind giving me the pen?', '您介意把笔给我吗？', 'mind'],
  ['n', '要小心：别人问 Would you mind，你愿意帮忙，要说「不介意」：Not at all.'],
  ['w', '⚠️ 答应要说 Not at all.（不介意）'],
  ['s', 'Not at all.', '一点也不介意。', 'not'],
  ['n', '再分清两个小词：打扰别人之前说 Excuse me，做错事之后说 Sorry。'],
  ['w', '打扰之前：Excuse me 做错之后：Sorry'],
  ['s', 'Excuse me, can I sit here?', '打扰一下，我可以坐这儿吗？', 'excuse'],
  ['s', 'Sorry, I am late.', '对不起，我迟到了。', 'sorry'],
  ['n', '口诀：命令最直接，please 软一点；can 变 could 更礼貌，would you mind 最客气。'],
  ['w', '🎵 命令最直接，please 软一点；'],
  ['w', 'can 变 could 更礼貌，'],
  ['w', 'would you mind 最客气！']
];
export default function build() { return autoBuild(SP, { title: '💬 交际句型地图 · ① 礼貌阶梯', items: ITEMS, acts: ACTS }); }
