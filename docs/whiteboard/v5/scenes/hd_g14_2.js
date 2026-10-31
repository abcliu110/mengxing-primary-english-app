// 📘 G14 底层原理 · 时间漏斗 —— 决策 38 ⑤ 啊哈重做（概念原语 lib/concept.js + scenes/g14_lib.js；啊哈卡 lab/audit38/aha/05_hd_g14.md）
// 内容来源：GRAMMAR_DB G14 step3_rules + 旧版 src/cases/hd_g14.js 案例 2（清单 lab/INVENTORY_HD_G14_2_V5.md）。
// 事实纠错（决策 36-①4 / 38）：旧板「IN (>1天长时段容器)…in the morning」自相矛盾（早上不到 1 天）→ 改为「比一天长的时段，或一天里泛指的上午 / 下午 / 晚上」；
//   at noon / at night 是「点」的例外；on Sunday morning = 锁定了具体某一天；weekend：英式 at the weekend，美式 / 人教课本 on the weekend。
// 角色：不用人物；sprites/hdg14_2.js 为空包。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { shapes, COL, XS, readT, sayLen } from './g14_lib.js';
import * as SP from '../sprites/hdg14_2.js';
const ACTS = {};
export const KNOW = [
  'G14 底层原理',
  '介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— 告别死记硬背！看懂“容器(in)・表面(on)・精确点(at)”空间图式，一通百通！',
  '🔬 介词三维空间几何图式 ➔ 时间漏斗隐喻映射',
  'in the box / in May', 'on the desk / on Monday', 'at the door / at 7:30',
  '📦 IN（比一天长的时段，或一天里泛指的上午 / 下午 / 晚上）：in 2026 / in May / in spring / in the morning',
  '📄 ON (=具体1天日历面)：on Monday / on June 1st / on Sunday morning',
  '🎯 AT (精确钟点时刻)：at 7:30 / at noon / at night',
  '为什么“在早上”是 in the morning，而“在周日的早上”却变成了 on Sunday morning？',
  '只要时间锁定到了“具体某一天（Sunday）”，无论后面有没有 morning/afternoon，都归属于“某一天表面”用 on！',
  '【时间映射】I was born in May (大范围月), on Sunday morning (具体某天), at 8 o\'clock (精确时刻).',
  '空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！',
];
void ACTS;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '上一幕的盒子 / 桌面 / 靶心变成三个「时间收纳格」；时间卡一张张飞进去：2026、May、spring 进盒子，Monday、June 1st 落桌面，7:30 钉在靶心',
    guess: '先猜「the morning」进哪格？再猜「Sunday morning」进哪格？',
    reveal: 'the morning 进盒子（一天里泛指的一段）；Sunday morning 却落到桌面——因为 Sunday 把它锁在了具体某一天；noon、night 被钉成靶心上的点（例外）',
    rule: 'in：比一天长的时段，或一天里泛指的上午 / 下午 / 晚上；on：具体某一天（含某天的早上）；at：钟点，以及 noon / night',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  C.label('📘 G14 底层原理 · in / on / at ②时间', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— 告别死记硬背！看懂“容器(in)・表面(on)・精确点(at)”空间图式，一通百通！', T, 4);
  const SY = 380, glow = {};
  shapes(K, { from: 0.8, y: SY, s: 0.8, glow });
  ['in', 'on', 'at'].forEach((w, i) => C.chip({ text: w, x: XS[w], y: 560, size: 60, from: 1.0 + i * 0.2, col: COL[w], bd: COL[w], bold: true }));
  // 每格的卡位：两列 × 3 行
  const slotXY = (w, k) => [XS[w], 640 + k * 66];
  const fill = { in: 0, on: 0, at: 0 };
  const card = (text, w, t, extra = {}) => { const [x, y] = slotXY(w, fill[w]++); const c = C.chip({ text, x: 960, y: 900, size: 42, from: t, ...extra }); C.drop(c, t + 0.5, x, y); C.swap(c, t + 1.1, text, INK, '#fff', COL[w]); return c; };
  T = narr('🔬 介词三维空间几何图式 ➔ 时间漏斗隐喻映射', T, 3.0);
  T = narr('同一张图，装的东西从「东西」换成「时间」。', T, 3);
  const t0 = T;
  [['2026', 'in'], ['May', 'in'], ['spring', 'in'], ['Monday', 'on'], ['June 1st', 'on'], ['7:30', 'at']].forEach(([x, w], i) => card(x, w, t0 + i * 1.3));
  T = t0 + 6 * 1.3 + 1.0;
  K.narr('in the box / in May', t0 + 0.8, t0 + 3.4); K.narr('on the desk / on Monday', t0 + 3.4, t0 + 6.0); K.narr('at the door / at 7:30', t0 + 6.0, T);
  // 预测 1：the morning
  const m1 = C.chip({ text: 'the morning', x: 960, y: 900, size: 44, from: T, bd: RED });
  T = C.predict(T + 0.4, { q: '「the morning（早上）」进哪一格？', sec: 4 });
  const [mx, my] = slotXY('in', fill.in++); C.drop(m1, T + 0.2, mx, my); C.swap(m1, T + 0.9, 'the morning', INK, '#fff', BLUE);
  glow.in = [T + 0.2, T + 2.4];
  T = narr('进盒子：早上是一天里泛指的一段时间，像一个装时间的容器。', T + 0.3, 3.4);
  // 预测 2：Sunday morning
  const m2 = C.chip({ text: 'Sunday morning', x: 960, y: 900, size: 44, from: T, bd: RED });
  T = narr('为什么“在早上”是 in the morning，而“在周日的早上”却变成了 on Sunday morning？', T, 3.6);
  T = C.predict(T, { q: '「Sunday morning」还进盒子吗？', sec: 4 });
  const [sx, sy] = slotXY('on', fill.on++); C.drop(m2, T + 0.2, sx, sy); C.swap(m2, T + 0.9, 'Sunday morning', INK, '#fff', GREEN);
  glow.on = [T + 0.2, T + 2.6];
  T = narr('只要时间锁定到了“具体某一天（Sunday）”，无论后面有没有 morning/afternoon，都归属于“某一天表面”用 on！', T + 0.3, 5);
  // 例外：noon / night 当成一个点
  card('noon', 'at', T); card('night', 'at', T + 1.2);
  glow.at = [T + 0.5, T + 3.0];
  T = narr('例外：中午 noon、夜里 night 被看成一个点 → at noon、at night。', T, 3.8);
  C.rule(T);
  T = narr('📦 IN（比一天长的时段，或一天里泛指的上午 / 下午 / 晚上）：in 2026 / in May / in spring / in the morning', T, 4.4);
  T = narr('📄 ON (=具体1天日历面)：on Monday / on June 1st / on Sunday morning', T, 3.4);
  T = narr('🎯 AT (精确钟点时刻)：at 7:30 / at noon / at night', T, 3.0);
  T = narr('周末：英式说 at the weekend，美式（人教课本）说 on the weekend，两种都对。', T, 3.6);
  const S = 'I was born in May, on Sunday morning, at 8 o\'clock.';
  K.say(T, S, { zh: '我出生在五月、在一个周日的早晨、在八点整。', key: ['in', 'on', 'at'], len: Math.max(sayLen(S), 4.2) });
  K.narr('【时间映射】I was born in May (大范围月), on Sunday morning (具体某天), at 8 o\'clock (精确时刻).', T, T + 5);
  T += 5.5;
  T = narr('空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
