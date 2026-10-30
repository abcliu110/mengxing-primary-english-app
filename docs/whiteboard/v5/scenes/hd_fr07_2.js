// 🧠 认知与思维小剧场 · 视角 2 know / think (知道 / 认为) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr07.js 案例 2；对照清单 lab/INVENTORY_HD_FR07_2_V5.md
// 角色关键帧：sprites/fr07_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr07_2.js';
const ACTS = {"*": ["l_think"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧠 认知与思维小剧场 (Cognition & Mental Frame) — 同一客观事件，切换主语视角即切换动词 (know / think (知道 / 认为))'],
  ['w', '当前视角流向：大脑已储存的知识或主观看法 ｜ 句法结构公式：know + n. / I think (that)...'],
  ['w', '🎬 视角 2 动态角色流向图：know / think (知道 / 认为)'],
  ['w', '⚡ know / think (知道 / 认为)'],
  ['w', 'know / think (知道 / 认为) ⬅️'],
  ['w', '🗣️ I know his name. I think he is very clever.'],
  ['w', '我知道他的名字。我认为他很聪明。 （句型公式：know + n. / I think (that)...）'],
  ['w', '视角 2·第1幕'],
  ['s', 'I know his name. I think he is very clever.', '我知道他的名字。我认为他很聪明。 ｜ know + n. / I think (that)...']
];
export default function build() { return autoBuild(SP, { title: '🧠 认知与思维小剧场 · 视角 2 know / think (知道 / 认为)', items: ITEMS, acts: ACTS }); }
