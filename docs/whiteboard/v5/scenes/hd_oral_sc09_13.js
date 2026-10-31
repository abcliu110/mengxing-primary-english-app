// 💬 日常用语 · 天气与闲聊 · How was your summer vacation? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 13；对照清单 lab/INVENTORY_HD_ORAL_SC09_13_V5.md
// 角色关键帧：sprites/hdo09_13.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo09_13.js';
const ACTS = {"*": ["sunny", "rain0", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：How was your summer vacation? （你的暑假过得怎么样？（假期回顾））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 回顾过去体验王牌：How was your weekend / holiday / trip? ➔ It was great / wonderful / good!'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Welcome back to school! How was your summer vacation?'],
  ['w', '欢迎回校！你的暑假过得怎么样呀？'],
  ['s', 'Welcome back to school! How was your summer vacation?', '欢迎回校！你的暑假过得怎么样呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：It was wonderful! I went to Sanya and swam in the blue sea!'],
  ['w', '棒极了！我去了三亚，还在蔚蓝的大海里游了泳呢！'],
  ['s', 'It was wonderful! I went to Sanya and swam in the blue sea!', '棒极了！我去了三亚，还在蔚蓝的大海里游了泳呢！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · How was your summer vacation?', items: ITEMS, acts: ACTS }); }
