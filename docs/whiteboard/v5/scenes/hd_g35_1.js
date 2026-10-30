// 📘 G35 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g35.js 案例 1；对照清单 lab/INVENTORY_HD_G35_1_V5.md
// 角色关键帧：sprites/hdg35_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg35_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G35 底层原理'],
  ['w', 'There be 存现句与“就近原则” —— 表示“某处存在某物”——be 动词是个近视眼，谁紧挨着它就听谁的！'],
  ['w', '【为什么英语喜欢说 There is a book on the desk？】英语先用引导词 `There` 打头阵'],
  ['w', '🔬 汉语一个『有』字 ➔ 英语『客观存在 There be vs 主观拥有 have/has』双轨实验'],
  ['w', '🔭 轨道 A【客观空间存在】：There is / are + 某物 + 某地'],
  ['w', '例：There is a book and two pens on the desk. (就近原则只看第一个词 a book!)'],
  ['w', '🎒 轨道 B【主人归属拥有】：某人(I/He) + have / has + 某物'],
  ['w', '🚫 铁律：两条铁轨绝不交叉，全宇宙没有 There have / There has 这种写法！'],
  ['w', 'G35 第1幕'],
  ['s', 'There is a computer and two books on the desk.', 'There be 句型表存在，“某地有某物”记心怀；be 动词是个近视眼，只看身后第一个名：单数不可数用 is，复数紧挨就用 are！']
];
export default function build() { return autoBuild(SP, { title: '📘 G35 底层原理', items: ITEMS, acts: ACTS }); }
