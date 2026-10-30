// 🔬 规律 17 · sh 是本族词，sk 是维京人的词 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_sc_sh.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_SC_SH_1_V5.md
// 角色关键帧：sprites/sh1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/sh1.js';
const ACTS = {"Look": ["l_lookup"]};
const ITEMS = [
  ['n', '古英语的 sc 后来都读成了 sh。所以以 sh 开头的老词，多半是本族词。'],
  ['w', '🔬 规律 17：古英语 sc → sh；古诺斯语 sk 留下'],
  ['w', '📜 有出处 💡 sk 开头的老词多半来自维京人'],
  ['w', 'ship ← 古英语 scip'],
  ['w', 'fish ← 古英语 fisc'],
  ['s', 'Look at the blue sky.', '看那蓝蓝的天空。', 'sky'],
  ['w', 'sky ← 古诺斯语 ský'],
  ['w', 'skin ← 古诺斯语 skinn'],
  ['n', '维京人的 sk 没有变成 sh，就这样留在了英语里。'],
  ['w', 'sh = 本族 ｜ sk = 维京'],
  ['n', '出处：Etymonline 和 Wiktionary 都写了这些古英语、古诺斯语词形。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 17 · sh 是本族词，sk 是维京人的词', items: ITEMS, acts: ACTS }); }
