// 🎬 万能动词 · stand up ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「stand up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：sprites/vvstandup1.js（stand up → l_sit, l_stand；第六波 2026-11-10 补，依据见 docs/work-2026-11-09/wave6_item2_acts_empty.md）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvstandup1.js';
const ACTS = {"stand up": ["l_sit", "l_stand"]};
const ITEMS = [
  ['n', 'stand up：站立；站起来'],
  ['w', 'stand up ①'],
  ['w', '站立；站起来'],
  ['s', 'Stand up straight and don\'t slouch!', '站直，别驼背！', 'stand up'],
  ['m', 'UP'],
  ['m', '向上'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · stand up ①', items: ITEMS, acts: ACTS }); }
