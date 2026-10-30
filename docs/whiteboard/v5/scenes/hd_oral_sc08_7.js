// 💬 日常用语 · 问路与交通 · Turn right at the first crossing. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc08.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC08_7_V5.md
// 角色关键帧：sprites/hdo08_7.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo08_7.js';
const ACTS = {"*": ["l_point", "bus", "l_speak"]};
const ITEMS = [
  ['w', '问路与交通'],
  ['w', '核心交际句：Turn right at the first crossing. （在第一个十字路口向右转。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 指路介词铁律：在十字路口/医院/书店拐弯，小地点定位一律用介词 at（turn right at the...）！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Is the bookstore near here?'],
  ['w', '请问书店在这附近吗？'],
  ['s', 'Is the bookstore near here?', '请问书店在这附近吗？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Yes! Go straight and turn right at the first crossing.'],
  ['w', '是的！直走，然后在第一个十字路口向右转。'],
  ['s', 'Yes! Go straight and turn right at the first crossing.', '是的！直走，然后在第一个十字路口向右转。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you for telling me.'],
  ['w', '谢谢你告诉我。'],
  ['s', 'Thank you for telling me.', '谢谢你告诉我。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 问路与交通 · Turn right at the first crossing.', items: ITEMS, acts: ACTS }); }
