// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What time is it now? — It's 4:30. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 12；对照清单 lab/INVENTORY_HD_ORAL_SC09_12_V5.md
// 角色关键帧：sprites/hdo09_12.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo09_12.js';
const ACTS = {"*": ["l_lookup", "sunny", "l_laugh"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：What time is it now? — It\'s 4:30. （现在几点了？— 四点半了，该回家了。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 回家零介词铁律：go home（回家）/ get home（到家），因为 home 是地点副词，前面绝不加 to！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：What time is it now, Amy?'],
  ['w', '艾米，现在几点钟啦？'],
  ['s', 'What time is it now, Amy?', '艾米，现在几点钟啦？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：It\'s four thirty. School is over. Time to go home!'],
  ['w', '现在四点半了。放学啦，该回家了！'],
  ['s', 'It\'s four thirty. School is over. Time to go home!', '现在四点半了。放学啦，该回家了！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What time is it now? — It\'s 4:30.', items: ITEMS, acts: ACTS }); }
