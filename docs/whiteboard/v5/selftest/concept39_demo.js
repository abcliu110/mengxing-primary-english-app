// 决策 39 概念组件自测幕（不挂进 App，只给 insightcheck / 联络表验组件）：五个组件各演一段，四步标记齐。
import { scene } from '../wb5.js';
import { concept } from '../lib/concept.js';

export default function build() {
  const K = scene(), C = concept(K);
  C.aha({ see: '五个组件依次出现', guess: '哪个组件在讲什么？', reveal: '逐个演示', rule: '组件自测' });
  // @step1_hook
  C.step(1, 0);
  C.contrastSplitScreen({ left: { label: 'stop smoking', beats: [[0.3, '🚬'], [2.0, '🚭']] }, right: { label: 'stop to smoke', beats: [[0.3, '🚶'], [2.0, '🚬']] }, from: 0.2, until: 4, diff: [2.0, 2.9] });
  // @step2_mechanism
  C.step(2, 4);
  C.schemaContainer({ x: 600, y: 520, content: '☕', from: 4, until: 12, states: [[4, 'unbounded'], [6, 'bounded'], [8, 'exit']], count: 2, label: 'a cup' });  // 4–12：流体 → 装杯 → 顶破
  C.syntaxSlotMachine({ x: 1100, y: 300, subj: 'I', verb: 'stop', second: 'smoke', fix: '-ing', tIn: 8, tFix: 10.5, from: 7.5, until: 13 });
  // @step3_transfer
  C.schemaContainer({ x: 960, y: 520, content: '🔋', from: 12.2, until: 16, states: [[12.2, 'bounded'], [13, 'deplete']] });
  C.step(3, 16);
  C.timelineCamera({ from: 16, until: 22.5, shots: [[16, 'wide'], [16.8, 'in', 0.4], [20.5, 'out', 0.4]], events: [{ p: 0.4, label: 'yesterday' }, { p: 0.9, label: 'now' }] });
  // @step4_punchline
  C.step(4, 22.5);
  C.morphLetters({ from: 'pater', to: 'father', x: 960, y: 420, t: 22.7, d: 1.6, appear: 22.5, until: 28 });
  const T = C.predict(23.8, { q: '先猜：哪几个字母没变？' });
  C.rule(T);
  K.end(T + 0.5);
  return C.finish();
}
