// 🔬 规律 11 · 词变长，元音变短：south → southern —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_tsl.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_TSL_1_V5.md
// 角色关键帧：sprites/ts1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/ts1.js';
const ACTS = {"Look": ["l_point"]};
const ITEMS = [
  ['n', '一个词加了尾巴变长以后，前面的长元音常常变短。south 读 /aʊ/，southern 却读 /ʌ/。'],
  ['w', '🔬 规律 11：派生音变（元音变短）'],
  ['w', '📜 有出处 ✂️ 简化说法'],
  ['s', 'Look to the south.', '往南边看。', 'south'],
  ['w', 'south /aʊ/ → southern /ʌ/ 南方的'],
  ['w', 'shade /eɪ/ → shadow /æ/ 影子'],
  ['w', 'pronounce /aʊ/ → pronunciation /ʌ/ 发音'],
  ['n', '这个变化在中古英语时就发生了，比元音大转移还早，所以今天一对词的元音差得很远。'],
  ['w', '✂️ 中古英语时元音变短，后来大转移又拉开距离'],
  ['n', '出处：southern、shadow 的来历见 Etymonline 和 Wiktionary；例词和说法见 Wikipedia「Trisyllabic laxing」。'],
  ['w', '出处：Etymonline · Wiktionary · Wikipedia']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 11 · 词变长，元音变短：south → southern', items: ITEMS, acts: ACTS }); }
