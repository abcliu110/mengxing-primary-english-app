// 📘 G39 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g39.js 案例 1；对照清单 lab/INVENTORY_HD_G39_1_V5.md
// 角色关键帧：sprites/hdg39_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg39_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G39 底层原理'],
  ['w', '最高级：the + -est / most...（三者及以上夺冠） —— 在三个或一群对象里选出“最……的冠军”——形容词最高级前必戴定冠词 the 王冠！'],
  ['w', '【为什么最高级前面必须加 the？】因为全班最高的人是**唯一锁定（特指）的冠军**，自然要戴上定冠词王冠 **th'],
  ['w', '🔬 G39 · 最高级：the + -est / most...（三者及以上夺冠） 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：The giraffe is the tallest animal in the zoo.'],
  ['w', '长颈鹿是动物园里最高的动物。蓝鲸是世上最大的动物。春天是四季中最好的季节。'],
  ['w', '② 核心结构规律：① 构成：tall ➔ the tallest, big ➔ the biggest,'],
  ['w', '③ 进阶要点：② 范围词：`in + 空间范围`（in our class / in the worl'],
  ['w', 'G39 第1幕'],
  ['s', 'The giraffe is the tallest animal in the zoo.', '三者以上选冠军，最高级前戴 the 冠；短词尾巴加 -est，长词前面 the most 站；同类群体用 of all，空间地点用 in the class！']
];
export default function build() { return autoBuild(SP, { title: '📘 G39 底层原理', items: ITEMS, acts: ACTS }); }
