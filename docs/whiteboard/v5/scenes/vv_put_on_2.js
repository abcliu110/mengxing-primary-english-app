// 🎬 万能动词 · put on ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_on.js 案例 2；对照清单 lab/INVENTORY_VV_PUT_ON_2_V5.md
// 角色关键帧：sprites/vvputon2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputon2.js';
const ACTS = {"*": ["show0", "show1"]};
const ITEMS = [
  ['n', 'put on：穿上，戴上（衣帽眼镜）；上演（节目）'],
  ['m', 'put on ②'],
  ['m', '上演（节目）'],
  ['s', 'We put on a show for our parents.', '我们为爸爸妈妈上演了一场节目。'],
  ['m', '♪'],
  ['m', '舞台'],
  ['m', '节目放到舞台上'],
  ['m', 'PUT'],
  ['m', '放、摆'],
  ['m', '贴到表面上'],
  ['m', '+'],
  ['w', 'Put on your hat.'],
  ['m', '帽子 贴合 头顶'],
  ['m', '戴上帽子。'],
  ['w', 'Put on a show.'],
  ['m', '上演节目。'],
  ['m', '节目 放上 舞台'],
  ['w', '共同点：ON = 放到表面上（身上 / 舞台上）'],
  ['s', 'Put on your warm hat and gloves!', '戴上你的暖和帽子和手套！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put on ②', items: ITEMS, acts: ACTS }); }
