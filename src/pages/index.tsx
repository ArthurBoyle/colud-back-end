import { request } from 'umi';
import { Button } from 'antd';
import styles from './index.less';

export default function IndexPage() {
  const login = async () => {
    const data = await request('api/admin/Login/login', {
      method: 'post',
      data: { mobile: 'jy588vip', pwd: '78pteum0p' }
    });
    window.localStorage.setItem('user', data.data.id);
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

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button onClick={login}>登录</Button>
      <Button onClick={getInfo}>获取信息</Button>
    </div>
  );
}
