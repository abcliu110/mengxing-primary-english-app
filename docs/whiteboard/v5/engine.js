// v5 共享引擎（全 App 只存一份）：wb5 / auto / adj_train / concept / oral / poly / 播放器 / 字体。各幕的场景脚本只带自己的数据，运行时从 globalThis.__WB5__ 取引擎。
import * as wb5 from './wb5.js';
import * as auto from './scenes/auto.js';
import * as adj_train from './scenes/adj_train.js';
import * as concept from './lib/concept.js';   // 决策 38：概念原语 + 口语版式也进共享引擎（每幕各带一份时 144 口语幕多 1.2 MB）
import * as oral from './scenes/oral.js';
import * as poly from './scenes/poly.js';   // 决策 38 第 10 幕：一词多义 51 幕版式也进共享引擎
import './player.js';
globalThis.__WB5__ = { wb5, auto, adj_train, concept, oral, poly };
