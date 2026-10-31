// 💬 日常用语 · 问候与告别 · Nice to meet you! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc01.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC01_1_V5.md
// 角色关键帧：sprites/hdo01_1.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo01_1.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"], "A": ["l_speak", "l_ear", "l_wave"], "B": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '问候与告别'],
  ['w', '核心交际句：Nice to meet you! （很高兴认识你！（初次见面必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 初次见面黄金法则：听到 Nice to meet you，句尾加 too 秒回！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hi! I\'m Wu Binbin. Nice to meet you!'],
  ['w', '你好！我是吴斌斌。很高兴认识你！'],
  ['s', 'Hi! I\'m Wu Binbin. Nice to meet you!', '你好！我是吴斌斌。很高兴认识你！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Hi! I\'m Sarah. Nice to meet you, too!'],
  ['w', '你好！我是萨拉。我也很高兴认识你！'],
  ['s', 'Hi! I\'m Sarah. Nice to meet you, too!', '你好！我是萨拉。我也很高兴认识你！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Have a nice day!'],
  ['w', '祝你今天愉快！'],
  ['s', 'Have a nice day!', '祝你今天愉快！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问候与告别 · Nice to meet you!', items: ITEMS, acts: ACTS }); }
