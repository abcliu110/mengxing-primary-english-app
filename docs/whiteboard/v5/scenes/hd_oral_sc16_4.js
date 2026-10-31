// 💬 日常用语 · 赞美与鼓励 · You are a great team player! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC16_4_V5.md
// 角色关键帧：sprites/hdo16_4.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo16_4.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：You are a great team player! （你真是一名出色的团队伙伴！（合作赞美））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 团队合作满分金句：High five! (击掌庆祝) · Good teamwork! (配合得好) · You\'re a great team player!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Thanks for passing the ball to me, John! We scored a goal!'],
  ['w', '谢谢你把球传给我，约翰！我们进球得分啦！'],
  ['s', 'Thanks for passing the ball to me, John! We scored a goal!', '谢谢你把球传给我，约翰！我们进球得分啦！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：High five! You are a great team player! Teamwork makes the dream work!'],
  ['w', '击掌庆祝！你真是个超棒的团队好队友！团结合作让梦想成真！'],
  ['s', 'High five! You are a great team player! Teamwork makes the dream work!', '击掌庆祝！你真是个超棒的团队好队友！团结合作让梦想成真！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢你！'],
  ['s', 'Thank you!', '谢谢你！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 赞美与鼓励 · You are a great team player!', items: ITEMS, acts: ACTS }); }
