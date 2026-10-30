// 💬 日常用语 · 问路与交通 · Excuse me, where is the library? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC08_1_V5.md
// 角色关键帧：sprites/hdo08_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_1.js';
const ACTS = {"*": ["l_point", "bus", "l_speak"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Excuse me, where is the library? （劳驾，请问图书馆在哪里？（问路必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 问路礼貌黄金公式：Excuse me + Where is the + 场所名称?'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：Excuse me, where is the city library?'],
  ['w', '劳驾，请问市图书馆在哪里？'],
  ['s', 'Excuse me, where is the city library?', '劳驾，请问市图书馆在哪里？'],
  ['w', '对话第2轮'],
  ['w', '👮 角色 B：It\'s over there! It\'s just next to the post office.'],
  ['w', '就在那边！它紧挨着邮局。'],
  ['s', 'It\'s over there! It\'s just next to the post office.', '就在那边！它紧挨着邮局。'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 问路与交通 · Excuse me, where is the library?', items: ITEMS, acts: ACTS }); }
