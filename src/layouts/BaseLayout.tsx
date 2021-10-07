import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const BaseLayout: React.FC = (props) => {
  return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
};

export default BaseLayout;
