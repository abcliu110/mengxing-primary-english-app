// 📘 G31 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g31.js 案例 1；对照清单 lab/INVENTORY_HD_G31_1_V5.md
// 角色关键帧：sprites/hdg31_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg31_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G31 底层原理'],
  ['w', '特殊疑问词全家福 (5W1H 精准分工) —— what / who / whose / where / when / why / which / how —— 缺什么信息就派谁站句首！'],
  ['w', '【为什么英语疑问词几乎都以 wh- 开头，而且必须放在句首第一个词？】英语把疑问词放在句首第一位（焦点前置），就像给'],
  ['w', '🔬 深度机制 1：为什么有介词 like 必用 What？（代词填补宾语空缺）'],
  ['w', 'The weather is like (介词:像)'],
  ['w', '【缺介词宾语(名词坑)】'],
  ['w', '🟦 WHAT (代词填坑)'],
  ['w', '❌ How 是副词，不能当介词 like 的宾语！'],
  ['w', '✅ 结论：What is the weather like? (有 like 必用代词 What 当宾语)'],
  ['w', 'G31 第1幕'],
  ['s', '— Who is that girl? — She is my cousin.', '什么 what 谁是 who，谁的东西用 whose；哪里 where 何时 when，哪一个用 which 选；为什么 why 用 because 答，怎样程度全归 how！']
];
export default function build() { return autoBuild(SP, { title: '📘 G31 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
