// 🎬 万能动词 · play out ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplayout1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play out：（事态）发展；演变'],
  ['w', 'play out ①'],
  ['w', '（事态）发展；演变'],
  ['s', 'The debate will play out in the media over the next week or two.', '这场辩论会在接下来一两周里通过媒体展开。', 'play out'],
  ['m', 'OUT'],
  ['m', '从里面出来；往外'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play out ①', items: ITEMS, acts: ACTS }); }
