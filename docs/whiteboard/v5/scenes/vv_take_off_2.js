// 🎬 万能动词 · take off ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_off.js 案例 2；对照清单 lab/INVENTORY_VV_TAKE_OFF_2_V5.md
// 角色关键帧：sprites/vvtakeoff2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeoff2.js';
const ACTS = {"*": ["plane0", "plane1", "plane2"]};
const ITEMS = [
  ['n', 'take off：① 脱下（衣帽鞋） ②（飞机）起飞'],
  ['w', 'take off ②'],
  ['w', '起飞'],
  ['s', 'The plane takes off.', '飞机起飞了。'],
  ['m', '地面'],
  ['m', '离开地面'],
  ['m', 'TAKE'],
  ['m', '拿、取'],
  ['m', '离开表面'],
  ['m', '+'],
  ['w', 'Take off your coat.'],
  ['m', '脱下你的外套。'],
  ['m', '衣服 离开 身体'],
  ['w', 'The plane takes off.'],
  ['m', '飞机 离开 地面'],
  ['m', '飞机起飞了。'],
  ['w', '共同点：OFF = 离开原来贴着的表面'],
  ['s', 'Take off your coat! The plane is taking off!', '脱下外套！飞机正在脱离地面起飞！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take off ②', items: ITEMS, acts: ACTS }); }
