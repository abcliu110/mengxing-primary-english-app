// 📘 G09 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g09.js 案例 1；对照清单 lab/INVENTORY_HD_G09_1_V5.md
// 角色关键帧：sprites/hdg09_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg09_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G09 底层原理'],
  ['w', '指示代词四兄妹 (this / that / these / those) —— 近处单数 this、远处单数 that；近处复数 these、远处复数 those！'],
  ['w', '【为什么指示词也要分单复数？】英语讲究“数的一致”：指着 1 个苹果说 this is an apple，指着一堆苹'],
  ['w', '🔬 深度机制 1：为什么『我/他』在动词前后要换衣服？（主格 vs 宾格）'],
  ['w', '👑 句首主语区'],
  ['w', 'I / he / she / they'],
  ['w', '(动作发起人穿主格)'],
  ['w', '⚡ 动词/介词转换门'],
  ['w', 'help / give / to / with'],
  ['w', '穿过此门强制换宾格!'],
  ['w', '🎯 动介后宾语区'],
  ['w', 'me / him / her / them'],
  ['w', '(承受动作穿宾格)'],
  ['w', '主格 He'],
  ['w', '变宾格 him!'],
  ['w', 'G09 第1幕'],
  ['s', 'This is a red apple here, and that is a pear over there.', '近指单数 this is，远指单数 that is；近指复数 these are，远指复数 those are；问句 This/That 回答用 it，问句 These/Those 回答用 they！']
];
export default function build() { return autoBuild(SP, { title: '📘 G09 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
