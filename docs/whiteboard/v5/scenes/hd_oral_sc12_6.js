// 💬 日常用语 · 看病与身体不适 · Take a deep breath and count to ten. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC12_6_V5.md
// 角色关键帧：sprites/hdo12_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo12_6.js';
const ACTS = {"*": ["l_plaster", "l_speak", "l_breath"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：Take a deep breath and count to ten. （深呼吸，然后数到十。（平复情绪必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 六年级核心情绪管理金句：If you feel angry, you should take a deep breath and count to ten!'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Mum, my little brother broke my toy car. I\'m so angry!'],
  ['w', '妈妈，小弟弟弄坏了我的玩具车。我好生气呀！'],
  ['s', 'Mum, my little brother broke my toy car. I\'m so angry!', '妈妈，小弟弟弄坏了我的玩具车。我好生气呀！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Calm down, dear. Take a deep breath and count to ten.'],
  ['w', '冷静下来，亲爱的。深呼吸一下，然后从一数到十。'],
  ['s', 'Calm down, dear. Take a deep breath and count to ten.', '冷静下来，亲爱的。深呼吸一下，然后从一数到十。'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · Take a deep breath and count to ten.', items: ITEMS, acts: ACTS }); }
