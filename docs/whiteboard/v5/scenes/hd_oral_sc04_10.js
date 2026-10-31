// 💬 日常用语 · 自我介绍 · Hello, my name is Chen Jie. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC04_10_V5.md
// 角色关键帧：sprites/hdo04_10.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo04_10.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：Hello, my name is Chen Jie. （你好，我的名字叫陈洁。）'],
  ['w', '💡 交际得体度与母语负迁移提示：正式自我介绍。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Hello, my name is Chen Jie. What\'s your name?'],
  ['w', '你好，我叫陈洁。你叫什么名字？'],
  ['s', 'Hello, my name is Chen Jie. What\'s your name?', '你好，我叫陈洁。你叫什么名字？'],
  ['w', '对话第2轮'],
  ['w', '👱‍♀️ 角色 B：Hi! My name is Sarah.'],
  ['w', '嗨！我叫萨拉。'],
  ['s', 'Hi! My name is Sarah.', '嗨！我叫萨拉。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Nice to meet you!'],
  ['w', '很高兴认识你！'],
  ['s', 'Nice to meet you!', '很高兴认识你！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 自我介绍 · Hello, my name is Chen Jie.', items: ITEMS, acts: ACTS }); }
