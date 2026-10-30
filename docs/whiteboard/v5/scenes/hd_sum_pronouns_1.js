// 📊 代词全局原理 · 第1幕 主格 vs 宾格：过了动词门就换装 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_pronouns.js 案例 1；对照清单 lab/INVENTORY_HD_SUM_PRONOUNS_1_V5.md
// 角色关键帧：sprites/hdspro1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdspro1.js';
const ACTS = {"*": ["l_point", "m_pass", "l_hand1"]};
const ITEMS = [
  ['w', '代词全局原理'],
  ['w', '代词随句法位置变格：主语用主格(I/he)，动介后用宾格(me/him)，形物+名词=名物(my book=mine)'],
  ['w', '看中央实验台：直观演示主宾格过门换装与 my+book 吞噬合体为 mine！'],
  ['w', '🔬 深度机制 1：为什么『我/他』在动词前后要换衣服？（主格 vs 宾格）'],
  ['w', '👑 句首主语区'],
  ['w', 'I / he / she / they'],
  ['w', '(动作发起人穿主格)'],
  ['w', '⚡ 动词/介词转换门'],
  ['w', 'help / give / to / with'],
  ['w', '穿过此门强制换宾格!'],
  ['w', '🎯 动介后宾语区'],
  ['w', 'me / him / her / them'],
  ['w', '(承受动作穿宾格)'],
  ['w', '主格 He'],
  ['w', '变宾格 him!'],
  ['w', '代词第1幕'],
  ['s', 'I like my book. Give it to me. This book is mine!', '主格站句首，宾格站动介后；形容词性物主代词必须带名词，名词性物主代词独立顶包！']
];
export default function build() { return autoBuild(SP, { title: '📊 代词全局原理 · 第1幕 主格 vs 宾格：过了动词门就换装', items: ITEMS, acts: ACTS }); }
