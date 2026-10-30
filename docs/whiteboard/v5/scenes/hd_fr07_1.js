// 🧠 认知与思维小剧场 · 视角 1 learn (学习：从不会到会) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr07.js 案例 1；对照清单 lab/INVENTORY_HD_FR07_1_V5.md
// 角色关键帧：sprites/fr07_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr07_1.js';
const ACTS = {"*": ["sw0", "sw1", "sw2"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧠 认知与思维小剧场 (Cognition & Mental Frame) — 同一客观事件，切换主语视角即切换动词 (learn (学习：从不会到会))'],
  ['w', '当前视角流向：获取新知识或技能的过程 ｜ 句法结构公式：learn + n. / learn to do sth'],
  ['w', '🎬 视角 1 动态角色流向图：learn (学习：从不会到会)'],
  ['w', '⚡ learn (学习：从不会到会)'],
  ['w', 'learn (学习：从不会到会) ➡️'],
  ['w', '🗣️ Amy learns to swim in summer.'],
  ['w', '艾米在夏天学会游泳。 （句型公式：learn + n. / learn to do sth）'],
  ['w', 'Amy learns to swim in summer. ｜ 艾米在夏天学会游泳。 ｜ learn + n. / learn to do sth'],
  ['w', '视角 1·第1幕'],
  ['s', 'Amy learns to swim in summer.', '艾米在夏天学会游泳。 ｜ learn + n. / learn to do sth']
];
export default function build() { return autoBuild(SP, { title: '🧠 认知与思维小剧场 · 视角 1 learn (学习：从不会到会)', items: ITEMS, acts: ACTS }); }
