// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Take off your shoes at the door. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC15_5_V5.md
// 角色关键帧：sprites/hdo15_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_5.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Take off your shoes at the door. （进门请脱鞋，换上拖鞋。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 穿脱反义词王牌：Put on (穿上/戴上) ↔ Take off (脱下/摘下；飞机起飞也叫 take off)！'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Welcome home! Please take off your dirty shoes.'],
  ['w', '欢迎回家！请把脏鞋子脱下来。'],
  ['s', 'Welcome home! Please take off your dirty shoes.', '欢迎回家！请把脏鞋子脱下来。'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：OK, Mum! I\'ll put on my clean slippers.'],
  ['w', '好的，妈妈！我这就换上干净的拖鞋。'],
  ['s', 'OK, Mum! I\'ll put on my clean slippers.', '好的，妈妈！我这就换上干净的拖鞋。'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Take off your shoes at the door.', items: ITEMS, acts: ACTS }); }
