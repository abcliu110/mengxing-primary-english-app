// 📦 第一性原理 · 有界无界 · 2 —— 决策 39 样板（SOP_COGNITIVE_UPGRADE 四步剧本 · 第 2 幕「建模」：a 是乱跳的框，the 是锁住的框；概念组件 lib/concept.js）
// 内容来源：旧版 auto.js 场景（src/cases/fp_boundedness.js 案例 2）的知识点全部在 KNOW（R1 = 知识点不丢）。
// 四步：①冲突 同一只狗，先说 a dog，再说 the dog → ②机制 公园里三只狗，a 的取景框在几只狗之间乱跳（随便一只），再提起时框锁住那一只（the）；
//       词源 one → an / a，that → the 字母变形 → ③迁移 同一个锁住的框：the sun、the moon、the door（只有一个，天生锁住）；an apple / an egg
//       → ④锚点 I have ___ cat. ___ cat is white. 先猜 → a cat → The cat。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { kit } from './fb39_lib.js';
import * as SP from '../sprites/fb39_2.js';
const ACTS = {};
void ACTS;
export const KNOW = [
  '同一只狗，前面说 a dog，后面说 the dog——变的是什么？',
  'I see a dog in the park.',
  'The dog is running.',
  '公园里有好几只小狗。',
  'a / an：第一次说起，还没指定是哪一只——框在几只狗之间乱跳，意思就是「一个」。',
  'There is a dog in the park.',
  '再说起它，你我都知道是哪一只了，框还会乱跳吗？',
  'the：说的人和听的人都知道是哪一个——框锁住了，意思像「那个」。',
  'The dog is very cute.',
  '真实词源：a / an 就是从 one 变来的，the 就是从 that 变来的。a = one，the = that。',
  'One dog. That dog. The moon.',
  '世界上只有一个的东西，大家都知道是哪个，框天生就锁住：the sun、the moon。',
  'The sun is hot today.',
  '房间里就这一扇门，也锁住了：Open the door, please!',
  'Open the door, please!',
  '元音开头的词前面，a 变成 an：an apple、an egg。',
  'An apple, an egg.',
  'I have ___ cat. ___ cat is white. 两个空填 a 还是 the？',
  '揭晓：第一次说起用 a；再说起，大家都知道是哪只了，用 the。',
  'I have a cat. The cat is white.',
  '口诀：第一次见用 a，大家都知道用 the。',
  '第一性原理 ③ 物理边界感统摄律：the 给东西画上一个锁住的边界框。',
];
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const io = q => (q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2);

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '公园里三只小狗；一个橙色取景框在三只狗之间乱跳，停不下来；再提起时，框「咔」地锁在一只狗身上并发光，那只狗跑起来，框跟着走',
    guess: '再说起这只狗，框还会乱跳吗？I have ___ cat. ___ cat is white. 两个空填什么？',
    reveal: '第一次说起框乱跳（a = one，随便一只），再说起框锁住（the = that，就是那只）；太阳、月亮只有一个，框天生锁住',
    rule: '第一次见用 a，大家都知道用 the',
  });
  const { narr, say } = kit(K, C, 'a 还是 the？看框锁没锁', 2);
  // 取景框：keys = [[t, mode, x, y]]；mode 'hop' = 在 hops 几个位置之间乱跳；'lock' = 锁在 (x, y) 并发光；'follow' = 跟着 fx(t)
  const frame = (from, until, keys, hops, { w = 220, h = 200, fx = null } = {}) => {
    C.motion(from, until);
    K.prop((g, t) => {
      let k = keys[0]; for (const kk of keys) if (t >= kk[0]) k = kk;
      let x, y, glow = 0;
      if (k[1] === 'hop') { const i = Math.floor((t - k[0]) * 1.6), a = hops[i % hops.length], b = hops[(i + 1) % hops.length], q = io(clamp(((t - k[0]) * 1.6) % 1 / 0.5)); x = a[0] + (b[0] - a[0]) * q; y = a[1] + (b[1] - a[1]) * q; }
      else if (k[1] === 'follow' && fx) { [x, y] = fx(t); glow = 1; }
      else { x = k[2]; y = k[3]; glow = clamp((t - k[0]) / 0.4); }
      g.save(); g.strokeStyle = glow ? GREEN : OR; g.lineWidth = 8; g.shadowColor = GREEN; g.shadowBlur = 24 * glow * (0.7 + 0.3 * Math.sin(t * 6));
      const L = 46, X0 = x - w / 2, X1 = x + w / 2, Y0 = y - h / 2, Y1 = y + h / 2;
      for (const [cx, cy, sx, sy] of [[X0, Y0, 1, 1], [X1, Y0, -1, 1], [X0, Y1, 1, -1], [X1, Y1, -1, -1]]) { g.beginPath(); g.moveTo(cx + sx * L, cy); g.lineTo(cx, cy); g.lineTo(cx, cy + sy * L); g.stroke(); }
      if (glow > 0) { g.font = '56px sans-serif'; g.textAlign = 'center'; g.fillText('🔒', X1 - 6, Y0 - 8); }
      g.restore();
    }, { from, until, z: 6 });
  };
  const dog = (x, y, from, until, run = null) => K.prop((g, t) => {
    let px = x; if (run && t >= run[0]) px = x + (run[1] - x) * io(clamp((t - run[0]) / run[2]));
    g.save(); g.font = '150px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.translate(px, y + (run && t >= run[0] && t < run[0] + run[2] ? Math.abs(Math.sin(t * 9)) * -16 : 0)); g.scale(-1, 1); g.fillText('🐕', 0, 0); g.restore();
  }, { from, until, z: 3 });
  let T = 0.5;

  // @step1_hook —— 冲突：同一只狗，一会儿 a，一会儿 the
  C.step(1, T);
  C.contrastSplitScreen({ left: { label: '先说', beats: [[T + 0.3, '🐕']] }, right: { label: '再说', beats: [[T + 2.4, '🐕💨']] }, from: T, until: T + 9.6, diff: [T + 4.4], y: 190, h: 460, psize: 170 });
  C.chip({ text: 'a dog', x: 520, y: 720, size: 64, col: OR, bd: OR, from: T + 1.0, until: T + 9.6, path: [[T + 1.0, 520, 600, 1.4, 'out']] });
  C.chip({ text: 'the dog', x: 1400, y: 720, size: 64, col: GREEN, bd: GREEN, from: T + 3.0, until: T + 9.6, path: [[T + 3.0, 1400, 600, 1.4, 'out']] });
  T = narr(KNOW[0], T + 0.3, 4.4);
  T = say(T, 'I see a dog in the park.', '我在公园里看见一只狗。', ['a']);
  T = say(T - 0.2, 'The dog is running.', '那只狗在跑。', ['The']);

  // @step2_mechanism —— 机制：a = 乱跳的框；the = 锁住的框；词源 one → a、that → the
  T = C.step(2, T);
  const M0 = T, D = [[460, 470], [880, 420], [1520, 480]];
  C.pic({ emoji: '🌳', x: 180, y: 420, size: 200, from: M0, until: M0 + 26 });
  C.pic({ emoji: '🌳', x: 1760, y: 420, size: 200, from: M0, until: M0 + 26 });
  dog(D[0][0], D[0][1], M0 + 0.2, M0 + 26); dog(D[2][0], D[2][1], M0 + 0.6, M0 + 26);
  T = narr(KNOW[3], M0 + 0.2, 2.6);
  const H0 = T;
  T = narr(KNOW[4], H0, 4.4);
  C.chip({ text: 'a = one', x: 960, y: 230, size: 60, col: OR, bd: OR, from: H0 + 1.2, until: M0 + 26, path: [[H0 + 1.2, 960, 200, 1.6, 'out']] });
  T = say(T, 'There is a dog in the park.', '公园里有一只狗。', ['a'], { y: 760 });
  T = C.predict(T, { q: KNOW[6] });
  const L0 = T;   // 锁住 + 那只狗跑起来，框跟着
  const run = [L0 + 1.6, 1200, 3.2];
  dog(D[1][0], D[1][1], M0 + 0.4, M0 + 26, run);
  frame(H0, M0 + 26, [[H0, 'hop'], [L0, 'lock', D[1][0], D[1][1]], [run[0], 'follow']], D, { fx: t => [D[1][0] + (run[1] - D[1][0]) * io(clamp((t - run[0]) / run[2])), D[1][1]] });
  C.rule(L0);
  C.chip({ text: 'the = that', x: 960, y: 300, size: 60, col: GREEN, bd: GREEN, from: L0 + 0.4, until: M0 + 26, path: [[L0 + 0.4, 1300, 200, 1.6, 'out']] });
  T = narr(KNOW[7], L0 + 0.2, 4);
  T = say(T, 'The dog is running.', '那只狗在跑。', ['The'], { y: 760 });
  T = say(T - 0.2, 'The dog is very cute.', '那只狗很可爱。', ['The'], { y: 760 });
  T = Math.max(T, M0 + 26);
  // 词源：one → an → a，that → the
  const E0 = T;
  C.morphLetters({ from: 'one', to: 'an', x: 560, y: 520, size: 120, t: E0 + 1.0, d: 2.4, appear: E0, until: E0 + 14 });
  C.morphLetters({ from: 'that', to: 'the', x: 1360, y: 520, size: 120, t: E0 + 3.6, d: 2.4, appear: E0, until: E0 + 14 });
  T = narr(KNOW[9], E0 + 0.2, 5);
  T = say(T, 'One dog. That dog. The moon.', '一只狗。那只狗。月亮。', ['One', 'That', 'The'], { y: 760 });
  T = narr(KNOW[21], T - 0.2, 3.4);
  T = Math.max(T, E0 + 14);

  // @step3_transfer —— 迁移：同一个锁住的框，换三样只有一个的东西
  T = C.step(3, T);
  const X0 = T;
  C.pic({ emoji: '🌞', x: 600, y: 470, size: 190, from: X0, until: X0 + 11 });
  C.pic({ emoji: '🌙', x: 1320, y: 470, size: 190, from: X0 + 1.6, until: X0 + 11 });
  frame(X0, X0 + 11, [[X0, 'lock', 600, 470]], [], {});
  frame(X0 + 1.6, X0 + 11, [[X0 + 1.6, 'lock', 1320, 470]], [], {});
  T = narr(KNOW[11], X0 + 0.2, 4);
  T = say(T, 'The sun is hot today.', '今天太阳很热。', ['sun'], { y: 760 });
  const X1 = Math.max(T, X0 + 11);
  C.pic({ emoji: '🚪', x: 960, y: 450, size: 220, from: X1, until: X1 + 7.8 });
  frame(X1 + 0.6, X1 + 7.8, [[X1 + 0.6, 'hop'], [X1 + 1.6, 'lock', 960, 450]], [[700, 450], [1220, 450]], { w: 240, h: 260 });
  T = narr(KNOW[13], X1 + 0.2, 3.4);
  T = say(T, 'Open the door, please!', '请开门！', ['the'], { y: 760 });
  const X2 = Math.max(T, X1 + 7.8);
  const ap = C.chip({ text: 'a apple', x: 760, y: 480, size: 64, col: RED, bd: RED, from: X2, until: X2 + 7.6 });
  const eg = C.chip({ text: 'a egg', x: 1160, y: 480, size: 64, col: RED, bd: RED, from: X2 + 0.4, until: X2 + 7.6 });
  C.swap(ap, X2 + 1.4, 'an apple', GREEN, '#fff', GREEN); C.swap(eg, X2 + 1.9, 'an egg', GREEN, '#fff', GREEN);
  C.move(ap, X2 + 1.4, 760, 420, 2.4); C.move(eg, X2 + 1.9, 1160, 420, 2.4);
  T = narr(KNOW[15], X2 + 0.2, 3);
  T = say(T, 'An apple, an egg.', '一个苹果，一个鸡蛋。', ['An', 'an'], { y: 760 });
  T = Math.max(T, X2 + 7.6);

  // @step4_punchline —— 锚点：I have ___ cat. ___ cat is white.
  T = C.step(4, T);
  const P0 = T;
  C.pic({ emoji: '🐈', x: 960, y: 330, size: 170, from: P0, until: P0 + 13 });
  const b1 = C.chip({ text: 'I have ___ cat.', x: 960, y: 560, size: 64, from: P0 + 0.3, until: P0 + 13 });
  const b2 = C.chip({ text: '___ cat is white.', x: 960, y: 700, size: 64, from: P0 + 0.6, until: P0 + 13 });
  T = C.predict(P0 + 0.8, { q: KNOW[17] });
  C.swap(b1, T + 0.2, 'I have a cat.', OR, '#fff', OR); C.swap(b2, T + 1.2, 'The cat is white.', GREEN, '#fff', GREEN);
  frame(T + 1.2, P0 + 13, [[T + 1.2, 'hop'], [T + 1.8, 'lock', 960, 330]], [[800, 330], [1120, 330]], {});
  T = narr(KNOW[18], T + 0.3, 3.6);
  T = say(T, 'I have a cat. The cat is white.', '我有一只猫。这只猫是白色的。', ['a', 'The'], { y: 860 });
  T = narr(KNOW[20], T - 0.2, 3);
  K.end(Math.max(T + 0.2, P0 + 10));
  return C.finish();
}
