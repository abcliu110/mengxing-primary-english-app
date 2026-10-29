"""首页改版第 4 步：顶部压缩、三大厅卡片瘦身、王炸卡「写作」并入「语法」、顶栏打卡去日期。"""
F="萌星小学英语_最终合并版.html"; s=open(F,encoding='utf-8').read()
css='''
  /* 首页改版第 4 步：瘦身 */
  .tts-unlock-banner { padding: 8px 14px; margin-bottom: 12px; gap: 10px; border-width: 1.5px; }
  .tts-unlock-banner > div > span { font-size: 1.4rem !important; }
  .tts-unlock-banner > div > div > div:first-child { font-size: 0.92rem !important; }
  .tts-unlock-btn { font-size: 0.9rem; padding: 7px 16px; min-height: 38px; box-shadow: none; }
  .home-hero-title { margin: 2px 0 12px; }
  .home-hero-title h1 { font-size: 1.45rem; margin: 0 0 2px; }
  .home-hero-title p { font-size: 0.86rem; }
  .portal-card { padding: 16px 18px; min-height: 0; border-width: 2px; }
  .portal-card > div:first-child { display: grid; grid-template-columns: auto 1fr; column-gap: 12px; align-items: center; }
  .portal-card > div:first-child > :not(.portal-icon):not(.portal-title):not(.portal-sub) { grid-column: 1 / -1; }
  .portal-icon { font-size: 2.3rem; margin: 0; grid-row: span 2; }
  .portal-title { font-size: 1.3rem; margin: 0; }
  .portal-sub { font-size: 0.84rem; margin: 2px 0 0; }
  .portal-tags { margin: 10px 0 8px; }
  .portal-tag:nth-child(n+4) { display: none; }
  .portal-enter-btn { padding: 10px; min-height: 0; font-size: 0.98rem; }
  .home-portal-grid { gap: 14px; margin-bottom: 18px; }
  #uiStudyDateBadge { display: none; }
  @media (max-width: 640px) { .home-hero-title p { display: none; } }
'''
anchor="  /* Vocabulary Hall Visual Hierarchy"
assert s.count(anchor)==1; s=s.replace(anchor, css+"\n"+anchor)
# 写作并入语法
i=s.index('<div class="lab-group-name" style="color:#7c3aed;">🧩 语法</div>')
w0=s.index('        <div class="lab-group" style="background:#fffbeb;">')
w1=s.index('        </div>\n',s.index('<div class="lab-chips">',w0))+len('        </div>\n')
wchip=s[s.index('<button',w0):s.index('</div>',s.index('<button',w0))]
s=s[:w0]+s[w1:]
assert s.count('<div class="lab-group-name" style="color:#7c3aed;">🧩 语法</div>')==1  # 锚点没对上就报错（2026-10-30 加）
s=s.replace('<div class="lab-group-name" style="color:#7c3aed;">🧩 语法</div>','<div class="lab-group-name" style="color:#7c3aed;">🧩 语法 · ✍️ 写作</div>')
j=s.index('</div>',s.index('<div class="lab-chips">',s.index('🧩 语法 · ✍️ 写作')))
s=s[:j]+wchip.replace('color:#b45309','color:#7c3aed').replace('#b4530933','#7c3aed33')+s[j:]
s=s.replace("grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;}}","grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;}}")
open(F,'w',encoding='utf-8').write(s); print("ok")
