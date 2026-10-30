// He takes the dog out. —— 白板手绘（huashu-art-motion y3 语法）＋ AI 帧库角色（10-角色 C 法）
// 时间只由 t 决定（确定性）。Remotion 每帧调用 drawFrame(ctx, t)；App 里的 Player 也调同一个函数。
import './huashu_libs.js';
import './assets.js';

export const W = 1920, H = 1080, FPS = 30, DUR = 11.5;
const INK = '#0A0503', OR = '#EF7226', BOARD = '#FBFBFB';
const GROUND = 880, DOORX = 780;
const { clamp, lerp } = U;
const MOx = MO;

// ---------- 资源 ----------
const IMG = {};
export function loadAssets(fontUrls) {
  const ps = Object.entries(window.FR).map(([k, src]) => new Promise(res => { const im = new Image(); im.onload = () => res(); im.src = src; IMG[k] = im; }));
  const fonts = [['WK', fontUrls.wk], ['Kalam', fontUrls.kalam]].map(([n, u]) => new FontFace(n, `url(${u})`).load().then(f => document.fonts.add(f)));
  return Promise.all([...ps, ...fonts]);
}
const FI = () => window.FI;

// ---------- 角色摆放（世界坐标，脚底落在 GROUND） ----------
// k1 弯腰拿钩子 / k2 扣上项圈 / k3 起身、小狗跳起：三张组合关键帧，右缘（小狗）对齐
const KF = { k1: { s: 0.52, right: 735 }, k2: { s: 0.56, right: 735 }, k3: { s: 0.53, right: 760 } };
function kRect(k) { const f = FI()[k], o = KF[k]; const w = f.w * o.s, h = f.bottom * o.s; return { x: o.right - w, y: GROUND - h, w, h: f.h * o.s, s: o.s }; }
const SB = 0.69, SD = 0.5;                      // 走路帧：男孩、小狗缩放
const STEP = 50;                                 // 每走 50 世界像素换一帧（有限动画）
const T_WALK0 = 5.6, T_WALK1 = 8.7;
const BOY0 = 520, BOY1 = 1060;                   // 男孩头部 x：起点（门里）→ 终点（门外）
function ramp(t, a, b) { const q = clamp((t - a) / (b - a)), e = 0.15; return q < e ? q * q / (2 * e * (1 - e)) : q > 1 - e ? 1 - (1 - q) * (1 - q) / (2 * e * (1 - e)) : (q - e / 2) / (1 - e); }
const boyX = t => lerp(BOY0, BOY1, ramp(t, T_WALK0, T_WALK1));
const dogGap = t => lerp(150, 215, MOx.sineInOut(clamp((t - T_WALK0) / 0.8)));

function drawSprite(g, key, ax, axKey, s) {   // ax：锚点（头或项圈）落在世界 x；脚底落地
  const f = FI()[key], im = IMG[key]; const x = ax - f[axKey] * s, y = GROUND - f.bottom * s;
  g.drawImage(im, x, y, f.w * s, f.h * s); return { x, y, s, f };
}
function drawChars(g, t) {
  if (t < 5.5) {
    const k = t < 3.55 ? 'k1' : t < 4.35 ? 'k2' : 'k3', r = kRect(k);
    g.drawImage(IMG[k], r.x, r.y, r.w, r.h); return;
  }
  const bx = boyX(t), dist = bx - BOY0;
  const bi = Math.floor(dist / STEP) % 4, di = (Math.floor(dist / STEP) + 1) % 4;
  const dx = bx + dogGap(t);
  const d = drawSprite(g, 'd' + di, dx, 'ax', SD);
  const b = drawSprite(g, 'w' + bi, bx, 'ax', SB);
  // 牵绳：男孩拳头 → 小狗项圈，按距离下垂
  const h = [b.x + b.f.hand[0] * SB, b.y + b.f.hand[1] * SB], c = [d.x + d.f.collar[0] * SD, d.y + d.f.collar[1] * SD];
  const span = Math.hypot(c[0] - h[0], c[1] - h[1]), sag = Math.max(10, 120 - span * 0.45);
  g.save(); g.strokeStyle = OR; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(h[0], h[1]); g.quadraticCurveTo((h[0] + c[0]) / 2, Math.max(h[1], c[1]) + sag, c[0], c[1]); g.stroke();
  g.fillStyle = '#9aa0a6'; g.beginPath(); g.arc(c[0], c[1], 6, 0, 7); g.fill(); g.restore();
}

// ---------- 白板笔画时间线 ----------
const B = DG.board({ ink: INK, lw: 6.5, speed: 2600, font: 'Kalam, WK' });
const R = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
B.at(0.15);
B.line([[60, GROUND], [1860, GROUND]], { speed: 4200 });
B.line([[160, GROUND], [160, 470]]);
B.line([[110, 500], [470, 250], [830, 500]]);
B.line([[160, 470], [DOORX, 470]], { w: 5 });
B.line([[DOORX, 470], [DOORX, 640]]);
B.line([[DOORX, 640], [DOORX, GROUND]], { w: 4, speed: 3000 });
B.line([[DOORX, 640], [890, 615], [890, 905], [DOORX, GROUND]], { w: 5, smooth: false });   // 门板向外打开
B.line([[868, 760], [868, 782]], { w: 6, smooth: false });             // 门把手
B.line(R(230, 560, 330, 640), { w: 4.5, smooth: false });             // 墙上的小画框
B.line([[245, 625], [275, 590], [295, 612], [315, 585]], { w: 4 });
B.line(DG.arcPts(300, 868, 44, 12, 0, Math.PI, 18), { w: 4.5 });      // 狗碗
B.text('家里', 400, 410, 64, { rate: 7.5 });
// 角色：Reveal 画法（笔尖在包围盒里走之字形，走过处揭开线稿）
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
// 第二镜：扣上的一瞬间，钩子边上画三道橙色「咔」线，takes 弹出
const HOOK = [690, 770];
B.at(3.58);
B.line(DG.arcPts(HOOK[0] - 6, HOOK[1] + 6, 62, 30, -2.6, -2.6 + Math.PI * 2.1, 40), { col: OR, w: 5, speed: 1700 });   // 橙圈：扣上的位置
B.at(3.85); B.pop('takes', 560, 540, 80, { col: OR });
// 第三镜：跨过门线时，门外弹出 out
B.at(6.75); B.pop('out!', 960, 450, 92, { col: OR });
// 第四镜：手画一支橙箭头，从门里指到门外，写 take out / 带……出去
B.at(9.0);
B.line([[380, 935], [700, 945], [1050, 940], [1420, 928]], { col: OR, w: 8, speed: 1500 });
B.line([[1380, 900], [1424, 928], [1382, 960]], { col: OR, w: 8, smooth: false, speed: 1500 });
B.text('take out', 1480, 640, 96, { col: OR, rate: 12 });
B.text('带……出去', 1485, 750, 66, { rate: 9 });
export const TIMELINE = B.S.map(s => [s.kind, +s.t0.toFixed(2), +s.t1.toFixed(2)]);

// ---------- 相机 ----------
function camAt(t) {
  const full = { x: 960, y: 560, z: 1 };
  if (t < 3.0) return full;
  const tight = { x: 640, y: 690, z: 2.05 };
  if (t < 4.9) { const e = MOx.cubicInOut(clamp((t - 3.0) / 0.3)); return { x: lerp(full.x, tight.x, e), y: lerp(full.y, tight.y, e), z: CAM.zlerp(1, tight.z, e) }; }   // 快推（重音）
  const mid = z => ({ x: clamp(boyX(t) + 170, 700, 1300), y: 640, z });
  if (t < 9.6) { const e = MOx.sineInOut(clamp((t - 4.9) / 0.7)), m = mid(1.3); return { x: lerp(tight.x, m.x, e), y: lerp(tight.y, m.y, e), z: CAM.zlerp(tight.z, m.z, e) }; }   // 拉回 → 横移跟随
  const e = MOx.sineInOut(clamp((t - 9.6) / 1.0)), m = mid(1.3), end = { x: 960, y: 600, z: 0.96 };
  return { x: lerp(m.x, end.x, e), y: lerp(m.y, end.y, e), z: CAM.zlerp(m.z, end.z, e) };   // 拉远看全图
}

// ---------- 笔：画的时候在笔尖，空档长于 0.35s 就退出右下 ----------
function penPos(ft, cam, tip) {
  const hs = B.S.filter(s => s.kind !== 'pop' && s.kind !== 'fill');
  const near = hs.some(s => ft > s.t0 - 0.35 && ft < s.t1 + 0.35);
  const p = B.penAt(ft, cam, tip);
  if (tip) return p;
  const prev = [...hs].reverse().find(s => s.t1 <= ft), next = hs.find(s => s.t0 > ft);
  const off = [W + 160, H + 220];
  const dPrev = prev ? ft - prev.t1 : 9, dNext = next ? next.t0 - ft : 9;
  if (dPrev < 0.25 && dNext < 0.25) return p;
  const q = Math.min(MOx.cubicIn(clamp(dPrev / 0.35)), MOx.cubicIn(clamp(dNext / 0.35)));
  return near || q < 1 ? [lerp(p[0], off[0], q), lerp(p[1], off[1], q)] : null;
}

// ---------- 字幕（屏幕空间）：读到哪个词，哪个词亮 ----------
const WORDS = [['He', 2.7], ['takes', 3.75], ['the', 2.9], ['dog', 3.0], ['out.', 6.75]];
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
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = BOARD; c.fillRect(0, 0, W, H);
  const cam = camAt(t);
  c.save(); CAM.apply(c, cam); const { tip, col } = B.draw(c, t); c.restore();
  // 拉远后整板铺一层很浅的灰（RSA 收尾）
  if (t > 10.7) { c.fillStyle = `rgba(238,238,236,${0.35 * clamp((t - 10.7) / 0.5)})`; c.fillRect(0, 0, W, H); }
  const pp = penPos(t, cam, tip); if (pp) DG.pen(c, pp[0], pp[1], col || B.penColor(t));
  caption(c, t);
}
