# 单词身世 · 出处登记（SOURCES）

> 规矩（DESIGN_HANDOFF §5）：动画里每个标 📜 的说法，都要在这里写清楚「说了什么 + 出处网址 + 核对日期」。
> 查不到出处的，不能标 📜，只能标 💡 / ❓ / ⚠️。
> 主要出处：Online Etymology Dictionary（etymonline.com，Douglas Harper）。核对日期：2026-10-29。

## 溯源幕 ①：port 港口（`cases/wo_port.js`）

| # | 动画里的说法 | 徽章 | 出处原文要点 | 网址 |
|---|---|---|---|---|
| 1 | Mediterranean = medi（中间）+ terra（陆地），「陆地中间的海」 | 📜 | Latin *mediterraneus* "midland, surrounded by land"，from *medius* "middle" + *terra* "land, earth" | https://www.etymonline.com/word/Mediterranean |
| 2 | port（港口）来自拉丁语 portus「港口」；和 porta「城门」是亲戚 | 📜 | from Latin *portus* "a port, harbor" … akin to *porta* "a city gate, a gate, a door"，PIE root \*per- (2) "to lead, pass over" | https://www.etymonline.com/word/port |
| 3 | 拉丁语 portare = 搬运；它和 portus（港口）是同一个古老词根长出的亲戚，**不是同一个词** | 📜 + 💡 | port (v.) "from Latin *portare* 'to carry' … akin to *porta* 'gate', *portus* 'harbor' (from PIE \*prto-, suffixed form of root \*per- (2))"。动画用港口场景把两条线串起来记，这一点是 💡 | https://www.etymonline.com/word/port |
| 4 | opportunity：拉丁语 ob portum（朝着港口），原指把船吹向港口的顺风 → 好时机 | 📜 | "from the phrase *ob portum veniens* 'coming toward a port,' in reference to the wind, from *ob* 'toward' + *portus* 'harbor'" | https://www.etymonline.com/word/opportunity |
| 5 | import = im（进）+ port（搬运）→ 运进来、进口 | 📜 | Latin *importare* "bring in, convey, bring in from abroad"，in- "into" + *portare* "to carry"（port 词条「More to explore」与 import 词条） | https://www.etymonline.com/word/import |
| 6 | export = ex（出）+ port（搬运）→ 运出去、出口 | 📜 | Latin *exportare* "to carry out, bring out; send away, export"，*ex* "out" + *portare* "to carry"（port 词条 Entries linking 中的 export） | https://www.etymonline.com/word/export |
| 7 | transport = trans（穿过）+ port（搬运）→ 运过去、运输 | 📜 | Latin *transportare* "carry over, take across, convey"，*trans* "beyond, across" + *portare* | https://www.etymonline.com/word/transport |
| 8 | report = re（回）+ port（搬运）→ 把消息带回来、报告 | 📜 | Latin *reportare* "carry back, bear back, bring back," figuratively "report"，*re-* "back" + *portare* | https://www.etymonline.com/word/report |
| 9 | passport = pass（通过）+ port（港口）→ 通过港口（出入国境）的许可 | 📜 | Old French *passeport* "authorization to pass through a port" to enter or leave a country，*passe* + *port* (n.1 harbor) | https://www.etymonline.com/word/passport |
| 10 | airport = air（空中）+ port（港口）→ 空中的港口、机场 | 📜 | "from *air* (n.1) meaning 'aircraft' + *port* (n.1)"，used regularly from 1919 | https://www.etymonline.com/word/airport |
| 11 | support = sup（从下面）+ port（搬运、扛）→ 从下面托住、支持 | 📜 | Latin *supportare* "convey, carry, bring up"，assimilated form of *sub* "up from under" + *portare* | https://www.etymonline.com/word/support |
| 12 | 中文「港口、进口、出口、口岸」都用一个「口」字串起来 | 💡（中文对照，不是同源） | 只是中英对照，动画里写明「这是对照，不是同源」 | — |

**注意**
- port 词条里，港口义（n.1 portus）和搬运义（v. portare）是两个词条；词库 `WORD_FORMATION_DB.roots` 里 port 写成「拿，运送，港口」一个词根，属于合并讲法，记在 DESIGN_HANDOFF 的「和现有内容重叠」里，等用户决定怎么合并。
- sport 来自 disport（des-「离开」+ porter「搬」：把心思从正事上搬开 → 娱乐），见 https://www.etymonline.com/word/transport 页内 disport 条；本幕没有用到。
