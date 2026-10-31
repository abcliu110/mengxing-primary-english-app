// 💬 日常用语 · 询问与求助 · Could you help me, please? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc05.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC05_3_V5.md
// 角色关键帧：sprites/hdo05_3.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo05_3.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '询问与求助'],
  ['w', '核心交际句：Could you help me, please? （请问你能帮帮我吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：用 Could 更委婉礼貌。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：This box is heavy. Could you help me, please?'],
  ['w', '箱子太重了，能帮我吗？'],
  ['s', 'This box is heavy. Could you help me, please?', '箱子太重了，能帮我吗？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Sure! Let\'s carry it together.'],
  ['w', '当然！我们一起搬。'],
  ['s', 'Sure! Let\'s carry it together.', '当然！我们一起搬。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you!'],
  ['w', '谢谢！'],
  ['s', 'Thank you!', '谢谢！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 询问与求助 · Could you help me, please?', items: ITEMS, acts: ACTS }); }
