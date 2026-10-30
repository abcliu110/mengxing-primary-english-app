// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Don't forget to wear your helmet! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC08_10_V5.md
// 角色关键帧：sprites/hdo08_10.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_10.js';
const ACTS = {"*": ["l_lookup", "bus1", "l_think"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Don\'t forget to wear your helmet! （骑车别忘了戴好安全头盔！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 安全出行必背：People on bikes must wear a helmet!（骑自行车的人必须戴头盔）'],
  ['w', '对话第1轮'],
  ['w', '👨 角色 A：Let\'s ride bikes in the park, Dad!'],
  ['w', '爸爸，我们在公园里骑自行车吧！'],
  ['s', 'Let\'s ride bikes in the park, Dad!', '爸爸，我们在公园里骑自行车吧！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Great! Don\'t forget to wear your helmet first!'],
  ['w', '太棒了！不过别忘了先戴好你的安全头盔！'],
  ['s', 'Great! Don\'t forget to wear your helmet first!', '太棒了！不过别忘了先戴好你的安全头盔！'],
  ['w', '对话第3轮'],
  ['w', '👨 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Don\'t forget to wear your helmet!', items: ITEMS, acts: ACTS }); }
