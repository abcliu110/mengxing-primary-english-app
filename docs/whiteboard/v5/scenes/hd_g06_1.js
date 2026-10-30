// 📘 G06 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g06.js 案例 1；对照清单 lab/INVENTORY_HD_G06_1_V5.md
// 角色关键帧：sprites/hdg06_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg06_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G06 底层原理'],
  ['w', '定冠词 the 与零冠词（球类三餐 vs 西洋乐器） —— 特指/独一无二/弹乐器必加 the；踢球/吃三餐/学科月份不加冠词！'],
  ['w', '【the 是从哪来的？】the 意思是“你我都心知肚明的那个（特指）”！而球类运动（play football）重在'],
  ['w', '🔬 G06 · 定冠词 the 与零冠词（球类三餐 vs 西洋乐器） 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I see a dog. The dog is very cute.'],
  ['w', '我看见一只狗。这只狗很可爱。太阳从东方升起。她会拉小提琴，她哥哥喜欢午饭后打篮球。'],
  ['w', '② 核心结构规律：① 必用 the 的场景：前文提过再出现；双方都知特指；世上独一无二（the sun/m'],
  ['w', '③ 进阶要点：② 零冠词场景：play + 球类/棋类；have + 三餐；星期月份季节前；学科语言前'],
  ['w', 'G06 第1幕'],
  ['s', 'I see a dog. The dog is very cute.', '特指双知用定冠(the)，世上独一太阳蓝天(the sun/sky)；西洋乐器必加 the（play the piano），球类棋类三餐前，冠词统统靠边站（play football / have dinner）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G06 底层原理', items: ITEMS, acts: ACTS }); }
