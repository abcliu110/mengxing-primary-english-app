// 🎬 万能动词 · look in ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_in.js 案例 2；对照清单 lab/INVENTORY_VV_LOOK_IN_2_V5.md
// 角色关键帧：sprites/vvlookin2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookin2.js';
const ACTS = {"*": ["l_detect0", "l_detect1", "l_detect2"]};
const ITEMS = [
  ['n', 'look in / into：往里面看；调查，研究 (look into)'],
  ['w', 'Cookies'],
  ['w', 'look into ②'],
  ['m', '空了!'],
  ['m', '调查，研究'],
  ['w', '深入调查'],
  ['s', 'Let\'s look into it. Who ate the cookies?', '我们来调查一下，是谁吃了饼干？'],
  ['w', '是猫咪!'],
  ['m', 'LOOK'],
  ['m', '看'],
  ['m', '进入里面'],
  ['m', '+'],
  ['w', 'Look in the box.'],
  ['m', '往盒子里看。'],
  ['m', '目光 进入 盒子'],
  ['w', 'Look into it.'],
  ['m', '目光 深入 事情里'],
  ['m', '调查一下。'],
  ['w', '共同点：IN / INTO = 目光钻进里面'],
  ['s', 'Look in the box! What\'s inside?', '往盒子里看！里面有什么？']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look in ②', items: ITEMS, acts: ACTS }); }
