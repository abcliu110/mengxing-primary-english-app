// 🔬 规律 4 · 元音递变：sing sang sung —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_ablaut.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_ABLAUT_1_V5.md
// 角色关键帧：sprites/abl1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/abl1.js';
const ACTS = {"sing": ["l_speak"], "ride": ["l_bike1"]};
const ITEMS = [
  ['n', '为什么 sing 的过去式是 sang，过去分词是 sung？这叫元音递变：同一个词根，换一个元音，就换一种时间。'],
  ['w', '🔬 规律 4：元音递变（ablaut）· 强动词'],
  ['w', '📜 有出处 ⚠️ 只管一部分老动词'],
  ['s', 'I sing a song.', '我唱一首歌。', 'sing'],
  ['w', 'sing → sang → sung'],
  ['w', 'song 也是一家人：来自 sing'],
  ['s', 'I can ride a horse.', '我会骑马。', 'ride'],
  ['w', 'ride → rode → ridden'],
  ['w', '古英语 rīdan → 过去式 rād → 过去分词 riden'],
  ['n', '这类动词叫强动词，是从老祖宗那里传下来的老办法；后来大多数新动词改用加 ed。'],
  ['w', '⚠️ 新动词多半加 -ed；换元音的是老动词'],
  ['n', '出处：sing、song、ride 的来历见 Etymonline 和 Wiktionary；强动词说法见 Wikipedia「Germanic strong verb」。'],
  ['w', '出处：Etymonline · Wiktionary · Wikipedia']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 4 · 元音递变：sing sang sung', items: ITEMS, acts: ACTS }); }
