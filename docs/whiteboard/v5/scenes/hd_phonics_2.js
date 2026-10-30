// 🔤 拼读剧场 ② Magic E 魔法棒（cap → cape） —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_phonics.js 案例 2；对照清单 lab/INVENTORY_HD_PHONICS_2_V5.md
// 角色关键帧：sprites/hdp2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdp2.js';
const ACTS = {"*": ["l_cap1", "l_cap2", "l_idea1"]};
const ITEMS = [
  ['w', '自然拼读原理'],
  ['w', 'Magic E 魔法棒原理：词尾 e 静音不说话，把能量传给前面的元音读出字母本名！'],
  ['w', '看中央实验台：直观观察音素滑块碰撞合体与元音能量传递轨迹！'],
  ['w', '🪄 Magic E 跨越辅音传能量实验 (cap ➔ cape)'],
  ['w', 'cap /kæp/ 🧢'],
  ['w', 'c a p e /keɪp/ 🦸'],
  ['w', '⚡不发音e把能量传给a读/eɪ/'],
  ['w', '📐 四大 Magic E 公式：a_e(/eɪ/ cake) · i_e(/aɪ/ kite) · o_e(/əʊ/ nose) · u_e(/juː/ cute)'],
  ['w', '拼读第2幕'],
  ['s', 'c-at -> cat! cap -> cape! sheep vs ship!', '见词能读、听音能写：掌握 CVC 闭音节、Magic E 开音节与字母组合规律！']
];
export default function build() { return autoBuild(SP, { title: '🔤 拼读剧场 ② Magic E 魔法棒（cap → cape）', items: ITEMS, acts: ACTS }); }
