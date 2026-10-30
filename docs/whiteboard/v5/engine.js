// v5 共享引擎（全 App 只存一份）：wb5 / auto / adj_train / 播放器 / 字体。各幕的场景脚本只带自己的数据，运行时从 globalThis.__WB5__ 取引擎。
import * as wb5 from './wb5.js';
import * as auto from './scenes/auto.js';
import * as adj_train from './scenes/adj_train.js';
import './player.js';
globalThis.__WB5__ = { wb5, auto, adj_train };
