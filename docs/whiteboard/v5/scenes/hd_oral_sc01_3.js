// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · See you tomorrow! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC01_3_V5.md
// 角色关键帧：sprites/hdo01_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo01_3.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：See you tomorrow! （明天见！（放学道别必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 语序魔法：中文说“明天见”，英文动作放前面说 See you tomorrow！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：School is over! Goodbye, Amy! See you tomorrow!'],
  ['w', '放学啦！再见，艾米！明天见！'],
  ['s', 'School is over! Goodbye, Amy! See you tomorrow!', '放学啦！再见，艾米！明天见！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Bye, John! See you tomorrow!'],
  ['w', '拜拜，约翰！明天见！'],
  ['s', 'Bye, John! See you tomorrow!', '拜拜，约翰！明天见！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Have a nice day!'],
  ['w', '祝你今天愉快！'],
  ['s', 'Have a nice day!', '祝你今天愉快！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · See you tomorrow!', items: ITEMS, acts: ACTS }); }
