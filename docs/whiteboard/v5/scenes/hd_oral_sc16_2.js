// 💬 日常用语 · 赞美与鼓励 · Well done! Good job! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC16_2_V5.md
// 角色关键帧：sprites/hdo16_2.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo16_2.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：Well done! Good job! （干得漂亮！太棒了！（夸奖鼓励必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 夸奖别人三剑客：Well done! (干得好) · Good job! (做得棒) · You\'re super! (你太棒了) ➔ 回答 Thank you!'],
  ['w', '对话第1轮'],
  ['w', '👩‍🏫 角色 A：I finished all the word puzzles, Miss White!'],
  ['w', '怀特老师，我完成了所有的单词拼图！'],
  ['s', 'I finished all the word puzzles, Miss White!', '怀特老师，我完成了所有的单词拼图！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Well done, Amy! You did a really good job!'],
  ['w', '干得漂亮，艾米！你完成得太棒了！'],
  ['s', 'Well done, Amy! You did a really good job!', '干得漂亮，艾米！你完成得太棒了！'],
  ['w', '对话第3轮'],
  ['w', '👩‍🏫 角色 A：Thank you!'],
  ['w', '谢谢你！'],
  ['s', 'Thank you!', '谢谢你！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 赞美与鼓励 · Well done! Good job!', items: ITEMS, acts: ACTS }); }
