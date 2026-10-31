// 💬 日常用语 · 问路与交通 · Go straight and turn left. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC08_2_V5.md
// 角色关键帧：sprites/hdo08_2.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo08_2.js';
const ACTS = {"*": ["l_lookup", "bus1", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Go straight and turn left. （一直往前走，然后向左转。（指路必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 指路三大黄金口令：Go straight（直走）· Turn left（左转）· Turn right（右转）'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Excuse me, how can I get to the science museum?'],
  ['w', '打扰一下，请问我怎么去科学博物馆？'],
  ['s', 'Excuse me, how can I get to the science museum?', '打扰一下，请问我怎么去科学博物馆？'],
  ['w', '对话第2轮'],
  ['w', '🧑‍✈️ 角色 B：Go straight for five minutes, and then turn left at the hospital!'],
  ['w', '一直往前走五分钟，然后在医院那里向左转就到啦！'],
  ['s', 'Go straight for five minutes, and then turn left at the hospital!', '一直往前走五分钟，然后在医院那里向左转就到啦！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问路与交通 · Go straight and turn left.', items: ITEMS, acts: ACTS }); }
