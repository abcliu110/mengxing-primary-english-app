// 🎞️ right · 一词多义第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g3_0600.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G3_0600_1_V5.md
// 角色关键帧：sprites/hdpg30600_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg30600_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '➡️ right /right/ — 【adj./adv./n.】右边的；正确的；正好'],
  ['w', '核心意象纽带：笔直不偏斜（右手边/正确无误/权利）'],
  ['w', '① 本义具象：adj./n./adv. 右边的，向右（大多数人强壮灵巧的右手侧）'],
  ['w', 'Turn right at the library.'],
  ['w', '② 意象桥梁：笔直不偏斜（右手边/正确无误/权利）'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：adj. 正确的，对的（不偏不倚正中靶心）'],
  ['w', 'Your answer is right!'],
  ['w', '多义第1幕'],
  ['s', 'Turn right at the library.', '👉 第一幕【核心本义·右手方向】：举起写字灵巧的右手，指向右边（on the right）。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ right · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
