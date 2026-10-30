// 💬 日常用语 · 天气与闲聊 · Let's make a snowman outside! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 11；对照清单 lab/INVENTORY_HD_ORAL_SC09_11_V5.md
// 角色关键帧：sprites/hdo09_11.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo09_11.js';
const ACTS = {"*": ["sunny", "rain0", "l_speak"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：Let\'s make a snowman outside! （我们去外面堆雪人吧！（冬日玩雪））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 下雪天必背搭配：make a snowman（堆雪人）· play in the snow（在雪地里玩）！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hooray! It\'s snowing heavily! Let\'s make a snowman outside!'],
  ['w', '太好啦！外面下大雪啦！我们去外面堆雪人吧！'],
  ['s', 'Hooray! It\'s snowing heavily! Let\'s make a snowman outside!', '太好啦！外面下大雪啦！我们去外面堆雪人吧！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Good idea! Let\'s put a carrot on its nose!'],
  ['w', '好主意！我们把一根胡萝卜插在它的鼻子上吧！'],
  ['s', 'Good idea! Let\'s put a carrot on its nose!', '好主意！我们把一根胡萝卜插在它的鼻子上吧！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · Let\'s make a snowman outside!', items: ITEMS, acts: ACTS }); }
