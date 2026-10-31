import json,re,collections
S=json.load(open('scenes.json'))
def mod(f):
    k=f[:-3]
    for p,m in [('hd_phonics','拼读'),('hd_formation','构词'),('eight_endings','构词'),('irregular_plural','构词'),('wordcard','单词卡'),('hd_g','语法40点'),('hd_sum','语法总结'),('tense_matrix','时态矩阵'),('past_clans','语法王炸实验室'),('adj_order','语法王炸实验室'),('aux_transformer','语法王炸实验室'),('five_patterns','语法王炸实验室'),('bamboo_tree','语法王炸实验室'),('writing_alchemist','语法王炸实验室'),('phrasal_key','万能动词'),('vv_','万能动词'),('hd_fr','框架语义'),('wo_grimm','格林定律/词源'),('wo_rule','格林定律/词源'),('wo_','格林定律/词源'),('hd_oral','口语场景'),('oral_func','口语场景'),('hd_mindmap','思维导图'),('fp_','底层原理'),('ze_','中英对照'),('metaphor_code','隐喻'),('hd_poly','多义词'),('hd_relations','词语关系'),('pron_map','发音'),('stress_rhythm','发音'),('intonation_map','发音'),('adj_train','语法王炸实验室')]:
        if k.startswith(p): return m
    return '?'
GEN={'l_write0','l_speak','l_think','l_point','l_wave','l_nod','l_present'}
rows=[]
for x in S:
    if x['f'] in('auto.js','wordcard_items.js'): continue
    it=x['items'] if isinstance(x['items'],list) else []
    c=collections.Counter(i[0] for i in it)
    wch=sum(len(i[1]) for i in it if i[0] in 'wm')
    nch=sum(len(i[1]) for i in it if i[0]=='n')
    acts=x['acts'] or {}
    generic = (not acts) or (list(acts.keys())==['*'] or (bool(acts) and all(set(v)<=GEN for v in acts.values())))
    txt=' '.join(str(i[1]) for i in it)
    q=len(re.findall(r'🔮|猜|预测|你觉得|想一想|为什么',txt))
    cmp_=len(re.findall(r'✗|❌|vs|对比|不同|反差|变成',txt))
    rows.append(dict(f=x['f'],m=mod(x['f']),b=x['b'],n_w=c['w']+c['m'],n_s=c['s'],n_n=c['n'],n_p=c['p'],wch=wch,nch=nch,acts=len(acts),generic=generic,q=q,cmp=cmp_,title=x['title']))
json.dump(rows,open('metrics.json','w'),ensure_ascii=False)
G=collections.defaultdict(list)
for r in rows:G[r['m']].append(r)
print('module n  avg_w avg_s avg_n avg_wch generic% q>0%')
for m,L in sorted(G.items(),key=lambda a:-len(a[1])):
    n=len(L);a=lambda k:sum(r[k] for r in L)/n
    print(f"{m:8} {n:3} {a('n_w'):5.1f} {a('n_s'):4.1f} {a('n_n'):4.1f} {a('wch'):6.0f} {100*sum(r['generic'] for r in L)/n:4.0f} {100*sum(r['q']>0 for r in L)/n:4.0f} {collections.Counter(r['b'] for r in L)}")
