import React from 'react';
import styles from './index.less';

interface IProps {
  fontName: string;
  title: string;
  onClick?: () => void;
}

const Icon: React.FC<IProps> = (props) => {
  const { fontName, title, onClick } = props;

  return (
    <span className={`${styles.container} iconfont ${fontName}`} title={title} onClick={onClick} />
  );
};

export default Icon;
