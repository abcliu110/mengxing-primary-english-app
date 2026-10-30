// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Stop and wait at a red light! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC08_4_V5.md
// 角色关键帧：sprites/hdo08_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_4.js';
const ACTS = {"*": ["l_lookup", "bus1", "l_think"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Stop and wait at a red light! （红灯停，等一等！（交通安全规则必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 交通规则必背三剑客：Red(Stop & wait) · Yellow(Slow down) · Green(Go)!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hurry up! The bus is coming! Let\'s run across the street!'],
  ['w', '快点！公交车来了！我们跑过马路吧！'],
  ['s', 'Hurry up! The bus is coming! Let\'s run across the street!', '快点！公交车来了！我们跑过马路吧！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Wait! Don\'t go at the red light! We must stop and wait at a red light!'],
  ['w', '等等！别闯红灯！红灯时我们必须停下来等待！'],
  ['s', 'Wait! Don\'t go at the red light! We must stop and wait at a red light!', '等等！别闯红灯！红灯时我们必须停下来等待！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Stop and wait at a red light!', items: ITEMS, acts: ACTS }); }
