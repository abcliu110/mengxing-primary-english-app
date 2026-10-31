// 📘 G25 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g25.js 案例 1；对照清单 lab/INVENTORY_HD_G25_1_V5.md
// 角色关键帧：sprites/hdg25_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg25_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G25 底层原理'],
  ['w', '一般将来时：will + 动词原形 —— 表示未来的意愿、承诺或必然到来的未来（无人称变化，统统用 will！）'],
  ['w', '【will 原来是什么意思？】will 本义是“意愿、决心”，演化成通用的将来时助动词“将会……”，不管主语是谁，永'],
  ['w', '🔬 will 的三种用法'],
  ['w', '预测：It will be sunny tomorrow.'],
  ['w', '临时决定：I\'m thirsty. I will get some water.'],
  ['w', '承诺：I will help you.'],
  ['s', 'It will be sunny tomorrow. I will help you.', '明天会是晴天。我会帮你。'],
  ['w', '公式：主语 + will + 动词原形（人称不变）；否定 won\'t = will not'],
  ['w', '🧲 will 后面动词回原形：He will go. ✓（He will goes ✗）'],
  ['w', '对比 be going to：早有计划、看到迹象 → be going to'],
  ['w', '🗣️ 语境实证：I will be twelve years old next month.'],
  ['w', '🎵 口诀：将来助动小 will，主语是谁它不管；后面紧接动词原形，否定缩写变成 won\'t (wi'],
  ['w', 'G25 第1幕'],
  ['s', 'I will be twelve years old next month.', '将来助动小 will，主语是谁它不管；后面紧接动词原形，否定缩写变成 won\'t (will not)！']
];
export default function build() { return autoBuild(SP, { title: '📘 G25 底层原理', items: ITEMS, acts: ACTS }); }
