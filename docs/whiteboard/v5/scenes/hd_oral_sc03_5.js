// 💬 日常用语 · 课堂用语 · How do you spell it? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC03_5_V5.md
// 角色关键帧：sprites/hdo03_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo03_5.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：How do you spell it? （它怎么拼写？（问单词拼写必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 拼写提问双子星：How do you spell it? ＝ Can you spell it, please?'],
  ['w', '对话第1轮'],
  ['w', '👩‍🏫 角色 A：It\'s an apple. How do you spell "apple"?'],
  ['w', '它是一个苹果。你怎样拼写“apple”？'],
  ['s', 'It\'s an apple. How do you spell "apple"?', '它是一个苹果。你怎样拼写“apple”？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：A-P-P-L-E, apple!'],
  ['w', 'A-P-P-L-E，苹果！'],
  ['s', 'A-P-P-L-E, apple!', 'A-P-P-L-E，苹果！'],
  ['w', '对话第3轮'],
  ['w', '👩‍🏫 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 课堂用语 · How do you spell it?', items: ITEMS, acts: ACTS }); }
