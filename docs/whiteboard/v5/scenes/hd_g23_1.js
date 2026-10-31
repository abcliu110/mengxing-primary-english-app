// 📘 G23 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g23.js 案例 1；对照清单 lab/INVENTORY_HD_G23_1_V5.md
// 角色关键帧：sprites/hdg23_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg23_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G23 底层原理'],
  ['w', '一般过去时否定与疑问（did 能量吸收器） —— 只要助动词 did / didn\'t 一出场，后面的过去式动词立刻还原成原形！'],
  ['w', '【为什么 didn\'t 后面必须变回 go？】助动词 `did` 像一块强力海绵把整句话的“过去时能量”全部吸光了，'],
  ['w', '🔬 did 能量吸收器：did / didn\'t 吸走过去时'],
  ['w', '公式：否定 主语 + didn\'t + 动词原形；疑问 Did + 主语 + 动词原形？'],
  ['w', '动词打回原形：went ➔ go，saw ➔ see'],
  ['w', '对比：He went to the zoo. → He didn\'t go to the zoo. → Did he go to the zoo?'],
  ['s', 'Did he go to the zoo? No, he didn\'t.', '他去动物园了吗？不，他没去。'],
  ['w', '常错：I didn\'t went. ✗ → I didn\'t go. ✓'],
  ['w', '答语：— Did you go? — Yes, I did. / No, I didn\'t.'],
  ['w', '🗣️ 语境实证：I went to the park yesterday, but I didn\'t go to the zoo.'],
  ['w', '🎵 口诀：过去否定与疑问，请出帮手 did 大人；did 和 didn\'t 一现身，过去能量全吸尽'],
  ['w', 'G23 第1幕'],
  ['s', 'I went to the park yesterday, but I didn\'t go to the zoo.', '过去否定与疑问，请出帮手 did 大人；did 和 didn\'t 一现身，过去能量全吸尽，后面动词秒回原形（Did you go? / I didn\'t go）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G23 底层原理', items: ITEMS, acts: ACTS }); }
