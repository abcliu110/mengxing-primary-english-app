// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What's he like? — He's kind and funny. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC04_5_V5.md
// 角色关键帧：sprites/hdo04_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_5.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：What\'s he like? — He\'s kind and funny. （他是个什么样的人？（问性格外貌必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场极易混三剑客：What\'s he like? (问性格/外貌) · What does he like? (问喜好) · What does he do? (问职业)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：We have a new PE teacher! What\'s he like?'],
  ['w', '我们有一位新体育老师！他是个什么样的人呀？'],
  ['s', 'We have a new PE teacher! What\'s he like?', '我们有一位新体育老师！他是个什么样的人呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：He is tall and strong. And he\'s very kind and funny!'],
  ['w', '他又高又壮，而且既和蔼又风趣！'],
  ['s', 'He is tall and strong. And he\'s very kind and funny!', '他又高又壮，而且既和蔼又风趣！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What\'s he like? — He\'s kind and funny.', items: ITEMS, acts: ACTS }); }
