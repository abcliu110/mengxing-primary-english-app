// 🔬 规律 10 · 前缀同化：in 变 im、il、ir —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_assim.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_ASSIM_1_V5.md
// 角色关键帧：sprites/as1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/as1.js';
const ACTS = {"think": ["l_think"]};
const ITEMS = [
  ['n', 'in 加在词前面表示「不」。可是 in 碰到 p、l、r 的时候，会变成和后面一样的音，读起来更顺口。这叫前缀同化。'],
  ['w', '🔬 规律 10：前缀同化 in- → im- / il- / ir-'],
  ['w', '📜 有出处 💡 拆开就认识'],
  ['s', 'It is impossible.', '这不可能。', 'impossible'],
  ['w', 'in + possible → impossible（碰到 p 变 im）'],
  ['w', 'in + legal → illegal 不合法的（碰到 l 变 il）'],
  ['w', 'in + regular → irregular 不规则的（碰到 r 变 ir）'],
  ['n', '另一个前缀 ad，意思是「到」，也会变：arrive 就是「到岸边」。'],
  ['w', 'arrive ← 拉丁语 ad（到）+ ripa（岸）'],
  ['n', '出处：Etymonline 写明 illegal、irregular 是 in- 的同化形式；Wiktionary 同样把它们拆成 il- 、ir- 加词根。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 10 · 前缀同化：in 变 im、il、ir', items: ITEMS, acts: ACTS }); }
