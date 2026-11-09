// 🎬 万能动词 · take 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 V6_日常_6；六格总览：有引证 6/6）——占位页：形态待定（并入各动词首格或单独 12 幕，见 whiteboard_1.3_note.md §3 定夺 1），无朗读句，待形态定稿后补
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakecore1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'take：带走/乘坐(过去took)'],
  ['w', 'take /teɪk/'],
  ['w', '带走/乘坐(过去took)'],
  ['w', '能说的搭配：'],
  ['m', 'take up'],
  ['m', 'take out'],
  ['m', 'take off'],
  ['m', 'take down'],
  ['m', 'take over'],
  ['m', 'take on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take 核心义', items: ITEMS, acts: ACTS }); }
