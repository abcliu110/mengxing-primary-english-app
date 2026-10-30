// 💬 日常用语 · 自我介绍 · Can you play ping-pong with me? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC04_7_V5.md
// 角色关键帧：sprites/hdo04_7.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_7.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：Can you play ping-pong with me? （你能和我一起打乒乓球吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 play 的黄金冠词法则：球类棋类不加 the（play basketball/chess）；乐器必加 the（play the pipa/piano）！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Can you play ping-pong with me after school?'],
  ['w', '放学后你能和我一起打乒乓球吗？'],
  ['s', 'Can you play ping-pong with me after school?', '放学后你能和我一起打乒乓球吗？'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Sure, I\'d love to! Ping-pong is my favourite sport!'],
  ['w', '当然，我很乐意！乒乓球是我最喜欢的运动！'],
  ['s', 'Sure, I\'d love to! Ping-pong is my favourite sport!', '当然，我很乐意！乒乓球是我最喜欢的运动！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 自我介绍 · Can you play ping-pong with me?', items: ITEMS, acts: ACTS }); }
