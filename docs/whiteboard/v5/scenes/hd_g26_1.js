// 📘 G26 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g26.js 案例 1；对照清单 lab/INVENTORY_HD_G26_1_V5.md
// 角色关键帧：sprites/hdg26_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg26_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G26 底层原理'],
  ['w', '情态动词 can / can\'t（能力与许可） —— 表示“能、会、可以”——自带能量护盾，后面动词永远用原形！'],
  ['w', '【为什么 He can swims 是错的？】'],
  ['w', '因为情态动词 can 不随人称加 s，而且像保护伞一样让后面的动词永远保持原形（He can swim）！'],
  ['w', '🔬 can 的两种意思'],
  ['w', '能力（会）：I can swim.'],
  ['w', '许可（可以）：Can I use your pen? — Yes, you can. / Sorry, you can\'t.'],
  ['s', 'Can I use your pen? Yes, you can.', '我可以用你的钢笔吗？可以。'],
  ['w', '公式：主语 + can + 动词原形；否定 can\'t；疑问 Can + 主语 + 动词原形？'],
  ['w', '🧲 can 后面动词回原形：He can swims. ✗ → He can swim. ✓'],
  ['w', '常错：Can you to swim? ✗ → Can you swim? ✓'],
  ['w', '🗣️ 语境实证：Birds can fly, and fish can swim.'],
  ['w', '🎵 口诀：情态动词小能手 can，会做某事本领强；主语是谁它不变，后面动词用原形；否定直接变 ca'],
  ['w', 'G26 第1幕'],
  ['s', 'Birds can fly, and fish can swim.', '鸟儿会飞，鱼儿会游泳。'],
  ['n', '🎵 口诀：情态动词小能手 can，会做某事本领强；主语是谁它不变，后面动词用原形；否定直接变 can\'t，疑问把 can 提句首！']
];
export default function build() { return autoBuild(SP, { title: '📘 G26 底层原理', items: ITEMS, acts: ACTS }); }
