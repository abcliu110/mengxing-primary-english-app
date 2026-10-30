import React, { useEffect, useRef, useState } from 'react';
import { useCurrentFrame, useVideoConfig, delayRender, continueRender, staticFile } from 'remotion';
import { drawFrame, loadAssets, W, H } from './scene.js';
let ready = null;
export const TakeOut = ({ fontUrls }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const ref = useRef(null); const [ok, setOk] = useState(false);
  const [handle] = useState(() => delayRender('assets'));
  useEffect(() => {
    ready = ready || loadAssets(fontUrls || { wk: staticFile('wk.woff'), kalam: staticFile('kalam.woff') });
    ready.then(() => { setOk(true); continueRender(handle); });
  }, []);
  useEffect(() => { if (ok && ref.current) drawFrame(ref.current.getContext('2d'), frame / fps); }, [ok, frame]);
  return <canvas ref={ref} width={W} height={H} style={{ width: '100%', height: '100%' }} />;
};
