// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：model/spacetime.yaml；改本幕台词/结构：model/specs/spacetime_3.yaml；改编排：模板 fp_vectors_3.js（家族共用）。
// 判据/口诀来源：sp-cl-transport。生成器 model/gen_scene.py（items 模式）。
// 🧭 联想工具箱 ⑤ 介词看图猜 · 3 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/fp_vectors.js 案例 3；对照清单 lab/INVENTORY_FP_VECTORS_3_V5.md
// 角色关键帧：sprites/fv3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fv3.js';
const ACTS = {"get on": ["bus2", "bus1", "bus0"], "get in": ["car_in0", "car_in1", "car_in2"], "get off": ["bus0", "bus1", "bus2"], "get out of": ["car_out0", "car_out1", "car_out2"]};
const ITEMS = [
  ['n', '这一幕：上公交说 get on，上小汽车为什么说 get in？'],
  ['w', 'get on the bus vs get in the car'],
  ['w', '⑤ 介词看图猜'],
  ['w', '💡 记法窍门'],
  ['w', 'get on the bus vs get in the car'],
  ['w', '⑤ 介词看图猜'],
  ['m', '💡 记法窍门'],
  ['m', '① 公交 on'],
  ['m', '② 小车 in'],
  ['m', '③ 套用'],
  ['m', '④ 例外 ⚠️'],
  ['m', '⑤ 口诀'],
  ['m', '🔮 预测'],
  ['w', 'BUS'],
  ['n', '公交车里，人上去以后能站起来、走来走去。记住这个身体的感觉。'],
  ['s', 'Let\'s get on the bus.', '我们上公交车吧。', 'get on'],
  ['n', '能站起来走动的交通工具，用 on。火车、飞机也一样能站起来走动，都用 on。'],
  ['w', 'on the bus · on the train · on the plane'],
  ['s', 'On the bus. On the train. On the plane.', '在公交车上。在火车上。在飞机上。', 'bus train plane'],
  ['n', '小汽车不一样：人得坐进小小的空间里，站不起来。坐进小空间的，用 in。出租车也一样。'],
  ['s', 'Get in the car, please.', '请上车。', 'get in'],
  ['w', 'in the car · in a taxi'],
  ['s', 'In the car. In a taxi.', '在小汽车里。在出租车里。', 'in the car taxi'],
  ['s', 'Get on the bus. Get in the car.', '上公交车。上小汽车。', 'the'],
  ['n', '下车也成对：从公交上下来 get off the bus；从小车里出来 get out of the car。'],
  ['w', 'get off the bus'],
  ['w', 'get out of the car'],
  ['s', 'Get off the bus. Get out of the car.', '下公交车。从小汽车里出来。', 'off out of'],
  ['w', '⚠️ 窍门不是标准'],
  ['n', '再说一遍：这是记法窍门，不是按车辆大小硬分的标准。电梯、小船这些不常见的情形，不硬套这个窍门——遇到时按习惯说法单独记。'],
  ['n', '口诀：能站起来走动的车用 on，坐进小空间的车用 in。'],
  ['w', '口诀：能站起来走动的车用 on，坐进小空间的车用 in'],
  ['n', '预测：地铁车厢里，人能站着走来走去。上地铁说 get on 还是 get in？先想 3 秒！'],
  ['w', '🔮 get ___ the subway　→　on 还是 in'],
  ['n', '揭晓：能站起来走动，用 on：get on the subway。'],
  ['w', 'get on the subway —— 能站着走 = on'],
  ['s', 'Let\'s get on the subway.', '我们上地铁吧。', 'subway let\'s'],
  ['w', '💡 一句话洞见'],
  ['w', '上车先问身体：能不能站起来走？'],
  ['w', '能，用 on；坐进小空间，用 in'],
  ['w', '🎵 口诀'],
  ['w', '能站起来走动的车用 on，坐进小空间的车用 in'],
  ['w', '📦 联想工具箱 ⑤ 介词看图猜'],
];
export default function build() { return autoBuild(SP, { title: '上车：能站着走用 on', items: ITEMS, acts: ACTS, actorFitW: 500 }); }
