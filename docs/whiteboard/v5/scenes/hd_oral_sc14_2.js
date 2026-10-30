// 💬 日常用语 · 爱好与运动 · Please take turns! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC14_2_V5.md
// 角色关键帧：sprites/hdo14_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo14_2.js';
const ACTS = {"*": ["l_bike0", "l_bike1", "l_speak"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Please take turns! （请按顺序轮流来！（游戏与游乐场秩序））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 公共秩序四大金句：Take turns (按顺序轮流) · Keep to the right (靠右行) · Talk quietly (小声说话) · Work quietly!'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Everyone wants to play on the slide. Please take turns!'],
  ['w', '每个人都想玩滑梯。请大家按顺序轮流来哦！'],
  ['s', 'Everyone wants to play on the slide. Please take turns!', '每个人都想玩滑梯。请大家按顺序轮流来哦！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：OK! You go first, and I will go after you.'],
  ['w', '好的！你先滑，我排在你后面。'],
  ['s', 'OK! You go first, and I will go after you.', '好的！你先滑，我排在你后面。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 爱好与运动 · Please take turns!', items: ITEMS, acts: ACTS }); }
