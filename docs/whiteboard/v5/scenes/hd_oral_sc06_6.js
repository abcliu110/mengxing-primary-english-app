// 💬 日常用语 · 就餐与点菜 · Pass me the spoon, please. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC06_6_V5.md
// 角色关键帧：sprites/hdo06_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo06_6.js';
const ACTS = {"*": ["m_offer", "l_nothanks", "m_like"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：Pass me the spoon, please. （请把勺子递给我。（餐桌求助必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 餐桌递物黄金句：Pass me the + 餐具 (chopsticks / fork / knife / spoon), please!'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：Dad, pass me the spoon, please. I want some soup.'],
  ['w', '爸爸，请把勺子递给我。我想喝点汤。'],
  ['s', 'Dad, pass me the spoon, please. I want some soup.', '爸爸，请把勺子递给我。我想喝点汤。'],
  ['w', '对话第2轮'],
  ['w', '👨 角色 B：Sure! Here you are. Be careful, the soup is hot!'],
  ['w', '当然可以！给你。小心点，汤很烫哦！'],
  ['s', 'Sure! Here you are. Be careful, the soup is hot!', '当然可以！给你。小心点，汤很烫哦！'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 就餐与点菜 · Pass me the spoon, please.', items: ITEMS, acts: ACTS }); }
