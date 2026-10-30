// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · Let's go on a picnic in the park! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC09_10_V5.md
// 角色关键帧：sprites/hdo09_10.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo09_10.js';
const ACTS = {"*": ["l_lookup", "sunny", "l_laugh"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：Let\'s go on a picnic in the park! （我们去公园野餐吧！（春日出游））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 户外活动高频短语：go on a picnic (去野餐) · go swimming (去游泳) · go boating (去划船) · go hiking (去远足)'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Spring is warm and sunny! Let\'s go on a picnic in the nature park!'],
  ['w', '春天温暖又晴朗！我们去自然公园野餐吧！'],
  ['s', 'Spring is warm and sunny! Let\'s go on a picnic in the nature park!', '春天温暖又晴朗！我们去自然公园野餐吧！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Sounds great! I\'ll bring some sandwiches and apples!'],
  ['w', '听起来太棒了！我来带一些三明治和苹果！'],
  ['s', 'Sounds great! I\'ll bring some sandwiches and apples!', '听起来太棒了！我来带一些三明治和苹果！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · Let\'s go on a picnic in the park!', items: ITEMS, acts: ACTS }); }
