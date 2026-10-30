// 📘 G09 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g09.js 案例 3；对照清单 lab/INVENTORY_HD_G09_3_V5.md
// 角色关键帧：sprites/hdg09_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg09_3.js';
const ACTS = {"*": ["l_read", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G09 底层原理'],
  ['w', '指示代词四兄妹 (this / that / these / those) —— 近处单数 this、远处单数 that；近处复数 these、远处复数 those！'],
  ['w', '【为什么指示词也要分单复数？】英语讲究“数的一致”：指着 1 个苹果说 this is an apple，指着一堆苹'],
  ['w', '🔬 深度机制 3：指示代词『距离远近 × 单复数』空间雷达四宫格'],
  ['w', '👉 近处 + 单数(1个)'],
  ['w', 'this is 🍎'],
  ['w', '👉 近处 + 复数(多个)'],
  ['w', 'these are 🍎🍎'],
  ['w', '🔭 远处 + 单数(1个)'],
  ['w', 'that is 🐦'],
  ['w', '🔭 远处 + 复数(多个)'],
  ['w', 'those are 🐦🐦'],
  ['w', 'G09 第3幕'],
  ['s', 'This is a red apple here, and that is a pear over there.', '近指单数 this is，远指单数 that is；近指复数 these are，远指复数 those are；问句 This/That 回答用 it，问句 These/Those 回答用 they！']
];
export default function build() { return autoBuild(SP, { title: '📘 G09 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
