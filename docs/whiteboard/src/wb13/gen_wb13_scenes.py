"""gen_wb13_scenes.py —— TODO 1.3 白板实施：把 wb13 立项规格转成 v5 场景文件。

输入：docs/whiteboard/src/wb13/wb13_phrasal.json（短语动词 84 页）
      docs/whiteboard/src/wb13/wb13_poly_laws.json（一词多义 V-16/V-41/V-42）
输出：docs/whiteboard/v5/scenes/
      - vv_<动词>_<小品词>_1.js / _2.js（32 格 × 2，共 64）
      - hd_poly_law_v16_1.js / hd_poly_law_v41_1.js / hd_poly_law_v42_1.js（3）
      - vv_<动词>_core_1.js（12 动词核心义占位页，共 12）
      合计 79 个新场景文件。

口径（保守，见 whiteboard_1.3_note.md §3 三处待决策）：
1. 英文例句一律照 wb13/phrasal_combos.json 的词典引证逐字照录，不编造、
   不删改（含原文缺句末标点者照原样）；中文译文为本幕所加（ZH 表），
   仅供朗读对照，译文与英文不符处以英文为准。
2. 动作帧 ACTS 一律 {}：wb13 未给任何帧登记（actionWords 的 act 均为
   “待核对”，note 缺-7），不编造帧映射；后补帧只改 ACTS 与 units 登记。
   先例：ze_link / ze_pronoun / ze_yesno 三幕同样 ACTS={}。
3. give down / give on 不新建、不删除：已有 vv_ 场景保留，只在 units.json
   标注 checked_absent（本脚本不管 units，见 gen_wb13_units.py 的配套改动）。
4. V-42「控制住」「hold a meeting」两站例句缺（缺-1）：只上站名，不编例句，
   缺口写在场景文件头注释里。
5. 12 动词核心义页为占位页：同款 autoBuild 格子形态，只放动词核心义
   （词库原义）+ 六格总览（能说的 / 查过没有的），无朗读句（待形态定稿后补）。

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

def q(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"

def scene_file(title, src_note, lib, items):
    lines = [
        f"// {title} —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）",
        f"// 内容来源：{src_note}",
        "// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）",
        "import { autoBuild } from './auto.js';",
        f"import * as SP from '../sprites/{lib}.js';",
        "const ACTS = {};",
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

def vv_scenes(page, core_meaning):
    """一格两幕：① 首义 + 例句；② 次义（或合成）+ 全格合成卡。板式仿 vv_give_off / vv_take_on。"""
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
    f1 = scene_file(f"🎬 万能动词 · {combo} ①", src, lib + '1', items1)
    # ---- ② ----
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
    # 合成卡：动词 + 小品词 + 全格义项回顾 + 共同点 + 重读①句（仿 vv_take_on_2 / vv_give_off_2）
    items2 += [
        ['m', verb.upper()],
        ['m', pm],
        ['w', f"{verb}：{core_meaning}"],
        ['m', '+'],
    ]
    for e in entries:
        items2.append(['w', e['example']])
        items2.append(['m', f"{e['phrasal']}：{e['meaning_cn']}"])
    items2 += [
        ['w', f"共同点：{P} = {pm}"],
        s_item(entries[0]),
    ]
    f2 = scene_file(f"🎬 万能动词 · {combo} ②", src, lib + '2', items2)
    return [(f"vv_{verb}_{part}_1.js", f1), (f"vv_{verb}_{part}_2.js", f2)]

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
    out.append(('hd_poly_law_v16_1.js', scene_file('多义词像一棵树', src, 'hdplv161', items)))
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
    out.append(('hd_poly_law_v41_1.js', scene_file('撞脸还是亲戚？塞进一句话验一验', src, 'hdplv411', items)))
    # ---- V-42（缺-1：控制住 / hold a meeting 两站例句缺，只上站名，不编例句）----
    items = [
        ['n', '一个词的意思怎么越滚越多？'],
        ['w', 'hold'],
        ['s', 'Hold my hand.', '握住我的手。', 'hold'],
        ['w', '控制住'],
        ['w', '装得下'],
        ['s', 'The hall holds 500 people.', '这个大厅能容纳 500 人。', 'hold'],
        ['w', 'hold a meeting'],
        ['n', '去 P-10 看介词版。'],
        ['n', v42['claim_kid']],
        ['w', '顺路能猜出大半'],
        ['w', '滚不到、推不出的部分仍要逐个记'],
        ['w', '💡 一句话洞见'],
        ['w', v42['kid_line']],
    ]
    head = ("// 缺口（wb13 缺-1）：V-42 mechanism 提到 hold「控制住」「举行」两站，但 laws_master 只有 "
            "Hold my hand. 与 The hall holds 500 people. 两句；两站例句须从词典/教材核实后补，不得现编。\n")
    txt = scene_file('词的意思像滚雪球：hold', src, 'hdplv421', items)
    txt = txt.replace("// 角色关键帧：", head + "// 角色关键帧：", 1)
    out.append(('hd_poly_law_v42_1.js', txt))
    return out

def core_scenes(phrasal):
    """12 动词核心义占位页：同款 autoBuild 格子形态；只放核心义 + 六格总览，无朗读句。"""
    pages = phrasal['pages']
    cores = [p for p in pages if p['kind'] == 'verb_core']
    cells = {(p['verb'], p['particle']): p for p in pages if p['kind'] == 'grid_cell'}
    out = []
    for c in cores:
        verb = c['verb']
        attested = [g for g in c['grid_row'] if cells[(verb, g.split(' ', 1)[1])]['status'] == 'attested']
        absent = [g for g in c['grid_row'] if cells[(verb, g.split(' ', 1)[1])]['status'] == 'checked_absent']
        items = [
            ['n', f"{verb}：{c['core_meaning_cn']}"],
            ['w', f"{verb} {c['phonetic']}"],
            ['w', c['core_meaning_cn']],
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
               f"六格总览：有引证 {len(attested)}/6）——占位页：形态待定（并入各动词首格或单独 12 幕，"
               f"见 whiteboard_1.3_note.md §3 定夺 1），无朗读句，待形态定稿后补")
        out.append((f"vv_{verb}_core_1.js",
                    scene_file(f"🎬 万能动词 · {verb} 核心义", src, f"vv{verb}core1", items)))
    return out

def main():
    check_only = '--check-only' in sys.argv
    phrasal = json.load(open(os.path.join(WB13, 'wb13_phrasal.json'), encoding='utf-8'))
    pages = phrasal['pages']
    core_meaning = {p['verb']: p['core_meaning_cn'] for p in pages if p['kind'] == 'verb_core'}
    missing = [p for p in pages if p['kind'] == 'grid_cell' and p['status'] == 'attested' and not p['covered_by_vv']]
    assert len(missing) == 32, f'待新建格应为 32，实得 {len(missing)}'
    assert len(core_meaning) == 12, f'核心义页应为 12，实得 {len(core_meaning)}'
    # 不建 checked_absent 格；give down / give on 已有场景，不动
    assert not any(p['phrasal'] in ('give down', 'give on') for p in missing)
    files = []
    for p in missing:
        files += vv_scenes(p, core_meaning[p['verb']])
    files += poly_scenes()
    files += core_scenes(phrasal)
    assert len(files) == 79, f'场景文件应为 79，实得 {len(files)}'
    # 自查：每条词典例句逐字出现在场景里（场景文件是 JS 转义形式，先反转义再比对）
    blob = '\n'.join(t for _, t in files).replace("\\'", "'").replace('\\\\', '\\')
    n_ex = 0
    for p in missing:
        for e in p['entries']:
            assert e['example'] in blob, f"例句未落场景：{e['example']!r}"
            n_ex += 1
    for p in pages:
        if p['kind'] == 'grid_cell' and p['status'] == 'checked_absent':
            assert f"vv_{p['verb']}_{p['particle']}_1.js" not in [f for f, _ in files] or p['phrasal'] in ('give down', 'give on'), p['phrasal']
    print(f'32 格 {n_ex} 条词典例句全部逐字落场景；场景文件 {len(files)} 个')
    if check_only:
        print('check-only：未写文件')
        return
    for name, txt in files:
        path = os.path.join(SCENES, name)
        assert not os.path.exists(path), f'场景已存在，拒绝覆盖：{path}'
        open(path, 'w', encoding='utf-8').write(txt)
    print('已写：', ', '.join(n for n, _ in files))

if __name__ == '__main__':
    main()
