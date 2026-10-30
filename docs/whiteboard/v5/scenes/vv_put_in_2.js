// 🎬 万能动词 · put in ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_in.js 案例 2；对照清单 lab/INVENTORY_VV_PUT_IN_2_V5.md
// 角色关键帧：sprites/vvputin2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputin2.js';
const ACTS = {"*": ["l_paint0", "l_paint1", "l_trophy"]};
const ITEMS = [
  ['n', 'put in：放进，投入（时间/精力）'],
  ['m', '0 min'],
  ['m', '10 min'],
  ['m', 'Practice'],
  ['m', 'put in ②'],
  ['m', '投入（时间、精力）'],
  ['m', '练琴罐'],
  ['w', '时间投进去'],
  ['s', 'He puts in 30 minutes of practice every day.', '他每天投入三十分钟练琴。'],
  ['w', '20 min'],
  ['w', '30 min'],
  ['m', 'PUT'],
  ['m', '放、摆'],
  ['m', '进入里面'],
  ['m', '+'],
  ['w', 'Put toys in the box.'],
  ['m', '玩具 进入 箱子'],
  ['m', '玩具放进箱子。'],
  ['w', 'Put in time.'],
  ['m', '投入时间。'],
  ['m', '时间 投进 练琴罐'],
  ['w', '共同点：IN = 放进容器里'],
  ['s', 'Put your toys in the toy box.', '把你的玩具放进玩具箱里。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put in ②', items: ITEMS, acts: ACTS }); }
