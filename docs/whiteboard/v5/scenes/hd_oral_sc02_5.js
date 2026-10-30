// 💬 日常用语 · 感谢与道歉 · Welcome to our school! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC02_5_V5.md
// 角色关键帧：sprites/hdo02_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo02_5.js';
const ACTS = {"*": ["hello", "l_wave", "l_speak"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：Welcome to our school! （欢迎来到我们学校！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 欢迎句型铁律：Welcome to + 名词地点（Welcome to China/our school），但 Welcome home 不加 to！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Welcome to our school! Let me show you around.'],
  ['w', '欢迎来到我们学校！让我带您四处参观一下吧。'],
  ['s', 'Welcome to our school! Let me show you around.', '欢迎来到我们学校！让我带您四处参观一下吧。'],
  ['w', '对话第2轮'],
  ['w', '🧑 角色 B：Thank you! Your school is so big and beautiful!'],
  ['w', '谢谢你！你们的学校又大又漂亮！'],
  ['s', 'Thank you! Your school is so big and beautiful!', '谢谢你！你们的学校又大又漂亮！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：That\'s all right.'],
  ['w', '没关系。'],
  ['s', 'That\'s all right.', '没关系。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · Welcome to our school!', items: ITEMS, acts: ACTS }); }
