// 🔬 规律 6 · 维京人带来的双胞胎词：shirt 和 skirt —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_norse.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_NORSE_1_V5.md
// 角色关键帧：sprites/ns1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/ns1.js';
const ACTS = {"wear": ["l_coat1"]};
const ITEMS = [
  ['n', '维京人说古诺斯语，和古英语是亲戚。同一个老词，在英语里变成 sh 或 ch，在维京人那里还是 sk 或 k。后来两个样子都留在了英语里。'],
  ['w', '🔬 规律 6：古英语和古诺斯语的双胞胎词'],
  ['w', '📜 有出处 💡 一对词，一个意思分了家'],
  ['s', 'I wear a shirt.', '我穿着一件衬衫。', 'shirt'],
  ['s', 'She wears a skirt.', '她穿着一条裙子。', 'skirt'],
  ['w', 'shirt（本族词）↔ skirt（古诺斯语 skyrta）'],
  ['n', 'church 和苏格兰话里的 kirk 也是一对：kirk 来自古诺斯语 kirkja。'],
  ['w', 'church ↔ kirk（古诺斯语 kirkja）'],
  ['n', 'ditch 和 dike 也是一对，都和挖出来的沟、堆起来的堤有关。'],
  ['w', 'ditch（沟）↔ dike（堤）'],
  ['n', '出处：Etymonline 和 Wiktionary 都写了这几对词的关系。'],
  ['w', '出处：Etymonline · Wiktionary']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 6 · 维京人带来的双胞胎词：shirt 和 skirt', items: ITEMS, acts: ACTS }); }
