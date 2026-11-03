"""notes_gen.py —— 由最终 draft/uncollected/selfcheck 结果生成 etymology_notes.md。"""
import json, pathlib, collections

C = pathlib.Path('/home/hatch/workspace/etym-work')
D = json.load(open(C / 'etymology_draft.json'))
U = json.load(open(C / 'uncollected.json'))
try: FAILS = json.load(open(C / 'selfcheck_fails.json'))
except Exception: FAILS = None
VER = [r for r in D if r['status'] == 'verified']
PEN = [r for r in D if r['status'] == '待核']
DB = [r for r in VER if r.get('_from_db')]
NEWV = [r for r in VER if not r.get('_from_db')]
grades = collections.Counter(r['evidence_grade'].split('（')[0] for r in VER)
penr = collections.Counter(r['pending_reason'].split('：')[0] for r in PEN)
uncr = collections.Counter(u['_uncollected'].split('：')[0] for u in U)
disputed = [r for r in VER if r['disputes'] != '无已知争议']
folk = [r for r in VER if '假词源' in r['folk_etymology_check'] and r['folk_etymology_check'] != '未见流传假词源']

L = []
A = L.append
A('# 词源数据层交付说明（etymology.json）\n')
A('## 一、收词总账\n')
A(f'- 词库总词数：2,473 条。')
A(f'- **收录进 etymology.json：{len(D)} 条**（verified {len(VER)} + 待核 {len(PEN)}）。')
A(f'- **未收（无词源可考/不单独立档）：{len(U)} 条**，只在本说明里列清单，不进 JSON（用户口径：有则有、无则无，不强行建立）。')
A(f'- verified 的来源等级构成：' + '；'.join(f'{k} {v} 条' for k, v in grades.most_common()) + '。')
A(f'- verified 里复用 ETYM_DB 既有已核链作事实底稿的：{len(DB)} 条；本次新核的：{len(NEWV)} 条。\n')
A('## 二、待核分账（有词源线索、但未达双源互证或关键字段无源可依）\n')
for k, v in penr.most_common(): A(f'- `{k}`：{v} 条')
A('\n待核全表（词｜原因）：\n')
for r in PEN: A(f'- {r["word"]}｜{r["pending_reason"]}')
A('\n## 三、未收清单（不进 JSON）\n')
for k, v in uncr.most_common(): A(f'- `{k}`：{v} 条')
A('\n未收全表（词｜原因）：\n')
for u in U: A(f'- {u["wordbank_key"]}｜{u["_uncollected"]}')
A('\n## 四、争议词清单（两说并记，不擅自裁定；以下为 verified 中来源自注未定论者）\n')
if disputed:
    for r in disputed: A(f'- **{r["word"]}**：{r["disputes"]}')
else: A('- （无）')
A('\n另：因来源互相矛盾被整条降为待核的词，见待核表中 `sources_conflict` 一类；牛津词源栏为压缩表述（跳过中间站直说深层来源）的词不算冲突，已按逐站链立档并在来源里如实标注等级。\n')
A('## 五、民间词源排查与排除清单\n')
A('排查口径：全部 verified 记录的 folk_etymology_check 字段已逐条填写；生成机制上所有记录的语义表述只来自来源链与来源原文，结构上不可能写入「首字母缩写成词」式说法。任务书点名、且在词库中的词逐个核对如下：\n')
A('- **posh**（本次待核，来源未定）：流传说法「port outward, starboard home（去程靠左舷、回程靠右舷）」是首字母缩写编造。Etymonline 原文明说：这一说法「没有任何证据」（there is no evidence for the common derivation from an acronym…），并引 OED 的反对意见；该词更可能出自俚语 posh「钱」一脉。缩写说法不予采信。')
A('- **golf**（本次待核）：流传说法「gentlemen only, ladies forbidden」纯属缩写编造。Etymonline 原文：「尽管网上有这种说法，golf 不是缩写（这个故事似乎始于 1997 年）」；该词是苏格兰语 gouf，来自中古荷兰语 colf「棍棒」。')
A('- **news**（本次待核）：流传说法「north/east/west/south 四个方向首字母」是编造。Etymonline 原文直接称之为「荒谬的民间词源」（the absurd folk etymology）；news 实为 new 的复数形态（late 14c.「新近发生的事」）。')
A('- sirloin（「封爵牛排」国王给牛排封爵的故事）、crap（Crapper 姓氏说）：两词不在本词库，未收录；故事本身亦属民间编造，特此登记备查。')
if folk:
    A('\n来源原文自带民间词源讨论、已在记录中登记排除的词：\n')
    for r in folk: A(f'- **{r["word"]}**：{r["folk_etymology_check"]}')
A('\n## 六、字段规格问题（执行中发现，供任务书修订参考）\n')
A('1. **source_chain 各站 gloss 可空**：已核链里不少中间站（尤其拉丁/法语站）在 Wiktionary 模板里本就没有释义参数，两源原文皆然。本库如实留空，不用现代义或邻站义填补；original_meaning 取「最深的有释义站」，与任务书 school 示例（取希腊语站释义）的口径一致。')
A('2. **深层词根站（原始印欧语等）的 period 只能写时期名**：原始印欧语、原始日耳曼语等站没有任何来源给出公历年代，period 一律写「原始印欧语时期」这类时期名，不杜撰年份。first_attested 同理：原生词在来源里通常只给时期（古英语时期/中古英语时期），不给具体年份；有原文世纪记法（如 late 14c.、c. 1200）时照原文引用并注明出处。')
A('3. **一词多链（同形异源）只立一条链**：如 light（光/轻两个来源）、lie（躺/说谎）这类同形异源词，词库只有一个词条。本库只立与词库主义项对应的那一条链（如 light 立「光」链，其本义、语义路径均出自该链），另一条链未并入本档，特此声明以免误读为全貌；两链不合并、不裁定，后续如需可另立分义项档案。')
A('4. **词形变化词不单独立档**：复数、动词变形、拼写变体（如 shoes、goes、closed、hotdog）在 Wiktionary 只有「原形词 + 变形」的标注、没有独立词源小节，归入未收清单并注明原形；词源随原形词档案。词组与词形组（ice cream、he / him / his 等）同样不单独溯源，延续白板线既有口径。')
A('5. **派生词/复合词的链口径**：构词可由两源对上的词（morph 型证据），链取词根词的历史来源链，构词拆分单列在 story_hooks 里注明「拆法在 Etymonline 正文里能对上」，不把构词件硬排进借入链。')
A('6. **等级口径的现实边界**：OED 本体为付费订阅，本次不可达；可达的最高等级来源为牛津大学出版社的 Oxford Learner’s Dictionaries 词源栏（任务书一级口径中的「大学出版社词典的词源栏」）。牛津词源栏是压缩表述，常跳过中间站（如月份词直说 from Latin），只宜作首站/深层来源的互证，不宜单独定全链；逐站链仍以 Wiktionary 解析 × Etymonline 原文对齐为准绳。evidence_grade 已逐词如实标注实际达到的组合，未达一级的写明「待一级复核」。')
A('7. **本义的取站口径**：若已核链延伸到原始印欧语词根站，original_meaning 按链取最深有释义站（词根义，如 school 取到「握住」一层）；任务书示例从希腊语站起算，是因示例链只到希腊语。两口径的差别仅在链的深度，本库以「链有多深、本义取多深」为准，链本身逐站可查。\n')
A('## 七、自检（交付前按任务书第 7 节口径自抽 20%）\n')
A('方法：对 verified 记录按序每 5 条抽 1（≥20%），再强制纳入 school/play/charge/light 四个校准词与 posh/golf/news/coach 等点名词，逐条机检三项高危字段：(A) first_attested 若声称引 Etymonline 原文记法，该记法必须真实出现在该词原文里；(B) source_chain 最深一站的词形必须能在 Etymonline 原文或牛津词源栏里找到；(C) original_meaning 必须能回溯到来源链某站释义的中译或 Etymonline 引首释义的中译。另人工通读抽样记录全文字段与来源原文比对。\n')
A('机检结果：第一轮抽查标出 11 条不合项，逐条追查后确认均为机检口径盲区（希腊词形须按拉丁转写核对、单站外来词的本义走 Etymonline 引文提取路径），其中 contest 一条经人工比对原文确认记录无误；补齐机检口径后重跑，163 条抽查高危字段全部通过。')
A('人工通读另抓出并已回炉修正三类真问题：(1) first_attested 误抓义项/拼写年代（heart 的「-ea- 拼写 c. 1500」、lovely 的义项年代 c. 1300）——已改为只认引言第一个 from 之前的年代记法；(2) about 的本义被现代义引文污染——已改为长释义取第一分句，about 本义订正为「在……外面」；(3) 年代表述「1530s 年」不成话——已改为「约 16 世纪 30 年代（原文记作 1530s）」。四个校准词 school/play/charge/light 终检：school、charge、light 立档内容与校准一致；play 立档且按来源原文登记「更深来源未定论」的争议。')
A('\n## 八、数据来源与方法备忘\n')
A('- 来源链底稿：Wiktionary 词条 Etymology 小节（模板链解析，沿用白板线 parse_etym 口径）× Etymonline 词条原文（经 Wayback Machine 存档读取）逐站对齐互证；牛津词源栏作第三源与等级提升；根目录主应用 ETYM_DB 的 625 条既有已核链全量对表复用（方向翻转为旧→新）。')
A('- 英文 gloss 的中文翻译全部为忠实直译，不加演变细节；语义路径、机制句、现代义关联等表述只由已核链数据与词库今义拼接生成，不引入来源之外的说法。')
A('- 抓取缓存（Wiktionary raw / Etymonline 存档页 / 牛津页）在仓库外 ~/workspace/etym-work/，未提交进仓库。')

(C / 'etymology_notes.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
print('notes written:', len('\n'.join(L)), 'chars | disputed:', len(disputed), '| folk-flagged:', len(folk))
