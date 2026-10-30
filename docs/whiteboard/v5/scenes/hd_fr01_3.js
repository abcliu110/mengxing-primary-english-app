// 🛒 买卖交易小剧场 · 视角 3 pay (付钱) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr01.js 案例 3；对照清单 lab/INVENTORY_HD_FR01_3_V5.md
// 角色关键帧：sprites/fr01_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr01_3.js';
const ACTS = {"*": ["l_piggy"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (pay (付钱))'],
  ['w', '当前视角流向：买家 ➔ 钱款 ➔ 商品 (for) ｜ 句法结构公式：Buyer + pay + Money + for Goods'],
  ['w', '🎬 视角 3 动态角色流向图：pay (付钱)'],
  ['w', '⚡ pay (付钱)'],
  ['w', '📘 故事书 (a storybook) ➡️'],
  ['w', '🗣️ Taotao pays 20 yuan for the storybook.'],
  ['w', '淘淘为这本故事书付了20元。 （句型公式：Buyer + pay + Money + for Goods）'],
  ['w', '视角 3·第1幕'],
  ['s', 'Taotao pays 20 yuan for the storybook.', '淘淘为这本故事书付了20元。 ｜ Buyer + pay + Money + for Goods']
];
export default function build() { return autoBuild(SP, { title: '🛒 买卖交易小剧场 · 视角 3 pay (付钱)', items: ITEMS, acts: ACTS }); }
