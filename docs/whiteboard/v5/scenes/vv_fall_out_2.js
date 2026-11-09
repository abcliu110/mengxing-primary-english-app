// 🎬 万能动词 · fall out ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「fall out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvfallout2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'fall out：吵架；闹翻'],
  ['w', 'fall out ②'],
  ['w', '吵架；闹翻'],
  ['s', 'She\'d fallen out with her boyfriend over his ex-girlfriend.', '她因为男友的前女友跟男友闹翻了。', 'fall out (with somebody)'],
  ['m', 'FALL'],
  ['m', '从里面出来；往外'],
  ['w', 'fall：秋天(美)/落下'],
  ['m', '+'],
  ['w', 'Her hair started falling out as a result of radiation treatment.'],
  ['m', 'fall out：（头发、牙齿）脱落，掉落'],
  ['w', 'She\'d fallen out with her boyfriend over his ex-girlfriend.'],
  ['m', 'fall out (with somebody)：吵架；闹翻'],
  ['w', '共同点：OUT = 从里面出来；往外'],
  ['s', 'Her hair started falling out as a result of radiation treatment.', '因为放疗，她的头发开始脱落。', 'fall out'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fall out ②', items: ITEMS, acts: ACTS }); }
