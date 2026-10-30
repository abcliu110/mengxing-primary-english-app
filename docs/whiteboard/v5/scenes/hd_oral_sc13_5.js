// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · Time for bed! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc13.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC13_5_V5.md
// 角色关键帧：sprites/hdo13_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo13_5.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"]};
const ITEMS = [
  ['w', '时间与日期'],
  ['w', '核心交际句：Time for bed! （该睡觉啦！）'],
  ['w', '💡 交际得体度与母语负迁移提示：催促睡觉。'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：It\'s nine o\'clock. Time for bed!'],
  ['w', '九点啦，该睡觉了！'],
  ['s', 'It\'s nine o\'clock. Time for bed!', '九点啦，该睡觉了！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：OK, Mum. Good night!'],
  ['w', '好的妈妈，晚安！'],
  ['s', 'OK, Mum. Good night!', '好的妈妈，晚安！'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：Sweet dreams!'],
  ['w', '好梦！'],
  ['s', 'Sweet dreams!', '好梦！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · Time for bed!', items: ITEMS, acts: ACTS }); }
