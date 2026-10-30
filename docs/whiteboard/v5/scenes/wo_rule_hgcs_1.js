// 🔬 规律 5 · 英语和德语：t 对 z、p 对 pf —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_hgcs.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_HGCS_1_V5.md
// 角色关键帧：sprites/hg1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hg1.js';
const ACTS = {"Drink": ["l_drink"]};
const ITEMS = [
  ['n', '英语和德语是近亲。可德语后来又自己变了一次辅音，所以两边的词长得像，又不完全一样。这叫高地德语辅音推移。'],
  ['w', '🔬 规律 5：高地德语辅音推移'],
  ['w', '📜 有出处 💡 学德语时帮你猜词'],
  ['s', 'Drink some water.', '喝点水。', 'water'],
  ['w', 'water ↔ 德语 Wasser（t → s）'],
  ['s', 'I like apples.', '我喜欢苹果。', 'apple'],
  ['w', 'apple ↔ 德语 Apfel（p → pf）'],
  ['s', 'I have ten pencils.', '我有十支铅笔。', 'ten'],
  ['w', 'ten ↔ 德语 zehn（t → z）'],
  ['s', 'Let\'s make a cake.', '我们做个蛋糕吧。', 'make'],
  ['w', 'make ↔ 德语 machen（k → ch）'],
  ['n', '英语保留了老样子，变的是德语这一边。'],
  ['w', '⚠️ 变的是德语，英语没变'],
  ['n', '出处：Etymonline 和 Wiktionary 都列了这些德语同源词；规律见 Wikipedia「High German consonant shift」。'],
  ['w', '出处：Etymonline · Wiktionary · Wikipedia']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 5 · 英语和德语：t 对 z、p 对 pf', items: ITEMS, acts: ACTS }); }
