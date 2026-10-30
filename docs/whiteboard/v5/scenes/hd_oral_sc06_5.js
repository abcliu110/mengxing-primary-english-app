// 💬 日常用语 · 就餐与点菜 · What's your favourite food? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC06_5_V5.md
// 角色关键帧：sprites/hdo06_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo06_5.js';
const ACTS = {"*": ["m_bread", "m_cake", "l_speak"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：What\'s your favourite food? （你最喜欢的食物是什么？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 万能提问模板：What\'s your favourite + 名词（food/colour/animal）?'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Sarah, what\'s your favourite food?'],
  ['w', '萨拉，你最喜欢的食物是什么？'],
  ['s', 'Sarah, what\'s your favourite food?', '萨拉，你最喜欢的食物是什么？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：My favourite food is salad. It\'s healthy and fresh!'],
  ['w', '我最喜欢的食物是沙拉。它既健康又新鲜！'],
  ['s', 'My favourite food is salad. It\'s healthy and fresh!', '我最喜欢的食物是沙拉。它既健康又新鲜！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 就餐与点菜 · What\'s your favourite food?', items: ITEMS, acts: ACTS }); }
