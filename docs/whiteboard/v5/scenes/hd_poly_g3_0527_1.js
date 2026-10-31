// 🎞️ kind · 一词多义第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g3_0527.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G3_0527_1_V5.md
// 角色关键帧：sprites/hdpg30527_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg30527_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '👵 kind /kaɪnd/ — 【adj./n.】慈祥的，善良的，友好的；种类'],
  ['w', '核心意象纽带：同宗同族的类别与亲人般的仁慈'],
  ['w', '① 本义具象：adj. 体贴的，友好的，仁慈的'],
  ['w', 'Our English teacher is very kind.'],
  ['w', '② 意象桥梁：同宗同族的类别与亲人般的仁慈'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. 种类，类别（a kind of 一种…）'],
  ['w', 'What kind of fruit do you like?'],
  ['w', '多义第1幕'],
  ['s', 'Our English teacher is very kind.', '🗂️ 第一幕【核心本义·家族类别】：果园里把同一品种（kind）的苹果归为一类。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ kind · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
