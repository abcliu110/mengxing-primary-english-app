// 💬 日常用语 · 就餐与点菜 · May I have the bill, please? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC06_10_V5.md
// 角色关键帧：sprites/hdo06_10.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo06_10.js';
const ACTS = {"*": ["m_offer", "l_nothanks", "m_like"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：May I have the bill, please? （请帮我结账（买单）好吗？（餐厅结账））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 餐厅全流程口语：Order (点餐: What would you like?) ➔ Enjoy (用餐: Help yourself!) ➔ Pay (结账: May I have the bill?)'],
  ['w', '对话第1轮'],
  ['w', '👨 角色 A：Excuse me, waiter! May I have the bill, please?'],
  ['w', '劳驾，服务员！请帮我结账买单好吗？'],
  ['s', 'Excuse me, waiter! May I have the bill, please?', '劳驾，服务员！请帮我结账买单好吗？'],
  ['w', '对话第2轮'],
  ['w', '🤵 角色 B：Sure! It\'s sixty-eight yuan in total.'],
  ['w', '好的！一共是六十八元。'],
  ['s', 'Sure! It\'s sixty-eight yuan in total.', '好的！一共是六十八元。'],
  ['w', '对话第3轮'],
  ['w', '👨 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 就餐与点菜 · May I have the bill, please?', items: ITEMS, acts: ACTS }); }
