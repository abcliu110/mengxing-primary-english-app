// 💬 日常用语 · 时间与日期 · What day is it today? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc13.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC13_3_V5.md
// 角色关键帧：sprites/hdo13_3.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo13_3.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '时间与日期'],
  ['w', '核心交际句：What day is it today? （今天是星期几？）'],
  ['w', '💡 交际得体度与母语负迁移提示：What day 问星期几。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：What day is it today?'],
  ['w', '今天是星期几？'],
  ['s', 'What day is it today?', '今天是星期几？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：It\'s Wednesday. We have PE today!'],
  ['w', '星期三，今天有体育课！'],
  ['s', 'It\'s Wednesday. We have PE today!', '星期三，今天有体育课！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Hooray!'],
  ['w', '太棒啦！'],
  ['s', 'Hooray!', '太棒啦！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 时间与日期 · What day is it today?', items: ITEMS, acts: ACTS }); }
