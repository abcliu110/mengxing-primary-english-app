#!/usr/bin/env python3
"""export_storyboard.py <幕 id> [案例序号=0] —— 从实际时间轴导出「逐条时间码」表（Markdown），给分镜文档用。
内容：字幕（N）、朗读（say，含先读的单词和预留时长）、人物动作（k.act，含 R4 动作词）、场景动作（k.actFx）、板擦转场。
时间是 D.finish 节奏压缩之后的时间；朗读按预留时长估算（真实播放时时间轴跟着语音事件走）。"""
import os, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
sid = sys.argv[1]; ci = int(sys.argv[2]) if len(sys.argv) > 2 else 0
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page()
    pg.goto('file://' + os.path.join(HERE, 'preview.html') + '?tab=' + sid); pg.wait_for_timeout(600)
    rows = pg.evaluate("""([sid, ci]) => {
      let S = null;
      // 重新 build 一次拿到 S（kit 返回的对象上有 S）
      const st = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); document.body.appendChild(st);
      const orig = WB_LAB[sid][ci].build;
      const p = WB.mount(st, k => { S = k.S; orig(k); }, 7 + ci);
      const out = [];
      S.narr.forEach(n => out.push([n[0], '字幕', (n[1] || '') + (n[2] || '')]));
      S.says.forEach(sy => out.push([sy.t, '🔊 朗读', sy.en + (sy.word ? '  〔先读：' + sy.word + '〕' : '') + ' (' + sy.dur.toFixed(1) + 's)']));
      (S.acts || []).forEach(a => out.push([a.t, '🎭 动作', (a.fx ? '场景 · ' + a.look : a.look + ' · ' + a.action) + ' ' + a.dur.toFixed(1) + 's' + (a.words && a.words.length ? ' 〔' + a.words.join('/') + '〕' : '')]));
      (S.wipes || []).forEach(w => out.push([w.t, '🧽 转场', '板擦擦除 ' + w.dur.toFixed(2) + 's']));
      out.sort((a, b) => a[0] - b[0]);
      return { end: p.end, out };
    }""", [sid, ci])
    b.close()
fmt = lambda t: f"{int(t // 60)}:{t % 60:04.1f}"
print(f"总长约 {rows['end']:.0f} 秒\n\n| 时间 | 类型 | 内容 |\n|---|---|---|")
for t, ty, c in rows['out']:
    print(f"| {fmt(max(0, t))} | {ty} | {c.replace('|', '/')} |")
