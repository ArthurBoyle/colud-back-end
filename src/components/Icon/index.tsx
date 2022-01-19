import React from 'react';
import styles from './index.less';

interface IProps {
  fontName: string;
  title: string;
}

const Icon: React.FC<IProps> = (props) => {
  const { fontName, title } = props;

  return <span className={`${styles.container} iconfont ${fontName}`} title={title} />;
};

export default Icon;
