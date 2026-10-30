// 📘 G07 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g07.js 案例 1；对照清单 lab/INVENTORY_HD_G07_1_V5.md
// 角色关键帧：sprites/hdg07_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg07_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G07 底层原理'],
  ['w', '人称代词主格与宾格 (I vs me / he vs him) —— 动词前作主语用“主格”，动词和介词后面作宾语必须换“宾格”！'],
  ['w', '【为什么汉语都是“我”，英语却要分 I 和 me？】英语给代词穿上了“位置制服”：站在句首指挥动作的主人穿“主格礼服'],
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
  ['w', 'G07 第1幕'],
  ['s', 'I like Miss White, and she likes me too.', '动前主格动后宾，介词后面也用宾！I变me，we变us，he变him，she变her，they变them要记准，只有you和it主宾长相不改变！']
];
export default function build() { return autoBuild(SP, { title: '📘 G07 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
