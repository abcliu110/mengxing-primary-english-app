// 🌳 汉英语序对比 · 第3幕 动词变形、单数加冠词、because 连接 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_syntax.js 案例 3；对照清单 lab/INVENTORY_HD_SUM_SYNTAX_3_V5.md
// 角色关键帧：sprites/hdssyn3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdssyn3.js';
const ACTS = {"*": ["l_write0", "l_idea1", "l_think"]};
const ITEMS = [
  ['w', '汉英语序对比'],
  ['w', '汉语先铺垫时间地点背景最后出动作；英语主谓宾(SVO)焦点先行，先地点后时间，从小到大！'],
  ['w', '看中央实验台：直观观察汉英火车车厢跨轨重组与三大形态铁律！'],
  ['w', '🔬 句法铁律 3：动词芯片变形(-s/-ed) · 单数名词要加冠词 · because与so互斥'],
  ['w', '① 动词贴时态芯片'],
  ['w', 'He goes (三单-s)'],
  ['w', 'He went (过去式)'],
  ['w', '② 可数单数要加冠词'],
  ['w', '❌ I like cat.'],
  ['w', '✅ a cat / cats'],
  ['w', '③ 连词绝不双黄蛋'],
  ['w', 'because 与 so 互斥'],
  ['w', 'There be 与 have 互斥'],
  ['w', '语序第3幕'],
  ['s', 'I played football in the park yesterday. Look at the book on the desk.', '远离中式英语：先把谁做了什么(SVO)说完，再放地点时间；长定语一律后置！']
];
export default function build() { return autoBuild(SP, { title: '🌳 汉英语序对比 · 第3幕 动词变形、单数加冠词、because 连接', items: ITEMS, acts: ACTS }); }
