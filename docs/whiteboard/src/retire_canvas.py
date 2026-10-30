#!/usr/bin/env python3
"""retire_canvas.py [--dry] —— HANDOFF §5.2 第 3 项：退役各厅旧 canvas 兜底动画（第一性原理 + 三大厅 HD 剧场 + 实验室 + 词卡）。

做法（幂等）：
1. 下面 T 里的每个 start*Canvas 函数，保留开头的「换成 v5 白板」判断（wb5HDSwap / wb5TplSwap / wb5Mount / startVVLoop …），
   删掉后面的旧 canvas 绘制循环（内部 function loop / drawFrame + requestAnimationFrame），换成 wb5MissingStage(canvas)：
   缺 v5 幕时画一行「这一幕的白板动画还没收录」，不再跑旧动画。
2. 无人调用清理：被删代码里引用过的顶层函数，如果全文件只剩它自己的定义（词边界计数 = 1），一并删除；删掉的函数再带出新的候选，迭代到不动点。
   只删顶层 function 声明，不动数据常量；按需加载的白板块（gzip）里本来就不引用 App 函数。
3. 用 appwrite.save 写回（写前 anchorcheck、写后 jscheck，不过自动还原）。
需要 node + acorn（src/fnranges.js）。"""
import json, re, subprocess, sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
import appwrite
APP = appwrite.APP
T = ['startFormationStageCanvas', 'startFirstPrinciplesCanvasLoop', 'startWordModalCanvasAnim', 'startSuperLabCanvasLoop',
     'startSummaryHubCanvas', 'startRelationsStageCanvas', 'startPhonicsStageCanvas', 'startOralSituationalCanvas',
     'startGrammarWhyCanvas', 'startFrameSemanticsCanvas']
MARK = '// WB5_RETIRED_CANVAS'
HELPER = '''
function wb5MissingStage(canvas) {   // WB5_RETIRED_CANVAS：旧 canvas 兜底动画已退役（2026-10-31），缺 v5 幕时只给提示
  try {
    const setup = setupHiDPICanvas(canvas, 740, 320); if (!setup) return;
    const { ctx, W, H } = setup; ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#faf9f6"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#94a3b8"; ctx.font = "15px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("这一幕的白板动画还没收录", W / 2, H / 2); ctx.textAlign = "left";
  } catch (e) {}
}
'''
def ranges(s):
    p = pathlib.Path('/tmp/_rc.html'); p.write_text(s, encoding='utf-8')
    return json.loads(subprocess.run(['node', str(HERE / 'fnranges.js'), str(p)], capture_output=True, text=True, check=True).stdout)
def idents(code): return set(re.findall(r'\b[A-Za-z_$][A-Za-z0-9_$]*\b', code))
def main():
    s = APP.read_text(encoding='utf-8'); n0 = len(s)
    F = {f['name']: f for f in ranges(s)}
    removed_code = []
    if 'function wb5MissingStage(' not in s:
        edits = []
        for name in T:
            f = F[name]; body = f['body']
            k = max(i for i, b in enumerate(body) if b['type'] == 'FunctionDeclaration')
            assert k == len(body) - 2 and 'requestAnimationFrame' in s[body[-1]['start']:body[-1]['end']], name
            a, b = body[k]['start'], body[-1]['end']
            removed_code.append(s[a:b]); edits.append((a, b, 'wb5MissingStage(canvas);   ' + MARK))
        for a, b, rep in sorted(edits, reverse=True): s = s[:a] + rep + s[b:]
        i = s.find('function setupHiDPICanvas('); assert s.count('function setupHiDPICanvas(') == 1
        s = s[:i] + HELPER.lstrip() + '\n' + s[i:]
    # 无人调用清理（迭代）
    cand = set().union(*(idents(c) for c in removed_code)) if removed_code else set()
    dead_all = []
    while cand:
        F = {f['name']: f for f in ranges(s)}
        dead = [n for n in cand if n in F and n not in T and len(re.findall(r'(?<![A-Za-z0-9_$])' + re.escape(n) + r'(?![A-Za-z0-9_$])', s)) == 1]
        if not dead: break
        cand = set()
        for n in sorted(dead, key=lambda n: -F[n]['start']):
            f = F[n]; code = s[f['start']:f['end']]; cand |= idents(code); dead_all.append((n, len(code)))
            a, b = f['start'], f['end']
            while b < len(s) and s[b] == '\n' and s[b + 1:b + 2] == '\n': b += 1
            s = s[:a] + s[b:]
    print('截断', len(removed_code), '个兜底循环，删除无人调用函数', len(dead_all), '个：', ', '.join(f'{n}({l})' for n, l in dead_all))
    print('主文件', n0, '→', len(s), '字符（-%d）' % (n0 - len(s)))
    if '--dry' not in sys.argv: appwrite.save(s); print('已写回')
main()
