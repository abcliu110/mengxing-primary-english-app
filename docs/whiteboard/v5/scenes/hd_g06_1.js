// 📘 G06 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g06.js 案例 1；对照清单 lab/INVENTORY_HD_G06_1_V5.md
// 角色关键帧：sprites/hdg06_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg06_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G06 底层原理'],
  ['w', '定冠词 the 与零冠词（球类三餐 vs 西洋乐器） —— 特指/独一无二/弹乐器必加 the；踢球/吃三餐/学科月份不加冠词！'],
  ['w', '【the 是从哪来的？】the 意思是“你我都心知肚明的那个（特指）”！'],
  ['w', '而球类运动（play football）重在规则竞技本身，三餐（have lunch）重在日常饮食活动，所以零冠词上阵！'],
  ['s', 'We play football after lunch.', '我们午饭后踢足球。'],
  ['w', '🔬 G06 · 定冠词 the 与零冠词（球类三餐 vs 西洋乐器） 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I see a dog. The dog is very cute.'],
  ['w', '我看见一只狗。这只狗很可爱。太阳从东方升起。她会拉小提琴，她哥哥喜欢午饭后打篮球。'],
  ['s', 'The sun rises in the east.', '太阳从东方升起。'],
  ['s', 'She can play the violin.', '她会拉小提琴。'],
  ['s', 'Her brother likes to play basketball after lunch.', '她哥哥喜欢午饭后打篮球。'],
  ['w', '② 核心结构规律：① 必用 the 的场景：前文提过再出现；双方都知特指；世上独一无二（the sun/moon/earth/sky）；'],
  ['s', 'The sun, the moon, the earth, the sky.', '太阳、月亮、地球、天空。'],
  ['w', '序数词与最高级前（the first/tallest）；play + the + 西洋乐器'],
  ['s', 'The first. The tallest.', '第一。最高。'],
  ['w', '③ 进阶要点：② 零冠词场景：play + 球类/棋类；have + 三餐；星期月份季节前；学科语言前；by + 交通工具'],
  ['s', 'I have lunch at school.', '我在学校吃午饭。']
  ['s', 'I go to school by bus.', '我坐公交车去学校。'],
  ['w', 'G06 第1幕'],
  ['s', 'I see a dog. The dog is very cute.', '我看见一只狗。这只狗很可爱。'],
  ['n', '第一次提，用 a：听的人还不知道是哪一个；两人都知道是哪一个，用 the；说\'去做那件事\'——上学、睡觉、踢球、吃饭——冠词放假；弹钢琴的 the 是老习惯，跟着说 play the piano。'],
  ['n', 'go to school 是\'去上学\'（做学生该做的事），go to the school 是\'去那栋楼\'（人未必是学生）。同一个词，看你说的是做事还是东西。']
];
export default function build() { return autoBuild(SP, { title: '📘 G06 底层原理', items: ITEMS, acts: ACTS }); }
