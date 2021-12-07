import React from 'react';
import style from './index.less';

interface IProps {
  fillScreen: boolean;
  hasFooter: boolean;
  children: any;
}

const Background: React.FC<IProps> = (props) => {
  const { fillScreen, hasFooter, children } = props;

  return (
    <div
      className={`${style.container} ${fillScreen ? style.fill_screen : ''} ${
        hasFooter ? style.has_footer : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Background;
