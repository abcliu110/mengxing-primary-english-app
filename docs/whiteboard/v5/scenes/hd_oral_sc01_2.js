// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · How are you? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC01_2_V5.md
// 角色关键帧：sprites/hdo01_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo01_2.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：How are you? （你好吗？/ 你最近怎么样？（熟人问候））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 熟人见面三连击：How are you? ➔ I\'m fine, thank you. ➔ And you?'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Good morning, Mike! How are you today?'],
  ['w', '早上好，迈克！你今天好吗？'],
  ['s', 'Good morning, Mike! How are you today?', '早上好，迈克！你今天好吗？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I\'m fine, thank you! And you?'],
  ['w', '我很好，谢谢你！你呢？'],
  ['s', 'I\'m fine, thank you! And you?', '我很好，谢谢你！你呢？'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Have a nice day!'],
  ['w', '祝你今天愉快！'],
  ['s', 'Have a nice day!', '祝你今天愉快！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · How are you?', items: ITEMS, acts: ACTS }); }
