"""gen_poly_inventory.py —— 单词卡「一词多义三幕分镜」：从主文件 VOCAB_DB 直接导出 R1 清单（每个多义词一个页签 hd_poly_<id>，三幕 = 三个案例）。
旧 canvas 舞台上的文字被 slice 截断，清单用数据里的完整原句（只增不减）。"""
import json, pathlib, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[3]
APP = ROOT / '萌星小学英语_最终合并版.html'
js = "const fs=require('fs');const s=fs.readFileSync(process.argv[1],'utf8');const i=s.indexOf('const VOCAB_DB = ');const j=s.indexOf('];\\n',i);const d=eval(s.slice(i+16,j+1));console.log(JSON.stringify(d.filter(w=>w.has_polysemy&&w.polysemy_data)))"
ws = json.loads(subprocess.run(['node', '-e', js, str(APP)], capture_output=True, text=True, check=True).stdout)
nz = lambda x: ' '.join(str(x).replace('|', '｜').split())
for w in ws:
    p = w['polysemy_data']; ss = w.get('senses') or []
    s0 = ss[0] if ss else {'pos': w['pos'], 'meaning': w['meaning'], 'ex_en': w['example_en'], 'ex_zh': w['example_zh']}
    s1 = ss[1] if len(ss) > 1 else s0
    out = [f"# 内容清单（R1 零丢失）：单词卡一词多义 `hd_poly_{w['id'].lower()}`（{w['word']}）\n\n> 由 `src/gen_poly_inventory.py` 从主文件 VOCAB_DB 导出（旧 canvas 舞台文字的完整原句 + 字幕 / 配音）。\n"]
    for a in range(3):
        desc = p[f'act{a + 1}']; ex = s1 if a == 2 else s0
        rows = [('白板', '一词多义演变'), ('白板', f"{w['emoji']} {w['word']} {w['phonetic']} — 【{w['pos']}】{w['meaning']}"), ('白板', f"核心意象纽带：{p['core_concept']}"),
                ('白板', f"① 本义具象：{s0['pos']} {s0['meaning']}"), ('白板', s0['ex_en']),
                ('白板', f"② 意象桥梁：{p['core_concept']}"), ('白板', '核心动作/形状迁移'),
                ('白板', f"③ 引申新义：{s1['pos']} {s1['meaning']}"), ('白板', s1['ex_en']),
                ('白板', f"多义第{a + 1}幕"), ('朗读', f"{ex['ex_en']} ｜ {desc}")]
        out.append(f"\n## 案例 {a + 1}（多义第 {a + 1} 幕）\n\n| ☐ | 时间 | 类型 | 内容 |\n|---|---|---|---|\n" + '\n'.join(f'| ☐ | {j:.1f}s | {t} | {nz(x)} |' for j, (t, x) in enumerate(rows)) + '\n')
    (ROOT / 'docs/whiteboard/lab' / f"INVENTORY_HD_POLY_{w['id'].upper()}_EXPORT.md").write_text(''.join(out), encoding='utf-8')
    print(w['id'].lower(), w['word'])
