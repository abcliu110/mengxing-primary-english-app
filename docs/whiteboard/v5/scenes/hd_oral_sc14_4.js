// 💬 日常用语 · 爱好与运动 · How tall are you? — I'm 1.6 metres. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC14_4_V5.md
// 角色关键帧：sprites/hdo14_4.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo14_4.js';
const ACTS = {"*": ["l_bike0", "l_bike1", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
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
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 爱好与运动 · How tall are you? — I\'m 1.6 metres.', items: ITEMS, acts: ACTS }); }
