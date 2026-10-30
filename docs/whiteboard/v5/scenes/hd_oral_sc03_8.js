// 💬 日常用语 · 课堂用语 · Whose book is this? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC03_8_V5.md
// 角色关键帧：sprites/hdo03_8.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_8.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Whose book is this? （这是谁的书？（失物招领必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 区分同音双胞胎：Whose（谁的，问归属）vs Who\'s = Who is（是谁，问身份）！'],
  ['w', '对话第1轮'],
  ['w', '👩‍🏫 角色 A：Whose storybook is this on the teacher\'s desk?'],
  ['w', '讲台上这本故事书是谁的呀？'],
  ['s', 'Whose storybook is this on the teacher\'s desk?', '讲台上这本故事书是谁的呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Oh, it\'s mine! Thank you, Miss White!'],
  ['w', '噢，它是我的！谢谢您，怀特老师！'],
  ['s', 'Oh, it\'s mine! Thank you, Miss White!', '噢，它是我的！谢谢您，怀特老师！'],
  ['w', '对话第3轮'],
  ['w', '👩‍🏫 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 课堂用语 · Whose book is this?', items: ITEMS, acts: ACTS }); }
