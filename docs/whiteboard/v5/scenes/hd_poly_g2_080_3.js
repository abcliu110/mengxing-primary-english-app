// 🎞️ park · 一词多义第3幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_080.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G2_080_3_V5.md
// 角色关键帧：sprites/hdpg2080_3.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg2080_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🏞️ park /pɑːrk/ — 【n.】公园'],
  ['w', '核心意象纽带：圈出来供人停留休憩或停放车辆的场地'],
  ['w', '① 本义具象：n. 公园'],
  ['w', 'Let\'s fly a kite in the park.'],
  ['w', '② 意象桥梁：圈出来供人停留休憩或停放车辆的场地'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 停车，泊车（把车停靠在车位里）'],
  ['w', 'Don\'t park your car here.'],
  ['w', '多义第3幕'],
  ['s', 'Don\'t park your car here.', '🅿️ 第三幕【引申新义·停车】：park 作动词表示“把车停放在指定区域（No Parking 禁止停车）”！']
];
export default function build() { return polyBuild(SP, { title: '🎞️ park · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
