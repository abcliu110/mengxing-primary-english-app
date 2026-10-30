// 🧨 易混词剧场 ③ 三个「穿」put on / wear / in —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_relations.js 案例 3；对照清单 lab/INVENTORY_HD_RELATIONS_3_V5.md
// 角色关键帧：sprites/hdr3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdr3.js';
const ACTS = {"*": ["l_coat1", "l_coat2", "l_coat3"]};
const ITEMS = [
  ['w', '母语负迁移排雷'],
  ['w', '汉语一个词（看/借/穿/说/花费），英语按『动作过程 vs 结果』『方向』『瞬时动作 vs 状态』严密拆分！'],
  ['w', '看中央实验台：用矢量方向图彻底分清易混词家族！'],
  ['w', '🧥 排雷 3：三个『穿』(put on 瞬时动作 vs wear 持续状态 vs in 介词)'],
  ['w', '⚡ put on 【3秒钟往身上套的瞬时动作】(反义词 take off 脱下)'],
  ['w', '例：It\'s cold outside. Put on your warm coat! (现在动手穿上)'],
  ['w', '👗 wear 【衣服已经穿戴在身上的持续状态】｜ in + 颜色 (介词短语)'],
  ['w', '例：She wears glasses. = The girl in red is my sister.'],
  ['w', '辨析第3幕'],
  ['s', 'Look at the tree, I can see a bird! Borrow from vs Lend to!', '搞清动作过程与结果、方向与状态，彻底告别汉语负迁移丢分！']
];
export default function build() { return autoBuild(SP, { title: '🧨 易混词剧场 ③ 三个「穿」put on / wear / in', items: ITEMS, acts: ACTS }); }
