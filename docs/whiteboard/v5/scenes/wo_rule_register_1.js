// 🔬 规律 9 · 农场里的动物，餐桌上的肉 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_register.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_REGISTER_1_V5.md
// 角色关键帧：sprites/rg1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/rg1.js';
const ACTS = {"eat": ["l_cake1"]};
const ITEMS = [
  ['n', '英语里活的动物和它的肉，常常是两个词：动物用古英语留下来的词，肉用从法语借来的词。'],
  ['w', '🔬 规律 9：本族词 ↔ 法语借词（两层词汇）'],
  ['w', '📜 有出处 ⚠️ 不是每种动物都这样'],
  ['w', 'cow ← 古英语 cū ｜ beef ← 古法语 buef（牛）'],
  ['w', 'sheep ← 古英语 scēap ｜ mutton ← 古法语 moton（羊）'],
  ['w', 'pig ｜ pork ← 古法语 porc（猪）'],
  ['s', 'We eat beef and pork.', '我们吃牛肉和猪肉。', 'beef'],
  ['n', '有意思的是：在法语里，这些词原本就是动物本身；到了英语里，才专门指肉。'],
  ['w', '💡 法语里是动物，英语里变成了肉'],
  ['n', '日常的问话也有两层：ask 是本族词，question 来自拉丁语 quaerere。'],
  ['w', 'ask（本族词）↔ question（拉丁语 quaerere）'],
  ['n', '要注意：chicken、fish 的肉和动物还是同一个词，这条不是每种动物都适用。'],
  ['w', '⚠️ chicken、fish：肉和动物同一个词'],
  ['n', '出处：Etymonline 和 Wiktionary 都写了这些词的来路和原义。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 9 · 农场里的动物，餐桌上的肉', items: ITEMS, acts: ACTS }); }
