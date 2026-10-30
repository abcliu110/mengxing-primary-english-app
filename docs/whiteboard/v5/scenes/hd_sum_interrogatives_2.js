// 🦉 疑问词词源雷达 · 第2幕 Who / Whose / Which 精准靶心 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_interrogatives.js 案例 2；对照清单 lab/INVENTORY_HD_SUM_INTERROGATIVES_2_V5.md
// 角色关键帧：sprites/hdsint2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdsint2.js';
const ACTS = {"*": ["l_bag0", "l_bag1", "l_think"]};
const ITEMS = [
  ['w', '疑问词词源雷达'],
  ['w', '古英语 wh-(提问头) ↔ th-(远指回答头) ↔ h-(近指头) 完美对称：where↔there↔here, when↔then'],
  ['w', '看中央实验台：旋转词头密码锁，一眼看懂 9 大疑问词的造词规律与句首倒装语序！'],
  ['w', '🔬 精准靶心：Who(人) vs Whose(谁的包) vs Which(有限范围二选一)'],
  ['w', '🧒'],
  ['w', 'Who (问人身份)'],
  ['w', 'Who is he? — Mike.'],
  ['w', '🎒🏷️'],
  ['w', 'Whose (问所属主人)'],
  ['w', 'Whose bag? — Mine.'],
  ['w', '🍎🍏'],
  ['w', 'Which (有范围挑选)'],
  ['w', 'Which one, red or green?'],
  ['w', '疑问第2幕'],
  ['s', 'Where is it? Over there! Whose bag is this? It\'s mine.', 'where/there/here 共享地点词根 -ere；when/then 共享时间词根 -en；what/that 共享事物词根 -at！']
];
export default function build() { return autoBuild(SP, { title: '🦉 疑问词词源雷达 · 第2幕 Who / Whose / Which 精准靶心', items: ITEMS, acts: ACTS }); }
