"""gen_font_chars.py —— 收集所有 v5 场景（scenes/*.js）+ 主 App 正文（三大厅等待重画内容的来源）用到的非 ASCII 字符写进 font_chars.txt：全 App 共用一份字体子集。
这样以后从 App 搬内容重画的新幕基本不会出现新字，不必每次全部重建；真有新字时重跑本脚本再 rebuild_all.py。"""
import glob, os
HERE = os.path.dirname(os.path.abspath(__file__))
ch = set()
for f in glob.glob(os.path.join(HERE, 'scenes', '*.js')): ch |= {c for c in open(f, encoding='utf-8').read() if ord(c) > 127}
import re
app = open(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'), encoding='utf-8').read()
app = re.sub(r'<script type="text/plain" id="wb5[a-z]+-[^"]+"[^>]*>.*?</script>', '', app, flags=re.S)
ch |= {c for c in app if ord(c) > 127}
open(os.path.join(HERE, 'font_chars.txt'), 'w', encoding='utf-8').write(''.join(sorted(ch)))
print(len(ch), 'chars')
