// 💬 日常用语 · 打电话 · Hello! This is Wu Binbin speaking. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc11.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC11_1_V5.md
// 角色关键帧：sprites/hdo11_1.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo11_1.js';
const ACTS = {"*": ["l_speak", "l_ear", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '打电话'],
  ['w', '核心交际句：Hello! This is Wu Binbin speaking. （喂，你好！我是吴斌斌。（打电话自报家门））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 电话用语头号铁律：电话里“我是…”用 This is...；“你是谁？”用 Who\'s that?（绝不用 I am / Who are you）！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hello! This is Wu Binbin speaking. May I speak to Sarah?'],
  ['w', '喂，你好！我是吴斌斌。请问我可以和萨拉通话吗？'],
  ['s', 'Hello! This is Wu Binbin speaking. May I speak to Sarah?', '喂，你好！我是吴斌斌。请问我可以和萨拉通话吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Hi, Binbin! This is Sarah speaking!'],
  ['w', '嗨，斌斌！我就是萨拉！'],
  ['s', 'Hi, Binbin! This is Sarah speaking!', '嗨，斌斌！我就是萨拉！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thanks. I\'ll call later.'],
  ['w', '谢谢，我稍后再打。'],
  ['s', 'Thanks. I\'ll call later.', '谢谢，我稍后再打。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 打电话 · Hello! This is Wu Binbin speaking.', items: ITEMS, acts: ACTS }); }
