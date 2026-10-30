// 💬 日常用语 · 询问与求助 · May I come in? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc05.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC05_1_V5.md
// 角色关键帧：sprites/hdo05_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo05_1.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '询问与求助'],
  ['w', '核心交际句：May I come in? （我可以进来吗？（敲门进教室/办公室必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 敲门礼貌金句：May I come in? ➔ 老师回答 Come in, please!'],
  ['w', '对话第1轮'],
  ['w', '🧒 角色 A：Knock, knock! Excuse me, Miss White. May I come in?'],
  ['w', '咚咚！打扰一下，怀特老师。我可以进来吗？'],
  ['s', 'Knock, knock! Excuse me, Miss White. May I come in?', '咚咚！打扰一下，怀特老师。我可以进来吗？'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：Yes, come in, please! Sit down.'],
  ['w', '可以，请进吧！请坐。'],
  ['s', 'Yes, come in, please! Sit down.', '可以，请进吧！请坐。'],
  ['w', '对话第3轮'],
  ['w', '🧒 角色 A：Thank you for your help!'],
  ['w', '谢谢你帮忙！'],
  ['s', 'Thank you for your help!', '谢谢你帮忙！']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 询问与求助 · May I come in?', items: ITEMS, acts: ACTS }); }
