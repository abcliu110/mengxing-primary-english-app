// 🎬 万能动词 · take over ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「take over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeover1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'take over：（以武力等）夺取；接管（控制）'],
  ['w', 'take over ①'],
  ['w', '（以武力等）夺取；接管（控制）'],
  ['s', 'The parliament was taken over by civil guards.', '议会被民防卫队占领了。', 'take over something'],
  ['m', 'OVER'],
  ['m', '在……正上方 / 越过 / 结束'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take over ①', items: ITEMS, acts: ACTS }); }
