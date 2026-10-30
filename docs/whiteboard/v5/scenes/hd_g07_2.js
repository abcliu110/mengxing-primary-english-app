// 📘 G07 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g07.js 案例 2；对照清单 lab/INVENTORY_HD_G07_2_V5.md
// 角色关键帧：sprites/hdg07_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg07_2.js';
const ACTS = {"*": ["l_pen", "l_idea0", "l_speak"]};
const ITEMS = [
  ['w', 'G07 底层原理'],
  ['w', '人称代词主格与宾格 (I vs me / he vs him) —— 动词前作主语用“主格”，动词和介词后面作宾语必须换“宾格”！'],
  ['w', '【为什么汉语都是“我”，英语却要分 I 和 me？】英语给代词穿上了“位置制服”：站在句首指挥动作的主人穿“主格礼服'],
  ['w', '🔬 深度机制 2：『形物代 + 名词 = 名词性物主代词』吞噬合体实验'],
  ['w', '💎 mine / hers (名物代词)'],
  ['w', '已把 book 吞进肚里，后面绝不再接名词！'],
  ['w', '📐 黄金等式：my + book = mine ｜ your + pen = yours ｜ her + bag = hers'],
  ['w', '做题口诀：空格后有名词选 my/your/her；空格后无名词选 mine/yours/hers！'],
  ['w', 'my / her (形物)'],
  ['w', '带钩子，必接名词'],
  ['w', '➕'],
  ['w', '📘 book (名词)'],
  ['w', 'G07 第2幕'],
  ['s', 'I like Miss White, and she likes me too.', '动前主格动后宾，介词后面也用宾！I变me，we变us，he变him，she变her，they变them要记准，只有you和it主宾长相不改变！']
];
export default function build() { return autoBuild(SP, { title: '📘 G07 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
