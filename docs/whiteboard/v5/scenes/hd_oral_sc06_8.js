// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · What would you like to drink? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC06_8_V5.md
// 角色关键帧：sprites/hdo06_8.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo06_8.js';
const ACTS = {"*": ["m_offer", "l_nothanks", "m_like"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：What would you like to drink? （你想喝点什么？（点饮品必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 饮品量词黄金搭档：a cup of tea/coffee (热饮用茶杯 cup) ↔ a glass of juice/milk/water (冷饮透明杯用 glass)！'],
  ['w', '对话第1轮'],
  ['w', '👩‍🍳 角色 A：What would you like to drink, Sarah?'],
  ['w', '萨拉，你想喝点什么饮品？'],
  ['s', 'What would you like to drink, Sarah?', '萨拉，你想喝点什么饮品？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I\'d like a glass of orange juice, please!'],
  ['w', '请给我来一杯橙汁！'],
  ['s', 'I\'d like a glass of orange juice, please!', '请给我来一杯橙汁！'],
  ['w', '对话第3轮'],
  ['w', '👩‍🍳 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · What would you like to drink?', items: ITEMS, acts: ACTS }); }
