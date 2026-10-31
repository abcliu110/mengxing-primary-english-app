// 📘 G08 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g08.js 案例 3；对照清单 lab/INVENTORY_HD_G08_3_V5.md
// 角色关键帧：sprites/hdg08_3.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg08_3.js';
const ACTS = {"*": ["l_read", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G08 底层原理'],
  ['w', '形容词性物主代词 vs 名词性物主代词 (my vs mine) —— my 是“粘人精”（后面必带名词），mine 是“独行侠”（自带名词光环）！'],
  ['w', '【为什么有了 my 还要发明 mine？】为了避免啰嗦重复！'],
  ['w', '当别人问 Whose book is this? 直接把 my book 合体浓缩成一个词 mine（我的书），既简洁又有力！'],
  ['w', '🔬 做题秒杀：看空格后面有没有名词'],
  ['w', '有名词 → my / your / her / our / their'],
  ['w', '没名词 → mine / yours / hers / ours / theirs'],
  ['w', '例：Their dog is big, but ours is small and cute.'],
  ['s', 'Their dog is big, but ours is small and cute.', '他们的狗很大，我们的又小又可爱。'],
  ['w', '常错：This blue umbrella is my. ✗ → This blue umbrella is mine. ✓'],
  ['s', 'This blue umbrella is mine.', '这把蓝伞是我的。'],
  ['w', '例：Our classroom is on the first floor, and theirs is on the second floor.'],
  ['w', 'G08 第3幕'],
  ['n', '🎵 口诀：形物代(my/your/her/our/their)是粘人精，后面必须跟名词；名物代(mine/yours/hers/ours/theirs)是独行侠，句尾单干不带名！牢记公式：形物代 + 名词 = 名物代！']
];
export default function build() { return autoBuild(SP, { title: '📘 G08 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
