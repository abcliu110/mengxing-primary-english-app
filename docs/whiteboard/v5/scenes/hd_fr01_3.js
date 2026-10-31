// 🛒 买卖交易小剧场 · 视角 3 pay (付钱) —— 决策 38 ⑨ 啊哈重做（版式 scenes/fr_lib.js，概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/09_hd_fr01.md）
// 内容来源：旧版 src/cases/hd_fr01.js 视角 3（清单 lab/INVENTORY_HD_FR01_3_V5.md）。App 里由页面自己的视角按钮选幕（wb5HDSwap 第三参数 = pIdx）。角色：emoji，不用人物帧。
import { frBuild } from './fr_lib.js';
import * as SP from '../sprites/hdfr01_3.js';
const ACTS = {};
export const KNOW = [
  "框架语义学原理",
  "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (pay (付钱))",
  "当前视角流向：买家 ➔ 钱款 ➔ 商品 (for) ｜ 句法结构公式：Buyer + pay + Money + for Goods",
  "🎬 视角 3 动态角色流向图：pay (付钱)",
  "⚡ pay (付钱)",
  "📘 故事书 (a storybook) ➡️",
  "🗣️ Taotao pays 20 yuan for the storybook.",
  "淘淘为这本故事书付了20元。 （句型公式：Buyer + pay + Money + for Goods）",
  "Taotao pays 20 yuan for the storybook.",
  "淘淘为这本故事书付了20元。"
];
void ACTS;
const V = {"verb": "pay", "zhVerb": "付钱", "idx": 3, "subject": "Buyer", "flow": "money", "q": "镜头还对准淘淘，这次看钱从他手里出去——用哪个动词？", "parts": [["Taotao", "Buyer"], ["pays", null], ["20 yuan", "Money"], ["for", null], ["the storybook.", "Goods"]], "en": "Taotao pays 20 yuan for the storybook.", "zh": "淘淘为这本故事书付了20元。", "formula": "Buyer + pay + Money + for Goods", "items": {"head": "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (pay (付钱))", "cam": "🎬 视角 3 动态角色流向图：pay (付钱)", "verbTag": "⚡ pay (付钱)", "say": "🗣️ Taotao pays 20 yuan for the storybook.", "flowLine": "当前视角流向：买家 ➔ 钱款 ➔ 商品 (for) ｜ 句法结构公式：Buyer + pay + Money + for Goods", "zhLine": "淘淘为这本故事书付了20元。 （句型公式：Buyer + pay + Money + for Goods）", "title": "📘 故事书 (a storybook) ➡️"}};
export default function build() { return frBuild(SP, V); }
