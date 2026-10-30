// 📘 G32 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g32.js 案例 2；对照清单 lab/INVENTORY_HD_G32_2_V5.md
// 角色关键帧：sprites/hdg32_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg32_2.js';
const ACTS = {"*": ["l_point", "l_idea2", "m_pass"]};
const ITEMS = [
  ['w', 'G32 底层原理'],
  ['w', '深度原理突破：How 与 What 到底怎么选？ —— 告别死记硬背！看懂「What 是代词（追问事物/名词）vs How 是副词（追问方式/状态/形容词程度）」'],
  ['w', '【核心原理揭秘：为什么同样问天气，一句话是 How is the weather? 另一句话却是 What is t'],
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
  ['w', 'G32 第2幕'],
  ['s', '【原理对比1】How is the weather? (无 like，问状态形容词) = What is the weather like? (有介词 like，缺名词宾语用 What!)', 'What 是代词替名词，追问事物与名称（What colour / What time / What...like）；How 是副词探状态，追问方式与程度！How 加形容词问高低（How old/tall/heavy/long/far），How many 数复数，How much 问价钱和不可数！']
];
export default function build() { return autoBuild(SP, { title: '📘 G32 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
