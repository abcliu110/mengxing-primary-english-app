// 🎞️ book · 一词多义第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g1_002.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G1_002_1_V5.md
// 角色关键帧：sprites/hdpg1002_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg1002_1.js';
const ACTS = {"*": ["l_books", "l_read", "l_think"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '📖 book /bʊk/ — 【n.】书，书本'],
  ['w', '核心意象纽带：把信息装订/登记在册子里'],
  ['w', '① 本义具象：n. 书，书本'],
  ['w', 'I read an interesting book.'],
  ['w', '② 意象桥梁：把信息装订/登记在册子里'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：v. 预订，预约（把名字写进登记册里留座）'],
  ['w', 'Let\'s book a ticket online.'],
  ['w', '多义第1幕'],
  ['s', 'I read an interesting book.', '📖 第一幕【核心本义·纸质书册】：桌上一本厚厚的纸质故事书（a story book）。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ book · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
