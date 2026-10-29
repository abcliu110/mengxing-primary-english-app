// take off 试点动画：纯函数 renderTakeOff(t) -> SVG 字符串（viewBox 740x320，与 App 画布同比例）
// 同一份代码既可在 App 内用 requestAnimationFrame 驱动，也可在 Remotion 中按帧渲染。
export const TAKEOFF_DURATION = 17;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const lerp = (a, b, k) => a + (b - a) * k;
const FONT = "'PingFang SC','Microsoft YaHei','Noto Sans CJK SC','WenQuanYi Zen Hei',sans-serif";
const C = { ink: '#22304a', accent: '#1f8fff' };


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
    // 第一张从 t=0 起就完全显示，不做淡入
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
