// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Don't worry! I can help you. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC16_1_V5.md
// 角色关键帧：sprites/hdo16_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo16_1.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：Don\'t worry! I can help you. （别担心！我可以帮你。（安慰与互助必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 安慰朋友暖心金句：Don\'t worry! (动词前加 Don\'t) / Don\'t be sad! (形容词前加 Don\'t be)'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Oh no! This English puzzle is too hard. I\'m so worried.'],
  ['w', '哎呀！这道英语字谜太难了。我好发愁呀。'],
  ['s', 'Oh no! This English puzzle is too hard. I\'m so worried.', '哎呀！这道英语字谜太难了。我好发愁呀。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Don\'t worry, Sarah! Let\'s work together. I can help you!'],
  ['w', '别担心，萨拉！我们一起来做，我可以帮你！'],
  ['s', 'Don\'t worry, Sarah! Let\'s work together. I can help you!', '别担心，萨拉！我们一起来做，我可以帮你！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you!'],
  ['w', '谢谢你！'],
  ['s', 'Thank you!', '谢谢你！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Don\'t worry! I can help you.', items: ITEMS, acts: ACTS }); }
