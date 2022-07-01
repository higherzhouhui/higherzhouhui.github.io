import styled from 'styled-components';

import {RightSize, BottomSize, NormalSize} from '@/pages';
import {MyScale} from '@/pages/_app';

// 由于有动画采用的是绝对定位，需要定义层级覆盖
export const LayoutZIndex = {
  Star: 9,
  Title: 20,
  Company: 30,
  Craft: 109,
  PD1: 110,
  Logo: 999,
  Header: 1000,
  ArrowDown: 1001,
  Contact: 1100,
  Drawer: 1150,
  Modal: 1200,
  ToolTip: 1300,
};

export const HomeContainer = styled.div<MyScale>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  // 动画更改width、height（变大）、left、top会出现卡顿，官方建议使用transform/translate/scale
  @keyframes stardown2 {
    0% {
      transform: ${(props) =>
        `translate(${
          (props.width - Math.min(NormalSize * props.y, props.width * 0.9)) / 2
        }px, ${
          (props.height - Math.min(NormalSize * props.y, props.width * 0.9)) / 2
        }px)`};
    }
    30% {
      transform: ${(props) =>
        `translate(${
          (props.width - Math.min(NormalSize * props.y, props.width * 0.9)) /
            2 -
          120 * props.x
        }px, ${
          (props.height - Math.min(NormalSize * props.y, props.width * 0.9)) /
            2 +
          70 * props.y
        }px)`};
    }
    100% {
      transform: ${(props) =>
        `translate(${
          props.width - Math.min(NormalSize * props.y, props.width * 0.9) / 2
        }px, ${
          (props.height - Math.min(NormalSize * props.y, props.width * 0.9)) / 2
        }px) scale(${
          props.width * 0.9 > NormalSize * props.y ? RightSize / NormalSize : 1
        })`};
    }
  }
  @keyframes stardown3 {
    0% {
      left: 100%;
      top: 50%;
      width: ${(props) => `${RightSize * props.y}px`};
      height: ${(props) => `${RightSize * props.y}px`};
    }
    30% {
      left: 110%;
      top: 45%;
      border: none;
    }
    100% {
      left: 50%;
      top: 100%;
      width: ${(props) => `${BottomSize * props.y}px`};
      height: ${(props) => `${BottomSize * props.y}px`};
      border: none;
    }
  }
  @keyframes starback1 {
    0% {
      left: 100%;
      top: 50%;
      width: ${(props) => `${RightSize * props.y}px`};
      height: ${(props) => `${RightSize * props.y}px`};
    }
    30% {
      left: 110%;
      top: 45%;
      width: ${(props) => `${RightSize * props.y}px`};
      height: ${(props) => `${RightSize * props.y}px`};
    }
    100% {
      left: 50%;
      top: 50%;
      width: ${(props) => `${NormalSize * props.y}px`};
      height: ${(props) => `${NormalSize * props.y}px`};
    }
  }
  @keyframes starback2 {
    0% {
      left: 50%;
      top: 100%;
      width: ${(props) => `${BottomSize * props.y}px`};
      height: ${(props) => `${BottomSize * props.y}px`};
      border: none;
    }
    30% {
      left: 45%;
      top: 110%;
      width: ${(props) => `${BottomSize * props.y}px`};
      height: ${(props) => `${BottomSize * props.y}px`};
      border: none;
    }
    100% {
      left: 100%;
      top: 50%;
      width: ${(props) => `${RightSize * props.y}px`};
      height: ${(props) => `${RightSize * props.y}px`};
      border: ${(props) => `${props.y * 1}px dashed rgba(255, 255, 255, 0.5)`};
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes descriptiondown3 {
    0% {
      top: ${(props) => `${250 * props.y}px`};
      opacity: 1;
    }
    30% {
      top: ${(props) => `${320 * props.y}px`};
      opacity: 0.8;
    }
    100% {
      opacity: 0;
      top: -50vh;
    }
  }
  @keyframes descriptionback1 {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes descriptionback2 {
    0% {
      opacity: 0;
      top: -50vh;
    }
    100% {
      top: ${(props) => `${250 * props.y}px`};
      opacity: 1;
    }
  }
  .stardefault1 {
    left: 50%;
    top: 50%;
  }
  .starback1 {
    animation: starback1 3s forwards;
  }
  .stardown2 {
    animation: stardown2 3s forwards;
  }
  .starback2 {
    animation: starback2 3s forwards;
  }
  .stardown3 {
    animation: stardown3 3s forwards;
  }
  .logodefault1 {
    opacity: 1;
  }
  .logoback1 {
    opacity: 0;
    animation: fadeIn 2s forwards 1s;
  }
  .logodown2 {
    animation: fadeOut 3s forwards;
  }
  .logoback2 {
    opacity: 0;
  }
  .logodown3 {
    opacity: 0;
  }
  .descriptiondefault1 {
    opacity: 0;
    z-index: 0;
    cursor: default;
  }
  .descriptiondown2 {
    animation: fadeIn 2s forwards 1s;
  }
  .descriptionback1 {
    animation: descriptionback1 3s forwards;
    z-index: 0;
    cursor: default;
  }
  .descriptionback2 {
    animation: descriptionback2 2.5s forwards 0.5s;
  }
  .descriptiondown3 {
    animation: descriptiondown3 3s forwards;
  }
  .companydown3 {
    display: block;
  }
  .companyback2 {
    display: block;
  }
`;

export interface AircraftProps extends MyScale {
  time?: number;
}
export const AircraftComp = styled.div.attrs((props: AircraftProps) => ({
  style: {
    width: `${NormalSize * props.y}px`,
    height: `${NormalSize * props.y}px`,
  },
}))`
  max-width: 90vmin;
  max-height: 90vmin;
  box-sizing: border-box;
  border: ${(props: AircraftProps) =>
    `${props.y * 1}px dashed rgba(255, 255, 255, 0.5)`};
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: ${LayoutZIndex.Star};
  @keyframes spin {
    from {
      transform: rotate(135deg);
    }
    to {
      transform: rotate(-225deg);
    }
  }

  @keyframes dappOutlineAni {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
  .gd {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(1.4);
    top: 0;
    left: 0;
  }
  .gdback2 {
    opacity: 0;
    animation: fadeIn 1s forwards 1.5s;
  }
  .gddown3 {
    animation: fadeOut 1s forwards;
  }
  .dappdefault1 {
  }
  .dappback1 {
  }
  .dappdown2 {
  }
  .dappback2 {
    opacity: 0;
    animation: fadeIn 2s forwards 1s;
  }
  .dappdown3 {
    animation: fadeOut 1s forwards;
  }
  .dapp {
    width: ${(props: AircraftProps) => `${14 * props.y}px`};
    height: ${(props: AircraftProps) => `${14 * props.y}px`};
    background: #fff;
    position: absolute;
    border-radius: 50%;
    z-index: ${LayoutZIndex.PD1};
    transform: translate(-50%, -50%);
    top: ${(props: AircraftProps) =>
      `${((((Math.sqrt(2) - 1) / Math.sqrt(2)) * 1) / 2) * 100}%`};
    left: ${(props: AircraftProps) =>
      `${((((Math.sqrt(2) - 1) / Math.sqrt(2)) * 1) / 2) * 100}%`};
    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      &:hover {
        .content {
          display: block;
          animation: fadeIn 0.8s forwards;
        }
      }
    }
    .outline {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: ${(props: AircraftProps) => `${props.y * 1}px solid #fff`};
      box-sizing: border-box;
      animation: dappOutlineAni 3s infinite;
    }
    .content {
      opacity: 0;
      display: none;
      width: ${(props: AircraftProps) => `${200 * props.x}px`};
      height: ${(props: AircraftProps) => `${70 * props.y}px`};
      position: absolute;
      top: ${(props: AircraftProps) =>
        `${-70 * props.y + (14 * props.y) / 2}px`};
      left: ${(props: AircraftProps) => `${-200 * props.x}px`};
    }
    .xd2 {
      width: ${(props: AircraftProps) =>
        `${(200 * props.x * 2) / 3 - (70 * props.y) / 2}px`};
      height: 0;
      border-bottom: ${(props: AircraftProps) =>
        `${props.y * 2}px dashed #fff`};
      position: absolute;
      bottom: 0px;
      right: 0;
      opacity: 0.5;
    }
    .xd1 {
      width: ${(props: AircraftProps) => `${(1 / 2) * 70 * props.y + 3}px`};
      transform: rotate(45deg);
      height: 0;
      border-bottom: ${(props: AircraftProps) =>
        `${props.y * 2}px dashed #fff`};
      position: absolute;
      bottom: ${(props: AircraftProps) =>
        `${-2 * props.y + (70 * props.y) / 4}px`};
      left: ${(props: AircraftProps) =>
        `${(200 * props.x) / 3 - 4 * props.y}px`};
      opacity: 0.5;
    }
    .text {
      width: ${(props: AircraftProps) => `${(200 * props.x) / 3}px`};
      height: 50%;
      box-sizing: border-box;
      border-radius: ${(props: AircraftProps) => `${5 * props.y}px`};
      border: ${(props: AircraftProps) => `${props.y * 1}px solid #fff`};
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
    }
    a {
      color: #fff;
      text-decoration: none;
      font-size: ${(props: AircraftProps) => `${16 * props.y}px`};
    }
  }
  .rotate {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: ${LayoutZIndex.Craft};
    transform: rotate(135deg);
    animation: ${(props: AircraftProps) =>
      `spin ${props.time || 25}s infinite linear`};
  }
  .rotatedefault1 {
  }
  .rotatedown2 {
    opacity: 0;
  }
  .rotatedown3 {
    opacity: 0;
  }
  .rotateback1 {
    opacity: 1;
  }
  .rotateback2 {
    opacity: 0;
  }
  .aircraft {
    width: ${(props: AircraftProps) => `${40 * props.y}px`};
    height: ${(props: AircraftProps) => `${40 * props.y}px`};
    position: absolute;
    transform: translate(-50%, -50%) rotate(225deg);
    top: ${`${((Math.sqrt(2) - 1) / Math.sqrt(2) / 2) * 100}%`};
    left: ${`${((Math.sqrt(2) - 1) / Math.sqrt(2) / 2) * 100}%`};
  }
  .img {
    width: 91%;
    height: 91%;
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const MiddleLogo = styled.div.attrs((props: MyScale) => ({
  style: {
    width: `${593 * props.y}px`,
    height: `${155 * props.y}px`,
  },
}))`
  max-width: 80vmin;
  max-height: 20vmin;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${LayoutZIndex.Logo};
`;

export const Description = styled.div.attrs((props: MyScale) => ({
  style: {
    left: `${120 * props.x}px`,
    top: `${250 * props.y}px`,
  },
}))`
  opacity: 0;
  position: absolute;
  z-index: ${LayoutZIndex.Title};
  .title {
    width: ${(props: MyScale) => `${766 * props.x}px`};
    line-height: ${(props: MyScale) =>
      `${props.width < 700 ? 40 : 96 * props.y}px`};
    font-size: ${(props: MyScale) => `${64 * props.x}px`};
    font-family: 'Alibaba-Medium'; //张总要求更改（设计是SemBold)
    color: #fff;
  }
  .text {
    margin-top: 23px;
    width: ${(props: MyScale) => `${470 * props.x}px`};
    line-height: ${(props: MyScale) => `${29 * props.y}px`};
    font-size: ${(props: MyScale) => `${16 * props.x}px`};
    font-family: 'Alibaba-Medium';
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const Contact = styled.div.attrs((props: MyScale) => ({
  style: {
    left: `${100 * props.x}px`,
    bottom: `${40 * props.y}px`,
  },
}))`
  z-index: ${LayoutZIndex.Contact};
  position: absolute;
  a {
    margin-top: ${(props: MyScale) => `${20 * props.y}px`};
  }
`;

export const Company = styled.div.attrs((props: MyScale) => ({
  style: {
    top: `${props.width > 700 ? 80 * props.y : 150 * props.y}px`,
  },
}))`
  z-index: ${LayoutZIndex.Company};
  position: absolute;
  width: 100%;
  left: 0;
  display: none;
  @keyframes investorsback2 {
    0% {
      top: 0;
    }
    30% {
      top: ${(props: MyScale) => `${60 * props.y}px`};
    }
    to {
      top: -50vh;
    }
  }
  @keyframes investorsdown3 {
    from {
      top: -50vh;
    }
    to {
      top: 0;
    }
  }
  @keyframes fiveImagesback2 {
    0% {
      left: -0;
    }
    30% {
      left: ${(props: MyScale) => `${-60 * props.x}px`};
    }
    100% {
      left: 100vw;
    }
  }
  @keyframes fiveImagesdown3 {
    from {
      left: 100vw;
    }
    to {
      left: 0;
    }
  }
  @keyframes fiveTextsback2 {
    0% {
      left: 0;
    }
    30% {
      left: ${(props: MyScale) => `${60 * props.x}px`};
    }
    100% {
      left: -100vw;
    }
  }
  @keyframes fiveTextsdown3 {
    from {
      left: -100vw;
    }
    to {
      left: 0;
    }
  }
  .wrapper {
    position: relative;
  }
  .investors {
    font-size: ${(props: MyScale) => `${56 * props.x}px`};
    text-align: center;
    color: #fff;
    font-family: 'Alibaba-Bold';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -50vh;
  }
  .investorsOne {
    top: 0;
  }
  .fiveImages {
    display: flex;
    justify-content: space-around;
    top: ${(props: MyScale) => `${120 * props.y}px`};
    position: absolute;
    width: 100%;
    padding: ${(props: MyScale) =>
      `0 ${props.width > 700 ? 120 * props.x : 10}px`};
    box-sizing: border-box;
    left: 100vw;
    .aimage {
      position: relative;
      width: 20vmin;
      height: 20vmin;
    }
  }
  .fiveImagesOne {
    left: 100vw;
  }
  .fiveTexts {
    display: flex;
    justify-content: space-around;
    top: ${(props: MyScale) =>
      `${props.width > 700 ? 330 * props.y : 250 * props.y}px`};
    left: 0;
    position: absolute;
    width: 100%;
    padding: ${(props: MyScale) =>
      `0 ${props.width > 700 ? 120 * props.x : 10}px`};
    box-sizing: border-box;
    color: #fff;
    opacity: 0.5;
    left: -100vw;
    .atext {
      text-align: center;
      color: #fff;
      flex: 1;
      width: 180px;
    }
    .title {
      line-height: ${(props: MyScale) => `${27 * props.y}px`};
      font-family: 'Alibaba-Bold';
      font-size: ${(props: MyScale) => `${18 * props.x}px`};
    }
    .adescription {
      line-height: ${(props: MyScale) => `${21 * props.y}px`};
      font-family: 'Alibaba-Medium';
      font-size: ${(props: MyScale) => `${14 * props.x}px`};
    }
  }
  .fiveTextsOne {
    left: -100vw;
  }
  .investorsback2 {
    animation: investorsback2 3s forwards;
  }
  .investorsdown3 {
    animation: investorsdown3 3s forwards 0.5s;
  }
  .fiveImagesback2 {
    animation: fiveImagesback2 3s forwards;
  }
  .fiveTextsback2 {
    animation: fiveTextsback2 3s forwards;
  }
  .fiveImagesdown3 {
    animation: fiveImagesdown3 2s forwards 1s;
  }
  .fiveTextsdown3 {
    animation: fiveTextsdown3 2s forwards 1s;
  }
`;

export const DownArrow = styled.div.attrs((props: MyScale) => ({
  style: {
    width: `${16 * props.y}px`,
    height: `${48 * props.y}px`,
    right: `${120 * props.x}px`,
    bottom: `${40 * props.y}px`,
  },
}))`
  position: absolute;
  overflow: hidden;
  z-index: ${LayoutZIndex.ArrowDown};
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    .bg {
      width: ${(props: MyScale) => `${16 * props.y}px`};
      height: ${(props: MyScale) => `${16 * props.y}px`};
      position: relative;
    }
    @keyframes arrow1 {
      0% {
        opacity: 1;
      }
      32% {
        opacity: 1;
      }
      33% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
    .arrow1 {
      opacity: 0;
      animation: arrow1 1.5s infinite;
    }
    @keyframes arrow2 {
      0% {
        opacity: 0;
      }
      33% {
        opacity: 0;
      }
      34% {
        opacity: 1;
      }
      65% {
        opacity: 1;
      }
      66% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
    .arrow2 {
      opacity: 0;
      animation: arrow2 1.5s infinite;
    }
    @keyframes arrow3 {
      0% {
        opacity: 0;
      }
      66% {
        opacity: 0;
      }
      67% {
        opacity: 1;
      }
      99% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    .arrow3 {
      opacity: 0;
      animation: arrow3 1.5s infinite;
    }
  }
`;
