// 🚌 交通出行小剧场 · 视角 2 方式二：动词短语作谓语 (take a... / ride a... / walk) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr09.js 案例 2；对照清单 lab/INVENTORY_HD_FR09_2_V5.md
// 角色关键帧：sprites/fr09_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr09_2.js';
const ACTS = {"*": ["l_bike0", "l_bike1", "l_bike2"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🚌 交通出行小剧场 (Transportation Frame) — 同一客观事件，切换主语视角即切换动词 (方式二：动词短语作谓语 (take a... / ride a... / walk))'],
  ['w', '当前视角流向：直接用乘坐动词作句子谓语（中间必须加冠词 a/the 或 my！） ｜ 句法结构公式：Traveler + take a bus / ride a bike + to Destination'],
  ['w', '🎬 视角 2 动态角色流向图：方式二：动词短语作谓语 (take a... / ride a... / walk)'],
  ['w', '⚡ 方式二：动词短语作谓语 (take a... / ride a... / walk)'],
  ['w', '🚌 公交车 / 🚲 自行车 / 🦶 步行 ⬅️'],
  ['w', '🗣️ Zhang Peng takes a bus ( / rides a bike / walks) to school.'],
  ['w', '张鹏乘坐公交车（/骑自行车/走路）去学校。 （句型公式：Traveler + take a bus / ride a bike + to Destination）'],
  ['w', '视角 2·第1幕'],
  ['s', 'Zhang Peng takes a bus ( / rides a bike / walks) to school.', '张鹏乘坐公交车（/骑自行车/走路）去学校。 ｜ Traveler + take a bus / ride a bike + to Destination']
];
export default function build() { return autoBuild(SP, { title: '🚌 交通出行小剧场 · 视角 2 方式二：动词短语作谓语 (take a... / ride a... / walk)', items: ITEMS, acts: ACTS }); }
