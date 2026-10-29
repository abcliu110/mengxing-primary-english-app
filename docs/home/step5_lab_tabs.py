"""首页改版第 5 步：王炸实验室页内页签按 发音 / 词汇 / 语法·写作 分组（与首页入口卡一致），去 v4.0 角标与圈号。
以后新增实验室页签：在本文件生成的 LAB_GROUPS 常量里加一项即可（不再手写按钮）。"""
import re
F="萌星小学英语_最终合并版.html"; s=open(F,encoding='utf-8').read()
h=s.index("⚡ 英语全维度母语级底层规律交互沙盘")
b=s.index('<div style="display:flex; gap:6px; flex-wrap:wrap;">',h)
e=s.index("</button>\n      </div>\n    </div>\n    ${bodyHtml}",b)+len("</button>\n      </div>")
old=s[b:e]
tabs=re.findall(r"labTab='(\w+)'",old); assert len(tabs)==13
new='''<div class="lab-tabgroups">${LAB_GROUPS.map(g => `
        <div class="lab-tabgroup"><span class="lab-tabgroup-name">${g.name}</span>${g.tabs.map(([id, label]) => `<button onclick="superLabState.labTab='${id}'; renderSuperLabHubView();" class="lab-tab${tab === id ? ' on' : ''}">${label}</button>`).join("")}</div>`).join("")}
      </div>'''
s=s[:b]+new+s[e:]
groups='''const LAB_GROUPS = [
  { name: "👄 发音", tabs: [["pron_map", "👄 发音五大坑 + 口腔地图"], ["intonation_map", "🎵 语调 · 重音 · 弱读"]] },
  { name: "🔤 词汇", tabs: [["phrasal_key", "🔑 短语动词总钥匙"], ["eight_endings", "🔚 只剩 8 个词尾"], ["irregular_plural", "👣 不规则复数"], ["past_clans", "⚔️ 过去式四大门派"], ["metaphor_code", "🎭 三大隐喻密码"]] },
  { name: "🧩 语法 · ✍️ 写作", tabs: [["bamboo_tree", "🎋 竹节句 vs 树干句"], ["adj_order", "👑 形容词排座次"], ["tense_matrix", "🧭 时 × 体矩阵"], ["aux_transformer", "🪞 助动词照妖镜"], ["five_patterns", "🦴 五大基本句型"], ["writing_alchemist", "🏆 高分作文炼金炉"]] }
];
(function () {
  const st = document.createElement("style");
  st.textContent = `.lab-tabgroups{display:flex;flex-direction:column;gap:6px;}
.lab-tabgroup{display:flex;flex-wrap:wrap;align-items:center;gap:6px;}
.lab-tabgroup-name{font-weight:900;font-size:0.8rem;color:#a7f3d0;min-width:96px;}
.lab-tab{padding:6px 11px;border-radius:10px;font-weight:900;font-size:0.8rem;background:rgba(255,255,255,0.12);color:#fff;border:0;cursor:pointer;font-family:inherit;}
.lab-tab.on{background:#f59e0b;color:#0f172a;}`;
  document.head.appendChild(st);
})();
'''
fn="function renderSuperLabHubView() {"; assert s.count(fn)==1; s=s.replace(fn, groups+fn)
ids=set(re.findall(r'\["(\w+)", "',groups)); assert ids==set(tabs),(ids^set(tabs))
for x,y in [('<span style="background:#10b981; color:#0f172a; padding:3px 11px; border-radius:999px; font-weight:900; font-size:0.78rem;">🚀 v4.0 终极宗师 · 十二大王炸规律实验室</span>','<span style="background:#10b981; color:#0f172a; padding:3px 11px; border-radius:999px; font-weight:900; font-size:0.78rem;">⚡ 王炸实验室</span>'),
 ("⚡ 英语全维度母语级底层规律交互沙盘（点击下方任一王炸引擎立即切换）","底层规律实验室（按发音、词汇、语法分组，点名字切换）"),
 ('["首页", "🚀 v4.0 十二大王炸规律实验室", tabTitles[tab] || "规律实验室"]','["首页", "⚡ 王炸实验室", tabTitles[tab] || "规律实验室"]')]:
    assert s.count(x)==1,x; s=s.replace(x,y)
# tabTitles 去圈号
i=s.index("  const tabTitles = {"); j=s.index("};",i)
s=s[:i]+re.sub(r" [①-⑮] "," ",s[i:j])+s[j:]
open(F,'w',encoding='utf-8').write(s); print("ok")
