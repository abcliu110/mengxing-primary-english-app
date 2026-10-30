// He takes the dog out. —— 动作系统 v5.1（决策 31 定稿组合）
//   huashu-art-motion：白板画风、笔、逐字手写、之字形揭开角色
//   rough.js：场景线条（房子、门、狗碗、箭头、画框）的手绘感，种子固定 → 每次一样
//   GSAP：镜头、重音词弹出、跟随权重的时间轴（paused，只用 tl.time(t) 取值）
//   自写播放器：player51.js 驱动 drawFrame(ctx, t)
// 硬规则：画面只由 t 决定；人物不用代码画（AI 绿幕关键帧）；结果帧留在画面上；重音词与朗读同步变橙。
import '../src/huashu_libs.js';
import '../src/assets.js';
import rough from 'roughjs/bundled/rough.esm.js';
import { gsap } from 'gsap';

export const W = 1920, H = 1080, FPS = 30, DUR = 11.5;
const INK = '#0A0503', OR = '#EF7226', OR2 = '#E9A67C', BOARD = '#FBFBFB';
const GROUND = 880, DOORX = 780;
const { clamp, lerp } = U;

// ---------- 资源 ----------
const IMG = {};
export function loadAssets(fontUrls) {
  const ps = Object.entries(window.FR).map(([k, src]) => new Promise(res => { const im = new Image(); im.onload = () => res(); im.src = src; IMG[k] = im; }));
  const fonts = [['WK', fontUrls.wk], ['Kalam', fontUrls.kalam]].map(([n, u]) => new FontFace(n, `url(${u})`).load().then(f => document.fonts.add(f)));
  return Promise.all([...ps, ...fonts]);
}
const FI = () => window.FI;

// ---------- 角色（与 v5.0 相同的帧库与摆放） ----------
const KF = { k1: { s: 0.52, right: 735 }, k2: { s: 0.56, right: 735 }, k3: { s: 0.53, right: 760 } };
function kRect(k) { const f = FI()[k], o = KF[k]; const w = f.w * o.s, h = f.bottom * o.s; return { x: o.right - w, y: GROUND - h, w, h: f.h * o.s }; }
const SB = 0.69, SD = 0.5, STEP = 50;
const T_WALK0 = 5.6, T_WALK1 = 8.7, BOY0 = 520, BOY1 = 1060;

// ---------- GSAP 时间轴（只取值，不自己跑） ----------
const S = {
  walk: 0,                    // 0→1 走路进度（男孩 BOY0→BOY1）
  gap: 150,                   // 狗领先男孩的距离
  cam: { x: 960, y: 560, z: 1 },
  follow: 0,                  // 镜头跟随男孩的权重
  tag: 0,                     // 「家里」淡出
  takes: { s: 0, a: 0, x: 560, y: 540, size: 80 }, out: { s: 0, a: 0 }, ring: { a: 0 },
  shade: 0,
};
const tl = gsap.timeline({ paused: true });
tl.to(S.cam, { x: 640, y: 690, z: 2.05, duration: 0.32, ease: 'power3.inOut' }, 3.0)          // 快推到项圈（重音）
  .to(S.takes, { s: 1, a: 1, duration: 0.38, ease: 'back.out(2.4)' }, 3.85)                   // takes 弹出
  .to(S.takes, { x: 330, y: 535, size: 60, duration: 0.6, ease: 'power2.inOut' }, 5.0)        // takes 让位到墙角，不挡男孩
  .to(S.cam, { x: 900, y: 640, z: 1.3, duration: 0.7, ease: 'sine.inOut' }, 4.9)               // 拉回中景
  .to(S, { follow: 1, duration: 0.7, ease: 'sine.inOut' }, 4.9)                                // 开始横移跟随
  .to(S, { walk: 1, duration: T_WALK1 - T_WALK0, ease: 'power1.inOut' }, T_WALK0)              // 走出门
  .to(S, { gap: 215, duration: 0.8, ease: 'sine.inOut' }, T_WALK0)                             // 狗冲在前面，绳拉开
  .to(S.out, { s: 1, a: 1, duration: 0.4, ease: 'back.out(2.6)' }, 6.75)                      // 跨门线：out!
  .to(S, { follow: 0, duration: 1.0, ease: 'sine.inOut' }, 9.6)                                // 停止跟随
  .to(S.cam, { x: 960, y: 600, z: 0.96, duration: 1.0, ease: 'sine.inOut' }, 9.6)              // 拉远看全图
  .to(S, { shade: 1, duration: 0.5, ease: 'none' }, 10.7)
  .set({}, {}, DUR);
const boyX = () => lerp(BOY0, BOY1, S.walk);

function drawSprite(g, key, ax, axKey, s) {
  const f = FI()[key], im = IMG[key]; const x = ax - f[axKey] * s, y = GROUND - f.bottom * s;
  g.drawImage(im, x, y, f.w * s, f.h * s); return { x, y, f };
}
function drawChars(g, t) {
  if (t < 5.5) { const k = t < 3.55 ? 'k1' : t < 4.35 ? 'k2' : 'k3', r = kRect(k); g.drawImage(IMG[k], r.x, r.y, r.w, r.h); return; }
  const bx = boyX(), dist = bx - BOY0;
  const bi = Math.floor(dist / STEP) % 4, di = (Math.floor(dist / STEP) + 1) % 4;
  const d = drawSprite(g, 'd' + di, bx + S.gap, 'ax', SD);
  const b = drawSprite(g, 'w' + bi, bx, 'ax', SB);
  const h = [b.x + b.f.hand[0] * SB, b.y + b.f.hand[1] * SB], c = [d.x + d.f.collar[0] * SD, d.y + d.f.collar[1] * SD];
  const span = Math.hypot(c[0] - h[0], c[1] - h[1]), sag = Math.max(10, 120 - span * 0.45);
  g.save(); g.strokeStyle = OR; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(h[0], h[1]); g.quadraticCurveTo((h[0] + c[0]) / 2, Math.max(h[1], c[1]) + sag, c[0], c[1]); g.stroke();
  g.fillStyle = '#9aa0a6'; g.beginPath(); g.arc(c[0], c[1], 6, 0, 7); g.fill(); g.restore();
}

// ---------- rough.js → 可「画到一半」的笔画 ----------
const RG = rough.generator();
// 把 rough 的 ops（move / lineTo / bcurveTo）展开成若干条折线
function flatten(drawable, type = 'path') {
  const out = [];
  for (const set of drawable.sets) {
    if (set.type !== type) continue;
    let cur = null, last = [0, 0];
    for (const op of set.ops) {
      const d = op.data;
      if (op.op === 'move') { cur = [[d[0], d[1]]]; out.push(cur); last = [d[0], d[1]]; }
      else if (op.op === 'lineTo') { cur.push([d[0], d[1]]); last = [d[0], d[1]]; }
      else if (op.op === 'bcurveTo') {
        const p0 = last, p1 = [d[0], d[1]], p2 = [d[2], d[3]], p3 = [d[4], d[5]];
        for (let i = 1; i <= 10; i++) { const s = i / 10, u = 1 - s; cur.push([u*u*u*p0[0] + 3*u*u*s*p1[0] + 3*u*s*s*p2[0] + s*s*s*p3[0], u*u*u*p0[1] + 3*u*u*s*p1[1] + 3*u*s*s*p2[1] + s*s*s*p3[1]]); }
        last = p3;
      }
    }
  }
  return out.filter(p => p.length > 1).map(pts => ({ pts, cum: DG.cum(pts) }));
}
// 一笔 rough 线：两遍描边同时推进（马克笔的双线味道），hachure 填充在描完后淡入
let seedN = 11;
function R(make, { col = INK, w = 6, speed = 2600, rough: rg = 1.1, bow = 1.2, fill = null, fillW = 2.5, gap = 0.03, min = 0.12, fade = null } = {}) {
  const opt = { seed: seedN++, roughness: rg, bowing: bow, stroke: col, strokeWidth: w, preserveVertices: false };
  if (fill) Object.assign(opt, { fill, fillStyle: 'hachure', hachureGap: 14, hachureAngle: -41, fillWeight: fillW });
  const dr = make(opt), strokes = flatten(dr, 'path'), hatch = fill ? flatten(dr, 'fillSketch') : [];
  const L = Math.max(...strokes.map(s => s.cum[s.cum.length - 1]));
  const t0 = B.cur, t1 = t0 + Math.max(min, L / speed);
  const first = strokes[0];
  B.push({ kind: 'custom', t0, t1, col, start: () => first.pts[0], end: () => first.pts[first.pts.length - 1],
    draw(g, q, ft) {
      const e = MO.sineInOut(q);
      const fa = fade ? 1 - clamp((ft - fade[0]) / (fade[1] - fade[0])) : 1; if (fa <= 0) return null;
      g.save(); g.globalAlpha = fa; g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
      let tip = null;
      strokes.forEach((s, i) => { const p = DG.drawPartial(g, s.pts, s.cum, s.cum[s.cum.length - 1] * e); if (i === 0) tip = p; });
      if (hatch.length) {
        const a = clamp((ft - t1) / 0.35);
        if (a > 0) { g.globalAlpha = a * fa; g.strokeStyle = fill; g.lineWidth = fillW; for (const h of hatch) { g.beginPath(); h.pts.forEach((p, k) => k ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke(); } }
      }
      g.restore();
      return q < 1 ? tip : null;
    } });
  B.cur = t1 + gap;
}

// ---------- 白板笔画时间线 ----------
const B = DG.board({ ink: INK, lw: 6.5, speed: 2600, font: 'Kalam, WK' });
B.at(0.15);
R(o => RG.line(60, GROUND, 1860, GROUND, o), { speed: 4800, rg: 0.6, bow: 0.4 });                                     // 地面
R(o => RG.linearPath([[160, GROUND], [160, 470]], o), { rg: 0.8 });                                                  // 墙
R(o => RG.linearPath([[110, 500], [470, 250], [830, 500]], o), { rg: 1.0 });                                         // 屋顶
R(o => RG.line(160, 470, DOORX, 470, o), { w: 5, rg: 0.8 });                                                         // 屋檐
R(o => RG.line(DOORX, 470, DOORX, GROUND, o), { w: 5, rg: 0.7 });                                                    // 门框
R(o => RG.polygon([[DOORX, 640], [890, 615], [890, 905], [DOORX, GROUND]], o), { w: 5, rg: 0.9 });                  // 门板向外开着
R(o => RG.line(868, 760, 868, 784, o), { w: 6, rg: 0.3, min: 0.06 });                                                // 门把手
R(o => RG.rectangle(230, 560, 100, 80, o), { w: 4.5, rg: 1.2 });                                                     // 墙上的小画框
R(o => RG.linearPath([[245, 625], [275, 590], [295, 612], [315, 585]], o), { w: 4, rg: 0.8 });
R(o => RG.arc(300, 868, 88, 48, 0, Math.PI, true, o), { w: 4.5, rg: 1.0, fill: OR2, fillW: 2 });                    // 狗碗
B.text('家里', 400, 410, 64, { rate: 7.5 });
// 角色：之字形揭开（huashu Reveal）
{
  const r = kRect('k1'), zz = DG.zigzag(r.x - 10, r.y - 10, r.w + 20, r.h + 20, 7), cum = DG.cum(zz), L = cum[cum.length - 1];
  const t0 = B.cur + 0.05, t1 = t0 + 0.8;
  B.push({ kind: 'custom', t0, t1, col: INK, start: () => zz[0], end: () => zz[zz.length - 1],
    draw(g, q, ft) {
      if (q < 1) { const d = L * q; g.save(); g.clip(DG.revealMask(zz, cum, d, (r.h + 20) / 7 * 1.15)); g.drawImage(IMG.k1, r.x, r.y, r.w, r.h); g.restore(); return DG.pointAt(zz, cum, d); }
      drawChars(g, ft); return null;
    } });
  B.cur = t1 + 0.05;
}
// 扣上一瞬间：橙色 rough 圈（手画）
B.at(3.58);
R(o => RG.ellipse(684, 776, 124, 64, o), { col: OR, w: 5, speed: 1500, rg: 1.6, bow: 2, fade: [5.2, 5.6] });   // 走路前淡出（项圈已离开）
// 第四镜：橙箭头 + take out / 带……出去
B.at(9.0);
R(o => RG.curve([[380, 935], [700, 945], [1050, 940], [1420, 928]], o), { col: OR, w: 8, speed: 1500, rg: 0.9 });
R(o => RG.linearPath([[1378, 898], [1424, 928], [1380, 962]], o), { col: OR, w: 8, speed: 1500, rg: 0.6, min: 0.1 });
B.text('take out', 1480, 640, 96, { col: OR, rate: 12 });
B.text('带……出去', 1485, 750, 66, { rate: 9 });

// ---------- 镜头：GSAP 关键镜头 + 跟随权重 ----------
function camAt() {
  const fx = clamp(boyX() + 170, 700, 1300);
  return { x: lerp(S.cam.x, fx, S.follow), y: S.cam.y, z: S.cam.z };
}

// ---------- 笔：在画时跟笔尖，长空档退出右下 ----------
function penPos(ft, cam, tip) {
  const hs = B.S.filter(s => s.kind !== 'pop' && s.kind !== 'fill');
  const p = B.penAt(ft, cam, tip);
  if (tip) return p;
  const prev = [...hs].reverse().find(s => s.t1 <= ft), next = hs.find(s => s.t0 > ft);
  const dPrev = prev ? ft - prev.t1 : 9, dNext = next ? next.t0 - ft : 9;
  if (dPrev < 0.25 && dNext < 0.25) return p;
  const q = Math.min(MO.cubicIn(clamp(dPrev / 0.35)), MO.cubicIn(clamp(dNext / 0.35)));
  if (q >= 1) return null;
  return [lerp(p[0], W + 160, q), lerp(p[1], H + 220, q)];
}

// ---------- 重音词（GSAP 驱动的弹出） ----------
function popWord(g, str, x, y, size, st) {
  if (st.a <= 0) return;
  g.save(); g.font = `${size}px Kalam, WK`; g.fillStyle = OR; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  g.globalAlpha = clamp(st.a); g.translate(x, y - size * 0.35); g.scale(st.s, st.s); g.fillText(str, 0, size * 0.35); g.restore();
}

// ---------- 字幕：读到哪个词亮哪个词，takes / out 用橙 ----------
const WORDS = [['He', 2.7], ['takes', 3.85], ['the', 2.9], ['dog', 3.0], ['out.', 6.75]];
function caption(c, t) {
  const a = clamp((t - 2.5) / 0.3); if (!a) return;
  c.save(); c.globalAlpha = a; c.font = '64px Kalam'; c.textBaseline = 'alphabetic';
  const ws = WORDS.map(([w]) => c.measureText(w + ' ').width), tot = ws.reduce((x, y) => x + y, 0);
  let x = W / 2 - tot / 2;
  c.fillStyle = 'rgba(251,251,251,.92)'; c.beginPath(); c.roundRect(x - 36, 958, tot + 52, 92, 20); c.fill();
  WORDS.forEach(([w, on], i) => { const key = i === 1 || i === 4; c.fillStyle = t >= on ? (key ? OR : INK) : '#b8b8b4'; c.fillText(w, x, 1026); x += ws[i]; });
  c.restore();
}

export function drawFrame(c, t) {
  tl.time(clamp(t, 0, DUR), false);
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = BOARD; c.fillRect(0, 0, W, H);
  const cam = camAt();
  c.save(); CAM.apply(c, cam);
  const { tip, col } = B.draw(c, t);
  popWord(c, 'takes', S.takes.x, S.takes.y, S.takes.size, S.takes);
  popWord(c, 'out!', 960, 450, 92, S.out);
  c.restore();
  if (S.shade > 0) { c.fillStyle = `rgba(238,238,236,${0.35 * S.shade})`; c.fillRect(0, 0, W, H); }
  const pp = penPos(t, cam, tip); if (pp) DG.pen(c, pp[0], pp[1], col || B.penColor(t));
  caption(c, t);
}
