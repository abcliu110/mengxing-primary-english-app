// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Is it far from here? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC08_5_V5.md
// 角色关键帧：sprites/hdo08_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_5.js';
const ACTS = {"*": ["l_point", "bus", "l_speak"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Is it far from here? （它离这儿远吗？（问距离必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 介词搭配细节：far from here（离这儿远，有 from）↔ near here（在这附近，无 from）'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：Excuse me, is the bookstore far from here?'],
  ['w', '劳驾，请问书店离这儿远吗？'],
  ['s', 'Excuse me, is the bookstore far from here?', '劳驾，请问书店离这儿远吗？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：No, it\'s not far! Walk straight for three minutes and you\'ll see it.'],
  ['w', '不，一点也不远！直走三分钟你就能看到它啦。'],
  ['s', 'No, it\'s not far! Walk straight for three minutes and you\'ll see it.', '不，一点也不远！直走三分钟你就能看到它啦。'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Is it far from here?', items: ITEMS, acts: ACTS }); }
