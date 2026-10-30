// 💬 日常用语 · 天气与闲聊 · What day is it today? — It's Friday. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC09_6_V5.md
// 角色关键帧：sprites/hdo09_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo09_6.js';
const ACTS = {"*": ["l_lookup", "sunny", "l_laugh"]};
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
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · What day is it today? — It\'s Friday.', items: ITEMS, acts: ACTS }); }
