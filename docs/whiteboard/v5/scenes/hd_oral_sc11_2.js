// 💬 日常用语 · 打电话 · May I speak to Tom, please? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc11.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC11_2_V5.md
// 角色关键帧：sprites/hdo11_2.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo11_2.js';
const ACTS = {"*": ["l_ear", "l_laugh", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '打电话'],
  ['w', '核心交际句：May I speak to Tom, please? （请问我可以找汤姆接电话吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 打电话找人三步曲：May I speak to...? ➔ Hold on, please (请稍等) ➔ This is... speaking (我就是)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hello, Auntie! May I speak to Tom, please?'],
  ['w', '阿姨您好！请问我可以和汤姆通电话吗？'],
  ['s', 'Hello, Auntie! May I speak to Tom, please?', '阿姨您好！请问我可以和汤姆通电话吗？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Sure! Hold on, please. He is in his bedroom.'],
  ['w', '当然可以！请稍等别挂断，他在卧室里呢。'],
  ['s', 'Sure! Hold on, please. He is in his bedroom.', '当然可以！请稍等别挂断，他在卧室里呢。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thanks. I\'ll call later.'],
  ['w', '谢谢，我稍后再打。'],
  ['s', 'Thanks. I\'ll call later.', '谢谢，我稍后再打。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 打电话 · May I speak to Tom, please?', items: ITEMS, acts: ACTS }); }
