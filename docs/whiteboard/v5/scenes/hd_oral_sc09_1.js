// 💬 日常用语 · 天气与闲聊 · Have a good time! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC09_1_V5.md
// 角色关键帧：sprites/hdo09_1.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo09_1.js';
const ACTS = {"*": ["sunny", "rain0", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：Have a good time! （祝你玩得开心！/ 旅途愉快！（送别出行祝福））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 祝福分场合：Have a good time! ＝ Have fun!（玩得开心，通用）；Have a nice trip! 只送要出门旅行的人（trip＝旅行）。去公园野餐用前两句，不要用 trip 版。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：We are going to the nature park for a picnic today!'],
  ['w', '我们今天要去自然公园野餐啦！'],
  ['s', 'We are going to the nature park for a picnic today!', '我们今天要去自然公园野餐啦！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Wow, sounds great! Have a good time!'],
  ['w', '哇，听起来太棒了！祝你们玩得开心！'],
  ['s', 'Wow, sounds great! Have a good time!', '哇，听起来太棒了！祝你们玩得开心！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢你！'],
  ['s', 'Thank you!', '谢谢你！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · Have a good time!', items: ITEMS, acts: ACTS }); }
