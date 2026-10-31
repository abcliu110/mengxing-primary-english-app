// 🎞️ orange · 一词多义第1幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g3_113.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G3_113_1_V5.md
// 角色关键帧：sprites/hdpg3113_1.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg3113_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
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
  ['w', '多义第1幕'],
  ['s', 'I\'d like an orange.', '🍊 第一幕【核心本义·水果橙子】：果盘里放着一个圆溜溜、酸甜多汁的橙子（an orange）。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ orange · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
