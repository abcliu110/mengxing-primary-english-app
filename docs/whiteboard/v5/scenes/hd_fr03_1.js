// 🧭 位移方向小剧场 · 视角 1 come & bring (朝向说话人) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr03.js 案例 1；对照清单 lab/INVENTORY_HD_FR03_1_V5.md
// 角色关键帧：sprites/fr03_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr03_1.js';
const ACTS = {"*": ["m_bring"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧭 位移方向小剧场 (Directed Motion) — 同一客观事件，切换主语视角即切换动词 (come & bring (朝向说话人))'],
  ['w', '当前视角流向：从远方 ➔ 来到说话人这里 ｜ 句法结构公式：come here / bring sth here'],
  ['w', '🎬 视角 1 动态角色流向图：come & bring (朝向说话人)'],
  ['w', '⚡ come & bring (朝向说话人)'],
  ['w', '👦 小明 & 📓 作业本 ➡️'],
  ['w', '🗣️ Come here and bring your notebook to me!'],
  ['w', '到这里来，把你的笔记本带给我！ （句型公式：come here / bring sth here）'],
  ['w', '视角 1·第1幕'],
  ['s', 'Come here and bring your notebook to me!', '到这里来，把你的笔记本带给我！ ｜ come here / bring sth here']
];
export default function build() { return autoBuild(SP, { title: '🧭 位移方向小剧场 · 视角 1 come & bring (朝向说话人)', items: ITEMS, acts: ACTS }); }
