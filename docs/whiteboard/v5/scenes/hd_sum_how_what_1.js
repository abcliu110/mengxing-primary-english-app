// 🔍 How vs What 原理 · 第1幕 有介词 like 必用 What —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_how_what.js 案例 1；对照清单 lab/INVENTORY_HD_SUM_HOW_WHAT_1_V5.md
// 角色关键帧：sprites/hdshow1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdshow1.js';
const ACTS = {"*": ["sunny", "rain0", "l_think"]};
const ITEMS = [
  ['w', 'How vs What 原理'],
  ['w', 'What 是【疑问代词】专门填补名词/宾语坑位；How 是【疑问副词】专门当激光尺测量形容词/方式！'],
  ['w', '看中央实验台：为什么 What is it like 用 What（填介词 like 的宾语坑），How old/tall 用 How（副词量形容词）！'],
  ['w', '🔬 深度机制 1：为什么有介词 like 必用 What？（代词填补宾语空缺）'],
  ['w', 'The weather is like (介词:像)'],
  ['w', '【缺介词宾语(名词坑)】'],
  ['w', '🟦 WHAT (代词填坑)'],
  ['w', '❌ How 是副词，不能当介词 like 的宾语！'],
  ['w', '✅ 结论：What is the weather like? (有 like 必用代词 What 当宾语)'],
  ['w', '原理第1幕'],
  ['s', 'What is the weather like? = How is the weather? How old are you?', '底层铁律：句中缺名词或介词 like 缺宾语必用 What；修饰形容词(old/tall/many)或问方式必用 How！']
];
export default function build() { return autoBuild(SP, { title: '🔍 How vs What 原理 · 第1幕 有介词 like 必用 What', items: ITEMS, acts: ACTS }); }
