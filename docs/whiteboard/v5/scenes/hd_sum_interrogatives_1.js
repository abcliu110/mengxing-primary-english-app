// 🦉 疑问词词源雷达 · 第1幕 wh- 提问头 ↔ th- 远指 ↔ h- 近指 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_interrogatives.js 案例 1；对照清单 lab/INVENTORY_HD_SUM_INTERROGATIVES_1_V5.md
// 角色关键帧：sprites/hdsint1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdsint1.js';
const ACTS = {"*": ["l_think", "l_point", "l_search"]};
const ITEMS = [
  ['w', '疑问词词源雷达'],
  ['w', '古英语 wh-(提问头) ↔ th-(远指回答头) ↔ h-(近指头) 完美对称：where↔there↔here, when↔then'],
  ['w', '看中央实验台：旋转词头密码锁，一眼看懂 9 大疑问词的造词规律与句首倒装语序！'],
  ['w', '🔬 词源密码：古英语『wh-提问头 ↔ th-远指头 ↔ h-近指头』对称转盘'],
  ['w', '❓ where (哪里)'],
  ['w', '👉 there (那里)'],
  ['w', '📍 here (这里)'],
  ['w', '❓ when (何时)'],
  ['w', '👉 then (那时)'],
  ['w', '⚡ now (现在)'],
  ['w', '❓ what (什么)'],
  ['w', '👉 that (那个)'],
  ['w', '📦 this (这个)'],
  ['w', '疑问第1幕'],
  ['s', 'Where is it? Over there! Whose bag is this? It\'s mine.', 'where/there/here 共享地点词根 -ere；when/then 共享时间词根 -en；what/that 共享事物词根 -at！']
];
export default function build() { return autoBuild(SP, { title: '🦉 疑问词词源雷达 · 第1幕 wh- 提问头 ↔ th- 远指 ↔ h- 近指', items: ITEMS, acts: ACTS }); }
