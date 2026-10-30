"""gen_oral_inventory.py —— 日常用语小剧场：从主文件 DAILY_EXPRESSIONS_DB 直接导出 R1 清单（每场景一个页签 hd_oral_scXX，每句表达一个案例）。
旧 canvas 三幕只是同一段对话轮流高亮，所以新白板一幕放完整段对话；清单 = 旧舞台上所有文字（横幅三行 + 每轮对话 + 每轮字幕）。"""
import json, pathlib, re, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[3]
APP = ROOT / '萌星小学英语_最终合并版.html'
js = "const fs=require('fs');const s=fs.readFileSync(process.argv[1],'utf8');for(const k of ['DAILY_EXPRESSIONS_DB','SCENARIO_DEFINITIONS']){const i=s.indexOf('const '+k+' = ');const j=s.indexOf('];',i);global[k]=eval(s.slice(i+k.length+9,j+1));}console.log(JSON.stringify([DAILY_EXPRESSIONS_DB,SCENARIO_DEFINITIONS]))"
db, scs = json.loads(subprocess.run(['node', '-e', js, str(APP)], capture_output=True, text=True, check=True).stdout)
nz = lambda x: ' '.join(str(x).replace('|', '｜').split())
for sc in scs:
    lst = [e for e in db if e['scenario_id'] == sc['id']]
    out = [f"# 内容清单（R1 零丢失）：日常用语小剧场 `hd_oral_{sc['id'].lower()}`（{sc['title']}）\n\n> 由 `src/gen_oral_inventory.py` 从主文件 DAILY_EXPRESSIONS_DB 导出（旧 canvas 舞台上的全部文字 + 字幕 / 配音）。重画后逐条打勾：新位置只增不减。\n"]
    for i, e in enumerate(lst):
        rows = [('白板', e['scenario_title'] or '交际小剧场'), ('白板', f"核心交际句：{e['en']} （{e['zh']}）"), ('白板', f"💡 交际得体度与母语负迁移提示：{e['usage_note']}")]
        for k, tr in enumerate(e['dialogue']):
            rows += [('白板', f"对话第{k + 1}轮"), ('白板', f"{tr.get('avatar', '🗣️')} 角色 {tr.get('speaker', 'AB'[k % 2])}：{tr['en']}"), ('白板', tr['zh']), ('朗读', f"{tr['en']} ｜ {tr['zh']}")]
        out.append(f"\n## 案例 {i + 1}（{e['id']}）\n\n| ☐ | 时间 | 类型 | 内容 |\n|---|---|---|---|\n" + '\n'.join(f'| ☐ | {j:.1f}s | {t} | {nz(x)} |' for j, (t, x) in enumerate(rows)) + '\n')
    (ROOT / 'docs/whiteboard/lab' / f"INVENTORY_HD_ORAL_{sc['id']}_EXPORT.md").write_text(''.join(out), encoding='utf-8')
    print(sc['id'], len(lst))
