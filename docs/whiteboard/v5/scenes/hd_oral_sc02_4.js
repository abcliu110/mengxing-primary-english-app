// 💬 日常用语 · 感谢与道歉 · After you! — Thank you! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC02_4_V5.md
// 角色关键帧：sprites/hdo02_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo02_4.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：After you! — Thank you! （您先请！（进门/上下楼梯礼让必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 礼貌绅士金句：进门让别人先走说 After you!（字面：跟在您后面＝您先请）'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：After you, Miss White!'],
  ['w', '怀特老师，您先请！'],
  ['s', 'After you, Miss White!', '怀特老师，您先请！'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：Oh, thank you! What a polite boy!'],
  ['w', '噢，谢谢你！真是个有礼貌的男孩！'],
  ['s', 'Oh, thank you! What a polite boy!', '噢，谢谢你！真是个有礼貌的男孩！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That\'s all right.'],
  ['w', '没关系。'],
  ['s', 'That\'s all right.', '没关系。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · After you! — Thank you!', items: ITEMS, acts: ACTS }); }
