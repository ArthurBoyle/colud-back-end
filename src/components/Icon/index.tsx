import React from 'react';
import style from './index.less';

interface IProps {
  fontName: string;
  title: string;
  onClick?: () => void;
}

const Icon: React.FC<IProps> = (props) => {
  const { fontName, title, onClick } = props;

  return (
    <i className={`${style.container} iconfont ${fontName}`} title={title} onClick={onClick} />
  );
};

export default Icon;
