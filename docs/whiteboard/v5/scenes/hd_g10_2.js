// 📘 G10 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g10.js 案例 2；对照清单 lab/INVENTORY_HD_G10_2_V5.md
// 角色关键帧：sprites/hdg10_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg10_2.js';
const ACTS = {"*": ["l_pen", "l_idea0", "l_speak"]};
const ITEMS = [
  ['w', 'G10 底层原理'],
  ['w', '不定代词 some 与 any 的地盘分工 —— some 住肯定句和热情邀请屋；any 住否定句和普通疑问屋！'],
  ['w', '【为什么疑问句和否定句要把 some 换成 any？】some 默认“肯定有这么一些”；而在疑问或否定句里换上表示“'],
  ['w', '🔬 深度机制 2：『形物代 + 名词 = 名词性物主代词』吞噬合体实验'],
  ['w', '💎 mine / hers (名物代词)'],
  ['w', '已把 book 吞进肚里，后面绝不再接名词！'],
  ['w', '📐 黄金等式：my + book = mine ｜ your + pen = yours ｜ her + bag = hers'],
  ['w', '做题口诀：空格后有名词选 my/your/her；空格后无名词选 mine/yours/hers！'],
  ['w', 'my / her (形物)'],
  ['w', '带钩子，必接名词'],
  ['w', '➕'],
  ['w', '📘 book (名词)'],
  ['w', 'G10 第2幕'],
  ['s', 'I have some storybooks and some milk.', 'some 和 any 都表“一些”，可数复数不可数都能接；肯定句里用 some，否定疑问换 any；唯有邀请和请求（Would you like / Can I have），满怀诚意还用 some！']
];
export default function build() { return autoBuild(SP, { title: '📘 G10 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
