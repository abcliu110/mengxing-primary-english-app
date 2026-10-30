// 💬 日常用语 · 看病与身体不适 · How do you feel? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC12_3_V5.md
// 角色关键帧：sprites/hdo12_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo12_3.js';
const ACTS = {"*": ["l_plaster", "l_breath", "l_think"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：How do you feel? （你感觉怎么样？（询问心情与身体感受））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 感官系动词口诀：feel / look / sound / taste 后面直接跟形容词！'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：You took a rest, Amy. How do you feel now?'],
  ['w', '艾米，你休息了一会儿，现在感觉怎么样啦？'],
  ['s', 'You took a rest, Amy. How do you feel now?', '艾米，你休息了一会儿，现在感觉怎么样啦？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I feel much better now, Mum! Let\'s go to the park!'],
  ['w', '妈妈，我现在感觉好多啦！我们去公园吧！'],
  ['s', 'I feel much better now, Mum! Let\'s go to the park!', '妈妈，我现在感觉好多啦！我们去公园吧！'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · How do you feel?', items: ITEMS, acts: ACTS }); }
