// 💬 日常用语 · 购物与问价 · Here is your change. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 12；对照清单 lab/INVENTORY_HD_ORAL_SC07_12_V5.md
// 角色关键帧：sprites/hdo07_12.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_12.js';
const ACTS = {"*": ["l_piggy", "l_bag1", "l_speak"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：Here is your change. （这是找您的零钱。（收银结账必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 熟词生义必考：change 除了“变化”，在购物场景中专指“找回的零钱”（Keep the change 不用找零了）！'],
  ['w', '对话第1轮'],
  ['w', '👩‍💼 角色 A：Here is twenty yuan for the notebook.'],
  ['w', '这是买笔记本的二十元钱。'],
  ['s', 'Here is twenty yuan for the notebook.', '这是买笔记本的二十元钱。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Thank you! It\'s fifteen yuan, and here is your five yuan change.'],
  ['w', '谢谢！笔记本十五元，这是找您的五元零钱。'],
  ['s', 'Thank you! It\'s fifteen yuan, and here is your five yuan change.', '谢谢！笔记本十五元，这是找您的五元零钱。'],
  ['w', '对话第3轮'],
  ['w', '👩‍💼 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 购物与问价 · Here is your change.', items: ITEMS, acts: ACTS }); }
