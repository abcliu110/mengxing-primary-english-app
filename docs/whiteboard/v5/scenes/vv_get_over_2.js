// 🎬 万能动词 · get over ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「get over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetover2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'get over：（从不快经历中）恢复过来'],
  ['w', 'get over ②'],
  ['w', '（从不快经历中）恢复过来'],
  ['s', 'She never got over the death of her son.', '儿子去世后，她始终没能走出来。', 'get over something'],
  ['m', 'GET'],
  ['m', '在……正上方 / 越过 / 结束'],
  ['w', 'get：得到/变得(get up起床)'],
  ['m', '+'],
  ['w', 'It\'s taken me ages to get over the flu.'],
  ['m', 'get over something：（病后）痊愈；恢复健康'],
  ['w', 'She never got over the death of her son.'],
  ['m', 'get over something：（从不快经历中）恢复过来'],
  ['w', 'It\'s important that we get this message over to young people.'],
  ['m', 'get something over：传达；讲清（信息、想法）'],
  ['w', 'I\'ll be in touch once I\'ve got my exams over.'],
  ['m', 'get something over (with)：做完（不愉快或困难的事）'],
  ['w', 'I don\'t know how we\'re going to get over this problem.'],
  ['m', 'get over something：克服（问题、困难）'],
  ['w', 'I can\'t get over how well you look.'],
  ['m', 'can\'t get over something：对……感到非常惊讶；不敢相信'],
  ['w', '共同点：OVER = 在……正上方 / 越过 / 结束'],
  ['s', 'It\'s taken me ages to get over the flu.', '我花了好久才从流感中恢复过来。', 'get over something'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get over ②', items: ITEMS, acts: ACTS }); }
