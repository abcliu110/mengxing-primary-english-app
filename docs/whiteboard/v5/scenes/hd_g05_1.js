// 📘 G05 底层原理 · a / an —— 决策 38 ⑥ 啊哈重做 · 第 1 幕（决策 36-② 长幕拆分：撞车 → an 是老祖宗；第 2 幕 hd_g05_2 分筐 + hour / useful）（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/06_hd_g05.md）
// 内容来源：GRAMMAR_DB G05（道 2 B2 已改史实：an 是原形，古英语 ān「一」；见 lab/audit35/GRAMMAR_FIX.md）+ 旧版 src/cases/hd_g05.js 案例 1（清单 lab/INVENTORY_HD_G05_1_V5.md）。
// 旧板文字是改前的「a 在元音前垫一个 n 变成 an」，本幕按改后的 GRAMMAR_DB 讲。角色：不用人物；sprites/hdg05_1.js 为空包。
// 画面：a book 读起来顺；a apple 两个元音一撞 💥 → 先猜怎么办 → n 落进来、a 变 an、顺了 → 原来 an 才是老祖宗（ān → an / a，one 同源）→
//       词卡按「第一个音」分进 a / an 两筐 → 再猜 hour / useful → h 不发音、u 读 /j/ → 规则。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/hdg05_1.js';
const ACTS = {};
export const KNOW = [
  'G05 底层原理',
  '不定冠词 a 与 an 的听音法则 —— 选 a 还是选 an？用耳朵听“元音音素”，别被首字母骗了！',
  '【a 和 an，谁是原形？】an 才是老祖宗：它来自古英语 ān「一」（今天的 one 也是它变来的）。后来在辅音前面，n 慢慢读丢了，就成了 a；在元音前面 n 留了下来（an apple /ən ˈæpl/），两个元音不撞在一起，读起来顺。所以今天选 a 还是 an，只看后面单词“发音的第一个音是不是元音音素”！',
  '① 基本原则：辅音音素开头用 a，元音音素开头用 an',
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: 'a book 两块一碰，声音顺顺地连起来；换成 a apple，两个元音 /ə/ /æ/ 一撞——💥 卡住',
    guess: '两个元音撞车了，怎么办？',
    reveal: '一个 n 落进中间，a 变成 an，an apple 顺了；原来 an 才是老祖宗（古英语 ān「一」），在辅音前 n 读丢才成了 a',
    rule: '辅音音素开头用 a，元音音素开头用 an（第 2 幕：听第一个音，别看首字母）',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  const shake = (chip, t0, t1, x, y) => { for (let t = t0, k = 0; t < t1; t += 0.08, k++) chip.keys.push([t, [x + (k % 2 ? 10 : -10), y], 0.07, 'lin']); chip.keys.push([t1, [x, y], 0.1, 'lin']); };
  C.label('📘 G05 底层原理 · a / an', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('不定冠词 a 与 an 的听音法则 —— 选 a 还是选 an？用耳朵听“元音音素”，别被首字母骗了！', T, 4);

  // ---- a book：顺 ----
  const Y = 330;
  const a1 = C.chip({ text: 'a', x: 700, y: Y, size: 80, from: 1.0, path: [[2.0, 870, Y, 0.6]] });
  const b1 = C.chip({ text: 'book', x: 1200, y: Y, size: 80, from: 1.2, path: [[2.0, 1020, Y, 0.6]] });
  C.label('/ə/', 870, Y + 100, { size: 40, col: BLUE, from: 1.6 }); C.label('/b/', 1000, Y + 100, { size: 40, col: INK, from: 1.8 });
  C.label('〰 顺', 960, Y - 80, { size: 44, col: GREEN, from: 2.7, bold: true });
  T = say(Math.max(T, 2.8), 'a book', '一本书', ['a']);
  void a1; void b1;
  // ---- a apple：撞 ----
  const Y2 = 600, tA = T;
  const a2 = C.chip({ text: 'a', x: 700, y: Y2, size: 80, from: tA, path: [[tA + 0.6, 880, Y2, 0.6]] });
  const ap = C.chip({ text: 'apple', x: 1240, y: Y2, size: 80, from: tA + 0.2, path: [[tA + 0.6, 1040, Y2, 0.6]] });
  shake(a2, tA + 1.25, tA + 2.2, 880, Y2); shake(ap, tA + 1.25, tA + 2.2, 1040, Y2);
  T = narr('a apple：两个元音 /ə/ /æ/ 撞在一起，嘴巴卡壳了。', tA + 1.2, 3.2);
  T = C.predict(T, { q: '两个元音撞车了——怎么办？', sec: 4 });
  // 揭晓：n 落进来
  const R = T + 0.2;
  C.pic({ emoji: '💥', x: 955, y: Y2 - 90, size: 90, from: tA + 1.25, until: R + 0.3 });
  C.label('/ə/', 880, Y2 + 100, { size: 40, col: RED, from: tA + 0.8, out: R }); C.label('/æ/', 1000, Y2 + 100, { size: 40, col: RED, from: tA + 0.9, out: R });
  C.label('/ən/', 860, Y2 + 100, { size: 40, col: GREEN, from: R + 1.4 }); C.label('/æ/', 1080, Y2 + 100, { size: 40, col: GREEN, from: R + 1.4 });
  C.move(a2, R, 820, Y2, 0.4); C.move(ap, R, 1110, Y2, 0.4);
  const n = C.chip({ text: 'n', x: 905, y: Y2 - 260, size: 80, from: R, col: OR, bd: OR, bold: true, out: R + 1.5 });
  C.drop(n, R + 0.4, 905, Y2);
  C.swap(a2, R + 1.3, 'an', OR, '#fff', OR); C.move(a2, R + 1.3, 880, Y2, 0.3);
  C.label('〰 顺', 960, Y2 - 80, { size: 44, col: GREEN, from: R + 1.6, bold: true });
  T = say(R + 1.6, 'an apple', '一个苹果', ['an']);
  // 史实：an 才是老祖宗
  const hY = 840, tH = T;
  C.chip({ text: 'ān（古英语「一」）', x: 400, y: hY, size: 40, from: tH, col: INK, bd: GREY });
  C.arrow(560, hY - 20, 760, hY - 60, { from: tH + 0.6 }); C.arrow(560, hY + 20, 760, hY + 50, { from: tH + 0.9 });
  C.chip({ text: 'one', x: 840, y: hY - 70, size: 40, from: tH + 0.8 });
  C.chip({ text: 'an → a（辅音前 n 读丢）', x: 1020, y: hY + 50, size: 36, from: tH + 1.1, bd: OR });
  T = narr('【a 和 an，谁是原形？】an 才是老祖宗：它来自古英语 ān「一」（今天的 one 也是它变来的）。后来在辅音前面，n 慢慢读丢了，就成了 a；在元音前面 n 留了下来（an apple /ən ˈæpl/），两个元音不撞在一起，读起来顺。所以今天选 a 还是 an，只看后面单词“发音的第一个音是不是元音音素”！', tH, 8);
  C.rule(T);
  T = narr('① 基本原则：辅音音素开头用 a，元音音素开头用 an', T, 3.6) + 1.0;
  K.end(T);
  return C.finish();
}
