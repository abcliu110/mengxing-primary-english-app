// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · You look so cool today! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC16_6_V5.md
// 角色关键帧：sprites/hdo16_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo16_6.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：You look so cool today! （你今天看起来太酷了！）'],
  ['w', '💡 交际得体度与母语负迁移提示：夸赞朋友穿搭或状态。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Look at my new blue jacket!'],
  ['w', '看我的新蓝夹克！'],
  ['s', 'Look at my new blue jacket!', '看我的新蓝夹克！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Wow, you look so cool today!'],
  ['w', '哇，你今天看起来太酷啦！'],
  ['s', 'Wow, you look so cool today!', '哇，你今天看起来太酷啦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢！'],
  ['s', 'Thank you!', '谢谢！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · You look so cool today!', items: ITEMS, acts: ACTS }); }
