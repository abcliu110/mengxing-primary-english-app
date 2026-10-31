// 💬 日常用语 · 问路与交通 · Take the No. 5 bus over there. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC08_8_V5.md
// 角色关键帧：sprites/hdo08_8.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo08_8.js';
const ACTS = {"*": ["l_lookup", "bus1", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Take the No. 5 bus over there. （去那边乘坐5路公交车。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场高频转换：You can take a bus there. ＝ You can go there by bus.（take 是动词，by 是介词）！'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：Can I go to the science museum on foot?'],
  ['w', '我可以步行去科学博物馆吗？'],
  ['s', 'Can I go to the science museum on foot?', '我可以步行去科学博物馆吗？'],
  ['w', '对话第2轮'],
  ['w', '👨 角色 B：It\'s a bit far. You can take the No. 5 bus over there.'],
  ['w', '稍微有点远。你可以去那边乘坐5路公交车。'],
  ['s', 'It\'s a bit far. You can take the No. 5 bus over there.', '稍微有点远。你可以去那边乘坐5路公交车。'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 问路与交通 · Take the No. 5 bus over there.', items: ITEMS, acts: ACTS }); }
