// 💬 日常用语 · 自我介绍 · Where are you from? — I'm from China. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC04_2_V5.md
// 角色关键帧：sprites/hdo04_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_2.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：Where are you from? — I\'m from China. （你来自哪里？— 我来自中国。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 国籍必背缩写：China (中国) · the UK (英国) · the USA (美国) · Canada (加拿大) · Australia (澳大利亚)'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Hi, Mike! Where are you from?'],
  ['w', '嗨，迈克！你是哪里人（来自哪里）呀？'],
  ['s', 'Hi, Mike! Where are you from?', '嗨，迈克！你是哪里人（来自哪里）呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I\'m from Canada. What about you? — I\'m from China!'],
  ['w', '我来自加拿大。你呢？ — 我来自中国！'],
  ['s', 'I\'m from Canada. What about you? — I\'m from China!', '我来自加拿大。你呢？ — 我来自中国！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 自我介绍 · Where are you from? — I\'m from China.', items: ITEMS, acts: ACTS }); }
