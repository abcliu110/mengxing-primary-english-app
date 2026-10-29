"""首页改版第 2 步：首页 15 张王炸卡收成一张「王炸实验室」入口卡，按 发音 / 词汇 / 语法 / 写作 四组列小按钮。
每个按钮的 onclick 与原卡片逐字相同（含单词身世 wo_vowel_a、单词卡 X 光 openWordCardModal），入口零丢失。"""
import re
F="萌星小学英语_最终合并版.html"; s=open(F,encoding='utf-8').read()
a=s.index("    <!-- v4.0 终极宗师版：十二大王炸全规律实验室 -->")
b=s.index("    <div onclick=\"navigateTo('v6_hub')\"")
old=s[a:b]
# 从旧块里取 onclick，确保逐字一致
cl=re.findall(r'<div onclick="([^"]+)"',old); assert len(cl)==15,len(cl)
def oc(key):
    m=[c for c in cl if key in c]; assert len(m)==1,key; return m[0]
G=[("👄 发音","#e11d48","#fff1f2",[("pron_map","👄 发音五大坑 + 口腔地图"),("intonation_map","🎵 语调 · 重音 · 弱读")]),
   ("🔤 词汇","#2563eb","#eff6ff",[("phrasal_key","🔑 短语动词总钥匙"),("eight_endings","🔚 只剩 8 个词尾"),("irregular_plural","👣 不规则复数"),("past_clans","⚔️ 过去式四大门派"),("metaphor_code","🎭 三大隐喻密码"),("wo_vowel_a","🧬 元音变异 foot→feet"),("openWordCardModal","🔬 单词卡 X 光")]),
   ("🧩 语法","#7c3aed","#f5f3ff",[("bamboo_tree","🎋 竹节句 vs 树干句"),("adj_order","👑 形容词排座次"),("tense_matrix","🧭 时 × 体矩阵"),("aux_transformer","🪞 助动词照妖镜"),("five_patterns","🦴 五大基本句型")]),
   ("✍️ 写作","#b45309","#fffbeb",[("writing_alchemist","🏆 高分作文炼金炉")])]
used=set()
rows=[]
for name,c,bg,items in G:
    chips="".join(f'<button type="button" class="lab-chip" onclick="event.stopPropagation(); {oc(k)}" style="border-color:{c}33; color:{c};">{t}</button>' for k,t in items)
    used|={oc(k) for k,_ in items}
    rows.append(f'''        <div class="lab-group" style="background:{bg};">
          <div class="lab-group-name" style="color:{c};">{name}</div>
          <div class="lab-chips">{chips}</div>
        </div>''')
assert used==set(cl),set(cl)-used
new=f'''    <!-- 王炸实验室入口卡（首页改版第 2 步：15 张卡收成一张，按四组直达） -->
    <style>
      .lab-entry{{background:#fff;border-radius:22px;padding:18px 20px;border:2px solid #10b981;margin-bottom:22px;box-shadow:0 8px 20px rgba(5,150,105,0.10);}}
      .lab-entry-head{{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;}}
      .lab-entry-head h2{{margin:0;font-size:1.3rem;color:#0f172a;font-weight:900;}}
      .lab-entry-head p{{margin:3px 0 0;font-size:0.86rem;color:#475569;}}
      .lab-entry-go{{background:#059669;color:#fff;border:0;font-weight:900;font-size:0.95rem;padding:10px 16px;border-radius:14px;cursor:pointer;white-space:nowrap;}}
      .lab-groups{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;}}
      .lab-group{{border-radius:14px;padding:10px 12px;}}
      .lab-group-name{{font-weight:900;font-size:0.92rem;margin-bottom:6px;}}
      .lab-chips{{display:flex;flex-wrap:wrap;gap:6px;}}
      .lab-chip{{background:#fff;border:1.5px solid;border-radius:999px;padding:5px 10px;font-size:0.8rem;font-weight:800;cursor:pointer;font-family:inherit;}}
      .lab-chip:hover{{filter:brightness(0.95);transform:translateY(-1px);}}
    </style>
    <div class="lab-entry">
      <div class="lab-entry-head">
        <div>
          <h2>⚡ 王炸实验室</h2>
          <p>底层规律按发音、词汇、语法、写作分组，点名字直达。</p>
        </div>
        <button type="button" class="lab-entry-go" onclick="{oc("phrasal_key")}">进入实验室 ➔</button>
      </div>
      <div class="lab-groups">
{chr(10).join(rows)}
      </div>
    </div>

'''
s=s[:a]+new+s[b:]; open(F,'w',encoding='utf-8').write(s); print("ok, chips",sum(len(g[3]) for g in G))
