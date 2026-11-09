// 🎬 万能动词 · get over ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「get over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetover1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'get over：（病后）痊愈；恢复健康'],
  ['w', 'get over ①'],
  ['w', '（病后）痊愈；恢复健康'],
  ['s', 'It\'s taken me ages to get over the flu.', '我花了好久才从流感中恢复过来。', 'get over something'],
  ['m', 'OVER'],
  ['m', '在……正上方 / 越过 / 结束'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get over ①', items: ITEMS, acts: ACTS }); }
