// 💬 日常用语 · 自我介绍 · Would you like to be my pen pal? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC04_8_V5.md
// 角色关键帧：sprites/hdo04_8.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_8.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：Would you like to be my pen pal? （你愿意做我的笔友吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 礼貌邀请必背答句：听到 Would you like to do sth.? 肯定回答最地道的是 Yes, I\'d love to!（注意末尾保留 to）'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：We both like science and puzzles! Would you like to be my pen pal?'],
  ['w', '我们都喜欢科学和拼图！你愿意成为我的笔友吗？'],
  ['s', 'We both like science and puzzles! Would you like to be my pen pal?', '我们都喜欢科学和拼图！你愿意成为我的笔友吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Yes, I\'d love to! Here is my email address.'],
  ['w', '是的，我非常乐意！这是我的电子邮箱地址。'],
  ['s', 'Yes, I\'d love to! Here is my email address.', '是的，我非常乐意！这是我的电子邮箱地址。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 自我介绍 · Would you like to be my pen pal?', items: ITEMS, acts: ACTS }); }
