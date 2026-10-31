// 📘 G34 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g34.js 案例 3；对照清单 lab/INVENTORY_HD_G34_3_V5.md
// 角色关键帧：sprites/hdg34_3.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg34_3.js';
const ACTS = {"*": ["l_wave", "l_speak", "l_laugh"]};
const ITEMS = [
  ['w', 'G34 底层原理'],
  ['w', '感叹句双雄：What (a/an) vs How 秒判法则 —— 与疑问句原理完全相通：感叹“名词事物”用 What，感叹“形容词/副词程度”用 How！'],
  ['w', '【为什么感叹句也是 What 和 How 两大家族？】跟疑问句底层逻辑一模一样！'],
  ['w', 'What 管名词（What a nice day! 核心落脚点是名词 day）；'],
  ['w', 'How 管形容词/副词（How nice the day is! 被感叹的是形容词 nice）！'],
  ['w', '🔬 感叹句常错'],
  ['w', 'What a great news it is! ✗ → What great news it is! ✓（news 不可数，不加 a）'],
  ['w', 'What an interesting book it is!（interesting 元音开头用 an）'],
  ['w', 'How happily the children are reading!（happily 是副词，用 How）'],
  ['s', 'What an interesting book it is! How happily the children are reading!', '这是一本多么有趣的书啊！孩子们读得多开心啊！'],
  ['w', 'What bad weather today! How cold it is outside!'],
  ['s', 'What bad weather today! How cold it is outside!', '今天天气真糟糕！外面多冷啊！'],
  ['w', 'G34 第3幕'],
  ['n', '🎵 口诀：感叹句，看尾巴，先把主谓划掉它；剩下核心是名词，快请 What 来当家（单数可数 What a/an，复数不可数只用 What）；剩下只是形容词或副词，一律用 How 别犹豫！']
];
export default function build() { return autoBuild(SP, { title: '📘 G34 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
