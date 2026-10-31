// 💬 日常用语 · 感谢与道歉 · Excuse me. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC02_3_V5.md
// 角色关键帧：sprites/hdo02_3.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo02_3.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：Excuse me. （劳驾 / 打扰一下 / 请让一让（事前礼貌询问））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 黄金区分：事前打扰问路用 Excuse me；事后做错道歉用 I\'m sorry！'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：Excuse me, sir. Can you help me?'],
  ['w', '劳驾（打扰一下），先生。您能帮帮我吗？'],
  ['s', 'Excuse me, sir. Can you help me?', '劳驾（打扰一下），先生。您能帮帮我吗？'],
  ['w', '对话第2轮'],
  ['w', '👮 角色 B：Sure! What can I do for you?'],
  ['w', '当然可以！需要我帮你做什么？'],
  ['s', 'Sure! What can I do for you?', '当然可以！需要我帮你做什么？'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：That\'s all right.'],
  ['w', '没关系。'],
  ['s', 'That\'s all right.', '没关系。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · Excuse me.', items: ITEMS, acts: ACTS }); }
