// 📘 G10 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g10.js 案例 3；对照清单 lab/INVENTORY_HD_G10_3_V5.md
// 角色关键帧：sprites/hdg10_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg10_3.js';
const ACTS = {"*": ["l_read", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G10 底层原理'],
  ['w', '不定代词 some 与 any 的地盘分工 —— some 住肯定句和热情邀请屋；any 住否定句和普通疑问屋！'],
  ['w', '【为什么疑问句和否定句要把 some 换成 any？】some 默认“肯定有这么一些”；而在疑问或否定句里换上表示“'],
  ['w', '🔬 深度机制 3：指示代词『距离远近 × 单复数』空间雷达四宫格'],
  ['w', '👉 近处 + 单数(1个)'],
  ['w', 'this is 🍎'],
  ['w', '👉 近处 + 复数(多个)'],
  ['w', 'these are 🍎🍎'],
  ['w', '🔭 远处 + 单数(1个)'],
  ['w', 'that is 🐦'],
  ['w', '🔭 远处 + 复数(多个)'],
  ['w', 'those are 🐦🐦'],
  ['w', 'G10 第3幕'],
  ['s', 'I have some storybooks and some milk.', 'some 和 any 都表“一些”，可数复数不可数都能接；肯定句里用 some，否定疑问换 any；唯有邀请和请求（Would you like / Can I have），满怀诚意还用 some！']
];
export default function build() { return autoBuild(SP, { title: '📘 G10 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
