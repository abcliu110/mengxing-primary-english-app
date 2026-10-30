// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Keep to the right, please! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC14_3_V5.md
// 角色关键帧：sprites/hdo14_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo14_3.js';
const ACTS = {"*": ["kick0", "kick1", "l_laugh"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Keep to the right, please! （请靠右通行！（走廊与楼梯安全规则））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 方向名词活用：the right (右边) ↔ the left (左边)，走在哪一侧用 Keep to the right/left!'],
  ['w', '对话第1轮'],
  ['w', '👩‍🏫 角色 A：Don\'t run on the stairs, children! Keep to the right, please!'],
  ['w', '孩子们，不要在楼梯上跑！请靠右通行！'],
  ['s', 'Don\'t run on the stairs, children! Keep to the right, please!', '孩子们，不要在楼梯上跑！请靠右通行！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Yes, Miss White! Safety comes first!'],
  ['w', '好的，怀特老师！安全第一！'],
  ['s', 'Yes, Miss White! Safety comes first!', '好的，怀特老师！安全第一！'],
  ['w', '对话第3轮'],
  ['w', '👩‍🏫 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Keep to the right, please!', items: ITEMS, acts: ACTS }); }
