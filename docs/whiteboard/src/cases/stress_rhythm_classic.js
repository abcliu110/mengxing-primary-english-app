// ==================== 白板脚本：⑥ 名动重音移位 & 弱读吞音听力机（3 个法则）====================
// 数据：STRESS_AND_SCHWA_DB（法则 A 名前动后 / 法则 B 后缀重音磁铁 / 法则 C 弱读与连读）。
// 本页签自带的小工具：音节方块 sylls()、节拍圆点 dot()、礼物 gift()、弧线 arc()。
// 升级前快照（2026-10-30，决策 24 升引擎 v2 + 讲解员之前的 stress_rhythm.js 原样保存，只把 WB_LAB.stress_rhythm 改名 stress_rhythm_classic；不写入 App，只供回退 / R1 零丢失对照 / 对比图）。
(function () {
  const MONO = '"Courier New",Courier,monospace';

  // 节拍圆点：big=true 重读大橙点；false 弱读小灰点
  function dot(k, cx, cy, big, r) {
    const { C } = k;
    const rr = r ?? (big ? 9 : 4.5);
    const d = k.ellipse(cx, cy, rr, rr);
    k.P(d, k.go(.25), .25, { color: big ? C.orange : C.grey, w: 2 });
    k.F(d, k.go(.1, 0), { color: big ? "#f59e0b" : "#cbd5e1", op: 1 });
  }

  // 音节方块：parts 每个音节一块；si 重读音节序号；mag 磁铁音节序号（紫色）
  function sylls(k, parts, x, y, si, o = {}) {
    const { C } = k;
    const fs = o.size ?? 24, h = fs + 18, gap = 7;
    let cx = x; const boxes = [];
    parts.forEach((p, i) => {
      const w = Math.max(46, p.length * fs * .6 + 22);
      const isS = i === si, isM = i === o.mag;
      const col = isM ? C.purple : isS ? C.orange : C.grey;
      const fill = isM && isS ? "#fde68a" : isM ? "#ede9fe" : isS ? "#fef3c7" : "#f1f5f9";
      k.P(k.roughRect(cx, y, w, h), k.go(.35), .35, { color: col, w: isS || isM ? 3 : 2 });
      k.F(k.rectD(cx, y, w, h), k.go(.15, 0), { color: fill, op: .95 });
      k.T(p, cx + w / 2, y + h - 12, k.go(.3), .3, { size: fs, color: isS ? C.ink : C.grey, weight: isS ? 900 : 700, anchor: "middle", font: MONO });
      boxes.push({ x: cx, w, cx: cx + w / 2 });
      cx += w + gap;
    });
    if (o.dots !== false) boxes.forEach((b, i) => dot(k, b.cx, y - 14, i === si));
    return { boxes, x, y, h, right: cx - gap };
  }

  // 向下弯的弧线（连读、磁铁吸力）
  function arc(k, x1, x2, y, depth, color, w = 2.5, head = false) {
    const mx = (x1 + x2) / 2;
    let d = `M${x1},${y} Q${mx},${y + depth} ${x2},${y}`;
    if (head) { const s = x2 < x1 ? 1 : -1; d += ` M${x2 + s * 9},${y + 5} L${x2},${y} L${x2 + s * 2},${y + 10}`; }
    k.P(d, k.go(.45), .45, { color, w });
  }

  // 礼物盒
  function gift(k, x, y) {
    const { C } = k;
    k.P(k.roughRect(x, y + 14, 50, 38), k.go(.5), .5, { color: C.red, w: 2.5 });
    k.F(k.rectD(x, y + 14, 50, 38), k.go(.2, 0), { color: "#fecdd3", op: .9 });
    k.P(k.wl(x + 25, y + 14, x + 25, y + 52, .4) + " " + k.wl(x, y + 30, x + 50, y + 30, .4), k.go(.35), .35, { color: C.orange, w: 3 });
    k.P(`M${x + 25},${y + 14} q-16,-16 -18,-2 q4,6 18,2 q16,-16 18,-2 q-4,6 -18,2`, k.go(.4), .4, { color: C.orange, w: 2.5 });
  }

  WB_LAB.stress_rhythm_classic = [
    // ───────── 法则 A：名前动后 ─────────
    {
      build(k) {
        const { C, N, T, go } = k;
        N("", "这节课：同一个单词，换一个地方用力读，意思就变了！");
        k.header("法则 A  双音节词「名前动后」", "重音与弱读", false);
        N("音节：", "单词里一口气读出的一小段。present 可以切成 pre 和 sent 两段。");
        T("present", 40, 122, go(.8), .8, { size: 30, color: C.ink, weight: 900, font: MONO });
        k.arrow(178, 112, 220, 112, C.grey);
        sylls(k, ["pre", "sent"], 236, 92, -1, { size: 22, dots: false });
        N("元音：", "a、e、i、o、u 这类张嘴发出的响亮的音。每个音节里都有一个元音。");
        k.note("两个音节 = 双音节词", 420, 120);
        N("重音：", "单词里读得最响、最长的那个音节。音标里在它前面打一个小撇 ˈ。");
        dot(k, 640, 112, true); T("重读：响、长", 658, 119, go(.6), .6, { size: 17, color: C.orange, weight: 900 });
        dot(k, 800, 112, false); T("弱读：轻、短", 814, 119, go(.6), .6, { size: 17, color: C.grey, weight: 900 });

        N("名词：", "表示东西、人、地方的词。present 当名词是「礼物」，重音在前面。");
        k.head("名词 n.  →  前重", 40, 178, C.blue, "start", 21);
        sylls(k, ["pre", "sent"], 60, 222, 0, { size: 26 });
        T("ˈpre-sent", 250, 254, go(.7), .7, { size: 24, color: C.blue, weight: 900, font: MONO });
        gift(k, 395, 206);
        T("n. 生日礼物 / adj. 现在的", 60, 298, go(1), 1, { size: 16, color: C.ink });
        N("形容词：", "描述样子的词。adj. 是形容词的缩写，present 还能当「现在的」。");
        k.wait(1.2);

        N("动词：", "表示动作的词。present 当动词是「颁呈、赠送」，重音跑到后面。");
        k.head("动词 v.  →  后重", 500, 178, C.purple, "start", 21);
        sylls(k, ["pre", "sent"], 520, 222, 1, { size: 26 });
        T("pre-ˈsent", 710, 254, go(.7), .7, { size: 24, color: C.purple, weight: 900, font: MONO });
        k.arrow(860, 244, 920, 244, C.purple, "送出去", 890, 230);
        T("v. 颁呈 / 赠送", 520, 298, go(.8), .8, { size: 16, color: C.ink });

        N("为什么？", "名词是静静站着的东西，重心稳稳放在开头。");
        T("名词像一块石头：重心稳在开头", 60, 334, go(1.4), 1.4, { size: 17, color: C.blue, weight: 900 });
        N("", "动词是向前用力的动作，力气一路冲到词尾。");
        T("动词像踢一脚：力气冲向词尾 ➜", 520, 334, go(1.4), 1.4, { size: 17, color: C.purple, weight: 900 });

        N("名前动后：", "拼写一模一样，名词重音在前，动词重音在后。再看三个词！");
        const rows = [
          ["record", "ˈre-cord", "n. 最高纪录/唱片", "re-ˈcord", "v. 录音/记录下来"],
          ["desert", "ˈde-sert", "n. 撒哈拉大沙漠", "de-ˈsert", "v. 抛弃/遗弃"],
          ["export / import", "ˈex-port", "n. 出口商品", "ex-ˈport", "v. 把商品出口到国外"]
        ];
        k.P(k.wl(40, 352, 920, 352, .8), go(.4), .4, { color: "#cbd5e1", w: 1.5 });
        rows.forEach((r, i) => {
          const y = 378 + i * 26;
          T(r[0], 40, y, go(.6), .6, { size: 18, color: C.ink, weight: 900, font: MONO });
          T(r[1], 230, y, go(.5), .5, { size: 18, color: C.blue, weight: 900, font: MONO });
          T(r[2], 336, y, go(.6), .6, { size: 15, color: C.grey });
          T(r[3], 560, y, go(.5), .5, { size: 18, color: C.purple, weight: 900, font: MONO });
          T(r[4], 666, y, go(.6), .6, { size: 15, color: C.grey });
          if (i === 0) N("", "record：名词「纪录、唱片」前重；动词「录下来」后重。");
          if (i === 1) N("", "desert：名词「沙漠」前重；动词「抛弃」后重。");
          if (i === 2) N("", "export：名词「出口商品」前重；动词「出口」后重。import 也一样。");
          k.wait(1.2);
        });
        N("", "放进句子里听一听：前一个 present 是礼物，后一个 present 是送。");
        k.final("Here is a ˈpresent for you! Let me preˈsent it to you.", [], "这是送你的礼物！让我把它送给你。  名词前重，动词后重！", { say: "Here is a present for you! Let me present it to you." });
        N("口诀：", "名前动后：东西稳在头，动作冲到尾。");
        k.wait(1.5);
      },
      terms: [
        ["音节", "单词里一口气读出的一小段，每段里有一个元音。present 有两个音节：pre + sent，叫双音节词。"],
        ["元音", "a、e、i、o、u 这类嘴巴张开、声音响亮的音。每个音节的中心都是一个元音。"],
        ["辅音", "元音以外的音，比如 p、r、s、t、k。它们要靠嘴唇、舌头挡一下才发出来。"],
        ["音标", "专门记录读音的符号，写在 / / 里，比如 /kən/。"],
        ["重音（ˈ）", "一个单词里读得最响、最长的音节。音标里在它前面打一个小撇 ˈ，比如 ˈpre-sent。"],
        ["重读 / 弱读", "重读：用力、读响、拉长；弱读：轻轻地、短短地一带而过。动画里大橙点 = 重读，小灰点 = 弱读。"],
        ["前重 / 后重", "前重：重音在第一个音节（ˈpre-sent）；后重：重音在第二个音节（pre-ˈsent）。"],
        ["名词（n.）", "表示东西、人、地方的词，比如 present（礼物）、desert（沙漠）。n. 是它的缩写。"],
        ["动词（v.）", "表示动作的词，比如 present（赠送）、record（录音）。v. 是它的缩写。"],
        ["形容词（adj.）", "描述样子、状态的词，比如 present（现在的）。adj. 是它的缩写。"],
        ["词性", "一个词属于哪一类：名词、动词、形容词……同一个拼写，词性不同，重音就可能不同。"],
        ["名前动后", "双音节词拼写一样时：当名词重音在前，当动词重音在后。比如 ˈrecord（纪录）、reˈcord（录音）。"],
        ["弱读 /ə/", "不重要的小词读得又轻又短，元音常变成懒洋洋的 /ə/（嘴巴放松轻轻「呃」一声），比如 can 读成 /kən/。"],
        ["吞音", "弱读、连读时，有的音读得特别轻，好像被「吞」掉了，听起来像 cuppa tea。"]
      ]
    },

    // ───────── 法则 B：后缀重音磁铁 ─────────
    {
      build(k) {
        const { C, N, T, go } = k;
        N("", "三四个音节的长单词，重音在哪儿？不用查音标，看一眼尾巴就知道！");
        k.header("法则 B  后缀「重音磁铁」", "重音与弱读", false);
        N("后缀：", "加在单词尾巴上的一小段，比如 -tion、-ic、-ese。");
        k.note("长单词找重音：先看尾巴上的后缀！", 40, 96, { size: 18, color: C.ink, weight: 900 });
        N("重音磁铁：", "比喻：有些后缀像磁铁，总把重音吸到固定的位置。紫色块就是磁铁。");
        sylls(k, ["磁铁"], 560, 72, -1, { size: 16, mag: 0, dots: false });
        T("= 后缀", 624, 94, go(.5), .5, { size: 17, color: C.purple, weight: 900 });
        dot(k, 730, 88, true); T("= 重音被吸到这里", 748, 94, go(.8), .8, { size: 17, color: C.orange, weight: 900 });

        const rowY = [130, 208, 286, 364];
        const label = (i, a, b, mono) => {
          T(a, 40, rowY[i] + 26, go(.6), .6, { size: mono ? 18 : 19, color: C.purple, weight: 900, font: mono ? MONO : undefined });
          T(b, 40, rowY[i] + 50, go(.6), .6, { size: 15, color: C.grey, weight: 700 });
        };
        const ex = (i, a, b) => {
          T(a, 470, rowY[i] + 22, go(Math.max(.8, a.length * .05)), Math.max(.8, a.length * .05), { size: 18, color: C.ink, weight: 700, font: MONO });
          T(b, 470, rowY[i] + 46, go(.6), .6, { size: 15, color: C.grey });
        };

        // ① -tion / -sion
        N("多音节词：", "有三个或更多音节的长单词，比如 va-ca-tion 有三个音节。");
        label(0, "-tion/-sion", "吸前一个音节", true);
        let s = sylls(k, ["va", "ca", "tion"], 200, rowY[0], 1, { size: 22, mag: 2 });
        N("-tion 磁铁：", "重音 100% 吸在它前面那一个音节：va-ˈCA-tion（假期）。");
        arc(k, s.boxes[2].cx, s.boxes[1].cx + 8, rowY[0] + 44, 14, C.purple, 2.5, true);
        T("假期", s.right + 12, rowY[0] + 28, go(.4), .4, { size: 15, color: C.grey });
        ex(0, "di-ˈREC-tion · in-vi-ˈTA-tion", "方向 · 邀请");

        // ② -ic / -ian
        N("-ic / -ian 磁铁：", "也把重音吸到前一个音节：mu-ˈSI-cian（音乐家）。");
        label(1, "-ic / -ian", "吸前一个音节", true);
        s = sylls(k, ["mu", "si", "cian"], 200, rowY[1], 1, { size: 22, mag: 2 });
        arc(k, s.boxes[2].cx, s.boxes[1].cx + 8, rowY[1] + 44, 14, C.purple, 2.5, true);
        T("音乐家", s.right + 12, rowY[1] + 28, go(.4), .4, { size: 15, color: C.grey });
        N("", "四个音节也一样：sci-en-ˈTIF-ic（科学的），重音在 -ic 前面。");
        ex(1, "ma-ˈGI-cian · sci-en-ˈTIF-ic", "魔术师 · 科学的");

        // ③ -ese / -eer 自吸
        N("自吸磁铁：", "-ee、-ese、-eer 不吸别人，把重音吸在自己身上：Chi-ˈNESE。");
        label(2, "-ee/-ese/-eer", "吸在自己身上", true);
        s = sylls(k, ["Chi", "nese"], 200, rowY[2], 1, { size: 22, mag: 1 });
        T("中文/中国人", s.right + 12, rowY[2] + 28, go(.5), .5, { size: 15, color: C.grey });
        ex(2, "Ja-pa-ˈNESE · engi-ˈNEER", "日语/日本人 · 工程师");

        // ④ 合成名词
        N("合成名词：", "两个名词拼成一个新名词，比如 black + board = 黑板。");
        label(3, "合成名词", "重音在第一个词", false);
        s = sylls(k, ["black", "board"], 200, rowY[3], 0, { size: 22 });
        T("黑板", s.right + 12, rowY[3] + 28, go(.4), .4, { size: 15, color: C.grey });
        N("前重铁律：", "合成名词的重音永远在第一个词上：ˈBLACK-board、ˈSCHOOL-bag。");
        ex(3, "ˈSCHOOL-bag · ˈFOOT-ball · ˈSUN-flower", "书包 · 足球 · 向日葵");
        k.wait(1);

        N("", "放进句子里：vacation 的重音被 -tion 吸到 CA 上。");
        k.final("I love summer va-CA-tion!", [], "我爱暑假！  -tion/-ic/-ian 吸前一个，-ese/-eer 吸自己，合成名词前重。", { say: "I love summer vacation!", word: "vacation" });
        N("口诀：", "看尾巴找重音：-tion、-ic 吸前头，-ese、-eer 吸自己。");
        k.wait(1.5);
      },
      terms: [
        ["后缀", "加在单词尾巴上的一小段，比如 -tion、-sion、-ic、-ian、-ese、-eer。"],
        ["多音节词", "有三个或更多音节的长单词，比如 va-ca-tion（3 个）、sci-en-tif-ic（4 个）。"],
        ["重音磁铁", "比喻：某些后缀像磁铁，总把重音吸到固定位置，所以看尾巴就知道重音在哪儿。"],
        ["-tion / -sion、-ic / -ian", "重音吸在它们前面那一个音节：va-ˈCA-tion、mu-ˈSI-cian、sci-en-ˈTIF-ic。"],
        ["自吸磁铁（-ee / -ese / -eer）", "重音直接落在后缀自己身上：Chi-ˈNESE、engi-ˈNEER。"],
        ["合成名词", "两个名词拼成的新名词，比如 black + board = blackboard（黑板）。重音在第一个词：ˈBLACK-board。"]
      ]
    },

    // ───────── 法则 C：重音计时节拍 + 弱读 /ə/ + 连读 ─────────
    {
      build(k) {
        const { C, N, T, go } = k;
        N("", "为什么老外说话像「吞字」，听不清？秘密在节拍和弱读！");
        k.header("法则 C  弱读 /ə/ 与连读", "重音与弱读", false);

        N("节拍：", "说话的轻重快慢，像音乐里的鼓点。汉语和英语的节拍不一样。");
        T("汉语：音节计时", 40, 120, go(.8), .8, { size: 18, color: C.brown, weight: 900 });
        ["我", "会", "游", "泳"].forEach((c, i) => { dot(k, 246 + i * 52, 92, true, 6.5); T(c, 234 + i * 52, 120, go(.3), .3, { size: 24, color: C.ink }); });
        N("音节计时语言：", "每个字用力一样，像机关枪：哒、哒、哒、哒。");
        k.note("像机关枪：哒哒哒哒，每个字一样用力", 480, 118, { size: 16 });

        T("英语：重音计时", 40, 172, go(.8), .8, { size: 18, color: C.blue, weight: 900 });
        const words = [["I", 238, false], ["kən", 272, false], ["ˈSWIM", 336, true]];
        words.forEach(([w, x, big]) => {
          dot(k, x + (big ? 34 : w.length * 7.2), 142, big, big ? 10 : 4);
          T(w, x, 172, go(.3), .3, { size: 24, color: big ? C.ink : C.grey, weight: big ? 900 : 700, font: MONO });
        });
        N("重音计时语言：", "重要的词读得又响又长，中间的小词飞快带过，像打鼓：咚—嗒—咚。");
        k.note("像打鼓：重的拉长，轻的一带而过", 480, 170, { size: 16 });

        N("实词 / 虚词：", "实词是有实在意思的词（swim、tea）；虚词是小帮手（to、of、can）。");
        T("/ə/", 40, 228, go(.6), .6, { size: 34, color: C.red, weight: 900, font: MONO });
        T("懒元音 Schwa：嘴巴放松，轻轻「呃」一下", 120, 216, go(1.2), 1.2, { size: 17, color: C.red, weight: 900 });
        T("to · for · of · and · can 这些虚词，常常压成 /ə/", 120, 242, go(1.2), 1.2, { size: 16, color: C.grey });
        N("弱读 /ə/：", "虚词读得又轻又短，元音变成懒洋洋的 /ə/，这就是弱读。");
        k.P(k.wl(40, 260, 920, 260, .8) + " " + k.wl(480, 272, 480, 428, .8), go(.6), .6, { color: "#cbd5e1", w: 1.5 });

        // ① can vs can't
        N("肯定句 / 否定句：", "肯定句说「会、是」；否定句带 not，说「不会、不是」。");
        T("can /kən/ vs can't /ˈkɑːnt/", 40, 290, go(1), 1, { size: 18, color: C.blue, weight: 900, font: MONO });
        T("I kən ˈSWIM.  vs  I ˈKɑːNT ˈSWIM.", 40, 316, go(1.2), 1.2, { size: 17, color: C.ink, weight: 700, font: MONO });
        N("can 弱读：", "肯定句里 can 轻读成 /kən/，重音给 swim；can't 要重读、张大嘴！");
        T("can 很轻 = 会游；can't 重读张大嘴 = 不会游", 40, 340, go(1.2), 1.2, { size: 14, color: C.grey });

        // ② of
        N("of 弱读：", "a cup of tea 里 of 只剩一个 /ə/，连起来听像 cuppa tea。");
        T("of ➔ /ə/", 500, 290, go(.6), .6, { size: 18, color: C.blue, weight: 900, font: MONO });
        T("a cup of tea ➔ cuppa tea", 500, 316, go(1), 1, { size: 17, color: C.ink, weight: 700, font: MONO });
        T("lots of ➔ /ˈlɒtsə/ ｜ kind of ➔ /ˈkaɪndə/", 500, 340, go(1), 1, { size: 14, color: C.grey, font: MONO });

        // ③ to
        N("缩读：", "口语里几个词缩成一个：want to → wanna，going to → gonna。");
        T("to ➔ /tə/ · wanna · gonna", 40, 374, go(.9), .9, { size: 18, color: C.blue, weight: 900, font: MONO });
        T("want to ➔ wanna ｜ going to ➔ gonna", 40, 400, go(1.1), 1.1, { size: 17, color: C.ink, weight: 700, font: MONO });
        T("I'm gonna (going to) visit my grandpa tomorrow.", 40, 424, go(1.2), 1.2, { size: 13, color: C.green, weight: 700, font: MONO });

        // ④ 连读
        N("连读：", "前一个词的尾巴是辅音，后一个词以元音开头，就粘成一个音节读。");
        T("辅音 + 元音  丝滑连读", 500, 374, go(.9), .9, { size: 18, color: C.blue, weight: 900 });
        const lx = 500, cw = 17 * .6;
        T("look at it ➔ /ˈlʊ-kæ-tɪt/", lx, 400, go(1), 1, { size: 17, color: C.ink, weight: 700, font: MONO });
        arc(k, lx + cw * 3.5, lx + cw * 5.5, 405, 8, C.orange, 2.5);
        arc(k, lx + cw * 6.5, lx + cw * 8.5, 405, 8, C.orange, 2.5);
        T("put it on ➔ /ˈpʊ-tɪ-tɒn/ ｜ an apple ➔ /ə-ˈnæ-pl/", 500, 424, go(1.2), 1.2, { size: 13, color: C.grey, font: MONO });
        N("", "看橙色小桥：k 粘上 a，t 粘上 i，look at it 读成一口气。");
        k.wait(1);

        N("", "最后读一读：每个词都和后面的元音粘在一起！");
        k.final("Look at it (/lʊ-kæ-tɪt/)! Pick it up (/pɪ-kɪ-tʌp/)!", [], "看它！把它捡起来！  实词重读拉长，虚词弱读成 /ə/，辅音元音粘一起。", { say: "Look at it! Pick it up!", word: "look at it" });
        N("口诀：", "重的拉长像打鼓，轻的变 /ə/ 一带过，辅音元音手拉手。");
        k.wait(1.5);
      },
      terms: [
        ["节拍", "说话时轻重快慢的规律，像音乐里的鼓点。"],
        ["音节计时语言", "每个音节（字）用力差不多、时间差不多的语言，比如汉语，像机关枪「哒哒哒」。"],
        ["重音计时语言", "重读的词又响又长，中间的小词压得很短的语言，比如英语，像打鼓「咚—嗒—咚」。"],
        ["实词", "有实在意思的词：名词、动词、形容词等，比如 swim、tea、milk。句子里一般重读。"],
        ["虚词", "帮忙连接的小词，比如 to、for、of、and、can。句子里常常弱读成 /ə/。"],
        ["懒元音 /ə/（Schwa）", "英语里最常见、最省力的元音：嘴巴放松、舌头不动，轻轻「呃」一声。"],
        ["肯定句 / 否定句", "肯定句说「会、是」：I can swim；否定句带 not，说「不会、不是」：I can't swim。"],
        ["实义动词", "表示真正动作的动词，比如 swim（游泳）。can 只是帮忙的，所以 can 轻、swim 重。"],
        ["缩读", "口语里把几个词缩成一个：want to → wanna，going to → gonna。"],
        ["连读", "前一个词以辅音结尾、后一个词以元音开头时，两个词粘在一起读：look at it → /lʊ-kæ-tɪt/。"]
      ]
    }
  ];
})();
