// 📘 G19 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g19.js 案例 1；对照清单 lab/INVENTORY_HD_G19_1_V5.md
// 角色关键帧：sprites/hdg19_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg19_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G19 底层原理'],
  ['w', '一般现在时第三人称单数（三单小尾巴 -s/-es） —— 不是你(you)、不是我(I)、而且只有1个他/她/它——动词必须戴上 -s 小勋章！'],
  ['w', '【英语为什么非要给三单动词加 -s？】复数主语名词自带了 -s（The boys like...），而单数第三人称主'],
  ['w', '🔬 助动词/情态动词『能量吸收器』与动词变形还原实验'],
  ['w', '🧲 强力能量磁铁'],
  ['w', 'did / does / can / will'],
  ['w', '吸走过去时与三单!'],
  ['w', '🌱 动词 100% 回原形'],
  ['w', 'went➔go ｜ likes➔like'],
  ['w', 'Did he go? Doesn\'t like'],
  ['w', '-ed/-s'],
  ['w', '🗣️ 语境实证：My father works in a hospital and goes to work by car.'],
  ['w', '🎵 口诀：不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！h'],
  ['w', 'G19 第1幕'],
  ['s', 'My father works in a hospital and goes to work by car.', '不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！have 变 has，辅音+y 变 ies，ch/sh/s/x/o 后加 es！does 一出场，动词回原形！']
];
export default function build() { return autoBuild(SP, { title: '📘 G19 底层原理', items: ITEMS, acts: ACTS }); }
