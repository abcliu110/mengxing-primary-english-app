// ==================== 👄 王炸实验室 · 发音五大坑 + 48 音标口腔地图（pron_map）（v2 + 讲解员）====================
// 决策 5（MASTER_DESIGN）：「发音五大坑 + 48 音标口腔地图」（K + W），口型道具共用 fp_props 的 D.mouth / D.lips。
// 三幕：① 发音五大坑（中国孩子最常见的 5 个坑）② 辅音口腔地图（按发音位置分 7 区）③ 元音舌位地图（12 个单元音 + 8 个双元音）。
// 音标写在 /…/ 里（r2check 不把音标当英文词）；每个音标都配一个例词朗读。
// 徽章：⚠️ 常见错误；💡 口型比喻；✂️ 简化（中国课本的 48 个 = 20 元音 + 28 辅音，其中 tr dr ts dz 是组合音，地图只画基本的 24 个辅音）。
// 出处：lab/SOURCES.md ②。配色：V3 四色 + 口腔道具自带颜色。
WB_LAB.pron_map = [
  // ───────────────────────── 第 1 幕：发音五大坑 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：中国孩子说英语，最容易掉进 5 个发音坑。一个一个填平它！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "发音五大坑", sub: "👄 王炸实验室 · 发音", badges: ["⚠️", "💡"], steps: ["① th", "② v / w", "③ 尾音", "④ l / n", "⑤ 长短音", "🔮 预测"] });
      k.wait(.4);

      // ───── 坑 1 · th ─────
      D.step(0); D.shot();
      N("⚠️ 坑 1：", "th 不是 s，也不是 z！舌尖轻轻放在上下牙齿中间，往外吹气。");
      k.head("坑 1：th　舌头夹在牙齿中间", 60, 140, C.red, "start", 22);
      T("❌ sink 当成 think　❌ zis 当成 this", 60, 180, go(1), 1, { size: 19, color: C.red, weight: 700 });
      T("✅ think /θ/ 吹气　✅ this /ð/ 声带振动", 60, 216, go(1), 1, { size: 19, color: C.green, weight: 900 });
      const m1 = FP.mouth({ x: 560, y: 120, s: .78 }); D.adopt(m1.cords);
      m1.glow(178, 128, C.red);
      T("舌尖在牙缝", 560 + 150 * .78, 120 + 70 * .78, go(.4), .4, { size: 14, color: C.red, weight: 900 });
      const syTh = sayAt("Think, thank, three. This, that, mother.", { zh: "想、谢谢、三。这个、那个、妈妈。", word: "think thank three this that mother" });
      k.act(me, "think", syTh.t, Math.max(1.4, syTh.dur * .5), { words: ["think"] });
      sayAt("I think this is a sink.", { zh: "我觉得这是一个水槽。", word: "sink is a" });
      k.wait(.4);
      D.wipe();

      // ───── 坑 2 · v / w ─────
      D.step(1); D.shot();
      N("⚠️ 坑 2：", "v 要用上牙轻轻咬住下嘴唇再出声；w 是嘴唇圆圆地往前嘟，不碰牙。");
      k.head("坑 2：v ≠ w", 60, 140, C.red, "start", 22);
      T("v：上牙咬下唇　very · van · five", 60, 182, go(1), 1, { size: 19, color: C.blue, weight: 900 });
      T("w：嘴唇嘟圆　we · water · window", 60, 218, go(1), 1, { size: 19, color: C.green, weight: 900 });
      T("❌ wery good　✅ very good", 60, 256, go(.8), .8, { size: 19, color: C.red, weight: 700 });
      const L = FP.lips(640, 220, 100, 26); D.adopt(L.up, L.lo);
      k.badge("💡", 600, 290, { label: "口型" });
      L.close(S.at + .3, .5); L.open(S.at + 1.4, .5);
      sayAt("Very, van, five. We, water, window.", { zh: "非常、面包车、五。我们、水、窗户。", word: "very van five we water window" });
      sayAt("Very good! We have five vans.", { zh: "非常好！我们有五辆面包车。", word: "good have vans" });
      k.wait(.4);
      D.wipe();

      // ───── 坑 3 · 尾音不加「呃」─────
      D.step(2); D.shot();
      N("⚠️ 坑 3：", "英语单词常用辅音结尾，中文的字大多用元音结尾，所以很多孩子会在后面多加一个「呃」。尾巴辅音要轻轻收住！");
      k.head("坑 3：尾巴辅音别加「呃」", 60, 140, C.red, "start", 22);
      T("❌ book-呃　bed-呃　cat-呃", 60, 182, go(1), 1, { size: 20, color: C.red, weight: 700 });
      T("✅ book　bed　cat（轻轻收住）", 60, 222, go(1), 1, { size: 20, color: C.green, weight: 900 });
      sayAt("Book, bed, cat. A big red bag.", { zh: "书、床、猫。一个大红包。", word: "book bed cat big red bag" });
      k.act(me, "nod", S.at - 1.2, 1);
      k.wait(.4);
      D.wipe();

      // ───── 坑 4 · l / n ─────
      D.step(3); D.shot();
      N("⚠️ 坑 4：", "l 和 n 舌尖都顶在上牙后面，可 n 让气从鼻子走，l 让气从舌头两边走。有些方言不分，要多练！");
      k.head("坑 4：l ≠ n", 60, 140, C.red, "start", 22);
      T("l：气从舌头两边走　light · long · lion", 60, 182, go(1), 1, { size: 19, color: C.blue, weight: 900 });
      T("n：气从鼻子走　night · no · nine", 60, 218, go(1), 1, { size: 19, color: C.green, weight: 900 });
      const m4 = FP.mouth({ x: 560, y: 120, s: .78 }); D.adopt(m4.cords);
      m4.glow(160, 118, C.blue);
      T("舌尖顶上牙后", 560 + 120 * .78, 120 + 98 * .78, go(.4), .4, { size: 14, color: C.blue, weight: 900 });
      sayAt("Light, long, lion. Night, no, nine.", { zh: "灯光、长、狮子。夜晚、不、九。", word: "light long lion night no nine" });
      sayAt("Nine lions sleep at night.", { zh: "九只狮子晚上睡觉。", word: "lions sleep at" });
      k.wait(.4);
      D.wipe();

      // ───── 坑 5 · 长短元音 ─────
      D.step(4); D.shot();
      N("⚠️ 坑 5：", "长元音不只是「拖长」，嘴形也不一样：sheep 嘴角往两边咧；ship 短促、放松。读错就把绵羊说成船！");
      k.head("坑 5：长音 ≠ 短音", 60, 140, C.red, "start", 22);
      T("sheep /iː/ 绵羊　↔　ship /ɪ/ 船", 60, 184, go(1), 1, { size: 21, color: C.ink, weight: 900 });
      T("pool /uː/ 水池　↔　pull /ʊ/ 拉", 60, 224, go(1), 1, { size: 21, color: C.ink, weight: 900 });
      sayAt("Sheep, ship. Pool, pull.", { zh: "绵羊、船。水池、拉。", word: "sheep ship pool pull" });
      sayAt("The sheep is on the ship.", { zh: "绵羊在船上。", word: "the on" });
      k.act(me, "surprised", S.at - 1.4, 1.2);
      k.wait(.4);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「three trees」里有几个坑？先想 3 秒！");
      P(k.roughRect(16, 420, 824, 112), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 420, 824, 112), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 three trees　有几个坑？", 36, 460, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 330, 464, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "两个！three 的 th 要咬舌吹气（坑 1），两个词都是长音 /iː/（坑 5），trees 结尾的 s 轻轻收住。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("th 咬舌（坑 1）+ 长音 /iː/（坑 5）", 36, 500, go(1), 1, { size: 21, color: C.green, weight: 900 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Three trees. I can see three trees.", { zh: "三棵树。我能看见三棵树。", word: "three trees can see" });
      D.hold(2);

      k.quoteCard({ insight: "五大坑：th 夹舌、v 咬唇、尾音收住、\nl / n 分清、长短音换嘴形。", rhyme: "舌夹牙，牙咬唇，\n尾巴收，长短分！", hlLines: 2, foot: "👄 王炸实验室 · 发音五大坑" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["zis", "wery", "th"],   // 错读示范（打 ❌）和字母组合名称 th，不读
    actionWords: [
      { word: "think", act: "讲解员歪头想（think）" },
    ],
    terms: [
      ["音标", "记发音的符号，写在 / / 里：/θ/、/iː/。中国课本常用 48 个：20 个元音 + 28 个辅音（✂️）。"],
      ["咬舌音 th", "/θ/（think，不振动）和 /ð/（this，振动）：舌尖放在上下齿之间。"],
      ["唇齿音 v", "上牙轻咬下唇出声：very、five。w 不碰牙，嘴唇嘟圆。"],
      ["尾音", "单词最后的辅音（book 的 k）：轻轻收住，不要加「呃」。"],
      ["长元音 / 短元音", "/iː/ 和 /ɪ/、/uː/ 和 /ʊ/：不只长短不同，嘴形也不同。"],
      ["可信度徽章", "⚠️ 常见错误 · 💡 口型比喻 · ✂️ 简化说法 · 📜 有出处的事实。"],
    ],
  },

  // ───────────────────────── 第 2 幕：辅音口腔地图 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：辅音在嘴里哪儿发出来？画一张口腔地图，从嘴唇一路走到喉咙！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "辅音口腔地图", sub: "👄 48 音标口腔地图 · 辅音篇", badges: ["💡", "✂️"], steps: ["① 嘴唇", "② 牙齿", "③ 牙床", "④ 上颚", "⑤ 软腭 / 喉", "🔮 预测"] });
      N("辅音：", "气流在嘴里被嘴唇、牙齿或舌头挡一下才出来的音，比如 p、t、k。");
      N("✂️ 简化：", "课本 28 个辅音里，tr、dr、ts、dz 是两个音拼起来的，地图上画基本的 24 个。");
      k.wait(.3);
      D.shot();
      const m = FP.mouth({ x: 60, y: 150, s: 1 }); D.adopt(m.cords);
      const s = 1, X = v => 60 + v * s, Y = v => 150 + v * s;
      const zone = (i, a, b, title, ipa, words, en, zh, wd, col) => {
        D.step(i);
        m.glow(a, b, col);
        T(title, 360, 150 + (i * 62), go(.6), .6, { size: 19, color: col, weight: 900 });
        T(ipa, 360, 172 + (i * 62), go(.4), .4, { size: 16, color: C.grey, weight: 700 });
        T(words, 560, 172 + (i * 62), go(.6), .6, { size: 17, color: C.ink, weight: 900, font: M });
        const sy = sayAt(en, { zh, word: wd });
        k.act(me, "point", sy.t, Math.max(1, sy.dur * .6), { at: [X(a), Y(b)] });
        k.wait(.2);
      };
      N("嘴唇：", "双唇碰一碰：p、b、m、w；上牙碰下唇：f、v。");
      zone(0, 186, 130, "① 嘴唇 / 唇齿", "/p/ /b/ /m/ /w/ · /f/ /v/", "pen bed map wet · fan van", "Pen, bed, map, wet. Fan, van.", "嘴唇碰一碰的音。", "pen bed map wet fan van", C.red);
      N("牙齿：", "舌尖夹在牙缝：th 的两个音 /θ/、/ð/。");
      zone(1, 176, 126, "② 牙齿（咬舌）", "/θ/ /ð/", "think · this", "Think, this. I think this is fun.", "咬舌头的音。我觉得这个很好玩。", "think this is fun", C.blue);
      N("牙床：", "舌尖顶住上牙后面那块硬硬的牙床：t、d、s、z、n、l。");
      zone(2, 160, 118, "③ 牙床（上牙后面）", "/t/ /d/ /s/ /z/ /n/ /l/", "ten dog sun zoo nose leg", "Ten, dog, sun, zoo, nose, leg.", "舌尖顶牙床的音。", "ten dog sun zoo nose leg", C.green);
      N("上颚：", "舌头往后一点，抬向硬上颚：sh、zh 类、ch、j、r、y。");
      zone(3, 128, 112, "④ 硬上颚", "/ʃ/ /ʒ/ /tʃ/ /dʒ/ /r/ /j/", "ship measure chair jam red yes", "Ship, measure, chair, jam, red, yes.", "舌头抬向上颚的音。", "ship measure chair jam red yes", C.red);
      N("软腭和喉咙：", "舌根抬起碰软腭：k、g、ng；喉咙里轻轻呼气：h。");
      zone(4, 92, 126, "⑤ 软腭 · 喉咙", "/k/ /g/ /ŋ/ · /h/", "cat go sing · hat", "Cat, go, sing. Hat.", "舌根和喉咙的音。", "cat go sing hat", C.blue);
      m.glow(90, 222, C.blue);
      T("从前往后：嘴唇 → 牙齿 → 牙床 → 上颚 → 软腭 → 喉咙", 60, 444, go(1.2), 1.2, { size: 18, color: C.green, weight: 900 });
      k.badge("💡", 60 + k.estW("从前往后：嘴唇 → 牙齿 → 牙床 → 上颚 → 软腭 → 喉咙", 18) + 10, 440, { label: "地图" });
      k.wait(.4);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "big 的 b 和 g，一个在地图最前面，一个在后面——各在哪儿？先想 3 秒！");
      P(k.roughRect(16, 466, 824, 70), go(.6), .6, { color: C.green, w: 2.5 });
      F(k.rectD(16, 466, 824, 70), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 big：b 在哪儿？g 在哪儿？", 36, 494, go(.9), .9, { size: 19, color: C.ink, weight: 900 });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "b 在最前面的嘴唇，g 在后面的软腭——读 big，就是从嘴唇一路跳到舌根！");
      T("b = 嘴唇 ①　g = 软腭 ⑤", 36, 524, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      k.act(me, "cheer", S.at - .3, 1.3); k.sfx("ding", S.at + .2);
      sayAt("Big. A big bag.", { zh: "大。一个大包。", word: "big bag a" });
      D.hold(2);

      k.quoteCard({ insight: "辅音按位置排队：嘴唇、牙齿、牙床、\n上颚、软腭、喉咙，从前走到后。", rhyme: "唇齿床，颚腭喉，\n辅音地图从前走！", hlLines: 2, foot: "👄 48 音标口腔地图 · 辅音篇" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["tr", "dr", "ts", "dz", "th", "sh", "zh", "ch", "ng"],   // 字幕里的字母组合名称（不是单词），不读
    terms: [
      ["辅音", "气流被嘴唇、牙齿或舌头挡一下才出来的音：p、t、k、s……"],
      ["发音位置", "辅音在嘴里被挡住的地方：嘴唇、牙齿、牙床、硬上颚、软腭、喉咙。"],
      ["牙床", "上门牙后面那一小块硬硬的肉（齿龈），t、d、s、n、l 都在这儿。"],
      ["软腭", "上颚后面软软的部分，舌根抬起碰它就是 k、g、ng。"],
    ],
  },

  // ───────────────────────── 第 3 幕：元音舌位地图 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：元音不靠「挡」，靠舌头的高低、前后，加上嘴唇圆不圆。画一张舌位地图！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "元音舌位地图", sub: "👄 48 音标口腔地图 · 元音篇", badges: ["💡", "✂️"], steps: ["① 前元音", "② 中元音", "③ 后元音", "④ 双元音", "⑤ 口诀", "🔮 预测"] });
      N("元音：", "气流不受阻挡、顺顺地出来的音，比如 a、e、i、o、u 发的那些音。英语有 20 个：12 个单元音 + 8 个双元音。");
      k.wait(.3);
      D.shot();
      // 舌位梯形：左 = 前，右 = 后，上 = 高，下 = 低
      P(`M80,140 L420,140 L380,380 L170,380 Z`, go(1), 1, { color: C.ink, w: 2.4 });
      T("舌头前", 80, 128, go(.3), .3, { size: 14, color: C.grey, weight: 700 });
      T("舌头后", 420, 128, go(.3), .3, { size: 14, color: C.grey, weight: 700, anchor: "end" });
      T("高（嘴小）", 70, 150, go(.3), .3, { size: 14, color: C.grey, weight: 700, anchor: "end" });
      T("低（嘴大）", 160, 392, go(.3), .3, { size: 14, color: C.grey, weight: 700, anchor: "end" });
      k.badge("💡", 190, 404, { label: "舌位" });
      const dot = (x, y, ipa, col) => { const d = k.ellipse(x, y, 6, 6); P(d, go(.2), .2, { color: col, w: 2 }); F(d, go(.1, 0), { color: col, op: .9 }); T(ipa, x + 10, y + 5, go(.3), .3, { size: 16, color: col, weight: 900 }); };
      const list = (i, title, words, col) => { T(title, 500, 150 + i * 56, go(.6), .6, { size: 18, color: col, weight: 900 }); T(words, 500, 174 + i * 56, go(.6), .6, { size: 16, color: C.ink, weight: 900, font: M }); };

      D.step(0);
      N("前元音：", "舌头往前、抬高：/iː/ /ɪ/ /e/ /æ/，从高到低嘴巴越张越大。");
      dot(100, 160, "/iː/", C.red); dot(130, 200, "/ɪ/", C.red); dot(150, 280, "/e/", C.red); dot(175, 360, "/æ/", C.red);
      list(0, "前元音 4 个", "see sit bed cat", C.red);
      sayAt("See, sit, bed, cat.", { zh: "看见、坐、床、猫。", word: "see sit bed cat" });
      D.step(1);
      N("中元音：", "舌头在中间：/ɜː/ /ə/ /ʌ/，最放松的位置。");
      dot(240, 220, "/ɜː/", C.green); dot(255, 270, "/ə/", C.green); dot(270, 330, "/ʌ/", C.green);
      list(1, "中元音 3 个", "bird about cup", C.green);
      sayAt("Bird, about, cup.", { zh: "鸟、关于、杯子。", word: "bird about cup" });
      D.step(2);
      N("后元音：", "舌头往后缩：/uː/ /ʊ/ /ɔː/ /ɒ/ /ɑː/，嘴唇大多要圆起来。");
      dot(400, 160, "/uː/", C.blue); dot(375, 200, "/ʊ/", C.blue); dot(385, 270, "/ɔː/", C.blue); dot(370, 340, "/ɒ/", C.blue); dot(330, 370, "/ɑː/", C.blue);
      list(2, "后元音 5 个", "food book ball hot car", C.blue);
      sayAt("Food, book, ball, hot, car.", { zh: "食物、书、球、热、汽车。", word: "food book ball hot car" });
      k.act(me, "point", S.at - 1.6, 1.4, { at: [380, 260] });
      D.step(3);
      N("双元音：", "从一个元音滑到另一个元音，像坐滑梯：/eɪ/ /aɪ/ /ɔɪ/ /əʊ/ /aʊ/ /ɪə/ /eə/ /ʊə/。");
      list(3, "双元音 8 个（滑过去）", "day my boy go now ear hair tour", C.ink);
      P(`M150,280 Q140,230 130,200`, go(.6), .6, { color: C.red, w: 3 });
      T("/eɪ/ 滑", 156, 246, go(.3), .3, { size: 14, color: C.red, weight: 900 });
      sayAt("Day, my, boy, go, now. Ear, hair, tour.", { zh: "天、我的、男孩、去、现在。耳朵、头发、旅行。", word: "day my boy go now ear hair tour" });
      k.act(me, "jump", S.at - 1.2, 1);
      T("12 + 8 = 20 个元音　+ 28 个辅音 = 48 个音标", 60, 432, go(1), 1, { size: 20, color: C.green, weight: 900 });
      k.badge("✂️", 60 + k.estW("12 + 8 = 20 个元音　+ 28 个辅音 = 48 个音标", 20) + 10, 428, { label: "简化" });
      k.wait(.4);

      D.step(4);
      N("口诀：", "舌前舌中舌后走，高低前后看舌头；两个元音连着滑，就是双元音！");
      k.act(me, "nod", S.at - .6, .8);
      k.wait(.3);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "sheep 和 ship 都在舌头前面——哪个更高、更靠前？先想 3 秒！");
      P(k.roughRect(16, 452, 824, 80), go(.6), .6, { color: C.green, w: 2.5 });
      F(k.rectD(16, 452, 824, 80), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 sheep /iː/ 和 ship /ɪ/：谁更高更前？", 36, 484, go(.9), .9, { size: 19, color: C.ink, weight: 900 });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "sheep 的 /iː/ 在地图最左上角，又高又前；ship 的 /ɪ/ 低一点、靠后一点，更放松。");
      T("sheep 的 /iː/ 更高更前；ship 更放松", 36, 516, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      k.act(me, "cheer", S.at - .3, 1.3); k.sfx("ding", S.at + .2);
      sayAt("Sheep, ship. A sheep on a ship.", { zh: "绵羊、船。船上的一只绵羊。", word: "sheep ship a on" });
      D.hold(2);

      k.quoteCard({ insight: "元音看舌头：高低、前后、嘴唇圆不圆。\n12 个单元音 + 8 个双元音 = 20 个。", rhyme: "高低前后看舌头，\n两音连滑双元音！", hlLines: 2, foot: "👄 48 音标口腔地图 · 元音篇" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    terms: [
      ["元音", "气流顺顺地出来、不被挡住的音。英语 20 个：12 个单元音 + 8 个双元音。"],
      ["舌位", "发元音时舌头最高点的位置：高 / 低、前 / 后。"],
      ["双元音", "从一个元音滑到另一个元音：day /eɪ/、my /aɪ/、go /əʊ/。"],
    ],
  },
];
