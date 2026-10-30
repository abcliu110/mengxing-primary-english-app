// 🎬 万能动词 · look away ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_off.js 案例 2；对照清单 lab/INVENTORY_VV_LOOK_OFF_2_V5.md
// 角色关键帧：sprites/vvlookoff2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookoff2.js';
const ACTS = {"*": ["l_spider0", "l_spider1", "l_spider2"]};
const ITEMS = [
  ['n', 'look away / off：把视线移开，看向别处'],
  ['w', 'look away ②'],
  ['s', 'Look away! Don\'t look at the sun.', '快把目光移开！不要直视太阳。'],
  ['w', '目光移开'],
  ['m', 'LOOK'],
  ['m', '看'],
  ['m', '离开目标'],
  ['m', '+'],
  ['w', 'Don\'t look away.'],
  ['m', '别把视线移开。'],
  ['m', '目光 离开 黑板'],
  ['w', 'Look away from the sun.'],
  ['m', '别直视太阳。'],
  ['m', '目光 离开 太阳'],
  ['w', '共同点：AWAY / OFF = 目光离开原来的目标'],
  ['s', 'Don\'t look away from the blackboard.', '视线不要离开黑板。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look away ②', items: ITEMS, acts: ACTS }); }
