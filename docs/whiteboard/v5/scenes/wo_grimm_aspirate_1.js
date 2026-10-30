// 🔤 格林定律 · 规则组 ③ bh dh gh → b d g —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_grimm_aspirate.js 案例 1；对照清单 lab/INVENTORY_WO_GRIMM_ASPIRATE_1_V5.md
// 角色关键帧：sprites/wogr3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wogr3.js';
const ACTS = {"open": ["m_door"]};
const ITEMS = [
  ['n', '规则组第三组：老祖宗还有一种带气的浊辅音 bh、dh、gh，在英语这一支里丢了那口气，变成 b、d、g。'],
  ['w', '🔤 规则组 ③：bh · dh · gh → b · d · g'],
  ['w', '📜 有出处 ⚠️ 两边都变了 💡 帮你猜词'],
  ['n', '这一组最难认：英语这边变成 b、d、g，拉丁语那边也变了，常常变成 f 或 h。所以要配对着看。'],
  ['w', '⚠️ 拉丁语这边常变成 f、h'],
  ['n', '第一条：bh 变成 b，拉丁语里变成 f。'],
  ['w', 'bh → b（拉丁语 f）'],
  ['s', 'This is my brother.', '这是我的哥哥。', 'brother'],
  ['w', 'brother ↔ 拉丁语 frater → fraternal 兄弟般的'],
  ['s', 'The flowers are in bloom.', '花开了。', 'bloom'],
  ['w', 'bloom ↔ 拉丁语 flos（花）'],
  ['s', 'A beech is a tree.', '山毛榉是一种树。', 'beech'],
  ['w', 'beech ↔ 拉丁语 fagus（山毛榉）'],
  ['n', '第二条：dh 变成 d。'],
  ['w', 'dh → d'],
  ['s', 'Please open the door.', '请开门。', 'door'],
  ['w', 'door ↔ 希腊语 thyra（门）、拉丁语 foris（门外）→ foreign 外国的'],
  ['s', 'The apple is red.', '苹果是红色的。', 'red'],
  ['w', 'red ↔ 拉丁语 ruber（红的）'],
  ['s', 'Stand in the middle.', '站在中间。', 'middle'],
  ['w', 'middle ↔ 拉丁语 medius（中间的）'],
  ['n', '第三条：gh 变成 g。'],
  ['w', 'gh → g'],
  ['s', 'Look at the goose.', '看那只鹅。', 'goose'],
  ['w', 'goose ↔ 拉丁语 anser、希腊语 khēn（鹅）'],
  ['s', 'We have a garden.', '我们有一个花园。', 'garden'],
  ['w', 'garden ↔ 拉丁语 hortus（园子）'],
  ['n', '三组连起来看，就像排队往前挪一格：bh 挪到 b，b 挪到 p，p 挪到 f。语言学家叫它链式音变。'],
  ['w', '💡 bh → b → p → f：排队往前挪一格'],
  ['n', '出处：Etymonline 和 Wiktionary 两处都写了这些同源词，对得上才放进来；挪一格的说法见 Wikipedia「Grimm\'s law」。'],
  ['w', '出处：Etymonline · Wiktionary · Wikipedia（Grimm\'s law）']
];
export default function build() { return autoBuild(SP, { title: '🔤 格林定律 · 规则组 ③ bh dh gh → b d g', items: ITEMS, acts: ACTS }); }
