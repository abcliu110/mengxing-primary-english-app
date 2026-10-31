// 💬 日常用语 · 天气与闲聊 · What's the weather like today? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc09.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC09_3_V5.md
// 角色关键帧：sprites/hdo09_3.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo09_3.js';
const ACTS = {"*": ["sunny", "rain0", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '天气与闲聊'],
  ['w', '核心交际句：What\'s the weather like today? （今天天气怎么样？（询问天气必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 询问天气双王牌：① What\'s the weather like?（有介词 like） ＝ ② How is the weather?（无 like）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：What\'s the weather like in Beijing today?'],
  ['w', '今天北京的天气怎么样呀？'],
  ['s', 'What\'s the weather like in Beijing today?', '今天北京的天气怎么样呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：It\'s sunny and warm! Let\'s go to the park!'],
  ['w', '今天晴朗又暖和！我们去公园玩吧！'],
  ['s', 'It\'s sunny and warm! Let\'s go to the park!', '今天晴朗又暖和！我们去公园玩吧！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：That sounds great!'],
  ['w', '听起来真棒！'],
  ['s', 'That sounds great!', '听起来真棒！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 天气与闲聊 · What\'s the weather like today?', items: ITEMS, acts: ACTS }); }
