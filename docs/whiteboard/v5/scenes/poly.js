// 一词多义 51 幕通用版式（决策 38 ⑩；啊哈卡 lab/audit38/aha/10_hd_poly.md）。旧版 = auto.js 三幕同板逐行写字。
// 用法：scenes/hd_poly_<词>_<n>.js 里 `polyBuild(SP, { title, items: ITEMS, acts: ACTS })`，ITEMS 原样不动（知识点不丢）。
// 解析 ITEMS：['w','一词多义演变'] / ['w','<emoji> <词> /音标/ — 【词性】释义'] / ['w','核心意象纽带：…'] / ['w','① 本义具象：…'] / 例句1 /
//            ['w','② 意象桥梁：…'] / ['w','核心动作/形状迁移'] / ['w','③ 引申新义：…'] / 例句2 / ['w','多义第n幕'] / ['s', 朗读句, 本幕画面说明]。
// 画面（三幕同一版式，幕说明进开场字幕，朗读句各幕不同）：左「① 本义」卡（大 emoji + 释义 + 例句）→ 中间一座桥写着核心意象 →
//   右「③ 新义」卡被「？」盖住 → C.predict「顺着桥走过去，这个词还能是什么意思？」→ 揭开新义 + 例句，左卡的 emoji 顺着桥滑到右卡变成 ✨ → 规则 = 核心意象纽带。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, FONT } from '../lib/concept.js';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export function parsePoly(items) {
  const D = { kicker: '', head: '', emoji: '', word: '', core: '', coreRaw: '', s1: '', ex1: '', bridge: '', shift: '', s2: '', ex2: '', actTag: '', sayEn: '', sayZh: '' };
  let last = '';
  for (const [k, a, b] of items) {
    if (k === 's') { D.sayEn = a; D.sayZh = b; continue; }
    let m;
    if (!D.kicker) { D.kicker = a; continue; }
    if (!D.head) { D.head = a; m = a.match(/^(\S+)\s+([A-Za-z' -]+?)\s+\//); if (m) { D.emoji = m[1]; D.word = m[2]; } continue; }
    if ((m = a.match(/^核心意象纽带：(.*)$/))) { D.core = m[1]; D.coreRaw = a; last = 'core'; }
    else if (/^① /.test(a)) { D.s1 = a; last = 's1'; }
    else if (/^② /.test(a)) { D.bridge = a; last = 'br'; }
    else if (/^③ /.test(a)) { D.s2 = a; last = 's2'; }
    else if (/^多义第\d+幕$/.test(a)) D.actTag = a;
    else if (last === 's1' && !D.ex1) D.ex1 = a;
    else if (last === 's2' && !D.ex2) D.ex2 = a;
    else if (last === 'br' && !D.shift) D.shift = a;
  }
  return D;
}

export function polyBuild(SP, Dsrc) {
  const K = scene({ sprites: SP }), C = concept(K), D = parsePoly(Dsrc.items);
  const fr = ((Dsrc.acts || {})['*'] || []).filter(f => SP.FI && SP.FI[f]);
  C.aha({
    see: `左边「① 本义」卡：${D.emoji} ${D.s1.replace(/^① /, '')}（${D.ex1}）；中间一座桥写着「${D.core}」；右边的卡被「？」盖着`,
    guess: `顺着「${D.core}」这座桥走过去，${D.word} 还能是什么意思？`,
    reveal: `「？」翻开：${D.s2.replace(/^③ /, '')}（${D.ex2}）；左卡的 ${D.emoji} 顺着桥滑到右卡`,
    rule: D.coreRaw || D.core,
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  C.label(`🎞️ ${D.word} · ${D.actTag}`, 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  const L = [470, 470], Rr = [1450, 470], CW = 640, CH = 440;
  const wrap = (s, size, w) => { const out = []; let line = ''; for (const ch of s) { if (line && K.measure(line + ch, size) > w) { out.push(line); line = ch; } else line += ch; } if (line) out.push(line); return out; };
  const card = (cx, cy, title, lines, ex, col, from, z = 3) => {
    C.TEXTS.push(title, ...lines, ex);
    K.prop((g, t) => {
      const q = clamp((t - from) / 0.5); if (q <= 0) return;
      g.save(); g.globalAlpha = q; g.fillStyle = '#fff'; g.strokeStyle = col; g.lineWidth = 6; g.beginPath(); g.roundRect(cx - CW / 2, cy - CH / 2, CW, CH, 28); g.fill(); g.stroke();
      g.font = FONT(34, true); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillText(title, cx, cy - CH / 2 + 50);
      g.font = FONT(34); g.fillStyle = INK; lines.forEach((ln, i) => g.fillText(ln, cx, cy + 40 + i * 44));
      g.font = FONT(36); g.fillStyle = col; const el = wrap(ex, 36, CW - 60); el.forEach((ln, i) => g.fillText(ln, cx, cy + CH / 2 - 30 - (el.length - 1 - i) * 44));
      g.restore();
    }, { from, z });
  };
  let T = 0.3;
  T = narr(D.kicker + '：' + D.head, T, 3.6);
  if (D.sayZh) T = narr(D.sayZh, T, 3.4);
  // ① 本义卡
  const s1 = D.s1.replace(/^① 本义具象：/, ''), s2 = D.s2.replace(/^③ 引申新义：/, '');
  card(L[0], L[1], '① 本义具象', wrap(s1, 34, CW - 60).slice(0, 2), D.ex1, BLUE, 1.0);
  const emo = { x: L[0], y: L[1] - 70 };
  // 桥
  const B0 = Math.max(2.0, T - 1.0);
  K.prop((g, t) => {
    const q = clamp((t - B0) / 0.8); if (q <= 0) return;
    g.save(); g.strokeStyle = OR; g.lineWidth = 8; g.lineCap = 'round'; const x0 = L[0] + CW / 2 + 10, x1 = Rr[0] - CW / 2 - 10, y = 520;
    g.beginPath(); for (let p = 0; p <= q + 1e-6; p += 0.04) { const x = x0 + (x1 - x0) * p, yy = y - 90 * Math.sin(Math.PI * p); p ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke();
    g.restore();
  }, { from: B0, z: 2 });
  const coreLines = wrap(D.core, 32, 300);
  coreLines.forEach((ln, i) => C.label(ln, 960, 360 + i * 40 - (coreLines.length - 1) * 20, { size: 32, col: OR, from: B0 + 0.6 }));
  C.label('② 意象桥梁', 960, 600, { size: 32, col: GREY, from: B0 + 0.8 });
  C.TEXTS.push(D.bridge, D.shift);
  T = Math.max(T, B0 + 1.2);
  T = narr(D.coreRaw, T, 3.4);
  // ③ 新义卡（先盖住）
  card(Rr[0], Rr[1], '③ 引申新义', wrap(s2, 34, CW - 60).slice(0, 3), D.ex2, GREEN, T);
  const qT = T + 0.4;
  T = C.predict(qT, { q: `顺着「${D.core}」这座桥走过去，${D.word} 还能是什么意思？`, sec: 4 });
  C.cover({ x: Rr[0], y: Rr[1], w: CW + 12, h: CH + 12, from: qT - 0.4, open: T + 0.1, label: '？' });
  const R = T + 0.2;
  // emoji 顺桥滑过去
  K.prop((g, t) => {
    const p = clamp((t - R) / 1.6); const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const x0 = emo.x, x1 = Rr[0], y = emo.y; const x = x0 + (x1 - x0) * e, yy = y - 200 * Math.sin(Math.PI * e);
    g.save(); g.font = '120px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    if (t >= 0.8) { g.globalAlpha = clamp((t - 0.8) / 0.4); g.fillText(D.emoji || '📌', x0, y); }
    if (t >= R) { g.globalAlpha = 1; g.fillText(D.emoji || '📌', x, yy); if (p >= 1) { g.font = '60px sans-serif'; g.fillText('✨', x1 + 90, y - 50); } }
    g.restore();
  }, { from: 0.8, z: 4 });
  T = narr(D.bridge, R + 0.3, 3.2);
  if (D.shift) T = narr(D.shift + '：' + D.s2, T, 3.6);
  C.rule(T);
  void fr;   // 规则课不凑动作（R4 修订）：不放人物
  T = narr(D.s1, T, 3); T = narr(D.s2, T, 3.4);
  const key = D.word ? [D.word.toLowerCase()] : [];
  if (D.sayEn) { const Ls = Math.max(sayLen(D.sayEn), 2.6); K.say(T, D.sayEn, { zh: '', key, len: Ls }); T += Ls + 0.6; }
  const other = D.sayEn === D.ex1 ? D.ex2 : D.ex1;
  if (other) { const Ls = Math.max(sayLen(other), 2.6); K.say(T, other, { zh: '', key, len: Ls }); T += Ls + 0.6; }
  K.end(T + 1.2);
  return C.finish();
}
