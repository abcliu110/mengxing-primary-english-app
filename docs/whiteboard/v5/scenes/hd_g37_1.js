// 📘 G37 底层原理 · as…as —— 决策 38 ⑧ 啊哈重做（概念原语 lib/concept.js + scenes/cmp_lib.js 身高尺；啊哈卡 lab/audit38/aha/08_hd_g37_39.md）
// 内容来源：GRAMMAR_DB G37 + 旧版 src/cases/hd_g37.js 案例 1（清单 lab/INVENTORY_HD_G37_1_V5.md；截断句按 GRAMMAR_DB 补全、去 ** 与反引号）。角色：不用人物图，人柱 + emoji。
// 画面：身高尺上 Tom、Jim 两根人柱一样高，头顶拉一条水平线谁也不冒尖 → 先猜「as ___ as」中间放 tall / taller / tallest → 原级；
//       再看两支温度计：今天比昨天矮一截 → not as warm as。比较三兄弟第 1 幕（G38 冒尖 -er、G39 领奖台 the -est）。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { ruler, person, cmSteps, readT, sayLen } from './cmp_lib.js';
import * as SP from '../sprites/hdg37_1.js';
const ACTS = {};
export const KNOW = [
  'G37 底层原理',
  '同级比较：as + 原级 + as（和……一样） —— 两个事物旗鼓相当：两个 as 夹心饼干中间永远放形容词或副词的“原级”！',
  '【为什么 as...as 中间只能放原级 tall？】既然两人一样高，没有谁比谁更突出，中间自然用不带任何变形的原形（原级）！',
  '🔬 G37 · 同级比较：as + 原级 + as（和……一样） 底层结构拆解与汉英思维对比',
  'Tom is 150 cm. Jim is 150 cm too. Tom is as tall as Jim.', 'He can run as fast as a horse!', 'Today is not as warm as yesterday.',
  '汤姆和吉姆一样高。他跑得和马一样快！今天不如昨天暖和。',
  '在 as tall as 中，夹在两个 as 中间的词是什么形式？',
  '永远是形容词或副词的“原级（原形）”，不加 -er 也不加 -est',
  '① 肯定同级：A + be/V + as + 原级 + as + B',
  '② 否定同级：A + be not / don\'t + as (或 so) + 原级 + as + B',
  '两者相比一般高，as...as 架小桥；两个 as 夹中间，形容词副词用原级（as tall as）；若是前者不如后，not as (或 so)...as 记心间！',
];
void ACTS;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '身高尺上 Tom 和 Jim 两根人柱都长到 150 cm，头顶拉出一条水平线——两人一样高，谁也不冒尖',
    guess: '「Tom is as ___ as Jim.」中间放 tall、taller 还是 tallest？',
    reveal: 'taller、tallest 两张卡被弹开，tall 落进两个 as 中间：没人冒尖，就用不变形的原级；再看温度计：今天比昨天矮一截 → Today is not as warm as yesterday.',
    rule: 'as + 原级 + as（一样）；not as / so + 原级 + as（不如）',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('📘 G37 底层原理 · as … as', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('同级比较：as + 原级 + as（和……一样） —— 两个事物旗鼓相当：两个 as 夹心饼干中间永远放形容词或副词的“原级”！', T, 4);
  const BASE = 860, y = ruler(K, { x: 180, base: BASE, px: 4.2, lo: 60, hi: 170, from: 0.8 });
  person(K, { x: 420, y0: y, base: BASE, emoji: '👦', name: 'Tom', cmAt: () => 150, col: BLUE, from: 1.2 });
  person(K, { x: 660, y0: y, base: BASE, emoji: '🧒', name: 'Jim', cmAt: () => 150, col: GREEN, from: 1.6 });
  const LINE = T;
  K.at(LINE).line(330, y(150), 760, y(150), { col: OR, w: 6 });
  C.label('150 cm = 150 cm', 545, y(150) - 100, { size: 40, col: OR, from: LINE + 0.4 });
  T = say(LINE + 0.4, 'Tom is 150 cm. Jim is 150 cm too.', '汤姆 150 厘米，吉姆也是 150 厘米。', ['150']);
  // 句子 + 三张候选卡
  const SX = 1320;
  C.chip({ text: 'Tom is as', x: SX - 250, y: 420, size: 54, from: T });
  C.slot({ x: SX, y: 420, w: 220, h: 90, from: T + 0.2 });
  C.chip({ text: 'as Jim.', x: SX + 230, y: 420, size: 54, from: T + 0.3 });
  const OPT = ['tall', 'taller', 'tallest'];
  const tO = T;
  T += 1.4;
  T = narr('在 as tall as 中，夹在两个 as 中间的词是什么形式？', T, 3);
  T = C.predict(T, { q: '两人一样高——中间放 tall、taller 还是 tallest？', sec: 4 });
  const R = T + 0.2;
  const oc = OPT.map((w, i) => C.chip({ text: w, x: SX - 260 + i * 260, y: 600, size: 54, from: tO + 0.5 + i * 0.2, bd: GREY, out: i ? R + 4 : null }));
  C.move(oc[1], R, SX, 760, 0.5); C.swap(oc[1], R + 0.5, 'taller', GREY, '#f3f4f6', GREY);
  C.move(oc[2], R + 0.2, SX + 260, 760, 0.5); C.swap(oc[2], R + 0.7, 'tallest', GREY, '#f3f4f6', GREY);
  C.drop(oc[0], R + 0.9, SX, 420); C.swap(oc[0], R + 1.6, 'tall', OR, '#fff', OR);
  C.label('没人冒尖 → 不变形', SX, 520, { size: 36, col: OR, from: R + 1.7 });
  T = say(R + 1.8, 'Tom is 150 cm. Jim is 150 cm too. Tom is as tall as Jim.', '汤姆和吉姆一样高。', ['as', 'tall']);
  T = narr('永远是形容词或副词的“原级（原形）”，不加 -er 也不加 -est', T, 3.4);
  C.rule(T);
  T = narr('【为什么 as...as 中间只能放原级 tall？】既然两人一样高，没有谁比谁更突出，中间自然用不带任何变形的原形（原级）！', T, 4.6);
  T = narr('🔬 G37 · 同级比较：as + 原级 + as（和……一样） 底层结构拆解与汉英思维对比', T, 3);
  // 马
  C.pic({ emoji: '🏃', x: 1100, y: 860, size: 100, from: T }); C.pic({ emoji: '🐎', x: 1500, y: 860, size: 110, from: T + 0.2 });
  K.prop((g, t) => { const q = Math.max(0, Math.min(1, (t - T) / 3)); if (q <= 0) return; g.save(); g.strokeStyle = OR; g.lineWidth = 5; g.setLineDash([12, 10]); g.beginPath(); g.moveTo(1170, 900); g.lineTo(1170 + 520 * q, 900); g.moveTo(1570, 900); g.lineTo(1570 + 200 * q, 900); g.stroke(); g.restore(); }, { from: T, until: T + 5, z: 1 });
  T = say(T + 0.4, 'He can run as fast as a horse!', '他跑得和马一样快！', ['as', 'fast']);
  // 温度计：今天 vs 昨天 → not as … as
  const TH = T + 0.2;
  const therm = (x, deg, lab, from) => K.prop((g, t) => {
    const q = Math.max(0, Math.min(1, (t - from) / 0.8)); if (q <= 0) return;
    g.save(); g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.roundRect(x - 26, 640, 52, 230, 26); g.stroke();
    g.fillStyle = RED; const h = deg * 7 * q; g.fillRect(x - 14, 860 - h, 28, h); g.beginPath(); g.arc(x, 880, 32, 0, 7); g.fill();
    g.font = '30px Kalam, WK'; g.fillStyle = INK; g.textAlign = 'center'; g.fillText(lab, x, 950 - 20); g.restore();
  }, { from, until: 1e9, z: 3 });
  // 盖掉马那一块再画温度计
  K.prop((g, t) => { const a = Math.max(0, Math.min(1, (t - TH) / 0.4)); g.save(); g.globalAlpha = a; g.fillStyle = '#FBFBFB'; g.fillRect(1000, 760, 900, 180); g.restore(); }, { from: TH, z: 2.5 });
  therm(1150, 28, 'yesterday', TH + 0.3); therm(1450, 18, 'today', TH + 0.6);
  C.label('今天矮一截', 1450, 620, { size: 34, col: RED, from: TH + 1.4 });
  T = say(TH + 1.6, 'Today is not as warm as yesterday.', '今天不如昨天暖和。', ['not', 'as', 'warm']);
  K.narr('汤姆和吉姆一样高。他跑得和马一样快！今天不如昨天暖和。', T, T + 4); T += 4.2;
  T = narr('① 肯定同级：A + be/V + as + 原级 + as + B', T, 3.2);
  T = narr('② 否定同级：A + be not / don\'t + as (或 so) + 原级 + as + B', T, 3.6);
  T = narr('两者相比一般高，as...as 架小桥；两个 as 夹中间，形容词副词用原级（as tall as）；若是前者不如后，not as (或 so)...as 记心间！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
