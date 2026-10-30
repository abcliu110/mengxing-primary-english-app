// 🔬 规律 14 · 希腊来的拼写：ph、ch、y —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_greek.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_GREEK_1_V5.md
// 角色关键帧：sprites/gk1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/gk1.js';
const ACTS = {"phone": ["l_speak"]};
const ITEMS = [
  ['n', '有些词是从希腊语借来的，还带着希腊的写法：ph 读 /f/，ch 读 /k/，y 读 /ɪ/。'],
  ['w', '🔬 规律 14：希腊借词的拼写'],
  ['w', '📜 有出处 💡 看到 ph 就想到希腊'],
  ['s', 'Can I use your phone?', '我可以用你的电话吗？', 'phone'],
  ['w', 'phone ← 希腊语 phōnē（声音） ph = /f/'],
  ['s', 'I go to school.', '我去上学。', 'school'],
  ['w', 'school ← 希腊语 skholē ch = /k/'],
  ['s', 'We play in the gym.', '我们在体育馆玩。', 'gym'],
  ['w', 'gym ← gymnasium y = /ɪ/'],
  ['n', '出处：Etymonline 和 Wiktionary 都写了这些词的希腊来路。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 14 · 希腊来的拼写：ph、ch、y', items: ITEMS, acts: ACTS }); }
