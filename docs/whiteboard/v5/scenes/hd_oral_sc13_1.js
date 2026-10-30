// 💬 日常用语 · 时间与日期 · Time to get up! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc13.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC13_1_V5.md
// 角色关键帧：sprites/hdo13_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo13_1.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"]};
const ITEMS = [
  ['w', '时间与日期'],
  ['w', '核心交际句：Time to get up! （该起床啦！（早晨叫醒必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 早晨作息三部曲：wake up (醒来) ➔ get up (起床) ➔ wash my face (洗脸)'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Wake up, Sam! It\'s 7 o\'clock. Time to get up!'],
  ['w', '醒醒，山姆！七点钟啦，该起床了！'],
  ['s', 'Wake up, Sam! It\'s 7 o\'clock. Time to get up!', '醒醒，山姆！七点钟啦，该起床了！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：OK, Mum! I\'m getting up right now.'],
  ['w', '好的，妈妈！我马上就起来。'],
  ['s', 'OK, Mum! I\'m getting up right now.', '好的，妈妈！我马上就起来。'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：OK. I see.'],
  ['w', '好的，我知道了。'],
  ['s', 'OK. I see.', '好的，我知道了。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 时间与日期 · Time to get up!', items: ITEMS, acts: ACTS }); }
