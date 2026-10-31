// 📘 G10 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g10.js 案例 3；对照清单 lab/INVENTORY_HD_G10_3_V5.md
// 角色关键帧：sprites/hdg10_3.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg10_3.js';
const ACTS = {"*": ["l_read", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G10 底层原理'],
  ['w', '不定代词 some 与 any 的地盘分工 —— some 住肯定句和热情邀请屋；any 住否定句和普通疑问屋！'],
  ['w', '【为什么疑问句和否定句要把 some 换成 any？】some 默认“肯定有这么一些”；而在疑问或否定句里换上表示“任何一点”的 any！'],
  ['w', '但如果你端着蛋糕热情邀请别人 Would you like some cake?，你真心希望对方说 Yes，所以保留 some！'],
  ['w', '🔬 黄金特例：邀请、请求的问句仍用 some（盼着对方说 Yes）'],
  ['w', '邀请：Would you like some juice?'],
  ['w', '请求：Can I have some bread, please?'],
  ['s', 'Would you like some juice? Can I have some bread, please?', '你想喝点果汁吗？请问我能吃点面包吗？'],
  ['w', '常错：Can I have any water, Mum? ✗ → Can I have some water, Mum? ✓'],
  ['w', '对比：There isn\'t any milk in the fridge. Would you like some tea instead?'],
  ['s', 'There isn\'t any milk in the fridge. Would you like some tea instead?', '冰箱里没有牛奶了。你想喝点茶吗？'],
  ['w', 'G10 第3幕'],
  ['n', '🎵 口诀：some 和 any 都表“一些”，可数复数不可数都能接；肯定句里用 some，否定疑问换 any；唯有邀请和请求（Would you like / Can I have），满怀诚意还用 some！']
];
export default function build() { return autoBuild(SP, { title: '📘 G10 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
