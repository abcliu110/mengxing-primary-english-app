# 事实表 · gen_boundedness_1（生成器导出，逻辑审查对照）

- **coffee**（substance）：壶 → 倒成一摊（还是 coffee）→ 装杯（借 cup 数）
- **apple**（unit）：整只（an apple）→ 切开 = 两半（不再是『一个苹果』）
- **bread**（substance）：整块 → 切开 = 两块（每块仍是 bread）
- **milk / paper / homework**（substance）：借 glass / piece 数；homework 为一类事，无单位可借时不加 -s
- **rice**（substance）：借 bowl 数；颗粒形态不改变其『一摊』看法（xc-rice-grains）

不变量：
- 切分不产生新的整只：一个苹果只能得到两半
- -s 只落在单位/容器词（pieces / bowls / cups）上，永不落在物质词上
- 计数徽章只由容器产生；物质本身无徽章
- 先借单位，后计数（因果顺序）
- 倒水必须从壶嘴出：茶壶为元素库道具 teapot（定义 model/props/teapot.yaml，渲染/锚点几何/断言在共享模块 v5/props/props.js，本幕只消费不私存几何）；液柱原点恒为锚点 spoutTip 经当前倾角实算的世界坐标（props.tipAt）；壶嘴仰角设计 38°/路径实算 38.0°、全倾角由参数反算 = 73°、净下倾 35°，出流全程（M0+1.05…M0+5.0）≥30° 由 props.assertPourWindow 构建期断言（不过停建）；停水（M0+5.0）后才回正（M0+5.2 起）；全倾时嘴尖约 (806,381)，液柱竖直落入咖啡滩 (806,~776)（器物因果保真）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。