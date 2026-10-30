// 📘 G20 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g20.js 案例 1；对照清单 lab/INVENTORY_HD_G20_1_V5.md
// 角色关键帧：sprites/hdg20_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg20_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G20 底层原理'],
  ['w', '现在进行时 (am/is/are + V-ing) —— 此时此刻正在上演的动作大片——be 动词与 -ing 缺一不可！'],
  ['w', '【为什么不能只写 He running，非要写 He is running？】加上 -ing 后的动词（runnin'],
  ['w', '🔬 助动词/情态动词『能量吸收器』与动词变形还原实验'],
  ['w', '🧲 强力能量磁铁'],
  ['w', 'did / does / can / will'],
  ['w', '吸走过去时与三单!'],
  ['w', '🌱 动词 100% 回原形'],
  ['w', 'went➔go ｜ likes➔like'],
  ['w', 'Did he go? Doesn\'t like'],
  ['w', '-ed/-s'],
  ['w', '🗣️ 语境实证：Look! The bird is flying in the sky.'],
  ['w', '🎵 口诀：Look! Listen! 加 Now，现在进行正热闹；结构公式要记牢：be(am/is'],
  ['w', 'G20 第1幕'],
  ['s', 'Look! The bird is flying in the sky.', 'Look! Listen! 加 Now，现在进行正热闹；结构公式要记牢：be(am/is/are) 加动词 ing，缺了哪一个都报错！直接加、去e加(writing)、双写加(running/swimming)！']
];
export default function build() { return autoBuild(SP, { title: '📘 G20 底层原理', items: ITEMS, acts: ACTS }); }
