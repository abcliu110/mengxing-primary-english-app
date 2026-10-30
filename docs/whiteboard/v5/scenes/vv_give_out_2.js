// 🎬 万能动词 · give out ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_out.js 案例 2；对照清单 lab/INVENTORY_VV_GIVE_OUT_2_V5.md
// 角色关键帧：sprites/vvgiveout2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveout2.js';
const ACTS = {"*": ["l_lantern"]};
const ITEMS = [
  ['n', 'give out：分发，派发（书本/礼物）；发出'],
  ['w', 'give out ②'],
  ['w', '发出（光）'],
  ['w', '光往外发出'],
  ['s', 'The lighthouse gives out bright light.', '灯塔发出明亮的光。'],
  ['m', 'GIVE'],
  ['m', '从里面出来'],
  ['m', '给、交出'],
  ['m', '+'],
  ['w', 'Give out the notebooks.'],
  ['m', '分发笔记本。'],
  ['m', '本子 往外 分发'],
  ['w', 'It gives out light.'],
  ['m', '光 往外 发出'],
  ['m', '它发出光。'],
  ['w', '共同点：OUT = 从中心往外送出去'],
  ['s', 'Can you help me give out the notebooks?', '你能帮我把笔记本分发给大家吗？']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give out ②', items: ITEMS, acts: ACTS }); }
