// 💬 日常用语 · 问候与告别 · How is it going? — Pretty good! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC01_7_V5.md
// 角色关键帧：sprites/hdo01_7.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo01_7.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：How is it going? — Pretty good! （最近进展怎么样？— 挺好的！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 地道口语升级：用 How\'s it going? 问近况，回答 Pretty good! / Great!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hey, John! How is it going?'],
  ['w', '嘿，约翰！最近怎么样呀？'],
  ['s', 'Hey, John! How is it going?', '嘿，约翰！最近怎么样呀？'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Pretty good! I learned a new English song!'],
  ['w', '挺好的！我学会了一首新英文歌！'],
  ['s', 'Pretty good! I learned a new English song!', '挺好的！我学会了一首新英文歌！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Have a nice day!'],
  ['w', '祝你今天愉快！'],
  ['s', 'Have a nice day!', '祝你今天愉快！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问候与告别 · How is it going? — Pretty good!', items: ITEMS, acts: ACTS }); }
