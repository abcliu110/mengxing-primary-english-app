// 💬 日常用语 · 感谢与道歉 · I'm sorry. — That's OK! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC02_2_V5.md
// 角色关键帧：sprites/hdo02_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo02_2.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：I\'m sorry. — That\'s OK! （对不起。— 没关系！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场防坑铁律：Thank you ➔ You\'re welcome；I\'m sorry ➔ That\'s OK!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I\'m sorry, Miss White. I tripped and dropped the books.'],
  ['w', '对不起，怀特老师。我绊了一下把书弄掉了。'],
  ['s', 'I\'m sorry, Miss White. I tripped and dropped the books.', '对不起，怀特老师。我绊了一下把书弄掉了。'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：That\'s OK! Let me help you pick them up.'],
  ['w', '没关系！我来帮你把它们捡起来吧。'],
  ['s', 'That\'s OK! Let me help you pick them up.', '没关系！我来帮你把它们捡起来吧。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That\'s all right.'],
  ['w', '没关系。'],
  ['s', 'That\'s all right.', '没关系。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · I\'m sorry. — That\'s OK!', items: ITEMS, acts: ACTS }); }
