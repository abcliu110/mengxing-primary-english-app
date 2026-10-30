// 🎬 万能动词 · take down ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_down.js 案例 2；对照清单 lab/INVENTORY_VV_TAKE_DOWN_2_V5.md
// 角色关键帧：sprites/vvtakedown2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakedown2.js';
const ACTS = {"*": ["l_note0", "l_note1", "l_note2"]};
const ITEMS = [
  ['n', 'take down：取下，拿下；记下，写下（笔记）'],
  ['w', 'take down ②'],
  ['w', '记下，写下'],
  ['w', 'Key words!'],
  ['m', '纸面'],
  ['m', 'apple'],
  ['m', '写到纸上'],
  ['w', 'book'],
  ['s', 'Please take down these key words.', '请把这些关键词记下来。'],
  ['w', 'happy'],
  ['m', 'TAKE'],
  ['m', '向下落定'],
  ['m', '拿、取'],
  ['m', '+'],
  ['w', 'Take down the poster.'],
  ['m', '从 高处 下来'],
  ['m', '取下海报。'],
  ['w', 'Take down the words.'],
  ['m', '落到 纸面 上'],
  ['m', '记下单词。'],
  ['w', '共同点：DOWN = 从高处落下来，落定在纸上'],
  ['s', 'Please take down these key words.', '请把这些关键词记下来。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take down ②', items: ITEMS, acts: ACTS }); }
