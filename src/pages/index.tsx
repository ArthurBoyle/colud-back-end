import React from 'react';
import { connect, request, Dispatch } from 'umi';
import { Button } from 'antd';
import { State as UserInfoState } from '@/models/userInfo';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch;
  uid: string;
}

const IndexPage: React.FC<IProps> = () => {
  // const { dispatch, uid } = props;

  const login = async () => {
    const data = await request('api/admin/Login/login', {
      method: 'post',
      data: { mobile: 'jy588vip', pwd: '78pteum0p' }
    });
    if (data.status === 0) {
      alert('账号或密码错误');
    } else {
      alert('登录成功');
      window.localStorage.setItem('user', data.data.id);
    }
  };

  const isMobile = () => {
    const agent = navigator.userAgent;
    const mobileAgents = [
      'Android',
      'iPhone',
      'Symbian',
      'WindowsPhone',
      'iPod',
      'BlackBerry',
      'Windows CE'
    ];

    const result = mobileAgents.some((item) => {
      console.log(item);
      console.log(agent.indexOf(item) > -1);
      return agent.indexOf(item) > -1;
    });

    alert(result);
  };

  const getInfo = () => {
    if (!window.localStorage) {
      alert('浏览器不支持localstorage');
      return false;
    } else {
      //主逻辑业务
      const user = window.localStorage.getItem('user');
      console.log(user);
    }
  };

  const handleError = () => {
    throw new Error('DotA');
  };

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button onClick={login}>登录</Button>
      <Button onClick={getInfo}>获取信息</Button>
      <Button onClick={isMobile}>是否是移动端</Button>
      <Button onClick={handleError}>手动异常</Button>
    </div>
  );
};

export default connect((state: { userInfo: UserInfoState }) => ({
  uid: state.userInfo.uid
}))(IndexPage);
