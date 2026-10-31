// 💬 日常用语 · 爱好与运动 · Whose turn is it now? — It's my turn! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC14_9_V5.md
// 角色关键帧：sprites/hdo14_9.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo14_9.js';
const ACTS = {"*": ["kick0", "kick1", "l_laugh"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Whose turn is it now? — It\'s my turn! （现在轮到谁了？— 轮到我啦！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 轮流做某事句型：Whose turn is it? (轮到谁了) ➔ It\'s my turn! (轮到我了) / It\'s your turn! (该你了)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Whose turn is it to roll the dice now?'],
  ['w', '现在轮到谁掷骰子啦？'],
  ['s', 'Whose turn is it to roll the dice now?', '现在轮到谁掷骰子啦？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：It\'s my turn! Watch me get a six!'],
  ['w', '轮到我啦！看我掷出一个六点！'],
  ['s', 'It\'s my turn! Watch me get a six!', '轮到我啦！看我掷出一个六点！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 爱好与运动 · Whose turn is it now? — It\'s my turn!', items: ITEMS, acts: ACTS }); }
