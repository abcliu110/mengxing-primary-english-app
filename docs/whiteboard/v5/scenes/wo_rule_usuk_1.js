// 🔬 规律 15 · 英式和美式拼写为什么不一样 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_usuk.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_USUK_1_V5.md
// 角色关键帧：sprites/us1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/us1.js';
const ACTS = {"color": ["l_paint0"]};
const ITEMS = [
  ['n', 'colour 和 color、centre 和 center，都对，只是英国和美国的写法不同。'],
  ['w', '🔬 规律 15：英式拼写 ↔ 美式拼写'],
  ['w', '📜 有出处 ⚠️ 两种都对'],
  ['w', 'colour（英）↔ color（美）'],
  ['w', 'centre（英）↔ center（美）'],
  ['s', 'What color is it?', '它是什么颜色？', 'color'],
  ['n', '美国的写法很多来自词典编者诺亚·韦伯斯特：他主张改革拼写，美国的写法就这样固定下来。英国的标准则跟着约翰逊 1755 年的词典走。'],
  ['w', '美式：韦伯斯特的词典 ｜ 英式：约翰逊 1755 年的词典'],
  ['n', '考试时跟着课本用一种，别混着写。'],
  ['w', '⚠️ 一篇文章里只用一种'],
  ['n', '出处：Wiktionary 列了两种拼写；历史见 Wikipedia「American and British English spelling differences」。'],
  ['w', '出处：Wiktionary · Wikipedia']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 15 · 英式和美式拼写为什么不一样', items: ITEMS, acts: ACTS }); }
