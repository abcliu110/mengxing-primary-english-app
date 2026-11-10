// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_wo_rule_metath_1.yaml；改编排：模板 wo_rule_metath_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🔬 规律 12 · 字母换位和不发音字母 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_metath.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_METATH_1_V5.md
// 角色关键帧：sprites/mt1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/mt1.js';
const ACTS = {"write": ["l_write1"]};
const ITEMS = [
  ['n', '有些词的两个字母，在历史上换了位置，这叫音位转换。'],
  ['w', '🔬 规律 12：音位转换 + 不发音字母'],
  ['w', '📜 有出处 💡 不发音字母是历史的脚印'],
  ['w', 'bird ← 古英语 bridd（r 换到了 i 后面）'],
  ['s', 'Bird, bridd.', 'bird、古英语 bridd。'],
  ['w', 'third ← 古英语 þridda（换位）↔ three'],
  ['s', 'Third, þridda, three.', 'third、古英语 þridda、three。'],
  ['w', 'horse ← 古英语 hros / hors'],
  ['s', 'Horse, hros, hors.', 'horse、古英语 hros、hors。'],
  ['n', '还有一些字母现在不读了，可它们在古英语里就写着，是历史留下的脚印。'],
  ['s', 'I write a letter.', '我写一封信。', 'write'],
  ['w', 'write ← 古英语 wrītan（w 现在不读）'],
  ['s', 'Write, wrītan.', 'write、古英语 wrītan。'],
  ['w', 'knight ← 古英语 cniht（k 现在不读）'],
  ['s', 'Knight, cniht.', 'knight、古英语 cniht。'],
  ['n', '出处：Etymonline 写明 bird、third 是换位；Wiktionary 列出同样的古英语词形。'],
  ['w', '出处：Etymonline · Wiktionary'],
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 12 · 字母换位和不发音字母', items: ITEMS, acts: ACTS }); }
