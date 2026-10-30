// 📘 G29 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g29.js 案例 1；对照清单 lab/INVENTORY_HD_G29_1_V5.md
// 角色关键帧：sprites/hdg29_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg29_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G29 底层原理'],
  ['w', '否定句变形双轨制（be/情态 vs 实义动词借 don\'t/doesn\'t/didn\'t） —— 有 be 或 can/will 直接加 not；只有实义动词必须请助动词帮忙！'],
  ['w', '【为什么绝对不能说 I am not like？】只有系动词和情态动词才能直接加 `not`；普通实义动词（like'],
  ['w', '🔬 助动词/情态动词『能量吸收器』与动词变形还原实验'],
  ['w', '🧲 强力能量磁铁'],
  ['w', 'did / does / can / will'],
  ['w', '吸走过去时与三单!'],
  ['w', '🌱 动词 100% 回原形'],
  ['w', 'went➔go ｜ likes➔like'],
  ['w', 'Did he go? Doesn\'t like'],
  ['w', '-ed/-s'],
  ['w', '🗣️ 语境实证：She isn\'t a doctor. He can\'t swim.'],
  ['w', '🎵 口诀：变否定分两路：句中有 be 或情态(can/will)，后面直接加上 not；若是只有实'],
  ['w', 'G29 第1幕'],
  ['s', 'She isn\'t a doctor. He can\'t swim.', '变否定分两路：句中有 be 或情态(can/will)，后面直接加上 not；若是只有实义动词，快请 don\'t / doesn\'t / didn\'t 来相助，后面动词回原形，还要把 some 变成 any！']
];
export default function build() { return autoBuild(SP, { title: '📘 G29 底层原理', items: ITEMS, acts: ACTS }); }
