// 💬 日常用语 · 课堂用语 · Let's clean the classroom! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 11；对照清单 lab/INVENTORY_HD_ORAL_SC03_11_V5.md
// 角色关键帧：sprites/hdo03_11.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_11.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Let\'s clean the classroom! （我们一起来打扫教室吧！（班级大扫除））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场必辨双子星：Let\'s (= Let us 咱们大家一起做) ↔ Let me (让我自己一个人做，自告奋勇分工)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Let\'s clean the classroom together!'],
  ['w', '我们一起来打扫教室吧！'],
  ['s', 'Let\'s clean the classroom together!', '我们一起来打扫教室吧！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：OK! Let me clean the blackboard and windows!'],
  ['w', '好呀！让我来擦黑板和窗户吧！'],
  ['s', 'OK! Let me clean the blackboard and windows!', '好呀！让我来擦黑板和窗户吧！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 课堂用语 · Let\'s clean the classroom!', items: ITEMS, acts: ACTS }); }
