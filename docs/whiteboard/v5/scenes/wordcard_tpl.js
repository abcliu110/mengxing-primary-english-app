// 普通单词卡通用白板模板 v6（决策 38 ① 啊哈重做；旧版 v5「三块框逐行手写 + 讲解员」见 git 历史）。
// 父页面在 srcdoc 里注入 globalThis.__WB5_WORD__（词条，含 App 侧查好的真实词源 __etym / 真实构词 __morph）与 __WB5_ACT__（0–2），这里现场排版。
// 不注入时显示示例词 apple（便于单独预览）。不再用讲解员：画面本身讲（概念原语 v5/lib/concept.js）。
// 三幕（App 按钮：情景引入 / 规律拆解 / 地道应用）：
//   ① 看图猜词：大图 + 英文被盖住 → 先猜 3 秒 → 揭开、音节拆开再合上 → 再盖住，自己说一遍（遮英文看图说词）
//   ② 词的来历：有两本词源词典互证的 __etym → 时间轴上旧拼写一路「换装」成今天的词（先猜今天写成什么）；
//      没有词源但有真实构词 __morph → 两块拼成一个词（先猜）；都没有 → 盖住一个字母先猜（拼写），并明说「来历还没核实，先不讲」。
//      记忆联想（memory_assoc，非词源）只进字幕并标「非词源」，不上板、不冒充词源。
//   ③ 排句子：词库例句打散成词块，先猜第一个词，再一块块落进格子，读整句（中文意思在上方对照）
// 啊哈卡 / 分镜：docs/whiteboard/lab/audit38/aha/01_wordcard_tpl.md
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN } from '../lib/concept.js';
const DEMO = { id: 'G1_037', word: 'apple', phonetic: '/ˈæpl/', syllables: 'ap-ple', pos: 'n.', meaning: '苹果', emoji: '🍎',
  senses: [{ pos: 'n.', meaning: '苹果', ex_en: 'An apple a day keeps the doctor away.', ex_zh: '一天一苹果，医生远离我。' }],
  example_en: 'An apple a day keeps the doctor away.', example_zh: '一天一苹果，医生远离我。', memory_assoc: ['a像圆圆的苹果带着小叶子'],
  __etym: { k: 'native', c: [['中古英语', 'appel', ''], ['古英语', 'æppel', 'apple; any kind of fruit']] } };
const str = x => (x == null ? '' : String(x)).replace(/\s+/g, ' ').trim();
const VOW = /[aeiou]/i;

export default function build() {
  const w = globalThis.__WB5_WORD__ || DEMO, a = Math.max(0, Math.min(2, globalThis.__WB5_ACT__ | 0));
  const K = scene({}), C = concept(K);
  const word = str(w.word), s0 = (w.senses && w.senses[0]) || { pos: w.pos, meaning: w.meaning, ex_en: w.example_en, ex_zh: w.example_zh };
  const ex = str(s0.ex_en || w.example_en), exZh = str(s0.ex_zh || w.example_zh);
  const placeholder = /^Let's learn and use|^Morph form:/i.test(ex);
  const pic = str(w.emoji) || '🔤', mean = `${str(w.pos)} ${str(w.meaning)}`.trim();
  const fit = (s, size, max) => { let z = size; while (z > 30 && K.measure(s, z) > max) z -= 4; return z; };
  let T = 0;

  if (a === 0) {   // ① 看图猜词
    C.aha({ see: `一张大图（${pic}），旁边的英文被盖住`, guess: '这个东西用英语怎么说？', reveal: `揭开是 ${word}，按音节拆开读再合上`, rule: '看图就能说出这个词：再盖住英文自己说一遍' });
    const wz = fit(word, 130, 760);
    C.pic({ emoji: pic, x: 560, y: 500, size: 380, from: 0.2, bob: 1.6 });
    const big = C.chip({ text: word, x: 1350, y: 430, size: wz, from: 0.4, col: BLUE, bd: BLUE, bold: true });
    C.cover({ x: 1350, y: 430, w: 760, h: wz * 1.6, from: 0.3, open: 4.6 });
    T = C.predict(1.2, { q: '看图猜一猜：这个用英语怎么说？' });
    T = 4.8; K.say(T, word, { key: [word.toLowerCase()], zh: mean });
    if (str(w.phonetic)) C.label(str(w.phonetic), 1350, 590, { size: 46, col: INK, from: 5.0 });
    C.label(mean, 1350, 660, { size: 48, col: GREY, from: 5.2 });
    const syl = str(w.syllables).split(/[-·\s]+/).filter(Boolean);
    T = 7.2;
    if (syl.length > 1 && syl.join('').toLowerCase() === word.replace(/[^A-Za-z]/g, '').toLowerCase()) {   // 音节真能拼回原词才拆
      const sz = fit(syl.join('  '), 96, 700), gap = 36, ws = syl.map(s => K.measure(s, sz) + 44), tot = ws.reduce((x, y) => x + y, 0) + gap * (syl.length - 1);
      let x = 1350 - tot / 2;
      const ch = syl.map((s, i) => { const cx = x + ws[i] / 2; x += ws[i] + gap; return C.chip({ text: s, x: 1350, y: 790, size: sz, from: T, col: i % 2 ? OR : BLUE, bd: i % 2 ? OR : BLUE, path: [[T + 0.5, cx, 790, 0.7]], out: T + 5.2 }); });
      ch.forEach((c, i) => K.say(T + 1.3 + i * 1.0, syl[i], { key: [syl[i].toLowerCase()] }));
      ch.forEach(c => C.move(c, T + 1.4 + syl.length * 1.0, 1350, 790, 0.6));
      K.narr(`拆成 ${syl.length} 块读：${syl.join(' · ')}，再合起来就是 ${word}`, T + 0.5, T + 5);
      T += 5.4;
    } else if (syl.length > 1) C.label(str(w.syllables), 1350, 790, { size: 52, col: OR, from: T });   // 音节写法拼不回原词（词组）：照原样标出
    // 遮英文自测：再盖住，自己说
    C.cover({ x: 1350, y: 430, w: 760, h: wz * 1.6, from: T, open: T + 3.4, label: '🙈' });
    T = C.predict(T + 0.3, { q: '英文又被盖住了：看着图，自己大声说一遍！' }) + 0.2;
    K.say(T, word, { key: [word.toLowerCase()], zh: mean }); C.rule(T);
    T += 3;
    K.narr(`看见 ${pic} 就能说 ${word}——这就是会了。`, T, T + 3.2); T += 3.6;
  } else if (a === 1) {   // ② 词的来历
    const e = w.__etym, m = w.__morph;
    if (e && e.c && e.c.length) {
      const chain = [...e.c].reverse();   // 最老 → 较新
      const kind = { native: '英语本族词：从古英语一路传下来', loan: '外来词：从别的语言来到英语' }[e.k] || '';
      C.aha({ see: `时间轴最左边是很久以前的写法「${chain[0][1]}」（${chain[0][0]}）`, guess: '它到今天变成了哪个英语词？', reveal: `词块沿时间轴一路换装成今天的 ${word}`, rule: kind || '今天的词是从老写法一点点变来的' });
      const n = chain.length + 1, ticks = [...chain.map((c, i) => ({ p: 0.06 + 0.86 * i / (n - 1), label: c[0] })), { p: 0.92, label: '今天' }];
      const ax = C.axis({ x0: 140, x1: 1780, y: 650, from: 0.3, ticks });
      const old = C.chip({ text: chain[0][1], x: ax.pos(ticks[0].p)[0], y: 520, size: 76, from: 1.0, col: GREY, bd: GREY });
      C.slot({ x: ax.pos(0.92)[0], y: 520, w: 300, h: 120, from: 1.2, filled: 6.4 + 1.6 * (n - 1) });
      if (chain[0][2]) C.label(`（${chain[0][2]}）`, ax.pos(ticks[0].p)[0], 420, { size: 34, col: GREY, from: 1.4 });
      T = C.predict(2.0, { q: `这是很久以前的写法「${chain[0][1]}」。猜猜今天它变成了哪个英语词？` }) + 0.3;
      for (let i = 1; i < n; i++) {
        const [px] = ax.pos(ticks[i].p), last = i === n - 1, txt = last ? word : chain[i][1];
        C.move(old, T, px, 520, 1.1); C.swap(old, T + 1.1, txt, last ? BLUE : INK, '#fff', last ? BLUE : INK);
        T += 1.6;
      }
      K.say(T, word, { key: [word.toLowerCase()], zh: mean }); C.rule(T + 0.4);
      K.narr(`${kind ? kind + '。' : ''}${chain.map(c => `${c[0]} ${c[1]}`).join(' → ')} → 今天 ${word}`, T, T + 5);
      C.label('📜 出处：Wiktionary + Etymonline（两本词源词典对得上才收录）', 960, 890, { size: 34, col: GREY, from: T + 0.5 });
      T += 5.4;
    } else if (m && m.p && m.p.length > 1) {
      C.aha({ see: `两块：${m.p.map(p => p[0]).join(' 和 ')}`, guess: '拼在一起是哪个词？', reveal: `拼成 ${word}`, rule: m.k === 'compound' ? '合成词：两个词拼成一个新词' : '加词缀：词根 + 词缀变出新词' });
      const parts = m.p.map(p => str(p[0]).replace(/^-|-$/g, '')), xs = parts.map((_, i) => 360 + i * (1200 / Math.max(1, parts.length - 1)));
      const ch = parts.map((p, i) => C.chip({ text: p, x: xs[i], y: 420, size: 84, from: 0.6 + i * 0.4, col: i % 2 ? OR : BLUE, bd: i % 2 ? OR : BLUE }));
      m.p.forEach((p, i) => p[1] && C.label(p[1], xs[i], 540, { size: 36, col: GREY, from: 1 + i * 0.4 }));
      C.slot({ x: 960, y: 760, w: 640, h: 140, from: 1.4, filled: 6.2 });
      T = C.predict(2.2, { q: `${parts.join(' + ')} 拼在一起，会是哪个词？` }) + 0.3;
      let x = 960 - parts.reduce((s, p) => s + K.measure(p, 84) + 44, 0) / 2;
      ch.forEach((c, i) => { const wd = K.measure(parts[i], 84) + 44; C.drop(c, T + i * 0.3, x + wd / 2, 760); x += wd; });
      T += 1.6; K.say(T, word, { key: [word.toLowerCase()], zh: mean }); C.rule(T);
      K.narr(`${parts.join(' + ')} = ${word}（${m.k === 'compound' ? '合成词' : '加词缀'}）`, T, T + 4);
      C.label('📜 出处：Wiktionary + Etymonline', 960, 890, { size: 34, col: GREY, from: T });
      T += 4.4;
    } else {
      const letters = [...word];
      // 盖第一个元音字母（拼读的关键音，听得出来）；词尾不发音的 e 不盖（听不出来）；没有元音就盖第 2 个字母
      let hide = letters.findIndex((c, i) => VOW.test(c) && !(c.toLowerCase() === 'e' && i === letters.length - 1 && i > 0));
      if (hide < 0) hide = Math.min(1, letters.length - 1);
      C.aha({ see: `${word} 的字母排成一排，有一个被盖住`, guess: '盖住的是哪个字母？', reveal: `是「${letters[hide]}」`, rule: '边读边看字母，拼写就记住了' });
      const sz = fit(letters.join('   '), 110, 1500), wd = Math.min(170, 1500 / Math.max(1, letters.length));
      const x0 = 960 - wd * (letters.length - 1) / 2;
      letters.forEach((c, i) => { if (c.trim()) C.chip({ text: c, x: x0 + i * wd, y: 480, size: sz, from: 0.4 + i * 0.12, col: i === hide ? OR : BLUE, bd: i === hide ? OR : BLUE, pad: 14 }); });
      C.cover({ x: x0 + hide * wd, y: 480, w: wd * 0.95, h: sz * 1.6, from: 0.3, open: 5.4 });
      K.say(1.4, word, { key: [word.toLowerCase()], zh: mean });
      T = C.predict(2.3, { q: `听 ${word} 的读音，盖住的是哪个字母？` }) + 0.2;
      K.say(T + 0.4, word, { key: [word.toLowerCase()] }); C.rule(T + 0.4);
      K.narr(`是「${letters[hide]}」。这个词的来历两本词源词典还没对上，先不讲，免得讲错。`, T + 0.4, T + 5);
      T += 5.4;
    }
    // 巧记小故事（App 词卡原有的记忆法，不是真实词源）：进字幕并标明，知识点不丢、不冒充词源
    const tip = str(w.etymology || w.memory_tip).replace(/^📖\s*【[^】]*】\s*/, '');
    if (tip && !/^记忆锦囊：属于【[^】]*】高频核心词。?$/.test(tip) && tip !== '考场必考不规则/拼写变形词') {
      const sec = Math.min(9, Math.max(3.5, tip.length / 5)); K.narr(`💡 巧记（帮助记忆，不是真实词源）：${tip}`, T, T + sec); T += sec + 0.4;
    }
    const assoc = (w.memory_assoc || []).map(str).filter(Boolean);
    if (assoc.length) { K.narr(`🧠 记忆联想（非词源，只帮着记）：${assoc[0]}`, T, T + 4.2); T += 4.6; }
  } else {   // ③ 排句子
    const toks = (placeholder ? `This is ${/^[aeiou]/i.test(word) ? 'an' : 'a'} ${word}.` : ex).split(/\s+/).filter(Boolean);
    const sentence = toks.join(' ');
    C.aha({ see: '中文句子在上面，下面一堆打乱的英文词块', guess: '英文句子哪个词排第一？', reveal: '词块一块块落进格子，读出整句', rule: `${word} 在句子里这样用；英文语序要按格子排` });
    // 超过 8 个词分两行格子（整句不截断）
    const rowsN = toks.length > 8 ? 2 : 1, per = Math.ceil(toks.length / rowsN), gap = 22;
    const rowsT = Array.from({ length: rowsN }, (_, r) => toks.slice(r * per, (r + 1) * per));
    const sz = Math.min(...rowsT.map(rt => fit(rt.join(' '), 66, 1560 - rt.length * 50)));
    const ws = toks.map(t => K.measure(t, sz) + 44), slots = [], slotY = [];
    rowsT.forEach((rt, r) => {
      const i0 = r * per, rw = rt.map((_, k) => ws[i0 + k]);
      let x = 960 - (rw.reduce((p, q) => p + q, 0) + gap * (rt.length - 1)) / 2;
      rt.forEach((_, k) => { slots.push(x + rw[k] / 2); slotY.push(rowsN === 1 ? 470 : 400 + r * 140); x += rw[k] + gap; });
    });
    if (exZh && !placeholder) C.label(exZh, 960, 250, { size: fit(exZh, 56, 1600), col: GREY, from: 0.3 });
    const order = toks.map((_, i) => i).sort((p, q) => ((p * 7 + 3) % toks.length) - ((q * 7 + 3) % toks.length));   // 固定打乱（同一个词每次一样）
    const shelf = order.map((_, k) => 160 + (1600 / Math.max(1, toks.length - 1)) * k);
    const chips = toks.map((tk, i) => C.chip({ text: tk, x: shelf[order.indexOf(i)] ?? 960, y: 760 + (order.indexOf(i) % 2) * 110, size: sz, from: 0.8 + order.indexOf(i) * 0.1,
      col: tk.toLowerCase().replace(/[^a-z'-]/g, '') === word.toLowerCase() ? OR : INK, bd: tk.toLowerCase().replace(/[^a-z'-]/g, '') === word.toLowerCase() ? OR : INK }));
    toks.forEach((_, i) => C.slot({ x: slots[i], y: slotY[i], w: ws[i] + 10, h: sz * 1.6, from: 0.6, filled: 5.8 + i * 0.45 }));
    T = C.predict(2.0, { q: toks.length > 1 ? '按英文的顺序，哪个词块排第一？' : '把词块放进格子' }) + 0.3;
    chips.forEach((c, i) => C.drop(c, T + i * 0.45, slots[i], slotY[i], 0.55));
    T += toks.length * 0.45 + 0.6;
    K.say(T, sentence, { key: [word.toLowerCase()], zh: placeholder ? '' : exZh }); C.rule(T);
    T += Math.max(4, toks.length * 0.42 + 1.6);
    if (str(w.syntax_contrast)) { const sc = str(w.syntax_contrast), sec = Math.min(9, Math.max(3.5, sc.length / 5)); K.narr(`📌 ${sc}`, T, T + sec); T += sec + 0.3; }
    if (str(w.spelling_alert)) { K.narr(`✏️ ${str(w.spelling_alert)}`, T, T + 4.5); T += 4.8; }
  }
  K.end(T + 0.8);
  return C.finish();
}
