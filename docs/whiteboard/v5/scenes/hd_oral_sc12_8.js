// 💬 日常用语 · 看病与身体不适 · Have a good rest and get well soon! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC12_8_V5.md
// 角色关键帧：sprites/hdo12_8.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo12_8.js';
const ACTS = {"*": ["l_plaster", "l_speak", "l_breath"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：Have a good rest and get well soon! （好好休息，祝你早日康复！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 探病祝福王牌：Get well soon!（祝你早日康复！这里的 well 是形容词“身体健康的”）'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Here are some apples and flowers for you. Have a good rest and get well soon!'],
  ['w', '这是给你带的一些苹果和鲜花。好好休息，祝你早日康复！'],
  ['s', 'Here are some apples and flowers for you. Have a good rest and get well soon!', '这是给你带的一些苹果和鲜花。好好休息，祝你早日康复！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Thank you so much, Mike! I feel much happier now!'],
  ['w', '太感谢你了，迈克！我现在心情好多了！'],
  ['s', 'Thank you so much, Mike! I feel much happier now!', '太感谢你了，迈克！我现在心情好多了！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · Have a good rest and get well soon!', items: ITEMS, acts: ACTS }); }
