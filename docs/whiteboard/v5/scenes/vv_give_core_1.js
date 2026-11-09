// 🎬 万能动词 · give 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 V6_日常_8；六格总览：有引证 4/6）——单独 12 幕之一（2026-11-09 第二波定夺转正），无朗读句
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgivecore1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'give：给(过去式gave)'],
  ['w', 'give /ɡɪv/'],
  ['w', '给(过去式gave)'],
  ['w', '能说的搭配：'],
  ['m', 'give up'],
  ['m', 'give out'],
  ['m', 'give off'],
  ['m', 'give over'],
  ['w', '查过，没有的搭配：'],
  ['m', 'give down'],
  ['m', 'give on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give 核心义', items: ITEMS, acts: ACTS }); }
