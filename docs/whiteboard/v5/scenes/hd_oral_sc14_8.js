// 💬 日常用语 · 爱好与运动 · Let's count from one to ten! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC14_8_V5.md
// 角色关键帧：sprites/hdo14_8.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo14_8.js';
const ACTS = {"*": ["l_bike0", "l_bike1", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Let\'s count from one to ten! （我们从一数到十吧！（游戏热身口令））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 万能介词搭档：from... to...（从……到……：from one to ten / from morning to night / from school to home）！'],
  ['w', '对话第1轮'],
  ['w', '🧑‍🏫 角色 A：Are you ready for morning exercises? Let\'s count from one to ten!'],
  ['w', '准备好做早操了吗？我们一起从一数到十吧！'],
  ['s', 'Are you ready for morning exercises? Let\'s count from one to ten!', '准备好做早操了吗？我们一起从一数到十吧！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：One, two, three, four, five, six, seven, eight, nine, ten!'],
  ['w', '一、二、三、四、五、六、七、八、九、十！'],
  ['s', 'One, two, three, four, five, six, seven, eight, nine, ten!', '一、二、三、四、五、六、七、八、九、十！'],
  ['w', '对话第3轮'],
  ['w', '🧑‍🏫 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 爱好与运动 · Let\'s count from one to ten!', items: ITEMS, acts: ACTS }); }
