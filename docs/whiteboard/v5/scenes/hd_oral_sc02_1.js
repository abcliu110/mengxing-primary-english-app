// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · Thank you! — You're welcome. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC02_1_V5.md
// 角色关键帧：sprites/hdo02_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo02_1.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：Thank you! — You\'re welcome. （谢谢你！— 不用谢 / 别客气。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 礼貌满分口诀：听到 Thank you 别发呆，You\'re welcome 脱口来！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Here is a birthday gift for you!'],
  ['w', '这是送给你的生日礼物！'],
  ['s', 'Here is a birthday gift for you!', '这是送给你的生日礼物！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Wow, thank you very much!'],
  ['w', '哇，非常感谢你！'],
  ['s', 'Wow, thank you very much!', '哇，非常感谢你！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：You\'re welcome!'],
  ['w', '不客气！'],
  ['s', 'You\'re welcome!', '不客气！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · Thank you! — You\'re welcome.', items: ITEMS, acts: ACTS }); }
