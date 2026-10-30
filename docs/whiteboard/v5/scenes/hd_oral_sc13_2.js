// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · What time is it now? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc13.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC13_2_V5.md
// 角色关键帧：sprites/hdo13_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo13_2.js';
const ACTS = {"*": ["m_tv", "l_put", "l_speak"]};
const ITEMS = [
  ['w', '时间与日期'],
  ['w', '核心交际句：What time is it now? （现在几点了？）'],
  ['w', '💡 交际得体度与母语负迁移提示：询问具体时刻。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Excuse me, what time is it now?'],
  ['w', '请问现在几点了？'],
  ['s', 'Excuse me, what time is it now?', '请问现在几点了？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：It\'s four thirty. Time to go home!'],
  ['w', '四点半了，该回家啦！'],
  ['s', 'It\'s four thirty. Time to go home!', '四点半了，该回家啦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Let\'s go!'],
  ['w', '走吧！'],
  ['s', 'Let\'s go!', '走吧！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · What time is it now?', items: ITEMS, acts: ACTS }); }
