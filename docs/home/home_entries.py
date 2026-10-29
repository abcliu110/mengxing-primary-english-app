"""导出首页全部可点击入口（onclick），用于首页改版的零丢失核对。
用法：python3 docs/home/home_entries.py [--save 基线文件] [--check 基线文件]"""
import sys, json, re
from playwright.sync_api import sync_playwright
M = "file:///workspace/work/mengxing-primary-english-app/萌星小学英语_最终合并版.html"
def norm(s): return re.sub(r"\s+", "", s)
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={'width': 430, 'height': 900})
    pg.goto(M); pg.wait_for_timeout(1500)
    ents = pg.evaluate("""()=>[...document.querySelectorAll('#appViewRoot [onclick]')].map(e=>e.getAttribute('onclick'))""")
    h = pg.evaluate("document.body.scrollHeight"); b.close()
targets = sorted(set(norm(x) for x in ents if 'navigateTo' in x))
print(f"首页高度(430px) {h}px · 入口 {len(ents)} 个 · 去重目标 {len(targets)} 个")
a = sys.argv[1:]
if '--save' in a: json.dump(targets, open(a[a.index('--save')+1], 'w'), ensure_ascii=False, indent=1)
if '--check' in a:
    base = json.load(open(a[a.index('--check')+1])); miss = [t for t in base if t not in targets]
    print("缺失:", miss if miss else "0"); sys.exit(1 if miss else 0)
else:
    for t in targets: print(" ", t)
