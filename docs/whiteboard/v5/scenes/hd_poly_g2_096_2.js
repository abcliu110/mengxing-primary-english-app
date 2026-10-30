// 🎞️ cold · 一词多义第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_poly_g2_096.js 案例 2；对照清单 lab/INVENTORY_HD_POLY_G2_096_2_V5.md
// 角色关键帧：sprites/hdpg2096_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdpg2096_2.js';
const ACTS = {"*": ["l_idea0", "l_point", "l_speak"]};
const ITEMS = [
  ['w', '一词多义演变'],
  ['w', '🥶 cold /koʊld/ — 【adj.】寒冷的，冷的'],
  ['w', '核心意象纽带：寒冷低温及其引发的受凉症状'],
  ['w', '① 本义具象：adj. 寒冷的，冷的'],
  ['w', 'It is cold in winter.'],
  ['w', '② 意象桥梁：寒冷低温及其引发的受凉症状'],
  ['w', '核心动作/形状迁移'],
  ['w', '③ 引申新义：n. 感冒，伤风（着凉受冻生的小病）'],
  ['w', 'I have a bad cold today.'],
  ['w', '多义第2幕'],
  ['s', 'It is cold in winter.', '🔄 第二幕【场景变形·寒气侵入身体】：吹了冷风没穿外套，寒气钻进鼻子引起阿嚏阿嚏打喷嚏。']
];
export default function build() { return autoBuild(SP, { title: '🎞️ cold · 一词多义第2幕', items: ITEMS, acts: ACTS }); }
