// 🎬 万能动词 · get off ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_off.js 案例 1；对照清单 lab/INVENTORY_VV_GET_OFF_1_V5.md
// 角色关键帧：sprites/vvgetoff1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetoff1.js';
const ACTS = {"*": ["bus0", "bus1", "bus2"]};
const ITEMS = [
  ['n', 'get off：双脚脱离大巴/火车/飞机的甲板平面'],
  ['w', 'get off ①'],
  ['w', '✚ HOSPITAL'],
  ['w', '下（公交车）'],
  ['w', '车厢地板'],
  ['s', 'Get off the bus at the hospital.', '在医院那一站下公交车。'],
  ['m', 'OFF'],
  ['m', '脚离开车厢地板']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get off ①', items: ITEMS, acts: ACTS }); }
