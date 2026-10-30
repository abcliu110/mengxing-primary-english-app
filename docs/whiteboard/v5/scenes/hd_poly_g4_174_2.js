// 🎞️ study · 一词多义第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g4_174.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G4_174_2_V5.md
// 角色关键帧：sprites/hdpg4174_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg4174_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
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
  ['w', '多义第2幕'],
  ['s', 'We study hard at school.', '🔄 第二幕【场景变形·动作定格为专属空间】：镜头拉远，展示家里那个四面是书架、专门用来学习的安静房间。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ study · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
