// 元素库 · 渲染与几何（共享块 props，与 wb5 / auto / adj_train / concept / oral / poly 同级，引擎侧只存一份）
// 定义源：docs/whiteboard/model/props/<id>.yaml —— 模型层是唯一事实源；本文件是定义的渲染侧同步副本，
// 改定义先改 YAML、再同步此处（按 YAML 的 element.version 对账）。
// 纪律：几何量一律由定义内锚点/路径坐标实算（如壶嘴轴线角由壶嘴四角锚点算出），禁止手填「测得值」；
// 场景与原语只许调本模块的锚点函数取坐标（如 tipAt），不许另存偏移数字。
// 通用形状（与 YAML 定义格式一一对应）：path / strokePath（段表回放）、spoutTube（锚点公式管件）、circle / ellipse。

// 解析阻尼弹簧（与场景层 spring01 同式：进度是 t 的闭式函数，可 seek）
const spring01 = (u, zeta = 0.35, wn = 11) => { if (u <= 0) return 0; if (zeta < 1) { const wd = wn * Math.sqrt(1 - zeta * zeta); return 1 - Math.exp(-zeta * wn * u) * (Math.cos(wd * u) + (zeta * wn / wd) * Math.sin(wd * u)); } const r = wn * u; return 1 - Math.exp(-r) * (1 + r); };

// ================= 元素定义（渲染侧同步副本；源 = model/props/teapot.yaml v1） =================
export const TEAPOT = {
  element: { id: 'teapot', kind: 'prop', version: 1, title: '茶壶（咖啡壶）' },
  placement: { world: [738, 300] },
  skin: {
    tokens: { body: '#cf5a36', edge: '#8a3320', deep: '#a83e22', knob: '#7c2d1e', mouth: '#5a2d16', highlight: 'rgba(255,255,255,.20)' },
  },
  parts: [
    { id: 'spout', pivot: [52, -6], z: 1, style: { fill: 'skin.body', stroke: 'skin.edge', lineWidth: 4 },
      shapes: [
        { type: 'spoutTube', corners: { baseTop: [44.0, -16.2], baseBottom: [60.0, 4.2], tipTop: [93.7, -46.8], tipBottom: [101.7, -36.6] }, bowTop: 5, bowBottom: 2.5, lip: 3 },
        { type: 'ellipse', at: 'anchor.tipCenter', radii: [3.4, 7.2], align: 'spoutAxis', style: { fill: 'skin.mouth' } },
      ] },
    { id: 'handle', pivot: [-46, 6], z: 2, style: { stroke: 'skin.edge', lineWidth: 10 },
      shapes: [
        { type: 'strokePath', segments: [['M', -44, -20], ['C', -82, -16, -84, 24, -48, 33]] },
      ] },
    { id: 'body', pivot: [0, 0], z: 3, style: { fill: 'skin.body', stroke: 'skin.edge', lineWidth: 4 },
      shapes: [
        { type: 'path', segments: [['M', -30, -40], ['L', -38, -34],
          ['C', -58, -26, -64, -6, -62, 16], ['C', -60, 34, -48, 46, -30, 50],
          ['Q', 0, 54, 30, 50],
          ['C', 48, 46, 60, 34, 62, 16], ['C', 64, -6, 58, -26, 38, -34],
          ['L', 30, -40], ['Z']] },
      ] },
    { id: 'highlight', pivot: [-24, -4], z: 4, style: {},
      shapes: [
        { type: 'ellipse', at: [-24, -4], radii: [13, 21], rot: 0.35, style: { fill: 'skin.highlight' } },
      ] },
    { id: 'lid', pivot: [0, -48], z: 5, style: { fill: 'skin.deep', stroke: 'skin.edge', lineWidth: 4 },
      shapes: [
        { type: 'path', segments: [['M', -31, -39], ['Q', 0, -57, 31, -39], ['Z']], style: { fill: 'skin.deep', stroke: 'skin.edge', lineWidth: 3.5 } },
        { type: 'circle', at: [0, -52], r: 6.5, style: { fill: 'skin.knob' } },
      ] },
  ],
  params: { spoutAxisDeg: { design: 38 } },   // computed 不存：由 spoutGeom() 从路径坐标实算
  profiles: {
    pour: { netTargetDeg: 35, netMinDeg: 30, spring: { zeta: 0.9, wn: 10.5, dur: 0.9, delay: 0.35, returnStart: 5.2 } },
  },
};
// ================= 几何实算（由路径坐标派生，禁止手填） =================
const partOf = (def, id) => def.parts.find(p => p.id === id);
const tubeOf = (def) => partOf(def, 'spout').shapes.find(s => s.type === 'spoutTube');
// 壶嘴几何：基部中心/嘴尖中心由四角锚点（路径坐标）取中点；轴线仰角 = atan2(-(尖y-基y), 尖x-基x)
export const spoutGeom = (def) => {
  const { baseTop, baseBottom, tipTop, tipBottom } = tubeOf(def).corners;
  const baseC = [(baseTop[0] + baseBottom[0]) / 2, (baseTop[1] + baseBottom[1]) / 2];
  const tipC = [(tipTop[0] + tipBottom[0]) / 2, (tipTop[1] + tipBottom[1]) / 2];
  const dx = tipC[0] - baseC[0], dy = tipC[1] - baseC[1];
  return { baseC, tipC, len: Math.hypot(dx, dy), axisDeg: Math.atan2(-dy, dx) * 180 / Math.PI, ux: dx / Math.hypot(dx, dy), uy: dy / Math.hypot(dx, dy) };
};
export const spoutTipLocal = (def) => spoutGeom(def).tipC;

// 倒水倾角（rad）：全倾角由参数反算 = 轴线仰角（实算） + 目标净下倾；弹簧/时序取 profiles.pour
export const pourTiltAt = (def, t, m0) => {
  const pr = def.profiles.pour, sp = pr.spring;
  const full = (spoutGeom(def).axisDeg + pr.netTargetDeg) * Math.PI / 180;
  return full * spring01((t - (m0 + sp.delay)) / sp.dur, sp.zeta, sp.wn) * (1 - spring01((t - (m0 + sp.returnStart)) / sp.dur, sp.zeta, sp.wn));
};
// 当前姿态下嘴尖的世界坐标 = 枢轴（placement.world） + 倾斜旋转矩阵 · 嘴尖中心（锚点实算）
export const tipAt = (def, t, m0) => {
  const th = pourTiltAt(def, t, m0), c = Math.cos(th), si = Math.sin(th), [lx, ly] = spoutTipLocal(def), [px, py] = def.placement.world;
  return [px + lx * c - ly * si, py + lx * si + ly * c];
};
// 当前姿态的壶嘴净下倾角（度）：倾角 − 轴线仰角（实算）
export const netDegAt = (def, t, m0) => pourTiltAt(def, t, m0) * 180 / Math.PI - spoutGeom(def).axisDeg;
// 构建期断言：出流窗 [m0+start, m0+end] 内每一采样点净下倾 ≥ profiles.pour.netMinDeg，否则抛错停建。返回窗内最小净下倾。
export const assertPourWindow = (def, m0, start, end) => {
  const min = def.profiles.pour.netMinDeg;
  let minNet = Infinity;
  for (let tt = m0 + start; tt <= m0 + end + 1e-9; tt += 0.05) minNet = Math.min(minNet, netDegAt(def, tt, m0));
  if (!(minNet >= min)) throw new Error(`props/${def.element.id} 壶嘴断言失败：出流窗最小净下倾 ${minNet.toFixed(1)}° < ${min}°（轴线角 ${spoutGeom(def).axisDeg.toFixed(1)}°）——改壶嘴锚点或剖面参数后必须重过此断言`);
  return minNet;
};

// ================= 绘制（数据驱动：按定义 parts 回放，局部坐标，调用方先 translate 到枢轴并 rotate） =================
const resolve = (def, v) => (typeof v === 'string' && v.startsWith('skin.') ? def.skin.tokens[v.slice(5)] : v);
const paint = (g, def, style) => {
  if (!style) return;
  if (style.fill) { g.fillStyle = resolve(def, style.fill); g.fill(); }
  if (style.stroke) { g.strokeStyle = resolve(def, style.stroke); g.lineWidth = style.lineWidth || 4; g.stroke(); }
};
const replay = (g, segs) => {
  g.beginPath();
  for (const s of segs) {
    const [op, ...a] = s;
    if (op === 'M') g.moveTo(a[0], a[1]);
    else if (op === 'L') g.lineTo(a[0], a[1]);
    else if (op === 'C') g.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
    else if (op === 'Q') g.quadraticCurveTo(a[0], a[1], a[2], a[3]);
    else if (op === 'Z') g.closePath();
  }
};
export const drawElement = (g, def, opts = {}) => {
  let geo = null; const getGeo = () => (geo ??= spoutGeom(def));   // 壶嘴几何懒算：无 spout 部件的元素（杯/人物）不触发
  const prof = opts.profile ? (def.profiles || {})[opts.profile] : null;
  g.lineJoin = 'round'; g.lineCap = 'round';
  for (const part of [...def.parts].sort((a, b) => a.z - b.z)) {
    if (prof && prof.parts && !prof.parts.includes(part.id)) continue;
    if (part.profiles && opts.profile && !part.profiles.includes(opts.profile)) continue;
    const shapes = part.variants ? part.variants[opts.variant || (prof && prof.bodyVariant)] : part.shapes;
    if (!shapes) continue;
    for (const sh of shapes) {
      const style = sh.style || part.style;
      if (sh.type === 'path') { replay(g, sh.segments); paint(g, def, style); }
      else if (sh.type === 'strokePath') { replay(g, sh.segments); paint(g, def, { stroke: (style && style.stroke) || 'skin.edge', lineWidth: (style && style.lineWidth) || 10 }); }
      else if (sh.type === 'spoutTube') {
        const gg = getGeo();
        const { baseTop: bt, baseBottom: bb, tipTop: tp, tipBottom: tb } = sh.corners;
        const nx = gg.uy, ny = -gg.ux;   // 轴线上侧法向
        const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const cTop = mid(bt, tp), cBot = mid(bb, tb);
        g.beginPath(); g.moveTo(bt[0], bt[1]);
        g.quadraticCurveTo(cTop[0] + nx * sh.bowTop, cTop[1] + ny * sh.bowTop, tp[0], tp[1]);
        g.quadraticCurveTo(gg.tipC[0] + gg.ux * sh.lip, gg.tipC[1] + gg.uy * sh.lip, tb[0], tb[1]);
        g.quadraticCurveTo(cBot[0] - nx * sh.bowBottom, cBot[1] - ny * sh.bowBottom, bb[0], bb[1]);
        g.closePath(); paint(g, def, style);
      }
      else if (sh.type === 'circle') { g.beginPath(); g.arc(sh.at[0], sh.at[1], sh.r, 0, 7); paint(g, def, style); }
      else if (sh.type === 'ellipse') {
        const at = sh.at === 'anchor.tipCenter' ? getGeo().tipC : sh.at;
        const rot = sh.align === 'spoutAxis' ? Math.atan2(getGeo().uy, getGeo().ux) : (sh.rot || 0);
        g.beginPath(); g.ellipse(at[0], at[1], sh.radii[0], sh.radii[1], rot, 0, 7); paint(g, def, style);
      }
      else if (sh.type === 'liquidFill') { drawLiquid(g, def, opts); }
    }
  }
};

// ================= 元素定义（渲染侧同步副本；源 = model/props/cup.yaml v1） =================
export const CUP = {
  element: { id: 'cup', kind: 'prop', version: 1, title: '杯子（马克杯 / 玻璃杯）' },
  placement: { world: [730, 630] },
  skin: {
    tokens: { wall: '#cf5a36', edge: '#8a3320', inner: '#a83e22', glassWall: 'rgba(196,222,233,.50)', glassEdge: '#7d99a8', coffee: '#6f3a10', milk: '#f8f2e4', highlight: 'rgba(255,255,255,.25)' },
  },
  parts: [
    { id: 'handle', pivot: [50, -4], z: 1, profiles: ['mug'], style: { stroke: 'skin.edge', lineWidth: 10 },
      shapes: [
        { type: 'strokePath', segments: [['M', 48, -26], ['C', 82, -22, 84, 22, 50, 30]] },
      ] },
    { id: 'body', pivot: [0, 0], z: 2,
      variants: {
        mug: [
          { type: 'path', segments: [['M', -54, -54], ['C', -52, -10, -46, 26, -40, 48], ['Q', -38, 56, -28, 56],
            ['L', 28, 56], ['Q', 38, 56, 40, 48], ['C', 46, 26, 52, -10, 54, -54], ['Z']],
            style: { fill: 'skin.wall', stroke: 'skin.edge', lineWidth: 4 } },
          { type: 'ellipse', at: [0, -54], radii: [54, 10], style: { fill: 'skin.inner' } },
        ],
        glass: [
          { type: 'path', segments: [['M', -46, -58], ['L', -38, 50], ['Q', -37, 58, -28, 58],
            ['L', 28, 58], ['Q', 37, 58, 38, 50], ['L', 46, -58], ['Z']],
            style: { fill: 'skin.glassWall', stroke: 'skin.glassEdge', lineWidth: 3.5 } },
          { type: 'ellipse', at: [0, -58], radii: [46, 8], style: { fill: 'rgba(255,255,255,.35)' } },
        ],
      } },
    { id: 'liquid', pivot: [0, 0], z: 3, shapes: [{ type: 'liquidFill' }] },
  ],
  params: {
    cavity: {
      mug: { rimY: -44, bottomY: 42, halfTop: 44, halfBottom: 32 },
      glass: { rimY: -50, bottomY: 48, halfTop: 40, halfBottom: 31 },
    },
  },
  profiles: {
    mug: { parts: ['handle', 'body', 'liquid'], bodyVariant: 'mug' },
    glass: { parts: ['body', 'liquid'], bodyVariant: 'glass' },
  },
};

// ================= fill 基元（液面由 cavity + fill 实算；绘制与断言共用同一路径） =================
export const cupGeom = (def, profile = 'mug') => {
  const cav = def.params.cavity[profile];
  if (!cav) throw new Error(`props/${def.element.id} 未知剖面 ${profile}`);
  return { cavity: cav, rimInnerWidth: 2 * cav.halfTop };
};
// 液面 y（局部坐标）：fill=0 → 内腔底；fill=1 → 内腔口沿（rimY）。线性插值，定义内坐标实算。
export const fillSurfaceY = (def, profile, fill) => {
  const cav = cupGeom(def, profile).cavity;
  return cav.bottomY + fill * (cav.rimY - cav.bottomY);
};
// 液面半宽：cavity 在液面 y 处的插值半宽（恒不宽于内腔壁——surface-inside-cavity 断言的实算路径）
export const cavityHalfW = (def, profile, fill) => {
  const cav = cupGeom(def, profile).cavity;
  return cav.halfBottom + fill * (cav.halfTop - cav.halfBottom);
};
// 液面线两端点（元素锚点 liquidSurface 的实算出处）
export const liquidSurfaceEnds = (def, profile, fill) => {
  const y = fillSurfaceY(def, profile, fill), hw = cavityHalfW(def, profile, fill);
  return [[-hw, y], [hw, y]];
};
// 构建期断言：fill ∈ [0,1]，越界（溢出/负量）抛错停建。返回液面 y。
export const assertFill = (def, profile, fill) => {
  if (!(fill >= 0 && fill <= 1)) throw new Error(`props/${def.element.id} fill 断言失败：注入量 ${fill} 不在 [0,1]（>1 即溢出杯口 rimY=${cupGeom(def, profile).cavity.rimY}）——改注入量或杯定义后必须重过此断言`);
  return fillSurfaceY(def, profile, fill);
};
// 液体绘制（liquidFill 形状的渲染）：液面椭圆 + 向下至内腔底的梯形体；颜色取 opts.liquid 令牌
const drawLiquid = (g, def, opts = {}) => {
  const profile = opts.profile || 'mug', fill = opts.fill ?? 0;
  if (!(fill > 0)) return;
  assertFill(def, profile, fill);
  const cav = cupGeom(def, profile).cavity;
  const y = fillSurfaceY(def, profile, fill), hw = cavityHalfW(def, profile, fill);
  const col = resolve(def, opts.liquid || 'skin.coffee');
  g.beginPath();
  g.moveTo(-hw, y); g.lineTo(hw, y); g.lineTo(cav.halfBottom, cav.bottomY); g.lineTo(-cav.halfBottom, cav.bottomY);
  g.closePath(); g.fillStyle = col; g.fill();
  g.beginPath(); g.ellipse(0, y, hw, 4.5, 0, 0, 7); g.fillStyle = col; g.fill();
  g.beginPath(); g.ellipse(-hw * 0.3, y, hw * 0.55, 2.6, 0, 0, 7); g.fillStyle = resolve(def, 'skin.highlight'); g.fill();
};

// ================= 元素定义（渲染侧同步副本；源 = model/props/linda.yaml v1） =================
// 人物格式扩展（见 linda.yaml 文件头 E1/E2/E3）：部件带 parent 层级（pivot 以父部件局部系计、
// shapes 以本部件局部系计）；torso 走 variants、head 走 features；book/bubble/drape 走 gate；
// book 走 attachTo（hold 基元对位）。姿态角为画布旋转度数（顺时针正，y 向下）。
const LINDA_SKIN = { skin: '#ffedd8', edge: '#6e5f4d', hair: '#f4ecdc', hairEdge: '#8a7a5f', shirt: '#ffffff', shirtEdge: '#9aa0a6', scarf: '#e07b26', scarfEdge: '#b25a14', blazer: '#dd9a5f', blazerDark: '#c07f3e', blazerEdge: '#9a6224', shorts: '#b7bcc4', shortsEdge: '#7d838c', shoe: '#ffffff', shoeEdge: '#8b8f96', ink: '#3d3428', mouth: '#8a4b3a', tongue: '#d98a76', page: '#fdf6e3', bookCover: '#b5651d', bookEdge: '#7c4210', cloud: '#ffffff', cloudEdge: '#b9c4cc' };
const legShapes = () => ([
  { type: 'path', segments: [['M', -16, 2], ['C', -15, 30, -10, 60, -9, 84], ['L', 9, 84], ['C', 10, 58, 14, 30, 16, 2], ['Z']], style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 3 } },
]);
const shinShapes = () => ([
  { type: 'path', segments: [['M', -14, 0], ['C', -13, 30, -10, 60, -9, 85], ['L', 9, 85], ['C', 11, 58, 13, 28, 14, 0], ['Z']], style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 3 } },
  { type: 'path', segments: [['M', -9, 63], ['L', 9, 63], ['L', 9, 85], ['L', -9, 85], ['Z']], style: { fill: 'skin.shoe' } },
  { type: 'path', segments: [['M', -14, 80], ['C', -15, 95, -6, 100, 4, 100], ['L', 27, 100], ['C', 35, 100, 36, 91, 29, 87], ['C', 19, 82, 4, 78, -14, 80], ['Z']], style: { fill: 'skin.shoe', stroke: 'skin.shoeEdge', lineWidth: 3 } },
  { type: 'circle', at: [0, 2], r: 13.5, style: { fill: 'skin.skin' } },
]);
const upperArmShapes = () => ([
  { type: 'circle', at: [0, 0], r: 16, style: { fill: 'skin.shirt' } },
  { type: 'path', segments: [['M', -14, 34], ['C', -15, 56, -12, 74, -10, 90], ['L', 11, 90], ['C', 13, 72, 14, 54, 14, 34], ['Q', 0, 40, -14, 34], ['Z']], style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 3 } },
  { type: 'path', segments: [['M', -18, -6], ['C', -19, 10, -18, 28, -16, 44], ['L', 16, 44], ['C', 18, 26, 19, 8, 18, -6], ['Q', 0, -12, -18, -6], ['Z']], style: { fill: 'skin.shirt', stroke: 'skin.shirtEdge', lineWidth: 3 } },
]);
const forearmShapes = () => ([
  { type: 'circle', at: [0, 0], r: 13, style: { fill: 'skin.skin' } },
  { type: 'path', segments: [['M', -13, 0], ['C', -14, 26, -12, 56, -10, 80], ['L', 10, 80], ['C', 12, 56, 13, 26, 13, 0], ['Q', 0, 6, -13, 0], ['Z']], style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 3 } },
  { type: 'circle', at: [1, 86], r: 13, style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 2.5 } },
]);
const shortsShape = () => ({ type: 'path', segments: [['M', -52, -8], ['C', -54, 14, -53, 34, -50, 52], ['L', -18, 52], ['C', -16, 30, -15, 14, -14, -2], ['L', 14, -2], ['C', 15, 14, 16, 30, 18, 52], ['L', 50, 52], ['C', 53, 34, 54, 14, 52, -8], ['Q', 0, 0, -52, -8], ['Z']], style: { fill: 'skin.shorts', stroke: 'skin.shortsEdge', lineWidth: 3 } });
const scarfShapes = () => ([
  { type: 'path', segments: [['M', 2, -128], ['L', 16, -126], ['L', 20, -72], ['L', 6, -68], ['Z']], style: { fill: 'skin.scarf', stroke: 'skin.scarfEdge', lineWidth: 2.5 } },
  { type: 'path', segments: [['M', 16, -126], ['L', 28, -120], ['L', 30, -84], ['L', 20, -72], ['Z']], style: { fill: 'skin.scarf', stroke: 'skin.scarfEdge', lineWidth: 2.5 } },
  { type: 'circle', at: [10, -136], r: 11, style: { fill: 'skin.scarf', stroke: 'skin.scarfEdge', lineWidth: 2.5 } },
]);
export const LINDA = {
  element: { id: 'linda', kind: 'character', version: 1, title: 'Linda（boundedness 家族主讲）' },
  placement: { world: [300, 838] },
  skin: { tokens: LINDA_SKIN },
  parts: [
    { id: 'legR', pivot: [-18, -184], z: 1, anchors: { knee: [0, 86] }, shapes: legShapes() },
    { id: 'shinR', parent: 'legR', pivot: [0, 86], z: 0, anchors: { ankle: [0, 85], foot: [24, 98] }, shapes: shinShapes() },
    { id: 'legL', pivot: [16, -184], z: 2, anchors: { knee: [0, 86] }, shapes: legShapes() },
    { id: 'shinL', parent: 'legL', pivot: [0, 86], z: 0, anchors: { ankle: [0, 85], foot: [24, 98] }, shapes: shinShapes() },
    { id: 'torso', pivot: [0, -184], z: 3, anchors: { shoulderL: [54, -132], shoulderR: [-54, -132] },
      variants: {
        shirt: [
          shortsShape(),
          { type: 'path', segments: [['M', -56, -138], ['C', -58, -96, -54, -48, -50, -6], ['Q', 0, 4, 50, -6], ['C', 54, -48, 58, -96, 56, -138], ['C', 30, -148, -30, -148, -56, -138], ['Z']], style: { fill: 'skin.shirt', stroke: 'skin.shirtEdge', lineWidth: 3 } },
          ...scarfShapes(),
        ],
        blazer: [
          shortsShape(),
          { type: 'path', segments: [['M', -58, -140], ['C', -62, -92, -58, -30, -54, 16], ['Q', 0, 26, 54, 16], ['C', 58, -30, 62, -92, 58, -140], ['C', 32, -150, -32, -150, -58, -140], ['Z']], style: { fill: 'skin.blazer', stroke: 'skin.blazerEdge', lineWidth: 3 } },
          { type: 'path', segments: [['M', -14, -142], ['L', 14, -142], ['L', 4, -84], ['L', -4, -84], ['Z']], style: { fill: 'skin.shirt' } },
          { type: 'path', segments: [['M', -14, -142], ['L', -30, -138], ['L', -8, -82], ['L', -2, -96], ['Z']], style: { fill: 'skin.blazerDark' } },
          { type: 'path', segments: [['M', 14, -142], ['L', 30, -138], ['L', 8, -82], ['L', 2, -96], ['Z']], style: { fill: 'skin.blazerDark' } },
          { type: 'circle', at: [27, -58], r: 3.5, style: { fill: 'skin.blazerDark' } },
          { type: 'circle', at: [28, -28], r: 3.5, style: { fill: 'skin.blazerDark' } },
          ...scarfShapes(),
        ],
      } },
    { id: 'armR', parent: 'torso', pivot: [-54, -132], z: -1, anchors: { elbow: [0, 92] }, shapes: upperArmShapes() },
    { id: 'forearmR', parent: 'armR', pivot: [0, 92], z: 0, anchors: { hand: [1, 90] }, shapes: forearmShapes() },
    { id: 'armL', parent: 'torso', pivot: [54, -132], z: 4, anchors: { elbow: [0, 92] }, shapes: upperArmShapes() },
    { id: 'forearmL', parent: 'armL', pivot: [0, 92], z: 0, anchors: { hand: [1, 90] }, shapes: forearmShapes() },
    { id: 'drape', parent: 'forearmL', pivot: [0, 8], z: 1, gate: 'drape',
      shapes: [
        { type: 'path', segments: [['M', -16, 0], ['C', -20, 22, -14, 44, -6, 62], ['C', 2, 68, 12, 66, 16, 54], ['C', 20, 36, 14, 14, 8, 0], ['Q', -4, 6, -16, 0], ['Z']], style: { fill: 'skin.blazer', stroke: 'skin.blazerEdge', lineWidth: 3 } },
      ] },
    { id: 'head', parent: 'torso', pivot: [2, -148], z: 3, anchors: { eye: [29, -62], mouth: [31, -30], chin: [24, -2], temple: [50, -88], top: [0, -128] },
      shapes: [
        { type: 'path', segments: [['M', -9, -14], ['L', 9, -14], ['L', 10, 8], ['L', -10, 8], ['Z']], style: { fill: 'skin.skin' } },
        { type: 'ellipse', at: [6, -56], radii: [52, 58], style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 3 } },
        { type: 'circle', at: [-42, -50], r: 12, style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 2.5 } },
        { type: 'path', segments: [['M', -48, -64], ['C', -56, -96, -44, -118, -28, -124], ['L', -30, -106], ['L', -16, -126], ['L', -12, -108], ['L', 2, -128], ['L', 8, -110], ['L', 24, -124], ['L', 26, -104], ['L', 42, -112], ['C', 54, -100, 58, -84, 54, -66], ['C', 40, -78, 20, -82, 0, -80], ['C', -20, -78, -36, -74, -48, -64], ['Z']], style: { fill: 'skin.hair', stroke: 'skin.hairEdge', lineWidth: 3 } },
      ],
      features: {
        smile: [
          { type: 'ellipse', at: [16, -62], radii: [4, 7], style: { fill: 'skin.ink' } },
          { type: 'ellipse', at: [42, -62], radii: [4, 7], style: { fill: 'skin.ink' } },
          { type: 'strokePath', segments: [['M', 8, -76], ['Q', 16, -81, 24, -76]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'strokePath', segments: [['M', 34, -77], ['Q', 42, -82, 50, -76]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'strokePath', segments: [['M', 22, -32], ['Q', 31, -25, 40, -31]], style: { stroke: 'skin.ink', lineWidth: 3 } },
        ],
        think: [
          { type: 'ellipse', at: [18, -60], radii: [3.5, 6], style: { fill: 'skin.ink' } },
          { type: 'ellipse', at: [44, -60], radii: [3.5, 6], style: { fill: 'skin.ink' } },
          { type: 'strokePath', segments: [['M', 8, -80], ['Q', 16, -86, 24, -80]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'strokePath', segments: [['M', 34, -79], ['Q', 42, -84, 50, -79]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'strokePath', segments: [['M', 25, -29], ['L', 39, -29]], style: { stroke: 'skin.ink', lineWidth: 3 } },
        ],
        puzzled: [
          { type: 'ellipse', at: [16, -62], radii: [4, 7], style: { fill: 'skin.ink' } },
          { type: 'ellipse', at: [42, -62], radii: [4, 7], style: { fill: 'skin.ink' } },
          { type: 'strokePath', segments: [['M', 8, -74], ['L', 24, -79]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'strokePath', segments: [['M', 34, -79], ['L', 50, -74]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'strokePath', segments: [['M', 24, -29], ['Q', 28, -33, 32, -29], ['Q', 36, -25, 40, -29]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
        ],
        surprise: [
          { type: 'ellipse', at: [16, -62], radii: [4.5, 9], style: { fill: 'skin.ink' } },
          { type: 'ellipse', at: [42, -62], radii: [4.5, 9], style: { fill: 'skin.ink' } },
          { type: 'strokePath', segments: [['M', 8, -82], ['Q', 16, -88, 24, -82]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'strokePath', segments: [['M', 34, -83], ['Q', 42, -89, 50, -82]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
          { type: 'ellipse', at: [31, -27], radii: [5.5, 8.5], style: { fill: 'skin.mouth' } },
        ],
        laugh: [
          { type: 'strokePath', segments: [['M', 9, -60], ['Q', 16, -53, 23, -60]], style: { stroke: 'skin.ink', lineWidth: 3 } },
          { type: 'strokePath', segments: [['M', 35, -60], ['Q', 42, -53, 49, -60]], style: { stroke: 'skin.ink', lineWidth: 3 } },
          { type: 'path', segments: [['M', 16, -34], ['Q', 31, -12, 46, -34], ['Q', 31, -26, 16, -34], ['Z']], style: { fill: 'skin.mouth' } },
          { type: 'ellipse', at: [31, -21], radii: [7, 3.5], style: { fill: 'skin.tongue' } },
        ],
      } },
    { id: 'book', attachTo: 'hand_L', attachRotDeg: -6, gate: 'book', z: 8, anchors: { grip: [0, 10] },
      shapes: [
        { type: 'path', segments: [['M', -58, -64], ['L', 0, -54], ['L', 58, -64], ['L', 58, 6], ['L', 0, 14], ['L', -58, 6], ['Z']], style: { fill: 'skin.bookCover', stroke: 'skin.bookEdge', lineWidth: 3 } },
        { type: 'path', segments: [['M', -50, -56], ['L', 0, -47], ['L', 50, -56], ['L', 50, 0], ['L', 0, 7], ['L', -50, 0], ['Z']], style: { fill: 'skin.page', stroke: 'skin.bookEdge', lineWidth: 2 } },
        { type: 'strokePath', segments: [['M', 0, -47], ['L', 0, 7]], style: { stroke: 'skin.bookEdge', lineWidth: 2 } },
        { type: 'strokePath', segments: [['M', -42, -44], ['L', -10, -38], ['M', -42, -30], ['L', -10, -24], ['M', 10, -38], ['L', 42, -44], ['M', 10, -24], ['L', 42, -30]], style: { stroke: 'skin.cloudEdge', lineWidth: 2 } },
      ] },
    { id: 'bubble', gate: 'bubble', z: 9,
      shapes: [
        { type: 'path', segments: [['M', 84, -440], ['C', 78, -458, 92, -470, 106, -466], ['C', 110, -482, 130, -488, 142, -478], ['C', 156, -488, 176, -480, 178, -464], ['C', 192, -458, 194, -440, 184, -432], ['C', 180, -418, 162, -414, 150, -420], ['L', 108, -420], ['C', 94, -414, 82, -426, 84, -440], ['Z']], style: { fill: 'skin.cloud', stroke: 'skin.cloudEdge', lineWidth: 3 } },
        { type: 'circle', at: [72, -424], r: 6, style: { fill: 'skin.cloud', stroke: 'skin.cloudEdge', lineWidth: 2.5 } },
        { type: 'circle', at: [88, -434], r: 9, style: { fill: 'skin.cloud', stroke: 'skin.cloudEdge', lineWidth: 2.5 } },
      ] },
  ],
  anchorSrc: { hand_L: ['forearmL', 'hand'], hand_R: ['forearmR', 'hand'], gaze: ['head', 'eye'], mouth: ['head', 'mouth'], chin: ['head', 'chin'], temple: ['head', 'temple'], foot_L: ['shinL', 'foot'], foot_R: ['shinR', 'foot'] },
  params: { height: { design: 484, computed: 460 }, armLengths: { upper: 92, fore: 90, reach: 182 }, legLengths: { thigh: 86, shin: 101 } },
  profiles: {
    standing: { from: 'l_coff0', variant: 'blazer', face: 'smile', angles: { armR: 3, forearmR: -8, armL: -3, forearmL: -10, head: 0, legL: 1, shinL: 0, legR: -1, shinR: 0 } },
    relaxed: { from: 'l_coff2', variant: 'shirt', face: 'smile', show: ['drape'], angles: { armR: 4, forearmR: -12, armL: -2, forearmL: -34, head: 2, legL: 1, shinL: 0, legR: -1, shinR: 0 } },
    thinking: { from: 'l_think', variant: 'shirt', face: 'think', show: ['bubble'], ik: { armL: { target: 'chin' } }, angles: { armR: 4, forearmR: -10, head: -5, legL: 1, shinL: 0, legR: -1, shinR: 0 } },
    idea: { from: 'l_idea0', variant: 'shirt', face: 'puzzled', show: ['book'], ik: { armR: { target: 'temple' } }, angles: { armL: 14, forearmL: -58, head: -3, legL: 1, shinL: 0, legR: -1, shinR: 0 } },
    pointing: { from: 'l_point', variant: 'shirt', face: 'surprise', ik: { armL: { target: '$target' } }, angles: { armR: 4, forearmR: -10, head: 0, legL: 1, shinL: 0, legR: -1, shinR: 0 } },
    laughing: { from: 'l_laugh', variant: 'shirt', face: 'laugh', angles: { armR: 14, forearmR: -52, armL: -14, forearmL: 52, head: -9, legL: 1, shinL: 0, legR: -1, shinR: 0 } },
  },
};
export const ELEMENTS = { teapot: TEAPOT, cup: CUP, linda: LINDA };

// ================= 人物 FK / IK（几何一律由定义内枢轴/锚点坐标实算） =================
const D2R = Math.PI / 180;
const rot2 = (x, y, deg) => { const c = Math.cos(deg * D2R), s = Math.sin(deg * D2R); return [x * c - y * s, x * s + y * c]; };
const wrapDeg = (a) => { while (a > 180) a -= 360; while (a < -180) a += 360; return a; };
const chainOf = (def, id) => {
  const chain = [];
  let p = partOf(def, id);
  while (p) { chain.unshift(p); p = p.parent ? partOf(def, p.parent) : null; }
  return chain;
};
// 部件坐标系在元素系中的位姿 {x, y, ang}：沿父链逐级 translate(pivot) ∘ rotate(pose 角)
export const fkPart = (def, pose, id) => {
  let x = 0, y = 0, ang = 0;
  for (const p of chainOf(def, id)) {
    const [rx, ry] = rot2(p.pivot ? p.pivot[0] : 0, p.pivot ? p.pivot[1] : 0, ang);
    x += rx; y += ry; ang += (pose.angles && pose.angles[p.id]) || 0;
  }
  return { x, y, ang };
};
// 元素锚点的元素系坐标（锚点出处 anchorSrc → 部件锚点，经 FK 链实算）
export const anchorPos = (def, pose, name) => {
  const src = def.anchorSrc[name];
  if (!src) throw new Error(`props/${def.element.id} 未知元素锚点 ${name}`);
  const [pid, an] = src, part = partOf(def, pid), f = fkPart(def, pose, pid);
  const a = part.anchors[an];
  const [rx, ry] = rot2(a[0], a[1], f.ang);
  return [f.x + rx, f.y + ry];
};
// 两骨 IK：求 upper/forearm 角使 hand 锚点落到 target（元素系）。双解中取肘更低（更自然）的一解。
export const solveArmIK = (def, pose, side, target) => {
  const upId = side === 'L' ? 'armL' : 'armR', foId = side === 'L' ? 'forearmL' : 'forearmR';
  const S = fkPart(def, pose, upId);                       // 肩点（部件原点，不受本臂角度影响）
  const fo = partOf(def, foId);
  const L1 = Math.hypot(fo.pivot[0], fo.pivot[1]);
  const L2 = Math.hypot(fo.anchors.hand[0], fo.anchors.hand[1]);
  const dx = target[0] - S.x, dy = target[1] - S.y;
  const dist = Math.min(Math.hypot(dx, dy), L1 + L2 - 1e-3);
  if (!(dist > 1e-6)) throw new Error(`props/${def.element.id} IK 目标与肩点重合，方向未定义`);
  const theta = Math.atan2(-(dx / Math.hypot(dx, dy)), dy / Math.hypot(dx, dy)) / D2R;   // 目标方向角（自 +y 轴、画布旋转口径）
  const gamma = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist)))) / D2R;
  const betaAbs = 180 - Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + L2 * L2 - dist * dist) / (2 * L1 * L2)))) / D2R;
  let best = null;
  for (const sgn of [1, -1]) {
    const up = theta - sgn * gamma, foA = sgn * betaAbs;
    const trial = { ...pose, angles: { ...(pose.angles || {}), [upId]: up, [foId]: foA } };
    const H = anchorPos(def, trial, side === 'L' ? 'hand_L' : 'hand_R');
    const E = fkPart(def, trial, foId);
    const err = Math.hypot(H[0] - (S.x + dx * dist / Math.hypot(dx, dy)), H[1] - (S.y + dy * dist / Math.hypot(dx, dy)));
    // 验收阈值 1.5：hand 锚点带 1px 横向偏移（锚点不在前臂轴线上），FK 残差下限 ≈1，属几何固有量
    if (err < 1.5 && (!best || E.y > best.E.y)) best = { up, fo: foA, E };
  }
  if (!best) throw new Error(`props/${def.element.id} IK 无解（target=${target}）`);
  return { [upId]: best.up, [foId]: best.fo };
};
// 姿态解析：profile（静态角 + 表情/变体/门控）→ 应用 IK（锚点目标 / 场景 $target）→ 可绘制 pose
export const resolvePose = (def, name, opts = {}) => {
  const prof = def.profiles[name];
  if (!prof) throw new Error(`props/${def.element.id} 未知姿态 ${name}`);
  const pose = { name, angles: { ...(prof.angles || {}) }, face: prof.face || 'smile', variant: prof.variant || 'shirt', show: [...(prof.show || [])], target: null };
  for (const [armKey, spec] of Object.entries(prof.ik || {})) {
    const side = armKey === 'armL' ? 'L' : 'R';
    let target;
    if (spec.target === '$target') {
      if (!opts.target) throw new Error(`props/${def.element.id} 姿态 ${name} 需要场景给目标（opts.target）`);
      target = opts.target; pose.target = target;
    } else {
      target = anchorPos(def, pose, spec.target);         // 锚点目标：以当前（头角已定）姿态实算
    }
    Object.assign(pose.angles, solveArmIK(def, pose, side, target));
    if (spec.target === '$target') {                      // 视线跟随：头角朝目标转一半（钳制 ±14°）
      const eye = anchorPos(def, pose, 'gaze');
      const want = Math.atan2(target[1] - eye[1], target[0] - eye[0]) / D2R;
      const cur = pose.angles.head || 0;
      pose.angles.head = cur + Math.max(-14, Math.min(14, wrapDeg(want - cur) * 0.55));
    }
  }
  return pose;
};
// 姿态混合（切换交淡的角插值版）：角度逐项 lerp；表情/变体在中点切换；门控部件按 gateAlpha 淡入淡出
export const blendPose = (def, a, b, u) => {
  const angles = {};
  for (const k of new Set([...Object.keys(a.angles || {}), ...Object.keys(b.angles || {})])) {
    const va = (a.angles || {})[k] || 0, vb = (b.angles || {})[k] || 0;
    angles[k] = va + (vb - va) * u;
  }
  const gateAlpha = {};
  for (const gname of new Set([...(a.show || []), ...(b.show || [])])) {
    const inA = (a.show || []).includes(gname), inB = (b.show || []).includes(gname);
    gateAlpha[gname] = inA && inB ? 1 : inB ? u : 1 - u;
  }
  return { name: u < 0.5 ? a.name : b.name, angles, face: u < 0.5 ? a.face : b.face, variant: u < 0.5 ? a.variant : b.variant, show: [...new Set([...(a.show || []), ...(b.show || [])])], gateAlpha, target: b.target || a.target };
};
// 行走姿态（程序化步态，承位图 l_w0-3：腿摆 ±26°、膝随后摆、臂反摆）
export const walkPose = (def, ph) => {
  const s = Math.sin(ph);
  return { name: 'walking', variant: 'shirt', face: 'smile', show: [], angles: {
    legL: -26 * s, shinL: 6 + 20 * Math.max(0, Math.sin(ph + 0.9)), legR: 26 * s, shinR: 6 + 20 * Math.max(0, Math.sin(ph - 0.9 + Math.PI)),
    armL: 13 * s, forearmL: -14, armR: -13 * s, forearmR: -14, head: 2 } };
};

// ================= 基元断言：point / hold / 到达 / 贴地（构建期执行，不过抛错停建） =================
// point 基元校验：目标在身前半平面、肩→手射线与目标方向夹角 ≤ 3°、视线夹角 ≤ 25°、手不超 reach
export const assertPoint = (def, pose, side, target) => {
  const upId = side === 'L' ? 'armL' : 'armR';
  const S = fkPart(def, pose, upId);
  const H = anchorPos(def, pose, side === 'L' ? 'hand_L' : 'hand_R');
  const dx = target[0] - S.x, dy = target[1] - S.y, dist = Math.hypot(dx, dy);
  if (!(dist > 1e-6)) throw new Error(`props/${def.element.id} point 断言失败：目标与肩点重合`);
  if (dx < -20) throw new Error(`props/${def.element.id} point 断言失败：目标在身后半平面（相对肩点 dx=${dx.toFixed(0)} < -20）`);
  const hx = H[0] - S.x, hy = H[1] - S.y, hd = Math.hypot(hx, hy);
  const angErr = Math.acos(Math.max(-1, Math.min(1, (dx * hx + dy * hy) / (dist * hd)))) / D2R;
  if (angErr > 3) throw new Error(`props/${def.element.id} point 断言失败：手射线偏离目标方向 ${angErr.toFixed(1)}° > 3°`);
  if (hd > def.params.armLengths.reach + 1) throw new Error(`props/${def.element.id} point 断言失败：手距 ${hd.toFixed(0)} 超 reach ${def.params.armLengths.reach}`);
  const gazeAng = fkPart(def, pose, 'head').ang;
  const want = Math.atan2(dy, dx) / D2R;
  const gazeErr = Math.abs(wrapDeg(gazeAng - want));
  if (gazeErr > 25) throw new Error(`props/${def.element.id} point 断言失败：视线偏离目标 ${gazeErr.toFixed(1)}° > 25°`);
  return { angErr, gazeErr };
};
// hold 基元：道具原点应对位量（道具以 grip 锚点贴到手锚点，道具不旋转）
export const holdOffset = (handPos, gripLocal) => [handPos[0] - gripLocal[0], handPos[1] - gripLocal[1]];
// hold 断言：对位后残差 |手锚点 − (道具原点 + grip)| ≤ 0.5，否则抛错
export const assertHold = (charDef, pose, handName, propDef, gripLocal, propOrigin) => {
  const H = anchorPos(charDef, pose, handName);
  const gx = propOrigin[0] + gripLocal[0], gy = propOrigin[1] + gripLocal[1];
  const res = Math.hypot(H[0] - gx, H[1] - gy);
  if (res > 0.5) throw new Error(`props hold 断言失败：${charDef.element.id}.${handName} 与 ${propDef.element.id} grip 对位残差 ${res.toFixed(1)} > 0.5`);
  return res;
};
// 到达断言：IK 姿态解析后手与目标锚点距离 ≤ tol（手托下巴/挠头类）
export const assertAnchorReach = (def, pose, handName, targetName, tol = 6) => {
  const H = anchorPos(def, pose, handName), T = anchorPos(def, pose, targetName);
  const d = Math.hypot(H[0] - T[0], H[1] - T[1]);
  if (d > tol) throw new Error(`props/${def.element.id} 到达断言失败：${handName} 距 ${targetName} ${d.toFixed(1)} > ${tol}`);
  return d;
};
// 贴地断言：站立类姿态双脚 foot 锚点 y ∈ [-tol, tol]
export const assertFeetOnGround = (def, pose, tol = 2) => {
  const fl = anchorPos(def, pose, 'foot_L'), fr = anchorPos(def, pose, 'foot_R');
  if (Math.abs(fl[1]) > tol || Math.abs(fr[1]) > tol) throw new Error(`props/${def.element.id} 贴地断言失败：foot_L y=${fl[1].toFixed(1)} foot_R y=${fr[1].toFixed(1)}（tol ${tol}）`);
  return [fl, fr];
};

// ================= 人物绘制（层级部件：父链变换 ∘ 部件角；变体/表情/门控/附着） =================
const drawShapes = (g, def, shapes) => {
  if (!shapes) return;
  for (const sh of shapes) {
    const style = sh.style;
    if (sh.type === 'path') { replay(g, sh.segments); paint(g, def, style); }
    else if (sh.type === 'strokePath') { replay(g, sh.segments); paint(g, def, { stroke: (style && style.stroke) || 'skin.edge', lineWidth: (style && style.lineWidth) || 3 }); }
    else if (sh.type === 'circle') { g.beginPath(); g.arc(sh.at[0], sh.at[1], sh.r, 0, 7); paint(g, def, style); }
    else if (sh.type === 'ellipse') { g.beginPath(); g.ellipse(sh.at[0], sh.at[1], sh.radii[0], sh.radii[1], sh.rot || 0, 0, 7); paint(g, def, style); }
  }
};
export const drawCharacter = (g, def, pose) => {
  g.lineJoin = 'round'; g.lineCap = 'round';
  const kids = {};
  for (const p of def.parts) if (p.parent) (kids[p.parent] ??= []).push(p);
  const drawPart = (part) => {
    if (part.gate && !(pose.show || []).includes(part.gate)) return;
    g.save();
    if (part.gate && pose.gateAlpha && pose.gateAlpha[part.gate] != null) g.globalAlpha *= pose.gateAlpha[part.gate];
    if (part.attachTo) {   // 附着部件（hold 基元）：原点（grip）对位到元素锚点
      const [hx, hy] = anchorPos(def, pose, part.attachTo);
      g.translate(hx, hy); g.rotate((part.attachRotDeg || 0) * D2R);
      drawShapes(g, def, part.shapes);
      g.restore(); return;
    }
    g.translate(part.pivot ? part.pivot[0] : 0, part.pivot ? part.pivot[1] : 0);
    g.rotate(((pose.angles && pose.angles[part.id]) || 0) * D2R);
    const items = [{ z: 0, self: true }, ...((kids[part.id] || []).map(c => ({ z: c.z || 0, part: c })))].sort((a, b) => a.z - b.z);
    for (const it of items) {
      if (it.self) {
        drawShapes(g, def, part.variants ? part.variants[pose.variant] : part.shapes);
        if (part.features) drawShapes(g, def, part.features[pose.face]);
      } else drawPart(it.part);
    }
    g.restore();
  };
  for (const root of def.parts.filter(p => !p.parent).sort((a, b) => a.z - b.z)) drawPart(root);
};

// ================= T16 P1 核心道具扩展（纯追加段：既有导出/行为一字未动） =================
// 定义源：model/props/knife.yaml / apple.yaml / bread.yaml / book.yaml / box.yaml（各 v1）。
// 纪律同文件头：几何一律由定义内锚点/段表坐标实算；断言只引锚点与参数，不引裸坐标。

// ================= 元素定义（渲染侧同步副本；源 = model/props/knife.yaml v1） =================
export const KNIFE = {
  element: { id: 'knife', kind: 'prop', version: 1, title: '刀（厨房用刀）' },
  placement: { world: [700, 400] },
  skin: {
    tokens: { blade: '#d7dce2', bladeEdge: '#9aa4ae', bolster: '#8a929c', grip: '#8a5a2b', gripEdge: '#68431d', rivet: '#e8e2d4' },
  },
  parts: [
    { id: 'blade', pivot: [0, 0], z: 2, anchors: { edgeHeel: [4, 13], edgeTip: [128, 4], spineHeel: [0, -13] },
      shapes: [
        { type: 'path', segments: [['M', 0, -13], ['L', 108, -11],
          ['C', 124, -9, 131, -2, 127, 5],
          ['C', 122, 12, 96, 15, 60, 15.5],
          ['C', 34, 16, 12, 15, 2, 13],
          ['Q', -2, 0, 0, -13], ['Z']],
          style: { fill: 'skin.blade', stroke: 'skin.bladeEdge', lineWidth: 3 } },
      ] },
    { id: 'bolster', pivot: [0, 0], z: 3,
      shapes: [
        { type: 'path', segments: [['M', -7, -13], ['L', 3, -13], ['L', 3, 15], ['L', -7, 15], ['Z']], style: { fill: 'skin.bolster' } },
      ] },
    { id: 'handle', pivot: [0, 0], z: 1, anchors: { grip: [-45, 1] },
      shapes: [
        { type: 'path', segments: [['M', -7, -11], ['L', -82, -8],
          ['C', -92, -7, -92, 9, -82, 10],
          ['L', -7, 13], ['Z']],
          style: { fill: 'skin.grip', stroke: 'skin.gripEdge', lineWidth: 3 } },
        { type: 'circle', at: [-30, 1], r: 3, style: { fill: 'skin.rivet' } },
        { type: 'circle', at: [-58, 1], r: 3, style: { fill: 'skin.rivet' } },
      ] },
  ],
  params: { bladeLen: { design: 124 } },   // computed 不存：由 knifeGeom() 从锚点实算
};
// 刃口几何：刃口弦两端由 parts.blade 锚点给出，弦长实算（禁止手填）
export const knifeGeom = (def) => {
  const b = partOf(def, 'blade');
  const heel = b.anchors.edgeHeel, tip = b.anchors.edgeTip;
  return { heel, tip, len: Math.hypot(tip[0] - heel[0], tip[1] - heel[1]) };
};
// 构建期断言：刃口弦实算长与 params.bladeLen.design 一致（差 ≤ 1），否则定义自相矛盾、抛错停建。返回实算弦长。
export const assertKnifeGeometry = (def) => {
  const { len } = knifeGeom(def);
  const design = def.params && def.params.bladeLen && def.params.bladeLen.design;
  if (design != null && Math.abs(len - design) > 1) throw new Error(`props/${def.element.id} 刃口断言失败：锚点实算弦长 ${len.toFixed(1)} 与 design ${design} 不一致——改刃口锚点必须同步改 design`);
  return len;
};

// ================= 元素定义（渲染侧同步副本；源 = model/props/apple.yaml v1） =================
export const APPLE = {
  element: { id: 'apple', kind: 'prop', version: 1, title: '苹果（可切物）' },
  placement: { world: [700, 490] },
  skin: {
    tokens: { skin: '#d8402e', edge: '#a32418', flesh: '#fdf0d0', fleshEdge: '#e3b978', seed: '#5a3a1a', stem: '#7a4a21', leaf: '#4d9b47', highlight: 'rgba(255,255,255,.28)' },
  },
  parts: [
    { id: 'body', pivot: [0, 0], z: 1, anchors: { top: [0, -47], bottom: [0, 50] },
      shapes: [
        { type: 'path', segments: [['M', -4, -48],
          ['C', -26, -56, -52, -40, -54, -10],
          ['C', -56, 18, -40, 44, -16, 50],
          ['C', -8, 52, -3, 49, 0, 49],
          ['C', 3, 49, 8, 52, 16, 50],
          ['C', 40, 44, 56, 18, 54, -10],
          ['C', 52, -40, 26, -56, 4, -48],
          ['C', 1, -46.5, -1, -46.5, -4, -48], ['Z']],
          style: { fill: 'skin.skin', stroke: 'skin.edge', lineWidth: 3.5 } },
        { type: 'ellipse', at: [-24, -16], radii: [11, 17], rot: 0.3, style: { fill: 'skin.highlight' } },
      ] },
    { id: 'stem', pivot: [0, 0], z: 2, anchors: { stemTop: [9, -69] },
      shapes: [
        { type: 'strokePath', segments: [['M', -1, -48], ['C', 0, -58, 3, -64, 9, -69]], style: { stroke: 'skin.stem', lineWidth: 5 } },
        { type: 'ellipse', at: [17, -57], radii: [13, 6], rot: -0.5, style: { fill: 'skin.leaf', stroke: 'skin.edge', lineWidth: 2 } },
      ] },
  ],
  cut: {
    outlinePart: 'body',
    axis: [[0, -80], [0, 80]],
    face: { depth: 6, fill: 'skin.flesh', edge: 'skin.fleshEdge' },
    details: [
      { kind: 'seed', along: 0.42, off: 4, radii: [3.6, 6], style: { fill: 'skin.seed' } },
      { kind: 'seed', along: 0.58, off: 4, radii: [3.6, 6], style: { fill: 'skin.seed' } },
    ],
  },
  params: { width: { design: 108 }, height: { design: 101 } },   // computed 不存：由 outlineBBox() 从段表实算（108.3 / 100.7）
};

// ================= 元素定义（渲染侧同步副本；源 = model/props/bread.yaml v1） =================
export const BREAD = {
  element: { id: 'bread', kind: 'prop', version: 1, title: '面包（土司条，可切物）' },
  placement: { world: [1250, 490] },
  skin: {
    tokens: { crust: '#d99a3d', edge: '#a96f22', crumb: '#f6dfae', crumbEdge: '#d9a95c', score: '#b57e2a', highlight: 'rgba(255,255,255,.22)' },
  },
  parts: [
    { id: 'body', pivot: [0, 0], z: 1, anchors: { top: [0, -50], bottom: [0, 37] },
      shapes: [
        { type: 'path', segments: [['M', -78, 32], ['L', -78, -2],
          ['C', -78, -34, -46, -50, 0, -50],
          ['C', 46, -50, 78, -34, 78, -2],
          ['L', 78, 32],
          ['Q', 0, 42, -78, 32], ['Z']],
          style: { fill: 'skin.crust', stroke: 'skin.edge', lineWidth: 3.5 } },
        { type: 'ellipse', at: [-26, -30], radii: [22, 9], rot: -0.25, style: { fill: 'skin.highlight' } },
      ] },
    { id: 'scores', pivot: [0, 0], z: 2,
      shapes: [
        { type: 'strokePath', segments: [['M', -42, -38], ['L', -30, -24]], style: { stroke: 'skin.score', lineWidth: 4 } },
        { type: 'strokePath', segments: [['M', -6, -46], ['L', 6, -30]], style: { stroke: 'skin.score', lineWidth: 4 } },
        { type: 'strokePath', segments: [['M', 26, -38], ['L', 38, -24]], style: { stroke: 'skin.score', lineWidth: 4 } },
      ] },
  ],
  cut: {
    outlinePart: 'body',
    axis: [[0, -80], [0, 80]],
    face: { depth: 6, fill: 'skin.crumb', edge: 'skin.crumbEdge' },
    details: [
      { kind: 'pore', along: 0.25, off: 4, r: 2.2, style: { fill: 'skin.crumbEdge' } },
      { kind: 'pore', along: 0.5, off: 4, r: 2.6, style: { fill: 'skin.crumbEdge' } },
      { kind: 'pore', along: 0.75, off: 4, r: 2.2, style: { fill: 'skin.crumbEdge' } },
    ],
  },
  params: { width: { design: 156 }, height: { design: 87 } },   // computed 不存：由 outlineBBox() 从段表实算（156.0 / 87.0）
};

// ================= 通用多边形几何（段表打平 / 面积 / 半平面裁剪；cut 基元的实算底座） =================
// 段表打平：C/Q 曲线按 steps 采样成折线，返回闭合多边形点列（末点不重复首点）
export const flattenSegs = (segs, steps = 20) => {
  const pts = [];
  let cur = null, start = null;
  const push = (p) => { if (!cur || Math.abs(p[0] - cur[0]) > 1e-12 || Math.abs(p[1] - cur[1]) > 1e-12) pts.push(p); cur = p; };
  for (const s of segs) {
    const [op, ...a] = s;
    if (op === 'M') { cur = [a[0], a[1]]; start = cur; pts.push(cur); }
    else if (op === 'L') push([a[0], a[1]]);
    else if (op === 'C') {
      const p0 = cur, p1 = [a[0], a[1]], p2 = [a[2], a[3]], p3 = [a[4], a[5]];
      for (let k = 1; k <= steps; k++) {
        const t = k / steps, u = 1 - t;
        push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
              u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]);
      }
    }
    else if (op === 'Q') {
      const p0 = cur, p1 = [a[0], a[1]], p2 = [a[2], a[3]];
      for (let k = 1; k <= steps; k++) {
        const t = k / steps, u = 1 - t;
        push([u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
              u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]]);
      }
    }
    else if (op === 'Z') { cur = start; }
  }
  if (pts.length > 1) {
    const f = pts[0], l = pts[pts.length - 1];
    if (Math.abs(f[0] - l[0]) < 1e-12 && Math.abs(f[1] - l[1]) < 1e-12) pts.pop();
  }
  return pts;
};
export const polyArea = (pts) => {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
};
export const polyBBox = (pts) => {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
};
// 可切物轮廓多边形（cut.outlinePart 部件的第一个 path 形状，段表打平实算）
export const outlineOf = (def) => {
  const part = partOf(def, def.cut && def.cut.outlinePart);
  const shape = part && part.shapes.find(s => s.type === 'path');
  if (!shape) throw new Error(`props/${def.element.id} 无可切轮廓（cut.outlinePart 的 path 形状缺失）`);
  return flattenSegs(shape.segments);
};
export const outlineBBox = (def) => polyBBox(outlineOf(def));
// 半平面裁剪（Sutherland–Hodgman）：保留 n·p − d 与 keepLe 口径相符的一侧（true → ≤ 0 侧）
export const clipHalfPlane = (pts, nx, ny, d, keepLe) => {
  const val = (p) => nx * p[0] + ny * p[1] - d;
  const inside = (p) => (keepLe ? val(p) <= 1e-12 : val(p) >= -1e-12);
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i], nxt = pts[(i + 1) % pts.length];
    const ci = inside(cur), ni = inside(nxt);
    if (ci) out.push(cur);
    if (ci !== ni) {
      const vc = val(cur), vn = val(nxt), t = vc / (vc - vn);
      out.push([cur[0] + (nxt[0] - cur[0]) * t, cur[1] + (nxt[1] - cur[1]) * t]);
    }
  }
  return out;
};
const ptSegDist = (p, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
  const t = L2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2)) : 0;
  return Math.hypot(p[0] - (a[0] + dx * t), p[1] - (a[1] + dy * t));
};

// ================= cut 基元（一刀派生两半：轮廓被切线半平面裁成两块，禁止整物复制） =================
// 切线由两点（a→b，默认取 def.cut.axis）定直线；法向 n = 方向左转 90°。
// 返回 { a, b, u, n, d, full, halves:{neg,pos}, chord:[c1,c2], areas, widths }，全部由轮廓坐标实算。
export const cutHalves = (def, a, b) => {
  const A = a || def.cut.axis[0], B = b || def.cut.axis[1];
  const ux0 = B[0] - A[0], uy0 = B[1] - A[1], ul = Math.hypot(ux0, uy0);
  if (!(ul > 1e-9)) throw new Error(`props/${def.element.id} cut 断言失败：切线两点重合，方向未定义`);
  const u = [ux0 / ul, uy0 / ul], n = [-u[1], u[0]];
  const d = n[0] * A[0] + n[1] * A[1];
  const full = outlineOf(def);
  const neg = clipHalfPlane(full, n[0], n[1], d, true);
  const pos = clipHalfPlane(full, n[0], n[1], d, false);
  // 切口弦：切线与轮廓边界的交点（沿轮廓边扫描符号变化，插值实算）
  const val = (p) => n[0] * p[0] + n[1] * p[1] - d;
  const cross = [];
  for (let i = 0; i < full.length; i++) {
    const p = full[i], q = full[(i + 1) % full.length];
    const vp = val(p), vq = val(q);
    if (Math.abs(vp) < 1e-12) cross.push(p);
    else if ((vp < 0) !== (vq < 0)) {
      const t = vp / (vp - vq);
      cross.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  }
  const uniq = [];
  for (const p of cross) if (!uniq.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-9)) uniq.push(p);
  uniq.sort((p, q) => (u[0] * p[0] + u[1] * p[1]) - (u[0] * q[0] + u[1] * q[1]));
  const extent = (pts) => {
    let lo = Infinity, hi = -Infinity;
    for (const p of pts) { const v = n[0] * p[0] + n[1] * p[1]; lo = Math.min(lo, v); hi = Math.max(hi, v); }
    return hi - lo;
  };
  return {
    a: A, b: B, u, n, d, full,
    halves: { neg, pos },
    chord: uniq.length >= 2 ? [uniq[0], uniq[uniq.length - 1]] : null,
    areas: { full: polyArea(full), neg: polyArea(neg), pos: polyArea(pos) },
    widths: { full: extent(full), neg: extent(neg), pos: extent(pos) },
  };
};
// 构建期断言（cut 契约）：面积守恒、每半严格介于整物 1%–99%（拦截整物复制与退化切）、
// 法向宽度守恒、切口弦存在且两端落在轮廓边界上。不过抛错停建。返回 { ratioNeg, chordLen }。
export const assertCutConservation = (def, res) => {
  const id = def.element.id, A = res.areas;
  if (!(A.full > 0)) throw new Error(`props/${id} cut 断言失败：轮廓面积为 0`);
  if (Math.abs(A.neg + A.pos - A.full) > Math.max(A.full * 1e-6, 1e-9))
    throw new Error(`props/${id} cut 断言失败：两半面积和 ${ (A.neg + A.pos).toFixed(1) } ≠ 整物面积 ${A.full.toFixed(1)}（守恒破坏——切出整物复制或丢料）`);
  for (const [side, ar] of [['neg', A.neg], ['pos', A.pos]]) {
    const r = ar / A.full;
    if (!(r > 0.01 && r < 0.99))
      throw new Error(`props/${id} cut 断言失败：${side} 半面积占比 ${(r * 100).toFixed(1)}% 不在 (1%, 99%)——一刀只能派生两半，禁止整物复制/退化切`);
  }
  if (Math.abs(res.widths.neg + res.widths.pos - res.widths.full) > Math.max(res.widths.full * 1e-6, 1e-9))
    throw new Error(`props/${id} cut 断言失败：两半法向宽度和 ${ (res.widths.neg + res.widths.pos).toFixed(2) } ≠ 整物宽度 ${res.widths.full.toFixed(2)}`);
  if (!res.chord) throw new Error(`props/${id} cut 断言失败：切线未与轮廓相交（无切口弦）`);
  const [c1, c2] = res.chord;
  const chordLen = Math.hypot(c2[0] - c1[0], c2[1] - c1[1]);
  if (!(chordLen > 0)) throw new Error(`props/${id} cut 断言失败：切口弦长为 0（切线与轮廓相切）`);
  for (const c of res.chord) {
    let best = Infinity;
    for (let i = 0; i < res.full.length; i++) best = Math.min(best, ptSegDist(c, res.full[i], res.full[(i + 1) % res.full.length]));
    if (best > 1e-6) throw new Error(`props/${id} cut 断言失败：切口弦端点距轮廓边界 ${best.toFixed(3)} > 1e-6（弦端点必须在轮廓上）`);
  }
  return { ratioNeg: A.neg / A.full, chordLen };
};
// 切面细节（籽/气孔）在某半上的实算位置：along 沿弦 + off 自弦向半体内侧偏移（坐标全由弦实算）。
// 半侧方向口径：neg 半（n·p ≤ d）的材料在 −n 一侧、pos 半在 +n 一侧，故内向/分离方向 neg 取 −n、pos 取 +n。
export const halfDir = (res, side) => (side === 'neg' ? [-res.n[0], -res.n[1]] : [res.n[0], res.n[1]]);
export const cutFacePoints = (def, res, side) => {
  const inw = halfDir(res, side);
  const [c1, c2] = res.chord;
  return (def.cut.details || []).map(dt => {
    const bx = c1[0] + (c2[0] - c1[0]) * dt.along, by = c1[1] + (c2[1] - c1[1]) * dt.along;
    return { ...dt, side, at: [bx + inw[0] * dt.off, by + inw[1] * dt.off] };
  });
};
// 构建期断言：刃口弦必须跨满切口弦（assertBladeCovers），否则画面上是「刀没切到底」。返回刃口弦长。
export const assertBladeCovers = (knifeDef, res) => {
  const { len } = knifeGeom(knifeDef);
  if (!res.chord) throw new Error(`props cut 断言失败：无切口弦可校验`);
  const chordLen = Math.hypot(res.chord[1][0] - res.chord[0][0], res.chord[1][1] - res.chord[0][1]);
  if (len < chordLen - 1e-9)
    throw new Error(`props cut 断言失败：${knifeDef.element.id} 刃口弦 ${len.toFixed(1)} < 被切物切口弦 ${chordLen.toFixed(1)}——刃必须跨满切口`);
  return len;
};
// 可切物绘制：两半各自 clip 后回放全部部件形状（部件归属由 clip 决定），再补切面带 + 切面细节。
// opts: { a, b } 切线（默认 def.cut.axis）、sep 两半沿法向各自分开的距离、face=false 关切面。
// 绘制前先过 assertCutConservation（与 drawLiquid 先过 assertFill 同例：断言不过不绘制）。
export const drawCuttable = (g, def, opts = {}) => {
  const res = cutHalves(def, opts.a, opts.b);
  assertCutConservation(def, res);
  const sep = opts.sep || 0, n = res.n;
  g.lineJoin = 'round'; g.lineCap = 'round';
  for (const side of ['neg', 'pos']) {
    const inw = halfDir(res, side);
    const poly = res.halves[side];
    const dx = inw[0] * sep, dy = inw[1] * sep;
    g.save();
    g.translate(dx, dy);
    g.beginPath();
    poly.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])));
    g.closePath(); g.clip();
    for (const part of [...def.parts].sort((x, y) => x.z - y.z)) drawShapes(g, def, part.shapes);
    g.restore();
    if (opts.face !== false && res.chord) {
      const [c1, c2] = res.chord, dep = def.cut.face.depth;
      const ox = inw[0] * dep, oy = inw[1] * dep;
      g.beginPath();
      g.moveTo(c1[0] + dx, c1[1] + dy); g.lineTo(c2[0] + dx, c2[1] + dy);
      g.lineTo(c2[0] + ox + dx, c2[1] + oy + dy); g.lineTo(c1[0] + ox + dx, c1[1] + oy + dy);
      g.closePath();
      g.fillStyle = resolve(def, def.cut.face.fill); g.fill();
      g.strokeStyle = resolve(def, def.cut.face.edge); g.lineWidth = 2; g.stroke();
      for (const dt of cutFacePoints(def, res, side)) {
        g.beginPath();
        if (dt.radii) g.ellipse(dt.at[0] + dx, dt.at[1] + dy, dt.radii[0], dt.radii[1], 0, 0, 7);
        else g.arc(dt.at[0] + dx, dt.at[1] + dy, dt.r || 2, 0, 7);
        paint(g, def, dt.style);
      }
    }
  }
  return res;
};

// ================= 元素定义（渲染侧同步副本；源 = model/props/book.yaml v2） =================
// v2：闭合态三层轮廓错开（页块前缘/下缘露 peek、后封再多出 backStep、前封加书脊带）；
// 锚点/铰链口径与 v1 一致（spinePivot/coverTip/pagePlane/hingeDeg 不动）。
export const BOOK = {
  element: { id: 'book', kind: 'prop', version: 2, title: '书（硬封面书）' },
  placement: { world: [600, 600] },
  skin: {
    tokens: { cover: '#b5651d', coverDark: '#8a4b12', coverEdge: '#7c4210', spineBand: '#8a4b12', page: '#fdf6e3', pageEdge: '#cbb98f', ink: '#b9c4cc' },
  },
  parts: [
    { id: 'backCover', pivot: [0, 0], z: 1,
      shapes: [
        { type: 'path', segments: [['M', 0, -74], ['L', 124, -74], ['L', 124, 82], ['L', 0, 82], ['Z']], style: { fill: 'skin.coverDark', stroke: 'skin.coverEdge', lineWidth: 3 } },
      ] },
    { id: 'pages', pivot: [0, 0], z: 2, anchors: { pageTL: [6, -68], pageTR: [120, -68], pageBR: [120, 78], pageBL: [6, 78], spine: [6, 0], foreEdge: [110, 0] },
      shapes: [
        { type: 'path', segments: [['M', 6, -68], ['L', 120, -68], ['L', 120, 78], ['L', 6, 78], ['Z']], style: { fill: 'skin.page', stroke: 'skin.pageEdge', lineWidth: 2.5 } },
        { type: 'strokePath', segments: [['M', 22, -42], ['L', 94, -42], ['M', 22, -20], ['L', 94, -20], ['M', 22, 2], ['L', 94, 2], ['M', 22, 24], ['L', 80, 24]], style: { stroke: 'skin.ink', lineWidth: 2.5 } },
      ] },
    { id: 'frontCover', hinge: true, pivot: [0, 0], z: 3, anchors: { tip: [116, 0], tipTop: [116, -74], tipBottom: [116, 74] },
      shapes: [
        { type: 'path', segments: [['M', 0, -74], ['L', 116, -74], ['L', 116, 74], ['L', 0, 74], ['Z']], style: { fill: 'skin.cover', stroke: 'skin.coverEdge', lineWidth: 3 } },
        { type: 'path', segments: [['M', 0, -74], ['L', 11, -74], ['L', 11, 74], ['L', 0, 74], ['Z']], style: { fill: 'skin.spineBand', stroke: 'skin.coverEdge', lineWidth: 2 } },
      ] },
  ],
  params: { coverLen: { design: 116 }, pageW: { computed: 104 }, peekFore: { design: 4 }, peekBottom: { design: 4 }, backStep: { design: 4 } },
  profiles: {
    closed: { hingeDeg: 0 },
    ajar: { hingeDeg: -70 },
    open: { hingeDeg: -165 },
  },
};

// ================= 元素定义（渲染侧同步副本；源 = model/props/box.yaml v1） =================
export const BOX = {
  element: { id: 'box', kind: 'prop', version: 1, title: '箱子（带盖纸箱）' },
  placement: { world: [900, 600] },
  skin: {
    tokens: { body: '#c98d4b', edge: '#9a6a2e', inner: '#8a5a24', lid: '#d69e58', lidEdge: '#9a6a2e', tape: '#e8dcc2' },
  },
  parts: [
    { id: 'body', pivot: [0, 0], z: 1, anchors: { rimL: [-80, -58], rimR: [80, -58], floorL: [-67, 30], floorR: [67, 30], base: [0, 38] },
      shapes: [
        { type: 'path', segments: [['M', -80, -58], ['L', 80, -58], ['L', 75, 38], ['L', -75, 38], ['Z']], style: { fill: 'skin.body', stroke: 'skin.edge', lineWidth: 3.5 } },
        { type: 'path', segments: [['M', -72, -58], ['L', 72, -58], ['L', 67, 30], ['L', -67, 30], ['Z']], style: { fill: 'skin.inner' } },
      ] },
    { id: 'lid', hinge: true, pivot: [-80, -58], z: 2, anchors: { tip: [88, -58], hingeEnd: [-80, -58] },
      shapes: [
        { type: 'path', segments: [['M', -80, -65], ['L', 88, -65], ['L', 88, -51], ['L', -80, -51], ['Z']], style: { fill: 'skin.lid', stroke: 'skin.lidEdge', lineWidth: 3 } },
        { type: 'path', segments: [['M', -4, -65], ['L', 4, -65], ['L', 4, -51], ['L', -4, -51], ['Z']], style: { fill: 'skin.tape' } },
      ] },
  ],
  params: {
    wall: 8,
    cavity: { rimY: -58, bottomY: 30, halfTop: 72, halfBottom: 67 },
    lidLen: { design: 168 },
  },
  profiles: {
    closed: { hingeDeg: 0 },
    open: { hingeDeg: -105 },
  },
};
ELEMENTS.knife = KNIFE;
ELEMENTS.apple = APPLE;
ELEMENTS.bread = BREAD;
ELEMENTS.book = BOOK;
ELEMENTS.box = BOX;

// ================= hinge 铰接（open/close 基元：绕部件 pivot 旋转，锚点位置全由实算） =================
// 铰接部件锚点在开合角 θ 下的元素系坐标 = pivot + R(θ)·(anchor − pivot)
export const hingeTipAt = (def, partId, anchorName, angleDeg) => {
  const part = partOf(def, partId);
  if (!part || !part.hinge) throw new Error(`props/${def.element.id} 部件 ${partId} 非铰接部件（缺 hinge 标记）`);
  const anchor = part.anchors && part.anchors[anchorName];
  if (!anchor) throw new Error(`props/${def.element.id} 铰接部件 ${partId} 无锚点 ${anchorName}`);
  const [rx, ry] = rot2(anchor[0] - part.pivot[0], anchor[1] - part.pivot[1], angleDeg);
  return [part.pivot[0] + rx, part.pivot[1] + ry];
};
// 开合角插值：自闭合（0°）到 profiles.<name>.hingeDeg，u ∈ [0,1]
export const hingeAngleAt = (def, profileName, u) => {
  const prof = (def.profiles || {})[profileName];
  if (!prof) throw new Error(`props/${def.element.id} 未知剖面 ${profileName}`);
  return (prof.hingeDeg || 0) * Math.max(0, Math.min(1, u));
};
// 构建期断言：铰接部件为刚体——锚点在多角度下距 pivot 半径恒定（差 ≤ 1e-9）。返回半径（= 锚点弦长实算）。
export const assertHingeRigid = (def, partId, anchorName) => {
  const part = partOf(def, partId);
  const r0 = Math.hypot(...(() => { const t = hingeTipAt(def, partId, anchorName, 0); return [t[0] - part.pivot[0], t[1] - part.pivot[1]]; })());
  for (const th of [-45, -90, -135, -180, 37]) {
    const t = hingeTipAt(def, partId, anchorName, th);
    const r = Math.hypot(t[0] - part.pivot[0], t[1] - part.pivot[1]);
    if (Math.abs(r - r0) > 1e-9) throw new Error(`props/${def.element.id} hinge 断言失败：${partId}.${anchorName} 在 ${th}° 时半径 ${r.toFixed(3)} ≠ ${r0.toFixed(3)}（铰接部件必须刚体）`);
  }
  return r0;
};
// 构建期断言（book）：coverLen 实算 vs design（差 ≤ 0.5）；闭合时前封盖满页平面（coverLen ≥ foreEdge.x、
// 封面顶缘 ≤ 页块顶缘）；v2 闭合可读性口径——三层轮廓错开量（peekFore/peekBottom/backStep）由轮廓
// bbox 实算与参数对账（页块在前缘/下缘露页边是口径本身，非盖不满）；页平面锚点齐备。返回 { coverLen, peekFore, peekBottom }。
export const assertBookGeometry = (def) => {
  const id = def.element.id;
  const coverLen = assertHingeRigid(def, 'frontCover', 'tip');
  const design = def.params && def.params.coverLen && def.params.coverLen.design;
  if (design != null && Math.abs(coverLen - design) > 0.5)
    throw new Error(`props/${id} book 断言失败：coverLen 实算 ${coverLen.toFixed(1)} 与 design ${design} 不一致`);
  const pages = partOf(def, 'pages'), cover = partOf(def, 'frontCover'), back = partOf(def, 'backCover');
  if (!(coverLen >= pages.anchors.foreEdge[0] - cover.pivot[0]))
    throw new Error(`props/${id} book 断言失败：封面长 ${coverLen.toFixed(1)} 盖不满页块外缘 ${pages.anchors.foreEdge[0]}（闭合时会露出页块）`);
  const bbOf = (part) => polyBBox(flattenSegs(part.shapes[0].segments));
  const cbb = bbOf(cover), pbb = bbOf(pages), bbb = bbOf(back);
  if (cbb.y0 > pbb.y0)
    throw new Error(`props/${id} book 断言失败：封面顶缘 ${cbb.y0} 低于页块顶缘 ${pbb.y0}（闭合时上缘露页）`);
  const peekChk = (key, got) => {
    const d = def.params && def.params[key] && def.params[key].design;
    if (d != null && Math.abs(got - d) > 1e-9)
      throw new Error(`props/${id} book 断言失败：${key} 实算 ${got} ≠ design ${d}（闭合态轮廓错开量与参数不一致）`);
    return got;
  };
  const peekFore = peekChk('peekFore', pbb.x1 - cbb.x1);
  const peekBottom = peekChk('peekBottom', pbb.y1 - cbb.y1);
  const stepD = def.params && def.params.backStep && def.params.backStep.design;
  if (stepD != null && (Math.abs(bbb.x1 - pbb.x1 - stepD) > 1e-9 || Math.abs(bbb.y1 - pbb.y1 - stepD) > 1e-9))
    throw new Error(`props/${id} book 断言失败：backStep 实算 前缘 ${bbb.x1 - pbb.x1}/下缘 ${bbb.y1 - pbb.y1} ≠ design ${stepD}（后封轮廓错开量与参数不一致）`);
  if (!pages.anchors.spine || !pages.anchors.foreEdge)
    throw new Error(`props/${id} book 断言失败：页平面锚点（spine/foreEdge）缺失`);
  return { coverLen, peekFore, peekBottom };
};
// 构建期断言（box）：腔体三向自洽（口沿半宽/底半宽/底厚均与 wall 缝合，轮廓实算）、盖铰链与箱口左角对位、
// 盖长实算 vs design（差 ≤ 0.5）、闭合时盖满箱口。返回 { lidLen }。
export const assertBoxGeometry = (def) => {
  const id = def.element.id;
  const body = partOf(def, 'body'), lid = partOf(def, 'lid');
  const cav = def.params.cavity, wall = def.params.wall;
  const rimHalf = (body.anchors.rimR[0] - body.anchors.rimL[0]) / 2;
  if (Math.abs(cav.halfTop + wall - rimHalf) > 1e-9)
    throw new Error(`props/${id} box 断言失败：cavity.halfTop ${cav.halfTop} + wall ${wall} ≠ 箱口半宽 ${rimHalf}（腔体与箱口不对位）`);
  const outline = flattenSegs(body.shapes[0].segments);
  const bb = polyBBox(outline);
  const bottomHalf = Math.max(...outline.filter(p => Math.abs(p[1] - bb.y1) < 1e-6).map(p => Math.abs(p[0])));
  if (Math.abs(cav.halfBottom + wall - bottomHalf) > 1e-9)
    throw new Error(`props/${id} box 断言失败：cavity.halfBottom ${cav.halfBottom} + wall ${wall} ≠ 箱底外半宽 ${bottomHalf}（轮廓实算）`);
  if (Math.abs(bb.y1 - cav.bottomY - wall) > 1e-9)
    throw new Error(`props/${id} box 断言失败：箱底厚 ${ (bb.y1 - cav.bottomY).toFixed(1) } ≠ wall ${wall}`);
  if (Math.abs(lid.pivot[0] - body.anchors.rimL[0]) > 1e-9 || Math.abs(lid.pivot[1] - body.anchors.rimL[1]) > 1e-9)
    throw new Error(`props/${id} box 断言失败：盖铰链 (${lid.pivot}) 与箱口左角 rimL (${body.anchors.rimL}) 不对位`);
  const lidLen = assertHingeRigid(def, 'lid', 'tip');
  const design = def.params && def.params.lidLen && def.params.lidLen.design;
  if (design != null && Math.abs(lidLen - design) > 0.5)
    throw new Error(`props/${id} box 断言失败：lidLen 实算 ${lidLen.toFixed(1)} 与 design ${design} 不一致`);
  if (lidLen < body.anchors.rimR[0] - body.anchors.rimL[0])
    throw new Error(`props/${id} box 断言失败：盖长 ${lidLen.toFixed(1)} < 箱口全宽 ${body.anchors.rimR[0] - body.anchors.rimL[0]}（闭合时盖不满）`);
  return { lidLen };
};
// 铰接元素绘制：hinge 部件按 opts.angles[partId]（或 opts.profile + opts.u 实算）绕 pivot 旋转，其余部件直绘。
export const drawHinged = (g, def, opts = {}) => {
  g.lineJoin = 'round'; g.lineCap = 'round';
  for (const part of [...def.parts].sort((a, b) => a.z - b.z)) {
    let ang = null;
    if (part.hinge) {
      if (opts.angles && opts.angles[part.id] != null) ang = opts.angles[part.id];
      else if (opts.profile) ang = hingeAngleAt(def, opts.profile, opts.u != null ? opts.u : 1);
    }
    if (ang == null) { drawShapes(g, def, part.shapes); continue; }
    g.save();
    g.translate(part.pivot[0], part.pivot[1]);
    g.rotate(ang * D2R);
    g.translate(-part.pivot[0], -part.pivot[1]);
    drawShapes(g, def, part.shapes);
    g.restore();
  }
};
