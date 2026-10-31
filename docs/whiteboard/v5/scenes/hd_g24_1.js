// 📘 G24 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g24.js 案例 1；对照清单 lab/INVENTORY_HD_G24_1_V5.md
// 角色关键帧：sprites/hdg24_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg24_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G24 底层原理'],
  ['w', '一般将来时：be going to + 动词原形 —— 表示心里已经想好的“计划、打算”，或眼看就要发生的迹象'],
  ['w', '【为什么 be going to 能表打算？】想象你已经走在路上（I am going to...），下一步自然就是'],
  ['w', '① 计划：早就想好'],
  ['p', '📅'],
  ['w', '心里已经决定、安排好了的事：We are going to have a picnic this Sunday.'],
  ['s', 'We are going to have a picnic this Sunday.', '这个星期天我们打算去野餐。'],
  ['w', '② 迹象：眼看要发生'],
  ['p', '🌧️'],
  ['w', '看到证据、马上要发生的事：Look at the black clouds! It is going to rain.'],
  ['s', 'Look at the black clouds! It is going to rain.', '看那些乌云！要下雨了。'],
  ['w', '对比 will：说话时临时决定用 will——The phone is ringing. I will get it.'],
  ['s', 'The phone is ringing. I will get it.', '电话响了，我去接。'],
  ['w', '常错：I going to... ✗（漏 be）；I will going to... ✗（will 和 be going to 二选一）'],
  ['w', '🗣️ 语境实证：Tomorrow is Saturday. I am going to visit my grandparents.'],
  ['w', '🎵 口诀：be going to 表打算，计划安排早做好；be 随主语变 am/is/are，to'],
  ['w', 'G24 第1幕'],
  ['s', 'Tomorrow is Saturday. I am going to visit my grandparents.', 'be going to 表打算，计划安排早做好；be 随主语变 am/is/are，to 后永远接原形！']
];
export default function build() { return autoBuild(SP, { title: '📘 G24 底层原理', items: ITEMS, acts: ACTS }); }
