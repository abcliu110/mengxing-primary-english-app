// 💬 日常用语 · 时间与日期 · What's the date today? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc13.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC13_4_V5.md
// 角色关键帧：sprites/hdo13_4.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo13_4.js';
const ACTS = {"*": ["m_tv", "l_put", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '时间与日期'],
  ['w', '核心交际句：What\'s the date today? （今天是几月几号？）'],
  ['w', '💡 交际得体度与母语负迁移提示：What\'s the date 问几月几号。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：What\'s the date today?'],
  ['w', '今天是几月几号？'],
  ['s', 'What\'s the date today?', '今天是几月几号？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：It\'s September 10th—Teachers\' Day!'],
  ['w', '九月十日教师节！'],
  ['s', 'It\'s September 10th—Teachers\' Day!', '九月十日教师节！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Let\'s thank our teachers!'],
  ['w', '去感谢老师吧！'],
  ['s', 'Let\'s thank our teachers!', '去感谢老师吧！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 时间与日期 · What\'s the date today?', items: ITEMS, acts: ACTS }); }
