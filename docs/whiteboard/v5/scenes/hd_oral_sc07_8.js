// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Do you have a smaller one? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC07_8_V5.md
// 角色关键帧：sprites/hdo07_8.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_8.js';
const ACTS = {"*": ["l_piggy", "l_bag1", "l_speak"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：Do you have a smaller one? （请问有小一号的吗？（换尺码必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 购物比较级活用：too big ➔ a smaller one · too small ➔ a bigger one · too expensive ➔ a cheaper one！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：This T-shirt is too big for me. Do you have a smaller one?'],
  ['w', '这件T恤我穿太大了。请问有小一点的吗？'],
  ['s', 'This T-shirt is too big for me. Do you have a smaller one?', '这件T恤我穿太大了。请问有小一点的吗？'],
  ['w', '对话第2轮'],
  ['w', '👩‍💼 角色 B：Yes! Here is Size S. Try this one, please.'],
  ['w', '有的！这是小号（S码）。请试试这件吧。'],
  ['s', 'Yes! Here is Size S. Try this one, please.', '有的！这是小号（S码）。请试试这件吧。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Do you have a smaller one?', items: ITEMS, acts: ACTS }); }
