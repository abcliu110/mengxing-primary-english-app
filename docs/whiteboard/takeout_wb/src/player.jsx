import React from 'react';
import { createRoot } from 'react-dom/client';
import { Player } from '@remotion/player';
import { TakeOut } from './TakeOut.jsx';
import { FPS, DUR, W, H } from './scene.js';
import wk from '../public/wk.woff';
import kalam from '../public/kalam.woff';
const App = () => <Player component={TakeOut} inputProps={{ fontUrls: { wk, kalam } }} durationInFrames={Math.round(DUR * FPS)} fps={FPS}
  compositionWidth={W} compositionHeight={H} controls loop autoPlay clickToPlay style={{ width: '100%', aspectRatio: '16/9' }} />;
createRoot(document.getElementById('root')).render(<App />);
