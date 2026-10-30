// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · How old are you? — I'm ten years old. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC04_3_V5.md
// 角色关键帧：sprites/hdo04_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_3.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：How old are you? — I\'m ten years old. （你几岁了？— 我十岁了。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 年龄表达方式：可以说 I\'m ten. 也可以说完整版 I\'m ten years old.（绝不能只说 I\'m ten years ❌）！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Happy birthday, Sam! How old are you now?'],
  ['w', '祝你生日快乐，山姆！你现在几岁啦？'],
  ['s', 'Happy birthday, Sam! How old are you now?', '祝你生日快乐，山姆！你现在几岁啦？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Thank you! I\'m ten years old today!'],
  ['w', '谢谢你！我今天满十岁啦！'],
  ['s', 'Thank you! I\'m ten years old today!', '谢谢你！我今天满十岁啦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · How old are you? — I\'m ten years old.', items: ITEMS, acts: ACTS }); }
