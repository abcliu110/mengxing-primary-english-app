// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What a great day! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC09_2_V5.md
// 角色关键帧：sprites/hdo09_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo09_2.js';
const ACTS = {"*": ["l_lookup", "sunny", "l_laugh"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：What a great day! （多么棒的一天啊！（感叹句必会口语））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 感叹句秒杀口诀：中心词是名词用 What (What a great day!)；是形容词用 How (How nice!)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：The rain stopped and look at the big rainbow! What a great day!'],
  ['w', '雨停了，快看天上的大彩虹！多么棒的一天啊！'],
  ['s', 'The rain stopped and look at the big rainbow! What a great day!', '雨停了，快看天上的大彩虹！多么棒的一天啊！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Yeah! How beautiful! Let\'s take a picture together!'],
  ['w', '是呀！太美啦！我们一起拍张照吧！'],
  ['s', 'Yeah! How beautiful! Let\'s take a picture together!', '是呀！太美啦！我们一起拍张照吧！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What a great day!', items: ITEMS, acts: ACTS }); }
