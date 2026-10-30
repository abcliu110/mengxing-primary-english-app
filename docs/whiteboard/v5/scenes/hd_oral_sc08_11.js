// 💬 日常用语 · 问路与交通 · How long does it take? — Ten minutes. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 11；对照清单 lab/INVENTORY_HD_ORAL_SC08_11_V5.md
// 角色关键帧：sprites/hdo08_11.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_11.js';
const ACTS = {"*": ["l_point", "bus", "l_speak"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：How long does it take? — Ten minutes. （需要花多长时间？— 十分钟。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 How 疑问词组辨析：How far (问距离多远) ↔ How long (问时间多久)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：How long does it take to get to the zoo by bus?'],
  ['w', '坐公交车去动物园需要花多长时间？'],
  ['s', 'How long does it take to get to the zoo by bus?', '坐公交车去动物园需要花多长时间？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：It takes about ten minutes. Very fast!'],
  ['w', '大约需要十分钟。非常快！'],
  ['s', 'It takes about ten minutes. Very fast!', '大约需要十分钟。非常快！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 问路与交通 · How long does it take? — Ten minutes.', items: ITEMS, acts: ACTS }); }
