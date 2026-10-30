// 🔬 规律 13 · 老复数 -en：oxen、children —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_en_plural.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_EN_PLURAL_1_V5.md
// 角色关键帧：sprites/en1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/en1.js';
const ACTS = {"Look": ["l_point"]};
const ITEMS = [
  ['n', '大多数名词加 s 变复数，可 ox 的复数是 oxen。这是古英语的另一种复数词尾 -en。'],
  ['w', '🔬 规律 13：古英语 -en 复数'],
  ['w', '📜 有出处 ⚠️ 只剩极少几个'],
  ['s', 'Look at the oxen.', '看那些公牛。', 'oxen'],
  ['w', 'ox → oxen'],
  ['n', 'Etymonline 说：oxen 是古英语这种复数唯一一直传到今天的。'],
  ['w', 'oxen：唯一一直传下来的 -en 复数'],
  ['s', 'The children are happy.', '孩子们很开心。', 'children'],
  ['w', 'child → cildru → children（复数又加了一次复数！）'],
  ['n', 'children 很特别：古英语已经有复数 cildru，后来又加上 -en，所以是「双重复数」。'],
  ['w', '⚠️ children = 双重复数'],
  ['n', '出处：Etymonline 的 oxen、child 词条；Wiktionary 同样记载。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 13 · 老复数 -en：oxen、children', items: ITEMS, acts: ACTS }); }
