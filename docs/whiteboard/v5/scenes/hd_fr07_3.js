// 🧠 认知与思维小剧场 · 视角 3 remember ↔ forget (记住 ↔ 忘记) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr07.js 案例 3；对照清单 lab/INVENTORY_HD_FR07_3_V5.md
// 角色关键帧：sprites/fr07_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr07_3.js';
const ACTS = {"*": ["l_switch"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧠 认知与思维小剧场 (Cognition & Mental Frame) — 同一客观事件，切换主语视角即切换动词 (remember ↔ forget (记住 ↔ 忘记))'],
  ['w', '当前视角流向：记忆的留存与丢失（remember/forget to do 记得/忘记去做未做的事） ｜ 句法结构公式：remember / forget to do sth'],
  ['w', '🎬 视角 3 动态角色流向图：remember ↔ forget (记住 ↔ 忘记)'],
  ['w', '⚡ remember ↔ forget (记住 ↔ 忘记)'],
  ['w', 'remember ↔ forget (记住 ↔ 忘记) ➡️'],
  ['w', '🗣️ Remember to turn off the light!'],
  ['w', '记得去关灯！（灯还没关） （句型公式：remember / forget to do sth）'],
  ['w', '视角 3·第1幕'],
  ['s', 'Remember to turn off the light!', '记得去关灯！（灯还没关） ｜ remember / forget to do sth']
];
export default function build() { return autoBuild(SP, { title: '🧠 认知与思维小剧场 · 视角 3 remember ↔ forget (记住 ↔ 忘记)', items: ITEMS, acts: ACTS }); }
