// ==================== 白板引擎 · 动作系统 v2（决策 30）：骨架 v2 + 动词专属动作 + 互动道具 / 动物 + 简笔场景 ====================
// 设计：MASTER_DESIGN 决策 30、§2.8；验收：SOP §16（R4v2）。和 wb_actor.js（讲解员 + v1 动作库）并存、互不影响：
// 旧幕不调用 k.cast 就什么都不画（reg_render 证明旧幕渲染不变）。
// 思路：每个角色 / 道具 = 一组参数轨道（x、朝向、视角、各关节角度、门开合……）；动词动作 = 往轨道里写「预备 → 发力 → 结果」三段关键段。
// 全部是时间 t 的纯函数（进度条拖到哪都对）；走路步伐相位跟着走过的距离走（脚不打滑）。
// 用法（案例脚本里，先 k.v2()）：
//   const boy = k.cast("boy", { x: 220, y: 470, s: 1, f: 1, g: D.sub() });     // 人：boy / girl / mom / dad / teacher
//   const dog = k.cast("dog", { x: 160, y: 470, pose: "lie", g });              // 动物：dog / cat
//   const door = k.cast("door", { x: 170, y: 470, w: 70, h: 130, g });         // 门（可开合）
//   const leash = k.cast("leash", { len: 120, A: { at: [x, y] }, B: { at: [x, y + 40] }, g }); // 牵绳：两端可挂到挂钩 / 手 / 项圈
//   k.scenery("house", { x: 60, ground: 470 })                                 // 简笔场景（静态手绘线条）：house / yard / park / classroom / kitchen
//   k.verb(boy, "take", t, dur, { obj: leash, end: "A", words: ["take"] })     // 动词专属动作，自动登记给 R4v2
//   k.verb(boy, "walk", t, dur, { to: 600, words: ["out"] })
// 动词表（VERB_TABLE）：词形 → 专属动作 id，r2check R4v2 用它核对语义。
var WB_VERBS = (function () {
  const D2R = Math.PI / 180, clamp = v => Math.max(0, Math.min(1, v)), lerp = (a, b, q) => a + (b - a) * q;
  const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const eout = x => { x = clamp(x); return 1 - Math.pow(1 - x, 3); };
  const ein = x => { x = clamp(x); return x * x * x; };
  const back = x => { x = clamp(x); const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const EASE = { io: eio, out: eout, in: ein, back, lin: x => clamp(x), step: x => (x >= 1 ? 1 : 0) };
  const INK = "#1f2937";
  // 人物比例（小学生：头大、腿短）
  const TH = 27, SH = 26, TORSO = 36, UA = 21, FA = 19, HEAD = 16;

  // 词形 → 专属动作 id（R4v2 语义核对用；同一动作的所有词形都列上）
  const VERB_TABLE = {
    take: "take", takes: "take", took: "take", taking: "take", taken: "take",
    "take out": "take_out", "takes out": "take_out", "took out": "take_out", out: "take_out",
    walk: "walk", walks: "walk", walked: "walk", walking: "walk",
    go: "walk", goes: "walk", went: "walk", going: "walk",
    run: "run", runs: "run", ran: "run", running: "run",
    open: "open", opens: "open", opened: "open", opening: "open",
    close: "close", closes: "close", closed: "close",
    put: "put", puts: "put", putting: "put",
    pick: "take", "pick up": "take", give: "give", gives: "give", gave: "give",
    wave: "wave", waves: "wave", waved: "wave",
    clip: "clip", clips: "clip", clipped: "clip",
  };
  // 每个专属动作：预备 / 发力 / 结果 三段的时间占比（actsheet.py 按它取 3 帧）
  const PHASES = { take: [.15, .45, .95], take_out: [.1, .5, .98], walk: [.1, .5, .98], run: [.1, .5, .98], open: [.15, .55, .98], close: [.15, .55, .98], put: [.15, .55, .98], give: [.15, .55, .98], wave: [.1, .5, .95], clip: [.15, .55, .98] };

  const BASE = {
    human: { x: 0, y: 470, s: 1, f: 1, view: 0, lean: 0, drop: 0, hF: 4, kF: 4, hB: -4, kB: 4, sF: 8, eF: 12, sB: -6, eB: 10, grF: 0, grB: 0, head: 0, op: 1, walk: 0, swingF: 1, swingB: 1, mouth: 0, depth: 1 },
    dog: { x: 0, y: 470, s: 1, f: 1, stand: 1, walk: 0, wag: .35, headUp: 0, mouth: 0, op: 1, depth: 1 },
    cat: { x: 0, y: 470, s: 1, f: 1, stand: 1, walk: 0, wag: .2, headUp: 0, mouth: 0, op: 1, depth: 1 },
    door: { x: 0, y: 470, w: 70, h: 130, open: 0, op: 1 },
    leash: { len: 120, op: 1 },
  };
  const LOOK = {
    boy: { skin: "#fde3cf", hair: "#2b2b2b", shirt: "#e05a47", shirtD: "#b8432f", inner: "#fcd34d", pants: "#5b7fb5", pantsD: "#46679a", shoe: "#ffffff", style: "spiky" },
    girl: { skin: "#fde3cf", hair: "#5b3a24", shirt: "#f472b6", shirtD: "#db2777", inner: "#ffffff", pants: "#7c3aed", pantsD: "#5b21b6", shoe: "#ffffff", style: "bob" },
    mom: { skin: "#fde3cf", hair: "#7a4a2a", shirt: "#10b981", shirtD: "#047857", inner: "#ffffff", pants: "#334155", pantsD: "#1f2937", shoe: "#7c2d12", style: "bun", adult: true },
    dad: { skin: "#f6d2b3", hair: "#3f2d22", shirt: "#3b82f6", shirtD: "#1d4ed8", inner: "#ffffff", pants: "#374151", pantsD: "#1f2937", shoe: "#3f2d22", style: "short", adult: true },
    teacher: { skin: "#fde3cf", hair: "#7a4a2a", shirt: "#2f8f6f", shirtD: "#256f57", inner: "#ffffff", pants: "#26315f", pantsD: "#1c2447", shoe: "#ffffff", style: "bun", adult: true },
  };
  const HUMANS = Object.keys(LOOK);

  // ---------- kit：脚本工具 ----------
  function kit(k) {
    const S = k.S;
    S.cast = S.cast || [];
    const typeOf = kind => (HUMANS.includes(kind) ? "human" : kind);
    k.cast = (kind, o = {}) => {
      const type = typeOf(kind), base = Object.assign({}, BASE[type] || {});
      ["x", "y", "s", "f", "w", "h", "len", "view", "depth"].forEach(n => { if (o[n] != null) base[n] = o[n]; });
      if (type === "dog" || type === "cat") base.stand = o.pose === "lie" ? 0 : o.pose === "sit" ? .5 : 1;
      if (o.open != null) base.open = o.open;
      const e = { id: S.cast.length, kind, type, base, seg: {}, ev: [], g: o.g ?? S.g, showAt: o.hidden ? Infinity : (S.at > 0 ? S.at : -1), ends: {} };
      if (type === "leash") { e.ends.A = [{ t: -1, ...(o.A || { at: [0, 0] }) }]; e.ends.B = [{ t: -1, ...(o.B || { at: [0, 40] }) }]; }
      S.cast.push(e); return e;
    };
    // 参数轨道：从 t 开始，用 dur 秒把这些参数过渡到目标值
    k.to = (e, t, dur, vals, ease = "io") => {
      for (const n in vals) (e.seg[n] || (e.seg[n] = [])).push({ t, dur: Math.max(.001, dur), to: vals[n], e: ease });
      return t + dur;
    };
    // 牵绳两端：挂到某点 / 某人的握持点 / 动物项圈（t 时刻开始，0.25 秒滑过去）
    k.attach = (leash, end, target, t) => { leash.ends[end].push({ t, ...target }); };
    k.showCast = (e, t) => { e.showAt = t; };
    k.hideCast = (e, t, dur = .3) => k.to(e, t, dur, { op: 0 });
    // 动词：查专属动作表，写入关键段，并登记给 R4 / R4v2
    k.verb = (e, id, t, dur, o = {}) => {
      if (t == null) t = S.at;
      const fn = VERBS[id];
      if (!fn) throw new Error("WB_VERBS: 没有动作 " + id);
      fn(k, e, t, dur, o);
      const rec = { t, dur };
      (S.acts || (S.acts = [])).push({ actor: -2, look: e.kind, action: "verb:" + id, t, dur, words: o.words || [], e: rec, fx: true, verb: id });
      return t + dur;
    };
    // D.finish / 字幕推后时的时间重映射：轨道、牵绳事件、出场时刻一起改
    const remap0 = k.remap;
    k.remap = (g) => {
      if (remap0) remap0(g);
      S.cast.forEach(e => {
        for (const n in e.seg) e.seg[n].forEach(s => { const t0 = s.t; s.t = g(t0); s.dur = Math.max(.001, g(t0 + s.dur) - s.t); });
        for (const n in e.ends) e.ends[n].forEach(a => { if (a.t >= 0) a.t = g(a.t); });
        if (e.showAt > 0 && isFinite(e.showAt)) e.showAt = g(e.showAt);
      });
    };
    // 简笔场景（静态，手绘描线出现；放在当前组里，跟镜头一起擦掉）
    k.scenery = (name, o = {}) => (SCENES[name] || SCENES.yard)(k, o);
    k.VERB_TABLE = VERB_TABLE;
  }

  // ---------- 动词专属动作（预备 → 发力 → 结果）----------
  const pose = (k, e, t, dur, vals, ease) => k.to(e, t, dur, vals, ease);
  const VERBS = {
    // 走：起步（重心前移）→ 迈步走到 to → 收脚站定。o.lead：手里牵着东西时前手伸向前下方
    walk(k, e, t, dur, o) {
      const ramp = Math.min(.35, dur * .15);
      if (o.to != null && Math.sign(o.to - val(e, "x", t)) && Math.sign(o.to - val(e, "x", t)) !== Math.sign(val(e, "f", t))) turnTo(k, e, t, Math.sign(o.to - val(e, "x", t)));
      if (e.type === "human") {
        pose(k, e, t, ramp, { walk: 1, lean: 5, view: 0, swingF: o.lead ? .25 : 1 });
        if (o.lead) pose(k, e, t, ramp, { sF: 34, eF: 14, grF: 1 });
        pose(k, e, t + dur - ramp, ramp, { walk: 0, lean: 0 });
      } else {
        pose(k, e, t, ramp, { walk: 1, stand: 1, wag: .9 });
        pose(k, e, t + dur - ramp, ramp, { walk: 0 });
      }
      if (o.to != null) k.to(e, t, dur, { x: o.to }, "lin");
    },
    run(k, e, t, dur, o) { VERBS.walk(k, e, t, dur, o); k.to(e, t, Math.min(.3, dur * .2), { walk: 1.7, lean: 14 }); k.to(e, t + dur - .3, .3, { walk: 0, lean: 0 }); },
    // 拿：看向东西、伸手（预备）→ 抓住（握拳，东西挂到握持点）→ 收回胸前（结果：东西在手里）
    take(k, e, t, dur, o) {
      const reach = o.high ? { sF: 118, eF: 18 } : o.low ? { sF: 52, eF: 6, lean: 26, drop: 6 } : { sF: 78, eF: 8, lean: 10 };
      pose(k, e, t, dur * .12, { sF: 0, eF: 40, view: 0 });                 // 预备：手往回收
      pose(k, e, t + dur * .12, dur * .3, Object.assign({ grF: 0 }, reach), "back");   // 伸手（过冲）
      pose(k, e, t + dur * .42, dur * .08, { grF: 1 });                     // 抓住
      if (o.obj && o.obj.type === "leash") { k.attach(o.obj, o.end || "A", { ent: e, at: "gripF" }, t + dur * .45); if (o.dangle !== false) k.attach(o.obj, "B", { dangleFromA: true }, t + dur * .45); }
      pose(k, e, t + dur * .55, dur * .4, { sF: 30, eF: 70, lean: 0, drop: 0 });   // 收回胸前
    },
    // 扣上（牵绳扣到项圈）：弯腰、另一只手把绳头递到动物脖子上（结果：绳头挂在项圈上）
    clip(k, e, t, dur, o) {
      pose(k, e, t, dur * .3, { lean: 42, drop: 24, sB: 80, eB: 2, sF: 40, eF: 30, hF: 30, kF: 62, hB: 10, kB: 52 });
      if (o.obj) k.attach(o.obj, o.end || "B", { ent: e, at: "gripB" }, t + dur * .05);
      if (o.obj && o.to) k.attach(o.obj, o.end || "B", { ent: o.to, at: "collar" }, t + dur * .5);
      pose(k, e, t + dur * .65, dur * .35, { lean: 0, drop: 0, sB: -6, eB: 10, sF: 30, eF: 50, hF: 4, kF: 4, hB: -4, kB: 4 });
    },
    // 开门：伸手握门把（预备）→ 拉 / 推开（门转开，身体跟着后仰一点）→ 门开着（结果）
    open(k, e, t, dur, o) {
      if (e.type === "door") { k.to(e, t, dur, { open: 1 }, "back"); return; }
      pose(k, e, t, dur * .3, { sF: 80, eF: 10, grF: 0, lean: 6 }, "back");
      pose(k, e, t + dur * .3, dur * .1, { grF: 1 });
      if (o.obj) k.to(o.obj, t + dur * .35, dur * .5, { open: 1 }, "back");
      pose(k, e, t + dur * .4, dur * .45, { sF: 40, eF: 30, lean: -4 });
      pose(k, e, t + dur * .85, dur * .15, { grF: 0, sF: 8, eF: 12, lean: 0 });
    },
    close(k, e, t, dur, o) {
      if (e.type === "door") { k.to(e, t, dur, { open: 0 }, "io"); return; }
      pose(k, e, t, dur * .3, { sF: 70, eF: 10, lean: 6 });
      if (o.obj) k.to(o.obj, t + dur * .3, dur * .5, { open: 0 });
      pose(k, e, t + dur * .8, dur * .2, { sF: 8, eF: 12, lean: 0 });
    },
    // 带……出去（take … out）：牵着宾语往外走——人走在后面、手里牵绳伸向前下方，宾语（动物）在前面跟着走；结果：两个都到了外面
    take_out(k, e, t, dur, o) {
      VERBS.walk(k, e, t, dur, { to: o.to, lead: true });
      if (o.obj) {
        const lag = o.lag ?? .25, ahead = o.ahead ?? 80;
        VERBS.walk(k, o.obj, t + lag, dur - lag, { to: o.to + ahead * Math.sign(o.to - val(e, "x", t)) });
        k.to(o.obj, t + lag, .4, { headUp: 1, mouth: 1 });
      }
    },
    put(k, e, t, dur, o) {
      pose(k, e, t, dur * .45, { sF: 50, eF: 10, lean: 24, drop: 6 });
      pose(k, e, t + dur * .45, dur * .1, { grF: 0 });
      pose(k, e, t + dur * .6, dur * .4, { sF: 8, eF: 12, lean: 0, drop: 0 });
    },
    give(k, e, t, dur, o) {
      pose(k, e, t, dur * .2, { sF: 20, eF: 70, grF: 1 });
      pose(k, e, t + dur * .2, dur * .4, { sF: 85, eF: 6, lean: 8 }, "back");
      pose(k, e, t + dur * .65, dur * .1, { grF: 0 });
      pose(k, e, t + dur * .75, dur * .25, { sF: 8, eF: 12, lean: 0 });
    },
    wave(k, e, t, dur) {
      pose(k, e, t, dur * .15, { view: 1, sF: 150, eF: 30 }, "back");
      for (let i = 0; i < 3; i++) { pose(k, e, t + dur * (.15 + i * .22), dur * .11, { eF: 60 }); pose(k, e, t + dur * (.26 + i * .22), dur * .11, { eF: 10 }); }
      pose(k, e, t + dur * .85, dur * .15, { sF: 8, eF: 12 });
    },
    // 动物：站起来、坐下、摇尾巴
    stand(k, e, t, dur) { k.to(e, t, dur, { stand: 1, wag: 1, headUp: .6 }, "back"); },
    sit(k, e, t, dur) { k.to(e, t, dur, { stand: .5 }); },
    lie(k, e, t, dur) { k.to(e, t, dur, { stand: 0, wag: .2 }); },
  };
  function turnTo(k, e, t, dir) {   // 转身：经过正面视角（躯干转动），不是硬翻转
    if (e.type === "human") { k.to(e, t, .18, { view: 1 }); k.to(e, t + .18, .18, { view: 0 }); }
    k.to(e, t + .08, .2, { f: dir }, "step");
  }

  // ---------- 轨道求值（纯函数）----------
  function val(e, n, t) {
    let cur = e.base[n];
    const segs = e.seg[n];
    if (!segs) return cur;
    for (const s of segs) {
      if (t < s.t) break;
      cur = lerp(cur, s.to, (EASE[s.e] || eio)((t - s.t) / s.dur));
    }
    return cur;
  }
  function sortSegs(e) { for (const n in e.seg) e.seg[n].sort((a, b) => a.t - b.t); for (const n in e.ends) e.ends[n].sort((a, b) => a.t - b.t); }
  function dist(e, t) {   // 走过的距离（步伐相位）
    const segs = e.seg.x; if (!segs) return 0;
    let d = 0;
    for (const s of segs) { if (t < s.t) break; const from = val(e, "x", s.t - 1e-6), q = (EASE[s.e] || eio)((t - s.t) / s.dur); d += Math.abs(lerp(from, s.to, q) - from); }
    return d;
  }

  // ---------- 简笔场景 ----------
  const SCENES = {
    // 院子：地面线 + 草 + 两朵云
    yard(k, o) {
      const { P, F, go } = k, C = k.PAL, gy = o.ground ?? 470, x0 = o.x0 ?? 16, x1 = o.x1 ?? 800;
      P(k.wl(x0, gy, x1, gy, .4), go(.5), .5, { color: C.ink, w: 2.4 });
      F(k.rectD(x0, gy, x1 - x0, 60), go(.2, 0), { color: C.tintGreen, op: .9 });
      [[110, 0], [420, 1], [690, 0]].forEach(([x, i]) => P(`M${x},${gy} l4,-9 l3,9 l4,-7 l2,7`, go(.12, 0), .12, { color: C.green, w: 1.8 }));
      if (o.clouds !== false) [[470, 150], [700, 196]].forEach(([cx, cy]) => { const d = k.cloud(cx, cy, 44, 18, 7); P(d, go(.4, 0), .4, { color: C.grey, w: 1.6 }); F(d, go(.1, 0), { color: "#ffffff", op: 1 }); });
    },
    // 房子正面：墙、三角屋顶、两扇窗；门洞位置给 door 角色（返回门的位置）
    house(k, o) {
      const { P, F, T, go } = k, C = k.PAL, x = o.x ?? 60, gy = o.ground ?? 470, w = o.w ?? 290, wh = o.wallH ?? 180;
      const top = gy - wh;
      P(k.roughRect(x, top, w, wh), go(.7), .7, { color: C.ink, w: 2.6 });
      F(k.rectD(x, top, w, wh), go(.2, 0), { color: "#fef9c3", op: .9 });
      const roof = `M${x - 22},${top} L${x + w / 2},${top - 92} L${x + w + 22},${top} Z`;
      P(roof, go(.6), .6, { color: C.ink, w: 2.6 }); F(roof, go(.2, 0), { color: C.tintRed, op: 1 });
      [[x + 28, top + 40], [x + w - 82, top + 40]].forEach(([wx, wy]) => {
        P(k.roughRect(wx, wy, 54, 46), go(.3), .3, { color: C.ink, w: 2.2 }); F(k.rectD(wx, wy, 54, 46), go(.1, 0), { color: C.tintBlue, op: 1 });
        P(`M${wx + 27},${wy} L${wx + 27},${wy + 46} M${wx},${wy + 23} L${wx + 54},${wy + 23}`, go(.2), .2, { color: C.ink, w: 1.6 });
      });
      const dw = o.doorW ?? 72, dh = o.doorH ?? 136, dx = x + (o.doorAt ?? (w / 2 - dw / 2));
      return { doorX: dx, doorW: dw, doorH: dh, ground: gy, top, roofTop: top - 92, x, w };
    },
    park(k, o) {
      SCENES.yard(k, o);
      const { P, F, go } = k, C = k.PAL, gy = o.ground ?? 470, tx = o.treeX ?? 640;
      const crown = k.cloud(tx, gy - 130, 46, 34, 5);
      P(`M${tx - 8},${gy} L${tx - 6},${gy - 100} M${tx + 8},${gy} L${tx + 6},${gy - 100}`, go(.4), .4, { color: C.ink, w: 2.4 });
      P(crown, go(.6), .6, { color: C.green, w: 2.2 }); F(crown, go(.1, 0), { color: C.tintGreen, op: 1 });
      P(`M${tx - 150},${gy - 34} h90 M${tx - 146},${gy - 34} v34 M${tx - 64},${gy - 34} v34 M${tx - 150},${gy - 50} h90`, go(.4), .4, { color: C.ink, w: 2.4 });
    },
    classroom(k, o) {
      const { P, F, go } = k, C = k.PAL, gy = o.ground ?? 470;
      P(k.wl(16, gy, 800, gy, .4), go(.4), .4, { color: C.ink, w: 2.4 });
      P(k.roughRect(150, 150, 360, 170), go(.6), .6, { color: C.ink, w: 2.6 }); F(k.rectD(150, 150, 360, 170), go(.1, 0), { color: "#d1fae5", op: .9 });
      P(`M${560},${gy - 60} h140 M${575},${gy - 60} v60 M${685},${gy - 60} v60`, go(.4), .4, { color: C.ink, w: 2.4 });
    },
    kitchen(k, o) {
      const { P, F, go } = k, C = k.PAL, gy = o.ground ?? 470;
      P(k.wl(16, gy, 800, gy, .4), go(.4), .4, { color: C.ink, w: 2.4 });
      P(k.roughRect(80, gy - 90, 220, 90), go(.5), .5, { color: C.ink, w: 2.4 }); F(k.rectD(80, gy - 90, 220, 90), go(.1, 0), { color: C.tintInk, op: 1 });
      P(`M${120},${gy - 90} m0,0 a18,6 0 1,0 36,0 a18,6 0 1,0 -36,0 M${210},${gy - 90} a18,6 0 1,0 36,0 a18,6 0 1,0 -36,0`, go(.4), .4, { color: C.ink, w: 2 });
      P(`M${520},${gy - 70} h180 M${540},${gy - 70} v70 M${680},${gy - 70} v70`, go(.4), .4, { color: C.ink, w: 2.4 });
    },
  };

  // ---------- 播放器 ----------
  function mount(env) {
    const { S, mk } = env;
    if (!S.cast || !S.cast.length) return null;
    S.cast.forEach(sortSegs);
    const reduced = env.reduced;
    const G = (p, a = {}) => mk("g", a, p);
    const path = (p, d, fill, w = 2.2, stroke = INK, extra = {}) => mk("path", Object.assign({ d, fill, stroke, "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round" }, extra), p);
    const limb = (p, color) => ({ o: path(p, "", "none", 9.5, INK), i: path(p, "", "none", 6, color) });
    const setLimb = (L, pts) => { const d = "M" + pts.map(q => q[0].toFixed(2) + "," + q[1].toFixed(2)).join(" L"); L.o.setAttribute("d", d); L.i.setAttribute("d", d); };
    const host = e => (e.g ? env.ensureGroup(e.g) : env.layer);
    const dirv = a => [Math.sin(a * D2R), Math.cos(a * D2R)];

    // ---- 人（骨架 v2：手掌 + 握持点、躯干转动 view、头独立转动）----
    function buildHuman(e) {
      const L = LOOK[e.kind], R = G(host(e), { "data-cast": e.kind });
      const shadow = mk("ellipse", { cx: 0, cy: 0, rx: 30, ry: 5, fill: INK, opacity: .12 }, R);
      const body = G(R);
      const el = { R, shadow, body, L };
      el.legB = limb(body, L.pantsD); el.shoeB = path(body, "", L.shoe, 2);
      el.armB = limb(body, L.shirtD); el.handB = mk("circle", { r: 4.2, fill: L.skin, stroke: INK, "stroke-width": 1.8 }, body);
      el.torso = path(body, "", L.shirt, 2.4); el.inner = path(body, "", L.inner, 1.6);
      el.legF = limb(body, L.pants); el.shoeF = path(body, "", L.shoe, 2);
      el.neck = path(body, "", L.skin, 1.8);
      el.head = G(body);
      el.hairBack = path(el.head, "", L.hair, 2);
      el.face = mk("circle", { cx: 0, cy: 0, r: HEAD, fill: L.skin, stroke: INK, "stroke-width": 2.4 }, el.head);
      el.ear = mk("ellipse", { cx: -10, cy: 2, rx: 2.8, ry: 4, fill: L.skin, stroke: INK, "stroke-width": 1.5 }, el.head);
      el.hair = path(el.head, "", L.hair, 2.2);
      el.eye1 = mk("ellipse", { rx: 2.2, ry: 3, fill: INK }, el.head);
      el.eye2 = mk("ellipse", { rx: 2.2, ry: 3, fill: INK }, el.head);
      el.nose = path(el.head, "", "none", 1.8);
      el.mouth = path(el.head, "", "none", 1.8, "#9f1239");
      el.blush = mk("ellipse", { rx: 3.2, ry: 2, fill: "#f9a8a8", opacity: .8 }, el.head);
      el.armF = limb(body, L.shirt); el.handF = mk("circle", { r: 4.4, fill: L.skin, stroke: INK, "stroke-width": 1.8 }, body);
      el.fistF = path(body, "", "none", 1.4); el.fistB = path(body, "", "none", 1.4);
      e.el = el;
    }
    // 正向运动学（局部坐标：脚底中心 = 0,0，朝右，y 向下）
    function fkHuman(e, t) {
      const v = n => val(e, n, t), view = v("view"), sc = LOOK[e.kind].adult ? 1.18 : 1;
      let hF = v("hF"), kF = v("kF"), hB = v("hB"), kB = v("kB"), sF = v("sF"), sB = v("sB");
      const eF = v("eF"), eB = v("eB"), wk = v("walk");
      if (wk > 0.001 && !reduced) {
        const ph = 2 * Math.PI * dist(e, t) / (88 * e.base.s * sc), s1 = Math.sin(ph), c1 = Math.cos(ph), A = Math.min(1.7, wk);
        hF += 24 * A * s1; hB -= 24 * A * s1; kF += 30 * A * Math.max(0, c1); kB += 30 * A * Math.max(0, -c1);
        sF += -20 * A * s1 * v("swingF"); sB += 20 * A * s1 * v("swingB");
      }
      const hx = lerp(2, 7, view), sx = lerp(3, 13, view);
      const leg = (h, kn, ox) => { const hip = [ox, -(TH + SH) * sc], d1 = dirv(h), knee = [hip[0] + d1[0] * TH * sc, hip[1] + d1[1] * TH * sc], d2 = dirv(h - kn), ank = [knee[0] + d2[0] * SH * sc, knee[1] + d2[1] * SH * sc]; return { hip, knee, ank }; };
      const LF = leg(hF, kF, hx), LB = leg(hB, kB, -hx);
      const low = Math.max(LF.ank[1], LB.ank[1]), dy = -low + v("drop") * .0;
      [LF, LB].forEach(Lg => ["hip", "knee", "ank"].forEach(n => { Lg[n] = [Lg[n][0], Lg[n][1] + dy + v("drop")]; }));
      const pel = [0, -(TH + SH) * sc + dy + v("drop")], lean = v("lean"), dt = [Math.sin(lean * D2R), -Math.cos(lean * D2R)];
      const neck = [pel[0] + dt[0] * TORSO * sc, pel[1] + dt[1] * TORSO * sc], shc = [pel[0] + dt[0] * (TORSO - 5) * sc, pel[1] + dt[1] * (TORSO - 5) * sc];
      const arm = (s, el, ox) => { const sh = [shc[0] + ox * Math.cos(lean * D2R), shc[1] + ox * Math.sin(lean * D2R)], d1 = dirv(s), elb = [sh[0] + d1[0] * UA * sc, sh[1] + d1[1] * UA * sc], d2 = dirv(s + el), hand = [elb[0] + d2[0] * FA * sc, elb[1] + d2[1] * FA * sc]; return { sh, elb, hand }; };
      const AF = arm(sF, eF, sx * .6), AB = arm(sB, eB, -sx);
      return { LF, LB, AF, AB, pel, neck, lean, view, sc, head: v("head") + lean * .4 };
    }
    function rootHuman(e, t) { const f = val(e, "f", t); return { x: val(e, "x", t), y: e.base.y - (1 - val(e, "depth", t)) * 14, f: Math.abs(f) < .2 ? .2 * Math.sign(f || 1) : f, s: e.base.s * val(e, "depth", t) }; }
    const toW = (R, p) => [R.x + p[0] * R.f * R.s, R.y + p[1] * R.s];
    function gripW(e, t, which) {
      if (e.type === "human") { const F = fkHuman(e, t), R = rootHuman(e, t); return toW(R, (which === "gripB" ? F.AB : F.AF).hand); }
      if (e.type === "dog" || e.type === "cat") { const R = { x: val(e, "x", t), y: e.base.y, f: val(e, "f", t), s: e.base.s * val(e, "depth", t) }, A = animalGeo(e, t); return toW(R, A.collar); }
      return [val(e, "x", t), e.base.y];
    }
    function renderHuman(e, t) {
      const el = e.el, L = el.L, F = fkHuman(e, t), R = rootHuman(e, t), view = F.view, sc = F.sc;
      el.R.setAttribute("transform", `translate(${R.x.toFixed(2)},${R.y.toFixed(2)})`);
      el.body.setAttribute("transform", `scale(${(R.f * R.s).toFixed(4)},${R.s.toFixed(4)})`);
      setLimb(el.legB, [F.LB.hip, F.LB.knee, F.LB.ank]); setLimb(el.legF, [F.LF.hip, F.LF.knee, F.LF.ank]);
      const shoe = A => `M${(A[0] - 6).toFixed(1)},${(A[1] - 4).toFixed(1)} Q${(A[0] - 7.5).toFixed(1)},${(A[1] + 3).toFixed(1)} ${(A[0] - 1).toFixed(1)},${(A[1] + 3.2).toFixed(1)} L${(A[0] + 11).toFixed(1)},${(A[1] + 3.2).toFixed(1)} Q${(A[0] + 14).toFixed(1)},${(A[1] + 1).toFixed(1)} ${(A[0] + 10).toFixed(1)},${(A[1] - 3).toFixed(1)} Q${(A[0] + 4).toFixed(1)},${(A[1] - 6).toFixed(1)} ${(A[0] - 6).toFixed(1)},${(A[1] - 4).toFixed(1)} Z`;
      el.shoeB.setAttribute("d", shoe(F.LB.ank)); el.shoeF.setAttribute("d", shoe(F.LF.ank));
      // 躯干：梯形（view 越正面越宽）
      const w0 = lerp(11, 15, view) * sc, w1 = lerp(13, 18, view) * sc, P0 = F.pel, N = F.neck, ln = F.lean * D2R, cs = Math.cos(ln), sn = Math.sin(ln);
      const q = (dx, dy) => [P0[0] + dx * cs - dy * sn, P0[1] + dx * sn + dy * cs];
      const tl = TORSO * sc, pts = [q(-w0, 4), q(-w1, -tl + 4), q(w1, -tl + 4), q(w0, 4)];
      el.torso.setAttribute("d", `M${pts[0]} Q${q(-w1 - 1, -tl * .5)} ${pts[1]} Q${q(0, -tl - 1)} ${pts[2]} Q${q(w1 + 1, -tl * .5)} ${pts[3]} Q${q(0, 7)} ${pts[0]} Z`.replace(/(-?\d+\.\d{3,})/g, m => (+m).toFixed(2)));
      const ix = lerp(4, 0, view);   // 里面 T 恤：侧面时露在前胸，正面时在中间
      el.inner.setAttribute("d", `M${q(ix - 4, -tl + 6)} L${q(ix + 4, -tl + 6)} L${q(ix + 3, -tl * .25)} L${q(ix - 3, -tl * .25)} Z`.replace(/(-?\d+\.\d{3,})/g, m => (+m).toFixed(2)));
      el.neck.setAttribute("d", `M${(N[0] - 3.5).toFixed(2)},${(N[1] + 3).toFixed(2)} L${(N[0] + 3.5).toFixed(2)},${(N[1] + 3).toFixed(2)} L${(N[0] + 3.5).toFixed(2)},${(N[1] - 4).toFixed(2)} L${(N[0] - 3.5).toFixed(2)},${(N[1] - 4).toFixed(2)} Z`);
      // 头
      const hc = [N[0] + Math.sin(ln) * 4, N[1] - HEAD * sc + 2];
      el.head.setAttribute("transform", `translate(${hc[0].toFixed(2)},${hc[1].toFixed(2)}) rotate(${(-F.head * 0 + F.head).toFixed(2)}) scale(${sc.toFixed(3)})`);
      const exs = lerp(6.5, -5.5, view), ex2 = lerp(14, 5.5, view);
      el.eye1.setAttribute("cx", exs.toFixed(2)); el.eye1.setAttribute("cy", -1);
      el.eye2.setAttribute("cx", ex2.toFixed(2)); el.eye2.setAttribute("cy", -1); el.eye2.setAttribute("opacity", clamp((view - .25) * 2).toFixed(2));
      el.ear.setAttribute("opacity", (1 - clamp(view * 1.6)).toFixed(2)); el.ear.setAttribute("cx", lerp(-10, -15, view).toFixed(2));
      el.nose.setAttribute("d", view < .5 ? `M${HEAD - 1},-1 Q${HEAD + 3},3 ${HEAD - 1},5` : "M0,3 Q1.5,5 0,6");
      const mo = val(e, "mouth", t), mx = lerp(9, 0, view);
      el.mouth.setAttribute("d", mo > .5 ? `M${mx - 4},7 Q${mx},14 ${mx + 4},7 Z` : `M${mx - 4},8 Q${mx},12 ${mx + 4},8`);
      el.mouth.setAttribute("fill", mo > .5 ? "#9f1239" : "none");
      el.blush.setAttribute("cx", lerp(5, 9, view).toFixed(2)); el.blush.setAttribute("cy", 5);
      const st = L.style;
      el.hair.setAttribute("d", st === "spiky" ? "M-16,-2 Q-19,-18 -6,-20 L-3,-27 L2,-20 L7,-26 L9,-18 L15,-22 L14,-12 Q17,-8 16,-4 Q12,-14 2,-13 Q-6,-12 -10,-6 Q-12,-2 -16,-2 Z"
        : st === "bob" ? "M-17,8 Q-21,-20 0,-19 Q20,-19 17,4 Q15,-10 4,-12 Q-6,-13 -12,-4 Q-14,2 -17,8 Z"
        : st === "bun" ? "M-16,-2 Q-18,-19 0,-19 Q17,-19 16,-4 Q12,-13 2,-13 Q-8,-13 -12,-6 Z M-20,-12 a6,6 0 1,0 0.1,0 Z"
        : "M-16,-3 Q-17,-19 0,-19 Q16,-19 16,-6 Q12,-14 2,-14 Q-8,-14 -12,-8 Z");
      el.hairBack.setAttribute("d", st === "bob" ? "M-17,8 Q-18,16 -10,16 L-6,4 Z" : "");
      // 手臂 + 手（握持点）
      setLimb(el.armB, [F.AB.sh, F.AB.elb, F.AB.hand]); setLimb(el.armF, [F.AF.sh, F.AF.elb, F.AF.hand]);
      el.handB.setAttribute("cx", F.AB.hand[0].toFixed(2)); el.handB.setAttribute("cy", F.AB.hand[1].toFixed(2));
      el.handF.setAttribute("cx", F.AF.hand[0].toFixed(2)); el.handF.setAttribute("cy", F.AF.hand[1].toFixed(2));
      const fist = (H, g) => (g > .5 ? `M${(H[0] - 2.5).toFixed(1)},${(H[1] - 1).toFixed(1)} q2.5,2 5,0` : "");
      el.fistF.setAttribute("d", fist(F.AF.hand, val(e, "grF", t))); el.fistB.setAttribute("d", fist(F.AB.hand, val(e, "grB", t)));
      el.shadow.setAttribute("rx", (30 * R.s * sc).toFixed(1));
    }

    // ---- 动物（侧面）：狗 / 猫 ----
    function animalGeo(e, t) {
      const st = val(e, "stand", t), cat = e.type === "cat";
      const legLen = lerp(4, 20, clamp(st * 1.2 - .2)) * (cat ? .9 : 1);
      const bodyY = -(legLen + 12);
      const sitTilt = clamp(1 - Math.abs(st - .5) * 2) * (st < .75 ? 1 : 0);   // 坐：身体后倾
      const tilt = -26 * (st > .2 && st < .8 ? clamp(1 - Math.abs(st - .5) / .3) : 0);
      const head = [24, bodyY - 14 - 10 * val(e, "headUp", t) * .4 + (st < .2 ? 8 : 0)];
      return { st, legLen, bodyY, tilt, head, collar: [17, bodyY - 6], sitTilt };
    }
    function buildAnimal(e) {
      const R = G(host(e), { "data-cast": e.kind }), body = G(R), cat = e.type === "cat";
      const fur = cat ? "#cbd5e1" : "#e9b872", furD = cat ? "#94a3b8" : "#c98f45";
      const el = { R, body, fur, furD };
      el.shadow = mk("ellipse", { cx: 0, cy: 0, rx: 34, ry: 5, fill: INK, opacity: .12 }, R);
      el.tail = path(body, "", "none", 6, furD); el.tailO = null;
      el.legsB = [limb(body, furD), limb(body, furD)];
      el.torso = mk("ellipse", { rx: 27, ry: 13, fill: fur, stroke: INK, "stroke-width": 2.3 }, body);
      el.legsF = [limb(body, fur), limb(body, fur)];
      el.head = G(body);
      el.earB = path(el.head, cat ? "M-6,-8 L-2,-20 L4,-9 Z" : "M-4,-8 Q-12,-6 -10,8 Q-4,6 -1,-4 Z", furD, 1.8);
      el.skull = mk("circle", { cx: 0, cy: 0, r: 11, fill: fur, stroke: INK, "stroke-width": 2.3 }, el.head);
      el.snout = mk("ellipse", { cx: 11, cy: 3, rx: 7.5, ry: 5.5, fill: cat ? fur : "#f6d7a7", stroke: INK, "stroke-width": 2 }, el.head);
      el.nose = mk("ellipse", { cx: 17.5, cy: 1, rx: 2.6, ry: 2.1, fill: INK }, el.head);
      el.ear = path(el.head, cat ? "M-2,-9 L2,-21 L7,-8 Z" : "M-5,-9 Q-14,-8 -11,9 Q-5,7 -3,-3 Z", furD, 1.8);
      el.eye = mk("ellipse", { cx: 5, cy: -4, rx: 2.1, ry: 2.7, fill: INK }, el.head);
      el.tongue = path(el.head, "M10,7 Q12,15 15,8 Z", "#fb7185", 1.4);
      el.collar = path(body, "", "none", 4, "#e11d48");
      e.el = el;
    }
    function renderAnimal(e, t) {
      const el = e.el, A = animalGeo(e, t), f = val(e, "f", t), x = val(e, "x", t), s = e.base.s * val(e, "depth", t), fs = Math.abs(f) < .2 ? .2 * Math.sign(f || 1) : f;
      el.R.setAttribute("transform", `translate(${x.toFixed(2)},${e.base.y.toFixed(2)})`);
      el.body.setAttribute("transform", `scale(${(fs * s).toFixed(3)},${s.toFixed(3)})`);
      const wk = reduced ? 0 : val(e, "walk", t), ph = 2 * Math.PI * dist(e, t) / (46 * s), sw = Math.sin(ph) * 26 * Math.min(1.5, wk);
      const by = A.bodyY, lie = A.st < .2;
      el.torso.setAttribute("cx", 0); el.torso.setAttribute("cy", by.toFixed(2)); el.torso.setAttribute("transform", `rotate(${A.tilt.toFixed(1)} 0 ${by.toFixed(1)})`);
      const legPts = (hx, ang, len) => { const hip = [hx, by + 6], d = dirv(ang); return [hip, [hip[0] + d[0] * len * .55, hip[1] + d[1] * len * .55], [hip[0] + d[0] * len, hip[1] + d[1] * len]]; };
      const fl = lie ? 80 : 0, len = A.legLen + 6;
      const sitB = A.st > .2 && A.st < .8;
      setLimb(el.legsF[0], legPts(15, sw + fl, len)); setLimb(el.legsF[1], legPts(19, -sw + fl, len));
      setLimb(el.legsB[0], sitB ? [[-16, by + 4], [-4, by + 10], [-8, by + 16]] : legPts(-17, -sw * .9 - fl, len)); setLimb(el.legsB[1], sitB ? [[-12, by + 6], [0, by + 12], [-4, by + 17]] : legPts(-13, sw * .9 - fl, len));
      const wag = Math.sin(t * 2 * Math.PI * 3.2) * 22 * val(e, "wag", t);
      const tb = [-25, by - 4], ta = (-55 + wag) * D2R;
      el.tail.setAttribute("d", `M${tb[0]},${tb[1].toFixed(1)} q${(-10 + Math.sin(ta) * 4).toFixed(1)},${(-6 + Math.cos(ta) * -8).toFixed(1)} ${(-14 * Math.cos(ta * .6)).toFixed(1)},${(-20 * Math.cos(-ta)).toFixed(1)}`);
      const hb = Math.sin(ph * 2) * 1.5 * Math.min(1, wk);
      el.head.setAttribute("transform", `translate(${A.head[0]},${(A.head[1] + hb).toFixed(2)}) rotate(${(-12 * val(e, "headUp", t)).toFixed(1)})`);
      el.tongue.setAttribute("opacity", val(e, "mouth", t) > .5 ? 1 : 0);
      el.collar.setAttribute("d", `M${A.collar[0] - 4},${(A.collar[1] - 7).toFixed(1)} Q${A.collar[0] + 2},${(A.collar[1] + 2).toFixed(1)} ${A.collar[0] + 7},${(A.collar[1] - 3).toFixed(1)}`);
      el.shadow.setAttribute("rx", (34 * s).toFixed(1));
    }

    // ---- 门（正面，左边是合页）：门洞 + 门板转开（透视变窄 + 上下斜）----
    function buildDoor(e) {
      const R = G(host(e), { "data-cast": "door" }), b = e.base;
      const el = { R };
      el.hole = mk("path", { d: `M${b.x},${b.y} L${b.x},${b.y - b.h} L${b.x + b.w},${b.y - b.h} L${b.x + b.w},${b.y} Z`, fill: "#3f3a36", stroke: INK, "stroke-width": 2.4 }, R);
      el.light = mk("path", { d: `M${b.x + 6},${b.y} L${b.x + b.w * .45},${b.y - b.h + 10} L${b.x + b.w - 4},${b.y - b.h + 10} L${b.x + b.w - 4},${b.y} Z`, fill: "#fde68a", opacity: 0 }, R);
      el.panel = path(R, "", "#b07a4a", 2.4);
      el.knob = mk("circle", { r: 3.6, fill: "#facc15", stroke: INK, "stroke-width": 1.6 }, R);
      el.frame = path(R, `M${b.x - 5},${b.y} L${b.x - 5},${b.y - b.h - 5} L${b.x + b.w + 5},${b.y - b.h - 5} L${b.x + b.w + 5},${b.y}`, "none", 3);
      e.el = el;
    }
    function renderDoor(e, t) {
      const el = e.el, b = e.base, op = val(e, "open", t), ang = op * 78 * D2R, w = b.w * Math.cos(ang), sk = 12 * Math.sin(ang);
      const x = b.x, y = b.y, h = b.h;
      el.panel.setAttribute("d", `M${x},${y} L${x},${y - h} L${(x - w * .0 + (w)).toFixed(2)},${(y - h - sk).toFixed(2)} L${(x + w).toFixed(2)},${(y + sk * .6).toFixed(2)} Z`);
      el.knob.setAttribute("cx", (x + w * .82).toFixed(2)); el.knob.setAttribute("cy", (y - h * .48).toFixed(2));
      el.knob.setAttribute("opacity", w > 8 ? 1 : 0);
      el.light.setAttribute("opacity", (op * .55).toFixed(2));
    }

    // ---- 牵绳：两端挂点（挂钩 / 握持点 / 项圈），中间按绳长下垂 ----
    function buildLeash(e) { const R = G(host(e), { "data-cast": "leash" }); e.el = { R, rope: path(R, "", "none", 3.2, "#e11d48"), loop: path(R, "", "none", 3, "#e11d48"), clip: mk("circle", { r: 3.4, fill: "#facc15", stroke: INK, "stroke-width": 1.5 }, R) }; }
    function endPos(e, n, t) {
      const list = e.ends[n]; let cur = null, prev = null;
      for (const a of list) { if (a.t <= t) { prev = cur; cur = a; } }
      const P = a => (a.ent ? gripW(a.ent, t, a.at) : a.dangleFromA ? (() => { const A = endPos(e, "A", t); return [A[0] + 4, A[1] + Math.min(val(e, "len", t) * .45, 46)]; })() : a.at.slice());
      const p1 = P(cur);
      if (prev && t - cur.t < .25) { const p0 = P(prev), q = eio((t - cur.t) / .25); return [lerp(p0[0], p1[0], q), lerp(p0[1], p1[1], q), cur]; }
      return [p1[0], p1[1], cur];
    }
    function renderLeash(e, t) {
      const el = e.el, len = val(e, "len", t);
      let [ax, ay, ca] = endPos(e, "A", t), [bx, by, cb] = endPos(e, "B", t);
      const d = Math.hypot(bx - ax, by - ay), sag = Math.max(3, .55 * Math.sqrt(Math.max(0, len * len - d * d)));
      const mx = (ax + bx) / 2, my = (ay + by) / 2 + sag;
      el.rope.setAttribute("d", `M${ax.toFixed(1)},${ay.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`);
      el.loop.setAttribute("d", `M${ax.toFixed(1)},${ay.toFixed(1)} q-6,10 0,16 q6,-6 0,-16`);
      el.clip.setAttribute("cx", bx.toFixed(1)); el.clip.setAttribute("cy", by.toFixed(1));
    }

    const BUILD = { human: buildHuman, dog: buildAnimal, cat: buildAnimal, door: buildDoor, leash: buildLeash };
    const RENDER = { human: renderHuman, dog: renderAnimal, cat: renderAnimal, door: renderDoor, leash: renderLeash };
    S.cast.forEach(e => (BUILD[e.type] || (() => {}))(e));
    function render(t) {
      for (const e of S.cast) {
        if (!e.el) continue;
        let op = val(e, "op", t);
        if (t < e.showAt) op = 0; else if (e.showAt > 0) op *= eio((t - e.showAt) / .3);
        e.el.R.setAttribute("opacity", op.toFixed(3));
        if (op < .01) { e.el.R.style.display = "none"; continue; }
        e.el.R.style.display = "";
        RENDER[e.type](e, t);
      }
    }
    return { render, gripW, val };
  }
  return { kit, mount, VERB_TABLE, PHASES, VERBS, SCENES, LOOK };
})();
