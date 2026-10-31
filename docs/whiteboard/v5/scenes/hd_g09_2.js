// 📘 G09 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g09.js 案例 2；对照清单 lab/INVENTORY_HD_G09_2_V5.md
// 角色关键帧：sprites/hdg09_2.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg09_2.js';
const ACTS = {"*": ["l_pen", "l_idea0", "l_speak"]};
const ITEMS = [
  ['w', 'G09 底层原理'],
  ['w', '指示代词四兄妹 (this / that / these / those) —— 近处单数 this、远处单数 that；近处复数 these、远处复数 those！'],
  ['w', '【为什么指示词也要分单复数？】'],
  ['w', '英语讲究“数的一致”：指着 1 个苹果说 this is an apple，指着一堆苹果必须同步把指示词和系动词都变成复数 these are apples！'],
  ['w', '🔬 打电话：This is ...（我是…）；Is that ...?（你是…吗？）'],
  ['w', '例：Hello! This is Wu Binbin speaking. Is that Mike?'],
  ['s', 'Hello! This is Wu Binbin speaking. Is that Mike?', '你好！我是吴斌斌。你是迈克吗？'],
  ['w', '数的一致：this / that 配 is + 单数；these / those 配 are + 复数'],
  ['w', '常错：These flower is very beautiful. ✗ → These flowers are very beautiful. ✓'],
  ['s', 'These flowers are very beautiful.', '这些花非常漂亮。'],
  ['w', 'G09 第2幕'],
  ['n', '🎵 口诀：近指单数 this is，远指单数 that is；近指复数 these are，远指复数 those are；问句 This/That 回答用 it，问句 These/Those 回答用 they！']
];
export default function build() { return autoBuild(SP, { title: '📘 G09 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
