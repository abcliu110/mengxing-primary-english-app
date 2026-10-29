// ==================== 白板引擎 · 人物骨架与动作库 v1（讲解员小人 + 场景角色）====================
// 定稿形象：docs/whiteboard/narrator/narrator_v3a_ponytail.png（v3a 马尾女老师）。规范：MASTER_DESIGN §2.6、§2.7；SOP §8。
// 骨架：骨盆 → 躯干 → 头（马尾、领巾跟随余摆）；肩 → 上臂 → 前臂 → 手；髋 → 大腿 → 小腿 → 脚。
// 一个「姿态」= 一组关节角度；一个「动作」= 姿态随动作内进度 u 的函数；动作之间按权重插值（姿态到姿态）。
// 全部是时间 t 的纯函数（马尾余摆也是：对头部加速度做阻尼弹簧卷积），所以进度条拖到哪都正确。
// 用法（案例脚本里）：
//   const me = k.actor("narrator", { x: 880, y: 530, s: .9 });          // 讲解员（屏幕层，镜头缩放不影响）
//   const porter = k.actor("porter", { x: 200, y: 300, s: .6, g: D.sub() }); // 场景角色（放进某个组，跟镜头、擦除走）
//   const box = k.prop("box", 230, 300, { g: … });                      // 道具：box / card / book / doc / scroll
//   k.act(porter, "carry", go(2.4), 2.4, { prop: box, to: 520, put: true, words: ["import"] });
//   k.act(me, "point", t, 1.2, { at: [x, y] });  k.expr(me, "surprised", t, 1.5);  k.look(me, x, y, t, dur)
// 动作库 v1：idle（待机呼吸眨眼，自动）、wave 挥手、point 指、surprised 惊讶、holdCard 举词卡、read 读书、
//   walk 走、run 跑、carry 搬、take 拿、put 放、jump 跳、turn 转身；另有 think 想、cheer 欢呼、support 托举、nod 点头、sit 坐（骑）。
// 角色 look：narrator 讲解员、porter 搬运工、traveler 旅客、princess 神话公主；道具另有 flower 一枝花。
// 表情 5 个：happy 开心、think 思考、surprised 惊讶、proud 得意、oops 哎呀；口型 3 个：0 闭、1 半开、2 全开。
var WB_ACTOR = (function () {
  const D2R = Math.PI / 180, clamp = v => Math.max(0, Math.min(1, v));
  const sstep = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };   // 缓入缓出
  const eout = x => { x = clamp(x); return 1 - Math.pow(1 - x, 3); };
  const EASEX = x => x * x * x;   // 加速落下
  const back = x => { x = clamp(x); const c = 1.6; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };   // 轻微过冲
  const lerp = (a, b, q) => a + (b - a) * q;
  const seg = (u, a, b) => clamp((u - a) / (b - a));
  const THIGH = 30, SHIN = 28, UARM = 23, FARM = 21, TORSO = 40, SHO = 34;
  // ---- 服装（v3a 定稿配色；角色色是 V3 调色板的唯一例外，见 SOP §9）----
  const LOOKS = {
    narrator: { skin: "#fde3cf", hair: "#7a4a2a", jacket: "#2f8f6f", jacketD: "#256f57", shirt: "#ffffff", scarf: "#f28c28", pants: "#26315f", shoe: "#ffffff", clip: "#facc15", style: "ponytail", marker: true },
    porter: { skin: "#f6d2b3", hair: "#3f2d22", jacket: "#e8d3b0", jacketD: "#c9ad82", shirt: "#e8d3b0", scarf: "#b45309", pants: "#8a6a48", shoe: "#8a6a48", style: "band" },
    traveler: { skin: "#fde3cf", hair: "#4b3326", jacket: "#5b7fd6", jacketD: "#3f5fae", shirt: "#ffffff", scarf: "#e11d48", pants: "#3a3f55", shoe: "#5b4636", style: "hat" },
    // 神话公主（Europe 幕）：披肩长发 + 小金冠，粉色长裙（裙摆画在躯干上，腿用裙子同色）
    princess: { skin: "#fde3cf", hair: "#5b3a24", jacket: "#f9a8d4", jacketD: "#ec7fbf", shirt: "#fff7ed", scarf: "#facc15", pants: "#f9a8d4", shoe: "#be185d", style: "crown", skirt: true },
  };
  const INK = "#1f2937";
  // ---- 表情参数：眉高、眉角、眼睛大小、眼睛睁开度、嘴型、腮红、汗滴 ----
  const EXPR = {
    neutral: { bh: 0, ba: 0, bi: 0, es: 1, eo: 1, m: "smile", blush: .8, sweat: 0, tilt: 0 },
    happy: { bh: -1.5, ba: 0, bi: 0, es: 1, eo: 1, m: "grin", blush: 1, sweat: 0, tilt: -2 },
    think: { bh: -1, ba: 10, bi: 0, es: .95, eo: .9, m: "side", blush: .5, sweat: 0, tilt: 5, lx: -1, ly: -1.2 },
    surprised: { bh: -4.5, ba: 0, bi: 0, es: 1.35, eo: 1.15, m: "o", blush: .6, sweat: 0, tilt: -4 },
    proud: { bh: .5, ba: -6, bi: 0, es: 1, eo: .48, m: "smirk", blush: 1, sweat: 0, tilt: -6 },
    oops: { bh: -2, ba: 0, bi: 14, es: 1.05, eo: .95, m: "wavy", blush: .4, sweat: 1, tilt: 3 },
  };
  const NUM = ["bh", "ba", "bi", "es", "eo", "blush", "sweat", "tilt", "lx", "ly"];

  // ---- 基础姿态（待机）----
  const IDLE = { lean: 0, head: 0, aFs: 10, aFe: 22, aBs: -7, aBe: 12, lFh: 4, lFk: 2, lBh: -4, lBk: 2, crouch: 0, air: 0, sx: 1, sy: 1, ex: 0 };
  const KEYS = Object.keys(IDLE);
  function walkLegs(p, ph, amp, kn, arm, el) {
    const s1 = Math.sin(2 * Math.PI * ph), c1 = Math.cos(2 * Math.PI * ph);
    p.lFh = amp * s1; p.lBh = -amp * s1;
    p.lFk = 6 + kn * Math.max(0, c1); p.lBk = 6 + kn * Math.max(0, -c1);
    if (arm != null) { p.aFs = -arm * s1 + 4; p.aBs = arm * s1 - 2; p.aFe = el; p.aBe = el; }
  }

  // ---- 动作库 v1：每个动作 = f(u, ctx) → 姿态（覆盖 IDLE 的部分字段）；ctx.ph = 走路相位，ctx.aim = 指向角 ----
  const ACTIONS = {
    idle: () => ({}),
    nod: (u) => ({ head: 9 * Math.sin(u * Math.PI * 2) * (1 - u) }),
    wave: (u) => {   // 预备下沉 → 抬手 → 前臂左右摆 3 次 → 放下
      const up = back(seg(u, .08, .3)), sw = Math.sin(seg(u, .25, .9) * Math.PI * 6);
      return { aFs: lerp(10, 128, up), aFe: lerp(22, 38 + 28 * sw, up), crouch: 4 * Math.sin(seg(u, 0, .12) * Math.PI), lean: -3 * up, head: -4 * up, ex: 1 };
    },
    point: (u, c) => {   // 先往回收一点（预备）→ 伸直指过去（过冲）→ 停住
      const pre = Math.sin(seg(u, 0, .18) * Math.PI), go = back(seg(u, .12, .38));
      return { aFs: lerp(10, c.aim, go) - 14 * pre, aFe: lerp(22, 4, go) + 30 * pre, lean: 4 * go, head: c.aimHead * go };
    },
    surprised: (u) => {   // 缩一下 → 弹起后仰、双手张开 → 回落
      const pre = Math.sin(seg(u, 0, .14) * Math.PI), pop = back(seg(u, .12, .32)) * (1 - .35 * seg(u, .7, 1));
      return { crouch: 7 * pre - 3 * pop, air: -7 * Math.sin(seg(u, .12, .4) * Math.PI), lean: -9 * pop, head: -8 * pop, aFs: lerp(10, 112, pop), aFe: lerp(22, 52, pop), aBs: lerp(-7, -112, pop), aBe: lerp(12, -52, pop), sx: 1 - .06 * pre + .03 * pop * (1 - seg(u, .32, .5)), sy: 1 + .07 * pre * -1 + .05 * Math.sin(seg(u, .12, .4) * Math.PI) };
    },
    holdCard: (u) => {   // 双手把卡片举过头顶
      const up = back(seg(u, .1, .32)), pre = Math.sin(seg(u, 0, .14) * Math.PI);
      return { aFs: lerp(10, 150, up), aFe: lerp(22, 22, up), aBs: lerp(-7, -150, up), aBe: lerp(12, -22, up), crouch: 5 * pre, head: -6 * up, lean: -2 * up, ex: 1, _cardBoth: 1 };
    },
    read: (u) => {   // 双手捧书在胸前，低头看
      const q = eio(seg(u, 0, .2));
      return { aFs: lerp(10, 16, q), aFe: lerp(22, 104, q), aBs: lerp(-7, 26, q), aBe: lerp(12, 98, q), head: 10 * q + 2 * Math.sin(u * 9), lean: 3 * q };
    },
    think: (u) => {
      const q = eio(seg(u, 0, .25));
      return { aFs: lerp(10, 32, q), aFe: lerp(22, 138, q), aBs: lerp(-7, 22, q), aBe: lerp(12, 70, q), head: 6 * q, lean: -2 * q };
    },
    cheer: (u) => {
      const pre = Math.sin(seg(u, 0, .16) * Math.PI), up = back(seg(u, .14, .34)), hop = Math.sin(seg(u, .16, .5) * Math.PI);
      return { crouch: 9 * pre, air: -16 * hop, aFs: lerp(10, 150, up), aFe: 14, aBs: lerp(-7, -150, up), aBe: -14, sy: 1 - .08 * pre + .06 * hop, sx: 1 + .06 * pre - .04 * hop, head: -6 * up, ex: 1 };
    },
    walk: (u, c) => { const p = { lean: 4 }; walkLegs(p, c.ph, 22, 30, 18, 18); return p; },
    run: (u, c) => { const p = { lean: 13, head: -4 }; walkLegs(p, c.ph, 38, 72, 42, 82); p.air = -4 * Math.abs(Math.sin(2 * Math.PI * c.ph * 2)); return p; },
    // 搬：弯腰（预备）抱起 → 直起身（略后仰，夸张出重量）→ 抱着走 → （put）弯腰放下
    carry: (u, c) => {
      const m0 = c.m0, m1 = c.m1;
      const bend = u < m0 ? Math.sin(seg(u, 0, m0) * Math.PI) : (c.put && u > m1 ? Math.sin(seg(u, m1, 1) * Math.PI) : 0);
      const hold = u < m0 * .5 ? seg(u, 0, m0 * .5) : 1;
      const p = { lean: 34 * bend - 4 * (1 - bend), head: 8 * bend, crouch: 0, aFs: lerp(lerp(10, 42, hold), 26, bend), aFe: lerp(lerp(22, 62, hold), 10, bend), aBs: lerp(lerp(-7, 36, hold), 20, bend), aBe: lerp(lerp(12, 66, hold), 10, bend), lFh: 26 * bend, lFk: 52 * bend, lBh: 12 * bend, lBk: 44 * bend, ex: 2 };
      if (u > m0 && u < m1) walkLegs(p, c.ph, 18, 24, null);
      return p;
    },
    // 拿：伸手 → 握住（u=.45 道具挂到手上）→ 收回胸前
    take: (u) => {
      const r = back(seg(u, .05, .4)), b = eio(seg(u, .5, .9)), pre = Math.sin(seg(u, 0, .12) * Math.PI);
      return { aFs: lerp(10, 72, r) - 30 * b - 10 * pre, aFe: lerp(22, 8, r) + 80 * b, lean: 12 * r * (1 - b), head: 6 * r * (1 - b) };
    },
    // 放：从胸前往前下方伸 → 松手（u=.55 道具留在原处）→ 收回
    put: (u) => {
      const d = eio(seg(u, 0, .45)), r = eio(seg(u, .6, 1));
      return { aFs: lerp(lerp(42, 50, d), 10, r), aFe: lerp(lerp(62, 12, d), 22, r), aBs: lerp(lerp(36, 44, d), -7, r), aBe: lerp(lerp(66, 12, d), 12, r), lean: 28 * d * (1 - r), head: 8 * d * (1 - r), lFh: 24 * d * (1 - r), lFk: 46 * d * (1 - r), lBh: 10 * d * (1 - r), lBk: 40 * d * (1 - r) };
    },
    // 托举：双手在头顶上方托住（support）
    support: (u) => {
      const up = back(seg(u, .1, .35)), pre = Math.sin(seg(u, 0, .15) * Math.PI), push = Math.sin(u * Math.PI * 3) * .5 * up;
      return { aFs: lerp(10, 152, up), aFe: lerp(22, 26 + 6 * push, up), aBs: lerp(-7, -152, up), aBe: lerp(12, -26 - 6 * push, up), crouch: 8 * pre + 3 * up - 2 * push, lean: -3 * up, head: -10 * up, lFh: 10 * up, lBh: -10 * up, lFk: 10 * up, lBk: 10 * up };
    },
    // 跳：下蹲蓄力（挤压）→ 腾空（拉伸）→ 落地（挤压）→ 回弹
    jump: (u) => {
      const pre = Math.sin(seg(u, 0, .28) * Math.PI / 2) * (1 - seg(u, .26, .32)), fly = seg(u, .3, .72), land = Math.sin(seg(u, .72, .9) * Math.PI);
      const h = Math.sin(fly * Math.PI);
      return { crouch: 12 * pre + 8 * land, lFh: 30 * pre + 20 * h + 24 * land, lFk: 60 * pre + 50 * h + 46 * land, lBh: 14 * pre + 10 * h + 12 * land, lBk: 56 * pre + 40 * h + 40 * land,
        air: -54 * h, aFs: lerp(-34 * pre, 140, h) + 20 * land, aFe: 20, aBs: lerp(-30 * pre, -140, h) - 20 * land, aBe: -20, lean: 16 * pre - 4 * h + 10 * land,
        sx: 1 + .1 * pre - .07 * h * (1 - fly) + .12 * land, sy: 1 - .12 * pre + .12 * h * (1 - fly) - .14 * land, ex: 1, _air: fly > 0 && fly < 1 };
    },
    turn: (u) => ({ crouch: 4 * Math.sin(u * Math.PI), aFs: 10 + 12 * Math.sin(u * Math.PI), aBs: -7 - 12 * Math.sin(u * Math.PI) }),
    // 坐（骑在牛背 / 坐在凳子上）：大腿向前抬平、小腿自然垂下，双手扶在前面；不自动着地（骨盆停在 y - 58×s，坐处由案例放好）
    sit: (u) => {
      const q = eio(seg(u, 0, .18)), sway = Math.sin(u * Math.PI * 4) * 2;
      return { lFh: lerp(4, 84, q), lFk: lerp(2, 88, q), lBh: lerp(-4, 76, q), lBk: lerp(2, 82, q), aFs: lerp(10, 46, q), aFe: lerp(22, 34, q), aBs: lerp(-7, 38, q), aBe: lerp(12, 40, q), lean: -2 * q + sway * .5, head: sway, _air: true, _seat: true };
    },
  };
  const MOVING = { walk: 1, run: 1, carry: 1 };
  const DEFAULT_EXPR = { wave: "happy", surprised: "surprised", holdCard: "proud", read: "think", think: "think", cheer: "happy", jump: "happy", support: "happy" };

  // ---------- kit 扩展 ----------
  function kit(k) {
    const S = k.S;
    S.actors = S.actors || []; S.acts = S.acts || []; S.props = S.props || []; S.extraTexts = S.extraTexts || [];
    k.actor = (look = "narrator", o = {}) => {
      const a = { id: S.actors.length, look, x: o.x ?? 880, y: o.y ?? 530, s: o.s ?? 1, f: o.f ?? -1, g: o.g ?? (look === "narrator" ? 0 : S.g), screen: o.screen ?? (look === "narrator"),
        narrator: o.narrator ?? (look === "narrator"), acts: [], exprs: [], looks: [], fades: [], seed: S.actors.length * 7 + 3, show: o.show ?? 0 };
      if (o.hidden) a.fades.push({ t: -1, dur: .001, to: 0 });
      // 场景角色：在创建时刻（它所在的镜头开始画的时候）才出场，淡入 0.3 秒
      else if (!a.screen && S.at > 0) { a.fades.push({ t: -1, dur: .001, to: 0 }); a.fades.push({ t: S.at, dur: .3, to: 1 }); }
      S.actors.push(a); return a;
    };
    k.act = (a, action, t, dur = 1, o = {}) => {
      if (t == null) t = S.at;
      const e = { action, t, dur, o, words: o.words || [] };
      a.acts.push(e); S.acts.push({ actor: a.id, look: a.look, action, t, dur, words: e.words, e });
      if (o.expr || DEFAULT_EXPR[action]) k.expr(a, o.expr || DEFAULT_EXPR[action], t, dur + .3);
      return t;
    };
    k.expr = (a, name, t, dur = 1.5) => { a.exprs.push({ name, t: t ?? S.at, dur }); };
    k.look = (a, x, y, t, dur = 1.5) => { a.looks.push({ x, y, t: t ?? S.at, dur }); };
    k.actorFade = (a, t, dur, to) => { a.fades.push({ t, dur, to }); };
    // 不是人演、而是场景里的东西演的动作（船被风送进港、飞机起飞、鸟飞）：只登记给 R4 检查用，画面由案例自己的动效完成
    k.actFx = (words, t, dur, desc) => { const e = { t, dur }; S.acts.push({ actor: -1, look: desc, action: desc, t, dur, words, e, fx: true }); return t; };
    // 道具：box 货箱 / card 词卡（text）/ book 书 / doc 文书（护照）/ scroll 卷轴；x,y = 落在地上的位置（底边中心）
    k.prop = (kind, x, y, o = {}) => {
      const p = { id: S.props.length, kind, x, y, text: o.text || "", g: o.g ?? S.g, ev: [], s: o.s ?? 1, hidden: !!o.hidden, color: o.color, stampAt: o.stampAt, stampText: o.stampText || "OK" };
      if (!o.hidden && S.at > 0) { p.hidden = true; p.showAt = S.at; }   // 放在地上的道具：创建时刻才出现
      if (p.text) S.extraTexts.push({ text: p.text, t: 0 });
      S.props.push(p); return p;
    };
  }

  // ---------- 播放器扩展 ----------
  function mount(env) {
    const { S, mk, NS } = env;
    if (!S.actors || !S.actors.length) return null;
    const reduced = env.reduced;
    const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());
    // ---- 预处理：动作按时间排序；移动动作求起点；道具挂接事件 ----
    S.actors.forEach(a => {
      a.acts.sort((p, q) => p.t - q.t);
      let x = a.x, f = a.f;
      a.moves = []; a.turns = [];
      a.acts.forEach(e => {
        const o = e.o;
        if (MOVING[e.action] && o.to != null) {
          const m0 = e.action === "carry" ? (o.pick === false ? 0 : .22) : 0, m1 = e.action === "carry" ? (o.put ? .82 : 1) : 1;
          e.m0 = m0; e.m1 = m1;
          const dir = Math.sign(o.to - x) || f;
          if (dir !== f) { a.turns.push({ t: e.t, dur: .22, from: f, to: dir }); f = dir; }
          a.moves.push({ t: e.t + m0 * e.dur, dur: (m1 - m0) * e.dur, from: x, to: o.to, kind: e.action, e }); x = o.to;
        } else if (e.action === "carry") { e.m0 = .22; e.m1 = o.put ? .82 : 1; }
        if (e.action === "turn") { const to = o.to ?? -f; a.turns.push({ t: e.t, dur: e.dur, from: f, to }); f = to; }
        if (e.action === "point" && o.at) { const dir = Math.sign(o.at[0] - x); if (dir && dir !== f && o.face !== false) { a.turns.push({ t: e.t - .05, dur: .2, from: f, to: dir }); f = dir; } }
        // 道具事件
        if (o.prop) {
          const p = o.prop;
          if (e.action === "carry") { p.ev.push({ t: e.t + e.dur * .2, a, anchor: "chest" }); if (o.put) p.ev.push({ t: e.t + e.dur * .92, a, drop: true }); }
          if (e.action === "take") p.ev.push({ t: e.t + e.dur * .42, a, anchor: "hand" });
          if (e.action === "put") p.ev.push({ t: e.t + e.dur * .55, a, drop: true });
          if (e.action === "holdCard") { p.ev.push({ t: e.t + e.dur * .08, a, anchor: "overhead", pop: o.pop !== false }); if (o.release !== false) p.ev.push({ t: e.t + e.dur, a, gone: true }); }
          if (e.action === "read") { p.ev.push({ t: e.t, a, anchor: "book", pop: true }); if (o.release !== false) p.ev.push({ t: e.t + e.dur, a, gone: true }); }
          if (e.action === "support") { p.ev.push({ t: e.t + e.dur * .3, a, anchor: "overhead" }); if (o.release !== false) p.ev.push({ t: e.t + e.dur, a, gone: true }); }
        }
      });
      a.exprs.sort((p, q) => p.t - q.t);
      // 眨眼时刻：3–5 秒随机（种子固定，拖动进度条也一样）
      let s = a.seed, bt = 1.2; a.blinks = [];
      const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
      while (bt < env.end + 10) { a.blinks.push(bt); bt += 3 + rnd() * 2; if (rnd() < .18) a.blinks.push(bt - (3 - .25)); }
      a.blinks.sort((p, q) => p - q);
    });
    S.props.forEach(p => p.ev.sort((x, y) => x.t - y.t));

    // ---- 位置 / 朝向（纯函数）----
    function rootX(a, t) {
      let x = a.x;
      for (const m of a.moves) {
        if (t < m.t) break;
        const q = (t - m.t) / Math.max(.001, m.dur);
        if (q >= 1) { x = m.to; continue; }
        if (reduced) { x = q < .5 ? m.from : m.to; break; }
        // 两端缓入缓出、中间匀速（速度连续，脚步相位跟着距离走，不打滑）
        x = lerp(m.from, m.to, smoothRamp(q, m.kind === "run" ? .18 : .22)); break;
      }
      return x;
    }
    // 匀速段 + 两端缓入缓出（a = 加减速占比），保证速度连续
    function smoothRamp(q, r) {
      q = clamp(q); const v = 1 / (1 - r);   // 峰值速度
      if (q < r) return v * q * q / (2 * r);
      if (q > 1 - r) { const z = 1 - q; return 1 - v * z * z / (2 * r); }
      return v * (r / 2) + v * (q - r);
    }
    function dist(a, t) {   // 走过的距离（驱动步伐相位，脚不打滑）
      let d = 0;
      for (const m of a.moves) { if (t < m.t) break; const x1 = t >= m.t + m.dur ? m.to : rootX(a, t); d += Math.abs(x1 - m.from); if (t < m.t + m.dur) break; }
      return d;
    }
    function facing(a, t) {
      let f = a.f;
      for (const tr of a.turns) {
        if (t < tr.t) break;
        const q = (t - tr.t) / tr.dur;
        if (q >= 1) { f = tr.to; continue; }
        f = lerp(tr.from, tr.to, reduced ? (q < .5 ? 0 : 1) : eio(q)); break;
      }
      return f;
    }
    function opacity(a, t) {
      let op = 1;
      for (const fd of a.fades) if (t >= fd.t) op += (fd.to - op) * eio((t - fd.t) / Math.max(.001, fd.dur));
      return op;
    }
    // ---- 姿态（纯函数）：IDLE + 各动作按权重叠加 ----
    function pose(a, t, s) {
      const p = Object.assign({}, IDLE);
      // 呼吸
      const br = Math.sin(t * 2 * Math.PI / 3.4 + a.seed);
      p.aFs += br * 1.2; p.aBs -= br * 1.2; p.head += Math.sin(t * 2 * Math.PI / 5.1 + a.seed) * 1.5;
      p.breath = br;
      let air = false, card = false, curMove = null, seat = false;
      for (const e of a.acts) {
        const fadeIn = Math.min(.16, e.dur / 4), fadeOut = e.o.keep ? 0 : .22;
        if (t < e.t - .001 || t > e.t + e.dur + fadeOut + (e.o.keep || 0)) continue;
        const u = clamp((t - e.t) / e.dur);
        let w = Math.min(sstep((t - e.t) / fadeIn), 1);
        if (t > e.t + e.dur + (e.o.keep || 0)) w *= 1 - sstep((t - e.t - e.dur - (e.o.keep || 0)) / fadeOut);
        if (MOVING[e.action]) w = Math.min(w, 1);
        const ctx = { ph: dist(a, t) / (e.action === "run" ? 150 : 86) / (a.s || 1), m0: e.m0 ?? .22, m1: e.m1 ?? 1, put: !!e.o.put, aim: 90, aimHead: 0 };
        if (e.action === "point" && e.o.at) {
          const f = facing(a, t), x = rootX(a, t), dx = (e.o.at[0] - x) * f, dy = e.o.at[1] - (a.y - (SHO + 58) * a.s);
          ctx.aim = Math.max(20, Math.min(175, Math.atan2(dx, dy) / D2R)); ctx.aimHead = Math.max(-12, Math.min(12, (90 - ctx.aim) * .25));
        }
        let uu = u;
        if (reduced && !MOVING[e.action]) uu = Math.max(u, Math.min(.5, u * 4));
        const q = (ACTIONS[e.action] || ACTIONS.idle)(uu, ctx);
        if (reduced && MOVING[e.action]) { q.lFh = q.lBh = 0; q.lFk = q.lBk = 2; }
        for (const kk of KEYS) if (q[kk] != null) p[kk] = lerp(p[kk], q[kk], w);
        if (q._air) air = true;
        if (q._seat && w > .5) seat = true;
        if (q._cardBoth) card = true;
        if (MOVING[e.action] && u > 0 && u < 1) curMove = e;
      }
      p.airborne = air; p.card = card; p.move = curMove; p.seat = seat;
      if (s && reduced) { p.air = 0; p.sx = p.sy = 1; }
      return p;
    }
    // ---- 正向运动学：局部坐标（朝右，脚底 = 0,0，y 向下）----
    const dir = deg => [Math.sin(deg * D2R), Math.cos(deg * D2R)];
    function fk(p) {
      const legs = {};
      const pel0 = [0, -(THIGH + SHIN)];
      [["F", 3.5], ["B", -3.5]].forEach(([n, ox]) => {
        const h = p["l" + n + "h"], kn = p["l" + n + "k"];
        const hip = [pel0[0] + ox, pel0[1]], d1 = dir(h), knee = [hip[0] + d1[0] * THIGH, hip[1] + d1[1] * THIGH];
        const sa = h - kn, d2 = dir(sa), ank = [knee[0] + d2[0] * SHIN, knee[1] + d2[1] * SHIN];
        legs[n] = { hip, knee, ank, h, sa };
      });
      // 着地：最低的脚踩在地上（腾空动作除外）→ 自动产生走路起伏和下蹲高度
      const low = Math.max(legs.F.ank[1], legs.B.ank[1]);
      const dy = (p.airborne ? 0 : -low) + p.crouch * 0 + p.air;
      for (const n in legs) for (const kk of ["hip", "knee", "ank"]) legs[n][kk] = [legs[n][kk][0], legs[n][kk][1] + dy];
      const pel = [pel0[0], pel0[1] + dy + (p.airborne ? 0 : 0)];
      const lean = p.lean, dt = [Math.sin(lean * D2R), -Math.cos(lean * D2R)];
      const sh = [pel[0] + dt[0] * SHO, pel[1] + dt[1] * SHO], neck = [pel[0] + dt[0] * TORSO, pel[1] + dt[1] * TORSO];
      const arms = {};
      [["F", 8], ["B", -10]].forEach(([n, ox]) => {
        const s0 = [sh[0] + ox * Math.cos(lean * D2R), sh[1] + ox * Math.sin(lean * D2R)];
        const ua = p["a" + n + "s"], fa = ua + p["a" + n + "e"], d1 = dir(ua), el = [s0[0] + d1[0] * UARM, s0[1] + d1[1] * UARM], d2 = dir(fa), hand = [el[0] + d2[0] * FARM, el[1] + d2[1] * FARM];
        arms[n] = { sh: s0, el, hand, ua, fa };
      });
      return { legs, pel, sh, neck, arms, lean, head: lean * .5 + p.head };
    }
    // 局部 → 世界（root 平移 + 朝向镜像 + 缩放 + 挤压拉伸以脚底为原点）
    function toWorld(a, t, pt, cache) {
      const R = cache || rootState(a, t);
      return [R.x + pt[0] * R.f * R.s * R.sx, R.y + pt[1] * R.s * R.sy];
    }
    function rootState(a, t, p) {
      p = p || pose(a, t, true);
      return { x: rootX(a, t), y: a.y, f: facing(a, t), s: a.s, sx: p.sx, sy: p.sy, p };
    }
    // 头的世界坐标（余摆驱动用，轻量版）
    function headW(a, t) {
      const p = pose(a, t), F = fk(p), R = { x: rootX(a, t), y: a.y, f: facing(a, t), s: a.s, sx: p.sx, sy: p.sy };
      return toWorld(a, t, F.neck, R);
    }
    // 阻尼弹簧余摆（M3）：对头部加速度做卷积 → 马尾 / 领巾角度；纯函数
    function follow(a, t, w, z, gain) {
      const N = 16, dl = .045; let ax = 0, ay = 0;
      const H = [];
      for (let i = 0; i <= N + 1; i++) H.push(headW(a, t - (i - .5) * dl));
      for (let i = 1; i <= N; i++) {
        const tau = (i - .5) * dl, h = Math.exp(-z * tau) * Math.sin(w * tau) * dl;
        const accX = (H[i - 1][0] - 2 * H[i][0] + H[i + 1][0]) / (dl * dl), accY = (H[i - 1][1] - 2 * H[i][1] + H[i + 1][1]) / (dl * dl);
        ax += h * accX; ay += h * accY;
      }
      const vx = (H[0][0] - H[2][0]) / (2 * dl);
      return { ax: ax * gain, ay: ay * gain, vx };
    }

    // ---- SVG：一个演员 = 一组分段，每帧只改 transform ----
    const pathE = (parent, d, fill, w = 2.2, stroke = INK) => mk("path", { d, fill, stroke, "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
    const G = (parent, attrs = {}) => mk("g", attrs, parent);
    function build(a) {
      const L = LOOKS[a.look] || LOOKS.narrator;
      const host = a.screen ? env.screenLayer : (a.g ? env.ensureGroup(a.g) : env.layer);
      const R = G(host, { "data-actor": a.look });
      const shadow = mk("ellipse", { cx: 0, cy: 0, rx: 26, ry: 4.5, fill: "#1f2937", opacity: .12 }, R);
      const body = G(R);
      const el = { R, shadow, body };
      // 后腿、后臂（在身体后面）
      const leg = (n) => {
        const th = G(body), sh = G(body), ft = G(body);
        pathE(th, `M-6.8,-1 L6.8,-1 Q7.4,14 6.4,${THIGH + 1} L-6,${THIGH + 1} Q-7.4,14 -6.8,-1 Z`, n === "B" ? shade(L.pants) : L.pants, 2.1);
        pathE(sh, `M-6.2,-1 L6.2,-1 L5.6,${SHIN - 2} L-5.6,${SHIN - 2} Z`, n === "B" ? shade(L.pants) : L.pants, 2.1);
        pathE(ft, `M-6.5,-4 Q-8,4 -1,4.5 L11,4.5 Q15.5,3.5 12.5,-1.5 Q8,-5.5 2,-5 Z`, L.shoe, 2.1);
        if (L.shoe === "#ffffff") pathE(ft, `M-6,1.6 L13.5,1.6`, "none", 1.2);
        return { th, sh, ft };
      };
      const arm = (n) => {
        const ua = G(body), fa = G(body);
        const jc = n === "B" ? L.jacketD : L.jacket;
        pathE(ua, `M-5.6,-3 Q-6.4,10 -5,${UARM + 1} L5,${UARM + 1} Q6.4,10 5.6,-3 Q0,-6 -5.6,-3 Z`, jc, 2.1);
        pathE(fa, `M-4.8,-1 L4.8,-1 L4.4,${FARM - 5} L-4.4,${FARM - 5} Z`, jc, 2.1);
        pathE(fa, `M-4.6,${FARM - 6} L4.6,${FARM - 6} L4.2,${FARM - 2.5} L-4.2,${FARM - 2.5} Z`, L.shirt, 1.6);
        const hand = G(fa, { transform: `translate(0,${FARM + 1})` });
        pathE(hand, `M-4.6,-3 Q-6,3 -1.5,5.6 Q3.5,6.6 5,1.6 Q5.6,-3 1.5,-4.4 Q-2.6,-5 -4.6,-3 Z`, L.skin, 1.9);
        return { ua, fa, hand };
      };
      // 马尾在最后面（比后臂还远），每帧跟着头的变换走
      el.tail = G(body); el.tailIn = G(el.tail);
      el.legB = leg("B"); el.armB = arm("B");
      // 躯干（外套 + 衬衫 + 领巾）
      el.torso = G(body);
      pathE(el.torso, `M-12.5,3 Q-13.5,-14 -14.5,-30 Q-15,-36 -9,-38.5 L9,-38.5 Q15,-36 14.5,-30 Q13.5,-14 12.5,3 Q0,5.5 -12.5,3 Z`, L.jacket, 2.3);
      pathE(el.torso, `M-6.5,-38 L0,-22 L6.5,-38 Z`, L.shirt, 1.6);
      if (a.look === "narrator") {
        pathE(el.torso, `M-6.5,-38 L-2,-18 M6.5,-38 L2,-18 M0,-20 L0,2`, "none", 1.4, "#1d5c47");
        pathE(el.torso, `M-12,1.5 Q0,4 12,1.5 L12,5 Q0,7.5 -12,5 Z`, L.pants, 1.6);
      } else if (a.look === "porter") {
        pathE(el.torso, `M-13,-8 Q0,-5 13,-8 L13,-4 Q0,-1 -13,-4 Z`, "#92400e", 1.6);
      } else if (L.skirt) {
        pathE(el.torso, `M-12.8,-7.5 Q0,-4.5 12.8,-7.5 L12.8,-4 Q0,-1 -12.8,-4 Z`, L.scarf, 1.5); // 金腰带
      } else {
        pathE(el.torso, `M-6.5,-38 L-3,-16 M6.5,-38 L3,-16`, "none", 1.4, "#2b437f");
      }
      // 领巾结（随身体），领巾尾巴单独一组做余摆
      el.scarfTail = G(body);
      pathE(el.scarfTail, `M-3,0 Q-5.5,11 -3.2,23 L1,27 L4.6,22.5 Q4.8,10 3,0 Z`, L.scarf, 1.8);
      el.neckG = G(body);
      pathE(el.neckG, `M-4,-6 L4,-6 L4,2 L-4,2 Z`, L.skin, 1.6);
      pathE(el.neckG, `M-7,-1 Q0,4 7,-1 L5.5,4.5 Q0,7 -5.5,4.5 Z`, L.scarf, 1.7);
      // 头（马尾在头后面，单独一组做余摆）
      el.headG = G(body); el.headS = G(el.headG, { transform: "scale(1.12)" });
      if (L.style === "crown") {   // 披肩长发（在头后面，跟着余摆）
        pathE(el.tailIn, `M10,-4 C-6,-8 -16,4 -15,18 C-14,30 -10,38 -6,42 L8,40 C6,30 8,18 12,8 C14,3 13,-2 10,-4 Z`, L.hair, 2.1);
      }
      if (L.style === "ponytail") {
        pathE(el.tailIn, `M2,-1 C-12,-6 -21,6 -18,22 C-16,33 -9,40 -4,44 C-8,34 -6,24 -1,16 C3,9 5,3 2,-1 Z`, L.hair, 2.1);
        pathE(el.tailIn, `M-12,12 Q-14,22 -9,32`, "none", 1.2);
        pathE(el.tailIn, `M-2.2,-4.2 Q3.5,-5.5 5,1 Q.5,3 -2.8,1.6 Z`, "#f59e0b", 1.6);
      }
      const hd = G(el.headS);
      // 脸
      pathE(hd, `M-15.5,-22 Q-17,-6 -6,-1.6 Q2,1.5 9.5,-2 Q17.5,-7 16.5,-21 Q15,-36 0,-37 Q-15,-36 -15.5,-22 Z`, L.skin, 2.3);
      pathE(hd, `M-15.2,-19 Q-20,-20 -19,-14 Q-18,-9.5 -14,-11`, L.skin, 2);
      // 头发
      if (L.style === "ponytail") {
        pathE(hd, `M-16.5,-17 Q-19,-33 -6,-39.5 Q8,-44 16,-31 Q18.5,-24 17,-18 Q14.5,-27 6,-29.5 Q9,-25 7,-23 Q2,-29 -6,-28.5 Q-10,-27 -12.5,-22 Q-14,-17 -16.5,-17 Z`, L.hair, 2.2);
        // 星星发夹
        const st = star(8, -31.5, 4.4, 1.9);
        pathE(hd, st, L.clip, 1.5);
      } else if (L.style === "crown") {
        pathE(hd, `M-16.5,-14 Q-19,-33 -4,-39 Q12,-43 17,-27 Q18,-20 16.5,-14 Q14,-26 4,-29 Q-6,-30 -12,-23 Q-14.5,-18 -16.5,-14 Z`, L.hair, 2.2);
        pathE(hd, `M-9,-37 L-7,-47 L-2.5,-40.5 L1,-49 L4.5,-40.5 L9,-47 L10,-36.5 Q0,-39.5 -9,-37 Z`, "#facc15", 1.7);   // 小金冠
        pathE(hd, star(1, -43, 1.8, .8), "#e11d48", 1);
      } else if (L.style === "band") {
        pathE(hd, `M-16.5,-17 Q-18,-34 -2,-39 Q14,-41 17,-24 Q15,-30 4,-31 Q-8,-31 -12.5,-24 Q-14,-19 -16.5,-17 Z`, L.hair, 2.2);
        pathE(hd, `M-16.4,-25 Q0,-32 16.8,-26 L16.6,-22 Q0,-28 -16.2,-21 Z`, "#e11d48", 1.6);
      } else {
        pathE(hd, `M-16.5,-17 Q-18,-34 -2,-38 Q14,-40 17,-24 Q12,-30 2,-30 Q-9,-30 -13,-23 Z`, L.hair, 2.2);
        pathE(hd, `M-22,-31 Q0,-36 22,-31 Q20,-28 0,-30 Q-20,-28 -22,-31 Z M-13,-31 Q-12,-46 0,-46 Q12,-46 13,-31 Z`, "#7c5a3a", 2);
      }
      // 五官：眉、眼（可眨眼、可放大）、腮红、嘴（3 口型 + 表情嘴）、汗滴
      el.blushL = mk("ellipse", { cx: -9, cy: -11, rx: 3.6, ry: 2.2, fill: "#f9a8a8", opacity: .8 }, hd);
      el.blushR = mk("ellipse", { cx: 12, cy: -11, rx: 3.2, ry: 2.1, fill: "#f9a8a8", opacity: .8 }, hd);
      el.eyes = [[-5, -17], [8, -17]].map(([x, y]) => {
        const g = G(hd, { transform: `translate(${x},${y})` });
        const e = mk("ellipse", { cx: 0, cy: 0, rx: 2.8, ry: 3.8, fill: INK }, g);
        const hl = mk("circle", { cx: .8, cy: -1.2, r: .9, fill: "#fff" }, g);
        const lid = pathE(g, "", "none", 1.8);
        return { g, e, hl, lid, x, y };
      });
      el.brows = [[-5, -23], [8, -23]].map(([x, y]) => pathE(hd, `M${x - 3.5},${y} Q${x},${y - 2} ${x + 3.5},${y}`, "none", 1.8, shade(L.hair, .6)));
      el.mouth = pathE(hd, "", "#9f1239", 1.7);
      el.tongue = mk("path", { d: "", fill: "#fb7185", opacity: 0 }, hd);
      el.sweat = pathE(hd, `M17,-30 Q21,-24 18.5,-21.5 Q15.5,-22.5 17,-30 Z`, "#bae6fd", 1.4, "#2563eb");
      // 前腿、前臂（在身体前面）
      el.legF = leg("F");
      if (L.skirt) {   // 裙摆画在两条腿前面，挂在骨盆上（不跟着躯干前倾旋转）
        el.skirt = G(body);
        pathE(el.skirt, `M-13,-4 Q0,-1 13,-4 L20,24 Q0,30 -20,24 Z`, L.jacket, 2.2);
        pathE(el.skirt, `M-8,8 L-10,22 M2,9 L2,26 M10,8 L12,22`, "none", 1.2, L.jacketD);
      }
      el.propSlot = G(body);       // 抱在胸前的道具画在前臂下面
      el.armF = arm("F");
      // 星星笔帽马克笔（讲解员前手）
      if (L.marker) {
        el.marker = G(el.armF.hand);
        pathE(el.marker, `M-2.4,-14 L2.4,-14 L2.4,7 L-2.4,7 Z`, "#2f8f6f", 1.5);
        pathE(el.marker, `M-2.4,7 L2.4,7 L1,11 L-1,11 Z`, INK, 1.2);
        pathE(el.marker, star(0, -16.5, 4, 1.7), "#facc15", 1.3);
      }
      a.el = el;
    }
    // 道具 SVG（局部坐标：底边中心 = 0,0）
    function buildProp(p) {
      const host = p.g ? env.ensureGroup(p.g) : env.layer;
      const g = G(host, { "data-prop": p.kind });
      const inner = G(g);
      if (p.kind === "box") {
        pathE(inner, `M-14,-27 L14,-27 L14,0 L-14,0 Z`, "#f3d9b1", 2.2, "#7c4a1e");
        pathE(inner, `M-14,-21 L14,-21 M-3,-27 L-3,-21 M3,-27 L3,-21 M-9,-10 L-3,-10`, "none", 1.4, "#7c4a1e");
      } else if (p.kind === "card") {
        const w = Math.max(56, p.text.length * 11.5 + 22);
        pathE(inner, `M${-w / 2},-34 L${w / 2},-34 L${w / 2},0 L${-w / 2},0 Z`, "#ffffff", 2.4);
        const tx = mk("text", { x: 0, y: -10, "text-anchor": "middle", "font-size": 19, "font-weight": 900, "font-family": '"Courier New",Courier,monospace', fill: "#2563eb" }, inner);
        tx.textContent = p.text; p.textEl = tx; p.w = w;
      } else if (p.kind === "book") {
        pathE(inner, `M0,-4 Q-10,-8 -20,-5 L-20,-25 Q-10,-28 0,-24 Q10,-28 20,-25 L20,-5 Q10,-8 0,-4 Z`, "#ffffff", 2.1);
        pathE(inner, `M0,-24 L0,-4 M-16,-20 Q-9,-22 -4,-20 M-16,-15 Q-9,-17 -4,-15 M4,-20 Q9,-22 16,-20 M4,-15 Q9,-17 16,-15`, "none", 1.3);
        p.page = pathE(inner, `M0,-24 Q8,-28 16,-26 L16,-6 Q8,-8 0,-4 Z`, "#f8fafc", 1.5);
      } else if (p.kind === "doc") {
        inner.setAttribute("transform", "scale(1.5)");   // 护照放大一点，看得清印章
        pathE(inner, `M-11,-26 L11,-26 L11,0 L-11,0 Z`, "#dbeafe", 2.1, "#2563eb");
        pathE(inner, `M-6,-19 L6,-19 M-6,-13 L4,-13`, "none", 1.4, "#2563eb");
        p.stampEl = G(inner, { opacity: 0 });
        mk("ellipse", { cx: 1, cy: -8, rx: 9, ry: 5.5, fill: "none", stroke: "#e11d48", "stroke-width": 2 }, p.stampEl);
        const st = mk("text", { x: 1, y: -5, "text-anchor": "middle", "font-size": 8, "font-weight": 900, "font-family": '"Courier New",Courier,monospace', fill: "#e11d48" }, p.stampEl); st.textContent = p.stampText;
        if (p.stampAt != null) {   // 印章：从上方加速砸下 → 压扁 → 抬走（M1/M2）
          p.hammer = G(G(g, { transform: "scale(1.5)" }), { opacity: 0 });
          pathE(p.hammer, `M-12,-30 L12,-30 L12,-18 L-12,-18 Z`, "#fda4af", 1.8);
          pathE(p.hammer, `M-4,-46 L4,-46 L4,-30 L-4,-30 Z`, "#f3d9b1", 1.8);
        }
      } else if (p.kind === "flower") {   // 一枝花：茎 + 叶 + 五瓣花（底边中心 = 茎的下端）
        pathE(inner, `M0,0 Q-2,-10 0,-20 M0,-9 Q6,-13 9,-10 Q5,-6 0,-8`, "none", 1.8, "#059669");
        for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * Math.PI * 2 / 5, cx = Math.cos(an) * 4.6, cy = -24 + Math.sin(an) * 4.6; mk("circle", { cx: cx.toFixed(2), cy: cy.toFixed(2), r: 3.4, fill: p.color || "#fda4af", stroke: INK, "stroke-width": 1.3 }, inner); }
        mk("circle", { cx: 0, cy: -24, r: 2.4, fill: "#facc15", stroke: INK, "stroke-width": 1.2 }, inner);
      } else if (p.kind === "scroll") {
        pathE(inner, `M-15,-20 L15,-20 L15,0 L-15,0 Z`, "#ffffff", 2.1, "#2563eb");
        pathE(inner, `M-17,-22 Q-19,-10 -17,2 M17,-22 Q19,-10 17,2`, "none", 2.4, "#2563eb");
        pathE(inner, `M-9,-14 L9,-14 M-9,-8 L5,-8`, "none", 1.4, "#2563eb");
      } else {
        pathE(inner, `M-14,-18 L14,-18 L14,0 L-14,0 Z`, "#ede9fe", 2.1, "#2563eb");
      }
      p.el = g; p.inner = inner; p.host = host;
      p.mark = mk("g", { "data-slot": p.kind }, host);   // 放回原处时插在这个位置前面：图层顺序固定，拖进度条结果一样
    }
    function star(cx, cy, r, ri) {
      let d = "";
      for (let i = 0; i < 10; i++) { const rr = i % 2 ? ri : r, an = -Math.PI / 2 + i * Math.PI / 5; d += (i ? "L" : "M") + (cx + Math.cos(an) * rr).toFixed(2) + "," + (cy + Math.sin(an) * rr).toFixed(2); }
      return d + "Z";
    }
    function shade(hex, k = .82) {
      const n = parseInt(hex.slice(1), 16), r = (n >> 16) * k | 0, g = ((n >> 8) & 255) * k | 0, b = (n & 255) * k | 0;
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    S.actors.forEach(build);
    S.props.forEach(buildProp);
    const tr = (g, x, y, deg, sx = 1, sy = 1) => g.setAttribute("transform", `translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${(-deg).toFixed(2)})` + (sx !== 1 || sy !== 1 ? ` scale(${sx.toFixed(3)},${sy.toFixed(3)})` : ""));

    // ---- 表情（纯函数，0.15 秒交叉过渡）----
    function exprAt(a, t) {
      let cur = "neutral", prev = "neutral", t0 = -9;
      for (const e of a.exprs) {
        if (t < e.t) break;
        if (t <= e.t + e.dur) { prev = cur; cur = e.name; t0 = e.t; }
        else { prev = e.name; cur = "neutral"; t0 = e.t + e.dur; }
      }
      const q = sstep((t - t0) / .15), A = EXPR[prev] || EXPR.neutral, B = EXPR[cur] || EXPR.neutral, o = {};
      NUM.forEach(n => { o[n] = lerp(A[n] || 0, B[n] || 0, q); });
      o.m = q < .5 ? A.m : B.m; o.name = cur;
      return o;
    }
    // ---- 口型：朗读时按语音事件切换（onstart / onboundary / onend）；没有语音时按时间轴估算 ----
    function visemeAt(a, t) {
      if (!a.narrator) return 0;
      const sp = env.api.speech;
      if (sp && sp.live) {
        if (!sp.on) return 0;
        const ms = now() - (sp.b || sp.start || now());
        if (ms < 80) return 2; if (ms < 160) return 1; if (ms < 215) return 0;
        return [1, 2, 1, 0][Math.floor((ms - 215) / 78) % 4];
      }
      const says = env.says || [];
      for (const sy of says) {
        if (t < sy.t || t > sy.t + sy.dur) continue;
        const tau = t - sy.t;
        if (sy.dur - tau < .22) return 0;
        // 先读单词（wd 秒），停一下，再读句子：每个词约 0.42 秒，词首张大嘴、词中半开、词间闭
        if (sy.wd && tau < sy.wd) { const n = String(sy.word).split(/\s+/).length, per = (sy.wd - .4) / Math.max(1, n), ph = (tau % (per + .4 / n)) / per; return ph < .15 ? 1 : ph < .55 ? 2 : ph < .85 ? 1 : 0; }
        const ws = sy.en.split(/\s+/), per = (sy.dur - sy.wd - .5) / ws.length, i = Math.floor((tau - sy.wd) / per), ph = ((tau - sy.wd) % per) / per;
        if (i < 0 || i >= ws.length) return 0;
        const syl = Math.max(1, Math.round(ws[i].replace(/[^a-z]/gi, "").length / 3.2)), ps = (ph * syl) % 1;
        return ps < .12 ? 1 : ps < .55 ? 2 : ps < .82 ? 1 : 0;
      }
      return 0;
    }
    const isSpeaking = (a, t) => a.narrator && ((env.api.speech && env.api.speech.live && env.api.speech.on) || (env.says || []).some(sy => t >= sy.t && t <= sy.t + sy.dur - .2));
    function mouthPath(m, v, ex) {
      // 口型优先：读的时候 1 半开 / 2 全开；闭嘴时用表情嘴
      if (v === 2) return [`M-4.6,-7.6 Q3,-9 10.6,-7.6 Q10,-0.5 3,0.4 Q-4,-0.5 -4.6,-7.6 Z`, 1];
      if (v === 1) return [`M-3.6,-7 Q3,-8 9.6,-7 Q8.6,-3.2 3,-2.8 Q-2.6,-3.2 -3.6,-7 Z`, .6];
      if (m === "o") return [`M0.6,-6.2 Q3,-10 5.4,-6.2 Q5.4,-2 3,-1.6 Q0.6,-2 0.6,-6.2 Z`, .3];
      if (m === "grin") return [`M-4,-7.2 Q3,-6.6 10,-7.2 Q8.6,-2 3,-1.8 Q-2.6,-2 -4,-7.2 Z`, .5];
      if (m === "side") return [`M0,-5.5 Q4,-6.4 8,-7.4`, 0];
      if (m === "smirk") return [`M-1.5,-6 Q4,-3.6 9.5,-7.6`, 0];
      if (m === "wavy") return [`M-2,-5 Q0.5,-7 3,-5 Q5.5,-3 8,-5`, 0];
      return [`M-2.6,-6.6 Q3,-3.2 8.6,-6.6`, 0];
    }

    // ---- 每帧 ----
    function render(t, info) {
      const pen = info && info.pen;
      S.actors.forEach(a => { a.holding = false; });
      for (const pr of S.props) renderProp(pr, t);
      for (const a of S.actors) {
        const el = a.el, op = opacity(a, t);
        el.R.setAttribute("opacity", op.toFixed(3));
        if (op < .01) { el.R.style.display = "none"; continue; }
        el.R.style.display = "";
        // 姿态：躯干、腿按 t；上臂晚 0.05 秒、前臂晚 0.09 秒（重叠动作 M3）
        const p = pose(a, t, true), pa = pose(a, t - .05), pf = pose(a, t - .09);
        p.aFs = pa.aFs; p.aBs = pa.aBs; p.aFe = pf.aFe; p.aBe = pf.aBe;
        const F = fk(p), x = rootX(a, t), f = facing(a, t);
        const fs = Math.abs(f) < .22 ? .22 * Math.sign(f || 1) : f;
        el.R.setAttribute("transform", `translate(${x.toFixed(2)},${a.y.toFixed(2)})`);
        el.body.setAttribute("transform", `scale(${(fs * a.s * p.sx).toFixed(4)},${(a.s * p.sy).toFixed(4)})`);
        const airH = -Math.min(0, F.pel[1] + THIGH + SHIN);
        el.shadow.setAttribute("rx", (26 * a.s * Math.max(.45, 1 - airH / 90)).toFixed(2));
        el.shadow.setAttribute("opacity", p.seat ? 0 : (.13 * Math.max(.4, 1 - airH / 80)).toFixed(3));   // 坐着（骑在牛背上）不画地面影子
        // 腿
        for (const n of ["F", "B"]) {
          const L = F.legs[n], E = el["leg" + n];
          tr(E.th, L.hip[0], L.hip[1], L.h); tr(E.sh, L.knee[0], L.knee[1], L.sa);
          tr(E.ft, L.ank[0], L.ank[1] - 3, Math.max(-25, Math.min(25, (L.sa) * .25)));
        }
        // 躯干（呼吸：轻微纵向起伏）
        const breathS = 1 + .014 * p.breath;
        el.torso.setAttribute("transform", `translate(${F.pel[0].toFixed(2)},${F.pel[1].toFixed(2)}) rotate(${F.lean.toFixed(2)}) scale(1,${breathS.toFixed(4)})`);
        if (el.skirt) el.skirt.setAttribute("transform", `translate(${F.pel[0].toFixed(2)},${F.pel[1].toFixed(2)}) rotate(${(F.lean * .4).toFixed(2)})`);
        // 头：看向焦点（笔尖或 look 目标），讲话时轻微点头
        const ex = exprAt(a, t), v = visemeAt(a, t), spk = isSpeaking(a, t);
        let lookX = ex.lx || 0, lookY = ex.ly || 0, look = null;
        for (const lk of a.looks) if (t >= lk.t && t <= lk.t + lk.dur) look = [lk.x, lk.y];
        if (!look && pen && a.narrator) look = pen;
        const hw = toWorld(a, t, F.neck, { x, y: a.y, f: fs, s: a.s, sx: p.sx, sy: p.sy });
        let headTurn = 0;
        if (look) {
          const dx = (look[0] - hw[0]) * Math.sign(fs), dy = look[1] - (hw[1] - 20 * a.s);
          const ang = Math.atan2(dy, Math.abs(dx) + 1) / D2R;
          lookX = Math.max(-1.4, Math.min(1.6, dx / 120)); lookY = Math.max(-1.4, Math.min(1.4, dy / 120));
          headTurn = Math.max(-8, Math.min(10, ang * .25)) * (dx < 0 ? -.4 : 1);
        }
        const nod = spk && !reduced ? Math.sin(t * 7.3) * 1.6 + (v === 2 ? 1.2 : 0) : 0;
        const hdeg = F.head + ex.tilt + headTurn + nod;
        el.neckG.setAttribute("transform", `translate(${F.neck[0].toFixed(2)},${F.neck[1].toFixed(2)}) rotate(${(F.lean * .7).toFixed(2)})`);
        el.headG.setAttribute("transform", `translate(${(F.neck[0] + Math.sin(F.lean * D2R) * 3).toFixed(2)},${(F.neck[1] - 3).toFixed(2)}) rotate(${hdeg.toFixed(2)})`);
        // 余摆（M3）：马尾、领巾尾巴
        let fx = { ax: 0, ay: 0, vx: 0 };
        if (!reduced) fx = follow(a, t, 2 * Math.PI * 1.5, 3.2, .012);
        const sway = Math.sin(t * 2 * Math.PI / 2.6 + a.seed) * 2.5;
        const drag = Math.max(-26, Math.min(26, -fx.vx * .09 * Math.sign(fs)));
        const tailA = Math.max(-50, Math.min(50, -fx.ax * Math.sign(fs) * 1 + fx.ay * .4 + drag + sway - hdeg * .6));
        el.tail.setAttribute("transform", el.headG.getAttribute("transform") + " scale(1.12) translate(-12,-34)");
        el.tailIn.setAttribute("transform", `rotate(${tailA.toFixed(2)})`);
        const scA = Math.max(-40, Math.min(40, -fx.ax * Math.sign(fs) * .8 + drag * .8 + sway * .6 - F.lean * .5));
        el.scarfTail.setAttribute("transform", `translate(${(F.neck[0] + 1).toFixed(2)},${(F.neck[1] + 3).toFixed(2)}) rotate(${(F.lean + scA).toFixed(2)})`);
        // 手臂
        for (const n of ["F", "B"]) {
          const A = F.arms[n], E = el["arm" + n];
          tr(E.ua, A.sh[0], A.sh[1], A.ua); tr(E.fa, A.el[0], A.el[1], A.fa);
        }
        // 五官
        let blink = 0;
        for (const b of a.blinks) { if (b > t) break; if (t - b < .16) blink = Math.sin((t - b) / .16 * Math.PI); }
        const eo = Math.max(.08, ex.eo * (1 - blink * .92));
        el.eyes.forEach((E, i) => {
          E.e.setAttribute("rx", (2.8 * ex.es).toFixed(2)); E.e.setAttribute("ry", (3.8 * ex.es * eo).toFixed(2));
          E.g.setAttribute("transform", `translate(${(E.x + lookX * 1.1).toFixed(2)},${(E.y + lookY * 1).toFixed(2)})`);
          E.hl.setAttribute("opacity", eo > .4 ? 1 : 0);
          E.lid.setAttribute("d", ex.eo < .7 && blink < .5 ? `M-3.4,${(-3.4 * ex.es * eo).toFixed(2)} L3.4,${(-3.4 * ex.es * eo).toFixed(2)}` : "");
        });
        // 眉毛：bh 整体高低；ba 单边挑眉（左眉抬、右眉压）；bi 内端上扬（担心 / 哎呀）
        el.brows.forEach((B, i) => {
          const bx = i ? 8 : -5, by = -23 + ex.bh + (i ? ex.ba * .12 : -ex.ba * .2);
          const innerY = by - ex.bi * .16, outerY = by + ex.bi * .05;
          const lx = bx - 3.5, rx = bx + 3.5, ly = i ? innerY : outerY, ry = i ? outerY : innerY;
          B.setAttribute("d", `M${lx},${ly.toFixed(2)} Q${bx},${(Math.min(ly, ry) - 2).toFixed(2)} ${rx},${ry.toFixed(2)}`);
        });
        const mp = mouthPath(ex.m, spk ? v : 0, ex);
        el.mouth.setAttribute("d", mp[0]); el.mouth.setAttribute("fill", mp[1] ? "#9f1239" : "none");
        el.blushL.setAttribute("opacity", (.75 * ex.blush).toFixed(2)); el.blushR.setAttribute("opacity", (.75 * ex.blush).toFixed(2));
        el.sweat.setAttribute("opacity", ex.sweat.toFixed(2));
        if (el.marker) el.marker.setAttribute("opacity", a.holding ? 0 : 1);
        // 抱着 / 举着的道具画在身体里（前臂下面），跟骨架走
        for (const pr of S.props) if (pr.holder === a) placeHeld(pr, a, F, fs, t);
        a._F = F; a._R = { x, y: a.y, f: fs, s: a.s, sx: p.sx, sy: p.sy }; a._p = p;
      }
    }
    function anchorW(a, t, kind) {
      const p = pose(a, t, true), F = fk(p), R = { x: rootX(a, t), y: a.y, f: facing(a, t), s: a.s, sx: p.sx, sy: p.sy };
      return { w: toWorld(a, t, localAnchor(F, kind), R), R, F };
    }
    const localAnchor = (F, kind) => kind === "hand" ? [F.arms.F.hand[0] + 2, F.arms.F.hand[1] + 9]
      : kind === "overhead" ? [(F.arms.F.hand[0] + F.arms.B.hand[0]) / 2, Math.min(F.arms.F.hand[1], F.arms.B.hand[1]) - 2]
      : kind === "book" ? [(F.arms.F.hand[0] + F.arms.B.hand[0]) / 2 + 3, (F.arms.F.hand[1] + F.arms.B.hand[1]) / 2 + 9]
      : [(F.arms.F.hand[0] + F.arms.B.hand[0]) / 2 + 1, (F.arms.F.hand[1] + F.arms.B.hand[1]) / 2 + 13];
    const reparent = (pr, parent) => { if (pr.el.parentNode !== parent) { if (parent === pr.host) parent.insertBefore(pr.el, pr.mark); else parent.appendChild(pr.el); } };
    // 道具状态（纯函数）：最近一个事件决定——在地上 / 挂在某人身上 / 被放下 / 收起
    function renderProp(pr, t) {
      if (pr.stampAt != null) {
        const q = t - pr.stampAt;   // q<0：印章在上面落下；0–.25 压扁；之后抬走
        const down = q < 0 ? EASEX(clamp((q + .45) / .45)) : 1, up = clamp((q - .3) / .35);
        pr.hammer.setAttribute("opacity", (q > -.5 && q < .7 && !reduced) ? (1 - up).toFixed(2) : 0);
        const sq = q >= 0 && q < .3 ? Math.sin(q / .3 * Math.PI) * .25 : 0;
        pr.hammer.setAttribute("transform", `translate(0,${(-60 * (1 - down) - 40 * eio(up)).toFixed(1)}) scale(${1 + sq},${1 - sq})`);
        pr.stampEl.setAttribute("opacity", q >= 0 ? 1 : 0);
      }
      let st = null;
      for (const e of pr.ev) if (e.t <= t) st = e;
      pr.holder = null; pr.st = st;
      if (st && st.anchor) {
        const q = clamp((t - st.t) / .16);
        const prev = pr.ev.filter(e => e.t < st.t).pop();
        if (q < 1 && !st.pop) {   // 从地上吸到手里的那一下（世界坐标里插值）
          let x0 = pr.x, y0 = pr.y;
          if (prev && prev.drop) { const B = anchorW(prev.a, prev.t, "chest"); x0 = B.w[0]; y0 = prev.a.y; }
          else if (prev && prev.anchor) { const B = anchorW(prev.a, t, prev.anchor); x0 = B.w[0]; y0 = B.w[1]; }   // 从一个手位换到另一个手位
          const A = anchorW(st.a, t, st.anchor), qq = eio(q);
          reparent(pr, pr.host);
          pr.el.setAttribute("transform", `translate(${lerp(x0, A.w[0], qq).toFixed(2)},${lerp(y0, A.w[1], qq).toFixed(2)}) scale(${lerp(pr.s, st.a.s, qq).toFixed(3)})`);
          pr.el.setAttribute("opacity", 1);
          return;
        }
        pr.holder = st.a; st.a.holding = true; pr.anchor = st.anchor; pr.popQ = st.pop ? clamp((t - st.t) / .3) : 1;
        // 拿着它的人看不见了（走进城门、淡出）：道具跟着看不见；画在人身上由 placeHeld 负责
        pr.el.setAttribute("opacity", opacity(st.a, t) < .01 ? 0 : 1);
        if (opacity(st.a, t) < .01) { reparent(pr, pr.host); pr.holder = null; }
        return;
      }
      reparent(pr, pr.host);
      let x = pr.x, y = pr.y, sc = pr.s, op = pr.hidden && !st ? (pr.showAt != null && t >= pr.showAt ? eio((t - pr.showAt) / .3) : 0) : 1, sx = 1, sy = 1;
      if (st && st.gone) {
        const prev = pr.ev.filter(e => e.t < st.t && e.anchor).pop(), q = clamp((t - st.t) / .25);
        const A = anchorW(st.a, st.t, prev ? prev.anchor : "overhead"); x = A.w[0]; y = A.w[1]; op = 1 - q; sc = pr.s * (1 - .3 * q);
      } else if (st && st.drop) {
        const prev = pr.ev.filter(e => e.t < st.t && e.anchor).pop();
        const A = anchorW(st.a, st.t, prev ? prev.anchor : "chest"), q = clamp((t - st.t) / .18);
        x = A.w[0]; y = lerp(A.w[1], st.a.y, q * q);
        const land = Math.sin(clamp((t - st.t - .18) / .22) * Math.PI);   // 落地挤压（M2）
        sx = 1 + .14 * land; sy = 1 - .14 * land; sc = st.a.s;
      }
      pr.el.setAttribute("transform", `translate(${x.toFixed(2)},${y.toFixed(2)}) scale(${(sc * sx).toFixed(3)},${(sc * sy).toFixed(3)})`);
      pr.el.setAttribute("opacity", op.toFixed(3));
    }
    function placeHeld(pr, a, F, fs, t) {
      reparent(pr, a.el.propSlot);
      const pt = localAnchor(F, pr.anchor), q = pr.popQ < 1 ? .4 + .6 * back(pr.popQ) : 1;
      // 身体被镜像时把道具再翻回来（词卡上的字不能反）
      pr.el.setAttribute("transform", `translate(${pt[0].toFixed(2)},${pt[1].toFixed(2)}) scale(${(Math.sign(fs) * q).toFixed(3)},${q.toFixed(3)})`);
      if (pr.page) pr.page.setAttribute("transform", `scale(${Math.cos(t * 1.7) > .93 ? -1 : 1},1)`);
    }
    return { render, rootX, pose, fk, anchorW };
  }
  return { kit, mount, ACTIONS, EXPR, LOOKS };
})();
