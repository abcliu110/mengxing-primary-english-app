// 📦 第一性原理 · 有界无界 · 1 —— v3 试点（2026-11-01）：动画技术升级方案试点——弹簧运动 + 程序化液体 + 人物平滑层（呼吸/微摆/落定余摆）；布局与时间轴沿用 v2 已验收版本，KNOW 原文一字不改。
// T16 P0（2026-11-01）：茶壶/杯子/Linda 全部元素化（model/props/{teapot,cup,linda}.yaml + 共享模块 props）——模板只消费元素与基元（pour/fill/point/hold），姿势切换 = 关节角插值，几何与断言在 props 侧。
// 与决策 39 样板（fp_boundedness_1.js）的区别（全部用 v5 原有技术：wb5 引擎 + concept 原语 + kit + cast 素材）：
//   ① 固定舞台：全幕在一间咖啡馆里演完——Linda（cast 帧 l_*）全程站在左侧，靠换帧表演（思考/端咖啡/指点/想通/笑）；
//      不用 contrastSplitScreen 分屏、不切板，所有道具都在同一张桌子上出现和消失。
//   ② 因果动作统一语法：数字块贴流体 → 滑落消失（chip path + out）；贴到有边容器 → 容器的 count 徽章弹出；
//      -s 先凑近 paper 被「弹开」（path 抖动折返），再 drop 落到 pieces 上变绿；homework 的 -s 同样滑落。用「贴得住/贴不住」讲规则。
//   ③ 规则命名（KNOW[18] 原理原名）移到全幕最后、收尾要点卡之前（原样板在第 2 步中段就念了）；预测停顿只保留 rice 一处（原样板两处）。
//   ④ 苹果/面包不再用 emoji 瞬间换装：同一位置先整只出现、刀切（kit.knife）后原地分开成两半，苹果的数字 2 drop 贴住，面包的数字 1 滑落。
// 内容来源：旧版 auto.js 场景（src/cases/fp_boundedness.js 案例 1）的知识点全部在 KNOW（R1 = 知识点不丢），与 fp_boundedness_1.js 的 KNOW 逐字一致。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { kit } from './fb39_lib.js';
import * as SP from '../sprites/fb39v2.js';
import { TEAPOT, CUP, LINDA, pourTiltAt, tipAt, drawElement, drawCharacter, resolvePose, blendPose, walkPose, assertPourWindow, assertFill, assertPoint, assertAnchorReach, assertFeetOnGround } from '../props/props.js';

export const KNOW = [
  '书上说 coffee 不加 -s，咖啡馆里却说 Two coffees！谁错了？',
  '咖啡倒出来是一大片，没有边，数不出一、二、三。',
  '装进杯子就有了边。有边就能数：两杯咖啡。',
  'Two coffees, please.',
  '苹果切一刀，就不是「一个苹果」了：有边 → 可数，an apple、two apples。',
  '面包切一刀，两块还是面包；水倒一半还是水：没边 → 不可数，不说 a bread。',
  'I have an apple. You have two apples.',
  'I like bread and water.',
  '想数没边的东西？套个容器：一杯、一张、一块。',
  'A glass of milk, please.',
  '两张纸：-s 加在容器 piece 上，paper 不加。',
  'Two pieces of paper. A piece of bread.',
  'homework 是一大类事，没边，也不加 -s；一份份试卷 papers 有边，能加。',
  'I have a lot of homework.',
  '一碗米饭切一刀还是米饭——rice 能加 -s 吗？',
  '揭晓：切开还是米饭 → 不可数，用碗来数：two bowls of rice，-s 加在 bowl 上。',
  'I want two bowls of rice.',
  '口诀：一刀下去还是它，不可数来不加 s。',
  '第一性原理 ③ 物理边界感统摄律：可不可数，看脑子里有没有边界框。',
];

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '同一间咖啡馆里：桌上语法书写着 coffee 不加 -s，Linda 却端着咖啡听见 Two coffees；数字块飞去贴咖啡，全滑了下来',
    guess: '咖啡装进杯子以后能数吗？面包切开还数不数？rice 能不能加 -s？',
    reveal: '数字贴得住的地方就有边：杯子围出边、数字弹出；苹果切开「一个」没了，面包切开还是面包；-s 被 paper 弹开、落到容器 pieces / bowls 上',
    rule: '可不可数，不看东西本身，看有没有边界框；没边的要数，就套个容器，-s 加在容器上（规则原名留到最后揭晓）',
  });
  const { narr, say, knife } = kit(K, C, '可数还是不可数？看边界框', 1);
  const LK = [[0.4, 'l_coff0'], [1.6, 'l_think']];   // Linda 的换帧表（最后统一登记 actor）
  // ===== v3 技术层（场景内原型，验证后下沉 concept.js）=====
  // 解析阻尼弹簧：0→1 的进度本身是 t 的闭式函数（可 seek）；zeta<1 欠阻尼带过冲——轻物摇摆、重物沉稳只差参数
  const spring01 = (u, zeta = 0.35, wn = 11) => { if (u <= 0) return 0; if (zeta < 1) { const wd = wn * Math.sqrt(1 - zeta * zeta); return 1 - Math.exp(-zeta * wn * u) * (Math.cos(wd * u) + (zeta * wn / wd) * Math.sin(wd * u)); } const r = wn * u; return 1 - Math.exp(-r) * (1 + r); };
  const spr = (u, a, b, zeta, wn) => a + (b - a) * spring01(u, zeta, wn);
  const settle = (u) => u < 0 || u > 1.1 ? 0 : Math.sin(u * 13) * Math.exp(-u * 6.5);   // 落定余摆（姿势切换/物体落点共用）
  // 种子伪随机（同一 t 同一帧，截图可复现）
  const srand = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const EMOJI_FONT = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
  const drawEmoji = (g, e, x, y, size, rot = 0, alpha = 1) => { g.save(); g.globalAlpha = alpha; g.translate(x, y); if (rot) g.rotate(rot); g.font = `${size}px ${EMOJI_FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, 0, size * 0.04); g.restore(); };
  // 上升粒子（蒸汽共用）：每粒一个固定种子，位置只由 t 决定
  const steam = (g, t, cx, y0, y1, t0, spread = 26, n = 3, col = '160,150,140') => {
    for (let i = 0; i < n; i++) for (let j = 0; j < 3; j++) {
      const cyc = 2.4 + srand(i * 7 + j) * 1.1, ph = ((t - t0) / cyc + srand(i * 13 + j * 3)) % 1;
      if (ph < 0) continue;
      const x = cx + (i - (n - 1) / 2) * spread + Math.sin(ph * 5 + i * 2 + j) * 9, y = y0 + (y1 - y0) * ph, r = 5 + ph * 9;
      g.beginPath(); g.fillStyle = `rgba(${col},${(0.5 * Math.sin(ph * Math.PI)).toFixed(3)})`; g.arc(x, y, r, 0, 7); g.fill();
    } };
  // 呼吸光圈：讲解哪件展品，哪件就被一圈呼吸光标出来（信号原则），同时让画面保持真实动态
  const pulse = (x, y, w, h, t0, t1) => {
    K.prop((g, t) => { const a = 0.28 + 0.18 * Math.sin(t * 2.4); g.save(); g.strokeStyle = `rgba(217,119,6,${a.toFixed(3)})`; g.lineWidth = 5; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 26); g.stroke(); g.restore(); }, { from: t0, until: t1, z: 3 });
    C.motion(t0, t1);
  };

  // —— 固定舞台：地板、桌子、招牌，全幕不撤 ——
  K.prop((g, t) => {
    g.save();
    g.fillStyle = '#f5ead6'; g.fillRect(0, 838, 1920, 242);
    g.fillStyle = '#e7d3ae'; g.fillRect(0, 838, 1920, 8);
    g.fillStyle = '#b07a45'; g.beginPath(); g.roundRect(500, 796, 990, 26, 10); g.fill();
    g.fillStyle = '#96622f'; g.fillRect(560, 822, 22, 60); g.fillRect(1408, 822, 22, 60);
    g.font = '30px Kalam, WK'; g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('☕ 萌星咖啡馆', 995, 810);
    g.restore();
  }, { from: 0.2, until: 1e9, z: -2 });

  let T = 0.5;

  // @step1_hook —— 冲突：同一张桌子上，书说不加 -s，咖啡馆里却在数
  C.step(1, T);
  K.actor({ keys: [[0.6, 'woman']], x: 1520, ground: 838, h: 500, reveal: 0.6, fadeOut: [9.8, 10.8], until: 10.9, z: 0 });
  C.pic({ emoji: '📖', x: 640, y: 430, size: 165, from: T + 0.2, until: T + 11 });
  C.chip({ text: 'coffee ✗ -s', x: 640, y: 620, size: 50, col: RED, bd: RED, from: T + 0.6, until: T + 11 });
  C.chip({ text: 'Two coffees, please!', x: 1400, y: 272, size: 47, col: BLUE, bd: BLUE, from: T + 2.4, until: T + 11, hi: [[T + 4.3, T + 6.3]] });
  C.pic({ emoji: '❓', x: 300, y: 235, size: 100, from: T + 1.9, until: 9.3, morph: [[T + 4.5, '🤔']] });
  T = narr(KNOW[0], T + 0.4, 5);
  LK.push([T - 1.2, 'l_idea0']);
  T = say(T + 0.2, KNOW[3], '请来两杯咖啡。', ['coffees']);
  // 冲突留白：Linda 想通了一点，端着书走到桌边（走路帧 l_w0–3，引擎 walk 机制）
  const W0 = T;
  C.motion(W0, W0 + 2.2);
  T = W0 + 2.6;

  // @step2_mechanism —— 机制：流体贴不住数字 → 杯子围出边、数字弹出 → 一刀切测试（同桌左右各一份）
  C.step(2, T);
  const M0 = T;
  // 茶壶 = 元素库道具 teapot（元素库第一个元素）：定义在模型层 model/props/teapot.yaml，
  // 渲染、锚点几何与构建期断言都在共享模块 props（v5/props/props.js）——本模板不留任何私有壶代码。
  // 液柱原点只许取 tipAt（锚点 spoutTip 按当前倾角实算）；倾角由道具参数反算（轴线实算角 38.0° + 目标净下倾 35° = 全倾 73°）；
  // 出流窗断言由 assertPourWindow 按道具定义执行（净下倾 <30° 抛错停建）。倒水时序沿用三修结构：停水 M0+5.0 先于回正 M0+5.2。
  const potTilt = (t) => pourTiltAt(TEAPOT, t, M0);
  const potTip = (t) => tipAt(TEAPOT, t, M0);
  assertPourWindow(TEAPOT, M0, 1.05, 5.0);
  K.prop((g, t) => {
    const aIn = Math.min(1, (t - (M0 + 0.2)) / 0.3), aOut = Math.min(1, (M0 + 7.6 - t) / 0.3);
    g.save(); g.globalAlpha = Math.max(0, Math.min(aIn, aOut)); g.translate(TEAPOT.placement.world[0], TEAPOT.placement.world[1]); g.rotate(potTilt(t));
    drawElement(g, TEAPOT); g.restore();
  }, { from: M0 + 0.2, until: M0 + 7.6, z: 3 });
  C.motion(M0 + 1.05, M0 + 9.2);
  // v3 真液体：倒水柱（收细+摆动+水花）→ 桌面上摊开的咖啡滩（弹簧摊开+表面起伏+落点涟漪），无边就是「没有框」
  const LANDS = [[M0 + 2.9, 760, 756], [M0 + 4.3, 850, 758], [M0 + 5.7, 805, 757]];
  K.prop((g, t) => {
    const pourU = (t - (M0 + 1.05)) / 3.95, pouring = pourU >= 0 && pourU <= 1;
    const surfRx = spr(t - (M0 + 1.05), 26, 235, 0.62, 1.9) * (1 + 0.008 * Math.sin(t * 2.2));
    const cxL = 820, cyL = 780, ryL = Math.max(6, surfRx * 0.09);
    if (pouring) {   // 水柱：收细的锥形水流（上宽下窄+亮芯+首尾淡入淡出），落点溅起种子水花
      const [tipX, tipY] = potTip(t); const sx = tipX + Math.sin(t * 31) * 1.2, sy = tipY, ex = 806, ey = cyL - ryL * 0.4;
      const fadeS = Math.min(1, (t - (M0 + 1.05)) / 0.3, (M0 + 5.0 - t) / 0.3 + 0.001);
      const mx = sx + 16 + Math.sin(t * 17) * 4, my = (sy + ey) / 2;
      g.save(); g.globalAlpha = Math.max(0, fadeS);
      g.beginPath(); g.moveTo(sx - 6, sy); g.quadraticCurveTo(mx - 3.4, my, ex - 2.2, ey); g.lineTo(ex + 2.2, ey); g.quadraticCurveTo(mx + 3.4, my, sx + 6, sy); g.closePath();
      g.fillStyle = 'rgba(122,62,16,.78)'; g.fill();
      g.strokeStyle = 'rgba(196,128,56,.75)'; g.lineWidth = 2.4; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx, sy + 4); g.quadraticCurveTo(mx, my, ex, ey - 2); g.stroke(); g.restore();
      for (let i = 0; i < 7; i++) { const ph = ((t * 1.7 + srand(i * 3.3)) % 1), dx = (srand(i * 7.1) - 0.5) * 90 * ph, dy = -34 * Math.sin(ph * Math.PI) * (0.5 + srand(i * 5.7));
        g.beginPath(); g.fillStyle = `rgba(122,62,16,${(0.55 * (1 - ph)).toFixed(3)})`; g.arc(ex + dx, ey + dy + ph * 16, 3.6 - ph * 1.6, 0, 7); g.fill(); }
    }
    if (surfRx > 8) {   // 咖啡滩：先落接触阴影把液体钉在桌面上，再画极坐标起伏边缘 + 深浅渐变 + 高光
      g.save(); g.beginPath(); g.ellipse(cxL, 795, surfRx * 0.99, 7, 0, 0, 7); g.fillStyle = 'rgba(80,45,8,.20)'; g.fill(); g.restore();
      g.save(); g.beginPath();
      for (let a = 0; a <= 64; a++) { const th = a / 64 * Math.PI * 2, rr = 1 + 0.045 * Math.sin(3 * th + t * 1.25) + 0.035 * Math.sin(5 * th - t * 0.85);
        const px = cxL + Math.cos(th) * surfRx * rr, py = cyL + Math.sin(th) * ryL * rr; a ? g.lineTo(px, py) : g.moveTo(px, py); }
      g.closePath();
      const gr = g.createRadialGradient(cxL - 40, cyL - 8, 20, cxL, cyL, surfRx);
      gr.addColorStop(0, '#8a4d1c'); gr.addColorStop(0.75, '#7a4212'); gr.addColorStop(1, '#653a0e');
      g.fillStyle = gr; g.fill();
      g.beginPath(); g.ellipse(cxL - surfRx * 0.3, cyL - ryL * 0.34, surfRx * 0.36, ryL * 0.4, -0.06, 0, 7); g.fillStyle = 'rgba(255,235,200,.13)'; g.fill();
      g.restore();
      for (const [lt, lx, ly] of LANDS) { const u = (t - lt) / 0.9;   // 数字块落点涟漪
        if (u > 0 && u < 1) { g.save(); g.globalAlpha = 0.4 * (1 - u); g.strokeStyle = '#a4712f'; g.lineWidth = 3; g.beginPath(); g.ellipse(lx, ly, 14 + u * 44, (14 + u * 44) * 0.3, 0, 0, 7); g.stroke(); g.restore(); } }
    }
  }, { from: M0 + 1.05, until: M0 + 9.2, z: 2 });
  C.label('coffee', 820, 864, { size: 50, col: '#92400e', from: M0 + 1.6, until: M0 + 9.2, bold: true });   // 桌前下方题注（液体本体太薄，字不压液体）
  // 数字块贴流体：一个个飞过去、贴不住、滑落消失（与后面「贴得住」形成对照）
  C.chip({ text: '1', x: 280, y: 235, size: 52, col: INK, bd: GREY, from: M0 + 2.2, until: M0 + 6.2, path: [[M0 + 2.9, 760, 756, 0.75, 'io'], [M0 + 4.1, 905, 778, 0.9, 'io'], [M0 + 5.0, 990, 788, 0.7, 'io']], out: M0 + 5.5 });
  C.chip({ text: '2', x: 300, y: 235, size: 52, col: INK, bd: GREY, from: M0 + 3.6, until: M0 + 7.6, path: [[M0 + 4.3, 850, 758, 0.75, 'io'], [M0 + 5.5, 1010, 782, 0.9, 'io'], [M0 + 6.4, 1095, 790, 0.7, 'io']], out: M0 + 6.9 });
  C.chip({ text: '3', x: 320, y: 235, size: 52, col: INK, bd: GREY, from: M0 + 5.0, until: M0 + 8.0, path: [[M0 + 5.7, 805, 757, 0.75, 'io'], [M0 + 6.9, 950, 780, 0.85, 'io']], out: M0 + 7.3 });
  const Tn1 = narr(KNOW[1], M0 + 0.4, 4);
  // 杯子进场围出边：数字徽章自己弹出（schemaContainer 的 count）
  // 杯体 = 元素库道具 cup（定义 model/props/cup.yaml）：schemaContainer 只管边界框与徽章，
  // 杯体由 drawElement 按定义绘制；液面由 fill 基元实算（进场时注入 0 → 0.85，assertFill 不过停建）。
  assertFill(CUP, 'mug', 0.85);
  const cupDraw = (f0, f1) => (g, t) => { const f = 0.85 * Math.max(0, Math.min(1, (t - f0) / (f1 - f0))); g.scale(1.3, 1.3); drawElement(g, CUP, { profile: 'mug', fill: f, liquid: 'skin.coffee' }); };
  C.schemaContainer({ x: 730, y: 630, w: 300, h: 280, content: '', contentDraw: cupDraw(M0 + 8.8, M0 + 9.9), from: M0 + 8.6, until: M0 + 17.0, states: [[M0 + 8.6, 'enter'], [M0 + 9.8, 'bounded']], count: 1 });
  C.schemaContainer({ x: 1170, y: 630, w: 300, h: 280, content: '', contentDraw: cupDraw(M0 + 9.4, M0 + 10.5), from: M0 + 9.2, until: M0 + 17.0, states: [[M0 + 9.2, 'enter'], [M0 + 10.4, 'bounded']], count: 2 });
  LK.push([M0 + 8.6, 'l_point'], [M0 + 10.6, 'l_coff2']);
  C.morphLetters({ from: 'coffee', to: 'coffees', x: 960, y: 905, size: 76, t: M0 + 12.6, d: 2.2, appear: M0 + 12.2, until: M0 + 17.2 });
  // 杯子上的热气一直在飘（连续小动画，结果帧留在桌上陪着后面的测试）
  C.motion(M0 + 12.4, M0 + 17.0);
  K.prop((g, t) => { g.save(); for (const cx of [730, 1170]) steam(g, t, cx, 556, 474, M0 + 12.4); g.restore(); }, { from: M0 + 12.4, until: M0 + 17.0, z: 3 });   // 蒸汽起点 = cup 元素口沿高度（630 − 54×1.3 ≈ 560）
  const Tn2 = narr(KNOW[2], M0 + 9.2, 3.8);
  T = Math.max(Tn1, Tn2, M0 + 17.4);
  // 一刀切测试：苹果（左）与面包（右）在同一张桌子上同时切开，结果当场分开
  const A0 = T;
  C.pic({ emoji: '🍎', x: 680, y: 555, size: 150, from: A0 + 0.2, until: A0 + 2.4 });
  C.pic({ emoji: '🍞', x: 1360, y: 555, size: 150, from: A0 + 0.2, until: A0 + 2.4 });
  C.label('apple', 680, 728, { size: 40, col: INK, from: A0 + 0.4, until: A0 + 22.5 });
  C.motion(A0 + 0.4, A0 + 4.4);
  const cutFx = (cx, e, size, col) => {   // 一刀：蓄势上抬 → 弹簧斩落；两半弹簧滑开微转，切口落碎屑
    K.prop((g, t) => { const u = t - (A0 + 0.5);
      if (u > 0 && t < A0 + 3.4) { const ky = u < 0.65 ? 292 - 46 * spring01(u / 0.65, 1, 6) : spr(u - 0.65, 246, 600, 0.9, 24);
        drawEmoji(g, '🔪', cx, ky, 96, -0.5, t > A0 + 2.9 ? Math.max(0, 1 - (t - (A0 + 2.9)) / 0.5) : 1); }
    }, { from: A0 + 0.5, until: A0 + 3.4, z: 3 });
    K.prop((g, t) => { const u = t - (A0 + 2.4), off = spr(u, 0, 92, 0.38, 8.5), rot = spr(u, 0, 0.07, 0.38, 8.5);
      // 两半必须真的是「半个」：整图沿切线裁开（clip），切面补果肉/面包芯和籽——一个苹果切开是两半，不会变成两个苹果
      const drawHalf = (dir, r2) => {
        g.save(); g.translate(cx + dir * off, 568); g.rotate(r2);
        g.beginPath(); g.rect(dir < 0 ? -size * 0.58 : 0, -size * 0.62, size * 0.58, size * 1.24); g.clip();
        g.font = `${size}px ${EMOJI_FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, 0, size * 0.04);
        g.restore();
        g.save(); g.translate(cx + dir * off, 568); g.rotate(r2);
        g.beginPath(); g.ellipse(dir * size * 0.05, 0, size * 0.048, size * 0.29, 0, 0, 7); g.fillStyle = e === '🍎' ? '#f9e7bb' : '#f6e3b4'; g.fill();
        if (e === '🍎') { g.fillStyle = '#7a4a1f'; for (const sy of [-0.09, 0.09]) { g.beginPath(); g.ellipse(dir * size * 0.05, size * sy, size * 0.015, size * 0.033, dir * 0.3, 0, 7); g.fill(); } }
        g.restore();
      };
      drawHalf(-1, -rot); drawHalf(1, rot);
      if (u > 0 && u < 1.3) for (let i = 0; i < 7; i++) { const px = cx + (srand(i * 3.1 + cx) - 0.5) * 60, py = 520 + 300 * u * u * (0.5 + srand(i * 7.7 + cx)), a = Math.max(0, 0.75 - u * 0.55);
        g.save(); g.globalAlpha = a; g.fillStyle = col; g.beginPath(); g.arc(px + (srand(i * 9.3 + cx) - 0.5) * 46 * u, py, 4.5, 0, 7); g.fill(); g.restore(); }
    }, { from: A0 + 2.4, until: A0 + 22.5, z: 2 });
  };
  cutFx(680, '🍎', 108, '#c2372a'); cutFx(1360, '🍞', 104, '#d99a3a');
  C.label('✗ 刚才的「一个」没了', 680, 330, { size: 36, col: RED, from: A0 + 3.5, until: A0 + 22.5 });
  const b2 = C.chip({ text: '2', x: 300, y: 300, size: 52, col: INK, bd: GREY, from: A0 + 3.2, until: A0 + 22.5 });
  C.drop(b2, A0 + 3.6, 680, 432);
  C.label('bread', 1278, 712, { size: 34, col: '#92400e', from: A0 + 3.4, until: A0 + 22.5 });
  C.label('bread', 1442, 712, { size: 34, col: '#92400e', from: A0 + 3.4, until: A0 + 22.5 });
  C.chip({ text: '1', x: 1080, y: 290, size: 52, col: INK, bd: GREY, from: A0 + 4.6, until: A0 + 7.6, path: [[A0 + 5.2, 1360, 420, 0.65, 'io'], [A0 + 6.2, 1545, 585, 0.85, 'io']], out: A0 + 6.8 });
  C.chip({ text: '一个就是一个 ✓', x: 680, y: 262, size: 40, col: GREEN, bd: GREEN, from: A0 + 5.4, until: A0 + 22.5 });
  C.chip({ text: '切开还是面包', x: 1360, y: 262, size: 40, col: OR, bd: OR, from: A0 + 7.2, until: A0 + 22.5 });
  LK.push([A0 + 0.2, 'l_point'], [A0 + 6.0, 'l_coff0']);
  T = narr(KNOW[4], A0 + 0.3, 3.6);
  T = narr(KNOW[5], T, 3.6);
  T = say(T, KNOW[6], '我有一个苹果，你有两个苹果。', ['apples']);
  T = say(T - 0.3, KNOW[7], '我喜欢面包和水。', ['bread']);
  pulse(680, 555, 336, 300, A0 + 5.4, A0 + 22.9); pulse(1360, 555, 336, 300, A0 + 7.2, A0 + 22.9);
  T = Math.max(T, A0 + 22.9);

  // @step3_transfer —— 迁移：舞台中央同一个位置，轮流换三样东西，边界框语法不变
  C.step(3, T);
  const BX = 960, BY = 520;
  const box = (t0, t1, content, label, count, fluid, contentDraw = null) => C.schemaContainer({ x: BX, y: BY, w: 380, h: 300, content, contentDraw, from: t0, until: t1, states: [[t0, 'unbounded'], [t0 + 2.6, 'enter'], [t0 + 3.6, 'bounded']], label, count, fluid, spread: 0.9 });
  const X0 = T;
  LK.push([X0, 'l_coff0']);
  assertFill(CUP, 'glass', 0.92);   // 牛奶杯同为 cup 元素（glass 剖面：无把直壁杯，液面 fill 基元实算）
  box(X0, X0 + 5.4, '', 'a glass of milk', 1, 'rgba(229,231,235,.9)', (g, t) => { g.scale(1.25, 1.25); drawElement(g, CUP, { profile: 'glass', fill: 0.92, liquid: 'skin.milk' }); });
  T = narr(KNOW[8], X0 + 0.2, 2.6);
  T = say(Math.max(T, X0 + 3.4), KNOW[9], '请来一杯牛奶。', ['glass']);
  pulse(BX, BY, 404, 324, X0, X0 + 5.4);
  const X1 = Math.max(T, X0 + 5.4);
  box(X1, X1 + 6.4, '📄', 'two pieces of paper', 2, 'rgba(219,234,254,.9)');
  const schip = C.chip({ text: '-s', x: 1520, y: 270, size: 56, col: OR, bd: OR, from: X1 + 1.0, until: X1 + 6.4, path: [[X1 + 1.7, 1100, 712, 0.7, 'io'], [X1 + 2.35, 1155, 682, 0.32, 'io'], [X1 + 2.7, 1100, 712, 0.32, 'io']] });
  C.drop(schip, X1 + 3.3, 918, 712);
  C.swap(schip, X1 + 4.15, '-s', GREEN, '#ecfdf5', GREEN);
  T = narr(KNOW[10], X1 + 0.2, 3);
  T = say(Math.max(T, X1 + 4.4), KNOW[11], '两张纸。一块面包。', ['pieces', 'piece']);
  pulse(BX, BY, 404, 324, X1, X1 + 6.4);
  const X2 = Math.max(T, X1 + 6.4);
  LK.push([X2 + 1.0, 'l_point']);
  box(X2, X2 + 9.2, '📚', 'homework', null, 'rgba(254,243,199,.9)');
  C.chip({ text: '-s', x: 1520, y: 270, size: 56, col: RED, bd: RED, from: X2 + 1.2, until: X2 + 4.6, path: [[X2 + 1.9, 960, 395, 0.7, 'io'], [X2 + 2.9, 1215, 570, 0.85, 'io']], out: X2 + 3.5 });
  C.chip({ text: 'papers ✓', x: 1500, y: 845, size: 46, col: GREEN, bd: GREEN, from: X2 + 2.6, until: X2 + 9.2, path: [[X2 + 2.6, 1500, 720, 2.2, 'out']] });
  // 一份份的试卷单独摆出来：有边，数字 1 当场 drop 贴住（和 homework 的 -s 滑落对照）
  C.pic({ emoji: '📄', x: 1310, y: 520, size: 120, from: X2 + 4.2, until: X2 + 9.2 });
  const p1 = C.chip({ text: '1', x: 1150, y: 300, size: 50, col: INK, bd: GREY, from: X2 + 4.4, until: X2 + 9.2 });
  C.drop(p1, X2 + 4.6, 1310, 408);
  T = narr(KNOW[12], X2 + 0.2, 4);
  T = say(T - 0.3, KNOW[13], '我有很多作业。', ['homework']);
  pulse(BX, BY, 404, 324, X2, X2 + 9.2);
  T = Math.max(T, X2 + 9.2);

  // @step4_punchline —— 锚点：rice 能不能加 -s？（全幕唯一的预测停顿）猜完才揭晓，最后才命名规则
  C.step(4, T);
  const P0 = T;
  LK.push([P0 + 0.2, 'l_think']);
  C.schemaContainer({ x: 960, y: 520, w: 420, h: 300, content: '🍚', from: P0, until: P0 + 13.4, states: [[P0, 'unbounded'], [P0 + 5.6, 'enter'], [P0 + 6.8, 'bounded']], count: 2, fluid: 'rgba(229,231,235,.9)', spread: 1.0 });
  const rc = C.chip({ text: 'rices ?', x: 960, y: 262, size: 58, col: RED, bd: RED, from: P0 + 0.4, until: P0 + 13.4 });
  T = C.predict(P0 + 0.6, { q: KNOW[14] });
  C.swap(rc, T + 0.5, 'two bowls of rice', GREEN, '#fff', GREEN);
  C.motion(T + 0.5, P0 + 13.4);
  K.prop((g, t) => { g.save(); steam(g, t, 960, 455, 378, T + 0.5, 30); g.restore(); }, { from: T + 0.5, until: P0 + 13.4, z: 3 });
  LK.push([T + 0.6, 'l_laugh']);
  T = narr(KNOW[15], T + 0.6, 3.6);
  T = say(T - 0.2, KNOW[16], '我要两碗米饭。', ['bowls']);
  T = narr(KNOW[17], T - 0.2, 3);
  C.rule(T);
  const Tn18 = narr(KNOW[18], T, 3.6);
  LK.push([T, 'l_laugh']);
  // 收尾要点卡：主线讲完才出现；原理原名只在卡片角落（给老师看）
  const EC = T + 0.4;
  K.prop((g, t) => {
    g.save();
    g.fillStyle = 'rgba(64,50,36,0.28)'; g.fillRect(0, 0, 1920, 1080);
    g.fillStyle = '#fffdf7'; g.beginPath(); g.roundRect(430, 250, 1060, 470, 26); g.fill();
    g.strokeStyle = '#e0cdaa'; g.lineWidth = 4; g.stroke();
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = '52px Kalam, WK'; g.fillStyle = INK; g.fillText('要点卡 · 这一幕讲完啦', 960, 322);
    g.font = '42px Kalam, WK'; g.fillStyle = '#92400e';
    g.fillText('☕ 咖啡面包这类：切开、倒出还是它 → 不可数', 960, 412);
    g.fillText('🥛 套上容器有了边 → -s 加在容器上', 960, 492);
    g.fillStyle = GREEN; g.fillText('口诀：一刀下去还是它，不可数来不加 s', 960, 572);
    g.font = '30px Kalam, WK'; g.fillStyle = GREY;
    g.fillText('给老师看：第一性原理 ③ 物理边界感统摄律', 960, 662);
    g.restore();
  }, { from: EC, until: 1e9, z: 9 });

  // 人物 = 元素库人物 linda（定义 model/props/linda.yaml；渲染/FK/IK/断言都在共享模块 props）：
  // LK 的位图帧名逐名映射为元素姿态（profiles.from 即帧名），姿态切换 = 关节角插值（不再整帧交淡）；
  // pointing 的手臂角与视线由 point 基元按展品坐标实算、thinking/idea 的手到锚点由 IK 实算，
  // 全部在构建期断言（assertPoint / assertAnchorReach / assertFeetOnGround，不过停建）。
  // 呼吸/微摆/落定余摆/走路前倾与重心跳沿用 v3 手感层参数；模板内无任何私有 Linda 绘制代码。
  const SC_L = 520 / 460;   // 舞台高 520 / 元素本地高 460（LINDA.params.height.computed，定义内坐标实算）
  const POSE_OF = { l_coff0: 'standing', l_coff2: 'relaxed', l_think: 'thinking', l_idea0: 'idea', l_point: 'pointing', l_laugh: 'laughing' };
  const POINT_AT = new Map([[M0 + 8.6, [730, 600]], [A0 + 0.2, [700, 490]], [X2 + 1.0, [960, 470]]]);   // 指向节拍 → 展品世界坐标（杯/苹果/作业框）
  const toLocal = (wx, wy) => [(wx - 380) / SC_L, (wy - 838) / SC_L];   // 指向节拍都在走位后（x=380、ground=838）
  const RIG_KEYS = [...LK, [W0 + 2.05, 'l_coff0']].sort((a, b) => a[0] - b[0]).map(([kt, fk]) => {
    const name = POSE_OF[fk], tgt = POINT_AT.get(kt);
    const pose = resolvePose(LINDA, name, tgt ? { target: toLocal(tgt[0], tgt[1]) } : {});
    if (name === 'pointing') assertPoint(LINDA, pose, 'L', pose.target);
    if (name === 'thinking') assertAnchorReach(LINDA, pose, 'hand_L', 'chin');
    if (name === 'idea') assertAnchorReach(LINDA, pose, 'hand_R', 'temple');
    if (name === 'standing' || name === 'relaxed' || name === 'laughing') assertFeetOnGround(LINDA, pose);
    return { t: kt, pose, postWalk: Math.abs(kt - (W0 + 2.05)) < 1e-6 };
  });
  for (const rk of RIG_KEYS) if (rk.t > W0 + 2.6) C.motion(rk.t - 0.05, rk.t + 0.55);   // 姿态切换段如实登记动态
  K.prop((g, t) => {
    if (t < 0.3) return;
    const ground = 838, walking = t >= W0 && t <= W0 + 2.2;
    let x = t < W0 ? 300 : 380;
    if (walking) { const u = (t - W0) / 2.2, p = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; x = 300 + 80 * p; }
    let pose, keyT = 0.4;
    if (walking) pose = walkPose(LINDA, Math.abs(x - 300) * 0.068);
    else {
      let cur = RIG_KEYS[0], prev = null;
      for (const rk of RIG_KEYS) if (t >= rk.t) { if (rk !== cur) prev = cur; cur = rk; }
      let prevPose = prev ? prev.pose : null;
      if (cur.postWalk && prev && prev.t < W0) prevPose = walkPose(LINDA, 80 * 0.068);   // 出 walk 的衔接帧 = 步态末相位（承旧版 l_w0 衔接）
      keyT = cur.t;
      const u = Math.min(1, Math.max(0, (t - keyT) / 0.28)), e = u * u * (3 - 2 * u);
      pose = prevPose && u < 1 ? blendPose(LINDA, prevPose, cur.pose, e) : cur.pose;
    }
    const fadeIn = Math.min(1, (t - 0.3) / 0.5), uSet = t - keyT;
    const lean = walking ? 0.028 + Math.sin(Math.abs(x - 300) / 46 * Math.PI) * 0.006 : Math.sin(t * 0.8) * 0.005;
    const bob = walking ? -Math.abs(Math.sin(Math.abs(x - 300) * 0.068)) * 7 : settle(uSet) * 5;
    const br = walking ? 0 : Math.sin(t * 1.7) * 0.006;
    g.save(); g.globalAlpha = fadeIn;
    g.translate(x, ground + bob); g.rotate(lean); g.scale(SC_L * (1 - br * 0.6), SC_L * (1 + br));
    drawCharacter(g, LINDA, pose);
    g.restore();
  }, { from: 0.3, until: 1e9, z: 0 });
  C.motion(0.3, W0 + 2.6);   // 人物层在钩子+走路段持续运动（如实登记）
  K.end(Math.max(Tn18 + 0.3, EC + 5.0));
  return C.finish();
}
