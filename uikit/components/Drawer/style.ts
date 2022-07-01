import styled, {css} from 'styled-components';

import {DrawerContainerProps, DrawerContentContainerProps} from './types';

import {handleToPx} from '@/util';

const getPlacement = ({placement}: DrawerContentContainerProps) => {
  if (placement === 'left') {
    return css`
      left: 0;
      top: 0;
    `;
  }
  if (placement === 'right') {
    return css`
      right: 0;
      top: 0;
    `;
  }
};

export const DrawerContainer = styled.div<DrawerContainerProps>`
  width: ${({visible}) => (visible ? '100%' : '0')};
  top: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  z-index: ${({zIndex}) => (zIndex ? zIndex : '10')};
  position: fixed;
  ${getPlacement};
`;

export const DrawerMaskContainer = styled.div<DrawerContainerProps>`
  width: ${({visible}) => (visible ? '100%' : '0')};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
`;

export const DrawerContentContainer = styled.div<DrawerContentContainerProps>`
  width: ${({width, visible}) => (width && visible ? handleToPx(width) : '0')};
  opacity: ${({visible}) => (visible ? 1 : 0)};
  position: absolute;
  height: 100%;
  transition: all 0.3s;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(255 255 255, 0.2);
  ${getPlacement};
  overflow: hidden;
  background: rgba(19, 25, 32, 1);
  .close {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #fff;
    padding: 20px 20px;
    box-sizing: border-box;
  }
  .closesvg {
    display: block;
    float: right;
    width: 20px;
    height: 20px;
    color: #fff;
  }
  .content {
    padding-top: 10px;
  }
  .column {
    width: 100%;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: #fff;
    font-size: 16px;
    font-family: 'Alibaba-Medium';
    justify-content: space-between;
    position: relative;
    background: rgb(19, 25, 32);
    :hover {
      background: #383535;
    }
  }
  .productMenu {
    width: 100%;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: #fff;
    font-size: 16px;
    font-family: 'Alibaba-Medium';
    justify-content: space-between;
    position: relative;
    background: rgb(19, 25, 32);
  }
  .up {
    animation: up 0.5s forwards;
  }
  .down {
    animation: down 0.5s forwards;
  }
  @keyframes up {
    0% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(0);
    }
  }
  @keyframes down {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(-90deg);
    }
  }
`;
