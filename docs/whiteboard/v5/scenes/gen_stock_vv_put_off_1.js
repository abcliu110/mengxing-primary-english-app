// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_put_off_1.yaml；改编排：模板 vv_put_off_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · put off ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_off.js 案例 1；对照清单 lab/INVENTORY_VV_PUT_OFF_1_V5.md
// 角色关键帧：sprites/vvputoff1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputoff1.js';
const ACTS = {"*": ["l_hw0", "l_hw1", "l_hw2"]};
const ITEMS = [
  ['n', 'put off：把原定日程推离当前时间表面'],
  ['m', 'Homework'],
  ['m', 'TODAY'],
  ['m', 'TOMORROW'],
  ['m', 'put off ①'],
  ['m', '今天 Mon'],
  ['m', '作业'],
  ['m', '推迟，拖延'],
  ['m', '明天 Tue'],
  ['w', 'Later~'],
  ['s', 'Don\'t put off your homework until tomorrow.', '不要把你的作业推迟到明天。'],
  ['m', 'OFF'],
  ['m', '推离今天'],
  ['w', 'Do it today!'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put off ①', items: ITEMS, acts: ACTS }); }
