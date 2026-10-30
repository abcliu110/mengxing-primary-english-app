// 🎬 万能动词 · take down ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_down.js 案例 1；对照清单 lab/INVENTORY_VV_TAKE_DOWN_1_V5.md
// 角色关键帧：sprites/vvtakedown1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakedown1.js';
const ACTS = {"*": ["l_pic0", "l_pic1", "l_pic2"]};
const ITEMS = [
  ['n', 'take down：从高处拿下来 / 拿到纸面上固定'],
  ['w', 'SPRING'],
  ['w', 'take down ①'],
  ['w', '取下，拿下'],
  ['w', '墙上高处'],
  ['s', 'He takes down the poster.', '他把海报取了下来。'],
  ['m', 'DOWN'],
  ['m', '从高处拿下来'],
  ['w', 'Got it!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take down ①', items: ITEMS, acts: ACTS }); }
