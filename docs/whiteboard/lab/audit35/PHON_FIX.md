# 决策 35 A1 · 假音标修复对照表

- 假音标 574 个（音标 = 拼写套斜杠，或只有 ASCII 字母且与 CMUdict 读音不同）；白名单（读音本来与拼写同形，如 pen、red）47 个，见 `phon_same_ok.json`。
- 新音标：CMUdict（ARPAbet → IPA，美式、长音带 ː，与词库原有真音标同一口径）；同一词 CMUdict 有多个读音时取与 Wiktionary 美式最接近的；多音词 / CMUdict 首选读音不常用的 61 个人工定（`phon_gen.py` OVERRIDE，多音词两个读音都列，如 close /kloʊz/ /kloʊs/）。
- 与 Wiktionary 美式读音逐音素一致（忽略重音、长音符号）：383 个；不一致多为弱读 ə / ɪ、英美差异、次重音写法，未逐个改；CMUdict 没有的 0 个用 Wiktionary 或合成词拆分。

| id | 词 | 改前 | 改后 | CMUdict | Wiktionary | 一致 |
|---|---|---|---|---|---|---|
| G4_0378 | phone | /phone/ | /foʊn/ | foʊn | ˈfoʊ̯n |  |
| G4_0379 | telephone | /telephone/ | /ˈteləfoʊn/ | ˈteləfoʊn | ˈtɛləˌfoʊn | ✅ |
| G5_0380 | earphone | /earphone/ | /ˈɪrfoʊn/ | ˈɪrfoʊn | ˈɪə(ɹ)fəʊn |  |
| G4_0383 | mini | /mini/ | /ˈmɪni/ | ˈmɪni | ˈmɪn.i | ✅ |
| G3_0384 | close | /close/ | /kloʊz/ /kloʊs/ | kloʊz/ /kloʊs | ˈkloʊ̯z |  |
| G4_0385 | closed | /closed/ | /kloʊzd/ | kloʊzd | kloʊzd | ✅ |
| G5_0386 | closet | /closet/ | /ˈklɑːzət/ | ˈklɑːzət | ˈklɑzɪt |  |
| G3_0387 | carry | /carry/ | /ˈkæri/ | ˈkæri | ˈkæɹ.i | ✅ |
| G3_0388 | card | /card/ | /kɑːrd/ | kɑːrd | kɑɹd | ✅ |
| G4_0389 | bookcase | /bookcase/ | /ˈbʊkkeɪs/ | ˈbʊkkeɪs | ˈbʊkˌkeɪs | ✅ |
| G5_0390 | textbook | /textbook/ | /ˈtekstbʊk/ | ˈtekstbʊk | ˈtɛkst.bʊk | ✅ |
| G5_0391 | housework | /housework/ | /ˈhaʊswɜːrk/ | ˈhaʊswɜːrk | ˈhaʊsˌwɝk | ✅ |
| G5_0392 | schoolwork | /schoolwork/ | /ˈskuːlwɜːrk/ | ˈskuːlwɜːrk | ˈskulˌwɝk | ✅ |
| G4_0393 | classmate | /classmate/ | /ˈklæsmeɪt/ | ˈklæsmeɪt | ˈklæs.meɪt | ✅ |
| G4_0395 | handbag | /handbag/ | /ˈhændbæɡ/ | ˈhændbæɡ | ˈhændˌbæɡ | ✅ |
| G5_0396 | headache | /headache/ | /ˈhedeɪk/ | ˈhedeɪk | ˈhɛdeɪk | ✅ |
| G5_0397 | toothache | /toothache/ | /ˈtuːθeɪk/ | ˈtuːθeɪk | ˈtuθˌeɪk | ✅ |
| G4_0398 | toothbrush | /toothbrush/ | /ˈtuːθbrʌʃ/ | ˈtuːθbrʌʃ | ˈtuθ.bɹʌʃ | ✅ |
| G4_0399 | toothpaste | /toothpaste/ | /ˈtuːθpeɪst/ | ˈtuːθpeɪst | ˈtuθpeɪst | ✅ |
| G5_0400 | haircut | /haircut/ | /ˈherkʌt/ | ˈherkʌt | ˈhɛə(ɹ)kʌt |  |
| G3_0401 | football | /football/ | /ˈfʊtbɔːl/ | ˈfʊtbɔːl | ˈfʊt.bɔːl | ✅ |
| G4_0983 | wood | /wood/ | /wʊd/ | wʊd | wʊd | ✅ |
| G4_0984 | world | /world/ | /wɜːrld/ | wɜːrld | wɝld | ✅ |
| G3_0402 | basketball | /basketball/ | /ˈbæskətbɔːl/ | ˈbæskətbɔːl | ˈbæs.kɪt.bɔl |  |
| G4_0986 | town | /town/ | /taʊn/ | taʊn | ˈtaʊ̯n |  |
| G4_0403 | baseball | /baseball/ | /ˈbeɪsbɔːl/ | ˈbeɪsbɔːl | ˈbeɪs.bɔl | ✅ |
| G5_0404 | volleyball | /volleyball/ | /ˈvɑːlibɔːl/ | ˈvɑːlibɔːl | ˈvɒlibɔ(ː)l | ✅ |
| G4_0405 | snowball | /snowball/ | /ˈsnoʊbɔːl/ | ˈsnoʊbɔːl | ˈsnəʊbɔːl |  |
| G4_0406 | sunshine | /sunshine/ | /ˈsʌnʃaɪn/ | ˈsʌnʃaɪn | ˈsʌnʃaɪn | ✅ |
| G1_0995 | toy | /toy/ | /tɔɪ/ | tɔɪ | tɔɪ | ✅ |
| G5_0407 | sunlight | /sunlight/ | /ˈsʌnlaɪt/ | ˈsʌnlaɪt | ˈsʌnˌlaɪt | ✅ |
| G4_0408 | sunglasses | /sunglasses/ | /ˈsʌnɡlæsɪz/ | ˈsʌnɡlæsɪz |  |  |
| G4_0409 | sunflower | /sunflower/ | /ˈsʌnflaʊər/ | ˈsʌnflaʊər | ˈsʌn.flaʊ.əɹ | ✅ |
| G4_0410 | raincoat | /raincoat/ | /ˈreɪnkoʊt/ | ˈreɪnkoʊt | ˈɹeɪnkoʊt | ✅ |
| G3_0411 | rainbow | /rainbow/ | /ˈreɪnboʊ/ | ˈreɪnboʊ | ˈɹeɪnboʊ | ✅ |
| G5_0412 | waterfall | /waterfall/ | /ˈwɔːtərfɔːl/ | ˈwɔːtərfɔːl | ˈwɔːtəfɔːl |  |
| G2_0413 | birthday | /birthday/ | /ˈbɜːrθdeɪ/ | ˈbɜːrθdeɪ | ˈbɜːθ.deɪ |  |
| G4_0415 | yesterday | /yesterday/ | /ˈjestərdeɪ/ | ˈjestərdeɪ | ˈjɛstɹdeɪ |  |
| G4_0416 | holiday | /holiday/ | /ˈhɑːlədeɪ/ | ˈhɑːlədeɪ | ˈhɑləˌdeɪ | ✅ |
| G5_0417 | weekday | /weekday/ | /ˈwiːkdeɪ/ | ˈwiːkdeɪ | ˈwiːkdeɪ̯ |  |
| G5_0418 | sometimes | /sometimes/ | /ˈsʌmtaɪmz/ | ˈsʌmtaɪmz | ˈsʌm.taɪmz | ✅ |
| G5_0419 | always | /always/ | /ˈɔːlweɪz/ | ˈɔːlweɪz | ˈɔləs |  |
| G5_0421 | railway | /railway/ | /ˈreɪlweɪ/ | ˈreɪlweɪ | ˈɹeɪlˌweɪ | ✅ |
| G5_0422 | underground | /underground/ | /ˈʌndərɡraʊnd/ | ˈʌndərɡraʊnd | ˌʌn.dəɹˈɡɹaʊnd | ✅ |
| G5_0423 | postman | /postman/ | /ˈpoʊstmən/ | ˈpoʊstmən | ˈpəʊs(t)mən |  |
| G4_0425 | everyone | /everyone/ | /ˈevriwʌn/ | ˈevriwʌn | ˈɛv.ɹiː.wʌn | ✅ |
| G5_0426 | everybody | /everybody/ | /ˈevribɑːdi/ | ˈevribɑːdi | ˈɛv.ɹiˌbɑ.di | ✅ |
| G5_0427 | someone | /someone/ | /ˈsʌmwʌn/ | ˈsʌmwʌn | ˈsʌmwʌn | ✅ |
| G5_0428 | somebody | /somebody/ | /ˈsʌmbɑːdi/ | ˈsʌmbɑːdi | ˈsʌmbˌʌdi |  |
| G5_0429 | anyone | /anyone/ | /ˈeniwʌn/ | ˈeniwʌn | ˈɛ.ni.wʌn | ✅ |
| G5_0430 | anybody | /anybody/ | /ˈenibɑːdi/ | ˈenibɑːdi | ˈɛn.i.bʌ.di |  |
| G5_0431 | nobody | /nobody/ | /ˈnoʊbɑːdi/ | ˈnoʊbɑːdi | ˈnoʊˌbʌd.i |  |
| G4_0432 | something | /something/ | /ˈsʌmθɪŋ/ | ˈsʌmθɪŋ | ˈsʌm(p)θɪŋ |  |
| G5_0433 | anything | /anything/ | /ˈeniθɪŋ/ | ˈeniθɪŋ | ˈɛniθɪŋ | ✅ |
| G5_0434 | everything | /everything/ | /ˈevriθɪŋ/ | ˈevriθɪŋ | ˈɛv(ə)ɹiˌθiŋ |  |
| G5_0435 | nothing | /nothing/ | /ˈnʌθɪŋ/ | ˈnʌθɪŋ | ˈnʌθɪŋ | ✅ |
| G5_0436 | everywhere | /everywhere/ | /ˈevriwer/ | ˈevriwer | ˈɛv.ɹi.(h)wɛɹ |  |
| G5_0437 | anywhere | /anywhere/ | /ˈeniwer/ | ˈeniwer | ˈɛn.i.(h)wɛɹ |  |
| G5_0438 | somewhere | /somewhere/ | /ˈsʌmwer/ | ˈsʌmwer | ˈsʌm.wɛɹ | ✅ |
| G4_0439 | care | /care/ | /ker/ | ker | kɛə |  |
| G4_0440 | careful | /careful/ | /ˈkerfəl/ | ˈkerfəl | ˈkɛɹfəl | ✅ |
| G5_0441 | careless | /careless/ | /ˈkerləs/ | ˈkerləs | kɛɹ.ləs | ✅ |
| G4_0443 | use | /use/ | /juːz/ /juːs/ | juːz/ /juːs | juːs |  |
| G5_0444 | useful | /useful/ | /ˈjuːsfəl/ | ˈjuːsfəl | ˈjusfəl | ✅ |
| G6_0445 | useless | /useless/ | /ˈjuːsləs/ | ˈjuːsləs | ˈjus.ləs | ✅ |
| G4_0446 | hope | /hope/ | /hoʊp/ | hoʊp | hoʊp | ✅ |
| G6_0447 | hopeful | /hopeful/ | /ˈhoʊpfəl/ | ˈhoʊpfəl | ˈhoʊpfl̩ | ✅ |
| G5_0448 | wonder | /wonder/ | /ˈwʌndər/ | ˈwʌndər | ˈwʌndɚ | ✅ |
| G4_0449 | wonderful | /wonderful/ | /ˈwʌndərfəl/ | ˈwʌndərfəl | ˈwʌndɚfl̩ | ✅ |
| G5_0450 | beauty | /beauty/ | /ˈbjuːti/ | ˈbjuːti | ˈbjuti | ✅ |
| G4_0451 | beautiful | /beautiful/ | /ˈbjuːtəfəl/ | ˈbjuːtəfəl | ˈbju.tɪ.fəl |  |
| G2_0452 | colour | /colour/ | /ˈkʌlər/ | ˈkʌlər |  |  |
| G4_0453 | colourful | /colourful/ | /ˈkʌlərfəl/ | ˈkʌlərfəl |  |  |
| G5_0454 | famous | /famous/ | /ˈfeɪməs/ | ˈfeɪməs | ˈfeɪ.məs | ✅ |
| G5_0455 | danger | /danger/ | /ˈdeɪndʒər/ | ˈdeɪndʒər | ˈdeɪn.d͡ʒɚ |  |
| G5_0456 | dangerous | /dangerous/ | /ˈdeɪndʒərəs/ | ˈdeɪndʒərəs | ˈdeɪn.d͡ʒ(ə.)ɹəs |  |
| G4_0457 | unhappy | /unhappy/ | /ənˈhæpi/ | ənˈhæpi | ʌnˈhæpi |  |
| G5_0458 | unlucky | /unlucky/ | /ənˈlʌki/ | ənˈlʌki | ʌnˈlʌki |  |
| G6_0459 | unusual | /unusual/ | /ʌnˈjuːʒuəl/ | ʌnˈjuːʒuəl | ʌnˈjuːʒ(u)əl | ✅ |
| G5_0460 | unhealthy | /unhealthy/ | /ənˈhelθi/ | ənˈhelθi | ʌnˈhɛl.θi |  |
| G5_0461 | untidy | /untidy/ | /ənˈtaɪdi/ | ənˈtaɪdi | ʌnˈtaɪdi |  |
| G4_0462 | tidy | /tidy/ | /ˈtaɪdi/ | ˈtaɪdi | ˈtaɪ.di | ✅ |
| G5_0463 | usual | /usual/ | /ˈjuːʒuəl/ | ˈjuːʒuəl | ˈju.ʒuəl | ✅ |
| G4_0464 | usually | /usually/ | /ˈjuːʒuəli/ | ˈjuːʒuəli | ˈjuːʒʊəli |  |
| G5_0465 | review | /review/ | /ˌriːˈvjuː/ | ˌriːˈvjuː | ɹɪˈvju |  |
| G5_0466 | return | /return/ | /rɪˈtɜːrn/ | rɪˈtɜːrn | ɹɪˈtɜːn |  |
| G4_0467 | repeat | /repeat/ | /rɪˈpiːt/ | rɪˈpiːt | ɹɪˈpiːt | ✅ |
| G4_0468 | remember | /remember/ | /rɪˈmembər/ | rɪˈmembər | ɹɪˈmɛm.bɚ | ✅ |
| G6_0469 | reply | /reply/ | /rɪˈplaɪ/ | rɪˈplaɪ | ɹɪˈplaɪ | ✅ |
| G5_0470 | dislike | /dislike/ | /dɪsˈlaɪk/ | dɪsˈlaɪk | dɪsˈlaɪk | ✅ |
| G6_0471 | disappear | /disappear/ | /ˌdɪsəˈpɪr/ | ˌdɪsəˈpɪr | dɪsəˈpɪɹ | ✅ |
| G6_0472 | appear | /appear/ | /əˈpɪr/ | əˈpɪr | əˈpɪɹ | ✅ |
| G6_0473 | discover | /discover/ | /dɪˈskʌvər/ | dɪˈskʌvər | dɪˈskʌvɚ | ✅ |
| G5_0474 | cover | /cover/ | /ˈkʌvər/ | ˈkʌvər | ˈkʌvɚ | ✅ |
| G5_0475 | impolite | /impolite/ | /ˌɪmpəˈlaɪt/ | ˌɪmpəˈlaɪt | ɪmpəˈlaɪt | ✅ |
| G6_0476 | impossible | /impossible/ | /ɪmˈpɑːsəbəl/ | ɪmˈpɑːsəbəl | ɪmˈpɑ.sə.bəl | ✅ |
| G6_0477 | possible | /possible/ | /ˈpɑːsəbəl/ | ˈpɑːsəbəl | ˈpɑ.sə.bəl | ✅ |
| G6_0478 | international | /international/ | /ˌɪntərˈnæʃənəl/ | ˌɪntərˈnæʃənəl | ˌɪn.(t)ɚˈnæʃ.(ə.)n(ə)l | ✅ |
| G4_0479 | interesting | /interesting/ | /ˈɪntərəstɪŋ/ | ˈɪntərəstɪŋ | ˈɪntəɹəstɪŋ | ✅ |
| G5_0480 | interested | /interested/ | /ˈɪntərɪstɪd/ | ˈɪntərɪstɪd | ˈɪn.(t)əˌɹɛs.tɪd |  |
| G4_0481 | worker | /worker/ | /ˈwɜːrkər/ | ˈwɜːrkər | ˈwɝ.kɚ | ✅ |
| G4_0482 | farmer | /farmer/ | /ˈfɑːrmər/ | ˈfɑːrmər | ˈfɑɹ.mɚ | ✅ |
| G4_0483 | farm | /farm/ | /fɑːrm/ | fɑːrm | ˈfɑɹm | ✅ |
| G5_0484 | singer | /singer/ | /ˈsɪŋər/ | ˈsɪŋər | ˈsɪŋ.ə |  |
| G5_0485 | dancer | /dancer/ | /ˈdænsər/ | ˈdænsər | ˈdænsəɹ | ✅ |
| G5_0486 | writer | /writer/ | /ˈraɪtər/ | ˈraɪtər | ˈɹaɪ.təɹ | ✅ |
| G5_0488 | player | /player/ | /ˈpleɪər/ | ˈpleɪər | ˈpleɪ.ɚ | ✅ |
| G5_0490 | cleaner | /cleaner/ | /ˈkliːnər/ | ˈkliːnər | ˈkli.nɚ | ✅ |
| G5_0491 | reader | /reader/ | /ˈriːdər/ | ˈriːdər | ˈɹi.dɚ | ✅ |
| G5_0493 | winner | /winner/ | /ˈwɪnər/ | ˈwɪnər | ˈwɪnɚ | ✅ |
| G5_0494 | win | /win/ | /wɪn/ | wɪn | wɪn | ✅ |
| G5_0495 | artist | /artist/ | /ˈɑːrtɪst/ | ˈɑːrtɪst | ˈɑɹ.tɪst | ✅ |
| G3_0496 | art | /art/ | /ɑːrt/ | ɑːrt | ɑɹt | ✅ |
| G6_0497 | pianist | /pianist/ | /ˈpiːənɪst/ | ˈpiːənɪst | ˈpi.ənɪst | ✅ |
| G4_0498 | piano | /piano/ | /piˈænoʊ/ | piˈænoʊ | piˈænoʊ | ✅ |
| G5_0499 | dentist | /dentist/ | /ˈdentɪst/ | ˈdentɪst | ˈdɛntɪst | ✅ |
| G4_0500 | cook | /cook/ | /kʊk/ | kʊk | kʊk | ✅ |
| G3_0505 | cloud | /cloud/ | /klaʊd/ | klaʊd | ˈklaʊ̯d |  |
| G2_0506 | star | /star/ | /stɑːr/ | stɑːr | stɑː(ɹ) | ✅ |
| G4_0508 | lucky | /lucky/ | /ˈlʌki/ | ˈlʌki | ˈlʌki | ✅ |
| G5_0509 | noisy | /noisy/ | /ˈnɔɪzi/ | ˈnɔɪzi | ˈnɔɪzi | ✅ |
| G5_0510 | noise | /noise/ | /nɔɪz/ | nɔɪz | ˈnoɪ̯z |  |
| G5_0511 | sleepy | /sleepy/ | /ˈsliːpi/ | ˈsliːpi | ˈsliːpi | ✅ |
| G4_0513 | dirty | /dirty/ | /ˈdɜːrti/ | ˈdɜːrti | ˈdɝti | ✅ |
| G4_0514 | thirsty | /thirsty/ | /ˈθɜːrsti/ | ˈθɜːrsti | ˈθɝs.ti | ✅ |
| G3_0515 | hungry | /hungry/ | /ˈhʌŋɡri/ | ˈhʌŋɡri | ˈhʌŋ.ɡɹi | ✅ |
| G5_0516 | health | /health/ | /helθ/ | helθ | ˈhɛlθ | ✅ |
| G4_0517 | station | /station/ | /ˈsteɪʃən/ | ˈsteɪʃən | ˈsteɪʃən | ✅ |
| G4_0518 | question | /question/ | /ˈkwestʃən/ | ˈkwestʃən | ˈkwɛs.tʃən | ✅ |
| G6_0519 | direction | /direction/ | /dəˈrekʃn/ | dəˈrekʃn | dɪˈɹɛk.ʃən |  |
| G6_0520 | collection | /collection/ | /kəˈlekʃən/ | kəˈlekʃən | kəˈlɛkʃən | ✅ |
| G5_0521 | collect | /collect/ | /kəˈlekt/ | kəˈlekt | ˈkɑlɪkt |  |
| G6_0522 | invent | /invent/ | /ɪnˈvent/ | ɪnˈvent | ɪnˈvɛnt | ✅ |
| G6_0523 | invention | /invention/ | /ɪnˈvenʃən/ | ɪnˈvenʃən | ɪnˈvɛnʃən | ✅ |
| G6_0524 | celebrate | /celebrate/ | /ˈseləbreɪt/ | ˈseləbreɪt | ˈsɛl.ə.bɹeɪt | ✅ |
| G6_0525 | environment | /environment/ | /ɪnˈvaɪrənmənt/ | ɪnˈvaɪrənmənt | ɪnˈvaɪ.ɚn.mənt |  |
| G6_0526 | kindness | /kindness/ | /ˈkaɪndnəs/ | ˈkaɪndnəs | ˈkaɪnd.nəs | ✅ |
| G3_0527 | kind | /kind/ | /kaɪnd/ | kaɪnd | kaɪnd | ✅ |
| G6_0528 | illness | /illness/ | /ˈɪlnəs/ | ˈɪlnəs | ˈɪl.nəs | ✅ |
| G4_0529 | ill | /ill/ | /ɪl/ | ɪl | ɪl | ✅ |
| G5_0530 | quietly | /quietly/ | /ˈkwaɪətli/ | ˈkwaɪətli | ˈkwaɪ.ɪt.li |  |
| G5_0531 | slowly | /slowly/ | /ˈsloʊli/ | ˈsloʊli | ˈsloʊli | ✅ |
| G5_0532 | quickly | /quickly/ | /ˈkwɪkli/ | ˈkwɪkli | ˈkwɪk.li | ✅ |
| G4_0533 | quick | /quick/ | /kwɪk/ | kwɪk | kwɪk | ✅ |
| G5_0534 | happily | /happily/ | /ˈhæpəli/ | ˈhæpəli | ˈhæp.ə.li | ✅ |
| G5_0535 | easily | /easily/ | /ˈiːzəli/ | ˈiːzəli | ˈi.zɪ.li |  |
| G4_0536 | easy | /easy/ | /ˈiːzi/ | ˈiːzi | ˈiːzi | ✅ |
| G5_0537 | loudly | /loudly/ | /ˈlaʊdli/ | ˈlaʊdli | ˈlaʊdli | ✅ |
| G4_0538 | loud | /loud/ | /laʊd/ | laʊd | ˈlaʊ̯d |  |
| G4_0539 | really | /really/ | /ˈriːəli/ | ˈriːəli | ˈɹɪl.i |  |
| G5_0540 | real | /real/ | /riːl/ | riːl | ˈɹi.əl |  |
| G5_0541 | finally | /finally/ | /ˈfaɪnəli/ | ˈfaɪnəli | ˈfaɪ.nə.li | ✅ |
| G4_0542 | lovely | /lovely/ | /ˈlʌvli/ | ˈlʌvli | ˈlʌv.li | ✅ |
| G6_0543 | daily | /daily/ | /ˈdeɪli/ | ˈdeɪli | ˈdeɪli | ✅ |
| G3_0544 | thirteen | /thirteen/ | /ˌθɜːrˈtiːn/ | ˌθɜːrˈtiːn | ˌθɝtˈtin |  |
| G3_0545 | fourteen | /fourteen/ | /ˌfɔːrˈtiːn/ | ˌfɔːrˈtiːn | ˈfɔɹ.tin | ✅ |
| G3_0546 | seventeen | /seventeen/ | /ˌsevənˈtiːn/ | ˌsevənˈtiːn | ˈsɛv.ən.tiːn | ✅ |
| G3_0547 | nineteen | /nineteen/ | /ˌnaɪnˈtiːn/ | ˌnaɪnˈtiːn | ˈnaɪntiːn | ✅ |
| G4_0548 | thirty | /thirty/ | /ˈθɜːrti/ | ˈθɜːrti | θeːti |  |
| G4_0549 | forty | /forty/ | /ˈfɔːrti/ | ˈfɔːrti | ˈfɔːti |  |
| G4_0550 | fifty | /fifty/ | /ˈfɪfti/ | ˈfɪfti | ˈfɪfti | ✅ |
| G4_0551 | sixty | /sixty/ | /ˈsɪksti/ | ˈsɪksti | ˈsɪksti | ✅ |
| G4_0552 | seventy | /seventy/ | /ˈsevənti/ | ˈsevənti | ˈsɛv.ən.di |  |
| G4_0553 | eighty | /eighty/ | /ˈeɪti/ | ˈeɪti | ˈeɪ.ti | ✅ |
| G4_0554 | ninety | /ninety/ | /ˈnaɪnti/ | ˈnaɪnti | ˈnaɪn.di |  |
| G5_0555 | fourth | /fourth/ | /fɔːrθ/ | fɔːrθ | fɔːθ |  |
| G5_0556 | fifth | /fifth/ | /fɪfθ/ | fɪfθ | fɪfθ | ✅ |
| G5_0557 | sixth | /sixth/ | /sɪksθ/ | sɪksθ | sɪksθ | ✅ |
| G5_0558 | seventh | /seventh/ | /ˈsevənθ/ | ˈsevənθ | ˈsɛvənθ | ✅ |
| G5_0559 | eighth | /eighth/ | /eɪtθ/ | eɪtθ | eɪtθ | ✅ |
| G5_0560 | ninth | /ninth/ | /naɪnθ/ | naɪnθ | naɪnθ | ✅ |
| G5_0561 | tenth | /tenth/ | /tenθ/ | tenθ | tɛnθ | ✅ |
| G5_0562 | twelfth | /twelfth/ | /twelfθ/ | twelfθ | twɛlfθ/ [tʰw̥ɛɫfθ] |  |
| G5_0563 | twentieth | /twentieth/ | /ˈtwentiəθ/ | ˈtwentiəθ | ˈtwɛn.ti.əθ | ✅ |
| G3_0565 | evening | /evening/ | /ˈiːvnɪŋ/ | ˈiːvnɪŋ | ˈiv.nɪŋ | ✅ |
| G5_0566 | building | /building/ | /ˈbɪldɪŋ/ | ˈbɪldɪŋ | ˈbɪld.ɪŋ | ✅ |
| G5_0567 | build | /build/ | /bɪld/ | bɪld | bɪld | ✅ |
| G5_0568 | excited | /excited/ | /ɪkˈsaɪtɪd/ | ɪkˈsaɪtɪd | ɪkˈsaɪ.tɪd | ✅ |
| G5_0569 | exciting | /exciting/ | /ɪkˈsaɪtɪŋ/ | ɪkˈsaɪtɪŋ | ɪkˈsʌɪtɪŋ |  |
| G4_0570 | tired | /tired/ | /ˈtaɪərd/ | ˈtaɪərd |  |  |
| G5_0571 | bored | /bored/ | /bɔːrd/ | bɔːrd | bɔɹd | ✅ |
| G6_0572 | shorter | /shorter/ | /ˈʃɔːrtər/ | ˈʃɔːrtər | ˈʃɔɹtɚ | ✅ |
| G6_0573 | older | /older/ | /ˈoʊldər/ | ˈoʊldər | ˈoʊldɚ | ✅ |
| G4_0575 | young | /young/ | /jʌŋ/ | jʌŋ | jʌŋ | ✅ |
| G6_0576 | bigger | /bigger/ | /ˈbɪɡər/ | ˈbɪɡər | ˈbɪɡɚ | ✅ |
| G6_0577 | smaller | /smaller/ | /ˈsmɔːlər/ | ˈsmɔːlər | ˈsmɔ.lɚ | ✅ |
| G6_0578 | faster | /faster/ | /ˈfæstər/ | ˈfæstər | ˈfæstɚ | ✅ |
| G4_0580 | shorts | /shorts/ | /ʃɔːrts/ | ʃɔːrts | ʃɔː(ɹ)ts | ✅ |
| G4_0581 | grow | /grow/ | /ɡroʊ/ | ɡroʊ | ˈɡɹoʊ | ✅ |
| G5_0582 | twin | /twin/ | /twɪn/ | twɪn | twɪn | ✅ |
| G5_0583 | twice | /twice/ | /twaɪs/ | twaɪs | twaɪs | ✅ |
| G4_0585 | only | /only/ | /ˈoʊnli/ | ˈoʊnli | ˈoʊn.li | ✅ |
| G5_0586 | alone | /alone/ | /əˈloʊn/ | əˈloʊn | əˈloʊn | ✅ |
| G5_0587 | once | /once/ | /wʌns/ | wʌns | wʌn(t)s |  |
| G5_0589 | feed | /feed/ | /fiːd/ | fiːd | fiːd | ✅ |
| G3_0590 | cookie | /cookie/ | /ˈkʊki/ | ˈkʊki | ˈkʊki | ✅ |
| G5_0591 | biscuit | /biscuit/ | /ˈbɪskət/ | ˈbɪskət | ˈbɪs.kɪt |  |
| G4_0592 | road | /road/ | /roʊd/ | roʊd | ɹod | ✅ |
| G4_0593 | true | /true/ | /truː/ | truː | tɹuː | ✅ |
| G6_0594 | trust | /trust/ | /trʌst/ | trʌst | tɹʌst | ✅ |
| G4_0598 | bright | /bright/ | /braɪt/ | braɪt | ˈbɹaɪ̯t |  |
| G2_0599 | night | /night/ | /naɪt/ | naɪt | naɪ̯t |  |
| G3_0600 | right | /right/ | /raɪt/ | raɪt | ɹaɪt | ✅ |
| G4_0601 | high | /high/ | /haɪ/ | haɪ | haɪ | ✅ |
| G6_0602 | flight | /flight/ | /flaɪt/ | flaɪt | ˈflaɪ̯t |  |
| G6_0603 | sight | /sight/ | /saɪt/ | saɪt | saɪt | ✅ |
| G5_0604 | fight | /fight/ | /faɪt/ | faɪt | fəɪt |  |
| G5_0605 | February | /February/ | /ˈfebrueri/ | ˈfebrueri | ˈfɛb.ɹuˌɛɹi | ✅ |
| G5_0606 | March | /March/ | /mɑːrtʃ/ | mɑːrtʃ | mɑːtʃ |  |
| G5_0607 | April | /April/ | /ˈeɪprəl/ | ˈeɪprəl | ˈeɪ.pɹɪl |  |
| G5_0609 | July | /July/ | /dʒuˈlaɪ/ | dʒuˈlaɪ | d͡ʒʊˈlaɪ |  |
| G5_0610 | August | /August/ | /ˈɔːɡəst/ | ˈɔːɡəst | ˈɔ.ɡəst | ✅ |
| G5_0611 | November | /November/ | /noʊˈvembər/ | noʊˈvembər | nəʊˈvɛmbə |  |
| G5_0612 | myself | /myself/ | /maɪˈself/ | maɪˈself | maɪˈsɛlf | ✅ |
| G5_0613 | yourself | /yourself/ | /jʊrˈself/ | jʊrˈself | jəˈsɛlf |  |
| G5_0614 | himself | /himself/ | /hɪmˈself/ | hɪmˈself | hɪmˈsɛlf | ✅ |
| G5_0615 | herself | /herself/ | /hərˈself/ | hərˈself | hɝˈsɛlf |  |
| G6_0616 | ourselves | /ourselves/ | /ɑːrˈselvz/ | ɑːrˈselvz | aʊɚˈsɛlvz |  |
| G6_0617 | yourselves | /yourselves/ | /jʊrˈselvz/ | jʊrˈselvz | jəˈsɛlvz |  |
| G6_0618 | themselves | /themselves/ | /ðəmˈselvz/ | ðəmˈselvz | ðɛmˈsɛlvz |  |
| G3_0619 | speak | /speak/ | /spiːk/ | spiːk | spiːk | ✅ |
| G6_0620 | speaker | /speaker/ | /ˈspiːkər/ | ˈspiːkər | ˈspikɚ | ✅ |
| G6_0621 | speech | /speech/ | /spiːtʃ/ | spiːtʃ | spiːt͡ʃ |  |
| G6_0624 | retell | /retell/ | /riˈtel/ | riˈtel | ɹiˈtɛl | ✅ |
| G6_0627 | knowledge | /knowledge/ | /ˈnɑːlɪdʒ/ | ˈnɑːlɪdʒ | ˈnɑ.lɪdʒ | ✅ |
| G3_0628 | learn | /learn/ | /lɜːrn/ | lɜːrn | lɜːn |  |
| G6_0629 | learner | /learner/ | /ˈlɜːrnər/ | ˈlɜːrnər | ˈlɜɹnəɹ | ✅ |
| G3_0630 | teach | /teach/ | /tiːtʃ/ | tiːtʃ | tiːt͡ʃ |  |
| G6_0632 | thought | /thought/ | /θɔːt/ | θɔːt | θoːt |  |
| G5_0633 | tour | /tour/ | /tʊr/ | tʊr | tʊə |  |
| G5_0634 | tourist | /tourist/ | /ˈtʊrɪst/ | ˈtʊrɪst | ˈtʊɹɪst | ✅ |
| G4_0635 | travel | /travel/ | /ˈtrævəl/ | ˈtrævəl | ˈtɹævəl | ✅ |
| G6_0636 | traveller | /traveller/ | /ˈtrævələr/ | ˈtrævələr | ˈtɹævəlɚ | ✅ |
| G4_0637 | cross | /cross/ | /krɔːs/ | krɔːs | kɹɒs |  |
| G5_0638 | across | /across/ | /əˈkrɔːs/ | əˈkrɔːs | əˈkɹɒs |  |
| G4_0639 | pass | /pass/ | /pæs/ | pæs | pɑːs |  |
| G6_0640 | passenger | /passenger/ | /ˈpæsəndʒər/ | ˈpæsəndʒər | ˈpæs.ɪn.d͡ʒɚ |  |
| G3_0641 | hear | /hear/ | /hiːr/ | hiːr | ˈhɪɚ |  |
| G2_0642 | listen | /listen/ | /ˈlɪsən/ | ˈlɪsən | ˈlɪsən | ✅ |
| G4_0643 | feel | /feel/ | /fiːl/ | fiːl | fiːl | ✅ |
| G5_0644 | feeling | /feeling/ | /ˈfiːlɪŋ/ | ˈfiːlɪŋ | ˈfi.lɪŋ | ✅ |
| G5_0645 | smell | /smell/ | /smel/ | smel | smɛl | ✅ |
| G5_0646 | taste | /taste/ | /teɪst/ | teɪst | teɪst | ✅ |
| G4_0647 | sound | /sound/ | /saʊnd/ | saʊnd | ˈsaʊ̯nd |  |
| G3_0648 | shop | /shop/ | /ʃɑːp/ | ʃɑːp | ʃɒp | ✅ |
| G4_0649 | shopping | /shopping/ | /ˈʃɑːpɪŋ/ | ˈʃɑːpɪŋ | ˈʃɑpɪŋ | ✅ |
| G3_0650 | buy | /buy/ | /baɪ/ | baɪ | baɪ | ✅ |
| G5_0651 | sell | /sell/ | /sel/ | sel | sɛl | ✅ |
| G5_0652 | sale | /sale/ | /seɪl/ | seɪl | seːl |  |
| G5_0654 | life | /life/ | /laɪf/ | laɪf | ˈlaɪ̯f |  |
| G6_0655 | alive | /alive/ | /əˈlaɪv/ | əˈlaɪv | əˈlaɪv | ✅ |
| G5_0656 | nature | /nature/ | /ˈneɪtʃər/ | ˈneɪtʃər | ˈneɪ̯.t͡ʃəɹ |  |
| G6_0657 | natural | /natural/ | /ˈnætʃərəl/ | ˈnætʃərəl | ˈnæt͡ʃ.(ə.)ɹəl |  |
| G5_0658 | national | /national/ | /ˈnæʃənəl/ | ˈnæʃənəl | ˈnæʃ.ə.nəl | ✅ |
| G3_0659 | feet | /feet/ | /fiːt/ | fiːt | ˈfiːt | ✅ |
| G3_0660 | tooth | /tooth/ | /tuːθ/ | tuːθ | tuθ | ✅ |
| G3_0661 | teeth | /teeth/ | /tiːθ/ | tiːθ | ˈtiθ | ✅ |
| G4_0662 | goose | /goose/ | /ɡuːs/ | ɡuːs | ɡus | ✅ |
| G3_0667 | child | /child/ | /tʃaɪld/ | tʃaɪld | tʃaɪld | ✅ |
| G3_0668 | children | /children/ | /ˈtʃɪldrən/ | ˈtʃɪldrən | ˈt͡ʃɪldɹən |  |
| G6_0670 | sang | /sang/ | /sæŋ/ | sæŋ | ˈseɪ̯ŋ |  |
| G6_0671 | swam | /swam/ | /swæm/ | swæm | swæm | ✅ |
| G6_0672 | drank | /drank/ | /dræŋk/ | dræŋk | dɹæŋk | ✅ |
| G6_0673 | exact | /exact/ | /ɪɡˈzækt/ | ɪɡˈzækt | ɪɡˈzækt | ✅ |
| G6_0674 | exactly | /exactly/ | /ɪɡˈzæktli/ | ɪɡˈzæktli | ɪɡˈzæk(t).li | ✅ |
| G5_0675 | perfect | /perfect/ | /ˈpɜːrfɪkt/ | ˈpɜːrfɪkt | ˈpɝ.fɪkt | ✅ |
| G4_0676 | camera | /camera/ | /ˈkæmərə/ | ˈkæmərə | ˈkæməɹə | ✅ |
| G6_0677 | photograph | /photograph/ | /ˈfoʊtəɡræf/ | ˈfoʊtəɡræf | ˈfoʊ.təˌɡɹæf | ✅ |
| G6_0678 | geography | /geography/ | /dʒiˈɑːɡrəfi/ | dʒiˈɑːɡrəfi | d͡ʒiˈɑɡɹəfi |  |
| G6_0679 | transport | /transport/ | /ˈtrænspɔːrt/ | ˈtrænspɔːrt | tɹænsˈpɔːt |  |
| G6_0680 | export | /export/ | /ˈekspɔːrt/ | ˈekspɔːrt | ˈɛks.pɔːt |  |
| G6_0681 | import | /import/ | /ɪmˈpɔːrt/ | ɪmˈpɔːrt | ˈɪm.pɔːt |  |
| G6_0682 | support | /support/ | /səˈpɔːrt/ | səˈpɔːrt | səˈpoɹt |  |
| G6_0683 | transform | /transform/ | /trænsˈfɔːrm/ | trænsˈfɔːrm | tɹænsˈfɔɹm | ✅ |
| G6_0684 | instruction | /instruction/ | /ɪnˈstrʌkʃən/ | ɪnˈstrʌkʃən | ɪnˈstɹʌkʃən | ✅ |
| G6_0685 | signal | /signal/ | /ˈsɪɡnəl/ | ˈsɪɡnəl | ˈsɪɡnəl | ✅ |
| G6_0687 | moving | /moving/ | /ˈmuːvɪŋ/ | ˈmuːvɪŋ | ˈmuːvɪŋ | ✅ |
| G6_0688 | motor | /motor/ | /ˈmoʊtər/ | ˈmoʊtər | ˈmoʊtəɹ | ✅ |
| G5_0689 | center | /center/ | /ˈsentər/ | ˈsentər | ˈsɛn.təː |  |
| G5_0690 | circus | /circus/ | /ˈsɜːrkəs/ | ˈsɜːrkəs | ˈsɝkəs | ✅ |
| G6_0692 | campus | /campus/ | /ˈkæmpəs/ | ˈkæmpəs | ˈkæmpəs | ✅ |
| G6_0693 | champion | /champion/ | /ˈtʃæmpiən/ | ˈtʃæmpiən | ˈt͡ʃæm.pi.ən |  |
| G4_0694 | bookmark | /bookmark/ | /ˈbʊkmɑːrk/ | ˈbʊkmɑːrk | ˈbʊkmɑːɹk | ✅ |
| G4_0695 | bookshop | /bookshop/ | /ˈbʊkʃɑːp/ | ˈbʊkʃɑːp |  |  |
| G4_0696 | washroom | /washroom/ | /ˈwɑːʃruːm/ | ˈwɑːʃruːm | ˈwɒʃrʊm |  |
| G5_0697 | restroom | /restroom/ | /ˈrestruːm/ | ˈrestruːm | ˈɹɛstˌɹum | ✅ |
| G5_0698 | schoolyard | /schoolyard/ | /ˈskuːljɑːrd/ | ˈskuːljɑːrd |  |  |
| G6_0699 | workplace | /workplace/ | /ˈwɜːrkpleɪs/ | ˈwɜːrkpleɪs | ˈwɝkˌpleɪs | ✅ |
| G6_0700 | teamwork | /teamwork/ | /ˈtiːmwɜːrk/ | ˈtiːmwɜːrk |  |  |
| G5_0701 | handwriting | /handwriting/ | /ˈhændraɪtɪŋ/ | ˈhændraɪtɪŋ | ˈhændɹaɪtɪŋ | ✅ |
| G5_0702 | handmade | /handmade/ | /ˌhændˈmeɪd/ | ˌhændˈmeɪd | ˈhændˌmeɪd | ✅ |
| G6_0703 | headmaster | /headmaster/ | /ˌhedˈmæstər/ | ˌhedˈmæstər | ˈhɛdˌmæstɚ | ✅ |
| G5_0704 | headphone | /headphone/ | /ˈhedfoʊn/ | ˈhedfoʊn | ˈhɛdfoʊn | ✅ |
| G5_0705 | footprint | /footprint/ | /ˈfʊtprɪnt/ | ˈfʊtprɪnt | ˈfʊtpɹɪnt | ✅ |
| G5_0706 | sunset | /sunset/ | /ˈsʌnset/ | ˈsʌnset | ˈsʌnˌsɛt | ✅ |
| G5_0707 | sunrise | /sunrise/ | /ˈsʌnraɪz/ | ˈsʌnraɪz | ˈsʌnɹaɪz | ✅ |
| G6_0708 | sunburn | /sunburn/ | /ˈsʌnbɜːrn/ | ˈsʌnbɜːrn | ˈsʌnˌbɝn | ✅ |
| G4_0709 | raindrop | /raindrop/ | /ˈreɪndrɑːp/ | ˈreɪndrɑːp | ˈɾɛindɾɒp |  |
| G4_0710 | snowflake | /snowflake/ | /ˈsnoʊfleɪk/ | ˈsnoʊfleɪk | ˈsnoʊ.fleɪk | ✅ |
| G5_0711 | daytime | /daytime/ | /ˈdeɪtaɪm/ | ˈdeɪtaɪm | ˈdeɪtaɪm | ✅ |
| G3_0712 | bedtime | /bedtime/ | /ˈbedtaɪm/ | ˈbedtaɪm | ˈbɛdtaɪm | ✅ |
| G4_0713 | lunchtime | /lunchtime/ | /ˈlʌntʃtaɪm/ | ˈlʌntʃtaɪm | ˈlʌnt͡ʃtaɪm |  |
| G5_0714 | timetable | /timetable/ | /ˈtaɪmteɪbəl/ | ˈtaɪmteɪbəl | ˈtaɪmˌteɪbəl | ✅ |
| G5_0715 | mooncake | /mooncake/ | /ˈmuːnkeɪk/ | ˈmuːnkeɪk | ˈmunkeɪk | ✅ |
| G4_0716 | pancake | /pancake/ | /ˈpænkeɪk/ | ˈpænkeɪk | ˈpæn.keɪk | ✅ |
| G3_0717 | cupcake | /cupcake/ | /ˈkʌpkeɪk/ | ˈkʌpkeɪk | ˈkʌpkeɪk | ✅ |
| G5_0718 | milkshake | /milkshake/ | /ˈmɪlkʃeɪk/ | ˈmɪlkʃeɪk | ˈmɪlk.ʃeɪk | ✅ |
| G5_0719 | seafood | /seafood/ | /ˈsiːfuːd/ | ˈsiːfuːd | ˈsiːfuːd | ✅ |
| G5_0720 | seaside | /seaside/ | /ˈsiːsaɪd/ | ˈsiːsaɪd | ˌsiːˈsaɪd | ✅ |
| G4_0721 | outside | /outside/ | /ˌaʊtˈsaɪd/ | ˌaʊtˈsaɪd | ˈaʊt.saɪd | ✅ |
| G4_0722 | inside | /inside/ | /ɪnˈsaɪd/ | ɪnˈsaɪd | ˈɪnsaɪd | ✅ |
| G5_0723 | downstairs | /downstairs/ | /ˌdaʊnˈsterz/ | ˌdaʊnˈsterz | daʊnˈstɛɹz | ✅ |
| G5_0724 | upstairs | /upstairs/ | /ˌʌpˈsterz/ | ˌʌpˈsterz | ˌʌpˈstɛɹz | ✅ |
| G5_0725 | hometown | /hometown/ | /ˈhoʊmtaʊn/ | ˈhoʊmtaʊn | ˈhoʊmˌtaʊn | ✅ |
| G6_0726 | downtown | /downtown/ | /ˌdaʊnˈtaʊn/ | ˌdaʊnˈtaʊn | ˈdaʊ̯nˌtaʊ̯n |  |
| G4_0727 | fireman | /fireman/ | /ˈfaɪrmən/ | ˈfaɪrmən | ˈfaɪɹmən | ✅ |
| G4_0728 | policeman | /policeman/ | /pəˈliːsmən/ | pəˈliːsmən | pəˈliːsmən | ✅ |
| G5_0729 | spaceman | /spaceman/ | /ˈspeɪsmæn/ | ˈspeɪsmæn | ˈspeɪsˌmæn | ✅ |
| G5_0730 | spaceship | /spaceship/ | /ˈspeɪsʃɪp/ | ˈspeɪsʃɪp |  |  |
| G6_0731 | airmail | /airmail/ | /ˈermeɪl/ | ˈermeɪl | ˈɛəɹ(ˌ)meɪl |  |
| G6_0732 | airline | /airline/ | /ˈerlaɪn/ | ˈerlaɪn | ˈɛɹˌlaɪn | ✅ |
| G6_0733 | wheelchair | /wheelchair/ | /ˈwiːltʃer/ | ˈwiːltʃer | ˈ(h)wilt͡ʃɛɹ |  |
| G5_0734 | armchair | /armchair/ | /ˈɑːrmtʃer/ | ˈɑːrmtʃer | ˈɑɹmt͡ʃɛɚ |  |
| G5_0735 | tablecloth | /tablecloth/ | /ˈteɪbəlklɔːθ/ | ˈteɪbəlklɔːθ |  |  |
| G6_0736 | rainstorm | /rainstorm/ | /ˈreɪnstɔːrm/ | ˈreɪnstɔːrm | ˈɹeɪnstɔɹm | ✅ |
| G6_0737 | sandstorm | /sandstorm/ | /ˈsændstɔːrm/ | ˈsændstɔːrm |  |  |
| G4_0738 | earth | /earth/ | /ɜːrθ/ | ɜːrθ | ɝθ | ✅ |
| G6_0739 | earthquake | /earthquake/ | /ˈɜːrθkweɪk/ | ˈɜːrθkweɪk | ˈɝθkweɪk | ✅ |
| G4_0740 | key | /key/ | /kiː/ | kiː | ki | ✅ |
| G5_0741 | keyboard | /keyboard/ | /ˈkiːbɔːrd/ | ˈkiːbɔːrd | ˈki.bɔɹd | ✅ |
| G5_0742 | password | /password/ | /ˈpæswɜːrd/ | ˈpæswɜːrd | ˈpæs.wɜɹd | ✅ |
| G5_0743 | crosswalk | /crosswalk/ | /ˈkrɑːswɑːk/ | ˈkrɑːswɑːk |  |  |
| G5_0744 | sidewalk | /sidewalk/ | /ˈsaɪdwɔːk/ | ˈsaɪdwɔːk | ˈsaɪdwɔk | ✅ |
| G5_0745 | blackbird | /blackbird/ | /ˈblækbɜːrd/ | ˈblækbɜːrd | ˈblækˌbɚd |  |
| G4_0746 | goldfish | /goldfish/ | /ˈɡoʊldfɪʃ/ | ˈɡoʊldfɪʃ | ˈɡoʊldfɪʃ | ✅ |
| G5_0747 | starfish | /starfish/ | /ˈstɑːrfɪʃ/ | ˈstɑːrfɪʃ | ˈstɑː(ɹ)fɪʃ | ✅ |
| G3_0748 | blueberry | /blueberry/ | /ˈbluːberi/ | ˈbluːberi | ˈbluːb(ə)ɹi |  |
| G4_0749 | blackberry | /blackberry/ | /ˈblækberi/ | ˈblækberi | ˈblækbɛɹi | ✅ |
| G3_0750 | pineapple | /pineapple/ | /ˈpaɪnæpəl/ | ˈpaɪnæpəl | ˈpaɪnəpəl |  |
| G5_0751 | grapefruit | /grapefruit/ | /ˈɡreɪpfruːt/ | ˈɡreɪpfruːt | ˈɡɹeɪ̯pfɹut |  |
| G4_0752 | peanut | /peanut/ | /ˈpiːnʌt/ | ˈpiːnʌt | ˈpiˌnʌt | ✅ |
| G4_0753 | coconut | /coconut/ | /ˈkoʊkənʌt/ | ˈkoʊkənʌt | ˈkoʊ.kəˌnʌt | ✅ |
| G3_0754 | popcorn | /popcorn/ | /ˈpɑːpkɔːrn/ | ˈpɑːpkɔːrn | ˈpɑp.kɔɹn | ✅ |
| G3_0755 | hotdog | /hotdog/ | /ˈhɑːtdɔːɡ/ | ˈhɑːtdɔːɡ |  |  |
| G3_0756 | hamburger | /hamburger/ | /ˈhæmbərɡər/ | ˈhæmbərɡər | ˈhæmˌbɜɹ.ɡɚ |  |
| G4_0757 | dumpling | /dumpling/ | /ˈdʌmplɪŋ/ | ˈdʌmplɪŋ | ˈdʌmp.lɪŋ | ✅ |
| G4_0758 | duckling | /duckling/ | /ˈdʌklɪŋ/ | ˈdʌklɪŋ | ˈdʌklɪŋ | ✅ |
| G3_0759 | butterfly | /butterfly/ | /ˈbʌtərflaɪ/ | ˈbʌtərflaɪ | ˈbʌ.tə(ɹ).flaɪ | ✅ |
| G4_0760 | dragonfly | /dragonfly/ | /ˈdræɡənflaɪ/ | ˈdræɡənflaɪ | ˈdɹæɡənˌflaɪ | ✅ |
| G5_0761 | firefly | /firefly/ | /ˈfaɪərflaɪ/ | ˈfaɪərflaɪ | ˈfaɪ.ɚˌflaɪ | ✅ |
| G3_0762 | ladybug | /ladybug/ | /ˈleɪdibʌɡ/ | ˈleɪdibʌɡ | ˈleɪ.di.bʌɡ | ✅ |
| G5_0763 | grasshopper | /grasshopper/ | /ˈɡræshɑːpər/ | ˈɡræshɑːpər | ˈɡɹæsˌhɑpəɹ | ✅ |
| G5_0764 | woodpecker | /woodpecker/ | /ˈwʊdpekər/ | ˈwʊdpekər | ˈwʊdˌpɛkɚ | ✅ |
| G3_0765 | honeybee | /honeybee/ | /ˈhʌnibiː/ | ˈhʌnibiː |  |  |
| G4_0766 | polar bear | /polar bear/ | /ˈpoʊlər ber/ | ˈpoʊlər ber | ˈpoʊlɚ bɛɚ |  |
| G5_0767 | seahorse | /seahorse/ | /ˈsiːhɔːrs/ | ˈsiːhɔːrs |  |  |
| G5_0768 | earthworm | /earthworm/ | /ˈɜːrθwɜːrm/ | ˈɜːrθwɜːrm | ˈɜː(ɹ)θˌwɜː(ɹ)m | ✅ |
| G5_0769 | housewife | /housewife/ | /ˈhaʊswaɪf/ | ˈhaʊswaɪf | ˈhaʊs.waɪf | ✅ |
| G4_0770 | grandparents | /grandparents/ | /ˈɡrændperənts/ | ˈɡrændperənts |  |  |
| G4_0771 | parents | /parents/ | /ˈperənts/ | ˈperənts | ˈpɛɹ.ənts | ✅ |
| G5_0772 | grandson | /grandson/ | /ˈɡrændsʌn/ | ˈɡrændsʌn | ˈɡɹæn(d)sʌn | ✅ |
| G5_0773 | granddaughter | /granddaughter/ | /ˈɡrændɔːtər/ | ˈɡrændɔːtər |  |  |
| G6_0774 | gentleman | /gentleman/ | /ˈdʒentəlmən/ | ˈdʒentəlmən | ˈd͡ʒɛn.təl.mən |  |
| G5_0775 | grown-up | /grown-up/ | /ˈɡroʊnʌp/ | ˈɡroʊnʌp |  |  |
| G6_0776 | pen pal | /pen pal/ | /pen pæl/ | pen pæl | pɛn pæl | ✅ |
| G6_0777 | friendship | /friendship/ | /ˈfrendʃɪp/ | ˈfrendʃɪp | ˈfɹɛn(d)ʃɪp | ✅ |
| G6_0778 | neighbourhood | /neighbourhood/ | /ˈneɪbərhʊd/ | ˈneɪbərhʊd | ˈneɪbə.hʊd |  |
| G5_0779 | neighbour | /neighbour/ | /ˈneɪbər/ | ˈneɪbər | ˈneɪbɚ | ✅ |
| G6_0780 | musician | /musician/ | /mjuˈzɪʃən/ | mjuˈzɪʃən | mjuˈzɪʃən | ✅ |
| G2_0781 | music | /music/ | /ˈmjuːzɪk/ | ˈmjuːzɪk | ˈmju.zɪk | ✅ |
| G6_0782 | magician | /magician/ | /məˈdʒɪʃən/ | məˈdʒɪʃən | məˈd͡ʒɪʃən |  |
| G4_0783 | magic | /magic/ | /ˈmædʒɪk/ | ˈmædʒɪk | ˈmæd͡ʒɪk |  |
| G6_0784 | librarian | /librarian/ | /laɪˈbreriən/ | laɪˈbreriən | laɪˈbɹɛə̯ɹi.ən |  |
| G6_0785 | inventor | /inventor/ | /ɪnˈventər/ | ɪnˈventər | ɪnˈvɛntɚ | ✅ |
| G5_0786 | painter | /painter/ | /ˈpeɪntər/ | ˈpeɪntər | ˈpeɪntɚ | ✅ |
| G4_0787 | paint | /paint/ | /peɪnt/ | peɪnt | peɪnt | ✅ |
| G5_0788 | painting | /painting/ | /ˈpeɪntɪŋ/ | ˈpeɪntɪŋ | ˈpeɪn.tɪŋ | ✅ |
| G4_0789 | drawing | /drawing/ | /ˈdrɔːɪŋ/ | ˈdrɔːɪŋ | ˈdɹoː.ɹɪŋ |  |
| G3_0790 | draw | /draw/ | /drɔː/ | drɔː | dɹɑ |  |
| G5_0791 | gardener | /gardener/ | /ˈɡɑːrdənər/ | ˈɡɑːrdənər | ˈɡɑɹd.n̩.ɚ | ✅ |
| G5_0792 | baker | /baker/ | /ˈbeɪkər/ | ˈbeɪkər | ˈbeɪ.kɚ | ✅ |
| G5_0793 | bake | /bake/ | /beɪk/ | beɪk | beɪk | ✅ |
| G5_0794 | bakery | /bakery/ | /ˈbeɪkəri/ | ˈbeɪkəri | ˈbeɪ.kə.ɹi | ✅ |
| G5_0795 | waiter | /waiter/ | /ˈweɪtər/ | ˈweɪtər | ˈweɪ̯təː |  |
| G5_0797 | swimmer | /swimmer/ | /ˈswɪmər/ | ˈswɪmər | ˈswɪm.ɚ | ✅ |
| G5_0798 | runner | /runner/ | /ˈrʌnər/ | ˈrʌnər | ˈɹʌnɚ | ✅ |
| G6_0799 | climber | /climber/ | /ˈklaɪmər/ | ˈklaɪmər | ˈklaɪmɚ | ✅ |
| G4_0800 | climb | /climb/ | /klaɪm/ | klaɪm | ˈklaɪ̯m |  |
| G5_0801 | keeper | /keeper/ | /ˈkiːpər/ | ˈkiːpər | ˈkiː.pɚ | ✅ |
| G6_0803 | stranger | /stranger/ | /ˈstreɪndʒər/ | ˈstreɪndʒər | ˈstɹeɪnd͡ʒɚ |  |
| G5_0804 | strange | /strange/ | /streɪndʒ/ | streɪndʒ | stɹeɪnd͡ʒ |  |
| G6_0805 | foreigner | /foreigner/ | /ˈfɔːrənər/ | ˈfɔːrənər | ˈfɔɹ.ɪ.nɚ |  |
| G6_0806 | foreign | /foreign/ | /ˈfɔːrən/ | ˈfɔːrən | ˈfɔɹɪn |  |
| G6_0807 | villager | /villager/ | /ˈvɪlɪdʒər/ | ˈvɪlɪdʒər | ˈvɪlɪd͡ʒɚ |  |
| G6_0808 | leader | /leader/ | /ˈliːdər/ | ˈliːdər | ˈli.dɚ | ✅ |
| G6_0809 | lead | /lead/ | /liːd/ | liːd | lɛd |  |
| G5_0810 | foggy | /foggy/ | /ˈfɑːɡi/ | ˈfɑːɡi | ˈfɒɡi | ✅ |
| G5_0811 | fog | /fog/ | /fɑːɡ/ | fɑːɡ | fɔɡ |  |
| G5_0812 | stormy | /stormy/ | /ˈstɔːrmi/ | ˈstɔːrmi | ˈstɔɹmi | ✅ |
| G5_0813 | storm | /storm/ | /stɔːrm/ | stɔːrm | stoɹm |  |
| G5_0814 | icy | /icy/ | /ˈaɪsi/ | ˈaɪsi | ˈaɪsi | ✅ |
| G3_0815 | ice | /ice/ | /aɪs/ | aɪs | aɪs | ✅ |
| G2_0816 | ice cream | /ice cream/ | /aɪs kriːm/ | aɪs kriːm | aɪs kɹim | ✅ |
| G5_0817 | salty | /salty/ | /ˈsɔːlti/ | ˈsɔːlti | ˈsɔlti | ✅ |
| G4_0818 | salt | /salt/ | /sɔːlt/ | sɔːlt | sɒlt |  |
| G4_0819 | juicy | /juicy/ | /ˈdʒuːsi/ | ˈdʒuːsi | ˈd͡ʒuːsi |  |
| G4_0820 | tasty | /tasty/ | /ˈteɪsti/ | ˈteɪsti | ˈteɪsti | ✅ |
| G3_0821 | funny | /funny/ | /ˈfʌni/ | ˈfʌni | ˈfʌni | ✅ |
| G3_0822 | fun | /fun/ | /fʌn/ | fʌn | fʌn | ✅ |
| G5_0823 | messy | /messy/ | /ˈmesi/ | ˈmesi | ˈmɛsi | ✅ |
| G5_0824 | sandy | /sandy/ | /ˈsændi/ | ˈsændi | ˈsændi | ✅ |
| G6_0825 | rocky | /rocky/ | /ˈrɑːki/ | ˈrɑːki | ˈɹɑki | ✅ |
| G5_0826 | grassy | /grassy/ | /ˈɡræsi/ | ˈɡræsi | ˈɡɹæsi | ✅ |
| G6_0827 | woody | /woody/ | /ˈwʊdi/ | ˈwʊdi | ˈwʊdi | ✅ |
| G5_0828 | wooden | /wooden/ | /ˈwʊdən/ | ˈwʊdən | ˈwʊdn̩ | ✅ |
| G5_0829 | golden | /golden/ | /ˈɡoʊldən/ | ˈɡoʊldən | ˈɡoʊl.dən | ✅ |
| G6_0830 | woolen | /woolen/ | /ˈwʊlən/ | ˈwʊlən | ˈwʊlən | ✅ |
| G5_0831 | broken | /broken/ | /ˈbroʊkən/ | ˈbroʊkən | ˈbɹoʊ.kɪn |  |
| G6_0832 | fallen | /fallen/ | /ˈfɑːlən/ | ˈfɑːlən | ˈfɔlən |  |
| G5_0833 | carefully | /carefully/ | /ˈkerfəli/ | ˈkerfəli | ˈkɛɹ.f(ə.)li | ✅ |
| G5_0834 | politely | /politely/ | /pəˈlaɪtli/ | pəˈlaɪtli | pəˈlaɪtli | ✅ |
| G5_0835 | safely | /safely/ | /ˈseɪfli/ | ˈseɪfli | ˈseɪfli | ✅ |
| G6_0836 | warmly | /warmly/ | /ˈwɔːrmli/ | ˈwɔːrmli | ˈwɔɹmli | ✅ |
| G5_0837 | sadly | /sadly/ | /ˈsædli/ | ˈsædli | ˈsædli | ✅ |
| G6_0838 | angrily | /angrily/ | /ˈæŋɡrəli/ | ˈæŋɡrəli | ˈæŋ.ɡɹə.li | ✅ |
| G6_0839 | heavily | /heavily/ | /ˈhevəli/ | ˈhevəli | ˈhɛvɪli |  |
| G4_0840 | heavy | /heavy/ | /ˈhevi/ | ˈhevi | ˈhɛv.i | ✅ |
| G5_0841 | clearly | /clearly/ | /ˈklɪrli/ | ˈklɪrli | ˈklɪɚli |  |
| G4_0842 | clear | /clear/ | /klɪr/ | klɪr | ˈkliːə |  |
| G6_0843 | deeply | /deeply/ | /ˈdiːpli/ | ˈdiːpli | ˈdi(ː)pli | ✅ |
| G5_0844 | deep | /deep/ | /diːp/ | diːp | diːp | ✅ |
| G6_0845 | widely | /widely/ | /ˈwaɪdli/ | ˈwaɪdli | ˈwaɪdli | ✅ |
| G5_0846 | wide | /wide/ | /waɪd/ | waɪd | waɪd | ✅ |
| G6_0847 | truly | /truly/ | /ˈtruːli/ | ˈtruːli | ˈtɹuːli | ✅ |
| G6_0848 | luckily | /luckily/ | /ˈlʌkəli/ | ˈlʌkəli | ˈlʌk.ɪ.li |  |
| G6_0849 | peaceful | /peaceful/ | /ˈpiːsfəl/ | ˈpiːsfəl | ˈpiːsfl̩ | ✅ |
| G6_0850 | peace | /peace/ | /piːs/ | piːs | ˈpiːs | ✅ |
| G5_0851 | thankful | /thankful/ | /ˈθæŋkfəl/ | ˈθæŋkfəl | ˈθæŋkfəl | ✅ |
| G6_0853 | painful | /painful/ | /ˈpeɪnfəl/ | ˈpeɪnfəl | ˈpeɪn.fl̩ | ✅ |
| G6_0854 | forgetful | /forgetful/ | /fərˈɡetfəl/ | fərˈɡetfəl | fərˈɡɛtfəl | ✅ |
| G4_0855 | forget | /forget/ | /fərˈɡet/ | fərˈɡet | fɚˈɡɛt | ✅ |
| G6_0856 | happiness | /happiness/ | /ˈhæpinəs/ | ˈhæpinəs | ˈhæpinɪs |  |
| G6_0857 | sadness | /sadness/ | /ˈsædnəs/ | ˈsædnəs | ˈsædnəs | ✅ |
| G6_0858 | darkness | /darkness/ | /ˈdɑːrknəs/ | ˈdɑːrknəs | ˈdɑɹk.nɪs |  |
| G4_0859 | dark | /dark/ | /dɑːrk/ | dɑːrk | dɑːk |  |
| G6_0860 | weakness | /weakness/ | /ˈwiːknəs/ | ˈwiːknəs | ˈwik.nɪs |  |
| G5_0861 | weak | /weak/ | /wiːk/ | wiːk | wi(ː)k | ✅ |
| G6_0862 | competition | /competition/ | /ˌkɑːmpəˈtɪʃən/ | ˌkɑːmpəˈtɪʃən | ˌkɑm.pəˈtɪʃ.ən | ✅ |
| G6_0863 | invitation | /invitation/ | /ˌɪnvɪˈteɪʃən/ | ˌɪnvɪˈteɪʃən | ɪnvɪˈteɪʃən | ✅ |
| G5_0864 | invite | /invite/ | /ɪnˈvaɪt/ | ɪnˈvaɪt | ɪnˈvaɪt | ✅ |
| G6_0865 | education | /education/ | /ˌedʒuˈkeɪʃn/ | ˌedʒuˈkeɪʃn | ˌɛd͡ʒ.əˈkeɪ.ʃən |  |
| G6_0866 | pollution | /pollution/ | /pəˈluːʃən/ | pəˈluːʃən | pəˈluʃən | ✅ |
| G6_0867 | protection | /protection/ | /prəˈtekʃən/ | prəˈtekʃən | pɹəˈtɛkʃn̩ | ✅ |
| G5_0868 | protect | /protect/ | /prəˈtekt/ | prəˈtekt | pɹəˈtɛkt | ✅ |
| G6_0869 | excitement | /excitement/ | /ɪkˈsaɪtmənt/ | ɪkˈsaɪtmənt | ɪkˈsaɪtmənt | ✅ |
| G6_0870 | movement | /movement/ | /ˈmuːvmənt/ | ˈmuːvmənt | ˈmuːv.mənt | ✅ |
| G6_0871 | agreement | /agreement/ | /əˈɡriːmənt/ | əˈɡriːmənt | əˈɡɹiːmənt | ✅ |
| G5_0872 | agree | /agree/ | /əˈɡriː/ | əˈɡriː | əˈɡɹi | ✅ |
| G6_0873 | disagree | /disagree/ | /ˌdɪsəˈɡriː/ | ˌdɪsəˈɡriː | dɪsəˈɡɹi | ✅ |
| G5_0874 | comfortable | /comfortable/ | /ˈkʌmfərtəbəl/ | ˈkʌmfərtəbəl | ˈkʌm(p)f.tə.bəl |  |
| G6_0875 | enjoyable | /enjoyable/ | /ɪnˈdʒɔɪəbəl/ | ɪnˈdʒɔɪəbəl | ɛnˈd͡ʒɔɪ.ə.bl̩ |  |
| G4_0876 | enjoy | /enjoy/ | /ɪnˈdʒɔɪ/ | ɪnˈdʒɔɪ | ɛnˈd͡ʒɔɪ |  |
| G5_0877 | joy | /joy/ | /dʒɔɪ/ | dʒɔɪ | d͡ʒɔɪ |  |
| G6_0878 | valuable | /valuable/ | /ˈvæljəbəl/ | ˈvæljəbəl | ˈvælju(ə)bl̩ |  |
| G6_0879 | runner-up | /runner-up/ | /ˈrʌnərʌp/ | ˈrʌnərʌp | ˌɹʌn.ɚˈʌp | ✅ |
| G5_0880 | goalkeeper | /goalkeeper/ | /ˈɡoʊlkiːpər/ | ˈɡoʊlkiːpər | ˈɡoʊl.kiːpɚ | ✅ |
| G5_0881 | zookeeper | /zookeeper/ | /ˈzuːkiːpər/ | ˈzuːkiːpər | ˈzuːkipɚ | ✅ |
| G5_0882 | shopkeeper | /shopkeeper/ | /ˈʃɑːpkiːpər/ | ˈʃɑːpkiːpər | ˈʃɑpkiːpɚ | ✅ |
| G5_0883 | firefighter | /firefighter/ | /ˈfaɪrfaɪtər/ | ˈfaɪrfaɪtər | ˈfaɪ.ɚˌfaɪ.tɚ |  |
| G5_0884 | policewoman | /policewoman/ | /pəˈliːswʊmən/ | pəˈliːswʊmən |  |  |
| G5_0885 | moonlight | /moonlight/ | /ˈmuːnlaɪt/ | ˈmuːnlaɪt | ˈmuːnlaɪt | ✅ |
| G5_0886 | starlight | /starlight/ | /ˈstɑːrlaɪt/ | ˈstɑːrlaɪt | ˈstɑː(ɹ)laɪt | ✅ |
| G5_0887 | candlelight | /candlelight/ | /ˈkændəllaɪt/ | ˈkændəllaɪt | ˈkæn.dl̩ˌlaɪt | ✅ |
| G5_0888 | flashlight | /flashlight/ | /ˈflæʃlaɪt/ | ˈflæʃlaɪt | ˈflæʃˌlaɪt | ✅ |
| G5_0889 | daylight | /daylight/ | /ˈdeɪlaɪt/ | ˈdeɪlaɪt | ˈdeɪˌlaɪt | ✅ |
| G6_0890 | highlight | /highlight/ | /ˈhaɪlaɪt/ | ˈhaɪlaɪt | ˈhaɪˌlaɪt | ✅ |
| G5_0891 | midnight | /midnight/ | /ˈmɪdnaɪt/ | ˈmɪdnaɪt | ˈmɪd(ˌ)naɪt | ✅ |
| G5_0892 | midday | /midday/ | /ˈmɪddeɪ/ | ˈmɪddeɪ | mɪdˈdeɪ | ✅ |
| G2_0893 | afternoon | /afternoon/ | /ˌæftərˈnuːn/ | ˌæftərˈnuːn | ˌæf.tɚˈnun | ✅ |
| G6_0894 | overnight | /overnight/ | /ˌoʊvərˈnaɪt/ | ˌoʊvərˈnaɪt | əʊvə(ɹ)ˈnaɪt |  |
| G5_0895 | overcoat | /overcoat/ | /ˈoʊvərkoʊt/ | ˈoʊvərkoʊt | ˈoʊvɚkoʊt | ✅ |
| G6_0896 | overweight | /overweight/ | /ˌoʊvərˈweɪt/ | ˌoʊvərˈweɪt | ˌəʊvəˈweɪt |  |
| G6_0897 | weight | /weight/ | /weɪt/ | weɪt | weɪt | ✅ |
| G6_0898 | height | /height/ | /haɪt/ | haɪt | haɪt | ✅ |
| G6_0899 | length | /length/ | /leŋkθ/ | leŋkθ | lɛŋ(k)θ | ✅ |
| G6_0900 | strength | /strength/ | /streŋkθ/ | streŋkθ | stɹɛŋ(k)θ | ✅ |
| G6_0901 | warmth | /warmth/ | /wɔːrmθ/ | wɔːrmθ | wɔɹmθ | ✅ |
| G6_0902 | truth | /truth/ | /truːθ/ | truːθ | tɹuθ | ✅ |
| G6_0903 | growth | /growth/ | /ɡroʊθ/ | ɡroʊθ | ɡɹoʊθ | ✅ |
| G6_0904 | width | /width/ | /wɪdθ/ | wɪdθ | ˈwɪtθ |  |
| G6_0905 | depth | /depth/ | /depθ/ | depθ | dɛpθ | ✅ |
| G5_0906 | birth | /birth/ | /bɜːrθ/ | bɜːrθ | beːθ |  |
| G6_0907 | birthplace | /birthplace/ | /ˈbɜːrθpleɪs/ | ˈbɜːrθpleɪs | ˈbɝθˌpleɪs | ✅ |
| G3_0908 | airplane | /airplane/ | /ˈerpleɪn/ | ˈerpleɪn | ˈɛɹˌpleɪ̯n |  |
| G6_0909 | aircraft | /aircraft/ | /ˈerkræft/ | ˈerkræft | ˈɛɹ.kɹæft | ✅ |
| G6_0910 | spacecraft | /spacecraft/ | /ˈspeɪskræft/ | ˈspeɪskræft | ˈspeɪsˌkɹæft | ✅ |
| G5_0911 | handcraft | /handcraft/ | /ˈhændkræft/ | ˈhændkræft | ˈhændˌkɹæft | ✅ |
| G6_0912 | fairground | /fairground/ | /ˈferɡraʊnd/ | ˈferɡraʊnd | ˈfɛə(ɹ)ɡɹaʊnd |  |
| G6_0913 | background | /background/ | /ˈbækɡraʊnd/ | ˈbækɡraʊnd | ˈbæk.(ɡ)ɹaʊnd | ✅ |
| G5_0914 | campfire | /campfire/ | /ˈkæmpfaɪər/ | ˈkæmpfaɪər | ˈkæmpˌfaɪ̯ɚ |  |
| G4_0915 | firework | /firework/ | /ˈfaɪrwɜːrk/ | ˈfaɪrwɜːrk | ˈfaɪɚˌwɚk |  |
| G5_0916 | fireplace | /fireplace/ | /ˈfaɪərpleɪs/ | ˈfaɪərpleɪs | ˈfaɪɹpleɪs |  |
| G5_0917 | toothpick | /toothpick/ | /ˈtuːθpɪk/ | ˈtuːθpɪk | ˈtuːθ.pɪk | ✅ |
| G4_0918 | chopstick | /chopstick/ | /ˈtʃɑːpstɪk/ | ˈtʃɑːpstɪk | ˈt͡ʃɑp.stɪk |  |
| G5_0919 | walking stick | /walking stick/ | /ˈwɔːkɪŋ stɪk/ | ˈwɔːkɪŋ stɪk | ˈwɔːkɪŋ stɪk | ✅ |
| G6_0920 | candlestick | /candlestick/ | /ˈkændəlstɪk/ | ˈkændəlstɪk | ˈkændəlˌstɪk | ✅ |
| G6_0921 | lipstick | /lipstick/ | /ˈlɪpstɪk/ | ˈlɪpstɪk | ˈlɪpˌstɪk | ✅ |
| G5_0922 | eyebrow | /eyebrow/ | /ˈaɪbraʊ/ | ˈaɪbraʊ | ˈaɪˌbɹaʊ | ✅ |
| G5_0923 | eyelash | /eyelash/ | /ˈaɪlæʃ/ | ˈaɪlæʃ | ˈaɪlæʃ | ✅ |
| G5_0924 | eyeglass | /eyeglass/ | /ˈaɪɡlæs/ | ˈaɪɡlæs | ˈaɪˌɡlæs | ✅ |
| G5_0925 | eyesight | /eyesight/ | /ˈaɪsaɪt/ | ˈaɪsaɪt | ˈaɪˌsaɪt | ✅ |
| G6_0926 | daydream | /daydream/ | /ˈdeɪdriːm/ | ˈdeɪdriːm | ˈdeɪdɹiːm | ✅ |
| G5_0927 | dream | /dream/ | /driːm/ | driːm | dɹim | ✅ |
| G1_0932 | door | /door/ | /dɔːr/ | dɔːr | do(ː)ɹ |  |
| G3_0933 | floor | /floor/ | /flɔːr/ | flɔːr | flɔː |  |
| G3_0934 | wall | /wall/ | /wɔːl/ | wɔːl | wɔːl | ✅ |
| G4_0935 | lamp | /lamp/ | /læmp/ | læmp | ˈlæ̝mp |  |
| G2_0936 | cup | /cup/ | /kʌp/ | kʌp | ˈkʌp | ✅ |
| G3_0937 | bowl | /bowl/ | /boʊl/ | boʊl | boʊl | ✅ |
| G3_0938 | plate | /plate/ | /pleɪt/ | pleɪt | ˈpleɪ̯t |  |
| G4_0939 | knife | /knife/ | /naɪf/ | naɪf | ˈnaɪ̯f |  |
| G3_0940 | soup | /soup/ | /suːp/ | suːp | suːp | ✅ |
| G4_0941 | beef | /beef/ | /biːf/ | biːf | bif | ✅ |
| G4_0942 | pork | /pork/ | /pɔːrk/ | pɔːrk | poɹk |  |
| G3_0943 | meat | /meat/ | /miːt/ | miːt | mit | ✅ |
| G2_0944 | tea | /tea/ | /tiː/ | tiː | tiː | ✅ |
| G4_0945 | coffee | /coffee/ | /ˈkɔːfi/ | ˈkɔːfi | ˈkɒfi |  |
| G2_0946 | peach | /peach/ | /piːtʃ/ | piːtʃ | ˈpiːt͡ʃ |  |
| G3_0947 | lemon | /lemon/ | /ˈlemən/ | ˈlemən | ˈlɛmən | ✅ |
| G4_0948 | mango | /mango/ | /ˈmæŋɡoʊ/ | ˈmæŋɡoʊ | ˈmæŋɡəʊ |  |
| G4_0949 | cherry | /cherry/ | /ˈtʃeri/ | ˈtʃeri | ˈt͡ʃɛɹi |  |
| G2_0950 | lion | /lion/ | /ˈlaɪən/ | ˈlaɪən | ˈlaɪən | ✅ |
| G3_0951 | zebra | /zebra/ | /ˈziːbrə/ | ˈziːbrə | ˈzɛb.ɹə |  |
| G4_0953 | koala | /koala/ | /koʊˈɑːlə/ | koʊˈɑːlə | koʊˈɑː.lə | ✅ |
| G5_0954 | whale | /whale/ | /weɪl/ | weɪl | ˈweɪl | ✅ |
| G5_0955 | shark | /shark/ | /ʃɑːrk/ | ʃɑːrk | ʃɑɹk | ✅ |
| G5_0956 | dolphin | /dolphin/ | /ˈdɑːlfən/ | ˈdɑːlfən | ˈdɑlf.ɪn |  |
| G3_0957 | snake | /snake/ | /sneɪk/ | sneɪk | sneɪk | ✅ |
| G3_0958 | frog | /frog/ | /frɑːɡ/ | frɑːɡ | fɹɒɡ | ✅ |
| G2_0959 | bee | /bee/ | /biː/ | biː | ˈbiː | ✅ |
| G2_0960 | ant | /ant/ | /ænt/ | ænt | ænt | ✅ |
| G4_0961 | deer | /deer/ | /dɪr/ | dɪr | dɪɹ | ✅ |
| G3_0962 | fox | /fox/ | /fɑːks/ | fɑːks | fɑks | ✅ |
| G5_0963 | wolf | /wolf/ | /wʊlf/ | wʊlf | wʊlf | ✅ |
| G4_0965 | goat | /goat/ | /ɡoʊt/ | ɡoʊt | ɡoʊt | ✅ |
| G2_0966 | hat | /hat/ | /hæt/ | hæt | hæt | ✅ |
| G3_0967 | dress | /dress/ | /dres/ | dres | dɹes | ✅ |
| G4_0968 | pants | /pants/ | /pænts/ | pænts | pænts | ✅ |
| G4_0969 | trousers | /trousers/ | /ˈtraʊzərz/ | ˈtraʊzərz | ˈtɹaʊzɚz | ✅ |
| G4_0971 | boots | /boots/ | /buːts/ | buːts | buts | ✅ |
| G3_0972 | taxi | /taxi/ | /ˈtæksi/ | ˈtæksi | ˈtæksi | ✅ |
| G2_0973 | bike | /bike/ | /baɪk/ | baɪk | bɐɪk |  |
| G4_0974 | truck | /truck/ | /trʌk/ | trʌk | tɹʌk | ✅ |
| G3_0975 | sea | /sea/ | /siː/ | siː | siː | ✅ |
| G4_0976 | beach | /beach/ | /biːtʃ/ | biːtʃ | biːt͡ʃ |  |
| G4_0977 | sand | /sand/ | /sænd/ | sænd | sænd | ✅ |
| G4_0978 | rock | /rock/ | /rɑːk/ | rɑːk | ɹɒk | ✅ |
| G4_0979 | stone | /stone/ | /stoʊn/ | stoʊn | stoʊ̯n |  |
| G2_0980 | sky | /sky/ | /skaɪ/ | skaɪ | skaɪ | ✅ |
| G4_0981 | air | /air/ | /er/ | er | eə̯ |  |
| G3_0982 | fire | /fire/ | /ˈfaɪər/ | ˈfaɪər | ˈfaɪ.ə |  |
| G4_0985 | city | /city/ | /ˈsɪti/ | ˈsɪti | ˈsɪt.i/ [ˈsɪɾ.i] |  |
| G5_0987 | bank | /bank/ | /bæŋk/ | bæŋk | ˈbæŋk | ✅ |
| G5_0988 | club | /club/ | /klʌb/ | klʌb | klʌb | ✅ |
| G4_0989 | team | /team/ | /tiːm/ | tiːm | ˈtiːm | ✅ |
| G2_0990 | game | /game/ | /ɡeɪm/ | ɡeɪm | ɡeɪm | ✅ |
| G4_0991 | race | /race/ | /reɪs/ | reɪs | ɹeɪs | ✅ |
| G5_0992 | prize | /prize/ | /praɪz/ | praɪz | ˈpɹaɪ̯z |  |
| G4_0993 | present | /present/ | /ˈpreznt/ | ˈpreznt | pɹɪˈzɛnt |  |
| G1_0994 | box | /box/ | /bɑːks/ | bɑːks | bɒks | ✅ |
| G3_0996 | bell | /bell/ | /bel/ | bel | bɛl | ✅ |
| G4_0997 | flag | /flag/ | /flæɡ/ | flæɡ | fleɪ̯ɡ |  |
| G3_0998 | king | /king/ | /kɪŋ/ | kɪŋ | ˈkiŋ |  |
| G3_0999 | queen | /queen/ | /kwiːn/ | kwiːn | kwiːn | ✅ |
