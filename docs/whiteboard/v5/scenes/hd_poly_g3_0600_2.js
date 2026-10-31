// 🎞️ right · 一词多义第2幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g3_0600.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G3_0600_2_V5.md
// 角色关键帧：sprites/hdpg30600_2.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg30600_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '➡️ right /raɪt/ — 【adj./adv./n.】右边的；正确的；正好'],
  ['w', '核心意象纽带：笔直不偏斜（右手边/正确无误/权利）'],
  ['w', '① 本义具象：adj./n./adv. 右边的，向右（大多数人强壮灵巧的右手侧）'],
  ['w', 'Turn right at the library.'],
  ['w', '② 意象桥梁：笔直不偏斜（右手边/正确无误/权利）'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：adj. 正确的，对的（不偏不倚正中靶心）'],
  ['w', 'Your answer is right!'],
  ['w', '多义第2幕'],
  ['s', 'Turn right at the library.', '🔄 第二幕【场景变形·笔直命中目标】：古人认为右手行事稳准直，不偏斜就是准确无误。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ right · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
