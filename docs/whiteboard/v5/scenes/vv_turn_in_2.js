// 🎬 万能动词 · turn in ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_in.js 案例 2；对照清单 lab/INVENTORY_VV_TURN_IN_2_V5.md
// 角色关键帧：sprites/vvturnin2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnin2.js';
const ACTS = {"*": ["l_pj0", "l_pj1", "l_pj2"]};
const ITEMS = [
  ['n', 'turn in：上交，交还（作业/考卷）'],
  ['m', '21:30'],
  ['m', 'turn in ②'],
  ['m', '上床睡觉'],
  ['w', 'So sleepy…'],
  ['s', 'It\'s late. Time to turn in.', '很晚了，该上床睡觉了。'],
  ['w', '钻进被窝'],
  ['w', 'z'],
  ['m', 'TURN'],
  ['m', '转动'],
  ['m', '进入里面'],
  ['m', '+'],
  ['w', 'Turn in your homework.'],
  ['w', '交作业。'],
  ['w', '作业 交进 老师手里'],
  ['w', 'Time to turn in.'],
  ['m', '人 钻进 被窝'],
  ['m', '该睡觉了。'],
  ['w', '共同点：IN = 转身进到里面'],
  ['s', 'Please turn in your homework on time.', '请按时上交你们的家庭作业。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn in ②', items: ITEMS, acts: ACTS }); }
