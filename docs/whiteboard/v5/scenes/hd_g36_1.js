// 📘 G36 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g36.js 案例 1；对照清单 lab/INVENTORY_HD_G36_1_V5.md
// 角色关键帧：sprites/hdg36_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg36_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G36 底层原理'],
  ['w', 'There be 与 have/has 的“有”字双轨分流 —— 汉语都说“有”，英语绝不混：客观空间存在用 There be，主人拥有归属用 have/has！'],
  ['w', '【为什么绝对不能写出 There have / There has？】空间里客观存在某物用 There is/are；'],
  ['w', '某人拥有某物用 主语 + have/has。写成 There have 就把两条铁轨撞车了！'],
  ['w', '🔬 汉语一个『有』字 ➔ 英语『客观存在 There be vs 主观拥有 have/has』双轨实验'],
  ['w', '🔭 轨道 A【客观空间存在】：There is / are + 某物 + 某地'],
  ['w', '例：There is a book and two pens on the desk. (就近原则只看第一个词 a book!)'],
  ['w', '🎒 轨道 B【主人归属拥有】：某人(I/He) + have / has + 某物'],
  ['w', '🚫 铁律：两条铁轨绝不交叉，全宇宙没有 There have / There has 这种写法！'],
  ['w', 'G36 第1幕'],
  ['s', '【客观空间存在】There is a big garden in front of our house.', '我们房子前面有一个大花园。'],
  ['n', '🎵 口诀：汉语一个“有”，英语分两路：某地存在用 There be，某人拥有用 have/has；两条铁轨不交叉，写出 There have 必扣分！']
];
export default function build() { return autoBuild(SP, { title: '📘 G36 底层原理', items: ITEMS, acts: ACTS }); }
