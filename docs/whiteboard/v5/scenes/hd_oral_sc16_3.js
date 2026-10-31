// 💬 日常用语 · 赞美与鼓励 · Don't give up! Try again! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC16_3_V5.md
// 角色关键帧：sprites/hdo16_3.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo16_3.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：Don\'t give up! Try again! （别放弃！再试一次！（运动拼搏必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 赛场助威黄金组合：Come on! (加油) · Don\'t give up! (别放弃) · Try again! (再试一次)！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Oh no, I tripped on the rope again!'],
  ['w', '哎呀，我又被跳绳绊倒了！'],
  ['s', 'Oh no, I tripped on the rope again!', '哎呀，我又被跳绳绊倒了！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Don\'t give up, Lucy! Come on, try again!'],
  ['w', '别放弃，露西！加油，再试一次！'],
  ['s', 'Don\'t give up, Lucy! Come on, try again!', '别放弃，露西！加油，再试一次！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you!'],
  ['w', '谢谢你！'],
  ['s', 'Thank you!', '谢谢你！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 赞美与鼓励 · Don\'t give up! Try again!', items: ITEMS, acts: ACTS }); }
