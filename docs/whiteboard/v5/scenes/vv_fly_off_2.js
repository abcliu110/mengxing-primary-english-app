// 🎬 万能动词 · fly off ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「fly off」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvflyoff2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'fly off：飞脱；飞掉（部件脱离飞出）（合成）'],
  ['w', 'fly off ②'],
  ['m', 'FLY'],
  ['m', '离开表面'],
  ['w', 'fly：飞；放飞（风筝）'],
  ['m', '+'],
  ['w', 'The wheel on one door flew off and struck a worker.'],
  ['m', 'fly off：飞脱；飞掉（部件脱离飞出）'],
  ['w', '共同点：OFF = 离开表面'],
  ['s', 'The wheel on one door flew off and struck a worker.', '一扇门上的轮子飞了出来，撞到了一名工人。', 'fly off'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fly off ②', items: ITEMS, acts: ACTS }); }
