// 💬 日常用语 · 自我介绍 · I'm ten years old. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 11；对照清单 lab/INVENTORY_HD_ORAL_SC04_11_V5.md
// 角色关键帧：sprites/hdo04_11.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo04_11.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：I\'m ten years old. （我今年十岁了。）'],
  ['w', '💡 交际得体度与母语负迁移提示：介绍自己的年龄。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：How old are you, Wu Binbin?'],
  ['w', '吴斌斌，你几岁了？'],
  ['s', 'How old are you, Wu Binbin?', '吴斌斌，你几岁了？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I\'m ten years old.'],
  ['w', '我十岁了。'],
  ['s', 'I\'m ten years old.', '我十岁了。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：I\'m ten, too!'],
  ['w', '我也十岁！'],
  ['s', 'I\'m ten, too!', '我也十岁！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 自我介绍 · I\'m ten years old.', items: ITEMS, acts: ACTS }); }
