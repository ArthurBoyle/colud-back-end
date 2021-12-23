import React from 'react';
import styles from './index.less';

interface IProps {
  fontName: string;
  title: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Icon: React.FC<IProps> = (props) => {
  const { fontName, title, onClick, style } = props;

  return (
    <i
      className={`${styles.container} iconfont ${fontName}`}
      style={style}
      title={title}
      onClick={onClick}
    />
  );
};

export default Icon;
