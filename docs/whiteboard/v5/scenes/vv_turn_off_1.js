// 🎬 万能动词 · turn off ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_off.js 案例 1；对照清单 lab/INVENTORY_VV_TURN_OFF_1_V5.md
// 角色关键帧：sprites/vvturnoff1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnoff1.js';
const ACTS = {"*": ["m_tvoff0", "m_tvoff1", "m_tvoff2"]};
const ITEMS = [
  ['n', 'turn off：旋转或拨动开关，让电路触点『脱离断开』'],
  ['w', '21:00'],
  ['w', 'turn off ①'],
  ['w', '关掉（电视）'],
  ['w', '触点贴合'],
  ['s', 'Remember to turn off the TV before bed.', '睡前记得把电视关掉。'],
  ['m', '触点断开'],
  ['m', 'OFF'],
  ['m', '画面断开'],
  ['w', 'Bedtime~']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn off ①', items: ITEMS, acts: ACTS }); }
