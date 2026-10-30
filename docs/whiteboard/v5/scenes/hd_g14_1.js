// 📘 G14 底层原理 · 空间图式 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g14.js 案例 1；对照清单 lab/INVENTORY_HD_G14_1_V5.md
// 角色关键帧：sprites/hdg14_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg14_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G14 底层原理'],
  ['w', '介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— 告别死记硬背！看懂“容器(in)・表面(on)・精确点(at)”空间图式，一通百通！'],
  ['w', '【为什么汉语一个“在”字，英语却要分 in / on / at？】英语是用**三维空间几何镜头**看世界：包在立体容'],
  ['w', '🔬 介词三维空间几何图式 ➔ 时间漏斗隐喻映射'],
  ['w', '📦🍎'],
  ['w', 'in (三维容器内)'],
  ['w', 'in the box / in May'],
  ['w', '🍎'],
  ['w', 'on (平面接触面)'],
  ['w', 'on the desk / on Monday'],
  ['w', 'at (精确坐标靶心)'],
  ['w', 'at the door / at 7:30'],
  ['w', 'G14 第1幕'],
  ['s', '【空间图式】The ball is in the box (容器内), on the desk (表面接触), at the door (精确点).', '空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！']
];
export default function build() { return autoBuild(SP, { title: '📘 G14 底层原理 · 空间图式', items: ITEMS, acts: ACTS }); }
