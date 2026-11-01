// 第一性原理 · 有界无界 · 1 ——「全部手绘」样板（§2.9 v5.1 标准画法，2026-11-01）
// 用户原话：「现在动画实现整体不好，动作不真实，白板动画不是手绘的，我记得以前你可以全部手绘来完成动作」
//         + 硬性要求：倒咖啡用手冲咖啡壶；倒的时候壶嘴低于壶身、朝下对杯口，液流从壶嘴尖出、成抛物线落进杯，液面上升；不倒时壶嘴朝上斜。
// 与 gen_boundedness_1.js（模板 fp_boundedness_1_v3.js，T16 车道在改，本文件不碰它们）相比：
//   · 内容层不变：KNOW 19 条逐字一致、啊哈卡、四幕 Hook / Mechanism / Transfer / Punchline、预测停顿、规则最后命名、朗读句与中文；
//   · 画法全换：所有道具（咖啡壶、马克杯、玻璃杯、刀、苹果、面包、语法书、纸、作业本、碗、桌子、招牌、数字块、要点卡）都是 rough.js
//     线条逐笔画出、笔尖跟随、两遍描边、hachure 描完淡入（lib/hd.js）；会动的道具画完以后整件按 t 移动 / 旋转；
//   · 0 个 emoji（板上、字幕、要点卡都没有）；只用墨色 + 单强调色 #EF7226（浅橙只作辅助排线）；
//   · 人物 = AI 关键姿势帧：店员 bar_*（新生成，绿幕 → build_sprites.py），Linda lin_*（新生成）；不用代码画人，换帧硬切、脚底线不变；
//   · 动作物理：倒咖啡 lib/pour.js（姿势表驱动壶的位姿，倾角过阈值才出流，抛物线液柱，液面随倒出量上升，断流先于回正）；
//     切 = 蓄势抬刀 → 落刀（刀刃朝下、刃口跨过被切物）→ 两半分开（同一个苹果裁成两半，体积不增）。
import { scene, OR, OR2, INK, GREY, BOARD } from '../wb5.js';
import { concept, track } from '../lib/concept.js';
import { hd, KETTLE, MUG, KNIFE_HD, APPLE, BREAD, BOOK, GLASS, SHEET, WORKBOOK, BOWL } from '../lib/hd.js';
import { pourRig, assertPour, drawStream, FEET } from '../lib/pour.js';
import * as SB from '../sprites/bndhd.js';   // 店员 bar_*（2026-11-01 新生成）
import * as SL from '../sprites/lindahd.js';  // Linda lin_*（2026-11-01 新生成）

export const KNOW = [
  '书上说 coffee 不加 -s，咖啡馆里却说 Two coffees！谁错了？',
  '咖啡倒出来是一大摊，分不出「一个」来，数不出一、二、三。',
  '装进杯子，就把它看成「一杯」了。看成一个个的，就能数：两杯咖啡。',
  'Two coffees, please.',
  '苹果切一刀，就不是「一个苹果」了：它是一个个的单位 → 可数，an apple、two apples。',
  '面包切一刀，两块还是面包；水倒一半还是水：切开、倒走还是它自己，是一摊 → 不可数，不说 a bread。',
  'I have an apple. You have two apples.',
  'I like bread and water.',
  '想数一摊的东西？借个单位：一杯、一张、一碗。',
  'A glass of milk, please.',
  '两张纸：-s 加在单位 piece 上，paper 不加。',
  'Two pieces of paper. A piece of bread.',
  'homework 是一大类事，不加 -s；试卷 papers 是一份份的，能加。',
  'I have a lot of homework.',
  '一碗米饭切一刀还是米饭——rice 能加 -s 吗？',
  '揭晓：还是米饭 → 不可数：two bowls of rice，-s 在 bowl 上。米粒再分明，也整摊看。',
  'I want two bowls of rice.',
  '口诀：一刀下去还是它，不可数来不加 s',
  '记住：看成一个个的，就能数；看成一摊的，不能直接数。',
];

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const io = q => (q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2);
const backOut = q => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(q - 1, 3) + c1 * Math.pow(q - 1, 2); };
const readT = s => { const cjk = (String(s).match(/[\u3400-\u9fff]/g) || []).length; const en = (String(s).replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;
const LIN_FEET = 104.7;                                         // Linda 帧脚底 4% 带质心 x（7 帧一致）
const LFIST = { lin_cut0: [200, 112], lin_cut1: [240, 226] };   // Linda 举刀 / 落刀帧的拳头握点（帧内像素，未翻转）

export default function build() {
  // 两套关键帧合成一个库；水平锚点改成脚底 4% 带质心（换帧时脚不滑）
  const SP = { FR: { ...SB.FR, ...SL.FR }, FI: {} };
  for (const [k, v] of Object.entries({ ...SB.FI, ...SL.FI })) SP.FI[k] = { ...v, ax: FEET[k] ?? (k.startsWith('lin_') ? LIN_FEET : v.ax) };
  const K = scene({ sprites: SP }), C = concept(K), H = hd(K);
  C.aha({
    see: '同一间咖啡馆里：桌上语法书写着 coffee 不加 -s，Linda 却端着咖啡听见 Two coffees；数字块飞去贴咖啡，全滑了下来',
    guess: '咖啡装进杯子以后能数吗？面包切开还数不数？rice 能不能加 -s？',
    reveal: '数字贴得住的，是能看成一个个的地方：杯子里是一杯、数字弹出；苹果切开「一个」没了，面包切开还是面包；-s 被 paper 弹开、落到单位 pieces / bowls 上',
    rule: '可不可数，看英语把它看成一个个还是一摊；一摊的要数就借个单位，-s 加在单位上（这条看法留到最后揭晓）',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.4; };
  const D = Math.PI / 180;
  const MC = document.createElement('canvas').getContext('2d');
  // 逐字手写（与引擎 B.text 同一画法：笔尖在字框里之字形来回揭开），多一个 fade:[t0,t1] 擦掉
  const hand = (str, x, y, size, { t0 = K.cur, col = INK, rate = 14, align = 'center', fade = null, z = null } = {}) => {
    const font = `${size}px Kalam, WK`; C.TEXTS.push(str); MC.font = font;
    const chars = [...str], ws = chars.map(ch => MC.measureText(ch).width), w = ws.reduce((a, b) => a + b, 0), x0 = align === 'center' ? x - w / 2 : x;
    const t1 = t0 + chars.length / rate;
    const paint = (g, q, ft, ink) => {   // ink=false：只算笔尖不落墨（字画在别的层时，引擎的笔仍跟着这一笔走）
      const a = fade ? 1 - clamp((ft - fade[0]) / (fade[1] - fade[0])) : 1; if (a <= 0) return null;
      const n = chars.length, k = Math.min(n, q * n), done = Math.floor(k); let xx = x0, tip = null;
      if (ink) { g.save(); g.globalAlpha = a; g.font = font; g.fillStyle = col; g.textBaseline = 'alphabetic'; g.textAlign = 'left'; }
      chars.forEach((ch, i) => {
        if (i < done) { if (ink) g.fillText(ch, xx, y); }
        else if (i === done && k < n) { const zz = DG.zigzag(xx - 2, y - size * 0.95, ws[i] + 4, size * 1.15, 3), cum = DG.cum(zz), dd = cum[cum.length - 1] * (k - done);
          if (ink) { g.save(); g.clip(DG.revealMask(zz, cum, dd, size * 0.62)); g.fillText(ch, xx, y); g.restore(); } tip = DG.pointAt(zz, cum, dd); }
        xx += ws[i];
      });
      if (ink) g.restore(); return q < 1 ? (tip || [x0 + w, y]) : null;
    };
    K.B.push({ kind: 'custom', t0, t1, col, start: () => [x0, y - size * 0.3], end: () => [x0 + w, y - size * 0.3], draw: (g, q, ft) => paint(g, q, ft, z == null) });
    if (z != null) K.prop((g, ft) => paint(g, clamp((ft - t0) / (t1 - t0)), ft, true), { from: t0, until: 1e9, z });
    return { x0, w, t1 };
  };
  // 手画对勾（不用对勾字符：不同平台可能落到彩色 emoji 字体）
  const tick = (x, y, t0, fade) => H.sketch([{ d: 'M-14 0 L-4 12 L18 -16', col: OR, w: 5, rough: 0.7 }], { t0, speed: 600, xf: () => ({ x, y }), z: 4, fade });
  // 数字块 / 词尾块：手画圆圈逐笔画出 → 里面的字淡入；位置 = xf(t)（只由 t 决定）
  const token = (txt, xf, { t0, size = 40, col = INK, ring = INK, r = 30, z = 4.5, fade = null } = {}) => {
    C.TEXTS.push(txt);
    H.sketch([{ shape: (o, RG) => RG.circle(0, 0, r * 2, o), col: ring, w: 4, rough: 1.3 }], { t0, speed: 1500, xf, z, fade,
      after: (g, t) => { const a = clamp((t - t0 - 0.18) / 0.2); if (a <= 0) return; g.globalAlpha *= a; g.font = `${size}px Kalam, WK`; g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, 3); } });
  };
  const at = (keys, out = null) => t => { const p = track(keys, t); return { x: p[0], y: p[1], a: out ? 1 - clamp((t - out[0]) / (out[1] - out[0])) : 1 }; };
  // 落体：t0 起从 p0 以初速 v 受重力下落到 yEnd（y 到底后贴住），只由 t 决定
  const fall = (p0, v, t0, yEnd, g0 = 2200) => t => { const u = Math.max(0, t - t0); return [p0[0] + v[0] * u, Math.min(yEnd, p0[1] + v[1] * u + 0.5 * g0 * u * u)]; };
  const spring = (u, zeta = 0.45, wn = 13) => { if (u <= 0) return 0; const wd = wn * Math.sqrt(1 - zeta * zeta); return 1 - Math.exp(-zeta * wn * u) * (Math.cos(wd * u) + (zeta * wn / wd) * Math.sin(wd * u)); };

  // ===== 舞台几何 =====
  const GROUND = 900, BXF = 380, LX = 1640, LH = 470;
  const BAR = { x: BXF, ground: GROUND, h: 620, FI: SP.FI };
  const CS = 0.45;
  const M0 = 13.2;
  const POSES = [[0, 'rest'],
    [M0 + 0.2, 'reach'], [M0 + 0.55, 'lift'], [M0 + 0.95, 'pour'], [M0 + 5.0, 'lift'],
    [M0 + 8.6, 'pour'], [M0 + 10.7, 'lift'],
    [M0 + 12.0, 'pour'], [M0 + 14.1, 'lift'],
    [M0 + 15.3, 'reach'], [M0 + 15.65, 'rest']];
  const rig = pourRig(BAR, POSES), TY = rig.TY;
  const tilt0 = M0 + 0.95 + 0.85 + 0.6;
  const cupMid = TY - CS * 60;
  const CUPX = (() => { const tt = M0 + 8.6 + 1.2, tip = rig.tipAt(tt), v = rig.vel(tt), u = rig.landU(tip, v, cupMid); return Math.round(tip[0] + v[0] * u); })();
  const SERVE = [930, 1060];
  // ---- Linda 的刀：拳头握点（帧内像素，帧是翻转显示的）→ 世界坐标；切的位置由刀的几何反算（刃口中点落在砧板上）----
  const LS = LH / SP.FI.lin_stand.bottom;
  const lfist = key => [LX - (LFIST[key][0] - LIN_FEET) * LS, GROUND - (SP.FI[key].bottom - LFIST[key][1]) * LS];
  const KS = 0.62, KUP = [...lfist('lin_cut0'), -15 * D], KWIND = [lfist('lin_cut0')[0] + 2, lfist('lin_cut0')[1] - 4, 2 * D], KCHOP = [...lfist('lin_cut1'), -30 * D];
  const kw = (k, p) => H.world({ x: k[0], y: k[1], r: k[2], s: KS }, p);
  const EM = kw(KCHOP, KNIFE_HD.EDGE_MID), AX = Math.round(EM[0]), BY = EM[1] + 1, TY2 = BY + 8;    // 切点 x、砧板面、矮桌面
  { const n = [-Math.sin(KCHOP[2]), Math.cos(KCHOP[2])]; if (!(n[1] > 0.5)) throw new Error('切的断言：落刀时刃口没有朝下');
    const up = kw(KUP, KNIFE_HD.EDGE_MID); if (!(up[1] < BY - 2 * APPLE.R - 10)) throw new Error('切的断言：抬刀时刃口不在苹果上方'); }

  // ===== 固定舞台 + Step 1 道具（逐笔画出，顺序 = 讲的顺序：书 → 咖啡馆 → 店员 → 顾客）=====
  const F1 = [M0 + 6.8, M0 + 7.3];
  K.at(0.15);
  K.line(60, GROUND, 1860, GROUND, { speed: 6000, rough: 0.6, bow: 0.4 });
  K.path([[455, TY], [1150, TY]], { w: 6, rough: 0.7, speed: 5200 });
  K.path([[455, TY + 16], [1150, TY + 16]], { w: 3.5, rough: 0.9, speed: 6000, col: GREY, min: 0.08 });
  K.line(500, TY + 16, 500, GROUND, { w: 5, rough: 0.8, min: 0.08 }); K.line(1110, TY + 16, 1110, GROUND, { w: 5, rough: 0.8, min: 0.08 });
  K.path([[1250, TY2], [1610, TY2]], { w: 6, rough: 0.7, speed: 5200 });                               // 矮桌（客人一侧）
  K.line(1280, TY2 + 4, 1280, GROUND, { w: 5, rough: 0.8, min: 0.08 }); K.line(1580, TY2 + 4, 1580, GROUND, { w: 5, rough: 0.8, min: 0.08 });
  const book = H.sketch([{ d: BOOK.left, w: 4.5, fill: OR2, fillW: 1.8, gap: 13 }, { d: BOOK.right, w: 4.5, fill: OR2, fillW: 1.8, gap: 13 }, ...BOOK.lines.map(d => ({ d, w: 2.6, col: GREY, min: 0.04 }))],
    { t0: K.cur, speed: 2200, xf: () => ({ x: 985, y: TY, s: 0.9 }), z: 2, fade: F1 });
  const c1 = hand('coffee', 955, TY - 110, 46, { t0: book.t1 + 0.05, rate: 11, fade: F1 });
  const c2 = hand('-s', 955 + c1.w / 2 + 34, TY - 110, 46, { t0: c1.t1 + 0.05, rate: 7, col: OR, fade: F1 });
  K.at(c2.t1 + 0.05); K.cross(c2.x0 - 6, TY - 140, c2.x0 + c2.w + 8, TY - 104, { w: 4, fade: F1 });
  K.rect(640, 196, 300, 88, { w: 4.5, rough: 1.2, fill: OR2, fillW: 2, speed: 3200 });
  K.line(700, 196, 720, 160, { w: 3, rough: 0.6, min: 0.05 }); K.line(880, 196, 860, 160, { w: 3, rough: 0.6, min: 0.05 });
  const sign = hand('萌星咖啡馆', 790, 256, 50, { t0: K.cur, rate: 12 });
  const tBar = sign.t1 + 0.05;
  K.actor({ keys: rig.frames, x: BXF, ground: GROUND, h: 620, ref: 'bar_stand', reveal: tBar, z: 1 });
  let T = 0.5;
  // @step1_hook —— 冲突：同一张桌子上，书说不加 -s，咖啡馆里却在数
  C.step(1, T);
  // 店员把顾客点的单念出来：手画对话气泡 + 逐字手写
  const FB = [M0 - 0.8, M0 - 0.3];
  K.at(tBar + 0.85); K.ellipse(660, 360, 400, 116, { w: 4.5, rough: 1.2, speed: 2800, fade: FB });
  K.path([[500, 400], [440, 420], [470, 384]], { w: 4.5, rough: 0.8, min: 0.06, fade: FB });
  const bub = hand('Two coffees, please!', 660, 376, 40, { t0: K.cur, rate: 16, fade: FB });
  MC.font = '40px Kalam, WK'; const twoW = MC.measureText('Two ').width, cfW = MC.measureText('coffees,').width;
  K.at(bub.t1 + 0.05); K.under(bub.x0 + twoW, bub.x0 + twoW + cfW, 392, { fade: FB });
  const tLin = K.cur + 0.05;
  const LK = [[tLin, 'lin_stand']];
  // Linda 头上的问号（手画）：想不通
  const tQ = tLin + 0.85;
  const qm = H.sketch([{ d: 'M-18 -34 Q-18 -64 12 -64 Q40 -62 36 -34 Q32 -14 8 -4 L6 16', col: OR, w: 6, rough: 0.9 }, { shape: (o, RG) => RG.circle(6, 36, 9, o), col: OR, w: 6, min: 0.05 }], { t0: tQ, speed: 900, xf: () => ({ x: 1545, y: 360 }), z: 4, fade: [9.9, 10.2] });
  // 壶：店员身边的桌上逐笔画出（Step 2 她要用）
  K.at(qm.t1 + 0.1);
  const kettle = H.sketch([
    { d: KETTLE.body, w: 5.5, fill: OR2, fillW: 2.2, gap: 11, solid: BOARD },
    { d: KETTLE.lid, w: 4.5 }, { d: KETTLE.knob, w: 4.5, min: 0.05 },
    { d: KETTLE.handle, w: 6 },
    { d: KETTLE.spoutOut, w: 4.5 }, { d: KETTLE.spoutIn, w: 4.5 }, { d: KETTLE.spoutCap, w: 4, min: 0.04 },
  ], { t0: K.cur, speed: 1700, xf: rig.xf, z: 3 });
  T = Math.max(T, 0.5);
  LK.push([tQ + 0.6, 'lin_think']);
  T = narr(KNOW[0], T + 0.4, 5);
  LK.push([T - 1.2, 'lin_idea']);
  T = say(T + 0.2, KNOW[3], '请来两杯咖啡。', ['coffees']);
  // 想到一点：橙色感叹号接替问号
  H.sketch([{ d: 'M0 -60 L-2 -8', col: OR, w: 7, rough: 0.8 }, { shape: (o, RG) => RG.circle(-2, 14, 9, o), col: OR, w: 6, min: 0.05 }], { t0: T, speed: 700, xf: () => ({ x: 1545, y: 360 }), z: 4, fade: [M0 + 0.2, M0 + 0.6] });
  T = Math.max(T + 2.6, M0);
  if (T > M0 + 1e-6) throw new Error(`Step 1 结束 ${T.toFixed(2)}s 晚于倒咖啡起点 M0=${M0}`);

  // @step2_mechanism —— 机制：倒出来是一大摊（数字贴不住）→ 装进杯子是一杯（数字弹出）→ 一刀切测试
  C.step(2, M0);
  assertPour(rig, tilt0, TY, null, 0);
  assertPour(rig, M0 + 8.6 + 1.2, cupMid, CUPX, CS * 50);
  K.cam(M0 + 0.5, { x: 700, y: 520, z: 1.7, d: 0.45, ease: 'power3.inOut' });
  K.cam(M0 + 5.4, { x: 900, y: 540, z: 1.25, d: 0.8 });
  K.cam(M0 + 8.0, { x: 660, y: 530, z: 2.05, d: 0.45, ease: 'power3.inOut' });
  K.cam(M0 + 14.4, { x: 960, y: 540, z: 1.0, d: 0.9 });
  LK.push([M0 + 0.4, 'lin_stand']);
  // ---- 液柱 + 桌上一摊 ----
  const PUD = rig.stream(tilt0, TY).landX;
  const LANDS = [];
  K.prop((g, t) => {
    const a = rig.amount(t, 0); if (a <= 0) return;
    const fade = 1 - clamp((t - (M0 + 7.0)) / 0.6); if (fade <= 0) return;
    const spread = a + 0.25 * clamp((t - rig.W[0][1]) / 1.5);
    const rx = 18 + 150 * Math.sqrt(Math.min(1.25, spread)), ry = 5 + 7 * Math.sqrt(Math.min(1.25, spread)), cx = PUD + rx * 0.55;
    const p = new Path2D(); for (let i = 0; i <= 48; i++) { const th = i / 48 * Math.PI * 2, rr = 1 + 0.06 * Math.sin(3 * th + 1.3) + 0.04 * Math.sin(5 * th);
      const x = cx + Math.cos(th) * rx * rr, y = TY - 2 + Math.sin(th) * ry * rr; i ? p.lineTo(x, y) : p.moveTo(x, y); } p.closePath();
    H.hatchFill(g, p, { col: INK, gap: 5, w: 2, a: 0.75 * fade, box: [cx - rx - 10, TY - 30, 2 * rx + 20, 60] });
    g.save(); g.globalAlpha = fade; g.strokeStyle = INK; g.lineWidth = 3; g.stroke(p);
    for (const [lt, lx] of LANDS) { const u = (t - lt) / 0.8; if (u > 0 && u < 1) { g.globalAlpha = 0.6 * (1 - u) * fade; g.lineWidth = 2.5; g.beginPath(); g.ellipse(lx, TY - 4, 8 + u * 36, (8 + u * 36) * 0.22, 0, 0, 7); g.stroke(); } }
    g.restore();
  }, { from: M0 + 1, until: M0 + 7.7, z: 2 });
  K.prop((g, t) => {
    for (let i = 0; i < rig.W.length; i++) {
      const [on, off] = rig.W[i]; if (t < on || t > off + 0.6) continue;
      const yT = i === 0 ? TY - 3 : TY - CS * (8 + 98 * 0.82 * rig.amount(t, i));
      drawStream(g, rig.stream(t, yT), t, { w: 5 });
    }
  }, { from: M0 + 1, until: M0 + 15, z: 2.5 });
  // 数字块贴一摊：落上去 → 贴不住，顺着摊开的咖啡滑走、沉下去（淡出）
  [[M0 + 2.2, '1', 900, 0], [M0 + 3.5, '2', 960, 60], [M0 + 4.8, '3', 1020, 25]].forEach(([t0, n, sx, dx]) => {
    const land = t0 + 0.75, lx = PUD + 40 + dx; LANDS.push([land, lx]);
    token(n, at([[t0, [sx, 380]], [t0 + 0.05, [lx, TY - 22], 0.7, 'io'], [land + 0.1, [lx + 95, TY - 12], 1.1, 'io']], [land + 0.8, land + 1.3]), { t0, size: 34, r: 24 });
  });
  // ---- 两只马克杯：逐笔画出 → 倒满（液面上升）→ 推给客人 → 数字徽章 ----
  const F2 = [0, 0];   // Step 2 道具擦掉的时间窗（Step 3 开头填）
  const fadeF2 = t => (F2[0] ? 1 - clamp((t - F2[0]) / (F2[1] - F2[0])) : 1);
  const slideT = [M0 + 10.85, M0 + 14.25];
  const cupX = (n, t) => CUPX + (SERVE[n] - CUPX) * io(clamp((t - slideT[n]) / 0.7));
  const mugParts = [{ d: MUG.body, w: 5 }, { d: MUG.rim, w: 4.5 }, { d: MUG.rimBack, w: 3, col: GREY }, { d: MUG.handle, w: 5 }];
  const inner = new Path2D('M-58 -116 L-50 -8 L50 -8 L58 -116 Z');
  [M0 + 7.75, M0 + 11.15].forEach((tc, n) => {
    const i = n + 1;
    H.sketch(mugParts, { t0: tc, speed: 1100, z: 2.6, xf: t => ({ x: cupX(n, t), y: TY, s: CS, a: fadeF2(t) }),
      after: (g, t) => {
        const f = 0.82 * rig.amount(t, i); if (f <= 0) return;
        const u = t - slideT[n], slosh = u > 0 ? Math.sin(u * 10) * Math.exp(-u * 3) * 7 : 0;   // 推杯时液面晃（惯性）
        const y = -8 - 98 * f;
        const p = new Path2D(); p.moveTo(-60, y + slosh); p.lineTo(60, y - slosh); p.lineTo(60, 0); p.lineTo(-60, 0); p.closePath();
        g.save(); g.clip(inner); H.hatchFill(g, p, { col: INK, gap: 9, w: 3.2, a: 0.8 * g.globalAlpha, box: [-70, -130, 140, 140] });
        g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); g.moveTo(-60, y + slosh); g.lineTo(60, y - slosh); g.stroke(); g.restore();
      } });
  });
  const steamOn = M0 + 12.4;
  K.prop((g, t) => {   // 热气：两缕手画波纹线，从杯口往上「画出来」再淡掉，循环（相位只由 t 决定）
    const a0 = fadeF2(t); if (a0 <= 0) return;
    g.save(); g.strokeStyle = GREY; g.lineWidth = 3.2; g.lineCap = 'round';
    SERVE.forEach((cx, n) => { if (t < slideT[n] + 0.8) return; for (let k = 0; k < 2; k++) {
      const ph = ((t - steamOn) / 1.8 + k * 0.5 + n * 0.23) % 1, x0 = cx - 10 + k * 20, y0 = TY - CS * 128;
      g.globalAlpha = a0 * 0.8 * Math.sin(Math.PI * ph); g.beginPath();
      for (let j = 0; j <= 14; j++) { const q = j / 14 * Math.min(1, ph * 1.6); const y = y0 - q * 70, x = x0 + Math.sin(q * 6 + k) * 7; j ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); } });
    g.restore();
  }, { from: steamOn, until: 1e9, z: 2.7 });
  const badge = (x, n, t0) => { K.at(t0); K.circle(x, TY - 112, 56, { col: OR, w: 5, speed: 900, rough: 1.4, fade: F2V }); hand(String(n), x, TY - 96, 44, { t0: K.cur, col: OR, rate: 6, fade: F2V }); };
  const F2V = [0, 0];   // 同一个数组引用：Step 3 开头写入擦除时刻（R / hand 的 fade 读的是数组本身）
  badge(SERVE[0], 1, M0 + 11.7); badge(SERVE[1], 2, M0 + 15.0);
  const cw = (MC.font = '62px Kalam, WK', MC.measureText('coffee').width);
  hand('coffee', 995 - 12, TY - 190, 62, { t0: M0 + 15.6, rate: 9, fade: F2V }); hand('s', 995 - 12 + cw / 2 + 2, TY - 190, 62, { t0: M0 + 16.35, rate: 4, col: OR, align: 'left', fade: F2V });
  LK.push([M0 + 11.2, 'lin_point'], [M0 + 15.4, 'lin_idea']);
  const Tn1 = narr(KNOW[1], M0 + 0.4, 4);
  const Tn2 = narr(KNOW[2], M0 + 9.2, 3.8);
  T = Math.max(Tn1, Tn2, M0 + 17.4);

  // ---- 一刀切测试：Linda 在矮桌上先切苹果、再切面包 ----
  const A0 = T;
  K.cam(A0 + 0.2, { x: 1400, y: 560, z: 1.75, d: 0.5, ease: 'power3.inOut' });
  // 砧板
  H.sketch([{ d: `M${AX - 120} ${BY} L${AX + 70} ${BY} L${AX + 70} ${BY + 8} L${AX - 120} ${BY + 8} Z`, w: 4, fill: OR2, fillW: 1.6, gap: 10 }], { t0: A0 + 0.1, speed: 2400, z: 2, fade: F2V });
  // 苹果：同一套种子的两份线条，各裁一半 → 切开前严丝合缝是一整只，切开后就是这一只的两半（体积不增）
  const tCutA = A0 + 2.4, tSlide = A0 + 4.9;
  const appleSeeds = [H.seed(), H.seed(), H.seed()];
  const halfXf = (side, base, tCut, slideTo = null, rotMax = 0.22, gap = 16) => t => {
    const u = t - tCut, sp = spring(u, 0.5, 12), dx = side * gap * sp, rot = side * rotMax * sp;
    const sx = slideTo ? (slideTo - base[0]) * io(clamp((t - tSlide) / 0.7)) : 0;
    return { x: base[0] + dx + sx, y: base[1], r: rot, a: fadeF2(t) };
  };
  const appleParts = [{ d: APPLE.whole, w: 5, fill: OR2, fillW: 2, gap: 9, seed: appleSeeds[0] }, { d: APPLE.stem, w: 4.5, seed: appleSeeds[1] }, { d: APPLE.leaf, w: 3.5, seed: appleSeeds[2] }];
  const AC = [AX, BY - APPLE.R - 2];
  const faceDraw = (side, kind) => (g, t, x) => {   // 切面：两半转开以后露出来的果肉面（浅色 + 几粒籽 / 面包芯气孔）
    const open = Math.abs(x.r || 0) / 0.22; if (open < 0.05 || t < (kind === 'apple' ? tCutA : tCutB)) return;
    g.save(); g.globalAlpha *= clamp(open);
    if (kind === 'apple') { g.beginPath(); g.ellipse(0, 2, 3 + 9 * open, 27, 0, 0, 7); g.fillStyle = '#FFF4E6'; g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke();
      g.fillStyle = INK; for (const sy of [-6, 8]) { g.beginPath(); g.ellipse(side * 0, sy, 2, 4, 0, 0, 7); g.fill(); } }
    else { g.beginPath(); g.ellipse(0, -28, 3 + 8 * open, 27, 0, 0, 7); g.fillStyle = '#FFF4E6'; g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke();
      g.fillStyle = GREY; for (const [px, py] of [[0, -40], [1, -24], [-1, -14]]) { g.beginPath(); g.arc(px * 3 * open, py, 2, 0, 7); g.fill(); } }
    g.restore(); };
  for (const side of [-1, 1]) H.sketch(appleParts.map(p => ({ ...p })), { t0: A0 + 0.35, speed: 1300, z: 2.4, pen: side < 0, xf: halfXf(side, AC, tCutA, AX - 165),
    clip: g => g.rect(side < 0 ? -60 : 0, -70, 60, 140), after: faceDraw(side, 'apple') });
  // 刀：Linda 举起时在手里逐笔画出（蓄势：再往后抬一点）→ 落刀 0.1 s → 留在切口 → 再举起 → 切面包 → 留在切口
  const tCutB = A0 + 9.0;
  const KNIFE_KEYS = [[A0 + 1.3, KUP], [A0 + 1.9, KWIND, 0.35], [tCutA - 0.1, KCHOP, 0.1, 'io'], [A0 + 4.6, KUP, 0.35], [A0 + 8.3, KWIND, 0.35], [tCutB - 0.1, KCHOP, 0.1, 'io']];
  H.sketch([{ d: KNIFE_HD.handle, w: 4.5, fill: INK, fillW: 2, gap: 6, solid: BOARD }, { d: KNIFE_HD.bolster, w: 4 }, { d: KNIFE_HD.spine, w: 4.5 }, { d: KNIFE_HD.edge, w: 4.5 }],
    { t0: A0 + 1.3, speed: 1300, z: 3.2, xf: t => { const k = track(KNIFE_KEYS, t); return { x: k[0], y: k[1], r: k[2], s: KS, a: fadeF2(t) }; } });
  LK.push([A0 + 1.25, 'lin_cut0'], [tCutA - 0.05, 'lin_cut1'], [A0 + 4.78, 'lin_cut0'], [tCutB - 0.05, 'lin_cut1']);
  // 苹果的「1」：贴在整只苹果上（一个就是一个）→ 一刀下去「一个」没了，掉下桌
  token('1', t => { const p = t < tCutA + 0.05 ? track([[A0 + 0.9, [1330, 380]], [A0 + 0.95, [AX, AC[1] - 58], 0.6, 'back']], t) : fall([AX, AC[1] - 58], [90, -260], tCutA + 0.05, GROUND - 26)(t);
    return { x: p[0], y: p[1], a: fadeF2(t) * (1 - clamp((t - (tCutA + 1.2)) / 0.4)) }; }, { t0: A0 + 0.9, size: 34, r: 24 });
  hand('刚才的「一个」没了', AX - 165, 470, 34, { t0: A0 + 3.5, rate: 12, fade: F2V });
  const ok1 = hand('一个就是一个', AX - 165, 520, 34, { t0: A0 + 5.6, rate: 12, col: OR, fade: F2V });
  tick(ok1.x0 + ok1.w + 26, 508, ok1.t1 + 0.05, F2V);
  // 面包：画在刚才切苹果的地方；「1」落上去贴不住（滑下）；切开 → 两块都还是面包
  const BC = [AX, BY];
  const breadSeeds = [H.seed(), H.seed(), H.seed(), H.seed()];
  const breadParts = [{ d: BREAD.whole, w: 5, fill: OR2, fillW: 2, gap: 10, seed: breadSeeds[0] }, ...BREAD.score.map((d, j) => ({ d, w: 3, seed: breadSeeds[j + 1] }))];
  for (const side of [-1, 1]) H.sketch(breadParts.map(p => ({ ...p })), { t0: A0 + 5.9, speed: 1300, z: 2.4, pen: side < 0, xf: halfXf(side, BC, tCutB, null, 0.1, 22),
    clip: g => g.rect(side < 0 ? -70 : 0, -80, 70, 90), after: faceDraw(side, 'bread') });
  token('1', t => { const tl = A0 + 7.4; const p = t < tl ? track([[A0 + 6.8, [1330, 380]], [A0 + 6.85, [AX - 10, BY - 76], 0.55, 'io']], t) : [AX - 10 + 120 * io(clamp((t - tl) / 0.7)), BY - 76 + 40 * clamp((t - tl) / 0.7) ** 2];
    return { x: p[0], y: p[1], a: fadeF2(t) * (1 - clamp((t - (tl + 0.6)) / 0.4)) }; }, { t0: A0 + 6.8, size: 34, r: 24 });
  hand('bread', AX - 40, TY2 + 46, 30, { t0: tCutB + 0.9, rate: 10, fade: F2V }); hand('bread', AX + 40, TY2 + 46, 30, { t0: tCutB + 1.4, rate: 10, fade: F2V });
  hand('切开还是面包', 1385, 572, 34, { t0: tCutB + 2.0, rate: 12, col: OR, fade: F2V });
  T = narr(KNOW[4], A0 + 0.3, 3.6);
  T = narr(KNOW[5], T, 3.6);
  T = say(T, KNOW[6], '我有一个苹果，你有两个苹果。', ['apples']);
  T = say(T - 0.3, KNOW[7], '我喜欢面包和水。', ['bread']);
  T = Math.max(T, A0 + 22.9, tCutB + 3.6);
  K.cam(T - 1.2, { x: 960, y: 540, z: 1.0, d: 0.9 });

  // @step3_transfer —— 迁移：桌子中间轮流换三样东西：一杯牛奶、两张纸、作业
  C.step(3, T);
  const X0 = T; F2V[0] = F2[0] = X0; F2V[1] = F2[1] = X0 + 0.5;
  LK.push([X0 + 0.2, 'lin_point']);
  K.cam(X0 + 0.3, { x: 990, y: 540, z: 1.3, d: 0.8 });
  const BXc = 790;
  const fz = (a, b) => [a, b];
  // 一杯牛奶：玻璃杯逐笔画出，牛奶排线淡入（一杯 = 借来的单位，橙框框住）→ 数字 1 贴住
  const X1f = [0, 0];
  H.sketch([{ d: GLASS.body, w: 5 }, { d: GLASS.rim, w: 4 }, { d: GLASS.rimBack, w: 2.6, col: GREY }], { t0: X0 + 0.5, speed: 1100, z: 2.5, fade: X1f, xf: () => ({ x: BXc, y: TY, s: 1 }),
    after: (g, t) => { const a = clamp((t - (X0 + 1.4)) / 0.4); if (a <= 0) return; const p = new Path2D('M-32 -100 L-27 -6 L27 -6 L32 -100 Z');
      H.hatchFill(g, p, { col: GREY, gap: 10, w: 2, a: a * 0.7 * g.globalAlpha, box: [-40, -110, 80, 110] }); g.save(); g.globalAlpha *= a; g.strokeStyle = GREY; g.lineWidth = 3; g.beginPath(); g.moveTo(-32, -100); g.lineTo(32, -100); g.stroke(); g.restore(); } });
  K.at(X0 + 1.9); K.rect(BXc - 66, TY - 150, 132, 158, { col: OR, w: 5, rough: 1.4, speed: 1500, fade: X1f });
  hand('a glass of milk', BXc, TY + 56, 34, { t0: K.cur, rate: 14, fade: X1f });
  token('1', at([[X0 + 2.4, [1180, 330]], [X0 + 2.45, [BXc + 66, TY - 150], 0.7, 'back']], X1f), { t0: X0 + 2.4, size: 40, r: 30, ring: OR, col: OR });
  T = narr(KNOW[8], X0 + 0.2, 2.6);
  T = say(Math.max(T, X0 + 3.4), KNOW[9], '请来一杯牛奶。', ['glass']);
  const X1 = Math.max(T, X0 + 5.4); X1f[0] = X1; X1f[1] = X1 + 0.4;
  // 两张纸：-s 先凑近 paper 被弹开，再落到单位 piece 后面
  const X2f = [0, 0];
  H.sketch([{ d: SHEET.body, w: 4.5 }, ...SHEET.lines.map(d => ({ d, w: 2.4, col: GREY, min: 0.04 }))], { t0: X1 + 0.3, speed: 1800, z: 2.5, fade: X2f, xf: () => ({ x: BXc - 50, y: TY - 80, r: -0.07, s: 0.95 }) });
  H.sketch([{ d: SHEET.body, w: 4.5 }, ...SHEET.lines.map(d => ({ d, w: 2.4, col: GREY, min: 0.04 }))], { t0: K.cur, speed: 1800, z: 2.5, fade: X2f, xf: () => ({ x: BXc + 55, y: TY - 76, r: 0.08, s: 0.95 }) });
  MC.font = '38px Kalam, WK';
  const pw = MC.measureText('two piece').width, gapW = MC.measureText('s').width + 8, ow = MC.measureText(' of paper').width, px0 = BXc - (pw + gapW + ow) / 2;
  hand('two piece', px0, TY + 56, 38, { t0: X1 + 1.2, rate: 14, align: 'left', fade: X2f }); hand(' of paper', px0 + pw + gapW, TY + 56, 38, { t0: X1 + 1.9, rate: 14, align: 'left', fade: X2f });
  const sx = px0 + pw + gapW / 2, sy = TY + 44;
  token('-s', at([[X1 + 1.0, [1180, 300]], [X1 + 1.05, [BXc + 30, TY - 120], 0.65, 'io'], [X1 + 1.75, [BXc + 110, TY - 170], 0.35, 'out'], [X1 + 2.2, [BXc + 70, TY - 150], 0.3, 'io'], [X1 + 3.1, [sx, sy], 0.7, 'back']], X2f),
    { t0: X1 + 1.0, size: 38, r: 30, ring: OR, col: OR });
  T = narr(KNOW[10], X1 + 0.2, 3);
  T = say(Math.max(T, X1 + 4.4), KNOW[11], '两张纸。一块面包。', ['pieces', 'piece']);
  const X2 = Math.max(T, X1 + 6.4); X2f[0] = X2; X2f[1] = X2 + 0.4;
  LK.push([X2 + 0.3, 'lin_think'], [X2 + 4.2, 'lin_point']);
  // 作业：一摞作业本，-s 落上去贴不住、滑下去；一份份的试卷 papers 能数：1 贴住
  const P0f = [0, 0];
  [0, 1, 2].forEach(j => H.sketch([{ d: WORKBOOK.body, w: 4.5, fill: j === 1 ? OR2 : null, fillW: 1.6, gap: 10 }, { d: WORKBOOK.spine, w: 2.4, col: GREY }],
    { t0: X2 + 0.3 + j * 0.35, speed: 2400, z: 2.5, fade: P0f, xf: () => ({ x: BXc - 60 + j * 6, y: TY - 22 * j, s: 0.9 }) }));
  hand('homework', BXc - 60, TY + 56, 38, { t0: X2 + 1.4, rate: 12, fade: P0f });
  token('-s', t => { const tl = X2 + 2.7; const p = t < tl ? track([[X2 + 1.3, [1180, 300]], [X2 + 1.35, [BXc - 40, TY - 92], 0.7, 'io']], t) : [BXc - 40 + 150 * io(clamp((t - tl) / 0.6)), TY - 92 + 200 * clamp((t - tl) / 0.7) ** 2];
    return { x: p[0], y: p[1], a: 1 - clamp((t - (tl + 0.5)) / 0.4) }; }, { t0: X2 + 1.3, size: 38, r: 30, ring: OR, col: OR });
  H.sketch([{ d: SHEET.body, w: 4.5 }, ...SHEET.lines.map(d => ({ d, w: 2.4, col: GREY, min: 0.04 }))], { t0: X2 + 4.2, speed: 1800, z: 2.5, fade: P0f, xf: () => ({ x: BXc + 170, y: TY - 70, r: 0.05, s: 0.85 }) });
  MC.font = '38px Kalam, WK'; const pp = MC.measureText('paper').width;
  hand('paper', BXc + 170 - pp / 2, TY + 56, 38, { t0: X2 + 4.9, rate: 12, align: 'left', fade: P0f }); const ps = hand('s', BXc + 170 + pp / 2, TY + 56, 38, { t0: X2 + 5.4, rate: 8, align: 'left', col: OR, fade: P0f }); tick(ps.x0 + ps.w + 26, TY + 44, ps.t1 + 0.05, P0f);
  token('1', at([[X2 + 4.5, [1180, 330]], [X2 + 4.55, [BXc + 212, TY - 128], 0.7, 'back']], P0f), { t0: X2 + 4.5, size: 40, r: 30 });
  T = narr(KNOW[12], X2 + 0.2, 4);
  T = say(T - 0.3, KNOW[13], '我有很多作业。', ['homework']);
  T = Math.max(T, X2 + 9.2);

  // @step4_punchline —— 锚点：rice 能不能加 -s？（全幕唯一的预测停顿）猜完才揭晓，最后才命名规则
  C.step(4, T);
  const P0 = T; P0f[0] = P0; P0f[1] = P0 + 0.4;
  K.cam(P0 + 0.3, { x: 1360, y: 540, z: 1.55, d: 0.6 });
  LK.push([P0 + 0.2, 'lin_think']);
  const BS = 0.62, BOWLC = [AX, TY2];
  H.sketch([{ d: BOWL.rimBack, w: 3, col: GREY }], { t0: P0 + 0.4, speed: 1600, z: 2.3, xf: () => ({ x: BOWLC[0], y: BOWLC[1], s: BS }) });
  const riceSeed = H.seed();
  const tUpR = P0 + 3.5, tCutR = P0 + 4.2;
  for (const side of [-1, 1]) H.sketch([{ d: BOWL.rice, w: 4, fill: GREY, fillW: 1.4, gap: 8, seed: riceSeed }], { t0: P0 + 0.6, speed: 1400, z: 2.35, pen: side < 0,
    xf: t => { const sp = spring(t - tCutR, 0.6, 12); return { x: BOWLC[0] + side * 5 * sp, y: BOWLC[1], s: BS }; }, clip: g => g.rect(side < 0 ? -80 : 0, -130, 80, 135) });
  H.sketch([{ d: BOWL.body, w: 5, solid: BOARD }, { d: BOWL.rim, w: 4.5 }], { t0: P0 + 1.1, speed: 1600, z: 2.45, xf: () => ({ x: BOWLC[0], y: BOWLC[1], s: BS }) });
  MC.font = '50px Kalam, WK'; const rw = MC.measureText('rice').width;
  const rq = hand('rice', 1340 - rw / 2, 440, 50, { t0: P0 + 0.6, rate: 10, align: 'left', fade: null }); hand('s ?', 1340 + rw / 2, 440, 50, { t0: rq.t1 + 0.05, rate: 6, align: 'left', col: OR });
  // 预测停顿（≥3 秒）：手画倒数圈一笔一笔收短 + 手写数字（不用 emoji）
  const tP = P0 + 0.5, PSEC = 3.0;
  C.PRED.push({ t: tP, sec: PSEC, q: KNOW[14] }); C.USES.predict = (C.USES.predict || 0) + 1;
  K.narr(KNOW[14], tP, tP + PSEC);
  const ring = H.strokesOf('M0 -46 A46 46 0 1 1 -0.1 -46', { rough: 0.6, w: 6 });
  K.prop((g, t) => { const q = clamp((t - tP) / PSEC), a = clamp((t - tP) / 0.3) * (1 - clamp((t - tP - PSEC) / 0.3)); if (a <= 0) return;
    g.save(); g.translate(1120, 350); g.globalAlpha = a; g.strokeStyle = OR; g.lineWidth = 6; g.lineCap = 'round';
    for (const s of ring) { const L = s.cum[s.cum.length - 1] * (1 - q); g.beginPath(); g.moveTo(s.pts[0][0], s.pts[0][1]); for (let i = 1; i < s.pts.length && s.cum[i] <= L; i++) g.lineTo(s.pts[i][0], s.pts[i][1]); g.stroke(); }
    g.font = '56px Kalam, WK'; g.fillStyle = OR; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(Math.max(1, Math.ceil(PSEC * (1 - q)))), 0, 4); g.restore(); }, { from: tP, until: tP + PSEC + 0.4, z: 8 });
  T = tP + PSEC;
  // 揭晓：Linda 真的切一刀 → 还是米饭；「rices」划掉 → two bowls of rice（-s 在 bowl 上）
  const RK = [[tUpR, KUP], [tUpR + 0.4, KWIND, 0.3], [tCutR - 0.1, KCHOP, 0.1, 'io'], [tCutR + 1.0, KUP, 0.35]];
  const tKnifeOut = tCutR + 1.5;
  H.sketch([{ d: KNIFE_HD.handle, w: 4.5, fill: INK, fillW: 2, gap: 6, solid: BOARD }, { d: KNIFE_HD.bolster, w: 4 }, { d: KNIFE_HD.spine, w: 4.5 }, { d: KNIFE_HD.edge, w: 4.5 }],
    { t0: tUpR, speed: 1600, z: 2.4, fade: [tKnifeOut, tKnifeOut + 0.4], xf: t => { const k = track(RK, t); return { x: k[0], y: k[1], r: k[2], s: KS }; } });
  LK.push([tUpR - 0.05, 'lin_cut0'], [tCutR - 0.05, 'lin_cut1'], [tCutR + 1.18, 'lin_cut0'], [tKnifeOut + 0.3, 'lin_laugh']);
  hand('还是米饭', AX, 486, 36, { t0: tCutR + 0.5, rate: 10, col: OR });
  K.at(tCutR + 1.2); K.cross(1340 - rw / 2 - 10, 425, 1340 + rw / 2 + 70, 432, { w: 5 });
  MC.font = '44px Kalam, WK'; const tw = MC.measureText('two bowl').width, sw = MC.measureText('s').width, ow2 = MC.measureText(' of rice').width, tx0 = 1340 - (tw + sw + ow2) / 2;
  hand('two bowl', tx0, 380, 44, { t0: tCutR + 1.5, rate: 12, align: 'left' }); hand('s', tx0 + tw, 380, 44, { t0: tCutR + 2.2, rate: 4, align: 'left', col: OR }); hand(' of rice', tx0 + tw + sw, 380, 44, { t0: tCutR + 2.5, rate: 12, align: 'left' });
  // 第二碗：单位是碗，数的是碗
  const B2 = [AX - 175, TY2], rs2 = H.seed();
  H.sketch([{ d: BOWL.rimBack, w: 3, col: GREY }, { d: BOWL.rice, w: 4, fill: GREY, fillW: 1.4, gap: 8, seed: rs2 }, { d: BOWL.body, w: 5, solid: BOARD }, { d: BOWL.rim, w: 4.5 }], { t0: tCutR + 3.1, speed: 1700, z: 2.45, xf: () => ({ x: B2[0], y: B2[1], s: BS }) });
  K.prop((g, t) => {   // 米饭的热气
    g.save(); g.strokeStyle = GREY; g.lineWidth = 3; g.lineCap = 'round';
    for (const cx of [B2[0], BOWLC[0]]) for (let k = 0; k < 2; k++) { const ph = ((t - tCutR) / 1.9 + k * 0.5 + (cx > 1400 ? 0.2 : 0)) % 1, x0 = cx - 12 + k * 24, y0 = TY2 - 76;
      g.globalAlpha = 0.75 * Math.sin(Math.PI * ph); g.beginPath(); for (let j = 0; j <= 14; j++) { const q = j / 14 * Math.min(1, ph * 1.6), y = y0 - q * 70, x = x0 + Math.sin(q * 6 + k) * 7; j ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
    g.restore(); }, { from: tCutR + 4.0, until: 1e9, z: 2.7 });
  K.at(tCutR + 4.0); K.circle(B2[0], TY2 - 120, 52, { col: OR, w: 5, speed: 900 }); hand('1', B2[0], TY2 - 104, 40, { t0: K.cur, col: OR, rate: 6 });
  K.at(K.cur + 0.2); K.circle(BOWLC[0], TY2 - 120, 52, { col: OR, w: 5, speed: 900 }); hand('2', BOWLC[0], TY2 - 104, 40, { t0: K.cur, col: OR, rate: 6 });
  T = narr(KNOW[15], tCutR + 0.2, 3.6);
  T = say(T - 0.2, KNOW[16], '我要两碗米饭。', ['bowls']);
  T = narr(KNOW[17], T - 0.2, 3);
  C.rule(T);
  const Tn18 = narr(KNOW[18], T, 3.6);
  K.cam(T - 0.4, { x: 960, y: 540, z: 1.0, d: 0.9 });
  // 收尾要点卡：手画卡片（底色盖住后面）+ 逐字手写；原理原名只写在卡片角落（给老师看）
  const EC = T + 0.4;
  K.prop((g, t) => { g.fillStyle = `rgba(238,238,236,${(0.55 * clamp((t - EC) / 0.4)).toFixed(3)})`; g.fillRect(-2000, -2000, 6000, 6000); }, { from: EC, until: 1e9, z: 8.5 });
  const card = H.sketch([{ d: 'M440 260 L1480 260 L1480 720 L440 720 Z', w: 5, solid: '#FFFDF7', rough: 1.1 }], { t0: EC, speed: 4200, z: 9, pen: true });
  const LINES = [['要点卡 · 这一幕讲完啦', 50, INK], ['咖啡面包这类：切开、倒出还是它 → 不可数', 40, INK], ['借个单位来数 → -s 加在单位上', 40, INK], ['口诀：一刀下去还是它，不可数来不加 s', 40, OR], ['给老师看：可数性看「看法」（识解），不是看东西有没有边', 28, GREY]];
  let tl = card.t1 + 0.1; const cardTxt = [];
  LINES.forEach(([s, size, col], j) => { cardTxt.push([s, 960, [338, 432, 512, 592, 676][j], size, col, tl]); tl += [...s].length / 30 + 0.06; });
  for (const [str, x, y, size, col, t0] of cardTxt) hand(str, x, y, size, { t0, col, rate: 30, z: 9.5 });
  K.end(Math.max(Tn18 + 0.3, tl + 1.0));

  // Linda 统一登记（翻转：面朝左边的桌子）；之字形揭开
  K.actor({ keys: LK.sort((a, b) => a[0] - b[0]), x: LX, ground: GROUND, h: LH, ref: 'lin_stand', flip: true, reveal: tLin, z: 1 });
  // 动态时间窗：所有笔画正在画的时段 + 道具 / 人物运动的时段（如实登记）
  for (const s of K.B.S) if (s.t0 >= 0 && s.t1 > s.t0) C.motion(s.t0, s.t1);
  C.motion(M0, M0 + 16.0);                    // 倒咖啡：提壶、倾倒、出流、液面上升、推杯、放壶
  C.motion(M0 + 2.2, M0 + 7.6);               // 数字块飞落、滑走
  C.motion(A0 + 0.2, A0 + 11.2);              // 刀：蓄势 → 落刀 → 两半分开；苹果滑开；面包；数字块
  C.motion(steamOn, X0 + 0.5);                // 热气一直在飘
  C.motion(X0, X0 + 3.4); C.motion(X1, X1 + 4.0); C.motion(X2, X2 + 5.6);
  C.motion(tUpR, tCutR + 1.6); C.motion(tCutR + 4.0, EC);   // 切米饭；米饭热气
  return C.finish();
}
