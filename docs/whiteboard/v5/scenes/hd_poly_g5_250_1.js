// 🎞️ clean · 一词多义第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g5_250.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G5_250_1_V5.md
// 角色关键帧：sprites/hdpg5250_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg5250_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '✨ clean /kliːn/ — 【v./adj.】打扫；干净的，整洁的'],
  ['w', '核心意象纽带：洁净无污垢的状态与去污动作'],
  ['w', '① 本义具象：adj. 干净的，整洁的'],
  ['w', 'Keep your hands clean.'],
  ['w', '② 意象桥梁：洁净无污垢的状态与去污动作'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 打扫，弄干净（使…变干净）'],
  ['w', 'We clean the classroom every day.'],
  ['w', '多义第1幕'],
  ['s', 'Keep your hands clean.', '✨ 第一幕【核心本义·干净的状态】：窗户擦得亮晶晶，房间非常干净（clean room）。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ clean · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
