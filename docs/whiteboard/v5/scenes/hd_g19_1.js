// 📘 G19 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g19.js 案例 1；对照清单 lab/INVENTORY_HD_G19_1_V5.md
// 角色关键帧：sprites/hdg19_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg19_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G19 底层原理'],
  ['w', '一般现在时第三人称单数（三单小尾巴 -s/-es） —— 不是你(you)、不是我(I)、而且只有1个他/她/它——动词必须戴上 -s 小勋章！'],
  ['w', '【英语为什么非要给三单动词加 -s？】复数主语名词自带了 -s（The boys like...），而单数第三人称主'],
  ['w', '🔬 三单警报器：主语是 he / she / it 或一个人、一样东西 → 动词加 -s'],
  ['w', '公式：He / She / It + 动词-s（-es）'],
  ['w', '加法：一般 +s（likes）；s、x、ch、sh、o 结尾 +es（watches, goes）；辅音字母 + y 变 y 为 i 加 es（studies）'],
  ['w', '读音：清辅音后读 /s/（works）；浊辅音和元音后读 /z/（plays）；s、x、ch、sh 后读 /ɪz/（watches）'],
  ['w', '对比：I like apples. → She likes apples.'],
  ['s', 'She likes apples.', '她喜欢苹果。'],
  ['w', '常错：He go to school. ✗ → He goes to school. ✓'],
  ['w', '否定、疑问请 does：does 吸走 -s，likes ➔ like（He doesn\'t like it. / Does he like it?）'],
  ['s', 'He doesn\'t like milk. Does he like milk?', '他不喜欢牛奶。他喜欢牛奶吗？'],
  ['w', '🗣️ 语境实证：My father works in a hospital and goes to work by car.'],
  ['w', '🎵 口诀：不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！h'],
  ['w', 'G19 第1幕'],
  ['s', 'My father works in a hospital and goes to work by car.', '不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！have 变 has，辅音+y 变 ies，ch/sh/s/x/o 后加 es！does 一出场，动词回原形！']
];
export default function build() { return autoBuild(SP, { title: '📘 G19 底层原理', items: ITEMS, acts: ACTS }); }
