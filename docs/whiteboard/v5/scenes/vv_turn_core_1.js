// 🎬 万能动词 · turn 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 POLY_TURN；六格总览：有引证 6/6）——单独 12 幕之一（2026-11-09 第二波定夺转正）；朗读句：OALD turn 义项 1（move round）（2026-11-09 第三波补，中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturncore1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'turn：转弯，转动；变成（颜色/天气变化） / （轮到的）顺序，机会（take turns 轮流）'],
  ['w', 'turn /tɜːrn/'],
  ['w', '转弯，转动；变成（颜色/天气变化） / （轮到的）顺序，机会（take turns 轮流）'],
  ['s', 'The wheels of the car began to turn.', '汽车的轮子开始转动了。', 'turn'],
  ['w', '能说的搭配：'],
  ['m', 'turn up'],
  ['m', 'turn out'],
  ['m', 'turn off'],
  ['m', 'turn down'],
  ['m', 'turn over'],
  ['m', 'turn on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn 核心义', items: ITEMS, acts: ACTS }); }
