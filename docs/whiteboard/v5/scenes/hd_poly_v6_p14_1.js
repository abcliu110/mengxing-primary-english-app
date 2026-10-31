// 🎞️ letter · 一词多义第1幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_v6_p14.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_V6_P14_1_V5.md
// 角色关键帧：sprites/hdpv6p14_1.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpv6p14_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '✉️ letter /ˈletər/ — 【n.】字母；信件'],
  ['w', '核心意象纽带：书面书写的字符与书信'],
  ['w', '① 本义具象：n. 字母；信件'],
  ['w', 'Write a letter! Look at the first letter \'A\'.'],
  ['w', '② 意象桥梁：书面书写的字符与书信'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. 字母；信件'],
  ['w', 'Write a letter! Look at the first letter \'A\'.'],
  ['w', '多义第1幕'],
  ['s', 'Write a letter! Look at the first letter \'A\'.', '🔤 第一幕【核心本义·英文字母】：黑板上写着 A, B, C 26个字母（26 letters）。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ letter · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
