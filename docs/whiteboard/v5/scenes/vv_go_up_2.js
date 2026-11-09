// 🎬 万能动词 · go up ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgoup2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go up：（建筑、标志）被建起；竖立'],
  ['w', 'go up ②'],
  ['w', '（建筑、标志）被建起；竖立'],
  ['s', 'It was a lovely place before all these new houses went up.', '在这些新房子盖起来之前，这里是个很美的地方。', 'go up'],
  ['m', 'GO'],
  ['m', '向上'],
  ['w', 'go：去(过去式went)'],
  ['m', '+'],
  ['w', 'Train fares have gone up.'],
  ['m', 'go up：上升；上涨'],
  ['w', 'It was a lovely place before all these new houses went up.'],
  ['m', 'go up：（建筑、标志）被建起；竖立'],
  ['w', 'The whole building went up in flames.'],
  ['m', 'go up：爆炸；起火烧毁'],
  ['w', 'A great cheer went up from the audience.'],
  ['m', 'go up：（喊声、欢呼声）响起'],
  ['w', 'We\'re going up to Scotland next weekend.'],
  ['m', 'go up：去（北方、城镇）（英式）'],
  ['w', '共同点：UP = 向上'],
  ['s', 'Train fares have gone up.', '火车票涨价了。', 'go up'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go up ②', items: ITEMS, acts: ACTS }); }
