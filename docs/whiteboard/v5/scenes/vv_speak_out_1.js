// 🎬 万能动词 · speak out ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「speak out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：sprites/vvspeakout1.js（speak → l_speak；第六波 2026-11-10 补，依据见 docs/work-2026-11-09/wave6_item2_acts_empty.md）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvspeakout1.js';
const ACTS = {"speak": ["l_speak"]};
const ITEMS = [
  ['n', 'speak out：公开大胆地说；直言不讳'],
  ['w', 'speak out ①'],
  ['w', '公开大胆地说；直言不讳'],
  ['s', 'He was not afraid to speak out when it was something he believed in strongly', '遇到他坚信的事，他敢直言不讳。', 'speak out'],
  ['m', 'OUT'],
  ['m', '从里面出来；往外'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · speak out ①', items: ITEMS, acts: ACTS }); }
