import React from 'react';
import style from './index.less';

interface IProps {
  fillScreen?: boolean;
  children: any;
}

const Background: React.FC<IProps> = (props) => {
  const { fillScreen, children } = props;

  return (
    <div className={`${style.container} ${fillScreen ? style.fill_screen : ''}`}>{children}</div>
  );
};

export default Background;
