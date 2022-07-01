import {FC, memo, useContext, useEffect, useState} from 'react';

import {ToolTip} from './style';

import {AppContext} from '@/pages/_app';
import {SvgIcon} from '@/uikit';

export const ToolTipComp: FC = memo(() => {
  const [curPos, setCurPos] = useState({
    left: -500,
    top: -500,
  });
  // 使用上下文,接收缩放比
  const myScale = useContext(AppContext);
  const mouseMove = (e: any) => {
    if (e instanceof MouseEvent) {
      const root = document.getElementById('root');
      const left = (e.pageX + 10) * myScale.x;
      const top = (e.pageY + 10) * myScale.y;
      setCurPos({left, top});
    }
  };
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.addEventListener('mousemove', mouseMove);
    }
    return () => {
      if (root) {
        root.removeEventListener('mousemove', mouseMove);
      }
    };
  }, []);

  return (
    <ToolTip
      {...{left: curPos.left, top: curPos.top, x: myScale.x, y: myScale.y}}
    >
      <div className='svg'>
        <SvgIcon height={16 * myScale.x} name='sound' width={16 * myScale.x} />
      </div>
      <div className='text'>Click anywhere to play music</div>
    </ToolTip>
  );
});

ToolTipComp.displayName = 'ToolTipComp';
export default ToolTipComp;
