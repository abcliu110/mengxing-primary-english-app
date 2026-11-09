// 🎬 万能动词 · stand out ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「stand out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvstandout2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'stand out：出众；杰出'],
  ['w', 'stand out ②'],
  ['w', '出众；杰出'],
  ['s', 'Three of the cars we tested stood out among the rest.', '我们测试的车里，有三辆格外出众。', 'stand out'],
  ['m', 'STAND'],
  ['m', '从里面出来；往外'],
  ['w', 'stand：站，站立'],
  ['m', '+'],
  ['w', 'The outlines of rooftops and chimneys stood out against the pale sky.'],
  ['m', 'stand out：显眼；醒目'],
  ['w', 'Three of the cars we tested stood out among the rest.'],
  ['m', 'stand out：出众；杰出'],
  ['w', 'The veins stood out on his throat and temples.'],
  ['m', 'stand out：凸出；鼓出'],
  ['w', '共同点：OUT = 从里面出来；往外'],
  ['s', 'The outlines of rooftops and chimneys stood out against the pale sky.', '屋顶和烟囱的轮廓在苍白的天空映衬下格外显眼。', 'stand out'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · stand out ②', items: ITEMS, acts: ACTS }); }
