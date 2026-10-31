// 💬 日常用语 · 感谢与道歉 · Thank you! — You're welcome. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC02_1_V5.md
// 角色关键帧：sprites/hdo02_1.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo02_1.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
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
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · Thank you! — You\'re welcome.', items: ITEMS, acts: ACTS }); }
