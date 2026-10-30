// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Can you make the bed? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC15_2_V5.md
// 角色关键帧：sprites/hdo15_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_2.js';
const ACTS = {"*": ["m_tv", "l_put", "l_speak"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Can you make the bed? （你能铺一下床吗？（做家务必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 家务高频搭配：make the bed (铺床) · sweep the floor (扫地) · wash the dishes (洗碗)'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Can you make the bed by yourself, Mike?'],
  ['w', '迈克，你能自己铺床整理被子吗？'],
  ['s', 'Can you make the bed by yourself, Mike?', '迈克，你能自己铺床整理被子吗？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Yes, I can! I make my bed every morning.'],
  ['w', '我能行！我每天早上都自己铺床。'],
  ['s', 'Yes, I can! I make my bed every morning.', '我能行！我每天早上都自己铺床。'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Can you make the bed?', items: ITEMS, acts: ACTS }); }
