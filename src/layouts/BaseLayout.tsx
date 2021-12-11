import React, { useEffect } from 'react';
import { useDispatch } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const BaseLayout: React.FC = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'userInfo/getUserInfo'
    });
  }, [dispatch]);

  return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
};

export default BaseLayout;
