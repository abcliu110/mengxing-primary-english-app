// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc05`（询问与求助 · Can I borrow your dictionary? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc05.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC05_4_V5.md
// 角色关键帧：sprites/hdo05_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo05_4.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '询问与求助'],
  ['w', '核心交际句：Can I borrow your dictionary? （我能借用一下你的词典吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：借入物品用 borrow。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Excuse me, can I borrow your dictionary?'],
  ['w', '能借用一下你的词典吗？'],
  ['s', 'Excuse me, can I borrow your dictionary?', '能借用一下你的词典吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Of course! Here you are.'],
  ['w', '当然可以！给你。'],
  ['s', 'Of course! Here you are.', '当然可以！给你。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thanks!'],
  ['w', '谢谢！'],
  ['s', 'Thanks!', '谢谢！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc05`（询问与求助 · Can I borrow your dictionary?', items: ITEMS, acts: ACTS }); }
