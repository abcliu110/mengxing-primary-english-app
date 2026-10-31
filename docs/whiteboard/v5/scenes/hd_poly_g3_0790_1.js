// 🎞️ draw · 一词多义第1幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g3_0790.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G3_0790_1_V5.md
// 角色关键帧：sprites/hdpg30790_1.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
import * as SP from '../sprites/hdpg30790_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🖍️ draw /drɔː/ — 【v.】画，绘画；拉，吸引'],
  ['w', '核心意象纽带：用线条牵引拉动'],
  ['w', '① 本义具象：v. 画，绘画（牵引画笔在纸上拉出线条）'],
  ['w', 'Can you draw a cute panda?'],
  ['w', '② 意象桥梁：用线条牵引拉动'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 拉，拖；吸引（把窗帘或目光拉过来）'],
  ['w', 'Draw the curtains, please.'],
  ['w', '多义第1幕'],
  ['s', 'Can you draw a cute panda?', '✏️ 第一幕【核心本义·拉动线条作画】：小画家握着铅笔，在纸上拉出一道道优美的线条（draw a picture）。']
];
export default function build() { return polyBuild(SP, { title: '🎞️ draw · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
