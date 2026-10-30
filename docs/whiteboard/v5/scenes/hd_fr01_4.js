// 🛒 买卖交易小剧场 · 视角 4 cost (花费/值…钱) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr01.js 案例 4；对照清单 lab/INVENTORY_HD_FR01_4_V5.md
// 角色关键帧：sprites/fr01_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr01_4.js';
const ACTS = {"*": ["l_think"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (cost (花费/值…钱))'],
  ['w', '当前视角流向：商品 ➔ 买家 ➔ 钱款 ｜ 句法结构公式：Goods + cost + (Buyer) + Money'],
  ['w', '🎬 视角 4 动态角色流向图：cost (花费/值…钱)'],
  ['w', '⚡ cost (花费/值…钱)'],
  ['w', '📘 故事书 (a storybook) ⬅️'],
  ['w', '🗣️ The storybook costs Taotao 20 yuan.'],
  ['w', '这本故事书花了淘淘20元。 （句型公式：Goods + cost + (Buyer) + Money）'],
  ['w', '视角 4·第1幕'],
  ['s', 'The storybook costs Taotao 20 yuan.', '这本故事书花了淘淘20元。 ｜ Goods + cost + (Buyer) + Money']
];
export default function build() { return autoBuild(SP, { title: '🛒 买卖交易小剧场 · 视角 4 cost (花费/值…钱)', items: ITEMS, acts: ACTS }); }
