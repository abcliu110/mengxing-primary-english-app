// 🔍 How vs What 原理 · 第2幕 old / tall / many 前用 How —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_how_what.js 案例 2；对照清单 lab/INVENTORY_HD_SUM_HOW_WHAT_2_V5.md
// 角色关键帧：sprites/hdshow2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdshow2.js';
const ACTS = {"*": ["l_stand", "l_lift0", "l_think"]};
const ITEMS = [
  ['w', 'How vs What 原理'],
  ['w', 'What 是【疑问代词】专门填补名词/宾语坑位；How 是【疑问副词】专门当激光尺测量形容词/方式！'],
  ['w', '看中央实验台：为什么 What is it like 用 What（填介词 like 的宾语坑），How old/tall 用 How（副词量形容词）！'],
  ['w', '🔬 深度机制 2：为什么 old/tall/many 前必用 How？（副词游标卡尺量程度）'],
  ['w', '📏 HOW + old'],
  ['w', '刻度: 1.65 m'],
  ['w', 'tall (高的)'],
  ['w', '刻度: 10 years'],
  ['w', 'old (岁的)'],
  ['w', '刻度: ¥ 50'],
  ['w', 'much (价格)'],
  ['w', '💡 原理：副词修饰形容词！凡是测量高矮/老少/多少/远近，必用副词 How！'],
  ['w', '📏 HOW + much'],
  ['w', '📏 HOW + tall'],
  ['w', '原理第2幕'],
  ['s', 'What is the weather like? = How is the weather? How old are you?', '底层铁律：句中缺名词或介词 like 缺宾语必用 What；修饰形容词(old/tall/many)或问方式必用 How！']
];
export default function build() { return autoBuild(SP, { title: '🔍 How vs What 原理 · 第2幕 old / tall / many 前用 How', items: ITEMS, acts: ACTS }); }
