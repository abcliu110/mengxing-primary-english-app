// 🎬 万能动词 · stand over ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「stand over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvstandover2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'stand over：站在旁边盯着（别人做事）（合成）'],
  ['w', 'stand over ②'],
  ['m', 'STAND'],
  ['m', '在……正上方 / 越过 / 结束'],
  ['w', 'stand：站，站立'],
  ['m', '+'],
  ['w', 'Don\'t stand over me all the time - it makes me nervous.'],
  ['m', 'stand over somebody：站在旁边盯着（别人做事）'],
  ['w', '共同点：OVER = 在……正上方 / 越过 / 结束'],
  ['s', 'Don\'t stand over me all the time - it makes me nervous.', '别老站在我旁边盯着，我会紧张。', 'stand over somebody'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · stand over ②', items: ITEMS, acts: ACTS }); }
