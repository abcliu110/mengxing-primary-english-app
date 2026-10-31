// 🛒 买卖交易小剧场 · 视角 2 sell (卖) —— 决策 38 ⑨ 啊哈重做（版式 scenes/fr_lib.js，概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/09_hd_fr01.md）
// 内容来源：旧版 src/cases/hd_fr01.js 视角 2（清单 lab/INVENTORY_HD_FR01_2_V5.md）。App 里由页面自己的视角按钮选幕（wb5HDSwap 第三参数 = pIdx）。角色：emoji，不用人物帧。
import { frBuild } from './fr_lib.js';
import * as SP from '../sprites/hdfr01_2.js';
const ACTS = {};
export const KNOW = [
  "框架语义学原理",
  "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (sell (卖))",
  "当前视角流向：卖家 ➔ 商品 ➔ 买家 ｜ 句法结构公式：Seller + sell + Goods + to Buyer",
  "🎬 视角 2 动态角色流向图：sell (卖)",
  "⚡ sell (卖)",
  "📘 故事书 (a storybook) ⬅️",
  "🗣️ The shopkeeper sells a storybook to Taotao.",
  "店员把一本故事书卖给淘淘。 （句型公式：Seller + sell + Goods + to Buyer）",
  "The shopkeeper sells a storybook to Taotao.",
  "店员把一本故事书卖给淘淘。"
];
void ACTS;
const V = {"verb": "sell", "zhVerb": "卖", "idx": 2, "subject": "Seller", "flow": "goods", "q": "镜头对准店员，看书从他手里出去——用哪个动词？", "parts": [["The shopkeeper", "Seller"], ["sells", null], ["a storybook", "Goods"], ["to", null], ["Taotao.", "Buyer"]], "en": "The shopkeeper sells a storybook to Taotao.", "zh": "店员把一本故事书卖给淘淘。", "formula": "Seller + sell + Goods + to Buyer", "items": {"head": "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (sell (卖))", "cam": "🎬 视角 2 动态角色流向图：sell (卖)", "verbTag": "⚡ sell (卖)", "say": "🗣️ The shopkeeper sells a storybook to Taotao.", "flowLine": "当前视角流向：卖家 ➔ 商品 ➔ 买家 ｜ 句法结构公式：Seller + sell + Goods + to Buyer", "zhLine": "店员把一本故事书卖给淘淘。 （句型公式：Seller + sell + Goods + to Buyer）", "title": "📘 故事书 (a storybook) ⬅️"}};
export default function build() { return frBuild(SP, V); }
