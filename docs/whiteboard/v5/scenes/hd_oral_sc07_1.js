// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Can I help you? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC07_1_V5.md
// 角色关键帧：sprites/hdo07_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_1.js';
const ACTS = {"*": ["l_bag0", "m_offer", "l_point"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：Can I help you? （需要我帮您吗？/ 您想买点什么？（售货员迎客必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 购物场景第一句：售货员说 Can I help you? ➔ 顾客答 Yes, please!'],
  ['w', '对话第1轮'],
  ['w', '👩‍💼 角色 A：Welcome to our clothes shop! Can I help you?'],
  ['w', '欢迎来到我们的服装店！您想买点什么？'],
  ['s', 'Welcome to our clothes shop! Can I help you?', '欢迎来到我们的服装店！您想买点什么？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Yes, please! I want to buy a pretty dress for the party.'],
  ['w', '好的，麻烦您！我想为派对买一条漂亮的连衣裙。'],
  ['s', 'Yes, please! I want to buy a pretty dress for the party.', '好的，麻烦您！我想为派对买一条漂亮的连衣裙。'],
  ['w', '对话第3轮'],
  ['w', '👩‍💼 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Can I help you?', items: ITEMS, acts: ACTS }); }
