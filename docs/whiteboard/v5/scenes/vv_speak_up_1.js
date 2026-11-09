// 🎬 万能动词 · speak up ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「speak up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：sprites/vvspeakup1.js（speak → l_speak；第六波 2026-11-10 补，依据见 docs/work-2026-11-09/wave6_item2_acts_empty.md）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvspeakup1.js';
const ACTS = {"speak": ["l_speak"]};
const ITEMS = [
  ['n', 'speak up：大声点说'],
  ['w', 'speak up ①'],
  ['w', '大声点说'],
  ['s', 'Could you speak up, please?', '请你大声一点说，好吗？', 'speak up'],
  ['m', 'UP'],
  ['m', '向上'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · speak up ①', items: ITEMS, acts: ACTS }); }
