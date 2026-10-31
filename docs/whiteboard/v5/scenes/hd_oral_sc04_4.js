// 💬 日常用语 · 自我介绍 · What are your hobbies? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC04_4_V5.md
// 角色关键帧：sprites/hdo04_4.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo04_4.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：What are your hobbies? （你的业余爱好是什么？（交友必聊））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 爱好语法铁律：表达长期的兴趣爱好时，like / love / enjoy 后面紧跟【动词-ing】（like reading / swimming）！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：What are your hobbies, Zhang Peng?'],
  ['w', '张鹏，你的业余爱好是什么呀？'],
  ['s', 'What are your hobbies, Zhang Peng?', '张鹏，你的业余爱好是什么呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I like playing football and singing English songs!'],
  ['w', '我喜欢踢足球和唱英文歌！'],
  ['s', 'I like playing football and singing English songs!', '我喜欢踢足球和唱英文歌！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 自我介绍 · What are your hobbies?', items: ITEMS, acts: ACTS }); }
