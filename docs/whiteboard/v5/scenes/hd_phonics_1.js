// 🔤 拼读剧场 ① CVC 首音 + 韵尾（-at 家族） —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_phonics.js 案例 1；对照清单 lab/INVENTORY_HD_PHONICS_1_V5.md
// 角色关键帧：sprites/hdp1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdp1.js';
const ACTS = {"*": ["l_speak", "l_cap0", "l_point"]};
const ITEMS = [
  ['w', '自然拼读原理'],
  ['w', 'CVC 首音(Onset) + 韵尾(Rime) 拼读法：固定韵脚 -at，换车头秒读一串词！'],
  ['s', 'CVC, onset, rime.', 'CVC、首音、韵尾。'],
  ['w', '看中央实验台：直观观察音素滑块碰撞合体与元音能量传递轨迹！'],
  ['w', '🚂 CVC 词族首音替换滑轨实验 (-at 家族)'],
  ['w', 'c /k/'],
  ['w', '-at /æt/'],
  ['w', '🎯 换首音一串记 5 词：c-at(猫) · b-at(蝙蝠) · h-at(帽) · f-at(胖) · m-at(垫子)'],
  ['s', 'Cat, bat, hat, fat, mat.', 'cat、bat、hat、fat、mat。'],
  ['w', '闭音节里的 a，多半读短音 /æ/（cat、bag、map）；有几个\'变脸王\'要单记：碰到 ll 变 /ɔː/（ball、call），跟在 w 后面变 /ɒ/（was、want）。先按多半猜，猜错了就查变脸名单。'],
  ['s', 'Cat, bag, map.', 'cat、bag、map。'],
  ['s', 'Ball, call.', 'ball、call。', 'll'],
  ['s', 'Was, want.', 'was、want。'],
  ['w', '拼读第1幕'],
  ['s', 'c-at -> cat! cap -> cape! sheep vs ship!', '见词能读、听音能写：掌握 CVC 闭音节、Magic E 开音节与字母组合规律！']
];
export default function build() { return autoBuild(SP, { title: '🔤 拼读剧场 ① CVC 首音 + 韵尾（-at 家族）', items: ITEMS, acts: ACTS }); }
