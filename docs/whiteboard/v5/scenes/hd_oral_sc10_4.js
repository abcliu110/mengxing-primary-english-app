// 💬 日常用语 · 节日与祝福 · Happy Birthday to you! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC10_4_V5.md
// 角色关键帧：sprites/hdo10_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo10_4.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：Happy Birthday to you! （祝你生日快乐！）'],
  ['w', '💡 交际得体度与母语负迁移提示：生日祝福语。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Happy Birthday to you! Here\'s a gift.'],
  ['w', '祝你生日快乐！这是礼物。'],
  ['s', 'Happy Birthday to you! Here\'s a gift.', '祝你生日快乐！这是礼物。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Wow, thank you!'],
  ['w', '哇，谢谢你！'],
  ['s', 'Wow, thank you!', '哇，谢谢你！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Let\'s eat the cake!'],
  ['w', '我们吃蛋糕吧！'],
  ['s', 'Let\'s eat the cake!', '我们吃蛋糕吧！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 节日与祝福 · Happy Birthday to you!', items: ITEMS, acts: ACTS }); }
