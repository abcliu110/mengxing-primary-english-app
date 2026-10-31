// 💬 日常用语 · 问候与告别 · Good afternoon! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC01_5_V5.md
// 角色关键帧：sprites/hdo01_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo01_5.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：Good afternoon! （下午好！（午后见面问候））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 下午问候金律：中午12点到傍晚6点之间见面说 Good afternoon!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Good afternoon, Sarah!'],
  ['w', '下午好，萨拉！'],
  ['s', 'Good afternoon, Sarah!', '下午好，萨拉！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Good afternoon, Mike! Let\'s go to the library.'],
  ['w', '下午好，迈克！我们去图书馆吧。'],
  ['s', 'Good afternoon, Mike! Let\'s go to the library.', '下午好，迈克！我们去图书馆吧。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Have a nice day!'],
  ['w', '祝你今天愉快！'],
  ['s', 'Have a nice day!', '祝你今天愉快！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问候与告别 · Good afternoon!', items: ITEMS, acts: ACTS }); }
