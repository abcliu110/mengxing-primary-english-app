// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · It's raining! Take an umbrella. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC09_4_V5.md
// 角色关键帧：sprites/hdo09_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo09_4.js';
const ACTS = {"*": ["l_lookup", "sunny", "l_laugh"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：It\'s raining! Take an umbrella. （正在下雨呢！带上一把雨伞吧。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 雨天出行必备：Take an umbrella (带把伞) / Put on your raincoat (穿上雨衣)！'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Look outside! It\'s raining now. Take an umbrella with you!'],
  ['w', '看外面！现在正在下雨呢。随身带上一把雨伞吧！'],
  ['s', 'Look outside! It\'s raining now. Take an umbrella with you!', '看外面！现在正在下雨呢。随身带上一把雨伞吧！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：OK, Mum! I\'ll put on my rain boots, too.'],
  ['w', '好的，妈妈！我还会穿上我的雨靴。'],
  ['s', 'OK, Mum! I\'ll put on my rain boots, too.', '好的，妈妈！我还会穿上我的雨靴。'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · It\'s raining! Take an umbrella.', items: ITEMS, acts: ACTS }); }
