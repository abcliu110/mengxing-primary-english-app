// 🎞️ run · 一词多义第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_087.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G2_087_1_V5.md
// 角色关键帧：sprites/hdpg2087_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg2087_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
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
  ['w', '多义第1幕'],
  ['s', 'The boy can run very fast.', '🏃 第一幕【核心本义·迈腿奔跑】：运动员在操场跑道上大步飞奔（run fast）。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ run · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
