// v5 公共引擎（决策 31 / 32，标准画法 MASTER_DESIGN §2.9）——由 takeout_wb/v51 抽出
//   huashu-art-motion：白板笔画时间线、笔、逐字手写、之字形揭开
//   rough.js：场景线条（种子固定 → 每次一样），展开成折线后可「画到一半」
//   GSAP：镜头 / 弹字 / 任意数值的 paused 时间轴，只用 tl.time(t) 取值
//   角色：AI 绿幕关键帧（sprites/*.js），代码只做位移、换帧、镜头、高亮、字幕
// 每幕：const K = scene({ sprites }); …按时间顺序写…; export default K.done();
// 硬规则：画面只由 t 决定；人物不用代码画；结果帧留在画面上；重音词与朗读同步变橙。
import '../takeout_wb/src/huashu_libs.js';
import rough from 'roughjs/bundled/rough.esm.js';
import { gsap } from 'gsap';

export const W = 1920, H = 1080;
export const INK = '#0A0503', OR = '#EF7226', OR2 = '#E9A67C', BOARD = '#FBFBFB', GREY = '#8a8a86';
const { clamp, lerp } = U;
const RG = rough.generator();

// rough 图形 → 折线（move / lineTo / bcurveTo 展开，贝塞尔细分 10 段）
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

export function scene({ sprites = { FR: {}, FI: {} }, font = 'Kalam, WK' } = {}) {
  const FR = sprites.FR, FI = sprites.FI, IMG = {};
  const B = DG.board({ ink: INK, lw: 6.5, speed: 2600, font });
  const tl = gsap.timeline({ paused: true });
  const CAMS = { x: W / 2, y: H / 2, z: 1 }, S = { shade: 0 };
  const CUES = [], NARR = [], SAYS = [], LAYER = [], POPS = [];
  let seedN = 11, follow = null, dur = 0;
  const K = { B, tl, S, IMG, FI, RG, OR, OR2, INK, GREY, CUES };
  K.at = t => { B.at(t); return K; };
  K.wait = d => { B.at(B.cur + d); return K; };
  Object.defineProperty(K, 'cur', { get: () => B.cur });

  // ---- rough 线条：两遍描边同时推进；hachure 描完淡入；fade:[t0,t1] 淡出 ----
  K.R = (make, { col = INK, w = 6, speed = 2600, rough: rg = 1.1, bow = 1.2, fill = null, fillW = 2.5, gap = 0.03, min = 0.12, fade = null, solid = null } = {}) => {
    const opt = { seed: seedN++, roughness: rg, bowing: bow, stroke: col, strokeWidth: w, preserveVertices: false };
    if (fill) Object.assign(opt, { fill, fillStyle: 'hachure', hachureGap: 14, hachureAngle: -41, fillWeight: fillW });
    const dr = make(opt, RG), strokes = flatten(dr, 'path'), hatch = fill ? flatten(dr, 'fillSketch') : [];
    const L = Math.max(...strokes.map(s => s.cum[s.cum.length - 1]));
    const t0 = B.cur, t1 = t0 + Math.max(min, L / speed), first = strokes[0];
    B.push({ kind: 'custom', t0, t1, col, start: () => first.pts[0], end: () => first.pts[first.pts.length - 1],
      draw(g, q, ft) {
        const e = MO.sineInOut(q), fa = fade ? 1 - clamp((ft - fade[0]) / (fade[1] - fade[0])) : 1; if (fa <= 0) return null;
        g.save(); g.globalAlpha = fa;
        if (solid && q >= 1) { g.fillStyle = solid; g.globalAlpha = fa * clamp((ft - t1) / 0.3); const s0 = strokes[0].pts; g.beginPath(); s0.forEach((p, k) => k ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.fill(); g.globalAlpha = fa; }
        g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
        let tip = null;
        strokes.forEach((s, i) => { const p = DG.drawPartial(g, s.pts, s.cum, s.cum[s.cum.length - 1] * e); if (i === 0) tip = p; });
        if (hatch.length) { const a = clamp((ft - t1) / 0.35); if (a > 0) { g.globalAlpha = a * fa; g.strokeStyle = fill; g.lineWidth = fillW; for (const h of hatch) { g.beginPath(); h.pts.forEach((p, k) => k ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke(); } } }
        g.restore(); return q < 1 ? tip : null;
      } });
    B.cur = t1 + gap; return K;
  };
  // 常用形状（世界坐标）
  K.line = (x0, y0, x1, y1, o = {}) => K.R(op => RG.line(x0, y0, x1, y1, op), o);
  K.path = (pts, o = {}) => K.R(op => RG.linearPath(pts, op), o);
  K.curve = (pts, o = {}) => K.R(op => RG.curve(pts, op), o);
  K.rect = (x, y, w, h, o = {}) => K.R(op => RG.rectangle(x, y, w, h, op), o);
  K.ellipse = (x, y, w, h, o = {}) => K.R(op => RG.ellipse(x, y, w, h, op), o);
  K.circle = (x, y, d, o = {}) => K.R(op => RG.circle(x, y, d, op), o);
  K.arrow = (x0, y0, x1, y1, o = {}) => {                       // 线 + 箭头两笔
    K.line(x0, y0, x1, y1, o); const a = Math.atan2(y1 - y0, x1 - x0), L = o.head || 34;
    K.path([[x1 - L * Math.cos(a - 0.45), y1 - L * Math.sin(a - 0.45)], [x1, y1], [x1 - L * Math.cos(a + 0.45), y1 - L * Math.sin(a + 0.45)]], { ...o, min: 0.08 });
    return K;
  };
  K.cross = (x0, y0, x1, y1, o = {}) => K.line(x0, y0, x1, y1, { col: OR, w: 7, min: 0.15, ...o });   // 划掉
  K.under = (x0, x1, y, o = {}) => K.line(x0, y, x1, y, { col: OR, w: 6, rough: 0.8, min: 0.12, ...o }); // 下划线
  // 手写字（逐字揭开）
  K.text = (str, x, y, size, o = {}) => { B.text(str, x, y, size, { rate: size >= 80 ? 9 : 16, ...o }); return K; };
  K.measure = (str, size) => { const c = K._mc || (K._mc = document.createElement('canvas').getContext('2d')); c.font = `${size}px ${font}`; return c.measureText(str).width; };

  // ---- 角色：关键帧 / 走路帧库 ----
  // K.actor({ keys:[[t,'k1'],[t,'k2']…], x, ground, h(显示高度), dy:t=>px(竖直位移), anchor:'ax'|'center', reveal:t, until:t, flip, walk:{keys:[…], x0, x1, t0, t1, step:50, ease} , z })
  K.actor = spec => { spec.z = spec.z || 0; LAYER.push({ type: 'actor', ...spec }); if (spec.walk) { const st = { p: 0 }; spec.walk.st = st; tl.to(st, { p: 1, duration: spec.walk.t1 - spec.walk.t0, ease: spec.walk.ease || 'power1.inOut' }, spec.walk.t0); } return spec; };
  // 自定义道具（每帧画）：K.prop((g, t, k) => {...}, {from, until, z})
  K.prop = (fn, { from = 0, until = 1e9, z = 1 } = {}) => { LAYER.push({ type: 'prop', fn, from, until, z }); return K; };
  K.actorPos = (a, t) => {
    if (a.walk) { const wk = a.walk; tl.time(clamp(t, 0, K.dur()), false); return lerp(wk.x0, wk.x1, wk.st.p); }
    return typeof a.x === 'function' ? a.x(t) : a.x;
  };
  function frameAt(a, t) {
    if (a.walk && t >= a.walk.t0 - 1e-6 && (!a.keys || t >= (a.walk.from ?? a.walk.t0))) {
      const x = lerp(a.walk.x0, a.walk.x1, a.walk.st.p), dist = Math.abs(x - a.walk.x0);
      return a.walk.keys[Math.floor(dist / (a.walk.step || 50)) % a.walk.keys.length];
    }
    let k = a.keys ? a.keys[0][1] : a.walk.keys[0];
    if (a.keys) for (const [kt, kk] of a.keys) if (t >= kt) k = kk;
    if (a.walk && t >= a.walk.t1) k = a.walk.keys[0];
    return k;
  }
  function rectOf(a, key, x) {
    const f = FI[key], s = a.h / (a.ref ? FI[a.ref].bottom : f.bottom);
    const axv = a.anchor === 'center' ? f.w / 2 : (f.ax ?? f.w / 2);
    const ax = a.flip ? f.w - axv : axv;
    return { x: x - ax * s, y: (a.ground - (a.lift ? a.lift : 0)) - f.bottom * s, w: f.w * s, h: f.h * s, s, f };
  }
  K.anchorOf = (a, t, name) => { const key = frameAt(a, t), x = K.actorPos(a, t), r = rectOf(a, key, x); const p = r.f[name]; const px = a.flip ? r.f.w - p[0] : p[0]; return [r.x + px * r.s, r.y + p[1] * r.s]; };
  function drawActor(g, a, t) {
    if (t < (a.reveal ?? a.from ?? 0) || t >= (a.until ?? 1e9)) return;
    const key = frameAt(a, t), x = K.actorPos(a, t), r = rectOf(a, key, x), im = IMG[key];
    const bob = (a.bob ? Math.abs(Math.sin(t * a.bob)) * -6 : 0) + (a.dy ? a.dy(t) : 0);   // dy(t)：跳起等竖直位移（只由 t 决定）
    const fade = a.fadeOut ? 1 - clamp((t - a.fadeOut[0]) / (a.fadeOut[1] - a.fadeOut[0])) : 1; if (fade <= 0) return;
    g.save(); g.globalAlpha = fade;
    const draw = () => { if (a.flip) { g.translate(r.x + r.w, r.y + bob); g.scale(-1, 1); g.drawImage(im, 0, 0, r.w, r.h); } else g.drawImage(im, r.x, r.y + bob, r.w, r.h); };
    if (a.reveal != null && t < a.reveal + 0.8) {                       // 之字形揭开（huashu Reveal）
      const zz = DG.zigzag(r.x - 10, r.y - 10, r.w + 20, r.h + 20, 6), cum = DG.cum(zz), L = cum[cum.length - 1], d = L * clamp((t - a.reveal) / 0.8);
      g.beginPath(); g.clip(DG.revealMask(zz, cum, d, (r.h + 20) / 6 * 1.15)); draw(); g.restore();
      return DG.pointAt(zz, cum, d);
    }
    draw(); g.restore(); return null;
  }

  // ---- 镜头 / 弹字 / 收尾 ----
  K.cam = (t, { x, y, z = 1, d = 0.8, ease = 'sine.inOut' }) => { tl.to(CAMS, { x, y, z, duration: d, ease }, t); return K; };
  K.camSet = (x, y, z = 1) => { Object.assign(CAMS, { x, y, z }); return K; };
  K.follow = fn => { follow = fn; return K; };                          // fn(t, cam) → cam
  // 橙色重音词：GSAP back.out 弹出；to:{x,y,size,t} 让位；out:t 淡出
  K.pop = (t, str, x, y, size = 90, { to = null, out = null, col = OR } = {}) => {
    const st = { s: 0, a: 0, x, y, size }; POPS.push({ str, st, col });
    tl.to(st, { s: 1, a: 1, duration: 0.38, ease: 'back.out(2.4)' }, t);
    if (to) tl.to(st, { x: to.x ?? x, y: to.y ?? y, size: to.size ?? size, duration: 0.6, ease: 'power2.inOut' }, to.t);
    if (out != null) tl.to(st, { a: 0, duration: 0.35, ease: 'none' }, out);
    return K;
  };
  K.shade = t => { tl.to(S, { shade: 1, duration: 0.5, ease: 'none' }, t); return K; };

  // ---- 中文讲解字幕（顶部）与英文朗读（底部逐词点亮）----
  K.narr = (zh, t0, t1) => { NARR.push({ zh, t0, t1 }); return K; };
  // K.say(t, 'He plays football.', { word:'plays', key:['plays'], zh:'他踢足球。', len }) → CUES + 底部字幕
  K.say = (t, en, { word = null, key = [], zh = '', len = null } = {}) => {
    CUES.push([t, en, word]);
    const words = en.split(/\s+/), pre = word ? 0.45 + word.split(/\s+/).length * 0.42 : 0, per = 0.36;
    const L = len ?? (pre + words.length * per + 0.9);
    SAYS.push({ t, en, zh, words, key: key.map(s => s.toLowerCase()), pre, per, t1: t + L });
    return K;
  };
  K.end = t => { dur = t; return K; };
  K.dur = () => dur;

  function wrap(c, s, maxW) { const out = []; let line = ''; for (const ch of s) { if (c.measureText(line + ch).width > maxW && line) { out.push(line); line = ch; } else line += ch; } if (line) out.push(line); return out; }
  function narrBar(c, t) {
    const n = NARR.find(n => t >= n.t0 && t < n.t1); if (!n) return;
    const a = clamp(Math.min((t - n.t0) / 0.25, (n.t1 - t) / 0.25));
    c.save(); c.globalAlpha = a; c.font = '40px WK'; const lines = wrap(c, n.zh, 1640);
    const h = lines.length * 54 + 30; c.fillStyle = 'rgba(251,251,251,.94)'; c.beginPath(); c.roundRect(110, 22, 1700, h, 18); c.fill();
    c.strokeStyle = 'rgba(10,5,3,.12)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = INK; c.textBaseline = 'alphabetic'; lines.forEach((l, i) => c.fillText(l, 140, 76 + i * 54)); c.restore();
  }
  function sayBar(c, t) {
    const s = SAYS.filter(s => t >= s.t - 0.15 && t < s.t1 + 0.6).pop(); if (!s) return;
    const a = clamp(Math.min((t - s.t + 0.15) / 0.25, (s.t1 + 0.6 - t) / 0.3));
    c.save(); c.globalAlpha = a; c.font = '58px Kalam'; c.textBaseline = 'alphabetic';
    const ws = s.words.map(w => c.measureText(w + ' ').width), tot = ws.reduce((x, y) => x + y, 0), sc = Math.min(1, 1640 / tot);
    c.translate(W / 2, 0); c.scale(sc, sc);
    let x = -tot / 2; const y0 = s.zh ? 930 : 960;
    c.fillStyle = 'rgba(251,251,251,.93)'; c.beginPath(); c.roundRect(x - 36, y0 - 8, tot + 52, s.zh ? 136 : 92, 20); c.fill();
    s.words.forEach((w, i) => { const on = t >= s.t + s.pre + i * s.per; const isKey = s.key.includes(w.toLowerCase().replace(/[^a-z'\-]/g, '')); c.fillStyle = on ? (isKey ? OR : INK) : '#b8b8b4'; c.fillText(w, x, y0 + 62); x += ws[i]; });
    if (s.zh) { c.font = '34px WK'; c.fillStyle = GREY; c.textAlign = 'center'; c.fillText(s.zh, 0, y0 + 112); }
    c.restore();
  }
  function popWord(g, p) {
    const st = p.st; if (st.a <= 0) return;
    g.save(); g.font = `${st.size}px Kalam, WK`; g.fillStyle = p.col; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.globalAlpha = clamp(st.a); g.translate(st.x, st.y - st.size * 0.35); g.scale(st.s, st.s); g.fillText(p.str, 0, st.size * 0.35); g.restore();
  }
  function penPos(ft, cam, tip) {
    const hs = B.S.filter(s => s.kind !== 'pop' && s.kind !== 'fill');
    const p = B.penAt(ft, cam, tip); if (tip) return p;
    const prev = [...hs].reverse().find(s => s.t1 <= ft), next = hs.find(s => s.t0 > ft);
    const dPrev = prev ? ft - prev.t1 : 9, dNext = next ? next.t0 - ft : 9;
    if (dPrev < 0.25 && dNext < 0.25) return p;
    const q = Math.min(MO.cubicIn(clamp(dPrev / 0.35)), MO.cubicIn(clamp(dNext / 0.35)));
    if (q >= 1) return null;
    return [lerp(p[0], W + 160, q), lerp(p[1], H + 220, q)];
  }

  K.done = () => {
    if (!dur) dur = Math.max(B.cur, ...SAYS.map(s => s.t1)) + 1.5;
    tl.set({}, {}, dur);
    const loadAssets = () => Promise.all(Object.entries(FR).map(([k, src]) => new Promise(res => { const im = new Image(); im.onload = im.onerror = () => res(); im.src = src; IMG[k] = im; })));
    const drawFrame = (c, t) => {
      tl.time(clamp(t, 0, dur), false);
      c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = BOARD; c.fillRect(0, 0, W, H);
      let cam = { ...CAMS }; if (follow) cam = follow(t, cam);
      c.save(); CAM.apply(c, cam);
      let { tip, col } = B.draw(c, t);
      for (const l of [...LAYER].sort((a, b) => a.z - b.z)) {
        if (l.type === 'prop') { if (t >= l.from && t < l.until) l.fn(c, t, K); }
        else { const p = drawActor(c, l, t); if (p) { tip = p; col = INK; } }
      }
      POPS.forEach(p => popWord(c, p));
      c.restore();
      if (S.shade > 0) { c.fillStyle = `rgba(238,238,236,${0.35 * S.shade})`; c.fillRect(0, 0, W, H); }
      const pp = penPos(t, cam, tip); if (pp) DG.pen(c, pp[0], pp[1], col || B.penColor(t));
      narrBar(c, t); sayBar(c, t);
    };
    return { W, H, DUR: dur, CUES, drawFrame, loadAssets, NARR, SAYS };
  };
  return K;
}
