// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Let's play together! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC03_3_V5.md
// 角色关键帧：sprites/hdo03_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_3.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Let\'s play together! （我们一起玩吧！（课间邀请小伙伴必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 邀请小伙伴口诀：Let\'s 后面接动词原形，回答 Good idea!（好主意）'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Class is over! Let\'s play football together on the playground!'],
  ['w', '下课啦！我们一起去操场上踢足球吧！'],
  ['s', 'Class is over! Let\'s play football together on the playground!', '下课啦！我们一起去操场上踢足球吧！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Great! That\'s a good idea! Let\'s go!'],
  ['w', '太棒了！那真是个好主意！我们走吧！'],
  ['s', 'Great! That\'s a good idea! Let\'s go!', '太棒了！那真是个好主意！我们走吧！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Let\'s play together!', items: ITEMS, acts: ACTS }); }
