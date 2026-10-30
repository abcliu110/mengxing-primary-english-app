// 🎬 万能动词 · look out ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_out.js 案例 1；对照清单 lab/INVENTORY_VV_LOOK_OUT_1_V5.md
// 角色关键帧：sprites/vvlookout1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookout1.js';
const ACTS = {"*": ["l_banana0", "m_shout", "l_banana2"]};
const ITEMS = [
  ['n', 'look out：把目光投向窗外警惕危险'],
  ['w', 'look out ①'],
  ['w', '当心，留神'],
  ['w', '!'],
  ['w', 'Look out! A bike!'],
  ['s', 'Look out! A fast bike is coming!', '当心！一辆快车过来了！'],
  ['m', 'OUT'],
  ['m', '当心外面的危险']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look out ①', items: ITEMS, acts: ACTS }); }
