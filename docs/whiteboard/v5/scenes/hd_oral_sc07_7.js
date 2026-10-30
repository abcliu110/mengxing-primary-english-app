// 💬 日常用语 · 购物与问价 · How much are these shoes? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC07_7_V5.md
// 角色关键帧：sprites/hdo07_7.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_7.js';
const ACTS = {"*": ["l_bag0", "m_offer", "l_point"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：How much are these shoes? （这双鞋多少钱？（复数商品问价））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 单复数问价对照：How much is this coat? (It\'s...) ↔ How much are these shoes? (They\'re...)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Excuse me. How much are these white shoes?'],
  ['w', '劳驾，请问这双白色运动鞋多少钱？'],
  ['s', 'Excuse me. How much are these white shoes?', '劳驾，请问这双白色运动鞋多少钱？'],
  ['w', '对话第2轮'],
  ['w', '👩‍💼 角色 B：They are eighty yuan. Would you like to try them on?'],
  ['w', '它们八十元。你想试穿一下吗？'],
  ['s', 'They are eighty yuan. Would you like to try them on?', '它们八十元。你想试穿一下吗？'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 购物与问价 · How much are these shoes?', items: ITEMS, acts: ACTS }); }
