import React from 'react';
import { history } from 'umi';
import { Result, Button } from 'antd';
import style from './index.less';

const NoFoundPage: React.FC = () => {
  return (
    <Result
      className={style.container}
      status="404"
      title="404"
      subTitle="很抱歉，您访问的页面不存在。"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.replace('/live-list');
          }}
        >
          回到首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
