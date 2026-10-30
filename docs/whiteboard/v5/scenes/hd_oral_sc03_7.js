// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Open your books to page 10. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC03_7_V5.md
// 角色关键帧：sprites/hdo03_7.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_7.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Open your books to page 10. （把书翻到第10页。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 编号语序铁律：第10页说 Page 10，第1单元说 Unit 1（名词在前，数字在后，首字母常大写）！'],
  ['w', '对话第1轮'],
  ['w', '👩‍🏫 角色 A：Class, please open your books to page ten!'],
  ['w', '同学们，请把书翻到第10页！'],
  ['s', 'Class, please open your books to page ten!', '同学们，请把书翻到第10页！'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：OK, Miss White! We are ready!'],
  ['w', '好的，怀特老师！我们准备好啦！'],
  ['s', 'OK, Miss White! We are ready!', '好的，怀特老师！我们准备好啦！'],
  ['w', '对话第3轮'],
  ['w', '👩‍🏫 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Open your books to page 10.', items: ITEMS, acts: ACTS }); }
