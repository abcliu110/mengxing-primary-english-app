// 🎞️ light · 一词多义第2幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g4_157.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G4_157_2_V5.md
// 角色关键帧：sprites/hdpg4157_2.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg4157_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
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
  ['w', '多义第2幕'],
  ['s', 'Turn on the light, please.', '🔄 第二幕【场景变形·光一样无重量与高明度】：光线照在羽毛上飘起（毫无重量），照在深蓝颜料上变淡。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ light · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
