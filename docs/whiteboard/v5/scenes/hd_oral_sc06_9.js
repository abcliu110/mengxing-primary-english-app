// 💬 日常用语 · 就餐与点菜 · It tastes so delicious! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC06_9_V5.md
// 角色关键帧：sprites/hdo06_9.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo06_9.js';
const ACTS = {"*": ["m_bread", "m_cake", "l_speak"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：It tastes so delicious! （它尝起来太美味了！（夸赞美食必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 餐桌夸菜三连击：It looks nice! (色) · It smells good! (香) · It tastes delicious! (味)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Try this strawberry cake! How does it taste?'],
  ['w', '尝尝这块草莓蛋糕吧！味道怎么样？'],
  ['s', 'Try this strawberry cake! How does it taste?', '尝尝这块草莓蛋糕吧！味道怎么样？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Mmm, it tastes so sweet and delicious!'],
  ['w', '嗯，它尝起来又甜又美味！'],
  ['s', 'Mmm, it tastes so sweet and delicious!', '嗯，它尝起来又甜又美味！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 就餐与点菜 · It tastes so delicious!', items: ITEMS, acts: ACTS }); }
