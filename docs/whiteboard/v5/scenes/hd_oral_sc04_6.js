// 💬 日常用语 · 自我介绍 · What does your father do? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC04_6_V5.md
// 角色关键帧：sprites/hdo04_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_6.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：What does your father do? （你爸爸是做什么工作的？（问职业必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 询问职业三大句型：What does he do? ＝ What is his job? ＝ What is he?（回答职业前必加冠词 a/an）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：What does your father do, Mike?'],
  ['w', '迈克，你爸爸是做什么工作的呀？'],
  ['s', 'What does your father do, Mike?', '迈克，你爸爸是做什么工作的呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：He is a pilot. He works on a big plane!'],
  ['w', '他是一名飞行员。他在大飞机上工作！'],
  ['s', 'He is a pilot. He works on a big plane!', '他是一名飞行员。他在大飞机上工作！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 自我介绍 · What does your father do?', items: ITEMS, acts: ACTS }); }
