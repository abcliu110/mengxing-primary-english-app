// 📘 G05 底层原理 · a / an —— 决策 38 ⑥ 啊哈重做（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/06_hd_g05.md）
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
  '🔬 G05 · 不定冠词 a 与 an 的听音法则 底层结构拆解与汉英思维对比',
  'I have a book, an apple and an orange.', 'Wait for an hour! Look at an umbrella!', 'He is a university student with a useful dictionary.',
  '我有一本书、一个苹果和一个橙子。等一个小时！看一把雨伞！他是一名带着一本有用词典的大学生。',
  '为什么 hour 是辅音字母 h 开头却用 an hour，而 useful 是元音字母 u 开头却用 a useful book？',
  '因为 a/an 看的是发音（音素）：hour 开头 h 不发音读 /aʊ/（元音），useful 开头读 /j/（辅音）！',
  '① 基本原则：辅音音素开头用 a，元音音素开头用 an',
  '② 必考 an 清单：an apple, an egg, an elephant, an eraser, an orange, an old man, an umbrella, an uncle, an English book, an interesting story',
  '③ 两大特例：an hour / an honest boy（h 静音，读元音，必用 an）；a useful book / a university / a uniform（u 读辅音 /juː/，必用 a）',
  '单数可数要加冠词，a/an 小帽戴头顶；辅音音素前戴 a，元音音素前戴 an；an hour（h静音）和 a useful book（u读/juː/）最要当心！',
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: 'a book 两块一碰，声音顺顺地连起来；换成 a apple，两个元音 /ə/ /æ/ 一撞——💥 卡住',
    guess: '两个元音撞车了，怎么办？（后来再猜：hour、useful 各戴 a 还是 an？）',
    reveal: '一个 n 落进中间，a 变成 an，an apple 顺了；原来 an 才是老祖宗（古英语 ān「一」），在辅音前 n 读丢才成了 a。hour 的 h 变灰不发音、第一个音是元音 /aʊ/ → an；useful 的第一个音是 /j/ → a',
    rule: '只看后面单词发音的第一个音：辅音音素用 a，元音音素用 an',
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
  // 收起上半场：盖一层板色
  const CL = T;
  K.prop((g, t) => { const q = clamp((t - CL) / 0.5); g.save(); g.globalAlpha = q; g.fillStyle = '#FBFBFB'; g.fillRect(0, 180, 1920, 740); g.restore(); }, { from: CL, z: 5 });
  // ---- 分筐 ----
  T = narr('🔬 G05 · 不定冠词 a 与 an 的听音法则 底层结构拆解与汉英思维对比', CL + 0.3, 3);
  const AX = 520, NX = 1400, BY = 300;
  C.chip({ text: 'a', x: AX, y: BY, size: 80, from: CL + 0.6, col: BLUE, bd: BLUE, bold: true, z: 6 });
  C.chip({ text: 'an', x: NX, y: BY, size: 80, from: CL + 0.8, col: OR, bd: OR, bold: true, z: 6 });
  C.label('第一个音是辅音', AX, BY + 90, { size: 36, col: BLUE, from: CL + 1.0 });
  C.label('第一个音是元音', NX, BY + 90, { size: 36, col: OR, from: CL + 1.0 });
  const cnt = { a: 0, an: 0 };
  const sort = (w, ph, to, t) => { const k = cnt[to]++, x = (to === 'a' ? AX : NX) + (k % 2 ? 190 : -190), y = 470 + Math.floor(k / 2) * 80; const c = C.chip({ text: `${w} ${ph}`, x: 960, y: 880, size: 40, from: t, z: 6 }); C.drop(c, t + 0.5, x, y); C.swap(c, t + 1.1, `${w} ${ph}`, INK, '#fff', to === 'a' ? BLUE : OR); return c; };
  const t1 = T;
  [['book', '/b/', 'a'], ['orange', '/ɒ/', 'an'], ['egg', '/e/', 'an'], ['dog', '/d/', 'a'], ['umbrella', '/ʌ/', 'an'], ['uncle', '/ʌ/', 'an']].forEach(([w, p, to], i) => sort(w, p, to, t1 + i * 1.2));
  T = t1 + 6 * 1.2 + 0.6;
  T = say(T, 'I have a book, an apple and an orange.', '我有一本书、一个苹果和一个橙子。', ['a', 'an']);
  // ---- 预测 2：hour / useful ----
  const hr = C.chip({ text: 'hour', x: 760, y: 880, size: 52, from: T, bd: RED, z: 6 });
  const us = C.chip({ text: 'useful', x: 1160, y: 880, size: 52, from: T + 0.2, bd: RED, z: 6 });
  T = narr('为什么 hour 是辅音字母 h 开头却用 an hour，而 useful 是元音字母 u 开头却用 a useful book？', T, 4);
  T = C.predict(T, { q: 'hour 和 useful：各戴 a 还是 an？听第一个音！', sec: 4 });
  const R2 = T + 0.2;
  C.swap(hr, R2, 'hour /aʊ/', INK, '#fff', OR); C.label('h 不发音', 760, 800, { size: 34, col: GREY, from: R2, out: R2 + 2.2 });
  C.drop(hr, R2 + 0.9, NX, 470 + 2 * 80 + 80);
  C.swap(us, R2 + 1.6, 'useful /j/', INK, '#fff', BLUE); C.label('u 读 /juː/', 1160, 800, { size: 34, col: GREY, from: R2 + 1.6, out: R2 + 3.8 });
  C.drop(us, R2 + 2.5, AX, 470 + 80 + 80);
  T = narr('因为 a/an 看的是发音（音素）：hour 开头 h 不发音读 /aʊ/（元音），useful 开头读 /j/（辅音）！', R2 + 0.3, 5);
  C.rule(T);
  T = narr('① 基本原则：辅音音素开头用 a，元音音素开头用 an', T, 3.2);
  T = narr('② 必考 an 清单：an apple, an egg, an elephant, an eraser, an orange, an old man, an umbrella, an uncle, an English book, an interesting story', T, 5);
  T = narr('③ 两大特例：an hour / an honest boy（h 静音，读元音，必用 an）；a useful book / a university / a uniform（u 读辅音 /juː/，必用 a）', T, 5);
  T = say(T, 'Wait for an hour! Look at an umbrella!', '等一个小时！看一把雨伞！', ['an']);
  T = say(T, 'He is a university student with a useful dictionary.', '他是一名带着一本有用词典的大学生。', ['a']);
  K.narr('我有一本书、一个苹果和一个橙子。等一个小时！看一把雨伞！他是一名带着一本有用词典的大学生。', T, T + 4.5); T += 4.7;
  T = narr('单数可数要加冠词，a/an 小帽戴头顶；辅音音素前戴 a，元音音素前戴 an；an hour（h静音）和 a useful book（u读/juː/）最要当心！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
