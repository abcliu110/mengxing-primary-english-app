// 📘 G34 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g34.js 案例 1；对照清单 lab/INVENTORY_HD_G34_1_V5.md
// 角色关键帧：sprites/hdg34_1.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg34_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G34 底层原理'],
  ['w', '感叹句双雄：What (a/an) vs How 秒判法则 —— 与疑问句原理完全相通：感叹“名词事物”用 What，感叹“形容词/副词程度”用 How！'],
  ['w', '【为什么感叹句也是 What 和 How 两大家族？】跟疑问句底层逻辑一模一样！'],
  ['w', 'What 管名词（What a nice day! 核心落脚点是名词 day）；'],
  ['w', 'How 管形容词/副词（How nice the day is! 被感叹的是形容词 nice）！'],
  ['w', '🔬 两步秒判：先遮住主谓，再看剩下的核心词'],
  ['w', '🟦 What a'],
  ['w', 'clever'],
  ['w', 'boy (核心是名词!)'],
  ['w', '[he is 遮住主谓] !'],
  ['w', '➔ 去掉主谓 he is，尾巴核心词是名词 boy，所以派代词 What a!'],
  ['w', '🔶 How'],
  ['w', 'clever (核心是形容词!)'],
  ['w', '[the boy is 遮住] !'],
  ['w', '➔ 去掉主谓 the boy is，只剩形容词 clever，所以派副词 How!'],
  ['s', 'What a clever boy he is! How clever the boy is!', '他是多么聪明的一个男孩啊！这个男孩多聪明啊！'],
  ['w', 'G34 第1幕'],
  ['n', '🎵 口诀：感叹句，看尾巴，先把主谓划掉它；剩下核心是名词，快请 What 来当家（单数可数 What a/an，复数不可数只用 What）；剩下只是形容词或副词，一律用 How 别犹豫！']
];
export default function build() { return autoBuild(SP, { title: '📘 G34 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
