// 📦 第一性原理 · 有界无界 · 4 —— 决策 39 样板（SOP_COGNITIVE_UPGRADE 四步剧本 · 第 4 幕「炼金」：同一个词，两种边界；概念组件 lib/concept.js）
// 内容来源：旧版 auto.js 场景（src/cases/fp_boundedness.js 案例 4）的知识点全部在 KNOW（R1 = 知识点不丢）。
// 四步：①冲突 Two chickens are running 和 I like chicken：同一个词，一会儿加 -s 一会儿不加 → ②机制 小鸡外面一圈完整的边（可数，three chickens），
//       做成鸡肉后边化开（不可数），chickens 的 s 掉下来 → ③迁移 同一个双屏边界框：a glass / made of glass、a room / make room、two fish / some fish
//       → ④锚点 一整个蛋糕切开，切下来那块说 a cake 还是 some cake？先猜 → some cake。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { kit } from './fb39_lib.js';
import * as SP from '../sprites/fb39_4.js';
const ACTS = {};
void ACTS;
export const KNOW = [
  '同一个 chicken，一会儿加 -s，一会儿不加——为什么？',
  'Look! Two chickens are running.',
  'I like chicken for dinner.',
  '一只活蹦乱跳的小鸡，有完整的身体边界——可数：a chicken、three chickens。',
  'A chicken, three chickens.',
  '做成盘子里的鸡肉，那圈完整的边还在吗？',
  '做成鸡肉，完整的边界没了——不可数：some chicken。',
  '同一个词：有完整外壳边界 → 可数；变成肉、材料、空间 → 不可数。',
  'a glass 是一个玻璃杯；made of glass 是玻璃这种材料。',
  'A glass. The window is made of glass.',
  'a room 是一个房间；make room for you 是腾出地方（空间）。',
  'A room. I can make room for you.',
  'two fish 是两条鱼；some fish 是一些鱼肉。',
  'I can see two fish in the river. Some fish, please.',
  '看它在句子里有没有完整边界，一秒判断。',
  '一整个蛋糕切开，分给你一块——切下来那块，说 a cake 还是 some cake？',
  '揭晓：整个蛋糕有完整边界：a cake；切开后没了整体边界，就当材料说：some cake，像 some chicken。',
  'We have a cake. Can I have some cake?',
  '口诀：整只能数，切成肉就不数。',
  '第一性原理 ③ 物理边界感统摄律。',
];

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左边小鸡在跑，身上一圈完整的发光边框，框上弹出 3；右边盘子里的鸡肉，那圈边化成一片；chickens 末尾的 s 掉了下来',
    guess: '做成鸡肉以后，那圈完整的边还在吗？切下来的一块蛋糕说 a cake 还是 some cake？',
    reveal: '整只有完整边 → 可数（three chickens）；切成肉、做成材料、变成空间，边化开 → 不可数（some chicken / made of glass / make room）',
    rule: '同一个词：有完整外壳边界 → 可数；变成肉、材料、空间 → 不可数（整只能数，切成肉就不数）',
  });
  const { narr, say } = kit(K, C, '一个词，两种边界', 4);
  let T = 0.5;

  // @step1_hook —— 冲突：同一个词，一会儿 -s 一会儿不加
  C.step(1, T);
  C.contrastSplitScreen({ left: { label: '在跑', beats: [[T + 0.3, '🐔'], [T + 2.4, '🐔🐔']] }, right: { label: '在盘子里', beats: [[T + 0.3, '🍽️'], [T + 2.4, '🍗']] }, from: T, until: T + 10.6, diff: [T + 4.4], y: 190, h: 460, psize: 160 });
  C.chip({ text: 'chickens', x: 520, y: 760, size: 64, col: GREEN, bd: GREEN, from: T + 1.2, until: T + 10.6, path: [[T + 1.2, 520, 610, 1.6, 'out']] });
  C.chip({ text: 'chicken', x: 1400, y: 760, size: 64, col: OR, bd: OR, from: T + 2.0, until: T + 10.6, path: [[T + 2.0, 1400, 610, 1.6, 'out']] });
  T = narr(KNOW[0], T + 0.3, 4);
  T = say(T, 'Look! Two chickens are running.', '看！两只小鸡在跑。', ['chickens']);
  T = say(T - 0.2, 'I like chicken for dinner.', '我晚饭喜欢吃鸡肉。', ['chicken']);

  // @step2_mechanism —— 机制：整只有完整的边；做成肉，边化开
  T = C.step(2, T);
  const M0 = T;
  T = narr(KNOW[3], M0 + 0.2, 4.6);
  T = say(T, 'A chicken, three chickens.', '一只鸡，三只鸡。', ['chickens'], { y: 860 });
  T = C.predict(T, { q: KNOW[5] });
  C.rule(T);
  const R0 = T;
  T = narr(KNOW[6], R0 + 0.2, 4);
  T = say(T, 'I like chicken for dinner.', '我晚饭喜欢吃鸡肉。', ['chicken'], { y: 860 });
  T = narr(KNOW[7], T - 0.2, 5);
  T = narr(KNOW[14] + KNOW[19], T, 3.4);
  const CE = T;   // 鱼也一样：整条能数，做成鱼肉不数
  T = narr(KNOW[12], CE + 0.1, 3);
  T = say(T - 0.4, 'I can see two fish in the river. Some fish, please.', '我能看见河里有两条鱼。请来一些鱼肉。', ['fish'], { y: 860 });
  const ME = T;
  C.schemaContainer({ x: 960, y: 450, w: 440, h: 360, content: '🐟', from: CE, until: CE + 3.2, states: [[CE, 'enter'], [CE + 1.2, 'bounded']], count: 2, col: GREEN, spread: 0.9 });
  C.schemaContainer({ x: 960, y: 450, w: 440, h: 360, content: '🍣', from: CE + 3.2, until: ME, states: [[CE + 3.2, 'bounded'], [CE + 4.0, 'unbounded']], col: OR, fluid: 'rgba(254,215,170,.55)', spread: 1.1 });
  C.schemaContainer({ x: 960, y: 450, w: 440, h: 360, content: '🐔', from: M0, until: R0, states: [[M0, 'enter'], [M0 + 1.2, 'bounded'], [M0 + 4.2, 'expand']], count: 3, col: GREEN, spread: 0.9 });
  C.schemaContainer({ x: 960, y: 450, w: 440, h: 360, content: '🍗', from: R0, until: CE, states: [[R0, 'bounded'], [R0 + 1.0, 'unbounded']], col: OR, fluid: 'rgba(254,215,170,.55)', spread: 1.1 });
  C.morphLetters({ from: 'chickens', to: 'chicken', x: 960, y: 720, size: 84, t: R0 + 1.4, d: 2.0, appear: M0 + 0.6, until: CE });
  T = ME;

  // @step3_transfer —— 迁移：同一个双屏边界框，换三个词
  T = C.step(3, T);
  const X0 = T;
  const pairs = [
    ['🥛', 'a glass', '🪟', 'made of glass', KNOW[8], 'A glass. The window is made of glass.', '一个玻璃杯。窗户是玻璃做的。', ['glass'], null],
    ['🚪', 'a room', '↔️', 'make room', KNOW[10], 'A room. I can make room for you.', '一个房间。我可以给你腾个地方。', ['room'], null],
  ];
  const L = [], Rr = [], st = [];
  let t = X0;
  pairs.forEach(p => {
    const t0 = t; st.push(t0); L.push([t0 + 0.2, p[0]]); Rr.push([t0 + 0.2, p[2]]);
    const n1 = narr(p[4], t0 + 0.1, 3);
    const s1 = say(n1 - 0.6, p[5], p[6], p[7], { y: 850 });
    t = Math.max(n1, s1, t0 + 6) + 0.2;
    C.schemaContainer({ x: 520, y: 410, w: 600, h: 380, content: '', from: t0, until: t, states: [[t0, 'unbounded'], [t0 + 2.2, 'bounded']], count: p[8], col: GREEN, spread: 0.55, fluid: 'rgba(209,250,229,.7)' });
    C.schemaContainer({ x: 1400, y: 410, w: 600, h: 380, content: '', from: t0, until: t, states: [[t0, 'bounded'], [t0 + 2.2, 'unbounded']], col: OR, spread: 0.55, fluid: 'rgba(254,215,170,.5)' });
    C.chip({ text: p[1], x: 520, y: 760, size: 56, col: GREEN, bd: GREEN, from: t0 + 0.6, until: t, path: [[t0 + 0.6, 520, 690, 2.4, 'out']] });
    C.chip({ text: p[3], x: 1400, y: 760, size: 56, col: OR, bd: OR, from: t0 + 1.4, until: t, path: [[t0 + 1.4, 1400, 690, 2.4, 'out']] });
  });
  C.contrastSplitScreen({ left: { label: '有完整外壳（可数）', beats: L }, right: { label: '变成材料 / 空间（不可数）', beats: Rr }, from: X0, until: t, diff: st.map(x => x + 2.2), y: 190, h: 440, psize: 150 });
  T = t;

  // @step4_punchline —— 锚点：a cake 还是 some cake？
  T = C.step(4, T);
  const P0 = T;
  C.schemaContainer({ x: 960, y: 430, w: 420, h: 340, content: '🎂', from: P0, until: P0 + 5.6, states: [[P0, 'enter'], [P0 + 1.2, 'bounded']], col: GREEN, label: 'a cake' });
  const q = C.chip({ text: '___ cake ?', x: 960, y: 720, size: 64, col: RED, bd: RED, from: P0 + 1.4, until: P0 + 14 });
  T = C.predict(P0 + 1.6, { q: KNOW[15], sec: 4 });
  C.schemaContainer({ x: 960, y: 430, w: 420, h: 340, content: '🍰', from: P0 + 5.6, until: P0 + 14, states: [[P0 + 5.6, 'bounded'], [T + 0.2, 'unbounded']], col: OR, fluid: 'rgba(254,215,170,.55)', spread: 1.0 });
  C.swap(q, T + 0.6, 'some cake', GREEN, '#fff', GREEN);
  T = narr(KNOW[16], T + 0.3, 5);
  T = say(T, 'We have a cake. Can I have some cake?', '我们有一个蛋糕。我能吃点蛋糕吗？', ['a', 'some'], { y: 860 });
  T = narr(KNOW[18], T - 0.2, 2.8);
  K.end(Math.max(T + 0.2, P0 + 12));
  return C.finish();
}
