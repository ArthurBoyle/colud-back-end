import React from 'react';
import style from './index.less';

interface IProps {
  children: any;
}

const Background: React.FC<IProps> = (props) => {
  const { children } = props;

  return <div className={style.container}>{children}</div>;
};

export default Background;
