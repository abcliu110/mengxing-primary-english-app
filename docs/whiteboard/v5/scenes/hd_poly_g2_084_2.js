// 🎞️ fly · 一词多义第2幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_084.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G2_084_2_V5.md
// 角色关键帧：sprites/hdpg2084_2.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg2084_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🪁 fly /flaɪ/ — 【v.】飞；放飞（风筝）'],
  ['w', '核心意象纽带：在空中拍翅或乘风翱翔'],
  ['w', '① 本义具象：v. 飞，飞行；放飞（风筝）'],
  ['w', 'Birds can fly in the sky.'],
  ['w', '② 意象桥梁：在空中拍翅或乘风翱翔'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. 苍蝇（到处嗡嗡乱飞的小昆虫）'],
  ['w', 'A small fly is on the wall.'],
  ['w', '多义第2幕'],
  ['s', 'Birds can fly in the sky.', '🔄 第二幕【场景变形·以飞命名的昆虫】：镜头拉近到一只整天嗡嗡不停飞来飞去的小昆虫。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ fly · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
