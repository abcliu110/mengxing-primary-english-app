// 📘 G34 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g34.js 案例 2；对照清单 lab/INVENTORY_HD_G34_2_V5.md
// 角色关键帧：sprites/hdg34_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg34_2.js';
const ACTS = {"*": ["l_point", "l_idea2", "m_pass"]};
const ITEMS = [
  ['w', 'G34 底层原理'],
  ['w', '感叹句双雄：What (a/an) vs How 秒判法则 —— 与疑问句原理完全相通：感叹“名词事物”用 What，感叹“形容词/副词程度”用 How！'],
  ['w', '【为什么感叹句也是 What 和 How 两大家族？】跟疑问句底层逻辑一模一样！**What 管名词**（`What'],
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
  ['w', 'G34 第2幕'],
  ['s', 'What a clever boy (he is)!', '感叹句，看尾巴，先把主谓划掉它；剩下核心是名词，快请 What 来当家（单数可数 What a/an，复数不可数只用 What）；剩下只是形容词或副词，一律用 How 别犹豫！']
];
export default function build() { return autoBuild(SP, { title: '📘 G34 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
