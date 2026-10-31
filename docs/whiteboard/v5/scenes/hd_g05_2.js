// 📘 G05 底层原理 · a / an ② —— 决策 38 ⑥ 啊哈重做 · 第 2 幕（决策 36-② 长幕拆分：分筐 + 预测 hour / useful；第 1 幕 hd_g05_1）（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/06_hd_g05.md）
// 内容来源：GRAMMAR_DB G05（道 2 B2 已改史实：an 是原形，古英语 ān「一」；见 lab/audit35/GRAMMAR_FIX.md）+ 旧版 src/cases/hd_g05.js 案例 1（清单 lab/INVENTORY_HD_G05_1_V5.md）。
// 旧板文字是改前的「a 在元音前垫一个 n 变成 an」，本幕按改后的 GRAMMAR_DB 讲。角色：不用人物；sprites/hdg05_2.js 为空包。
// 画面：a book 读起来顺；a apple 两个元音一撞 💥 → 先猜怎么办 → n 落进来、a 变 an、顺了 → 原来 an 才是老祖宗（ān → an / a，one 同源）→
//       词卡按「第一个音」分进 a / an 两筐 → 再猜 hour / useful → h 不发音、u 读 /j/ → 规则。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/hdg05_2.js';
const ACTS = {};
export const KNOW = [
'G05 底层原理',
  '🔬 G05 · 不定冠词 a 与 an 的听音法则 底层结构拆解与汉英思维对比',
  'I have a book, an apple and an orange.', 'Wait for an hour! Look at an umbrella!', 'He is a university student with a useful dictionary.',
  '我有一本书、一个苹果和一个橙子。等一个小时！看一把雨伞！他是一名带着一本有用词典的大学生。',
  '为什么 hour 是辅音字母 h 开头却用 an hour，而 useful 是元音字母 u 开头却用 a useful book？',
  '因为 a/an 看的是发音（音素）：hour 开头 h 不发音读 /aʊ/（元音），useful 开头读 /j/（辅音）！',
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
    see: '上面两个筐：a 筐（第一个音是辅音）、an 筐（第一个音是元音）；book /b/、orange /ɒ/、egg /e/、dog /d/、umbrella /ʌ/、uncle /ʌ/ 一张张按第一个音落进筐',
    guess: 'hour 是 h 开头、useful 是 u 开头——各戴 a 还是 an？听第一个音！',
    reveal: 'hour 的 h 不发音、第一个音是元音 /aʊ/ → 落进 an 筐；useful 的第一个音是 /j/ → 落进 a 筐',
    rule: '只看后面单词发音的第一个音：辅音音素用 a，元音音素用 an',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('📘 G05 底层原理 · a / an ②', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;

  const CL = 0.3;
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
  [['book', '/b/', 'a'], ['orange', '/ɒ/', 'an'], ['egg', '/e/', 'an'], ['dog', '/d/', 'a'], ['umbrella', '/ʌ/', 'an'], ['uncle', '/ʌ/', 'an']].forEach(([w, p, to], i) => sort(w, p, to, t1 + i * 0.9));
  T = t1 + 6 * 0.9 + 0.8;
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
  C.TEXTS.push('① 基本原则：辅音音素开头用 a，元音音素开头用 an');   // 第 1 幕已讲（规则复述进字幕）
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
