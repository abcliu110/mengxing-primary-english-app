// 📘 G14 底层原理 · 状态隐喻 —— 决策 38 ⑤ 啊哈重做（概念原语 lib/concept.js + scenes/g14_lib.js；啊哈卡 lab/audit38/aha/05_hd_g14.md）
// 内容来源：GRAMMAR_DB G14 step1_story ③ / step3_rules 的状态隐喻 + 旧版 src/cases/hd_g14.js 案例 3（清单 lab/INVENTORY_HD_G14_3_V5.md）。
// 旧第 3 幕与第 2 幕板书相同（审计 36-①4），本幕换成真正的「状态隐喻」：in red / in English、on duty / on foot / on TV、at work / look at / be good at。
// 角色：不用人物；sprites/hdg14_3.js 为空包。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { shapes, COL, XS, readT, sayLen } from './g14_lib.js';
import * as SP from '../sprites/hdg14_3.js';
const ACTS = {};
export const KNOW = [
  'G14 底层原理',
  '介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— 告别死记硬背！看懂“容器(in)・表面(on)・精确点(at)”空间图式，一通百通！',
  '🔬 介词三维空间几何图式 ➔ 时间漏斗隐喻映射',
  'in the box / in May', 'on the desk / on Monday', 'at the door / at 7:30',
  '📦 IN（比一天长的时段，或一天里泛指的上午 / 下午 / 晚上）：in 2026 / in May / in spring / in the morning',
  '📄 ON (=具体1天日历面)：on Monday / on June 1st / on Sunday morning',
  '🎯 AT (精确钟点时刻)：at 7:30 / at noon / at night',
  '【状态映射】She is in red (被红衣服包裹), on duty (在值日线上), at work (在工作点上).',
  '她穿着红衣服、在值日、在工作。',
  '空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！',
];
void ACTS;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '还是盒子 / 桌面 / 靶心三格，这次飞来的是「样子和状态」：She is ___ red.——一件红衣服把她整个包起来',
    guess: '红衣服把人整个包住——该进哪一格？',
    reveal: 'in red 进盒子（被包裹）；on duty、on foot、on TV 落在桌面（在一条线 / 一个面上）；at work、look at、be good at 钉在靶心（对准一个点）',
    rule: '空间图式原封不动搬到状态上：包裹 → in，接触 / 在线上 → on，对准一个点 → at',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  C.label('📘 G14 底层原理 · in / on / at ③状态', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— 告别死记硬背！看懂“容器(in)・表面(on)・精确点(at)”空间图式，一通百通！', T, 4);
  const glow = {};
  shapes(K, { from: 0.8, y: 380, s: 0.8, glow });
  ['in', 'on', 'at'].forEach((w, i) => C.chip({ text: w, x: XS[w], y: 560, size: 60, from: 1.0 + i * 0.2, col: COL[w], bd: COL[w], bold: true }));
  const fill = { in: 0, on: 0, at: 0 }, slotXY = (w, k) => [XS[w], 640 + k * 66];
  const card = (text, w, t) => { const [x, y] = slotXY(w, fill[w]++); const c = C.chip({ text, x: 960, y: 900, size: 42, from: t }); C.drop(c, t + 0.5, x, y); C.swap(c, t + 1.1, text, INK, '#fff', COL[w]); return c; };
  // 复习：空间 / 时间各一张
  T = narr('🔬 介词三维空间几何图式 ➔ 时间漏斗隐喻映射', T, 3.0);
  K.narr('in the box / in May', T, T + 2.2); K.narr('on the desk / on Monday', T + 2.2, T + 4.4); K.narr('at the door / at 7:30', T + 4.4, T + 6.6);
  glow.in = [T, T + 2.2]; glow.on = [T + 2.2, T + 4.4]; glow.at = [T + 4.4, T + 6.6];
  T += 6.8;
  T = narr('东西放得进三格，时间也放得进。这一次，放「样子和状态」。', T, 3.4);
  // 预测：in red
  const red = C.chip({ text: 'She is ___ red.', x: 960, y: 900, size: 48, from: T, bd: RED });
  C.pic({ emoji: '👗', x: 1300, y: 890, size: 90, from: T + 0.3, until: T + 6 });
  T = C.predict(T + 0.5, { q: '一件红衣服把她整个包住——进哪一格？', sec: 4 });
  const [rx, ry] = slotXY('in', fill.in++); C.swap(red, T + 0.1, 'in red', INK, '#fff', RED); C.drop(red, T + 0.4, rx, ry); C.swap(red, T + 1.0, 'in red', INK, '#fff', BLUE);
  glow.in = [T + 0.3, T + 2.5];
  T = narr('进盒子：被红衣服包在里面 → in red（穿红衣）。用英语说话，也是「包在英语里」→ in English。', T + 0.3, 4.2);
  card('in English', 'in', T - 2.0);
  // on
  card('on duty', 'on', T); card('on foot', 'on', T + 1.2); card('on TV', 'on', T + 2.4);
  glow.on = [T + 0.5, T + 3.6];
  T = narr('桌面：站在值日这条线上 → on duty；脚贴着地面走 → on foot；画面出现在屏幕面上 → on TV。', T, 4.4);
  // at
  card('at work', 'at', T); card('look at', 'at', T + 1.2); card('be good at', 'at', T + 2.4);
  glow.at = [T + 0.5, T + 3.6];
  T = narr('靶心：在工作这个点上 → at work；目光对准一个点 → look at；本领对准一件事 → be good at。', T, 4.4);
  C.rule(T);
  T = narr('空间图式原封不动搬到时间和状态上：包裹 → in，接触 / 在线上 → on，对准一个点 → at。', T, 4);
  T = narr('📦 IN（比一天长的时段，或一天里泛指的上午 / 下午 / 晚上）：in 2026 / in May / in spring / in the morning', T, 4.4);
  T = narr('📄 ON (=具体1天日历面)：on Monday / on June 1st / on Sunday morning', T, 3.4);
  T = narr('🎯 AT (精确钟点时刻)：at 7:30 / at noon / at night', T, 3.0);
  const S = 'She is in red, on duty, at work.';
  K.say(T, S, { zh: '她穿着红衣服、在值日、在工作。', key: ['in', 'on', 'at'], len: Math.max(sayLen(S), 4) });
  K.narr('【状态映射】She is in red (被红衣服包裹), on duty (在值日线上), at work (在工作点上).', T, T + 5);
  T += 5.5;
  T = narr('空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
