// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · I'm in Class Two, Grade Four. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 12；对照清单 lab/INVENTORY_HD_ORAL_SC04_12_V5.md
// 角色关键帧：sprites/hdo04_12.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_12.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：I\'m in Class Two, Grade Four. （我在四年级二班。）'],
  ['w', '💡 交际得体度与母语负迁移提示：班级在前、年级在后。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Which class are you in?'],
  ['w', '你在哪个班？'],
  ['s', 'Which class are you in?', '你在哪个班？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：I\'m in Class Two, Grade Four.'],
  ['w', '我在四年级二班。'],
  ['s', 'I\'m in Class Two, Grade Four.', '我在四年级二班。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：We are in the same grade!'],
  ['w', '我们在同一年级！'],
  ['s', 'We are in the same grade!', '我们在同一年级！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · I\'m in Class Two, Grade Four.', items: ITEMS, acts: ACTS }); }
