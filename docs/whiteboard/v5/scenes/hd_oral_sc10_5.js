// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy New Year! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC10_5_V5.md
// 角色关键帧：sprites/hdo10_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo10_5.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：Happy New Year! （新年快乐！）'],
  ['w', '💡 交际得体度与母语负迁移提示：新年问候。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Happy New Year, Grandma!'],
  ['w', '奶奶，新年快乐！'],
  ['s', 'Happy New Year, Grandma!', '奶奶，新年快乐！'],
  ['w', '对话第2轮'],
  ['w', '👵 角色 B：Happy New Year, dear!'],
  ['w', '新年快乐宝贝！'],
  ['s', 'Happy New Year, dear!', '新年快乐宝贝！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢！'],
  ['s', 'Thank you!', '谢谢！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy New Year!', items: ITEMS, acts: ACTS }); }
