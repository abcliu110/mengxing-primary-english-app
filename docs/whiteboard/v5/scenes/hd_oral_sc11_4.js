// 💬 日常用语 · 打电话 · Hold on, please. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc11.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC11_4_V5.md
// 角色关键帧：sprites/hdo11_4.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo11_4.js';
const ACTS = {"*": ["l_ear", "l_laugh", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '打电话'],
  ['w', '核心交际句：Hold on, please. （请稍等（别挂断）。）'],
  ['w', '💡 交际得体度与母语负迁移提示：电话中请对方稍候。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：May I speak to Mum, please?'],
  ['w', '请问可以和妈妈通话吗？'],
  ['s', 'May I speak to Mum, please?', '请问可以和妈妈通话吗？'],
  ['w', '对话第2轮'],
  ['w', '👨 角色 B：Hold on, please. She is in the kitchen.'],
  ['w', '请稍等，她在厨房。'],
  ['s', 'Hold on, please. She is in the kitchen.', '请稍等，她在厨房。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：OK, thank you!'],
  ['w', '好的谢谢！'],
  ['s', 'OK, thank you!', '好的谢谢！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 打电话 · Hold on, please.', items: ITEMS, acts: ACTS }); }
