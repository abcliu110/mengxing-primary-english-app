// 📊 代词全局原理 · 第3幕 this / these / that / those 远近 × 单复数 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_pronouns.js 案例 3；对照清单 lab/INVENTORY_HD_SUM_PRONOUNS_3_V5.md
// 角色关键帧：sprites/hdspro3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdspro3.js';
const ACTS = {"*": ["m_berry", "bird_up", "l_point"]};
const ITEMS = [
  ['w', '代词全局原理'],
  ['w', '代词随句法位置变格：主语用主格(I/he)，动介后用宾格(me/him)，形物+名词=名物(my book=mine)'],
  ['w', '看中央实验台：直观演示主宾格过门换装与 my+book 吞噬合体为 mine！'],
  ['w', '🔬 深度机制 3：指示代词『距离远近 × 单复数』空间雷达四宫格'],
  ['w', '👉 近处 + 单数(1个)'],
  ['w', 'this is 🍎'],
  ['w', '👉 近处 + 复数(多个)'],
  ['w', 'these are 🍎🍎'],
  ['w', '🔭 远处 + 单数(1个)'],
  ['w', 'that is 🐦'],
  ['w', '🔭 远处 + 复数(多个)'],
  ['w', 'those are 🐦🐦'],
  ['w', '代词第3幕'],
  ['s', 'I like my book. Give it to me. This book is mine!', '主格站句首，宾格站动介后；形容词性物主代词必须带名词，名词性物主代词独立顶包！']
];
export default function build() { return autoBuild(SP, { title: '📊 代词全局原理 · 第3幕 this / these / that / those 远近 × 单复数', items: ITEMS, acts: ACTS }); }
