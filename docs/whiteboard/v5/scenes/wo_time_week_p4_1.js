// 📖 单词身世 · 星期 · 1 · 第 4 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_time_week_1（321 s）的第 4 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 4 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_time_week.js 案例 1；对照清单 lab/INVENTORY_WO_TIME_WEEK_1_V5.md
// 角色关键帧：sprites/wow1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wow1.js';
const ACTS = {"go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '后来：后来罗马人在前面加了一月、二月，名字没改——所以「七月」跑到了第九个位置。'],
  ['w', '后来前面加了一月、二月，名字没改 → 往后挪了两格'],
  ['n', '对照：中文的星期按数字排：星期一、二、三……日语按天上的客人排：日、月、火、水、木、金、土——和英语是同一套想法！'],
  ['w', '中文：星期一、二、三……'],
  ['w', '按数字排'],
  ['w', '日语：日、月、火、水……'],
  ['w', '按天上的七位客人排（同英语）'],
  ['w', '💡 对照，不是同源'],
  ['n', '预测：考考你：Sunday 是太阳的日子，那 Monday 是谁的日子？先想 3 秒！'],
  ['w', '🔮 Sunday = sun + day，Monday = ？ + day'],
  ['w', '？'],
  ['n', '揭晓：Monday = moon + day：月亮的日子！'],
  ['w', 'moon（月亮）'],
  ['w', '📜 真实词源'],
  ['s', 'The moon is bright tonight.', '今晚月亮很亮。', 'moon'],
  ['n', '口诀：七天是天上七位客人；September 到 December，古罗马的七、八、九、十！'],
  ['w', '💡 一句话洞见'],
  ['w', '一星期是天上的七位客人：'],
  ['w', '太阳、月亮、五颗行星和神；'],
  ['w', 'September 到 December 是古罗马历的第七到第十个月。'],
  ['w', '🎵 口诀'],
  ['w', '七天七位天上客；'],
  ['w', '九月原来是「七」月！'],
  ['w', '📖 单词身世 · 时间与度量 · 星期和月份']
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · 星期 · 1 · 第 4 节', items: ITEMS, acts: ACTS }); }
