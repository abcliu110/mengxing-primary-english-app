// 💬 日常用语 · 购物与问价 · They are on sale today! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 11；对照清单 lab/INVENTORY_HD_ORAL_SC07_11_V5.md
// 角色关键帧：sprites/hdo07_11.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_11.js';
const ACTS = {"*": ["l_bag0", "m_offer", "l_point"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：They are on sale today! （它们今天正在打折促销！（特价优惠））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 短语黄金区分：on sale = 打折促销中（便宜划算！） ↔ Half price = 半价！'],
  ['w', '对话第1轮'],
  ['w', '👨‍💼 角色 A：Look at these fresh strawberries! They are on sale today!'],
  ['w', '快看这些新鲜的草莓！它们今天正在打折特卖呢！'],
  ['s', 'Look at these fresh strawberries! They are on sale today!', '快看这些新鲜的草莓！它们今天正在打折特卖呢！'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Wow, half price! Let\'s buy two boxes!'],
  ['w', '哇，半价耶！我们买两盒吧！'],
  ['s', 'Wow, half price! Let\'s buy two boxes!', '哇，半价耶！我们买两盒吧！'],
  ['w', '对话第3轮'],
  ['w', '👨‍💼 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 购物与问价 · They are on sale today!', items: ITEMS, acts: ACTS }); }
