// 📘 G10 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g10.js 案例 1；对照清单 lab/INVENTORY_HD_G10_1_V5.md
// 角色关键帧：sprites/hdg10_1.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg10_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G10 底层原理'],
  ['w', '不定代词 some 与 any 的地盘分工 —— some 住肯定句和热情邀请屋；any 住否定句和普通疑问屋！'],
  ['w', '【为什么疑问句和否定句要把 some 换成 any？】some 默认“肯定有这么一些”；而在疑问或否定句里换上表示“'],
  ['w', '🔬 some / any 的共同本领：都表示「一些」'],
  ['w', '后面能接可数名词复数：some storybooks'],
  ['w', '也能接不可数名词：some milk'],
  ['s', 'I have some storybooks and some milk.', '我有一些故事书和一些牛奶。'],
  ['w', '换成否定也一样：I don\'t have any crayons.'],
  ['w', 'G10 第1幕'],
  ['n', '🎵 口诀：some 和 any 都表“一些”，可数复数不可数都能接；肯定句里用 some，否定疑问换 any；唯有邀请和请求（Would you like / Can I have），满怀诚意还用 some！']
];
export default function build() { return autoBuild(SP, { title: '📘 G10 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
