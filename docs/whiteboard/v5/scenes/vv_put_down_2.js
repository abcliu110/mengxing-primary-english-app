// 🎬 万能动词 · put down ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_down.js 案例 2；对照清单 lab/INVENTORY_VV_PUT_DOWN_2_V5.md
// 角色关键帧：sprites/vvputdown2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputdown2.js';
const ACTS = {"*": ["l_write0", "l_write1", "l_write2"]};
const ITEMS = [
  ['n', 'put down：放下（物品）；写下，记下'],
  ['w', 'Name:'],
  ['w', 'put down ②'],
  ['w', '写下，记下'],
  ['w', '纸面'],
  ['m', '写到纸上'],
  ['m', 'T'],
  ['s', 'Put down your name here.', '在这里写下你的名字。'],
  ['w', 'To'],
  ['w', 'Tom'],
  ['m', 'PUT'],
  ['m', '向下落定'],
  ['m', '放、摆'],
  ['m', '+'],
  ['w', 'Put down your pencil.'],
  ['m', '放下铅笔。'],
  ['m', '铅笔 落到 桌面'],
  ['w', 'Put down your name.'],
  ['m', '写下名字。'],
  ['m', '名字 落到 纸面'],
  ['w', '共同点：DOWN = 落到桌面或纸面'],
  ['s', 'Put down your pencil and look at me.', '放下铅笔看着我。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put down ②', items: ITEMS, acts: ACTS }); }
