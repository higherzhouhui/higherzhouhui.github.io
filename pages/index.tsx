import Image from 'next/image';
import {FC, useContext, useEffect, useRef, useState} from 'react';

import {AppContext, MyScale} from './_app';

import type {NextPage} from 'next';

import {
  AircraftComp,
  Company,
  Contact,
  Description,
  DownArrow,
  HomeContainer,
  MiddleLogo,
} from '@/styles/home';
import {SvgIcon} from '@/uikit';
import {EventUtil, useDebounce} from '@/util';

export const NormalSize = 656;
export const BottomSize = 800;
export const RightSize = 860;

const Home: NextPage = () => {
  // 当前处于第几页
  let [currentPage, setCurrentPage] = useState(1);
  // 判断是向下还是向上滚动的标志位
  const [scrollDown, setScrollDown] = useState<boolean | null>(null);
  // 获取当前dom节点
  const ref: any = useRef(null);
  // 判断当前是否有动画的标志位，保证动画的顺序执行
  let isAnimation = false;
  // 使用上下文,接收缩放比
  const myScale = useContext(AppContext);
  /**
   * 向下滑动
   */
  const pageDown = () => {
    if (isAnimation) {
      return;
    }
    if (currentPage >= 3) {
      setCurrentPage(3);
    } else {
      currentPage += 1;
      setCurrentPage(currentPage);
      isAnimation = true;
    }
    setScrollDown(true);
  };
  /**
   * 向上滑动
   */
  const pageUp = () => {
    if (isAnimation) {
      return;
    }
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      currentPage -= 1;
      setCurrentPage(currentPage);
      isAnimation = true;
    }
    setScrollDown(false);
  };
  /**
   * 监听mousewheel的变化并使用防抖
   */
  const [scrollRenderHandler] = useDebounce(
    (e: any) => {
      const wheelEv = e as WheelEvent;
      if (wheelEv.deltaY > 0) {
        pageDown();
      }
      if (wheelEv.deltaY < 0) {
        pageUp();
      }
    },
    10,
    []
  );
  useEffect(() => {
    EventUtil.listenTouchDirection(
      document.body,
      true,
      pageDown,
      false,
      pageUp,
      false
    );
    // 滚动滑轮触发scrollFunc方法
    document.addEventListener('mousewheel', scrollRenderHandler);
    if (ref && ref.current) {
      ref?.current.addEventListener('animationend', () => {
        if (isAnimation) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          isAnimation = false;
        }
      });
    }
    return (): void => {
      document.removeEventListener('mousewheel', scrollRenderHandler);
    };
  }, [scrollRenderHandler]);

  return (
    <HomeContainer ref={ref} {...myScale}>
      <StarComp
        className={`star${
          scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
        }${currentPage}`}
        currentPage={currentPage}
        myScale={myScale}
        scrollDown={scrollDown}
      />
      <DescripTionComp
        className={`description${
          scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
        }${currentPage}`}
      />
      <MiddleLogoComp
        className={`logo${
          scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
        }${currentPage}`}
      />
      <ContactComp />
      <CompanyComp
        className={`company${
          scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
        }${currentPage}`}
        currentPage={currentPage}
        scrollDown={scrollDown}
      />
      {currentPage !== 3 ? <DownArrowComp /> : null}
    </HomeContainer>
  );
};

type StarCompProps = {
  className?: string;
  currentPage: number;
  scrollDown: boolean | null;
  myScale: MyScale;
};
const StarComp: FC<StarCompProps> = ({
  className,
  currentPage,
  scrollDown,
  myScale,
}) => {
  return (
    <AircraftComp
      {...{
        x: myScale.x,
        y: myScale.y,
        width: myScale.width,
        height: myScale.height,
      }}
      className={className}
    >
      <div
        className={`dapp dapp${
          scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
        }${currentPage}`}
      >
        <div className='wrapper'>
          <div className='outline' />
          {myScale.width > 700 ? (
            <div className='content'>
              <div className='text'>
                <a href='https://pd-1st.com' rel='noreferrer' target='_blank'>
                  PD-1
                </a>
              </div>
              <div className='xd1' />
              <div className='xd2' />
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`rotate rotate${
          scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
        }${currentPage}`}
      >
        <div className='aircraft'>
          <SvgIcon height='100%' name='aircft' width='100%' />
        </div>
      </div>
      <div className='img'>
        <img
          alt='star'
          height='100%'
          src='/static/images/star.png'
          width='100%'
        />
        <div
          className={`gd gd${
            scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
          }${currentPage}`}
        >
          <SvgIcon height='100%' name='gd' width='100%' />
        </div>
      </div>
    </AircraftComp>
  );
};

type MiddleLogoProps = {
  className?: string;
};
const MiddleLogoComp: FC<MiddleLogoProps> = ({className}) => {
  const myScale = useContext(AppContext);
  return (
    <MiddleLogo className={className} {...myScale}>
      <SvgIcon height='100%' name='logo' width='100%' />
    </MiddleLogo>
  );
};

type DescriptionCompProps = {
  className?: string;
};

const DescripTionComp: FC<DescriptionCompProps> = ({className}) => {
  // 使用上下文,接收缩放比
  const myScale = useContext(AppContext);
  return (
    <Description className={className} {...myScale}>
      <div className='title'>BUILD A SUSTAINABLE NFT ECOSYSTEM</div>
      <div className='text'>
        Capsid is an NFT derivative protocol that empowers NFT owners to issue
        “Rights of Use” to generate income from NFT derivatives & services.
      </div>
    </Description>
  );
};

const ContactComp = () => {
  const myScale = useContext(AppContext);
  return (
    <Contact {...myScale}>
      <a href='https://twitter.com/Capsid_One' rel='noreferrer' target='_blank'>
        <SvgIcon
          height={16 * myScale.y}
          name='twitter'
          width={16 * myScale.y}
        />
      </a>
      <a href='https://t.me/CapsidOne' rel='noreferrer' target='_blank'>
        <SvgIcon
          height={16 * myScale.y}
          name='contact'
          width={16 * myScale.y}
        />
      </a>
      <a href='mailto: contact@capsid.one'>
        <SvgIcon height={16 * myScale.y} name='email' width={16 * myScale.y} />
      </a>
    </Contact>
  );
};

type CompanyCompProps = {
  className?: string;
  currentPage: number;
  scrollDown: boolean | null;
};

const CompanyComp: FC<CompanyCompProps> = ({
  className,
  currentPage,
  scrollDown,
}) => {
  // 使用上下文,接收缩放比
  const myScale = useContext(AppContext);
  return (
    <Company className={className} {...myScale}>
      <div className='wrapper'>
        <div
          className={`investors investors${
            scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
          }${currentPage}`}
        >
          INVESTORS
        </div>
        <div
          className={`fiveImages fiveImages${
            scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
          }${currentPage}`}
        >
          <div className='aimage'>
            <Image
              alt='global'
              layout='fill'
              src='data:image/png;base64,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'
            />
          </div>
          <div className='aimage'>
            <Image
              alt='32bit'
              layout='fill'
              src='data:image/png;base64,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'
            />
          </div>
          <div className='aimage'>
            <Image
              alt='springwind'
              layout='fill'
              src='data:image/png;base64,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'
            />
          </div>
          <div className='aimage'>
            <Image
              alt='xoogler'
              layout='fill'
              src='data:image/png;base64,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'
            />
          </div>
          <div className='aimage'>
            <Image
              alt='mask'
              layout='fill'
              src='data:image/png;base64,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'
            />
          </div>
        </div>
        <div
          className={`fiveTexts fiveTexts${
            scrollDown ? 'down' : scrollDown === null ? 'default' : 'back'
          }${currentPage}`}
        >
          <div className='atext'>
            <p className='title'>Johana</p>
            <p className='adescription'>Partner</p>
            <p className='adescription'>@ Helix Fund</p>
          </div>
          <div className='atext'>
            <p className='title'>Steve</p>
            <p className='adescription'>Co-Founder</p>
            <p className='adescription'>@ Crust Network</p>
          </div>
          <div className='atext'>
            <p className='title'>Joe</p>
            <p className='adescription'>Founder @ Substreight</p>
            <p className='adescription'>Advisor@ YGG</p>
          </div>
          <div className='atext'>
            <p className='title'>Tyler</p>
            <p className='adescription'>Head of Global Business</p>
            <p className='adescription'>@ Huobi</p>
          </div>
          <div className='atext'>
            <p className='title'>David</p>
            <p className='adescription'>COO @ Maple Media</p>
            <p className='adescription'>Ex-Googler</p>
          </div>
        </div>
      </div>
    </Company>
  );
};

const DownArrowComp: FC<DescriptionCompProps> = ({className}) => {
  const myScale = useContext(AppContext);
  return (
    <DownArrow className={className} {...myScale}>
      <div className='wrapper'>
        <div className='content'>
          <div className='bg'>
            <Image
              alt='arrow'
              layout='fill'
              src='/static/images/jiantoub.png'
            />
            <Image
              alt='arrow1'
              className='arrow1'
              layout='fill'
              src='/static/images/jiantou.png'
            />
          </div>
          <div className='bg'>
            <Image
              alt='arrow2'
              layout='fill'
              src='/static/images/jiantoub.png'
            />
            <Image
              alt='arrow'
              className='arrow2'
              layout='fill'
              src='/static/images/jiantou.png'
            />
          </div>
          <div className='bg'>
            <Image
              alt='arrow3'
              layout='fill'
              src='/static/images/jiantoub.png'
            />
            <Image
              alt='arrow'
              className='arrow3'
              layout='fill'
              src='/static/images/jiantou.png'
            />
          </div>
        </div>
      </div>
    </DownArrow>
  );
};

export default Home;
