// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Work quietly in the library! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC03_10_V5.md
// 角色关键帧：sprites/hdo03_10.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_10.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Work quietly in the library! （在图书馆里要安静学习！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 形容词与副词分工：Be quiet!（be动词后用形容词）↔ Work quietly!（实义动词后用副词 -ly）'],
  ['w', '对话第1轮'],
  ['w', '👩‍💼 角色 A：Shh! Talk quietly and work quietly in the library.'],
  ['w', '嘘！在图书馆里请小声说话、安静学习。'],
  ['s', 'Shh! Talk quietly and work quietly in the library.', '嘘！在图书馆里请小声说话、安静学习。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Sorry! I will read quietly.'],
  ['w', '对不起！我会安安静静地看书的。'],
  ['s', 'Sorry! I will read quietly.', '对不起！我会安安静静地看书的。'],
  ['w', '对话第3轮'],
  ['w', '👩‍💼 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Work quietly in the library!', items: ITEMS, acts: ACTS }); }
