// 📘 G12 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g12.js 案例 1；对照清单 lab/INVENTORY_HD_G12_1_V5.md
// 角色关键帧：sprites/hdg12_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg12_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G12 底层原理'],
  ['w', '副词修饰动作与频率副词位置 (fast / happily / always) —— 形容词管名词，副词管动作！频率副词站在“be后实前”！'],
  ['w', '【为什么“快乐地唱歌”是 sing happily？】英语先亮出动作 sing（唱），再补充是怎么唱的 happil'],
  ['w', '🔬 G12 · 副词修饰动作与频率副词位置 (fast / happily / always) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：The old turtle walks slowly, but the rabbit ru'],
  ['w', '老乌龟走得很慢，但兔子跑得很快。孩子们在公园里快乐地玩耍。她总是很有礼貌，而且经常帮'],
  ['w', '② 核心结构规律：① 方式副词：一般形容词加 -ly（quietly, carefully, happil'],
  ['w', '③ 进阶要点：② 不加 -ly 特例：fast, early, late, hard 形副同形；goo'],
  ['w', 'G12 第1幕'],
  ['s', 'The old turtle walks slowly, but the rabbit runs fast.', '形容词变副词，词尾常加 -ly（slow→slowly, happy→happily）；fast/hard/early/late/high/well 形副同形或特殊记！频率副词站哪里？be动词后、实义动词前！']
];
export default function build() { return autoBuild(SP, { title: '📘 G12 底层原理', items: ITEMS, acts: ACTS }); }
