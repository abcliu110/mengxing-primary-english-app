// 💬 日常用语 · 看病与身体不适 · What's wrong with you? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC12_1_V5.md
// 角色关键帧：sprites/hdo12_1.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo12_1.js';
const ACTS = {"*": ["l_plaster", "l_breath", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：What\'s wrong with you? （你怎么了？/ 哪里不舒服？（关心生病或难过的同学））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 看病关心双子星：What\'s wrong with you? ＝ What\'s the matter (with you)?'],
  ['w', '对话第1轮'],
  ['w', '👩‍⚕️ 角色 A：Come and sit down, John. What\'s wrong with you?'],
  ['w', '过来坐下吧，约翰。你怎么了（哪里不舒服）？'],
  ['s', 'Come and sit down, John. What\'s wrong with you?', '过来坐下吧，约翰。你怎么了（哪里不舒服）？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I feel cold and I have a bad headache, Doctor.'],
  ['w', '医生，我觉得很冷，而且头很疼。'],
  ['s', 'I feel cold and I have a bad headache, Doctor.', '医生，我觉得很冷，而且头很疼。'],
  ['w', '对话第3轮'],
  ['w', '👩‍⚕️ 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · What\'s wrong with you?', items: ITEMS, acts: ACTS }); }
