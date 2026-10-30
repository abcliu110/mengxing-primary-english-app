// 💬 日常用语 · 课堂用语 · Can you say it again? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC03_1_V5.md
// 角色关键帧：sprites/hdo03_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_1.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Can you say it again? （您能再说一遍吗？（没听懂时求助必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 课堂救急法宝：没听清就说 Can you say it again? 或 Pardon?'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Sorry, Mr Jones. I don\'t understand. Can you say it again?'],
  ['w', '抱歉，琼斯老师。我没听懂。您能再说一遍吗？'],
  ['s', 'Sorry, Mr Jones. I don\'t understand. Can you say it again?', '抱歉，琼斯老师。我没听懂。您能再说一遍吗？'],
  ['w', '对话第2轮'],
  ['w', '👨‍🏫 角色 B：No problem! Let me say it slowly for you.'],
  ['w', '没问题！让我慢慢地为你再讲一遍。'],
  ['s', 'No problem! Let me say it slowly for you.', '没问题！让我慢慢地为你再讲一遍。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 课堂用语 · Can you say it again?', items: ITEMS, acts: ACTS }); }
