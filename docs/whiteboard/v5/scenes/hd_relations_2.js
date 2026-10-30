// 🧨 易混词剧场 ② 两个「借」borrow 借入 vs lend 借出 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_relations.js 案例 2；对照清单 lab/INVENTORY_HD_RELATIONS_2_V5.md
// 角色关键帧：sprites/hdr2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdr2.js';
const ACTS = {"*": ["borrow", "l_pen"]};
const ITEMS = [
  ['w', '母语负迁移排雷'],
  ['w', '汉语一个词（看/借/穿/说/花费），英语按『动作过程 vs 结果』『方向』『瞬时动作 vs 状态』严密拆分！'],
  ['w', '看中央实验台：用矢量方向图彻底分清易混词家族！'],
  ['w', '🔄 排雷 2：两个『借』(borrow 借入 vs lend 借出) 方向箭头'],
  ['w', '📥 borrow (往自己手里借入)：borrow sth. FROM sb.'],
  ['w', '例：May I borrow a ruler from you? (向你借进一把尺子)'],
  ['w', '📤 lend (从自己手里借给别人)：lend sth. TO sb.'],
  ['w', '例：Can you lend your pen to me? (把你的笔借出给我)'],
  ['w', '辨析第2幕'],
  ['s', 'Look at the tree, I can see a bird! Borrow from vs Lend to!', '搞清动作过程与结果、方向与状态，彻底告别汉语负迁移丢分！']
];
export default function build() { return autoBuild(SP, { title: '🧨 易混词剧场 ② 两个「借」borrow 借入 vs lend 借出', items: ITEMS, acts: ACTS }); }
