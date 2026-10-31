// 💬 日常用语 · 问路与交通 · How can I get to the hospital? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC08_6_V5.md
// 角色关键帧：sprites/hdo08_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo08_6.js';
const ACTS = {"*": ["l_lookup", "bus1", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
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
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问路与交通 · How can I get to the hospital?', items: ITEMS, acts: ACTS }); }
