// 🧱 五大基本句型 · ① SV 自给自足型 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/five_patterns_p2_1.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 1；对照清单 lab/INVENTORY_FIVE_PATTERNS_1_V5.md
// 角色关键帧：sprites/fpat1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat1.js';
const ACTS = {"rises": ["sunny"], "run": ["l_r0", "l_r1", "l_r2"], "fly": ["bird_up", "bird_down"], "look": ["l_point"], "play": ["kick0", "kick1", "kick2"], "sleep": ["baby"]};
const ITEMS = [
  ['n', '这节课：拍一张英语句子的「X 光片」，看清它的骨头！'],
  ['w', '句型 ① SV'],
  ['w', '自给自足型 · 无需宾语'],
  ['w', '💡 记忆联想'],
  ['w', '✂️ 简化说法'],
  ['w', '句型 ① SV'],
  ['w', '自给自足型 · 无需宾语'],
  ['w', '💡 记忆联想'],
  ['m', '✂️ 简化说法'],
  ['m', '① 骨架'],
  ['m', '② 挂件'],
  ['m', '③ 金句'],
  ['m', '④ 挂钩'],
  ['m', '⑤ 公式·口诀'],
  ['m', '🔮 预测'],
  ['n', '五大基本句型：英语句子最常见的 5 种骨架。句子再长，骨架也逃不出这 5 种。'],
  ['n', '主语 S：句子在说「谁」或「什么」。S 是 Subject（主语）的第一个字母。'],
  ['w', 'S 主语'],
  ['w', '谁？'],
  ['n', '谓语 V：说主语「做什么」的动词，是句子的核心。V 来自 Verb（动词）。'],
  ['m', '+'],
  ['m', 'V 不及物谓语'],
  ['w', '做什么？'],
  ['n', '把词放进骨架：The sun 是主语，rises（升起）是谓语。'],
  ['w', 'The sun'],
  ['w', 'rises'],
  ['n', '挂件：补充「在哪儿、怎么样」的部分，比如 in the east（在东方）。去掉骨架也不散。'],
  ['m', '+'],
  ['m', '地点挂件'],
  ['w', '在哪儿（可有可无）'],
  ['w', 'in the east'],
  ['w', '东'],
  ['s', 'The sun rises in the east.', '太阳从东方升起。', 'The sun rises in the east'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ① SV 自给自足型', items: ITEMS, acts: ACTS }); }
