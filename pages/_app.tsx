import dynamic from 'next/dynamic';
import Head from 'next/head';
import {createContext, useEffect, useState} from 'react';

import type {AppProps} from 'next/app';

import ToolTipComp from '@/components/tooltip';
import {AppContainer} from '@/styles/app';
import {GlobalStyle} from '@/styles/globals';
import {Event, useDebounce} from '@/util';
const Header = dynamic(import('@/components/header'), {
  ssr: false,
});
export interface MyScale {
  x: number;
  y: number;
  width: number;
  height: number;
}
const defaultScale = {
  x: 1,
  y: 1,
  width: 1440,
  height: 900,
};
// 创造一个上下文
export const AppContext = createContext<MyScale>(defaultScale);

function MyApp({Component, pageProps}: AppProps) {
  const [showToolTip, setshowToolTip] = useState(true);
  const [scale, setScale] = useState<MyScale>(defaultScale);
  const [show, setShow] = useState(false);
  const [onResize] = useDebounce(
    () => {
      const math2bit = (num: number) => {
        const scale = Math.round(100 * num) / 100;
        return scale;
      };
      const root = document.getElementById('root');
      if (root) {
        let cx = root.clientWidth / 1440;
        if (cx > 1) {
          cx = (cx - 1) * 0.8 + 1;
        } else if (cx < 1) {
          cx = 1 - (1 - cx) * 0.8;
        }
        let cy = root.clientHeight / 900;
        if (cy > 1) {
          cy = (cy - 1) * 0.8 + 1;
        } else if (cy < 1) {
          cy = 1 - (1 - cy) * 0.8;
        }
        const sclae = {
          x: math2bit(cx),
          y: math2bit(cy),
          width: root.clientWidth,
          height: root.clientHeight,
        };
        setScale(sclae);
        // setScale后内容会根据屏幕的尺寸做出改变，避免闪动
        if (!show) {
          setTimeout(() => {
            setShow(true);
          }, 300);
        }
      }
    },
    300,
    []
  );
  useEffect(() => {
    Event.addListener('firstClick', () => {
      setshowToolTip(false);
    });
    onResize();
    window.addEventListener('resize', onResize);
  }, [onResize]);
  return (
    <AppContext.Provider value={scale}>
      <AppContainer id='root'>
        <Head>
          <title>Capsid</title>
          <meta content='width=device-width, initial-scale=1' name='viewport' />
        </Head>
        <GlobalStyle />
        <div className={`background ${show ? '' : 'wrapperbg'}`}>
          <Header />
          <Component {...pageProps} />
        </div>
        {showToolTip ? <ToolTipComp /> : null}
      </AppContainer>
    </AppContext.Provider>
  );
}

export default MyApp;
