// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What are you going to do tomorrow? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC09_8_V5.md
// 角色关键帧：sprites/hdo09_8.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo09_8.js';
const ACTS = {"*": ["l_lookup", "sunny", "l_laugh"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：What are you going to do tomorrow? （你明天打算做什么？（将来计划必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 一般将来时双引擎：be going to + 动词原形（早就计划好打算做） ＝ will + 动词原形（将要做）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：What are you going to do tomorrow, Binbin?'],
  ['w', '斌斌，你明天打算做什么呀？'],
  ['s', 'What are you going to do tomorrow, Binbin?', '斌斌，你明天打算做什么呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I\'m going to see a film and visit my grandparents!'],
  ['w', '我打算去看一场电影，还要去看望我的爷爷奶奶！'],
  ['s', 'I\'m going to see a film and visit my grandparents!', '我打算去看一场电影，还要去看望我的爷爷奶奶！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What are you going to do tomorrow?', items: ITEMS, acts: ACTS }); }
