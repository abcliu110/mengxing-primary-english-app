// 🛒 买卖交易小剧场 · 视角 1 buy (买) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr01.js 案例 1；对照清单 lab/INVENTORY_HD_FR01_1_V5.md
// 角色关键帧：sprites/fr01_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr01_1.js';
const ACTS = {"*": ["mom_dress"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (buy (买))'],
  ['w', '当前视角流向：买家 ➔ 商品 ｜ 句法结构公式：Buyer + buy + Goods (+ from Seller)'],
  ['w', '🎬 视角 1 动态角色流向图：buy (买)'],
  ['w', '⚡ buy (买)'],
  ['w', '📘 故事书 (a storybook) ➡️'],
  ['w', '🗣️ Taotao buys a storybook from the shop.'],
  ['w', '淘淘从店里买了一本故事书。 （句型公式：Buyer + buy + Goods (+ from Seller)）'],
  ['w', '视角 1·第1幕'],
  ['s', 'Taotao buys a storybook from the shop.', '淘淘从店里买了一本故事书。 ｜ Buyer + buy + Goods (+ from Seller)']
];
export default function build() { return autoBuild(SP, { title: '🛒 买卖交易小剧场 · 视角 1 buy (买)', items: ITEMS, acts: ACTS }); }
