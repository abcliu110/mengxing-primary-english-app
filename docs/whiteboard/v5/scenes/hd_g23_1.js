// 📘 G23 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g23.js 案例 1；对照清单 lab/INVENTORY_HD_G23_1_V5.md
// 角色关键帧：sprites/hdg23_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg23_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G23 底层原理'],
  ['w', '一般过去时否定与疑问（did 能量吸收器） —— 只要助动词 did / didn\'t 一出场，后面的过去式动词立刻还原成原形！'],
  ['w', '【为什么 didn\'t 后面必须变回 go？】助动词 `did` 像一块强力海绵把整句话的“过去时能量”全部吸光了，'],
  ['w', '🔬 助动词/情态动词『能量吸收器』与动词变形还原实验'],
  ['w', '🧲 强力能量磁铁'],
  ['w', 'did / does / can / will'],
  ['w', '吸走过去时与三单!'],
  ['w', '🌱 动词 100% 回原形'],
  ['w', 'went➔go ｜ likes➔like'],
  ['w', 'Did he go? Doesn\'t like'],
  ['w', '-ed/-s'],
  ['w', '🗣️ 语境实证：I went to the park yesterday, but I didn\'t go to the zoo.'],
  ['w', '🎵 口诀：过去否定与疑问，请出帮手 did 大人；did 和 didn\'t 一现身，过去能量全吸尽'],
  ['w', 'G23 第1幕'],
  ['s', 'I went to the park yesterday, but I didn\'t go to the zoo.', '过去否定与疑问，请出帮手 did 大人；did 和 didn\'t 一现身，过去能量全吸尽，后面动词秒回原形（Did you go? / I didn\'t go）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G23 底层原理', items: ITEMS, acts: ACTS }); }
