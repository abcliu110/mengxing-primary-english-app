// 💬 日常用语 · 节日与祝福 · Happy birthday to you! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC10_1_V5.md
// 角色关键帧：sprites/hdo10_1.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo10_1.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：Happy birthday to you! （祝你生日快乐！（派对祝福必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 防闹笑话铁律：听到 Happy birthday! 回答 Thank you!（千万别说 You too）'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Happy birthday, Sam! Make a wish and blow out the candles!'],
  ['w', '祝你生日快乐，山姆！许个愿吹蜡烛吧！'],
  ['s', 'Happy birthday, Sam! Make a wish and blow out the candles!', '祝你生日快乐，山姆！许个愿吹蜡烛吧！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Thank you so much! Let\'s eat the birthday cake together!'],
  ['w', '太感谢你们啦！我们一起吃生日蛋糕吧！'],
  ['s', 'Thank you so much! Let\'s eat the birthday cake together!', '太感谢你们啦！我们一起吃生日蛋糕吧！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you! The same to you!'],
  ['w', '谢谢！你也一样！'],
  ['s', 'Thank you! The same to you!', '谢谢！你也一样！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 节日与祝福 · Happy birthday to you!', items: ITEMS, acts: ACTS }); }
