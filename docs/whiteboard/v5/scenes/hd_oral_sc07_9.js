// 💬 日常用语 · 购物与问价 · What colour would you like? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC07_9_V5.md
// 角色关键帧：sprites/hdo07_9.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo07_9.js';
const ACTS = {"*": ["l_bag0", "m_offer", "l_point"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：What colour would you like? （您想要什么颜色的？（挑颜色必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 购物三连问：What can I do for you? (买什么) ➔ What colour...? (什么颜色) ➔ What size...? (什么尺码)'],
  ['w', '对话第1轮'],
  ['w', '👩‍💼 角色 A：We have red, yellow and blue caps. What colour would you like?'],
  ['w', '我们有红、黄、蓝三色棒球帽。你想要什么颜色的？'],
  ['s', 'We have red, yellow and blue caps. What colour would you like?', '我们有红、黄、蓝三色棒球帽。你想要什么颜色的？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I\'d like the blue one, please. Blue is my favourite colour!'],
  ['w', '请给我拿那顶蓝色的。蓝色是我最喜欢的颜色！'],
  ['s', 'I\'d like the blue one, please. Blue is my favourite colour!', '请给我拿那顶蓝色的。蓝色是我最喜欢的颜色！'],
  ['w', '对话第3轮'],
  ['w', '👩‍💼 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 购物与问价 · What colour would you like?', items: ITEMS, acts: ACTS }); }
