// 📘 G16 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g16.js 案例 1；对照清单 lab/INVENTORY_HD_G16_1_V5.md
// 角色关键帧：sprites/hdg16_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg16_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G16 底层原理'],
  ['w', 'be 动词现在时三剑客 (am / is / are) —— 主语是谁决定了派哪位 be 动词出场！'],
  ['w', '【为什么同样表示“是/在”，英语要分成 am / is / are 三个词？】'],
  ['w', '这叫“主谓一致”——动词根据主语的人称和单复数穿上对应的制服，让听话人光听 am/is/are 就知道主语是谁！'],
  ['w', '🔬 G16 · be 动词现在时三剑客 (am / is / are) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I am ten years old.'],
  ['w', '我十岁了。你是我最好的朋友，我们在1班。他很高，她很亲切，水很温。'],
  ['w', '② 核心结构规律：① 三剑客分工：I ➔ am；he / she / it / 单数名词 / 不可数名词 ➔ is；'],
  ['w', 'you / we / they / 复数名词 / A and B ➔ are'],
  ['w', '③ 进阶要点：② 缩略形式：I\'m = I am, he\'s = he is, isn\'t = is not, aren\'t = are not（am not 无缩写）'],
  ['w', 'G16 第1幕'],
  ['s', 'I am ten years old.', '我十岁了。'],
  ['n', '🎵 口诀：我(I)用 am，你(you)用 are，is 连着他(he)她(she)它(it)；单数不可数全用 is，复数主语一律 are！']
];
export default function build() { return autoBuild(SP, { title: '📘 G16 底层原理', items: ITEMS, acts: ACTS }); }
