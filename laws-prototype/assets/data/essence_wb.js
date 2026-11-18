/* ============================================================================
 * 英语本质交互物理动画引擎 v2（60fps HiDPI Canvas 物理剧场 · 外置按需加载）
 * 挂载全局变量 window.__MX_ESSENCE_DATA & window.__MX_ESSENCE_RENDERER
 * 不改动任何既有老白板/动画源码
 * ============================================================================ */
(function(){
"use strict";

var PAL = {
  bg: "#F5F7F0",
  grid: "#E6ECE0",
  card: "#FBFBF9",
  ink: "#2B3328",
  muted: "#646F5E",
  sage: "#5F7448",
  sageDark: "#3F512E",
  sageSoft: "#E6EFE0",
  gold: "#D6A548",
  goldDark: "#8A5A1E",
  goldSoft: "#FFF6DB",
  red: "#B85A52",
  redSoft: "#FDECEC",
  blue: "#4B749F",
  blueSoft: "#EAF2F9",
  darkStage: "#1F261D"
};

function clamp(v, a, b){ return v < a ? a : (v > b ? b : v); }
function lerp(a, b, t){ return a + (b - a) * t; }
function easeOut(t){ t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); }
function easeInOut(t){ t = clamp(t, 0, 1); return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; }
function spring(t){
  t = clamp(t, 0, 1);
  if(t === 0 || t === 1) return t;
  return Math.pow(2, -9 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
}

function rrect(ctx, x, y, w, h, r){
  r = Math.min(r || 12, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function box(ctx, x, y, w, h, fill, stroke, lw, r){
  ctx.save();
  rrect(ctx, x, y, w, h, r || 12);
  if(fill){ ctx.fillStyle = fill; ctx.fill(); }
  if(stroke){ ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2; ctx.stroke(); }
  ctx.restore();
}

function label(ctx, s, x, y, sz, col, align, weight){
  ctx.save();
  ctx.font = (weight || 700) + " " + (sz || 16) + "px 'PingFang SC','Microsoft YaHei',system-ui,sans-serif";
  ctx.fillStyle = col || PAL.ink;
  ctx.textAlign = align || "center";
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
  ctx.restore();
}

function chip(ctx, x, y, w, h, text, bg, bd, col, sz){
  box(ctx, x, y, w, h, bg, bd, 2, 12);
  label(ctx, text, x + w / 2, y + h / 2 + 1, sz || 16, col || PAL.ink, "center", 800);
}

function drawGridBg(ctx, W, H){
  ctx.fillStyle = PAL.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = PAL.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for(var x = 28; x < W; x += 28){ ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for(var y = 28; y < H; y += 28){ ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();
}

function drawParticles(ctx, list, color){
  ctx.save();
  for(var i = 0; i < list.length; i++){
    var p = list[i];
    ctx.globalAlpha = clamp(p.a, 0, 1);
    ctx.fillStyle = p.c || color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ============================================================================
// 剧目 1：英文钢架桥（物理坍塌、降落伞空投、谓语王座与工作服）
// ============================================================================
function renderBridge(ctx, W, H, step, t, state){
  drawGridBg(ctx, W, H);
  // Water channel at bottom
  var wy = 248;
  ctx.save();
  ctx.fillStyle = "#DCE9EE";
  ctx.fillRect(0, wy, W, H - wy);
  ctx.strokeStyle = "#8DB3C4";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for(var wx = 0; wx <= W; wx += 14){
    var yy = wy + Math.sin(wx * 0.045 + t * 2.4) * 3;
    if(wx === 0) ctx.moveTo(wx, yy); else ctx.lineTo(wx, yy);
  }
  ctx.stroke();
  ctx.restore();

  if(step === 0){
    // Split compare: Left smooth Chinese bamboo raft vs Right collapsing English bridge
    box(ctx, 18, 16, 260, 224, PAL.card, "#CFD9C4", 1.5, 14);
    label(ctx, "中文：竹筏顺水漂走", 148, 38, 15, PAL.sageDark);
    var rx = 148 + Math.sin(t * 1.6) * 16;
    var ry = 176 + Math.sin(t * 2.8) * 3;
    // Bamboo logs floating smoothly
    for(var b = -2; b <= 2; b++){
      box(ctx, rx - 66, ry + b * 5, 132, 8, "#C7B284", "#8F7B4E", 1.2, 4);
    }
    chip(ctx, rx - 78, ry - 64, 156, 38, "「下雨了！」", PAL.sageSoft, PAL.sage, PAL.sageDark, 15);
    chip(ctx, rx - 78, ry - 110, 156, 38, "「我很高兴！」", PAL.sageSoft, PAL.sage, PAL.sageDark, 15);
    label(ctx, "不用主语 / 不用动词都能漂", 148, 222, 12.5, PAL.muted, "center", 600);

    // Right: English steel bridge missing pillar -> tilts and falls cyclically!
    box(ctx, 294, 16, 270, 224, "#FFF8F6", "#E5C1BA", 1.5, 14);
    label(ctx, "英语：没有左桥墩直接塌桥！", 429, 38, 15, PAL.red);
    var cyc = (t * 0.42) % 1; // 0..1 collapse loop
    var tilt = cyc < 0.35 ? 0 : (cyc < 0.7 ? easeOut((cyc - 0.35) / 0.35) * 0.34 : 0.34 * (1 - easeOut((cyc - 0.7) / 0.3)));
    var dropY = cyc < 0.35 ? 0 : (cyc < 0.7 ? easeOut((cyc - 0.35) / 0.35) * 36 : 36 * (1 - easeOut((cyc - 0.7) / 0.3)));

    // Missing left pillar outline flashing red
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = PAL.red;
    ctx.lineWidth = 2;
    rrect(ctx, 316, 144, 62, 82, 8);
    ctx.stroke();
    label(ctx, "缺主语!", 347, 185, 13, PAL.red);
    ctx.restore();
    // Right abutment
    box(ctx, 488, 150, 56, 76, "#DCE2D5", "#8B9584", 1.5, 6);

    // Collapsing steel beam pivoted around right support
    ctx.save();
    ctx.translate(500, 148 + dropY * 0.25);
    ctx.rotate(-tilt);
    box(ctx, -184, -18, 190, 16, "#F4CCCC", PAL.red, 2, 4);
    chip(ctx, -166, -66, 156, 40, "❌  Is raining!", PAL.redSoft, PAL.red, PAL.red, 16);
    ctx.restore();

    if(cyc > 0.45 && cyc < 0.78){
      var splash = [];
      for(var sp = 0; sp < 8; sp++){
        var ang = -Math.PI * (0.2 + 0.6 * (sp / 7));
        var dist = (cyc - 0.45) * 90;
        splash.push({ x: 350 + Math.cos(ang) * dist, y: 238 + Math.sin(ang) * dist * 0.6, r: 3.5, a: 1 - (cyc - 0.45) * 3, c: "#6CA0B8" });
      }
      drawParticles(ctx, splash);
    }
    label(ctx, "直译 Raining! / I happy! 会当场断裂", 429, 224, 12.5, PAL.red, "center", 700);
    return;
  }

  if(step === 1){
    // Animated parachute drop of "It" + Throne crown + "-ing" vest
    var p1 = easeOut(clamp(t / 1.4, 0, 1));        // It parachutes down
    var p2 = easeOut(clamp((t - 1.3) / 1.0, 0, 1)); // Steel beam locks
    var p3 = easeOut(clamp((t - 2.3) / 1.2, 0, 1)); // Second verb tries throne -> gets -ing vest

    label(ctx, "英文钢架施工：空投替身 It + 一句只坐一位谓语国王", 290, 26, 15.5, PAL.sageDark, "center", 800);

    // Left Pillar
    box(ctx, 44, 154, 134, 92, PAL.sageSoft, PAL.sage, 2, 10);
    label(ctx, "① 主语左桥墩", 111, 228, 12.5, PAL.sageDark);
    // Parachute It falling smoothly
    var itY = lerp(52, 156, p1);
    var itSway = Math.sin(t * 4) * (1 - p1) * 14;
    if(p1 < 0.98){
      ctx.save();
      ctx.strokeStyle = PAL.goldDark; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(111 + itSway, itY - 22, 22, Math.PI, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(89 + itSway, itY - 22); ctx.lineTo(106, itY);
      ctx.moveTo(133 + itSway, itY - 22); ctx.lineTo(116, itY); ctx.stroke();
      ctx.restore();
    }
    chip(ctx, 64 + itSway * (1 - p1), itY, 94, 44, "It", PAL.goldSoft, PAL.gold, PAL.goldDark, 20);

    // Center Throne
    box(ctx, 212, 144, 156, 102, PAL.goldSoft, PAL.gold, 2.2, 12);
    label(ctx, "② 唯一谓语王座", 290, 228, 12.5, PAL.goldDark);
    chip(ctx, 226, 156, 128, 44, "👑 is / enjoy", PAL.sage, PAL.sageDark, "#FFF", 16);

    // Right Vest Car
    box(ctx, 402, 154, 144, 92, PAL.blueSoft, PAL.blue, 2, 10);
    label(ctx, "③ 穿工作服 (-ing)", 474, 228, 12.5, PAL.blue);
    // Bouncing verb trying to jump on center throne, then landing in right vest!
    var vx = lerp(290, 474, p3);
    var vy = 94 - Math.sin(p3 * Math.PI) * 32 + p3 * 62;
    chip(ctx, vx - 62, vy, 124, 44, p3 > 0.55 ? "swimming 🦺" : "swim?", "#FFF", p3 > 0.55 ? PAL.blue : PAL.red, p3 > 0.55 ? PAL.blue : PAL.red, 15);

    // Steel truss locking across top once p1 > 0.9
    ctx.save();
    ctx.strokeStyle = PAL.sageDark;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(46, 138);
    ctx.lineTo(lerp(46, 544, p2), 138);
    ctx.stroke();
    ctx.restore();
    if(p2 > 0.85){
      label(ctx, "⚡ 钢架全线锁死通车！It is raining.  /  I enjoy swimming.", 290, 74, 15, PAL.sageDark, "center", 800);
    }
    return;
  }

  if(step === 2){
    // Interactive Physics Playground!
    var hasIt = !!state.it;
    var hasVest = !!state.vest;
    var ok = hasIt && hasVest;
    var wobble = ok ? 0 : Math.sin(t * 7) * 0.045;
    var sink = ok ? 0 : 18 + Math.abs(Math.sin(t * 3.5)) * 10;

    label(ctx, "🎛️ 物理搭桥实验台：撤掉任何零件，钢架立刻失去平衡", 290, 26, 15, ok ? PAL.sageDark : PAL.red, "center", 800);

    // Left pillar
    if(hasIt){
      box(ctx, 38, 152, 136, 92, PAL.sageSoft, PAL.sage, 2.2, 10);
      chip(ctx, 56, 162, 100, 44, "It ✅", PAL.goldSoft, PAL.gold, PAL.goldDark, 18);
      label(ctx, "左桥墩已锁定", 106, 224, 12, PAL.sageDark);
    } else {
      ctx.save(); ctx.setLineDash([6, 4]); ctx.strokeStyle = PAL.red; ctx.lineWidth = 2.2;
      rrect(ctx, 38, 152, 136, 92, 10); ctx.stroke(); ctx.restore();
      label(ctx, "❌ 左墩悬空！", 106, 198, 14, PAL.red);
    }

    // Center throne + Right car (animated beam)
    ctx.save();
    ctx.translate(290, 146 + sink);
    ctx.rotate(wobble);
    box(ctx, -248, -12, 496, 14, ok ? PAL.sage : PAL.red, ok ? PAL.sageDark : PAL.red, 2, 6);
    chip(ctx, -96, 14, 152, 46, "👑 is / enjoy", PAL.sage, PAL.sageDark, "#FFF", 16);
    chip(ctx, 76, 14, 164, 46, hasVest ? "swimming 🦺 ✅" : "❌ swim (撞王座!)", hasVest ? PAL.blueSoft : PAL.redSoft, hasVest ? PAL.blue : PAL.red, hasVest ? PAL.blue : PAL.red, 14.5);
    ctx.restore();

    var sent = (hasIt ? "It is raining." : "*Is raining.") + "   |   " + (hasVest ? "I enjoy swimming." : "*I enjoy swim.");
    box(ctx, 34, 62, 512, 44, ok ? "#EEF4E6" : "#FDECEC", ok ? PAL.sage : PAL.red, 2, 12);
    label(ctx, sent, 290, 84, 16, ok ? PAL.sageDark : PAL.red, "center", 800);
    return;
  }

  // step === 3: Transfer gallery
  label(ctx, "记住这幅钢架画面，一理通百理", 290, 28, 16, PAL.sageDark, "center", 800);
  var rows = [
    ["天气/时间必派 It 占左墩：", "It is raining outside.", "#EBF4E4", PAL.sage],
    ["状态句必须请 be 坐王座：", "It is sunny today.", "#FFF8E6", PAL.gold],
    ["第二个动作必须穿工作服：", "I enjoy reading books.", "#EAF2F9", PAL.blue]
  ];
  for(var i = 0; i < rows.length; i++){
    var py = 56 + i * 62;
    var slide = easeOut(clamp((t - i * 0.22) / 0.55, 0, 1));
    ctx.save();
    ctx.globalAlpha = slide;
    box(ctx, 30 + (1 - slide) * 28, py, 520, 50, rows[i][2], rows[i][3], 1.8, 12);
    label(ctx, rows[i][0], 48 + (1 - slide) * 28, py + 25, 13.5, PAL.muted, "left", 700);
    label(ctx, rows[i][1], 530 + (1 - slide) * 28, py + 25, 16.5, PAL.ink, "right", 800);
    ctx.restore();
  }
}

// ============================================================================
// 剧目 2：didn't 磁铁（能量守恒、排斥火花与字母齿轮退回原形）
// ============================================================================
function renderMagnet(ctx, W, H, step, t, state){
  drawGridBg(ctx, W, H);
  if(step === 0){
    label(ctx, "❌ 能量过载！一句话同时挂了两颗 PAST 核心", 290, 28, 16, PAL.red, "center", 800);
    var rep = Math.sin(t * 10) * 4;
    chip(ctx, 40, 126, 86, 48, "She", PAL.card, "#CFD9C4", PAL.ink, 17);
    chip(ctx, 140 + rep, 126, 130, 48, "didn't", PAL.redSoft, PAL.red, PAL.red, 18);
    chip(ctx, 294 - rep, 126, 122, 48, "went", PAL.redSoft, PAL.red, PAL.red, 18);
    chip(ctx, 430, 126, 110, 48, "home.", PAL.card, "#CFD9C4", PAL.ink, 17);

    // Two blazing red PAST cores colliding with electric arc
    box(ctx, 166 + rep, 74, 78, 32, "#D6A548", PAL.red, 2, 16);
    label(ctx, "⚡ PAST", 205 + rep, 90, 13, "#FFF");
    box(ctx, 316 - rep, 74, 78, 32, "#D6A548", PAL.red, 2, 16);
    label(ctx, "⚡ PAST", 355 - rep, 90, 13, "#FFF");

    // Sparks at collision midpoint
    var sp = [];
    for(var i = 0; i < 10; i++){
      var a = (t * 4 + i * 0.62) % (Math.PI * 2);
      var r = 8 + ((t * 45 + i * 7) % 24);
      sp.push({ x: 280 + Math.cos(a) * r, y: 90 + Math.sin(a) * r * 0.7, r: 2.8, a: 1 - r / 34, c: i % 2 ? "#D6A548" : "#B85A52" });
    }
    drawParticles(ctx, sp);
    box(ctx, 64, 206, 452, 54, "#FFF2F0", PAL.red, 1.8, 12);
    label(ctx, "规则：一句只能发 1 颗「过去」或「三单」核心！", 290, 233, 15, PAL.red, "center", 800);
    return;
  }

  if(step === 1){
    // Magnetic pull animation over 3.6s loop
    var cyc = clamp((t % 4.5) / 2.6, 0, 1);
    var arcT = easeInOut(clamp((cyc - 0.15) / 0.6, 0, 1));
    var flipped = cyc > 0.68;

    label(ctx, "🧲 didn't 保镖伸出磁铁，把 went 的 PAST 核心直接吸走！", 290, 28, 15.5, PAL.sageDark, "center", 800);
    chip(ctx, 42, 146, 84, 50, "She", PAL.card, "#CFD9C4", PAL.ink, 17);
    chip(ctx, 140, 146, 134, 50, "didn't 🧲", PAL.goldSoft, PAL.gold, PAL.goldDark, 18);
    // Morphing word box
    var wordScale = flipped ? spring(clamp((cyc - 0.68) / 0.25, 0, 1)) : 1;
    ctx.save();
    ctx.translate(358, 171);
    ctx.scale(0.92 + 0.08 * wordScale, 0.92 + 0.08 * wordScale);
    chip(ctx, -64, -25, 128, 50, flipped ? "go ✅" : "went", flipped ? PAL.sageSoft : PAL.goldSoft, flipped ? PAL.sage : PAL.gold, flipped ? PAL.sageDark : PAL.goldDark, 20);
    ctx.restore();
    chip(ctx, 438, 146, 102, 50, "home.", PAL.card, "#CFD9C4", PAL.ink, 17);

    // Parabolic flight of PAST badge from x=358 -> x=207
    var bx = lerp(358, 207, arcT);
    var by = lerp(112, 112, arcT) - Math.sin(arcT * Math.PI) * 46;
    if(arcT > 0.05 && arcT < 0.95){
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = PAL.gold;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(358, 112); ctx.quadraticCurveTo(282, 46, 207, 112); ctx.stroke();
      ctx.restore();
    }
    box(ctx, bx - 44, by - 16, 88, 32, PAL.sage, PAL.sageDark, 2, 16);
    label(ctx, "⏳ PAST", bx, by + 1, 13.5, "#FFF");
    label(ctx, flipped ? "失去过去徽章后，went 齿轮自动倒转回原形 go！" : "磁力正在抽离 went 身上的过去标记…", 290, 240, 14.5, PAL.sageDark, "center", 700);
    return;
  }

  if(step === 2){
    var neg = !!state.neg, doesOn = !!state.does;
    label(ctx, "🎛️ 磁铁实验室：开关保镖，观察动词徽章瞬间转移", 290, 28, 15.5, PAL.sageDark, "center", 800);

    // Row 1: Past
    box(ctx, 28, 56, 524, 92, neg ? PAL.sageSoft : PAL.goldSoft, neg ? PAL.sage : PAL.gold, 2, 14);
    label(ctx, neg ? "🧲 didn't 已吸走 PAST 徽章" : "无助动词：PAST 贴在 went 上", 48, 78, 13, neg ? PAL.sageDark : PAL.goldDark, "left", 700);
    label(ctx, neg ? "She  didn't  go  home." : "She  went  home.", 290, 114, 21, PAL.ink, "center", 800);
    box(ctx, neg ? 236 : 272, 64, 72, 24, neg ? PAL.sage : PAL.goldDark, "#FFF", 1.2, 12);
    label(ctx, "PAST", neg ? 272 : 308, 76, 11.5, "#FFF");

    // Row 2: 3rd Person Singular
    box(ctx, 28, 164, 524, 92, doesOn ? PAL.sageSoft : PAL.goldSoft, doesOn ? PAL.sage : PAL.gold, 2, 14);
    label(ctx, doesOn ? "🧲 doesn't 已吸走三单 -s" : "无助动词：三单 -s 挂在 likes 上", 48, 186, 13, doesOn ? PAL.sageDark : PAL.goldDark, "left", 700);
    label(ctx, doesOn ? "He  doesn't  like  milk." : "He  likes  milk.", 290, 222, 21, PAL.ink, "center", 800);
    box(ctx, doesOn ? 232 : 284, 172, 68, 24, doesOn ? PAL.sage : PAL.goldDark, "#FFF", 1.2, 12);
    label(ctx, "三单 -s", doesOn ? 266 : 318, 184, 11.5, "#FFF");
    return;
  }

  label(ctx, "助动词只要一出场，动作词一律还原最初模样！", 290, 28, 16, PAL.sageDark, "center", 800);
  var rows2 = [
    ["否定过去 → didn't 扛 PAST：", "She didn't go home.", "#EEF4E8", PAL.sage],
    ["提问过去 → Did 扛 PAST：", "Did you see the cat?", "#FFF8E6", PAL.gold],
    ["三单否定 → doesn't 扛 -s：", "He doesn't like lemons.", "#EAF2F9", PAL.blue]
  ];
  for(var j = 0; j < rows2.length; j++){
    var yy2 = 60 + j * 64;
    box(ctx, 30, yy2, 520, 52, rows2[j][2], rows2[j][3], 1.8, 12);
    label(ctx, rows2[j][0], 48, yy2 + 26, 13.5, PAL.muted, "left", 700);
    label(ctx, rows2[j][1], 530, yy2 + 26, 16.5, PAL.ink, "right", 800);
  }
}

// ============================================================================
// 剧目 3：脑内边界框 & 探照灯（真粒子流体 + 刀切物理 + 暗场舞台光锥）
// ============================================================================
function renderBoundary(ctx, W, H, step, t, state){
  if(step === 0){
    drawGridBg(ctx, W, H);
    label(ctx, "为什么语法书说 coffee 不可数，店里却喊 Two coffees？", 290, 26, 15, PAL.sageDark, "center", 800);
    // Left pouring coffee fluid particles into unbounded pool
    box(ctx, 20, 48, 256, 228, "#FFFBF0", "#E2CCA3", 1.6, 14);
    label(ctx, "没有边界框 = 一大片流体", 148, 70, 14, PAL.goldDark);
    // Animated pouring droplets
    var drops = [];
    for(var d = 0; d < 18; d++){
      var dt = ((t * 1.4 + d * 0.14) % 1);
      drops.push({ x: 148 + Math.sin(d * 2.7) * (8 + dt * 52), y: 92 + dt * 110, r: 4 + (d % 3), a: 0.75, c: "#8C5A32" });
    }
    drawParticles(ctx, drops);
    // Puddle
    ctx.save(); ctx.fillStyle = "rgba(140,90,50,0.35)";
    ctx.beginPath(); ctx.ellipse(148, 206, 74, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    label(ctx, "coffee   (∞ 数不出个数)", 148, 248, 15, PAL.goldDark, "center", 800);

    // Right: Two glowing bounding cups snap around liquid -> count 1, 2 + sprout -s!
    box(ctx, 294, 48, 270, 228, "#F2F7EE", PAL.sage, 1.8, 14);
    label(ctx, "放进杯框 = 有边界，立刻能数！", 429, 70, 14, PAL.sageDark);
    var cupDrop = spring(clamp((t % 3.4) / 0.9, 0, 1));
    var cy = lerp(80, 114, cupDrop);
    for(var c = 0; c < 2; c++){
      var cx = 336 + c * 104;
      box(ctx, cx, cy, 80, 92, "#FFFDF9", PAL.sage, 2.5, 10);
      box(ctx, cx + 8, cy + 30, 64, 54, "rgba(140,90,50,0.65)", null, 0, 6);
      ctx.beginPath(); ctx.arc(cx + 40, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = PAL.sage; ctx.fill();
      label(ctx, String(c + 1), cx + 40, cy + 1, 14, "#FFF");
    }
    label(ctx, "Two coffee + s  →  Two coffees!", 429, 248, 15.5, PAL.sageDark, "center", 800);
    return;
  }

  if(step === 1){
    // Top-half split: Left knife-cut test, Right dark stage spotlight on "the dog"
    drawGridBg(ctx, W, H);
    // Knife test panel
    box(ctx, 18, 20, 260, 258, PAL.card, "#CFD9C4", 1.5, 14);
    label(ctx, "🔬 一刀切边界透视", 148, 44, 15, PAL.sageDark, "center", 800);
    var cut = easeOut(clamp((t % 3.2) / 0.9, 0, 1));
    var split = cut * 18;
    // Apple halves
    ctx.save();
    ctx.fillStyle = "#C94B43";
    ctx.beginPath(); ctx.arc(92 - split, 110, 24, Math.PI * 0.5, Math.PI * 1.5); ctx.fill();
    ctx.beginPath(); ctx.arc(96 + split, 110, 24, -Math.PI * 0.5, Math.PI * 0.5); ctx.fill();
    ctx.restore();
    label(ctx, "苹果切开 ≠ 一个苹果", 198, 102, 13, PAL.sageDark, "center", 700);
    label(ctx, "→ 有整体边界 (an apple)", 198, 122, 12.5, PAL.sage, "center", 800);

    // Bread slices (still bread!)
    box(ctx, 64 - split * 0.6, 174, 34, 38, "#E3B873", "#9C7338", 1.5, 6);
    box(ctx, 100 + split * 0.6, 174, 34, 38, "#E3B873", "#9C7338", 1.5, 6);
    label(ctx, "面包切开 = 还是面包!", 198, 184, 13, PAL.goldDark, "center", 700);
    label(ctx, "→ 无边界 (a piece of bread)", 198, 204, 12.5, PAL.goldDark, "center", 800);
    label(ctx, "口诀：一刀下去还是它 → 不可数", 148, 248, 12.5, PAL.muted);

    // Dark theater stage with sweeping spotlight for a vs the
    box(ctx, 294, 20, 270, 258, PAL.darkStage, PAL.sageDark, 2, 14);
    label(ctx, "🔦 黑夜舞台：a vs the", 429, 44, 15, "#E6F0DA", "center", 800);
    var sweep = Math.sin(t * 1.4) * 0.35;
    var targetX = 429 + Math.sin(t * 1.1) * 52;
    ctx.save();
    var grad = ctx.createLinearGradient(429, 64, 429, 224);
    grad.addColorStop(0, "rgba(255,244,178,0.48)");
    grad.addColorStop(1, "rgba(255,244,178,0.06)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(429, 64);
    ctx.lineTo(targetX - 44, 214);
    ctx.lineTo(targetX + 44, 214);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    var dogs = [346, 429, 512];
    for(var k = 0; k < dogs.length; k++){
      var lit = Math.abs(dogs[k] - targetX) < 34;
      ctx.beginPath(); ctx.arc(dogs[k], 186, lit ? 26 : 20, 0, Math.PI * 2);
      ctx.fillStyle = lit ? "#FFF3C4" : "#374034";
      ctx.fill();
      if(lit){ ctx.strokeStyle = PAL.gold; ctx.lineWidth = 2.5; ctx.stroke(); }
      label(ctx, lit ? "the dog!" : "dog", dogs[k], 186, lit ? 13 : 11.5, lit ? PAL.goldDark : "#8F9A88");
    }
    label(ctx, "a 任挑一只  |  the 探照灯锁死这一只", 429, 248, 12.5, "#DCE8CE", "center", 700);
    return;
  }

  if(step === 2){
    drawGridBg(ctx, W, H);
    var cupOn = !!state.cup, spotOn = !!state.spot;
    label(ctx, "🎛️ 边界容器 & 舞台打灯实验", 290, 28, 15.5, PAL.sageDark, "center", 800);

    // Left: fluid vs bowls
    box(ctx, 26, 56, 252, 200, cupOn ? PAL.sageSoft : PAL.goldSoft, cupOn ? PAL.sage : PAL.gold, 2, 14);
    if(cupOn){
      for(var b = 0; b < 2; b++){
        var bx2 = 66 + b * 96;
        ctx.beginPath(); ctx.arc(bx2 + 38, 134, 34, 0, Math.PI, false);
        ctx.fillStyle = "#FFFDF9"; ctx.fill(); ctx.strokeStyle = PAL.sageDark; ctx.lineWidth = 2.2; ctx.stroke();
        label(ctx, String(b + 1), bx2 + 38, 148, 14, PAL.sageDark);
      }
      label(ctx, "✅ two bowls of rice", 152, 204, 17, PAL.sageDark, "center", 800);
      label(ctx, "-s 稳稳加在容器 bowl 上！", 152, 232, 12.5, PAL.sage);
    } else {
      var spill = [];
      for(var s = 0; s < 16; s++) spill.push({ x: 74 + (s * 17) % 156, y: 112 + (s * 23) % 58, r: 4, a: 0.75, c: "#FFF" });
      drawParticles(ctx, spill);
      label(ctx, "∞ some rice (散装无边界)", 152, 204, 16, PAL.goldDark, "center", 800);
      label(ctx, "没有量词容器框，不能说 *rices", 152, 232, 12.5, PAL.goldDark);
    }

    // Right: Spotlight stage
    box(ctx, 302, 56, 254, 200, spotOn ? PAL.darkStage : "#EFF3EB", spotOn ? PAL.gold : "#9BB08C", 2, 14);
    if(spotOn){
      ctx.save(); ctx.fillStyle = "rgba(255,244,178,0.32)";
      ctx.beginPath(); ctx.moveTo(429, 64); ctx.lineTo(356, 186); ctx.lineTo(502, 186); ctx.closePath(); ctx.fill(); ctx.restore();
      ctx.beginPath(); ctx.arc(429, 144, 30, 0, Math.PI * 2); ctx.fillStyle = "#FFF3C4"; ctx.fill();
      label(ctx, "这只猫", 429, 145, 13, PAL.goldDark);
      label(ctx, "🔦 ✅ the cat on the chair", 429, 204, 15.5, "#FFF3C4", "center", 800);
      label(ctx, "探照灯精准点亮双方都认识的那只", 429, 232, 12, "#DCE8CE");
    } else {
      ctx.beginPath(); ctx.arc(366, 142, 20, 0, Math.PI * 2); ctx.fillStyle = "#D4DDD0"; ctx.fill();
      ctx.beginPath(); ctx.arc(429, 142, 20, 0, Math.PI * 2); ctx.fillStyle = "#C3D0BC"; ctx.fill();
      ctx.beginPath(); ctx.arc(492, 142, 20, 0, Math.PI * 2); ctx.fillStyle = "#D4DDD0"; ctx.fill();
      label(ctx, "🐱 a cat (只管物种，哪只都行)", 429, 204, 14.5, PAL.ink, "center", 800);
      label(ctx, "还没开灯定位，先用 a！", 429, 232, 12.5, PAL.muted);
    }
    return;
  }

  drawGridBg(ctx, W, H);
  label(ctx, "边界框数单位 + 探照灯锁唯一，三句全记牢", 290, 28, 16, PAL.sageDark, "center", 800);
  var rows3 = [
    ["液/粉借容器框计数：", "Two glasses of water, please.", "#EEF4E8", PAL.sage],
    ["先用 a 引出，再用 the 照亮：", "I see a bird. The bird is blue.", "#FFF8E6", PAL.gold],
    ["独一无二直接打探照灯：", "Look at the moon in the sky.", "#EAF2F9", PAL.blue]
  ];
  for(var m = 0; m < rows3.length; m++){
    var ym = 60 + m * 64;
    box(ctx, 26, ym, 528, 52, rows3[m][2], rows3[m][3], 1.8, 12);
    label(ctx, rows3[m][0], 42, ym + 26, 13, PAL.muted, "left", 700);
    label(ctx, rows3[m][1], 538, ym + 26, 15.5, PAL.ink, "right", 800);
  }
}

// ============================================================================
// 剧目 4：三维空间场（3D 透视变焦：立体盒 in → 支撑面 on → 坐标点 at & 电流开关）
// ============================================================================
function renderSpace(ctx, W, H, step, t, state){
  drawGridBg(ctx, W, H);
  if(step === 0){
    label(ctx, "❌ 中文一个「在 / 开」字全包，英语只看真实物理动作！", 290, 26, 15, PAL.red, "center", 800);
    var bad = [
      ["开灯 → open the light ?", "按掀门扇写电闸，老外看懵！", "拧电闸：turn on the light ✅"],
      ["在桌上 → in the desk ?", "桌肚抽屉里面才用 in！", "贴在桌面：on the desk ✅"],
      ["坐公交 → in the bus ?", "大车平地站得住，不缩盒里！", "站大平面：on the bus ✅"]
    ];
    for(var i = 0; i < bad.length; i++){
      var yy = 54 + i * 72;
      box(ctx, 24, yy, 244, 58, PAL.redSoft, PAL.red, 1.6, 12);
      label(ctx, bad[i][0], 146, yy + 21, 14.5, PAL.red, "center", 800);
      label(ctx, bad[i][1], 146, yy + 43, 12, PAL.muted);
      label(ctx, "→", 282, yy + 29, 20, PAL.sageDark);
      box(ctx, 296, yy, 260, 58, PAL.sageSoft, PAL.sage, 1.8, 12);
      label(ctx, bad[i][2], 426, yy + 30, 14.5, PAL.sageDark, "center", 800);
    }
    return;
  }

  if(step === 1){
    // Animated 3D Isometric Morph: morph factor smoothly shows Box -> Plane -> Pinpoint, plus live electrical switch circuit!
    label(ctx, "三维透视切镜头：盒 in  ↔  表面 on  ↔  坐标点 at", 290, 26, 15.5, PAL.sageDark, "center", 800);

    // 1) 3D Isometric Cube (IN)
    ctx.save();
    ctx.translate(104, 142);
    var bob = Math.sin(t * 3) * 5;
    // Back/sides of translucent box
    ctx.fillStyle = "rgba(95,116,72,0.16)"; ctx.strokeStyle = PAL.sageDark; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-48, -26); ctx.lineTo(0, -48); ctx.lineTo(48, -26); ctx.lineTo(48, 34); ctx.lineTo(0, 56); ctx.lineTo(-48, 34); ctx.closePath(); ctx.fill(); ctx.stroke();
    // Glowing core INSIDE box
    ctx.beginPath(); ctx.arc(0, 6 + bob, 18, 0, Math.PI * 2); ctx.fillStyle = PAL.gold; ctx.fill();
    label(ctx, "IN", 0, 7 + bob, 13, "#FFF");
    // Front wireframe edges
    ctx.beginPath(); ctx.moveTo(-48, -26); ctx.lineTo(0, -4); ctx.lineTo(48, -26); ctx.moveTo(0, -4); ctx.lineTo(0, 56); ctx.stroke();
    ctx.restore();
    label(ctx, "in = 被墙围住的立体盒", 104, 224, 13, PAL.sageDark);
    label(ctx, "in the car / in the box", 104, 246, 12.5, PAL.muted);

    // 2) 3D Flat Isometric Surface (ON)
    ctx.save();
    ctx.translate(290, 148);
    ctx.fillStyle = PAL.sageSoft; ctx.strokeStyle = PAL.sageDark; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(-58, 16); ctx.lineTo(0, -10); ctx.lineTo(58, 16); ctx.lineTo(0, 42); ctx.closePath(); ctx.fill(); ctx.stroke();
    var bounce = Math.abs(Math.sin(t * 2.5)) * 4;
    ctx.beginPath(); ctx.arc(0, -6 - bounce, 18, 0, Math.PI * 2); ctx.fillStyle = PAL.sage; ctx.fill();
    label(ctx, "ON", 0, -5 - bounce, 12.5, "#FFF");
    ctx.restore();
    label(ctx, "on = 压在支撑面上", 290, 224, 13, PAL.sageDark);
    label(ctx, "on the desk / on the bus", 290, 246, 12.5, PAL.muted);

    // 3) Laser Pinpoint (AT)
    ctx.save();
    ctx.translate(476, 148);
    var ring = 14 + ((t * 26) % 24);
    ctx.strokeStyle = PAL.red; ctx.globalAlpha = 1 - (ring - 14) / 26; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, 22, ring * 1.3, ring * 0.6, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = PAL.red;
    ctx.beginPath(); ctx.arc(0, 22, 6, 0, Math.PI * 2); ctx.fill();
    // Laser pin descending
    ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(0, -46 + Math.sin(t * 4) * 4); ctx.lineTo(0, 12); ctx.stroke();
    label(ctx, "AT", 0, -58, 14, PAL.red);
    ctx.restore();
    label(ctx, "at = 精准钉一点", 476, 224, 13, PAL.red);
    label(ctx, "at the door / at 7:00", 476, 246, 12.5, PAL.muted);
    return;
  }

  if(step === 2){
    var loc = state.loc || "in";
    var lamp = !!state.lamp;
    label(ctx, "🎛️ 空间视角 & 电闸回路实验室", 290, 26, 15.5, PAL.sageDark, "center", 800);

    // Left interactive 3D Spatial Morph
    box(ctx, 24, 52, 256, 206, PAL.card, PAL.sage, 2, 14);
    ctx.save();
    ctx.translate(152, 136);
    if(loc === "in"){
      ctx.fillStyle = "rgba(95,116,72,0.18)"; ctx.strokeStyle = PAL.sageDark; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(-54, -26); ctx.lineTo(0, -50); ctx.lineTo(54, -26); ctx.lineTo(54, 34); ctx.lineTo(0, 58); ctx.lineTo(-54, 34); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 6 + Math.sin(t * 3) * 4, 20, 0, Math.PI * 2); ctx.fillStyle = PAL.gold; ctx.fill();
      label(ctx, "IN", 0, 7 + Math.sin(t * 3) * 4, 13, "#FFF");
    } else if(loc === "on"){
      ctx.fillStyle = PAL.sageSoft; ctx.strokeStyle = PAL.sageDark; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(-66, 12); ctx.lineTo(0, -16); ctx.lineTo(66, 12); ctx.lineTo(0, 40); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, -10, 20, 0, Math.PI * 2); ctx.fillStyle = PAL.sage; ctx.fill();
      label(ctx, "ON", 0, -9, 13, "#FFF");
    } else {
      ctx.strokeStyle = PAL.red; ctx.lineWidth = 2;
      var rr = 14 + ((t * 28) % 24);
      ctx.globalAlpha = 1 - (rr - 14) / 26;
      ctx.beginPath(); ctx.ellipse(0, 24, rr * 1.4, rr * 0.65, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = PAL.red; ctx.beginPath(); ctx.arc(0, 24, 7, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -34); ctx.lineTo(0, 12); ctx.stroke();
      label(ctx, "AT", 0, -48, 15, PAL.red);
    }
    ctx.restore();
    label(ctx, loc === "in" ? "📦 in the box（四面围住）" : (loc === "on" ? "📏 on the desk（贴合表面）" : "📍 at the door（精确坐标点）"), 152, 232, 13.5, loc === "at" ? PAL.red : PAL.sageDark, "center", 800);

    // Right interactive live Electrical Circuit Switch (turn on vs turn off)
    box(ctx, 298, 52, 262, 206, lamp ? "#FFFBEB" : "#EDEFEA", lamp ? PAL.gold : "#B4BFA9", 2.2, 14);
    // Glowing halo when on
    if(lamp){
      ctx.save();
      var glow = ctx.createRadialGradient(429, 118, 6, 429, 118, 68);
      glow.addColorStop(0, "rgba(255,214,72,0.55)");
      glow.addColorStop(1, "rgba(255,214,72,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(429, 118, 68, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    // Wire & switch arm
    ctx.save();
    ctx.strokeStyle = lamp ? PAL.goldDark : "#7D8776";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(334, 174); ctx.lineTo(392, 174);
    if(lamp){ ctx.lineTo(444, 174); } else { ctx.lineTo(434, 152); }
    ctx.moveTo(444, 174); ctx.lineTo(524, 174);
    ctx.stroke();
    ctx.restore();
    // Bulb
    ctx.beginPath(); ctx.arc(429, 116, 26, 0, Math.PI * 2);
    ctx.fillStyle = lamp ? "#FFE57F" : "#D5DAD0"; ctx.fill();
    ctx.strokeStyle = lamp ? PAL.goldDark : "#8F9988"; ctx.lineWidth = 2; ctx.stroke();
    label(ctx, lamp ? "亮" : "灭", 429, 117, 15, lamp ? PAL.goldDark : "#5D6557");
    label(ctx, lamp ? "✅ turn on（接通接触！）" : "🔌 turn off（物理断开！）", 429, 208, 14.5, lamp ? PAL.goldDark : PAL.muted, "center", 800);
    label(ctx, "（掀开门/书才用 open）", 429, 232, 12.5, PAL.muted);
    return;
  }

  label(ctx, "空间几何 + 物理动作，四句常用表达一次打通", 290, 28, 16, PAL.sageDark, "center", 800);
  var rows4 = [
    ["围在立体盒子里 → in：", "The pen is in the pencil box.", "#EEF4E8", PAL.sage],
    ["贴在支撑表面上 → on：", "The cat is sleeping on the chair.", "#FFF8E6", PAL.gold],
    ["拧接电闸 / 掀开书：", "Turn on the light, open your book.", "#EAF2F9", PAL.blue]
  ];
  for(var q = 0; q < rows4.length; q++){
    var yq = 60 + q * 64;
    box(ctx, 26, yq, 528, 52, rows4[q][2], rows4[q][3], 1.8, 12);
    label(ctx, rows4[q][0], 42, yq + 26, 13, PAL.muted, "left", 700);
    label(ctx, rows4[q][1], 538, yq + 26, 15.5, PAL.ink, "right", 800);
  }
}

window.__MX_ESSENCE_RENDERER = {
  render: function(canvas, lessonId, step, elapsedSec, iState){
    if(!canvas) return;
    var ctx = canvas.getContext("2d");
    if(!ctx) return;
    var W = 580, H = 300;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    if(canvas.width !== W * dpr || canvas.height !== H * dpr){
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if(lessonId === "bridge") renderBridge(ctx, W, H, step, elapsedSec, iState);
    else if(lessonId === "magnet") renderMagnet(ctx, W, H, step, elapsedSec, iState);
    else if(lessonId === "boundary") renderBoundary(ctx, W, H, step, elapsedSec, iState);
    else if(lessonId === "space") renderSpace(ctx, W, H, step, elapsedSec, iState);
  }
};

window.__MX_ESSENCE_DATA = {
  version: 2,
  lawMap: {
    "PR-08": "bridge", "CO-13": "bridge", "GR-01": "bridge", "PR-07": "bridge",
    "GR-02": "magnet", "GR-03": "magnet", "TA-15": "magnet", "GR-04": "magnet",
    "C-01": "boundary", "C-02": "boundary", "C-04": "boundary", "C-05": "boundary", "C-06": "boundary", "C-07": "boundary",
    "V-40": "space", "P-01": "space", "P-02": "space", "P-03": "space"
  },
  items: [
    {
      id: "bridge",
      title: "英文钢架桥：为什么下雨也要带 It？",
      tag: "句子骨架 · PR-08 / CO-13",
      words: ["It is raining.", "It is sunny today.", "I enjoy swimming."],
      scenes: [
        { name: "① 中式竹筏 vs 钢架塌桥", cap: "中文像竹筏漂着走：「下雨了」不写主语也成立；可搬进英文钢架桥，左边少了主语桥墩，桥直接断塌跌进水里！", say: "It is raining." },
        { name: "② 空降替身 & 唯一王座", cap: "天上降落伞空投替身 It 顶住左桥墩，中央王座只准坐一位带时态的动词；第二个动作只能穿上 -ing 工作服站进后车厢。", say: "I enjoy swimming." },
        {
          name: "③ 亲手拆装钢架桥",
          cap: "动手点击下面的黄色物理开关！试着把 It 撤走、或者脱掉 -ing 工作服，看整座桥当场怎么失去平衡：",
          say: "It is raining.",
          interactive: {
            mode: "bridge",
            controls: [
              { id: "it", label: "🪂 空投替身 It", defaultOn: true },
              { id: "vest", label: "🦺 二号动词穿 -ing", defaultOn: true }
            ]
          }
        },
        { name: "④ 一理通三句", cap: "脑中记住钢架桥：缺主角先派 It 站左墩，遇到两个动词就让第二个套上工作服。点下方句卡听发声！", say: "It is sunny today." }
      ]
    },
    {
      id: "magnet",
      title: "didn't 磁铁：为什么不说 didn't went？",
      tag: "信息守恒 · GR-02 / GR-03",
      words: ["She went home.", "She didn't go home.", "Did you see the cat?", "He doesn't like lemons."],
      scenes: [
        { name: "① 两颗徽章能量过载", cap: "went 胸口已经嵌着一颗 PAST 徽章；如果前面再塞进 didn't 不拆徽章，两颗高能核心相撞炸出火花！", say: "She went home." },
        { name: "② 磁铁抽走，齿轮倒转", cap: "didn't 上场伸出电磁弧线，把 PAST 核心硬生生从 went 身上抽过来自己扛着——went 立刻齿轮逆转退回原形 go！", say: "She didn't go home." },
        {
          name: "③ 磁铁物理实验台",
          cap: "亲自拨动下面的磁铁开关，看着 PAST 和三单 -s 徽章怎么在动词与助动词之间来回飞跃：",
          say: "Did you see the cat?",
          interactive: {
            mode: "magnet",
            controls: [
              { id: "neg", label: "🧲 请出 didn't 吸走过去核心", defaultOn: true },
              { id: "does", label: "🧲 请出 doesn't 吸走三单 -s", defaultOn: true }
            ]
          }
        },
        { name: "④ 一理通三句", cap: "只要 did / didn't / does / doesn't 站在句子里扛徽章，后面的实义动词统统用原形！", say: "He doesn't like lemons." }
      ]
    },
    {
      id: "boundary",
      title: "脑内边界框 & 探照灯：Two coffees 与 a / the",
      tag: "物理边界 & 定位 · C-01 / C-06",
      words: ["Two coffees, please.", "two bowls of rice", "Look at the moon in the sky."],
      scenes: [
        { name: "① 流体粒子 vs 激光杯框", cap: "咖啡倒出来是没边的粒子流，数不出个数；可两只玻璃杯框一落下来，杯里液体立刻被锁出边界 1、2，coffee 末尾顺势长出 -s！", say: "Two coffees, please." },
        { name: "② 一刀切透视 & 黑夜探照灯", cap: "左看物理切片：苹果切开 ≠ 一个苹果（可数），面包切开还是面包（靠单位数）；右看舞台：the 就像探照灯打亮双方锁定的唯一目标！", say: "Look at the moon in the sky." },
        {
          name: "③ 套框与打灯实验室",
          cap: "亲自试两个机关：给散装米饭套上碗框（bowl），或者拉下电闸打亮黑夜舞台上的 the 探照灯！",
          say: "two bowls of rice",
          interactive: {
            mode: "boundary",
            controls: [
              { id: "cup", label: "🥣 套上量词边界框 (bowl)", defaultOn: true },
              { id: "spot", label: "🔦 打开 the 唯一定位探照灯", defaultOn: true }
            ]
          }
        },
        { name: "④ 一理通三句", cap: "没边界套容器框，不指明抓哪个用 a，心里探照灯唯一锁死用 the！", say: "Two glasses of water, please." }
      ]
    },
    {
      id: "space",
      title: "三维空间力场：in / on / at 与动作开关",
      tag: "3D 空间 & 物理动作 · P-01 / V-40",
      words: ["The pen is in the pencil box.", "The cat is sleeping on the chair.", "Turn on the light, please."],
      scenes: [
        { name: "① 中式一个「在 / 开」踩的坑", cap: "中文用一个「在」和「开」包办一切，英语全按物理真相分工：进盒子还是贴桌面？拧通电路还是掀开书页？", say: "Turn on the light, please." },
        { name: "② 3D 立体盒 / 平面 / 坐标点", cap: "看这幅三维投影：被四面盒壁关住是 in（所以汽车缩在里面 in the car）；站立在平坦支撑面上是 on（公交大平台 on the bus）；激光钉在坐标点上是 at！", say: "The pen is in the pencil box." },
        {
          name: "③ 3D 视角 & 真实电闸开关",
          cap: "点击切换三维空间几何（盒 in / 面 on / 点 at），并亲自拨动右边电闸看回路接通 turn on 点亮灯泡！",
          say: "The cat is sleeping on the chair.",
          interactive: {
            mode: "space",
            controls: [
              { id: "loc_in", label: "📦 进三维盒 in", group: "loc", val: "in", defaultOn: true },
              { id: "loc_on", label: "📏 贴平面 on", group: "loc", val: "on" },
              { id: "loc_at", label: "📍 钉坐标点 at", group: "loc", val: "at" },
              { id: "lamp", label: "💡 拨动电路开关 turn on", defaultOn: true }
            ]
          }
        },
        { name: "④ 一理通三句", cap: "脑中先有三维盒子、表面和电闸接触，再开口选介词和动词，再也不会中式直译！", say: "Turn on the light, open your book." }
      ]
    }
  ]
};
})();
