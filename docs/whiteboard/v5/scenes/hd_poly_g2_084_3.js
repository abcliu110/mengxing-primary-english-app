// 🎞️ fly · 一词多义第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_084.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G2_084_3_V5.md
// 角色关键帧：sprites/hdpg2084_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg2084_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
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
  ['w', '多义第3幕'],
  ['s', 'A small fly is on the wall.', '🪰 第三幕【引申新义·苍蝇】：直接把这种“飞虫”命名为名词 fly（复数 flies）！']
];
export default function build() { return autoBuild(SP, { title: '🎞️ fly · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
