# Europe 溯源幕 · 带时间码分镜（对齐 port v2 样板幕）

> 案例：`src/cases/wo_europe.js`；出处：`SOURCES.md`「溯源幕 ②」。逐条时间码由 `src/export_storyboard.py wo_europe` 从实际时间轴导出（`D.finish(.42)` 之后；朗读按预留时长估算，真实播放时时间轴跟着语音事件走）。
> 规则：R2（每个英文词/词块单独朗读 + 例句）、R3（名字来源三种说法全部 ❓；神话 📜 + ✂️）、R4（动作词由人/场景演出来）、V1–V8、M1–M12。

**一句话洞见**：一块大陆的名字，背后有一个神话；名字到底怎么来的有好几种说法（❓）——神话今天还在给卫星、纸币取名。

## 镜头总表

| 镜头（5 步） | 焦点（M11 单焦点） | 讲解员小人 | 场景角色与动作词（R4） | 深度层 |
|---|---|---|---|---|
| 片头 | 标题卡「Europe 欧罗巴」+ 📜 ✂️ ❓ | 走进来 → 挥手 | — | — |
| ① 地图 | 地中海三块大陆 → Europe 标签 → 提尔 → 克里特岛航线（虚线箭头） | 指 Europe、指克里特岛、思考「为什么叫 Europe？」 | — | L1 |
| ② 场景 | 古希腊神话：公主采花 → 白牛走来 → 公主骑上牛背 → 白牛游过大海到克里特岛 | 白牛出现时惊讶；看着白牛游；点头 | picks：公主伸手拿花（take）；rides：公主跳上牛背、坐着（sit）；swims：白牛驮着公主游过大海（场景：身体起伏前进、腿藏进水里） | L2 |
| ③ 词族-1 | Europa → Europe（最后一个字母变身）；三张卡片：① 公主的名字 ② eurys + ops「宽脸」③「太阳落下的地方」，每张 ❓ | 指单词；思考 3 秒；点头 | — | L2 + 严谨 |
| ③ 词族-2 | Europe + -an = European；Euro- → euro 欧元 | 指 European；举 euro 词卡 | have：讲解员举起 euro 词卡 | **L3** |
| ④ 彩蛋 | 木星的卫星 Europa（绕木星转）；欧元纸币水印里的 Europa 头像 | 指卫星、指纸币 | — | L3 |
| ⑤ 中文 | 利玛窦 1602《坤舆万国全图》：Eu·ro·pa → 欧·逻·巴（音译）；欧罗巴洲 → 欧洲 | 指「欧洲」 | — | **L4** |
| 🔮 预测 | Europe + -an = European；Africa + -an = ？→ African | 思考 3 秒 → 欢呼 | — | **L4** |
| 收尾 | 金句卡（洞见 + 口诀） | 得意 + 点头 | — | — |

## 英文词清单（R2，`r2check.py wo_europe --strict` 12/12 ✔）

| 词 / 词块 | 单独朗读 | 例句 |
|---|---|---|
| Europe 🥚 | ✔ | Rome is in Europe. |
| Europa | ✔ | Europa is a princess. / Europa is also a moon. |
| eurys、ops（希腊语词块） | ✔ | Eurys means wide, and ops means face. |
| -an（词尾） | ✔ | European means from Europe. |
| European 🥚 | ✔ | She is a European girl. |
| euro 🥚（Euro-） | ✔ | I have one euro. |
| Eu、ro、pa（音节） | ✔ | Europa is a name from a story. |
| Africa 🥚 | ✔ | Africa is very big. |
| African 🥚 | ✔ | She is an African girl. |
| （无单词、只演动作的句子） | — | She picks flowers by the sea. / She rides on the white bull. / The bull swims across the sea. |

## 动作词清单（R4，4/4 ✔，都和朗读时间重叠）

| 动作词 | 演员 | 动作（动作库） |
|---|---|---|
| picks | 公主（新 look：princess） | take（拿起道具 flower） |
| rides | 公主 | jump → sit（新动作：坐 / 骑） |
| swims | 白牛（场景，`k.actFx`） | 牛身沿海面起伏前进、腿淡出藏进水里 |
| have | 讲解员 | holdCard（举 euro 词卡） |

## 四层 × 四关 + 听读关 自查

| 项 | 结果 |
|---|---|
| L1 是什么 | Europe = 欧洲（地图） ✔ |
| L2 为什么 | 神话公主 Europa 被白牛驮到克里特岛；名字来历三种说法 ❓ ✔ |
| L3 怎么推 | Europe + -an → European；Euro- → euro ✔ |
| L4 我会用 | 🔮 Africa + -an = African；中文「欧罗巴洲 → 欧洲」音译对照 ✔ |
| 静音关 | 只看动作：公主采花、骑牛、游过海；字母 a 变 e；三张问号卡 ✔ |
| 一句话关 | 金句卡洞见 ✔ |
| 预测关 | Africa + -an 停 3 秒再揭晓 ✔ |
| 严谨关 | 名字来源 ❓ ×3（卡片 + 片头徽章 + 结论条）；神话 📜 + ✂️；-an ✂️（其实经法语、拉丁语）；中文对照 💡「不是词源」；每个 📜 在 SOURCES.md 有网址 ✔ |
| 听读关 | 13 句朗读，单词先读、句子后读 ✔ |
| 中立口吻 | 神话按「故事」讲，原故事的「劫走」简化为「驮过大海」（✂️） |

## 逐条时间码

| 时间 | 类型 | 内容 |
|---|---|---|
| 0:00.0 | 字幕 | 这一幕：Europe（欧洲）这个名字，是从哪儿来的？ |
| 0:00.1 | 🎭 动作 | narrator · walk 1.6s |
| 0:01.8 | 🎭 动作 | narrator · wave 1.8s |
| 0:07.4 | 字幕 | 可信度徽章：📜 = 查得到出处；✂️ = 为小朋友讲简单了；❓ = 有好几种说法，没有定论。 |
| 0:09.6 | 字幕 | 地图：地中海北边是欧洲，南边是非洲，东边是亚洲。 |
| 0:13.6 | 🎭 动作 | narrator · point 2.4s |
| 0:16.4 | 🔊 朗读 | Rome is in Europe.  〔先读：Europe〕 (3.0s) |
| 0:19.7 | 字幕 | 公主的家：神话里，公主欧罗巴住在地中海东岸的提尔城（今天的黎巴嫩）。 |
| 0:21.9 | 字幕 | 克里特岛：她后来到了海中间的克里特岛——等会儿看她是怎么过去的。 |
| 0:22.6 | 🎭 动作 | narrator · point 1.9s |
| 0:24.1 | 字幕 | 问题：这块大陆为什么叫 Europe？先听一个古希腊神话。 |
| 0:25.0 | 🎭 动作 | narrator · think 2.2s |
| 0:26.4 | 🧽 转场 | 板擦擦除 1.15s |
| 0:27.9 | 字幕 | 神话：这是古希腊神话（古书里有记载，但不是真事）：公主欧罗巴在海边采花。 |
| 0:32.0 | 🔊 朗读 | Europa is a princess.  〔先读：Europa〕 (3.0s) |
| 0:32.0 | 🎭 动作 | princess · wave 3.0s |
| 0:35.2 | 🎭 动作 | princess · take 1.2s 〔picks〕 |
| 0:35.3 | 🔊 朗读 | She picks flowers by the sea. (3.0s) |
| 0:38.5 | 字幕 | 白牛：这时，一头雪白、温顺的公牛走了过来（神话里，它是宙斯变的）。 |
| 0:40.4 | 🎭 动作 | narrator · surprised 1.2s |
| 0:41.9 | 🎭 动作 | princess · walk 0.9s |
| 0:42.0 | 🔊 朗读 | She rides on the white bull. (3.0s) |
| 0:42.9 | 🎭 动作 | princess · jump 0.8s |
| 0:43.2 | 🎭 动作 | princess · sit 11.5s 〔rides〕 |
| 0:45.1 | 🎭 动作 | 场景 · 白牛驮着公主游过大海 5.6s 〔swims〕 |
| 0:45.3 | 字幕 | 游过大海：白牛驮着公主跳进大海，一直往西游，游到了克里特岛。 |
| 0:45.3 | 🔊 朗读 | The bull swims across the sea. (3.0s) |
| 0:50.9 | 字幕 | 到了：在克里特岛，公主成了那里的第一位王后（神话）。 |
| 0:51.9 | 🎭 动作 | narrator · nod 0.8s |
| 0:53.3 | 🧽 转场 | 板擦擦除 1.15s |
| 0:54.9 | 字幕 | 名字：公主叫 Europa，大陆叫 Europe：只差最后一个字母。 |
| 0:55.4 | 🎭 动作 | narrator · point 1.4s |
| 0:57.6 | 字幕 | 可是：这个名字到底是什么意思？学者有好几种说法，谁也没法证明——所以每种都打上 ❓。 |
| 1:00.2 | 🎭 动作 | narrator · think 3.4s |
| 1:06.0 | 🔊 朗读 | Eurys means wide, and ops means face.  〔先读：eurys ops〕 (4.7s) |
| 1:12.1 | 字幕 | 结论：三种说法都有人讲，都没有定论。好故事 ≠ 真历史，查证很重要！ |
| 1:12.8 | 🎭 动作 | narrator · nod 0.8s |
| 1:13.8 | 🧽 转场 | 板擦擦除 1.15s |
| 1:15.3 | 字幕 | 一家人：Europe 还长出了自己的小家族：加上词尾 -an，就是「欧洲的、欧洲人」。 |
| 1:19.1 | 🔊 朗读 | European means from Europe.  〔先读：an〕 (3.0s) |
| 1:19.1 | 🎭 动作 | narrator · point 1.6s |
| 1:22.4 | 🔊 朗读 | She is a European girl.  〔先读：European〕 (3.5s) |
| 1:26.1 | 字幕 | 欧元：Euro- 就是「欧洲」：欧洲很多国家一起用的钱，叫 euro（欧元），1996 年定的名字。 |
| 1:28.0 | 🎭 动作 | narrator · holdCard 3.5s 〔have〕 |
| 1:28.3 | 🔊 朗读 | I have one euro.  〔先读：euro〕 (3.0s) |
| 1:31.6 | 字幕 | 一个名字，长出「欧洲的、欧洲人、欧元」一家子。 |
| 1:32.8 | 🧽 转场 | 板擦擦除 1.15s |
| 1:34.2 | 字幕 | 彩蛋：神话今天还在给新东西取名：木星有一颗卫星，就叫 Europa（欧罗巴）。 |
| 1:36.5 | 🎭 动作 | narrator · point 2.6s |
| 1:36.7 | 🔊 朗读 | Europa is also a moon. (2.6s) |
| 1:39.5 | 字幕 | 欧元纸币：新版欧元纸币叫「Europa 系列」，水印里藏着公主欧罗巴的头像。 |
| 1:41.8 | 🎭 动作 | narrator · point 1.6s |
| 1:42.4 | 字幕 | 一个三千年前的神话，今天还在给卫星、纸币取名。 |
| 1:44.1 | 🧽 转场 | 板擦擦除 1.15s |
| 1:45.6 | 字幕 | 中文：中文「欧洲」从哪来？1602 年，意大利人利玛窦在北京刻印世界地图《坤舆万国全图》。 |
| 1:47.8 | 字幕 | 照着声音翻：Eu、ro、pa → 欧、逻、巴：照着声音翻译，叫「音译」。今天写作「欧罗巴」。 |
| 1:51.0 | 🔊 朗读 | Europa is a name from a story.  〔先读：Eu ro pa〕 (5.2s) |
| 1:56.5 | 字幕 | 简称：欧罗巴洲，后来简称「欧洲」。 |
| 1:57.1 | 🎭 动作 | narrator · point 1.4s |
| 1:60.0 | 字幕 | 预测：考考你：Europe + -an = European。那 Africa（非洲）+ -an = ？先想 3 秒！ |
| 1:60.0 | 🔊 朗读 | Africa is very big.  〔先读：Africa〕 (3.0s) |
| 2:04.9 | 🎭 动作 | narrator · think 3.1s |
| 2:07.9 | 字幕 | 揭晓：African = 非洲的、非洲人。规律用上了！ |
| 2:08.1 | 🎭 动作 | narrator · cheer 1.3s |
| 2:10.7 | 🔊 朗读 | She is an African girl.  〔先读：African〕 (3.5s) |
| 2:14.4 | 字幕 | 口诀：公主骑白牛，名字打问号；加上 -an，就是「哪儿的人」！ |
| 2:20.0 | 🎭 动作 | narrator · nod 1.0s |

