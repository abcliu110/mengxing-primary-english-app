// 📘 G13 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g13.js 案例 1；对照清单 lab/INVENTORY_HD_G13_1_V5.md
// 角色关键帧：sprites/hdg13_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg13_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G13 底层原理'],
  ['w', '基数词与序数词变形黄金口诀 (one→first, twelve→twelfth) —— 基数词表“有几个”，序数词表“第几个”（前面常戴 the 小帽）'],
  ['w', '【为什么楼层、日期、生日要用序数词？】因为一月一日、三楼、第十二个生日都是排在序列里的“第1、第3、第12个位置”，'],
  ['w', '🔬 G13 · 基数词与序数词变形黄金口诀 (one→first, twelve→twelfth) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：There are twelve months in a year, and Decembe'],
  ['w', '一年有十二个月，十二月是第十二个月。我们的美术室在三楼。今天是十月二十一日。'],
  ['w', '② 核心结构规律：① 1~3 独立变形：one ➔ first (1st), two ➔ second ('],
  ['w', '③ 进阶要点：② 易错四大金刚：five ➔ fifth, eight ➔ eighth, nine'],
  ['w', 'G13 第1幕'],
  ['s', 'There are twelve months in a year, and December is the twelfth month.', '基变序，有规律：一二三特殊记（first/second/third）；八去t（eighth），九去e（ninth）；ve要用f替（fifth/twelfth）；整十y变ie再加th（twentieth）；若是遇到几十几，只变个位就可以（twenty-first）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G13 底层原理', items: ITEMS, acts: ACTS }); }
