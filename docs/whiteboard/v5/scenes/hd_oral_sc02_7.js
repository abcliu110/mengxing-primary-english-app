// 💬 日常用语 · 感谢与道歉 · My pleasure. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC02_7_V5.md
// 角色关键帧：sprites/hdo02_7.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo02_7.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：My pleasure. （我的荣幸（不客气）。）'],
  ['w', '💡 交际得体度与母语负迁移提示：礼貌回应感谢。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Thank you for helping me.'],
  ['w', '谢谢你帮我。'],
  ['s', 'Thank you for helping me.', '谢谢你帮我。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：My pleasure!'],
  ['w', '我的荣幸！'],
  ['s', 'My pleasure!', '我的荣幸！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · My pleasure.', items: ITEMS, acts: ACTS }); }
