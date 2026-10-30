// 📘 G31 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g31.js 案例 2；对照清单 lab/INVENTORY_HD_G31_2_V5.md
// 角色关键帧：sprites/hdg31_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg31_2.js';
const ACTS = {"*": ["l_point", "l_idea2", "m_pass"]};
const ITEMS = [
  ['w', 'G31 底层原理'],
  ['w', '特殊疑问词全家福 (5W1H 精准分工) —— what / who / whose / where / when / why / which / how —— 缺什么信息就派谁站句首！'],
  ['w', '【为什么英语疑问词几乎都以 wh- 开头，而且必须放在句首第一个词？】英语把疑问词放在句首第一位（焦点前置），就像给'],
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
  ['w', 'G31 第2幕'],
  ['s', '— Who is that girl? — She is my cousin.', '什么 what 谁是 who，谁的东西用 whose；哪里 where 何时 when，哪一个用 which 选；为什么 why 用 because 答，怎样程度全归 how！']
];
export default function build() { return autoBuild(SP, { title: '📘 G31 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
