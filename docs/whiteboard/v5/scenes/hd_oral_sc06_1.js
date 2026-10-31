// 💬 日常用语 · 就餐与点菜 · What would you like? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC06_1_V5.md
// 角色关键帧：sprites/hdo06_1.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo06_1.js';
const ACTS = {"*": ["m_bread", "m_cake", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：What would you like? （你想吃/喝点什么？（点餐与待客必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 点餐必考铁律：听到 What would you like? 必须用 I\'d like some... 回答！'],
  ['w', '对话第1轮'],
  ['w', '👨‍🍳 角色 A：Welcome! What would you like to eat today?'],
  ['w', '欢迎光临！你今天想吃点什么？'],
  ['s', 'Welcome! What would you like to eat today?', '欢迎光临！你今天想吃点什么？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I\'d like some beef noodles and orange juice, please!'],
  ['w', '请给我来一份牛肉面和一杯橙汁！'],
  ['s', 'I\'d like some beef noodles and orange juice, please!', '请给我来一份牛肉面和一杯橙汁！'],
  ['w', '对话第3轮'],
  ['w', '👨‍🍳 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 就餐与点菜 · What would you like?', items: ITEMS, acts: ACTS }); }
