// 🎬 万能动词 · stand down ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「stand down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvstanddown1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'stand down：辞职；退出竞选（英式）'],
  ['w', 'stand down ①'],
  ['w', '辞职；退出竞选（英式）'],
  ['s', 'He was obliged to stand down as a parliamentary candidate.', '他不得不退出议员候选人的竞选。', 'stand down'],
  ['m', 'DOWN'],
  ['m', '向下'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · stand down ①', items: ITEMS, acts: ACTS }); }
