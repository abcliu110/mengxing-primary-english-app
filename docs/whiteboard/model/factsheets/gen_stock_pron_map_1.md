# 事实表 · gen_stock_pron_map_1（生成器导出，逻辑审查对照）

- **th 词组 think、thank、three 与 this、that、mother**（词表）：坑 1 对照：think 一组读 /θ/ 吹气，this 一组读 /ð/ 声带振动；连读句 I think this is a sink. 用以分清 think 与 sink
- **v 与 w 词组 very、van、five 与 we、water、window**（词表）：坑 2 对照：v 用上牙咬下唇，w 嘴唇嘟圆不碰牙；错读对照为 wery good 对 very good
- **尾音词 book、bed、cat**（词表）：坑 3 例词：词尾辅音轻轻收住，不在后面多加一个『呃』；连读组 A big red bag.
- **l 与 n 词组 light、long、lion 与 night、no、nine**（词表）：坑 4 对照：两者舌尖都顶上牙后面，n 让气从鼻子走、l 让气从舌头两边走
- **长短音对 sheep 与 ship、pool 与 pull**（词表）：坑 5 对照：sheep 读 /iː/、ship 读 /ɪ/，pool 读 /uː/、pull 读 /ʊ/；锚例句 The sheep is on the ship.

不变量：
- th 不是 s、也不是 z：舌尖轻放上下牙齿中间往外吹气（本幕坑 1 判据）
- 长元音不只是拖长、嘴形也不一样：sheep 嘴角往两边咧，ship 短促放松，读错会把绵羊说成船（本幕坑 5 判据）
- 五大坑在本幕内封闭：th 夹舌、v 咬唇、尾音收住、l 与 n 分清、长短音换嘴形（本幕一句话洞见与口诀）
- 最小对立的听辨须落到句子层：模型记录的最小对立组含 /ɪ/ 与 /iː/、/θ/ 与 /s/，且每对补语境句对（frameworks_fixes MINIMAL_PAIRS_DB 库级）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。