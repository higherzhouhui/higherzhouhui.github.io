/* eslint-disable react/display-name */
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {FC, memo, useContext, useEffect, useRef, useState} from 'react';

import {DropDown} from '../dropdown';

import {HeaderContainer, Modal, ProductList} from '@/components/header/style';
import {AppContext, MyScale} from '@/pages/_app';
import {LayoutZIndex} from '@/styles/home';
import {SvgIcon} from '@/uikit';
import {Event} from '@/util';
const Drawer = dynamic(import('@/uikit/components/Drawer/Drawer'), {
  ssr: false,
});
export const Header: FC = memo(() => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isShow, setIsshow] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // 使用上下文,接收缩放比
  const myScale = useContext(AppContext);
  // 播放
  const handleAudioPlayClick = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
      setIsPlay(true);
    }
  };
  // 暂停
  const handleAudioStopClick = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlay(false);
    }
  };
  const click = () => {
    handleAudioPlayClick();
    Event.emit('firstClick', {hide: true});
    document.removeEventListener('click', click);
  };
  const onClose = () => {
    setIsshow(false);
  };

  const clickCommingBtn = () => {
    setIsshow(true);
  };
  useEffect(() => {
    document.addEventListener('click', click);
  }, []);

  return (
    <HeaderContainer {...myScale}>
      <div className='logoContainer'>
        <Link passHref href='/'>
          <a>
            <SvgIcon height='100%' name='logo' width='100%' />
          </a>
        </Link>
      </div>
      {myScale.width > 700 ? (
        <div className='menu'>
          <div className='menu-item'>
            <a className='wordStyle' href='/'>
              Home
            </a>
            <div className='divison' />
          </div>
          <div className='menu-item'>
            <a
              className='wordStyle'
              href='https://capsid.gitbook.io/capsid-token/'
              rel='noreferrer'
              target='_blank'
            >
              Docs
            </a>
            <div className='divison' />
          </div>

          <DropDown
            OptionsNode={<ProductComp showMenu onClick={clickCommingBtn} />}
          >
            <div className='menu-item'>
              <span className='wordStyle'>Products</span>
            </div>
          </DropDown>

          {/* <div
            className='menu-item wordStyle'
            onClick={() => {
              setIsshow(true);
            }}
          >
            Products
            <div className='divison' />
          </div> */}
        </div>
      ) : (
        <div className='headerPhone'>
          <div
            className='foldmenu'
            onClick={() => {
              setDrawer(true);
            }}
          >
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
      <Drawer
        getContainer={document.getElementById('root')}
        scaley={myScale.y}
        visible={drawer}
        width={myScale.width}
        zIndex={LayoutZIndex.Drawer}
        onClose={() => {
          setIsshow(false);
          setDrawer(false);
        }}
      >
        <div className='close'>
          <svg
            className='closesvg'
            data-rnw-int-class='nearest___322-1764_'
            preserveAspectRatio='xMidYMid meet'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            onClick={() => {
              setDrawer(false);
            }}
          >
            <path d='M18 6L6 18M6 6l12 12' />
          </svg>
        </div>
        <div className='content'>
          <a className='column' href='/'>
            Home
          </a>
          <a
            className='column'
            href='https://capsid.gitbook.io/capsid-token/'
            rel='noreferrer'
            target='_blank'
          >
            Docs
          </a>
          <div
            className='productMenu'
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <span>Product</span>
            <SvgIcon
              className={showMenu ? 'up' : 'down'}
              height='18px'
              name='arrow'
              width='18px'
            />
          </div>
          <ProductComp showMenu={showMenu} onClick={clickCommingBtn} />
        </div>
        {isShow ? <ModalComp myScale={myScale} onClose={onClose} /> : null}
      </Drawer>
      <div className='sound'>
        {isPlay ? (
          <SvgIcon
            height='100%'
            name='sound'
            width='100%'
            onClick={handleAudioStopClick}
          />
        ) : (
          <SvgIcon
            height='100%'
            name='noSound'
            width='100%'
            onClick={handleAudioPlayClick}
          />
        )}
        <audio
          controls
          loop
          ref={audioRef}
          src='https://pd1.oss-accelerate.aliyuncs.com/official/capsid/video/bg.mp4'
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
      </div>
      {isShow ? <ModalComp myScale={myScale} onClose={onClose} /> : null}
    </HeaderContainer>
  );
});

type ModalCompProps = {
  onClose: () => void;
  myScale: MyScale;
};
const ModalComp: FC<ModalCompProps> = memo(({onClose, myScale}) => {
  return (
    <Modal {...myScale}>
      <div className='mask' onClick={onClose} />
      <div className='content'>
        <Image
          alt='commming'
          height={96 * myScale.y}
          src='/static/images/comming.png'
          width={96 * myScale.y}
        />
        <span>coming soon...</span>
      </div>
    </Modal>
  );
});
type ProductListCompProps = {
  onClick: () => void;
  showMenu: boolean;
};
const ProductComp: FC<ProductListCompProps> = memo(({onClick, showMenu}) => {
  return (
    <ProductList
      style={{
        height: showMenu ? '120px' : 0,
      }}
    >
      <a
        className='child'
        href='https://area42.capsid.one/'
        rel='noreferrer'
        target='_blank'
      >
        Area 42
      </a>
      <a
        className='child'
        href='https://pd-1st.com/'
        rel='noreferrer'
        target='_blank'
      >
        PD-1
      </a>
      <a
        className='child'
        href='https://anft.capsid.one/'
        rel='noreferrer'
        target='_blank'
      >
        Proof of Rights
      </a>
      {/* <div className='child' onClick={onClick}>
        Proof of Rights
      </div> */}
    </ProductList>
  );
});
Header.displayName = 'Header';
export default Header;
