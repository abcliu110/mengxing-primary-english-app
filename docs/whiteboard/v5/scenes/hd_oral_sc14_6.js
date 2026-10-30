// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Practice makes perfect! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC14_6_V5.md
// 角色关键帧：sprites/hdo14_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo14_6.js';
const ACTS = {"*": ["l_bike0", "l_bike1", "l_speak"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Practice makes perfect! （熟能生巧！（鼓励坚持练习的黄金谚语））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 小学必背三大谚语：① Practice makes perfect (熟能生巧) · ② An apple a day keeps the doctor away · ③ No pain, no gain!'],
  ['w', '对话第1轮'],
  ['w', '🧑‍🏫 角色 A：Coach, I still can\'t play basketball well.'],
  ['w', '教练，我篮球还是打得不够好。'],
  ['s', 'Coach, I still can\'t play basketball well.', '教练，我篮球还是打得不够好。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Don\'t give up, Mike! Practice makes perfect!'],
  ['w', '别放弃，迈克！熟能生巧，多练就完美啦！'],
  ['s', 'Don\'t give up, Mike! Practice makes perfect!', '别放弃，迈克！熟能生巧，多练就完美啦！'],
  ['w', '对话第3轮'],
  ['w', '🧑‍🏫 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Practice makes perfect!', items: ITEMS, acts: ACTS }); }
