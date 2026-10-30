// 🔬 规律 7 · 诺曼法语的 w，巴黎法语的 g —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_norman.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_NORMAN_1_V5.md
// 角色关键帧：sprites/nm1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/nm1.js';
const ACTS = {"guard": ["l_stand"]};
const ITEMS = [
  ['n', '1066 年诺曼人来到英国。诺曼人说的北部法语保留了日耳曼语来的 w，其他地方的古法语却把 w 变成了 g。于是英语里出现了一对对 w 词和 g 词。'],
  ['w', '🔬 规律 7：诺曼法语 w ↔ 法语 g'],
  ['w', '📜 有出处 ⚠️ 一对词，意思分了家'],
  ['n', '第一对：war 战争。它来自古北部法语 werre，古法语是 guerre。'],
  ['w', 'war ← 古北部法语 werre ↔ 法语 guerre'],
  ['s', 'The soldiers guard the castle.', '士兵守卫城堡。', 'guard'],
  ['w', 'ward（看守）↔ guard（守卫）'],
  ['w', 'guardian 守护者 ← 古法语 gardien ← 法兰克语 *warding-'],
  ['n', 'wardrobe 衣柜也是 w 这一边来的：原来的意思是「看守衣服的地方」。'],
  ['w', 'wardrobe ← 古北部法语 warderobe（warder 看守 + robe 衣服）'],
  ['n', '出处：Etymonline 和 Wiktionary 都写了这些词的来路。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 7 · 诺曼法语的 w，巴黎法语的 g', items: ITEMS, acts: ACTS }); }
