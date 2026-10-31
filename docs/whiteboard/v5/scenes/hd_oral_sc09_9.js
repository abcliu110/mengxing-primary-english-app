// 💬 日常用语 · 天气与闲聊 · Where did you go last weekend? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC09_9_V5.md
// 角色关键帧：sprites/hdo09_9.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo09_9.js';
const ACTS = {"*": ["sunny", "rain0", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：Where did you go last weekend? （你上周末去了哪里？（过去经历必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 过去式不规则变化王：问句用原形 go（因为有 did），答句必须变过去式 went（go ➔ went）！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Where did you go last weekend, John?'],
  ['w', '约翰，你上周末去了哪里玩呀？'],
  ['s', 'Where did you go last weekend, John?', '约翰，你上周末去了哪里玩呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I went to a forest park and went camping with my family!'],
  ['w', '我去了森林公园，还和家人一起去露营了！'],
  ['s', 'I went to a forest park and went camping with my family!', '我去了森林公园，还和家人一起去露营了！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · Where did you go last weekend?', items: ITEMS, acts: ACTS }); }
