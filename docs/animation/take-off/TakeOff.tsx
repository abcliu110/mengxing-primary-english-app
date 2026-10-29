import React, {useEffect, useState} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, staticFile, delayRender, continueRender, cancelRender} from 'remotion';
// @ts-ignore
import {renderTakeOff} from './takeoffScene.js';

const A = {
  hot: staticFile('to/to_hot.webp'),
  off1: staticFile('to/to_off1.webp'),
  off2: staticFile('to/to_off2.webp'),
  done: staticFile('to/to_done.webp'),
  plane: staticFile('to/to_plane.webp'),
};

// SVG <image> 是通过 innerHTML 插进去的，Remotion 不会等它。
// 先用 delayRender 把所有图片下载并解码好，再开始逐帧渲染，避免开头几帧没有人物。
export const TakeOff: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [handle] = useState(() => delayRender('预加载 take off 姿势图'));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all(
      Object.values(A).map((src) => {
        const img = new Image();
        img.src = src;
        return img.decode();
      })
    )
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, [handle]);

  if (!ready) return <AbsoluteFill style={{background: '#fff'}} />;
  return <AbsoluteFill style={{background: '#fff'}} dangerouslySetInnerHTML={{__html: renderTakeOff(f / fps, A)}} />;
};
