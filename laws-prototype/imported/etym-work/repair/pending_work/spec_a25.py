# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['secretary'] = {
 'chain': [('Latin', 'cernere', '筛分；分开', '拉丁语时期'),
           ('Latin', 'sēcernere', '分开；置于一旁', '拉丁语时期'),
           ('Latin', 'sēcrētus', '被分开的；秘密的', '拉丁语时期'),
           ('Medieval Latin', 'secrētārius', '亲信官员', '中世纪拉丁语时期'),
           ('Middle English', 'secretarie', '秘书', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「受托掌管机密的人」）',
 'orig': '受托掌管机密的人',
 'path': [('受托掌管机密的人', '中世纪拉丁语时期', ''),
          ('秘书', '现代', 'sē-「分开」+ cernere「筛」：被单独分出来的事就是 secret，管它的人就是 secretary。约 1400 年「代笔、掌文书」义立（由亲信到文职）')],
 'mech': 'secretary 是「管秘密的人」：秘密单放，专人来看。',
 'link': '今天的意思「秘书」从君王亲信演变而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['princess'] = {
 'chain': [('Latin', 'prīmus', '第一的', '拉丁语时期'),
           ('Latin', 'capere', '取', '拉丁语时期'),
           ('Latin', 'prīnceps', '首领；君主', '拉丁语时期'),
           ('Old French', 'princesse', '公主', '古法语时期'),
           ('Middle English', 'princesse', '公主', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「王室或贵族女子；君主之女或妻」）',
 'orig': '公主；王妃',
 'path': [('公主；王妃', '中古法语时期', ''),
          ('公主', '现代', 'prince（出 prīnceps「居首位者」：prīmus「第一」+ capere「取」）的阴性形：英语多为自造（prince + -ess），部分用例径自法语 princesse（由君主到其女眷）')],
 'mech': 'princess 是「第一人」的女儿：prince 加了个女尾巴。',
 'link': '今天的意思「公主」就是本义，一路没变。',
 'disp': '构词路径两记并存（英语自造 / 法语借入），材料同一。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['robot'] = {
 'chain': [('Proto-Indo-European', '*h₃erbʰ-', '身份转换', '原始印欧语时期'),
           ('Slavic', 'rabota', '奴役；服役', '斯拉夫语时期'),
           ('Czech', 'robota', '强制劳动；苦役', '捷克语时期'),
           ('Czech', 'robot', '机器人', '1920 年'),
           ('English', 'robot', '机器人', '1923 年')],
 'fa': '1923 年进入英语（Etymonline：1923，卡雷尔·恰佩克剧作《R.U.R.》英译）',
 'orig': '苦役；强制劳动',
 'path': [('苦役；强制劳动', '捷克语时期', ''),
          ('机器人', '现代', '科幻造词：恰佩克兄弟以「服苦役者」（robotnik「劳役工」出 robota「苦役」）名机器人工人——与德语 Arbeit 同根（由苦工到机器）')],
 'mech': 'robot 是「苦役」：替人干苦活的，名字先说了命。',
 'link': '今天的意思「机器人」是 1920 年的科幻新造。',
 'disp': '词由约瑟夫·恰佩克首创于短篇、卡雷尔在剧作中推广（Rawson 说），署名两说并记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['finish'] = {
 'chain': [('Latin', 'fīnis', '界限；终点', '拉丁语时期'),
           ('Latin', 'fīnīre', '限定；结束', '拉丁语时期'),
           ('Old French', 'fenir', '结束', '古法语时期'),
           ('Middle English', 'finishen', '完成', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「使终结」）',
 'orig': '界限；终点',
 'path': [('界限；终点', '拉丁语时期', ''),
          ('完成', '现代', 'fīnis 字面「划分之物」（边界）：走到界，就是到头；英语经法语词干 finiss- 接来（由终点到完成）')],
 'mech': 'finish 是「到了界」：事有边界，过界就是完。',
 'link': '今天的意思「完成」就是本义的动词化。',
 'disp': 'fīnis 本身来源未明（Etymonline：of unknown origin，或与 figere「固定」相关），本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['spend'] = {
 'chain': [('Latin', 'pendere', '称量', '拉丁语时期'),
           ('Latin', 'expendere', '称出（钱）；付出', '拉丁语时期'),
           ('Medieval Latin', 'spendere', '花费', '中世纪拉丁语时期'),
           ('Old English', 'spendan', '花费', '古英语时期')],
 'fa': '古英语时期就已经有了（词多见于复合词 forspendan「用尽」）',
 'orig': '称量着付出（钱）',
 'path': [('称量着付出（钱）', '拉丁语时期', ''),
          ('花费；度过', '现代', '古时银钱论重量：expendere 是「称出银子付人」。约 1300 年起时间、精力皆可 spend（由称银到耗用）')],
 'mech': 'spend 是「称银子」：钱是称着花出去的。',
 'link': '今天的意思「花费」从称量付款转化而来。',
 'disp': '入日耳曼语或经 expendere 缩略、或经 dispendere，两路拉丁语同源，并记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cry'] = {
 'chain': [('Latin', 'quirītāre', '哭喊；哀号', '拉丁语时期'),
           ('Vulgar Latin', '*crītāre', '喊叫', '通俗拉丁语时期'),
           ('Old French', 'crier', '喊叫', '古法语时期'),
           ('Middle English', 'crien', '哭；喊叫', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c.，义为「喊出」）',
 'orig': '喊叫；呼号',
 'path': [('喊叫；呼号', '拉丁语时期', ''),
          ('哭；喊叫', '现代', '先是「大声喊」，13 世纪借「放声」之义伸入「哭」：16 世纪基本顶替 weep 管眼泪（由喊到哭）')],
 'mech': 'cry 先是「喊」：哭出声来，也归它管。',
 'link': '今天「哭」与「喊」两义同源：出声。',
 'disp': 'quirītāre 本身来源未定（Etymonline：of uncertain origin，或为拟猪叫声的 *quis 变体）。',
 'folk': '古人自己的民间词源：谓此词是「向 Quirites（罗马公民）呼救」（牛津作字面解，Etymonline 明确标为古代民间词源），非定案', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['decide'] = {
 'chain': [('Proto-Indo-European', '*kae-id-', '击；切', '原始印欧语时期'),
           ('Latin', 'caedere', '砍；切', '拉丁语时期'),
           ('Latin', 'dēcīdere', '切断；决定', '拉丁语时期'),
           ('Middle English', 'deciden', '决定', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「裁决争端」）',
 'orig': '切断（而定）',
 'path': [('切断（而定）', '拉丁语时期', ''),
          ('决定', '现代', 'dē-「断然」+ caedere「切」：一刀切断，争就停了——「干脆利落了断」之义。1830 年「拿定主意」义立（由裁断到决心）')],
 'mech': 'decide 是「一刀切」：切下去，就定了。',
 'link': '今天的意思「决定」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'shout': 'origin_unknown（主干复核后）：c. 1300 shouten「大声呼喊」，Etymonline「a word of unknown origin」，两候选（shoot 词根「掷声而出」说、古诺尔斯语 skúta「嘲讽」说）皆为 perhaps 级，无主干可对，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
