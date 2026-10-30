// 📘 G17 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g17.js 案例 1；对照清单 lab/INVENTORY_HD_G17_1_V5.md
// 角色关键帧：sprites/hdg17_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg17_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G17 底层原理'],
  ['w', 'be 动词过去时双子星 (was / were) —— 坐上时光机回到过去：am/is 变成 was，are 变成 were！'],
  ['w', '【为什么昨天“在家”不能说 I am at home yesterday？】只要时间发生在过去（yesterday'],
  ['w', '🔬 G17 · be 动词过去时双子星 (was / were) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I was short two years ago, but now I am tall.'],
  ['w', '两年前我很矮，但现在我很高。昨天是星期日，天气晴朗。昨晚你在哪里？我们在电影院。'],
  ['w', '② 核心结构规律：① 变身对应：`am / is` ➔ `was`（否定 `wasn\'t`）；`are`'],
  ['w', '③ 进阶要点：② 过去时间标志词：`yesterday, last night/week/year,'],
  ['w', 'G17 第1幕'],
  ['s', 'I was short two years ago, but now I am tall.', '过去时间看标志（yesterday / last... / ...ago）；现在的 am 和 is 变身 was（含 s 对应单数），现在的 are 变身 were（含 re 对应复数）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G17 底层原理', items: ITEMS, acts: ACTS }); }
