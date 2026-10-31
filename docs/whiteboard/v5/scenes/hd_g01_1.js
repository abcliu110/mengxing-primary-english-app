// 📘 G01 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g01.js 案例 1；对照清单 lab/INVENTORY_HD_G01_1_V5.md
// 角色关键帧：sprites/hdg01_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg01_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G01 底层原理'],
  ['w', '名词单复数规则变化 (-s/-es/-ies/-ves) —— 可数名词数量超过 1 时，词尾必须穿上“复数小尾巴”'],
  ['w', '【英语为什么要名词复数尾巴？】汉语靠量词表达数量（一本书、三本书，“书”字本身不变）；'],
  ['w', '而英语把“不止一个”的数量信号直接焊在名词尾巴上（book ➔ books），让听话人一听词尾就知道是一个还是一群！'],
  ['w', '🔬 G01 · 名词单复数规则变化 (-s/-es/-ies/-ves) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I have one book and two pens.'],
  ['w', '我有一本书和两支钢笔。看！三辆公交车和四个盒子。五个小宝宝正在吃草莓。秋天的树叶从树上飘落。'],
  ['w', '② 核心结构规律：① 一般情况直接加 -s：book ➔ books, pen ➔ pens, bag ➔ bags'],
  ['w', '③ 进阶要点：② 以 s, x, ch, sh 结尾加 -es 读 /ɪz/：bus ➔ buses, box ➔ boxes, watch ➔ watches, dish ➔ dishes'],
  ['w', 'G01 第1幕'],
  ['s', 'I have one book and two pens.', '我有一本书和两支钢笔。'],
  ['n', '🎵 口诀：单数变复数，一般直接加 s；s/x/ch/sh 结尾加 es；辅音加 y 变 i 加 es；f/fe 结尾多数变 ves，giraffe 只加 s！']
];
export default function build() { return autoBuild(SP, { title: '📘 G01 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
