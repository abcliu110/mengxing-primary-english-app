// 💬 日常用语 · 看病与身体不适 · You should see a doctor. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC12_5_V5.md
// 角色关键帧：sprites/hdo12_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo12_5.js';
const ACTS = {"*": ["l_plaster", "l_breath", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：You should see a doctor. （你应该去看医生。（健康建议必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 提建议黄金情态动词：You should + 动词原形（see a doctor / wear warm clothes / take a rest）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：I feel dizzy and I have a fever.'],
  ['w', '我觉得头晕，而且发烧了。'],
  ['s', 'I feel dizzy and I have a fever.', '我觉得头晕，而且发烧了。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Oh dear! You should see a doctor right now!'],
  ['w', '哎呀！你应该立刻去看医生！'],
  ['s', 'Oh dear! You should see a doctor right now!', '哎呀！你应该立刻去看医生！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · You should see a doctor.', items: ITEMS, acts: ACTS }); }
