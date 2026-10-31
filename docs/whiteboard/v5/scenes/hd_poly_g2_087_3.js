// 🎞️ run · 一词多义第3幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_087.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G2_087_3_V5.md
// 角色关键帧：sprites/hdpg2087_3.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg2087_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🏃 run /rʌn/ — 【v.】跑，奔跑'],
  ['w', '核心意象纽带：快速连续地向前流动或运转'],
  ['w', '① 本义具象：v. 跑，奔跑'],
  ['w', 'The boy can run very fast.'],
  ['w', '② 意象桥梁：快速连续地向前流动或运转'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 流淌（液体）；运转，经营'],
  ['w', 'The river runs into the sea.'],
  ['w', '多义第3幕'],
  ['s', 'The river runs into the sea.', '🌊 第三幕【引申新义·流淌/运转】：引申为河水“流淌”、鼻涕“流下（running nose）”或机器运转！']
];
export default function build() { return polyBuild(SP, { title: '🎞️ run · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
