// 💬 日常用语 · 课堂用语 · It's time for class! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC03_2_V5.md
// 角色关键帧：sprites/hdo03_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_2.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：It\'s time for class! （该上课了！（到做某事的时间了））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 必考语法双胞胎：It\'s time for + 名词 ＝ It\'s time to + 动词原形！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Listen! The bell is ringing. It\'s time for English class!'],
  ['w', '听！上课铃响了。该上英语课啦！'],
  ['s', 'Listen! The bell is ringing. It\'s time for English class!', '听！上课铃响了。该上英语课啦！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Hurry up! Let\'s go to the classroom!'],
  ['w', '快点！我们赶紧去教室吧！'],
  ['s', 'Hurry up! Let\'s go to the classroom!', '快点！我们赶紧去教室吧！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 课堂用语 · It\'s time for class!', items: ITEMS, acts: ACTS }); }
