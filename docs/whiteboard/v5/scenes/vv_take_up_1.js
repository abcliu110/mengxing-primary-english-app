// 🎬 万能动词 · take up ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_up.js 案例 1；对照清单 lab/INVENTORY_VV_TAKE_UP_1_V5.md
// 角色关键帧：sprites/vvtakeup1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeup1.js';
const ACTS = {"*": ["l_guitar0", "l_guitar1", "l_guitar2"]};
const ITEMS = [
  ['n', 'take up：向上拿起一件新事物开始做 / 占满空间'],
  ['m', 'take up ①'],
  ['m', '开始从事（爱好）'],
  ['w', 'What to do?'],
  ['m', 'UP'],
  ['m', '拿起来'],
  ['s', 'He took up painting last summer.', '他去年夏天开始学画画。'],
  ['w', '开始画画！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take up ①', items: ITEMS, acts: ACTS }); }
