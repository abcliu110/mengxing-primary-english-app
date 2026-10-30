// 📘 G09 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g09.js 案例 2；对照清单 lab/INVENTORY_HD_G09_2_V5.md
// 角色关键帧：sprites/hdg09_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg09_2.js';
const ACTS = {"*": ["l_pen", "l_idea0", "l_speak"]};
const ITEMS = [
  ['w', 'G09 底层原理'],
  ['w', '指示代词四兄妹 (this / that / these / those) —— 近处单数 this、远处单数 that；近处复数 these、远处复数 those！'],
  ['w', '【为什么指示词也要分单复数？】英语讲究“数的一致”：指着 1 个苹果说 this is an apple，指着一堆苹'],
  ['w', '🔬 深度机制 2：『形物代 + 名词 = 名词性物主代词』吞噬合体实验'],
  ['w', '💎 mine / hers (名物代词)'],
  ['w', '已把 book 吞进肚里，后面绝不再接名词！'],
  ['w', '📐 黄金等式：my + book = mine ｜ your + pen = yours ｜ her + bag = hers'],
  ['w', '做题口诀：空格后有名词选 my/your/her；空格后无名词选 mine/yours/hers！'],
  ['w', 'my / her (形物)'],
  ['w', '带钩子，必接名词'],
  ['w', '➕'],
  ['w', '📘 book (名词)'],
  ['w', 'G09 第2幕'],
  ['s', 'This is a red apple here, and that is a pear over there.', '近指单数 this is，远指单数 that is；近指复数 these are，远指复数 those are；问句 This/That 回答用 it，问句 These/Those 回答用 they！']
];
export default function build() { return autoBuild(SP, { title: '📘 G09 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
