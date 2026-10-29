"""首页改版第 3 步：三大厅上移到首屏；三大总枢压成并排小卡；方法论教室移到底部小卡。onclick 全部逐字取自旧块。"""
import re
F="萌星小学英语_最终合并版.html"; s=open(F,encoding='utf-8').read()
M=["    <!-- v1.6 Flagship Banner","    <!-- 王炸实验室入口卡","    <div onclick=\"navigateTo('v6_hub')\"",
   "      <div class=\"home-portal-grid\">","      <div class=\"portal-card method\"","\n  `;\n}\n\n// Parent Gate"]
idx=[s.index(m) for m in M]; assert idx==sorted(idx) and idx[-1]-idx[0]<40000
hubs,lab,v6,grid,method=[s[idx[i]:idx[i+1]] for i in range(5)]
assert method.rstrip().endswith("</div>\n    </div>")
method_card=method.rstrip()[:-len("    </div>")].rstrip()+"\n"   # 去掉 grid 的收尾 </div>
oc=re.findall(r'<div onclick="([^"]+)"',hubs); assert len(oc)==3
moc=re.search(r'onclick="([^"]+)"',method_card).group(1); assert moc=="navigateTo('method_hub')"
cards=[(oc[0],"🧠","六大第一性原理","一理通百词，一理通百句","#4338ca","#eef2ff"),
       (oc[1],"📖","单词身世","罗马、维京、诺曼、大航海，单词的故事","#7c3aed","#f5f3ff"),
       (oc[2],"🔀","中英对照","中文习惯哪些能搬、哪些不能搬","#0f766e","#f0fdfa")]
def mini(o,ic,t,d,c,bg): return f'''        <div class="hub-mini" onclick="{o}" style="background:{bg}; border-color:{c}40;">
          <div class="hub-mini-ic">{ic}</div>
          <div><div class="hub-mini-t" style="color:{c};">{t}</div><div class="hub-mini-d">{d}</div></div>
          <div class="hub-mini-go" style="color:{c};">➔</div>
        </div>'''
style='''    <style>
      .home-sec{font-size:1.05rem;font-weight:900;color:#334155;margin:6px 2px 10px;}
      .hub-minis{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-bottom:22px;}
      .hub-mini{display:flex;align-items:center;gap:12px;border:2px solid;border-radius:16px;padding:12px 14px;cursor:pointer;transition:transform .15s;}
      .hub-mini:hover{transform:translateY(-2px);}
      .hub-mini-ic{font-size:1.7rem;}
      .hub-mini-t{font-weight:900;font-size:1rem;}
      .hub-mini-d{font-size:0.8rem;color:#475569;margin-top:2px;}
      .hub-mini-go{margin-left:auto;font-weight:900;}
    </style>
'''
new=(style+'    <div class="home-sec">📚 今天学什么</div>\n'+grid.rstrip()+"\n      </div>\n\n"+v6
     +'    <div class="home-sec">🧭 理解英语：三大总枢</div>\n    <div class="hub-minis">\n'+"\n".join(mini(*c) for c in cards)+"\n    </div>\n\n"
     +lab
     +'    <div class="home-sec">👑 更多</div>\n    <div class="hub-minis">\n'+mini(moc,"👑","方法论 / 真动画教室","天坑测验 · 三幕剧 · 句法火车 · 变形拼写台","#b45309","#fffbeb")+"\n    </div>")
s=s[:idx[0]]+new+s[idx[5]:]
open(F,'w',encoding='utf-8').write(s); print("ok")
# 顶栏品牌角标去版本号（第 3 步一并处理；脚本已执行过，下行仅作记录）
# sed: brand-badge「v4.0 终极宗师·十二大王炸全规律版」→「小学英语 · 课标同步」
