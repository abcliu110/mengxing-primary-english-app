// 📘 G05 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g05.js 案例 1；对照清单 lab/INVENTORY_HD_G05_1_V5.md
// 角色关键帧：sprites/hdg05_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg05_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G05 底层原理'],
  ['w', '不定冠词 a 与 an 的听音法则 —— 选 a 还是选 an？用耳朵听“元音音素”，别被首字母骗了！'],
  ['w', '【为什么 a 在元音前要变成 an？】连读 a apple 时两个元音撞在一起嘴巴卡壳，在中间垫一个鼻音 n 变成'],
  ['w', '🔬 G05 · 不定冠词 a 与 an 的听音法则 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I have a book, an apple and an orange.'],
  ['w', '我有一本书、一个苹果和一个橙子。等一个小时！看一把雨伞！他是一名带着一本有用词典的大'],
  ['w', '② 核心结构规律：① 基本原则：辅音音素开头用 a，元音音素开头用 an'],
  ['w', '③ 进阶要点：② 必考 an 清单：an apple, an egg, an elephant, an'],
  ['w', 'G05 第1幕'],
  ['s', 'I have a book, an apple and an orange.', '单数可数要加冠词，a/an 小帽戴头顶；辅音音素前戴 a，元音音素前戴 an；an hour（h静音）和 a useful book（u读/juː/）最要当心！']
];
export default function build() { return autoBuild(SP, { title: '📘 G05 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
