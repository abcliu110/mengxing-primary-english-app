// 🎞️ book · 一词多义第3幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g1_002.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G1_002_3_V5.md
// 角色关键帧：sprites/hdpg1002_3.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg1002_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '📖 book /bʊk/ — 【n.】书，书本'],
  ['w', '核心意象纽带：把信息装订/登记在册子里'],
  ['w', '① 本义具象：n. 书，书本'],
  ['w', 'I read an interesting book.'],
  ['w', '② 意象桥梁：把信息装订/登记在册子里'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 预订，预约（把名字写进登记册里留座）'],
  ['w', 'Let\'s book a ticket online.'],
  ['w', '多义第3幕'],
  ['s', 'Let\'s book a ticket online.', '🎫 第三幕【引申新义·预订】：book 由名词“书/册子”转类为动词“预订（车票、房间、座位）”！']
];
export default function build() { return polyBuild(SP, { title: '🎞️ book · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
