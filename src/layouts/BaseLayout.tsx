import React, { useEffect } from 'react';
import { useDispatch, history } from 'umi';
import { transformRoute } from '@umijs/route-utils';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

interface IProps {
  route: any;
}

const BaseLayout: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { pathname } = history.location;

  useEffect(() => {
    const { breadcrumb } = transformRoute(props.route.routes);
    if (!breadcrumb.get(pathname)) {
      history.replace('/no/found/page');
      return;
    }
    dispatch({
      type: 'userInfo/getUserInfo'
    });
  }, [dispatch, pathname, props.route.routes]);

  return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
};

export default BaseLayout;
