// 📘 G37 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g37.js 案例 1；对照清单 lab/INVENTORY_HD_G37_1_V5.md
// 角色关键帧：sprites/hdg37_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg37_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G37 底层原理'],
  ['w', '同级比较：as + 原级 + as（和……一样） —— 两个事物旗鼓相当：两个 as 夹心饼干中间永远放形容词或副词的“原级”！'],
  ['w', '【为什么 as...as 中间只能放原级 tall？】既然两人一样高，没有谁比谁更突出，中间自然用不带任何变形的**'],
  ['w', '🔬 G37 · 同级比较：as + 原级 + as（和……一样） 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：Tom is 150 cm. Jim is 150 cm too. Tom is as ta'],
  ['w', '汤姆和吉姆一样高。他跑得和马一样快！今天不如昨天暖和。'],
  ['w', '② 核心结构规律：① 肯定同级：`A + be/V + as + 原级 + as + B`'],
  ['w', '③ 进阶要点：② 否定同级：`A + be not / don\'t + as (或 so) + 原级'],
  ['w', 'G37 第1幕'],
  ['s', 'Tom is 150 cm. Jim is 150 cm too. Tom is as tall as Jim.', '两者相比一般高，as...as 架小桥；两个 as 夹中间，形容词副词用原级（as tall as）；若是前者不如后，not as (或 so)...as 记心间！']
];
export default function build() { return autoBuild(SP, { title: '📘 G37 底层原理', items: ITEMS, acts: ACTS }); }
