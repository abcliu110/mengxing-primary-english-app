// 🎬 万能动词 · play down ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplaydown1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play down：淡化；轻描淡写'],
  ['w', 'play down ①'],
  ['w', '淡化；轻描淡写'],
  ['s', 'Western diplomats have played down the significance of the reports.', '西方外交官淡化了这些报道的重要性。', 'play something down'],
  ['m', 'DOWN'],
  ['m', '向下'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play down ①', items: ITEMS, acts: ACTS }); }
