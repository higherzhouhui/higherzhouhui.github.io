import styled from 'styled-components';
export const AppContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  //background一定要在image上面，当图片未加载出来的时候使用，该颜色与背景图的颜色相近，视觉上没那么大的反差
  background: rgb(17, 22, 30);
  background-image: url('https://pd1.oss-accelerate.aliyuncs.com/official/capsid/image/background.png');
  background-size: contain;
  .background {
    width: 100%;
    height: 100%;
  }
  .wrapperbg {
    opacity: 0;
  }
`;
