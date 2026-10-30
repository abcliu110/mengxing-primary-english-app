// 📘 G34 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g34.js 案例 3；对照清单 lab/INVENTORY_HD_G34_3_V5.md
// 角色关键帧：sprites/hdg34_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg34_3.js';
const ACTS = {"*": ["l_wave", "l_speak", "l_laugh"]};
const ITEMS = [
  ['w', 'G34 底层原理'],
  ['w', '感叹句双雄：What (a/an) vs How 秒判法则 —— 与疑问句原理完全相通：感叹“名词事物”用 What，感叹“形容词/副词程度”用 How！'],
  ['w', '【为什么感叹句也是 What 和 How 两大家族？】跟疑问句底层逻辑一模一样！**What 管名词**（`What'],
  ['w', '🔬 深度机制 3：感叹句『遮住主谓看核心词性』破案实验'],
  ['w', '🟦 What a'],
  ['w', 'boy (核心是名词!)'],
  ['w', '[he is 遮住主谓] !'],
  ['w', '➔ 去掉主谓 he is，尾巴核心词是名词 boy，所以派代词 What a!'],
  ['w', '🔶 How'],
  ['w', 'clever (核心是形容词!)'],
  ['w', '[the boy is 遮住] !'],
  ['w', '➔ 去掉主谓 the boy is，只剩形容词 clever，所以派副词 How!'],
  ['w', 'G34 第3幕'],
  ['s', 'What a clever boy (he is)!', '感叹句，看尾巴，先把主谓划掉它；剩下核心是名词，快请 What 来当家（单数可数 What a/an，复数不可数只用 What）；剩下只是形容词或副词，一律用 How 别犹豫！']
];
export default function build() { return autoBuild(SP, { title: '📘 G34 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
