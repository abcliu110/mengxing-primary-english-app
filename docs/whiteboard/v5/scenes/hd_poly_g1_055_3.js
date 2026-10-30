// 🎞️ water · 一词多义第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g1_055.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G1_055_3_V5.md
// 角色关键帧：sprites/hdpg1055_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg1055_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '💧 water /ˈwɔːtər/ — 【n.】水'],
  ['w', '核心意象纽带：生命之源清水与用水浇灌'],
  ['w', '① 本义具象：n. 水（不可数名词）'],
  ['w', 'Drink more water every day.'],
  ['w', '② 意象桥梁：生命之源清水与用水浇灌'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 给…浇水，灌溉'],
  ['w', 'I water the flowers every morning.'],
  ['w', '多义第3幕'],
  ['s', 'I water the flowers every morning.', '🌻 第三幕【引申新义·给…浇水】：名词直接作动词用，表示“给花草浇水（water the plants）”！']
];
export default function build() { return autoBuild(SP, { title: '🎞️ water · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
