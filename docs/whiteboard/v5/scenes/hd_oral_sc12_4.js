// 💬 日常用语 · 看病与身体不适 · Open your mouth and say "Ah". —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC12_4_V5.md
// 角色关键帧：sprites/hdo12_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo12_4.js';
const ACTS = {"*": ["l_plaster", "l_speak", "l_breath"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：Open your mouth and say "Ah". （张开嘴说“啊——”。（看病检查必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 看病常用身体不适：a headache (头疼) · a toothache (牙疼) · a stomachache (肚子疼) · a sore throat (嗓子疼)'],
  ['w', '对话第1轮'],
  ['w', '👨‍⚕️ 角色 A：I have a sore throat, Doctor.'],
  ['w', '医生，我嗓子疼。'],
  ['s', 'I have a sore throat, Doctor.', '医生，我嗓子疼。'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Let me see. Open your mouth wide and say "Ah".'],
  ['w', '让我看看。把嘴巴张大，说“啊——”。'],
  ['s', 'Let me see. Open your mouth wide and say "Ah".', '让我看看。把嘴巴张大，说“啊——”。'],
  ['w', '对话第3轮'],
  ['w', '👨‍⚕️ 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · Open your mouth and say "Ah".', items: ITEMS, acts: ACTS }); }
