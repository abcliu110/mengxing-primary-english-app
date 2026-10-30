// 🎬 万能动词 · take out ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_out.js 案例 2；对照清单 lab/INVENTORY_VV_TAKE_OUT_2_V5.md
// 角色关键帧：sprites/vvtakeout2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeout2.js';
const ACTS = {"*": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', 'take out：拿出，取出；带…出去'],
  ['w', 'take out ②'],
  ['m', '带…出去'],
  ['m', '家里'],
  ['w', '带出门'],
  ['s', 'He takes the dog out.', '他带小狗出去散步。'],
  ['m', 'TAKE'],
  ['m', '从里面出来'],
  ['m', '拿、取'],
  ['m', '+'],
  ['w', 'Take out your book.'],
  ['m', '书 离开 书包'],
  ['m', '拿出你的书。'],
  ['w', 'Take the dog out.'],
  ['m', '人和狗 离开 家'],
  ['m', '带小狗出去。'],
  ['w', '共同点：OUT = 从里面到外面'],
  ['s', 'Please take out your English book.', '请把你们的英语书从书包里拿出来。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take out ②', items: ITEMS, acts: ACTS }); }
