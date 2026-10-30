// 🦉 疑问词词源雷达 · 第3幕 疑问词冲到句首 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_interrogatives.js 案例 3；对照清单 lab/INVENTORY_HD_SUM_INTERROGATIVES_3_V5.md
// 角色关键帧：sprites/hdsint3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdsint3.js';
const ACTS = {"*": ["l_speak", "l_idea0", "l_hand0"]};
const ITEMS = [
  ['w', '疑问词词源雷达'],
  ['w', '古英语 wh-(提问头) ↔ th-(远指回答头) ↔ h-(近指头) 完美对称：where↔there↔here, when↔then'],
  ['w', '看中央实验台：旋转词头密码锁，一眼看懂 9 大疑问词的造词规律与句首倒装语序！'],
  ['w', '🔬 汉英语序反转：汉语疑问词留句尾 vs 英语疑问词冲到句首当火车头'],
  ['w', '🇨🇳 汉语疑问词留在句尾原位：你 住在 【哪里 (where)】？'],
  ['w', '🇬🇧 英语疑问词 100% 提拔到句首当火车头 + 一般疑问倒装：'],
  ['w', '🚂 [Where (句首车头)] + [do (助动词)] + [you live] ?'],
  ['w', '疑问第3幕'],
  ['s', 'Where is it? Over there! Whose bag is this? It\'s mine.', 'where/there/here 共享地点词根 -ere；when/then 共享时间词根 -en；what/that 共享事物词根 -at！']
];
export default function build() { return autoBuild(SP, { title: '🦉 疑问词词源雷达 · 第3幕 疑问词冲到句首', items: ITEMS, acts: ACTS }); }
