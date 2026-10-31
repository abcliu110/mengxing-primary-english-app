// 💬 日常用语 · 居家与家务 · Put away your toys, please! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 11；对照清单 lab/INVENTORY_HD_ORAL_SC15_11_V5.md
// 角色关键帧：sprites/hdo15_11.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo15_11.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Put away your toys, please! （请把你的玩具收拾好！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 收拾整理短语王：put away your toys/books（把玩具/书本收好放回原位）！'],
  ['w', '对话第1轮'],
  ['w', '👨 角色 A：Time for bed! Please put away your toys, Jim.'],
  ['w', '该睡觉啦！吉姆，请把你的玩具收拾好放回原处。'],
  ['s', 'Time for bed! Please put away your toys, Jim.', '该睡觉啦！吉姆，请把你的玩具收拾好放回原处。'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：OK, Dad! I\'ll put them in the toy box.'],
  ['w', '好的，爸爸！我这就把它们放进玩具箱里。'],
  ['s', 'OK, Dad! I\'ll put them in the toy box.', '好的，爸爸！我这就把它们放进玩具箱里。'],
  ['w', '对话第3轮'],
  ['w', '👨 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 居家与家务 · Put away your toys, please!', items: ITEMS, acts: ACTS }); }
