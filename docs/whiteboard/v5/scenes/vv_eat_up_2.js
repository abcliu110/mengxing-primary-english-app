// 🎬 万能动词 · eat up ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「eat up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vveatup2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'eat up：大量耗用（钱、油等）；耗尽'],
  ['w', 'eat up ②'],
  ['w', '大量耗用（钱、油等）；耗尽'],
  ['s', 'Big cars just eat up money.', '大车可费钱了。', 'eat up'],
  ['m', 'EAT'],
  ['m', '向上'],
  ['w', 'eat：吃(过去式ate)'],
  ['m', '+'],
  ['w', 'She\'s made a cake and wants us to help eat it up.'],
  ['m', 'eat up：吃完；吃光'],
  ['w', 'Big cars just eat up money.'],
  ['m', 'eat up：大量耗用（钱、油等）；耗尽'],
  ['w', '共同点：UP = 向上'],
  ['s', 'She\'s made a cake and wants us to help eat it up.', '她做了个蛋糕，想让我们帮忙吃完。', 'eat up'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · eat up ②', items: ITEMS, acts: ACTS }); }
