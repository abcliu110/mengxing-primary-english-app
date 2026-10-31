// 📘 G15 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g15.js 案例 1；对照清单 lab/INVENTORY_HD_G15_1_V5.md
// 角色关键帧：sprites/hdg15_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg15_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G15 底层原理'],
  ['w', '连词逻辑关系网 (and / but / or / because) —— and 牵手并列，but 急转弯，or 二选一（否定句里顶替 and），because 绝不配 so！'],
  ['w', '【为什么汉语常说“因为…所以…”，英语却严禁 because 和 so 同句出现？】'],
  ['w', '英语一句简单句只能有一个主干，如果同时放了从属连词 because 和并列连词 so，语法树就断了！'],
  ['w', '所以英语里 because 和 so 只能二选一！'],
  ['w', '🔬 G15 · 连词逻辑关系网 (and / but / or / because) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I like apples and bananas, but I don\'t like pears or peaches.'],
  ['w', '我喜欢苹果和香蕉，但我不喜欢梨和桃子。你更喜欢哪一个，茶还是牛奶？因为外面在下雨，所以我们待在家里。'],
  ['w', '② 核心结构规律：① and vs or 否定转换铁律：肯定句并列用 and；一旦变成否定句，并列词必须换成 or！'],
  ['w', '③ 进阶要点：② but 转折对比：前后句意相反或转折'],
  ['w', 'G15 第1幕'],
  ['s', 'I like apples and bananas, but I don\'t like pears or peaches.', '我喜欢苹果和香蕉，但我不喜欢梨和桃子。'],
  ['n', '🎵 口诀：肯定并列用 and，转折对比用 but；疑问选择用 or，否定并列也用 or（I don\'t have pens or pencils）；因为 because 所以 so，同句绝不一起走！']
];
export default function build() { return autoBuild(SP, { title: '📘 G15 底层原理', items: ITEMS, acts: ACTS }); }
