// 🤖 构词剧场 ③ 后缀转换词性套装 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_formation.js 案例 3；对照清单 lab/INVENTORY_HD_FORMATION_3_V5.md
// 角色关键帧：sprites/hdf3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdf3.js';
const ACTS = {"*": ["l_write0", "l_write1", "l_write2"]};
const ITEMS = [
  ['w', '构词法三大原理'],
  ['w', '英语单词像乐高积木：① 合成词(1+1合体) ② 前缀(戴头顶改方向/正反) ③ 后缀(挂词尾换词性)！'],
  ['w', '看中央实验台：理解词根词缀如何让词汇量翻 5 倍！'],
  ['w', '🎨 机制 3：后缀挂词尾 —— 自由切换名词/形容词/副词衣服'],
  ['w', '🌱 词根 care (关心) 的四件词性衣服：'],
  ['w', '+ful ➔ careful (adj.细心的) ｜ +less ➔ careless (adj.粗心的) ｜ +fully ➔ carefully (adv.)'],
  ['w', '🎨 高频词性后缀：动词+er/or=人(teacher/doctor) ｜ 天气名词+y=形容词(sunny/rainy)'],
  ['w', '⚠️ 防坑特例：形容词+ly=副词(slowly)，但【名词+ly=形容词(friendly 友好的 / lovely 可爱的)】！'],
  ['w', '构词第3幕'],
  ['s', 'sunflower, unhappy, careful, carefully, friendly', '构词法公式：前缀改变词义方向，后缀决定词性角色！']
];
export default function build() { return autoBuild(SP, { title: '🤖 构词剧场 ③ 后缀转换词性套装', items: ITEMS, acts: ACTS }); }
