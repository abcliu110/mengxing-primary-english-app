// 💬 日常用语 · 天气与闲聊 · What day is it today? — It's Friday. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC09_6_V5.md
// 角色关键帧：sprites/hdo09_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo09_6.js';
const ACTS = {"*": ["l_lookup", "sunny", "l_laugh"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：What day is it today? — It\'s Friday. （今天星期几？— 今天星期五。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 时间三问精准区分：What day (问星期几) · What date (问几月几号) · What time (问几点几分)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：What day is it today, John?'],
  ['w', '约翰，今天是星期几呀？'],
  ['s', 'What day is it today, John?', '约翰，今天是星期几呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：It\'s Friday! Tomorrow is the weekend!'],
  ['w', '今天是星期五！明天就是周末啦！'],
  ['s', 'It\'s Friday! Tomorrow is the weekend!', '今天是星期五！明天就是周末啦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · What day is it today? — It\'s Friday.', items: ITEMS, acts: ACTS }); }
