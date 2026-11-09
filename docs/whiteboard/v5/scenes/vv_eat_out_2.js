// 🎬 万能动词 · eat out ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「eat out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vveatout2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'eat out：去饭店吃饭；在外用餐（合成）'],
  ['w', 'eat out ②'],
  ['m', 'EAT'],
  ['m', '从里面出来；往外'],
  ['w', 'eat：吃(过去式ate)'],
  ['m', '+'],
  ['w', 'When I lived in Spain, I used to eat out all the time.'],
  ['m', 'eat out：去饭店吃饭；在外用餐'],
  ['w', '共同点：OUT = 从里面出来；往外'],
  ['s', 'When I lived in Spain, I used to eat out all the time.', '住在西班牙时，我总在外面吃饭。', 'eat out'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · eat out ②', items: ITEMS, acts: ACTS }); }
