// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_hd_poly_g1_002_1.yaml；改编排：模板 hd_poly_g1_002_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎞️ book · 一词多义第1幕 —— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g1_002.js 案例 1；对照清单 lab/INVENTORY_HD_POLY_G1_002_1_V5.md
// 角色关键帧：sprites/hdpg1002_1.js（人物先行帧库 cast/）
import { polyBuild } from './poly.js';
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
  ['s', 'I read an interesting book.', '📖 第一幕【核心本义·纸质书册】：桌上一本厚厚的纸质故事书（a story book）。'],
];
export default function build() { return polyBuild(SP, { title: '🎞️ book · 一词多义第1幕', items: ITEMS, acts: ACTS }); }
