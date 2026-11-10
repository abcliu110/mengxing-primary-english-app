// 🎬 万能动词 · give back ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_down.js 案例 1；对照清单 lab/INVENTORY_VV_GIVE_DOWN_1_V5.md
// 2026-11-09 第三波：由已下线 vv_give_down_1.js 原文恢复，另立 vv_give_back 页签（内容一字未动；见 docs/work-2026-11-09/wave3_item3_give_back.md）
// 角色关键帧：sprites/vvgiveback1.js（人物先行帧库 cast/；帧 l_pencil / m_lost / pencil_back 见 CAST_V5.md V32）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveback1.js';
const ACTS = {"*": ["l_pencil", "m_lost", "pencil_back"]};
const ITEMS = [
  ['n', 'give back 是 give 的常用搭配，意思是‘归还’。'],
  ['w', 'Amy'],
  ['w', 'give back ①'],
  ['w', '归还'],
  ['s', 'Please give back my ruler after class.', '下课后请把尺子还给我。'],
  ['m', 'BACK'],
  ['m', '还回去'],
  ['w', '回到原主那里'],
  ['w', 'Thanks!'],
  ['s', 'Thanks!', '谢谢！'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give back ①', items: ITEMS, acts: ACTS }); }
