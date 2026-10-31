// 💬 日常用语 · 居家与家务 · Let me help you sweep the floor. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC15_3_V5.md
// 角色关键帧：sprites/hdo15_3.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo15_3.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Let me help you sweep the floor. （让我帮您扫地吧！（主动分担家务））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 主动帮忙黄金句：Let me help you + 动词原形（clean the room / wash the dishes）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Mum, you look tired. Let me help you sweep the floor!'],
  ['w', '妈妈，您看起来累了。让我帮您扫地吧！'],
  ['s', 'Mum, you look tired. Let me help you sweep the floor!', '妈妈，您看起来累了。让我帮您扫地吧！'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Thank you, Chen Jie! You are so helpful at home!'],
  ['w', '谢谢你，陈杰！你在家里真是太能干、太乐于助人了！'],
  ['s', 'Thank you, Chen Jie! You are so helpful at home!', '谢谢你，陈杰！你在家里真是太能干、太乐于助人了！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 居家与家务 · Let me help you sweep the floor.', items: ITEMS, acts: ACTS }); }
