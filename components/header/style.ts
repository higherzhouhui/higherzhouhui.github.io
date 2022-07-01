import styled from 'styled-components';

import {MyScale} from '@/pages/_app';
import {LayoutZIndex} from '@/styles/home';
export const HeaderContainer = styled.div.attrs((props: MyScale) => ({
  style: {
    padding: `0 ${props.width < 700 ? props.x * 80 : props.x * 120}px`,
    height: `${props.y * 72}px`,
  },
}))`
  display: flex;
  position: fixed;
  width: 100%;
  z-index: ${LayoutZIndex.Header};
  left: 0;
  top: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  .logoContainer {
    width: ${(props: MyScale) => `${props.y * 120}px`};
    height: ${(props: MyScale) => `${props.y * 24}px`};
    position: relative;
    a {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .menu {
    width: ${(props: MyScale) => `${props.x * 330}px`};
    height: ${(props: MyScale) => `${props.y * 26}px`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: ${(props: MyScale) => `${props.x * 100}px`};
    .menu-item {
      position: relative;
      height: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover .divison {
        opacity: 1;
      }
    }
    .divison {
      opacity: 0;
      position: absolute;
      width: ${(props: MyScale) => `${props.x * 16}px`};
      height: 2px;
      background: #53b7ff;
      border-radius: ${(props: MyScale) => `${props.x * 10}px`};
      top: ${(props: MyScale) => `${props.y * 30}px`};
      left: 50%;
      transform: translateX(-50%);
    }
    .wordStyle {
      color: #fff;
      font-size: ${(props: MyScale) => `${props.y * 18}px`};
      font-family: 'Alibaba-Regular';
      display: inline;
    }
  }
  .sound {
    cursor: pointer;
    width: ${(props: MyScale) => `${props.y * 20}px`};
    height: ${(props: MyScale) => `${props.y * 20}px`};
    position: absolute;
    right: ${(props: MyScale) =>
      `${props.width > 700 ? props.x * 120 : props.x * 200}px`};
    top: 50%;
    transform: translateY(-50%);
  }
  .headerPhone {
    display: flex;
    justify-content: space-between;
    width: ${(props: MyScale) => `${props.y * 26}px`};
    height: ${(props: MyScale) => `${props.y * 26}px`};
    .foldmenu {
      width: ${(props: MyScale) => `${props.y * 20}px`};
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      cursor: pointer;
      div {
        width: ${(props: MyScale) => `${props.y * 20}px`};
        height: 1px;
        background: #fff;
      }
    }
  }
`;

export const Modal = styled.div.attrs((props: MyScale) => ({}))`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: ${LayoutZIndex.Modal};
  .mask {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(17, 21, 26, 0.8);
  }
  .content {
    width: ${(props: MyScale) => `${props.y * 586}px`};
    height: ${(props: MyScale) => `${props.y * 357}px`};
    max-width: 70vmin;
    max-height: 70vmin;
    background: #101217;
    border-radius: ${(props: MyScale) => `${props.x * 16}px`};
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  span {
    font-size: ${(props: MyScale) => `${props.y * 20}px`};
    font-family: 'Alibaba-Medium';
    line-height: ${(props: MyScale) => `${props.y * 30}px`};
    color: #2590ff;
  }
`;

export const ProductList = styled.div`
  transition: all 0.5s;
  overflow: hidden;
  background: rgb(19, 25, 32);
  width: 140px;
  @media (max-width: 700px) {
    width: 100%;
  }
  .child {
    width: 100%;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    font-family: 'Alibaba-Regular';
    position: relative;
    border-bottom: 1px solid #555;
    @media (max-width: 700px) {
      background: rgba(255, 255, 255, 0.1);
    }
    box-sizing: border-box;
    :hover {
      background: #383535;
    }
    :last-child {
      border-bottom: none;
    }
  }
`;
