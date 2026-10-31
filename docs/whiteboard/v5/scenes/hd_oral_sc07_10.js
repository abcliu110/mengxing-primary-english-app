// 💬 日常用语 · 购物与问价 · Just looking, thank you. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC07_10_V5.md
// 角色关键帧：sprites/hdo07_10.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo07_10.js';
const ACTS = {"*": ["l_piggy", "l_bag1", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：Just looking, thank you. （我只是随便看看，谢谢。（逛街婉拒导购））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 逛街实用口语：不想被店员一直跟着推销时，微笑说 I\'m just looking, thank you!'],
  ['w', '对话第1轮'],
  ['w', '👩‍💼 角色 A：Good afternoon! Can I help you?'],
  ['w', '下午好！需要我帮您挑点什么吗？'],
  ['s', 'Good afternoon! Can I help you?', '下午好！需要我帮您挑点什么吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I\'m just looking, thank you!'],
  ['w', '我先随便看看，谢谢您！'],
  ['s', 'I\'m just looking, thank you!', '我先随便看看，谢谢您！'],
  ['w', '对话第3轮'],
  ['w', '👩‍💼 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 购物与问价 · Just looking, thank you.', items: ITEMS, acts: ACTS }); }
