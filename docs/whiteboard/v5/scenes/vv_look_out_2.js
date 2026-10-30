// 🎬 万能动词 · look out ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_out.js 案例 2；对照清单 lab/INVENTORY_VV_LOOK_OUT_2_V5.md
// 角色关键帧：sprites/vvlookout2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookout2.js';
const ACTS = {"*": ["l_win0", "l_win1", "l_win2"]};
const ITEMS = [
  ['n', 'look out：向窗外看；留神，当心 (= Be careful!)'],
  ['w', 'look out of ②'],
  ['w', '向窗外看'],
  ['w', '目光投向窗外'],
  ['s', 'Look out of the window. A rainbow!', '往窗外看，有彩虹！'],
  ['m', 'LOOK'],
  ['m', '从里面出来'],
  ['m', '看'],
  ['m', '+'],
  ['m', 'Look out!'],
  ['m', '当心！'],
  ['m', '留神 外面的危险'],
  ['w', 'Look out of the window.'],
  ['m', '往窗外看。'],
  ['m', '目光 投向 外面'],
  ['w', '共同点：OUT = 目光投向外面'],
  ['s', 'Look out! A fast bike is coming!', '当心（留神）！一辆快车过来了！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look out ②', items: ITEMS, acts: ACTS }); }
