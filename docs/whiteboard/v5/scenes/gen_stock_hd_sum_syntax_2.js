// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_hd_sum_syntax_2.yaml；改编排：模板 hd_sum_syntax_2.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🌳 汉英语序对比 · 第2幕 先地点后时间、从小到大、长定语后置 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_sum_syntax.js 案例 2；对照清单 lab/INVENTORY_HD_SUM_SYNTAX_2_V5.md
// 角色关键帧：sprites/hdssyn2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdssyn2.js';
const ACTS = {"*": ["l_books", "l_point", "house0"]};
const ITEMS = [
  ['w', '汉英语序对比'],
  ['w', '汉语先铺垫时间地点背景最后出动作；英语先说谁做了什么，地点时间排后面（句尾一般先地点后时间，反过来也对），从小到大！'],
  ['w', '看中央实验台：直观观察汉英火车车厢跨轨重组与三大形态铁律！'],
  ['w', '🔬 语序铁律 2：时空缩放『从小到大』& 长定语后置（the book on the desk）'],
  ['w', '🎯 英语时空从小到大：at 8:00 (小点) ➔ on May 1st (某天) ➔ in 2026 (大年)'],
  ['w', '班级年级也是从小到大：Class 2 (小班), Grade 5 (大年级)'],
  ['w', '🔄 介词短语定语后置：汉语说『【桌子上的】书』 ➔ 英语说『the book 【on the desk】』'],
  ['w', '先把核心名词 the book 亮出来，再挂介词短语 on the desk！'],
  ['w', '语序第2幕'],
  ['s', 'I played football in the park yesterday. Look at the book on the desk.', '远离中式英语：先把谁做了什么(SVO)说完，再放地点时间；长定语一律后置！'],
];
export default function build() { return autoBuild(SP, { title: '🌳 汉英语序对比 · 第2幕 先地点后时间、从小到大、长定语后置', items: ITEMS, acts: ACTS }); }
