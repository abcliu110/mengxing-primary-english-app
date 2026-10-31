// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：model/boundedness.yaml；改本幕台词/结构：model/specs/boundedness_3.yaml；改编排：模板 fp_boundedness_3.js（家族共用）。
// 判据/口诀来源：cl-zero-func、ch-school。生成器 model/gen_scene.py。
// 📦 第一性原理 · 有界无界 · 3 —— 决策 39 样板（SOP_COGNITIVE_UPGRADE 四步剧本 · 第 3 幕「实物还是做事」：加 the 看实物，不加看做的事；概念组件 lib/concept.js）
// 内容来源：旧版 auto.js 场景（src/cases/fp_boundedness.js 案例 3）的知识点全部在 KNOW（R1 = 知识点不丢）。
// 四步：①冲突 妈妈去 the school，我去 school，去的是同一栋楼 → ②机制 指那栋楼时套框（the = 说实物）；说做一件事时不套框，只剩书本（不加 = 做这件事）
//       → ③迁移 同一块双屏：on the bed / in bed、on a bus / by bus、buy a football / play football、to the hospital / in hospital
//       → ④锚点 Time to go to ___ bed. 先猜 → go to bed。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { kit } from './fb39_lib.js';
import * as SP from '../sprites/fb39_3.js';
const ACTS = {};
void ACTS;
export const KNOW = [
  'go to school 和 go to the school，差一个 the，意思差多少？',
  'Mum goes to the school.',
  'I go to school by bus.',
  '妈妈去开家长会，你去上课，去的是同一栋楼——为什么一个加 the，一个不加？',
  '加 the：说的是那栋看得见的楼，是在说实物。',
  'The school is very big.',
  '零冠词：什么冠词都不加。说的不是楼，是「做这件事」：去上学（读书、上课）。',
  'Go to school. Go to the school.',
  '同样：on the bed 是在床这件家具上面；in bed 是在睡觉。',
  'The cat is on the bed. I am in bed.',
  'on a bus 是在一辆车里；by bus 是坐公交这种方式。',
  'I am on a bus. I go by bus.',
  'buy a football 是买一个球；play football 是踢足球这项运动。',
  'Buy a football. Let\'s play football after school.',
  'to the hospital 是去医院大楼（探望）；in hospital 是住院治病（美式也常加 the）。',
  'Mum goes to the hospital.',
  '晚上十点，该去睡觉了。Time to go to ___ bed. bed 前面要不要加 the？',
  '揭晓：睡觉是一件事，不是那张床：go to bed，不加 the。',
  'It\'s ten o\'clock. Time to go to bed.',
  '口诀：说楼房加 the，说上学不加',
  '一句话：加冠词是说实物；不加冠词是说做一件事。（小例外：play the piano 要加 the，单记。）',
];

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左边妈妈走进学校大楼（说的是那栋楼）；右边小朋友背书包去上课（说的是上学这件事）；同一栋楼，左边写 the school，右边只写 school',
    guess: '去的是同一栋楼，为什么一个加 the，一个不加？晚上十点 go to ___ bed 要不要加 the？',
    reveal: '说那栋楼时加 the；说做一件事（上学、睡觉、坐车、踢球）时不加；床、公交、足球、医院全一样',
    rule: '加冠词 = 说实物；不加冠词 = 说做一件事',
  });
  const { narr, say } = kit(K, C, '加不加 the？看实物还是看做事', 3);
  let T = 0.5;

  // @step1_hook —— 冲突：同一栋楼，一个 the 一个不加
  C.step(1, T);
  C.contrastSplitScreen({ left: { label: '妈妈去', beats: [[T + 0.3, '👩'], [T + 2.6, '👩🏫']] }, right: { label: '我去', beats: [[T + 0.3, '🧒'], [T + 2.6, '🧒🏫']] }, from: T, until: T + 10.4, diff: [T + 4.4], y: 190, h: 460, psize: 160 });
  C.chip({ text: 'the school', x: 520, y: 760, size: 60, col: GREEN, bd: GREEN, from: T + 1.2, until: T + 10.4, path: [[T + 1.2, 520, 610, 1.6, 'out']] });
  C.chip({ text: 'school', x: 1400, y: 760, size: 60, col: OR, bd: OR, from: T + 2.0, until: T + 10.4, path: [[T + 2.0, 1400, 610, 1.6, 'out']] });
  T = narr(KNOW[0], T + 0.3, 4.2);
  T = say(T, 'Mum goes to the school.', '妈妈去学校（那栋楼）。', ['the', 'school']);
  T = say(T - 0.2, 'I go to school by bus.', '我坐公交车去上学。', ['school']);

  // @step2_mechanism —— 机制：实物读法 vs 活动读法
  T = C.step(2, T);
  const M0 = T;
  T = narr(KNOW[3], M0 + 0.2, 5);
  T = C.predict(T, { q: '右边这个 school，说的是那栋楼，还是上学这件事？' });
  C.rule(T);
  const R0 = T;
  T = narr(KNOW[4], R0 + 0.2, 4);
  T = say(T, 'The school is very big.', '那所学校很大。', ['The'], { y: 830 });
  T = narr(KNOW[6], T - 0.2, 5);
  T = say(T, 'Go to school. Go to the school.', '去上学。去那所学校（那栋楼）。', ['the'], { y: 830 });
  T = narr(KNOW[20], T - 0.2, 5);
  const H0 = T;   // 医院同理：楼房 vs 住院
  T = narr(KNOW[14], H0, 4);
  T = say(T, 'Mum goes to the hospital.', '妈妈去那家医院。', ['the'], { y: 830 });
  const ME = T;
  // 左：指实物，框一直亮着；右：预测之后转活动读法（流体），楼变书本 = 去上课；最后一段换成医院
  C.schemaContainer({ x: 560, y: 480, w: 420, h: 360, content: '🏫', from: M0, until: H0, states: [[M0, 'unbounded'], [M0 + 0.6, 'bounded']], label: 'the school', col: GREEN, spread: 0.9 });
  C.schemaContainer({ x: 1360, y: 480, w: 420, h: 360, content: '🏫', from: M0 + 0.4, until: R0, states: [[M0 + 0.4, 'unbounded'], [M0 + 1.0, 'bounded']], label: 'school ?', col: GREY, spread: 0.9 });
  C.schemaContainer({ x: 1360, y: 480, w: 420, h: 360, content: '📚', from: R0, until: H0, states: [[R0, 'bounded'], [R0 + 0.8, 'unbounded']], label: 'school = 去上课', col: OR, fluid: 'rgba(254,215,170,.6)', spread: 0.9 });
  C.schemaContainer({ x: 560, y: 480, w: 420, h: 360, content: '🏥', from: H0, until: ME, states: [[H0, 'unbounded'], [H0 + 0.6, 'bounded']], label: 'to the hospital', col: GREEN, spread: 0.9 });
  C.schemaContainer({ x: 1360, y: 480, w: 420, h: 360, content: '🤒', from: H0 + 0.6, until: ME, states: [[H0 + 0.6, 'bounded'], [H0 + 1.4, 'unbounded']], label: 'in hospital', col: OR, fluid: 'rgba(254,215,170,.6)', spread: 0.9 });
  T = ME;

  // @step3_transfer —— 迁移：同一块双屏，左边说实物，右边说做的事
  T = C.step(3, T);
  const X0 = T;
  const pairs = [
    ['🛏️🐈', 'on the bed', '😴', 'in bed', KNOW[8], 'The cat is on the bed. I am in bed.', '猫在床上。我在睡觉。', ['the', 'in', 'bed']],
    ['🚌', 'on a bus', '🚌💨', 'by bus', KNOW[10], 'I am on a bus. I go by bus.', '我在一辆公交车上。我坐公交车去。', ['a', 'by']],
    ['⚽', 'buy a football', '⚽🏃', 'play football', KNOW[12], "Buy a football. Let's play football after school.", '买一个足球。放学后我们去踢足球吧。', ['a', 'play']],
  ];
  const L = [], Rr = [], st = [], en = [];
  let t = X0;
  pairs.forEach(p => {
    const t0 = t; st.push(t0); L.push([t0 + 0.2, p[0]]); Rr.push([t0 + 0.2, p[2]]);
    const n1 = narr(p[4], t0 + 0.1, 3);
    const s1 = say(n1 - 0.6, p[5], p[6], p[7], { y: 850 });
    t = Math.max(n1, s1, t0 + 6) + 0.2; en.push(t);
    C.schemaContainer({ x: 520, y: 410, w: 600, h: 380, content: '', from: t0, until: t, states: [[t0, 'unbounded'], [t0 + 2.2, 'bounded']], col: GREEN, spread: 0.55, fluid: 'rgba(209,250,229,.7)' });   // 同一个模型：左边套框指实物
    C.schemaContainer({ x: 1400, y: 410, w: 600, h: 380, content: '', from: t0, until: t, states: [[t0, 'bounded'], [t0 + 2.2, 'unbounded']], col: OR, spread: 0.55, fluid: 'rgba(254,215,170,.5)' });    // 右边转活动读法，只剩做的事
    C.chip({ text: p[1], x: 520, y: 760, size: 56, col: GREEN, bd: GREEN, from: t0 + 0.6, until: t, path: [[t0 + 0.6, 520, 690, 2.4, 'out']] });
    C.chip({ text: p[3], x: 1400, y: 760, size: 56, col: OR, bd: OR, from: t0 + 1.4, until: t, path: [[t0 + 1.4, 1400, 690, 2.4, 'out']] });
  });
  C.contrastSplitScreen({ left: { label: '看得见的实物', beats: L }, right: { label: '只讲做什么事', beats: Rr }, from: X0, until: t, diff: st.map(x => x + 2.2), y: 190, h: 440, psize: 150 });
  T = t;

  // @step4_punchline —— 锚点：Time to go to ___ bed.
  T = C.step(4, T);
  const P0 = T;
  C.pic({ emoji: '🕙', x: 760, y: 400, size: 180, from: P0, until: P0 + 13 });
  C.pic({ emoji: '🛏️', x: 1160, y: 400, size: 180, from: P0 + 0.3, until: P0 + 13, morph: [[P0 + 5.2, '😴']] });
  const q = C.chip({ text: 'Time to go to the bed ?', x: 960, y: 640, size: 60, col: RED, bd: RED, from: P0 + 0.5, until: P0 + 13 });
  T = C.predict(P0 + 0.8, { q: KNOW[16], sec: 3.4 });
  C.swap(q, T + 0.4, 'Time to go to bed.', GREEN, '#fff', GREEN);
  T = narr(KNOW[17], T + 0.3, 3.4);
  T = say(T, "It's ten o'clock. Time to go to bed.", '十点了，该睡觉了。', ['bed'], { y: 830 });
  T = narr(KNOW[19], T - 0.2, 2.8);
  K.end(Math.max(T + 0.2, P0 + 11));
  return C.finish();
}
