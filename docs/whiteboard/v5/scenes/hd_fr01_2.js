// 🛒 买卖交易小剧场 · 视角 2 sell (卖) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr01.js 案例 2；对照清单 lab/INVENTORY_HD_FR01_2_V5.md
// 角色关键帧：sprites/fr01_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr01_2.js';
const ACTS = {"*": ["m_offer", "offer_ok"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (sell (卖))'],
  ['w', '当前视角流向：卖家 ➔ 商品 ➔ 买家 ｜ 句法结构公式：Seller + sell + Goods + to Buyer'],
  ['w', '🎬 视角 2 动态角色流向图：sell (卖)'],
  ['w', '⚡ sell (卖)'],
  ['w', '📘 故事书 (a storybook) ⬅️'],
  ['w', '🗣️ The shopkeeper sells a storybook to Taotao.'],
  ['w', '店员把一本故事书卖给淘淘。 （句型公式：Seller + sell + Goods + to Buyer）'],
  ['w', '视角 2·第1幕'],
  ['s', 'The shopkeeper sells a storybook to Taotao.', '店员把一本故事书卖给淘淘。 ｜ Seller + sell + Goods + to Buyer']
];
export default function build() { return autoBuild(SP, { title: '🛒 买卖交易小剧场 · 视角 2 sell (卖)', items: ITEMS, acts: ACTS }); }
