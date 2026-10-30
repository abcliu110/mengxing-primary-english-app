// 🎬 万能动词 · take out ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_out.js 案例 1；对照清单 lab/INVENTORY_VV_TAKE_OUT_1_V5.md
// 角色关键帧：sprites/vvtakeout1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeout1.js';
const ACTS = {"*": ["l_bag0", "l_bag1", "l_bag2"]};
const ITEMS = [
  ['n', 'take out：从书包/口袋容器里往外拿出来'],
  ['w', 'take out ①'],
  ['w', '拿出，取出'],
  ['w', '书包 = 容器'],
  ['w', 'English'],
  ['s', 'Please take out your English book.', '请把英语书从书包里拿出来。'],
  ['m', 'OUT'],
  ['m', '从书包里拿出来'],
  ['w', 'Here it is!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take out ①', items: ITEMS, acts: ACTS }); }
