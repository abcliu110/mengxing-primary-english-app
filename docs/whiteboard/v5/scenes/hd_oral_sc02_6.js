// 💬 日常用语 · 感谢与道歉 · Thank you so much! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC02_6_V5.md
// 角色关键帧：sprites/hdo02_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo02_6.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：Thank you so much! （非常感谢你！）'],
  ['w', '💡 交际得体度与母语负迁移提示：当别人帮了大忙时表达感激。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Here is your lost schoolbag!'],
  ['w', '这是你弄丢的书包！'],
  ['s', 'Here is your lost schoolbag!', '这是你弄丢的书包！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Oh! Thank you so much!'],
  ['w', '噢！太感谢你了！'],
  ['s', 'Oh! Thank you so much!', '噢！太感谢你了！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：You\'re welcome!'],
  ['w', '不客气！'],
  ['s', 'You\'re welcome!', '不客气！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · Thank you so much!', items: ITEMS, acts: ACTS }); }
