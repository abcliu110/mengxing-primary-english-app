// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · How do you come to school? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC08_3_V5.md
// 角色关键帧：sprites/hdo08_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_3.js';
const ACTS = {"*": ["l_point", "bus", "l_speak"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：How do you come to school? （你是怎么来上学的？（询问交通方式必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 必考介词铁律：乘车乘船用 by + 交通工具（不加 the）；步行用 on foot！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hi, Amy! How do you come to school every day?'],
  ['w', '嗨，艾米！你每天是怎么来上学的呀？'],
  ['s', 'Hi, Amy! How do you come to school every day?', '嗨，艾米！你每天是怎么来上学的呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：My home is near, so I usually come on foot. What about you? — I come by bus!'],
  ['w', '我家很近，所以我通常步行来。你呢？ — 我坐公交车来！'],
  ['s', 'My home is near, so I usually come on foot. What about you? — I come by bus!', '我家很近，所以我通常步行来。你呢？ — 我坐公交车来！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · How do you come to school?', items: ITEMS, acts: ACTS }); }
