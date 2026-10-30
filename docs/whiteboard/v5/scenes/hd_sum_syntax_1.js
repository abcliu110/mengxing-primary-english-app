// 🌳 汉英语序对比 · 第1幕 英语主谓宾先行 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_syntax.js 案例 1；对照清单 lab/INVENTORY_HD_SUM_SYNTAX_1_V5.md
// 角色关键帧：sprites/hdssyn1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdssyn1.js';
const ACTS = {"*": ["kick0", "kick1", "l_speak"]};
const ITEMS = [
  ['w', '汉英语序对比'],
  ['w', '汉语先铺垫时间地点背景最后出动作；英语主谓宾(SVO)焦点先行，先地点后时间，从小到大！'],
  ['w', '看中央实验台：直观观察汉英火车车厢跨轨重组与三大形态铁律！'],
  ['w', '🔬 语序铁律 1：汉语『先铺垫时空背景』vs 英语『主谓宾焦点先行 + 先地点后时间』'],
  ['w', '🇨🇳 汉语语序：[我(主)] ➔ [昨天(时间)] ➔ [在公园(地点)] ➔ [踢了球(核心动作在最后)]'],
  ['w', '⬇️ 英语把『主谓宾动作核心』提拔到最前，地点时间挂车尾 ⬇️'],
  ['w', '🇬🇧 英语语序：[I played football (主谓宾先行)] + [in the park (先地点)] + [yesterday (后时间)]'],
  ['w', '语序第1幕'],
  ['s', 'I played football in the park yesterday. Look at the book on the desk.', '远离中式英语：先把谁做了什么(SVO)说完，再放地点时间；长定语一律后置！']
];
export default function build() { return autoBuild(SP, { title: '🌳 汉英语序对比 · 第1幕 英语主谓宾先行', items: ITEMS, acts: ACTS }); }
