// 📘 G32 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g32.js 案例 3；对照清单 lab/INVENTORY_HD_G32_3_V5.md
// 角色关键帧：sprites/hdg32_3.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg32_3.js';
const ACTS = {"*": ["l_wave", "l_speak", "l_laugh"]};
const ITEMS = [
  ['w', 'G32 底层原理'],
  ['w', '深度原理突破：How 与 What 到底怎么选？ —— 告别死记硬背！看懂「What 是代词（追问事物/名词）vs How 是副词（追问方式/状态/形容词程度）」'],
  ['w', '【核心原理揭秘：为什么同样问天气，一句话是 How is the weather? 另一句话却是 What is the weather like?】'],
  ['w', '• What 的本质是【疑问代词（替身名词）】：填补名词空缺！'],
  ['w', '在 What is the weather like? 里，like 是介词“像……”，后面缺一个宾语名词，所以必须派代词 What 去当 like 的宾语！'],
  ['w', '• How 的本质是【疑问副词（方式与程度探针）】：修饰动词（问方式 How do you go?）或修饰形容词/副词（问状态程度 How is the weather? / How old / How tall）！'],
  ['w', '没有介词 like 时，直接问状态形容词，必须派副词 How 出场！'],
  ['w', '🔬 What + 名词家族 vs How + 形容词家族'],
  ['w', 'What colour / What time / What day / What date / What size'],
  ['w', 'What day 问星期几 ｜ What date 问几月几号'],
  ['w', 'How old / How tall / How heavy / How long / How far / How often'],
  ['w', 'How many + 可数复数 ｜ How much + 不可数或问价钱'],
  ['s', 'What size are your shoes? Size 37. How much are they? 80 yuan.', '你的鞋几码？37 码。多少钱？80 元。'],
  ['w', '问方式：How does she go to work? — By car.'],
  ['w', '常错：How is your bedroom like? ✗ → What is your bedroom like? ✓'],
  ['s', 'What is your new English teacher like? She is kind. How does she go to work? By car.', '你的新英语老师是什么样的？她很和蔼。她怎么去上班？开车。'],
  ['w', 'G32 第3幕'],
  ['n', '🎵 口诀：What 是代词替名词，追问事物与名称（What colour / What time / What...like）；How 是副词探状态，追问方式与程度！How 加形容词问高低（How old/tall/heavy/long/far），How many 数复数，How much 问价钱和不可数！']
];
export default function build() { return autoBuild(SP, { title: '📘 G32 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
