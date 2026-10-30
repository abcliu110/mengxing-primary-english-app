// 📘 G34 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g34.js 案例 1；对照清单 lab/INVENTORY_HD_G34_1_V5.md
// 角色关键帧：sprites/hdg34_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg34_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G34 底层原理'],
  ['w', '感叹句双雄：What (a/an) vs How 秒判法则 —— 与疑问句原理完全相通：感叹“名词事物”用 What，感叹“形容词/副词程度”用 How！'],
  ['w', '【为什么感叹句也是 What 和 How 两大家族？】跟疑问句底层逻辑一模一样！**What 管名词**（`What'],
  ['w', '🔬 深度机制 1：为什么有介词 like 必用 What？（代词填补宾语空缺）'],
  ['w', 'The weather is like (介词:像)'],
  ['w', '【缺介词宾语(名词坑)】'],
  ['w', '🟦 WHAT (代词填坑)'],
  ['w', '❌ How 是副词，不能当介词 like 的宾语！'],
  ['w', '✅ 结论：What is the weather like? (有 like 必用代词 What 当宾语)'],
  ['w', 'G34 第1幕'],
  ['s', 'What a clever boy (he is)!', '感叹句，看尾巴，先把主谓划掉它；剩下核心是名词，快请 What 来当家（单数可数 What a/an，复数不可数只用 What）；剩下只是形容词或副词，一律用 How 别犹豫！']
];
export default function build() { return autoBuild(SP, { title: '📘 G34 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
