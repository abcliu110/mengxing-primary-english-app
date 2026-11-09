// 🎬 万能动词 · go on ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go on」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgoon3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go on：全格回顾'],
  ['w', 'go on ③'],
  ['w', 'He went on working until he was 91.'],
  ['m', 'go on：继续（做）'],
  ['w', 'I don\'t know what\'s going on.'],
  ['m', 'go on：发生'],
  ['w', 'She went on to become a successful surgeon.'],
  ['m', 'go on to do something：接着（做下一件事）'],
  ['w', 'Go on, I\'m listening.'],
  ['m', 'go on：接着说'],
  ['w', 'The heat goes on automatically at 6 o\'clock.'],
  ['m', 'go on：（机器、设备）开始运转'],
  ['w', 'As time went on, I grew fond of him.'],
  ['m', 'go on：（时间）流逝；过去'],
  ['w', '共同点：ON = 在……上面（有接触）'],
  ['s', 'He went on working until he was 91.', '他一直工作到九十一岁。', 'go on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go on ③', items: ITEMS, acts: ACTS }); }
