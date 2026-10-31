// 📘 G04 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g04.js 案例 1；对照清单 lab/INVENTORY_HD_G04_1_V5.md
// 角色关键帧：sprites/hdg04_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg04_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G04 底层原理'],
  ['w', '名词所有格 —— 表达“……的”：生物/非生物不是分界线；\'s 是贴身标签，of 是挂在后面的说明牌；先试 \'s，长短语常用 of'],
  ['w', '【为什么 the legs of the desk 顺序和汉语相反？】'],
  ['w', 'of 是挂在后面的说明牌：of 结构（the legs of the desk）多用于无生命的事物，或所属短语较长、较重时；但这只是倾向'],
  ['w', '🔬 G04 · 名词所有格（\'s 是标签先贴上，又长又重用 of 讲）底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：This is Sarah\'s schoolbag.'],
  ['w', '这是萨拉的书包。看莉莉和露西共用的卧室——她们住一间房！教室的门在哪里？'],
  ['w', '② 核心结构规律：① 单数/不以s结尾复数：直接加 \'s（Tom\'s book, Children\'s Day 儿童节）'],
  ['w', '③ 进阶要点：② 以 s 结尾的复数名词：只加撇号 \'（the teachers\' office 老师们的办公室）'],
  ['w', 'G04 第1幕'],
  ['s', 'This is Sarah\'s schoolbag.', '这是萨拉的书包。'],
  ['n', '🎵 口诀：有生命，常用 \'s（Tom\'s bag）；没生命，两种都行——时间和距离爱用 \'s（today\'s news、a day\'s trip），说得长的用 of（the door of the classroom）。s 结尾复数只加撇号 \'（teachers\' office）；共有只在最后加，各自拥有分别加！']
];
export default function build() { return autoBuild(SP, { title: '📘 G04 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
