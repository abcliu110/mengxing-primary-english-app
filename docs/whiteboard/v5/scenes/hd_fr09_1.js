// 🚌 交通出行小剧场 · 视角 1 方式一：介词短语放句尾 (by + 交通工具 / on foot) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr09.js 案例 1；对照清单 lab/INVENTORY_HD_FR09_1_V5.md
// 角色关键帧：sprites/fr09_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr09_1.js';
const ACTS = {"*": ["bus"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🚌 交通出行小剧场 (Transportation Frame) — 同一客观事件，切换主语视角即切换动词 (方式一：介词短语放句尾 (by + 交通工具 / on foot))'],
  ['w', '当前视角流向：先说“去哪儿 (go to...)”，句尾用 by + 交通工具单数（零冠词，不加 a/the！） ｜ 句法结构公式：Traveler + go to + Destination + by Vehicle / on foot'],
  ['w', '🎬 视角 1 动态角色流向图：方式一：介词短语放句尾 (by + 交通工具 / on foot)'],
  ['w', '⚡ 方式一：介词短语放句尾 (by + 交通工具 / on foot)'],
  ['w', '🚌 公交车 / 🚲 自行车 / 🦶 步行 ➡️'],
  ['w', '🗣️ Zhang Peng goes to school by bus ( / by bike / on foot).'],
  ['w', '张鹏乘公交车（/骑车/步行）去学校。 （句型公式：Traveler + go to + Destination + by Vehicle / on foot）'],
  ['w', '视角 1·第1幕'],
  ['s', 'Zhang Peng goes to school by bus ( / by bike / on foot).', '张鹏乘公交车（/骑车/步行）去学校。 ｜ Traveler + go to + Destination + by Vehicle / on foot']
];
export default function build() { return autoBuild(SP, { title: '🚌 交通出行小剧场 · 视角 1 方式一：介词短语放句尾 (by + 交通工具 / on foot)', items: ITEMS, acts: ACTS }); }
