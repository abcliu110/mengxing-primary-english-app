"""gen_wb13_scenes.py —— TODO 1.3 白板实施：把 wb13 立项规格转成 v5 场景文件。

输入：docs/whiteboard/src/wb13/wb13_phrasal.json（短语动词 84 页）
      docs/whiteboard/src/wb13/wb13_poly_laws.json（一词多义 V-16/V-41/V-42）
输出：docs/whiteboard/v5/scenes/
      - vv_<动词>_<小品词>_1.js / _2.js（首次生成 32 格 × 2，共 64；其中 10 格超长拆 ② 为 ②+③，另 +10）
      - hd_poly_law_v16_1.js / hd_poly_law_v41_1.js / hd_poly_law_v42_1.js（3）
      - vv_<动词>_core_1.js（12 动词核心义，单独 12 幕）
      首次合计 89 个新场景文件。2026-11-09 实测：wb13_phrasal.json 的 50 格 attested
      已全部覆盖（50/50），待新建格为 0；32 只是首次生成时的待新建数（其余 18 格
      由原有 vv 场景覆盖），现 --check-only 校验 32 格生成内容 + 18 格原有场景在盘。

口径（保守，见 whiteboard_1.3_note.md §3 三处待决策）：
1. 英文例句一律照 wb13/phrasal_combos.json 的词典引证逐字照录，不编造、
   不删改（含原文缺句末标点者照原样）；中文译文为本幕所加（ZH 表），
   仅供朗读对照，译文与英文不符处以英文为准。
2. 动作帧 ACTS 一律 {}：wb13 未给任何帧登记（actionWords 的 act 均为
   “待核对”，note 缺-7），不编造帧映射；后补帧只改 ACTS 与 units 登记。
   先例：ze_link / ze_pronoun / ze_yesno 三幕同样 ACTS={}。
   例外（2026-11-10 第六波第 2 项）：ACTS_REG 登记的 8 幕已补帧（仓库已有
   先例或场景自带规格 + 帧实物核对过，见 docs/work-2026-11-09/
   wave6_item2_acts_empty.md）；其余 81 幕仍为 {}，缺-7 未闭合。
3. give down / give on 已下线（2026-11-09 第二波定夺）：场景文件与 units 登记均删除，
   不新建；checked_absent 记录保留在 laws-prototype/model/phrasal_combos.json 与
   wb13_phrasal.json（本脚本不管数据文件）。
4. V-42「控制住」「hold a meeting」两站例句已补（2026-11-09，牛津高阶学习者词典 OALD hold_1
   原句，Priya 定用牛津原句）：控制住 *The rebels held the radio station.*；
   举行 *Each month she holds a meeting with her entire staff.*。缺-1 已闭合。
5. 12 动词核心义页为单独 12 幕（2026-11-09 第二波定夺：转正为单独幕，一词一页，
   不并入各动词首格；内容为动词核心义（词库原义）+ 六格总览（能说的 / 查过没有的）；
   朗读句：每幕 1 句 OALD 动词词条义项原句，2026-11-09 第三波补，见 CORE_READALOUD）。

小品词核心义取自仓库已有策展数据（verbs-prototype-v1.html 小品词卷宗）：
  up 向上（空间「向上」为源头义）/ out 从里面出来；往外 /
  off 离开表面 / down 向下 / over 在……正上方 / 越过 / 结束 /
  on 在……上面（有接触）。
动词核心义取自 wb13_phrasal.json 的 verb_core 页（词库原义）。

用法：python3 docs/whiteboard/src/wb13/gen_wb13_scenes.py [--check-only]
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
WB13 = os.path.join(ROOT, 'docs/whiteboard/src/wb13')
SCENES = os.path.join(ROOT, 'docs/whiteboard/v5/scenes')

# --- 例句中文译文（本幕所加；键必须与词典例句逐字一致，否则脚本报错）---
ZH = {
"Stand up straight and don't slouch!": "站直，别驼背！",
"The memoirs stand up well to cross-checking with other records.": "这部回忆录和其他记录对照核查下来，站得住脚。",
"I was supposed to go to a concert with Kyle on Friday, but he stood me up.": "本来周五要和凯尔一起去听音乐会，可他放了我鸽子。",
"The outlines of rooftops and chimneys stood out against the pale sky.": "屋顶和烟囱的轮廓在苍白的天空映衬下格外显眼。",
"Three of the cars we tested stood out among the rest.": "我们测试的车里，有三辆格外出众。",
"The veins stood out on his throat and temples.": "他喉咙和太阳穴上的青筋凸了出来。",
"He was obliged to stand down as a parliamentary candidate.": "他不得不退出议员候选人的竞选。",
"Don't stand over me all the time - it makes me nervous.": "别老站在我旁边盯着，我会紧张。",
"She's made a cake and wants us to help eat it up.": "她做了个蛋糕，想让我们帮忙吃完。",
"Big cars just eat up money.": "大车可费钱了。",
"When I lived in Spain, I used to eat out all the time.": "住在西班牙时，我总在外面吃饭。",
"It's taken me ages to get over the flu.": "我花了好久才从流感中恢复过来。",
"She never got over the death of her son.": "儿子去世后，她始终没能走出来。",
"It's important that we get this message over to young people.": "把这个信息讲清楚、传达给年轻人，这很重要。",
"I'll be in touch once I've got my exams over.": "等我考完试就跟你联系。",
"I don't know how we're going to get over this problem.": "我不知道我们要怎么克服这个问题。",
"I can't get over how well you look.": "你气色这么好，我简直不敢相信。",
"It's time you gave over pretending you're still a teenager.": "你别再装得自己还是个十几岁的孩子了，该停停了。",
"Could you speak up, please?": "请你大声一点说，好吗？",
"There was a brief silence, then Gerald spoke up.": "短暂的沉默之后，杰拉德开口了。",
"He is willing to speak up for the rights of women.": "他愿意为妇女的权利发声。",
"He was not afraid to speak out when it was something he believed in strongly": "遇到他坚信的事，他敢直言不讳。",
"He'll turn the shop over to his son when he retires.": "他退休后会把店交给儿子接管。",
"Turn over and look at the next page.": "翻过这一页，看下一页。",
"You may turn over your exam papers now.": "现在可以把试卷翻过来了。",
"The parliament was taken over by civil guards.": "议会被民防卫队占领了。",
"His widow has taken over the running of his empire, including six London theatres.": "他的遗孀接手了他的产业，包括伦敦的六家剧院。",
"Her hair started falling out as a result of radiation treatment.": "因为放疗，她的头发开始脱落。",
"She'd fallen out with her boyfriend over his ex-girlfriend.": "她因为男友的前女友跟男友闹翻了。",
"A button had fallen off her jacket.": "她夹克上掉了一颗扣子。",
"Audience figures fell off during the second series of the programme.": "第二季播出时，观众人数下降了。",
"The bridge is falling down and will need a million dollars to repair it.": "这座桥快塌了，修好它要花一百万美元。",
"That's where the whole argument falls down.": "整个论点就是在这里站不住脚的。",
"She tripped and fell over.": "她绊了一下，摔倒了。",
"If you make the cake too high, it'll fall over.": "蛋糕做得太高会倒下来。",
"He was the last person to see the woman alive, and suspicion immediately fell on him.": "他是最后一个见过那位女士还活着的人，怀疑立刻落到了他头上。",
"This year, New Year's Eve falls on a Sunday.": "今年除夕正好是星期天。",
"Train fares have gone up.": "火车票涨价了。",
"It was a lovely place before all these new houses went up.": "在这些新房子盖起来之前，这里是个很美的地方。",
"The whole building went up in flames.": "整栋楼烧了起来。",
"A great cheer went up from the audience.": "观众席上爆发出一阵欢呼。",
"We're going up to Scotland next weekend.": "下周末我们要去苏格兰。",
"Are you going out tonight?": "你今晚要出去玩吗？",
"Suddenly the candle went out.": "突然，蜡烛熄灭了。",
"They've been going out for two years now.": "他们谈恋爱已经两年了。",
"Hats like that went out years ago.": "那种帽子好多年前就不流行了。",
"The magazine goes out to all members at the end of the month.": "这本杂志每月月底寄给全体会员。",
"He went off to work as usual.": "他像往常一样出门上班去了。",
"Fireworks were going off all over the city.": "全城到处都在放烟花。",
"The thieves ran away when the alarm went off.": "警报一响，小偷就跑了。",
"Suddenly, all the lights went off.": "突然，所有的灯都熄了。",
"The milk's gone off.": "牛奶坏了。",
"I'd just gone off to sleep when the phone rang.": "我刚睡着，电话就响了。",
"Computers have gone down in price.": "电脑降价了。",
"The movie went down very well in America.": "这部电影在美国很受欢迎。",
"Ten men died when the ship went down.": "船沉了，十个人遇难。",
"Your tyre's gone down.": "你的轮胎瘪了。",
"If one of the file servers goes down, you lose the whole network.": "要是一台文件服务器瘫痪，整个网络就没了。",
"The lights went down and the curtain rose on an empty stage.": "灯光暗下来，幕布升起，舞台上空无一人。",
"I had gone over and over what happened in my mind.": "那件事在我脑子里翻来覆去想了好多遍。",
"In the competition, the judge goes over each dog and assesses it.": "比赛中，评委逐只仔细检查狗并打分。",
"Once again I went over exactly what I needed to say.": "我又把要说的话原原本本复习了一遍。",
"He went on working until he was 91.": "他一直工作到九十一岁。",
"I don't know what's going on.": "我不知道发生了什么。",
"She went on to become a successful surgeon.": "后来她成了一名成功的外科医生。",
"Go on, I'm listening.": "继续说，我在听。",
"The heat goes on automatically at 6 o'clock.": "暖气六点自动开启。",
"As time went on, I grew fond of him.": "随着时间过去，我越来越喜欢他了。",
"Her back is playing up again.": "她的背又出毛病了。",
"Patrick often plays up when he knows I'm in a hurry.": "帕特里克知道我赶时间时常常调皮捣蛋。",
"The schools are playing up their science programs": "学校正在大肆宣传他们的理科课程。",
"The debate will play out in the media over the next week or two.": "这场辩论会在接下来一两周里通过媒体展开。",
"We were forced to stand back and let the crisis play itself out.": "我们只好袖手旁观，让危机自行发展到结束。",
"The children could usually get what they wanted by playing one parent off against the other": "孩子们常常挑拨父母一方去对付另一方，借此得到想要的东西。",
"Western diplomats have played down the significance of the reports.": "西方外交官淡化了这些报道的重要性。",
"I felt guilty saying that, playing on her generosity.": "我那样说是在利用她的慷慨，心里很过意不去。",
"He is scheduled to fly out on Friday.": "他定于周五乘飞机出发。",
"The wheel on one door flew off and struck a worker.": "一扇门上的轮子飞了出来，撞到了一名工人。",
"She climbed up the stairs.": "她爬上了楼梯。",
"When Charles saw it he started to climb down from the table.": "查尔斯看见它，就开始从桌子上爬下来。",
"If Lafontaine is forced to climb down, he may wish to reconsider his position.": "如果拉方丹被迫让步，他也许会重新考虑自己的立场。",
}

# 小品词核心义（verbs-prototype-v1.html 小品词卷宗，见文件头说明）
PARTICLE_MEANING = {
    'up': '向上',
    'out': '从里面出来；往外',
    'off': '离开表面',
    'down': '向下',
    'over': '在……正上方 / 越过 / 结束',
    'on': '在……上面（有接触）',
}

# --- 12 核心义幕朗读句（2026-11-09 第三波补；R2 缺口）---
# 口径：每幕 1 句牛津高阶学习者词典（OALD, oxfordlearnersdictionaries.com）动词词条
# 义项原句，逐字照录（2026-11-09 当天打开词条页核对；与 V-42「Priya 定用牛津原句」
# 同一口径）；中文译文为本幕所加；不编造。12/12 均核到，无留空。
# 句长 3–8 词；先读词 = 动词原形（'s' 项第 4 元），autoBuild 的 K.say 先读词再读句。
CORE_READALOUD = {
    # 动词：(英文原句， 中文译文， OALD 义项出处）
    'climb': ("Don't climb too high.", "别爬得太高。",
              "OALD climb_1 义项 1（go up）Extra Examples"),
    'eat': ("I don't eat meat.", "我不吃肉。",
            "OALD eat 义项 1（to put food in your mouth, bite it and swallow it）"),
    'fall': ("The leaves were falling from the trees.", "树叶正从树上落下来。",
             "OALD fall_1 义项 1（drop down）"),
    'fly': ("Geese fly south in the fall.", "大雁秋天往南飞。",
            "OALD fly_1 义项 1（of bird/insect）"),
    'get': ("What did you get for your birthday?", "你生日收到了什么礼物？",
            "OALD get 义项 1（receive/obtain）"),
    'give': ("Give your mother the letter.", "把这封信给你妈妈。",
             "OALD give_1 义项 1（hand/provide）"),
    'go': ("He goes to work by bus.", "他坐公交车去上班。",
           "OALD American go_1 义项 1（move/travel）"),
    'play': ("Let's play a different game.", "我们换个游戏玩吧。",
             "OALD play_1 义项 1（of children）"),
    'speak': ("Do you speak English?", "你会说英语吗？",
              "OALD American speak_1 义项 4（a language）"),
    'stand': ("She was too weak to stand.", "她虚弱得站不起来。",
              "OALD stand_1 义项 1（on feet/be vertical）"),
    'take': ("Remember to take your coat when you leave.", "走的时候记得带上外套。",
             "OALD take_1 义项 1（carry/lead）"),
    'turn': ("The wheels of the car began to turn.", "汽车的轮子开始转动了。",
             "OALD turn 义项 1（move round）"),
}

def q(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"

# --- 动作帧登记（2026-11-10 第六波第 2 项补；其余幕仍为 {}，见缺-7）---
# 口径（见 docs/work-2026-11-09/wave6_item2_acts_empty.md §2）：
# 只登记同时满足三条的映射——① 键是朗读句里实际出现的动词原形/词形
# （autoBuild 精确匹配，死键会进 v5check R4-F2 FAIL）；② 帧在 cast/ 里
# 且实物核对过确实画的就是这个动作（l_fall 是骑车摔、l_cake1 是吹蜡烛、
# l_goout 是抱球跑出门、plane 在 AH=470 下宽 1207px 出画布，都不算）；
# ③ 有仓库已有先例（同一动词→同一帧在他幕已实际演出）或场景自带规格
# （如 fly out 义项明写“乘飞机出发”）。抽象义/隐喻义/无帧动词一律不登记。
# 本表是场景文件再生的唯一来源：再生单幕（import 方式）以本表为准。
ACTS_REG = {
    # turn on：fp_vectors_2 先例（同句 "Turn on the light."）→ l_switch（开灯帧）
    'hd_poly_law_v16_1.js': {'turn on': ['l_switch']},
    # fly：five_patterns_p2_1 先例（"Birds fly happily in the blue sky."）
    # → bird_up / bird_down（飞鸟帧；注：bird_down 在 AH=470 下宽 628px，
    # 右缘 2008 超出 1920 画布约 88px，与先例幕现状相同，见底稿 §2）
    'vv_fly_core_1.js': {'fly': ['bird_up', 'bird_down']},
    # speak：aux_transformer_2 先例（"Leo can speak English very well."）
    # → l_speak（说话帧）；up_2 另有过去式 spoke 同帧
    'vv_speak_core_1.js': {'speak': ['l_speak']},
    'vv_speak_out_1.js': {'speak': ['l_speak']},
    'vv_speak_out_2.js': {'speak': ['l_speak']},
    'vv_speak_up_1.js': {'speak': ['l_speak']},
    'vv_speak_up_2.js': {'speak': ['l_speak'], 'spoke': ['l_speak']},
    # stand up：phrasal_key_1 先例（同型祈使句 "Stand up, please."）
    # → l_sit → l_stand（坐→站起身的过渡帧）
    'vv_stand_up_1.js': {'stand up': ['l_sit', 'l_stand']},
}

def scene_file(title, src_note, lib, items, acts=None):
    acts = acts or {}
    if acts:
        acts_note = '；'.join(f"{k} → {', '.join(v)}" for k, v in acts.items())
        hdr = (f"// 角色关键帧：sprites/{lib}.js（{acts_note}；第六波 2026-11-10 补，"
               f"依据见 docs/work-2026-11-09/wave6_item2_acts_empty.md）")
        acts_line = 'const ACTS = ' + json.dumps(acts, ensure_ascii=False) + ';'
    else:
        hdr = "// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）"
        acts_line = "const ACTS = {};"
    lines = [
        f"// {title} —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）",
        f"// 内容来源：{src_note}",
        hdr,
        "import { autoBuild } from './auto.js';",
        f"import * as SP from '../sprites/{lib}.js';",
        acts_line,
        "const ITEMS = [",
    ]
    for it in items:
        lines.append('  [' + ', '.join(q(x) for x in it) + '],')
    lines.append("];")
    lines.append(f"export default function build() {{ return autoBuild(SP, {{ title: {q(title)}, items: ITEMS, acts: ACTS }}); }}")
    return '\n'.join(lines) + '\n'

def s_item(entry):
    en = entry['example']
    assert en in ZH, f'缺译文：{en!r}'
    return ['s', en, ZH[en], entry['phrasal']]

# 超长拆分名单（第二波定夺 4；见 vv_scenes 文档串，实测时长出处同前）
SPLIT_3 = {'get over', 'go down', 'go on', 'go off', 'go up', 'go out', 'go over',
           'turn over', 'play up', 'play out'}
# 再平衡：③ 只放回顾对子仍超 60 秒的两格，把前 k 对回顾留在 ②（内容一字不减）——
# get over ③ 72.5 秒、go down ③ 62.3 秒（拆分首版实测 2026-11-09）；其余 8 格 ③ ≤60 秒，k=0。
SPLIT_3_MOVE = {'get over': 3, 'go down': 2}

def vv_scenes(page, core_meaning):
    """一格两幕：① 首义 + 例句；② 次义（或合成）+ 全格合成卡。板式仿 vv_give_off / vv_take_on。
    超长拆分（2026-11-09 第二波定夺 4）：② 实测超 60 秒（SOP §1 实验室 40–60 秒指引）
    的 10 格拆 ② 为 ②+③，不缩内容——② 留次义 + 动词/小品词拆解，③ 为全格回顾
    （义项回顾 + 共同点 + 重读①句）。拆分名单按实测时长定（探针 2026-11-09，out/ 打包）：
    get over 89.0、go down 75.9、go on 68.7、go off 68.4、go up 66.0、go out 63.8、
    go over 62.4、turn over 62.3、play up 61.1、play out 60.9 秒；其余 22 格 ② 均 ≤60 秒，不拆。
    再平衡（SPLIT_3_MOVE）：③ 仍超 60 秒的 get over（72.5 秒）、go down（62.3 秒），
    把前 3 / 2 对义项回顾留在 ②，③ 开场改称「义项回顾（续）」，内容一字不减。"""
    verb, part, combo = page['verb'], page['particle'], page['phrasal']
    entries = page['entries']
    pm = PARTICLE_MEANING[part]
    P = part.upper()
    lib = 'vv' + verb + part
    src = f"docs/whiteboard/src/wb13/wb13_phrasal.json「{combo}」格（词典引证逐字照录；中文译文为本幕所加）"
    # ---- ① ----
    items1 = [
        ['n', f"{combo}：{entries[0]['meaning_cn']}"],
        ['w', f"{combo} ①"],
        ['w', entries[0]['meaning_cn']],
        s_item(entries[0]),
        ['m', P],
        ['m', pm],
    ]
    f1 = scene_file(f"🎬 万能动词 · {combo} ①", src, lib + '1', items1,
                    acts=ACTS_REG.get(f"vv_{verb}_{part}_1.js"))
    # ---- ②（次义 + 动词/小品词拆解）----
    if len(entries) >= 2:
        items2 = [
            ['n', f"{combo}：{entries[1]['meaning_cn']}"],
            ['w', f"{combo} ②"],
            ['w', entries[1]['meaning_cn']],
            s_item(entries[1]),
        ]
    else:
        items2 = [
            ['n', f"{combo}：{entries[0]['meaning_cn']}（合成）"],
            ['w', f"{combo} ②"],
        ]
    items2 += [
        ['m', verb.upper()],
        ['m', pm],
        ['w', f"{verb}：{core_meaning}"],
        ['m', '+'],
    ]
    # ---- 合成卡（全格义项回顾 + 共同点 + 重读①句）：超长格移入 ③，其余留在 ② ----
    tail = []
    for e in entries:
        tail.append(['w', e['example']])
        tail.append(['m', f"{e['phrasal']}：{e['meaning_cn']}"])
    tail += [
        ['w', f"共同点：{P} = {pm}"],
        s_item(entries[0]),
    ]
    f2 = scene_file(f"🎬 万能动词 · {combo} ②", src, lib + '2', items2)
    if combo in SPLIT_3:
        k = SPLIT_3_MOVE.get(combo, 0)  # 留在 ② 的回顾对子数（再平衡用，见文件头）
        items2b = items2 + tail[:2 * k]
        items3 = [
            ['n', f"{combo}：全格回顾" if k == 0 else f"{combo}：义项回顾（续）"],
            ['w', f"{combo} ③"],
        ] + tail[2 * k:]
        f2 = scene_file(f"🎬 万能动词 · {combo} ②", src, lib + '2', items2b,
                        acts=ACTS_REG.get(f"vv_{verb}_{part}_2.js"))
        f3 = scene_file(f"🎬 万能动词 · {combo} ③", src, lib + '3', items3,
                        acts=ACTS_REG.get(f"vv_{verb}_{part}_3.js"))
        return [(f"vv_{verb}_{part}_1.js", f1), (f"vv_{verb}_{part}_2.js", f2), (f"vv_{verb}_{part}_3.js", f3)]
    f2b = scene_file(f"🎬 万能动词 · {combo} ②", src, lib + '2', items2 + tail,
                     acts=ACTS_REG.get(f"vv_{verb}_{part}_2.js"))
    return [(f"vv_{verb}_{part}_1.js", f1), (f"vv_{verb}_{part}_2.js", f2b)]

def poly_scenes():
    d = json.load(open(os.path.join(WB13, 'wb13_poly_laws.json'), encoding='utf-8'))
    out = []
    v16, v41, v42 = d['pages']
    src = "docs/whiteboard/src/wb13/wb13_poly_laws.json（laws_master V-16/V-41/V-42 headline_kid / mechanism / examples 全文照录，未另编例句）"
    # ---- V-16 ----
    items = [
        ['n', '一个词好几个意思，怎么记？'],
        ['w', 'eye'],
        ['s', 'I see with my eyes.', '我用眼睛看。', 'eye'],
        ['w', 'the eye of a needle'],
        ['s', 'The needle has an eye.', '针上有个针眼。', 'eye'],
        ['n', '同形异源是两棵树，不许硬连。'],
        ['w', 'light'],
        ['s', 'Turn on the light. This bag is light.', '打开灯。这个包很轻。', 'light'],
        ['n', v16['claim_kid']],
        ['w', '先认树干再认树枝'],
        ['w', '推不出的树枝就老实记'],
        ['w', '💡 一句话洞见'],
        ['w', v16['kid_line']],
    ]
    out.append(('hd_poly_law_v16_1.js', scene_file('多义词像一棵树', src, 'hdplv161', items,
                                                   acts=ACTS_REG.get('hd_poly_law_v16_1.js'))))
    # ---- V-41（actionWords 为空是有意的：例句无动作动词，SOP §17 决策 38 第 16 条）----
    items = [
        ['n', 'bank 两张词卡——河岸 bank、银行 bank，长得一模一样，是一个词吗？'],
        ['w', 'bank'],
        ['s', 'The bank is by the river. I have money in the bank.', '河岸在河边。我把钱存在银行里。', 'bank'],
        ['n', v41['claim_kid']],
        ['w', '河岸和银行一起「塌了」'],
        ['w', '银行义借自意大利语 banca（钱商长凳）'],
        ['w', '河岸义源出日耳曼/古诺尔斯一线'],
        ['s', 'An eye and the eye of a needle.', '一只眼睛和一个针眼。', 'eye'],
        ['w', 'run：OED3 动词 645 项'],
        ['w', 'run：OED 官网现行页 245 meanings'],
        ['w', 'run：学习词典（OALD9+COBUILD9）46 项'],
        ['w', '数字必须连口径一起说'],
        ['w', '💡 一句话洞见'],
        ['w', '塞进同一句只是验亲的直觉工具，不是判决机。'],
    ]
    out.append(('hd_poly_law_v41_1.js', scene_file('撞脸还是亲戚？塞进一句话验一验', src, 'hdplv411', items,
                                                   acts=ACTS_REG.get('hd_poly_law_v41_1.js'))))
    # ---- V-42（缺-1 已闭合：控制住 / hold a meeting 两站例句为 OALD hold_1 原句）----
    items = [
        ['n', '一个词的意思怎么越滚越多？'],
        ['w', 'hold'],
        ['s', 'Hold my hand.', '握住我的手。', 'hold'],
        ['w', '控制住'],
        ['s', 'The rebels held the radio station.', '反抗军控制了广播电台。', 'hold'],
        ['w', '装得下'],
        ['s', 'The hall holds 500 people.', '这个大厅能容纳 500 人。', 'hold'],
        ['w', 'hold a meeting'],
        ['s', 'Each month she holds a meeting with her entire staff.', '她每个月和全体员工开一次会。', 'hold'],
        ['n', '去 P-10 看介词版。'],
        ['n', v42['claim_kid']],
        ['w', '顺路能猜出大半'],
        ['w', '滚不到、推不出的部分仍要逐个记'],
        ['w', '💡 一句话洞见'],
        ['w', v42['kid_line']],
    ]
    txt = scene_file('词的意思像滚雪球：hold', src, 'hdplv421', items,
                     acts=ACTS_REG.get('hd_poly_law_v42_1.js'))
    out.append(('hd_poly_law_v42_1.js', txt))
    return out

def core_scenes(phrasal):
    """12 动词核心义页：单独 12 幕（2026-11-09 第二波定夺转正，一词一页）；
    同款 autoBuild 格子形态；核心义 + 六格总览 + 朗读句（CORE_READALOUD，
    2026-11-09 第三波补，12/12 均核到，无留空）。"""
    pages = phrasal['pages']
    cores = [p for p in pages if p['kind'] == 'verb_core']
    cells = {(p['verb'], p['particle']): p for p in pages if p['kind'] == 'grid_cell'}
    out = []
    for c in cores:
        verb = c['verb']
        assert verb in CORE_READALOUD, f'核心义幕缺朗读句：{verb}'
        attested = [g for g in c['grid_row'] if cells[(verb, g.split(' ', 1)[1])]['status'] == 'attested']
        absent = [g for g in c['grid_row'] if cells[(verb, g.split(' ', 1)[1])]['status'] == 'checked_absent']
        en, zh, src_oald = CORE_READALOUD[verb]
        items = [
            ['n', f"{verb}：{c['core_meaning_cn']}"],
            ['w', f"{verb} {c['phonetic']}"],
            ['w', c['core_meaning_cn']],
            ['s', en, zh, verb],
        ]
        if attested:
            items.append(['w', '能说的搭配：'])
            for g in attested:
                items.append(['m', g])
        if absent:
            items.append(['w', '查过，没有的搭配：'])
            for g in absent:
                items.append(['m', g])
        src = (f"docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 {c['wordbank_id']}；"
               f"六格总览：有引证 {len(attested)}/6）——单独 12 幕之一（2026-11-09 第二波定夺转正）；"
               f"朗读句：{src_oald}（2026-11-09 第三波补，中文译文为本幕所加）")
        out.append((f"vv_{verb}_core_1.js",
                    scene_file(f"🎬 万能动词 · {verb} 核心义", src, f"vv{verb}core1", items,
                               acts=ACTS_REG.get(f"vv_{verb}_core_1.js"))))
    return out

def main():
    check_only = '--check-only' in sys.argv
    phrasal = json.load(open(os.path.join(WB13, 'wb13_phrasal.json'), encoding='utf-8'))
    pages = phrasal['pages']
    core_meaning = {p['verb']: p['core_meaning_cn'] for p in pages if p['kind'] == 'verb_core'}
    attested = [p for p in pages if p['kind'] == 'grid_cell' and p['status'] == 'attested']
    missing = [p for p in attested if not p['covered_by_vv']]
    # 2026-11-09 实测：50 格 attested 已全部覆盖（50/50），待新建格为 0；
    # 32 是本脚本首次生成时的待新建格数（其余 18 格由原有 vv 场景覆盖），已过时。
    # 断言改为“无未覆盖格”（从源数据推导），不再硬编码 32。
    assert not missing, f'仍有未覆盖格 {len(missing)}/{len(attested)}：{[p["phrasal"] for p in missing]}'
    assert len(core_meaning) == 12, f'核心义页应为 12，实得 {len(core_meaning)}'
    # 不建 checked_absent 格；give down / give on 已下线，场景与 units 登记均已删除
    assert not any(p['phrasal'] in ('give down', 'give on') for p in attested)
    # 32 / 18 分工（2026-11-09 实测）：本脚本只生成 ZH 译文表覆盖的 32 格
    # （其词典例句逐字落场景，见下）；其余 18 格（get/give/turn/take 各 5/3/5/5）
    # 由原有 vv 场景覆盖，例句来自旧剧场、与 wb13 引证不同句，本脚本不生成、
    # 不校验例句，只校验场景文件在盘上。
    generated = [p for p in attested if all(e['example'] in ZH for e in p['entries'])]
    precovered = [p for p in attested if p not in generated]
    assert len(generated) + len(precovered) == len(attested)
    for p in precovered:
        for n in (1, 2):
            assert os.path.exists(os.path.join(SCENES, f"vv_{p['verb']}_{p['particle']}_{n}.js")), \
                f"原有场景缺失：vv_{p['verb']}_{p['particle']}_{n}.js"
    # 生成内容校验（首次生成的 89 个文件由 32 格 ×2 + 10 拆 ③ + 3 规律页
    # + 12 核心义组成，见 docstring；文件数按源数据推导，不再硬编码 89）。
    files = []
    n_split = 0
    for p in generated:
        f = vv_scenes(p, core_meaning[p['verb']])
        assert len(f) in (2, 3), f'{p["phrasal"]} 场景数异常：{len(f)}'
        if len(f) == 3:
            n_split += 1
        files += f
    poly_files = poly_scenes()
    core_files = core_scenes(phrasal)
    files += poly_files + core_files
    assert n_split == len(SPLIT_3), f'拆 ③ 格数应为 {len(SPLIT_3)}，实得 {n_split}'
    expect_files = 2 * len(generated) + n_split + len(poly_files) + len(core_files)
    assert len(files) == expect_files, \
        f'场景文件数应为 {expect_files}（{len(generated)} 格 ×2 + {n_split} 拆 ③ + {len(poly_files)} 规律页 + {len(core_files)} 核心义），实得 {len(files)}'
    # 自查：每条词典例句逐字出现在场景里（场景文件是 JS 转义形式，先反转义再比对）
    blob = '\n'.join(t for _, t in files).replace("\\'", "'").replace('\\\\', '\\')
    n_ex = 0
    for p in generated:
        for e in p['entries']:
            assert e['example'] in blob, f"例句未落场景：{e['example']!r}"
            n_ex += 1
    for p in pages:
        if p['kind'] == 'grid_cell' and p['status'] == 'checked_absent':
            assert f"vv_{p['verb']}_{p['particle']}_1.js" not in [f for f, _ in files], p['phrasal']
    print(f'{len(attested)} 格已全部覆盖（本脚本 {len(generated)} 格 + 原有 vv {len(precovered)} 格）；'
          f'{n_ex} 条词典例句全部逐字落场景；场景文件 {len(files)} 个（首次生成 89 个）')
    if check_only:
        print('check-only：未写文件')
        return
    # 首次生成已完成：目标场景均已存在，拒绝覆盖（用 --check-only 校验）。
    existing = [n for n, _ in files if os.path.exists(os.path.join(SCENES, n))]
    assert not existing, f'场景已存在 {len(existing)} 个，拒绝覆盖（首次生成已完成；用 --check-only 校验）'
    for name, txt in files:
        path = os.path.join(SCENES, name)
        assert not os.path.exists(path), f'场景已存在，拒绝覆盖：{path}'
        open(path, 'w', encoding='utf-8').write(txt)
    print('已写：', ', '.join(n for n, _ in files))

if __name__ == '__main__':
    main()
