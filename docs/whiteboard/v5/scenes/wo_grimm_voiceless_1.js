// 🔤 格林定律 · 规则组 ① p t k → f th h —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_grimm_voiceless.js 案例 1；对照清单 lab/INVENTORY_WO_GRIMM_VOICELESS_1_V5.md
// 角色关键帧：sprites/wogr1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wogr1.js';
const ACTS = {"Point": ["l_point"], "Nod": ["l_think"]};
const ITEMS = [
  ['n', '格林定律规则组第一组：老祖宗语言里的 p、t、k，到了英语的祖先日耳曼人嘴里，变成了 f、th、h。'],
  ['w', '🔤 规则组 ①：p · t · k → f · th · h'],
  ['w', '📜 有出处 ⚠️ 有例外 💡 帮你猜词'],
  ['n', '拉丁语、希腊语大多保留了老样子，英语这一支往前挪了一格。所以拉丁语里的 p，常常对上英语里的 f。'],
  ['w', 'p → f'],
  ['s', 'Point to your foot.', '指一指你的脚。', 'foot'],
  ['w', 'foot ↔ 拉丁语 pes（ped-）→ pedal 脚踏板'],
  ['s', 'My father is tall.', '我的爸爸很高。', 'father'],
  ['w', 'father ↔ 拉丁语 pater'],
  ['s', 'I have a few books.', '我有几本书。', 'few'],
  ['w', 'few ↔ 拉丁语 paucus（少的）'],
  ['s', 'The glass is full.', '杯子是满的。', 'full'],
  ['w', 'full ↔ 拉丁语 plenus（满的）'],
  ['n', '第二条：t 变成 th。'],
  ['w', 't → th'],
  ['s', 'I have three cats.', '我有三只猫。', 'three'],
  ['w', 'three ↔ 拉丁语 tres'],
  ['s', 'This book is thin.', '这本书很薄。', 'thin'],
  ['w', 'thin ↔ 拉丁语 tenuis（细的）'],
  ['s', 'I can hear the thunder.', '我听到了雷声。', 'thunder'],
  ['w', 'thunder ↔ 拉丁语 tonare（打雷）'],
  ['n', '第三条：k 变成 h。拉丁语的 c 读 k。'],
  ['w', 'k（拉丁语写 c）→ h'],
  ['s', 'Put your hand on your heart.', '把手放在心口上。', 'heart'],
  ['w', 'heart ↔ 拉丁语 cor、希腊语 kardia → cardiac 心脏的'],
  ['s', 'There are one hundred kids.', '有一百个孩子。', 'hundred'],
  ['w', 'hundred ↔ 拉丁语 centum（一百）'],
  ['s', 'The cow has two horns.', '这头牛有两只角。', 'horn'],
  ['w', 'horn ↔ 拉丁语 cornu → unicorn 独角兽'],
  ['s', 'Nod your head.', '点点头。', 'head'],
  ['w', 'head ↔ 拉丁语 caput → captain 船长'],
  ['s', 'We walk up the hill.', '我们走上山坡。', 'hill'],
  ['w', 'hill ↔ 拉丁语 collis（小山）'],
  ['n', '第四条：kʷ 变成 hw，英语写成 wh。拉丁语写 qu。'],
  ['w', 'kʷ（拉丁语写 qu）→ hw（英语写 wh）'],
  ['s', 'What is this?', '这是什么？', 'what'],
  ['w', 'what ↔ 拉丁语 quod'],
  ['s', 'Who is she?', '她是谁？', 'who'],
  ['w', 'who ↔ 拉丁语 quis'],
  ['n', '要注意：这些词不是英语从拉丁语借来的，而是兄弟：同一个老祖宗原始印欧语分家以后，各自变了样。'],
  ['w', '⚠️ 是兄弟，不是父子：同一个老祖宗分家后各自变样'],
  ['n', '例外：p、t、k 前面紧挨着 s 的时候不变。比如 stand 和拉丁语 stare 都还是 st。'],
  ['w', '⚠️ s 后面不变：stand ↔ 拉丁语 stare（站）'],
  ['n', '出处：Etymonline 和 Wiktionary 两处都写了这些同源词，对得上才放进来。'],
  ['w', '出处：Etymonline · Wiktionary（两处互证）']
];
export default function build() { return autoBuild(SP, { title: '🔤 格林定律 · 规则组 ① p t k → f th h', items: ITEMS, acts: ACTS }); }
