// ==================== 单词身世 · 溯源幕 ①：port 港口（经典版，升级前，已补齐 R2）====================
// 保留备查 / 回退用（R1 零丢失）：v2 样板幕见 wo_port.js。不进 App（insert_wb.py 的 WO_READY 不登记）。
// 预览：preview.html?tab=wo_port_classic
WB_LAB.wo_port_classic = [
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO;
      N("", "这一幕：一个小小的 port（港口），怎么长出一整家单词？");
      D.scene({ title: "port 港口", sub: "单词身世 · 欧洲文化密码", badges: ["📜", "💡"] });
      N("可信度徽章：", "📜 = 查得到出处的真实词源；💡 = 帮你记的联想画面，不是历史。");
      k.wait(.6);

      // ───── 镜头 1 · 地图：陆地中间的海 ─────
      D.step(0); D.shot();
      N("地图：", "这是欧洲、非洲、亚洲三块大陆，中间围着一片海。");
      const mp = D.map({ x: 40, y: 100, w: 550, h: 275 });
      T("欧洲", ...mp.pt(-1, 45.6), go(.4), .4, { size: 18, color: C.brown, weight: 900 });
      T("非洲", ...mp.pt(-2, 31), go(.4), .4, { size: 18, color: C.brown, weight: 900 });
      T("亚洲", ...mp.pt(36, 38.6), go(.4), .4, { size: 18, color: C.brown, weight: 900 });
      T("地中海", ...mp.pt(15.5, 34.6), go(.6), .6, { size: 20, color: C.blue, weight: 900, anchor: "middle" });
      N("", "三块大陆一起往中间靠：这片海被陆地包在中间。");
      const tm = go(1.4);
      k.move(mp.eu, tm, .8, 0, 10); k.move(mp.af, tm, .8, 0, -10); k.move(mp.as, tm, .8, -10, 0);
      k.move(mp.eu, tm + 1.4, .6, 0, -10); k.move(mp.af, tm + 1.4, .6, 0, 10); k.move(mp.as, tm + 1.4, .6, 10, 0);
      N("罗马：", "罗马城就在地中海边，罗马人靠船把四周连在一起。");
      mp.dot(12.5, 41.9, "罗马 Rome", { dx: 8, dy: -8 });
      k.say("Rome is an old city in Italy.", { zh: "罗马是意大利的一座古城。", word: "Rome" });
      T("Mediterranean", 615, 132, go(1), 1, { size: 21, color: C.ink, weight: 900, font: M });
      k.egg(615 + 13 * 21 * .6 + 14, 125, { word: "Mediterranean" });
      N("拆开看：", "Mediterranean = medi（中间）+ terra（陆地）。");
      const sn = D.snap("medi", "terra", 615 + D.chipW("medi"), 160, { color: C.purple, rootColor: C.brown, from: [0, 60] });
      T("中间", sn.x0 + D.chipW("medi") / 2, 220, go(.4), .4, { size: 16, color: C.purple, weight: 900, anchor: "middle" });
      T("陆地", sn.x0 + D.chipW("medi") + D.chipW("terra") / 2, 220, go(.4), .4, { size: 16, color: C.brown, weight: 900, anchor: "middle" });
      T("= 陆地中间的海", 615, 262, go(.9), .9, { size: 22, color: C.green, weight: 900 });
      k.badge("📜", 615, 298);
      k.egg(622, 332, { note: true });
      k.say("Medi means middle, and terra means land.", { zh: "medi 是「中间」，terra 是「陆地」。", word: "medi terra", blocks: ["medi", "terra"] });
      k.say("The Mediterranean Sea is in the middle of the land.", { zh: "地中海在陆地的中间。", word: "Mediterranean", egg: ["Mediterranean"], blocks: ["medi", "terra"] });
      N("", "四周都是陆地，船从哪儿都能到 → 港口就特别重要。");
      T("四周都是陆地 → 船来船往 → 港口最重要", 40, 420, go(1.4), 1.4, { size: 20, color: C.orange, weight: 900 });
      k.wait(1.2);
      D.wipe();

      // ───── 镜头 2 · 进港：顺风 = 机会 ─────
      D.step(1); D.shot();
      N("场景：", "一艘罗马商船在海上，岸边是港口小城。");
      // 岸 + 小城 + 码头
      const shore = "M640,250 Q628,320 650,430 L948,430 L948,250 Z";
      P(shore, go(.8), .8, { color: C.brown, w: 2.5 }); F(shore, go(.2, 0), { color: "#fdf6e3", op: 1 });
      D.city(700, 300, 200, "港口小城");
      D.pier(560, 340, 100);
      P(k.wave(40, 620, 348, 3) + " " + k.wave(60, 600, 380, 3) + " " + k.wave(40, 620, 412, 3), go(.8), .8, { color: "#7dd3fc", w: 2 });
      k.chip("port", 572, 186, null, { size: 22, color: C.blue });
      T("港口", 572 + D.chipW("port", 22) / 2, 240, go(.4), .4, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      const boat = D.boat(110, 345, .9);
      const wind = D.wind(20, 300, 70);
      N("风：", "顺风从后面推着船，一路把船吹进港口。");
      const tb = go(3.4);
      k.path(boat, tb, 3.2, [[180, -8], [330, 0], [395, -4]]);
      k.path(wind, tb, 3.2, [[180, -8], [330, 0], [380, -4]]); k.fade(wind, tb + 2.8, .5, 0);
      k.say("The wind takes the ship into the port.", { zh: "风把船送进港口。", word: "port" });
      N("机会：", "拉丁语 ob portum = 「朝着港口（吹）」——顺风进港，就是好时机。");
      const s2 = D.snap("ob", "port", 60 + D.chipW("ob"), 112, { from: [-10, 60] });
      T("= opportunity", s2.end + 12, 136, go(.9), .9, { size: 22, color: C.green, weight: 900, font: M });
      k.egg(s2.end + 12 + 13 * 22 * .6 + 14, 128, { word: "opportunity" });
      T("原来指「朝着港口吹的顺风」→ 好时机、机会", 60, 180, go(1.4), 1.4, { size: 18, color: C.ink, weight: 700 });
      k.badge("📜", 60, 214);
      k.say("Ob portum means toward the port.", { zh: "ob portum（拉丁语）= 朝着港口。", word: "ob portum", blocks: ["ob"] });
      k.say("This is a good opportunity.", { zh: "这是一个好机会。", word: "opportunity", egg: ["opportunity"] });
      k.wait(.8);
      D.wipe();

      // ───── 镜头 3 · 搬运：方向前缀 + port = 一家人 ─────
      D.step(2); D.shot();
      N("搬运：", "港口天天在搬货。拉丁语 portare = 搬运，和 portus（港口）是亲戚。");
      D.city(50, 240, 150, "城里");
      P(k.wl(215, 245, 940, 245, 1), go(.6), .6, { color: "#7dd3fc", w: 2.5 });
      P(k.wave(230, 930, 262, 3), go(.5), .5, { color: "#7dd3fc", w: 2 });
      const ship3 = D.boat(470, 238, .85);
      void ship3;
      P(`M820,240 L820,190 L850,175 L880,190 L880,240`, go(.5), .5, { color: C.blue, w: 2.2 });
      T("别的港口", 850, 160, go(.4), .4, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      T("拉丁语 portare = 搬运", 50, 296, go(.9), .9, { size: 18, color: C.blue, weight: 900 });
      k.badge("📜", 260, 296);
      k.say("Portus means port, and portare means carry.", { zh: "portus = 港口，portare = 搬运（拉丁语）。", word: "portus portare" });
      const col = [50, 500], row = [314, 386], rootX = i => col[i % 2] + 90;   // 词根块在每一列对齐不动
      // ① im：货箱从船上进城
      N("im- 进：", "货箱从船上搬进城里 → import（进口）。");
      const c1 = D.crate(450, 222);
      k.path(c1, go(1.8), 1.7, [[-60, -40], [-200, -40], [-250, -2]]);
      k.fade(c1, go(.4), .4, 0);
      const w1 = D.snap("im", "port", rootX(0), row[0], { from: [-40, -70] });
      T("= import 进口", w1.end + 10, row[0] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      k.say("Import means to carry things in.", { zh: "import = 把东西搬进来。", word: "im", blocks: ["im"] });
      // ② ex：货箱从城里搬出上船
      N("ex- 出：", "货箱从城里搬出去、装上船 → export（出口）。");
      const c2 = D.crate(205, 222);
      k.path(c2, go(1.8), 1.7, [[50, -40], [190, -40], [240, -2]]);
      k.fade(c2, go(.4), .4, 0);
      const w2 = D.snap("ex", "port", rootX(1), row[0], { from: [-40, -70] });
      T("= export 出口", w2.end + 10, row[0] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      k.say("Export means to carry things out.", { zh: "export = 把东西搬出去。", word: "ex", blocks: ["ex"] });
      k.say("We import fruit and export tea.", { zh: "我们进口水果，出口茶叶。", word: "import export" });
      // ③ trans：船把货运到对岸别的港口
      N("trans- 穿过：", "船穿过大海，把货运到别的港口 → transport（运输）。");
      const c3 = D.crate(470, 222);
      k.path(c3, go(2), 1.9, [[150, -30], [370, -2]]);
      const w3 = D.snap("trans", "port", rootX(0), row[1], { from: [-40, -70] });
      T("= transport 运输", w3.end + 10, row[1] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      k.say("Transport means to carry things across.", { zh: "transport = 把东西运过去。", word: "trans", blocks: ["trans"] });
      // ④ re：消息被带回城里
      N("re- 回：", "别的港口发生了什么？把消息带回城里 → report（报告）。");
      const sc = D.scroll(850, 205);
      k.path(sc, go(2.2), 2.1, [[-300, -70], [-600, -60], [-725, 15]]);
      const w4 = D.snap("re", "port", rootX(1), row[1], { from: [-40, -70] });
      T("= report 报告", w4.end + 10, row[1] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      k.say("Report means to carry news back.", { zh: "report = 把消息带回来。", word: "re", blocks: ["re"] });
      k.say("Ships transport food across the sea.", { zh: "船把食物运过大海。", word: "transport" });
      k.say("He reports the news to the city.", { zh: "他把消息报告给城里。", word: "report" });
      N("", "词根 port 一直不变，变的只是前面表示方向的小块。");
      T("词根不变，方向前缀一换，就是一个新词", 50, 470, go(1.4), 1.4, { size: 20, color: C.orange, weight: 900 });
      k.wait(1);
      D.wipe();

      // ───── 镜头 4 · 港口关卡：盖章 = passport ─────
      D.step(2); D.shot();
      N("关卡：", "旅客要从港口出入国境，得先拿文书给守卫看、盖个章。");
      P(k.wl(40, 340, 940, 340, 1), go(.6), .6, { color: C.ink, w: 2.5 });
      const arch = "M600,340 L600,170 Q680,110 760,170 L760,340 M626,340 L626,184 Q680,140 734,184 L734,340";
      P(arch, go(1), 1, { color: C.brown, w: 3 });
      T("港口关卡", 680, 128, go(.5), .5, { size: 17, color: C.brown, weight: 900, anchor: "middle" });
      P(k.wave(780, 940, 300, 3) + " " + k.wave(790, 930, 322, 3), go(.5), .5, { color: "#7dd3fc", w: 2 });
      const pp = D.person(420, 338);
      const doc = D.sub();
      P(k.roughRect(452, 250, 64, 46), go(.4), .4, { color: C.ink, w: 2 }); F(k.rectD(452, 250, 64, 46), go(.1, 0), { color: "#fff", op: 1 });
      P(`M460,262 h40 M460,272 h30`, go(.2), .2, { color: C.grey, w: 1.5 });
      D.back();
      N("盖章：", "啪！章盖上了：可以通过港口了。");
      D.stamp(488, 284, "OK", { into: doc });
      k.say("OK! You can pass now.", { zh: "好了！你现在可以通过了。", word: "OK pass" });
      const tw = go(2);
      k.move(pp, tw, 1.8, 260, 0); k.move(doc, tw, 1.8, 260, 0);
      N("pass + port：", "pass（通过）+ port（港口）= 通过港口的许可 → passport（护照）。");
      const s4 = D.snap("pass", "port", 60 + D.chipW("pass"), 384, { from: [-20, -60] });
      T("= passport 护照", s4.end + 12, 408, go(.9), .9, { size: 22, color: C.green, weight: 900 });
      T("通过港口、出入国境的许可", 60, 458, go(1), 1, { size: 18, color: C.ink, weight: 700 });
      k.badge("📜", 300, 458);
      k.say("Show me your passport, please.", { zh: "请出示你的护照。", word: "passport" });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 5 · 穿越到今天：港口 → 机场 ─────
      D.step(3); D.shot();
      k.camera(go(.01, 0), .01, 480, 285, 1.5);
      N("穿越：", "镜头拉近：古代的海港，一艘帆船靠岸。");
      const seaL = D.sub();
      T("古代：港口", 480, 160, go(.6), .6, { size: 20, color: C.brown, weight: 900, anchor: "middle" });
      P(k.wave(250, 720, 300, 3) + " " + k.wave(260, 700, 322, 3), go(.6), .6, { color: "#7dd3fc", w: 2 });
      D.back();
      const oldShip = D.boat(420, 290, 1);
      const oldPier = D.pier(560, 300, 110);
      const plane = D.plane(420, 250, 1); k.hide(plane);
      const twr = D.tower(610, 300); k.hide(twr);
      const nowL = D.sub(); T("今天：机场", 480, 160, go(.01, 0), .01, { size: 20, color: C.blue, weight: 900, anchor: "middle" }); D.back(); k.hide(nowL);
      N("变身：", "帆船变成飞机，海港变成机场：古今是同一个道理。");
      const tm5 = D.morph(oldShip, plane, 1.2);
      k.fade(oldPier, tm5 + .4, 1.2, 0); k.fade(seaL, tm5 + .4, 1.2, 0); k.fade(twr, tm5 + .4, 1.2, 1); k.fade(nowL, tm5 + .8, .6, 1);
      k.move(plane, tm5 + 1.8, 1.6, 40, -40);
      k.wait(1.2);
      k.camera(go(1.8), 1.8, 480, 272, 1);
      N("air + port：", "air（空中）+ port（港口）= 空中的港口 → airport（机场）。");
      const s5 = D.snap("air", "port", 60 + D.chipW("air"), 440, { from: [-20, -60] });
      T("= airport 机场（空中的港口）", s5.end + 12, 464, go(1.2), 1.2, { size: 21, color: C.green, weight: 900 });
      k.badge("📜", 478, 464);
      k.say("Birds fly in the air.", { zh: "鸟儿在空中飞。", word: "air" });
      k.say("We take a plane at the airport.", { zh: "我们在机场坐飞机。", word: "airport" });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 6 · 定格总结图 + 中文对照 ─────
      D.step(4);
      N("总结：", "港口是罗马世界的大门；一个 port 长出了进、出、穿越、带回、机会。");
      k.chip("port", 439, 98, null, { size: 26, color: C.blue });
      P(`M445,128 Q330,140 250,160 M515,128 Q630,140 710,160`, go(.6), .6, { color: C.grey, w: 2 });
      // 左：港口线
      P(k.roughRect(30, 162, 430, 160), go(.6), .6, { color: C.brown, w: 2 });
      T("港口线：portus（港口）", 46, 192, go(.8), .8, { size: 19, color: C.brown, weight: 900 });
      k.badge("📜", 300, 192);
      T("port 港口 · airport 机场", 46, 236, go(.8), .8, { size: 19, color: C.ink, weight: 900 });
      T("passport 护照", 46, 276, go(.6), .6, { size: 19, color: C.ink, weight: 900 });
      T("opportunity 机会", 46, 310, go(.6), .6, { size: 19, color: C.ink, weight: 900 });
      k.egg(196, 303, { word: "opportunity" });
      // 右：搬运线
      P(k.roughRect(500, 162, 430, 160), go(.6), .6, { color: C.blue, w: 2 });
      T("搬运线：portare（搬运）", 516, 192, go(.8), .8, { size: 19, color: C.blue, weight: 900 });
      k.badge("📜", 776, 192);
      T("import 进口 · export 出口", 516, 236, go(.8), .8, { size: 19, color: C.ink, weight: 900 });
      T("transport 运输 · report 报告", 516, 276, go(.8), .8, { size: 19, color: C.ink, weight: 900 });
      const quiz = D.sub(); T("sup + port = ？（考考你）", 516, 310, go(.6), .6, { size: 19, color: C.grey, weight: 900 }); D.back();
      N("亲戚词：", "portus 和 portare 是同一个古老词根长出的亲戚，不是同一个词。");
      k.badge("💡", 30, 360);
      T("两条线是亲戚（同一个古老词根），不是同一个词；动画用港口场景把它们串起来记", 124, 360, go(1.6), 1.6, { size: 16, color: C.ink, weight: 700 });
      N("中文对照：", "中文也用一个「口」字串起来：港口、进口、出口、口岸。");
      T("🀄 中文也用一个「口」串起来：港口 · 进口 · 出口 · 口岸", 30, 404, go(1.6), 1.6, { size: 19, color: C.purple, weight: 900 });
      T("（这是对照，不是同源）", 520, 404, go(.6), .6, { size: 14, color: C.grey });
      k.say("A port is a door to the world.", { zh: "港口是通向世界的大门。", word: "port" });
      k.wait(.6);

      // ───── 镜头 7 · 预测：sup + port = ? ─────
      D.step(5);
      N("预测：", "考考你：sup（从下面）+ port（扛、搬）= ？先想 3 秒！");
      P(k.roughRect(16, 438, 928, 92), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 438, 928, 92), go(.2, 0), { color: "#ecfdf5", op: .9 });
      T("🔮 sup（从下面）+ port（扛、搬）=", 36, 474, go(1.4), 1.4, { size: 21, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 392, 476, go(.3), .3, { size: 30, color: C.red, weight: 900 }); D.back();
      D.hold(3);
      N("揭晓：", "support = 从下面把东西托住 → 支持。");
      k.fade(qm, go(.3), .3, 0);
      T("support 支持", 392, 476, go(.9), .9, { size: 24, color: C.green, weight: 900, font: M });
      k.fade(quiz, go(.3), .3, 0);
      T("sup + port = support 支持 ✔", 516, 310, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      T("从下面托住 → 支持、帮助", 36, 514, go(1), 1, { size: 17, color: C.grey, weight: 700 });
      k.badge("📜", 250, 514);
      // 小图：手从下面托住箱子
      const bx = D.crate(780, 470, C.brown);
      P(`M752,506 L808,506 M762,506 L766,488 M798,506 L794,488`, go(.4), .4, { color: C.purple, w: 3 });
      P(`M720,520 L720,486 M714,494 L720,484 L726,494`, go(.3), .3, { color: C.green, w: 2.5 });
      k.move(bx, go(.8), .6, 0, -6);
      // 把总结图里的「？」也换成答案
      k.say("Support means to hold something up from below.", { zh: "support = 从下面把东西托住。", word: "sup", blocks: ["sup"] });
      k.say("My friends support me.", { zh: "我的朋友们支持我。", word: "support" });
      N("口诀：", "港口一扇门，进出穿回都靠 port；sup 托住就是 support！");
      D.hold(2.5);
      D.finish(.42);
    },
    terms: [
      ["词源", "一个词是从哪里来的、原来是什么意思（单词的「身世」）。"],
      ["词根", "单词里表示核心意思、不变的那一块，比如 port。"],
      ["前缀", "加在词根前面、改变意思的小块：im-（进）、ex-（出）、trans-（穿过）、re-（回）、sup-（从下面）。"],
      ["拉丁语", "古罗马人说的话。很多英语单词是从拉丁语借来的。"],
      ["亲戚词（同源词）", "从同一个古老词根长出来的不同的词，像一家人；但不是同一个词。portus 港口和 portare 搬运就是亲戚。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 · ✂️ 简化说法 · ⚠️ 有例外或流行错误说法 · ❓ 有争议。"],
      ["🥚 彩蛋词", "超出小学课标的词，知道就好，不用背。"],
      ["地中海", "被欧洲、非洲、亚洲三块大陆围在中间的海。Mediterranean = medi（中间）+ terra（陆地）。"],
    ],
  },
];
