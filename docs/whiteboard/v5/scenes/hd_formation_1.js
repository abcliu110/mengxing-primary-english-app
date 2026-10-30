// 🤖 构词剧场 ① 合成词积木合体 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_formation.js 案例 1；对照清单 lab/INVENTORY_HD_FORMATION_1_V5.md
// 角色关键帧：sprites/hdf1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdf1.js';
const ACTS = {"*": ["l_idea0", "l_idea1", "l_idea2"]};
const ITEMS = [
  ['w', '构词法三大原理'],
  ['w', '英语单词像乐高积木：① 合成词(1+1合体) ② 前缀(戴头顶改方向/正反) ③ 后缀(挂词尾换词性)！'],
  ['w', '看中央实验台：理解词根词缀如何让词汇量翻 5 倍！'],
  ['w', '🧱 机制 1：合成词 1+1 物理合体工坊'],
  ['w', 'sun ☀️'],
  ['w', 'flower 🌸'],
  ['w', '🌻 sun(太阳) + flower(花) = sunflower(向日葵)'],
  ['w', '同理：water+melon=西瓜 ｜ rain+bow=彩虹 ｜ foot+ball=足球 ｜ class+room=教室'],
  ['w', '构词第1幕'],
  ['s', 'sunflower, unhappy, careful, carefully, friendly', '构词法公式：前缀改变词义方向，后缀决定词性角色！']
];
export default function build() { return autoBuild(SP, { title: '🤖 构词剧场 ① 合成词积木合体', items: ITEMS, acts: ACTS }); }
