// 💬 日常用语 · 赞美与鼓励 · I'm proud of you! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC16_8_V5.md
// 角色关键帧：sprites/hdo16_8.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo16_8.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：I\'m proud of you! （我为你感到骄傲！）'],
  ['w', '💡 交际得体度与母语负迁移提示：长辈或老师的表扬。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Mum, I cleaned my bedroom!'],
  ['w', '妈妈，我打扫了卧室！'],
  ['s', 'Mum, I cleaned my bedroom!', '妈妈，我打扫了卧室！'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Well done! I\'m proud of you!'],
  ['w', '干得漂亮！我为你骄傲！'],
  ['s', 'Well done! I\'m proud of you!', '干得漂亮！我为你骄傲！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 赞美与鼓励 · I\'m proud of you!', items: ITEMS, acts: ACTS }); }
