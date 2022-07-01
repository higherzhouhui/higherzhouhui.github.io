import {EventEmitter} from 'events';

import {useRef, useCallback} from 'react';

export const Event = new EventEmitter();

export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  deps: any[]
): [T, () => void] {
  const timer = useRef<number>();
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback((...args: any) => {
    cancel();
    timer.current = window.setTimeout(() => {
      func(...args);
    }, delay);
  }, deps);
  return [run as T, cancel];
}
/**
 * 处理px单位
 */
export const handleToPx = (value: any) => {
  const val = `${value}`;
  const isnum = /^\d+$/.test(val);
  if (isnum) {
    return `${value}px`;
  }
  return value;
};
// 金额千分位逗号隔开格式化
export const formatPrice = (value: any) => {
  if (!value) {
    return value;
  }
  return Number(value).toLocaleString();
};
export const EventUtil = {
  addHandler(element: any, type: any, handler: any) {
    if (element.addEventListener)
      element.addEventListener(type, handler, false);
    else if (element.attachEvent) element.attachEvent(`on${type}`, handler);
    else element[`on${type}`] = handler;
  },
  removeHandler(element: any, type: any, handler: any) {
    if (element.removeEventListener)
      element.removeEventListener(type, handler, false);
    else if (element.detachEvent) element.detachEvent(`on${type}`, handler);
    else element[`on${type}`] = handler;
  },
  /**
   * 监听触摸的方向
   * @param target            要绑定监听的目标元素
   * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
   * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
   * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
   * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
   * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
   */
  listenTouchDirection(
    target: any,
    isPreventDefault: any,
    upCallback: any,
    rightCallback: any,
    downCallback: any,
    leftCallback: any
  ) {
    this.addHandler(target, 'touchstart', handleTouchEvent);
    this.addHandler(target, 'touchend', handleTouchEvent);
    this.addHandler(target, 'touchmove', handleTouchEvent);
    let startX: any;
    let startY: any;
    function handleTouchEvent(event: any) {
      // eslint-disable-next-line default-case
      switch (event.type) {
        case 'touchstart':
          startX = event.touches[0].pageX;
          startY = event.touches[0].pageY;
          break;
        case 'touchend':
          // eslint-disable-next-line no-case-declarations
          const spanX = event.changedTouches[0].pageX - startX;
          // eslint-disable-next-line no-case-declarations
          const spanY = event.changedTouches[0].pageY - startY;

          if (Math.abs(spanX) > Math.abs(spanY)) {
            // 认定为水平方向滑动
            if (spanX > 30) {
              // 向右
              if (rightCallback) rightCallback();
            } else if (spanX < -30) {
              // 向左
              if (leftCallback) leftCallback();
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (spanY > 30) {
              // 向下
              if (downCallback) downCallback();
            } else if (spanY < -30) {
              // 向上
              if (upCallback) upCallback();
            }
          }

          break;
        case 'touchmove':
          // 阻止默认行为
          if (isPreventDefault) event.preventDefault();
          break;
      }
    }
  },
};
