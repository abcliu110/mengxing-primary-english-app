// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_give_down_2.yaml；改编排：模板 vv_give_down_2.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · give back ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_down.js 案例 2；对照清单 lab/INVENTORY_VV_GIVE_DOWN_2_V5.md
// 角色关键帧：sprites/vvgivedown2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgivedown2.js';
const ACTS = {"*": ["l_books", "l_return", "librarian"]};
const ITEMS = [
  ['n', 'give back：归还，送还 (= return)'],
  ['w', 'Book Return'],
  ['w', 'English'],
  ['w', 'Library 图书馆'],
  ['w', 'give back ②'],
  ['m', '归还（书）'],
  ['m', '还书箱'],
  ['w', '还回图书馆'],
  ['s', 'Give the book back to the library.', '把书还给图书馆。'],
  ['m', 'GIVE'],
  ['m', '回到原处'],
  ['m', '给、交出'],
  ['m', '+'],
  ['w', 'Give back my ruler.'],
  ['m', '尺子 回到 原主'],
  ['m', '把尺子还我。'],
  ['w', 'Give the book back.'],
  ['m', '书 回到 图书馆'],
  ['m', '把书还回去。'],
  ['w', '共同点：BACK = 回到原来的地方（give 没有常用的 down）'],
  ['s', 'Please give back my ruler after class.', '下课后请把尺子还给我。'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give back ②', items: ITEMS, acts: ACTS }); }
