// 🎞️ light · 一词多义第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g4_157.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G4_157_3_V5.md
// 角色关键帧：sprites/hdpg4157_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg4157_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '💡 light /laɪt/ — 【n./adj.】电灯，光线；轻的'],
  ['w', '核心意象纽带：明亮发光、没有沉重负担'],
  ['w', '① 本义具象：n. 光，光线；电灯'],
  ['w', 'Turn on the light, please.'],
  ['w', '② 意象桥梁：明亮发光、没有沉重负担'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：adj. 轻的（像光一样没有重量，反义词 heavy）'],
  ['w', 'This small box is very light.'],
  ['w', '多义第3幕'],
  ['s', 'This small box is very light.', '🪶 第三幕【引申新义·轻的 & 浅色的】：引申为形容词“轻便的（light box）”和“浅色的（light blue）”！']
];
export default function build() { return autoBuild(SP, { title: '🎞️ light · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
