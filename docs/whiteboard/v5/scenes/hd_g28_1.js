// 📘 G28 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g28.js 案例 1；对照清单 lab/INVENTORY_HD_G28_1_V5.md
// 角色关键帧：sprites/hdg28_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg28_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G28 底层原理'],
  ['w', '肯定陈述句黄金语序：主谓宾 + 先地点后时间 —— 英语先把“谁做了什么”说完，再按“先地点、后时间”排句尾！'],
  ['w', '【为什么汉语说“我每天在学校踢球”，英语却说“我踢球 + 在学校 + 每天”？】'],
  ['w', '英语是“焦点先行思维（SVO）”——先把核心骨架 主语+谓语+宾语 (I play football) 抛出来，再挂上 地点 (at school) 和 时间 (every day)！'],
  ['w', '🔬 G28 · 肯定陈述句黄金语序：主谓宾 + 先地点后时间 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I (主) read (谓) books (宾) in the study (地点) every night (时间).'],
  ['w', '我每天晚上在书房看书。他每天7点半骑自行车去学校。'],
  ['w', '② 核心结构规律：① 黄金语序公式：主语 (Who) + 谓语动词 (Action) + 宾语 (What) + 方式 (How) + 地点 (Where) + 时间 (When)'],
  ['w', '③ 进阶要点：② 切忌中式直译：绝不能把时间地点插在主语和谓语动词之间！'],
  ['w', 'G28 第1幕'],
  ['s', 'I (主) read (谓) books (宾) in the study (地点) every night (时间).', '我每天晚上在书房看书。'],
  ['n', '🎵 口诀：汉英排序大不同，英语骨架打先锋：主语+谓语+宾语排前头，方式、地点、时间依次挂句尾！记住口诀：先地点（where），后时间（when）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G28 底层原理', items: ITEMS, acts: ACTS }); }
