// 🎬 万能动词 · stand up ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「stand up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvstandup2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'stand up：经得起（检验、考验）'],
  ['w', 'stand up ②'],
  ['w', '经得起（检验、考验）'],
  ['s', 'The memoirs stand up well to cross-checking with other records.', '这部回忆录和其他记录对照核查下来，站得住脚。', 'stand up'],
  ['m', 'STAND'],
  ['m', '向上'],
  ['w', 'stand：站，站立'],
  ['m', '+'],
  ['w', 'Stand up straight and don\'t slouch!'],
  ['m', 'stand up：站立；站起来'],
  ['w', 'The memoirs stand up well to cross-checking with other records.'],
  ['m', 'stand up：经得起（检验、考验）'],
  ['w', 'I was supposed to go to a concert with Kyle on Friday, but he stood me up.'],
  ['m', 'stand somebody up：爽约；放（约好见面的人）鸽子'],
  ['s', 'I was supposed to go to a concert with Kyle on Friday, but he stood me up.', '我本该周五和凯尔去听音乐会，可他放了我鸽子。', 'stood up'],
  ['w', '共同点：UP = 向上'],
  ['s', 'Stand up straight and don\'t slouch!', '站直，别驼背！', 'stand up'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · stand up ②', items: ITEMS, acts: ACTS }); }
