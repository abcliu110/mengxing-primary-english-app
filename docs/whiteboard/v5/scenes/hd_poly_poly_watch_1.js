// 🎞️ watch · 一词多义第1幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_poly_watch.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_POLY_WATCH_1_V5.md
// 角色关键帧：sprites/hdppolywatch_1.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdppolywatch_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🔄 watch /wɑːtʃ/ — 【v./n.】观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上随时“看”时间的工具）'],
  ['w', '核心意象纽带：持续专注地盯着看'],
  ['w', '① 本义具象：v. 观看，注视（电视、比赛等动态画面）'],
  ['w', 'We watch TV on Sunday.'],
  ['w', '② 意象桥梁：持续专注地盯着看'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. 手表（戴在手腕上随时“看”时间的工具）'],
  ['w', 'My father has a new watch.'],
  ['w', '多义第1幕'],
  ['s', 'We watch TV on Sunday.', '👀 第一幕【核心本义·专注注视】：小男孩目不转睛地盯着球场上的足球移动（watch a game）。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ watch · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
