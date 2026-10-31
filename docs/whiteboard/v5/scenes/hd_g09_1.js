// 📘 G09 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g09.js 案例 1；对照清单 lab/INVENTORY_HD_G09_1_V5.md
// 角色关键帧：sprites/hdg09_1.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg09_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G09 底层原理'],
  ['w', '指示代词四兄妹 (this / that / these / those) —— 近处单数 this、远处单数 that；近处复数 these、远处复数 those！'],
  ['w', '【为什么指示词也要分单复数？】英语讲究“数的一致”：指着 1 个苹果说 this is an apple，指着一堆苹'],
  ['w', '🔬 问答替换：答句换成 it / they'],
  ['w', 'Is this / that ...? → Yes, it is. / No, it isn\'t.'],
  ['w', 'Are these / those ...? → Yes, they are. / No, they aren\'t.'],
  ['w', '例：— What are those? — They are sheep.'],
  ['s', 'What are those? They are sheep.', '那些是什么？它们是绵羊。'],
  ['w', '例：— Are those tomatoes over there? — Yes, they are.'],
  ['s', 'Are those tomatoes over there? Yes, they are.', '那边那些是西红柿吗？是的。'],
  ['w', 'G09 第1幕'],
  ['n', '🎵 口诀：近指单数 this is，远指单数 that is；近指复数 these are，远指复数 those are；问句 This/That 回答用 it，问句 These/Those 回答用 they！']
];
export default function build() { return autoBuild(SP, { title: '📘 G09 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
