// 💬 日常用语 · 天气与闲聊 · What do you do on the weekend? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC09_7_V5.md
// 角色关键帧：sprites/hdo09_7.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo09_7.js';
const ACTS = {"*": ["sunny", "rain0", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：What do you do on the weekend? （你周末通常做什么？（日常习惯））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 两个 do 揭秘：What 【do】(助动词，无实义) you 【do】(实义动词“做”) on the weekend?'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：What do you usually do on the weekend, Sarah?'],
  ['w', '萨拉，你周末通常做什么呀？'],
  ['s', 'What do you usually do on the weekend, Sarah?', '萨拉，你周末通常做什么呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I often wash my clothes, read books and play sports in the park.'],
  ['w', '我经常洗衣服、看书，还在公园里做运动。'],
  ['s', 'I often wash my clothes, read books and play sports in the park.', '我经常洗衣服、看书，还在公园里做运动。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · What do you do on the weekend?', items: ITEMS, acts: ACTS }); }
