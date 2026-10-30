// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Can I try it on? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC07_3_V5.md
// 角色关键帧：sprites/hdo07_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_3.js';
const ACTS = {"*": ["l_bag0", "m_offer", "l_point"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：Can I try it on? （我可以试穿一下吗？（买衣服鞋子必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 夹心饼干法则：代词 it / them 必须夹在 try 和 on 中间（try it on）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：This yellow coat is nice. Can I try it on?'],
  ['w', '这件黄色外套真好看。我可以试穿一下吗？'],
  ['s', 'This yellow coat is nice. Can I try it on?', '这件黄色外套真好看。我可以试穿一下吗？'],
  ['w', '对话第2轮'],
  ['w', '👩‍💼 角色 B：Of course! Look in the mirror—it fits you very well!'],
  ['w', '当然可以！照镜子看看——它非常适合你！'],
  ['s', 'Of course! Look in the mirror—it fits you very well!', '当然可以！照镜子看看——它非常适合你！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Can I try it on?', items: ITEMS, acts: ACTS }); }
