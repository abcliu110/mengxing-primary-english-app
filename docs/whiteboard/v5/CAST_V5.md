# v5 人物先行：全量角色帧库（决策 32 补充，用户 2026-10-30 11:28「把老的白板动画重画人物放到最前面先做」）

> 顺序调整：**先把所有老白板动画里的人物 / 动作全部重画成 v5.1 AI 绿幕关键帧**（本表），再逐幕重画白板版面（`../REDRAW_V5.md`）。
> 每张联排图 6 个姿势，同一演员表、同一画风（参考图 `kf/sheet1.png` 男孩 + 妈妈、`kf/tm2b.png` Mia），绿幕 #00FF00。
> 切帧：`python3 sprites/split_sheet.py <联排图> 帧名…`（按阅读顺序；`-` 丢弃）→ `sprites/src/<帧名>.png`（不进仓库）；
> 打库：`python3 sprites/build_sprites.py <库名> 帧名…` → `sprites/<库名>.js`。
> 联排原图存 `/workspace/work/kf/`（不进仓库），本表登记帧名、出处联排图和用在哪一幕。

## 演员表（全 App 统一）
| 演员 | 外形 |
|---|---|
| Leo（男孩，`l_` 前缀） | 短乱发、白短袖衬衫、橙色红领巾、灰短裤、小书包、白球鞋 |
| Mia（女孩，`m_`） | 浅棕齐耳短发、白衬衫、橙色红领巾、米色百褶裙 |
| 妈妈 `mom_` / 爸爸 / 爷爷奶奶 `grand` / 王老师 `wang` / White 老师 `missw_` | 同画风，橙色只做点缀 |
| 动物 / 交通工具 | 小狗、小鸟、小鸭、鸡、蛇、公交车、火车、飞机、风筝 |

## 帧库登记

| 联排图 | 帧（阅读顺序） | 动作 / 用途 | 状态 |
|---|---|---|---|
| `kf/sheet1–3`（已有） | kick0–2、mom_teach1/2、mom_car、bird_up/down、milk、tea_no、juice_q、g_w0–3、g_ready | tense_matrix ① | ✅ 库 `tm1` |
| `kf/tm2a.png` | l_r0–l_r3（Leo 跑步 4 帧）、l_jc（下蹲蓄力）、l_ja（跳到空中） | is running / is jumping | ✅ 已切 |
| `kf/tm2b.png` | m_d1 / m_d2（跳舞两帧）、m_cake（搅面糊做蛋糕）、m_read（坐着读故事书）、m_like（抱着爱心）、m_dog（牵小狗） | is dancing / making a cake / reading；like / have | ✅ 已切 |
| `kf/tm3a.png` | sw0–sw3（游泳 4 帧）、cam（Leo 拍照）、m_study（伏案学习）、m_cry（丢笔哭了）、bus（公交车） | swimming / took photos / studied / cried / bus stopped | ✅ 已切 |
| `kf/tm3b.png` | party（三个孩子聚会欢呼）、l_no（摇头摆手「没去」）、l_key（摸空口袋找钥匙）、m_hw（举起写完的作业）、l_kite（边跑边放风筝）、picnic（一家野餐） | were happy / didn't go / lost my key / finished homework / fly a kite / have a picnic | ✅ 已切（kite / picnic 手工分割） |
| `kf/tm4a.png` | l_w0–l_w3（Leo 提礼物走路 4 帧）、grand（爷爷奶奶挥手）、wang（王老师拖行李箱离开） | visit grandparents / has gone to Shanghai / went | ✅ 已切 |
| `kf/L1.png` | l_put、l_drink、m_sit、l_sleep、meet、train | past_clans（put / drank / sat / slept / met / train left） | ✅ |
| `kf/L2.png` | mom_dress、l_puppy、missw（White 老师讲课）、l_catch、l_think、l_back | bought / brought / taught / caught / thought / came back | ✅ |
| `kf/L3.png` | m_photo、l_speak、l_read、m_tv、plane、ducks | aux_transformer（taking photos / speak / reading / watches TV / flew）、bamboo_tree（ducks swimming） | ✅ |
| `kf/L4.png` | baby、l_point、m_smell、plant、mom_gift、l_pen | five_patterns（babies sleep / look at the blackboard / smells / planted / gave me a gift / gave me a pen） | ✅ |
| `kf/L5.png` | m_pass、m_aloud、l_laugh、l_ex0 / l_ex1 / l_ex2（早操）、l_ear | pass the book / read aloud / make him laugh / morning exercises / listen | ✅（l_ex 手工切） |
| `kf/L6.png` | chick0–3、m_door、l_dive、snake、flag、slide | two chickens running / open the door / catch the cup / snake swims / flag flies / go down the slide | ✅ |
| `kf/L7.png` | l_sit、l_stand、l_lookup、l_goout、l_wave、m_story | sit down / stand up / look up / go out / come back / make up a story | ✅ |
| `kf/L8.png` | l_coat1–3、l_switch、l_fall、l_search | put on / take off your coat / turn on the light / fall off the bike / look for | ✅ |
| `kf/L9.png` | europa0 / europa1、m_pick、king、m_eggs、l_breath | wo_europe（rides / swims / picks）、wo_bluetooth（unites）、wo_time_num（carries eggs）、wo_vowel_c（breathe） | ✅ |
| `kf/L10.png` | ship、porter、l_passport、l_report、m_geese、l_fill | wo_port（wind takes the ship / carry / passport / reports）、wo_vowel_a（feed the geese / fill the cup） | ✅ |
| `kf/L11.png` | borrow、tom_book、hello、l_box、m_bring、whisper | ze_borrow / ze_say / ze_wear（take / bring）/ ze_modifier（tell） | ✅ |
| `kf/L12.png` | l_close、l_piggy、l_plaster、twins、heights、m_sister | close the door / save money / bleed / between twins / tall-taller-tallest / look after my sister | ✅ |
| `kf/L13.png` | man、woman、postman、child、coach、teacher_cn | irregular_plural（man / woman / postman / child）、adj_order（basketball coach / Chinese teacher） | ✅ |
| `kf/L14.png` | linda_piano、m_sweep、m_berry、l_sheep、linda_help、l_connect | writing_alchemist（piano / sweeping / strawberries / sheep / helps me）、wo_bluetooth（connects） | ✅ |
| `kf/L15.png` | dad_strong、mom_busy、l_shh、bird_worm、dog_bite、m_wipe | metaphor_code（strong as a horse / busy as a bee / quiet as a mouse / early bird）、ze 语序（dog bites man）、cleaned rooms | ✅ |

### 万能动词剧场（每个义项 3 帧：准备 → 动作 → 结果）
| 联排图 | 帧 | 义项 | 状态 |
|---|---|---|---|
| `V01` | l_sack0–2、house0–2 | take on ① 扛上肩 / ② 呈现新面貌 | ✅ |
| `V02` | l_guitar0–2、room0–2 | take up ① 开始弹吉他 / ② 占地方（箱子字样已抹掉） | ✅ |
| `V03` | l_pic0–2、l_note0–3 | take down ① 取下画框 / ② 记笔记 | ✅ |
| `V04` | l_air0–2、l_idea0–2 | take in ① 吸气 / ② 领会 | ✅ |
| `V05` | l_bag0–2、plane0–2 | take out ① 拿出书；take off ② 飞机起飞 | ✅ |
| `V06` | l_coff0–2、l_bike0–2 | take off ① 脱外套；get on ② 骑上车 | ✅ |
| `V07` / `V11b` | l_boff0–2；bus0–2（上 / 下公交：倒放即 get on） | get off ② 下车（自行车）；get on ① / get off ① 公交 | ✅ |
| `V08` | l_bed0–2 | get up ① 起床 | ✅ |
| `V09` | l_floor0–2、tree0–2 | get up ② 站起来；get down ① 从树上下来 | ✅ |
| `V10` | l_crouch0–2 | get down ② 蹲下 | ✅ |
| `V12` / `V12b` | car_in0–2、car_out0–2 | get in ① / get out ① 小汽车 | ✅ |
| `V13` | box0–2、l_cap0–2 | get out ② 从箱子里出来；put on ① 戴帽子 | ✅ |
| `V14` | show0–2、l_hw0–2 | put on ② 上演；put off ① 拖延作业 | ✅（show2 两个女孩谢幕，可不用） |
| `V15` | rain0、missw_cal、sunny、l_hand0–2 | put off ② 运动会推迟；put up ① 举手 | ✅ |
| `V16` | tent0–2、l_heavy0–2 | put up ② 搭帐篷；put down ① 放下 | ✅ |
| `V17` | l_write0–2、l_toy0–2 | put down ② 写下；put in ① 放进 | ✅ |
| `V18` | l_paint0–1、l_trophy、l_cake0–2 | put in ② 投入精力；put out ① 吹蜡烛 | ✅ |
| `V19` | fire0–2、l_light0–2 | put out ② 灭火；turn on ① 开灯 | ✅ |
| `V20` | l_tap0–2、m_tvoff0–2 | turn on ② 开水龙头；turn off ① 关电视 | ✅ |
| `V21` | l_tapoff0–2、l_radio0–2 | turn off ② 关水龙头；turn up ① 调大音量 | ✅ |
| `V22` | party_wait、party_door、party_cheer、mom_loud、l_knob、mom_quiet | turn up ② 露面；turn down ① 调小音量 | ✅ |
| `V23` | m_offer、l_nothanks、offer_ok、l_hwalk、l_handin、missw_stack | turn down ② 婉拒；turn in ① 交作业 | ✅ |
| `V24` | l_pj0–2、l_seed0–2 | turn in ② 上床睡觉；turn out ① 结果长成大向日葵 | ✅ |
| `V25` | shadow0–1、cat_light、l_relief、l_bench0–3 | turn out ② 原来是猫；look on ① 旁观 | ✅ |
| `V26` | m_drop、l_hero1、m_admire、l_spider0–2 | look on ② 把…看作英雄；look away 移开视线 | ✅ |
| `V27` | l_dict0–2、l_ldown0–2 | look up ② 查词典；look down 低头看 | ✅ |
| `V28` | l_boxwalk、box_lid、l_peek、puppy_pop、l_detect0–3 | look in ① 往箱子里看 / ② 调查 | ✅ |
| `V29` | l_banana0、m_shout、l_banana2、l_win0–2 | look out ① 当心 / ② 向窗外看（Leo 头发画成黑色，⚠️ 场景里可接受，后续可返工） | ✅ |
| `V30` | l_shutter、l_gdoor、m_bread、m_flower、l_fire、l_lantern | give on ① 窗朝大海 / ② 门通花园；give off ① 散发香味 / ② 散发热量；give out ② 发光 | ✅ |
| `V31` | l_lift0–2、dad_candy、dad_apple | give up ① 放弃 / ② 戒掉甜食 | ⚠️ l_lift 帧与邻帧杠铃粘连，用前返工 |
| `V32` | l_pencil、m_lost、pencil_back、l_books、l_return、librarian | give back ① 还铅笔 / ② 还书 | ✅ |
| `V33` | l_exam0–1、missw_paper、tug0–2 | give in ① 交考卷 / ② 让步 | ✅ |
| `V34` | missw_hold、missw_give | give out ① 发卷子（灯塔改用 rough 线条画） | ⚠️ missw_give 底部残留，用前返工 |
| 已有 | l_r0–3、l_jc / l_ja、l_w0–3、bird_up / down、kick0–2 | look up ① 抬头看（l_lookup）、get in ② 火车到站（train + l_wave）、take out ② 样板（takeout_wb） | ✅ |

> 合计约 330 帧（`sprites/cast/*.webp`，透明 WebP，仓库内）。下一步：按 `REDRAW_V5.md` 逐幕重画白板版面，每幕用 `build_sprites.py <库> 帧…` 只打包用到的帧。
