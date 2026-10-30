// 🎬 万能动词 · put off ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_off.js 案例 2；对照清单 lab/INVENTORY_VV_PUT_OFF_2_V5.md
// 角色关键帧：sprites/vvputoff2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputoff2.js';
const ACTS = {"*": ["rain0", "missw_cal", "sunny"]};
const ITEMS = [
  ['n', 'put off：推迟，延后（会议/计划）'],
  ['w', 'Sat 6/10'],
  ['w', 'Sports Day 运动会'],
  ['m', 'put off ②'],
  ['m', '（活动）推迟'],
  ['m', 'Sat 6/17'],
  ['m', '推到下周'],
  ['s', 'Sports Day is put off because of the rain.', '因为下雨，运动会推迟了。'],
  ['m', 'PUT'],
  ['m', '放、摆'],
  ['m', '离开表面'],
  ['m', '+'],
  ['w', 'Don\'t put it off.'],
  ['m', '作业 推离 今天'],
  ['m', '别拖到明天。'],
  ['w', 'Sports Day is put off.'],
  ['w', '活动 推离 原定日子'],
  ['w', '运动会推迟了。'],
  ['w', '共同点：OFF = 从原来那天推开'],
  ['s', 'Don\'t put off your homework until tomorrow.', '不要把你的作业推迟到明天。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put off ②', items: ITEMS, acts: ACTS }); }
