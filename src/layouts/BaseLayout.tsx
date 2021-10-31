import React, { useEffect } from 'react';
import { connect, history, Dispatch } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

interface IProps {
  dispatch: Dispatch;
}

const BaseLayout: React.FC<IProps> = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'userInfo/getUserInfo',
      callback: () => {
        history.replace('/login');
      }
    });
  }, [dispatch]);

  return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
};

export default connect()(BaseLayout);
