// 🎞️ run · 一词多义第2幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_087.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G2_087_2_V5.md
// 角色关键帧：sprites/hdpg2087_2.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg2087_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
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
  ['w', '多义第2幕'],
  ['s', 'The boy can run very fast.', '🔄 第二幕【场景变形·水流与机器像人一样奔跑】：奔跑的脚步化作永不停歇向前流淌的河水。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ run · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
