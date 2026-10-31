// 🎞️ play · 一词多义第1幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_0489.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G2_0489_1_V5.md
// 角色关键帧：sprites/hdpg20489_1.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg20489_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
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
  ['w', '多义第1幕'],
  ['s', 'They play football after school.', '⚽ 第一幕【核心本义·快乐玩耍与竞技】：孩子们在草地上欢快地踢球奔跑（play football）。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ play · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
