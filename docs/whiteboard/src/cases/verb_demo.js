// ==================== 白板脚本：动作系统 v2 样板（决策 30 D6）——He takes the dog out. ====================
// 对照用户参考插画（男孩牵狗走出家门：左边房子 + 虚线框「家里」，男孩牵绳在后、小狗在前，箭头 OUT「带出门」）。
// 演员和动作全部来自 wb_verbs.js：boy（骨架 v2：手掌 + 握持点、转身经过正面）、dog（走 / 趴 / 站 / 摇尾巴）、door（开门）、leash（挂钩 → 手 → 项圈）。
// 主动词 take … out 用专属动作 take（拿牵绳）+ clip（扣项圈）+ take_out（牵着狗往外走，狗在前面跟着）演出，和朗读同步。
WB_LAB.verb_demo = (function () {
  return [{
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, MONO = D.MONO;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这节课只演一个短语：take out，带……出去。看男孩怎么带小狗出门！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "take out", sub: "动作样板 · 带……出去", badges: ["💡"], steps: ["① 出门", "② 拿牵绳", "③ 带出去", "④ 连读"], cardDur: 3.6 });

      // ───── 场景：院子 + 房子 + 家里虚线框 ─────
      D.step(0); D.shot();
      const GY = 470;
      k.scenery("yard", { ground: GY, x0: 16, x1: 800 });
      const H = k.scenery("house", { x: 40, ground: GY, w: 240, wallH: 150, doorW: 64, doorH: 118, doorAt: 60 });
      // 家里：虚线框 + 标签
      P(`M22,${H.roofTop - 14} L352,${H.roofTop - 14} L352,${GY + 4} L22,${GY + 4} Z`, go(.8), .8, { color: C.blue, w: 2.4, dash: "9 7" });
      T("家里", 160, H.roofTop - 22, go(.4), .4, { size: 20, color: C.blue, weight: 900, anchor: "middle" });
      // 挂钩（门右边的墙上）+ 门垫
      const HX = H.doorX + H.doorW + 44, HY = 344;
      P(`M${HX},${HY - 8} L${HX},${HY} q0,6 6,4`, go(.3), .3, { color: C.ink, w: 2.6 });
      P(`M${H.doorX + H.doorW + 50},${GY} l96,0 l-6,-6 l-84,0 Z`, go(.3), .3, { color: C.ink, w: 1.8 });
      const g = D.sub();
      const door = k.cast("door", { x: H.doorX, y: GY, w: H.doorW, h: H.doorH, g });
      const leash = k.cast("leash", { len: 175, A: { at: [HX + 3, HY + 3] }, B: { dangleFromA: true }, g });
      const dog = k.cast("dog", { x: H.doorX + H.doorW + 112, y: GY, s: 1.55, f: -1, pose: "lie", g });
      const boy = k.cast("boy", { x: H.doorX + H.doorW / 2, y: GY, s: 1.7, f: 1, depth: .52, hidden: true, g });
      D.back();
      k.wait(.6);

      // ① 出门：门打开，男孩从门里走出来
      N("出门前：", "门开了，男孩从家里走出来。小狗趴在门口的垫子上。");
      const t1 = S.at;
      k.verb(door, "open", t1, 1);
      k.showCast(boy, t1 + .6);
      k.verb(boy, "walk", t1 + .8, 1.4, { to: HX - 62 }); k.to(boy, t1 + .8, 1.2, { depth: 1 });
      k.act(me, "point", t1 + .2, 1.4, { at: [H.doorX + 30, GY - 70] });
      k.wait(2.4);

      // ② 拿牵绳：伸手 → 抓住 → 收回
      D.step(1);
      N("take：", "拿。男孩伸手，从挂钩上拿下红色的牵绳。");
      const syT = sayAt("Take. He takes the leash.", { zh: "拿。他拿起牵绳。", word: "take" });
      k.verb(boy, "take", syT.t + syT.wd * .2, Math.max(1.6, syT.dur * .8), { obj: leash, end: "A", words: ["take", "takes"] });
      k.wait(.4);
      N("扣上：", "他弯下腰，把牵绳扣在小狗的项圈上。小狗站起来，开心地摇尾巴。");
      const t2 = S.at;
      k.verb(boy, "walk", t2, .8, { to: dog.base.x - 84 });
      k.verb(boy, "clip", t2 + .8, 2.2, { obj: leash, end: "B", to: dog });
      k.verb(dog, "stand", t2 + 2.0, .6);
      k.to(dog, t2 + 2.4, .25, { f: 1 }, "step");
      k.wait(3.6);

      // ③ 带出去：男孩牵绳在后，小狗在前，一起走出「家里」
      D.step(2);
      N("take out：", "带……出去。男孩牵着小狗，走出家门，到外面去散步。");
      // 箭头 OUT：从家里虚线框指向外面
      k.arrow(362, 270, 600, 270, C.blue, "", 0, 0);
      T("OUT", 614, 280, go(.5), .5, { size: 30, color: C.blue, weight: 900, font: MONO });
      T("带出门", 618, 308, go(.4), .4, { size: 17, color: C.blue, weight: 900 });
      const syO = sayAt("He takes the dog out.", { zh: "他带小狗出去散步。", word: "take out out" });
      k.verb(boy, "take_out", syO.t, Math.max(4.2, syO.dur + 1.6), { obj: dog, to: 450, ahead: 175, words: ["out", "take out"] });
      k.act(me, "point", syO.t + .5, 1.6, { at: [600, 330] });
      k.wait(1.4);

      // ④ 连读：结论框
      D.step(3);
      N("", "连起来读：He takes the dog out. 他带小狗出去散步。");
      const en = "He takes the dog out.";
      P(k.roughRect(16, 500, 520, 44), go(.8), .8, { color: C.green, w: 2 });
      F(k.rectD(16, 500, 520, 44), go(.2, 0), { color: C.tintGreen, op: .55 });
      T(en, 36, 530, go(1.2), 1.2, { size: 22, color: C.green, weight: 900, font: MONO });
      T("他带小狗出去散步。", 330, 530, go(.8), .8, { size: 16, color: C.grey });
      const syF = sayAt(en, { zh: "他带小狗出去散步。", word: "he takes the dog take out" });
      k.act(me, "cheer", syF.t + syF.dur * .6, 1.3);
      k.wait(1);
      D.hold(1.5);
      D.finish(.6);
    },
    actionWords: [{ word: "take", act: "take" }, { word: "takes", act: "take" }, { word: "take out", act: "take_out" }, { word: "out", act: "take_out" }],
    r4v2: true,   // 按 R4v2 验收（决策 30）
    terms: [
      ["可信度徽章", "💡 男孩、小狗、门、牵绳都是帮助理解的画面；take out 的核心意思就是「把……带到外面去」。"],
      ["take out", "带……出去、拿出去。He takes the dog out. = 他带小狗出去（散步）。"],
      ["take", "拿、带。take the leash = 拿起牵绳。"],
      ["out", "出去、在外面。和 in（在里面）相反。"]
    ]
  }];
})();
