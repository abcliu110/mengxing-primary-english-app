// 💬 日常用语 · 自我介绍 · What does your father do? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC04_6_V5.md
// 角色关键帧：sprites/hdo04_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo04_6.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：What does your father do? （你爸爸是做什么工作的？（问职业必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 询问职业两大句型：What does he do? ＝ What is his job?（回答职业前必加冠词 a/an：He is a pilot.）。⚠️ What is he? 是老式说法，现在容易被听成“他是什么（东西）”，认得即可、自己不用。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：What does your father do, Mike?'],
  ['w', '迈克，你爸爸是做什么工作的呀？'],
  ['s', 'What does your father do, Mike?', '迈克，你爸爸是做什么工作的呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：He is a pilot. He works on a big plane!'],
  ['w', '他是一名飞行员。他在大飞机上工作！'],
  ['s', 'He is a pilot. He works on a big plane!', '他是一名飞行员。他在大飞机上工作！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Cool!'],
  ['w', '真酷！'],
  ['s', 'Cool!', '真酷！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 自我介绍 · What does your father do?', items: ITEMS, acts: ACTS }); }
