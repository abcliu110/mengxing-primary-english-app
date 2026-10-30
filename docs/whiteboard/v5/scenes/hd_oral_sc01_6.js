// 💬 日常用语 · 问候与告别 · Good night! Sweet dreams! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC01_6_V5.md
// 角色关键帧：sprites/hdo01_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo01_6.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：Good night! Sweet dreams! （晚安！做个好梦！（睡前道别必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场防坑：晚上见面打招呼用 Good evening；准备睡觉道别才用 Good night!'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：It\'s 9 o\'clock. Good night, Mum!'],
  ['w', '九点啦。妈妈晚安！'],
  ['s', 'It\'s 9 o\'clock. Good night, Mum!', '九点啦。妈妈晚安！'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Good night, dear! Sweet dreams!'],
  ['w', '晚安，亲爱的！做个好梦！'],
  ['s', 'Good night, dear! Sweet dreams!', '晚安，亲爱的！做个好梦！'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：Good night!'],
  ['w', '晚安！'],
  ['s', 'Good night!', '晚安！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 问候与告别 · Good night! Sweet dreams!', items: ITEMS, acts: ACTS }); }
