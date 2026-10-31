# 决策 35 A2 第 1 批 · 课标二级缺词补词条（60 词）

- 收词来源：《义务教育英语课程标准（2022 年版）》附录 3 二级词汇表（教育部原件 http://www.moe.gov.cn/srcsite/A26/s8001/202204/W020220420582349487953.pdf ；清单 `kebiao2.json` 500 词，数词 / 月份 / 星期在课标里另列，未参与比对）。补完后 `src/kebiaocheck.py` 逐词能在 VOCAB_DB 找到（词头按「 / 」拆分）。
- 音标：CMUdict 与 Wiktionary 逐词对照（缓存 /workspace/work/etym/wikt_ipa/，不入库），美式口径同 A1；功能词强读 + 弱读都列。下表「CMUdict」列是 CMUdict 前两个读音原样转写。
- 年级：**暂定**（人教社区词表有的取其年级，没有的放 G3），A5 统一重排；id 用 `G<年级>_K<序号>`，新增字段 `kebiao_level: 二级`、`added_by: 35-A2`。
- 释义、例句（补写，只用课标词）、语法提示由本道按常用词典义项撰写；词源 / 构词 / 搭配不编，留空——词卡会显示 ETYM_DB 里已有的可核实词源（若有）；搭配在 A4 补。
- 8 个功能词（a / an、the、be、can、will、must、should、not）走功能词卡（不播单词卡动画），挂对应语法点。

| id | 词 | 音标 | CMUdict | 词性 | 释义 | 主题 | 功能词 | 例句（补写） |
|---|---|---|---|---|---|---|---|---|
| G1_K01 | a / an | /ə/ /eɪ/ /ən/ /æn/ | /ə/ /eɪ/ /æn/ /ən/ | art. | 一（个）（不定冠词） | 人与自我 · 语法功能与指代 | 功能词 G05 | I have an apple and a banana. |
| G1_K02 | the | /ðə/ /ði/ | /ðə/ /ðʌ/ | art. | 这（个），那（个）（定冠词，特指） | 人与自我 · 语法功能与指代 | 功能词 G06 | Please open the door. |
| G3_K01 | be / am / is / are | /biː/ /æm/ /ɪz/ /ɑːr/ | /biː/ /bi/ /æm/ /ˌeɪˈem/ /ɪz/ /ɪz/ /ɑːr/ /ər/ | v. | 是（原形 be；现在时 am / is / are） | 人与自我 · 语法功能与指代 | 功能词 G16 | I am a student. She is my sister. |
| G1_K03 | can | /kæn/ /kən/ | /kæn/ /kən/ | modal v. | 能，会；可以 | 人与自我 · 语法功能与指代 | 功能词 G26 | I can swim. Can you swim? |
| G3_K02 | will | /wɪl/ | /wɪl/ /wəl/ | modal v. | 将，会（表示将来） | 人与自我 · 语法功能与指代 | 功能词 G25 | It will be sunny tomorrow. |
| G3_K03 | must | /mʌst/ | /mʌst/ | modal v. | 必须 | 人与自我 · 语法功能与指代 | 功能词 G27 | You must wash your hands before dinner. |
| G3_K04 | should | /ʃʊd/ | /ʃʊd/ | modal v. | 应该 | 人与自我 · 语法功能与指代 | 功能词 G27 | You should go to bed early. |
| G3_K05 | not | /nɑːt/ | /nɑːt/ | adv. | 不，没有 | 人与自我 · 语法功能与指代 | 功能词 G29 | I am not hungry. |
| G1_K04 | no | /noʊ/ | /noʊ/ | adv./det. | 不，不是；没有 | 人与社会 · 交际与礼仪 |  | Is this your pen? No, it isn't. |
| G1_K05 | yes | /jes/ | /jes/ | adv. | 是，是的 | 人与社会 · 交际与礼仪 |  | Are you ready? Yes, I am. |
| G4_K01 | please | /pliːz/ | /pliːz/ | adv. | 请 | 人与社会 · 交际与礼仪 |  | Please sit down. |
| G3_K06 | OK | /ˌoʊˈkeɪ/ | /ˌoʊˈkeɪ/ | adj./adv. | 好的，可以；不错 | 人与社会 · 交际与礼仪 |  | Let's go to the park. OK! |
| G3_K07 | hi | /haɪ/ | /haɪ/ | interj. | 嗨，你好 | 人与社会 · 交际与礼仪 |  | Hi, I'm Amy. |
| G3_K08 | good | /ɡʊd/ | /ɡʊd/ /ɡɪd/ | adj. | 好的；擅长的 | 人与自我 · 个人特征与情绪 |  | This is a good book. |
| G3_K09 | bad | /bæd/ | /bæd/ | adj. | 坏的；糟糕的 | 人与自我 · 个人特征与情绪 |  | The weather is bad today. |
| G5_K01 | nice | /naɪs/ | /naɪs/ /niːs/ | adj. | 美好的；友好的 | 人与自我 · 个人特征与情绪 |  | Nice to meet you. |
| G4_K02 | great | /ɡreɪt/ | /ɡreɪt/ | adj. | 极好的；伟大的 | 人与自我 · 个人特征与情绪 |  | That's a great idea! |
| G2_K01 | name | /neɪm/ | /neɪm/ | n. | 名字 | 人与社会 · 交际与礼仪 |  | What's your name? My name is Tom. |
| G3_K10 | age | /eɪdʒ/ | /eɪdʒ/ | n. | 年龄 | 人与自我 · 个人特征与情绪 |  | They are the same age. |
| G4_K03 | money | /ˈmʌni/ | /ˈmʌni/ | n. | 钱 | 人与社会 · 数字与计量 |  | I don't have much money. |
| G4_K04 | busy | /ˈbɪzi/ | /ˈbɪzi/ | adj. | 忙碌的 | 人与自我 · 个人特征与情绪 |  | My mother is very busy today. |
| G4_K05 | late | /leɪt/ | /leɪt/ | adj./adv. | 迟的，晚的；晚地 | 人与社会 · 节日与时间 |  | Don't be late for school. |
| G5_K02 | early | /ˈɜːrli/ | /ˈɜːrli/ | adj./adv. | 早的；早地 | 人与社会 · 节日与时间 |  | I get up early every day. |
| G4_K06 | free | /friː/ | /friː/ | adj. | 空闲的；免费的 | 人与自我 · 个人特征与情绪 |  | Are you free on Sunday? |
| G4_K07 | cute | /kjuːt/ | /kjuːt/ | adj. | 可爱的 | 人与自我 · 个人特征与情绪 |  | The little cat is so cute. |
| G3_K11 | sit | /sɪt/ | /sɪt/ | v. | 坐 | 人与自我 · 日常作息与动作 |  | Sit down, please. |
| G3_K12 | stand | /stænd/ | /stænd/ | v. | 站，站立 | 人与自我 · 日常作息与动作 |  | Stand up, please. |
| G5_K03 | call | /kɔːl/ | /kɔːl/ | v. | 打电话；叫，称呼 | 人与自我 · 日常作息与动作 |  | I will call you tonight. |
| G3_K13 | let | /let/ | /let/ | v. | 让 | 人与自我 · 日常作息与动作 |  | Let's play football. |
| G3_K14 | hurry | /ˈhɜːri/ | /ˈhɜːri/ | v. | 赶快，快点 | 人与自我 · 日常作息与动作 |  | Hurry up! The bus is coming. |
| G3_K15 | wrong | /rɔːŋ/ | /rɔːŋ/ | adj. | 错误的；有毛病的 | 人与自我 · 个人特征与情绪 |  | This answer is wrong. |
| G3_K16 | welcome | /ˈwelkəm/ | /ˈwelkəm/ | adj./v./interj. | 欢迎；不用谢 | 人与社会 · 交际与礼仪 |  | Welcome to our school! |
| G1_K06 | sure | /ʃʊr/ | /ʃʊr/ | adj./adv. | 当然；确信的 | 人与社会 · 交际与礼仪 |  | Can I use your pen? Sure. |
| G3_K17 | next | /nekst/ | /nekst/ /neks/ | adj./adv. | 下一个的；紧挨着的 | 人与自然 · 色彩与空间方位 |  | See you next week. |
| G3_K18 | middle | /ˈmɪdəl/ | /ˈmɪdəl/ | n. | 中间 | 人与自然 · 色彩与空间方位 |  | I sit in the middle. |
| G6_K01 | top | /tɑːp/ | /tɑːp/ /tɔːp/ | n. | 顶部 | 人与自然 · 色彩与空间方位 |  | The bird is at the top of the tree. |
| G3_K19 | up | /ʌp/ | /ʌp/ | adv./prep. | 向上 | 人与自然 · 色彩与空间方位 |  | Stand up and look up! |
| G3_K20 | down | /daʊn/ | /daʊn/ | adv./prep. | 向下 | 人与自然 · 色彩与空间方位 |  | Put your book down. |
| G3_K21 | out | /aʊt/ | /aʊt/ | adv. | 向外，出去 | 人与自然 · 色彩与空间方位 |  | Let's go out and play. |
| G3_K22 | front | /frʌnt/ | /frʌnt/ | n. | 前面 | 人与自然 · 色彩与空间方位 |  | There is a tree in front of my house. |
| G3_K23 | now | /naʊ/ | /naʊ/ | adv. | 现在 | 人与社会 · 节日与时间 |  | What are you doing now? |
| G3_K24 | again | /əˈɡen/ | /əˈɡen/ /əˈɡeɪn/ | adv. | 再，又 | 人与社会 · 节日与时间 |  | Please say it again. |
| G3_K25 | ago | /əˈɡoʊ/ | /əˈɡoʊ/ | adv. | 以前 | 人与社会 · 节日与时间 |  | I saw him two days ago. |
| G3_K26 | last | /læst/ | /læst/ /læs/ | adj. | 上一个的；最后的 | 人与社会 · 节日与时间 |  | I went to Beijing last summer. |
| G3_K27 | well | /wel/ | /wel/ | adv./adj. | 好地；健康的 | 人与自我 · 身体与健康 |  | She sings very well. |
| G3_K28 | lot | /lɑːt/ | /lɑːt/ /lɔːt/ | n. | 许多（a lot / a lot of） | 人与社会 · 数字与计量 |  | There are a lot of books in the library. |
| G3_K29 | dear | /dɪr/ | /dɪr/ | adj. | 亲爱的 | 人与社会 · 交际与礼仪 |  | Dear Tom, how are you? |
| G3_K30 | candle | /ˈkændəl/ | /ˈkændəl/ | n. | 蜡烛 | 人与自我 · 居家与生活 |  | There are ten candles on the cake. |
| G5_K04 | chore | /tʃɔːr/ | /tʃɔːr/ | n. | 家务活 | 人与自我 · 居家与生活 |  | I do some chores at home every day. |
| G3_K31 | email | /ˈiːmeɪl/ | /iˈmeɪl/ | n./v. | 电子邮件；发电子邮件 | 人与社会 · 交际与礼仪 |  | I write an email to my friend. |
| G3_K32 | TV | /ˌtiːˈviː/ | /ˌtiːˈviː/ /ˌteləˈvɪʒən/ | n. | 电视 | 人与自我 · 居家与生活 |  | I watch TV after dinner. |
| G2_K02 | favourite | /ˈfeɪvərɪt/ | /ˈfeɪvərɪt/ | adj./n. | 最喜欢的 | 人与自我 · 个人特征与情绪 |  | My favourite colour is blue. |
| G3_K33 | Mr | /ˈmɪstər/ | /ˈmɪstər/ | n. | 先生（用在男子的姓前） | 人与社会 · 交际与礼仪 |  | Mr Li is our English teacher. |
| G3_K34 | Mrs | /ˈmɪsɪz/ | /ˈmɪsɪz/ | n. | 太太，夫人（用在姓前） | 人与社会 · 交际与礼仪 |  | Mrs Wang is at home. |
| G3_K35 | Ms | /mɪz/ | /mɪz/ | n. | 女士（对女子的通用称呼） | 人与社会 · 交际与礼仪 |  | Ms White is a doctor. |
| G3_K36 | Miss | /mɪs/ | /mɪs/ | n. | 小姐；（学生称呼女老师）老师 | 人与社会 · 交际与礼仪 |  | Good morning, Miss Li! |
| G3_K37 | hard | /hɑːrd/ | /hɑːrd/ | adj./adv. | 困难的；努力地 | 人与自我 · 个人特征与情绪 |  | This question is hard. |
| G3_K38 | police | /pəˈliːs/ | /pəˈliːs/ | n. | 警察（总称） | 人与社会 · 职业与社会 |  | The police are helping the old man. |
| G4_K08 | China | /ˈtʃaɪnə/ | /ˈtʃaɪnə/ | n. | 中国 | 人与社会 · 城市与场所 |  | I am from China. |
| G3_K39 | cream | /kriːm/ | /kriːm/ | n. | 奶油 | 人与自我 · 食物与饮品 |  | There is cream on the cake. |
