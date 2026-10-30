// 🎬 万能动词 · turn out ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_out.js 案例 2；对照清单 lab/INVENTORY_VV_TURN_OUT_2_V5.md
// 角色关键帧：sprites/vvturnout2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnout2.js';
const ACTS = {"*": ["shadow0", "shadow1", "cat_light"]};
const ITEMS = [
  ['n', 'turn out：结果是，原来是，证明是'],
  ['w', '?'],
  ['w', 'turn out ②'],
  ['w', '原来是'],
  ['w', 'Meow?'],
  ['s', 'The noise turned out to be a kitten!', '原来那个声音是一只小猫！'],
  ['m', '真相露出来'],
  ['m', 'A kitten!'],
  ['m', 'TURN'],
  ['m', '从里面出来'],
  ['m', '转动'],
  ['m', '+'],
  ['w', 'It turned out sunny.'],
  ['m', '结果 显露 出来'],
  ['m', '结果是晴天。'],
  ['w', 'It turned out to be a kitten.'],
  ['m', '原来是只小猫。'],
  ['m', '真相 露 出来'],
  ['w', '共同点：OUT = 翻过来，结果露出来'],
  ['s', 'The weather turned out sunny and warm!', '结果天气变得晴朗又温暖！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn out ②', items: ITEMS, acts: ACTS }); }
