// 💬 日常用语 · 问候与告别 · Good morning! — Good morning! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC01_4_V5.md
// 角色关键帧：sprites/hdo01_4.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo01_4.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：Good morning! — Good morning! （早上好！（清晨见面问候））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 清晨问候金律：上午12点前见面互道 Good morning!'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：Good morning, Miss White!'],
  ['w', '早上好，怀特老师！'],
  ['s', 'Good morning, Miss White!', '早上好，怀特老师！'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：Good morning, Binbin! Have a nice day!'],
  ['w', '早上好，斌斌！祝你今天愉快！'],
  ['s', 'Good morning, Binbin! Have a nice day!', '早上好，斌斌！祝你今天愉快！'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：Have a nice day!'],
  ['w', '祝你今天愉快！'],
  ['s', 'Have a nice day!', '祝你今天愉快！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问候与告别 · Good morning! — Good morning!', items: ITEMS, acts: ACTS }); }
