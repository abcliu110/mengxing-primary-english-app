// 📘 G08 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g08.js 案例 2；对照清单 lab/INVENTORY_HD_G08_2_V5.md
// 角色关键帧：sprites/hdg08_2.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg08_2.js';
const ACTS = {"*": ["l_pen", "l_idea0", "l_speak"]};
const ITEMS = [
  ['w', 'G08 底层原理'],
  ['w', '形容词性物主代词 vs 名词性物主代词 (my vs mine) —— my 是“粘人精”（后面必带名词），mine 是“独行侠”（自带名词光环）！'],
  ['w', '【为什么有了 my 还要发明 mine？】为了避免啰嗦重复！当别人问 Whose book is this? 直接把'],
  ['w', '🔬 深度机制 2：『形物代 + 名词 = 名词性物主代词』吞噬合体实验'],
  ['w', '💎 mine / hers (名物代词)'],
  ['w', '已把 book 吞进肚里，后面绝不再接名词！'],
  ['w', '📐 黄金等式：my + book = mine ｜ your + pen = yours ｜ her + bag = hers'],
  ['w', '做题口诀：空格后有名词选 my/your/her；空格后无名词选 mine/yours/hers！'],
  ['w', 'my / her (形物)'],
  ['w', '带钩子，必接名词'],
  ['w', '➕'],
  ['w', '📘 book (名词)'],
  ['w', 'G08 第2幕'],
  ['s', 'This is my bag. That red one is yours (= your bag).', '这是我的包。那个红色的是你的（包）。'],
  ['n', '🎵 口诀：形物代(my/your/her/our/their)是粘人精，后面必须跟名词；名物代(mine/yours/hers/ours/theirs)是独行侠，句尾单干不带名！牢记公式：形物代 + 名词 = 名物代！']
];
export default function build() { return autoBuild(SP, { title: '📘 G08 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
