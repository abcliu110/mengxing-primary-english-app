// 🎬 万能动词 · give over ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「give over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveover1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'give over：停止做，别再做（英式，过时，非正式）'],
  ['w', 'give over ①'],
  ['w', '停止做，别再做（英式，过时，非正式）'],
  ['s', 'It\'s time you gave over pretending you\'re still a teenager.', '你别再装得自己还是个十几岁的孩子了，该停停了。', 'give over'],
  ['m', 'OVER'],
  ['m', '在……正上方 / 越过 / 结束'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give over ①', items: ITEMS, acts: ACTS }); }
