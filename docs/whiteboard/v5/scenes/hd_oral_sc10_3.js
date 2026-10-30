// 💬 日常用语 · 节日与祝福 · When is your birthday? — On May 1st. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC10_3_V5.md
// 角色关键帧：sprites/hdo10_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo10_3.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：When is your birthday? — On May 1st. （你的生日在什么时候？— 在五月一日。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 时间介词变身术：in May（在五月，大月份用 in） ➔ on May 1st（在五月一日，具体到某一天必用 on）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：When is your birthday, Mike?'],
  ['w', '迈克，你的生日在什么时候呀？'],
  ['s', 'When is your birthday, Mike?', '迈克，你的生日在什么时候呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：My birthday is on May 1st. Come to my birthday party!'],
  ['w', '我的生日在五月一日。来参加我的生日派对吧！'],
  ['s', 'My birthday is on May 1st. Come to my birthday party!', '我的生日在五月一日。来参加我的生日派对吧！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you! The same to you!'],
  ['w', '谢谢！你也一样！'],
  ['s', 'Thank you! The same to you!', '谢谢！你也一样！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 节日与祝福 · When is your birthday? — On May 1st.', items: ITEMS, acts: ACTS }); }
