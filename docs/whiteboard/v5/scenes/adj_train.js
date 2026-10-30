// 🚂 形容词排座次（adj_order）四幕共用的 v5.1 版面引擎：每幕只给一份 spec（全部原文字符串都写在各幕文件里，R1 逐字核对）。
// 版面：8 块白板（4 列 × 2 行）：标题 → 中文 + 乱序乘客 → 主观 / 客观原理 → 7 节车厢 + 名词站 → 为什么 + 连读 → 口诀 + 预测 → 小剧场 → 金句卡，最后拉远看全图。
import { scene, OR, OR2, INK, GREY } from '../wb5.js';

export function buildAdj(SP, S) {
const K = scene({ sprites: SP });
const REG = i => [(i % 4) * 2100, Math.floor(i / 4) * 1250];
const go = (i, t, d = 0.9, z = 1) => { const [x, y] = REG(i); K.cam(t, { x: x + 960, y: y + 540, z, d, ease: 'power2.inOut' }); };
const norm = x => x.toLowerCase().replace(/[^a-z']/g, '');
const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => norm(x) === w)) * 0.36;
const say = (t, en, o = {}) => { K.say(t, en, o); return (o.word ? 0.45 + o.word.split(/\s+/).length * 0.42 : 0) + en.split(/\s+/).length * 0.36 + 0.9; };
const N = (zh, t) => { const d = Math.max(3.2, zh.length * 0.13 + 0.8); K.narr(zh, t, t + d); return d; };
const fit = (s, size, maxW = 1700) => Math.min(size, Math.floor(size * maxW / K.measure(s, size)));
const sayS = (t, [en, zh, word], key) => say(t, en, { word, zh, key: key || word.split(' ').slice(-1) });
// 小火车车头（画面只由 t 决定：冒烟）
const loco = (x, y, from) => K.prop((g, t) => { const q = Math.min(1, (t - from) / 0.5); if (q <= 0) return; g.save(); g.globalAlpha = q; g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = OR2;
  g.beginPath(); g.rect(x, y - 150, 170, 150); g.fill(); g.stroke(); g.beginPath(); g.rect(x + 20, y - 230, 50, 80); g.stroke();
  g.beginPath(); g.arc(x + 45, y + 10, 30, 0, 7); g.stroke(); g.beginPath(); g.arc(x + 130, y + 10, 30, 0, 7); g.stroke();
  g.strokeStyle = GREY; g.lineWidth = 4; for (let k = 0; k < 3; k++) { const p = ((t - from) * 0.5 + k / 3) % 1; g.globalAlpha = q * (1 - p); g.beginPath(); g.arc(x + 45 - p * 60, y - 250 - p * 120, 18 + p * 30, 0, 7); g.stroke(); }
  g.restore(); }, { from });

let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  const d0 = N(S.n0, 0.1);
  K.at(0.3).text(S.title, ox + 150, oy + 330, fit(S.title, S.titleSize || 84, 1650));
  K.text(S.sub, ox + 160, oy + 450, 60, { col: OR });
  K.rect(ox + 160, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text(S.badges[0], ox + 190, oy + 578, 44);
  K.rect(ox + 580, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text(S.badges[1], ox + 610, oy + 578, 44);
  let x = ox + 160; S.menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 700, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 748, 40, { col: GREY, rate: 30 }); x += w + 24; });
  loco(ox + 1450, oy + 1000, 1.0);
  K.pop(1.8, S.tick, ox + 1720, oy + 760, 90, { out: d0 + 1.2 });
  if (S.hero) K.actor({ keys: [[0, S.hero]], x: ox + 1780, ground: oy + 1150, h: 380, reveal: 1.4 });
  T = d0 + 1.6;
}

// ───────── 2 中文 + 乱序乘客 ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  const d1 = N(S.cn.n, T);
  K.at(T + 0.1).text(S.cn.text, ox + 120, oy + 200, fit(S.cn.text, 44), { rate: 30 });
  T += Math.max(d1, 3.0);
  const d2 = N(S.prob.n, T);
  K.at(T + 0.1).text(S.prob.head, ox + 120, oy + 330, 56, { col: OR });
  S.prob.words.forEach((w, k) => { const x = ox + 200 + (k % 3) * 520 + (k > 2 ? 260 : 0), y = oy + 520 + Math.floor(k / 3) * 220 + (k % 2) * 40;
    K.at(T + 0.6 + k * 0.4).rect(x - 30, y - 90, K.measure(w, 76) + 60, 130, { w: 5, rough: 1.6 }).text(w, x, y, 76); });
  K.at(T + 0.8 + S.prob.words.length * 0.4).text(S.prob.ask, ox + 1400, oy + 960, 64, { col: OR });
  T += Math.max(d2, 1.6 + S.prob.words.length * 0.4) + 0.4;
}

// ───────── 3 第一性原理：主观 → 客观 ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.3);
  const d1 = N(S.prin.n, T);
  K.at(T + 0.1).text(S.prin.l, ox + 120, oy + 330, 56, { col: OR });
  K.at(T + 0.5).arrow(ox + 150, oy + 480, ox + 1760, oy + 480, { w: 7, head: 40, speed: 2600 });
  K.at(T + 1.0).text(S.prin.mid, ox + 300, oy + 600, 48, { col: GREY });
  K.at(T + 1.3).text(S.prin.r, ox + 1100, oy + 330, 56);
  // 心 → 东西
  K.at(T + 1.6).text('♡', ox + 180, oy + 820, 140, { col: OR }); K.rect(ox + 1580, oy + 700, 160, 160, { w: 6 });
  T += Math.max(d1, 4.4) + 0.2;
}

// ───────── 4 七节车厢 + 名词站 ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.3);
  T += N(S.trainN, T);
  const cw = 200, x0 = ox + 40, ty = oy + 380;
  K.at(T - 1.6).line(ox + 20, ty + 300, ox + 1900, ty + 300, { w: 4, col: GREY, min: 0.05 });
  S.cars.forEach((c, k) => {
    const x = x0 + k * (cw + 10), d = c.n ? N(c.n, T) : 1.4, on = c.w !== '—';
    K.at(T + 0.3);
    if (c.top) K.text(c.top, x + 70, ty - 40, 56, { col: OR });
    K.rect(x, ty, cw, 260, { w: 5, rough: 1.2, col: on ? INK : GREY, fill: on && k ? OR2 : null });
    K.text(c.lab, x + 10, ty + 50, 30, { col: GREY, rate: 30 });
    K.text(c.w, x + 18, ty + 150, c.w.length > 7 ? 38 : 50, { col: on ? INK : GREY });
    if (c.zh) K.text(c.zh, x + 18, ty + 215, 32, { col: GREY });
    [x + 50, x + 150].forEach(cx => K.circle(cx, ty + 285, 20, { w: 4, col: GREY, min: 0.1 }));
    T += Math.max(d, 2.2);
  });
  { const x = x0 + 7 * (cw + 10), d = N(S.noun.n, T);
    K.at(T + 0.3).rect(x, ty - 60, 220, 320, { w: 7, col: OR, rough: 1.4 }).text(S.noun.lab, x + 20, ty - 10, 34, { col: OR }).text(S.noun.w, x + 20, ty + 150, 54).text(S.noun.zh, x + 20, ty + 215, 34, { col: GREY });
    T += d; }
  const d2 = N(S.close.n, T);
  K.at(T + 0.2).arrow(ox + 1560, oy + 800, ox + 1700, oy + 700, { w: 6, col: OR, head: 26 });
  K.text(S.close.text, ox + 900, oy + 880, 50, { col: OR });
  T += d2 + 0.2;
}

// ───────── 5 为什么这样排 + 连读 ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.3);
  const d1 = N(S.why.n, T);
  K.at(T + 0.2).text(S.why.text, ox + 120, oy + 200, fit(S.why.text, 42), { rate: 30 });
  K.at(T + 1.4).text(S.why.skip, ox + 120, oy + 300, 46, { col: GREY });
  T += Math.max(d1, 3.6);
  const d2 = N(S.join.n, T);
  K.at(T + 0.2).text(S.join.phrase, ox + 120, oy + 470, fit(S.join.phrase, 84), { col: OR });
  K.at(T + 1.0).text(S.join.zh, ox + 120, oy + 580, fit(S.join.zh, 46));
  T += d2;
  if (S.join.actor) K.actor({ keys: [[0, S.join.actor]], x: ox + 1550, ground: oy + 1150, h: 420, reveal: T - 1.0 });
  S.says.forEach(s => { T += sayS(T, s, s[3]) + 0.2; });
  T += 0.2;
}

// ───────── 6 口诀 + 预测 ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.3);
  const d0 = N(S.chant, T);
  K.at(T + 0.2).text(S.gold[4] + S.gold[5], ox + 130, oy + 160, 52, { col: OR, rate: 30 });
  T += d0;
  const d1 = N(S.pred.n, T);
  K.at(T + 0.4).text(S.pred.cn, ox + 130, oy + 300, 60);
  K.text(S.pred.q, ox + 130, oy + 410, fit(S.pred.q, 48, 1600), { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1750, oy + 300, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N(S.pred.rn, T);
  K.at(T + 0.2).text(S.pred.ans, ox + 130, oy + 540, fit(S.pred.ans, 70, 1600), { col: OR });
  if (S.pred.actor) K.actor({ keys: [[0, S.pred.actor]], x: ox + 1450, ground: oy + 1150, h: S.pred.h || 420, reveal: T + 0.4 });
  if (S.pred.balloon) { const bt = T + 0.6; K.prop((g, t) => { if (t < bt) return; const q = Math.min(1, (t - bt) / 0.5), y = oy + 720 + Math.sin(t * 2) * 12; g.save(); g.globalAlpha = q; g.fillStyle = '#e8553a'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.ellipse(ox + 1450, y, 120, 150, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(ox + 1450, y + 150); g.quadraticCurveTo(ox + 1420, y + 260, ox + 1460, y + 380); g.stroke(); g.restore(); }, { from: bt }); }
  const st = T + 0.8;
  T = Math.max(T + d2, st + sayS(st, S.pred.say, S.pred.say[3])) + 0.6;
}

// ───────── 7 小剧场：火车开进名词站 ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.3);
  K.at(T).text(S.join.phrase, ox + 160, oy + 220, fit(S.join.phrase, 70, 1600));
  K.line(ox + 60, oy + 900, ox + 1860, oy + 900, { w: 4, col: GREY, min: 0.05 });
  K.prop((g, t) => { const s = T + 0.6; if (t < s) return; const p = Math.min(1, (t - s) / 3), e = 1 - (1 - p) * (1 - p), x = ox - 600 + e * 900;
    g.save(); g.strokeStyle = INK; g.lineWidth = 5; g.fillStyle = OR2; g.font = '40px Kalam, WK';
    const ws = S.join.phrase.split(' '); ws.forEach((w, k) => { const cx = x + k * 190; g.beginPath(); g.rect(cx, oy + 700, 180, 170); if (k) g.fill(); g.stroke(); g.fillStyle = INK; g.fillText(w.length > 7 ? w.slice(0, 7) + '…' : w, cx + 12, oy + 800); g.fillStyle = OR2; g.beginPath(); g.arc(cx + 45, oy + 885, 15, 0, 7); g.arc(cx + 135, oy + 885, 15, 0, 7); g.stroke(); });
    g.restore(); }, { from: T + 0.6 });
  if (S.hero2) K.actor({ keys: [[0, S.hero2]], x: ox + 1650, ground: oy + 900, h: 380, reveal: T + 2.6 });
  T += 5.2;
}

// ───────── 8 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text(S.gold[0], ox + 220, oy + 260, 54, { col: OR });
  K.text(S.gold[1], ox + 220, oy + 350, fit(S.gold[1], 56, 1500));
  K.text(S.gold[2], ox + 220, oy + 440, 56);
  K.text(S.gold[3], ox + 220, oy + 560, 54, { col: OR });
  K.text(S.gold[4], ox + 220, oy + 650, 54);
  K.text(S.gold[5], ox + 220, oy + 740, 54);
  K.text(S.gold[6], ox + 220, oy + 860, fit(S.gold[6], 40, 1500), { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1165, z: 0.225, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}
return K.done();
}
