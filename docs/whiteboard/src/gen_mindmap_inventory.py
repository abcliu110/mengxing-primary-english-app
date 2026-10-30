"""gen_mindmap_inventory.py —— 主题思维导图讲解幕（页签 hd_mindmap，25 个子主题各 1 幕）的 R1 内容清单。
从主文件 VOCAB_DB 直接导出旧交互导图（initThemeMindMapCanvas / drawThemeMindMap）画在 canvas 上的全部文字：
  中心「🌍 子主题」+ 提示「点击周围节点开卡学习」；16 个单词节点的「emoji 单词」与中文词义（旧图 slice(0,8) 截断，清单用完整词义，只增不减）；
  左右两框标题「🔗 常用搭配动词」「✨ 评价形容词」与各前 3 条（取子主题第一个词的 collocations，与旧页面一致）。
幕序号 = VOCAB_DB 里子主题首次出现的顺序（与 v5/mindmap_groups.json 的 idx、App 挂钩里的计算一致）。
输出 lab/INVENTORY_HD_MINDMAP_EXPORT.md（格式同 export_hd_inventory.py，v5/r1v5.py 直接核对）。"""
import json, pathlib, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[3]
APP = ROOT / '萌星小学英语_最终合并版.html'
js = "const fs=require('fs');const s=fs.readFileSync(process.argv[1],'utf8');const i=s.indexOf('const VOCAB_DB = ');const j=s.indexOf('];\\n',i);console.log(JSON.stringify(eval(s.slice(i+16,j+1))))"
db = json.loads(subprocess.run(['node', '-e', js, str(APP)], capture_output=True, text=True, check=True).stdout)
nz = lambda x: ' '.join(str(x).replace('|', '｜').split())
subs = {}
for w in db: subs.setdefault(w['theme_sub'], []).append(w)
out = ['# 内容清单（R1 零丢失）：主题思维导图讲解幕 `hd_mindmap`（25 个子主题）\n\n> 由 `src/gen_mindmap_inventory.py` 从主文件 VOCAB_DB 导出（旧交互导图 canvas 上的全部文字；单词节点用完整词义）。下方交互导图保留不动，这里只核对新讲解幕。\n']
for k, (sub, ws) in enumerate(subs.items()):
    nodes = ws[:18][:16]
    col = ws[0].get('collocations') or {'verbs': ['use (使用)', 'see (看见)'], 'adjs': ['good (好的)', 'nice (不错的)']}
    rows = [('白板', f'🌍 {sub}'), ('白板', '点击周围节点开卡学习')]
    for w in nodes: rows += [('白板', f"{w['emoji']} {w['word']}"), ('白板', w['meaning'])]
    rows += [('白板', '🔗 常用搭配动词')] + [('白板', v) for v in (col.get('verbs') or [])[:3]]
    rows += [('白板', '✨ 评价形容词')] + [('白板', a) for a in (col.get('adjs') or [])[:3]]
    out.append(f"\n## 案例 {k + 1}（{sub}）\n\n| ☐ | 时间 | 类型 | 内容 |\n|---|---|---|---|\n" + '\n'.join(f'| ☐ | {j:.1f}s | {t} | {nz(x)} |' for j, (t, x) in enumerate(rows)) + '\n')
dst = ROOT / 'docs/whiteboard/lab/INVENTORY_HD_MINDMAP_EXPORT.md'
dst.write_text(''.join(out), encoding='utf-8'); print(dst.name, len(subs), '幕')
