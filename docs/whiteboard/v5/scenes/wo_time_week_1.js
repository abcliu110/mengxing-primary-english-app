// 📖 单词身世 · 星期 · 1 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 4 节，其余在 scenes/wo_time_week_p2_1.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/wo_time_week.js 案例 1；对照清单 lab/INVENTORY_WO_TIME_WEEK_1_V5.md
// 角色关键帧：sprites/wow1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wow1.js';
const ACTS = {"go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '这一幕：Thursday 为什么叫「雷神的日子」？September 明明是 9 月，为什么藏着「七」？'],
  ['w', '星期和月份'],
  ['w', '单词身世 · 时间与度量'],
  ['w', '📜 真实词源'],
  ['w', '💡 记忆联想'],
  ['w', '星期和月份'],
  ['w', '单词身世 · 时间与度量'],
  ['w', '📜 真实词源'],
  ['m', '💡 记忆联想'],
  ['m', '① 地图'],
  ['m', '② 场景'],
  ['m', '③ 词族'],
  ['m', '④ 彩蛋'],
  ['m', '⑤ 中文'],
  ['m', '🔮 预测'],
  ['n', '可信度徽章：📜 = 查得到出处；💡 = 中文 / 日文对照，不是同源。'],
  ['n', '七天：古罗马人用天上的七位「客人」给一星期七天起名：太阳、月亮和五颗行星。'],
  ['m', '☀️'],
  ['m', '太阳'],
  ['m', '🌙'],
  ['m', '月亮'],
  ['m', '火星'],
  ['m', '水星'],
  ['m', '木星'],
  ['m', '金星'],
  ['m', '土星'],
  ['w', '📜 真实词源'],
  ['n', '日耳曼人：英语的祖先把其中几位换成了自己的神：提尔（Tiw）、沃登（Woden）、雷神（Thor）、弗丽嘉（Friga）。'],
  ['w', '英语的祖先换成了自己的神：Tiw、Woden、Thor、Friga'],
  ['s', 'Tiw, Woden, Thor and Friga are old gods.', '提尔、沃登、雷神和弗丽嘉是古代的神。', 'Tiw Woden Thor Friga'],
  ['n', '雷神：Thor 是打雷的神，手里拿着大锤子。'],
  ['w', 'Thor = 雷神'],
  ['s', 'Thor is the god of thunder.', 'Thor 是雷神。', 'Thor thunder'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · 星期 · 1', items: ITEMS, acts: ACTS }); }
