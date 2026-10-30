// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What's your name? — My name's... —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC04_1_V5.md
// 角色关键帧：sprites/hdo04_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_1.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：What\'s your name? — My name\'s... （你叫什么名字？— 我叫……）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 姓名问答双表达：My name is Sarah. ＝ I am Sarah.（注意缩写 What\'s = What is, name\'s = name is）'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hi! I\'m new here. What\'s your name?'],
  ['w', '嗨！我是新来的。你叫什么名字呀？'],
  ['s', 'Hi! I\'m new here. What\'s your name?', '嗨！我是新来的。你叫什么名字呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：My name\'s Chen Jie. Let\'s be good friends!'],
  ['w', '我的名字叫陈杰。我们做个好朋友吧！'],
  ['s', 'My name\'s Chen Jie. Let\'s be good friends!', '我的名字叫陈杰。我们做个好朋友吧！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What\'s your name? — My name\'s...', items: ITEMS, acts: ACTS }); }
