// 💬 日常用语 · 询问与求助 · What does this word mean? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc05.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC05_5_V5.md
// 角色关键帧：sprites/hdo05_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo05_5.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '询问与求助'],
  ['w', '核心交际句：What does this word mean? （这个单词是什么意思？）'],
  ['w', '💡 交际得体度与母语负迁移提示：请教生词意思。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Miss White, what does this word mean?'],
  ['w', '怀特老师，这个词是什么意思？'],
  ['s', 'Miss White, what does this word mean?', '怀特老师，这个词是什么意思？'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：It means \'delicious\'—yummy food!'],
  ['w', '意思是美味的！'],
  ['s', 'It means \'delicious\'—yummy food!', '意思是美味的！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Aha! I got it!'],
  ['w', '我明白啦！'],
  ['s', 'Aha! I got it!', '我明白啦！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 询问与求助 · What does this word mean?', items: ITEMS, acts: ACTS }); }
