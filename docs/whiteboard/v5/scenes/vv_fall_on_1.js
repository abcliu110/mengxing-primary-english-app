// 🎬 万能动词 · fall on ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「fall on」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvfallon1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'fall on：（怀疑等）落到（某人）头上'],
  ['w', 'fall on ①'],
  ['w', '（怀疑等）落到（某人）头上'],
  ['s', 'He was the last person to see the woman alive, and suspicion immediately fell on him.', '他是最后一个见过那位女士还活着的人，怀疑立刻落到了他头上。', 'fall on somebody'],
  ['m', 'ON'],
  ['m', '在……上面（有接触）'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fall on ①', items: ITEMS, acts: ACTS }); }
