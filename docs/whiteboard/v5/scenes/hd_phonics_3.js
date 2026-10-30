// 🔤 拼读剧场 ③ 字母组合与最小对立对（ship / sheep） —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_phonics.js 案例 3；对照清单 lab/INVENTORY_HD_PHONICS_3_V5.md
// 角色关键帧：sprites/hdp3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdp3.js';
const ACTS = {"*": ["l_sheep", "ship", "l_ear"]};
const ITEMS = [
  ['w', '自然拼读原理'],
  ['w', '字母组合与最小对立对：两个字母手拉手发一个音，靠嘴型张开度区分长短音！'],
  ['w', '看中央实验台：直观观察音素滑块碰撞合体与元音能量传递轨迹！'],
  ['w', '👂 字母组合与最小对立对嘴型对比'],
  ['w', '👯 元音组合口诀：两个元音并排走，前面说话(读长音)后面静！'],
  ['w', 'ee/ea ➔ /iː/ (tree/tea) ｜ ai/ay ➔ /eɪ/ (rain/play) ｜ oa/ow ➔ /əʊ/ (boat/snow)'],
  ['w', '👂 最小对立对嘴型：ship /ɪ/ (放松短促) vs sheep /iː/ (微笑拉长)'],
  ['w', 'bad /æ/ (三指大嘴) vs bed /e/ (一指小嘴) ｜ three /θ/ (咬舌尖) vs tree /tr/'],
  ['w', '拼读第3幕'],
  ['s', 'c-at -> cat! cap -> cape! sheep vs ship!', '见词能读、听音能写：掌握 CVC 闭音节、Magic E 开音节与字母组合规律！']
];
export default function build() { return autoBuild(SP, { title: '🔤 拼读剧场 ③ 字母组合与最小对立对（ship / sheep）', items: ITEMS, acts: ACTS }); }
