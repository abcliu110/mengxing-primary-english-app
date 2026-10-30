// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · What's wrong with you? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC12_1_V5.md
// 角色关键帧：sprites/hdo12_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo12_1.js';
const ACTS = {"*": ["l_plaster", "l_breath", "l_think"]};
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
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · What\'s wrong with you?', items: ITEMS, acts: ACTS }); }
