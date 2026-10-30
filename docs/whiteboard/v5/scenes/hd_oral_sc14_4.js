// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · How tall are you? — I'm 1.6 metres. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC14_4_V5.md
// 角色关键帧：sprites/hdo14_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo14_4.js';
const ACTS = {"*": ["l_bike0", "l_bike1", "l_speak"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：How tall are you? — I\'m 1.6 metres. （你有多高？— 我身高一米六。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 身高比较黄金句：How tall are you? ➔ I\'m 1.65 metres. I\'m taller than you!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：How tall are you, Zhang Peng?'],
  ['w', '张鹏，你身高多少呀？'],
  ['s', 'How tall are you, Zhang Peng?', '张鹏，你身高多少呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I\'m 1.65 metres tall. I\'m a little taller than you!'],
  ['w', '我身高1.65米。我比你高一点点哦！'],
  ['s', 'I\'m 1.65 metres tall. I\'m a little taller than you!', '我身高1.65米。我比你高一点点哦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · How tall are you? — I\'m 1.6 metres.', items: ITEMS, acts: ACTS }); }
