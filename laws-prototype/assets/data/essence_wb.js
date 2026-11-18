/* ============================================================================
 * 英语本质交互微动画数据包（外置按需加载 · 不改任何既有动画源码）
 * 挂载全局变量 window.__MX_ESSENCE_DATA
 * ============================================================================ */
(function(){
"use strict";

function txt(x, y, s, opts){
  opts = opts || {};
  return '<text x="' + x + '" y="' + y + '" font-size="' + (opts.sz || 18) + '"'
    + ' font-weight="' + (opts.w || 700) + '"'
    + ' fill="' + (opts.c || '#2F362C') + '"'
    + ' text-anchor="' + (opts.anchor || 'middle') + '"'
    + (opts.cls ? ' class="' + opts.cls + '"' : '')
    + '>' + String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</text>';
}

function pill(x, y, w, h, label, fill, stroke, col, cls){
  return '<g' + (cls ? ' class="' + cls + '"' : '') + '>'
    + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>'
    + txt(x + w / 2, y + h / 2 + 6, label, { sz: 16, w: 800, c: col || '#2F362C' })
    + '</g>';
}

window.__MX_ESSENCE_DATA = {
  version: 1,
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
      grade: "1-6年级通用",
      hook: "中文可以说「下雨了」，为什么英语说 Raining! 整座桥就会塌？",
      laws: ["PR-08", "CO-13", "GR-01"],
      words: ["It is raining.", "I enjoy swimming.", "He likes football."],
      scenes: [
        {
          name: "① 中式错觉",
          cap: "中文像竹筏漂着走：「下雨了」「我很开心」都能直接说；可搬进英语钢架桥，缺了左桥墩（主语）或动词王座，桥直接塌掉！",
          say: "Raining",
          svg:
            '<rect x="16" y="18" width="236" height="270" rx="14" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(134, 48, '中文：竹筏流水', { sz: 15, c: '#5F7448' })
            + '<g class="ess-float">'
            + pill(44, 88, 180, 44, '下雨了（直接走）', '#EBF0E3', '#A8B899', '#3D5229')
            + pill(44, 154, 180, 44, '我很高兴（无动词）', '#EBF0E3', '#A8B899', '#3D5229')
            + '</g>'
            + txt(134, 244, '只要说清话题就成立', { sz: 13, w: 600, c: '#707A68' })
            + '<rect x="272" y="18" width="272" height="270" rx="14" fill="#FFF7F5" stroke="#E8C6BF" stroke-width="1.5"/>'
            + txt(408, 48, '英语直译翻车现场', { sz: 15, c: '#B85A52' })
            + '<rect x="292" y="218" width="232" height="10" rx="5" fill="#DCE2D5"/>'
            + '<g class="ess-wobble">'
            + pill(318, 108, 180, 44, '✗ Is raining.', '#FDECEC', '#B85A52', '#B85A52')
            + pill(318, 166, 180, 44, '✗ I happy.', '#FDECEC', '#B85A52', '#B85A52')
            + '</g>'
            + txt(408, 256, '左桥墩空着 / 缺谓语，站不稳！', { sz: 13, w: 700, c: '#B85A52' })
        },
        {
          name: "② 钢架与王座",
          cap: "英语必须搭钢架：左墩先空投替身 It 占住主语，中央王座只坐一个「带时态的动词」，第二个动词套上 -ing 工作服站旁边！",
          say: "It is raining.",
          svg:
            '<rect x="20" y="18" width="520" height="270" rx="16" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(280, 46, '英语两件铁律：有主语 + 一句一核心动词', { sz: 15, c: '#4A5A36' })
            // Left pillar + animated drop
            + '<rect x="52" y="156" width="128" height="90" rx="10" fill="#EDF3E7" stroke="#5F7448" stroke-width="2" stroke-dasharray="5 3"/>'
            + txt(116, 232, '① 主语桥墩', { sz: 12.5, c: '#5F7448' })
            + '<g class="ess-drop">' + pill(68, 164, 96, 44, 'It 🪂', '#FFF6DA', '#D6A548', '#7A5410') + '</g>'
            // Center Throne
            + '<rect x="206" y="142" width="146" height="104" rx="12" fill="#FFF8E6" stroke="#D6A548" stroke-width="2.2"/>'
            + txt(279, 232, '② 唯一谓语王座 👑', { sz: 12.5, c: '#8A5A1E' })
            + '<g class="ess-pulse">' + pill(222, 164, 114, 44, 'is / enjoy', '#5F7448', '#3D5229', '#FFF') + '</g>'
            // Right vest
            + '<rect x="376" y="156" width="140" height="90" rx="10" fill="#EEF3F8" stroke="#6E8AA8" stroke-width="2"/>'
            + txt(446, 232, '③ 穿工作服 (-ing)', { sz: 12.5, c: '#4A627A' })
            + '<g class="ess-slide-l">' + pill(388, 164, 116, 44, 'raining / swim-ing', '#FFFFFF', '#6E8AA8', '#364E66') + '</g>'
            // Top beam connecting all three
            + '<path d="M52,136 L516,136" stroke="#5F7448" stroke-width="4" stroke-linecap="round"/>'
            + txt(280, 102, 'It  is  raining.    /    I  enjoy  swimming.', { sz: 20, w: 800, c: '#2F362C' })
        },
        {
          name: "③ 亲手试搭桥",
          cap: "动手点舞台里的机关按钮：试试把替身 It 撤掉、或者把工作服脱掉，看看桥为什么会直接塌掉！",
          say: "I enjoy swimming.",
          interactive: {
            mode: "bridge",
            controls: [
              { id: "it", label: "🪂 空投替身 It", defaultOn: true },
              { id: "vest", label: "🦺 二号动词穿 -ing", defaultOn: true }
            ]
          }
        },
        {
          name: "④ 一理通三句",
          cap: "天气、时间、距离都要先请 It 站左墩；一句话里出现第二个动作，记得帮它穿上 -ing 或 to 的工作服。点击下方英文直接听！",
          say: "It is sunny today.",
          svg:
            '<rect x="20" y="20" width="520" height="266" rx="16" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(280, 52, '记住这一幅钢架画面，下面三句永不错', { sz: 15, c: '#4A5A36' })
            + pill(44, 78, 472, 50, '✅  It is raining outside. （天在下雨：It 站左墩）', '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 142, 472, 50, '✅  It is warm today. （今天暖和：is 坐动词王座）', '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 206, 472, 50, '✅  I enjoy swimming. （我喜欢游泳：swim 穿 -ing）', '#EEF4E8', '#7C9464', '#2F362C')
        }
      ]
    },
    {
      id: "magnet",
      title: "didn't 磁铁：为什么不说 didn't went？",
      tag: "时间标记唯一律 · GR-02 / GR-03",
      grade: "3-6年级核心",
      hook: "一句话只能发一块「过去」徽章！did 一上场，就直接把 went 吸回原形 go。",
      laws: ["GR-02", "GR-03", "TA-15", "GR-04"],
      words: ["She went home.", "She didn't go home.", "Did you go there?", "He doesn't like milk."],
      scenes: [
        {
          name: "① 两块徽章相撞",
          cap: "平时说 She went home，是过去徽章已经焊在 went 身上；变否定硬加 didn't 再留着 went，两块 PAST 徽章同时发光就撞车了！",
          say: "She went home.",
          svg:
            '<rect x="20" y="18" width="520" height="270" rx="16" fill="#FFF8F7" stroke="#E8C6BF" stroke-width="1.5"/>'
            + txt(280, 48, '❌ 常见踩坑：一句话发了两块「过去徽章」', { sz: 15, c: '#B85A52' })
            + pill(70, 96, 110, 50, 'She', '#FBFBF9', '#DCE2D5', '#2F362C')
            + '<g class="ess-wobble">'
            + pill(194, 96, 126, 50, "didn't", '#FDECEC', '#B85A52', '#B85A52')
            + pill(222, 64, 70, 26, 'PAST ⚡', '#D6A548', '#B85A52', '#FFF')
            + pill(334, 96, 108, 50, 'went', '#FDECEC', '#B85A52', '#B85A52')
            + pill(353, 64, 70, 26, 'PAST ⚡', '#D6A548', '#B85A52', '#FFF')
            + '</g>'
            + pill(454, 96, 62, 50, 'home.', '#FBFBF9', '#DCE2D5', '#2F362C')
            + '<path d="M294,77 L350,77" stroke="#B85A52" stroke-width="3" stroke-dasharray="4 4"/>'
            + txt(280, 198, 'didn\'t 和 went 都在喊「我是过去！」——重复标了两次！', { sz: 15.5, c: '#B85A52' })
            + txt(280, 232, '英语规定：整句话只由一个人扛「过去 / 三单」徽章', { sz: 14, w: 600, c: '#6E7469' })
        },
        {
          name: "② 磁铁吸走原形复原",
          cap: "请出助动词 didn't 或 Did 上场时，它会伸出磁铁，把 went 身上那块「过去徽章」吸过来自己扛着，went 立刻松手退回原形 go！",
          say: "She didn't go home.",
          svg:
            '<rect x="20" y="18" width="520" height="270" rx="16" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(280, 48, '✅ didn\'t 上场吸走过去徽章，后面立刻恢复原形 go', { sz: 15, c: '#4A5A36' })
            + pill(58, 124, 94, 52, 'She', '#FBFBF9', '#DCE2D5', '#2F362C')
            + pill(166, 124, 134, 52, "didn't", '#FFF6DA', '#D6A548', '#7A5410')
            + '<g class="ess-mag-pull">' + pill(198, 86, 70, 28, '🧲 PAST', '#5F7448', '#3D5229', '#FFF') + '</g>'
            + '<path d="M368,98 C332,68 292,68 258,92" fill="none" stroke="#D6A548" stroke-width="3" stroke-dasharray="6 4"/>'
            + pill(314, 124, 114, 52, 'go', '#EBF4E4', '#5F7448', '#2D4D1A')
            + txt(371, 200, 'went → go（卸下担子）', { sz: 13.5, c: '#5F7448' })
            + pill(442, 124, 66, 52, 'home.', '#FBFBF9', '#DCE2D5', '#2F362C')
            + txt(280, 248, '问句 Did she go home? 与三单 He doesn\'t like... 同理！', { sz: 14, c: '#66705E' })
        },
        {
          name: "③ 磁铁实验台",
          cap: "点一点舞台内的磁铁开关，亲眼看助动词上场后，动词徽章怎么瞬间转移、动词怎么跳回原形：",
          say: "Did you go there?",
          interactive: {
            mode: "magnet",
            controls: [
              { id: "neg", label: "🧲 请出 didn't 保镖（过去否定）", defaultOn: true },
              { id: "does", label: "🧲 请出 doesn't 保镖（三单）", defaultOn: true }
            ]
          }
        },
        {
          name: "④ 一理通三句",
          cap: "以后只要看到 did / didn't / does / doesn't 站进句子里，后面紧跟的动作词一律卸下包装用原形！",
          say: "He doesn't like milk.",
          svg:
            '<rect x="20" y="20" width="520" height="266" rx="16" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(280, 52, '助动词扛徽章 · 动作词用原形', { sz: 15, c: '#4A5A36' })
            + pill(44, 78, 472, 50, "✅  She didn't go home. （didn't 扛过去 → go 用原形）", '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 142, 472, 50, '✅  Did you see a bird? （Did 扛过去 → see 用原形）', '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 206, 472, 50, "✅  He doesn't like lemons. （doesn't 扛三单 → like 用原形）", '#EEF4E8', '#7C9464', '#2F362C')
        }
      ]
    },
    {
      id: "boundary",
      title: "脑内边界框 & 探照灯：Two coffees 与 a / the",
      tag: "物理边界与定位 · C-01 / C-04 / C-06",
      grade: "1-6年级通用",
      hook: "语法书说 coffee 不能加 -s，为什么店员天天喊 Two coffees？因为装进了杯框！",
      laws: ["C-01", "C-04", "C-05", "C-06", "C-07"],
      words: ["Two coffees, please.", "I like bread and water.", "Look at the dog!"],
      scenes: [
        {
          name: "① 一杯还是无穷液体",
          cap: "书本写 coffee 不可数，因为咖啡倒出来是一大片液体、数不清一二三；可装进杯框就有了边界，立刻能数 Two coffees！",
          say: "Two coffees, please.",
          svg:
            '<rect x="20" y="18" width="244" height="270" rx="14" fill="#FFFBF0" stroke="#E5D5B5" stroke-width="1.5"/>'
            + txt(142, 46, '无边界流体：数不清 ∞', { sz: 14.5, c: '#8A5A1E' })
            + '<path d="M84,96 Q142,74 198,104 Q212,158 176,198 Q112,216 74,174 Q64,124 84,96 Z" fill="#C49A6C" opacity="0.45" class="ess-float"/>'
            + txt(142, 152, 'coffee (物质本身)', { sz: 16, c: '#6E471B' })
            + txt(142, 248, '没有外框 → 不能直接加 -s', { sz: 13, c: '#8A5A1E' })
            + '<rect x="280" y="18" width="260" height="270" rx="14" fill="#F2F7EE" stroke="#85A168" stroke-width="1.8"/>'
            + txt(410, 46, '套上容器框：有边能数！', { sz: 14.5, c: '#4A5A36' })
            + '<rect x="316" y="96" width="80" height="96" rx="12" fill="#FFFDF8" stroke="#5F7448" stroke-width="2.5" stroke-dasharray="6 3"/>'
            + '<rect x="326" y="130" width="60" height="52" rx="6" fill="#C49A6C" opacity="0.65"/>'
            + '<circle cx="356" cy="96" r="14" fill="#5F7448"/>' + txt(356, 101, '1', { sz: 14, c: '#FFF' })
            + '<rect x="424" y="96" width="80" height="96" rx="12" fill="#FFFDF8" stroke="#5F7448" stroke-width="2.5" stroke-dasharray="6 3"/>'
            + '<rect x="434" y="130" width="60" height="52" rx="6" fill="#C49A6C" opacity="0.65"/>'
            + '<circle cx="464" cy="96" r="14" fill="#5F7448"/>' + txt(464, 101, '2', { sz: 14, c: '#FFF' })
            + txt(410, 242, 'Two coffees! (-s 长在杯框上)', { sz: 15, c: '#3D5229' })
        },
        {
          name: "② 一刀切 & 探照灯",
          cap: "苹果切两半就不是「一个完整苹果」= 有边界可数；面包切两半还是面包 = 没边界。而 the 就像一束探照灯，照亮唯一那一只！",
          say: "Look at the dog!",
          svg:
            '<rect x="20" y="18" width="252" height="270" rx="14" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(146, 46, '一刀切测试', { sz: 15, c: '#4A5A36' })
            + pill(40, 68, 212, 48, '苹果切半 → 变两半 ✗ 不是一整个', '#EEF4E8', '#7C9464', '#2F362C')
            + txt(146, 138, '有固定外形 = 可数 (an apple)', { sz: 12.5, c: '#4A5A36' })
            + pill(40, 158, 212, 48, '面包切半 → 还是面包 ✓', '#FFF6DA', '#D6A548', '#7A5410')
            + txt(146, 228, '靠单位来数 (a piece of bread)', { sz: 12.5, c: '#8A5A1E' })
            + '<rect x="288" y="18" width="252" height="270" rx="14" fill="#232B21" stroke="#4A5A36" stroke-width="1.8"/>'
            + txt(414, 46, 'a vs the 探照灯舞台', { sz: 15, c: '#E6F0DA' })
            + '<polygon points="414,68 352,202 476,202" fill="#FFF3B8" opacity="0.28" class="ess-pulse"/>'
            + '<circle cx="340" cy="176" r="22" fill="#3A4236"/>' + txt(340, 182, '狗A', { sz: 13, c: '#8B9584' })
            + '<circle cx="414" cy="176" r="28" fill="#FFF3C4" stroke="#F0C24B" stroke-width="2.5"/>' + txt(414, 182, '这只狗', { sz: 13, c: '#7A5410' })
            + '<circle cx="488" cy="176" r="22" fill="#3A4236"/>' + txt(488, 182, '狗C', { sz: 13, c: '#8B9584' })
            + txt(414, 240, 'a dog 任抓一只 · the dog 打亮唯一那只', { sz: 12, c: '#DCE8CE' })
        },
        {
          name: "③ 边界与打灯实验",
          cap: "亲自试两个机关：给没边的米饭/茶水套上量词框，或者切换 a / the 探照灯看看镜头怎么变化：",
          say: "two bowls of rice",
          interactive: {
            mode: "boundary",
            controls: [
              { id: "cup", label: "🥣 套上量词边界框 (bowl / cup)", defaultOn: true },
              { id: "spot", label: "🔦 打开 the 唯一定位探照灯", defaultOn: true }
            ]
          }
        },
        {
          name: "④ 一理通三句",
          cap: "数不动的材料就套容器把 -s 放在容器上；第一次提起随便抓一只用 a，双方心里都知道那唯一一只用 the！",
          say: "Look at the moon in the sky.",
          svg:
            '<rect x="20" y="20" width="520" height="266" rx="16" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(280, 52, '容器边界 + 探照灯，三句立刻分清', { sz: 15, c: '#4A5A36' })
            + pill(44, 78, 472, 50, '✅  Two glasses of water, please. （-s 加在杯框 glass 上）', '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 142, 472, 50, '✅  I see a bird. Look! The bird is blue. （先报类 a → 再定位 the）', '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 206, 472, 50, '✅  Look at the moon in the sky. （独一无二打亮 the）', '#EEF4E8', '#7C9464', '#2F362C')
        }
      ]
    },
    {
      id: "space",
      title: "三维空间力场：in / on / at 与动作开关",
      tag: "空间几何 & 动词拆解 · P-01 / V-40",
      grade: "1-6年级通用",
      hook: "为什么偏偏说 on the bus（站大平层），却说 in the car（钻进车厢盒子）？",
      laws: ["P-01", "P-02", "P-03", "V-40"],
      words: ["in the pencil box", "on the desk", "at the door", "turn on the light"],
      scenes: [
        {
          name: "① 中文一个「在 / 开」踩的坑",
          cap: "中文一个「在」管地点、一个「开」管开门开灯开车；英语看的不是中文字，而是「盒 / 面 / 点」的空间和具体物理动作！",
          say: "turn on the light",
          svg:
            '<rect x="20" y="18" width="248" height="270" rx="14" fill="#FFF7F5" stroke="#E8C6BF" stroke-width="1.5"/>'
            + txt(144, 48, '❌ 按中文字直译会翻车', { sz: 15, c: '#B85A52' })
            + pill(42, 86, 204, 46, '开灯 → open the light?', '#FDECEC', '#B85A52', '#B85A52')
            + pill(42, 148, 204, 46, '在桌上 → in the desk?', '#FDECEC', '#B85A52', '#B85A52')
            + pill(42, 210, 204, 46, '乘公交 → in the bus?', '#FDECEC', '#B85A52', '#B85A52')
            + '<rect x="284" y="18" width="256" height="270" rx="14" fill="#EEF4E8" stroke="#7C9464" stroke-width="1.6"/>'
            + txt(412, 48, '✅ 母语者只看真实物理画面', { sz: 15, c: '#3D5229' })
            + pill(306, 86, 212, 46, '拧通电闸 → turn on the light', '#FFFFFF', '#5F7448', '#2F362C')
            + pill(306, 148, 212, 46, '贴在表面 → on the desk', '#FFFFFF', '#5F7448', '#2F362C')
            + pill(306, 210, 212, 46, '站在平层 → on the bus', '#FFFFFF', '#5F7448', '#2F362C')
        },
        {
          name: "② 盒 in / 面 on / 点 at",
          cap: "看清这三个三维画面：掉进四面围住的盒子里是 in；压在平铺承重面上是 on；精准钉到某一个坐标位置点上是 at！",
          say: "in the box, on the desk, at the door",
          svg:
            '<rect x="20" y="18" width="520" height="270" rx="16" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            // Box (in)
            + '<rect x="44" y="68" width="144" height="150" rx="14" fill="#EBF4E4" stroke="#5F7448" stroke-width="2.5"/>'
            + '<rect x="64" y="88" width="104" height="110" rx="8" fill="none" stroke="#85A168" stroke-width="1.5" stroke-dasharray="5 3"/>'
            + '<circle cx="116" cy="144" r="22" fill="#D6A548" class="ess-float"/>'
            + txt(116, 150, 'IN', { sz: 14, c: '#FFF' })
            + txt(116, 246, 'in = 围在立体盒子里', { sz: 13.5, c: '#4A5A36' })
            // Plane (on)
            + '<line x1="214" y1="168" x2="348" y2="168" stroke="#5F7448" stroke-width="5" stroke-linecap="round"/>'
            + '<circle cx="281" cy="142" r="22" fill="#5F7448" class="ess-pulse"/>'
            + txt(281, 148, 'ON', { sz: 14, c: '#FFF' })
            + txt(281, 246, 'on = 贴在支撑表面上', { sz: 13.5, c: '#4A5A36' })
            // Point (at)
            + '<circle cx="446" cy="168" r="34" fill="#FFF3D6" stroke="#D6A548" stroke-width="2" stroke-dasharray="4 3"/>'
            + '<circle cx="446" cy="168" r="10" fill="#B85A52"/>'
            + '<path d="M446,96 L446,154" stroke="#B85A52" stroke-width="3.5" stroke-linecap="round"/>'
            + txt(446, 86, 'AT 📍', { sz: 15, c: '#B85A52' })
            + txt(446, 246, 'at = 精准钉在坐标点', { sz: 13.5, c: '#B85A52' })
        },
        {
          name: "③ 空间与开关实验室",
          cap: "亲自切换空间定位（at / on / in），再点开电灯回路开关，体会 turn on（通电接触）和 open（掀开扇面）的动作区别：",
          say: "The cat is in the box.",
          interactive: {
            mode: "space",
            controls: [
              { id: "loc_in", label: "📦 进盒子 in", group: "loc", val: "in", defaultOn: true },
              { id: "loc_on", label: "📏 贴桌面 on", group: "loc", val: "on" },
              { id: "loc_at", label: "📍 钉门口 at", group: "loc", val: "at" },
              { id: "lamp", label: "💡 拧亮电灯开关 turn on", defaultOn: true }
            ]
          }
        },
        {
          name: "④ 一理通三句",
          cap: "脑中先过一遍三维空间，再开口选介词；碰到中文「开」，先想清楚手是在掀盖 open 还是拧开关 turn on！",
          say: "The pen is in the pencil box.",
          svg:
            '<rect x="20" y="20" width="520" height="266" rx="16" fill="#FBFBF9" stroke="#DCE2D5" stroke-width="1.5"/>'
            + txt(280, 52, '空间和动作想清楚，四类高频表达全打通', { sz: 15, c: '#4A5A36' })
            + pill(44, 78, 472, 50, '✅  The pen is in the pencil box. （放进盒子里 → in）', '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 142, 472, 50, '✅  Your book is on the desk. （贴在桌面上 → on）', '#EEF4E8', '#7C9464', '#2F362C')
            + pill(44, 206, 472, 50, '✅  Please turn on the light, and open the door. （按需分工）', '#EEF4E8', '#7C9464', '#2F362C')
        }
      ]
    }
  ]
};
})();
