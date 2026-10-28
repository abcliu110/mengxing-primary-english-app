import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, staticFile} from 'remotion';
// @ts-ignore
import {renderTakeOff} from './takeoffScene.js';
const A = {hot: staticFile('to/to_hot.webp'), off1: staticFile('to/to_off1.webp'), off2: staticFile('to/to_off2.webp'), done: staticFile('to/to_done.webp'), plane: staticFile('to/to_plane.webp')};
export const TakeOff: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background:'#fff'}} dangerouslySetInnerHTML={{__html: renderTakeOff(f / fps, A)}} />;
};
