// 💬 日常用语 · 课堂用语 · Put up your hand! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC03_6_V5.md
// 角色关键帧：sprites/hdo03_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo03_6.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Put up your hand! （请举手！（课堂发言规则））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 课堂指令反义词对：Put up your hand (举手) ↔ Put down your hand (把手放下)'],
  ['w', '对话第1轮'],
  ['w', '👨‍🏫 角色 A：Who knows the answer? Put up your hand, please!'],
  ['w', '谁知道答案？请举起你的手！'],
  ['s', 'Who knows the answer? Put up your hand, please!', '谁知道答案？请举起你的手！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Me, Mr Li! I know the answer!'],
  ['w', '我，李老师！我知道答案！'],
  ['s', 'Me, Mr Li! I know the answer!', '我，李老师！我知道答案！'],
  ['w', '对话第3轮'],
  ['w', '👨‍🏫 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 课堂用语 · Put up your hand!', items: ITEMS, acts: ACTS }); }
