// 💬 日常用语 · 天气与闲聊 · Which season do you like best? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC09_5_V5.md
// 角色关键帧：sprites/hdo09_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo09_5.js';
const ACTS = {"*": ["sunny", "rain0", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：Which season do you like best? （你最喜欢哪个季节？（四季偏好必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 同义句转换必考：Which season do you like best? ＝ What\'s your favourite season?'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Which season do you like best, Amy?'],
  ['w', '艾米，你最喜欢哪一个季节？'],
  ['s', 'Which season do you like best, Amy?', '艾米，你最喜欢哪一个季节？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I like autumn best! Because the weather is cool and the leaves are golden.'],
  ['w', '我最喜欢秋天！因为天气凉爽，树叶金黄。'],
  ['s', 'I like autumn best! Because the weather is cool and the leaves are golden.', '我最喜欢秋天！因为天气凉爽，树叶金黄。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · Which season do you like best?', items: ITEMS, acts: ACTS }); }
