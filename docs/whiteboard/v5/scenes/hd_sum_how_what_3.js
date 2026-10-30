// 🔍 How vs What 原理 · 第3幕 感叹句：遮住主谓看核心词 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_how_what.js 案例 3；对照清单 lab/INVENTORY_HD_SUM_HOW_WHAT_3_V5.md
// 角色关键帧：sprites/hdshow3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdshow3.js';
const ACTS = {"*": ["m_admire", "l_laugh", "m_flower"]};
const ITEMS = [
  ['w', 'How vs What 原理'],
  ['w', 'What 是【疑问代词】专门填补名词/宾语坑位；How 是【疑问副词】专门当激光尺测量形容词/方式！'],
  ['w', '看中央实验台：为什么 What is it like 用 What（填介词 like 的宾语坑），How old/tall 用 How（副词量形容词）！'],
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
  ['w', '原理第3幕'],
  ['s', 'What is the weather like? = How is the weather? How old are you?', '底层铁律：句中缺名词或介词 like 缺宾语必用 What；修饰形容词(old/tall/many)或问方式必用 How！']
];
export default function build() { return autoBuild(SP, { title: '🔍 How vs What 原理 · 第3幕 感叹句：遮住主谓看核心词', items: ITEMS, acts: ACTS }); }
