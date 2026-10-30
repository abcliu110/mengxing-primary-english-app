// 💬 日常用语 · 问路与交通 · Get on at the Cinema Stop. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC08_9_V5.md
// 角色关键帧：sprites/hdo08_9.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_9.js';
const ACTS = {"*": ["l_point", "bus", "l_speak"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Get on at the Cinema Stop. （在电影院站上车，在公园站下车。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 上下车反义词对：get on the bus/train/subway (上车) ↔ get off (下车)！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：How can we get to the nature park by subway?'],
  ['w', '我们怎么坐地铁去自然公园呀？'],
  ['s', 'How can we get to the nature park by subway?', '我们怎么坐地铁去自然公园呀？'],
  ['w', '对话第2轮'],
  ['w', '👩‍💼 角色 B：Get on at the Cinema Stop, and get off at the Park Stop!'],
  ['w', '在电影院站上车，然后在公园站下车！'],
  ['s', 'Get on at the Cinema Stop, and get off at the Park Stop!', '在电影院站上车，然后在公园站下车！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 问路与交通 · Get on at the Cinema Stop.', items: ITEMS, acts: ACTS }); }
