// 🎞️ water · 一词多义第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g1_055.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G1_055_2_V5.md
// 角色关键帧：sprites/hdpg1055_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg1055_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
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
  ['w', '多义第2幕'],
  ['s', 'Drink more water every day.', '🔄 第二幕【场景变形·把水洒向植物】：把水装进喷壶，倾斜壶嘴浇在干渴的花苗上。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ water · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
