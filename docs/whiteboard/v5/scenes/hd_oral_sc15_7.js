// 💬 日常用语 · 居家与家务 · What are you doing? — I'm reading. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC15_7_V5.md
// 角色关键帧：sprites/hdo15_7.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_7.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：What are you doing? — I\'m reading. （你正在干什么？— 我正在看书。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 现在进行时问答铁律：问句 What are you doing? ➔ 答句必须配 am/is/are + V-ing！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hi, Amy! What are you doing in the study?'],
  ['w', '嗨，艾米！你正在书房里干什么呢？'],
  ['s', 'Hi, Amy! What are you doing in the study?', '嗨，艾米！你正在书房里干什么呢？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I\'m reading a very interesting storybook!'],
  ['w', '我正在读一本非常有趣的故事书！'],
  ['s', 'I\'m reading a very interesting storybook!', '我正在读一本非常有趣的故事书！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 居家与家务 · What are you doing? — I\'m reading.', items: ITEMS, acts: ACTS }); }
