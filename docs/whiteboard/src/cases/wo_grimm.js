// ==================== 单词身世 · 格林定律章 ①：真格林定律（v2，对齐 port 样板幕）====================
// 设计：docs/whiteboard/grimm_law/DESIGN.md；分镜：grimm_law/GRIMM_STORYBOARD.md；出处：word_origins/SOURCES.md「溯源幕 ④」。
// 一句话洞见：英语的祖先把一排辅音整体「挪了一格」（p→f、t→th、d→t、k→h），拉丁语没挪——所以认识 foot，就能猜出 pedal。
// 严谨：每个配对都在 SOURCES ④ 有出处（📜）；「不是 100% 整齐」标 ⚠️；中文「足 / 脚」两套字只是对照（💡）。
// 下一幕：元音变异（wo_vowel_a）——foot→feet 是元音变，不是格林定律。
WB_LAB.wo_grimm = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const grp = () => { const g = D.sub(); D.back(); return g; };
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const mw = (txt, fs) => txt.length * fs * .6;
      let w0, wd;
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：为什么认识 foot（脚），就能猜出 pedal（脚踏板）？秘密叫「格林定律」。");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "格林定律：辅音挪一格", sub: "单词身世 · 格林定律", badges: ["📜", "⚠️", "💡"] });
      N("可信度徽章：", "📜 = 查得到出处；⚠️ = 有例外；💡 = 中文对照，不是词源。");
      k.wait(.6);

      // ───── 镜头 1 · 地图：一个老祖宗，分成两家 ─────
      D.step(0); D.shot();
      N("老祖宗：", "很久很久以前，欧洲很多语言是一家人，有同一个老祖宗（原始印欧语）。");
      P(k.roughRect(300, 96, 240, 54), go(.6), .6, { color: C.ink, w: 2.4 }); F(k.rectD(300, 96, 240, 54), go(.1, 0), { color: C.tintInk, op: 1 });
      T("老祖宗（原始印欧语）", 420, 130, go(.8), .8, { size: 18, color: C.ink, weight: 900, anchor: "middle" });
      k.badge("📜", 552, 126);
      P("M380,152 Q300,190 210,226", go(.6), .6, { color: C.ink, w: 2.4 });
      P("M460,152 Q540,190 630,226", go(.6), .6, { color: C.ink, w: 2.4 });
      P(k.roughRect(60, 230, 300, 120), go(.6), .6, { color: C.blue, w: 2.4 }); F(k.rectD(60, 230, 300, 120), go(.1, 0), { color: C.tintBlue, op: 1 });
      T("拉丁语、希腊语（南边）", 210, 266, go(.8), .8, { size: 18, color: C.blue, weight: 900, anchor: "middle" });
      T("辅音没变，还是老样子", 210, 300, go(.7), .7, { size: 16, color: C.ink, weight: 700, anchor: "middle" });
      T("p · t · d · k", 210, 334, go(.6), .6, { size: 22, color: C.blue, weight: 900, anchor: "middle", font: M });
      P(k.roughRect(480, 230, 300, 120), go(.6), .6, { color: C.green, w: 2.4 }); F(k.rectD(480, 230, 300, 120), go(.1, 0), { color: C.tintGreen, op: 1 });
      T("日耳曼语（北边，英语的祖先）", 630, 266, go(.9), .9, { size: 17, color: C.green, weight: 900, anchor: "middle" });
      T("辅音整排「挪了一格」", 630, 300, go(.7), .7, { size: 16, color: C.ink, weight: 700, anchor: "middle" });
      T("f · th · t · h", 630, 334, go(.6), .6, { size: 22, color: C.green, weight: 900, anchor: "middle", font: M });
      k.act(me, "point", S.at - 1.2, 1.6, { at: [630, 300] });
      N("什么时候：", "大约三千年前（公元前一千年左右），北边这一支的辅音整排换了位置。");
      T("大约三千年前（公元前一千年左右）", 420, 396, go(1.2), 1.2, { size: 18, color: C.grey, weight: 700, anchor: "middle" });
      k.badge("📜", 420 + k.estW("大约三千年前（公元前一千年左右）", 18) / 2 + 10, 392);
      N("借词：", "后来英语又从拉丁语借了很多「大词」——借来的词还是老辅音！");
      k.hlText("小词 = 英语自己的（变了）· 大词 = 借来的（没变）", 70, 452, 20);
      T("小词 = 英语自己的（变了）· 大词 = 借来的（没变）", 70, 452, go(1.4), 1.4, { size: 20, color: C.ink, weight: 900 });
      k.act(me, "nod", S.at - .4, .8);
      k.wait(.8);
      D.wipe();

      // ───── 镜头 2 · 时光机：p 进去，f 出来（foot ↔ pedal）─────
      D.step(1); D.shot();
      N("时光机：", "把拉丁语的 pes（脚）放进时光机：p 进去，出来变成 f——就是 foot！");
      const mx = 330, my = 150;
      P(k.roughRect(mx, my, 200, 140), go(.7), .7, { color: C.ink, w: 2.6 }); F(k.rectD(mx, my, 200, 140), go(.1, 0), { color: C.tintInk, op: 1 });
      T("⚙ 时光机 ⚙", mx + 100, my + 34, go(.5), .5, { size: 18, color: C.ink, weight: 900, anchor: "middle" });
      T("三千年", mx + 100, my + 64, go(.4), .4, { size: 15, color: C.grey, weight: 700, anchor: "middle" });
      [0, 1, 2].forEach(i => P(k.ellipse(mx + 60 + i * 40, my + 104, 14, 14), go(.2), .2, { color: C.ink, w: 2 }));
      T("拉丁语", 110, 140, go(.4), .4, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      T("pes", 110, 220, go(.6), .6, { size: 40, color: C.blue, weight: 900, font: M, anchor: "middle" });
      T("（脚）", 110, 254, go(.3), .3, { size: 15, color: C.grey, anchor: "middle" });
      const syPes = sayAt("Pes means foot.", { zh: "pes 的意思是脚。", word: "pes" });
      const gP = D.sub(); T("p", 60, 220, go(.3), .3, { size: 40, color: C.red, weight: 900, font: M }); D.back();
      [w0, wd] = [S.at, 1.6];
      k.move(gP, w0, 1.2, mx + 70 - 60, -10, { ease: "move" }); k.fade(gP, w0 + 1, .3, 0);
      const gF = D.sub(); T("f", mx + 120, 210, go(.01, 0), .01, { size: 40, color: C.green, weight: 900, font: M }); D.back(); k.hide(gF);
      k.fade(gF, w0 + 1.3, .2, 1); k.move(gF, w0 + 1.4, 1.2, 640 - mx - 120, 10, { ease: "move" }); k.fade(gF, w0 + 2.6, .2, 0);
      k.sfx("pop", w0 + 1.3);
      k.wait(2.8);
      T("英语", 700, 140, go(.4), .4, { size: 15, color: C.green, weight: 900, anchor: "middle" });
      k.hlText("foot", 700 - mw("foot", 40) / 2, 220, 40, { mono: true, color: C.hlGreen });
      T("foot", 700, 220, go(.6), .6, { size: 40, color: C.green, weight: 900, font: M, anchor: "middle" });
      T("（脚）", 700, 254, go(.3), .3, { size: 15, color: C.grey, anchor: "middle" });
      k.badge("📜", 760, 190);
      // 小人走两步：walk 和朗读同步
      const syW = sayAt("We walk on our feet.", { zh: "我们用脚走路。", word: "foot" });
      [w0, wd] = win(syW);
      k.act(me, "walk", w0, wd, { to: 830, words: ["walk"] });
      N("借来的大词：", "英语从拉丁语借来 pedal（脚踏板），借来的词没进时光机——还是 p！");
      T("pedal", 110, 360, go(.6), .6, { size: 34, color: C.blue, weight: 900, font: M, anchor: "middle" });
      k.egg(110 + mw("pedal", 34) / 2 + 8, 350, { word: "pedal" });
      T("脚踏板（借来的，没变）", 110, 394, go(.7), .7, { size: 15, color: C.grey, weight: 700, anchor: "middle" });
      // 自行车踏板小图
      const bx = 250, by = 452;
      P(k.ellipse(bx, by, 26, 26), go(.4), .4, { color: C.ink, w: 2.4 });
      P(`M${bx},${by} L${bx + 22},${by - 18} M${bx + 12},${by - 24} L${bx + 34},${by - 12}`, go(.3), .3, { color: C.ink, w: 3 });
      sayAt("My bike has two pedals.", { zh: "我的自行车有两个踏板。", word: "pedal", egg: ["pedals"] });
      P("M200,352 Q440,420 690,262", go(.8), .8, { color: C.blue, w: 2, dash: "6 6" });
      T("同一个老祖宗：p ↔ f", 480, 440, go(.8), .8, { size: 17, color: C.red, weight: 900, anchor: "middle" });
      k.act(me, "point", S.at - .8, 1.4, { at: [480, 430] });
      k.wait(.8);
      D.wipe();

      // ───── 镜头 3 · 词族：一排辅音都挪了一格 ─────
      D.step(2); D.shot();
      N("一排都挪：", "不止 p→f。t 变 th，d 变 t，k 变 h：一整排辅音都挪了一格！");
      T("借来的大词（老辅音）", 70, 112, go(.6), .6, { size: 15, color: C.blue, weight: 900 });
      T("英语小词（挪了一格）", 520, 112, go(.6), .6, { size: 15, color: C.green, weight: 900 });
      const rows = [
        { y: 160, l: "tres", lz: "（拉丁语：三）", r: "three", rz: "三", rule: "t → th" },
        { y: 220, l: "dentist", lz: "牙医", r: "tooth", rz: "牙", rule: "d → t", egg: true },
        { y: 280, l: "December", lz: "（原来是第十个月）", r: "ten", rz: "十", rule: "d → t" },
        { y: 340, l: "dual", lz: "双的", r: "two", rz: "二", rule: "d → t", egg: true },
        { y: 400, l: "century", lz: "一百年", r: "hundred", rz: "一百", rule: "k → h" },
        { y: 460, l: "cardiac", lz: "心脏的", r: "heart", rz: "心", rule: "k → h", egg: true },
      ];
      const SAYS = {
        tres: [["Tres means three.", "tres 的意思是三。", "tres"], ["My sister is three.", "我妹妹三岁。", "three"], ["Three starts with th.", "three 以 th 开头。", "th"]],
        dentist: [["The dentist looks at my tooth.", "牙医检查我的牙。", "dentist tooth"]],
        December: [["December is the last month.", "十二月是最后一个月。", "December"], ["I have ten fingers.", "我有十根手指。", "ten"]],
        dual: [["Dual means two.", "dual 的意思是「双的」。", "dual"], ["I have two hands.", "我有两只手。", "two"]],
        century: [["A century is one hundred years.", "一个世纪是一百年。", "century hundred"]],
        cardiac: [["Cardiac means of the heart.", "cardiac 的意思是「心脏的」。", "cardiac"], ["My heart is strong.", "我的心脏很强壮。", "heart"]],
      };
      rows.forEach(r => {
        const g = D.sub();
        T(r.l, 70, r.y, go(.5), .5, { size: 24, color: C.blue, weight: 900, font: M });
        if (r.egg) k.egg(70 + mw(r.l, 24) + 6, r.y - 8, { word: r.l });
        T(r.lz, 70 + mw(r.l, 24) + (r.egg ? 34 : 10), r.y, go(.4), .4, { size: 14, color: C.grey, weight: 700 });
        k.arrow(392, r.y - 8, 500, r.y - 8, C.red);
        T(r.rule, 446, r.y - 18, go(.4), .4, { size: 15, color: C.red, weight: 900, anchor: "middle", font: M });
        T(r.r, 520, r.y, go(.5), .5, { size: 24, color: C.green, weight: 900, font: M });
        T(r.rz, 520 + mw(r.r, 24) + 10, r.y, go(.3), .3, { size: 15, color: C.grey, weight: 700 });
        D.back();
        k.pop(g, S.at - 2.1, .5, { cx: 440, cy: r.y - 8 });
        (SAYS[r.l] || []).forEach(([en, zh, word]) => sayAt(en, { zh, word, blocks: word === "th" ? ["th"] : [], egg: ["tres", "dentist", "dual", "century", "cardiac"].filter(e => en.toLowerCase().includes(e)) }));
      });
      k.badge("📜", 760, 156);
      k.act(me, "point", S.at - 1, 1.4, { at: [446, 300] });
      N("例外：", "格林定律不是百分之百整齐，有一些例外（后来别的学者解释了一部分）。");
      k.badge("⚠️", 760, 200, { label: "有例外" });
      k.wait(1);
      D.wipe();

      // ───── 镜头 4 · 彩蛋：December 为什么是「第十个月」？格林是谁？─────
      D.step(3); D.shot();
      N("彩蛋：", "December 里藏着 decem（十）。可它是第十二个月呀？");
      T("December = decem（十）+ …", 60, 130, go(1.2), 1.2, { size: 24, color: C.blue, weight: 900, font: M });
      sayAt("Decem means ten.", { zh: "decem 的意思是十。", word: "decem" });
      N("古罗马历：", "因为古罗马的历法从三月开始数：三月是第一个月，December 正好是第十个月！");
      const cx = 230, cy = 320, R = 110;
      P(k.ellipse(cx, cy, R, R), go(.8), .8, { color: C.ink, w: 2.4 });
      const months = ["三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "一", "二"];
      months.forEach((m, i) => {
        const a = -Math.PI / 2 + i * Math.PI / 6, x = cx + Math.cos(a) * (R - 22), y = cy + Math.sin(a) * (R - 22) + 5;
        T(m, x, y, go(.12), .12, { size: 13, color: i === 9 ? C.red : C.ink, weight: 900, anchor: "middle" });
        T(String(i + 1), cx + Math.cos(a) * (R + 16), cy + Math.sin(a) * (R + 16) + 5, go(.08, 0), .08, { size: 11, color: i === 9 ? C.red : C.grey, weight: 700, anchor: "middle" });
      });
      const a10 = -Math.PI / 2 + 9 * Math.PI / 6;
      P(`M${cx},${cy} L${cx + Math.cos(a10) * (R - 40)},${cy + Math.sin(a10) * (R - 40)}`, go(.5), .5, { color: C.red, w: 3.5 });
      T("古罗马：从三月开始数", cx, cy + R + 44, go(.6), .6, { size: 15, color: C.grey, weight: 700, anchor: "middle" });
      k.badge("📜", cx + 84, cy + R + 40);
      k.act(me, "surprised", S.at - .3, 1.2);
      N("格林是谁？", "格林定律的「格林」，就是编《格林童话》的格林兄弟里的哥哥——雅各布·格林。");
      P(k.roughRect(430, 190, 400, 170), go(.6), .6, { color: C.ink, w: 2 });
      T("Jacob Grimm（雅各布·格林）", 450, 226, go(1), 1, { size: 19, color: C.ink, weight: 900 });
      T("《格林童话》的哥哥", 450, 258, go(.7), .7, { size: 16, color: C.grey, weight: 700 });
      T("1822 年把这条规律系统写出来", 450, 290, go(.9), .9, { size: 16, color: C.ink, weight: 700 });
      T("（1818 年丹麦学者拉斯克先发现）", 450, 320, go(.9), .9, { size: 14, color: C.grey, weight: 700 });
      k.badge("📜", 790, 224);
      sayAt("Jacob Grimm wrote fairy tales and studied words.", { zh: "雅各布·格林写童话，也研究单词。", word: "Jacob Grimm", egg: ["fairy", "studied"] });
      k.act(me, "point", S.at - 1.4, 1.4, { at: [600, 260] });
      k.wait(.8);
      D.wipe();

      // ───── 镜头 5 · 中文对照：一个意思，两套字 ─────
      D.step(4);
      N("中文对照：", "中文也有「两套字」：说话用「脚」「牙」，书面大词用「足」「齿」（足球、牙齿）。");
      P(k.roughRect(40, 104, 380, 150), go(.6), .6, { color: C.ink, w: 2 });
      T("英语：foot ↔ pedal", 60, 150, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      T("小词自己的 · 大词借来的", 60, 196, go(.8), .8, { size: 17, color: C.green, weight: 900 });
      P(k.roughRect(450, 104, 380, 150), go(.6), .6, { color: C.ink, w: 2 });
      T("中文：脚 ↔ 足", 470, 150, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      T("口语字 · 书面字", 470, 196, go(.8), .8, { size: 17, color: C.red, weight: 900 });
      k.badge("💡", 40, 290, { label: "中文对照，不是同源" });
      T("看见长长的大词别害怕：先找它藏着哪个小词！", 40, 334, go(1.4), 1.4, { size: 17, color: C.grey, weight: 700 });
      k.act(me, "point", S.at - 1, 1.4, { at: [230, 170] });
      k.wait(.6);

      // ───── 🔮 预测：ped 是什么？pedestrian 是什么人？─────
      D.step(5);
      N("预测：", "考考你：p 变 f。ped 在英语小词里是谁？那 pedestrian 是什么人？先想 3 秒！");
      P(k.roughRect(16, 380, 824, 150), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 380, 824, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 ped（p → f）= ？　pedestrian 是什么人？", 36, 426, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 640, 470, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "ped = foot（脚）；pedestrian = 用脚走路的人，就是「行人」！");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("ped = foot", 36, 474, 22, { mono: true, color: C.hlGreen });
      T("ped = foot", 36, 474, go(.8), .8, { size: 22, color: C.green, weight: 900, font: M });
      T("pedestrian = 行人（用脚走路的人）", 250, 474, go(1), 1, { size: 20, color: C.green, weight: 900 });
      k.egg(250 + k.estW("pedestrian = 行人（用脚走路的人）", 20) + 8, 466, { word: "pedestrian" });
      k.badge("📜", 36, 506);
      sayAt("Ped means foot.", { zh: "ped 的意思是脚。", word: "ped", blocks: ["ped"] });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      // 行人（场景角色）走过：walks
      const gT = grp();
      const walker = k.actor("traveler", { x: 590, y: 352, s: .62, f: 1, g: gT });
      const syPd = sayAt("A pedestrian walks on foot.", { zh: "行人是走路的人。", word: "pedestrian", egg: ["pedestrian"] });
      [w0, wd] = win(syPd);
      k.act(walker, "walk", w0, wd, { to: 790, words: ["walks"] });
      N("口诀：", "辅音挪一格：p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大词没变！");
      D.hold(2.5);
      k.actorFade(walker, S.at - .4, .4, 0);

      // ───── 收尾金句卡 ─────
      k.quoteCard({ insight: "英语的祖先把一排辅音整体「挪了一格」，\n借来的拉丁大词却没挪——\n认识 foot，就能猜出 pedal。", rhyme: "p 变 f，t 变 th，d 变 t，k 变 h；\n小词变了，大词没变！", hlLines: 2, foot: "📖 单词身世 · 格林定律（下一幕：元音变异）" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "walk", act: "讲解员小人往右走两步（我们用脚走路）" },
      { word: "walks", act: "行人（traveler）从左走到右" },
    ],
    terms: [
      ["格林定律", "英语的祖先（日耳曼语）把一排辅音整体换了位置：p→f、t→th、d→t、k→h。是雅各布·格林 1822 年系统写出来的。"],
      ["辅音", "要用嘴唇、牙齿或舌头挡一下才发出来的音，比如 p、t、k、f、h。"],
      ["原始印欧语", "欧洲和印度很多语言的老祖宗，没有留下文字，是学者们比较各种语言推出来的。"],
      ["日耳曼语", "英语、德语、荷兰语、瑞典语……的共同祖先。"],
      ["借词", "从别的语言借来的词。英语从拉丁语、法语借了很多「大词」，它们保留了老辅音。"],
      ["同源词", "来自同一个老祖宗的词，比如 foot 和 pedal（都来自「脚」）。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 / 中文对照 · ✂️ 简化说法 · ⚠️ 有例外 · ❓ 有争议。"],
      ["🥚 彩蛋词", "超出小学课标的词，知道就好，不用背。"],
    ],
  },
];
