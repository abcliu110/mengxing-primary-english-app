// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · I'm sorry I'm late. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC02_8_V5.md
// 角色关键帧：sprites/hdo02_8.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo02_8.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：I\'m sorry I\'m late. （对不起，我迟到了。）'],
  ['w', '💡 交际得体度与母语负迁移提示：进教室迟到时的致歉语。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I\'m sorry I\'m late, Miss White.'],
  ['w', '对不起怀特老师，我迟到了。'],
  ['s', 'I\'m sorry I\'m late, Miss White.', '对不起怀特老师，我迟到了。'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：That\'s all right. Come in, please.'],
  ['w', '没关系，请进。'],
  ['s', 'That\'s all right. Come in, please.', '没关系，请进。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · I\'m sorry I\'m late.', items: ITEMS, acts: ACTS }); }
