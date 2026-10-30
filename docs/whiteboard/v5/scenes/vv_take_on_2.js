// 🎬 万能动词 · take on ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_on.js 案例 2；对照清单 lab/INVENTORY_VV_TAKE_ON_2_V5.md
// 角色关键帧：sprites/vvtakeon2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeon2.js';
const ACTS = {"*": ["house0", "house1", "house2"]};
const ITEMS = [
  ['n', 'take on：承担（工作/责任）；呈现（新面貌）'],
  ['m', 'take on ②'],
  ['m', '呈现（新面貌）'],
  ['w', '外墙表面'],
  ['w', '新装贴上墙'],
  ['s', 'Our school takes on a new look!', '我们学校呈现出崭新的面貌！'],
  ['w', 'NEW LOOK!'],
  ['m', 'TAKE'],
  ['m', '拿、取'],
  ['m', '贴到表面上'],
  ['m', '+'],
  ['w', 'He takes on the bag.'],
  ['m', '书包 贴上 肩膀'],
  ['m', '他扛起书包。'],
  ['w', 'It takes on a new look.'],
  ['m', '呈现新面貌。'],
  ['m', '新装 贴上 外墙'],
  ['w', '共同点：ON = 拿上去，贴住表面'],
  ['s', 'Our school takes on a new look!', '我们学校呈现出崭新的面貌！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take on ②', items: ITEMS, acts: ACTS }); }
