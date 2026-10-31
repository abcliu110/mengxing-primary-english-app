// 🎞️ watch · 一词多义第3幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_poly_watch.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_POLY_WATCH_3_V5.md
// 角色关键帧：sprites/hdppolywatch_3.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdppolywatch_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
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
  ['w', '多义第3幕'],
  ['s', 'My father has a new watch.', '⌚ 第三幕【引申新义·手表】：watch 从动词“观看”引申为名词“手表”（a nice watch）！']
];
export default function build() { return polyBuild(SP, { title: '🎞️ watch · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
