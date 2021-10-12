import React from 'react';
import { Spin } from 'antd';
import { container } from './index.less';

const Loading: React.FC = () => {
  return (
    <div className={container}>
      <Spin tip="页面加载中, 请稍后..." size="large" />
    </div>
  );
};

export default Loading;
