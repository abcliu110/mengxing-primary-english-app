// 🎞️ draw · 一词多义第3幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g3_0790.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G3_0790_3_V5.md
// 角色关键帧：sprites/hdpg30790_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg30790_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🖍️ draw /draw/ — 【v.】画，绘画；拉，吸引'],
  ['w', '核心意象纽带：用线条牵引拉动'],
  ['w', '① 本义具象：v. 画，绘画（牵引画笔在纸上拉出线条）'],
  ['w', 'Can you draw a cute panda?'],
  ['w', '② 意象桥梁：用线条牵引拉动'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 拉，拖；吸引（把窗帘或目光拉过来）'],
  ['w', 'Draw the curtains, please.'],
  ['w', '多义第3幕'],
  ['s', 'Draw the curtains, please.', '🪟 第三幕【引申新义·拉动与抽屉】：明白 draw 本质是“拉”，所以“抽拉的盒子”就叫 drawer（抽屉）！']
];
export default function build() { return autoBuild(SP, { title: '🎞️ draw · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
