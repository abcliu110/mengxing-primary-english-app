// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Just looking, thank you. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC07_10_V5.md
// 角色关键帧：sprites/hdo07_10.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_10.js';
const ACTS = {"*": ["l_piggy", "l_bag1", "l_speak"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：Just looking, thank you. （我只是随便看看，谢谢。（逛街婉拒导购））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 逛街实用口语：不想被店员一直跟着推销时，微笑说 I\'m just looking, thank you!'],
  ['w', '对话第1轮'],
  ['w', '👩‍💼 角色 A：Good afternoon! Can I help you?'],
  ['w', '下午好！需要我帮您挑点什么吗？'],
  ['s', 'Good afternoon! Can I help you?', '下午好！需要我帮您挑点什么吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I\'m just looking, thank you!'],
  ['w', '我先随便看看，谢谢您！'],
  ['s', 'I\'m just looking, thank you!', '我先随便看看，谢谢您！'],
  ['w', '对话第3轮'],
  ['w', '👩‍💼 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Just looking, thank you.', items: ITEMS, acts: ACTS }); }
