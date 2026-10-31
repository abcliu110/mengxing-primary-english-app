// 🎞️ cold · 一词多义第1幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_096.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G2_096_1_V5.md
// 角色关键帧：sprites/hdpg2096_1.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg2096_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🥶 cold /koʊld/ — 【adj.】寒冷的，冷的'],
  ['w', '核心意象纽带：寒冷低温及其引发的受凉症状'],
  ['w', '① 本义具象：adj. 寒冷的，冷的'],
  ['w', 'It is cold in winter.'],
  ['w', '② 意象桥梁：寒冷低温及其引发的受凉症状'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. 感冒，伤风（着凉受冻生的小病）'],
  ['w', 'I have a bad cold today.'],
  ['w', '多义第1幕'],
  ['s', 'It is cold in winter.', '❄️ 第一幕【核心本义·寒冷温度】：冰天雪地里温度计下降，冷得直跺脚（cold weather）。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ cold · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
