// 🎬 万能动词 · put out ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_out.js 案例 2；对照清单 lab/INVENTORY_VV_PUT_OUT_2_V5.md
// 角色关键帧：sprites/vvputout2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputout2.js';
const ACTS = {"*": ["fire0", "fire1", "fire2"]};
const ITEMS = [
  ['n', 'put out：扑灭，熄灭（大火/蜡烛）；伸出'],
  ['m', 'put out ②'],
  ['m', '扑灭（大火）'],
  ['s', 'The brave firemen put out the fire!', '勇敢的消防员扑灭了大火！'],
  ['w', '把大火扑灭'],
  ['w', 'Safe!'],
  ['m', 'PUT'],
  ['m', '从里面出来'],
  ['m', '放、摆'],
  ['m', '+'],
  ['w', 'Put out the candles.'],
  ['m', '吹灭蜡烛。'],
  ['m', '火苗 熄灭'],
  ['w', 'Put out the fire.'],
  ['m', '大火 被扑灭'],
  ['m', '扑灭大火。'],
  ['w', '共同点：OUT = 让火出局、熄灭'],
  ['s', 'The brave firemen put out the fire!', '勇敢的消防员扑灭了大火！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put out ②', items: ITEMS, acts: ACTS }); }
