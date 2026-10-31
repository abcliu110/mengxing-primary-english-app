// 🎞️ light · 一词多义第3幕 —— 决策 38 ⑩ 啊哈重做；T12-B1b 起改用同形异源专用变体 scenes/hd_poly_g4_157_v2.js（双栏并置，理由见该文件头注与 T12b1b.done；poly.js 不动）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g4_157.js 案例 3；对照清单 lab/INVENTORY_HD_POLY_G4_157_3_V5.md
// 角色关键帧：sprites/hdpg4157_3.js（人物先行帧库 cast/）
import { lightTwinsBuild } from './hd_poly_g4_157_v2.js';
import * as SP from '../sprites/hdpg4157_3.js';
const ACTS = {"*": ["l_idea1", "l_hand0", "l_laugh"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '💡 light /laɪt/ — 【n./adj.】电灯，光线；轻的'],
  ['w', '核心提醒：light 是两个同名同姓的『双胞胎』——light（光）和 light（轻）是两个不同的词，只是长得一模一样。'],
  ['w', '① 本义具象：n. 光，光线；电灯'],
  ['w', 'Turn on the light, please.'],
  ['w', '② 联想桥梁（只是帮记忆，不是亲戚关系）：记 light（轻）时，可以联想『像光一样没有重量』来帮忙——这是记忆钩子，不是这个词的来历。'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 另一个 light：adj. 轻的（反义词 heavy）。它和 light（光）同形不同源：『光』的老祖先是表示『发光』的词根 *leuk-，『轻』的老祖先是表示『轻』的词根 *legʷʰ-，从古英语起就是两个词。'],
  ['w', 'This small box is very light.'],
  ['w', '多义第3幕'],
  ['s', 'This small box is very light.', '🪶 第三幕【引申新义·轻的 & 浅色的】：引申为形容词“轻便的（light box）”和“浅色的（light blue）”！']
];
export default function build() { return lightTwinsBuild(SP, { title: '🎞️ light · 一词多义第3幕', items: ITEMS, acts: ACTS }); }
