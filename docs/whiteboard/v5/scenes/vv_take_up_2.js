// 🎬 万能动词 · take up ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_up.js 案例 2；对照清单 lab/INVENTORY_VV_TAKE_UP_2_V5.md
// 角色关键帧：sprites/vvtakeup2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeup2.js';
const ACTS = {"*": ["room0", "room1", "room2"]};
const ITEMS = [
  ['n', 'take up：开始从事（新爱好）；占据（时间/空间）'],
  ['m', '0%'],
  ['m', 'BOX'],
  ['m', 'take up ②'],
  ['w', '占据（时间 / 空间）'],
  ['w', '房间空间'],
  ['m', '2%'],
  ['m', '3%'],
  ['m', '占满空间'],
  ['m', '6%'],
  ['m', '10%'],
  ['m', '14%'],
  ['m', '19%'],
  ['m', '24%'],
  ['s', 'The big box takes up much space.', '大箱子占了很大地方。'],
  ['m', '31%'],
  ['m', '38%'],
  ['m', '46%'],
  ['m', '54%'],
  ['m', '61%'],
  ['m', '68%'],
  ['m', '73%'],
  ['m', '78%'],
  ['m', '82%'],
  ['m', '86%'],
  ['m', '89%'],
  ['m', '90%'],
  ['m', '92%'],
  ['m', 'TAKE'],
  ['m', '向上 / 填满'],
  ['m', '拿、取'],
  ['m', '+'],
  ['w', 'He took up painting.'],
  ['m', '他开始学画画。'],
  ['m', '拿起来 开始做'],
  ['w', 'It takes up space.'],
  ['m', '向上 填满 空间'],
  ['m', '它占地方。'],
  ['w', '共同点：UP = 向上拿起，一直到满'],
  ['s', 'He took up painting last summer.', '他去年夏天开始学画画。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take up ②', items: ITEMS, acts: ACTS }); }
