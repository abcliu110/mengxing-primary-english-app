import React from 'react';
import { Composition } from 'remotion';
import { TakeOut } from './TakeOut.jsx';
import { FPS, DUR, W, H } from './scene.js';
export const Root = () => <Composition id="TakeOut" component={TakeOut} durationInFrames={Math.round(DUR * FPS)} fps={FPS} width={W} height={H} />;
