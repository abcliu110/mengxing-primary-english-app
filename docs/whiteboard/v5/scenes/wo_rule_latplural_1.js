// 🔬 规律 16 · 外来复数：cactus → cacti —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_latplural.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_LATPLURAL_1_V5.md
// 角色关键帧：sprites/lp1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/lp1.js';
const ACTS = {"Look": ["l_point"]};
const ITEMS = [
  ['n', '有些词从拉丁语、希腊语借来，连复数也一起借来了。'],
  ['w', '🔬 规律 16：外来复数'],
  ['w', '📜 有出处 ⚠️ 很多也能加 -es'],
  ['s', 'Look at the cactus.', '看那棵仙人掌。', 'cactus'],
  ['w', '-us → -i：cactus → cacti'],
  ['w', 'fungus → fungi 真菌'],
  ['w', '-is → -es：crisis → crises 危机'],
  ['n', '日常说话里，cactuses 也有人用；两种复数都见于词典。'],
  ['w', '⚠️ cactus 也可以说 cactuses'],
  ['n', '出处：Wiktionary 列了这些复数；规律见 Wikipedia「English plurals」。'],
  ['w', '出处：Wiktionary · Wikipedia']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 16 · 外来复数：cactus → cacti', items: ITEMS, acts: ACTS }); }
