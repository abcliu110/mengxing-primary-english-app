// 💬 日常用语 · 看病与身体不适 · Why are you so happy today? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC12_9_V5.md
// 角色关键帧：sprites/hdo12_9.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo12_9.js';
const ACTS = {"*": ["l_plaster", "l_breath", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：Why are you so happy today? （你今天为什么这么开心呀？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 Why 是来要原因的：回答时先把原因递出去，最常用的开头是 Because...。递原因不止一种姿势——记住“要给原因”，不是“永远用某个词开头”（考场造句用 Because 开头最稳）。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Why are you so happy today, Chen Jie?'],
  ['w', '陈杰，你今天为什么这么开心呀？'],
  ['s', 'Why are you so happy today, Chen Jie?', '陈杰，你今天为什么这么开心呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Because my mum bought me a cute puppy! And my birthday is coming!'],
  ['w', '因为我妈妈给我买了一只可爱的小狗！而且我的生日快到啦！'],
  ['s', 'Because my mum bought me a cute puppy! And my birthday is coming!', '因为我妈妈给我买了一只可爱的小狗！而且我的生日快到啦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Wow! How lucky you are!'],
  ['w', '哇！你真幸运！'],
  ['s', 'Wow! How lucky you are!', '哇！你真幸运！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · Why are you so happy today?', items: ITEMS, acts: ACTS }); }
