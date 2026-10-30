// ==================== R2 朗读覆盖检查 + R4 动作覆盖检查（验收用）====================
// 在已经载入 WB 引擎和 WB_LAB 的页面里运行（r2check.py 用 Playwright 打开主文件后注入本文件）。
// R2：抽出每一幕「画面上出现的」全部英文（白板文字 T、讲解字幕 N），逐个对照朗读登记 S.says：
//   · 每个英文词 / 词块：要「单独朗读」（出现在某句 say 的 word 里，或整句只读这个词）
//   · 每个英文词 / 词块：要「有例句」（某句 say 的英文里出现这个词；词形变化 -s/-es/-ed/-ing 算；
//     词块（带连字符的 im- / -ed，或 say({blocks:[…]}) 登记过的）出现在例句某个词里面也算）
//   · 白板上连续 ≥3 个英文词的句子：必须被某句 say 朗读（大小写、标点不计）
// R4：案例对象上的分镜动作词清单 actionWords: [{ word, act }]，逐个对照 k.act 登记（S.acts），
//   并检查动作时间和「含这个词的朗读句」有重叠（读到这个词时动作正在发生）。
// r2skip：案例对象上 r2skip: ["longth", "I want go home."]（带空格的条目按整句跳过）——画面上故意展示并划掉的错误形式（SOP §7 第 3 条：被划掉的词不读），不计入 R2；必须真的被划掉。
//   另外按常见动作动词表提示：例句里有动作动词、但分镜清单里没有的（只提示，不算不通过）。
(function (root) {
  const ACTION_VERBS = ["carry", "carries", "carried", "run", "runs", "ran", "walk", "walks", "walked", "go", "goes", "went", "come", "comes", "came",
    "take", "takes", "took", "put", "puts", "pick", "picks", "jump", "jumps", "jumped", "lift", "lifts", "hold", "holds", "show", "shows", "bring", "brings",
    "throw", "throws", "climb", "fly", "flies", "swim", "sail", "sails", "push", "pull", "wave", "waves", "turn", "turns", "sit", "stand", "read", "reads",
    "write", "writes", "open", "close", "give", "gives", "get", "gets", "import", "export", "transport", "transports", "support", "supports", "report", "reports", "move", "moves", "dance", "kick", "catch", "eat", "drink", "play", "plays"];
  const norm = w => String(w).toLowerCase().replace(/[’']/g, "'").replace(/^'+|'+$/g, "");
  const stripIPA = s => String(s).replace(/\/[^/\s][^/]{0,30}\//g, " ").replace(/\[[^\]]{0,30}\]/g, " ");
  // 英文 token：字母开头，可带撇号和连字符；前后连字符保留（im- / -ed 是词块）
  const TOK = /-?[A-Za-z][A-Za-z'’]*(?:-[A-Za-z]+)*-?/g;
  function tokens(text) {
    const out = [];
    (stripIPA(text).match(TOK) || []).forEach(raw => {
      const core = raw.replace(/^-|-$/g, "");
      if (core.replace(/[^A-Za-z]/g, "").length < 2 && !/^(a|I)$/.test(core)) return;   // 单字母（S V O 标签、音标残片）不算词
      out.push({ raw, w: norm(core), block: /^-|-$/.test(raw) });
    });
    return out;
  }
  // 白板上的英文句子：连续 ≥3 个英文词（中间只隔空格和英文标点）
  function sentences(text) {
    const out = [], re = /[A-Za-z][A-Za-z'’,.!?;:\- ]*[A-Za-z.!?]/g;
    (stripIPA(text).match(re) || []).forEach(s => { if ((s.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length >= 3) out.push(s.trim()); });
    return out;
  }
  const sentNorm = s => norm(s).replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ").trim();
  const forms = w => { const f = [w, w + "s", w + "es", w + "ed", w + "d", w + "ing", w + "'s"]; if (/y$/.test(w)) f.push(w.slice(0, -1) + "ies"); if (/e$/.test(w)) f.push(w.slice(0, -1) + "ing"); return f; };

  function scan(build, seed, skip) {
    const SKIP = new Set((skip || []).map(norm));
    const SKIP_SENT = new Set((skip || []).filter(x => /\s/.test(x)).map(sentNorm));   // r2skip 里带空格的 = 画面上故意展示的错句（如 I want go home.），整句不计
    const k = WB.kit(seed);
    build(k);
    const S = k.S, says = S.says || [];
    const shown = [];
    S.items.forEach(it => { if (it.kind === "text") shown.push({ src: "白板", text: it.text, t: it.t }); });
    (S.narr || []).forEach(n => shown.push({ src: "字幕", text: (n[1] || "") + (n[2] || ""), t: n[0] }));
    (S.extraTexts || []).forEach(x => shown.push({ src: "道具", text: x.text, t: x.t }));
    const readSet = new Set(), blockSet = new Set();
    says.forEach(sy => {
      String(sy.word || "").split(/\s+/).filter(Boolean).forEach(w => readSet.add(norm(w.replace(/^-|-$/g, ""))));
      const ws = sentNorm(sy.en).split(" ");
      if (ws.length === 1) readSet.add(ws[0]);
      (sy.blocks || []).forEach(b => blockSet.add(norm(String(b).replace(/^-|-$/g, ""))));
    });
    const sentWords = says.map(sy => sentNorm(sy.en).split(" ").filter(Boolean)).filter(ws => ws.length >= 3);
    const hasSentence = (w, block) => sentWords.some(ws => ws.some(x => forms(w).includes(x) || ((block || blockSet.has(w)) && x.includes(w))));
    const words = new Map();
    shown.forEach(sh => tokens(sh.text).forEach(tk => {
      if (SKIP.has(tk.w)) return;   // 案例 r2skip：画面上故意展示、被划掉的错误形式（SOP §7.3：不读），如 longth
      const e = words.get(tk.w) || { word: tk.w, raw: tk.raw, block: false, where: new Set() };
      e.block = e.block || tk.block || blockSet.has(tk.w); e.where.add(sh.src); words.set(tk.w, e);
    }));
    const list = [...words.values()].map(e => ({ word: e.word, raw: e.raw, block: e.block, where: [...e.where].join("+"),
      read: readSet.has(e.word), sentence: hasSentence(e.word, e.block) }));
    const saidN = says.map(sy => sentNorm(sy.en));
    // 白板上的长段落按版面断行，一行常跨两句：相邻 2–3 句朗读连起来能盖住这一行也算已朗读（朗读按顺序播放）
    for (let w = 2; w <= 3; w++) for (let i = 0; i + w <= says.length; i++) saidN.push(says.slice(i, i + w).map(sy => sentNorm(sy.en)).join(" "));
    const sents = [];
    shown.forEach(sh => sentences(sh.text).forEach(s => {
      const n = sentNorm(s).split(" ").filter(w => !SKIP.has(w)).join(" ");   // r2skip 的词（如对比符号 vs）不算进整句
      if (SKIP_SENT.has(sentNorm(s))) return;
      if (!sents.some(x => x.n === n)) sents.push({ text: s, n, where: sh.src, read: saidN.some(x => x === n || x.includes(n)) });
    }));
    return { list, sents, says: says.map(sy => ({ t: +sy.t.toFixed(2), en: sy.en, word: sy.word })), acts: (S.acts || []), S };
  }

  function r4(cs, res, forceV2) {
    const v2 = !!(forceV2 || cs.r4v2);
    const out = { declared: [], hints: [] };
    const declared = (cs.actionWords || []);
    declared.forEach(aw => {
      const w = norm(aw.word);
      const acts = res.acts.filter(a => (a.words || []).map(norm).includes(w));
      const says = res.S.says.filter(sy => sentNorm(sy.en).split(" ").some(x => forms(w).includes(x)) || String(sy.word).toLowerCase().split(/\s+/).includes(w)
        // 多词动作（短语动词，如 sit down）：整句或先读词里出现这个词组
        || (w.includes(" ") && ((" " + sentNorm(sy.en) + " ").includes(" " + w + " ") || (" " + String(sy.word).toLowerCase() + " ").includes(" " + w + " "))));
      // 同步：至少一个动作的时间段和一句含这个词的朗读重叠
      const sync = acts.some(a => says.some(sy => a.t < sy.t + sy.dur && a.t + a.dur > sy.t));
      const rec = { word: aw.word, act: aw.act, registered: acts.length > 0, acts: acts.map(a => a.action + "@" + a.t.toFixed(1)), sync };
      // R4v2（决策 30）：动作必须是这个动词的专属动作（wb_verbs.js 的 VERB_TABLE），且登记的 k.verb 动作 id 一致；讲解员手势 / 别的动作不算
      if (v2) {
        const T = (typeof WB_VERBS !== "undefined" && WB_VERBS.VERB_TABLE) || {};
        const want = T[w];
        const semOK = !want || want === aw.act;
        const vActs = acts.filter(a => a.action === "verb:" + aw.act);
        rec.v2 = { semOK, want: want || null, verbOK: vActs.length > 0, syncOK: vActs.some(a => says.some(sy => a.t < sy.t + sy.dur && a.t + a.dur > sy.t)) };
        rec.registered = rec.registered && rec.v2.verbOK && semOK; rec.sync = rec.sync && rec.v2.syncOK;
      }
      out.declared.push(rec);
    });
    if (v2 && !declared.length) out.declared.push({ word: "（空 actionWords）", act: "—", registered: false, acts: [], sync: false, v2: { empty: true } });
    const declaredW = new Set(declared.map(a => norm(a.word)));
    res.S.says.forEach(sy => sentNorm(sy.en).split(" ").forEach(x => { if (ACTION_VERBS.includes(x) && !declaredW.has(x) && !out.hints.some(h => h.word === x)) out.hints.push({ word: x, en: sy.en }); }));
    return out;
  }

  root.R2CHECK = {
    tokens, sentences,
    run(ids, forceV2) {
      const report = [];
      (ids || Object.keys(WB_LAB)).forEach(id => {
        (WB_LAB[id] || []).forEach((cs, i) => {
          let res;
          try { res = scan(cs.build, 7 + i, cs.r2skip); } catch (e) { report.push({ id, i, error: String(e) }); return; }
          const rr = r4(cs, res, forceV2);
          report.push({ id, i, says: res.says.length, words: res.list, sents: res.sents.map(({ text, where, read }) => ({ text, where, read })), r4: rr, hasActionList: !!cs.actionWords || !!(forceV2 || cs.r4v2), r4v2: !!(forceV2 || cs.r4v2) });
        });
      });
      return report;
    },
  };
})(typeof window !== "undefined" ? window : globalThis);
