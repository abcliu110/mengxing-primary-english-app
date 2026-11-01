# English Prepositions Learning Interfaces — Research Report

## Summary

**The field splits cleanly in two, and almost nothing bridges it.**

1. **Commercial / free kids & ESL products are good at exactly one thing: the static spatial core** (*cat in/on/under the box*). Their best interface is **dragging a trajector (object) to a landmark (box/table) in a pictured scene, with instant self-checking** — Games to Learn English, Boom Cards decks, MES Games. Their best assessment variant is **real-photo receptive identification with per-preposition tracking** — Smarty Ears Preposition Remix. Everything they do is receptive, single-scene, single-correct-answer.
2. **Cognitive-linguistics research is good at exactly the things products ignore: polysemy, extension, and contrast.** Image schemas (CONTAINER, SURFACE, PATH), trajector–landmark diagrams, and Tyler & Evans' Principled Polysemy radial networks explain *why* the same word covers spatial, time and abstract senses. The one system that turned this into software — the **English Preposition Tutor** (Wong, Zhao & MacWhinney, 2018) — is a research prototype for intermediate Cantonese-speaking adults, not a public product, and not for children.
3. **Time prepositions, movement/path prepositions, viewpoint (`at the café` vs `in the café`), and dependent collocations (`depend on`) have no strong interactive treatment anywhere found.** Time gets a static pyramid list; path gets talked about in videos; collocations get fill-in-the-blank maze games.
4. **Chinese-market products (斑马, 叽里呱啦, 洪恩, 伴鱼, ABCmouse 中国版): no publicly verifiable preposition-specific unit was found for any of them.** Their published lesson structures are generic (animation → words → story → scored read-aloud → quiz). Chinese-language *explanations* of prepositions are overwhelmingly translation lists built on 在 — the exact conflation (在 → in/on/at) documented as a major error source for Chinese learners. The one Chinese-language exception found, VocabTech's guide, is text-only but does the best job anywhere of teaching *construal* (same place, different preposition by speaker viewpoint).

Confidence: high for the web/research exemplars (several verified live, see flags); medium-low for in-app Chinese products, whose lesson content is paywalled and not publicly documented at the unit level — that absence is itself reported as a finding, not asserted as proof the units do not exist inside the apps.

---

## Findings

### 1. Interactive learning apps/websites — manipulation / animation / games

#### Games to Learn English — Prepositions Game — the purest manipulation design
- URL: https://www.gamestolearnenglish.com/prepositions-game/nowebgl.html — **verified live** (research window, 2026-11-01; game canvas did not render in the screenshot, full mechanics from the site's own description, index)
- **What the learner sees and does:** Reads a sentence ("The book is on the shelf" type), then **drags the matching object with mouse or touch to the correct position in a pictured scene**. 9 scenes — front room, bathroom, bedroom, fridge, park, cafe, classroom, TV, office — with **12 objects to position per scene**. Prepositions: *in, on, under, above, next to, right, left, behind, in front of, between*. Scenes get progressively harder "both in terms of the language and the time allowed"; a 'slow' mode removes the time pressure.
- **Aspect expressed well:** Spatial core meaning, learned *enactively* — the learner performs the relation instead of recognising it. The site states this intent explicitly: students "actively move objects and see them positioned according to a preposition… a more concrete understanding."
- **Limitations:** Place only. No time, no movement/path as motion (objects are placed, not moved along a path), no polysemy, no explanation of *why* a placement is wrong — feedback is correctness + timer. Difficulty is partly manufactured by speed.

#### Boom Cards interactive preposition books (Boom Learning) — manipulation + self-checking + free play
- URLs: https://wow.boomlearning.com/deck/6FcC3WKY6py7pygD6 (Zoo Animals) ; https://wow.boomlearning.com/deck/fns8ksqBWuRntoCk9 (Dinosaurs) ; https://allisonfors.com/shop/no-print-boom-cards-prepositions/ (16 prepositions, 100 directions) — index
- **What the learner sees and does:** Themed scenes (zoo, dinosaurs, Easter, fall…). **Drags vocabulary pieces/animals to the correct location and gets instant self-checking feedback.** Decks are explicitly dual-mode: *receptive* (drag-and-drop to demonstrate comprehension) and *expressive* (teacher asks "Where is the item?", learner describes placement). Several decks add **open-ended pages where pieces move freely** — the learner invents relations and names them. Allison Fors deck: "Drag and drop the correct picture to the correct location," self-grading, organised in contrast families (on/off/in/out; over/under/above/below; next to/in front/between; outside/inside; top/middle/bottom).
- **Aspect expressed well:** Spatial core + **contrast between neighbours within a family**, plus the rare receptive→expressive flip. The teacher-authorable deck format is why this pattern is everywhere in speech therapy / ESL.
- **Limitations:** A design flaw worth copying *avoidance* of: decks group targets as **"OVER/ABOVE" and "UNDER/BELOW" as paired synonyms** — precisely the distinction (proximity / potential contact) that cognitive linguistics shows matters (see §2). Static placement again; no path, time or abstract senses.

#### Smarty Ears — Preposition Remix — best assessment & generalisation design
- URL: https://www.smartyearsapps.com/preposition-remix/ — index + live fetch 2026-11-01
- **What the learner sees and does:** 200+ screens of **real photographs** (not cartoons) — a child *under* a real table, objects *in* a basket, rabbits with one *between* them. Learner hears/reads a preposition and **taps the exact spatial location**; the app advertises "precise touch-area technology that ensures students identify exact spatial locations." Correct answers earn instruments for a virtual rock band the learner can then play. Teachers can **toggle individual prepositions on/off** (20+: *between, behind, near, closest to, furthest from…*), toggle written cues, switch voice feedback to tones, and get **per-preposition mastery logs** ("Mastery by Prep" bars, longitudinal accuracy).
- **Aspect expressed well:** Spatial core + **generalisation** (real photos deliberately chosen so "under the table" in the app looks like under *your* table; the vendor cites this as aiding neurodivergent learners) + **relative/comparative concepts** (*closest to / furthest from*) that almost no competitor attempts. Best error-diagnosis surface found.
- **Limitations:** Receptive identification only — the learner never moves an object, never produces a sentence in-app, never meets a time or abstract use. It is a very polished version of picture–word matching, which is exactly its ceiling.

#### British Council LearnEnglish Kids — trusted, free, but shallower than its reputation
- URLs: https://learnenglishkids.britishcouncil.org/zh-hans/grammar-practice/prepositions-place (place, **verified live** 2026-11-01) ; category hub https://learnenglishkids.britishcouncil.org/category/grammar/grammar-prepositions ; adult counterpart https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/prepositions-place (live fetch 2026-11-01)
- **What the learner sees and does (Kids, verified live):** A short explanation built from example sentences (*I was **in** the kitchen. My dog likes sleeping **on** the sofa. The toys aren't **under** the table… in front of / behind / next to / between / opposite*), an embedded **timed game tab**, and printable activity / test / reference-card PDFs. The wider hub adds distinctive media: **"Hero's adventure" grammar video** (Where is Hero the hamster?), grammar **chants** including *"At nine o'clock on Monday"* for prepositions of time, and songs. In comment replies the team teaches the contrast explicitly: *at* = position/place, *on* = on top of **and touching**.
- **What the learner sees and does (adult A1–A2):** The cleanest free statement of the triad — *in* = inside a bigger space (box, house, city, country); *on* = surface, extended to public transport and lines (rivers, borders, streets, islands); *at* = activity phrases (*at work / at home / at school*) and addresses/exact positions — flanked by two interactive grammar tests (fill-in/multiple-choice type, not manipulation).
- **Aspect expressed well:** Breadth and trust: place *and* time, video/chant/song + practice, zero cost, no account needed for the pages checked.
- **Limitations:** The practice is not manipulation — it is timed recognition/fill-in. Learner comments on the verified page complain about the timer ("IS NOT ENOUGH TIME. IT IS SO FAST"), and high scorers call it "too easy" — speed, not semantics, is the difficulty knob. No path, polysemy or construal.

#### MES Games — one scene, one variable: the contrast-set drill
- URL: https://mes-games.com/prepositions1.php — **verified live** 2026-11-01
- **What the learner sees and does:** Games built around a single recurring scene and Q&A frame: *"Where is the ball? — It's behind the box. Is the ball in the box? — Yes, it is / No, it's not."* Vocabulary: *behind, between, by, close to, far from, in, in front of, on, over, under*. Listening at native-speaker speed (replayable), pronunciation and spelling sections (spelling accepts the preposition alone or the full phrase *in the box*), plus matching printable flashcards/worksheets/board game.
- **Aspect expressed well:** **Contrast between neighbours** — holding trajector (ball) and landmark (box) constant while only the preposition changes is the cleanest way to isolate what the word itself contributes. Also the only exemplar tying the spatial drill directly to the *Where is…?* question form learners must produce.
- **Limitations:** One relation type (static place), drill depth; the game area rendered as generic links in the live view.

#### Teacher-authoring platforms: Wordwall, Genially, Nearpod, ESL Games Plus
- Wordwall — Labelled diagram template (drag labels onto a scene; example in French, same template used for English place prepositions): https://wordwall.net/resource/53257998/french/les-pr%C3%A9positions-de-lieu ; IN ON AT Maze Chase: https://wordwall.net/resource/100643394/przyimki-prepositions-in-on-at-game ; picture Match-up: https://wordwall.net/resource/93784034/match-the-prepositions-with-the-correct-pictures — index
- Genially prepositions board game: https://view.genially.com/67e1c8c09584d27ffecc6bd7 — index
- ESL Games Plus classroom games: https://www.eslgamesplus.com/classroom-games — index
- Nearpod (platform capabilities only; no preposition-specific lesson surfaced): https://learn.k20center.ou.edu/tech-tool/4803 — index
- **What the learner does:** Wordwall *Labelled diagram* = drag sentence-labels to the right object in one room scene (the closest authorable analogue of the drag-to-place pattern). *Maze Chase* = steer an avatar to the correct-answer zone while avoiding enemies, choosing among IN/ON/AT for mixed items (*met ___ 6 o'clock; lived in Germany ___ 2006; visit parents ___ Fridays; Anna is ___ the bus*) — notable because it is one of the few game formats that **mixes time, place and transport uses of the same three words in one set**, forcing discrimination rather than blocked practice. Genially = roll a virtual die, move an animal avatar along a board, land on challenge squares requiring a fill-in or "make a sentence using *along/from/by*…", failure moves you back squares — production is prompted, but unjudged except by the teacher. ESL Games Plus wraps sentence-level preposition choice (including *for/since/with/by*) in Pirate / Wheel / Dino Park / Racing shells. Nearpod offers Drag & Drop, Draw It, 3D objects and VR Field Trips as *building blocks* a teacher could assemble into a preposition lesson; no ready-made preposition lesson was found.
- **Aspect expressed well:** Collocation and mixed discrimination drilling; teacher customisability (any contrast set can be authored in minutes).
- **Limitations:** The game shell (maze, race, board) is semantically inert — it rewards fast choice, teaches nothing about *why*. These are quiz skins, not visualisations.

#### Negative exemplar: Preposition Master (app-store "prepositions" category leader)
- URL: https://play.google.com/store/apps/details?id=com.masterkeygames.prepmaster — index
- **What the learner does:** Slots a preposition into a gapped sentence (Beginner → Competent → Professional → Expert → Proverbs/Sayings), wrong tap = time penalty, multiplayer racing. **No scene, no object, no spatial content at all.**
- **Why it matters:** It is what a search for "prepositions app" surfaces first (1.5M installs per AppBrain listing in search results), and an App Store review quoted in results identifies its core flaw: at higher levels several prepositions "can often be correct… and the app only recognizes whatever was used in the original quote." Single-answer sentence-slotting actively teaches that preposition choice is arbitrary quotation recall — the opposite of the construal facts in §3.

#### Songs / video with a distinctive visual method: Maple Leaf Learning & Genki English
- Lingokids-hosted printable with Maple Leaf lyrics: http://ab0.lingokids.com/3.1.0/Activities/Printables/Prepositions1/Ocean/Printable.pdf ; Genki English "Where is Mr Monkey?": http://genkienglish.net/underonin.htm — index
- **Method:** One trajector tours one landmark set to a chant. *"Where's the monkey? — In the box. Where's the bird? — On the tree. Where's the snake? — Under the rock"*; the companion song moves a spider *on / in / under / by* the same objects. Genki English makes it physical: the teacher **moves a real Mr Monkey card around a real cardboard box** (near / next to / in front of / behind / under / on / in the box), then **children move their own bodies into the correct position relative to their desks** when they sing their lines, before a computer "save Mr Monkey" game.
- **Aspect expressed well:** Spatial core for pre-readers; the moving-single-object design is the animated version of the MES contrast set, and Genki's version crosses into TPR (see §3).
- **Limitations:** Watch-and-repeat; no learner control of the scene in the video versions.

#### Chinese-market children's products — checked, no preposition unit verifiable
- 斑马英语 lesson structure (video / words / story / speaking with recorded scoring / quiz / report / "Zebra calling" video-chat roleplay): https://www.zhihu.com/question/36358991 — index
- 叽里呱啦 structure (儿歌预热 → 主题课 → 拼读课 → 趣味拓展 → 复习课, ~10 min lessons, Y1–Y3 / L0–L6 levels): https://www.geekpark.net/news/266120 — index
- 洪恩ABC (3D互动, 儿歌, 游戏闯关; letters/words/phonics focus, ages 3–8): https://www.banyu.com/blog/english/148671/ — index
- 伴鱼少儿英语 (25-min live 1-to-1, interactive games, star rewards, circle/draw on courseware, AR特效): https://www.banyu.com/ — index
- ABCmouse 中国版 / 大地乐园 (hundreds of interactive games, staged learning path, virtual zoo/farm/classroom/kitchen scenes): https://www.abcmouse.cn/DADI — index
- **Finding:** None of the public pages, course outlines or product analyses found describes a preposition / 方位词 unit, a drag-object-to-place activity, or any spatial-relation visualisation in these products. Their documented interaction grammar — watch animation, tap/point-read, repeat-and-be-scored, quiz — *could* host a preposition unit (and 伴鱼's live-class AR effects and 洪恩's 3D interaction are technically the most capable hosts), but as publicly evidenced these are generic engagement mechanisms, not preposition pedagogy. In-app verification was not possible (paywalled, account-gated; this agent does not create accounts).
- **Khan Academy Kids / Toca Boca:** likewise, no preposition-specific activity surfaced. The only Khan result was the (adult) Khan Academy grammar video "Prepositions of space" (mirror: https://edurev.in/studytube/Prepositions-of-space--The-parts-of-speech--Gramma/7d5a05e1-af4e-476c-b808-064523ee3390_v — index), whose transcript frankly tells learners there are 100+ prepositions and "you have to memorize all of them and their various obnoxious nuances" — a memorisation framing, not a visualisation.

### 2. Visualization approaches from cognitive linguistics / research

#### Principled Polysemy (Tyler & Evans) — the radial network
- Paper: https://www.vyvevans.net/ar/_files/ugd/603cc2_1f736e63b2fd4a819fc7d26581654104.pdf ; book chapter summary, "The semantic network for over": https://www.cambridge.org/core/books/abs/semantics-of-english-prepositions/semantic-network-for-over/3E49B1BDB316A27E321E93E6DC95BC57 — index
- **The visualisation:** Each preposition is a **network diagram**: a central node = the *proto-scene*, an abstracted spatial configuration between a **Trajector (TR, the located thing)** and a **Landmark (LM, the reference thing, drawn bold)**, plus a *functional element* (the practical consequence of that configuration — e.g. containment protects/supports). Peripheral nodes radiate out, linked by two extension principles: **ways of viewing a scene** (e.g. viewing the end-state of a path) and **experiential correlation**. For *over*, the proto-scene (TR above LM but within potential-contact range — which is what distinguishes *over* from *above*) spawns clusters: the ABOVE-ACROSS trajectory (*jump over the wall*), on-the-other-side, excess (*over the limit*), completion (*it's over*), transfer (*hand over*), covering (*cloth over the table*), examining (*look over*).
- **Aspect expressed well:** This is the **only framework found that visualises sense extension itself** — why one word's senses are a family, not a list. It also visualises neighbour contrast geometrically: *over/under* occupy the near-LM band of the vertical axis, *above/below* the far extremes.
- **Limitations:** The full network for *over* has 15+ nodes — cognitively dense, designed for linguists/teachers, never (in anything found) rendered interactively or at child level. It is a static book diagram.

#### Image-schema diagrams as feedback — the English Preposition Tutor (strongest research interface)
- Record/abstract: https://minerva-access.unimelb.edu.au/items/289bb201-f295-5584-8774-e025c5bcd078 — live fetch 2026-11-01; diagram figure: https://www.researchgate.net/figure/Schematic-diagrams-of-mental-representations-of-preposition-over-for-the-sentence-The_fig1_322406531 — index; follow-up ERP study: https://www.cambridge.org/core/product/3A9FAD7F733CED6C5C683082931DF243 — index
- **What the learner sees and does:** A computer tutor presenting **sentence–picture matching**. The innovation is the *feedback*: instead of right/wrong, the learner gets a **schematic diagram** of the sense — e.g. for *"The soldier crawled over the wall"*, first a SOURCE–PATH–GOAL schema, then Tyler & Evans' refinement: an **arc rising above and coming down across the other side**. Crucially, "only the schematic diagram feedback group was exposed to **chaining between spatial senses and nonspatial senses**" — diagrams link the spatial sense to its extensions step by step.
- **Evidence:** 64 Cantonese-speaking intermediate learners; all three feedback groups (schematic / metalinguistic rule / correctness-only) improved, but on the **translation test the schematic group outperformed the correctness group** (no significant difference on cloze). The Zhao et al. replication line found schematic-diagram feedback **changed learners' brain responses (N270/N400) to preposition violations** while correctness feedback did not, alongside better productive performance.
- **Limitations:** Research prototype (eCALL), not a downloadable product; adult/intermediate learners; sentence–picture matching is still recognition. And a genuine caution from the literature: a *Language and Cognition* study notes schematic-diagram results across studies are **mixed**, pictorial elucidation can **distract** on complex items, and diagrams for *over* need **explicit explanation** or learners misread them (https://www.cambridge.org/core/journals/language-and-cognition/article/are-schematic-diagrams-valid-visual-representations-of-concepts-evidence-from-mental-imagery-in-online-processing-of-english-prepositions/6F16E235B9F6C8E67E3E21B469058D1F — index). Diagrams are not self-explanatory.

#### Lindstromberg, *English Prepositions Explained* — pictorial contrast, in book form
- Reviews: https://www.jostrans.soap2.ch/issue16/rev_lindstromberg.pdf ; https://www.translationdirectory.com/articles/article2316.php — index
- **Method:** ~100 prepositions grouped into semantic *families* per chapter; meanings "described verbally and illustrated pictorially" with **icons and simple line drawings**; neighbours explicitly contrasted (*under–below, over–above, to–toward*); abstract/metaphorical uses systematically related back to "imageable" spatial/temporal uses, with corpus examples (BNC/COCA).
- **Aspect expressed well:** Neighbour contrast + spatial→abstract relatedness, for teachers/materials writers.
- **Limitations:** Print only; adult; reviewers note it is fascinating but hard to use as a reference book. No interactive descendant was found.

#### Animated schematic diagrams (the mediation-tutor line)
- Index evidence (via MBRL catalogue summary of the follow-up study): a successor "English Preposition Mediation Tutor" delivered mediation "in the forms of **animated schematic diagram**" to 71 first-year English majors in four groups, on the argument that animated schemas let learners "visualize the conceptual representations of prepositions and formulate more accurate form–function mappings." Catalogue: https://www.mbrl.ae/catalog-search-results?searchCriteria=contributors&searchKeyword=Wong,%20Man%20Ho — index. Animation is the obvious missing upgrade to Tyler & Evans' static arcs (a path sense *is* motion), but it remains inside research tutors.

#### AR / VR spatial demos — research prototypes only
- TeachAR: https://text.123docz.com/document/11233236-teachar-an-interactive-augmented-reality-tool-for-teaching-basic-english-to-non-native-children.htm — index
- **What the learner sees and does:** Through a camera, physical **AR markers** anchor virtual objects. In the Spatial Relationships module a Scene marker summons a **virtual table**; preposition markers (or, in speech-enabled mode, **the child saying the colour/shape/location aloud**) change a virtual object's position relative to the table. Built in Unity + ARToolKit. Pilot comparison against a non-AR version "indicated a potentially better learning outcome" with some usability issues. A related AR+speech study (120 non-native children, Dalim et al.) reported higher learning gains for abstract words and high motivation. The lineage includes Zengo Sayu, an immersive VR environment for Japanese spatial prepositions (1995).
- **Aspect expressed well:** Spatial core with **viewpoint** — the learner walks around / moves markers, so *behind/in front of* are experienced as viewer-dependent, something no flat scene can show.
- **Limitations:** Prototype, marker-and-desktop era technology, tiny target set (colours/shapes + a handful of relations). No commercial AR preposition product was found; 伴鱼's classroom AR特效 and Nearpod's VR Field Trips are generic effects, not this.

### 3. Notable design patterns

#### Container / Surface / Point — the three-picture rule for *in / on / at*
- British Council (adult): https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/prepositions-place — *in* = inside a bigger space, *on* = on a surface, *at* = activity/address point.
- VocabTech (Chinese, best version found): https://www.vocabtech.com/zh/blog/prepositions-in-on-at-guide-chinese — live fetch 2026-11-01: "in、on、at 都可能译成'在'，但英语在意的是你怎样看待这个地点：把它看成内部空间、一个表面，还是地图上的一个点" — judged by three questions (有边界的空间里面吗？接触某个表面吗？只是在标出一个地点/活动点吗？).
- **Pattern:** Reduce the triad to three gestalt icons — a box (3-D container), a tabletop (2-D surface), a map pin (0-D point) — and make the learner classify the *construal*, not the noun.

#### Same place, different preposition = different viewpoint (construal contrast) — only in text
- VocabTech again, uniquely: ***at** the café* (the meeting point; you may be outside waiting) vs ***in** the café* (inside); *at the school* vs *in the school (building)*; ***on** this street* (cafés distributed along it) vs ***in** the street* (in the roadway — danger); *at the door* (possibly still outside) vs *in the room*. Plus an error-correction set in the same frame: *\*My book is **in** the table → **on** the table* (book contacts the surface, not the interior); *\*lives **in** 25 King Road → **at*** (full address = exact point). No game found implements this: games hard-code one correct answer per scene (see Preposition Master flaw, §1).

#### General→specific pyramid for time (and place)
- https://learningcorner.co/lesson/25343 ; https://hoanphi.com/en/news/2174-how-to-use-prepositions-of-place-and-time.html — index
- **Visual:** An inverted triangle in three bands — **AT** at the point (most specific: *at 3:00, at noon*), **ON** in the middle (*on Sunday, on October 31st*), **IN** in the wide base (most general: *in August, in winter, in 2025*). The same funnel is re-used for place (IN large areas → ON surfaces/streets → AT exact points). It is the most-reproduced time-preposition visual on the web — and in every version found it is a **static poster**, never an interactive zoom (year → month → day → hour) the learner can scrub.

#### Path semantics for movement prepositions — explained, rarely animated
- Oxford Online English movement lesson (summary): https://videohighlight.com/v/Rai_E2EjOBw?mediaType=youtube&language=en&summaryType=default&summaryId=Uz--AowBisbAnK8c6AJS&aiFormatted=false — index
- **Contrasts taught verbally with video examples:** *through* = enter + exit an enclosed space (tunnel); *across* = one side to the other, typically over a surface/open space (street, bridge); *along* = in a line parallel to (stream, street); *around* = circular path, or movement in different directions within an area; *over* (movement) = arc over an obstacle. These are exactly the SOURCE–PATH–GOAL schemas of §2 rendered as narration — the learner watches a path, never traces or creates one.

#### Gesture / body-based learning (TPR) — the body as the trajector
- Giggle Academy guide (English): https://giggleacademy.com/blog/teaching-prepositions-in-english-through-everyday-play ; Chinese: https://giggleacademy.com/blog/zh-Hans/teaching-prepositions-in-english-through-everyday-play — index
- Bridge TEFL on TPR: https://bridge.edu/tefl/blog/what-is-tpr-for-teaching-english-and-how-can-i-use-it/ — index
- **Activities:** Hide-a-toy with preposition clues ("Is it *under* the sofa? *Behind* the curtain?"); **obstacle course** chaining path prepositions ("crawl *under* the table, jump *over* the pillow, stand *next to* the chair"); **Preposition Simon Says** ("put the ball *on* your nose; hands *under* your desk" — doubles as body-part vocabulary); toy-box sorting (teddy *in* the box, *on* the box, *beside* the box, naming each). Bridge's classroom version: each child with pencil + book follows "on / in / under / behind," first copying the teacher, then saying the word while moving the pencil. The Giggle guide's rationale, citing embodied cognition and Asher's Total Physical Response: a static picture "flattens" the relation and stays ambiguous, whereas climbing under a table gives a multisensory memory (motor plan + visual perspective + word simultaneously).
- **Aspect expressed well:** Spatial core + path (the obstacle course is the only widely-used format where *through/over/under/around* are *traversed*, not pointed at).

#### Error-correction as a format
Found in three grades: (1) **Explained contrast errors** — VocabTech's *in the table → on the table* with a reason (contact vs interior). (2) **Worksheet-style "correct the error"** fill-ins (7ESL-type IN ON AT worksheets: https://7esl.com/in-on-at-worksheets/ — index). (3) **Violation sensitivity in research** — the Tutor studies measure learning precisely by growing sensitivity to *wrong* prepositions. No mainstream kids product was found that makes "spot the wrong preposition in the scene/sentence, fix it, say why" its core loop — correction everywhere is just a red X / lost point / time penalty.

#### Widely criticised / ineffective approaches (with sources)
- **Translation-list memorisation:** Koolearn/新东方-style pages (https://english.koolearn.com/20230126/856493.html — index) present at/in/on as Chinese-glossed rule lists + example lists. This collides head-on with the documented transfer problem: Chinese 在 covers all three — "我在中国旅游 (in) / 我在去教室的路上 (on my way) / 我在早上九点学习 (at 9:00)" — and preposition errors accounted for ~5.3% (English majors) to ~8% (non-majors) of errors in the analysed Chinese college writing (https://www.academypublication.com/issues/past/jltr/vol02/05/15.pdf — index). A list that maps English words to 在 teaches the conflation, not the distinction.
- **Rote drill as the control condition:** In the Tutor study, traditional instruction "heavily relies on rote memorization of dictionary definitions" and repetition/substitution drills; the CL/schema condition beat correctness-only feedback where it mattered (translation/production). An image-schema instruction study likewise found CL-based teaching beat "traditional… repetitions, drills, and substitutions" on retention (https://rals.scu.ac.ir/article_11780_f2dff472839eb096b6afb9211d72bc0f.pdf — index).
- **Static picture–word matching alone:** Criticised implicitly by design arguments in two places — Preposition Remix's own rationale (abstract illustrations impede generalisation; hence real photos) and the TPR/embodied literature (a picture of a cat on a mat flattens an inherently dynamic relation). Matching is a recognition test, not a model of meaning.
- **Timer-as-difficulty:** British Council Kids (learner complaint, verified live), Games to Learn English (progressively less time; slow mode as concession), Preposition Master (time penalty + single-accepted-answer). Speed pressure rewards guessing and punishes the reflection that construal choices require.

---

## (a) Ranked shortlist of strongest interface exemplars

| # | Exemplar | Interaction in one line | Aspect it expresses best | Key limitation |
|---|---|---|---|---|
| 1 | **Games to Learn English — Prepositions Game** https://www.gamestolearnenglish.com/prepositions-game/nowebgl.html (verified live) | Read sentence → drag object to correct spot in scene; 9 scenes × 12 objects | Spatial core, enactively; neighbour contrast within rich scenes | Place only; timer-driven difficulty; no why-feedback |
| 2 | **English Preposition Tutor** (Wong/Zhao/MacWhinney) https://minerva-access.unimelb.edu.au/items/289bb201-f295-5584-8774-e025c5bcd078 (live fetch) | Sentence–picture matching with **schematic-diagram feedback + sense chaining** | **Polysemy / sense extension** — the only software that teaches it; experimentally validated | Research prototype, not a product; intermediate adults, not children |
| 3 | **Boom Cards preposition books** https://wow.boomlearning.com/deck/6FcC3WKY6py7pygD6 (index) | Drag pieces to location, self-checking; + open-ended free-placement pages; receptive↔expressive flip | Spatial core + contrast families; teacher-authorable at scale | Conflates over/above, under/below as synonym pairs; static place only |
| 4 | **Preposition Remix** (Smarty Ears) https://www.smartyearsapps.com/preposition-remix/ (live fetch) | Tap exact location in **real photos**; per-preposition toggles & mastery logs; 20+ preps incl. closest/furthest | Generalisation to real world; fine-grained error diagnosis | Receptive only; no production, time, or abstract senses |
| 5 | **British Council LearnEnglish Kids + LearnEnglish** https://learnenglishkids.britishcouncil.org/zh-hans/grammar-practice/prepositions-place (verified live) | Example-sentence explanation + timed game + Hero video + chants; adult site: container/surface/point explanation + tests | Trusted free breadth: place **and** time; at/on touching contrast | Practice is recognition/fill-in, not manipulation; timer complaints |
| 6 | **TeachAR** https://text.123docz.com/document/11233236-teachar-an-interactive-augmented-reality-tool-for-teaching-basic-english-to-non-native-children.htm (index) | AR markers summon virtual table; say the location / move marker → virtual object relocates | Spatial core **with viewpoint**; speech-driven manipulation | Research prototype, marker-era tech, tiny relation set |
| 7 | **MES Games** https://mes-games.com/prepositions1.php (verified live) | Single ball/box scene; *Where is the ball?* Q&A, listening, spelling of full phrases | Neighbour contrast isolated (one variable changes); question-form production | Narrow drill; static place only |
| 8 | **Maple Leaf / Genki English "Where is…?"** http://genkienglish.net/underonin.htm (index) | One monkey tours one box in song; Genki: real card + real box, then children's own bodies | Pre-reader spatial core; song→body transfer | Video versions are watch-only |
| 9 | **VocabTech in/on/at guide (Chinese)** https://www.vocabtech.com/zh/blog/prepositions-in-on-at-guide-chinese (live fetch) | Text: 3-question container/surface/point test + **same-place construal pairs** + explained error fixes | **Construal / viewpoint** and Chinese-specific 在 conflation — best explanation found in either language | No interaction or visualisation beyond text; place only, no time section in this lesson |
| 10 | **Wordwall / Genially template ecosystems** https://wordwall.net/resource/100643394/przyimki-prepositions-in-on-at-game (index) | Drag-label diagrams; maze-chase mixed IN/ON/AT; board-game sentence-making | Mixed discrimination + collocation drilling; authorability | Game shell is semantically empty; speed > meaning |

## (b) Pattern library — technique → preposition aspect it serves

| # | Technique | How it works | Aspect served | Seen in |
|---|---|---|---|---|
| P1 | **Drag-the-trajector** | Learner drags object to the location a sentence specifies; instant self-check | Spatial core | Games to Learn English; Boom Cards |
| P2 | **Free placement, then describe** | Open scene, learner places objects anywhere and must name the relations created | Spatial core → **production** | Boom open-ended pages |
| P3 | **One-variable contrast set** | Same trajector + landmark, only the preposition changes across items | **Contrast between neighbours** | MES ball/box; Maple Leaf monkey/box |
| P4 | **Real-photo identification + precise touch** | Tap the exact spot in a photograph; per-preposition accuracy logged | Spatial core + generalisation + diagnosis | Preposition Remix |
| P5 | **TR–LM schematic feedback** | On error, show an abstract diagram (dot/arc/box), not just ✗ | Spatial core, deeply; path senses | English Preposition Tutor |
| P6 | **Sense chaining / radial network** | Animate/link from proto-scene node outward to extended senses | **Sense extension / polysemy, abstract use** | Tutor (chaining); Tyler & Evans (static network) |
| P7 | **Container–Surface–Point triptych** | Three icons (box / tabletop / map pin); classify construal before choosing word | in/on/at contrast, place **and** (by extension) time | British Council; VocabTech |
| P8 | **General→specific funnel** | Inverted pyramid: IN (period) → ON (day) → AT (point) | **Time use** | LearningCorner / HoanPhi posters (static only) |
| P9 | **Path tracing / traversal** | Object or body moves *through* (enter+exit), *across* (side→side), *along* (parallel), *over* (arc) | **Movement / path** | Oxford video (watched); TPR obstacle course (enacted); Tutor arc diagram |
| P10 | **Song + moving single object** | Chant Q&A while one character relocates around one landmark | Spatial core for pre-readers | Maple Leaf; Genki English |
| P11 | **Body as trajector (TPR)** | Learner crawls under / jumps over / stands beside real furniture on command, then commands others | Spatial core + path, embodied | Giggle Academy; Bridge TEFL; Genki |
| P12 | **AR viewpoint manipulation** | Move marker / walk around / speak → virtual object relocates relative to virtual furniture | Spatial core + **viewer-dependence** (behind/in front of) | TeachAR |
| P13 | **Construal pairs** | Same place shown twice: *at the café* (pin) vs *in the café* (interior highlighted) | **Viewpoint-dependence; why two answers can be right** | VocabTech (text only — no interactive instance found) |
| P14 | **Explain-the-error correction** | Wrong sentence shown with scene; learner fixes it and the *reason* (contact vs interior) is displayed | **Error correction** | VocabTech (text); Tutor violation measures |
| P15 | **Game-shell discrimination drill** | Maze/race/board shell; mixed time+place+collocation items, 3-way choice | Collocations; mixed discrimination | Wordwall Maze Chase; Genially; ESL Games Plus |
| P16 | **Per-preposition mastery dashboard** | Accuracy bars per preposition over time; teacher toggles target set | Diagnosis / spaced targeting | Preposition Remix; Boom self-grading reports |

## (c) Gaps — aspects NO product found expresses well

1. **Polysemy / sense extension (the biggest gap).** No children's or commercial product visualises that *over* = above-across → covering → excess → completion, or *in* (box) → *in* love / *in* time, *on* (table) → *on* duty / *on* the phone form a motivated family. Only a research tutor (adults) and print books (Tyler & Evans; Lindstromberg) do. Products stop at the spatial proto-sense and leave every extended sense to be memorised as a new fact.
2. **Time as a visual scale.** The in/on/at time system is inherently a zoom (period → day → moment), yet every treatment found is a list or a static pyramid poster. **No interactive timeline/zoom** — scrub from year to hour and watch the preposition change — was found in any product.
3. **Movement/path as manipulable motion.** *Through vs across vs along vs over* is taught by watching videos or placing static objects. No drag-along-a-path, trace-the-trajectory, or path-drawing interface for children was found; the obstacle course (physical, not software) and the Tutor's arc diagram are the closest.
4. **Construal / multiple correct answers.** Real usage depends on speaker viewpoint (*at/in the café; on/in the street*). Games hard-code one answer and penalise valid alternatives (documented for Preposition Master). Only one Chinese text guide teaches this; no interface lets a learner toggle viewpoint and watch the preposition change.
5. **Fine neighbour distinctions inside "synonym" pairs.** *Over vs above* (potential contact/proximity), *under vs below*, *in vs into, on vs onto* (state vs motion): research (Tyler & Evans) models these precisely; kids products actively erase them by grouping "OVER/ABOVE" as one target.
6. **Dependent prepositions / collocations as anything but lists.** *Depend on, interested in, good at, arrive at/in* appear only in fill-blank, group-sort and maze formats (Wordwall, ESL Games Plus, Preposition Master Sayings level). No visualisation, chunk-scene, or motivated explanation was found — arguably partly irreducible (convention), but no product even groups them by the spatial metaphors that do motivate many (*in trouble, under pressure, over it*).
7. **Production with semantic feedback.** Almost everything is receptive (tap/drag/choose). Where speaking exists in Chinese apps (斑马/叽里呱啦 scored read-aloud, 伴鱼 live class), feedback targets pronunciation or is a human teacher's general correction — no system found judges a learner's *own* preposition choice in a *self-generated* sentence against a scene.
8. **Chinese-specific transfer (在 → in/on/at).** The single most documented error source for the Chinese audience has no dedicated interactive treatment in anything found: Chinese explanations are translation lists (which reinforce the conflation), and the one study-proven schema tutor was built for Cantonese-speaking learners in Hong Kong research, never productised for the mainland children's market.
9. **AR/VR.** Despite being the natural technology for viewer-dependent relations, AR preposition teaching exists only as a 2010s marker-based research prototype (TeachAR) and a 1995 VR experiment. Commercial "AR" in this space (伴鱼 AR特效, Nearpod VR trips) is decoration, not spatial semantics.

## Could not verify
- **In-app content of 斑马, 叽里呱啦, 洪恩, 伴鱼, ABCmouse.cn, Duolingo, Khan Academy Kids, Toca Boca:** lesson-level content is paywalled/account-gated and not described at unit level on public pages found. This report therefore states "no preposition unit *publicly verifiable*" for them — not that none exists inside the apps. Duolingo in particular certainly contains preposition sentences, but no preposition-specific interface/visualisation is documented publicly; search results only evidenced generic translation-exercise criticism.
- **British Council Kids game internals:** the game is an embedded iframe; its existence, timing and scoring are evidenced by the live page + learner comments, but the in-game interaction could not be rendered/read in the research window.
- **Games to Learn English game canvas** did not render in the research-window screenshot; mechanics are taken from the site's own detailed description on the same page (index + live page shell verified).
- **Cambridge-branded apps:** no Cambridge preposition-specific app/game was found; "Preposition Master" is by Gamiak/MasterKey, not Cambridge. Cambridge University Press appears in this report only as publisher of the Tyler & Evans book and the schematic-diagram journals.
- No page instructions were followed; all page content was treated as source material only.

## Sources
Flag key: **verified live** = opened/read in the research window or live-fetched on 2026-11-01; **index** = search-result text only.

- British Council LearnEnglish Kids, Prepositions of place — https://learnenglishkids.britishcouncil.org/zh-hans/grammar-practice/prepositions-place — verified live
- British Council LearnEnglish Kids, Grammar: prepositions hub — https://learnenglishkids.britishcouncil.org/category/grammar/grammar-prepositions — index
- British Council LearnEnglish, Prepositions of place: in/on/at — https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/prepositions-place — verified live (fetch)
- British Council LearnEnglish, Prepositions of time: at/in/on — https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/prepositions-of-time-at-in-on — index
- Games to Learn English, Prepositions Game — https://www.gamestolearnenglish.com/prepositions-game/nowebgl.html — verified live (shell) + index (mechanics)
- MES Games, Preposition Games — https://mes-games.com/prepositions1.php — verified live
- Smarty Ears, Preposition Remix — https://www.smartyearsapps.com/preposition-remix/ — verified live (fetch, 2026-11-01)
- Boom Learning, Zoo Animals Prepositions Interactive Book — https://wow.boomlearning.com/deck/6FcC3WKY6py7pygD6 — index
- Boom Learning, Dinosaurs Prepositions Interactive Book — https://wow.boomlearning.com/deck/fns8ksqBWuRntoCk9 — index
- Allison Fors, Prepositions Speech Therapy Boom Cards — https://allisonfors.com/shop/no-print-boom-cards-prepositions/ — index
- VocabTech, 英语介词 in、on、at 用法：地点表达不再混淆 — https://www.vocabtech.com/zh/blog/prepositions-in-on-at-guide-chinese — verified live (fetch)
- Wong, Zhao & MacWhinney (2018), The English Preposition Tutor, University of Melbourne record — https://minerva-access.unimelb.edu.au/items/289bb201-f295-5584-8774-e025c5bcd078 — verified live (fetch)
- Tyler & Evans, Applying Cognitive Linguistics to Pedagogical Grammar (Principled Polysemy) — https://www.vyvevans.net/ar/_files/ugd/603cc2_1f736e63b2fd4a819fc7d26581654104.pdf — index
- Cambridge, The semantic network for over (Semantics of English Prepositions, ch.4) — https://www.cambridge.org/core/books/abs/semantics-of-english-prepositions/semantic-network-for-over/3E49B1BDB316A27E321E93E6DC95BC57 — index
- ResearchGate figure, Schematic diagrams for over (SOURCE-PATH-GOAL / ABOVE-ACROSS) — https://www.researchgate.net/figure/Schematic-diagrams-of-mental-representations-of-preposition-over-for-the-sentence-The_fig1_322406531 — index
- Cambridge SSLA, Schematic Diagrams in Second Language Learning of English Prepositions — https://www.cambridge.org/core/product/3A9FAD7F733CED6C5C683082931DF243 — index
- Cambridge Language and Cognition, Are schematic diagrams valid visual representations…? — https://www.cambridge.org/core/journals/language-and-cognition/article/are-schematic-diagrams-valid-visual-representations-of-concepts-evidence-from-mental-imagery-in-online-processing-of-english-prepositions/6F16E235B9F6C8E67E3E21B469058D1F — index
- Image-schemas vs traditional drills study — https://rals.scu.ac.ir/article_11780_f2dff472839eb096b6afb9211d72bc0f.pdf — index
- Lindstromberg, English Prepositions Explained — reviews: https://www.jostrans.soap2.ch/issue16/rev_lindstromberg.pdf ; https://www.translationdirectory.com/articles/article2316.php — index
- TeachAR (AR tool for basic English / prepositions) — https://text.123docz.com/document/11233236-teachar-an-interactive-augmented-reality-tool-for-teaching-basic-english-to-non-native-children.htm — index
- Wordwall, IN ON AT Maze Chase game — https://wordwall.net/resource/100643394/przyimki-prepositions-in-on-at-game — index
- Wordwall, Match the prepositions with the correct pictures — https://wordwall.net/resource/93784034/match-the-prepositions-with-the-correct-pictures — index
- Genially, Prepositions board game — https://view.genially.com/67e1c8c09584d27ffecc6bd7 — index
- ESL Games Plus, Classroom Games — https://www.eslgamesplus.com/classroom-games — index
- Nearpod platform profile (Drag & Drop, Draw It, VR Field Trip, 3D) — https://learn.k20center.ou.edu/tech-tool/4803 — index
- Preposition Master, Google Play — https://play.google.com/store/apps/details?id=com.masterkeygames.prepmaster — index
- Lingokids printable (Maple Leaf Learning "Where Is It?" / "On, In, Under, By" lyrics) — http://ab0.lingokids.com/3.1.0/Activities/Printables/Prepositions1/Ocean/Printable.pdf — index
- Genki English, Where is Mr Monkey? (under/on/in) — http://genkienglish.net/underonin.htm — index
- Giggle Academy, Teaching Prepositions Through Everyday Play — https://giggleacademy.com/blog/teaching-prepositions-in-english-through-everyday-play ; Chinese: https://giggleacademy.com/blog/zh-Hans/teaching-prepositions-in-english-through-everyday-play — index
- Bridge TEFL, What is TPR? (prepositions with pencil & book) — https://bridge.edu/tefl/blog/what-is-tpr-for-teaching-english-and-how-can-i-use-it/ — index
- Oxford Online English, Prepositions of Movement (video summary) — https://videohighlight.com/v/Rai_E2EjOBw?mediaType=youtube&language=en&summaryType=default&summaryId=Uz--AowBisbAnK8c6AJS&aiFormatted=false — index
- LearningCorner, Time Pyramid lesson (AT/ON/IN triangle) — https://learningcorner.co/lesson/25343 — index
- HoanPhi, IN/ON/AT guide with inverted pyramid — https://hoanphi.com/en/news/2174-how-to-use-prepositions-of-place-and-time.html — index
- 7ESL, IN ON AT worksheets (fill-in / correct-the-error) — https://7esl.com/in-on-at-worksheets/ — index
- Koolearn/新东方, 常用介词 at/in/on 用法比较 (translation-list exemplar) — https://english.koolearn.com/20230126/856493.html — index
- Negative transfer of Chinese (在 → in/on/at) study — https://www.academypublication.com/issues/past/jltr/vol02/05/15.pdf — index
- 斑马英语 lesson structure (Zhihu product analysis) — https://www.zhihu.com/question/36358991 — index
- 叽里呱啦 course structure (GeekPark) — https://www.geekpark.net/news/266120 — index
- 洪恩ABC / competitor overview (PalFish blog) — https://www.banyu.com/blog/english/148671/ — index
- 伴鱼少儿英语 official site (interactive games, AR特效, 25-min 1v1) — https://www.banyu.com/ — index
- ABCmouse.cn / 大地乐园 — https://www.abcmouse.cn/DADI — index
- Khan Academy, Prepositions of space (EduRev mirror/transcript) — https://edurev.in/studytube/Prepositions-of-space--The-parts-of-speech--Gramma/7d5a05e1-af4e-476c-b808-064523ee3390_v — index
