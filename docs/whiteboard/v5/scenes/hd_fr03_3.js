// 🧭 位移方向小剧场 · 视角 3 put (放置到目标位) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr03.js 案例 3；对照清单 lab/INVENTORY_HD_FR03_3_V5.md
// 角色关键帧：sprites/fr03_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr03_3.js';
const ACTS = {"*": ["l_put"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧭 位移方向小剧场 (Directed Motion) — 同一客观事件，切换主语视角即切换动词 (put (放置到目标位))'],
  ['w', '当前视角流向：把物体放到指定空间位置 ｜ 句法结构公式：put + Theme + Prep-Location'],
  ['w', '🎬 视角 3 动态角色流向图：put (放置到目标位)'],
  ['w', '⚡ put (放置到目标位)'],
  ['w', '👦 小明 & 📓 作业本 ➡️'],
  ['w', '🗣️ Put your books in your schoolbag.'],
  ['w', '把你的书放进书包里。 （句型公式：put + Theme + Prep-Location）'],
  ['w', '视角 3·第1幕'],
  ['s', 'Put your books in your schoolbag.', '把你的书放进书包里。 ｜ put + Theme + Prep-Location']
];
export default function build() { return autoBuild(SP, { title: '🧭 位移方向小剧场 · 视角 3 put (放置到目标位)', items: ITEMS, acts: ACTS }); }
