// 🎬 万能动词 · give off ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_off.js 案例 1；对照清单 lab/INVENTORY_VV_GIVE_OFF_1_V5.md
// 角色关键帧：sprites/vvgiveoff1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveoff1.js';
const ACTS = {"*": ["m_bread", "m_flower"]};
const ITEMS = [
  ['n', 'give off：气味或光芒脱离花朵表面向外散发'],
  ['w', 'give off ①'],
  ['w', '散发（香味）'],
  ['m', 'OFF'],
  ['m', '香味离开花朵'],
  ['s', 'The flowers give off a sweet smell.', '花朵散发出甜美的香气。'],
  ['w', 'Mmm, sweet!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give off ①', items: ITEMS, acts: ACTS }); }
