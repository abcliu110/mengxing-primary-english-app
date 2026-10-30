// 💬 日常用语 · 询问与求助 · Can I borrow your ruler? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc05.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC05_2_V5.md
// 角色关键帧：sprites/hdo05_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo05_2.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '询问与求助'],
  ['w', '核心交际句：Can I borrow your ruler? （我可以借用一下你的尺子吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 递东西口语王牌：把东西递给别人说“给你”，要用 Here you are!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Excuse me. Can I borrow your ruler?'],
  ['w', '劳驾，我可以借用你的尺子吗？'],
  ['s', 'Excuse me. Can I borrow your ruler?', '劳驾，我可以借用你的尺子吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Sure! Here you are!'],
  ['w', '当然可以！给你！'],
  ['s', 'Sure! Here you are!', '当然可以！给你！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢你！'],
  ['s', 'Thank you!', '谢谢你！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 询问与求助 · Can I borrow your ruler?', items: ITEMS, acts: ACTS }); }
