// 💬 日常用语 · 问候与告别 · How are you? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC01_2_V5.md
// 角色关键帧：sprites/hdo01_2.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo01_2.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：How are you? （你好吗？/ 你最近怎么样？（熟人问候））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 熟人见面三连击：How are you? ➔ I\'m fine, thank you. ➔ And you?'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Good morning, Mike! How are you today?'],
  ['w', '早上好，迈克！你今天好吗？'],
  ['s', 'Good morning, Mike! How are you today?', '早上好，迈克！你今天好吗？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I\'m fine, thank you! And you?'],
  ['w', '我很好，谢谢你！你呢？'],
  ['s', 'I\'m fine, thank you! And you?', '我很好，谢谢你！你呢？'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Have a nice day!'],
  ['w', '祝你今天愉快！'],
  ['s', 'Have a nice day!', '祝你今天愉快！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问候与告别 · How are you?', items: ITEMS, acts: ACTS }); }
