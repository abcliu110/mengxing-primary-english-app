"""首页改版第 1 步：删重复的方法论横幅、去版本号 / 「新」角标、改王炸栏标题。只动首页模板，入口目标不变。"""
import re
F="萌星小学英语_最终合并版.html"; s=open(F,encoding='utf-8').read()
a=s.index("    <div onclick=\"navigateTo('method_hub')\""); b=s.index("    <div onclick=\"navigateTo('v6_hub')\"")
assert 0<b-a<2500; s=s[:a]+s[b:]
for x,y in [("👑 v1.6 专家级核心升级 · 大道至简","👑 大道至简"),
 ("🚀 v4.0 终极宗师版 · 十二大王炸底层规律大满贯","🚀 王炸底层规律"),
 ("⚡ 十二大「王炸级」深度规律与跨界实验室（点击任一引擎直达）","⚡ 王炸实验室（点任一卡片直达）"),
 ("🎮 v6 扩展 · 词库+闯关厅","🎮 词库 + 闯关厅"),(">v6 拓展教室 / 闯关游戏厅<",">拓展教室 / 闯关游戏厅<")]:
    assert s.count(x)==1,x; s=s.replace(x,y)
m=re.search(r'\n\s*<span style="font-size:0.85rem; color:#047857; font-weight:800;">新增：⑨[^<]*</span>',s); assert m; s=s[:m.start()]+s[m.end():]
s,k1=re.subn(r'(王炸 [①-⑮]) · v4\.0全新 · ',r'\1 · ',s); s,k2=re.subn(r'(王炸 [①-⑮]) · 新 · ',r'\1 · ',s)
print("badges",k1,k2); open(F,'w',encoding='utf-8').write(s)
