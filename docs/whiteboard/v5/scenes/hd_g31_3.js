// 📘 G31 底层原理 · 第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g31.js 案例 3；对照清单 lab/INVENTORY_HD_G31_3_V5.md
// 角色关键帧：sprites/hdg31_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg31_3.js';
const ACTS = {"*": ["l_wave", "l_speak", "l_laugh"]};
const ITEMS = [
  ['w', 'G31 底层原理'],
  ['w', '特殊疑问词全家福 (5W1H 精准分工) —— what / who / whose / where / when / why / which / how —— 缺什么信息就派谁站句首！'],
  ['w', '【为什么英语疑问词几乎都以 wh- 开头，而且必须放在句首第一个词？】英语把疑问词放在句首第一位（焦点前置），就像给'],
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
  ['w', 'G31 第3幕'],
  ['s', '— Who is that girl? — She is my cousin.', '什么 what 谁是 who，谁的东西用 whose；哪里 where 何时 when，哪一个用 which 选；为什么 why 用 because 答，怎样程度全归 how！']
];
export default function build() { return autoBuild(SP, { title: '📘 G31 底层原理 · 第3幕', items: ITEMS, acts: ACTS }); }
