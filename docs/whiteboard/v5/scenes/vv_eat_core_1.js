// 🎬 万能动词 · eat 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 V6_日常_15；六格总览：有引证 2/6）——占位页：形态待定（并入各动词首格或单独 12 幕，见 whiteboard_1.3_note.md §3 定夺 1），无朗读句，待形态定稿后补
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vveatcore1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'eat：吃(过去式ate)'],
  ['w', 'eat /iːt/'],
  ['w', '吃(过去式ate)'],
  ['w', '能说的搭配：'],
  ['m', 'eat up'],
  ['m', 'eat out'],
  ['w', '查过，没有的搭配：'],
  ['m', 'eat off'],
  ['m', 'eat down'],
  ['m', 'eat over'],
  ['m', 'eat on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · eat 核心义', items: ITEMS, acts: ACTS }); }
