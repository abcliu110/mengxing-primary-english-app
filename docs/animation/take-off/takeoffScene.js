// take off 试点动画：纯函数 renderTakeOff(t) -> SVG 字符串（viewBox 740x320，与 App 画布同比例）
// 同一份代码既可在 App 内用 requestAnimationFrame 驱动，也可在 Remotion 中按帧渲染。
export const TAKEOFF_DURATION = 17;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const lerp = (a, b, k) => a + (b - a) * k;
const rad = (d) => (d * Math.PI) / 180;
const FONT = "'PingFang SC','Microsoft YaHei','Noto Sans CJK SC','WenQuanYi Zen Hei',sans-serif";
const C = {
  skin: '#f6c7a1', skinShade: '#e9a982', hair: '#4a2c1d', shirt: '#ffd34e', pants: '#3d5a98',
  shoe: '#2b2b33', jacket: '#e4573d', jacketDark: '#b8402b', ink: '#22304a', accent: '#1f8fff',
};

// 手臂：side=-1 画面左，+1 画面右；a1 上臂角度（0=下垂，正=向外），a2 肘部相对弯曲
function armPts(side, a1, a2) {
  const sx = side * 25, sy = -118, L1 = 36, L2 = 34;
  const ex = sx + side * L1 * Math.sin(rad(a1)), ey = sy + L1 * Math.cos(rad(a1));
  const t2 = a1 + a2;
  const hx = ex + side * L2 * Math.sin(rad(t2)), hy = ey + L2 * Math.cos(rad(t2));
  return { sx, sy, ex, ey, hx, hy };
}
function pointAlong(p, f) {
  // 沿 肩->肘->手 折线取比例 f 的点
  const d1 = Math.hypot(p.ex - p.sx, p.ey - p.sy), d2 = Math.hypot(p.hx - p.ex, p.hy - p.ey);
  const d = f * (d1 + d2);
  if (d <= d1) return { x: lerp(p.sx, p.ex, d / d1), y: lerp(p.sy, p.ey, d / d1), seg: 1 };
  return { x: lerp(p.ex, p.hx, (d - d1) / d2), y: lerp(p.ey, p.hy, (d - d1) / d2), seg: 2 };
}
function sleevePath(p, f0, f1) {
  const a = pointAlong(p, f0), b = pointAlong(p, f1);
  const pts = [`${a.x},${a.y}`];
  const elbowF = Math.hypot(p.ex - p.sx, p.ey - p.sy) / (Math.hypot(p.ex - p.sx, p.ey - p.sy) + Math.hypot(p.hx - p.ex, p.hy - p.ey));
  if (f0 < elbowF && f1 > elbowF) pts.push(`${p.ex},${p.ey}`);
  pts.push(`${b.x},${b.y}`);
  return `M${pts.join(' L')}`;
}
function drawArm(p, jacketF0, jacketOn) {
  let s = '';
  // 上臂（T 恤短袖）+ 前臂（皮肤）
  s += `<path d="M${p.sx},${p.sy} L${p.ex},${p.ey}" stroke="${C.skin}" stroke-width="12" stroke-linecap="round" fill="none"/>`;
  s += `<path d="M${p.ex},${p.ey} L${p.hx},${p.hy}" stroke="${C.skin}" stroke-width="11" stroke-linecap="round" fill="none"/>`;
  s += `<path d="${sleevePath(p, 0, 0.32)}" stroke="${C.shirt}" stroke-width="15" stroke-linecap="round" fill="none"/>`;
  if (jacketOn && jacketF0 < 0.88) {
    s += `<path d="${sleevePath(p, jacketF0, 0.88)}" stroke="${C.jacket}" stroke-width="16" stroke-linecap="round" fill="none"/>`;
    const cuff = pointAlong(p, 0.88);
    s += `<circle cx="${cuff.x}" cy="${cuff.y}" r="8" fill="${C.jacketDark}"/>`;
  }
  s += `<circle cx="${p.hx}" cy="${p.hy}" r="7.5" fill="${C.skin}" stroke="${C.skinShade}" stroke-width="1"/>`;
  return s;
}

function jacketBundle(x, y, rot = 0, sc = 1) {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})">
    <path d="M-16,-6 Q-20,14 -8,20 L10,20 Q20,12 16,-6 Q0,-14 -16,-6Z" fill="${C.jacket}" stroke="${C.jacketDark}" stroke-width="2"/>
    <path d="M-14,-4 Q-26,6 -22,18" stroke="${C.jacket}" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M0,-10 L0,18" stroke="${C.jacketDark}" stroke-width="1.5"/>
  </g>`;
}
function hungJacket(x, y, k) {
  return `<g transform="translate(${x},${y})" opacity="${k}">
    <path d="M-26,8 Q0,-4 26,8 L30,70 L-30,70Z" fill="${C.jacket}" stroke="${C.jacketDark}" stroke-width="2"/>
    <path d="M-26,8 L-38,58 L-28,60 L-22,24" fill="${C.jacket}" stroke="${C.jacketDark}" stroke-width="2"/>
    <path d="M26,8 L38,58 L28,60 L22,24" fill="${C.jacket}" stroke="${C.jacketDark}" stroke-width="2"/>
    <path d="M0,4 L0,70" stroke="${C.jacketDark}" stroke-width="2"/>
    <path d="M-12,4 L0,20 L12,4" fill="none" stroke="${C.jacketDark}" stroke-width="2"/>
  </g>`;
}

// 小男孩（正面），x,y 为脚底中心
function drawBoy(o) {
  const { x, y, t, armL, armR, jacketSlide = 0, jacketOn = true, mood = 'normal', bob = 0 } = o;
  const breath = Math.sin(t * 3) * 1.2;
  const blink = (t % 3.4) < 0.12;
  let s = `<g transform="translate(${x},${y + bob})">`;
  s += `<ellipse cx="0" cy="4" rx="40" ry="7" fill="rgba(20,30,50,.15)"/>`;
  // 腿和鞋
  s += `<rect x="-20" y="-60" width="17" height="54" rx="7" fill="${C.pants}"/><rect x="3" y="-60" width="17" height="54" rx="7" fill="${C.pants}"/>`;
  s += `<ellipse cx="-13" cy="-4" rx="13" ry="6" fill="${C.shoe}"/><ellipse cx="13" cy="-4" rx="13" ry="6" fill="${C.shoe}"/>`;
  s += `<g transform="translate(0,${breath})">`;
  // 手臂在身后的部分先画（拿衣领时手在胸前，所以统一后画手臂）
  // 躯干：黄色 T 恤
  s += `<path d="M-28,-122 Q-31,-70 -25,-56 L25,-56 Q31,-70 28,-122 Q0,-131 -28,-122Z" fill="${C.shirt}"/>`;
  s += `<path d="M-9,-90 l3,7 7,0 -5.5,4.5 2,7 -6.5,-4 -6.5,4 2,-7 -5.5,-4.5 7,0Z" transform="translate(9,0)" fill="#ff9f1c"/>`;
  // 外套躯干：滑落时向下、变窄、变透明（表示从肩上褪到身后）
  if (jacketOn && jacketSlide < 1) {
    const d = ease(jacketSlide);
    s += `<g opacity="${1 - d}" transform="translate(0,${d * 26}) scale(${1 - d * 0.15},1)">
      <path d="M-31,-123 Q-34,-70 -28,-52 L-4,-52 L-4,-110 L-14,-126Z" fill="${C.jacket}"/>
      <path d="M31,-123 Q34,-70 28,-52 L4,-52 L4,-110 L14,-126Z" fill="${C.jacket}"/>
      <path d="M-14,-126 L-4,-108 L-12,-100 L-22,-122Z" fill="${C.jacketDark}"/>
      <path d="M14,-126 L4,-108 L12,-100 L22,-122Z" fill="${C.jacketDark}"/>
      <rect x="-24" y="-80" width="12" height="3" rx="1.5" fill="${C.jacketDark}"/><rect x="12" y="-80" width="12" height="3" rx="1.5" fill="${C.jacketDark}"/>
    </g>`;
  }
  // 脖子和头
  s += `<rect x="-7" y="-134" width="14" height="14" rx="5" fill="${C.skinShade}"/>`;
  s += `<g transform="translate(0,-168)">
    <ellipse cx="-33" cy="4" rx="7" ry="9" fill="${C.skin}"/><ellipse cx="33" cy="4" rx="7" ry="9" fill="${C.skin}"/>
    <ellipse cx="0" cy="0" rx="33" ry="36" fill="${C.skin}"/>
    <path d="M-34,-2 Q-38,-38 0,-40 Q36,-40 34,-4 Q30,-20 18,-22 Q14,-12 2,-18 Q-6,-10 -16,-20 Q-28,-16 -34,-2Z" fill="${C.hair}"/>
    <path d="M-4,-38 Q2,-50 10,-44 Q4,-42 2,-37Z" fill="${C.hair}"/>`;
  if (blink) {
    s += `<path d="M-17,4 q6,3 12,0" stroke="${C.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M5,4 q6,3 12,0" stroke="${C.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  } else {
    s += `<ellipse cx="-11" cy="4" rx="4.2" ry="5.4" fill="${C.ink}"/><ellipse cx="11" cy="4" rx="4.2" ry="5.4" fill="${C.ink}"/>
      <circle cx="-9.6" cy="2" r="1.5" fill="#fff"/><circle cx="12.4" cy="2" r="1.5" fill="#fff"/>`;
  }
  if (mood === 'hot') {
    s += `<path d="M-19,-9 q7,-4 13,-1" stroke="${C.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M6,-10 q7,-3 13,1" stroke="${C.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    s += `<ellipse cx="0" cy="20" rx="5" ry="${4 + Math.abs(Math.sin(t * 6)) * 2}" fill="#9b3b3b"/>`;
    s += `<ellipse cx="-20" cy="13" rx="6" ry="3.5" fill="#ff7b7b" opacity=".75"/><ellipse cx="20" cy="13" rx="6" ry="3.5" fill="#ff7b7b" opacity=".75"/>`;
    const dy = (t * 30) % 20;
    s += `<path d="M28,${-22 + dy} q4,7 0,10 q-4,-3 0,-10Z" fill="#5bc0ff" opacity="${1 - dy / 20}"/>`;
  } else if (mood === 'happy') {
    s += `<path d="M-19,-10 q7,-5 13,-2" stroke="${C.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M6,-12 q7,-3 13,2" stroke="${C.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M-9,16 Q0,27 9,16 Q0,20 -9,16Z" fill="#9b3b3b" stroke="#9b3b3b" stroke-width="2" stroke-linejoin="round"/>`;
    s += `<ellipse cx="-20" cy="13" rx="6" ry="3.5" fill="#ffa0a0" opacity=".6"/><ellipse cx="20" cy="13" rx="6" ry="3.5" fill="#ffa0a0" opacity=".6"/>`;
  } else {
    s += `<path d="M-19,-10 q7,-4 13,-2" stroke="${C.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M6,-12 q7,-2 13,2" stroke="${C.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M-7,17 Q0,22 7,17" stroke="#9b3b3b" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  }
  s += `</g>`;
  // 手臂（袖子从肩部滑向手腕）
  const pl = armPts(-1, armL[0], armL[1]), pr = armPts(1, armR[0], armR[1]);
  const f0 = ease(jacketSlide) * 0.88;
  s += drawArm(pl, f0, jacketOn) + drawArm(pr, f0, jacketOn);
  s += `</g></g>`;
  return { svg: s, handR: { x: x + pr.hx, y: y + bob + pr.hy + breath }, handL: { x: x + pl.hx, y: y + bob + pl.hy + breath } };
}

function arrow(x1, y1, x2, y2, color, w = 4, dash = '') {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 12;
  return `<path d="M${x1},${y1} L${x2},${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ''} fill="none"/>
  <path d="M${x2},${y2} L${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)} L${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}Z" fill="${color}"/>`;
}
const label = (x, y, txt, size = 16, color = C.ink, weight = 700, anchor = 'middle', op = 1) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" opacity="${op}">${txt}</text>`;
function pill(x, y, w, h, fill, txt, size, color = '#fff', op = 1) {
  return `<g opacity="${op}"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>${label(x, y + size * 0.36, txt, size, color, 800)}</g>`;
}
function subtitle(en, zh, op) {
  return `<g opacity="${op}"><rect x="170" y="276" width="400" height="38" rx="12" fill="rgba(20,30,50,.72)"/>
    ${label(370, 292, en, 15, '#fff', 800)}${label(370, 309, zh, 12, '#ffe58a', 600)}</g>`;
}

// ── 第一幕：脱外套 ──
function scene1(t, A) {
  let s = `<defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4e3"/><stop offset="1" stop-color="#ffe6c7"/></linearGradient></defs>`;
  s += `<rect width="740" height="320" fill="url(#wall)"/><rect y="250" width="740" height="70" fill="#e8c39a"/><rect y="250" width="740" height="4" fill="#d3a978"/>`;
  s += `<rect x="30" y="50" width="110" height="100" rx="8" fill="#bfe6ff" stroke="#fff" stroke-width="6"/>`;
  s += `<circle cx="85" cy="100" r="${22 + Math.sin(t * 3) * 2}" fill="#ffc531"/>`;
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t; s += `<path d="M${85 + Math.cos(a) * 30},${100 + Math.sin(a) * 30} L${85 + Math.cos(a) * 38},${100 + Math.sin(a) * 38}" stroke="#ffc531" stroke-width="4" stroke-linecap="round"/>`; }
  s += `<rect x="157" y="60" width="16" height="90" rx="8" fill="#fff" stroke="#ccc"/><rect x="161" y="80" width="8" height="66" rx="4" fill="#ff4d4d"/><circle cx="165" cy="152" r="11" fill="#ff4d4d"/>${label(165, 52, '32°C', 13, '#d33')}`;
  // 真人感角色：关键姿势 + 交叉淡化 + 呼吸
  const keys = [['hot', 0], ['off1', 1.9], ['off2', 3.1], ['done', 4.3]];
  const H = 240, W = H * 329 / 480, X = 300 - 0.354 * W, Y = 262 - H * 0.992;
  const breath = 1 + Math.sin(t * 3) * 0.006;
  s += `<ellipse cx="300" cy="262" rx="52" ry="8" fill="rgba(20,30,50,.18)"/>`;
  const surfOp = clamp(seg(t, 2.0, 2.4) - seg(t, 5.6, 6.0));
  s += `<rect x="262" y="92" width="76" height="80" rx="18" fill="rgba(31,143,255,.07)" stroke="${C.accent}" stroke-width="2.5" stroke-dasharray="7 6" opacity="${surfOp}"/>`;
  for (let k = 0; k < keys.length; k++) {
    const [name, st] = keys[k];
    const next = keys[k + 1] ? keys[k + 1][1] : 99;
    const op = clamp(seg(t, st - 0.12, st + 0.12)) * (1 - clamp(seg(t, next - 0.12, next + 0.12)));
    if (k === 0 && t < 0.12) { /* 第一张从头显示 */ }
    const o = k === 0 ? 1 - clamp(seg(t, next - 0.12, next + 0.12)) : op;
    if (o <= 0.001) continue;
    s += `<g transform="translate(300,262) scale(1,${breath}) translate(-300,-262)"><image href="${A[name]}" x="${X}" y="${Y}" width="${W}" height="${H}" opacity="${o}"/></g>`;
  }
  s += label(250, 140, '身体表面', 13, C.accent, 700, 'end', surfOp);
  const offOp = clamp(seg(t, 4.7, 5.1) - seg(t, 7.0, 7.3));
  if (offOp > 0) {
    s += `<g opacity="${offOp}">${arrow(340, 125, 340 + 26 + 10 * offOp, 125, '#ff5a36', 5)}</g>`;
    s += pill(480, 130, 92, 30, '#ff5a36', 'OFF', 18, '#fff', offOp);
    s += label(480, 166, '外套离开身体', 14, '#d8401f', 800, 'middle', offOp);
  }
  if (t > 0.3 && t < 2.0) s += `<g opacity="${clamp(seg(t, 0.3, 0.6) - seg(t, 1.7, 2.0))}"><rect x="355" y="40" width="104" height="38" rx="14" fill="#fff" stroke="#ddd"/><path d="M362,76 l-14,12 24,-10Z" fill="#fff"/>${label(407, 65, "So hot!", 17, '#e2453a', 800)}</g>`;
  if (t > 5.2 && t < 6.6) s += `<g opacity="${clamp(seg(t, 5.2, 5.4) - seg(t, 6.4, 6.6))}"><rect x="345" y="36" width="96" height="36" rx="14" fill="#fff" stroke="#ddd"/>${label(393, 60, 'Ahh~', 16, C.ink, 800)}</g>`;
  s += pill(80, 24, 130, 30, C.ink, 'take off ①', 15);
  s += label(158, 30, '脱下（衣物）', 15, C.ink, 800, 'start');
  s += subtitle('He takes off his jacket.', '他脱下了外套。', clamp(seg(t, 2.0, 2.4)));
  return s;
}

// ── 第二幕：飞机起飞 ──
function plane(x, y, rot) {
  return `<g transform="translate(${x},${y}) rotate(${rot})">
    <path d="M-80,-8 L-98,-46 L-74,-46 L-48,-14Z" fill="#ff5a36"/>
    <path d="M-86,-6 Q-74,-20 40,-18 Q82,-16 94,0 Q84,12 40,12 L-80,12 Q-92,6 -86,-6Z" fill="#fff" stroke="#c9d6e8" stroke-width="2"/>
    <path d="M-84,4 L88,4" stroke="${C.accent}" stroke-width="4"/>
    <path d="M70,-10 Q84,-8 90,-2 L72,-2Z" fill="#2a4a7a"/>
    ${[-50, -34, -18, -2, 14, 30, 46].map((wx) => `<circle cx="${wx}" cy="-6" r="3.2" fill="#2a4a7a"/>`).join('')}
    <path d="M-12,2 L-46,32 L-26,32 L24,4Z" fill="#dbe5f3" stroke="#b6c5db" stroke-width="1.5"/>
    <path d="M-30,24 L-14,24" stroke="#888" stroke-width="5" stroke-linecap="round"/>
    <path d="M-40,12 L-40,22" stroke="#555" stroke-width="3"/><circle cx="-40" cy="25" r="5" fill="#333"/>
    <path d="M60,12 L60,22" stroke="#555" stroke-width="3"/><circle cx="60" cy="25" r="5" fill="#333"/>
  </g>`;
}
function scene2(t, A) {
  const lt = t - 7.6; // 本幕局部时间
  let s = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc6ff"/><stop offset="1" stop-color="#d9f0ff"/></linearGradient></defs>`;
  s += `<rect width="740" height="320" fill="url(#sky)"/>`;
  const cloud = (cx, cy, k) => `<g transform="translate(${cx},${cy}) scale(${k})" fill="#fff" opacity=".9"><circle cx="0" cy="0" r="18"/><circle cx="20" cy="-8" r="22"/><circle cx="42" cy="0" r="17"/><rect x="0" y="0" width="42" height="17"/></g>`;
  s += cloud(80 - lt * 6, 60, 1) + cloud(420 - lt * 4, 40, 0.8) + cloud(640 - lt * 5, 90, 1.1);
  s += `<rect y="250" width="740" height="70" fill="#8fd17a"/><rect y="236" width="740" height="30" fill="#4b5563"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="${i * 70 + 10}" y="249" width="36" height="4" fill="#fff"/>`;
  // 飞机：加速滑行 -> 离地爬升
  const p = clamp(lt / 4.2);
  const px = lerp(-120, 820, Math.pow(p, 1.7));
  const liftX = 360;
  const climb = Math.max(0, px - liftX);
  const py = 211 - climb * 0.35 - climb * climb * 0.0008;
  const rot = -Math.min(14, climb * 0.09);
  s += `<g transform="translate(${px},${py}) rotate(${rot})"><image href="${A.plane}" x="-110" y="-28" width="220" height="${220 * 171 / 520}"/></g>`;
  // 离地标注：轮子与地面之间的间隙
  const gapOp = clamp(seg(lt, 2.75, 3.1));
  if (gapOp > 0) {
    s += `<g opacity="${gapOp}">`;
    s += `<path d="M${liftX - 30},236 L${liftX + 80},236" stroke="${C.accent}" stroke-width="3" stroke-dasharray="6 5"/>`;
    s += label(liftX + 86, 232, '地面', 13, C.accent, 800, 'start');
    s += arrow(liftX + 10, 232, liftX - 40, 178, '#ff5a36', 5);
    s += pill(liftX - 100, 150, 92, 30, '#ff5a36', 'OFF', 18);
    s += label(liftX - 100, 186, '离开地面', 14, '#d8401f', 800);
    s += `</g>`;
  }
  s += pill(80, 24, 130, 30, C.ink, 'take off ②', 15);
  s += label(158, 30, '起飞', 15, C.ink, 800, 'start');
  s += subtitle('The plane takes off.', '飞机起飞了。', clamp(seg(lt, 1.6, 2.0)));
  return s;
}

// ── 第三幕：TAKE + OFF 合成 ──
function scene3(t, A) {
  const lt = t - 12.6;
  let s = `<rect width="740" height="320" fill="#fbfdff"/>`;
  for (let i = 0; i < 16; i++) s += `<path d="M0,${i * 22} L740,${i * 22}" stroke="#eef3fa" stroke-width="1"/>`;
  const k = ease(seg(lt, 0.2, 1.0));
  s += pill(lerp(160, 285, k), 62, 120, 44, '#3b82f6', 'TAKE', 24);
  s += label(lerp(160, 285, k), 104, '拿、取', 14, '#2b5bb8', 700);
  s += pill(lerp(580, 455, k), 62, 120, 44, '#ff5a36', 'OFF', 24);
  s += label(lerp(580, 455, k), 104, '离开表面', 14, '#d8401f', 700);
  s += label(370, 71, '+', 30, C.ink, 800, 'middle', k);
  const r = seg(lt, 1.2, 1.6);
  s += `<g opacity="${r}"><rect x="40" y="128" width="320" height="120" rx="16" fill="#fff4ee" stroke="#ffc7b5" stroke-width="2"/>
    <image href="${A.done}" x="58" y="134" width="${100 * 329 / 480}" height="100"/>${arrow(122, 180, 156, 180, '#ff5a36', 3)}
    ${label(170, 166, 'Take off your coat.', 17, C.ink, 800, 'start')}
    ${label(170, 190, '脱下你的外套。', 14, '#555', 600, 'start')}
    ${label(200, 230, '衣服 离开 身体', 14, '#d8401f', 800)}</g>`;
  const r2 = seg(lt, 1.8, 2.2);
  s += `<g opacity="${r2}"><rect x="380" y="128" width="320" height="120" rx="16" fill="#eef6ff" stroke="#b9d9ff" stroke-width="2"/>
    <image href="${A.plane}" x="392" y="162" width="88" height="${88 * 171 / 520}" transform="rotate(-10 436 176)"/>
    ${label(486, 166, 'The plane takes off.', 17, C.ink, 800, 'start')}
    ${label(486, 190, '飞机起飞了。', 14, '#555', 600, 'start')}
    ${label(540, 230, '飞机 离开 地面', 14, '#2b5bb8', 800)}</g>`;
  s += label(370, 284, '共同点：OFF = 离开原来贴着的表面', 18, C.ink, 800, 'middle', seg(lt, 2.6, 3.0));
  return s;
}

export function renderTakeOff(t, A) {
  t = ((t % TAKEOFF_DURATION) + TAKEOFF_DURATION) % TAKEOFF_DURATION;
  let body;
  if (t < 7.6) body = scene1(t, A);
  else if (t < 12.6) body = scene2(t, A);
  else body = scene3(t, A);
  // 场景切换淡入淡出
  const fade = Math.max(1 - Math.abs(t - 7.6) / 0.3, 1 - Math.abs(t - 12.6) / 0.3, 1 - t / 0.3, 1 - (TAKEOFF_DURATION - t) / 0.3, 0);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 320" width="100%" height="100%">${body}<rect width="740" height="320" fill="#fff" opacity="${clamp(fade)}"/></svg>`;
}
