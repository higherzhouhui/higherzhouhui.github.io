import {FC, memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import {
  DrawerContainer,
  DrawerMaskContainer,
  DrawerContentContainer,
} from './style';
import {DrawerProps} from './types';

const Drawer: FC<DrawerProps> = memo((props) => {
  const {
    destroyOnClose,
    getContainer = document.body,
    mask = true,
    width = '280px',
    zIndex = 2000,
    placement = 'right',
    onClose,
    children,
    scaley = 1,
  } = props;
  const [visible, setVisible] = useState(props.visible || false);
  const [isDesChild, setIsDesChild] = useState(false);

  // 关闭
  const handleClose = () => {
    onClose();
    setVisible((prev) => {
      if (getContainer !== false && prev) {
        getContainer.style.overflow = 'auto';
      }
      return false;
    });
    if (destroyOnClose) {
      setIsDesChild(true);
    }
  };

  useEffect(() => {
    setVisible(props.visible || false);
    setIsDesChild(false);
    if (props.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [props.visible]);

  const DrawDom = (
    <DrawerContainer visible={visible} zIndex={zIndex}>
      {!!mask && (
        <DrawerMaskContainer visible={visible} onClick={handleClose} />
      )}
      <DrawerContentContainer
        placement={placement}
        scaley={scaley}
        visible={visible}
        width={width}
      >
        {isDesChild ? null : children}
      </DrawerContentContainer>
    </DrawerContainer>
  );

  return getContainer === false
    ? DrawDom
    : ReactDOM.createPortal(DrawDom, getContainer);
});

Drawer.displayName = 'Drawer';

Drawer.defaultProps = {};

export default Drawer;
