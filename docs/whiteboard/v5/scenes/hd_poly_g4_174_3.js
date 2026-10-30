// 🎞️ study · 一词多义第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g4_174.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G4_174_3_V5.md
// 角色关键帧：sprites/hdpg4174_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg4174_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '📚 study /ˈstʌdi/ — 【n./v.】书房；学习'],
  ['w', '核心意象纽带：专心钻研学问与读书专属房间'],
  ['w', '① 本义具象：v./n. 学习，研究'],
  ['w', 'We study hard at school.'],
  ['w', '② 意象桥梁：专心钻研学问与读书专属房间'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. 书房（家里专门用来读书学习的房间）'],
  ['w', 'Dad is reading in the study.'],
  ['w', '多义第3幕'],
  ['s', 'Dad is reading in the study.', '🏠 第三幕【引申新义·书房】：in the study 就是“在书房里”！']
];
export default function build() { return autoBuild(SP, { title: '🎞️ study · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
