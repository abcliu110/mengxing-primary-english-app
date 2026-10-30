// 📘 G32 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g32.js 案例 3；对照清单 lab/INVENTORY_HD_G32_3_V5.md
// 角色关键帧：sprites/hdg32_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg32_3.js';
const ACTS = {"*": ["l_wave", "l_speak", "l_laugh"]};
const ITEMS = [
  ['w', 'G32 底层原理'],
  ['w', '深度原理突破：How 与 What 到底怎么选？ —— 告别死记硬背！看懂「What 是代词（追问事物/名词）vs How 是副词（追问方式/状态/形容词程度）」'],
  ['w', '【核心原理揭秘：为什么同样问天气，一句话是 How is the weather? 另一句话却是 What is t'],
  ['w', '🔬 深度机制 3：感叹句『遮住主谓看核心词性』破案实验'],
  ['w', '🟦 What a'],
  ['w', 'clever'],
  ['w', 'boy (核心是名词!)'],
  ['w', '[he is 遮住主谓] !'],
  ['w', '➔ 去掉主谓 he is，尾巴核心词是名词 boy，所以派代词 What a!'],
  ['w', '🔶 How'],
  ['w', 'clever (核心是形容词!)'],
  ['w', '[the boy is 遮住] !'],
  ['w', '➔ 去掉主谓 the boy is，只剩形容词 clever，所以派副词 How!'],
  ['w', 'G32 第3幕'],
  ['s', '【原理对比1】How is the weather? (无 like，问状态形容词) = What is the weather like? (有介词 like，缺名词宾语用 What!)', 'What 是代词替名词，追问事物与名称（What colour / What time / What...like）；How 是副词探状态，追问方式与程度！How 加形容词问高低（How old/tall/heavy/long/far），How many 数复数，How much 问价钱和不可数！']
];
export default function build() { return autoBuild(SP, { title: '📘 G32 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
