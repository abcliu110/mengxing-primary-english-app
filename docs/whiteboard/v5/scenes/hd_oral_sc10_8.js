// 💬 日常用语 · 节日与祝福 · The same to you! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC10_8_V5.md
// 角色关键帧：sprites/hdo10_8.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo10_8.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：The same to you! （你也一样！（同喜同乐））'],
  ['w', '💡 交际得体度与母语负迁移提示：回应节日或周末祝福。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Have a nice weekend, Mike!'],
  ['w', '祝你周末愉快！'],
  ['s', 'Have a nice weekend, Mike!', '祝你周末愉快！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Thank you! The same to you!'],
  ['w', '谢谢！你也一样！'],
  ['s', 'Thank you! The same to you!', '谢谢！你也一样！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 节日与祝福 · The same to you!', items: ITEMS, acts: ACTS }); }
