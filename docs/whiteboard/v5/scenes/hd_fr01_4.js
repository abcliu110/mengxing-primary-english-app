// 🛒 买卖交易小剧场 · 视角 4 cost (花费/值…钱) —— 决策 38 ⑨ 啊哈重做（版式 scenes/fr_lib.js，概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/09_hd_fr01.md）
// 内容来源：旧版 src/cases/hd_fr01.js 视角 4（清单 lab/INVENTORY_HD_FR01_4_V5.md）。App 里由页面自己的视角按钮选幕（wb5HDSwap 第三参数 = pIdx）。角色：emoji，不用人物帧。
import { frBuild } from './fr_lib.js';
import * as SP from '../sprites/hdfr01_4.js';
const ACTS = {};
export const KNOW = [
  "框架语义学原理",
  "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (cost (花费/值…钱))",
  "当前视角流向：商品 ➔ 买家 ➔ 钱款 ｜ 句法结构公式：Goods + cost + (Buyer) + Money",
  "🎬 视角 4 动态角色流向图：cost (花费/值…钱)",
  "⚡ cost (花费/值…钱)",
  "📘 故事书 (a storybook) ⬅️",
  "🗣️ The storybook costs Taotao 20 yuan.",
  "这本故事书花了淘淘20元。 （句型公式：Goods + cost + (Buyer) + Money）",
  "The storybook costs Taotao 20 yuan.",
  "这本故事书花了淘淘20元。"
];
void ACTS;
const V = {"verb": "cost", "zhVerb": "花费/值…钱", "idx": 4, "subject": "Goods", "flow": "money", "q": "镜头对准那本书：它让淘淘掏出了 20 元——用哪个动词？", "parts": [["The storybook", "Goods"], ["costs", null], ["Taotao", "Buyer"], ["20 yuan.", "Money"]], "en": "The storybook costs Taotao 20 yuan.", "zh": "这本故事书花了淘淘20元。", "formula": "Goods + cost + (Buyer) + Money", "items": {"head": "🛒 买卖交易小剧场 (Commercial Transaction) — 同一客观事件，切换主语视角即切换动词 (cost (花费/值…钱))", "cam": "🎬 视角 4 动态角色流向图：cost (花费/值…钱)", "verbTag": "⚡ cost (花费/值…钱)", "say": "🗣️ The storybook costs Taotao 20 yuan.", "flowLine": "当前视角流向：商品 ➔ 买家 ➔ 钱款 ｜ 句法结构公式：Goods + cost + (Buyer) + Money", "zhLine": "这本故事书花了淘淘20元。 （句型公式：Goods + cost + (Buyer) + Money）", "title": "📘 故事书 (a storybook) ⬅️"}};
export default function build() { return frBuild(SP, V); }
