// 💬 日常用语 · 居家与家务 · May I watch TV now? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC15_9_V5.md
// 角色关键帧：sprites/hdo15_9.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_9.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：May I watch TV now? （我现在可以看电视吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 四个“看”黄金分工：watch TV/games(看动态屏幕) · read books(看文字) · look at(盯住看) · see a film(看电影)'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Mum, I finished my homework. May I watch TV now?'],
  ['w', '妈妈，我写完作业啦。我现在可以看电视吗？'],
  ['s', 'Mum, I finished my homework. May I watch TV now?', '妈妈，我写完作业啦。我现在可以看电视吗？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Yes, you may! But only for twenty minutes.'],
  ['w', '可以的！但只能看二十分钟哦。'],
  ['s', 'Yes, you may! But only for twenty minutes.', '可以的！但只能看二十分钟哦。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 居家与家务 · May I watch TV now?', items: ITEMS, acts: ACTS }); }
