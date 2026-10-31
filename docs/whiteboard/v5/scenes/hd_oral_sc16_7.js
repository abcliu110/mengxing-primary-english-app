// 💬 日常用语 · 赞美与鼓励 · Practice makes perfect! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC16_7_V5.md
// 角色关键帧：sprites/hdo16_7.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo16_7.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：Practice makes perfect! （熟能生巧！）'],
  ['w', '💡 交际得体度与母语负迁移提示：鼓励勤加练习。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Your English is so good!'],
  ['w', '你英语真棒！'],
  ['s', 'Your English is so good!', '你英语真棒！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Thanks! Practice makes perfect!'],
  ['w', '谢谢！熟能生巧嘛！'],
  ['s', 'Thanks! Practice makes perfect!', '谢谢！熟能生巧嘛！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：I\'ll read every day too!'],
  ['w', '我也要每天读！'],
  ['s', 'I\'ll read every day too!', '我也要每天读！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 赞美与鼓励 · Practice makes perfect!', items: ITEMS, acts: ACTS }); }
