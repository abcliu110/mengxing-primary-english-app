// 🎬 万能动词 · go over ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgoover3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go over：全格回顾'],
  ['w', 'go over ③'],
  ['w', 'I had gone over and over what happened in my mind.'],
  ['m', 'go over something：仔细考虑；反复想'],
  ['w', 'In the competition, the judge goes over each dog and assesses it.'],
  ['m', 'go over something：仔细检查；查看'],
  ['s', 'In the competition, the judge goes over each dog and assesses it.', '在比赛中，裁判逐一检查每只狗并打分。', 'goes over'],
  ['w', 'Once again I went over exactly what I needed to say.'],
  ['m', 'go over something：再讲一遍；复习'],
  ['s', 'Once again I went over exactly what I needed to say.', '我又把要说的话仔仔细细过了一遍。', 'went over'],
  ['w', '共同点：OVER = 在……正上方 / 越过 / 结束'],
  ['s', 'I had gone over and over what happened in my mind.', '那件事在我脑子里翻来覆去想了好多遍。', 'go over something'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go over ③', items: ITEMS, acts: ACTS }); }
