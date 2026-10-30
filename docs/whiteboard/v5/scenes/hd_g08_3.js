// 📘 G08 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g08.js 案例 3；对照清单 lab/INVENTORY_HD_G08_3_V5.md
// 角色关键帧：sprites/hdg08_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg08_3.js';
const ACTS = {"*": ["l_read", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G08 底层原理'],
  ['w', '形容词性物主代词 vs 名词性物主代词 (my vs mine) —— my 是“粘人精”（后面必带名词），mine 是“独行侠”（自带名词光环）！'],
  ['w', '【为什么有了 my 还要发明 mine？】为了避免啰嗦重复！当别人问 Whose book is this? 直接把'],
  ['w', '🔬 深度机制 3：指示代词『距离远近 × 单复数』空间雷达四宫格'],
  ['w', '👉 近处 + 单数(1个)'],
  ['w', 'this is 🍎'],
  ['w', '👉 近处 + 复数(多个)'],
  ['w', 'these are 🍎🍎'],
  ['w', '🔭 远处 + 单数(1个)'],
  ['w', 'that is 🐦'],
  ['w', '🔭 远处 + 复数(多个)'],
  ['w', 'those are 🐦🐦'],
  ['w', 'G08 第3幕'],
  ['s', 'This is my bag. That red one is yours (= your bag).', '形物代(my/your/her/our/their)是粘人精，后面必须跟名词；名物代(mine/yours/hers/ours/theirs)是独行侠，句尾单干不带名！牢记公式：形物代 + 名词 = 名物代！']
];
export default function build() { return autoBuild(SP, { title: '📘 G08 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
