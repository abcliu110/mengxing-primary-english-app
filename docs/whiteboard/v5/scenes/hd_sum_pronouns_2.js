// 📊 代词全局原理 · 第2幕 my + book = mine 吞噬合体 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_pronouns.js 案例 2；对照清单 lab/INVENTORY_HD_SUM_PRONOUNS_2_V5.md
// 角色关键帧：sprites/hdspro2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdspro2.js';
const ACTS = {"*": ["l_books", "tom_book", "l_pen"]};
const ITEMS = [
  ['w', '代词全局原理'],
  ['w', '代词随句法位置变格：主语用主格(I/he)，动介后用宾格(me/him)，形物+名词=名物(my book=mine)'],
  ['w', '看中央实验台：直观演示主宾格过门换装与 my+book 吞噬合体为 mine！'],
  ['w', '🔬 深度机制 2：『形物代 + 名词 = 名词性物主代词』吞噬合体实验'],
  ['w', '💎 mine / hers (名物代词)'],
  ['w', '已把 book 吞进肚里，后面绝不再接名词！'],
  ['w', '📐 黄金等式：my + book = mine ｜ your + pen = yours ｜ her + bag = hers'],
  ['w', '做题口诀：空格后有名词选 my/your/her；空格后无名词选 mine/yours/hers！'],
  ['w', 'my / her (形物)'],
  ['w', '带钩子，必接名词'],
  ['w', '➕'],
  ['w', '📘 book (名词)'],
  ['w', '代词第2幕'],
  ['s', 'I like my book. Give it to me. This book is mine!', '主格站句首，宾格站动介后；形容词性物主代词必须带名词，名词性物主代词独立顶包！']
];
export default function build() { return autoBuild(SP, { title: '📊 代词全局原理 · 第2幕 my + book = mine 吞噬合体', items: ITEMS, acts: ACTS }); }
