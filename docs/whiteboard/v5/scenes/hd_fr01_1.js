// 🛒 买卖交易小剧场 · 视角 1 buy (买) —— 决策 38 ⑨ 啊哈重做（版式 scenes/fr_lib.js，概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/09_hd_fr01.md）
// 内容来源：旧版 src/cases/hd_fr01.js 视角 1（清单 lab/INVENTORY_HD_FR01_1_V5.md）。App 里由页面自己的视角按钮选幕（wb5HDSwap 第三参数 = pIdx）。角色：emoji，不用人物帧。
import { frBuild } from './fr_lib.js';
import * as SP from '../sprites/hdfr01_1.js';
const ACTS = {};
export const KNOW = [
  "框架语义学原理",
  "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (buy (买))",
  "当前视角流向：买家 ➔ 商品 ｜ 句法结构公式：Buyer + buy + Goods (+ from Seller)",
  "🎬 视角 1 动态角色流向图：buy (买)",
  "⚡ buy (买)",
  "📘 故事书 (a storybook) ➡️",
  "🗣️ Taotao buys a storybook from the shop.",
  "淘淘从店里买了一本故事书。 （句型公式：Buyer + buy + Goods (+ from Seller)）",
  "Taotao buys a storybook from the shop.",
  "淘淘从店里买了一本故事书。"
];
void ACTS;
const V = {"verb": "buy", "zhVerb": "买", "idx": 1, "subject": "Buyer", "flow": "goods", "q": "镜头对准淘淘，看书到了他手上——用哪个动词？", "parts": [["Taotao", "Buyer"], ["buys", null], ["a storybook", "Goods"], ["from", null], ["the shop.", "Seller"]], "en": "Taotao buys a storybook from the shop.", "zh": "淘淘从店里买了一本故事书。", "formula": "Buyer + buy + Goods (+ from Seller)", "items": {"head": "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (buy (买))", "cam": "🎬 视角 1 动态角色流向图：buy (买)", "verbTag": "⚡ buy (买)", "say": "🗣️ Taotao buys a storybook from the shop.", "flowLine": "当前视角流向：买家 ➔ 商品 ｜ 句法结构公式：Buyer + buy + Goods (+ from Seller)", "zhLine": "淘淘从店里买了一本故事书。 （句型公式：Buyer + buy + Goods (+ from Seller)）", "title": "📘 故事书 (a storybook) ➡️"}};
export default function build() { return frBuild(SP, V); }
