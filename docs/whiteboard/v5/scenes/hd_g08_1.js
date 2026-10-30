// 📘 G08 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g08.js 案例 1；对照清单 lab/INVENTORY_HD_G08_1_V5.md
// 角色关键帧：sprites/hdg08_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg08_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G08 底层原理'],
  ['w', '形容词性物主代词 vs 名词性物主代词 (my vs mine) —— my 是“粘人精”（后面必带名词），mine 是“独行侠”（自带名词光环）！'],
  ['w', '【为什么有了 my 还要发明 mine？】为了避免啰嗦重复！当别人问 Whose book is this? 直接把'],
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
  ['w', 'G08 第1幕'],
  ['s', 'This is my bag. That red one is yours (= your bag).', '形物代(my/your/her/our/their)是粘人精，后面必须跟名词；名物代(mine/yours/hers/ours/theirs)是独行侠，句尾单干不带名！牢记公式：形物代 + 名词 = 名物代！']
];
export default function build() { return autoBuild(SP, { title: '📘 G08 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
