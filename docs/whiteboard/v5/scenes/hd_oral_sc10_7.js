// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Have a good trip! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC10_7_V5.md
// 角色关键帧：sprites/hdo10_7.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo10_7.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：Have a good trip! （祝你旅途愉快！）'],
  ['w', '💡 交际得体度与母语负迁移提示：朋友旅行前的祝愿。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I\'m going to Kunming tomorrow.'],
  ['w', '我明天要去昆明旅行。'],
  ['s', 'I\'m going to Kunming tomorrow.', '我明天要去昆明旅行。'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Have a good trip!'],
  ['w', '祝你旅途愉快！'],
  ['s', 'Have a good trip!', '祝你旅途愉快！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢！'],
  ['s', 'Thank you!', '谢谢！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Have a good trip!', items: ITEMS, acts: ACTS }); }
