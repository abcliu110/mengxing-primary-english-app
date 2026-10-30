// 🎞️ orange · 一词多义第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g3_113.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G3_113_2_V5.md
// 角色关键帧：sprites/hdpg3113_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg3113_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🟠 orange /ˈɔːrɪndʒ/ — 【adj./n.】橙色的；橙子'],
  ['w', '核心意象纽带：橙子果实及其天然色彩'],
  ['w', '① 本义具象：n. 橙子，柑橘（可数名词）'],
  ['w', 'I\'d like an orange.'],
  ['w', '② 意象桥梁：橙子果实及其天然色彩'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：adj./n. 橙色的，橘黄色的；橙汁'],
  ['w', 'My schoolbag is orange.'],
  ['w', '多义第2幕'],
  ['s', 'I\'d like an orange.', '🔄 第二幕【场景变形·提取果皮色彩】：橙子果皮的绚丽色彩蔓延到画板和衣服上。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ orange · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
