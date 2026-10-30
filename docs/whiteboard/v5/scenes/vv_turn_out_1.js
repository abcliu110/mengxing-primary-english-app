// 🎬 万能动词 · turn out ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_out.js 案例 1；对照清单 lab/INVENTORY_VV_TURN_OUT_1_V5.md
// 角色关键帧：sprites/vvturnout1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnout1.js';
const ACTS = {"*": ["l_seed0", "l_seed1", "l_seed2"]};
const ITEMS = [
  ['n', 'turn out：事情翻转到最后向外显露出的结果'],
  ['w', 'turn out ①'],
  ['m', '早上：阴天?'],
  ['m', '结果是'],
  ['s', 'The weather turned out sunny and warm!', '结果天气变得晴朗又温暖！'],
  ['m', 'OUT'],
  ['m', '结果显露出来'],
  ['m', '结果：晴天!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn out ①', items: ITEMS, acts: ACTS }); }
