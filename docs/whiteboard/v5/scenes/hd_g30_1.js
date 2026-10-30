// 📘 G30 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g30.js 案例 1；对照清单 lab/INVENTORY_HD_G30_1_V5.md
// 角色关键帧：sprites/hdg30_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg30_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G30 底层原理'],
  ['w', '一般疑问句与“怎问怎答”铁律 —— 用 Yes / No 回答的问句：谁打头提问，就用谁收尾回答！'],
  ['w', '【英语一般疑问句为什么要把助动词/be动词提到最前面？】英语采用**“句首信号灯倒装法”**——一开口先把 `Is'],
  ['w', '🔬 助动词/情态动词『能量吸收器』与动词变形还原实验'],
  ['w', '🧲 强力能量磁铁'],
  ['w', 'did / does / can / will'],
  ['w', '吸走过去时与三单!'],
  ['w', '🌱 动词 100% 回原形'],
  ['w', 'went➔go ｜ likes➔like'],
  ['w', 'Did he go? Doesn\'t like'],
  ['w', '-ed/-s'],
  ['w', '🗣️ 语境实证：— Are you from China? — Yes, I am.'],
  ['w', '🎵 口诀：一般疑问不用“吗”，句首信号提前挂：有 be 提 be，有 can 提 can，实义动词'],
  ['w', 'G30 第1幕'],
  ['s', '— Are you from China? — Yes, I am.', '一般疑问不用“吗”，句首信号提前挂：有 be 提 be，有 can 提 can，实义动词借 Do/Does/Did 站排头！一二人称要互换，谁问就用谁回答！']
];
export default function build() { return autoBuild(SP, { title: '📘 G30 底层原理', items: ITEMS, acts: ACTS }); }
