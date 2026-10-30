// 🔬 规律 18 · 古英语 c 变 ch：cheese 和德语 Käse —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_c_ch.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_C_CH_1_V5.md
// 角色关键帧：sprites/cc1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/cc1.js';
const ACTS = {"eat": ["l_cake1"]};
const ITEMS = [
  ['n', '古英语里有一部分 c，后来读成了 ch。德语没有这样变，所以英语的 ch 有时对上德语的 k。'],
  ['w', '🔬 规律 18：古英语 c → ch（腭化）'],
  ['w', '📜 有出处 💡 英语 ch ↔ 德语 k'],
  ['s', 'I like to eat cheese.', '我喜欢吃奶酪。', 'cheese'],
  ['w', 'cheese ← 古英语 cyse ↔ 德语 Käse'],
  ['w', 'chin ← 古英语 cin（下巴）'],
  ['w', 'church ← 古英语 cirice'],
  ['n', '还记得规律 6 吗？church 在维京人那里是 kirk，正好没变。'],
  ['w', 'church ↔ kirk：变了的和没变的'],
  ['n', '出处：Etymonline 和 Wiktionary 都写了这些古英语词形和德语同源词。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 18 · 古英语 c 变 ch：cheese 和德语 Käse', items: ITEMS, acts: ACTS }); }
