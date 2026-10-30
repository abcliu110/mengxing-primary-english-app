// 💬 日常用语 · 购物与问价 · I'll take it! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC07_4_V5.md
// 角色关键帧：sprites/hdo07_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_4.js';
const ACTS = {"*": ["l_piggy", "l_bag1", "l_speak"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：I\'ll take it! （我买下它了！（决定购买时最地道表达））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 地道口语地道考：在商店拍板说“这件我买了！”，要用 I\'ll take it!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：This storybook is so interesting and cheap. I\'ll take it!'],
  ['w', '这本故事书又有趣又便宜。我买下它了！'],
  ['s', 'This storybook is so interesting and cheap. I\'ll take it!', '这本故事书又有趣又便宜。我买下它了！'],
  ['w', '对话第2轮'],
  ['w', '👨‍💼 角色 B：Great! That will be fifteen yuan, please.'],
  ['w', '太好了！一共是十五元。'],
  ['s', 'Great! That will be fifteen yuan, please.', '太好了！一共是十五元。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 购物与问价 · I\'ll take it!', items: ITEMS, acts: ACTS }); }
