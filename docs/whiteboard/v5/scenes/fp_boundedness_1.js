// 📦 第一性原理 · 有界无界 · 1 —— 决策 39 样板（SOP_COGNITIVE_UPGRADE 四步剧本 · 第 1 幕「破题」：可数不可数看边界框；概念组件 lib/concept.js）
// 内容来源：旧版 auto.js 场景（src/cases/fp_boundedness.js 案例 1）的知识点全部在 KNOW（R1 = 知识点不丢）。
// 四步：①冲突 书上说 coffee 不加 -s，咖啡馆里却说 Two coffees → ②机制 咖啡倒出来是一片没边的流体，装进杯子才有边、能数；苹果 / 面包一刀切测试
//       → ③迁移 同一个边界框：a glass of milk、two pieces of paper（-s 加在容器上）、homework → ④锚点 rice 能不能加 -s？先猜 → two bowls of rice。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { kit } from './fb39_lib.js';
import * as SP from '../sprites/fb39_1.js';
const ACTS = {};
void ACTS;
export const KNOW = [
  '书上说 coffee 不加 -s，咖啡馆里却说 Two coffees！谁错了？',
  '咖啡倒出来是一大片，没有边，数不出一、二、三。',
  '装进杯子就有了边。有边就能数：两杯咖啡。',
  'Two coffees, please.',
  '苹果切一刀，就不是「一个苹果」了：有边 → 可数，an apple、two apples。',
  '面包切一刀，两块还是面包；水倒一半还是水：没边 → 不可数，不说 a bread。',
  'I have an apple. You have two apples.',
  'I like bread and water.',
  '想数没边的东西？套个容器：一杯、一张、一块。',
  'A glass of milk, please.',
  '两张纸：-s 加在容器 piece 上，paper 不加。',
  'Two pieces of paper. A piece of bread.',
  'homework 是一大类事，没边，也不加 -s；一份份试卷 papers 有边，能加。',
  'I have a lot of homework.',
  '一碗米饭切一刀还是米饭——rice 能加 -s 吗？',
  '揭晓：切开还是米饭 → 不可数，用碗来数：two bowls of rice，-s 加在 bowl 上。',
  'I want two bowls of rice.',
  '口诀：一刀下去还是它，不可数来不加 s。',
  '第一性原理 ③ 物理边界感统摄律：可不可数，看脑子里有没有边界框。',
];

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左边语法书写着 coffee 不加 -s，右边咖啡馆里大人比两根手指说 Two coffees；咖啡从壶里倒出一大片，然后掉下两个发光的杯子',
    guess: '书上说 coffee 不能数——咖啡装进杯子以后，能数吗？rice 能不能加 -s？',
    reveal: '流体没有边，杯子一装就有了发光的边框，边框上自动弹出 1、2；苹果一刀切就不是一个苹果，面包切开还是面包',
    rule: '可不可数，不看东西本身，看有没有边界框；没边的要数，就套个容器，-s 加在容器上',
  });
  const { narr, say, knife } = kit(K, C, '可数还是不可数？看边界框', 1);
  let T = 0.5;

  // @step1_hook —— 冲突：书上说不能数，咖啡馆却在数
  C.step(1, T);
  C.contrastSplitScreen({ left: { label: '📖 语法书', beats: [[T + 0.3, '📖']] }, right: { label: '☕ 咖啡馆', beats: [[T + 0.3, '🧑'], [T + 2.6, '✌️']] }, from: T, until: T + 10, diff: [T + 4.6, T + 6.6], y: 190, h: 520, psize: 170 });
  C.chip({ text: 'coffee ✗ -s', x: 520, y: 640, size: 56, col: RED, bd: RED, from: T + 0.8, until: T + 10, path: [[T + 0.8, 520, 600, 1.6, 'out']] });
  C.chip({ text: 'Two coffees, please!', x: 1400, y: 640, size: 52, col: BLUE, bd: BLUE, from: T + 2.6, until: T + 10, path: [[T + 2.6, 1400, 600, 1.6, 'out']], hi: [[T + 4.6, T + 6.6]] });
  C.pic({ emoji: '❓', x: 960, y: 860, size: 150, from: T + 5.6, until: T + 10, morph: [[T + 7.6, '🤔']] });
  T = narr(KNOW[0], T + 0.3, 5);
  T = say(T, 'Two coffees, please.', '请来两杯咖啡。', ['coffees']);

  // @step2_mechanism —— 机制：没边的流体 → 装进杯子有了边 → 能数；一刀切测试
  T = C.step(2, Math.max(T, 10.5));
  const M0 = T;
  C.pic({ emoji: '🫖', x: 360, y: 330, size: 170, from: M0, until: M0 + 7.6 });
  C.motion(M0 + 0.3, M0 + 7.6);   // 壶嘴一直往下倒：一条流动的咖啡线
  K.prop((g, t) => { g.save(); g.strokeStyle = 'rgba(146,64,14,.55)'; g.lineWidth = 14; g.lineCap = 'round'; g.setLineDash([26, 18]); g.lineDashOffset = -t * 120; g.beginPath(); g.moveTo(450, 330); g.quadraticCurveTo(560, 360, 600, 640); g.stroke(); g.restore(); }, { from: M0 + 0.3, until: M0 + 7.6, z: 1 });
  C.schemaContainer({ x: 760, y: 560, w: 520, h: 300, content: '', from: M0 + 0.3, until: M0 + 7.6, states: [[M0 + 0.3, 'unbounded']] });
  C.label('coffee', 760, 780, { size: 56, col: '#92400e', from: M0 + 0.8, until: M0 + 7.6, bold: true });
  T = narr(KNOW[1], M0 + 0.3, 4);
  T = C.predict(T, { q: '给咖啡套上杯子，它能数了吗？' });
  C.rule(T);
  C.schemaContainer({ x: 620, y: 540, w: 300, h: 280, content: '☕', from: T, until: M0 + 17, states: [[T, 'enter'], [T + 1.2, 'bounded']], count: 1 });
  C.schemaContainer({ x: 1060, y: 540, w: 300, h: 280, content: '☕', from: T + 0.6, until: M0 + 17, states: [[T + 0.6, 'enter'], [T + 1.8, 'bounded']], count: 2 });
  C.chip({ text: 'two coffees', x: 1500, y: 800, size: 60, col: GREEN, bd: GREEN, from: T + 2.4, until: M0 + 17, path: [[T + 2.4, 840, 780, 2.6, 'out']] });
  C.morphLetters({ from: 'coffee', to: 'coffees', x: 960, y: 900, size: 80, t: T + 4.4, d: 2.4, appear: T + 4.0, until: M0 + 17 });   // 有了边，-s 才长出来
  T = narr(KNOW[2], T + 0.2, 3.8);
  T = narr(KNOW[18], T, 3.6);
  T = Math.max(T, M0 + 12.4);
  // 一刀切测试：苹果 vs 面包（同屏同步切）
  const S0 = T, SE = S0 + 20.2;   // 苹果 / 面包这块板留到两句朗读念完
  C.contrastSplitScreen({ left: { label: 'apple', beats: [[S0 + 0.2, '🍎'], [S0 + 2.0, '🍎🔪'], [S0 + 3.2, '❌🍎'], [S0 + 6.6, '🍎🍎']] }, right: { label: 'bread', beats: [[S0 + 0.2, '🍞'], [S0 + 2.0, '🍞🔪'], [S0 + 3.2, '🍞🍞'], [S0 + 6.6, '🍞💧']] }, from: S0, until: SE, diff: [S0 + 3.2], y: 190, h: 480, psize: 150 });
  knife(520, 260, 620, S0 + 1.4, S0 + 13.6); knife(1400, 260, 620, S0 + 1.4, S0 + 13.6);
  C.chip({ text: 'an apple → 有边：可数', x: 520, y: 900, size: 44, col: GREEN, bd: GREEN, from: S0 + 3.6, until: SE, path: [[S0 + 3.6, 520, 740, 3.2, 'out']] });
  C.chip({ text: 'bread → 没边：不可数', x: 1400, y: 900, size: 44, col: OR, bd: OR, from: S0 + 6.4, until: SE, path: [[S0 + 6.4, 1400, 740, 3.4, 'out']] });
  T = narr(KNOW[4], S0 + 0.2, 3.6);
  T = narr(KNOW[5], T, 3.6);
  T = say(T, 'I have an apple. You have two apples.', '我有一个苹果，你有两个苹果。', ['apples']);
  T = say(T - 0.3, 'I like bread and water.', '我喜欢面包和水。', ['bread']);
  T = Math.max(T, SE);

  // @step3_transfer —— 迁移：同一个边界框，换三样东西
  T = C.step(3, T);
  const BX = 960, BY = 520;
  const box = (t0, t1, content, label, count, fluid) => C.schemaContainer({ x: BX, y: BY, w: 380, h: 300, content, from: t0, until: t1, states: [[t0, 'unbounded'], [t0 + 2.6, 'enter'], [t0 + 3.6, 'bounded']], label, count, fluid });
  const X0 = T;
  box(X0, X0 + 5.2, '🥛', 'a glass of milk', 1, 'rgba(229,231,235,.9)');
  T = narr(KNOW[8], X0 + 0.2, 2.6);
  T = say(T, 'A glass of milk, please.', '请来一杯牛奶。', ['glass']);
  const X1 = Math.max(T, X0 + 5.2);
  box(X1, X1 + 6, '📄', 'two pieces of paper', 2, 'rgba(219,234,254,.9)');
  C.chip({ text: '-s', x: 1480, y: 300, size: 60, col: OR, bd: OR, from: X1 + 1.6, until: X1 + 6, path: [[X1 + 2.0, 990, 660, 2.4, 'io']] });
  T = narr(KNOW[10], X1 + 0.2, 3);
  T = say(T, 'Two pieces of paper. A piece of bread.', '两张纸。一块面包。', ['pieces', 'piece']);
  const X2 = Math.max(T, X1 + 6);
  box(X2, X2 + 6, '📚', 'homework', null, 'rgba(254,243,199,.9)');
  C.chip({ text: 'papers ✓', x: 1500, y: 860, size: 48, col: GREEN, bd: GREEN, from: X2 + 2.4, until: X2 + 6, path: [[X2 + 2.4, 1500, 700, 2.4, 'out']] });
  T = narr(KNOW[12], X2 + 0.2, 4);
  T = say(T, 'I have a lot of homework.', '我有很多作业。', ['homework']);
  T = Math.max(T, X2 + 6);

  // @step4_punchline —— 锚点：rice 能不能加 -s？
  T = C.step(4, T);
  const P0 = T;
  C.schemaContainer({ x: 960, y: 520, w: 420, h: 300, content: '🍚', from: P0, until: P0 + 11, states: [[P0, 'unbounded'], [P0 + 4.0, 'enter'], [P0 + 5.2, 'bounded'], [P0 + 7.4, 'expand']], count: 2, fluid: 'rgba(229,231,235,.9)' });
  const rc = C.chip({ text: 'rices ?', x: 960, y: 790, size: 60, col: RED, bd: RED, from: P0 + 0.4, until: P0 + 11 });
  T = C.predict(P0 + 0.6, { q: KNOW[14] });
  C.swap(rc, T + 0.4, 'two bowls of rice', GREEN, '#fff', GREEN);
  T = narr(KNOW[15], T + 0.3, 3.6);
  T = say(T, 'I want two bowls of rice.', '我要两碗米饭。', ['bowls']);
  T = narr(KNOW[17], T - 0.2, 3);
  K.end(Math.max(T + 0.2, P0 + 9));
  return C.finish();
}
