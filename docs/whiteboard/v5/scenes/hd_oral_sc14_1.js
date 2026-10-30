// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Cheer up! You can do it! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC14_1_V5.md
// 角色关键帧：sprites/hdo14_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo14_1.js';
const ACTS = {"*": ["kick0", "kick1", "l_laugh"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Cheer up! You can do it! （振作起来（加油）！你能行的！（鼓励伙伴必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 正能量加油三剑客：Cheer up!（振作起来）· Come on!（加油）· You can do it!（你能行的）'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I didn\'t pass the basketball test today. I feel so sad.'],
  ['w', '我今天篮球测试没通过，我感觉好难过。'],
  ['s', 'I didn\'t pass the basketball test today. I feel so sad.', '我今天篮球测试没通过，我感觉好难过。'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Cheer up, Mike! Practice makes perfect. You can do it next time!'],
  ['w', '振作起来，迈克！熟能生巧，下次你一定能行的！'],
  ['s', 'Cheer up, Mike! Practice makes perfect. You can do it next time!', '振作起来，迈克！熟能生巧，下次你一定能行的！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Cheer up! You can do it!', items: ITEMS, acts: ACTS }); }
