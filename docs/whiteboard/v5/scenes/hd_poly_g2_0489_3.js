// 🎞️ play · 一词多义第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_0489.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G2_0489_3_V5.md
// 角色关键帧：sprites/hdpg20489_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg20489_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🎮 play /pleɪ/ — 【v./n.】玩耍；打（球）；弹奏（乐器）；戏剧'],
  ['w', '核心意象纽带：投入地参与有规则或有节奏的活动'],
  ['w', '① 本义具象：v. 玩耍，进行（球类/棋类运动，不加 the）'],
  ['w', 'They play football after school.'],
  ['w', '② 意象桥梁：投入地参与有规则或有节奏的活动'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 弹奏，吹奏（西洋乐器，必须加 the）'],
  ['w', 'She can play the piano.'],
  ['w', '多义第3幕'],
  ['s', 'She can play the piano.', '🎹 第三幕【引申新义·演奏乐器与舞台剧】：引申为“演奏乐器”（play the piano）和舞台上的“话剧演出”（a play）！']
];
export default function build() { return autoBuild(SP, { title: '🎞️ play · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
