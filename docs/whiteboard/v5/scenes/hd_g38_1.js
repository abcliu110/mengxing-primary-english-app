// 📘 G38 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g38.js 案例 1；对照清单 lab/INVENTORY_HD_G38_1_V5.md
// 角色关键帧：sprites/hdg38_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg38_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G38 底层原理'],
  ['w', '比较级：-er / more... + than（两者比高低） —— 两个人或事物PK比高下：短词尾加 -er，长词前加 more，后面紧跟标志词 than！'],
  ['w', '【为什么短词加 -er，长词前加 more？】单音节短词加 `-er` 轻快（taller）；多音节长词（beaut'],
  ['w', '🔬 G38 · 比较级：-er / more... + than（两者比高低） 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I am taller and stronger than my brother.'],
  ['w', '我比弟弟更高更壮。大象比熊猫更大更重。这本故事书比那本更有趣。'],
  ['w', '② 核心结构规律：① 规则变化：一般加 -er；以 e 结尾加 -r；双写五虎将（bigger, fatt'],
  ['w', '③ 进阶要点：② 不规则：good/well ➔ better, bad ➔ worse, many/'],
  ['w', 'G38 第1幕'],
  ['s', 'I am taller and stronger than my brother.', '两者相比比高低，比较级配 than 字句；短词尾巴加 -er（去e/双写/变y为i），三音节长词加 more；好(good/well)变better，坏(bad)变worse，多变more，少变less！']
];
export default function build() { return autoBuild(SP, { title: '📘 G38 底层原理', items: ITEMS, acts: ACTS }); }
