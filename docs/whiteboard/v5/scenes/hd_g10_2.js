// 📘 G10 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g10.js 案例 2；对照清单 lab/INVENTORY_HD_G10_2_V5.md
// 角色关键帧：sprites/hdg10_2.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg10_2.js';
const ACTS = {"*": ["l_pen", "l_idea0", "l_speak"]};
const ITEMS = [
  ['w', 'G10 底层原理'],
  ['w', '不定代词 some 与 any 的地盘分工 —— some 住肯定句和热情邀请屋；any 住否定句和普通疑问屋！'],
  ['w', '【为什么疑问句和否定句要把 some 换成 any？】some 默认“肯定有这么一些”；而在疑问或否定句里换上表示“'],
  ['w', '🔬 常规分工：肯定句用 some；否定句和一般疑问句用 any'],
  ['w', '肯定：I have some storybooks.'],
  ['w', '否定：I don\'t have any crayons.'],
  ['w', '疑问：Do you have any?'],
  ['s', 'I don\'t have any crayons. Do you have any?', '我没有蜡笔。你有吗？'],
  ['w', '答句：— Do you have any comic books? — Yes, I have some.'],
  ['s', 'Do you have any comic books? Yes, I have some.', '你有漫画书吗？有，我有一些。'],
  ['w', 'G10 第2幕'],
  ['n', '🎵 口诀：some 和 any 都表“一些”，可数复数不可数都能接；肯定句里用 some，否定疑问换 any；唯有邀请和请求（Would you like / Can I have），满怀诚意还用 some！']
];
export default function build() { return autoBuild(SP, { title: '📘 G10 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
