// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · How can I get to the hospital? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC08_6_V5.md
// 角色关键帧：sprites/hdo08_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_6.js';
const ACTS = {"*": ["l_lookup", "bus1", "l_think"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：How can I get to the hospital? （我怎么去医院？（问路线必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 问路三大句型：Where is...? (在哪) · How can I get to...? (怎么去) · Which bus goes to...? (坐哪路车)'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Excuse me, how can I get to the People\'s Hospital?'],
  ['w', '劳驾，请问我怎么去人民医院？'],
  ['s', 'Excuse me, how can I get to the People\'s Hospital?', '劳驾，请问我怎么去人民医院？'],
  ['w', '对话第2轮'],
  ['w', '👮 角色 B：Take the No. 12 bus and get off at the hospital stop.'],
  ['w', '乘坐12路公交车，在医院站下车就到啦。'],
  ['s', 'Take the No. 12 bus and get off at the hospital stop.', '乘坐12路公交车，在医院站下车就到啦。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · How can I get to the hospital?', items: ITEMS, acts: ACTS }); }
