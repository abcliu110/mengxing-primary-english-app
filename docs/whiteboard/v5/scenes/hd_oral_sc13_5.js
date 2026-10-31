// 💬 日常用语 · 时间与日期 · Time for bed! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc13.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC13_5_V5.md
// 角色关键帧：sprites/hdo13_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo13_5.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
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
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 时间与日期 · Time for bed!', items: ITEMS, acts: ACTS }); }
