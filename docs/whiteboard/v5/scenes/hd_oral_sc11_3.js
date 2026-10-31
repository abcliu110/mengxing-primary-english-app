// 💬 日常用语 · 打电话 · Hold on, please. — Thank you! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc11.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC11_3_V5.md
// 角色关键帧：sprites/hdo11_3.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo11_3.js';
const ACTS = {"*": ["l_speak", "l_ear", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '打电话'],
  ['w', '核心交际句：Hold on, please. — Thank you! （请稍等（别挂断电话）。— 谢谢！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 电话等待双子星：Hold on, please! ＝ Wait a moment / minute, please!'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Hello! Is Amy at home? May I speak to her?'],
  ['w', '您好！请问艾米在家吗？我可以找她接电话吗？'],
  ['s', 'Hello! Is Amy at home? May I speak to her?', '您好！请问艾米在家吗？我可以找她接电话吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Yes, she\'s cleaning her room. Hold on, please!'],
  ['w', '在的，她正在打扫房间。请稍等一下，别挂断哦！'],
  ['s', 'Yes, she\'s cleaning her room. Hold on, please!', '在的，她正在打扫房间。请稍等一下，别挂断哦！'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：Thanks. I\'ll call later.'],
  ['w', '谢谢，我稍后再打。'],
  ['s', 'Thanks. I\'ll call later.', '谢谢，我稍后再打。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 打电话 · Hold on, please. — Thank you!', items: ITEMS, acts: ACTS }); }
