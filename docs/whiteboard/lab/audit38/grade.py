import json,re,csv,collections
keys=open('/tmp/keys.txt').read().split()
S={x['f']:x for x in json.load(open('scenes.json'))}
def file_of(k):
    m=re.match(r'(.*)-(\d+)$',k); t,n=m.group(1),int(m.group(2))
    return f"{t}_{n+1}.js"
def module(t):
    R=[('hd_phonics','拼读'),('hd_formation','构词'),('eight_endings','构词'),('irregular_plural','构词'),('wordcard_tpl','单词卡'),
       ('hd_g','语法40点'),('hd_sum','语法总结（枢纽）'),('tense_matrix','时态矩阵'),
       ('past_clans','语法实验室'),('adj_order','语法实验室'),('aux_transformer','语法实验室'),('five_patterns','语法实验室'),('bamboo_tree','语法实验室'),('writing_alchemist','语法实验室'),
       ('vv_','万能动词'),('phrasal_key','万能动词'),('hd_fr','框架语义'),('wo_','格林定律/词源'),('hd_oral','口语场景'),('oral_func','口语场景'),
       ('hd_mindmap','思维导图'),('fp_','底层原理（第一性原理）'),('ze_','中英对照'),('metaphor_code','隐喻'),('hd_poly','一词多义'),('hd_relations','易混词'),
       ('pron_map','发音'),('stress_rhythm','发音'),('intonation_map','发音')]
    for p,m in R:
        if t.startswith(p): return m
    return '?'
# group default scores c1..c5 (0-2)
G=[('hd_g',(0,0,0,0,0)),('hd_sum',(0,0,0,0,0)),('hd_poly',(0,0,0,0,0)),('hd_fr',(0,0,0,0,0)),('hd_relations',(1,0,0,0,0)),
   ('hd_formation',(0,0,0,0,0)),('hd_phonics',(1,0,0,0,0)),('hd_oral',(0,0,0,0,0)),('oral_func',(1,0,0,1,0)),('hd_mindmap',(0,0,0,0,0)),('wordcard',(0,0,0,0,0)),
   ('vv_',(0,1,0,0,1)),('phrasal_key',(1,1,1,1,0)),('tense_matrix',(1,1,1,1,1)),('past_clans',(1,0,1,1,0)),('adj_order',(1,1,1,1,1)),
   ('aux_transformer',(1,0,1,1,0)),('five_patterns',(1,0,1,1,0)),('bamboo_tree',(1,0,1,1,0)),('writing_alchemist',(1,0,0,1,0)),
   ('eight_endings',(1,0,1,2,0)),('irregular_plural',(2,0,1,2,0)),('fp_',(1,0,1,1,0)),('ze_',(1,0,1,1,0)),('metaphor_code',(1,0,1,1,0)),
   ('pron_map',(1,0,1,1,0)),('intonation_map',(1,0,1,1,0)),('stress_rhythm',(1,0,0,1,0)),
   ('wo_rule',(1,0,0,1,0)),('wo_grimm_',(1,0,0,1,0)),('wo_',(1,0,1,1,0))]
OV={ # per-scene overrides (key: c tuple, note)
 'vv_get_down-1':None,
 'fp_economy-0':(2,0,2,1,0),'irregular_plural-0':(2,0,1,2,0),'wo_grimm-0':(2,0,1,1,0),'wo_vowel_a-0':(2,0,0,1,0),
 'ze_be-0':(2,0,1,1,0),'bamboo_tree-0':(2,0,1,1,0),'stress_rhythm-0':(2,0,0,1,0),'wo_port-0':(2,0,1,1,0),
 'aux_transformer-0':(0,0,1,1,0),'aux_transformer-1':(0,0,1,1,0),'metaphor_code-3':(1,0,0,1,0),
 'wo_vowel_b-0':(1,0,0,1,0),'wo_vowel_c-0':(1,0,0,1,0),'tense_matrix-4':(1,1,1,1,1),
 'phrasal_key-0':(1,1,2,1,0),
 # vv: fake / mismatched collocations -> no valid demo
 'vv_give_on-0':(0,0,0,0,1),'vv_give_on-1':(0,0,0,0,1),'vv_take_on-0':(0,0,0,0,1),'vv_turn_in-1':(0,0,0,0,1),'vv_take_out-1':(1,0,0,0,1),
}
def grade(c):
    c1,c2,c3,c4,c5=c
    if (c1==2 and c2>=1) or (c1>=1 and c2==2 and c3>=1): return 'A'
    if c2>=1 or (c1>=1 and c3>=1) or c1==2: return 'B'
    return 'C'
rows=[]
for k in keys:
    t=re.sub(r'-\d+$','',k); f=file_of(k)
    if k=='wordcard_tpl-0': f='wordcard_tpl.js'
    c=None
    for p,v in G:
        if t.startswith(p): c=v;break
    # vv _2 scenes have cross-usage '共同点' comparison
    if t.startswith('vv_') and k.endswith('-1'): c=(1,1,0,0,1)
    if k in OV and OV[k]: c=OV[k]
    x=S.get(f,{}); it=x.get('items') if isinstance(x.get('items'),list) else []
    nw=sum(1 for i in it if i[0] in 'wm'); ns=sum(1 for i in it if i[0]=='s')
    rows.append(dict(key=k,file=f,module=module(t),c1=c[0],c2=c[1],c3=c[2],c4=c[3],c5=c[4],total=sum(c),grade=grade(c),
                     engine=x.get('b','?'),board_lines=nw,spoken=ns,title=(x.get('title') or '')))
with open('scene_grades.csv','w',newline='') as fp:
    w=csv.DictWriter(fp,fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
M=collections.defaultdict(collections.Counter)
for r in rows: M[r['module']][r['grade']]+=1
tot=collections.Counter(r['grade'] for r in rows)
print(len(rows),tot)
for m,c in sorted(M.items(),key=lambda a:-sum(a[1].values())):
    n=sum(c.values()); print(f"{m}|{n}|{c['A']}|{c['B']}|{c['C']}|{100*c['C']/n:.0f}%")
eng=collections.Counter(r['engine'] for r in rows); print(eng)
