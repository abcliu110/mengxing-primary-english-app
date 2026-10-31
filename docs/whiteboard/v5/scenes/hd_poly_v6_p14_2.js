// 🎞️ letter · 一词多义第2幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_v6_p14.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_V6_P14_2_V5.md
// 角色关键帧：sprites/hdpv6p14_2.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpv6p14_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
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
  ['w', '多义第2幕'],
  ['s', 'Write a letter! Look at the first letter \'A\'.', '🔄 第二幕【场景变形·字母连成书信】：把一个个字母写在信纸上装入信封。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ letter · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
