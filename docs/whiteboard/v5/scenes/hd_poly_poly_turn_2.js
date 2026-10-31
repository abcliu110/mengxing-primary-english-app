// 🎞️ turn · 一词多义第2幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_poly_turn.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_POLY_TURN_2_V5.md
// 角色关键帧：sprites/hdppolyturn_2.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdppolyturn_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🔄 turn /tɜːrn/ — 【v./n.】转弯，转动；变成（颜色/天气变化） / （轮到的）顺序，机会（take turns 轮流）'],
  ['w', '核心意象纽带：旋转改变方向与轮流交替'],
  ['w', '① 本义具象：v. 转弯，转动；变成（颜色/天气变化）'],
  ['w', 'Leaves turn yellow in autumn.'],
  ['w', '② 意象桥梁：旋转改变方向与轮流交替'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. （轮到的）顺序，机会（take turns 轮流）'],
  ['w', 'It\'s your turn to read now.'],
  ['w', '多义第2幕'],
  ['s', 'Leaves turn yellow in autumn.', '🔄 第二幕【场景变形·圆圈轮盘转到谁就是谁】：大家围成一圈做游戏，旋转箭头依次指向每个人。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ turn · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
