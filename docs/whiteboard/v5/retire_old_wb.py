"""retire_old_wb.py —— 老白板全部换成 v5.1 后，删掉主 App 里的旧 SVG 白板兜底（用户 2026-10-30 16:11 同意「解决问题 2」）。幂等，可重复执行。
删除：① 所有按需加载的旧白板模块 <script type="text/plain" id="wbmod-*">（含旧万能动词 SVG 剧场 wbmod-vv、道具、开发样板，约 2.8 MB）；
      ② 旧 SVG 白板引擎 WB / 人物骨架 / 动作库（<<WB_ENGINE_START>> 到「App 接线」之前，约 127 KB）。
保留：可信度徽章 WB.BADGES（单词身世、章节卡片在用）；术语小词典改读 WB_TERMS（v5/wb_terms.json，从旧案例原样导出的 terms，零丢失）；
      wbStageHtml 没有 v5 版时不再出旧 SVG（第一性原理出旧 Canvas、单词身世出「即将上线」，与原兜底一致）。"""
import json, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[3]
APP = ROOT / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); n0 = len(s.encode())
terms = json.loads((ROOT / 'docs/whiteboard/v5/wb_terms.json').read_text(encoding='utf-8'))

# ① 旧模块
s, nm = re.subn(r'<script type="text/plain" id="wbmod-[a-z_]+"[^>]*>.*?</script>\n?', '', s, flags=re.S)

# ② 旧引擎 → 只留徽章
if '// <<WB_ENGINE_START>>' in s:
    a = s.index('// <<WB_ENGINE_START>>'); b = s.index('// ---------- App 接线：王炸实验室白板播放器', a)
    seg = s[a:b]
    bad = re.search(r'const BADGES = (\{.*?\n  \});', seg, re.S).group(1)
    keep = ('// <<WB_OLD_RETIRED>> 旧 SVG 白板引擎已删除（2026-10-30，v5.1 全部替换完成，见 docs/whiteboard/v5/retire_old_wb.py）\n'
            '// 可信度徽章（单词身世骨架；全 App 通用）\n'
            f'const WB = {{ BADGES: {bad} }};\n'
            '// 各页签的术语小词典（从旧白板案例原样导出：WB_TERMS[页签][幕] = [[术语, 解释], ...]）\n'
            f'const WB_TERMS = {json.dumps(terms, ensure_ascii=False)};\n'
            'const WB_LAB = {};\n\n')
    s = s[:a] + keep + s[b:]

def rep(old, new):
    global s
    if new in s: return
    assert s.count(old) == 1, old[:60]; s = s.replace(old, new)

rep('''function wbCases(tab) {
  if (typeof WB_LAB === "undefined") return null;
  if (!WB_LAB[tab]) wbLoadModule(tab);
  return WB_LAB[tab] || null;
}''', '''function wbCases(tab) {   // 旧 SVG 白板已删：只剩术语（WB_TERMS）
  return typeof WB_TERMS !== "undefined" && WB_TERMS[tab] ? WB_TERMS[tab].map(t => ({ terms: t })) : null;
}''')
rep('''  if (wb5El(tab, idx)) return wb5StageHtml(tab, idx, withGloss);   // WB5_EMBED WB5_EMBED_V2
  const cs = wbCases(tab);''', '''  if (wb5El(tab, idx)) return wb5StageHtml(tab, idx, withGloss);   // WB5_EMBED WB5_EMBED_V2
  const cs = null;   // WB_OLD_RETIRED：没有 v5 版时不再出旧 SVG 白板''')
rep('''function woSceneReady(id) { return typeof WB_LAB !== "undefined" && (!!(WB_LAB[id] && WB_LAB[id].length) || (typeof wbModEl === "function" && !!wbModEl(id))); }''',
    '''function woSceneReady(id) { return !!((typeof WB_TERMS !== "undefined" && WB_TERMS[id]) || (typeof wb5El === "function" && wb5El(id, 0))); }   // WB_OLD_RETIRED''')
APP.write_text(s, encoding='utf-8')
print('removed modules', nm, 'bytes', n0, '->', len(s.encode()))
