// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy Children's Day! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC10_6_V5.md
// 角色关键帧：sprites/hdo10_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo10_6.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：Happy Children\'s Day! （儿童节快乐！）'],
  ['w', '💡 交际得体度与母语负迁移提示：六一儿童节祝福。'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Today is June 1st. Happy Children\'s Day!'],
  ['w', '今天是六一，儿童节快乐！'],
  ['s', 'Today is June 1st. Happy Children\'s Day!', '今天是六一，儿童节快乐！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Happy Children\'s Day!'],
  ['w', '儿童节快乐！'],
  ['s', 'Happy Children\'s Day!', '儿童节快乐！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy Children\'s Day!', items: ITEMS, acts: ACTS }); }
