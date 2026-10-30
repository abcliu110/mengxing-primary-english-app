// 💬 言语交流小剧场 · 视角 1 tell sb sth / tell sb to do —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr08.js 案例 1；对照清单 lab/INVENTORY_HD_FR08_1_V5.md
// 角色关键帧：sprites/fr08_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr08_1.js';
const ACTS = {"*": ["missw"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '💬 言语交流小剧场 (Communication Frame) — 同一客观事件，切换主语视角即切换动词 (tell sb sth / tell sb to do)'],
  ['w', '当前视角流向：单向传递故事或指令 ｜ 句法结构公式：Speaker + tell + Addressee + Message'],
  ['w', '🎬 视角 1 动态角色流向图：tell sb sth / tell sb to do'],
  ['w', '⚡ tell sb sth / tell sb to do'],
  ['w', '📖 有趣的故事 / 问题 ➡️'],
  ['w', '🗣️ Miss White tells the students an interesting story.'],
  ['w', '怀特老师给学生们讲了一个有趣的故事。 （句型公式：Speaker + tell + Addressee + Message）'],
  ['w', '视角 1·第1幕'],
  ['s', 'Miss White tells the students an interesting story.', '怀特老师给学生们讲了一个有趣的故事。 ｜ Speaker + tell + Addressee + Message']
];
export default function build() { return autoBuild(SP, { title: '💬 言语交流小剧场 · 视角 1 tell sb sth / tell sb to do', items: ITEMS, acts: ACTS }); }
