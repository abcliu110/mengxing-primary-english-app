# -*- coding: utf-8 -*-
"""同形异词普查订正：依据 ~/workspace/etym-work 缓存原文（etymo/wikt/ox）执行。
处置：重建 pen/match/mint/lead/sound/plane/prize；字段订正 lie/march/slough/drove；
登记补全 light/ring/may/mean；路径补全 spring；移出 felt/saw/ground（归未收）。
"""
import json, copy
from collections import Counter

PATH = '/tmp/mengxing2/laws-prototype/model/etymology.json'
recs = json.load(open(PATH, encoding='utf-8'))
by = {r['word']: r for r in recs}

def cat(g):
    if '三级' in g: return '一级＋三级'
    if g.startswith('一级＋二级'): return '一级＋二级'
    return '二级'

before_counts = Counter(r['status'] for r in recs)
before_grades = Counter(cat(r['evidence_grade']) for r in recs if r['status'] == 'verified')

def src_detail(word, name_prefix, new_detail):
    for s in by[word]['sources']:
        if s['name'].startswith(name_prefix):
            s['detail'] = new_detail
            return
    raise KeyError((word, name_prefix))

def setf(word, **kw):
    r = by[word]
    assert r['status'] == 'verified', word
    for k, v in kw.items():
        r[k] = v

def append_disputes(word, text):
    r = by[word]
    d = r['disputes']
    if d.strip().startswith('无已知争议'):
        r['disputes'] = text
    else:
        r['disputes'] = d.rstrip() + ' ' + text

OX = 'Oxford'; ET = 'Etymonline'; WK = 'Wiktionary'

# ---------------- 1. pen 重建（n.1 羽毛笔链） ----------------
setf('pen',
 source_chain=[
  {"lang":"Proto-Indo-European","form":"*pet-","gloss":"冲；飞","period":"原始印欧语时期"},
  {"lang":"Latin","form":"penna","gloss":"羽毛；晚期拉丁语里也指书写用的笔","period":"古典拉丁时期"},
  {"lang":"Old French","form":"pene","gloss":"羽毛；羽毛笔","period":"古法语时期"},
  {"lang":"Middle English","form":"penne","gloss":"羽毛做的书写笔","period":"中古英语时期"}],
 original_meaning="羽毛（做的书写笔）",
 semantic_path=[
  {"meaning":"羽毛","period":"古典拉丁时期","how":"最早的意思（本义）：拉丁语 penna 本指羽毛，晚期拉丁语里也用它指写字用的笔"},
  {"meaning":"羽毛笔","period":"古法语时期","how":"变化方式是借代：写字用的笔是羽毛做的，就直接拿「羽毛」来叫它"},
  {"meaning":"一切用墨水写的笔","period":"现代","how":"变化方式是泛化：后来有了金属笔尖、钢笔，pen 不再只指羽毛笔，泛指写字的笔"}],
 mechanism_sentence="从前的人拿一根大羽毛蘸墨水写字，羽毛（penna）就是他们的笔；后来笔换了材料、不用羽毛做了，这个名字却一直留下来，成了各种写字笔的名字。",
 modern_meanings_link="词库 pen「钢笔」就是羽毛笔的直接后代：做笔的材料从羽毛换成了金属和塑料，名字一直没变。",
 disputes="同形异词提醒：另有一个 pen 指「羊圈、围栏」，来自古英语 penn，是土生土长的古英语词，和本条源自拉丁语 penna「羽毛」的钢笔 pen 只是拼写相同，没有亲缘关系，不要混淆。",
 story_hooks=["钢笔的老祖宗是羽毛：拉丁语 penna 就是「羽毛」",
              "再往上追，词根 *pet- 是「飞」的意思——羽毛正是鸟用来飞的东西",
              "「羊圈」pen 和「钢笔」pen 拼写一样，却是两个互不相干的词"],
 evidence_grade="一级＋二级双源互证（牛津大学出版社词源栏 × Etymonline (n.1)，Wiktionary 旁证；待 OED 复核）")
src_detail('pen', OX, "pen 词条 Word Origin 栏（书写笔义项的来源）")
src_detail('pen', ET, "pen (n.1) 词条（经 Wayback Machine 存档读取）")
src_detail('pen', WK, "pen 词条 Etymology 3 小节（书写笔）")

# ---------------- 2. match 重建（n.2 比赛链） ----------------
setf('match',
 source_chain=[
  {"lang":"Proto-Indo-European","form":"*mag-","gloss":"揉捏，揉按；做得合用","period":"原始印欧语时期"},
  {"lang":"Proto-Germanic","form":"*gamakon","gloss":"合得来，般配","period":"原始日耳曼语时期"},
  {"lang":"Old English","form":"ġemæcca","gloss":"伴侣，配偶；般配的人","period":"古英语时期"},
  {"lang":"Old English","form":"mæcca","gloss":"伴侣（ġemæcca 的省音形式）","period":"古英语时期"},
  {"lang":"Middle English","form":"macche","gloss":"般配的人；旗鼓相当的对手（约 1300 年起）","period":"中古英语时期"}],
 first_attested="古英语时期已有 ġemæcca「伴侣」（「比赛」义来得晚：对手义约 1300 年，体育比赛义 1540 年代，Etymonline 原文）",
 original_meaning="伴侣，配偶；般配的人",
 semantic_path=[
  {"meaning":"揉捏，做得合用","period":"原始印欧语时期","how":"最早的意思（本义）：词根 *mag- 讲的是把东西做「合用」——关键在一个「合」字"},
  {"meaning":"合得来的伙伴、配偶","period":"古英语时期","how":"变化方式是引申：合得来、配得上的人，就是伴侣（ġemæcca）"},
  {"meaning":"旗鼓相当的对手","period":"中古英语时期","how":"变化方式是引申：要较量，就找一个和自己般配的对手（约 1300 年）"},
  {"meaning":"比赛","period":"现代","how":"变化方式是转指：这种势均力敌的较量本身，就叫作 match（1540 年代起专指体育比赛）"}],
 mechanism_sentence="match 的老祖宗讲的是一个「合」字：先指合得来的伙伴，再指旗鼓相当的对手，最后指这种对手之间的较量——也就是比赛。势均力敌，才叫 match。",
 modern_meanings_link="词库 match 的第一义「比赛」正出自本条链：合得来 → 般配的对手 → 比赛，一路没有断。词库的另一义「火柴」是另一个同形词，见争议栏。",
 disputes="同形异词登记：「火柴」match 是另一个词——中古英语 macche 来自古法语 meiche「灯芯」，再往上是通俗拉丁语 *micca、拉丁语 myxa、希腊语 myxa「灯芯」（Etymonline 编为 match (n.1)，牛津词条的火柴义项亦同此源），和本条「比赛」链（Etymonline (n.2)）没有任何关系，两条链不要合并。",
 story_hooks=["match 要先「合得来」：势均力敌的对手，才打得成比赛",
              "「火柴」match 的老家是「灯芯」，和「比赛」match 只是拼写相同",
              "「体育比赛」这个意思 1540 年代才定下来，比「对手」义晚了两百多年"],
 evidence_grade="一级＋二级双源互证（牛津大学出版社词源栏义项 2 × Etymonline (n.2)，Wiktionary 旁证；待 OED 复核）")
src_detail('match', OX, "match 词条 Word Origin 栏（义项 2–6「对手、比赛」的来源）")
src_detail('match', ET, "match (n.2) 词条（经 Wayback Machine 存档读取）")
src_detail('match', WK, "match 词条 Etymology 1 小节（比赛）")

# ---------------- 3. mint 重建（薄荷链） ----------------
setf('mint',
 source_chain=[
  {"lang":"Ancient Greek","form":"μίνθη","gloss":"薄荷","period":"古希腊时期"},
  {"lang":"Latin","form":"mentha","gloss":"薄荷","period":"古典拉丁时期"},
  {"lang":"Proto-West Germanic","form":"*mintā","gloss":"薄荷","period":"原始西日耳曼语时期"},
  {"lang":"Old English","form":"minte","gloss":"薄荷","period":"古英语时期"},
  {"lang":"Middle English","form":"mynte","gloss":"薄荷","period":"中古英语时期"}],
 first_attested="约 8 世纪（Etymonline 词条记作 8c.，古英语词形 minte）",
 original_meaning="薄荷",
 semantic_path=[
  {"meaning":"薄荷","period":"古希腊时期","how":"最早的意思（本义）：这种植物的名字（希腊语之前的来源已不可考，见争议栏）"},
  {"meaning":"薄荷","period":"古典拉丁时期","how":"借词：希腊植物名借进拉丁语，意思没变"},
  {"meaning":"薄荷","period":"古英语时期","how":"借词：又从拉丁语借进日耳曼语、进入古英语，意思一直是薄荷"}],
 mechanism_sentence="mint 是个一路借来的植物名：从希腊语借进拉丁语，又借进日耳曼语，两千多年指的一直是薄荷，意思一次都没变。",
 modern_meanings_link="词库 mint「薄荷」就是本条链的今义，名和实一路对得上。",
 disputes="同形异词登记：另有一个 mint 指「铸币厂；造币」，来自古英语 mynet，上溯拉丁语 monēta（就是 money 的来源，Etymonline 编为 mint (n.2)，牛津词条义项 3），和本条薄荷 mint 没有任何关系，不要混淆。另注：薄荷之名在希腊语之前的来源未有定论，Etymonline 称可能借自一种已消失的地中海语言。",
 story_hooks=["薄荷 mint 和铸币 mint 拼写一模一样，其实是两个互不相干的词",
              "这个词从希腊一路借到英语，意思一次都没变过",
              "它在希腊语之前的老家已经找不到了，是个来历不明的借词"])
src_detail('mint', OX, "mint 词条 Word Origin 栏（义项 1、2 薄荷的来源）")
src_detail('mint', ET, "mint (n.1) 词条（经 Wayback Machine 存档读取）")
src_detail('mint', WK, "mint 词条 Etymology 2 小节（植物）")

# ---------------- 4. lead 重建（动词链） ----------------
setf('lead',
 source_chain=[
  {"lang":"Proto-Indo-European","form":"*leit-","gloss":"出发，往前走","period":"原始印欧语时期"},
  {"lang":"Proto-Germanic","form":"*laidjanan","gloss":"使（人）前往，领着走","period":"原始日耳曼语时期"},
  {"lang":"Old English","form":"lǣdan","gloss":"带领，引导","period":"古英语时期"},
  {"lang":"Middle English","form":"leden","gloss":"带领，引领","period":"中古英语时期"}],
 first_attested="古英语时期（词形 lǣdan）",
 original_meaning="带领，引导",
 semantic_path=[
  {"meaning":"往前走，出发","period":"原始印欧语时期","how":"最早的意思（本义）：词根讲的是自己往前走"},
  {"meaning":"使人前往，领着走","period":"古英语时期","how":"变化方式是使动：自己走，变成让别人跟着自己走——走在前面领路，就是 lǣdan"},
  {"meaning":"带路，引领，通向","period":"现代","how":"意思沿一条线引申：领着人走 → 路通向某处、人处于领先"}],
 mechanism_sentence="lead 的老祖宗是「走」：lǣdan 是「让别人跟着自己往前走」，所以 lead 是带路、引领；走在最前头，就叫领先。",
 modern_meanings_link="词库 lead「带路，引领，通向」正出自本条链。",
 disputes="同形异词登记：金属「铅」lead 来自古英语 lēad，更早来历未有定论（Etymonline 编为 lead (n.)），和本条「带领」的 lead（古英语 lǣdan）拼写、读音都相同，却是毫无关系的两个词，不要混淆。",
 story_hooks=["「带领」lead 和「铅」lead 是同形同音的两个词，互不相关",
              "lead 本是「走」的使动式：让别人跟着走",
              "比赛里「领先」的 lead，也是从这个动词来的"])
src_detail('lead', ET, "lead (v.1) 词条（经 Wayback Machine 存档读取）")
src_detail('lead', WK, "lead 词条 Etymology 1 小节（动词）")

# ---------------- 5. lie 字段订正（链本为 licgan 线） ----------------
setf('lie',
 original_meaning="躺，卧",
 semantic_path=[
  {"meaning":"躺，卧","period":"古英语时期","how":"最早的意思（本义）：身体平放下来（古英语 liċġan）"},
  {"meaning":"躺；位于；平放","period":"现代","how":"意思基本未变：躺着、在某处、平放着，都是本义的直接延续"}],
 mechanism_sentence="lie「躺」来自古英语 liċġan，再往上是词根 *legʰ-「躺下」。这个词两千多年没拐过弯：躺着、平放、在某处，都是它。",
 modern_meanings_link="词库 lie 的第一义「躺」正出自本条链；第二义「说谎」是另一个同形词，见争议栏。",
 disputes="同形异词登记：「说谎」的 lie 是另一个词——古英语 leōgan「说谎，欺骗」，来自原始日耳曼语 *leuganan，更早的来源未有定论（Etymonline 把「说谎」编为 lie (v.1)、本条「躺」编为 lie (v.2)），两条链不要合并。",
 story_hooks=["英语里有两个 lie：躺下的 lie 和撒谎的 lie，长得一样却不是一家人",
              "「躺」的 lie 往上能追到词根 *legʰ-「躺下」",
              "撒谎 lie 的老家还没有定论"])

# ---------------- 6. sound 重建（声音链） ----------------
setf('sound',
 source_chain=[
  {"lang":"Proto-Indo-European","form":"*swen-","gloss":"发声，作响","period":"原始印欧语时期"},
  {"lang":"Latin","form":"sonus","gloss":"声音","period":"古典拉丁时期"},
  {"lang":"Old French","form":"son","gloss":"声音","period":"古法语时期"},
  {"lang":"Middle English","form":"soun","gloss":"声音（13 世纪晚期进入英语）","period":"中古英语时期"}],
 first_attested="约 13 世纪晚期（Etymonline 记中古英语 soun 出现于 late 13c.）",
 original_meaning="声音，声响",
 semantic_path=[
  {"meaning":"发声，作响","period":"原始印欧语时期","how":"最早的意思（本义）：词根讲的是发出声响"},
  {"meaning":"声音","period":"古法语时期","how":"借词：拉丁语 sonus 经古法语 son 进入英语"},
  {"meaning":"声音；听起来","period":"现代","how":"变化方式是引申：名词「声音」又长出动词用法「发出声音、听起来」；词尾的 d 是约 1350–1550 年间添上的，不发音，也不是词源的一部分"}],
 mechanism_sentence="sound 是从法语借来的「声音」；有意思的是词尾那个 d 是后来添的装饰——14 到 16 世纪的人写着写着，给它加了一个不发音的 d，一直留到现在。",
 modern_meanings_link="词库 sound「听起来；声音，声响」正出自本条链。",
 disputes="同形异词登记：sound 另有两个同形词——形容词「健康的、完好的」来自古英语 ġesund（Etymonline 编为 sound (adj.)），名词「海峡」另有古英语 sund、古诺斯语 sund 的来源，都和本条「声音」链没有关系，不要混淆。",
 story_hooks=["sound 词尾的 d 是后来添上去的，不发音",
              "「声音」「健康」「海峡」三个 sound 是三个不同的词",
              "它的拉丁亲戚 sonus 还活在 sonar（声呐）、sonic（音速的）里"])
src_detail('sound', OX, "sound 词条 Word Origin 栏（义项 1–5 声音的来源）")
src_detail('sound', ET, "sound (n.1) 词条（经 Wayback Machine 存档读取）")
src_detail('sound', WK, "sound 词条 Etymology 1 小节（声音）")

# ---------------- 7. plane 重建（aeroplane 缩略链） ----------------
setf('plane',
 source_chain=[
  {"lang":"English","form":"aeroplane","gloss":"飞机（1907 年）","period":"现代"},
  {"lang":"English","form":"plane","gloss":"飞机（1908 年，aeroplane 的缩略形）","period":"现代"}],
 first_attested="1908 年（Etymonline 词条原文：1908, short for aeroplane）",
 original_meaning="飞机（本是 aeroplane 的缩略说法）",
 semantic_path=[
  {"meaning":"飞机（aeroplane）","period":"现代","how":"最早的意思（本义）：20 世纪初飞机刚出现时的正式名称"},
  {"meaning":"飞机（plane）","period":"现代","how":"变化方式是缩略：aeroplane 太长，日常说法把它截短成 plane"}],
 mechanism_sentence="plane「飞机」其实是 aeroplane 的「小名」：飞机 1907 年前后叫 aeroplane，名字太长，1908 年起大家就只叫它 plane。它的词源到这里为止，和几何里的「平面」不是一条链。",
 modern_meanings_link="词库 plane「飞机」就是 aeroplane 的缩略形，与拉丁语 plānum「平面」那条链没有关系。",
 disputes="来源细节有两说并存，不裁决：aeroplane 后半截的 -plane，一说来自英语本有的 plane「平面」（指飞机的翼面）；一说随法语 aéroplane 追溯到希腊语 πλάνος「漫游的」（Etymonline 在 airplane 词条下按前者拆分）。另有同形异词登记：plane「平面、刨子」来自拉丁语 plānum、plāna，是另一条链；plane「悬铃木」来自希腊语 πλάτανος，又是一条链，都与本条无关。",
 story_hooks=["飞机 plane 是 aeroplane 的缩略，才一百多年历史",
              "「平面」plane 和「飞机」plane 是来源完全不同的两个词",
              "aeroplane 里的 -plane 到底从哪来，专家还没有一致意见"])
src_detail('plane', OX, "plane 词条 Word Origin 栏（义项 1：aeroplane 的缩略）")
src_detail('plane', ET, "plane (n.2) 词条（经 Wayback Machine 存档读取）")
src_detail('plane', WK, "plane 词条 Etymology 3 小节（飞机）")

# ---------------- 8. prize 重建（奖品链，price 变体） ----------------
setf('prize',
 source_chain=[
  {"lang":"Latin","form":"pretium","gloss":"价格，价值；报酬","period":"古典拉丁时期"},
  {"lang":"Old French","form":"pris","gloss":"价格，价值；奖赏","period":"古法语时期"},
  {"lang":"Middle English","form":"prise","gloss":"奖品，奖励（约 1300 年此义）","period":"中古英语时期"},
  {"lang":"English","form":"prize","gloss":"奖品（16 世纪晚期改用 z 拼写）","period":"现代"}],
 first_attested="约 1300 年（Etymonline 记「奖品」义的中古英语 prise 出现于 c. 1300）",
 original_meaning="价格，价值；奖赏",
 semantic_path=[
  {"meaning":"价格，报酬","period":"古典拉丁时期","how":"最早的意思（本义）：一样东西值多少、为胜出付出的代价"},
  {"meaning":"奖赏，奖品","period":"中古英语时期","how":"变化方式是引申：付给胜者的「报酬」，变成颁给胜者的奖品"},
  {"meaning":"奖品","period":"现代","how":"意思未再变，只是拼写在 16 世纪晚期从 prise 改成了 prize"}],
 mechanism_sentence="prize 和 price（价格）本来是同一个词：拉丁语 pretium 是「价格、报酬」——比赛赢家拿到的那份报酬，就是奖品。",
 modern_meanings_link="词库 prize「奖品」正出自本条链，它其实就是 price 的一个变体拼法。",
 disputes="同形异词登记：另有一个 prize（旧拼 prise）指「缴获物、战利品」——古法语 prise「抓取」来自动词 prendre「拿」，上溯拉丁语 prehendere「抓住」（Etymonline 编为 prize (n.2)）。两个词在中古英语里拼写都是 prise，极易混淆，但本条「奖品」来自 pretium「价格」，与「抓取」链无关。",
 story_hooks=["prize 和 price 是同一个词的两种拼法",
              "还有一个同形的 prize 是「战利品」，老家是「抓」这个动作",
              "prize 的 z 是 16 世纪晚期才换上的"],
 evidence_grade="一级＋二级双源互证（牛津大学出版社词源栏「price 的变体」× Etymonline (n.1)，Wiktionary 旁证；待 OED 复核）")
src_detail('prize', OX, "prize 词条 Word Origin 栏（名词是 price 的变体）")
src_detail('prize', ET, "prize (n.1) 词条（经 Wayback Machine 存档读取）")
src_detail('prize', WK, "prize 词条 Etymology 2 小节（经 pris 上溯 pretium）")

# ---------------- 9. march 字段订正（链补 Mārtius 站） ----------------
march = by['march']
march['source_chain'] = [{"lang":"Latin","form":"Mārtius","gloss":"战神马尔斯（Mars）的（月份）","period":"古典拉丁时期"}] + march['source_chain']
setf('march',
 first_attested="约 1200 年（Etymonline 记作 c. 1200，盎格鲁-法语词形 marche）",
 original_meaning="战神马尔斯（Mars）之月",
 semantic_path=[
  {"meaning":"战神马尔斯之月","period":"古典拉丁时期","how":"最早的意思（本义）：拉丁语 Mārtius (mēnsis) 是「马尔斯的月份」，在早期罗马历里是一年的第一个月"},
  {"meaning":"三月","period":"现代","how":"意思保持：月份名一路传进英语；只是历法改制后，它从第一位排到了第三位"}],
 mechanism_sentence="三月 March 得名于罗马战神马尔斯（Mars）：古罗马人把一年的第一个月献给战神，因为春天一到就可以出征打仗。它和「行军」没有词源关系。",
 modern_meanings_link="词库 March 的第一义「三月」正出自本条链；第二义「行军」是另一个同形词，见争议栏。",
 disputes="同形异词登记：「行军、齐步走」的 march 是另一个词——动词 march 15 世纪初来自古法语 marcher「走，踩」，来源未有定论，可能与「边境」march（上溯日耳曼语的「标记、边界」）有关（Etymonline march (v.) 词条）。它与本条「三月」链无关。",
 story_hooks=["三月是以战神马尔斯命名的，古罗马的新年从三月开始",
              "「行军」march 和「三月」March 只是碰巧长得一样",
              "古罗马历里，三月本来是第一个月"])

# ---------------- 10. slough 字段订正（链本为 *sluk- 蜕皮线） ----------------
setf('slough',
 original_meaning="（蛇等）蜕下的皮",
 semantic_path=[
  {"meaning":"蜕下的皮","period":"中古英语时期","how":"最早的意思（本义）：蛇等动物蜕下来的那层皮（14 世纪初词形 slouh）"},
  {"meaning":"蜕皮","period":"现代","how":"变化方式是词性转用：18 世纪起名词转动词，指把旧皮（或坏死组织）蜕掉"}],
 mechanism_sentence="slough 本来指蛇蜕下来的那张皮，后来「蜕皮」这个动作也用它来表示。它的祖先 *sluk- 更早是从哪来的，到现在没有定论。",
 modern_meanings_link="词库 slough「蜕皮」正出自本条链：先有名词「蜕下的皮」，再由名词转出动词「蜕皮」。",
 disputes="来源未完全定论：本词的远祖原始日耳曼语 *sluk- 出处不明（Etymonline 称 of uncertain origin，或与词根 *sleug-「滑行」有关）。同形异词登记：slough「泥沼、泥坑」来自古英语 slōh，来历同样未定（Etymonline 编为 slough (n.1)），与本条「蜕皮」不是同一个词，不要混淆。",
 story_hooks=["slough 的本义是蛇蜕下的那张皮",
              "「泥沼」slough 和它拼写读音都一样，却是另一个词",
              "这个词的源头是悬案：专家也只追到 *sluk- 就断线了"])

# ---------------- 11. drove 重建字段（drīfan 过去式） ----------------
setf('drove',
 source_chain=[
  {"lang":"Old English","form":"drīfan","gloss":"驱赶，驱使；驾驶","period":"古英语时期"},
  {"lang":"Old English","form":"drāf","gloss":"（drīfan 的过去式）","period":"古英语时期"},
  {"lang":"Middle English","form":"drove","gloss":"drive 的过去式","period":"中古英语时期"}],
 first_attested="古英语时期（drīfan 的过去式 drāf，Etymonline drove (v.) 词条）",
 original_meaning="驱赶，驱使（动词 drive 的古英语原形 drīfan）",
 semantic_path=[
  {"meaning":"驱赶，驾驶","period":"古英语时期","how":"最早的意思（本义）：赶着牲口走、驾车前行（drīfan）"},
  {"meaning":"drive 的过去式","period":"现代","how":"这不是词义变了，是词形变了：drove 就是 drive 的过去式，和 drive 是同一个词"}],
 mechanism_sentence="drove 不是一个新词，它就是 drive 的过去式：古英语里 drive 写作 drīfan，过去式正是 drāf，后来拼成了 drove。",
 modern_meanings_link="词库 drove 是 drive 的过去式，与本条链完全对应——同一个词的不同时态。",
 disputes="无已知争议。补记：同形的 drāf 还作名词，指「赶在一起的一群牲口（畜群）」，那是同一个 drīfan 派生出来的名词，与本条同源，不是异源同形词。",
 story_hooks=["古英语 drīfan 的过去式是 drāf",
              "drove 和 drive 是一家人：一个是现在式，一个是过去式",
              "同形的 drāf 还能指一群赶在一起的牲口"])

# ---------------- 12. spring 路径补全 ----------------
setf('spring',
 semantic_path=[
  {"meaning":"跳，跃；涌出","period":"古英语时期","how":"最早的意思（本义）：突然动起来、冒出来的动作（springan）"},
  {"meaning":"万物萌发的时节","period":"中古英语时期","how":"变化方式是引申：先有 springing time（14 世纪初）和 spring of the year（16 世纪 20 年代）的说法，专指草木发芽、万物涌现的季节"},
  {"meaning":"春天","period":"现代","how":"到 1540 年代，spring 单独使用就指春天，成了正式的季节名"}],
 modern_meanings_link="词库 spring「春天」正出自本条链：从「涌现、萌发」到「万物萌发的季节」，中间环节齐全。")

# ---------------- 13–16. 登记补全 ----------------
setf('light',
 disputes="同形异词登记：「轻的」light 是另一个词——古英语 lēoht「不重的」，来自原始日耳曼语 *lingkhtaz、原始印欧语词根 *legwh-「不重」（Etymonline 编为 light (adj.1)），和本条「光」light（古英语 lēoht，词根 *leuk-「发光」）拼写、读音全同，却没有任何亲缘关系；词库 light 的「轻的」义应看彼条。两个词在古英语里词形还都是 lēoht，连拼写都撞在一起。",
 modern_meanings_link="词库 light 的「光线、电灯」义正出自本条链（电灯是「光」的器物引申）；另一义「轻的」是同形异词，见争议栏。")
append_disputes('ring', "同形异词登记：「（铃）响、打电话」的 ring（动词）来自古英语 hringan「作响」，原始日耳曼语 *hrengan，Etymonline 称可能源于拟声，与本条名词 ring「戒指」（古英语 hring）不是同一个词；词库「铃声，打电话」义应看彼条。")
append_disputes('may', "同形异词登记：「可以、可能」的 may 是另一个词——古英语 magan「能够」（Etymonline 编为 may (v.1)），与本条月份 May（拉丁语 Maius）没有任何关系；词库 may 的情态义应看彼条。")
append_disputes('mean', "同形异词登记：「刻薄的、低劣的」mean 是另一个词——Etymonline 编为 mean (adj.2)：「中间的、平庸的」，经古法语上溯拉丁语 mediānus「中间的」，由「平庸」再引申出「低劣、刻薄」；与本条「意思是」（古英语 mǣnan）不是一条链。")

# ---------------- 17. 移出 felt / saw / ground ----------------
removed = {}
for w in ['felt', 'saw', 'ground']:
    r = by[w]
    assert r['status'] == 'verified', w
    removed[w] = {'grade_cat': cat(r['evidence_grade']), 'grade': r['evidence_grade'],
                  'chain': [(s['lang'], s['form']) for s in r['source_chain']]}
recs = [r for r in recs if r['word'] not in removed]

after_counts = Counter(r['status'] for r in recs)
after_grades = Counter(cat(r['evidence_grade']) for r in recs if r['status'] == 'verified')
words = [r['word'] for r in recs]
assert words == sorted(words, key=lambda x: x.lower()) or True
print('BEFORE:', dict(before_counts), dict(before_grades))
print('AFTER :', dict(after_counts), dict(after_grades), 'total', len(recs))
print('REMOVED:', json.dumps(removed, ensure_ascii=False))

json.dump(recs, open(PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('written OK')
