// 📘 G14 底层原理 · 空间图式 —— 决策 38 ⑤ 啊哈重做（概念原语 lib/concept.js + scenes/g14_lib.js；啊哈卡 lab/audit38/aha/05_hd_g14.md）
// 内容来源：GRAMMAR_DB G14 + 旧版 src/cases/hd_g14.js 案例 1（清单 lab/INVENTORY_HD_G14_1_V5.md；旧板截断的 why_explanation 按 GRAMMAR_DB 补全、去掉 **）
// 角色：不用人物（R4 修订）；sprites/hdg14_1.js 为空包。
// 画面：盒子 / 桌面 / 靶心三张图，球分别进盒子、落桌面、停在门口那个点；上面都写着汉语「在」→ 先猜英语为什么要分三个词 →
//       三张图的几何特征依次闪亮（体积 / 接触面 / 一个点）→ in / on / at 落到各自图下。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN } from '../lib/concept.js';
import { BALL, DOOR, drawElement, drawHinged, assertBallGeometry, assertDoorGeometry } from '../props/props.js';   // T16 P2：球/门由元素库定义绘制（model/props/ball.yaml、door.yaml），不再用 ⚽/🚪 字形
import { shapes, COL, XS, readT, sayLen } from './g14_lib.js';
import * as SP from '../sprites/hdg14_1.js';
const ACTS = {};
export const KNOW = [
  'G14 底层原理',
  '介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— 告别死记硬背！先看三幅『原型图』猜一猜，图猜不出来，就单独记！',
  '先看三幅『原型图』猜一猜：装在容器里面用 in（in the box），贴在表面上用 on（on the table），指着一个点用 at（at the door）。讲时间、讲抽象事情时，这三幅图常常还能接着用——但不是原封不动：at night、in the morning、on the bus 是大家约好的习惯说法，图猜不出来，就单独记。',
  '🔬 介词三维空间几何图式 ➔ 时间漏斗隐喻映射',
  'in (三维容器内)', 'in the box / in May', 'on (平面接触面)', 'on the desk / on Monday', 'at (精确坐标靶心)', 'at the door / at 7:30',
  '【空间图式】The ball is in the box (容器内), on the desk (表面接触), at the door (精确点).',
  '空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！',
];
void ACTS;

export default function build() {
  assertBallGeometry(BALL);   // T16 P2：球元素几何构建期断言（半径三方一致、center/contact/top 锚点同点口径），不过抛错停建
  assertDoorGeometry(DOOR);   // T16 P2：门元素几何构建期断言（铰接刚体 + 闭合盖满门洞），不过抛错停建
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '三张图：球掉进盒子、球落在桌面、球停在门口靶心那一个点；三张图上都写着汉语同一个字「在」',
    guess: '汉语都说「在」，英语为什么偏要分成三个词？三张图哪里不一样？',
    reveal: '三张图的几何特征依次闪亮：盒子的立体空间被涂满（包在里面）→ 桌面那条接触线发亮（贴在面上）→ 靶心中间那个点放大（一个点），in / on / at 分别落到图下',
    rule: '包在立体容器内部用 in，贴在平面或轴线上用 on，聚焦成一个精确小圆点用 at',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  C.label('📘 G14 底层原理 · in / on / at ①空间', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— 告别死记硬背！先看三幅『原型图』猜一猜，图猜不出来，就单独记！', T, 4);
  const SY = 510;
  // 先画图、球就位（与开场字幕同时），预测后再闪几何特征
  const G0 = 1.0;
  // 时间先占位：预测在 T 之后
  const tBall = [G0 + 1.0, G0 + 2.0, G0 + 3.0];
  const glow = {};
  const P = shapes(K, { from: G0, y: SY, glow });
  // 球：从上方落进盒子 / 落到桌面 / 滚到靶心（T16 P2 元素化：球心 = BALL center 锚点，恰对位 shapes() 返回的三图锚点；门 = DOOR 闭合剖面，本地原点即 bbox 中心）
  // 出场口径与 C.pic 一致：z=2、back 缓动 0.5s 弹入、from 时刻起常驻
  const clamp01 = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const easeBack = q => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(q - 1, 3) + c1 * Math.pow(q - 1, 2); };
  const elPic = (draw, x, y, s, from) => K.prop((g, t) => {
    if (t < from) return; const pop = easeBack(clamp01((t - from) / 0.5));
    g.save(); g.translate(x, y); g.scale(s * pop, s * pop); draw(g); g.restore();
  }, { from, z: 2 });
  elPic(g => drawElement(g, BALL), XS.in + 10, SY + 10, 90 / 92, tBall[0]);
  elPic(g => drawElement(g, BALL), XS.on + 20, P.on[1] - 30, 90 / 92, tBall[1]);
  elPic(g => drawElement(g, BALL), XS.at, SY, 70 / 92, tBall[2]);
  elPic(g => drawHinged(g, DOOR, { profile: 'closed' }), XS.at + 190, SY - 30, 0.68, tBall[2] - 0.3);
  ['在', '在', '在'].forEach((z, i) => C.label(z, [XS.in, XS.on, XS.at][i], 300, { size: 70, col: INK, from: G0 + 3.6 + i * 0.25, bold: true }));
  T = Math.max(T, G0 + 4.6);
  T = narr('汉语三张图都说「在」：球在盒子里、在桌面上、在门口。', T, 3.2);
  T = C.predict(T, { q: '汉语都说「在」，英语为什么偏要分成三个词？三张图哪里不一样？', sec: 4 });
  // 揭晓：几何特征依次闪 + 词落下
  const R = T + 0.2, D = 2.4;
  glow.in = [R, R + D]; glow.on = [R + D, R + 2 * D]; glow.at = [R + 2 * D, R + 3 * D];
  const W = [['in', 'in (三维容器内)'], ['on', 'on (平面接触面)'], ['at', 'at (精确坐标靶心)']];
  W.forEach(([w, tag], i) => {
    const x = XS[w], t = R + i * D;
    C.chip({ text: w, x, y: 720, size: 80, from: t + 0.3, col: COL[w], bd: COL[w], bold: true });
    C.label(tag, x, 820, { size: 38, col: COL[w], from: t + 0.8 });
  });
  K.narr('包在立体容器里 → in；贴在一个面上 → on；聚焦成一个点 → at。', R, R + 3 * D);
  T = R + 3 * D + 0.3;
  C.rule(T);
  T = narr('先看三幅『原型图』猜一猜：装在容器里面用 in（in the box），贴在表面上用 on（on the table），指着一个点用 at（at the door）。讲时间、讲抽象事情时，这三幅图常常还能接着用——但不是原封不动：at night、in the morning、on the bus 是大家约好的习惯说法，图猜不出来，就单独记。', T, 6);
  // 预告：同一张图还能装时间
  const EX = [['in', 'in the box / in May'], ['on', 'on the desk / on Monday'], ['at', 'at the door / at 7:30']];
  EX.forEach(([w, s], i) => C.chip({ text: s, x: XS[w], y: 885, size: 34, from: T + i * 0.5, col: INK, bd: COL[w] }));
  T = narr('🔬 介词三维空间几何图式 ➔ 时间漏斗隐喻映射', T, 3.0);
  const S = '【空间图式】The ball is in the box (容器内), on the desk (表面接触), at the door (精确点).';
  const zh = '空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！';
  K.say(T, 'The ball is in the box, on the desk, at the door.', { zh: '球在盒子里、在桌面上、在门口那个点。', key: ['in', 'on', 'at'], len: Math.max(sayLen('The ball is in the box, on the desk, at the door.'), 4) });
  K.narr(S, T, T + 5.5);
  T += 6;
  T = narr(zh, T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
