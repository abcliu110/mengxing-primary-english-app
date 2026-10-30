// 💬 言语交流小剧场 · 视角 2 ask ↔ answer —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr08.js 案例 2；对照清单 lab/INVENTORY_HD_FR08_2_V5.md
// 角色关键帧：sprites/fr08_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr08_2.js';
const ACTS = {"*": ["l_hand0", "l_hand1", "l_hand2"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '💬 言语交流小剧场 (Communication Frame) — 同一客观事件，切换主语视角即切换动词 (ask ↔ answer)'],
  ['w', '当前视角流向：提问与回答闭环 ｜ 句法结构公式：ask a question ↔ answer the question'],
  ['w', '🎬 视角 2 动态角色流向图：ask ↔ answer'],
  ['w', '⚡ ask ↔ answer'],
  ['w', '📖 有趣的故事 / 问题 ⬅️'],
  ['w', '🗣️ You can ask me questions, and I will answer you.'],
  ['w', '你们可以问我问题，我会回答你们。 （句型公式：ask a question ↔ answer the question）'],
  ['w', '视角 2·第1幕'],
  ['s', 'You can ask me questions, and I will answer you.', '你们可以问我问题，我会回答你们。 ｜ ask a question ↔ answer the question']
];
export default function build() { return autoBuild(SP, { title: '💬 言语交流小剧场 · 视角 2 ask ↔ answer', items: ITEMS, acts: ACTS }); }
